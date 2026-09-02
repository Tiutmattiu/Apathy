# APATHY CURRENT STATUS

Last updated: 2026-09-03

This file is the canonical **sanitized engineering/product status**. Read `APATHY_CORE_PIPELINE_HANDOFF_20260903.md` for the current core data contract, read-only Production inspection findings, and agent work split.

Public-repo privacy rule: never commit participant names/identifiers, phone numbers, clinical payloads, private workbook rows, credentials, tokens, Script/Spreadsheet IDs, reservation captures containing staff/account data, or other private Production evidence. Private Production facts may be summarized here only at aggregate/product level.

## Status labels

- `DONE`: complete for the stated scope.
- `ACCEPTED`: validated and safe to rely on, but not necessarily the finished product.
- `DEPLOYED_PENDING_VERIFY`: code is live but final human/runtime verification is pending.
- `PROVEN`: defect/fact established by code or real runtime evidence.
- `NOT_DONE`: explicitly unfinished.
- `DEFERRED`: valid backlog, not a current blocker.

## AUTHORITATIVE CORE CONTRACT

The APATHY core is:

```text
frontend submission
-> complete payload_json in append-only Raw
-> lossless field-level Event evidence
-> identity resolution to Registry participant
-> Participant current evidence selected by field/domain/source ownership
-> Result / Medication / Decision calculation
-> Boss
-> Admin for genuine staff work
```

Technical Candidate, bridge, audit, diagnosis, checkpoint and rollback surfaces are implementation/support layers. They are not new scientific authorities.

### Boss admission product rule

Boss eligibility requires all three:

1. valid/unique Registry participant;
2. at least one formal Raw submission assigned to that participant;
3. explicit Contactlist `Inclusion=y`.

S_ID, MRI date and downstream workflow completion are not Boss-admission gates.

### PROVEN critical mismatch — current implementation vs product rule

Current Result/Decision source permits Boss admission when Contactlist Inclusion is anything except explicit `n` (`inclusion != n`). Current read-only Production aggregates show substantially fewer explicit `Inclusion=y` Contactlist rows than current Boss rows.

**Do not change the code to `== y` blindly.** Historical/current inclusion authority must first be reconciled because a one-line code change would remove a large existing cohort. Do not infer `y` merely from historical Boss/Registry presence.

## ACCEPTED / CURRENTLY RELIABLE

### Raw / Event evidence model

- Raw remains append-only research evidence.
- Event preserves formal evidence and lineage from `payload_json`.
- Current `_Candidate_Payload_Loss` inspection found no active payload-loss rows in the inspected snapshot.
- Backfill is valid formal evidence, but authority is field/domain-specific rather than universal to the whole payload.
- Rejected/non-owner evidence remains traceable instead of being silently deleted.

### Identity / Participant semantics

- Registry remains identity authority after inclusion.
- Generic manual identity resolution through the existing control layer is accepted; Raw submitted identity is not rewritten to make matching succeed.
- Evidence-gated field/domain ownership is the accepted Participant projection model.
- Later unrelated events must not overwrite stronger owner evidence merely by chronology.
- Historical Backfill may contribute fields it actually evidences without blanket authority.

### Historical data-loss diagnosis

Historical forensic work established that apparent broad Boss loss was mostly **not Raw loss**. The main mechanisms were:

- frontend/non-owner payload pollution and default derived state;
- Participant latest-present overwrite before ownership defenses;
- Event->Participant promotion gaps;
- Result/publication aliases and authority gates.

The historical root-cause audit found that most audited material historical values still existed in Event and/or provenance/current evidence. Recover/publish existing evidence first; do not mass re-enter old values or copy historical Boss into current Boss.

### Incremental runner

- A real participant-scoped Incremental path is deployed.
- It reuses the existing Event/Participant/Result/Decision/Boss/Admin logic rather than a second scientific engine.
- It does not silently fall back to Full.
- A previous 38-participant repair batch completed 38/38 successfully in 4m53s.
- Runtime remains slower than desired; performance optimization is later work after current correctness/runtime blockers.

### Boss / Trace / Admin operations slice

- Boss remains a 90-column scientific output contract.
- Boss blank diagnosis/coloring and selected-cell Trace are installed.
- Participant-first Trace/search exists.
- Admin is one participant per row and aggregates relevant problems.
- Receipt/archive alone is non-actionable; only unresolved payment status may create a payment issue.
- Withdrawal alone is non-actionable for research workflow tasks.

Diagnosis/Trace/Admin are explanatory/operations layers, not scientific-data authorities.

## PROVEN ACTIVE DEFECTS / BLOCKERS

### 1. Full Step 3 deterministic runtime failure

A current Full run passes Event and Participant stages, then repeated Step 3 Result/Decision attempts fail with Spreadsheet-service timeout and no checkpoint commit.

Read-only source/workbook/ledger inspection strongly implicates the current Step-3 orchestration/snapshot path as part of the second Spreadsheet-I/O bottleneck. Partially created rollback surfaces are consistent with failure before or at the start of Result Core.

Next action: compare the current Step-3 preamble/path with the last known working source/runtime and isolate the smallest regression. **Do not invent another architecture or keep retrying Full.**

### 2. Frontend payload/evidence hygiene

Current public `app.js` still proves this defect:

- outgoing payload construction calls global derived calculation;
- all shared `ST.answers` keys are broadly serialized into the current submission.

