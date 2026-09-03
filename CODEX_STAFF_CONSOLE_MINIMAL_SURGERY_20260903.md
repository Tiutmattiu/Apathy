# CODEX — Staff Console minimal surgery

Do not read other broad packets unless a concrete symbol is missing.
ChatGPT has already done architecture mapping.

## Goal

Replace the current maze of ordinary staff menu/actions with one staff workbench in the existing bound Apps Script project.

First delivery may be an HTMLService modeless dialog/sidebar launched from the spreadsheet. Staff should not need to navigate any worksheet/tab after opening it. Keep the HTML/backend separable so the same Console can later become a restricted/bookmarkable web app.

## Inspect only

Fresh-pull current live Apps Script source, then inspect only:

1. current `onOpen` / custom-menu builder;
2. current participant-report launcher function;
3. current file naming convention for HTMLService/server helpers.

Do not audit scientific code, Result, Boss, diagnosis, Raw, runner, or historical logic.

## Implement

### 1. New private Console HTML

Add `staff_console.html` (or current naming equivalent), with inline CSS/JS if convenient to avoid unnecessary files.

Home UI only:

```text
APATHY 工作台
[ 搜尋：姓名 / 電話 / PID / SID ]

[ 處理待辦 ] <live count>
[ 生成報告 ]
[ MRI 預約 ]
```

Below it, show search results / participant workspace / task list in the same interface.

No Step1/2/3/4, Full, Incremental, Boss rebuild, candidate-sheet or helper-function buttons in ordinary view.

### 2. New small backend/service file

Add `staff_console_backend.js` (or current naming equivalent).

Implement only:

- `showApathyStaffConsole()` — open the Console;
- `staffConsoleSearch(q)` — read `_Candidate_Participant_State` and return bounded pid/sid/name/phone/pd_hc/registry_qualified results;
- `staffConsoleTasks(pid)` — read `Admin`, optional exact PID filter, return ordinary visible task fields only;
- `staffConsoleParticipant(pid)` — return current participant summary + current active Admin tasks.

No new persistent table.
No new identity model.
No fuzzy automatic merge.
No frontend diagnosis recomputation.
If no Admin row exists, say no current task; do not fabricate `complete`.

Use `google.script.run` from the HTML; do not create a new public participant-directory GET API.

### 3. Menu simplification

In the existing menu builder/onOpen only:

- make `APATHY 工作台` / `打开工作台` the obvious ordinary entry;
- move existing rebuild/developer actions under one `高级维护` submenu if practical;
- do not delete the maintenance functions themselves.

Do not broadly refactor helper.js. If `onOpen` currently lives there, make only the minimal delegation/menu edit required.

### 4. Report entry

The Console `生成報告` action must call/reuse the CURRENT existing participant-report launcher/view.

Do not modify report science or re-audit report metrics in this surgery.
Family 3 will finish PNG/report-product defects.

### 5. MRI entry

The Console `MRI 預約` action should open/reuse the CURRENT existing MRI/UBSN operational entry with the smallest available bridge.

Do not implement WAITING/BOOKED state in this surgery.
Do not fake MRI status.
Family 5 owns that workflow.

## Files

Expected:
- one new Console HTML;
- one new small Console backend/service file;
- one existing menu/launcher file modified minimally.

If more than these are required, explain the concrete dependency before expanding scope.

## Do not do

- no Full / Incremental / Result / Output rebuild;
- no fixture matrix;
- no broad review;
- no new automated test suite;
- no Raw changes;
- no scientific changes;
- no canonical MD writing yet;
- no public participant-directory API;
- no helper architecture rewrite.

## Minimal verification only

After deploy:

1. open `APATHY 工作台` once;
2. perform one synthetic/non-sensitive search smoke (or one minimal current lookup without reporting private values);
3. confirm task count/list loads without runtime error;
4. stop.

ChatGPT will do the remaining read-only acceptance.

Return only:

```text
FILES CHANGED:
DEPLOYED:
CONSOLE OPENS:
SEARCH SMOKE:
TASK LIST LOADS:
REPORT ENTRY WIRED:
MRI ENTRY WIRED:
MENU SIMPLIFIED:
BLOCKER:
```
