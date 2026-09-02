# Codex Task — Step 3 rollback-snapshot I/O fast fix

Date: 2026-09-03

Scope: **one narrow Production helper patch only.** Preserve the existing mainline Codex thread/context. Do not re-audit Event, Participant semantics, Result scoring, Decision, historical migration, MRIadmin, Admin vNext, or frontend.

Read first: `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`.

## Established facts — do not rediscover

1. Boss admission is `Inclusion !== n`. There is no inclusion-contract defect to repair.
2. Current Event and Participant stages pass; current `_Candidate_Payload_Loss` has no active loss rows in the inspected snapshot.
3. Current Step 3 repeatedly ends in `Service Spreadsheets timed out` with no checkpoint commit.
4. The same runner version has successfully completed Production Step 3 / Full multiple times historically, including 2026-08-26, 2026-08-27 and an earlier 2026-09-01 run. Therefore this is not established as a scientific/result regression.
5. The rollback capture implementation visible in the 2026-08-26 helper snapshot and 2026-09-02 helper snapshot is textually unchanged around:
   - `apathyCaptureProductionOutputSnapshot_`
   - `apathyCaptureSheetForRollback_`
   - `apathyInsertSizedSheet_`
6. Current workbook aggregate shape includes a very large `_Candidate_Field_Provenance` surface (~44.6k rows x 26 cols), so the Step-3 participant fingerprint already performs a large Spreadsheet read before snapshot capture.
7. After repeated current hard timeouts, `_Apathy_Run_Rollback_Boss` and `_Apathy_Run_Rollback_Admin` exist only as empty default-grid shells; `_Apathy_Run_Rollback_Checkpoint` is absent. This is consistent with at least some attempts reaching snapshot creation and terminating during structural sheet creation/resizing/copy before the complete snapshot was committed to run state.

## Concrete inefficiency to patch first

Current snapshot backup creation calls the general `apathyInsertSizedSheet_()` helper. That helper:

```text
insertSheet(name)
-> delete surplus default rows
-> insert/delete columns to exact source size
-> return
```

For a temporary rollback backup, exact grid dimensions are unnecessary. Snapshot metadata already stores the real `rows` and `columns`, and restore reads only:

```text
backup.getRange(1,1,meta.rows,meta.columns)
```

Extra unused rows/columns on the hidden backup do not alter rollback semantics.

Structural `deleteRows` / `deleteColumns` operations are therefore avoidable I/O in exactly the current failure area.

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

1. syntax / combined Apps Script syntax;
2. static confirmation that only snapshot backup allocation changed;
3. verify restore still reads only `meta.rows × meta.columns`;
4. verify no Raw/scientific/Registry logic touched;
5. privacy/source-inventory checks from `BACKEND_SOURCE_SYNC.md`;
6. fresh Production pull + exact reviewed overlay only.

Do not create a new broad test suite.

## Runtime verification

Do **not** automatically run Full after deploying.

Return to human/ChatGPT with:

- exact function(s) changed;
- fresh-live vs candidate diff summary;
- deployment confirmation;
- whether current stale empty rollback sheets need a safe cleanup/cancel before the next human Step-3 attempt;
- the exact safest next human action based on current run state.

Then stop.

## If the same timeout persists after this patch

Do not keep modifying snapshot logic.

The next already-identified target is Step-3 participant handoff fingerprint cost:

```text
apathyRunnerRequireFingerprint_
-> apathyRunnerFingerprintSheets_
-> getDataRange().getValues()
```

especially `_Candidate_Field_Provenance` (~1.16M allocated cells in the current workbook).

That becomes a **separate** performance task. Do not combine it into this first patch unless the fresh source proves snapshot allocation is already no-shrink or otherwise not the active code.
