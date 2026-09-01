# UBSN Human MRI booking assistant

Local staff tool only. It keeps one visible Playwright profile, passively reads `reservations.js`, matches newly usable intervals to APATHY waiting participants, and prefills the known booking form. CAPTCHA and final submission are always human.

## Current checkpoint

A real Human MRI `reservations.js` capture has been observed and the parser is no longer fixture-only.

Confirmed live response shape:

- top-level JSON array;
- non-cancelled Human MRI reservation rows block their `start`–`end` interval;
- Admin Hold rows use the same Human MRI blocking semantics;
- rows with `className: "unavailable"` block non-bookable calendar regions;
- cancelled Human MRI reservation rows do not block;
- usable time is the complement of the merged blocking intervals inside the requested calendar window.

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

### Live 422 finding

The persistent helper authenticated correctly, but the first calendar requests returned HTTP 422. Normalizing the request window to whole Hong Kong calendar days was necessary for consistent parser semantics but did **not** by itself remove the 422.

The calendar request now executes through same-origin `fetch()` inside the authenticated booking page instead of through Playwright's separate API request client. This mirrors the live browser/XHR context more closely (same page session, origin/referrer and XHR-style headers).

The helper first sends the confirmed ISO Hong Kong bounds. If Production explicitly rejects that request with HTTP 422, it retries once with the same calendar bounds as date-only `YYYY-MM-DD` values, which is a common FullCalendar request format. Response bodies remain local and are not logged.

## One-shot diagnostics

A manual `check` prints both newly created actions and a `status.last_check` summary:

```powershell
.\.venv\Scripts\python.exe run.py check `
  --start 2026-09-01T00:00:00+08:00 `
  --end 2026-09-08T00:00:00+08:00
```

The summary distinguishes:

- `free_interval_count`: calendar gaps derived from UBSN;
- `waiting_participant_count`: local waiting-list participants;
- `matchable_interval_count`: free intervals that actually overlap at least one waiting participant's constraints;
- `matchable_participant_count`: unique participants who can use at least one current free interval;
- `calendar_change_count`: availability changes relative to the previous successful check in that helper process;
- `created_action_count`: genuinely new actionable recommendations created by this check.

This means an empty `created` list is no longer ambiguous. It can mean “no free interval”, “free intervals exist but nobody currently matches”, or “matching availability already existed and therefore did not create a duplicate action”.

The persistent helper exposes the same information through `GET /status`, and `POST /check-now` returns both `created` and `status`.

## Participant-window matching

Calendar free intervals are often wider than the participant's usable time window. Matching therefore uses **overlap**, not the old rule that the entire calendar gap had to fit inside participant availability.

For each waiting participant the helper finds the earliest interval inside:

- participant earliest/latest date;
- allowed weekday;
- earliest/latest daily time;
- the current UBSN free interval;
- minimum MRI duration.

The booking action is clipped to that participant-compatible interval. When `minimum_duration` is positive, the prepared booking uses exactly that duration rather than filling the whole free calendar gap.

Example: a calendar gap of 08:00–13:00 and participant availability 09:30–12:00 with a 90-minute requirement produces a prepared candidate of **09:30–11:00**, not 08:00–13:00.

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

`Watcher.check(start, end)` first converts caller timestamps to a whole-day Hong Kong calendar window, then uses that same normalized window for both the live request and parser complement calculation.

The parser:

1. collects confirmed blocking rows;
2. clips them to the normalized HK calendar window;
3. merges overlapping/adjacent blocks;
4. returns every remaining free interval;
5. lets participant matching intersect those intervals with participant date/weekday/time/duration constraints.

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

- rerun `serve --monitor` with the browser-context calendar request and confirm whether ISO or date-only bounds are accepted;
- confirm the persistent helper removes repeated login friction during a normal work session;
- use `status.last_check` to inspect real free/matchable intervals over several live checks;
- confirm assistant-selection row text and session-expiry recovery;
- confirm booking field IDs/options and `#confirm_reservation` against the current live page during one dry preparation;
- replace the example waiting-list JSON with the intended APATHY staff data source once that source contract is explicit;
- keep CAPTCHA and final submission human.
