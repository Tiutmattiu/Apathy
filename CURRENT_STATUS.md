# APATHY CURRENT STATUS

Last updated: 2026-08-26

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

## PROVEN DEFECTS / FINDINGS

### Participant current-state merge semantics

- The generic latest-present-value merge can allow later unrelated events to overwrite valid earlier participant state.
- High-confidence examples are workflow/completion state written by non-owner event domains.
- This is a Participant current-state projection problem; Raw/Event history remains preserved.

### Frontend payload pollution

- Non-owner routes can emit unrelated/default completion values and other route-independent derived/default state.
- Receiver/Event preserve those submitted values faithfully; the downstream merge must not treat every emitted leaf as equally authoritative.
- Frontend payload hygiene remains a later mainline task after Participant correctness acceptance.

### Backfill ownership contamination

- A Backfill event can contain genuine evidence for one domain while also carrying unrelated derived/default completion values for other domains.
- Therefore `historical_paper_reentry` event type alone is insufficient to grant authority over every completion domain.

## CURRENT CANDIDATE

### Participant Phase 5B — evidence-gated current-state ownership

Status: **CANDIDATE — NOT IN PRODUCTION**

Scope:

- implementation target is `participant.gs` only;
- completion winners are event-domain-owned for the approved narrow completion-field set;
- workflow projection prevents the proven Stage 2 → Stage 1 regression case without introducing a general workflow state machine;
- Backfill remains formal evidence;
- Backfill completion authority requires same-event source evidence for the corresponding domain;
- partial Backfill remains valid: one qualifying source-level item is sufficient to establish domain evidence;
- no global `TRUE_ONCE` semantics;
- rejected current-state winners remain preserved in provenance/history;
- scientific item scores, MoCA, MRI safety, MRI sequence values, medication/LEDD, inclusion/withdrawal, payment/receipt, identity authority, and other measurements are outside this candidate's semantic changes.

Offline candidate checks currently indicate:

- scope leakage outside the approved paths: none detected;
- unsupported Backfill completion winners under the candidate: none detected;
- provenance sequence behavior remains unchanged in the simulation;
- accepted fixture behavior from the earlier narrow Participant correction is preserved.

Known non-blocking test-harness note:

- one reported overwrite metric in the Python simulation was not independently populated; it is logically implied by the genuinely computed unsupported-winner count, but Codex should either compute it independently or label it as a derived assertion.

### Phase 5B acceptance state

- Candidate implementation: ready for narrow Codex live-source review.
- Production deployment: **not performed**.
- Candidate Full rebuild: **not performed**.
- Production acceptance: **not granted**.

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

1. **Codex narrow live-source review of Participant Phase 5B.**
   - Do not restart the investigation.
   - Verify current live event-type normalization and exact source-path vocabulary.
   - Check only concrete predicate/implementation defects.
   - Do not broaden semantic scope.

2. **Candidate Full rebuild** if Codex finds no blocker (or after only narrow concrete fixes).

3. **Regression / propagation review** after the Candidate rebuild:
   - Participant current-state winner lineage;
   - Result Review changes;
   - Boss output changes;
   - Admin action-volume / action-semantic changes;
   - Trace regression on representative cases;
   - blank propagation, especially whether removing false zeros creates spurious staff actions.

4. **Full-run / rollback verification** and parity checks required by the active runner contract.

5. **Atomic promotion only after acceptance checks pass.**

6. After Participant correctness is accepted:
   - Frontend payload hygiene;
   - Trace/shared resolver maturity;
   - Admin adoption of the shared resolver;
   - later architecture contraction and legacy cleanup.

## DO NOT REOPEN / DO NOT BROADEN

Absent contradictory evidence, do not spend agent time re-proving:

- accepted manual identity-resolution work;
- broad architecture archaeology already completed for the current Participant defect;
- whether Backfill is valid evidence (it is; authority is domain-specific);
- a global true-once redesign;
- unrelated semantic families while reviewing Phase 5B;
- Admin redesign before Participant correctness acceptance.

## AGENT WORKFLOW

- **ChatGPT / project lead reasoning:** define scope, acceptance criteria, status transitions, and hostile semantic review.
- **Copilot:** heavy offline mechanical/static work, simulations, bulk diffs, source scans, and candidate drafting.
- **Codex:** narrow high-value live-source, integration, runtime, and Production-sensitive review.
- **Human operator:** Production actions and final operational/product judgment.

Agents should treat this file as current status, not as historical narrative. When a newer candidate supersedes an older one, keep only the minimum historical note necessary to explain the current state.
