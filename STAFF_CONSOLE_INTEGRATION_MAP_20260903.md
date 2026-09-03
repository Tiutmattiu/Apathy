# APATHY Staff Console Integration Map — 2026-09-03

Status: CHATGPT PRE-OP COMPLETE / ARCHITECTURE REFINED BEFORE CODEX

Purpose: minimize Codex quota by deciding the integration boundary before private-source edits.

## 1. Correct placement: private staff surface, not the public questionnaire SPA

The public GitHub Pages frontend is useful for participant-facing forms and already contains staff-oriented flows, but it is not the correct home for a participant-directory/Admin console.

Read-only source inspection established:

- the public SPA has one `#app` shell and internal flows (`home`, questionnaire flows, Backfill, MRI visit, Clinical, UBSN);
- its current staff password/gate is client-side UX, not a suitable protection boundary for exposing a searchable participant directory;
- the only clearly referenced receiver GET action in the public frontend is `latest_moca`; there is no current reusable Participant/Admin directory API exposed by that frontend;
- therefore adding `staff_search` / `staff_tasks` to the public receiver would create a new sensitive-data API surface merely to support UI consolidation.

The preferred architecture is instead:

> one **private Apps Script Staff Console** in the existing Production Apps Script project, using server-side access / `google.script.run` (or the existing equivalent private HTML-service bridge), with no browser-direct Sheet access and no new public participant-directory endpoint.

This still satisfies the user requirement: ordinary staff gets one URL / interface and no routine spreadsheet switching.

The public questionnaire SPA remains the participant/data-entry surface. Staff Console may deep-link to existing data-entry flows when needed, but does not need to become the public questionnaire homepage.

## 2. Why this is simpler overall

The private Apps Script project already owns or can directly access:

- `_Candidate_Participant_State` for current participant identity/state;
- `Admin` for current genuine staff tasks;
- report implementation (`report.html` / report backend) in the same private source family;
- Output/runner functions if an advanced-maintenance entry is ever required;
- Spreadsheet service access without creating another public GET API.

So the Console should be a thin staff product layer over existing projections, not another data authority.

## 3. Minimum private Staff Console service

No new persistent table.

Add a small service/backend file rather than adding more unrelated behavior to `helper.js`, e.g. current-convention equivalent of:

- `staff_console_backend.js`
- `staff_console.html`

Exact filenames may follow the live project conventions.

### `staffConsoleSearch(q)`

Read `_Candidate_Participant_State` and return a bounded list:

- pid
- sid
- name
- phone
- pd_hc
- registry_qualified

Matching is discovery only: PID/SID/phone/name; no fuzzy automatic identity merge.

### `staffConsoleTasks(pid?)`

Read current `Admin` as a staff-work projection and return only ordinary fields by default:

- participant clue / PID
- name
- problem
- reason summary
- next action
- location
- status
- issue key/code
- action class

Do not ship the entire lineage wall into the default UI.

### `staffConsoleParticipant(pid)`

Return one current Participant summary plus current active Admin tasks.

If no Admin task exists, say `目前沒有待辦` / equivalent. Do not fabricate scientific/form `complete` unless an explicit completion contract exists.

## 4. Minimum Console UI

One private staff URL/interface.

Home should contain only:

```text
APATHY 工作台

[ 搜尋：姓名 / 電話 / PID / SID ]

[ 處理待辦 ] <live count>
[ 生成報告 ]
[ MRI 預約 ]
```

Do not expose Step 1/2/3/4, Full, Incremental, candidate sheets, Boss rebuild, or Apps Script function names in ordinary staff UX.

Participant workspace should show only useful staff context:

- name / phone
- PID/SID (staff-visible only)
- PD/HC
- current active tasks
- contextual primary actions

## 5. Admin integration

Use `Admin` as the read model. Do not recreate diagnosis logic in the Console.

Family 2 only needs to make real current Admin work visible and navigable from the Console.

Admin Slice B remains a downstream family for compact summaries + exact hidden detail + contextual deep links. The Console should be designed to consume those improved fields later without another redesign.

## 6. Report integration

Do not create a second report renderer.

Because the report implementation is already in private Apps Script source, the Console should reuse it inside the same staff surface if practical:

- preferred: render/report view within the same Console shell or route;
- acceptable temporary bridge: a Console action that opens the existing report view inside the same Apps Script deployment/navigation model.

Family 3 still owns the report product closeout: numeric P-range, separate PNGs, privacy, bars, reference group, date/label semantics.

Do not spend Family-2 quota re-auditing report science.

## 7. MRI integration

Family 2 should expose one `MRI 預約` entry from the Console.

The real Participant MRIadmin -> WAITING / PREFERENCE_MISSING / BOOKED producer remains Family 5. Do not fake those states in Family 2.

If the existing UBSN helper is currently reached from the public SPA, the Console may temporarily open that existing operational view; Family 5 will consolidate the final MRI workflow/state into the staff surface.

## 8. Existing public SPA remains useful

Do not delete or broadly refactor the public `app.js` merely because Staff Console moves private.

Existing public/staff-assisted flows remain useful for:

- Screening
- Stage 2
- Backfill
- MRI visit
- Clinical
- UBSN helper entry during transition

Later contextual deep links can open the appropriate existing form/section from Staff Console.

## 9. Automatic refresh / maintenance

Do not expose ordinary rebuild controls in Family 2.

No ordinary Staff Console read action should run Full.

When later write workflows are integrated, use the existing participant-scoped Incremental / targeted downstream path rather than asking staff to run rebuild menus.

Advanced maintenance can remain in spreadsheet/menu for now; it does not need to be migrated just to ship the Console shell.

## 10. Codex boundary after this pre-op

This is necessarily a multi-file private-source surgery, so it belongs to Codex under the current role split.

Codex should NOT redo architecture research. It only needs to:

1. fresh-pull current private Apps Script project;
2. inspect only the current HTML entry/launcher (`doGet` / menu / report launcher) enough to attach one staff-console route without breaking receiver behavior;
3. add the small Staff Console HTML + backend service;
4. reuse existing report launcher/view, not report science;
5. expose MRI entry truthfully without implementing Family 5;
6. deploy;
7. perform one minimal smoke check: Console loads and one participant search returns JSON/object data;
8. stop.

ChatGPT owns read-only Production acceptance afterward.

## 11. Quota rule

If Codex spends meaningful time reading broad handoffs, auditing unrelated source, or running fixture matrices before editing, stop it and return to ChatGPT.

Expected Codex work should be dominated by edit + deploy, not review.

## 12. Global dependency impact

Family 2 = Staff Console shell/home.

Still open afterward:

- Family 3 Report full PNG product
- Family 4 Admin Slice B + action/deep-link UX
- Family 5 MRIadmin -> UBSN -> BOOKED
- Family 6 Frontend payload ownership
- Family 7 JSON exact-field recovery
- Family 8 current contamination patterns
- Family 9 performance/helper/materialization contraction

Do not mark those complete just because their entry cards exist in the Console.
