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
- Representative live Phase 5B runtime fixtures passed for owner restoration, supported Backfill, rejected non-owner evidence preservation, workflow regression prevention, PDI confirmations, UPDRS completion ownership, and an unchanged medication/LEDD negative control.
- The installed participant-first search, blank diagnosis, scan-mode coloring, and first staff-action classification are accepted for this vertical slice. Broader Trace/Admin product polish remains separate work described in `ADMIN_TRACE_VNEXT_SPEC.md`.

### Participant Phase 5C live-source review

- Narrow Codex review completed with verdict `READY_FOR_CANDIDATE_REBUILD`.
- Candidate baseline matched the current Production-aligned Participant source with no unrelated drift.
- Event-type normalization and approved source-path predicates matched the live contracts.
- Provenance, scope, public entrypoints, sheet contracts, and runner integration were preserved.
- No Phase 5C code blocker was found and no unrelated code was changed.

### Participant Phase 5B Candidate Full + propagation acceptance

- Candidate Full rebuild completed successfully through Event, Participant, Result/Decision, Boss/Admin, and checkpoint commit.
- Offline pre/post propagation audit completed with verdict `READY_FOR_FINAL_RUNTIME_CHECKS`.
- Participant changes were confined to the 12 approved completion paths plus the narrow workflow-stage regression guard; scope leakage was zero.
- Field Provenance was preserved exactly in the compared snapshots.
- Result propagation was limited to expected PDI confirmation changes; Result Review did not expand.
- Boss 90-column output had no changed cells in the compared snapshots.
- Admin increased only because of isolated external input changes; no Phase 5B false-action explosion was found.
- Medication/LEDD and unrelated scientific domains showed no Phase 5B drift.
- Representative live Trace runtime checks: PASS.

### Operations vNext first vertical slice

- Production source reconciliation and guarded deployment completed with an immutable pre-change rollback version.
- Shared field/applicability diagnosis now feeds Boss scan mode, Trace, and hidden Admin action classification.
- Production Output acceptance passed against the real workbook: Boss retained the 90-column/value contract, Admin direct verification passed, and the diagnostic summary contained aggregate counts only.
- Boss scan formatting and notes are derived, rollback-protected, and written in batches after a one-pass source index.
- Existing selected-Boss-cell Trace remains available; participant-first P_ID/S_ID/name search, suspicious/all-blank/current-value views, and safe lineage navigation are installed.
- Admin identity resolution now has a read-only preview and explicit confirmation before the already accepted Record_Control authority write. Production preview execution passed; no new identity authority decision was made in this work cycle.
- Raw, Event, Participant, Result, Decision, scientific rules, Registry, Contactlist, and Incremental behavior were not changed.
- A first Production runtime attempt exposed a matcher integration error; Output rolled back, the one-line defect was fixed with a regression guard, and subsequent Production Output runs passed.

## PROVEN DEFECTS / FINDINGS

### Participant current-state merge semantics

- The generic latest-present-value merge can allow later unrelated events to overwrite valid earlier participant state.
- High-confidence examples are workflow/completion state written by non-owner event domains.
- This is a Participant current-state projection problem; Raw/Event history remains preserved.
- Phase 5B is the current candidate fix and has passed code, live-contract, Candidate Full, propagation, and representative live Trace acceptance. The staged Step 3/Step 4 rollback contract remains a separate unproven release property.

### Frontend payload pollution

- Non-owner routes can emit unrelated/default completion values and other route-independent derived/default state.
- Receiver/Event preserve those submitted values faithfully; the downstream merge must not treat every emitted leaf as equally authoritative.
- Frontend payload hygiene remains later work after Participant correctness acceptance.

### Backfill ownership contamination

- A Backfill event can contain genuine evidence for one domain while also carrying unrelated derived/default completion values for other domains.
- Therefore `historical_paper_reentry` event type alone is insufficient to grant authority over every completion domain.

### Medication / LEDD authority backlog

- A separate forensic audit found that many blank PD LEDD outputs are authority/review/mapping gated rather than simple source absence.
- One reproducible cohort already carries verified legacy final values in current processing but remains pending at final-source authority selection.
- A broader structured-evidence factor-authority asymmetry exists across multiple medications; Safinamide/Xadago is one clear fixture, not the whole problem.
- These findings pre-existed Phase 5B and showed no Phase 5B propagation drift.
- Keep this work separate from the Phase 5B promotion decision.

### Incremental runner state

- `runApathyCandidateIncremental()` is intentionally disabled in the active Full-only runner contract and predates Phase 5B.
- Existing Incremental-related code is queue scaffolding only; there is no hidden runnable Incremental pipeline or equivalence harness.
- Full-vs-Incremental parity is therefore **N/A for Phase 5B promotion** under the current supported Production contract.
- Do not enable or implement Incremental merely to finish Phase 5B acceptance.

### Rollback runtime gap

