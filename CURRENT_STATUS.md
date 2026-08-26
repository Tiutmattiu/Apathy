# APATHY CURRENT STATUS

Last updated: 2026-08-27

This file is the canonical **sanitized engineering status** for agent handoff.

Important privacy rule: the public repository must not contain participant-identifiable data, clinical payloads, phone numbers, names, credentials, tokens, private workbook contents, or other sensitive Production evidence. Backend/Production details belong outside this public repository.

## Status labels

- `DONE`: accepted and complete for its stated scope.
- `ACCEPTED`: validated and safe to rely on, but not necessarily a finished product.
- `CANDIDATE`: offline or pre-Production work; **not deployed / not accepted in Production**.
- `PROVEN`: defect or technical fact established by code/runtime evidence.
- `BLOCKED`: must not advance until the stated blocker is resolved.
- `NOT_DONE`: explicitly unfinished.
- `DEFERRED`: valid backlog, not current mainline.

## DONE

### Manual identity resolution

- Generic manual identity-resolution workflow is accepted for its intended scope.
- Do not reopen this work unless contradictory evidence appears.

## ACCEPTED

### Raw / Event evidence model

- Raw is append-only research evidence.
- Event preserves formal evidence/provenance rather than silently canonicalizing away source facts.
- Backfill is valid formal evidence; authority must be field/domain-specific rather than granting an entire payload universal authority.

### Trace sidebar vertical slice

- Read-only Boss-cell trace is working as a useful vertical slice.
- It can follow a Boss cell through Result/Review, Participant state, Event evidence, Raw source, and control metadata.
- Trace is useful and accepted as a direction/product slice, but global diagnosis vocabulary and staff-action classification are unfinished.

### Participant Phase 5C live-source review

- Narrow Codex review completed with verdict `READY_FOR_CANDIDATE_REBUILD`.
- Candidate baseline matched the current Production-aligned Participant source with no unrelated drift.
- Event-type normalization and approved source-path predicates matched the live contracts.
- Provenance, scope, public entrypoints, sheet contracts, and runner integration were preserved.
- No Phase 5C code blocker was found and no unrelated code was changed.

### Participant Phase 5B Candidate Full + offline propagation acceptance

- Candidate Full rebuild completed successfully through Event, Participant, Result/Decision, Boss/Admin, and checkpoint commit.
- Offline pre/post propagation audit completed with verdict `READY_FOR_FINAL_RUNTIME_CHECKS`.
- Participant changes were confined to the 12 approved completion paths plus the narrow workflow-stage regression guard; scope leakage was zero.
- Field Provenance was preserved exactly in the compared snapshots.
- Result propagation was limited to expected PDI confirmation changes; Result Review did not expand.
- Boss 90-column output had no changed cells in the compared snapshots.
- Admin increased only because of isolated external input changes; no Phase 5B false-action explosion was found.
- Medication/LEDD and unrelated scientific domains showed no Phase 5B drift.

## PROVEN DEFECTS / FINDINGS

### Participant current-state merge semantics

- The generic latest-present-value merge can allow later unrelated events to overwrite valid earlier participant state.
- High-confidence examples are workflow/completion state written by non-owner event domains.
- This is a Participant current-state projection problem; Raw/Event history remains preserved.
- Phase 5B is the current candidate fix and has passed code, live-contract, Candidate Full, and offline propagation acceptance; final runtime/rollback acceptance remains.

### Frontend payload pollution

- Non-owner routes can emit unrelated/default completion values and other route-independent derived/default state.
- Receiver/Event preserve those submitted values faithfully; the downstream merge must not treat every emitted leaf as equally authoritative.
- Frontend payload hygiene remains a later mainline task after Participant correctness acceptance.

### Backfill ownership contamination

- A Backfill event can contain genuine evidence for one domain while also carrying unrelated derived/default completion values for other domains.
- Therefore `historical_paper_reentry` event type alone is insufficient to grant authority over every completion domain.

### Medication / LEDD authority backlog

- A separate forensic audit found that many blank PD LEDD outputs are authority/review/mapping gated rather than simple source absence.
- One reproducible cohort already carries verified legacy final values in current processing but remains pending at final-source authority selection.
- A broader structured-evidence factor-authority asymmetry exists across multiple medications; Safinamide/Xadago is one clear fixture, not the whole problem.
- These findings pre-existed Phase 5B and showed no Phase 5B propagation drift.
- Keep this work separate from the Phase 5B promotion decision.

## CURRENT CANDIDATE

