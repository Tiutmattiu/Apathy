# APATHY Copilot Morning Task — Hostile Diagnosis Reconciliation + Real-Data Scan

Status: **HARD OFFLINE/LOCAL TASK — DO NOT TOUCH PRODUCTION WORKBOOK**

Purpose: independently reconcile the new Boss/Trace/Admin diagnosis work against current backend source and real Production snapshots, using exhaustive mechanical analysis rather than another architecture discussion.

This public task is sanitized. Participant identifiers, names, phone numbers, clinical payloads, workbook rows and other private evidence must stay in private/local reports only.

## Why this task exists

Three implementation/evidence streams may now coexist:

1. the current live-aligned backend source (`trace`, `output`, `result`, `participant`, identity/control and runner code);
2. Codex's latest implementation/handoff, if present;
3. ChatGPT's deliberately conservative reference core under `tools/apathy_diagnosis/`.

Do not assume any one of them is correct. Reconcile them against the real source contracts and latest workbook evidence.

The target product behavior is defined by:

- `ADMIN_TRACE_VNEXT_SPEC.md`
- `BOSS_SCAN_MODE_IMPLEMENTATION_PACKET.md`
- `CURRENT_STATUS.md`
- latest `CODEX_HANDOFF.md` if it exists
- `tools/apathy_diagnosis/diagnosis-core.js`
- `tools/apathy_diagnosis/diagnosis-core.test.js`
- `tools/apathy_diagnosis/boss-scan-adapter.reference.js`

## Operating rules

- Use the latest real Production workbook export/snapshot available locally. Do not substitute synthetic fixtures for the main analysis.
- Use current backend source, not historical pasted code, whenever both exist.
- Raw is append-only and must not be modified.
- Do not alter scientific scoring/grouping/medication semantics.
- Do not enable or implement Incremental.
- Do not use historical `Decision_Status`, `Group_by_QUIP` or `Group_by_QUIPRS` as current scientific authority.
- Do not classify a Boss blank as missing merely because it is blank.
- Keep participant-level findings private. Public GitHub handoff must contain counts/classes only.
- If code can safely be implemented and tested locally, do it; do not stop at a plan. Do not deploy to the live Apps Script project or write the Production workbook.

## Task 1 — Prove the current source owners and remove ambiguity

Build a source-proven call/ownership map for the exact current files:

- direct Boss producer;
- Output/Admin producer;
- Trace resolver/render path;
- Result/Review/Medication/Decision surfaces consumed by Trace/Output;
- Participant State / Field Provenance / Assignment surfaces;
- Record_Control manual identity-resolution write path;
- Registry lookup/qualification path;
- current Boss styling/gap-marking path;
- current selection/click-to-Trace behavior.

Explicitly determine whether any current Output code still replaces blank Boss cells with a literal marker such as `⚠ 缺`. If yes, identify the exact active caller and design the migration to derived background/note styling while preserving real blank values and click-to-Trace.

Classify each relevant function as `CURRENT_ACTIVE`, `COMPATIBILITY_ONLY`, `VERIFIER_ONLY`, or `DEAD/UNREACHABLE` with source evidence.

## Task 2 — Build the 90-column Boss semantic map

For every formal Boss column, produce a machine-readable mapping with at least:

```text
boss_field
domain
applicability_rule
required_when
expected_blank_when
authoritative_upstream_surface
upstream_field_or_rule
review_or_authority_gate
boss_publication_rule
identity_dependency
safe_action_class
confidence
source_reference
```

The mapping must distinguish at minimum:

- universal identity/demographic fields;
- PD-only clinical/medication fields;
- HC non-applicability;
- scale totals/domains/completeness;
- Result/Review-gated fields;
- medication/LEDD authority-gated fields;
- MRI/sequence fields;
- optional/universally-uncollected fields;
- fields whose applicability is genuinely unknown.

Do not invent an applicability rule when source does not prove one. Mark it `UNKNOWN`.

## Task 3 — Exhaustive real-data Boss blank classification

Using the latest real Production workbook snapshot, classify **every blank Boss cell** through the proposed shared diagnosis contract.

Required classes:

- `EXPECTED_OR_NOT_APPLICABLE`
- `NO_FORMAL_SOURCE`
- `REVIEW_OR_AUTHORITY_GATED`
- `IDENTITY_UNRESOLVED`
- `PIPELINE_BREAK`
- `UNKNOWN`

For each private/local classified cell preserve:

```text
participant key
Boss field
diagnosis
first_break
action_class
staff_action_required
source evidence status
Participant status
Result/Review status
short explanation
```

Then produce sanitized aggregate counts only for GitHub.

### Mandatory hostile invariants

Fail the implementation if any of these occur:

1. a valid numeric zero is treated as blank;
2. an HC medication/LEDD non-applicable blank becomes a source-gap task;
3. identity-unresolved formal evidence is mislabeled as `NO_FORMAL_SOURCE`;
4. authority/review-gated evidence becomes an automatic recollection request;
5. existing upstream publishable evidence + blank Boss is not detected as a publication/pipeline break;
6. lack of a proven applicability rule is converted into a staff task instead of `UNKNOWN`;
7. rejected/non-owner historical evidence alone creates a current missing-data task;
8. historical grouping columns drive current diagnosis;
9. the classifier requires one expensive sheet read per Boss cell;
10. Boss styling mutates scientific values or replaces real blanks with text markers.

## Task 4 — Triangulate current Trace, current Admin, Codex, and ChatGPT reference

