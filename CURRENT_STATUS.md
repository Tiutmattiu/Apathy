# APATHY CURRENT STATUS

Last updated: 2026-09-01

This file is the canonical **sanitized engineering/product status** for agent handoff.

Public-repo privacy rule: never commit participant names/identifiers, phone numbers, clinical payloads, private workbook rows, credentials, tokens, Script/Spreadsheet IDs, or other private Production evidence. Private Production facts may be summarized here only at aggregate/product level.

## Status labels

- `DONE`: complete for the stated scope.
- `ACCEPTED`: validated and safe to rely on, but not necessarily the finished product.
- `DEPLOYED_PENDING_VERIFY`: code is live but the final human/runtime verification for the current change is still pending.
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

- A real participant-scoped Incremental pipeline is now implemented and deployed.
- Reusable entrypoint processes one or many affected PIDs and reuses the existing Event/Participant/Result/Decision/Boss/Admin logic rather than creating a second scientific engine.
- Admin has a real checkbox queue and a human menu action for checked items.
- Successful items clear; failed/unprocessed items remain available for retry.
- Incremental does not silently fall back to Full.
- Full remains appropriate for true global schema/scoring/authority changes.
- **Known issue:** single-participant runtime has been much slower than desired; performance optimization is still required.

### Admin precision redesign

- Admin now uses **one row per participant**, aggregating the participant's relevant problems rather than one row per issue.
- Missingness can be derived from assigned Event Values, canonical field mappings, and Field Provenance down to exact missing/invalid item paths.
- Whole-source absence, partial item-level absence, and downstream/system-only breaks are distinguished.
- Complete Raw/evidence with missing downstream output is not turned into a re-entry request.
- Receipt/archive status alone no longer creates an Admin task; unresolved payment status may still do so.
- Technical lineage remains available in hidden fields/Trace rather than forcing staff to read technical issue rows.

## DEPLOYED_PENDING_VERIFY

### Historical Boss migration repair

A private forensic comparison of historical Boss data against the current evidence/provenance chain established:

- historical participant identity coverage is complete at row level;
- most apparent historical-value loss is not broad source loss: evidence is still present but blocked by authority, Event-to-Provenance promotion, downstream calculation/mapping, or publication;
- a smaller set of old derived/completeness values should **not** be blindly resurrected because current scoring/completeness semantics differ;
- a very small set of genuine historical source gaps requires explicit historical Backfill evidence rather than copying values directly into Boss.

Generic repairs have been deployed for the diagnosed classes, including:

- historical/manual LEDD final-source authority fallback when no stronger source supersedes it;
- field-wise formal Backfill promotion that respects stronger formal sources;
- canonical MID/PD evidence publication paths;
- GAS derived publication with resolved PD/HC applicability;
- CGT completion derived from the three accepted substantive metrics.

Final cohort Incremental refresh + old-vs-new Boss verification is still pending for this work cycle. Do not mark historical migration closed until that final diff is clean and the explicit historical Backfill gaps are confirmed.

## NOT_DONE

### Admin human readability and broader operations

The structural/precision redesign is a major improvement, but Admin is not finished.

Remaining product work includes:

- compressing an entirely absent workflow/scale into a concise whole-source message instead of listing every item as missing;
- expanding exact item lists only for partially completed sources;
- preserving clear `system handling / no re-entry` wording for downstream defects;
- broader lifecycle/action/navigation polish from `ADMIN_TRACE_VNEXT_SPEC.md` where real staff use proves it useful.

Do not reopen accepted identity semantics or redesign all Admin logic at once.

### Frontend implementation status + evidence hygiene

- `FRONTEND_REQUIREMENTS_LATEST.md` remains the implementation baseline, not a completion report.
- Current public frontend code must be audited against that baseline before claiming individual P0/P1 features are missing or complete.
- A proven remaining defect is payload/evidence hygiene: routes can emit unrelated/default completion values that must not masquerade as authoritative evidence.

### Participant-facing report — prior work recovered; implementation still unfinished

This is the **report handed to the participant**, not an SPSS/R report and not the staff screening summary.

Prior work already exists and should be continued rather than redesigned from scratch:

- an editable participant-report template was produced from the older report design;
- a three-page PDF visual prototype was produced and visually checked;
- a later single-page participant-report prototype also exists;
- the report intentionally keeps the original participant-facing domains:
  - Digit Span forward / backward;
  - MoCA overall cognition;
  - the three apathy dimensions;
  - the three CGT metrics;
- the redesign replaced static/raw presentation with dynamic percentile positioning, cohort `N`, plain-language interpretation, and data/version metadata;
- the single-page version groups these into `認知表現`, `動機與情緒`, and `決策表現`, using participant-readable labels and relative-performance bars.

The current public frontend does **not** yet contain a dedicated participant-report renderer/print path. Existing `renderScreenResult()` is staff-facing interim screening output and must not be mistaken for the participant report.

See `PARTICIPANT_REPORT_SPEC.md`; it records the recovered report contract instead of inventing a new report scope.

### UBSN Human MRI booking assistant

A real local helper already exists under `tools/ubsn/`, and the frontend contains a staff UBSN route that talks to the local bridge.

Current checkpoint:

- persistent visible Playwright session exists;
- calendar response capture exists;
- slot matching/ranking, watcher, local service endpoints, and booking-form prefill path exist;
- CAPTCHA and final booking confirmation remain human;
- the exact live `reservations.js` response schema has not yet been confirmed, so production parsing intentionally stops at `NEEDS_REAL_CAPTURE`;
- live field selectors/session-expiry/calendar semantics still need confirmation against the real site;
- a privacy-safe offline `inspect-capture` command is now available on the working branch so a real capture can be structurally inspected without echoing scalar booking values.

Next milestone is real-capture schema reconciliation, not a rewrite of the UBSN tool.

### Incremental performance

Functional participant-scoped Incremental exists, but runtime must be reduced by removing remaining cohort-wide work/repeated Spreadsheet I/O from the participant-scoped path.

### Legacy / architecture cleanup

Still later backlog. Do not block working research operations on cosmetic repository cleanup.

## DEFERRED

### Controlled staged rollback proof

The old Phase 5B controlled Step 3/4 rollback proof remains a valid release-validation topic but is **deferred** and is not a blocker for the current product mainline. Do not resurrect it automatically.

## CURRENT MAINLINE

1. Finish the current historical-migration repair cycle: run the affected Incremental batch and perform the final historical Boss diff.
2. In parallel, implement the **existing participant-facing report design** from its recovered template/spec; do not replace it with a new generic report.
3. In parallel, advance **UBSN** from `NEEDS_REAL_CAPTURE` to confirmed live-schema parsing and safe booking preparation.
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
