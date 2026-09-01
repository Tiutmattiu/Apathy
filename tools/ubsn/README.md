# UBSN Human MRI booking assistant

Local staff tool only. It keeps one visible Playwright profile, captures/passively reads `reservations.js`, matches usable intervals to APATHY Registry PIDs, and prefills the known booking form. CAPTCHA and final submission are always human.

## Current checkpoint

`capture` works now. The exact live `reservations.js` response schema has not yet been confirmed, so production parsing deliberately raises `NEEDS_REAL_CAPTURE`. Test fixtures are labeled fixtures and are not presented as real UBSN data.

The frontend already contains a staff UBSN route that talks to the local helper on `127.0.0.1:8765`.

A privacy-safe `inspect-capture` command is now available so the next real capture can be reconciled without printing participant/booking values into chat or public logs. It reports only JSON structure, field names, collection lengths and scalar types.

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

Use the actual date window you want to inspect:

```powershell
.\.venv\Scripts\python.exe run.py capture --start 2026-09-01T00:00:00+08:00 --end 2026-09-08T00:00:00+08:00
```

The command prints the saved absolute path. It saves only the response body, not request headers, cookies, CSRF tokens, or passwords.

## Inspect the capture without exposing values

```powershell
.\.venv\Scripts\python.exe run.py inspect-capture --file .\captures\reservations-YYYYMMDD-HHMMSS.txt
```

This command does **not** launch the browser and does not echo scalar values from the capture. Its output is safe to use for schema reconciliation.

After one real schema has been confirmed, replace the current fixture-only parser with the narrow real mapping. Do not guess availability semantics before the capture proves them.

## Run tests and service

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
.\.venv\Scripts\python.exe run.py serve
```

The local bridge listens on `127.0.0.1:8765`: `GET /health`, `GET /status`, `GET /actions`, `GET /waiting-list`, `POST /check-now`, `POST /actions/{id}/prepare`, and `POST /actions/{id}/outcome`.

## Reused and replaced from UBSN.txt

Reused: SAML page, assistant selection, payment/project/date/time selectors, visible Playwright flow, `#confirm_reservation`, logging, and human CAPTCHA/final confirmation.

Replaced: `run_monitor()` browser/login per cycle, `try_slot()` availability probing via confirmation, URL/button disappearance success inference, and HTML dumps that can contain secrets.

## Remaining live-dependent work

- confirm the exact `reservations.js` response shape and what counts as a genuinely usable interval;
- confirm timezone/date semantics;
- confirm assistant-selection row text and session-expiry behavior;
- confirm booking field IDs/options and `#confirm_reservation` against the live page;
- replace the local example waiting list with the intended APATHY staff data source only after the current source contract is explicit;
- keep CAPTCHA and final submission human.
