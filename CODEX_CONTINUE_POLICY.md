# APATHY CODEX CONTINUATION POLICY

Status: **ACTIVE NIGHT-SHIFT EXECUTION POLICY**

This file clarifies how the active Codex night-shift task should continue when the human operator is unavailable.

## Core rule

**Do not stop merely because a milestone, policy clarification, local implementation pass, or review note is complete. Continue the original night-shift objective until either the objective is materially complete or a true hard blocker remains.**

The human operator has explicitly authorized autonomous progress overnight for work that is reversible and recoverable.

## Approval policy

Do **not** wait for human approval for:

- repository inspection;
- local edits;
- tests;
- branch/worktree operations;
- commits and pushes;
- sanitized GitHub markdown handoff updates;
- Apps Script source reconciliation against the known Production project;
- reversible Apps Script source updates to the real existing Production project **after** automatically verifying the exact Script ID/target and preserving a recoverable pre-write source snapshot/diff;
- reversible runtime checks against the real Production workbook when the task already defines their rollback/recovery contract and the operation does not intentionally alter scientific evidence;
- restoring a previously saved source version when needed to recover from a failed reversible test.

The operator has stated that recoverable work should proceed without waking them for approval.

## Mandatory safeguards before any live write

Before writing to the real Apps Script project or running a reversible Production validation:

1. verify the exact Script ID and spreadsheet/workbook target against the current authoritative project context;
2. capture the current remote source/version needed for recovery;
3. record the intended diff;
4. ensure the action does not mutate Raw research evidence or introduce fake/synthetic participant data;
5. ensure a concrete rollback/recovery path exists;
6. execute the smallest reversible operation;
7. validate immediately against the real current workbook/runtime;
8. if validation fails, recover using the saved version/rollback mechanism and continue investigation.

## When to stop and wait for the human

Stop only if the next required operation is materially one of the following:

- irreversible or destructive with no verified recovery path;
- changes scientific meaning, score/cutoff/eligibility/medication/MRI interpretation, or requires research judgment not already specified by an accepted contract;
- would edit or delete Raw research evidence;
- would resolve an ambiguous identity by guesswork rather than an existing authority rule;
- requires credentials/permissions that are unavailable;
- a hard platform limitation prevents further progress;
- concurrent agent work creates an unresolved conflict where either branch could overwrite accepted work and safe isolation/reconciliation is not possible.

A normal reversible Production source update is **not** by itself a reason to stop.

## Continuation behavior

After each coherent milestone:

- test it;
- reconcile against current real source where applicable;
- continue to the next milestone;
- do not return a final answer simply because one subtask is done;
- keep `CODEX_HANDOFF.md` current as work progresses;
- make coherent commits and push them;
- preserve unrelated uncommitted work;
- if another Codex thread is active, use branch/worktree isolation and reconcile intentionally rather than overwriting.

If the original `CODEX_NIGHT_SHIFT_TASK.md` and this file differ only on whether reversible live work may proceed without approval, **this file takes precedence**.

## Required finish condition

Before finally stopping, Codex must create/update and push sanitized `CODEX_HANDOFF.md` with:

- branch and commit SHAs;
- exact files changed;
- live source/runtime actions actually executed;
- backups/recovery points captured;
- tests and runtime checks performed;
- PASS/FAIL results;
- anything reverted/recovered;
- remaining blocker, if any;
- exact next human action only if one is genuinely required.

Do not mark Phase 5B Production-accepted, Admin DONE, or other status transitions unless the actual acceptance evidence supports them.
