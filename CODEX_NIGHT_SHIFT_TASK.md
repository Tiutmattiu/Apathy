# APATHY CODEX NIGHT SHIFT — Hard Integration Task

Status: **ACTIVE TASK PACKET — SANITIZED**

Purpose: use Codex for work that genuinely benefits from live repository access, cross-file integration reasoning, local execution, tests, and iterative code modification. This is not a brainstorming task and not a documentation-only task.

Privacy: the public repository must not receive participant identifiers, phone numbers, names, clinical payloads, workbook contents, credentials, tokens, or other private Production evidence.

## Primary objective

Build the first real end-to-end **Apathy Operations vNext** vertical slice while preserving the current Production data model and scientific logic.

The vertical slice must unify:

1. a shared field/applicability diagnosis resolver;
2. Boss scan-mode coloring + cell notes;
3. existing click-a-Boss-cell Trace drill-down;
4. participant/field Trace search;
5. Admin action classification;
6. one real resolvable Admin action: **resolve orphan/unassigned formal submission through the existing identity/control authority contract without editing Raw**.

This is intentionally a hard cross-file task. Do not stop after producing a plan if safe local implementation and tests are possible.

## Before coding

Read at minimum:

- `CURRENT_STATUS.md`
- `TASK_PACKET.md`
- `ADMIN_TRACE_VNEXT_SPEC.md`
- `BOSS_SCAN_MODE_IMPLEMENTATION_PACKET.md`
- current backend source files relevant to Trace, Output/Boss, Admin, Participant assignment, Registry, Record_Control/manual identity resolution, menus/sidebars, and helper runner integration.

Inspect the actual repository and derive the real integration points. Do not invent function names, sheet contracts, or authority paths from the task description.

## Non-negotiable contracts

- Raw remains append-only evidence.
- Never repair identity by silently editing a wrong submitted phone/name in Raw.
- Registry remains identity authority after inclusion.
- Backfill is formal evidence but not universal field authority.
- Existing scientific calculations, score formulas, cutoffs, medication/LEDD logic, MRI science logic, inclusion/exclusion logic, and Phase 5B Participant winner semantics must not be changed by this task.
- Existing Boss values/90-column schema must remain semantically unchanged; scan mode adds diagnosis/formatting/notes, not new scientific values.
- Existing click-cell Trace capability must remain available.
- Incremental remains disabled; do not implement or enable it.
- Do not deploy or execute Production actions autonomously. Local code/test work is allowed. Any final Production write/runtime step must be surfaced as an explicit human action.
- No participant-specific hardcoding.

## Workstream A — Shared diagnosis resolver

Implement the smallest reusable resolver that can answer, for a participant + Boss field/domain:

- current value
- applicable? YES/NO/UNKNOWN
- expected blank? YES/NO/UNKNOWN
- source status
- Participant status
- Result/Review status
- first break
- primary diagnosis
- action class
- staff action required
- human explanation
- suggested action
- lineage references sufficient for Trace/navigation

Use or adapt the vocabulary from `ADMIN_TRACE_VNEXT_SPEC.md`:

- `RESOLVED_WITH_FORMAL_EVIDENCE`
- `NON_APPLICABLE`
- `NOT_COLLECTED`
- `NO_FORMAL_SOURCE`
- `IDENTITY_UNRESOLVED`
- `SOURCE_EXISTS_PARTICIPANT_BREAK`
- `PARTICIPANT_EXISTS_RESULT_GATE`
- `REVIEW_OR_AUTHORITY_GATED`
- `RESULT_EXISTS_BOSS_PUBLICATION_BREAK`
- `UNKNOWN`

Do not force low-confidence cases into a definitive diagnosis. UNKNOWN is better than a false staff task.

The resolver must be shared/reused by Boss scan mode, Trace, and Admin rather than duplicating three divergent heuristics.

## Workstream B — Boss scan mode

During Output/Boss publication, diagnose blank Boss cells and apply **visual QA only**.

Required behavior:

- preserve all Boss values exactly;
- do not add/remove/reorder scientific columns;
- only blank cells are candidates for diagnosis coloring;
- color classes should be deterministic and centralized:
  - grey: expected / non-applicable;
  - yellow: genuine source gap / likely staff data action;
  - orange: review or authority gated;
  - purple: identity unresolved;
  - red: pipeline/projection/publication break;
  - unclassified/low confidence: leave uncolored or use the existing neutral style;
- add a concise cell note/comment containing at least diagnosis, first break, staff-action status, and short explanation;
- preserve the existing ability to click the cell and run Trace;
- emit an aggregate sanitized QA summary at the end of Output, e.g. counts by diagnosis/color/action class, with no participant identifiers in public logs/docs.

Avoid per-cell expensive rescans if the needed upstream tables can be indexed once per Output run. Performance matters on the real workbook.

## Workstream C — Trace vNext without deleting current Trace

Keep the current selected-Boss-cell Trace entrypoint.

Add participant-first navigation capable of:

- search by P_ID / S_ID / name using the existing authorized backend context;
- select/search Boss field or scale/domain;
- show suspicious blanks only;
- show all blanks;
- show current values;
- show participant overview: Registry qualification, Boss eligibility/reason, event counts, workflow stage, available/missing/non-applicable domains, suspicious blank count, actual staff-action count;
- show the shared diagnosis result before expanding low-level evidence.

