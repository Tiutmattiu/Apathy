import json
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

import sys
sys.path.insert(0, str(Path(__file__).parents[1]))

from core import Change, Participant, Slot, candidate_booking_slot, diff_slots, make_action, match, parse_reservations_response, summarize_capture_schema
from watcher import Watcher


START = "2026-08-29T10:00:00+08:00"
END = "2026-08-29T11:30:00+08:00"


def fixture(*slots):
    return json.dumps({"fixture_schema": "ubsn-usable-intervals-v1", "fixture_only": True, "usable_intervals": list(slots)})


def participant(pid="P0123", *, earliest_time="09:00", latest_time="12:30", priority=100, wait_since="2026-05-10", minimum_duration=90, allowed_weekdays=None):
    return {
        "pid": pid,
        "mri_status": "WAITING",
        "wait_since": wait_since,
        "earliest_date": "2026-08-01",
        "latest_date": "2026-10-31",
        "allowed_weekdays": [5] if allowed_weekdays is None else allowed_weekdays,
        "earliest_time": earliest_time,
        "latest_time": latest_time,
        "minimum_duration": minimum_duration,
        "priority": priority,
    }


def real_calendar(*rows):
    return json.dumps(list(rows))


def unavailable(start, end):
    return {"className": "unavailable", "title": "", "start": start, "end": end, "allDay": False}


def reservation(start, end, *, canceled=False, title="Reservation"):
    return {"start": start, "end": end, "allDay": False, "title": title, "product": "Human MRI", "is_canceled": canceled}


class FakeClient:
    def __init__(self, responses):
        self.responses = list(responses)
        self.prepared = []

    def request_calendar(self, *_):
        return self.responses.pop(0)

    def prepare_booking(self, slot, dry_run=False):
        self.prepared.append((slot, dry_run))


class FailingClient(FakeClient):
    def request_calendar(self, *args):
        value = self.responses.pop(0)
        if isinstance(value, Exception):
            raise value
        return value


class UBSNTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.waiting = self.root / "waiting.json"
        self.waiting.write_text(json.dumps([participant()]))
        self.config = {
            "waiting_list_file": str(self.waiting),
            "audit_file": str(self.root / "audit.jsonl"),
            "action_expiry_minutes": 30,
            "release_window_start": "08:45",
            "release_window_end": "09:15",
            "release_poll_interval_seconds": 15,
            "normal_poll_interval_seconds": 180,
        }
        self.body = fixture({"start": START, "end": END, "source": "fixture"})
        self.start = datetime.fromisoformat("2026-08-29T00:00:00+08:00")
        self.end = datetime.fromisoformat("2026-08-30T00:00:00+08:00")

    def tearDown(self):
        self.tmp.cleanup()

    def test_identical_state_has_no_change(self):
        slots = parse_reservations_response(self.body)
        self.assertEqual([], diff_slots(slots, slots, {x.key for x in slots}))

    def test_new_usable_slot(self):
        changes = diff_slots(set(), parse_reservations_response(self.body), set())
        self.assertEqual("NEW_SLOT", changes[0].kind)

    def test_disappeared_is_observation_not_cancellation(self):
        slots = parse_reservations_response(self.body)
        self.assertEqual("DISAPPEARED", diff_slots(slots, set(), set())[0].kind)

    def test_interval_shrink_does_not_create_false_new_slot(self):
        previous = {Slot(datetime.fromisoformat("2026-09-07T09:00:00+08:00"), datetime.fromisoformat("2026-09-07T11:00:00+08:00"))}
        current = {
            Slot(datetime.fromisoformat("2026-09-07T09:00:00+08:00"), datetime.fromisoformat("2026-09-07T09:30:00+08:00")),
            Slot(datetime.fromisoformat("2026-09-07T10:00:00+08:00"), datetime.fromisoformat("2026-09-07T11:00:00+08:00")),
        }
        self.assertFalse(any(x.kind in ("NEW_SLOT", "REOPENED_SLOT") for x in diff_slots(previous, current, set())))

    def test_interval_expansion_creates_new_slot(self):
        previous = {
            Slot(datetime.fromisoformat("2026-09-07T09:00:00+08:00"), datetime.fromisoformat("2026-09-07T09:30:00+08:00")),
            Slot(datetime.fromisoformat("2026-09-07T10:00:00+08:00"), datetime.fromisoformat("2026-09-07T11:00:00+08:00")),
        }
        current = {Slot(datetime.fromisoformat("2026-09-07T09:00:00+08:00"), datetime.fromisoformat("2026-09-07T11:00:00+08:00"))}
        self.assertEqual(["NEW_SLOT"], [x.kind for x in diff_slots(previous, current, set()) if x.kind != "DISAPPEARED"])

    def test_real_calendar_returns_complement_of_reservations_and_unavailable(self):
        start = datetime.fromisoformat("2026-09-07T00:00:00+08:00")
        end = datetime.fromisoformat("2026-09-08T00:00:00+08:00")
        body = real_calendar(
            unavailable("2026-09-07T00:00:00+08:00", "2026-09-07T09:00:00+08:00"),
            reservation("2026-09-07T10:00:00+08:00", "2026-09-07T13:30:00+08:00"),
            unavailable("2026-09-07T13:30:00+08:00", "2026-09-07T14:30:00+08:00"),
            reservation("2026-09-07T14:30:00+08:00", "2026-09-07T18:30:00+08:00"),
            unavailable("2026-09-07T18:30:00+08:00", "2026-09-08T00:00:00+08:00"),
        )
        slots = parse_reservations_response(body, start, end)
        self.assertEqual(1, len(slots))
        slot = next(iter(slots))
        self.assertEqual("2026-09-07T09:00:00+08:00", slot.start.isoformat())
        self.assertEqual("2026-09-07T10:00:00+08:00", slot.end.isoformat())
        self.assertEqual("reservations.js", slot.source)

    def test_real_calendar_admin_hold_blocks_time(self):
        start = datetime.fromisoformat("2026-09-03T09:00:00+08:00")
        end = datetime.fromisoformat("2026-09-03T12:00:00+08:00")
        body = real_calendar(
            reservation("2026-09-03T09:00:00+08:00", "2026-09-03T11:00:00+08:00", title="Admin Hold"),
            reservation("2026-09-03T11:00:00+08:00", "2026-09-03T12:00:00+08:00"),
        )
        self.assertEqual(set(), parse_reservations_response(body, start, end))

    def test_real_calendar_canceled_reservation_does_not_block(self):
        start = datetime.fromisoformat("2026-09-07T09:00:00+08:00")
        end = datetime.fromisoformat("2026-09-07T10:00:00+08:00")
        body = real_calendar(
            reservation("2026-09-07T09:00:00+08:00", "2026-09-07T10:00:00+08:00", canceled=True),
            unavailable("2026-09-07T08:00:00+08:00", "2026-09-07T09:00:00+08:00"),
        )
        slots = parse_reservations_response(body, start, end)
        self.assertEqual(1, len(slots))
        self.assertEqual(60, next(iter(slots)).minutes)

    def test_empty_real_calendar_fails_closed(self):
        start = datetime.fromisoformat("2026-09-07T09:00:00+08:00")
        end = datetime.fromisoformat("2026-09-07T10:00:00+08:00")
        with self.assertRaisesRegex(ValueError, "NEEDS_REAL_CAPTURE"):
            parse_reservations_response("[]", start, end)

    def test_real_calendar_requires_requested_bounds(self):
        with self.assertRaisesRegex(ValueError, "window_start"):
            parse_reservations_response(real_calendar(unavailable("2026-09-07T00:00:00+08:00", "2026-09-07T09:00:00+08:00")))

    def test_free_interval_is_clipped_to_participant_window_and_duration(self):
        free = Slot(datetime.fromisoformat("2026-08-29T08:00:00+08:00"), datetime.fromisoformat("2026-08-29T13:00:00+08:00"))
        p = Participant.from_dict(participant(earliest_time="09:30", latest_time="12:00", minimum_duration=90))
        candidate = candidate_booking_slot(free, p)
        self.assertIsNotNone(candidate)
        self.assertEqual("2026-08-29T09:30:00+08:00", candidate.start.isoformat())
        self.assertEqual("2026-08-29T11:00:00+08:00", candidate.end.isoformat())

    def test_wide_free_interval_matches_instead_of_requiring_entire_interval_to_fit(self):
        free = Slot(datetime.fromisoformat("2026-08-29T00:00:00+08:00"), datetime.fromisoformat("2026-08-30T00:00:00+08:00"))
        p = Participant.from_dict(participant(earliest_time="09:00", latest_time="12:30", minimum_duration=90))
        self.assertEqual([p.pid], [x.pid for x in match(free, [p])])
        action = make_action(Change("NEW_SLOT", free), [p])
        self.assertEqual("2026-08-29T09:00:00+08:00", action["slot"]["start"])
        self.assertEqual("2026-08-29T10:30:00+08:00", action["slot"]["end"])

    def test_no_match_creates_no_action(self):
        self.waiting.write_text(json.dumps([participant(earliest_time="14:00", latest_time="15:00")]))
        self.assertEqual([], Watcher(FakeClient([self.body]), self.config).check(self.start, self.end))

    def test_match_creates_one_action_and_repeat_dedupes(self):
        watcher = Watcher(FakeClient([self.body, self.body]), self.config)
        self.assertEqual(1, len(watcher.check(self.start, self.end)))
        self.assertEqual([], watcher.check(self.start, self.end))
        self.assertEqual(1, len(watcher.actions))

    def test_check_status_explains_empty_action_result(self):
        self.waiting.write_text(json.dumps([participant(earliest_time="14:00", latest_time="15:00")]))
        watcher = Watcher(FakeClient([self.body]), self.config)
        self.assertEqual([], watcher.check(self.start, self.end))
        status = watcher.status()["last_check"]
        self.assertEqual(1, status["free_interval_count"])
        self.assertEqual(0, status["matchable_interval_count"])
        self.assertEqual(0, status["created_action_count"])

    def test_ranking_is_priority_then_wait_since_then_pid(self):
        slot = next(iter(parse_reservations_response(self.body)))
        rows = [
            Participant.from_dict(participant("P0002", priority=100, wait_since="2026-05-01")),
            Participant.from_dict(participant("P0001", priority=50, wait_since="2026-06-01")),
        ]
        self.assertEqual(["P0001", "P0002"], [x.pid for x in match(slot, rows)])

    def test_expired_action_cannot_prepare(self):
        client = FakeClient([self.body])
        watcher = Watcher(client, self.config)
        action = watcher.check(self.start, self.end)[0]
        watcher.actions[action["action_id"]]["detected_at"] = (datetime.now(timezone.utc) - timedelta(hours=1)).isoformat()
        with self.assertRaisesRegex(ValueError, "expired"):
            watcher.prepare(action["action_id"])
        self.assertEqual([], client.prepared)

    def test_capture_schema_inspector_never_echoes_scalar_values(self):
        raw = json.dumps({"events": [{"title": "PRIVATE SUBJECT", "start": "2026-09-01T10:00:00+08:00", "free": True}]})
        summary = json.dumps(summarize_capture_schema(raw), ensure_ascii=False)
        self.assertIn('"events"', summary)
        self.assertIn('"title"', summary)
        self.assertIn('"start"', summary)
        self.assertNotIn("PRIVATE SUBJECT", summary)
        self.assertNotIn("2026-09-01T10:00:00+08:00", summary)

    def test_capture_schema_inspector_handles_non_json_without_echoing_body(self):
        summary = json.dumps(summarize_capture_schema("secret-looking javascript body"))
        self.assertIn("non_json_text", summary)
        self.assertNotIn("secret-looking", summary)

    def test_transient_error_keeps_last_successful_state(self):
        client = FailingClient([self.body, RuntimeError("temporary"), self.body])
        watcher = Watcher(client, self.config)
        watcher.check(self.start, self.end)
        before = set(watcher.previous)
        with self.assertRaisesRegex(RuntimeError, "temporary"):
            watcher.check(self.start, self.end)
        self.assertEqual(before, watcher.previous)
        self.assertEqual([], watcher.check(self.start, self.end))


if __name__ == "__main__":
    unittest.main()
