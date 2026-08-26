# APATHY TASK PACKET

## Task

**Phase 5C — Narrow live-source review of Participant Phase 5B**

This task packet is intentionally sanitized for the public repository. Any backend source, private candidate files, workbook snapshots, participant-level fixtures, Production logs, or identifiers must be supplied to Codex privately and must not be committed here.

## Required context

Before doing anything, read:

1. `CURRENT_STATUS.md`
2. the current private/live `participant.gs`
3. the private Phase 5B candidate `participant.gs`
4. the private Phase 5B diff and simulation summary if supplied

Do **not** restart the investigation or perform a broad architecture audit.

## Accepted semantic contract

Treat the following as already established for this review:

- Raw/Event evidence remains preserved.
- The defect is in Participant current-state winner semantics, not evidence loss.
- The approved candidate scope is narrow completion ownership plus the proven workflow regression guard.
- Normal owner events retain their existing owner-domain authority.
- Backfill remains valid formal evidence.
- Backfill completion authority is domain-specific and requires same-event source-level evidence for the corresponding domain.
- A single qualifying source item is sufficient to establish Backfill domain evidence; do not require a complete questionnaire.
- Rejected current-state winners must remain in provenance/history.
- Do not introduce global `TRUE_ONCE` behavior.
- Do not broaden into unrelated scientific/timepoint semantics.

## Review goals

Review Phase 5B against the **current live/private source** and current payload/path contracts.

Check only concrete defects in these areas:

1. **Event-type normalization**
   - Confirm the actual current Participant event-type normalization.
   - Verify that the candidate owner-event names match the normalized values used during merge.

2. **Exact source-path vocabulary**
   Confirm current source-level path vocabulary for the approved domains:
   - HADS
   - SAS
   - QUIP-RS
   - GAS
   - AMI
   - C-DARS
   - R-GPTS
   - PDI
   - IOR
   - UPDRS III

3. **Backfill evidence predicates**
   For each Phase 5B predicate, look for:
   - false negatives on legitimate source evidence;
   - false positives on completion, total, calculated, status, review, or other derived leaves.

4. **Complexity / implementation shape**
   - Confirm Backfill domain evidence is computed once per event and reused during leaf winner selection.
   - Do not replace this with per-completion rescans of the same event.

5. **Provenance preservation**
   - Confirm all formal present leaves continue to append to Field Provenance even when rejected as current-state winners.

6. **Scope containment**
   - Confirm paths outside the approved Phase 5B scope are behaviorally unchanged.
   - Do not add new semantic families during this review.

7. **Runner / interface stability**
   - Confirm public entrypoints, Participant sheet contracts, and Full runner integration remain unchanged unless a concrete defect requires a narrow fix.

8. **Clinical event alias check**
   - Determine whether any extra Clinical owner alias in the candidate is actually reachable after current Participant normalization.
   - Do not change it merely for cleanliness if it is harmless.

## Known simulation-harness note

The supplied offline Python simulation genuinely computes the unsupported-Backfill-winner metric.

One secondary reported overwrite metric was not independently populated in the harness; it was effectively inferred from the genuinely computed unsupported-winner result.

Treat this as a **test-harness quality issue**, not automatically as a Participant implementation blocker.

If useful, either:

- compute the secondary metric independently, or
- state explicitly that it is a derived assertion rather than an independent test.

## Modification rule

If a concrete live-source/predicate defect is found:

- modify **only `participant.gs`**;
- keep the same narrow semantic contract;
- make the smallest possible change;
- report the exact defect and exact changed functions/lines;
- rerun only the relevant candidate checks;
- do not touch Event, Result, Output/Admin, Trace, Receiver, frontend, migration code, Raw, or workbook data.

If no concrete blocker is found:

> Declare Phase 5B ready for **Candidate Full rebuild**.

Do not perform Production promotion in this task.

## Required output

Return a concise review with:

1. verdict: `BLOCKED` or `READY_FOR_CANDIDATE_REBUILD`;
2. exact concrete defects found, if any;
3. exact candidate changes made, if any;
4. predicate/path-vocabulary verification result;
5. provenance/scope/runner checks;
6. simulation-harness note disposition;
7. the next operational step.

Stop after this narrow review.