Reuse the existing lineage/evidence rendering wherever possible. Do not replace useful forensic detail with a simplified rewrite.

## Workstream D — Admin becomes actionable

Refactor only enough Admin logic to consume the shared diagnosis/action model.

Classify items into:

- `RESOLVABLE_IN_APP`
- `STAFF_DATA_ACTION`
- `TRACE_ONLY_NO_ACTION`
- `ESCALATE`

Expected/non-applicable blanks must not create staff tasks.
Pipeline defects must not instruct staff to re-enter scientific data.
Authority-gated values must not automatically become missing-data tasks.

## Workstream E — First real action: resolve orphan submission

Implement one end-to-end Admin action for an unresolved/unassigned formal submission using the **existing supported manual identity / Record_Control authority contract** discovered in source.

Required UX/behavior:

- Admin shows the unresolved submission as actionable;
- staff can inspect safe identity hints and search Registry by supported identifiers;
- provide one-click navigation where feasible to Registry, Backfill, Record_Control, and Raw source row with target row/cell selected/highlighted;
- allow staff to select an existing Registry participant;
- show a confirmation preview before writing;
- Raw remains unchanged;
- write only through the existing authoritative control/manual-resolution mechanism;
- preserve audit lineage: affected submission, selected participant/authority target, reason/action, timestamp/operator where available;
- cancel must make no data change;
- after resolution, re-evaluate through the smallest **currently supported Full-only** path; do not invent Incremental;
- the Admin item must become resolved/disappear from the active action inbox once the existing full rebuild/re-evaluation confirms the assignment.

If the current authority contract cannot safely support one of these steps, implement up to the safe boundary and record the exact blocker. Do not invent a second identity authority system.

## Workstream F — Phase 5B rollback harness compatibility

A separate Phase 5B runtime task is finishing a controlled catchable rollback acceptance harness in `helper.gs` for the real Production workbook. Do not undo or conflict with that work.

If local `helper.js` already contains an uncommitted rollback-harness patch, preserve it exactly or isolate your work so it can be reviewed independently. Report any overlap/conflict in the handoff.

Do not enable Incremental.

## Testing requirements

Run all practical local/static tests and add focused regression tests where the repository structure supports them.

At minimum prove locally, without committing private Production data:

1. Boss scientific values/schema are unchanged by scan mode.
2. Existing Trace selected-cell entrypoint still resolves.
3. Shared resolver returns stable deterministic classifications for controlled fixtures.
4. Non-applicable blanks do not become Admin actions.
5. A source-exists/downstream-break fixture is classified as technical/pipeline, not staff data entry.
6. Identity-unresolved case is classified `RESOLVABLE_IN_APP` or escalated only according to the actual authority contract.
7. Orphan resolution does not mutate Raw.
8. Wrong/ambiguous resolution can be cancelled without writes.
9. No participant-specific constants or private identifiers are introduced.
10. Performance is not obviously quadratic over Boss cells × full Event history; build indexes/caches where necessary.

Use synthetic fixtures only for regression tests. Do not claim final Production acceptance from synthetic data.

## Execution style

Work continuously and autonomously through the repository:

- inspect source;
- map contracts;
- implement;
- run tests;
- fix failures;
- rerun tests;
- inspect diffs for scope leakage;
- commit coherent milestones.

Do not repeatedly stop to ask for approval for ordinary local edits/tests already authorized by this task.

Do stop before any real Production deployment, Apps Script remote write, destructive workbook operation, or irreversible action and leave exact human instructions instead.

## Git / commit requirements

Prefer a dedicated branch such as `codex/ops-vnext-vertical-slice` unless the current repository workflow clearly requires another approach.

Make coherent commits rather than one opaque mega-commit. Suggested milestones:

1. shared diagnosis resolver + tests;
2. Boss scan mode + Trace integration;
3. Admin action classification + orphan resolver;
4. docs/handoff/status updates.

Do not commit private data, workbook exports, logs with participant identifiers, credentials, tokens, or local machine secrets.

## Mandatory GitHub markdown handoff

This requirement is **not optional**.

Before stopping, create or update a sanitized markdown file in the repository:

`CODEX_HANDOFF.md`

It must contain:

- date/time;
- branch;
- exact commit SHAs;
- files changed;
- what was actually implemented;
- what was deliberately not implemented;
- tests run and exact PASS/FAIL summary;
- performance notes;
- unresolved blockers;
- any conflict with the Phase 5B rollback-harness patch;
- whether any Production action was executed (expected: no unless explicitly authorized later);
- exact next human actions;
- exact next Codex task if more work remains.

Also update `CURRENT_STATUS.md` only with sanitized, verified status transitions. Do not mark Admin DONE unless the product scope is actually complete. Do not mark Phase 5B Production-accepted unless the runtime/rollback gate has truly passed.

Commit and push the handoff markdown together with the implementation branch so another agent can continue without reading chat history.

## Final deliverable

Return in chat only a concise summary pointing to the repository handoff and commits. The repository markdown is the canonical result.

A good outcome is a tested, reviewable vertical slice that materially reduces human sheet-hunting and turns at least one real Admin problem class into a confirmable operation, without changing scientific data semantics.
