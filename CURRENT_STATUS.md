# APATHY CURRENT STATUS

Last updated: 2026-09-01

This file is the canonical **sanitized engineering/product status** for agent handoff.

Public-repo privacy rule: never commit participant names/identifiers, phone numbers, clinical payloads, private workbook rows, credentials, tokens, Script/Spreadsheet IDs, reservation captures containing staff/account data, or other private Production evidence. Private Production facts may be summarized here only at aggregate/product level.

## Status labels

- `DONE`: complete for the stated scope.
- `ACCEPTED`: validated and safe to rely on, but not necessarily the finished product.
- `DEPLOYED_PENDING_VERIFY`: code is live but final human/runtime verification for the current change is still pending.
- `PROVEN`: defect/fact established by code or real runtime evidence.
- `NOT_DONE`: explicitly unfinished.
- `DEFERRED`: valid backlog, not a current blocker.

## ACCEPTED / CURRENTLY RELIABLE

### Raw / Event evidence model

- Raw remains append-only research evidence.
- Event preserves formal evidence and provenance.
- Backfill is valid formal evidence, but authority is field/domain-specific rather than universal to the whole payload.
- Rejected/non-owner evidence remains traceable instead of being silently deleted.

### Identity resolution

- Generic manual identity resolution through the existing authority/control layer is accepted.
- Raw submitted identity is not rewritten merely to make matching succeed.

### Participant current-state semantics

- Evidence-gated field/domain ownership is the accepted direction for current Participant projection.
- Later unrelated events must not overwrite stronger domain-owner evidence merely by chronology.
- Historical Backfill can contribute the fields it actually evidences, without receiving blanket authority over unrelated fields.

### Boss / Trace / first Operations vNext slice

- Boss scan-mode diagnosis and notes are installed without changing the 90-column scientific-value contract.
- Existing click-a-Boss-cell Trace remains available.
- Participant-first Trace search, suspicious/all-blank/current-value views, first-break explanation, and safe lineage navigation are installed.
- Shared action classes distinguish genuine staff data action, resolvable-in-app authority work, trace-only/no-action, and escalation.
- Manual identity preview/confirmation is available through the existing control authority path.

### Incremental runner — supersedes the old 2026-08-27 Full-only status

- A real participant-scoped Incremental pipeline is implemented and deployed.
- Reusable entrypoint processes one or many affected PIDs and reuses the existing Event/Participant/Result/Decision/Boss/Admin logic rather than creating a second scientific engine.
- Admin has a checkbox queue and human menu action for checked items.
- Successful items clear; failed/unprocessed items remain available for retry.
- Incremental does not silently fall back to Full.
- Full remains appropriate for true global schema/scoring/authority changes.
- A recent 38-participant historical repair batch completed 38/38 successfully in 4m53s.
- **Known issue:** participant-scoped runtime is still slower than desired; performance optimization remains required.

### Admin precision redesign

- Admin uses **one row per participant**, aggregating relevant problems rather than one row per issue.
- Missingness can be derived from assigned Event Values, canonical field mappings, and Field Provenance down to exact missing/invalid item paths.
- Whole-source absence, partial item-level absence, and downstream/system-only breaks are distinguished.
- Complete Raw/evidence with missing downstream output is not turned into a re-entry request.
- Receipt/archive status alone no longer creates an Admin task; unresolved payment status may still do so.
- Technical lineage remains available in hidden fields/Trace rather than forcing staff to read technical issue rows.

## DEPLOYED_PENDING_VERIFY

### Historical Boss migration repair

A private forensic comparison of historical Boss data against the current evidence/provenance chain established that most apparent historical-value loss was authority/promotion/publication rather than broad source loss.

Generic repairs were deployed for the diagnosed classes, including historical/manual LEDD authority fallback, field-wise formal Backfill promotion, canonical MID/PD publication paths, GAS derived publication, and CGT completion derivation.

The six explicitly identified historical source gaps were then written as formal historical Backfill evidence with historical provenance; HADS remained summary-only with no fabricated items.

Runtime result:

- affected Incremental batch: 38 succeeded, 0 failed;
- elapsed: 4m53s;
- Output-only publication completed successfully;
- Boss remained 90 columns and Admin refreshed;
- five of the six historical values published;
- one historical MRI date still has upstream evidence but remains blank downstream and requires a narrow mapping/publication diagnosis.

**Newly observed post-repair issue:** current Boss diagnosis coloring/notes and Admin prompts are not fully aligned with the repaired evidence/publication state. This is now a concrete shared-diagnosis/output usability defect; fix it narrowly rather than reopening the entire Operations architecture.

Do not mark historical migration closed until the remaining MRI publication break and post-repair diagnosis/Admin reconciliation are fixed, then run the final historical Boss diff.

### Participant-facing report v1

Production Apps Script report support has now been deployed.

Installed scope:

- staff menu entry for participant reports;
- dedicated report backend payload path;
- single and batch PID input;
- one shared renderer;
- one A4 page per participant;
- browser `列印／儲存PDF` workflow;
- no Full rebuild and no scientific scoring rewrite.

