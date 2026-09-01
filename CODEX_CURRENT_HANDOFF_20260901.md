# APATHY — Current Codex Handoff Snapshot

Date: 2026-09-01

Purpose: concise current-state handoff for Codex. This file is newer than the 2026-08-27 public status on `codex/ops-vnext-vertical-slice` and should be read before starting new APATHY work.

Privacy: no participant-identifiable values, private workbook contents, credentials, tokens, Script IDs, or reservation capture payloads belong here.

## 1. Main Production repair currently in progress

Historical migration repair already completed these steps:

- six explicit historical Backfill evidence values were created with provenance `historical_legacy_boss_backfill`;
- HADS historical totals stayed summary-only; no HADS items were fabricated;
- participant-scoped Incremental ran for 38 affected PIDs: 38 success, 0 failed, elapsed 4m53s;
- `buildApathyOutput()` completed successfully;
- five of the six targeted historical values published;
- P065 `MRI_Date` still has accepted upstream historical Backfill evidence but remains blank in Boss.

A new post-repair scientific regression is also visible:

- many substantive CGT Boss values that existed before the repair are now blank;
- S090–S101 is a visible affected cohort and must be used as an inspection starting point, not hardcoded repair scope;
- inspect the three substantive CGT fields: `CGT_Prop_Best_Choices`, `CGT_Mean_Deliberation_RT_MS`, `CGT_Risk_Adjustment`;
- do not create CGT Backfill or copy historical Boss values;
- `CGT_Complete` must not erase otherwise valid substantive CGT metrics.

Current repair order:

1. restore substantive CGT publication generically from accepted evidence;
2. fix P065 MRI-date publication generically;
3. rerender/reconcile Boss diagnosis colors/notes after scientific values are correct;
4. rerender/reconcile Admin prompts after scientific values are correct.

Admin rule update:

- withdrawal/退出 status alone is no longer actionable;
- preserve withdrawal evidence/state but suppress withdrawal-only Admin reminders/actions;
- receipt/archive alone is also non-actionable;
- only unresolved `payment_status` may create a payment issue.

Do not run Full. Do not redo the 38-PID batch. Use Incremental only for actually affected PIDs.

## 2. Incremental status

The 2026-08-27 public statement that Incremental is disabled is stale.

Current Production has a real participant-scoped Incremental path:

- PID-scoped Event/Participant/Result/Decision refresh;
- targeted Boss/Admin update;
- checked Admin actions can execute through the existing menu path;
- no silent Full fallback.

Known issue: runtime is still slow and needs later optimization, but functionality is accepted.

## 3. Admin / Boss diagnosis status

Admin currently uses one participant per row and aggregates participant problems.

Desired semantics:

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

Current user observation: Boss colors/notes and Admin prompts are visibly wrong after the historical repair. Reconcile only after CGT/MRI scientific publication is fixed.

## 4. Participant-facing report

This is the report handed to participants, not SPSS/R output and not staff screening summary.

The single-page A4 design is fixed:

- 9 metrics only;
- sections: 認知表現 / 動機與情緒 / 決策表現;
- metric name + one short Traditional-Chinese explanation + horizontal bar + simple label;
- no percentile number shown;
- no cohort N shown;
- longer bar = better relative performance after internal direction normalization.

Production implementation has now been deployed:

- `helper.js`: menu `个人报告 → 生成参与者报告`;
- `report_backend.js`: report payload / PID validation / comparative normalization;
- `report.html`: shared single + batch renderer, one A4 per participant, print/save control.

Current field bindings:

- Forward Digit Span -> `For_DGS` (higher better)
- Backward Digit Span -> `Back_DGS` (higher better)
- HK-MoCA -> `MoCA_Raw` (higher better)
- cognitive/social motivation -> `GAS_Social` (reverse)
- emotional response/expression -> `GAS_Emotion` (reverse)
- spontaneous behavioral activation -> `GAS_Behaviour` (reverse)
- CGT speed -> `CGT_Mean_Deliberation_RT_MS` (reverse)
- CGT quality -> `CGT_Prop_Best_Choices` (higher better)
- CGT risk adjustment -> `CGT_Risk_Adjustment` (direction not yet confirmed; participant output remains `待確認`)

Batch-first delivery is the v1 decision: staff can enter one or multiple PIDs; one participant per A4 page; one print/save-PDF action.

Current real defect:

- preview renders successfully;
- the `列印／儲存PDF` button does not produce a usable print/download flow from the Apps Script HTML context;
- fix should be limited to the print path (`report.html`, and `report_backend.js` only if strictly necessary), not report data/scoring.

## 5. UBSN Human MRI assistant

UBSN is a separate local staff module under `tools/ubsn/` and must not be mixed into backend repair work.

Current state:

- real `reservations.js` capture has been obtained;
- live schema is now parsed as a JSON event array containing reservation/admin-hold blocks plus `className=unavailable` blocks;
- parser derives free intervals as the complement of merged blocking intervals within the requested window;
- canceled reservation rows do not block;
- parser fails closed for empty/unrecognized live responses;
- coverage-aware diff prevents false NEW_SLOT alerts when a reservation merely shrinks an existing free interval;
- 13 local UBSN tests passed on 2026-09-01.

Observed usability issue:

- one-shot `run.py check` starts/closes Playwright each time, causing repeated SAML interaction even with a persistent profile;
- working-branch change adds `run.py serve --monitor` so staff can keep one browser/session open for the work period and reuse it for manual/background checks;
- this persistent mode still needs local human verification.

CAPTCHA and final booking confirmation remain human.

## 6. Frontend requirements

`FRONTEND_REQUIREMENTS_LATEST.md` is a requirements baseline, not a completion report.

Do not claim individual P0/P1 items are missing without checking current code.

One proven backlog remains frontend payload/evidence hygiene: non-owner routes can emit unrelated/default state that should not masquerade as authoritative evidence.

## 7. Deferred / do not resurrect automatically

- controlled staged Step3/Step4 rollback proof: deferred, not current blocker;
- broad legacy cleanup: later;
- global redesigns of Admin/Trace: only from concrete staff-use defects;
- Full rebuild for narrow derived/output fixes: do not use.

## 8. Agent division

- ChatGPT: product scope, status/docs, offline audits, prompts, UBSN public-module work.
- current mainline Codex window: Production CGT/MRI/diagnosis/Admin repair only.
- report Codex window: participant-report print/save-PDF fix only.
- human: minimal real UI/runtime checks.

Functionality first. Use narrow edits. Do not rerun broad audits/tests unless a concrete defect requires them.
