# APATHY Admin + Trace vNext — Staff Operations Spec

Status: **PRODUCT SPEC — NOT IMPLEMENTED**

Purpose: turn Boss into a scan-able diagnostic map, Trace from a cell-forensics viewer into a participant/field diagnostic tool, and Admin from a review list into a staff operations console.

This document is sanitized. Do not add participant names, phone numbers, IDs from Production, clinical payloads, private workbook contents, credentials, tokens, or other sensitive evidence.

## Product principle

Staff should not have to manually jump between Boss, Registry, Backfill, Record_Control, Raw sheets, and technical Candidate sheets to understand or resolve routine issues.

Do not make the human search for problems. The output should show where problems are, then let the human click or search only when explanation or action is needed.

The product should answer three different questions:

1. **Boss scan mode:** Which blanks deserve attention, and which are expected?
2. **Trace:** Why is this value present or blank?
3. **Admin:** What, if anything, should staff do about it — and can the action be completed here?

Boss blank is not automatically missing evidence. Missing evidence is not automatically a staff task.

## 1. Boss scan mode — diagnosis-aware blank coloring

Keep the existing click-a-Boss-cell Trace workflow. Do not remove it.

During Output generation, classify meaningful Boss blanks using the shared field/applicability diagnosis resolver and apply visual status directly to Boss. The purpose is to let staff scan the table without checking participants one by one.

Suggested visual classes:

- `NON_APPLICABLE / EXPECTED_BLANK` — grey
- `NO_SOURCE / STAFF_CAN_ACT` — yellow
- `REVIEW_OR_AUTHORITY_GATED` — orange
- `PIPELINE_BREAK` — red
- `IDENTITY_UNRESOLVED` — purple
- ordinary valid populated cells — existing/default formatting
- unknown/unclassified blanks — neutral or very light treatment; do not imply staff action

Color must never be assigned from `cell is blank` alone.

Required diagnosis order:

```text
Boss blank
-> applicability
-> source evidence
-> Participant projection
-> Result / Review / authority
-> Boss publication
-> primary diagnosis
-> action class
-> visual class
```

Examples:

- HC LEDD blank: grey / non-applicable, not an Admin task.
- no assigned formal source for a required field: yellow if staff can genuinely investigate the source.
- verified evidence held by authority/review: orange, not an instruction to re-enter data.
- valid upstream Result exists but Boss is blank: red pipeline/publication break.
- unresolved formal submission identity: purple and potentially resolvable in Admin.

### Cell notes / hover summary

For colored blanks, add a concise cell note where supported:

```text
ORANGE — REVIEW_OR_AUTHORITY_GATED
First break: <layer>
Staff action: NO / REVIEW / YES
Click cell -> Trace for full evidence
```

Do not put sensitive payloads or long provenance into the cell note.

### Scan summary

At the end of Output, expose a compact diagnostic summary such as:

- Boss participants
- expected / non-applicable blanks
- source gaps
- review / authority gates
- pipeline breaks
- identity unresolved
- actionable staff items

The exact numbers are runtime-derived; do not hardcode thresholds.

### Filterability

Where practical, make the visual classes filterable or expose helper filters so staff can quickly inspect:

- red only
- yellow only
- purple only
- all actionable
- all suspicious

The goal is QA by exception, not P001-to-P250 manual searching.

## 2. Trace vNext — participant-first navigation

### Existing entry remains

The current Boss-cell click Trace remains a first-class forensic drill-down path. A user who sees a colored/suspicious cell should be able to click it and inspect the full lineage.

### Additional primary entry

Add a sidebar search entry that accepts:

- P_ID
- S_ID
- participant name

After selecting a participant, allow a second search/filter for:

- Boss field name
- scale/domain name
- `Show suspicious blanks`
- `Show all blanks`
- `Show current values`

The user should not have to click a Boss cell first when they already know the participant or field they want.

### Participant overview

For the selected participant show, before raw evidence details:

