# UBSN Human MRI booking assistant

Local staff tool only. It keeps one visible Playwright profile, captures/passively reads `reservations.js`, matches usable intervals to APATHY Registry PIDs, and prefills the known booking form. CAPTCHA and final submission are always human.

## Current checkpoint

`capture` works now. The exact `reservations.js` body has not been supplied, so production parsing deliberately raises `NEEDS_REAL_CAPTURE`. Test fixtures are labeled fixtures and are not presented as real UBSN data.

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

## Capture the real response

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