A route can therefore emit unrelated/default evidence owned by a different workflow. This was one historical corruption mechanism and remains correctness work.

Fix after the current core runner is stable: route-owned/applicable payload only, plus shared identity/metadata; keep Participant ownership defense as a second line of protection.

### 3. Historical publication tail + diagnosis/Admin reconciliation

- Substantive CGT values are again visible in current Production; broad CGT repair is no longer the active blocker.
- One historical MRI-date publication case remains a narrow downstream publication issue after the historical repair.
- Boss diagnosis colors/notes and Admin prompts are not fully aligned with repaired evidence/publication state.

Repair values first, then reconcile presentation/actionability. A downstream pipeline break must not instruct staff to recollect/re-enter valid source data.

## MRIADMIN / UBSN

### MRIadmin authority — ACCEPTED

Screening MRIadmin is ordinary upstream participant evidence. Read-only Production inspection confirms MRIadmin values are present through:

```text
screening payload_json
-> Event Values
-> resolved Participant current state
```

Therefore the current missing feature is operational projection, not ingestion recovery.

Correct direction:

```text
Screening MRIadmin
-> resolved Participant state
-> MRI scheduling state
-> Admin + UBSN
-> human-confirmed booking
-> APATHY BOOKED evidence
-> link/append MRI Time
```

- Contactlist/manual MRI waiting lists are not MRI preference/eligibility authorities.
- Contactlist explicit inclusion remains an upstream participant-admission authority.
- MRI Time is the staff booking ledger/history; existing rows must be preserved. It may be reconciled as confirmed booking evidence only, never used to infer waiting availability/eligibility.
- v1 states: `WAITING`, `PREFERENCE_MISSING`, `BOOKED`, `NOT_ACTIONABLE`.
- blank preference is unknown, not unrestricted availability.
- structured month/weekday/daypart combinations must not be widened.

### UBSN local helper — ACCEPTED FOR CURRENT LOCAL SCOPE

- persistent visible Playwright session exists;
- real Human MRI `reservations.js` response is parsed;
- cancelled rows do not block;
- free intervals are derived as complement of blocking intervals;
- parser fails closed on empty/unrecognized live responses;
- coverage-aware interval diff exists;
- structured MRIadmin availability-window matching exists;
- file/backend waiting-source adapter exists;
- CAPTCHA and final submission remain human.

Remaining backend work: APATHY read-only waiting producer, then later confirmed-booking writeback. Do not reopen the live calendar parser while doing that.

## PARTICIPANT REPORT

### DEPLOYED_PENDING_VERIFY

The fixed v1 report design remains:

- one A4 page per participant;
- nine metrics only;
- Traditional-Chinese participant-facing explanations;
- no percentile number or cohort N shown;
- longer bar = better relative performance after internal direction normalization.

Known defect remains narrow: preview renders, but the Apps Script `列印／儲存PDF` path is not usable. The existing report Codex thread should fix only that print path; do not redesign report payload/scoring.

## TECHNICAL MATERIALIZATION / CLEANUP

Current Production contains large Candidate/Event/Participant/Provenance/Bridge/Result/Audit/Output/rollback materializations.

Rules for current work:

- do not create another persistent table for a narrow defect;
- do not turn an audit/diagnosis/bridge surface into a new authority;
- Result Bridge is a legacy exact-engine interface adapter from Participant State, not a conceptual research-data source;
- architecture contraction/cleanup is later work after the core reliable path is restored.

## CURRENT MAINLINE

1. Reconcile the explicit `Contactlist Inclusion=y` Boss-admission contract with historical/current Contactlist data; no guessed mass write.
2. Isolate and fix the deterministic Full Step-3 regression by comparing current vs last-known-working orchestration; one narrow patch only.
3. Finish the remaining historical MRI-date publication tail generically.
4. Reconcile Boss diagnosis/color and Admin action wording after scientific values are correct.
5. Fix frontend route-owned payload hygiene.
6. Finish MRIadmin Participant-state -> Admin/UBSN operational projection; then confirmed BOOKED -> narrow MRI Time link/append.
7. Fix participant-report print path in the separate report thread.
8. Optimize Incremental / perform legacy contraction only after correctness and daily operations are stable.

## AGENT DIVISION

- **ChatGPT:** read-only Production inspection, source/history reconciliation, product contract, sanitized status/handoff docs, offline diffs, narrow implementation packets, public UBSN work.
- **Mainline Codex:** only a defect already reduced to one narrow Production code change. Preserve the existing thread; no broad re-audit.
- **Report Codex:** report print/save-PDF path only.
- **Copilot/heavy offline worker:** mechanical source diffs, private inclusion reconciliation report, frontend route/field ownership matrix, large static inventories. No Production writes and no invented authority.
- **Human:** real inclusion/identity authority decisions, minimal safe UI/runtime actions, CAPTCHA/final booking confirmation.

## OPERATING RULES

- Functionality first; evidence path first; scaffolding second.
- No Raw rewrite.
- No participant-specific hardcoding.
- No new persistent data layer for a narrow repair.
- Do not infer missing source from a blank Boss cell.
- Do not infer `Inclusion=y` from historical Boss presence alone.
- Prefer existing formal evidence over recollection/re-entry.
- Do not run Full again until the deterministic Step-3 failure is fixed.
- Give Codex one narrow deliverable at a time; do not spend quota on rediscovering established facts.
