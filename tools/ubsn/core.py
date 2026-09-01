from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import date, datetime, time, timedelta, timezone
from hashlib import sha256
from pathlib import Path
from typing import Any, Iterable


NEEDS_REAL_CAPTURE = "NEEDS_REAL_CAPTURE"
REAL_CALENDAR_SOURCE = "reservations.js"


@dataclass(frozen=True, order=True)
class Slot:
    start: datetime
    end: datetime
    source: str = "calendar"

    @property
    def key(self) -> str:
        return f"{self.start.isoformat()}|{self.end.isoformat()}"

    @property
    def minutes(self) -> int:
        return int((self.end - self.start).total_seconds() // 60)


@dataclass(frozen=True)
class AvailabilityWindow:
    """One truthful recurring participant-availability window.

    `months` keeps MRIadmin month selections attached to the correct weekday/time
    combination. An empty month set means any month inside earliest/latest_date.
    """

    weekday: int
    start: time
    end: time
    months: frozenset[int] = frozenset()

    @classmethod
    def from_dict(cls, row: dict[str, Any]) -> "AvailabilityWindow":
        weekday = int(row["weekday"])
        if weekday < 0 or weekday > 6:
            raise ValueError("availability window weekday must be 0..6")
        start = time.fromisoformat(str(row["start"]))
        end = time.fromisoformat(str(row["end"]))
        if end <= start:
            raise ValueError("availability window end must be after start")
        months = frozenset(int(x) for x in row.get("months", []))
        if any(x < 1 or x > 12 for x in months):
            raise ValueError("availability window months must be 1..12")
        return cls(weekday=weekday, start=start, end=end, months=months)


@dataclass(frozen=True)
class Participant:
    pid: str
    mri_status: str
    wait_since: date
    earliest_date: date
    latest_date: date
    allowed_weekdays: frozenset[int]
    earliest_time: time
    latest_time: time
    minimum_duration: int
    priority: int = 100
    notes: str = ""
    # None means legacy coarse availability fields are in use. An explicit empty
    # list from the backend means availability is unknown/unavailable and must not
    # be widened into a permissive default.
    availability_windows: tuple[AvailabilityWindow, ...] | None = None

    @classmethod
    def from_dict(cls, row: dict[str, Any]) -> "Participant":
        structured = None
        if "availability_windows" in row:
            value = row.get("availability_windows")
            if not isinstance(value, list):
                raise ValueError("availability_windows must be a list")
            structured = tuple(AvailabilityWindow.from_dict(x) for x in value)

        return cls(
            pid=str(row["pid"]).strip().upper(),
            mri_status=str(row.get("mri_status", "WAITING")).strip().upper(),
            wait_since=date.fromisoformat(row["wait_since"]),
            earliest_date=date.fromisoformat(row["earliest_date"]),
            latest_date=date.fromisoformat(row["latest_date"]),
            allowed_weekdays=frozenset(int(x) for x in row.get("allowed_weekdays", range(7))),
            earliest_time=time.fromisoformat(row.get("earliest_time", "00:00")),
            latest_time=time.fromisoformat(row.get("latest_time", "23:59")),
            minimum_duration=int(row.get("minimum_duration", 0)),
            priority=int(row.get("priority", 100)),
            notes=str(row.get("notes", "")),
            availability_windows=structured,
        )


@dataclass(frozen=True)
class Change:
    kind: str
    slot: Slot


def _shape(value: Any, depth: int = 0) -> dict[str, Any]:
    """Return JSON structure only; never include scalar values from a real capture."""
    if isinstance(value, dict):
        out: dict[str, Any] = {"type": "object", "keys": sorted(str(k) for k in value.keys())}
        if depth < 3:
            out["children"] = {str(k): _shape(v, depth + 1) for k, v in value.items()}
        return out
    if isinstance(value, list):
        out = {"type": "array", "length": len(value)}
        if value and depth < 3:
            out["item_shape"] = _shape(value[0], depth + 1)
        return out
    if value is None:
        return {"type": "null"}
    if isinstance(value, bool):
        return {"type": "boolean"}
    if isinstance(value, (int, float)):
        return {"type": "number"}
    if isinstance(value, str):
        return {"type": "string"}
    return {"type": type(value).__name__}


def summarize_capture_schema(raw_text: str) -> dict[str, Any]:
    """Privacy-safe schema probe for a saved real reservations.js body."""
    try:
        payload = json.loads(raw_text)
    except json.JSONDecodeError:
        return {
            "format": "non_json_text",
            "text_length": len(raw_text),
            "next_step": "inspect parser envelope without sharing raw capture values",
        }
    return {
        "format": "json",
        "text_length": len(raw_text),
        "shape": _shape(payload),
    }


def _parse_datetime(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value.strip():
        return None
    try:
        return datetime.fromisoformat(value.strip())
    except ValueError:
        return None


def _is_blocking_calendar_row(row: dict[str, Any]) -> bool:
    """Narrow mapping from the confirmed Human MRI reservations.js capture.

    Confirmed blocking rows are either calendar-unavailable regions or non-cancelled
    Human MRI reservation/admin-hold rows. Unknown row types are ignored rather
    than guessed into blocking semantics.
    """
    if row.get("is_canceled") is True:
        return False
    if str(row.get("className") or "").strip().lower() == "unavailable":
        return True
    return str(row.get("product") or "").strip().lower() == "human mri"


def _merge_intervals(intervals: Iterable[tuple[datetime, datetime]]) -> list[tuple[datetime, datetime]]:
    merged: list[list[datetime]] = []
    for start, end in sorted(intervals, key=lambda x: (x[0], x[1])):
        if end <= start:
            continue
        if not merged or start > merged[-1][1]:
            merged.append([start, end])
        elif end > merged[-1][1]:
            merged[-1][1] = end
    return [(start, end) for start, end in merged]


def _real_calendar_free_slots(
    payload: list[Any], window_start: datetime, window_end: datetime
) -> set[Slot]:
    if window_end <= window_start:
        raise ValueError("calendar window_end must be after window_start")

    blocked: list[tuple[datetime, datetime]] = []
    recognized = 0
    for value in payload:
        if not isinstance(value, dict) or not _is_blocking_calendar_row(value):
            continue
        start = _parse_datetime(value.get("start"))
        end = _parse_datetime(value.get("end"))
        if start is None or end is None or end <= start:
            continue
        recognized += 1
        clipped_start = max(start, window_start)
        clipped_end = min(end, window_end)
        if clipped_end > clipped_start:
            blocked.append((clipped_start, clipped_end))

    if recognized == 0:
        raise ValueError(
            f"{NEEDS_REAL_CAPTURE}: reservations.js contained no confirmed Human MRI blocking rows"
        )

    merged = _merge_intervals(blocked)
    free: set[Slot] = set()
    cursor = window_start
    for start, end in merged:
        if start > cursor:
            free.add(Slot(cursor, start, REAL_CALENDAR_SOURCE))
        if end > cursor:
            cursor = end
    if cursor < window_end:
        free.add(Slot(cursor, window_end, REAL_CALENDAR_SOURCE))
    return free


def parse_reservations_response(
    raw_text: str,
    window_start: datetime | None = None,
    window_end: datetime | None = None,
) -> set[Slot]:
    """Return usable intervals from a fixture or confirmed live reservations.js body."""
    try:
        payload = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise ValueError(f"{NEEDS_REAL_CAPTURE}: response is not JSON") from exc

    if isinstance(payload, dict) and payload.get("fixture_schema") == "ubsn-usable-intervals-v1":
        slots = set()
        for row in payload.get("usable_intervals", []):
            slots.add(
                Slot(
                    datetime.fromisoformat(row["start"]),
                    datetime.fromisoformat(row["end"]),
                    row.get("source", "fixture"),
                )
            )
        return slots

    if isinstance(payload, list):
        if window_start is None or window_end is None:
            raise ValueError("real reservations.js parsing requires window_start and window_end")
        return _real_calendar_free_slots(payload, window_start, window_end)

    raise ValueError(f"{NEEDS_REAL_CAPTURE}: unrecognized reservations.js response envelope")


def _covered_by(slot: Slot, candidates: Iterable[Slot]) -> bool:
    """True when the whole slot was already free in the candidate set."""
    cursor = slot.start
    for other in sorted(candidates, key=lambda x: (x.start, x.end)):
        if other.end <= cursor:
            continue
        if other.start > cursor:
            return False
        if other.end > cursor:
            cursor = other.end
        if cursor >= slot.end:
            return True
    return cursor >= slot.end


def diff_slots(previous: set[Slot], current: set[Slot], seen_keys: set[str]) -> list[Change]:
    """Detect genuinely new free time, not mere interval reshaping."""
    changes: list[Change] = []
    for slot in sorted(current):
        if not _covered_by(slot, previous):
            changes.append(Change("REOPENED_SLOT" if slot.key in seen_keys else "NEW_SLOT", slot))
    for slot in sorted(previous):
        if not _covered_by(slot, current):
            changes.append(Change("DISAPPEARED", slot))
    return changes


def _candidate_from_window(
    slot: Slot,
    participant: Participant,
    day: date,
    window_start: time,
    window_end: time,
) -> Slot | None:
    tz = slot.start.tzinfo
    allowed_start = datetime.combine(day, window_start, tzinfo=tz)
    allowed_end = datetime.combine(day, window_end, tzinfo=tz)
    start = max(slot.start, allowed_start)
    end = min(slot.end, allowed_end)
    if end <= start:
        return None
    if participant.minimum_duration > 0:
        candidate_end = start + timedelta(minutes=participant.minimum_duration)
        if candidate_end <= end:
            return Slot(start, candidate_end, slot.source)
        return None
    return Slot(start, end, slot.source)


def candidate_booking_slot(slot: Slot, participant: Participant) -> Slot | None:
    """Return the earliest bookable interval for one participant inside a free slot.

    New backend snapshots can preserve multiple MRIadmin weekday/time/month windows
    independently, so e.g. Tuesday-AM plus Thursday-PM never widens into all-day
    Tuesday/Thursday availability. Legacy coarse fields remain supported only for
    the local development file while the Production producer is being built.
    """
    if participant.mri_status != "WAITING" or slot.end <= slot.start:
        return None

    day = max(slot.start.date(), participant.earliest_date)
    last_day = min(slot.end.date(), participant.latest_date)

    while day <= last_day:
        if participant.availability_windows is not None:
            candidates: list[Slot] = []
            for window in participant.availability_windows:
                if day.weekday() != window.weekday:
                    continue
                if window.months and day.month not in window.months:
                    continue
                candidate = _candidate_from_window(slot, participant, day, window.start, window.end)
                if candidate is not None:
                    candidates.append(candidate)
            if candidates:
                return min(candidates, key=lambda x: (x.start, x.end))
        elif day.weekday() in participant.allowed_weekdays:
            candidate = _candidate_from_window(
                slot,
                participant,
                day,
                participant.earliest_time,
                participant.latest_time,
            )
            if candidate is not None:
                return candidate
        day += timedelta(days=1)
    return None


def match(slot: Slot, participants: Iterable[Participant]) -> list[Participant]:
    rows = [p for p in participants if candidate_booking_slot(slot, p) is not None]
    return sorted(rows, key=lambda p: (p.priority, p.wait_since, p.pid))


def make_action(change: Change, matches: list[Participant]) -> dict[str, Any]:
    if not matches:
        raise ValueError("make_action requires at least one participant match")
    booking_slot = candidate_booking_slot(change.slot, matches[0])
    if booking_slot is None:
        raise ValueError("recommended participant no longer fits the free interval")
    key = sha256(f"{change.kind}|{booking_slot.key}|{matches[0].pid}".encode()).hexdigest()[:16]
    return {
        "action_id": key,
        "detected_at": datetime.now(timezone.utc).isoformat(),
        "change": change.kind,
        "slot": {"start": booking_slot.start.isoformat(), "end": booking_slot.end.isoformat()},
        "free_interval": {"start": change.slot.start.isoformat(), "end": change.slot.end.isoformat()},
        "matching_pids": [x.pid for x in matches],
        "recommended_pid": matches[0].pid,
        "reason": f"{matches[0].pid} matches MRI availability and duration constraints",
        "status": "READY",
    }


def load_participants(path: str | Path) -> list[Participant]:
    return [Participant.from_dict(x) for x in json.loads(Path(path).read_text(encoding="utf-8"))]
