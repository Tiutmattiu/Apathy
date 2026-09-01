import argparse
import json
import logging
import threading
from datetime import datetime
from pathlib import Path

from core import summarize_capture_schema
from service import serve
from urfms_client import URFMSClient
from watcher import Watcher


def main():
    p=argparse.ArgumentParser(description="Local UBSN Human MRI assistant; CAPTCHA/final confirmation remain human")
    p.add_argument("command",choices=("capture","inspect-capture","check","serve"))
    p.add_argument("--config",default="config.local.json")
    p.add_argument("--start",required=False)
    p.add_argument("--end",required=False)
    p.add_argument("--file",required=False,help="saved reservations.js response body for inspect-capture")
    args=p.parse_args()
    logging.basicConfig(level=logging.INFO,format="%(asctime)s %(levelname)s %(message)s")

    if args.command=="inspect-capture":
        if not args.file:p.error("inspect-capture requires --file")
        raw=Path(args.file).read_text(encoding="utf-8")
        print(json.dumps(summarize_capture_schema(raw),ensure_ascii=False,indent=2))
        return

    config=json.loads(Path(args.config).read_text(encoding="utf-8"))
    client=URFMSClient(config);client.start()
    try:
        if args.command in ("capture","check") and (not args.start or not args.end):p.error("capture/check require --start and --end ISO datetimes")
        if args.command=="capture":print(client.capture(datetime.fromisoformat(args.start),datetime.fromisoformat(args.end),config.get("capture_dir","captures")))
        elif args.command=="check":print(json.dumps(Watcher(client,config).check(datetime.fromisoformat(args.start),datetime.fromisoformat(args.end)),indent=2))
        else:
            watcher=Watcher(client,config)
            if config.get("monitor_enabled",False): threading.Thread(target=watcher.watch_forever,daemon=True).start()
            serve(watcher,port=config.get("port",8765))
    except Exception:
        client.debug_screenshot();raise
    finally:client.close()


if __name__=="__main__":main()