For every diagnosis class and every mapped Boss field/domain, compare:

- current `trace` diagnosis;
- current Output/Admin issue generation;
- Codex implementation, if present;
- `tools/apathy_diagnosis/diagnosis-core.js` reference behavior;
- real workbook evidence.

Produce a disagreement matrix:

```text
field/domain
scenario
current_trace
current_admin
codex
chatgpt_reference
real_evidence_verdict
winner/recommended_semantics
reason
```

Do not resolve disagreements by majority vote. Prefer the current authoritative source/evidence contract.

Specifically inspect known risk patterns already established by prior audits:

- generic Trace pending symptoms that fail to identify the first field-level break;
- Output screening heuristics that can diverge from Trace;
- Admin lineage fallback that may point to an unrelated first row when no exact field match exists;
- stage/submission-presence heuristics that confuse event presence with field evidence;
- medication final-value authority gates versus source absence;
- Backfill evidence versus universal Backfill authority.

## Task 5 — Performance design: one rebuild, not thousands of Trace calls

Measure/estimate the Apps Script cost of the candidate scan-mode implementation.

The production design must:

- bulk-read each required sheet/surface once or a small bounded number of times;
- build in-memory indexes by PID/event/path/domain;
- classify all Boss blanks in memory;
- bulk-write backgrounds and notes;
- avoid invoking full `traceResolveBossField_()` separately for every blank if that function rereads sheets;
- preserve current click-cell Trace as interactive drill-down.

Produce an explicit read/write budget and call-count estimate.

If Codex's implementation performs per-cell sheet scans, refactor it locally or propose the smallest exact patch.

## Task 6 — Boss presentation acceptance simulation

Without modifying Production, simulate the final presentation over the latest workbook snapshot and report:

- total Boss rows and columns;
- total blank cells considered;
- counts by diagnosis/tone;
- actionable staff cells;
- technical escalation cells;
- `UNKNOWN` cells;
- fields with the highest suspicious-blank count;
- participants with the highest suspicious-blank count (private report only);
- whether any valid nonblank value would change appearance/value;
- whether click-to-Trace remains structurally compatible.

The intended semantic tones are:

- grey/neutral = expected or not applicable;
- yellow = genuine formal-source gap;
- orange = review/authority gate;
- purple = identity unresolved;
- red = pipeline break;
- no style = unknown/unclassified.

Exact hex values are presentation detail; semantic class stability matters more.

## Task 7 — Admin operations feasibility: orphan submission first

Audit the current manual identity-resolution path end to end, especially the current function that writes effective identity into `Record_Control` from an Admin decision.

Determine whether the current backend already provides enough safe primitives for this UI flow:

```text
Admin orphan item
 -> Find participant (PID/SID/name/authorized phone)
 -> Preview selected Registry participant
 -> Confirm
 -> write supported Record_Control authority
 -> preserve Raw unchanged
 -> next Full rebuild/re-evaluation assigns event deterministically
 -> item becomes resolved
```

Identify exact missing glue versus already-existing capability.

Hostile checks:

- no fuzzy-name auto-merge;
- Registry qualification enforced;
- original wrong phone remains in Raw;
- control write is auditable;
- cancel makes no data change;
- resolved control survives rebuild;
- no manual direct editing of hidden technical sheets is required in the final UX.

If a minimal local implementation is safe and does not collide with Codex work, implement it on a separate coherent commit; otherwise return an exact patch plan.

## Task 8 — Reconcile and improve code, not just report

If current local source and Codex changes are available:

1. run syntax/static checks;
2. run existing tests;
3. run or add pure/offline semantic tests for diagnosis classes;
4. fix proven defects in the local candidate only;
5. preserve unrelated Phase 5B and rollback-harness work;
6. keep changes coherent and reviewable;
7. do not deploy remotely.

The ChatGPT reference files are deliberately conservative and adapter-free. They are allowed to be incomplete. If they are semantically wrong, document and correct them rather than bending Production to match them.

## Required outputs

### Private/local report

Create a detailed report containing participant-level fixtures and exhaustive matrices. Keep it local/private; do not push sensitive evidence.

Suggested name:

`APATHY_DIAGNOSIS_REAL_DATA_PRIVATE_AUDIT.md`

### Public GitHub handoff

Create or update:

`COPILOT_MORNING_HANDOFF.md`

It must be sanitized and include:

1. exact source files reviewed;
2. current owner/call-path verdict;
3. 90-column mapping completion count and unknown count;
4. aggregate blank-diagnosis counts only;
5. disagreement summary across Trace/Admin/Codex/ChatGPT reference;
6. performance/read-write budget;
7. code changed, with commit SHAs;
8. tests run and outcomes;
9. orphan-resolver feasibility verdict;
10. concrete blockers;
11. next human action.

Do not put participant IDs, names, phone numbers, clinical rows or workbook payloads into the public handoff.

## Final verdicts

Use one diagnosis-implementation verdict:

- `READY_FOR_INTEGRATION_REVIEW`
- `NEEDS_SEMANTIC_RECONCILIATION`
- `BLOCKED_BY_SOURCE_GAP`

Use one orphan-resolver verdict:

- `EXISTING_PRIMITIVES_SUFFICIENT`
- `SMALL_GLUE_PATCH_REQUIRED`
- `AUTHORITY_CONTRACT_BLOCKED`

## Stop condition

Do not stop after producing a high-level plan if current local source and workbook snapshots permit executable analysis, tests, or candidate fixes.

Do stop before any Production deployment/workbook mutation. The human operator owns the final live action.
