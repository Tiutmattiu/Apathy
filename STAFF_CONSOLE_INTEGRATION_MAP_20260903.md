# APATHY Staff Console Integration Map — 2026-09-03

Status: CHATGPT READ-ONLY PRE-OP COMPLETE / READY FOR SHORT CODEX SURGERY

Purpose: prevent Codex quota waste by doing the architecture/integration mapping before asking Codex to edit Production.

## 1. Best existing shell: reuse the current public APATHY frontend

The current public frontend already is a single-page app. `index.html` loads `question-bank.js`, `config.js`, and `app.js`; `app.js` owns one `#app` root and already swaps views through `home()`, `start(flow)`, `appShell()`, and `toolbar()`.

Current staff entry is not a separate product: `home()` exposes a `工作人員模式` dropdown generated from `C.staffFlows`, and `staffGate(flow,title)` unlocks staff flows.

Therefore the lowest-complexity Staff Console is **not another Apps Script HTML page**. Reuse the existing public frontend as the one ordinary staff entry point and replace the staff dropdown with one `工作台` entry that opens a new internal `staff_console` flow.

This avoids another URL/UI island and reuses the already-working mobile/simple SPA shell.

## 2. Existing staff flows already inside `app.js`

`start(flow)` currently routes:

- `screening` -> questionnaire player
- `stage2` -> questionnaire player
- `backfill` -> backfill UI
- `mri_visit` -> MRI visit identity/workflow
- `clinical` -> Clinical identity/workflow
- `ubsn` -> `renderUBSNAssistant()`

The UBSN assistant already lives in the same frontend and talks to the local helper through `C.ubsnHelperUrl`; final CAPTCHA/confirmation remains human.

Staff Console should call/reuse these flows instead of creating duplicate form/MRI UIs.

## 3. Existing backend bridge from public frontend

`config.js` already contains one Apps Script receiver URL. `app.js` already has GET/POST receiver plumbing; POST is used for formal submissions, and a GET helper exists for staff/backend reads.

The Staff Console should therefore add a **small read-only staff API surface to the existing receiver dispatcher**, not make the browser read Sheets directly and not add a second backend.

Private live receiver filename must be refreshed by Codex, but the edit boundary is narrow: locate the current `doGet(e)` / action dispatcher and add only the new staff-console actions.

## 4. Production data surfaces already sufficient for v1 Console reads

No new persistent table is needed.

### Participant search/current identity source

Current `_Candidate_Participant_State` headers already provide:

- PID
- SID
- name
- phone_number / phone_normalized
- gender
- PD_HC
- registry_qualified
- Inclusion
- formal_event_count
- state_json

Use this resolved current-state surface for Console search/summary. Do not build a second identity matcher.

Search semantics may support name/phone/PID/SID for staff discovery, but selection is explicit; search suggestions must never become fuzzy automatic identity merge.

### Task source

Current `Admin` already contains the staff-work projection and current columns such as:

- participant/PID clue
- name
- problem
- reason
- next action
- where to handle
- status
- Issue_Key / Issue_Code
- lineage/source fields
- Action_Class / Diagnosis_Code

Console should consume Admin as a read model. Do not regenerate diagnosis in the frontend.

Default task list should return only the compact fields required for staff; exact `为什么`/lineage can be fetched/shown behind details until Admin Slice B later improves the projection itself.

### MRI source

Current `MRI Time` is transitional booking history, not Console preference authority. Screening MRIadmin current evidence already exists in Participant state, while the real WAITING/PREFERENCE_MISSING/BOOKED producer is still a later family.

For Family 2, Console should expose the existing UBSN/MRI entry honestly; do not fake MRI status that the backend has not yet implemented.

## 5. Minimal new receiver read API

Add only these bounded actions to the existing receiver GET dispatcher:

### `staff_search`
Input: `q`

Read `_Candidate_Participant_State` and return a bounded result list with only:

- pid
- sid
- name
- phone (staff-visible)
- pd_hc
- registry_qualified

Matching:
- canonical PID/SID exact/prefix-friendly staff lookup;
- normalized phone exact/substring-friendly lookup;
- name text search for discovery;
- no fuzzy auto-merge and no authority change.

### `staff_tasks`
Input: optional `pid`

Read current Admin rows. Return ordinary staff fields only:

- pid/clue
- name
- problem
- next_action
- location
- status
- issue_key
- issue_code
- action_class
- optional exact detail for an expanded-details view

Do not return giant technical lineage payload by default.

