from __future__ import annotations

import json
import logging
import threading
import time as clock
from datetime import datetime, time, timedelta, timezone
from pathlib import Path

from core import Change, Slot, diff_slots, load_participants, make_action, match, parse_reservations_response


class Watcher:
    def __init__(self, client, config: dict):
        self.client, self.config = client, config; self.previous = set(); self.seen = set(); self.actions = {}; self.lock = threading.Lock()
        self.audit_path = Path(config.get("audit_file", ".local/audit.jsonl")); self.audit_path.parent.mkdir(parents=True, exist_ok=True)

    def audit(self, event: str, **safe):
        forbidden = {"password", "cookie", "csrf", "token", "headers", "raw"}
        if forbidden & {x.lower() for x in safe}: raise ValueError("secret-bearing audit field rejected")
        row = {"at": datetime.now(timezone.utc).isoformat(), "event": event, **safe}
        with self.audit_path.open("a", encoding="utf-8") as f: f.write(json.dumps(row, ensure_ascii=False) + "\n")

    def check(self, start: datetime, end: datetime, trigger="MANUAL") -> list[dict]:
        with self.lock:
            current = parse_reservations_response(self.client.request_calendar(start, end))
            changes = diff_slots(self.previous, current, self.seen); self.previous = current; self.seen.update(x.key for x in current)
            participants = load_participants(self.config["waiting_list_file"]); created = []
            for change in changes:
                self.audit("CALENDAR_CHANGE", trigger=trigger, kind=change.kind, slot=change.slot.key)
                if change.kind not in ("NEW_SLOT", "REOPENED_SLOT"): continue
                matches = match(change.slot, participants)
                if not matches: continue
                action = make_action(change, matches)
                if action["action_id"] not in self.actions:
                    self.actions[action["action_id"]] = action; created.append(action)
                    self.audit("ACTION_READY", action_id=action["action_id"], slot=change.slot.key, matching_pids=action["matching_pids"])
            return created

    def prepare(self, action_id: str, dry_run=False):
        action = self.actions[action_id]
        if action["status"] not in ("NEW", "READY"): raise ValueError("action is not available for preparation")
        expires = self.config.get("action_expiry_minutes", 30) * 60
        if (datetime.now(timezone.utc) - datetime.fromisoformat(action["detected_at"])).total_seconds() > expires:
            action["status"] = "EXPIRED"; raise ValueError("action expired")
        slot = Slot(datetime.fromisoformat(action["slot"]["start"]), datetime.fromisoformat(action["slot"]["end"]), action["change"])
        self.client.prepare_booking(slot, dry_run=dry_run); action["status"] = "OPENED"; self.audit("ACTION_OPENED", action_id=action_id)

    def outcome(self, action_id: str, status: str):
        status = status.upper()
        if status not in ("BOOKED", "EXPIRED", "DISMISSED", "FAILED"): raise ValueError("invalid outcome")
        self.actions[action_id]["status"] = status; self.audit("ACTION_OUTCOME", action_id=action_id, status=status)

    def poll_interval(self, now: datetime) -> int:
        start=time.fromisoformat(self.config["release_window_start"]); end=time.fromisoformat(self.config["release_window_end"])
        return self.config["release_poll_interval_seconds"] if start <= now.time() <= end else self.config["normal_poll_interval_seconds"]

    def watch_forever(self):
        while True:
            now = datetime.now().astimezone(); end = now + timedelta(days=self.config.get("monitor_days_ahead", 7))
            try: self.check(now, end, "RELEASE_WINDOW" if self.poll_interval(now) == self.config["release_poll_interval_seconds"] else "BACKGROUND")
            except Exception as exc:
                logging.warning("Monitor check failed; keeping last successful state: %s", exc)
                self.audit("MONITOR_ERROR", error_type=type(exc).__name__)
            clock.sleep(self.poll_interval(datetime.now().astimezone()))
