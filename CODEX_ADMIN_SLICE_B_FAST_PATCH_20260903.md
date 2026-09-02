# Codex Task — Admin Slice B readability fast patch

Date: 2026-09-03

Scope: **one bounded `output.js` readability patch only.** Slice A actionability is already accepted; do not reopen it.

Read first: `CURRENT_STATUS.md` and `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`.

## Current Production baseline — already verified

- Active Admin has 11 participant rows.
- All active rows are genuine `STAFF_DATA_ACTION`.
- Active system-maintenance issues: 0.
- `TRACE_ONLY_NO_ACTION`: 0.
- `NON_INCLUDED_CONTACT_CLOSEOUT`: 0.
- Non-identity rows do not expose a working Execute checkbox.
- Boss remains exactly 90 columns.
- Current remaining staff work is concentrated in Stage 2 and Clinical source/item completion.

Do not change any of those accepted Slice A properties.

## Current UX defect

The visible `为什么` column is still a wall of exact item names. One participant can currently display many dozens or more than one hundred missing/invalid item labels inline. This is technically precise but poor as a staff inbox.

The exact evidence is useful and must not be lost. The defect is **projection/readability**, not diagnosis.

Current source shape:

```text
Stage2/Clinical evidence resolver
-> exact_items[]
-> add(... situation = exact_items.join('；') ...)
-> apathyOutputCollapseAdminRows_()
-> visible 为什么 = category + full situation
```

## Required product result

Keep one visible participant row, but make `为什么` compact.

Example shape only:

```text
问题是什么: Stage 2资料不完整；Clinical资料不完整
为什么:
Stage 2：AMI、RGPTS、CDARS、PDI、IOR（共119项缺失/无效）
Clinical：UPDRS III（33项缺失/无效）
下一步做什么:
只补缺失/无效项目；不要重录已完成资料。
```

Do not hard-code participant IDs or the example counts.

## Required patch

Modify **private Production `output.js` only** unless a fresh pull proves the active functions live elsewhere.

### A. Preserve exact detail in hidden technical evidence

Append one technical Admin column at the **end** of the current technical schema:

```text
Exact_Detail
```

Do not insert it in the middle of existing technical columns.

`add(...)` already receives the full exact `situation` text. Preserve that original full text into `Exact_Detail` for every issue row before participant collapse.

This is not a new authority or data layer. It is a hidden projection field on the existing Admin output.

### B. Add one compact visible-summary helper

Add a small pure helper used only for Admin visible wording. It should recognize the current exact-item formats, including patterns such as:

```text
Stage 2 > AMI：Q1 缺失、Q2 缺失...
Stage 2 > PDI：Q1 无效、Q2 无效...
Clinical > UPDRS III：3.1 缺失、3.2 缺失...
```

For recognized Stage 2 / Clinical item-detail text:

1. group by domain/scale;
2. count listed missing/invalid items from the generated exact-item text;
3. show scale names once;
4. show a total item count;
5. use compact wording such as `缺失/无效` when mixed states are present.

For any unrecognized issue type, **fall back to the current visible text**. Do not globally rewrite other Admin wording.

### C. Change only participant collapse presentation

In `apathyOutputCollapseAdminRows_()`:

- keep the current participant grouping;
- keep `问题是什么`, `下一步做什么`, `在哪里处理`, status and lineage behavior;
- replace only the visible `为什么` construction with the compact helper for recognized Stage 2/Clinical exact-item issues;
- collapse/join the hidden `Exact_Detail` values so the complete old exact text remains available after grouping.

### D. Preserve exact current behavior outside readability

Do not change:

- Stage 2 evidence validation rules;
- Clinical/UPDRS evidence validation rules;
- what counts as missing vs invalid;
- `Action_Class` / `Diagnosis_Code` classification;
- Slice A admission/suppression;
- Identity resolution;
- Raw/Event/Participant/Result/Decision;
- Boss schema or scientific values;
- Incremental semantics;
- MRIadmin;
- payment logic;
- frontend;
- Trace authority semantics.

## Minimal validation

Before deploy:

1. fresh Production pull;
2. syntax / combined Apps Script syntax;
3. confirm only `output.js` changed;
4. confirm existing technical header names/positions are preserved and `Exact_Detail` is appended only;
5. confirm unrecognized issue types retain existing wording.

After deploy, run **`buildApathyOutput()` once only**. Do not run Full or participant Incremental for this slice.

Production acceptance:

- Admin remains 11 active participant rows unless current underlying evidence genuinely changed before the rebuild;
- every active row remains genuine human work;
- system-maintenance/no-action/non-included rows remain absent;
- Boss remains 90 columns;
- visible `为什么` for Stage 2/Clinical is compact and no longer prints the full item wall;
- hidden `Exact_Detail` preserves the complete exact missing/invalid item text;
- existing lineage columns remain hidden and intact.

Then stop and report the visible before/after behavior. Do not continue into deep links, JSON upload, lifecycle states or MRI in this run.

## Write-lane rule

The Step-3 helper runtime patch and this Admin `output.js` patch touch the same Production Apps Script project. **Serialize deployments.** If another agent has deployed since this packet was prepared, fresh-pull/rebase before writing. Do not overlap Production pushes.
