# Codex Task — Step 3 rollback-snapshot I/O fast fix

Date: 2026-09-03

Scope: **one narrow Production helper patch only.** Preserve the existing mainline Codex thread/context. Do not re-audit Event, Participant semantics, Result scoring, Decision, historical migration, MRIadmin, Admin vNext, or frontend.

Read first: `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`.

## Fresh exact Production reproduction — highest-priority evidence

A new real Full run after the Admin Slice A closeout reproduced the blocker more precisely:

- Step 1 Event: PASS
  - formal payloads: 360
  - pipeline data loss: 0
  - unaccounted: 0
- Step 2 Participant: PASS
  - Registry rows: 176
  - qualified Registry: 174
  - assigned formal events: 360
  - unassigned formal events: 0
- Step 3 Result/Decision: FAILED before Result completion
- Step 4 Output: not run
- checkpoint: not committed
- official Full Boss/Admin publication: not completed

Exact error class:

```text
OUTPUT_SNAPSHOT_CAPTURE_FAILED:
Service Spreadsheets timed out while accessing document ...
```

The private workbook identifier is intentionally omitted here.

A fresh read-only check immediately after the failure found no readable `_Apathy_Run_Rollback_Boss` sheet, consistent with the snapshot catch/cleanup path removing an incomplete backup rather than leaving a committed rollback snapshot. Do not infer any scientific Result failure from this run: the failure is explicitly inside pre-Result output snapshot capture.

The current runner also permits retrying the same failed stage: when the persisted run is `FAILED` at `RESULT_CORE`, `continueApathyCandidateFull('RESULT_CORE')` resets that same stage to waiting and retries it. Therefore, after the helper patch is deployed and current run state is confirmed still failed at Step 3, the safest human acceptance action is **retry Step 3 only**; do not rerun Step 1/2 unless the state has changed or the patched source requires it.

## Established facts — do not rediscover

1. Boss admission is `Inclusion !== n`. There is no inclusion-contract defect to repair.
2. Current Event and Participant stages pass; current `_Candidate_Payload_Loss` has no active loss rows in the inspected snapshot.
3. The fresh failure is now localized to `OUTPUT_SNAPSHOT_CAPTURE_FAILED`, before Result/Decision is allowed to complete.
4. The same runner version has successfully completed Production Step 3 / Full historically. Therefore this remains a runtime/Spreadsheet-I/O blocker, not an established scientific/result regression.
5. The rollback capture implementation visible in the current reviewed helper source is unchanged around:
   - `apathyCaptureProductionOutputSnapshot_`
   - `apathyCaptureSheetForRollback_`
   - `apathyInsertSizedSheet_`
6. Current workbook aggregate shape includes a very large `_Candidate_Field_Provenance` surface (~44.6k rows x 26 cols), so the Step-3 participant fingerprint already performs a large Spreadsheet read before snapshot capture.
7. `apathyCaptureSheetForRollback_` currently routes temporary rollback creation through the generic exact-size allocator, which performs structural row/column deletion on a newly inserted default sheet. Exact dimensions are unnecessary for rollback correctness.

## Concrete inefficiency to patch first

Current snapshot backup creation calls the general `apathyInsertSizedSheet_()` helper. That helper effectively does:

```text
insertSheet(name)
-> grow rows if needed OR delete surplus default rows
-> grow columns if needed OR delete surplus default columns
-> return
```

For a temporary rollback backup, exact grid dimensions are unnecessary. Snapshot metadata already stores the real `rows` and `columns`, and restore reads only:

```text
backup.getRange(1,1,meta.rows,meta.columns)
```

Extra unused rows/columns on the hidden backup do not alter rollback semantics.

Structural `deleteRows` / `deleteColumns` operations are therefore avoidable Spreadsheet I/O in the exact failure area.

## Required patch

Modify **private Production `helper.js` only** unless the fresh Production pull proves the relevant functions live elsewhere.

### A. Add a snapshot-specific sheet creator

Use a narrow helper conceptually equivalent to:

```javascript
function apathyInsertRollbackSheet_(ss, name, rows, columns) {
  var sh = ss.insertSheet(name);
  rows = Math.max(1, Number(rows) || 1);
  columns = Math.max(1, Number(columns) || 1);
  if (sh.getMaxRows() < rows) {
    sh.insertRowsAfter(sh.getMaxRows(), rows - sh.getMaxRows());
  }
  if (sh.getMaxColumns() < columns) {
    sh.insertColumnsAfter(sh.getMaxColumns(), columns - sh.getMaxColumns());
  }
  return sh;
}
```

Exact naming/style may follow current source.

Properties:

- create one hidden temporary backup sheet;
- grow only when required;
- **never shrink/delete rows or columns** for rollback backup creation;
- no change to source sheet;
- no Raw/Registry/scientific write.

### B. Use it only in `apathyCaptureSheetForRollback_`

Replace the backup creation call only:

```text
apathyInsertSizedSheet_(...)
```

with the snapshot-specific no-shrink helper.

Do **not** globally change `apathyInsertSizedSheet_`; restoration/other callers are outside this fast fix.

### C. Preserve all snapshot semantics

Keep unchanged:

- stale-backup removal;
- `copyTo` range/content behavior;
- stored source rows/columns;
- column widths / hidden columns;
- frozen rows/columns;
- gridline / visibility metadata;
- fingerprint;
- restore behavior;
- rollback-on-catch behavior;
- checkpoint timing;
- Result / Boss / Output scientific semantics.

## Validation before Production write

Minimal only:

1. fresh Production pull;
2. syntax / combined Apps Script syntax;
3. static confirmation that only snapshot backup allocation changed;
4. verify restore still reads only `meta.rows × meta.columns`;
5. verify no Raw/scientific/Registry logic touched;
6. privacy/source-inventory checks from `BACKEND_SOURCE_SYNC.md`;
7. deploy by exact reviewed overlay only.

Do not create a new broad test suite.

## Runtime verification

Do **not** automatically restart Full from Step 1 after deploying.

Return to human/ChatGPT with:

- exact function(s) changed;
- fresh-live vs candidate diff summary;
- deployment confirmation;
- current persisted run status and failed stage;
- whether any rollback backup sheet remains active/stale;
- if state is still `FAILED` at `RESULT_CORE`, instruct the human to click **Step 3 only once**.

Then stop before Step 4. Human/ChatGPT will inspect the Step-3 result first.

## If the same timeout persists after this patch

Do not keep modifying snapshot allocation blindly.

The next already-identified target is Step-3 participant handoff fingerprint cost:

```text
apathyRunnerRequireFingerprint_
-> apathyRunnerFingerprintSheets_
-> getDataRange().getValues()
```

especially `_Candidate_Field_Provenance` (~1.16M allocated cells in the current workbook).

That becomes a **separate** performance task. Do not combine it into this first patch unless the fresh source proves snapshot allocation is already no-shrink or otherwise not the active code.
