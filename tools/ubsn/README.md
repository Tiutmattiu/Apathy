# UBSN Human MRI booking assistant

Local staff tool only. It keeps one visible Playwright profile, captures/passively reads `reservations.js`, matches usable intervals to APATHY Registry PIDs, and prefills the known booking form. CAPTCHA and final submission are always human.

## Current checkpoint

`capture` works now. **Historical evidence correction (2026-10-09): the operator already provided a real `reservations.js` Response body on 2026-08-26 around 13:19 in an earlier conversation.** It was analyzed as a calendar-event JSON array containing ordinary reservations, admin holds (`AdminReservation`), and `className: "unavailable"` blocks. The historical response itself is not committed here due to privacy; this historical observation needs to be translated into a sanitized parser fixture and implementation. **Current `core.py` still accepts only synthetic `ubsn-usable-intervals-v1` fixtures and raises `NEEDS_REAL_CAPTURE` on real responses.** Thus parser implementation and authenticated runtime verification remain unfinished; asking the operator to repeat the initial discovery as a prerequisite is incorrect. Do not mislabel the existing parser as production-ready.

## Setup (Windows PowerShell)

```powershell
cd C:\Users\Lenovo\Github\Apathy\tools\ubsn
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m playwright install chromium
Copy-Item config.example.json config.local.json
Copy-Item waiting-list.example.json waiting-list.local.json
```

Edit only the local JSON copies. Do not put credentials in them. Optional credentials use `URFMS_NET_ID` and `URFMS_PASSWORD` environment variables; otherwise complete SAML in the visible browser.

## Optional fresh capture for integration verification

```powershell
.\.venv\Scripts\python.exe run.py capture --start 2026-08-23T00:00:00 --end 2026-08-30T00:00:00
```

The command prints the saved absolute path. It saves only the response body, not request headers, cookies, CSRF tokens, or passwords.

## Run tests and service

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
.\.venv\Scripts\python.exe run.py serve
```

The local bridge listens on `127.0.0.1:8765`: `GET /health`, `GET /status`, `GET /actions`, `GET /waiting-list`, `POST /check-now`, `POST /actions/{id}/prepare`, and `POST /actions/{id}/outcome`.

## Reused and replaced from UBSN.txt

Reused: SAML page, assistant selection, payment/project/date/time selectors, visible Playwright flow, `#confirm_reservation`, logging, and human CAPTCHA/final confirmation.

Replaced: `run_monitor()` browser/login per cycle, `try_slot()` availability probing via confirmation, URL/button disappearance success inference, and HTML dumps that can contain secrets.

Fragile/needs live confirmation: assistant row text, booking field IDs/options, `#confirm_reservation`, session-expiry behavior, timezone, and the exact calendar response semantics.

## Pixel Android app (planned)

See [PIXEL_ANDROID_SPEC.md](PIXEL_ANDROID_SPEC.md) for the approved Pixel/GrapheneOS monitoring, cancellation-alert, notification, and human-confirmation design. The spec is published; no APK or live alert service has been built yet. Official release scheduling remains unverified and real `reservations.js` parser implementation is still pending despite the historical capture.
