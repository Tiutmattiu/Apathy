# APATHY TASK PACKET

## Task

**Phase 5B — Controlled DEV Rollback Runtime Acceptance**

This packet is intentionally sanitized for the public repository. Do not commit participant identifiers, clinical payloads, workbook contents, private backend source, logs containing sensitive data, credentials, tokens, or Production secrets.

## Current accepted state

Treat these as already established and do not re-prove them unless contradictory runtime evidence appears:

- Phase 5C live-source review: PASS.
- Candidate Full rebuild: PASS.
- Offline propagation audit: PASS for Phase 5B scope/propagation.
- Scope leakage: none found.
- Field Provenance: preserved.
- Result propagation: expected only.
- Boss regression: none in the compared snapshot.
- Admin false-action explosion caused by Phase 5B: none found.
- Medication/LEDD drift caused by Phase 5B: none found.
- Representative live Trace runtime checks: PASS.
- Rollback machinery exists in the active Full runner by source inspection.

The separate medication/LEDD authority backlog and Admin/Trace vNext product work are not part of this runtime acceptance task.

## Incremental disposition

The active runner is Full-only.

`runApathyCandidateIncremental()` is intentionally disabled and the remaining Incremental-related code is queue scaffolding only. There is no hidden runnable Incremental pipeline or equivalence harness.

Therefore for Phase 5B:

- Incremental remains intentionally disabled.
- Do not enable or implement Incremental.
- Full-vs-Incremental parity is **N/A for this release**.

This is an accepted clarification of the active runner contract, not a Phase 5B defect.

## Human-first operating rule

Prefer simple human UI actions when an existing function or sidebar can safely perform the check in seconds or a few minutes.

Use Codex only for the narrow code edit / integration review needed to add the guarded DEV rollback harness, or if runtime behavior is ambiguous after the controlled test.

## Required remaining check

### Controlled rollback integration on a DEV clone

The only remaining Phase 5B runtime acceptance gap is proving the catch-and-restore path actually executes.

Natural Apps Script hard timeout is not sufficient proof because execution may terminate before JavaScript `catch` runs.

Add the smallest possible **DEV-clone-only failpoint harness in `helper.gs` only**.

Required properties:

1. private one-shot failpoint reader;
2. failpoint after Step 3 direct Boss write/verification but before Step 3 is finalized;
3. failpoint after Step 4 direct output verification but before checkpoint commit;
4. two no-argument human-callable DEV arming functions;
5. one read-only result checker;
6. no change to Event, Participant, Result, Output, Raw, Registry, Contactlist, checkpoint semantics, or scientific logic.

### Mandatory safety guards

Arming must refuse unless all are true:

- current workbook is a dedicated clone;
- explicit DEV Script Property is enabled;
- current workbook ID differs from the recorded Production workbook ID;
- run is at the exact expected stage;
- checkpoint has not been committed;
- failpoint is one-shot and cleared before throwing;
- no Raw writes;
- no fake participant insertion;
- no Production execution.

### Test A — Step 3 rollback

On a fresh DEV clone:

1. complete Full Steps 1 and 2;
2. arm the Step 3 failpoint;
3. run normal Step 3;
4. expect a controlled catchable failure;
5. verify:
   - Boss fingerprint restored to pre-Step-3 value;
   - Admin fingerprint restored;
   - Event checkpoint fingerprint restored;
   - state is `FAILED`;
   - failed stage is Result Core;
   - restart is required;
   - checkpoint is not committed;
   - rollback snapshot is closed/removed according to the active contract.

### Test B — Step 4 rollback

On a fresh clean Full run in the DEV clone:

1. complete Steps 1 through 3;
2. arm the Step 4 failpoint;
3. run normal Step 4;
4. expect a controlled catchable failure before checkpoint commit;
5. verify the same restoration guarantees, with failed stage = Output Core.

## Modification rule

If implementation is required:

- modify **only `helper.gs`**;
- keep the harness permanently DEV-guarded or remove it after evidence is captured;
- do not change the active Full semantics;
- do not touch Participant Phase 5B logic;
- do not add Incremental behavior;
- do not install or execute test-only failpoints in Production.

## Verdicts

After the two controlled tests, use one of:

- `BLOCKED`
- `READY_FOR_ATOMIC_PROMOTION`

Do not use `PRODUCTION_READY` before rollback runtime acceptance passes and the exact reviewed Participant source / rollback source path are confirmed.

## Required sanitized handoff

Return or write a concise sanitized handoff containing:

1. DEV-clone guard verdict;
2. Step 3 rollback verdict;
3. Step 4 rollback verdict;
4. Boss/Admin/checkpoint restoration-fingerprint verdict;
5. failed-run state / restart-required verdict;
6. whether any source file changed and exact file;
7. whether test-only harness remains installed and how it is guarded;
8. atomic-promotion readiness;
9. concrete blocker, if any;
10. next human action.

No participant identifiers or private workbook evidence in the public repository.

Stop after rollback runtime acceptance. Do not broaden into medication/LEDD, frontend cleanup, Admin redesign, Trace redesign, migration, or Incremental architecture.
