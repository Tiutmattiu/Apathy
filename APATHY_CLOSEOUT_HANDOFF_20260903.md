# APATHY Closeout Handoff — 2026-09-03

Status: **LATEST NARROW CLOSEOUT DELTA**

Read this after `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`. This file records only newly reduced closeout findings so future agents do not repeat historical migration audits or broad Production investigation.

Privacy: no participant identifiers, names, phone numbers, clinical payloads, Script/Spreadsheet IDs, or private workbook rows belong here.

## 1. Historical migration is not an active investigation

The historical Boss forensic audit, true-source-gap recovery, formal Backfill, affected-participant Incremental repair, and broad evidence tracing are already complete.

Do not redo:

- historical old-Boss comparison;
- the 128-cell root-cause audit;
- the six true source-gap decisions/Backfill records;
- the previous affected-participant repair batch;
- broad LEDD/P185/CGT historical tracing.

Substantive CGT values are currently visible again in Production. Do not reopen CGT without new evidence.

## 2. Remaining historical MRI publication tail — newly reduced

Read-only Production inspection now proves the remaining historical MRI date is already present in both:

```text
resolved Participant current state
-> Result A `mri_date_1`
```

The current reviewed Result source also projects Boss `MRI_Date` from Result A `mri_date_1` before falling back to Registry MRI date.

However the current visible Boss still lacks that value.

Therefore the remaining case is **not an unresolved historical-source, Backfill, Participant, or Result-A problem**. The first next action is a participant-scoped Result/Boss republish using the already deployed Incremental entrypoint, followed by read-only Boss verification.

Do not add Backfill. Do not run Full. Do not modify the MRI mapping merely because visible Boss is stale.

If a targeted Incremental republish still fails to publish the date, compare the live deployed Result source with the reviewed current mirror before changing code.

## 3. Admin no-action rows — exact generic root cause

Current Production contains active Admin rows whose shared classification is:

```text
Action_Class = TRACE_ONLY_NO_ACTION
```

while the visible row still tells staff to inspect/re-enter/follow up data.

The current `output.js` cause is direct: the local `add(...)` helper inside `apathyOutputAdmin_()` calls `apathyDiagnosisAdminAction_(code)` but unconditionally pushes the row into active Admin regardless of `classification.action_class`.

Required narrow behavior:

```text
TRACE_ONLY_NO_ACTION -> do not emit an active Admin row
```

This is not an Admin redesign. It makes the active inbox obey the existing shared classification.

## 4. Withdrawal / non-inclusion Admin notification — exact generic root cause

The current Output source still contains a branch that can create `NON_INCLUDED_CONTACT_CLOSEOUT` from Contactlist Remarks when `Inclusion=n`.

Current product policy supersedes that behavior:

```text
Inclusion=n
-> stop research workflow actions
-> preserve withdrawal/non-inclusion state
-> do not create an Admin reminder/action merely for withdrawal/non-inclusion or its closeout text
```

Required narrow change: the `Inclusion=n` branch should return without emitting a closeout Admin row.

Do not alter the separate Boss-admission rule: `Inclusion=n` excludes; blank Inclusion does not itself exclude.

## 5. Boss diagnosis/coloring

Do not infer a new diagnosis architecture from Admin rows. Current Output calls the shared Boss-scan diagnosis layer after Admin write.

The exact current private diagnosis implementation must be used before changing color/note behavior. If that source is not available to ChatGPT, obtain only that current file/function rather than asking Codex to audit the project.

Accepted semantic vocabulary remains:

- grey = expected / non-applicable;
- yellow = genuine source/data gap;
- orange = legitimate authority/review gate;
- red = accepted evidence exists but downstream publication/system broke;
- purple = identity unresolved;
- numeric zero is valid, not blank;
- unsupported semantics remain UNKNOWN rather than speculative staff action.

## 6. Current code action split

### ChatGPT owns

- read-only Production checks;
- evidence/source reconciliation;
- GitHub handoff/status;
- deciding whether a defect already has enough evidence for a surgical patch;
- post-deployment read-only verification.

### Mainline Codex owns only implementation/deployment

The next private backend patch should be limited to the already-proven Output semantics:

1. suppress active Admin rows classified `TRACE_ONLY_NO_ACTION`;
2. suppress withdrawal/non-inclusion-only closeout Admin rows.

No audit, historical tracing, CGT work, frontend work, MRIadmin redesign, Report work, Full run, or new persistent tables.

The remaining historical MRI date should first be tested by the existing participant-scoped Incremental republish rather than by speculative code modification.

### Separate Report Codex thread

Only the existing Apps Script participant-report print/save-PDF path.

## 7. Other unfinished product work remains unchanged

After the narrow closeout above:

1. reconcile remaining Boss diagnosis/color presentation using the actual current diagnosis source;
2. fix the already-proven frontend route-owned payload hygiene defect;
3. implement MRIadmin Participant-state -> `WAITING` / `PREFERENCE_MISSING` / `NOT_ACTIONABLE` -> Admin + UBSN waiting producer;
4. later implement human-confirmed `BOOKED` -> narrow MRI Time link/append;
5. close participant-report print behavior in its separate thread;
6. treat Step-3 recurrent Spreadsheet timeout as a separate runtime/performance problem, not as a reason to reopen historical scientific work;
7. perform Incremental performance / technical-materialization contraction only after correctness and daily operations are stable.

## 8. Operating rule

Do not send Codex an investigation prompt when ChatGPT can establish the fact from current source/workbook/history. Give Codex one already-reduced implementation change, then stop and verify the result read-only.
