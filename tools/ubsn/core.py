from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from datetime import date, datetime, time, timezone
from hashlib import sha256
from pathlib import Path
from typing import Any, Iterable


NEEDS_REAL_CAPTURE = "NEEDS_REAL_CAPTURE"


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
    """Privacy-safe schema probe for a saved real reservations.js body.

    The result intentionally exposes only JSON structure, field names, collection
    lengths, and scalar *types*. It never echoes scalar values from the capture.
    """
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


def parse_reservations_response(raw_text: str) -> set[Slot]:
    """Parse only the labeled development fixture until a real body is captured."""
    try:
        payload = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise ValueError(f"{NEEDS_REAL_CAPTURE}: response is not JSON") from exc
    if not isinstance(payload, dict) or payload.get("fixture_schema") != "ubsn-usable-intervals-v1":
        raise ValueError(f"{NEEDS_REAL_CAPTURE}: exact reservations.js response schema is not confirmed")
    slots = set()
    for row in payload.get("usable_intervals", []):
        slots.add(Slot(datetime.fromisoformat(row["start"]), datetime.fromisoformat(row["end"]), row.get("source", "fixture")))
    return slots


def diff_slots(previous: set[Slot], current: set[Slot], seen_keys: set[str]) -> list[Change]:
    old = {x.key: x for x in previous}; now = {x.key: x for x in current}; changes = []
    for key in sorted(now.keys() - old.keys()):
        changes.append(Change("REOPENED_SLOT" if key in seen_keys else "NEW_SLOT", now[key]))
    for key in sorted(old.keys() - now.keys()):
        changes.append(Change("DISAPPEARED", old[key]))
    return changes


def match(slot: Slot, participants: Iterable[Participant]) -> list[Participant]:
    rows = [p for p in participants if p.mri_status == "WAITING"
            and p.earliest_date <= slot.start.date() <= p.latest_date
            and slot.start.weekday() in p.allowed_weekdays
            and slot.start.time() >= p.earliest_time
            and slot.end.time() <= p.latest_time
            and slot.minutes >= p.minimum_duration]
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