### Participant Phase 5B — evidence-gated current-state ownership

Status: **CANDIDATE — READY FOR FINAL RUNTIME / ROLLBACK CHECKS — NOT YET PRODUCTION-ACCEPTED**

Scope:

- implementation target is Participant current-state winner semantics only;
- completion winners are event-domain-owned for the approved narrow completion-field set;
- workflow projection prevents the proven Stage 2 → Stage 1 regression case without introducing a general workflow state machine;
- Backfill remains formal evidence;
- Backfill completion authority requires same-event source evidence for the corresponding domain;
- partial Backfill remains valid: one qualifying source-level item is sufficient to establish domain evidence;
- no global `TRUE_ONCE` semantics;
- rejected current-state winners remain preserved in provenance/history;
- scientific item scores, MoCA, MRI safety, MRI sequence values, medication/LEDD, inclusion/withdrawal, payment/receipt, identity authority, and other measurements are outside this candidate's semantic changes.

Acceptance completed so far:

- offline implementation/simulation review: PASS;
- narrow live-source / predicate review: PASS;
- Candidate Full rebuild: PASS;
- Participant propagation / scope containment: PASS;
- provenance preservation: PASS;
- Result/Review propagation: PASS;
- Boss regression: PASS;
- Admin action-explosion check: PASS;
- medication/LEDD negative control: PASS;
- confirmed offline blockers: none.

Still required before Production acceptance:

- human live Trace checks on representative fixtures;
- Full/Incremental parity required by the active runner contract;
- rollback / failed-run behavior verification;
- confirmation that a failed Candidate does not replace the last correct published output;
- atomic-promotion readiness and final human operational judgment.

## NOT_DONE

### Admin product

- Admin product is not complete.
- Completion of manual identity resolution does **not** mean Admin is done.
- Current/older Admin heuristics can over-generalize missingness from stage/submission presence.
- Long-term direction: Admin should consume the same field-centric evidence/diagnosis resolver used by Trace and surface only genuine staff actions.

### Trace product completion

- Global diagnosis vocabulary is incomplete.
- Staff-action classification is unfinished.
- Boss blank must be explainable, but Boss blank does not automatically imply an Admin task.

### Frontend evidence hygiene

- Route/domain payload emission still needs tightening so non-owner defaults are not emitted as if they were authoritative evidence.

## CURRENT MAINLINE

1. **Phase 5B final runtime / rollback acceptance.**
   - Perform representative human Trace checks for owner restoration, supported Backfill, unsupported completion removal, workflow regression prevention, PDI confirmation, UPDRS completion, and an unchanged medication/LEDD negative control.
   - Verify Full/Incremental parity according to the existing runner contract.
   - Verify rollback / failed-run behavior and preservation of the last correct output.
   - Verify atomic-promotion readiness.

2. **Atomic promotion only after the final runtime checks pass.**

3. After Participant correctness is accepted:
   - frontend payload hygiene;
   - medication/LEDD authority backlog;
   - Trace/shared resolver maturity;
   - Admin adoption of the shared resolver;
   - later architecture contraction and legacy cleanup.

## DO NOT REOPEN / DO NOT BROADEN

Absent contradictory evidence, do not spend agent time re-proving:

- accepted manual identity-resolution work;
- Phase 5C source/predicate review;
- Candidate Full rebuild success;
- offline Phase 5B propagation/scope/provenance/Boss/Admin acceptance;
- whether Backfill is valid evidence (it is; authority is domain-specific);
- a global true-once redesign;
- medication/LEDD authority defects as if they were Phase 5B regressions;
- Admin redesign before Participant correctness acceptance.

## AGENT WORKFLOW

- **ChatGPT / project lead reasoning:** define scope, acceptance criteria, status transitions, and hostile semantic review.
- **Copilot:** heavy offline mechanical/static work, simulations, bulk diffs, source scans, and candidate drafting.
- **Codex:** narrow high-value live-source, integration, runtime, and Production-sensitive review only when human UI actions are insufficient.
- **Human operator:** perform simple UI/runtime actions, Production actions, and final operational/product judgment.

Operational rule: if a human can complete a task safely in seconds or a few minutes by clicking/running an existing function, prefer explicit human-readable UI instructions over spending Codex time. Use Codex for code edits, live-source integration analysis, runtime failures, or cross-file dynamic reasoning.

Agents should treat this file as current status, not as historical narrative. When a newer candidate supersedes an older one, keep only the minimum historical note necessary to explain the current state.
