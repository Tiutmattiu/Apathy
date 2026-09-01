from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import date, datetime, time, timezone
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

    @classmethod
    def from_dict(cls, row: dict[str, Any]) -> "Participant":
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

    if payload and recognized == 0:
        raise ValueError(
            f"{NEEDS_REAL_CAPTURE}: reservations.js JSON array contained no confirmed Human MRI blocking rows"
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
    """Return usable intervals from a fixture or confirmed live reservations.js body.

    Fixture payloads already contain usable intervals. The confirmed real endpoint
    returns blocking calendar events, so real parsing requires the exact requested
    start/end bounds and returns the complement of all non-cancelled Human MRI
    reservations/admin holds plus `className=unavailable` regions.
    """
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
    """Detect genuinely new free time, not mere interval reshaping.

    A current free interval wholly covered by the previous free intervals is not
    new availability. This prevents a newly-added reservation that *shrinks* a
    free interval from creating a false NEW_SLOT alert merely because its exact
    start/end key changed.
    """
    changes: list[Change] = []
    for slot in sorted(current):
        if not _covered_by(slot, previous):
            changes.append(Change("REOPENED_SLOT" if slot.key in seen_keys else "NEW_SLOT", slot))
    for slot in sorted(previous):
        if not _covered_by(slot, current):
            changes.append(Change("DISAPPEARED", slot))
    return changes


def match(slot: Slot, participants: Iterable[Participant]) -> list[Participant]:
    rows = [
        p
        for p in participants
        if p.mri_status == "WAITING"
        and p.earliest_date <= slot.start.date() <= p.latest_date
        and slot.start.weekday() in p.allowed_weekdays
        and slot.start.time() >= p.earliest_time
        and slot.end.time() <= p.latest_time
        and slot.minutes >= p.minimum_duration
    ]
    return sorted(rows, key=lambda p: (p.priority, p.wait_since, p.pid))


def make_action(change: Change, matches: list[Participant]) -> dict[str, Any]:
    key = sha256(f"{change.kind}|{change.slot.key}".encode()).hexdigest()[:16]
    return {
        "action_id": key,
        "detected_at": datetime.now(timezone.utc).isoformat(),
        "change": change.kind,
        "slot": {"start": change.slot.start.isoformat(), "end": change.slot.end.isoformat()},
        "matching_pids": [x.pid for x in matches],
        "recommended_pid": matches[0].pid,
        "reason": f"{matches[0].pid} matches date, weekday, time and duration constraints",
        "status": "READY",
    }


def load_participants(path: str | Path) -> list[Participant]:
    return [Participant.from_dict(x) for x in json.loads(Path(path).read_text(encoding="utf-8"))]
