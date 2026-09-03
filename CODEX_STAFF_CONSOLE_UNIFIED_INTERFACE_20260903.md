# APATHY STAFF CONSOLE — UNIFIED STAFF INTERFACE PACKET

Status: NEXT PRODUCT FAMILY AFTER BOSS FAMILY 1 CLOSEOUT

## Working model

- ChatGPT = sheepdog / dispatcher / read-only diagnosis / acceptance / scope control.
- Codex = surgeon / private-source edits / deploy / runtime verification.
- Human = mechanical UI actions only when Codex genuinely cannot invoke the equivalent action.
- Copilot = out of scope for now.

Do not start Production writes until Boss Family 1 is fully closed and canonical docs are synced. Once Family 1 is closed, this becomes the next write family.

## Product objective

APATHY currently exposes implementation details through multiple disconnected surfaces: spreadsheet tabs, Apps Script menus, Admin, report UI, rebuild commands, MRI tools, and other isolated actions. This is not an acceptable ordinary-staff interface.

Build one staff-facing entry point that lets a staff member who did not participate in development accomplish ordinary work without remembering backend layers, sheet names, menu commands, or URLs.

Core principle:

> Staff operates by task, not by pipeline layer.

The backend may remain complex. The staff interface should become simpler.

## Staff UX contract

### One ordinary entry point

Provide a single APATHY Staff Console URL / entry surface.

Ordinary staff should not need to navigate directly to Boss, Admin, MRI Time, Apps Script menus, report.html, technical candidate sheets, or separate spreadsheets for normal work.

### Home screen: minimum primary choices

Aim for roughly three primary task entry points plus global participant search, not 10+ operational buttons.

Conceptual home:

```text
APATHY
[ Search participant: name / phone / PID / SID ]

[ Process tasks ]   <count>
[ Generate report ]
[ MRI scheduling ]

Recent / today's relevant work
```

Do not expose Event / Participant / Result / Output / Full / Incremental as ordinary staff concepts.

### Global participant search

Search should accept staff-useful identifiers already safely available in current backend, such as:
- name
- phone
- PID
- SID

Use exact/controlled matching consistent with current identity rules. Do not introduce fuzzy automatic identity merge.

Selecting a participant opens one unified participant workspace.

Conceptual workspace:

```text
Name / contact / group

Screening    complete / needs work
Stage 2      complete / needs work
Clinical     complete / needs work
MRI          waiting / booked / needs preference

[ Continue missing data ]
[ Generate this report ]
[ Handle MRI ]
[ View history/details ]
```

Only show actions that are actually relevant/actionable for that participant.

## Integrate existing product families instead of creating new islands

This family should create the shell and adapter boundaries that subsequent Admin / Report / MRI work plugs into. Reuse existing business logic; do not rewrite scientific engines simply to centralize UI.

### A. Process tasks

This becomes the ordinary-staff presentation of Admin.

Do not require staff to open the Admin sheet.

Display compact task cards/rows with:
- participant
- concise problem
- affected domain/form
- clear next action
- status

Clicking a task should take staff directly to the correct participant/action context when the route exists.

Preserve exact technical detail and lineage behind the UI; hide it from the ordinary view rather than deleting it.

### B. Generate report

Expose report generation inside the same Console.

Required batch interaction remains:

```text
P [number] to P [number]
[ Download report images ]
```

Also provide a participant-workspace action such as `Generate this participant's report`.

Do not force staff to remember/open a separate report URL.

The report business rules remain governed by the participant-report family packet; this Console should call/reuse that implementation rather than creating a second report engine.

### C. MRI scheduling

Expose MRI operational states inside the Console, not by requiring staff to inspect MRI Time or multiple sheets.

Conceptual overview:
- Waiting
- Preference missing
- Booked
- Needs reconciliation

Participant MRI card should show only necessary operational information and provide the next task.

The UBSN/CAPTCHA final external booking may remain the one legitimate external jump. After booking, staff should return to APATHY and complete/confirm through the same workflow; do not require duplicate manual entry across sheets.

## Rebuild / maintenance controls

Ordinary staff should not see or need:
- Step 1 Event
- Step 2 Participant
- Step 3 Result
- Step 4 Output
- Full
- Incremental
- buildApathyOutput
- other pipeline implementation controls

