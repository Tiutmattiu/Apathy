from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen

from core import Participant


@dataclass(frozen=True)
class WaitingSnapshot:
    participants: list[Participant]
    source: str


def _parse_rows(payload: Any, source: str) -> WaitingSnapshot:
    """Parse the normalized UBSN waiting snapshot; fail closed on ambiguity.

    Backend v1 may return either a bare array or {"participants": [...]}.
    Rows contain research PID/scheduling constraints only; the local helper does
    not need names, phone numbers, or other contact PII.
    """
    if isinstance(payload, dict):
        payload = payload.get("participants")
    if not isinstance(payload, list):
        raise ValueError("waiting source must return a participant array")

    participants = [Participant.from_dict(row) for row in payload]
    pids = [row.pid for row in participants]
    if len(pids) != len(set(pids)):
        raise ValueError("waiting source returned duplicate PIDs")
    return WaitingSnapshot(participants, source)


def _load_file(path: str | Path) -> WaitingSnapshot:
    payload = json.loads(Path(path).read_text(encoding="utf-8"))
    return _parse_rows(payload, f"file:{Path(path).name}")


def _load_backend(url: str, timeout_seconds: float) -> WaitingSnapshot:
    if not url.strip():
        raise ValueError("waiting_source=backend requires waiting_list_url")
    request = Request(
        url,
        method="GET",
        headers={"Accept": "application/json", "User-Agent": "Apathy-UBSN-local-helper/1"},
    )
    with urlopen(request, timeout=timeout_seconds) as response:
        if response.status < 200 or response.status >= 300:
            raise RuntimeError(f"waiting backend returned HTTP {response.status}")
        payload = json.loads(response.read().decode("utf-8"))
    return _parse_rows(payload, "backend")


def load_waiting_snapshot(config: dict) -> WaitingSnapshot:
    """Load one normalized MRI waiting snapshot from the configured authority.

    `file` remains the explicit local-development fallback. `backend` is intended
    for the APATHY read-only producer derived from identity-resolved current
    Participant MRIadmin plus current APATHY workflow/booking state. Contactlist
    and manually maintained MRI waiting lists are not preference/eligibility
    authorities. Existing MRI Time rows may be reconciled upstream only as
    human-confirmed booking evidence; they must not define waiting availability.
    Backend failure does not silently fall back to a stale local list.
    """
    mode = str(config.get("waiting_source", "file")).strip().lower()
    if mode == "file":
        return _load_file(config["waiting_list_file"])
    if mode == "backend":
        return _load_backend(
            str(config.get("waiting_list_url", "")),
            float(config.get("waiting_list_timeout_seconds", 10)),
        )
    raise ValueError("waiting_source must be 'file' or 'backend'")