- Registry qualified: yes/no
- Boss eligible: yes/no
- Why in Boss
- formal event count by source type
- current workflow stage
- available domains
- missing domains
- non-applicable domains
- suspicious blanks count
- actual staff actions count

### Field diagnosis

For every selected field or blank, produce one primary diagnosis:

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

Display these human-facing fields near the top:

- Current value
- Is this blank expected? YES / NO / UNKNOWN
- First break
- Why
- Staff action: YES / NO / REVIEW
- Suggested action

Raw/Event/Participant/Result/Review/Record_Control evidence should remain expandable below this conclusion.

## 3. Applicability layer

Boss scan mode, Trace and Admin must distinguish true missingness from non-applicability.

Examples:

- HC medication / LEDD fields: normally non-applicable.
- PD-specific clinical fields should not automatically create HC tasks.
- MRI fields require MRI evidence/applicability.
- optional/universally uncollected tasks should not become blanket staff actions.
- a partial questionnaire item is not sufficient proof that a publishable total should exist.

Applicability rules should be explicit and reusable by Boss coloring, Trace and Admin.

## 4. Admin vNext — operations console

Admin items must have an action class:

### `RESOLVABLE_IN_APP`

The system already has enough evidence for staff to make an authority/control decision in the Admin UI.

Examples:

- orphan/unassigned submission
- identity mismatch
- confirm assignment to an existing Registry participant
- classify a submission as test/error when supported by the existing control contract

### `STAFF_DATA_ACTION`

A genuine source/evidence gap requires staff work outside the system.

Examples:

- locate a retained local draft
- retrieve missing source documentation
- complete a genuinely missing required field

The instruction must say exactly what source is missing. Do not say merely `review`.

### `TRACE_ONLY_NO_ACTION`

The condition is scientifically/operationally explainable and staff should not modify data.

Examples:

- expected/non-applicable blank
- partial evidence without enough support for a final score
- authority-gated value awaiting a separate review process
- rejected non-owner/default evidence preserved only for provenance

### `ESCALATE`

The system cannot safely resolve the case with existing authority rules.

## 5. First end-to-end Admin action: Resolve orphan submission

This should be the first implemented action because it exercises the complete operations model without editing Raw.

### User flow

Admin item displays:

- issue: unassigned formal submission
- source type
- submission timestamp
- submitted identity hints safe for authorized staff display
- current assignment status/review code

Actions:

- `Find participant`
- `Open Registry match`
- `Open related Backfill evidence` when relevant
- `Assign to existing participant`
- `Unable to resolve`
- existing supported exclusion/test classification if the current Record_Control contract allows it

### Find participant

Search Registry by:

- P_ID
- S_ID
- name
- phone where authorized

Show likely candidates. Do not auto-merge on a fuzzy name alone.

### Confirm assignment

Before writing, show a confirmation summary:

- selected formal submission
- selected Registry participant
- original submitted identity remains unchanged in Raw
- authority/control record that will be written

After confirmation:

1. Raw remains unchanged.
2. Write the existing supported manual identity-resolution authority to `Record_Control` or the current authoritative control layer.
3. Preserve submitted identity evidence.
4. Re-run only the smallest supported rebuild/reassignment path available under the active runner contract.
5. Re-evaluate the Admin item.
6. If resolved, show `RESOLVED` and remove it from the active action inbox.

Never silently edit a wrong phone number in Raw just to make identity matching succeed.

## 6. Navigation shortcuts

Admin/Trace should eliminate manual sheet hunting.

Where Apps Script/Sheets UI permits, provide one-click actions such as:

- `Open Registry row`
- `Open Backfill source`
- `Open Record_Control entry`
- `Open Raw source row`
- `Open Participant lineage`
- `Open Result/Review`

The target sheet should open with the relevant row/cell highlighted.

If a direct write is safe and supported, prefer an explicit confirmable action over telling the user to navigate and edit manually.

## 7. Safety and authority rules