- The active Full runner contains real rollback machinery for visible Boss, Admin, and Event checkpoint state.
- Source inspection indicates Step 3 captures the previous published state before Result can write Boss; catchable Step 3/Step 4 failures should restore Boss/Admin/checkpoint and verify restoration fingerprints.
- Natural Apps Script hard timeout is not valid proof that the catch-and-restore path executed.
- Operations vNext Production Output acceptance exercised direct `buildApathyOutput`; it did **not** exercise the staged `continueApathyCandidateFull()` Step 3/Step 4 catch-and-restore contract.
- The staged rollback contract therefore remains unproven and must not be inferred from the successful direct Output run. No specific DEV-clone acceptance procedure is mandated by this status file.

## CURRENT CANDIDATE

### Participant Phase 5B — evidence-gated current-state ownership

Status: **CANDIDATE — SEMANTIC AND FULL-REBUILD ACCEPTANCE PASSED; STAGED RUNNER ROLLBACK CONTRACT NOT YET PROVEN**

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
- representative live Trace checks: PASS;
- Incremental parity: N/A under the active Full-only contract;
- rollback source inspection: PASS;
- confirmed semantic/offline blockers: none.

Separate release validation still unproven:

- prove that a controlled, catchable staged Step 3 or Step 4 failure restores Boss/Admin/checkpoint fingerprints and leaves interpretable failed-run state;
- verify the exact reviewed Phase 5B source and rollback-to-prior-source path before any Phase 5B promotion decision;
- retain final human operational judgment for atomic promotion.

## NOT_DONE

### Admin product

- Admin product is not complete.
- Completion of manual identity resolution does **not** mean Admin is done.
- Admin should become an operations console, not only a review list.
- First end-to-end action target: resolve an orphan/unassigned formal submission through the existing authority/control mechanism without rewriting Raw.
- Detailed product direction is in `ADMIN_TRACE_VNEXT_SPEC.md`.
- The first shared-diagnosis/scan/search/manual-identity slice is accepted, but broader Admin lifecycle, additional action types, and full navigation polish remain unfinished.

### Trace product completion

- Participant-first P_ID/S_ID/name search, suspicious/all-blank/current-value views, safe lineage navigation, scan-mode Boss coloring, the shared diagnosis vocabulary, first-break explanation, and the first staff-action classification are installed and accepted for the Operations vNext vertical slice.
- Any future field/scale search expansion, broader action domains, and full UI polish remain product backlog rather than defects in the installed slice.
- Boss blank must be explainable, but Boss blank does not automatically imply an Admin task.

### Frontend evidence hygiene

- Route/domain payload emission still needs tightening so non-owner defaults are not emitted as if they were authoritative evidence.

## CURRENT MAINLINE

1. **Operations vNext staff adoption and concrete feedback.**
   - Treat the installed search/scan/diagnosis slice as accepted.
   - Address only evidence-backed usability defects; do not reopen scientific or Phase 5B semantics.

2. **Phase 5B staged rollback proof remains a separate release gate.**
   - Do not infer it from direct Production Output acceptance.
   - Do not develop Incremental to satisfy it.
   - Use a separately reviewed, reversible controlled-failure plan before any Phase 5B promotion decision; this status file does not prescribe a DEV clone.

3. **Later backlog:** frontend payload hygiene, medication/LEDD authority, broader Admin/Trace product work, and architecture contraction/legacy cleanup.

## DO NOT REOPEN / DO NOT BROADEN

Absent contradictory evidence, do not spend agent time re-proving:

- accepted manual identity-resolution work;
- Phase 5C source/predicate review;
- Candidate Full rebuild success;
- offline Phase 5B propagation/scope/provenance/Boss/Admin acceptance;
- representative live Trace acceptance;
- whether Backfill is valid evidence (it is; authority is domain-specific);
- a global true-once redesign;
- Incremental implementation or equivalence for this Full-only release;
- medication/LEDD authority defects as if they were Phase 5B regressions.

## AGENT WORKFLOW

- **ChatGPT / project lead reasoning:** define scope, acceptance criteria, status transitions, product contracts, and hostile semantic review.
- **Copilot:** heavy offline mechanical/static work, simulations, bulk diffs, source scans, and candidate drafting.
- **Codex:** narrow high-value code edits, live-source integration, runtime, and Production-sensitive review only when human UI actions are insufficient.
- **Human operator:** perform simple UI/runtime actions, clone/test operations, Production actions, and final operational/product judgment.

Operational rule: if a human can complete a task safely in seconds or a few minutes by clicking/running an existing function, prefer explicit human-readable UI instructions over spending Codex time. Use Codex for code edits, live-source integration analysis, runtime failures, or cross-file dynamic reasoning.

Agents should treat this file as current status, not as historical narrative. When a newer candidate supersedes an older one, keep only the minimum historical note necessary to explain the current state.
