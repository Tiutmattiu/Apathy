# Codex Task — Participant Report PNG Batch Redesign

Date: 2026-09-03

Scope: **participant-report UI/export only.** This supersedes the earlier print/PDF-first report delivery workflow.

Read first:

- `PARTICIPANT_REPORT_SPEC.md`
- `CURRENT_STATUS.md`
- `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`

Use the current deployed/private report source as runtime truth. Preserve the accepted nine scientific metrics and current report payload/scoring logic unless a concrete current bug is proven.

## Why this task exists

A real Production preview exposed four product defects:

1. the report still exposes an internal participant ID;
2. the participant-facing header does not use ordinary name/phone identity;
3. the nine metric rows show category text but the required horizontal bars are not visibly rendered;
4. the primary staff workflow is print/PDF-oriented, while the actual requirement is one-click direct PNG download, including batch range generation.

The previously deployed two-line print-button fix may remain, but print/PDF is no longer the primary acceptance path.

## Product contract — do not reinterpret

Participant-facing output must never expose PID/SID.

Staff-side selection may use PID internally.

Primary UI:

```text
P [ number ]   到   P [ number ]
[下載報告圖片]
```

Staff enters numbers only. Example semantics: `65` maps to internal `P065`; `101` maps to `P101`. The range is inclusive. Same start/end means one participant.

One click downloads one separate PNG per existing participant in the range.

Do not require comma-separated PID input for normal batch use.

Do not make PDF/print the normal download path.

## A. Refresh current live report source first

Fresh-pull the current deployed Apps Script project and inspect only the participant-report implementation path, expected to include:

- `report.html`
- `report_backend.js`
- report menu/launcher only if directly required

Do not modify `output.js`, `helper.js`, Result/Decision, Admin, MRIadmin, frontend questionnaire code, or historical migration.

If another agent currently owns the Apps Script Production write lane, prepare the patch locally and STOP before deploy. Overlapping Production writes remain serialized.

## B. Replace participant-visible PID with name + phone

The report image/header must not contain:

- `Pxxx`
- `Sxxx`
- `參與者編號`
- any internal participant/display ID

Use internal PID only as a staff-side lookup key.

Extend the read-only report payload with:

```text
display_name
phone
```

Resolve contact/display metadata only through **exact PID linkage**. No fuzzy matching.

Preferred current lookup:

1. exact unique `Contactlist.PID` -> `phone_number`, `name`;
2. `Boss.Name` may provide/fallback the display name;
3. if no current Contactlist row exists for a historical participant, inspect whether the existing historical import directory (`Admin_Import_Candidate`) contains an exact unique PID row. It may be used only as a display/contact fallback, never as scientific authority or identity-merge authority;
4. if multiple exact PID rows conflict, do not choose silently — return staff-side unresolved metadata.

Phone must never be fabricated.

Participant-facing header target:

```text
APATHY 研究參與者報告
姓名：<name>    電話：<phone>    評估日期：<date>
```

If phone is genuinely unavailable, do not expose PID as a replacement.

## C. Make the bars actually visible

The current product contract requires a visible horizontal comparative bar for each available metric.

Inspect the current renderer/CSS and fix the first actual rendering defect rather than adding a second scoring layer.

For every metric with a valid `relative_position_0_100`:

```text
[track ==============================]
[fill  ===============               ]   一般
```

Requirements:

- track visibly present;
- filled portion visibly present;
- fill width proportional to the existing normalized 0–100 position;
- longer = better;
- category label remains readable;
- no percentile number/cohort N exposed.

For unavailable/TBD metric:

- show `待確認`;
- do not fabricate a fill position.

Do not recompute scientific scores in `report.html`.

## D. Range selector

Replace ordinary manual PID-list entry as the primary control with two numeric inputs.

Conceptual HTML:

```html
<label>P <input id="reportStart" type="number"></label>
<span>到</span>
<label>P <input id="reportEnd" type="number"></label>
<button id="downloadReports">下載報告圖片</button>
```

Exact styling may follow current page.

Normalization rule:

```javascript
function pidFromNumber(n) {
  var s = String(Number(n));
  return 'P' + s.padStart(3, '0');
}
```

Use the current supported PID regex/normalization if it is stricter.

Backend/client should request the inclusive range in one batch operation. Existing missing PID gaps should be skipped and summarized staff-side; they are not fatal to the whole batch.

Do not issue one server round-trip per participant if the current batch payload endpoint can already accept a list.

