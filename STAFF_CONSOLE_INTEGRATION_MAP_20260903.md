# APATHY Staff Console Integration Map — 2026-09-03

Status: CHATGPT PRE-OP COMPLETE / CONTINUE PARTIAL CODEX EDIT

Purpose: minimize Codex quota. Current receiver source supplied by the user resolves the remaining architecture question.

## Current truth

Keep the existing public APATHY SPA as the Staff Console shell. Do not create a separate HTMLService console.

The current receiver already has a real authenticated read boundary:

- `requireAdminToken_(params)` checks Script Properties `ADMIN_TOKEN`;
- authenticated `READ_ACTIONS` already include `latest_moca`, `participant_events`, `participant_lookup`, `participant_detail`;
- `participant_lookup` / `participant_detail` therefore prove that sensitive staff reads through the existing receiver are already an established architecture, not a new public unauthenticated directory.

The current public frontend defect is that `receiverGetPhase2_()` calls an undefined `adminTokenPhase2_()`. The old client-side `080` comparison in `staffGate()` is only a UX gate and is not receiver authentication.

Codex had already begun fixing this when quota expired. Preserve that partial edit if sane; do not restart the architecture.

## Authentication fix

Do not embed the real admin token in public `config.js` or source.

Use the staff-entered value as the actual receiver token for the current browser session/in-memory state. Validate it against an existing authenticated receiver action before setting `ST.staffUnlocked=true`.

No separate auth service is required: a harmless authenticated lookup that returns an empty result is sufficient to prove token validity. Wrong token must receive `UNAUTHORIZED` from the existing receiver.

Define the missing token accessor (`adminTokenPhase2_()` or equivalent) from the in-memory staff token so existing `receiverGetPhase2_()` works.

The old `C.staffPassword`/`080` may remain temporarily unused; do not spend this family cleaning unrelated config.

## Existing receiver reads to reuse

Do not duplicate endpoints already present:

- reuse `participant_lookup` where its current semantics are suitable;
- reuse `participant_detail` where its current semantics are suitable;
- keep `latest_moca` untouched.

However, the Staff Console current-state/task view needs current Participant/Admin projections, not a new scientific engine.

Add only the missing bounded staff operations if required:

### `staff_search`
Use `_Candidate_Participant_State` for current staff discovery/summary when the older `participant_lookup` directory is insufficient for the current participant-state contract. Return bounded fields only: pid, sid, name, phone, pd_hc, registry_qualified. No fuzzy automatic merge.

### `staff_tasks`
Read `Admin`. Optional exact PID filter. Return only ordinary staff fields: participant clue/PID, name, problem, next action, location, status, issue key/code, action class. Do not send the full lineage wall by default.

### `staff_participant`
Exact PID -> current `_Candidate_Participant_State` summary + that PID's active Admin tasks. If there is no task, say `目前沒有待辦`; do not invent `complete`.

Do not create a new persistent table.

## Frontend target

Continue the existing partial `app.js` Staff Console work:

- one `工作台` entry instead of the ordinary multi-item staff dropdown;
- `start('staff_console')` -> `renderStaffConsole()`;
- one participant search box;
- three ordinary task entries: `处理待办`, `生成报告`, `MRI预约`;
- participant workspace with staff-visible name/phone/PID/SID/PD-HC and active tasks;
- no Step 1/2/3/4, Full, Incremental or rebuild controls in ordinary view.

Do not create another identity/scoring/diagnosis engine in the browser.

## Report / MRI

Report: wire the current report launcher/tool only. Do not touch report science; Family 3 remains open.

MRI: reuse the existing same-SPA UBSN flow (`renderUBSNAssistant()`). Do not implement WAITING/BOOKED here; Family 5 remains open.

## Expected code boundary

Likely multi-file surgery:

- public `app.js` (partial edit already started);
- current receiver source to add only missing staff read actions / dispatch entries;
- `style.css` only if the Console genuinely needs a few layout classes;
- `index.html` only for cache/version bump if required.

Do not expand into Result/Boss/helper/diagnosis.

## Minimum Codex verification

After edit/deploy:

1. Console loads;
2. real token auth works once;
3. one staff search returns JSON without exposing values in the report;
4. one task-list call returns without runtime error;
5. stop.

ChatGPT owns Production/read-only acceptance. No fixture matrix, no Full, no Output rebuild, no broad doc review.

## Global work still open after Family 2

- Family 3 Report full PNG product;
- Family 4 Admin Slice B + contextual actions;
- Family 5 MRIadmin -> UBSN -> BOOKED;
- Family 6 route-owned frontend payload hygiene;
- Family 7 JSON exact-field recovery;
- Family 8 current contamination patterns;
- Family 9 performance/helper/materialization contraction.