Normal writes should trigger the smallest appropriate targeted refresh automatically.

Ordinary UX should be:

```text
staff saves/recovers/confirms
-> backend targeted refresh
-> UI updates
-> staff sees success
```

not:

```text
staff saves
-> remember spreadsheet/menu
-> manually run pipeline steps
```

If maintenance controls must remain available, place them behind a clearly separated advanced/admin maintenance area. They should not be primary staff buttons.

## Backend/service boundary objective

Current helper source has become highly complex. Do not perform a risky architecture rewrite for aesthetics alone, but stop adding unrelated staff-product responsibilities into a monolithic helper.

As this Console is implemented, establish or strengthen clear boundaries around concepts such as:
- console/web entry
- participant lookup/summary
- task/Admin service
- report service
- MRI service
- recovery service
- runner/refresh service
- Boss/QA service
- spreadsheet adapter/helpers

Exact filenames may follow current project conventions. Do not rename/restructure everything if unnecessary.

Rule: new Console orchestration should call narrow service/adaptor functions rather than embedding large new business logic into one generic helper file.

## Automatic targeted refresh

For every ordinary staff action implemented in the Console, determine the smallest required downstream refresh.

Examples:
- participant form/recovery change -> participant-scoped incremental / derived refresh
- report generation -> read-only; no rebuild unless current backend genuinely requires one
- MRI booking writeback -> update scheduling state and dependent task projection only

Do not run Full after ordinary staff operations unless there is no safe targeted path.

## UI behavior / cognitive-load rules

1. One primary entry point.
2. Staff chooses a real-world task, not a backend layer.
3. One obvious primary action per task state where practical.
4. If system already knows participant/form/section, do not ask staff to search or copy it again.
5. Do not require routine sheet switching.
6. Do not require routine cross-spreadsheet navigation.
7. Do not require staff to understand rebuild steps.
8. Technical lineage remains available for expert debugging but not in the default view.
9. Avoid huge walls of diagnostic text.
10. Mobile/basic laptop usability should remain reasonable; no dense developer dashboard.

## Scope for this family

This is a shell + integration-boundary family, not a demand to finish every downstream feature from scratch in the same deploy.

However, do not ship a decorative empty dashboard. At minimum, wire the Console to current real data and at least the currently available operations so it is a usable entry point.

Target minimum usable slice:
- working global participant search
- participant workspace using current data
- current Admin/task list accessible through Console
- current report entry accessible through Console
- current MRI operational entry/placeholder only if current producer is not yet complete, clearly showing current availability rather than fake functionality
- advanced maintenance area separated from ordinary staff actions

Where Report/Admin/MRI feature internals remain unfinished, preserve them as subsequent families but ensure the Console becomes their stable home rather than building new standalone UI islands.

## Do not do

- Do not duplicate scientific scoring.
- Do not create a second participant identity model.
- Do not move research authority into the UI.
- Do not delete Raw / Raw rows / Raw cells.
- Do not mass-overwrite Raw.
- Do not fabricate values.
- Do not require ordinary staff to use technical sheets for routine operations.
- Do not create another set of 10+ buttons on a single page and call that simplification.
- Do not rewrite all helper/runtime code merely for naming/style purity.

## Verification

Use a staff-style walkthrough, not only unit/static inspection.

Verify:
1. A staff member can open one URL and find a participant.
2. They can see that participant's current actionable state without opening a sheet.
3. They can reach current Admin/task work from the same Console.
4. They can reach/generate report workflow from the same Console.
5. They can reach MRI workflow/current state from the same Console.
6. Ordinary staff never needs to understand Event/Participant/Result/Output step names.
7. Ordinary task completion does not require a manual rebuild menu when a targeted refresh exists.
8. Advanced maintenance controls are separated/hidden from ordinary workflow.
9. Existing current business logic is reused rather than duplicated.
10. Console does not expose private/internal identifiers unnecessarily in participant-facing outputs.

## Closeout

After verified deployment, update:
- CURRENT_STATUS.md
- APATHY_CORE_PIPELINE_HANDOFF_20260903.md

Document the new ordinary staff entry point and clearly distinguish:
- ordinary staff workflow
- advanced maintenance/debug workflow
- downstream Report/Admin/MRI families still open.

Do not claim those downstream families are complete merely because links/cards exist in the Console.