- Raw remains append-only evidence.
- Never rewrite Raw to repair identity.
- Registry remains authoritative after inclusion.
- phone mismatch/non-unique identity must not be auto-merged.
- Backfill is evidence, not universal authority.
- Admin actions must write through the existing authority/control contract.
- every write must be auditable: timestamp, operator where available, reason/action, affected submission, selected participant/authority target.
- no participant-specific hardcoding.
- destructive or irreversible actions require explicit confirmation.

## 8. Admin item lifecycle

Every actionable item should have a lifecycle:

`OPEN -> IN_PROGRESS/REVIEW -> RESOLVED`

or

`OPEN -> ESCALATED`

A resolved item should not keep reappearing unless new contradictory evidence arrives.

Display:

- issue code
- human summary
- action class
- current status
- created/first-seen time if available
- resolution/control lineage
- exact next action

## 9. Shared field diagnosis resolver

Boss coloring, Trace and Admin should consume the same field-centric diagnosis result rather than maintain independent heuristics.

Suggested resolver output contract:

```text
participant_id
field/domain
current_value
applicable
expected_blank
source_status
participant_status
result_status
review_status
first_break
primary_diagnosis
visual_class
action_class
staff_action_required
human_explanation
suggested_action
lineage_refs
```

Boss consumes `visual_class` and compact explanation.

Trace renders the explanation/evidence.

Admin filters this shared output to actionable items and provides supported operations.

## 10. Acceptance criteria — Boss scan mode

A release passes only if:

- existing populated Boss values are not altered merely for formatting;
- expected/non-applicable blanks can be visually distinguished from suspicious blanks;
- pipeline breaks are visually distinct from source gaps and review/authority gates;
- identity-unresolved cases are visually distinct from field-missing cases;
- visual class is derived from the shared resolver, not a separate blank heuristic;
- colored cells retain click-to-Trace behavior;
- cell notes show concise diagnosis / first break / action state where supported;
- Output provides a compact count summary by diagnosis class;
- no new Admin task is created solely because a cell received a warning color.

## 11. Acceptance criteria — Trace vNext

A release passes only if staff can:

- keep using click-a-Boss-cell Trace;
- find a participant without locating a Boss cell first;
- search a field/scale directly;
- request suspicious blanks only;
- distinguish non-applicable blanks from genuine missingness;
- see `first break` before detailed evidence;
- see whether staff action is required;
- expand the existing evidence chain without losing current Trace capability.

## 12. Acceptance criteria — orphan resolver

Use a controlled unresolved-submission fixture.

PASS requires:

1. Admin shows the unresolved submission as `RESOLVABLE_IN_APP` or appropriate escalation state.
2. Staff can search/select a Registry participant without editing Raw.
3. Confirmation clearly states the authority/control write.
4. Resolution is written through the supported control mechanism.
5. Assignment becomes deterministic on rebuild/re-evaluation.
6. Participant evidence is attributed to the selected participant only after confirmation.
7. Raw submitted identity remains unchanged and traceable.
8. Admin item becomes resolved/disappears from active work.
9. a wrong/ambiguous match can be cancelled with no data change.
10. audit lineage explains who/what resolved the item and why.

## 13. Implementation order

After the active Participant Phase 5B release is completed:

1. shared field/applicability diagnosis contract;
2. Boss scan-mode coloring + concise cell notes + diagnosis summary;
3. preserve click-to-Trace and add participant-first Trace search + suspicious-blank view;
4. orphan submission Admin resolver end-to-end;
5. one-click navigation/highlight to Registry, Backfill, Record_Control and Raw;
6. expand Admin action types to genuine missing-source workflows;
7. only then replace broader legacy Admin missingness heuristics.

Do not redesign all Admin rules at once. Ship one shared resolver, one scan mode, and one real resolvable action end-to-end first.

## 14. Separate backlog

Medication/LEDD authority and structured-factor asymmetry are separate scientific/authority work. Do not hide them by making Admin automatically request re-entry. They should use the same diagnosis/action framework when addressed later.
