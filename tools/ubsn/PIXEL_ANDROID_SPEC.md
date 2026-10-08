# UBSN Pixel Android App — implementation specification

Status: **APPROVED DIRECTION / SPEC ONLY / NOT DEPLOYED**  
Repository: `Tiutmattiu/Apathy`  
Scope: UBSN Human MRI reservation monitoring and assisted booking for authorized research staff.

## 1. User outcome

The operator needs a Pixel-installable Android app that:

1. Detects *newly released* slots **and** slots reopened by cancellation, using authenticated UBSN availability information.
2. Issues a local Pixel notification immediately after a *verified* slot change, independent of ChatGPT messages.
3. On tapping the notification, opens an already prepared reservation workflow with the project/payment details and matching desired slot preselected where permitted.
4. Leaves reCAPTCHA and final booking confirmation to the operator. The operator may wake at approximately 09:00 and tap once if a reservation is awaiting human confirmation.
5. Gives an explicit notification ahead of each **verified official** release window, and continues watching for unscheduled cancellation openings.

Critical user constraint: popular inventory may disappear within **10 seconds**. This is a performance target for the monitoring-to-ready-to-confirm pipeline; it is **not** a guarantee of a completed reservation. Network latency, authentication, CAPTCHA, and other users can prevent success.

## 2. Existing implementation — reuse, do not duplicate or regress

Read the existing `tools/ubsn/` components before coding:

- `urfms_client.py`: authenticated Playwright session, UBSN calendar request, booking-form preparation;
- `watcher.py`: polling, change detection, PID eligibility matching, action/audit lifecycle;
- `core.py`: slot model, diffing, matching, fixture-only response parser;
- `service.py`: local bridge on `127.0.0.1:8765`;
- `tests/`: unit tests and front-end bridge contract.

**Historical evidence correction (2026-10-09):** The operator had already intercepted the authenticated `reservations.js` GET on 2026-08-23 and supplied the **actual Response body** in an earlier conversation on **2026-08-26 around 13:19**. Previous analysis confirmed a JSON array of reservation events, `AdminReservation`/admin holds, and `className: "unavailable"` time blocks, with `start` and `end` timestamps. Do **not** ask the operator to rediscover the endpoint or repeat the original capture. **Implementation blocker:** `parse_reservations_response()` still accepts only a synthetic `ubsn-usable-intervals-v1` fixture; real event parsing, interval subtraction, validation of eligibility/booking horizon, and live read-only verification have not been implemented. A sanitized regression fixture can be reconstructed from the historical schema, with an optional new capture only when necessary to confirm evolving server behavior. No actual patient or credential data may be committed. Do not claim that current code monitors real UBSN openings.

The current `release_window_start: 08:45`, `release_window_end: 09:15`, and 15-second poll interval are local example settings. **They are not verified official release rules.** The next release date/time must come from official URFMS instructions, a legitimate logged-in UI observation, or an operator-confirmed policy; until then show `RELEASE_SCHEDULE_UNVERIFIED`.

## 3. Architecture and delivery choice

Use a standalone native **Kotlin Android app**, under `tools/ubsn/pixel-app/`, with its own package/build system. Keep the APATHY patient-facing web app untouched.

**Preferred reliable architecture after validation:**

`URFMS authenticated monitor -> canonical slot diff -> event queue -> push transport -> Pixel notification -> deep-linked booking UI -> human CAPTCHA/confirm`

Separate the *monitor* from the *phone UI*:

- A monitoring process capable of sustained authenticated calendar checks produces signed, deduplicated slot events; it must be run on operator-controlled infrastructure where the session can be securely refreshed.
- Pixel receives notifications using a transport compatible with the user's GrapheneOS setup. Evaluate FCM **only if sandboxed Google Play services are available**; provide an alternative such as a supported UnifiedPush distributor or an explicitly connected local service. Never assume Google services are installed.
- Do **not** expose the existing localhost `service.py` unauthenticated to LAN/Internet. A cross-device bridge needs authentication, TLS, authorization, short-lived signed event IDs, and rate limits.
- The phone app must remain usable for viewing upcoming release windows and opening the booking page even when monitoring is disconnected.

**Device-only fallback (explicitly less reliable):** monitor within a user-started foreground service with a persistent status notification, a single authenticated session, and Android-compliant lifecycle/permission handling. Document that Android/GrapheneOS background restrictions, network suspension, battery saver, and SAML expiry can prevent immediate alerts. WorkManager's periodic jobs do **not** meet a sub-10-second detection target. Never promise 24/7 local monitoring without measured reliability.

Before selecting either variant, test network access and authentication from the intended device/host; the URFMS page has not been verified from this environment.

## 4. Authenticated slot ingestion

- Primary evidence: the real authenticated UBSN `reservations.js` Response body provided on 2026-08-26 (historically confirmed as a JSON calendar-event array). Consult this known event schema first; the existing `run.py capture` workflow is available for optional fresh live verification after SAML login.
- Never parse the mere disappearance of a button or navigate through final booking actions to infer availability or reservation success.
- Compare time ranges with their explicit timezone (UBSN/Hong Kong `Asia/Hong_Kong`), duration, instrument and relevant booking eligibility; handle overlapping or partial intervals.
- Preserve the distinction: first-seen opening, reopened slot, disappeared inventory, parse failure, logout, rate limit, and network error.
- First baseline after restart must not produce an unbounded storm of false "new" slots. Persist previous observations and dedupe event IDs across restarts.
- Source refresh should use a session-aware lightweight request when verified; avoid a full SAML/browser navigation on every poll.
- If the running parser does not yet implement the historically observed response structure, status is `PARSER_NOT_IMPLEMENTED` (the existing code currently raises the legacy `NEEDS_REAL_CAPTURE` error); do not emit fabricated availability alerts.

