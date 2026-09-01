import argparse
import json
import logging
from datetime import datetime
from pathlib import Path

from core import summarize_capture_schema
from service import serve
from urfms_client import URFMSClient
from watcher import Watcher


def main():
    p = argparse.ArgumentParser(description="Local UBSN Human MRI assistant; CAPTCHA/final confirmation remain human")
    p.add_argument("command", choices=("capture", "inspect-capture", "check", "serve"))
    p.add_argument("--config", default="config.local.json")
    p.add_argument("--start", required=False)
    p.add_argument("--end", required=False)
    p.add_argument("--file", required=False, help="saved reservations.js response body for inspect-capture")
    p.add_argument("--monitor", action="store_true", help="with serve: keep checking in the background using configured intervals")
    args = p.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

    if args.command == "inspect-capture":
        if not args.file:
            p.error("inspect-capture requires --file")
        raw = Path(args.file).read_text(encoding="utf-8")
        print(json.dumps(summarize_capture_schema(raw), ensure_ascii=False, indent=2))
        return

    config = json.loads(Path(args.config).read_text(encoding="utf-8"))
    if args.command == "serve" and args.monitor:
        config["monitor_enabled"] = True

    client = URFMSClient(config)
    client.start()
    try:
        if args.command in ("capture", "check") and (not args.start or not args.end):
            p.error("capture/check require --start and --end ISO datetimes")
        if args.command == "capture":
            print(
                client.capture(
                    datetime.fromisoformat(args.start),
                    datetime.fromisoformat(args.end),
                    config.get("capture_dir", "captures"),
                )
            )
        elif args.command == "check":
            watcher = Watcher(client, config)
            created = watcher.check(datetime.fromisoformat(args.start), datetime.fromisoformat(args.end))
            print(json.dumps({"created": created, "status": watcher.status()}, indent=2))
        else:
            logging.info(
                "Starting persistent UBSN helper. Keep this terminal and browser open; subsequent APATHY checks reuse the same authenticated browser session."
            )
            client.ensure_authenticated()
            logging.info("UBSN authenticated for this helper session.")
            watcher = Watcher(client, config)
            if config.get("monitor_enabled", False):
                logging.info("Background monitoring enabled; browser operations remain serialized on the helper thread.")
            else:
                logging.info("Background monitoring disabled; APATHY 'check now' still reuses this session.")
            serve(
                watcher,
                port=config.get("port", 8765),
                monitor=config.get("monitor_enabled", False),
            )
    except Exception:
        client.debug_screenshot()
        raise
    finally:
        client.close()


if __name__ == "__main__":
    main()
