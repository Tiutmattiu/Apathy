# Copilot Offline Task — Step 3 Spreadsheet I/O audit

Date: 2026-09-03

Mode: **READ-ONLY / OFFLINE / NO PRODUCTION WRITES**

Purpose: mechanically rank Step-3 Spreadsheet I/O cost so the mainline Codex window does not waste quota rediscovering the pipeline.

Read first:

- `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`
- `CODEX_STEP3_TIMEOUT_FAST_FIX_20260903.md`
- `BACKEND_SOURCE_SYNC.md`

## Fixed facts

- Boss admission is `Inclusion !== n`; do not investigate inclusion.
- Event/Participant currently pass.
- Step 3 has recurrent Spreadsheet-service timeout, but the same runner version has previously passed; do not call this a scientific regression.
- Current rollback capture code is historically unchanged around the snapshot helper.
- Current workbook aggregate metadata shows especially large technical surfaces, including roughly:
  - `_Candidate_Field_Provenance`: 44.6k x 26
  - `_Candidate_Result_Bridge_Evidence`: 1000 x 700
  - `_Candidate_Event_Values`: 60k x 11
- Current Step 3 preamble fingerprints Participant surfaces using `getDataRange().getValues()` + JSON hashing.
- Empty default-grid rollback Boss/Admin shells remained after hard timeouts, so snapshot structural operations are also a concrete current failure-area suspect.

## Inputs

Use only local/private source already available to Copilot and any user-provided historical helper snapshots.

Do not upload or quote participant rows, names, phones, payload contents, workbook IDs or Script IDs.

## Task A — current vs last-known-successful helper comparison

Compare the current live/private `helper.js` against the latest known source that successfully completed Production Step 3 with the same runner generation.

Focus only on functions reachable from:

```text
continueApathyCandidateFull('RESULT_CORE')
```

through the point where `apathyBuildResultCore_()` begins.

Report exact code deltas, if any, in:

- state/ledger writes;
- `SpreadsheetApp.flush()`;
- participant fingerprint verification;
- rollback snapshot capture;
- sheet creation/resizing/copy;
- any new reads/writes before Result Core.

If no relevant delta exists, say `NO_RELEVANT_STEP3_PREAMBLE_CODE_DELTA`.

## Task B — rank Spreadsheet calls by cost

Produce a short table:

```text
rank | function | Spreadsheet call | surface | approximate cells / structural operation | repeated? | likely cost
```

Include at least:

- `apathyRunnerRequireFingerprint_`
- `apathyRunnerFingerprintSheets_`
- `apathyCaptureProductionOutputSnapshot_`
- `apathyCaptureSheetForRollback_`
- `apathyInsertSizedSheet_`
- the first major Spreadsheet reads/writes inside `apathyBuildResultCore_`
- bridge generation if reachable immediately after entry.

Pay special attention to:

- full-range reads followed by JSON serialization/hashing;
- repeated reads of the same large sheet in one Step-3 execution;
- `deleteRows`, `deleteColumns`, `insertRowsAfter`, `insertColumnsAfter`;
- full-range `copyTo`;
- `SpreadsheetApp.flush()` boundaries;
- whole-sheet clear/rewrite operations.

## Task C — identify the cheapest safe optimizations

Classify each candidate optimization as:

- `SAFE_FIRST_PATCH`
- `SAFE_SECOND_PATCH_IF_NEEDED`
- `SEMANTICS_OR_SAFETY_RISK`
- `NOT_WORTH_IT`

The already proposed first patch is:

> rollback backup sheets should grow only if required and should not shrink/delete default rows/columns.

Evaluate that mechanically; do not implement it.

For the participant fingerprint, determine whether there is an existing owner-produced checksum/fingerprint or stable row-level digest that could avoid rereading ~1M cells **without weakening staged-run change detection**. If not, say so; do not invent a new architecture.

## Output

Return only:

1. `CURRENT_VS_SUCCESSFUL_DELTA`
2. `TOP_IO_COSTS`
3. `SAFE_FIRST_PATCH_VERDICT`
4. `SECOND_PATCH_IF_TIMEOUT_PERSISTS`
5. `DO_NOT_TOUCH`

Keep it under ~150 lines.

No code changes. No workbook writes. No new tests. No broad repository audit.
