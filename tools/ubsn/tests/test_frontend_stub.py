import unittest
from pathlib import Path


class FrontendStubTest(unittest.TestCase):
    def test_service_unavailable_message_and_feature_entry_exist(self):
        repo=Path(__file__).parents[3]
        app=(repo/"app.js").read_text(encoding="utf-8")
        config=(repo/"config.js").read_text(encoding="utf-8")
        self.assertIn("UBSN helper is not running on this device.",app)
        self.assertIn("renderUBSNAssistant",app)
        self.assertIn("['ubsn','MRI Booking Assistant']",config)


if __name__=="__main__":unittest.main()