## E. Direct PNG export

Primary action is `下載報告圖片`.

Reuse the rendered `.participant-report-page` and rasterize each participant page client-side.

Preferred minimal approach: pinned `html2canvas` 1.4.1 (HTTPS) or an equally bounded existing local DOM-to-canvas implementation.

If using html2canvas, pin the version and use it only for local rasterization; report data must not be sent to an external service.

Conceptual flow:

```javascript
for each rendered participant page:
  canvas = await html2canvas(page, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false
  })
  blob = await canvas.toBlob(... 'image/png')
  trigger one <a download> save
```

Target output: crisp A4 portrait ratio, approximately 1240 × 1754 px or equivalent.

All files are separate PNG files. Do not combine participants into one image. Do not silently replace with one multi-page PDF.

Multiple downloads must originate from the one explicit user click. If the browser asks for permission to allow multiple downloads, show a short staff instruction rather than treating it as scientific/backend failure.

## F. Filename contract

Never use PID/SID in the filename.

Preferred:

```text
<phone>_<name>_報告.png
```

If name unavailable:

```text
<phone>_報告.png
```

If phone unavailable but trustworthy name exists:

```text
<name>_報告.png
```

and show a staff-side warning that phone metadata is missing.

If neither can be resolved, skip that file and show a staff-side unresolved item. Do not fall back to PID.

Sanitize filesystem-invalid characters in name/phone.

## G. Preserve current scientific report contract

Do not change the nine domains/metrics:

### 認知表現
- 順序記憶
- 倒序記憶
- 整體認知能力

### 動機與情緒
- 思考與社交動機
- 情緒反應與表達
- 主動開始活動

### 決策表現
- 決策速度
- 決策質素
- 風險調整

Preserve:

- accepted backend values;
- established direction normalization;
- `longer bar = better`;
- `待確認` for unavailable metrics;
- existing short participant explanations unless a purely visual fit change is required.

CGT risk-adjustment remains `待確認` if the accepted direction/reference mapping is not established. Do not guess merely to draw a bar.

## H. Out of scope

Do not:

- run Full;
- run Incremental;
- rebuild Boss/Admin;
- touch Step-3 timeout work;
- alter Raw/Event/Participant/Result/Decision;
- change report scientific scoring;
- add participant login/self-service;
- add email sending;
- add a PDF library;
- redesign the nine metric definitions;
- expose PID anywhere participant-visible.

## I. Minimal validation before deploy

Static/syntax only plus a local/private preview where possible.

Verify:

1. numeric range -> correct zero-padded PID list internally;
2. range gaps do not crash the batch;
3. participant-visible DOM contains no `參與者編號` or PID/SID text;
4. available metrics create visible track + nonzero fill when relative position > 0;
5. unavailable metrics show `待確認` without fake fill;
6. filenames never contain PID/SID;
7. name/phone lookup uses exact PID linkage only;
8. no scientific backend file changed unless directly required to add read-only display/contact metadata.

## J. Deployment / human acceptance

Deploy only when the Apps Script Production write lane is free and after refreshing live source.

Prefer the smallest live overlay. Expected changed files are `report.html` and, if needed for contact metadata/range payload, `report_backend.js` only.

No Full/Incremental after deploy.

Human acceptance should use a small real staff-selected range containing at least two existing participants and, if practical, one numeric gap.

PASS requires:

- one click starts direct downloads;
- separate `.png` files are produced;
- no print dialog is required;
- PNG contains name + phone where uniquely available;
- PNG does not contain PID/SID;
- file name uses phone/name and no PID;
- visible bars are present for available metrics;
- different relative positions visibly produce different bar lengths;
- `待確認` metrics do not show a fabricated bar;
- Chinese text is crisp/readable;
- no scientific/Admin/Full state changed.

If multiple-download browser permission blocks later files, report that exact browser/UI blocker; do not redesign into PDF automatically.

## Final response format

```text
ROOT CAUSE OF MISSING BARS: <exact>
FILES CHANGED: <files>
CONTACT LOOKUP: <exact order>
RANGE UI: implemented yes/no
DIRECT PNG: implemented yes/no
PID VISIBLE IN REPORT: yes/no
PID USED IN FILENAMES: yes/no
SEPARATE FILE DOWNLOAD: yes/no
DEPLOYED: yes/no
HUMAN ACCEPTANCE NEEDED: <exact click>
BLOCKER: <none or exact>
STOP
```
