# APATHY — Current Codex Handoff Snapshot

> **SUPERSEDED FOR NEW WORK (2026-09-03).**
>
> Read `APATHY_CORE_PIPELINE_HANDOFF_20260903.md` first. It restores the authoritative core data/product contract and contains newer read-only Production findings, including the correct Boss-admission rule (`Inclusion !== n`), the current recurrent Step-3 Spreadsheet-timeout verdict, current frontend payload-hygiene evidence, and the corrected MRIadmin authority.
>
> This 2026-09-01 file is retained as a historical interruption snapshot only. Do not restart its old CGT diagnosis or treat phase-specific rollback/Operations scaffolding as the APATHY core architecture.

Date: 2026-09-01

Purpose: concise historical current-state handoff for Codex at the time both active Codex windows hit usage limits.

Privacy: no participant-identifiable values, private workbook contents, credentials, tokens, Script IDs, or reservation capture payloads belong here.

## 0. Codex interruption / resume point at 2026-09-01

Both active Codex windows hit their usage limit before completing their current narrow tasks. These notes describe the interruption at that time; newer runtime state is in `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`.

### Mainline repair window — interrupted mid-diagnosis

Last confirmed progress before the interruption:

- scope remained limited to CGT, historical MRI publication, shared diagnosis, and Output/Admin;
- Production mirror was refreshed and the permitted files were clean before diagnosis;
- the code-side CGT cause had been narrowed to Result projection;
- Codex then switched to read-only current Google Sheet evidence to determine the actually affected participant set without guessing;
- no final root cause, generic fix, Incremental PID set, Output rerender, or verification result was reported before the usage limit was reached.

**Newer note:** substantive CGT values are visible again in current Production. Do not reopen broad CGT repair merely because this historical resume point says they were blank.

### Participant-report window — interrupted mid-print diagnosis

Last confirmed progress before the interruption:

- Production `report.html` print path was being inspected;
- preview rendering already worked;
- investigation was limited to print-button binding / Apps Script iframe print behavior;
- Codex explicitly intended to keep the repair inside the print function and not change payloads, metric bindings, or backend scientific calculation;
- no deployed print fix or verified print/save-PDF result was reported before the usage limit was reached.

This remains a valid narrow resume point for the separate report Codex window unless newer report runtime evidence supersedes it.

## 1. Historical migration state at this snapshot

Historical migration repair had already completed these steps:

- six explicit historical Backfill evidence values were created with provenance `historical_legacy_boss_backfill`;
- HADS historical totals stayed summary-only; no HADS items were fabricated;
- participant-scoped Incremental ran for 38 affected PIDs: 38 success, 0 failed, elapsed 4m53s;
- `buildApathyOutput()` completed successfully;
- five of the six targeted historical values published;
- one historical MRI-date value remained blank downstream.

At this snapshot a post-repair CGT regression was visible. That observation is now stale; use the 2026-09-03 handoff for current runtime state.

Admin rule update from this period remains valid:

- withdrawal/退出 status alone is non-actionable;
- receipt/archive alone is non-actionable;
- only unresolved `payment_status` may create a payment issue.

## 2. Incremental status

The older 2026-08-27 statement that Incremental is disabled is stale.

Current Production has a real participant-scoped Incremental path:

- PID-scoped Event/Participant/Result/Decision refresh;
- targeted Boss/Admin update;
- checked Admin actions can execute through the existing menu path;
- no silent Full fallback.

Known issue: runtime is still slower than desired. Do not create a second scientific engine to optimize it.

## 3. Admin / Boss diagnosis status

Admin uses one participant per row and aggregates participant problems.

Desired semantics remain:

- whole source absent -> concise whole-source problem;
- partial source -> exact missing/invalid item detail;
- accepted evidence complete but downstream blank -> system/publication issue, no re-entry;
- resolved fields disappear from active problem text;
- non-applicable -> non-actionable;
- unsupported semantics -> UNKNOWN rather than speculative action.

Boss diagnosis colors:

- grey = expected/non-applicable;
- yellow = genuine source/data gap;
- orange = authority/review gate;
- red = downstream/system/publication break;
- purple = identity unresolved.

Reconcile presentation only after scientific values are correct. Diagnosis is an explanatory/operations layer, not research-data authority.

## 4. Participant-facing report

This is the report handed to participants, not SPSS/R output and not staff screening summary.

The single-page A4 design is fixed:

- 9 metrics only;
- sections: 認知表現 / 動機與情緒 / 決策表現;
- metric name + one short Traditional-Chinese explanation + horizontal bar + simple label;
- no percentile number shown;
- no cohort N shown;
- longer bar = better relative performance after internal direction normalization.

Production implementation at this snapshot:

- `helper.js`: menu `个人报告 → 生成参与者报告`;
- `report_backend.js`: report payload / PID validation / comparative normalization;
- `report.html`: shared single + batch renderer, one A4 per participant, print/save control.

Current field bindings at this snapshot:

- Forward Digit Span -> `For_DGS` (higher better)
- Backward Digit Span -> `Back_DGS` (higher better)
- HK-MoCA -> `MoCA_Raw` (higher better)
- cognitive/social motivation -> `GAS_Social` (reverse)
- emotional response/expression -> `GAS_Emotion` (reverse)
- spontaneous behavioral activation -> `GAS_Behaviour` (reverse)
- CGT speed -> `CGT_Mean_Deliberation_RT_MS` (reverse)
- CGT quality -> `CGT_Prop_Best_Choices` (higher better)
- CGT risk adjustment -> `CGT_Risk_Adjustment` (direction not yet confirmed; participant output remains `待確認`)

Known report defect: preview renders, but `列印／儲存PDF` does not produce a usable flow from Apps Script HTML. Keep the separate report Codex task limited to that print path.

## 5. UBSN Human MRI assistant

UBSN is a separate local staff module under `tools/ubsn/` and must not be mixed into core backend repair work.

At this snapshot:

- real `reservations.js` parsing was implemented;
- free intervals were derived from reservation/admin-hold/unavailable blocks;
- cancelled reservations did not block;
- parser failed closed on empty/unrecognized responses;
- coverage-aware diff prevented false NEW_SLOT alerts;
- persistent helper mode existed;
- CAPTCHA and final booking confirmation remained human.

For current MRIadmin authority and waiting-source rules, use `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`, `MRI_ADMIN_WORKFLOW_SPEC.md`, and `tools/ubsn/BACKEND_WAITING_CONTRACT.md`.

## 6. Frontend

`FRONTEND_REQUIREMENTS_LATEST.md` is a requirements baseline, not a completion report.

The payload/evidence-hygiene defect is now proven from current public `app.js`: global derived calculation plus broad serialization of shared `ST.answers` can emit non-owner/default evidence. Treat this as active correctness work after the current core runtime is restored.

## 7. Deferred / do not resurrect automatically

- controlled staged Step3/Step4 rollback proof as a standalone release exercise;
- broad legacy cleanup;
- global redesigns of Admin/Trace;
- broad CGT re-audit based only on this stale snapshot.

## 8. Agent division

Use the newer 2026-09-03 handoff for current division. Preserve the two existing Codex threads:

- mainline Codex: only the next already-reduced Production backend repair slice;
- report Codex: report print/save-PDF path only.

ChatGPT should inspect and reduce problems read-only before spending Codex quota. Heavy mechanical offline scans are suitable for Copilot. Human operator owns genuine authority decisions and minimal UI/runtime actions.
