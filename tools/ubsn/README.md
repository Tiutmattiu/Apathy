# UBSN Human MRI booking assistant

Local staff tool only. It keeps one visible Playwright profile, passively reads `reservations.js`, matches newly usable intervals to APATHY waiting participants, and prefills the known booking form. CAPTCHA and final submission are always human.

## Current checkpoint

A real Human MRI `reservations.js` capture has now been observed and the parser is no longer fixture-only.

Confirmed live response shape:

- top-level JSON array;
- non-cancelled Human MRI reservation rows block their `start`–`end` interval;
- Admin Hold rows use the same Human MRI blocking semantics;
- rows with `className: "unavailable"` block non-bookable calendar regions;
- cancelled Human MRI reservation rows do not block;
- usable time is the complement of the merged blocking intervals inside the exact requested calendar window.

The real capture itself is private and must not be committed because reservation rows may contain staff/account information.

The parser fails closed when the live array contains no recognized blocking rows; it never interprets an empty/unrecognized response as “the entire MRI calendar is free”.

The frontend already contains a staff UBSN route that talks to the local helper on `127.0.0.1:8765`.

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

## Daily workflow: log in once, keep the helper running

Do **not** use `run.py check` as the normal repeated workflow. `check` is a one-shot diagnostic command: it launches the browser, performs one check, and then closes the browser process. A later `check` therefore may require SAML again even though the Playwright profile is persistent.

Start the persistent helper once instead:

```powershell
.\.venv\Scripts\python.exe run.py serve --monitor
```

At startup it opens the visible browser and establishes UBSN authentication once. Keep that PowerShell window and browser open. The APATHY staff website's `立即檢查UBSN` action then calls the existing local `/check-now` endpoint and reuses the same authenticated browser session rather than starting another login.

With `--monitor`, the helper also performs background checks using the configured release-window and normal polling intervals. Without `--monitor`, manual checks from the APATHY website still reuse the same browser session.

If URFMS itself expires the server-side session later, one new SAML authentication may still be required, but normal repeated checks during the running helper session should not restart login every time.

## Capture / inspect a response when live behavior changes

```powershell
.\.venv\Scripts\python.exe run.py capture --start 2026-09-01T00:00:00+08:00 --end 2026-09-08T00:00:00+08:00
```

The command saves only the response body, not request headers, cookies, CSRF tokens, or passwords.

Privacy-safe structure inspection remains available:

```powershell
.\.venv\Scripts\python.exe run.py inspect-capture --file .\captures\reservations-YYYYMMDD-HHMMSS.txt
```

It reports field names/structure and scalar types without echoing scalar values.

## Real parser behavior

`Watcher.check(start, end)` passes the exact requested bounds into `parse_reservations_response()`.

The parser:

1. collects confirmed blocking rows;
2. clips them to the requested window;
3. merges overlapping/adjacent blocks;
4. returns every remaining free interval;
5. lets participant matching enforce date, weekday, time-window and minimum-duration rules.

The interval diff is coverage-aware. If a new reservation merely shrinks/splits an already-free interval, that does **not** create a false `NEW_SLOT` alert. If previously blocked time becomes free, the expanded free interval becomes actionable.

## Run tests and service

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
.\.venv\Scripts\python.exe run.py serve --monitor
```

The local bridge listens on `127.0.0.1:8765`: `GET /health`, `GET /status`, `GET /actions`, `GET /waiting-list`, `POST /check-now`, `POST /actions/{id}/prepare`, and `POST /actions/{id}/outcome`.

## Reused and replaced from UBSN.txt

Reused: SAML page, assistant selection, payment source, project/reservation note, date/time selectors, visible Playwright flow, `#confirm_reservation`, logging, and human CAPTCHA/final confirmation.

Replaced: browser/login per monitor cycle, availability probing by clicking confirmation, URL/button-disappearance success inference, and HTML dumps that can contain secrets.

## Remaining live-dependent work

- confirm the persistent `serve --monitor` workflow removes repeated login friction during a normal work session;
- confirm timezone/date behavior over several manual checks;
- confirm assistant-selection row text and session-expiry recovery;
- confirm booking field IDs/options and `#confirm_reservation` against the current live page during one dry preparation;
- replace the example waiting-list JSON with the intended APATHY staff data source once that source contract is explicit;
- keep CAPTCHA and final submission human.
