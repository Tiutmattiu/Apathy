# APATHY FAST BUILD MODE — MRIadmin operational loop

Run **after** the current CGT/P065/diagnosis repair finishes. Do not overlap that active repair.

## Established facts — do not re-audit

- Screening already collects MRIadmin preference / assistance data.
- The MRIadmin feature was never completed, so that information was operationally swallowed.
- Staff compensated by manually maintaining Contactlist MRI notes and manual MRI booking/list information.
- Those manual surfaces are workarounds, **not inputs/authorities for the new MRIadmin scheduling engine**.
- The correct direction is: **Screening MRIadmin -> Admin task -> UBSN match -> human-confirmed booking -> write MRI Time**.
- UBSN local calendar monitoring is already live and working; do not modify the UBSN calendar parser in this task.
- Public `tools/ubsn/BACKEND_WAITING_CONTRACT.md` defines the consumer contract.
- Withdrawal alone is non-actionable and must not create an Admin task.

## One deliverable

Finish the first usable MRIadmin operations path from Screening data.

For each resolved PID:

1. read accepted/current MRI-related preference/assistance information originating from `screening_core` / Screening MRIadmin;
2. preserve month + weekday + AM/PM combinations truthfully;
3. derive a minimal scheduling state from current APATHY workflow state — **do not read Contactlist or manually maintained MRI lists to decide who is waiting**;
4. surface the MRI task in Admin;
5. expose the same WAITING participants through the read-only UBSN waiting endpoint;
6. add the narrow confirmed-booking path that records BOOKED state/evidence and writes the slot to `MRI Time` after human confirmation.

Use only these states:

- `WAITING` — MRI scheduling is required and usable Screening MRIadmin preference exists;
- `PREFERENCE_MISSING` — MRI scheduling is required but preference is absent/empty;
- `BOOKING_READY` — UBSN candidate exists, not yet human-confirmed;
- `BOOKED` — confirmed booking recorded by APATHY;
- `NOT_ACTIONABLE` — no staff MRI scheduling action required.

Do not invent re-MRI state from Contactlist. Re-MRI requires an explicit APATHY evidence/workflow path if implemented later.

## Admin behavior

Keep one PID per Admin row and preserve all existing non-MRI problems.

Add MRI text only for:

- `WAITING`: `需要預約 MRI` + concise Screening MRIadmin preference/assistance summary;
- `PREFERENCE_MISSING`: `需要補 MRI 可用時間`;
- `BOOKING_READY`: concise `UBSN 有可用時段，待完成預約` if the current integration exposes it.

Do not create an MRI Admin problem for `BOOKED` or `NOT_ACTIONABLE`.

Blank preference is never unrestricted availability.

## Screening MRIadmin authority

Use the existing identity-resolved accepted/current Screening MRIadmin evidence. Do not build a second phone/name identity matcher.

Preserve structured availability. Example: Tuesday AM + Thursday PM must stay two distinct windows. Do not widen to Tue/Thu all day.

The backend waiting endpoint should emit `availability_windows` as specified in `tools/ubsn/BACKEND_WAITING_CONTRACT.md`.

## MRI Time write

`MRI Time` is a **write/output target**, not an upstream scheduling source for this feature.

Add/route one narrow human-confirmed booking function conceptually:

`recordMriBooking(pid, start, end, admin, remark, source)`

Only execute after the UBSN human CAPTCHA/final booking has actually succeeded and outcome `BOOKED` is explicitly recorded.

The booking path must:

- persist an APATHY booking outcome/state/evidence so the Admin task can resolve;
- resolve Subject No. through existing Registry/participant identity authority;
- write the confirmed booking to `MRI Time` using the existing sheet convention;
- be idempotent for the same participant + start + end;
- not write Contactlist;
- not rewrite Screening Raw;
- not change scientific scoring/Result/Boss logic.

## Constraints

- no Contactlist read for MRI scheduling state;
- no manual MRI-list read for MRI scheduling state;
- no participant hardcoding;
- no Raw rewriting;
- no new scoring/science rules;
- no Full;
- no broad repo/doc audit;
- no rollback exercise;
- do not change current CGT/P065 repair paths unless that repair is already complete.

## Verification

After deployment, verify only the narrow real workflow:

1. one resolved participant with Screening MRIadmin preference becomes WAITING and appears in Admin;
2. the UBSN waiting endpoint exposes the same participant/windows;
3. one missing-preference participant becomes PREFERENCE_MISSING rather than unrestricted;
4. after one explicit human-confirmed BOOKED outcome, APATHY writes the booking into `MRI Time` and that participant's MRI Admin task resolves.

Stop. Do not add Contactlist synchronization or a second manual waiting-list workflow.
