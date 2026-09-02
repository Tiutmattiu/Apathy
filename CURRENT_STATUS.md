# APATHY CURRENT STATUS

Last updated: 2026-09-03

This file is the canonical **sanitized engineering/product status**. Read `APATHY_CORE_PIPELINE_HANDOFF_20260903.md` for the current core data contract, read-only Production inspection findings, and agent work split.

Public-repo privacy rule: never commit participant names/identifiers, phone numbers, clinical payloads, private workbook rows, credentials, tokens, Script/Spreadsheet IDs, reservation captures containing staff/account data, or other private Production evidence. Private Production facts may be summarized here only at aggregate/product level.

## AUTHORITATIVE CORE CONTRACT

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

Technical Candidate, bridge, audit, diagnosis, checkpoint and rollback surfaces are implementation/support layers, not scientific authorities.

### Boss admission product rule

Boss eligibility requires:

1. valid/unique Registry participant;
2. at least one formal Raw submission assigned to that participant;
3. Contactlist does **not** explicitly mark `Inclusion=n`.

The intended active gate is `inclusion !== 'n'`. Blank Inclusion does not itself exclude a Registry participant from Boss. S_ID, MRI date and downstream workflow completion are not Boss-admission gates.

Do not confuse Boss admission with creation of a new Registry identity from Contactlist; Registry creation may require an explicit positive inclusion decision.

## ACCEPTED / CURRENTLY RELIABLE

### Raw / Event evidence model

- Raw remains append-only research evidence.
- Event preserves formal evidence and lineage from `payload_json`.
- Current `_Candidate_Payload_Loss` inspection found no active payload-loss rows in the inspected snapshot.
- Backfill is valid formal evidence, but authority is field/domain-specific rather than universal to the whole payload.
- Rejected/non-owner evidence remains traceable instead of being silently deleted.

### Identity / Participant semantics

- Registry remains identity authority once a participant exists there.
- Generic manual identity resolution through the existing control layer is accepted; Raw submitted identity is not rewritten to make matching succeed.
- Evidence-gated field/domain ownership is the accepted Participant projection model.
- Later unrelated events must not overwrite stronger owner evidence merely by chronology.
- Historical Backfill may contribute fields it actually evidences without blanket authority.

### Historical data-loss diagnosis

Historical forensic work established that apparent broad Boss loss was mostly **not Raw loss**. Main mechanisms were frontend/non-owner payload pollution, Participant latest-present overwrite before ownership defenses, Event->Participant promotion gaps, and downstream publication/authority gaps.

Recover/publish existing formal evidence first; do not mass re-enter old values or copy historical Boss into current Boss.

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

### 1. Full Step 3 recurrent Spreadsheet timeout

The current Full run has passed Event and Participant, but repeated Result-Core attempts have encountered Spreadsheet-service timeout with no checkpoint commit.

This is **not yet proven to be a deterministic code regression**. The same runner version successfully completed Step 3 and Full on multiple earlier Production runs, including a 2026-09-01 run that required repeated Step-3 attempts before succeeding.

Current verdict: runtime/Spreadsheet-I/O instability or a performance-sensitive path. Rollback snapshot copying is one plausible expensive preamble, but not a proven root cause.

Next action:

- first compare current source with the last successful same-version Step-3 path;
- if unchanged, inspect/profile the largest Spreadsheet reads/writes/copies rather than inventing a semantic repair;
- preserve Result/Decision scientific logic unless a concrete defect is demonstrated.

### 2. Frontend payload/evidence hygiene

Current public `app.js` still proves this defect:

- outgoing payload construction calls global derived calculation;
- shared `ST.answers` is broadly serialized into the submission.

A route can therefore emit unrelated/default evidence owned by another workflow. Fix with route-owned/applicable payload only, plus shared identity/metadata; keep Participant ownership defense as a second line of protection.

### 3. Historical publication tail + diagnosis/Admin reconciliation

- Substantive CGT values are again visible in current Production; broad CGT repair is no longer the active blocker.
- One historical MRI-date publication case remains a narrow downstream publication issue.
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

Therefore the missing feature is operational projection, not ingestion recovery.

```text
Screening MRIadmin
-> resolved Participant state
-> MRI scheduling state
-> Admin + UBSN
-> human-confirmed booking
-> APATHY BOOKED evidence
-> link/append MRI Time
```

- Contactlist/manual MRI waiting lists are not MRI preference/availability authorities.
- Contactlist `Inclusion=n` is an upstream exclusion condition; blank/y are not MRI preference evidence.
- MRI Time is the staff booking ledger/history; existing rows must be preserved and may only be reconciled as confirmed-booking evidence, not waiting availability/eligibility.
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

The fixed v1 report design remains one A4 page per participant with nine metrics, Traditional-Chinese participant-facing explanations, no percentile number/cohort N, and direction-normalized bars.

Known defect remains narrow: preview renders, but the Apps Script `列印／儲存PDF` path is not usable. The existing report Codex thread should fix only that print path.

## TECHNICAL MATERIALIZATION / CLEANUP

Current Production contains large Candidate/Event/Participant/Provenance/Bridge/Result/Audit/Output/rollback materializations.

Current rules:

- do not create another persistent table for a narrow defect;
- do not turn an audit/diagnosis/bridge surface into a new authority;
- Result Bridge is a legacy exact-engine interface adapter from Participant State, not a conceptual research-data source;
- architecture contraction/cleanup is later work after the core reliable path is stable.

## CURRENT MAINLINE

1. Determine whether current Step-3 source differs from the last successful same-version path; if not, isolate the dominant Spreadsheet-I/O/performance bottleneck.
2. Finish the remaining historical MRI-date publication tail generically.
3. Reconcile Boss diagnosis/color and Admin action wording after scientific values are correct.
4. Fix frontend route-owned payload hygiene.
5. Finish MRIadmin Participant-state -> Admin/UBSN operational projection; then confirmed BOOKED -> narrow MRI Time link/append.
6. Fix participant-report print path in the separate report thread.
7. Optimize Incremental / perform legacy contraction only after correctness and daily operations are stable.

## AGENT DIVISION

- **ChatGPT:** read-only Production inspection, source/history/runtime reconciliation, product contract, sanitized status/handoff docs, offline diffs, narrow implementation packets, public UBSN work.
- **Mainline Codex:** only a defect already reduced to one narrow Production code change. Preserve the existing thread; no broad re-audit.
- **Report Codex:** report print/save-PDF path only.
- **Copilot/heavy offline worker:** mechanical current-vs-last-successful source diff, static ranking of Step-3 Spreadsheet I/O, frontend route/field ownership matrix, large static inventories. No Production writes and no invented authority.
- **Human:** genuine identity/research authority decisions, minimal safe UI/runtime actions, CAPTCHA/final booking confirmation.

## OPERATING RULES

- Functionality first; evidence path first; scaffolding second.
- No Raw rewrite.
- No participant-specific hardcoding.
- No new persistent data layer for a narrow repair.
- Do not infer missing source from a blank Boss cell.
- `Inclusion=n` excludes from Boss; blank Inclusion does not itself exclude.
- Prefer existing formal evidence over recollection/re-entry.
- Give Codex one narrow deliverable at a time; do not spend quota on rediscovering established facts.
