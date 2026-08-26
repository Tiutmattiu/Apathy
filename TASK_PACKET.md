# APATHY TASK PACKET

## Task

**Phase 5B — Final Runtime / Rollback Acceptance**

This packet is intentionally sanitized for the public repository. Do not commit participant identifiers, clinical payloads, workbook contents, private backend source, logs containing sensitive data, credentials, tokens, or Production secrets.

## Current accepted state

Treat these as already established and do not re-prove them unless contradictory runtime evidence appears:

- Phase 5C live-source review: PASS.
- Candidate baseline matched the current Production-aligned Participant source with no unrelated drift.
- Candidate Full rebuild completed successfully through Event, Participant, Result/Decision, Boss/Admin, and checkpoint.
- Offline propagation audit: `READY_FOR_FINAL_RUNTIME_CHECKS`.
- Phase 5B Participant changes stayed within the approved 12 completion paths plus the narrow workflow-stage regression guard.
- Scope leakage: none found.
- Field Provenance: preserved.
- Result propagation: limited to expected PDI confirmation changes.
- Boss regression: none in the compared snapshot.
- Admin false-action explosion caused by Phase 5B: none found.
- Medication/LEDD drift caused by Phase 5B: none found.

The separate medication/LEDD authority backlog is not part of this task.

## Human-first operating rule

Prefer simple human UI actions when an existing function or sidebar can safely perform the check in seconds or a few minutes.

Do not invoke Codex merely to click an existing button or run an existing function.

Use Codex only if runtime behavior is ambiguous, a code change is required, a runner/integration failure needs live-source analysis, or cross-file dynamic reasoning cannot be resolved by the operator.

## Required final checks

### 1. Human live Trace checks

Use the existing Trace UI against representative Phase 5B semantic classes. The private operator may use participant-specific fixtures from the offline audit; do not commit those identifiers here.

Confirm at least:

- normal Stage 2 owner restored over polluted later evidence;
- evidence-supported Backfill remains eligible;
- unsupported Backfill/non-owner completion is rejected as current winner but remains visible in evidence history;
- workflow does not regress from Stage 2 to Stage 1;
- PDI page confirmation winner is correct;
- UPDRS completion ownership behaves correctly;
- an unchanged medication/LEDD case remains unchanged as a negative control.

For each click, record only a sanitized PASS/FAIL summary in the public handoff. Keep participant-level details private.

### 2. Full / Incremental parity

Follow the **existing runner contract**. Do not invent a new runner or new acceptance architecture.

Verify that an incremental run on an appropriate controlled change produces the same final state for affected records as the corresponding Full processing semantics require.

If the operator does not know the exact existing function names, inspect the current helper UI/source or ask for the function dropdown; do not guess command names.

### 3. Rollback / failed-run behavior

Verify the existing rollback/failure contract:

- an intentionally failed or interrupted Candidate run must not replace the last known-correct published output;
- checkpoint/run-state must remain interpretable;
- recovery must use the existing runner/rollback mechanism rather than manual sheet surgery.

Do not damage or intentionally corrupt research data merely to create a failure. Use the safest existing controlled failure/rollback mechanism available in the runner contract.

If no safe existing mechanism is available, stop and report `BLOCKED_RUNTIME_TEST_DESIGN` rather than improvising destructive testing.

### 4. Atomic-promotion readiness

Before promotion, verify:

- exact reviewed Phase 5B Participant candidate is the version intended for promotion;
- no unrelated private/live source edits are bundled with it;
- final runtime checks are all PASS;
- a rollback path to the previous accepted Participant source is available;
- the operator understands the one action that performs promotion under the existing contract.

Do not promote during an analysis-only task. Promotion requires explicit human operator action/judgment.

## Verdicts

Use one of:

- `BLOCKED`
- `READY_FOR_ATOMIC_PROMOTION`

Do not use `PRODUCTION_READY` before all runtime/rollback checks have actually passed.

## Required sanitized handoff

Return or write a concise sanitized handoff containing:

1. Trace runtime verdict;
2. Full/Incremental parity verdict;
3. rollback/failed-run verdict;
4. atomic-promotion readiness;
5. concrete blocker, if any;
6. whether any source file changed;
7. next human action.

No participant identifiers or private workbook evidence in the public repository.

Stop after final runtime/rollback acceptance. Do not broaden into medication/LEDD, frontend cleanup, Admin redesign, migration, or architecture contraction.
