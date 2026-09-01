# APATHY FAST BUILD MODE — MRIadmin staff visibility first

Run **after** the current CGT/P065/diagnosis repair finishes. Do not overlap that active repair.

## Established facts — do not re-audit

- Screening already collects MRIadmin preference data.
- Staff mainly work from Admin, Contactlist, and `MRI Time`, so Screening MRI preference is currently operationally invisible.
- `MRI Time` is the booking ledger and must be read as scheduling evidence.
- Contactlist has some MRI operational fields but is not the primary availability source.
- UBSN local calendar monitoring is already live and working; do not modify the UBSN calendar parser in this task.
- Public `tools/ubsn/BACKEND_WAITING_CONTRACT.md` defines the consumer contract.
- Withdrawal alone is non-actionable and must not create an Admin task.

## One deliverable

Make MRI scheduling needs visible to staff from current data.

For each resolved PID, derive a small MRI scheduling state from:

1. accepted/current Participant MRIadmin preference from Screening;
2. current booking evidence in `MRI Time`;
3. only the necessary structured Contactlist MRI fields such as inclusion / existing booking / re-MRI where authoritative.

Use these states only:

- `BOOKED` — valid current MRI booking exists;
- `WAITING` — MRI is needed, usable preference exists, no valid booking;
- `PREFERENCE_MISSING` — MRI is needed but availability preference is absent/empty;
- `RESCHEDULE` — explicit re-MRI/rebooking need with no replacement booking;
- `NOT_ACTIONABLE` — no staff scheduling action required.

## Admin behavior

Keep one PID per Admin row and preserve all existing non-MRI problems for that participant.

Add MRI problem text only for:

- `WAITING`: `需要預約 MRI` plus concise preference summary;
- `PREFERENCE_MISSING`: `需要聯絡參加者補 MRI 可用時間`;
- `RESCHEDULE`: `需要重新預約 MRI` plus concise preference summary if available.

Do not create an MRI Admin problem for `BOOKED` or `NOT_ACTIONABLE`.

Do not treat blank MRI preference as unrestricted availability.

## MRI Time read

Read `MRI Time` header-first, not fixed column numbers. Resolve its participant/subject identifier through the existing identity authority rather than inventing a second identity matcher.

This task is **read-only with respect to MRI Time and Contactlist**. Do not add booking writeback yet.

## Constraints

- no participant hardcoding;
- no Raw rewriting;
- no new scoring/science rules;
- no Full;
- no broad repo/doc audit;
- no rollback exercise;
- do not change current CGT/P065 repair paths unless that repair is already complete;
- output-only refresh is allowed if needed to display the new Admin state.

## Verification

After deployment, use read-only Production evidence to verify only a few representative states:

- one participant with preference + no booking -> WAITING/Admin task;
- one with booking -> no MRI scheduling task;
- one with missing preference -> PREFERENCE_MISSING;
- one re-MRI case if present.

Stop after the read model and Admin visibility work. MRI Time automatic writeback is the next separate task.