### `staff_participant`
Input: exact `pid`

Return one current Participant summary plus that PID's active Admin tasks.

For v1, domain status must be truthful and conservative: use `needs work` where an active Admin task proves work exists; otherwise say `no current task` rather than inventing `complete` if no explicit completion contract is available.

Do not create a new scientific completeness engine for Console.

## 6. Staff Console frontend edit boundary

Likely public files:

- `app.js`
- `config.js` only if one existing report URL/config value must be exposed
- `style.css`
- `index.html` only for cache/version bump if needed

### `home()`
Replace the multi-item staff dropdown as the ordinary entry with one obvious `工作台` button. Existing participant questionnaire entry remains separate for participant use.

### `start(flow)`
Add `staff_console` routing to `renderStaffConsole()`.

### `staffGate()`
Reuse current staff unlock. Do not add a second login/auth model in this family.

### `renderStaffConsole()`
One page with:

- global participant search
- `处理待办` card with live count
- `生成报告` card
- `MRI预约` card
- small advanced-maintenance disclosure/link only if an existing safe maintenance launcher already exists; do not expose pipeline step buttons in the normal view

### Participant workspace
Selecting search result opens an internal participant panel showing:

- name / phone / PID/SID for staff use
- PD/HC
- current active tasks
- primary contextual actions only

Do not claim scientific/form completion merely because no Admin row exists.

## 7. Report integration — reuse, do not duplicate

Current participant report implementation remains private Apps Script `report.html` + `report_backend.js` and has a separate product family still open.

Family 2 should locate the **existing current report launcher/URL only**, then make it reachable from the Console. Do not rebuild report scoring/rendering inside `app.js`.

Preferred order:

1. If current report web app can be embedded safely in the Console without new architecture, use an in-page panel/iframe.
2. If Apps Script framing policy blocks embedding, use one Console button that opens the current report tool; this temporary external jump is acceptable until Family 3 moves/finishes the report UX.

Do not spend Codex quota re-auditing report metrics in Family 2.

## 8. MRI integration — existing same-app entry now, real status later

The current frontend already implements `renderUBSNAssistant()` and existing `mri_visit` flow. Console can therefore route MRI actions internally without creating another UI.

Family 2 should expose:

- `MRI预约` -> current UBSN assistant
- participant-level MRI action -> current MRI visit/booking entry where applicable

The real Participant MRIadmin -> WAITING/PREFERENCE_MISSING/BOOKED producer remains Family 5. Console must show a truthful `electronic scheduling status pending`/limited state rather than fabricating it.

## 9. Rebuild buttons

Do not port Step 1/2/3/4, Full, Incremental, or `buildApathyOutput()` into the ordinary Console.

Current participant-scoped Incremental exists, but automatic refresh after ordinary writes should be added only when the exact current backend call path is known. Family 2 must not invent a new runner.

If current maintenance controls need preservation, keep them in the spreadsheet/menu or a hidden advanced-maintenance area; ordinary staff does not need them.

## 10. Helper boundary

Do not refactor monolithic `helper.js` in Family 2 unless a new backend action would otherwise be added there.

New Console read API should live with the current receiver/API dispatcher or a small new `staff_console_backend`/service file in the same Apps Script project if that cleanly avoids adding more unrelated code to helper.

This is a boundary improvement, not a broad architecture rewrite.

## 11. Family-2 minimal acceptance owned by ChatGPT after deploy

Codex only needs to prove deployment and one minimal live call/UI load.

ChatGPT will do read-only acceptance:

- one public APATHY entry remains the ordinary home;
- one Staff Console entry replaces the staff-dropdown maze;
- participant search returns real current participants;
- current Admin work is visible without opening Admin sheet;
- selecting participant shows current summary/tasks;
- report tool is reachable from Console without staff remembering its URL;
- MRI/UBSN is reachable from Console;
- no ordinary pipeline/rebuild buttons are shown;
- no new persistent table created;
- Raw untouched.

## 12. Short Codex surgery boundary

Codex should NOT reread all project handoffs or redo the mapping above.

Its job is only:

1. fresh-pull current public frontend + current private receiver/report launcher source;
2. implement the three bounded receiver read actions;
3. implement `staff_console` in current SPA, reusing existing flows;
4. wire existing report launcher and UBSN entry;
5. deploy frontend/backend;
6. perform one minimal smoke check that the Console loads and one receiver action returns JSON;
7. stop and return changed files/deploy result.

All broader Production/data/UX verification belongs to ChatGPT.