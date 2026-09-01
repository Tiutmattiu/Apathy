import sys
import unittest
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1]))

from core import Participant, Slot, candidate_booking_slot


def participant_with_windows(windows):
    return Participant.from_dict({
        "pid": "P0123",
        "mri_status": "WAITING",
        "wait_since": "2026-08-20",
        "earliest_date": "2026-09-01",
        "latest_date": "2026-11-30",
        "minimum_duration": 60,
        "priority": 100,
        "availability_windows": windows,
    })


class MRIAdminWindowTest(unittest.TestCase):
    def test_tuesday_am_and_thursday_pm_do_not_widen(self):
        p = participant_with_windows([
            {"months": [9, 10, 11], "weekday": 1, "start": "09:00", "end": "12:00"},
            {"months": [9, 10, 11], "weekday": 3, "start": "13:00", "end": "18:00"},
        ])
        tue_pm = Slot(
            datetime.fromisoformat("2026-09-01T14:00:00+08:00"),
            datetime.fromisoformat("2026-09-01T16:00:00+08:00"),
        )
        thu_pm = Slot(
            datetime.fromisoformat("2026-09-03T14:00:00+08:00"),
            datetime.fromisoformat("2026-09-03T16:00:00+08:00"),
        )
        self.assertIsNone(candidate_booking_slot(tue_pm, p))
        candidate = candidate_booking_slot(thu_pm, p)
        self.assertIsNotNone(candidate)
        self.assertEqual("2026-09-03T14:00:00+08:00", candidate.start.isoformat())
        self.assertEqual("2026-09-03T15:00:00+08:00", candidate.end.isoformat())

    def test_month_selection_is_preserved(self):
        p = participant_with_windows([
            {"months": [10, 11], "weekday": 1, "start": "09:00", "end": "12:00"},
        ])
        sep_tue = Slot(
            datetime.fromisoformat("2026-09-01T09:00:00+08:00"),
            datetime.fromisoformat("2026-09-01T11:00:00+08:00"),
        )
        oct_tue = Slot(
            datetime.fromisoformat("2026-10-06T09:00:00+08:00"),
            datetime.fromisoformat("2026-10-06T11:00:00+08:00"),
        )
        self.assertIsNone(candidate_booking_slot(sep_tue, p))
        self.assertIsNotNone(candidate_booking_slot(oct_tue, p))

    def test_explicit_empty_windows_fail_closed(self):
        p = participant_with_windows([])
        free = Slot(
            datetime.fromisoformat("2026-09-01T09:00:00+08:00"),
            datetime.fromisoformat("2026-09-01T18:00:00+08:00"),
        )
        self.assertIsNone(candidate_booking_slot(free, p))


if __name__ == "__main__":
    unittest.main()