## 5. Scheduling / monitoring / notification

The release calendar must be configurable **from verified rules**: timezone, weekday, local time, lead time, rolling booking horizon, exclusions. Include a generic reminder, e.g., 5 minutes beforehand, only after the actual rule is confirmed.

For unexpected cancellations, monitor outside known release windows as well. Polling periods, adaptive backoff, and jitter must respect university terms and rate limits. Do not use aggressive request flooding, CAPTCHA bypass, credential circumvention, or concurrent reservation races.

Display three independently identifiable states:

- `MONITOR_ACTIVE`: real authenticated parser verified and last success timestamp recent;
- `MONITOR_DEGRADED`: logged out, network blocked, parse changed, app suspended, or missed checks; provide a visible repair action;
- `MONITOR_UNAVAILABLE`: capture/parser/backend not yet configured.

For each genuinely actionable newly available slot, issue an Android high-priority notification with date, start/end, and "Open booking" action. Do not place participant identity, medical history, credentials, access tokens or clinical data in push payloads or lock-screen notification text. Rate-limit duplicate alerts for the same slot; reopenings may alert again.

Test with Pixel screen locked, screen on, VPN enabled, restricted/background mode, reboot, connectivity loss, and SAML expiration. Measure time from response/observable change -> diff -> transport -> notification -> booking form ready, reporting p50/p95/p99 and missed events.

## 6. Booking flow / 10-second target

Use a visible, authenticated reservation page/WebView or verified official browser handoff. Preselect or prefill **only** fields supported by actual site controls and policy: MRI instrument, assistant, project/payment option, date and start/end time. Persist non-secret preferences locally.

A tap on a slot notification should immediately surface the prepared action. The human solves any interactive reCAPTCHA and performs final submission. Verify success only from a reliable official confirmation/booking ID, never from button disappearance.

A generic pre-opening plan: refresh session ahead of the verified release -> prepare user choices -> keep booking UI warm -> detect live slot -> show a selectable action -> human confirmation. If CAPTCHA cannot legally/technically be done in advance, indicate this as a blocking latency rather than claiming an automated 10-second booking.

## 7. Safety / security / privacy

- This repository is **public**. Commit **no** passwords, cookies, SAML tokens, CSRF tokens, screenshots with names, real PID waiting lists, patient details, booking forms containing personal information, or unredacted calendar captures.
- Keep local secrets out of version control using ignore rules and secure credential/session storage (Android Keystore where applicable).
- Never automate or bypass reCAPTCHA; no automatic final booking click without a newly approved explicit design.
- Refuse to label network errors or stale cached intervals as "available."
- Avoid changes to any APATHY scientific data, participant enrollment/status, or production Apps Script.
- Provide explicit app disable/stop and notification-mute controls.

## 8. Implementation phases / acceptance

### Phase A — implement historical event schema and verify live
- [x] Historically intercepted authenticated `reservations.js` request and actual Response body; analyzed in the 2026-08-26 conversation.
- [ ] Reconstruct a safely synthetic, schema-faithful regression fixture from the known event fields; do not commit the unredacted historical payload.
- [ ] Verify actual release policy and public booking horizon with primary-source evidence.
- [ ] Implement parser with schema contract tests for occupied, free, cancellations, overlap, errors, and horizon.
- [ ] Verify against the real site in read-only mode.

### Phase B — reliable notifications
- [ ] Decide device-only vs secure always-on monitor, based on measured network/session behavior.
- [ ] Implement event persistence, dedupe, status/heartbeat, throttling, and degraded-state alarms.
- [ ] Select supported push/local notification transport for GrapheneOS Pixel.
- [ ] Implement and verify foreground/background permissions and user controls.
- [ ] Test release window and cancellation case end-to-end without making a booking.

### Phase C — Pixel booking UI
- [ ] Create buildable Android Studio project + package/signing instructions.
- [ ] Add logged-in booking UI, notification deep links, stored non-secret preferences.
- [ ] Confirm selectors and workflow on authenticated live booking page.
- [ ] Keep CAPTCHA and final confirmation human-controlled.
- [ ] Produce a versioned, installable test APK and test on a real Pixel.

### Phase D — timed acceptance
- [ ] Show time to detect/notify/open prepared action under observed network conditions; benchmark 10-second target.
- [ ] Test session expiry, reCAPTCHA, calendar changes, lock screen, VPN, notifications denied, offline and resume cases.
- [ ] Confirm no false-success claims, leaked credentials, spam polling or duplicate slot alerts.
- [ ] Have the operator validate at least one real opening safely before saying `PRODUCTION_READY`.

## 9. Current status to display plainly

**SPEC PUBLISHED — APP NOT YET BUILT — REAL SLOT MONITOR NOT VERIFIED — RELEASE TIME UNKNOWN.**

The historical response schema is already known: event-array reservations / admin holds / unavailable intervals. The next engineering work is implementing the real parser and tests, plus independently verifying the official release schedule and booking horizon. Neither an Android APK nor a live notification service is produced by publishing this specification alone.
