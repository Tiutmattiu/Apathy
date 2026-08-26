# APATHY Boss Scan Mode — Minimal Implementation Packet

Status: **IMPLEMENTATION PACKET — NOT IMPLEMENTED**

Purpose: add automatic, explainable visual diagnosis to Boss blanks without removing the existing click-a-cell Trace workflow.

This packet is sanitized. Do not add participant-identifiable data, clinical payloads, private workbook contents, credentials, tokens, or Production secrets.

## Product contract

Boss should support three complementary workflows:

1. **Scan mode** — problems are visible without searching participant-by-participant.
2. **Search mode** — staff can jump directly to a participant/field/domain.
3. **Trace mode** — clicking a Boss cell still opens the existing forensic evidence chain.

Do not remove current Boss-cell Trace.

## First release scope

Implement only blank-cell diagnosis and presentation. Do not redesign all Admin rules in the same patch.

For every blank Boss cell, compute one reusable diagnosis result before deciding whether to style it.

Suggested first-release diagnosis classes:

- `EXPECTED_OR_NOT_APPLICABLE`
- `NO_FORMAL_SOURCE`
- `REVIEW_OR_AUTHORITY_GATED`
- `IDENTITY_UNRESOLVED`
- `PIPELINE_BREAK`
- `UNKNOWN`

The resolver must not classify a blank as a problem merely because it is blank.

## Required decision order

For each blank Boss field:

1. Determine field/domain applicability.
2. Check whether formal source evidence exists.
3. Check whether Participant current state contains the required value/evidence.
4. Check whether Result/Review/Medication/Decision contains or gates the publishable value.
5. Check whether Boss publication is the first point where the value disappears.
6. Return the primary diagnosis, first break, staff-action class, and short explanation.

## Boss presentation

Use a restrained visual vocabulary. Exact colors may follow existing workbook conventions, but the semantic categories must stay stable.

- neutral/grey: expected or non-applicable blank
- warning/yellow: genuine source gap where staff may need to obtain data
- review/orange: evidence exists but review/authority blocks publication
- identity/purple: evidence exists but assignment/identity is unresolved
- error/red: evidence exists upstream and the pipeline loses it downstream
- no style: unknown/unclassified until a safe rule exists

Do not color valid nonblank values in this first release.

## Cell note contract

Every styled blank should receive a short cell note containing at least:

- diagnosis class
- first break
- staff action: YES / NO / REVIEW
- one-line explanation
- instruction: click cell to open Trace for evidence

The note must not duplicate full Raw/Event payloads.

## Output summary

At the end of the Boss/Output step, return or log aggregate counts only:

- expected/non-applicable blanks
- source gaps
- review/authority-gated blanks
- identity-unresolved blanks
- pipeline-break blanks
- unknown blanks
- actionable staff items

This summary is for operational QA and acceptance. It must not contain participant identifiers.

## Shared resolver contract

The same resolver output should later feed Trace and Admin.

Minimum shape:

```text
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
action_class
staff_action_required
human_explanation
suggested_action
```

Trace consumes the explanation and lineage; Admin filters to actionable classes and exposes supported operations.

## Acceptance matrix

The first release must include fixtures for at least these semantic cases:

1. non-applicable blank -> neutral/grey, no Admin action
2. no formal source -> warning/yellow, staff action only when source is genuinely required
3. authority/review gate -> orange, no automatic recollection request
4. identity unresolved -> purple, actionable through future Admin resolver
5. upstream evidence exists but downstream projection/publication loses it -> red pipeline break
6. valid nonblank value -> unchanged appearance
7. existing click-cell Trace still works after coloring
8. output summary counts match the styled-cell classifications

## Implementation safety

- Raw remains append-only.
- Do not mutate scientific values to make styling easier.
- Do not create participant-specific hardcoding.
- Do not use historical grouping fields as current scientific authority.
- Do not make medication/LEDD authority backlog disappear by relabeling it as missing source.
- Do not replace current Trace; reuse it as the drill-down path.
- Keep styling/notes derived and rebuildable from evidence.

## Recommended implementation order

1. Implement a read-only field/applicability diagnosis helper.
2. Run it over Boss blanks during Output generation.
3. Add Boss background styling and concise cell notes.
4. Add aggregate diagnostic counts to Output result/log.
5. Verify current click-cell Trace still opens the selected cell.
6. Only after scan mode is accepted, add participant/field search.
7. Then connect actionable diagnosis classes to Admin operations.

## Explicitly deferred

- full participant-first Trace UI
- orphan-submission write action
- automatic rebuild after Admin resolution
- global Admin heuristic replacement
- medication/LEDD authority fixes
- Incremental runner architecture

These remain separate follow-on work.
