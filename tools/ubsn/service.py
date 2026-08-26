from __future__ import annotations

import json
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

from core import load_participants


def serve(watcher, host="127.0.0.1", port=8765):
    class Handler(BaseHTTPRequestHandler):
        def allowed_origin(self):
            origin=self.headers.get("Origin")
            return origin is None or origin in watcher.config.get("allowed_origins",["null","http://127.0.0.1:8000","http://localhost:8000"])
        def send_json(self, status, value):
            body=json.dumps(value, default=str).encode();self.send_response(status);self.send_header("Content-Type","application/json");self.send_header("Access-Control-Allow-Origin",self.headers.get("Origin") or "null");self.send_header("Vary","Origin");self.send_header("Content-Length",str(len(body)));self.end_headers();self.wfile.write(body)
        def body(self):return json.loads(self.rfile.read(int(self.headers.get("Content-Length",0))) or b"{}")
        def do_OPTIONS(self):
            if not self.allowed_origin():return self.send_json(403,{"error":"origin not allowed"})
            self.send_response(204);self.send_header("Access-Control-Allow-Origin",self.headers.get("Origin") or "null");self.send_header("Access-Control-Allow-Methods","GET,POST,OPTIONS");self.send_header("Access-Control-Allow-Headers","Content-Type");self.end_headers()
        def do_GET(self):
            if not self.allowed_origin():return self.send_json(403,{"error":"origin not allowed"})
            path=urlparse(self.path).path
            if path in ("/health","/status"):self.send_json(200,{"connected":True,"actions":len(watcher.actions)})
            elif path=="/actions":self.send_json(200,list(watcher.actions.values()))
            elif path=="/waiting-list":self.send_json(200,[{"pid":x.pid,"mri_status":x.mri_status,"wait_since":x.wait_since} for x in load_participants(watcher.config["waiting_list_file"])])
            else:self.send_json(404,{"error":"not found"})
        def do_POST(self):
            if not self.allowed_origin():return self.send_json(403,{"error":"origin not allowed"})
            try:
                path=urlparse(self.path).path;data=self.body()
                if path=="/check-now":value={"created":watcher.check(datetime.fromisoformat(data["start"]),datetime.fromisoformat(data["end"]),"MANUAL")}
                elif path.startswith("/actions/") and path.endswith("/prepare"):
                    watcher.prepare(path.split("/")[2],bool(data.get("dry_run")));value={"ok":True}
                elif path.startswith("/actions/") and path.endswith("/outcome"):
                    watcher.outcome(path.split("/")[2],data["status"]);value={"ok":True}
                else:return self.send_json(404,{"error":"not found"})
                self.send_json(200,value)
            except Exception as exc:self.send_json(400,{"error":str(exc)})
        def log_message(self,*_):pass
    ThreadingHTTPServer((host,port),Handler).serve_forever()