The nine current bindings use final Boss-facing fields for Digit Span forward/backward, MoCA, three GAS dimensions, and three CGT metrics. GAS dimensions and CGT decision speed are internally direction-normalized. CGT risk-adjustment remains `待確認` until a formal direction contract is available.

Participant-facing output does not expose percentile numbers, cohort N, technical direction rules, staff workflow decisions, Admin/Trace, or provenance.

Still verify the deployed UI against a real participant and one small batch before calling report v1 accepted.

## NOT_DONE

### Admin human readability and post-repair diagnosis reconciliation

Admin is not finished.

Immediate concrete work:

- reconcile Boss colors/notes and Admin prompts with the newly repaired accepted evidence state;
- resolved/published fields must not remain marked as missing/actionable;
- accepted evidence with a downstream publication break must be technical/system handling, not staff re-entry;
- preserve one-row-per-participant aggregation and exact item precision;
- compress an entirely absent workflow/scale into a concise whole-source message rather than listing every item as missing;
- expand exact item lists only for partially completed sources;
- preserve clear `system handling / no re-entry` wording for downstream defects.

Do not reopen accepted identity semantics or redesign all Admin logic at once.

### Frontend implementation status + evidence hygiene

- `FRONTEND_REQUIREMENTS_LATEST.md` remains the implementation baseline, not a completion report.
- Current public frontend code must be audited against that baseline before claiming individual P0/P1 features are missing or complete.
- A proven remaining defect is payload/evidence hygiene: routes can emit unrelated/default completion values that must not masquerade as authoritative evidence.

### UBSN Human MRI booking assistant

A real local helper exists under `tools/ubsn/`, and the frontend contains a staff UBSN route that talks to the local bridge.

Current checkpoint:

- persistent visible Playwright session exists;
- a real Human MRI `reservations.js` capture has been observed and the real parser is implemented;
- live response is a JSON event array containing Human MRI reservation/admin-hold blocks plus `className=unavailable` calendar blocks;
- usable intervals are derived as the complement of merged blocking intervals inside the exact requested window;
- cancelled Human MRI reservation rows do not block;
- parsing fails closed on empty/unrecognized live responses;
- interval diff is coverage-aware, avoiding false `NEW_SLOT` alerts when free time merely shrinks/splits;
- local suite currently passes 13 tests against the integrated parser/diff behavior;
- a one-shot live `check` completed and returned no matching staff action for the current local waiting-list input.

**Login UX finding:** repeated `run.py check` invocations restart and then close the Playwright process, so they can force repeated SAML login despite the persistent profile. The intended daily workflow is now persistent helper mode:

```text
run.py serve --monitor
```

This authenticates once, keeps the terminal/browser alive, reuses the same browser session for APATHY `check now`, and optionally runs background polling. URFMS server-side session expiry can still require a later re-authentication.

Remaining UBSN work:

- confirm persistent `serve --monitor` removes repeated-login friction during a normal work session;
- confirm timezone/date semantics over repeated checks;
- confirm booking-form selectors during one dry preparation;
- replace example waiting-list JSON with the intended APATHY staff data source once that source contract is explicit;
- keep CAPTCHA and final submission human.

### Incremental performance

Functional participant-scoped Incremental exists, but runtime must be reduced by removing remaining cohort-wide work/repeated Spreadsheet I/O from the participant-scoped path.

### Legacy / architecture cleanup

Still later backlog. Do not block working research operations on cosmetic repository cleanup.

## DEFERRED

### Controlled staged rollback proof

The old Phase 5B controlled Step 3/4 rollback proof remains a valid release-validation topic but is **deferred** and is not a blocker for the current product mainline. Do not resurrect it automatically.

## CURRENT MAINLINE

1. Fix the remaining historical MRI publication break and reconcile post-repair Boss diagnosis coloring/Admin prompts; then run the final historical Boss diff.
2. Verify the deployed participant-report UI with one real participant and one small batch.
3. Finish UBSN persistent-session live verification, then wire the real waiting-list source.
4. Audit the current frontend implementation against `FRONTEND_REQUIREMENTS_LATEST.md`, then fix only proven gaps; payload hygiene is already proven work.
5. Optimize participant-scoped Incremental performance without changing scientific semantics.
6. Continue Admin readability/operations refinements only from concrete staff use.
7. Do legacy cleanup last.

## OPERATING RULES

- Functionality first; real use finds problems; then fix the concrete bug; keep validation minimal and targeted.
- Prefer one narrow Codex deliverable at a time. Do not make Codex reread/re-audit the whole project for every change.
- Human operator performs simple UI/runtime actions when safe.
- Heavy offline scans/diffs can be delegated; Production-sensitive code surgery stays narrow.
- Never hardcode participant-specific fixes into public or Production scientific logic.
- Do not infer a staff task from a blank Boss cell alone.
- Do not copy historical Boss values directly into current Boss to make a diff pass; preserve evidence/provenance and current scoring semantics.
