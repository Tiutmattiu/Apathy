# APATHY Participant-Facing Report — Current Product Spec

Status: **CURRENT PRODUCT CONTRACT — corrected 2026-09-03**

This report is the image handed/sent to the participant. It is not Boss/Admin/Trace, not an SPSS/R report, and not the staff interim screening-result screen.

The prior PDF/print-first delivery contract is superseded by the current user requirement below. Preserve the established nine scientific participant-facing metrics and interpretation direction, but change the staff workflow and participant-visible identity/output format.

## 1. Scientific/content scope

The report intentionally keeps nine participant-facing outputs rather than dumping every APATHY scale.

### 認知表現

1. **順序記憶** — Digit Span Forward concept.
2. **倒序記憶** — Digit Span Backward concept.
3. **整體認知能力** — MoCA concept.

### 動機與情緒

1. **思考與社交動機**.
2. **情緒反應與表達**.
3. **主動開始活動**.

Bind these labels to the accepted current APATHY apathy-domain outputs. Do not invent a second scoring model.

### 決策表現

1. **決策速度**.
2. **決策質素**.
3. **風險調整**.

Use accepted current CGT outputs and directionality. A numerically larger raw value does not automatically mean better performance. CGT risk-adjustment direction remains `TBD` unless the accepted current project mapping is explicitly established; do not guess.

## 2. Participant-facing visual contract

The visual target remains a single portrait A4-ratio page, but the delivered artifact is now a **PNG image**, not a PDF.

For each available metric show:

1. metric name;
2. one short plain-language explanation;
3. a **real visible horizontal bar**;
4. a simple category label such as `良好` / `一般` / `待確認` according to the accepted interpretation contract.

The bar uses the internal cohort-relative normalized 0–100 position. Participant-facing output must not display percentile numbers, cohort N, scoring-direction rules, or conversion formulas.

Visual invariant:

> **longer bar = better relative performance**

For an available metric, the bar track and filled portion must be visibly rendered in the PNG; text-only category output is not acceptable. For an unavailable metric, show `待確認` and do not fabricate a filled position.

Keep the three sections:

- `認知表現`
- `動機與情緒`
- `決策表現`

Footer may remain:

`柱越長，代表在該項目中的相對表現越好。`

Recommended PNG target is A4 portrait ratio at approximately 1240 × 1754 px or another crisp equivalent. White background; Chinese text must remain readable when shared on a phone.

## 3. Participant-visible identity and privacy

**Never show internal PID or SID to the participant.**

Do not show `Pxxx`, `Sxxx`, `參與者編號`, or any internal identifier anywhere in:

- the report image;
- the downloaded filename;
- participant-visible metadata.

Participant-facing header should use ordinary identity/contact information instead:

- `姓名：<display name>` when a trustworthy display name is available;
- `電話：<phone>` when a trustworthy phone value is available;
- assessment/report date may remain.

The staff selector may use internal PID ranges because it is not participant-facing.

Identity/contact lookup is **display metadata only** and must not redefine scientific or participant identity authority. Use an exact existing PID linkage to retrieve name/phone; never fuzzy-match a participant for report generation. Preferred lookup is the current staff contact directory/Contactlist exact PID match. If current Production requires a historical directory fallback, it may be used only when the PID match is exact and unique; do not use it as scientific authority or silently merge identities.

Name may fall back to the accepted Boss `Name` value. Phone must not be invented. If no unique phone can be resolved, surface a staff-side warning and use a safe filename fallback rather than exposing PID.

## 4. Staff generation UI — range first

The staff workflow should be extremely small.

Primary control:

```text
P [ numeric start ]   到   P [ numeric end ]
[下載報告圖片]
```

Rules:

- the two boxes accept **numbers only**; staff should not need to type the letter `P`;
- `101` to `120` means inclusive internal range `P101` through `P120`;
- start = end is the single-participant case;
- existing participants inside the range are generated; missing numeric gaps are skipped and summarized staff-side;
- no need to type a comma-separated PID list for ordinary batch use.

The button is **direct download**, not “print”.

Do not require the browser print dialog for the normal workflow.

## 5. Batch image download contract

One explicit staff click should generate and download **one separate PNG file per participant** in the selected range.

Do not make one multi-page PDF the normal output.

Do not combine participants into one image.

Default filename rule:

```text
<phone>_<name>_報告.png
```

If name is unavailable:

```text
<phone>_報告.png
```

If phone is unavailable but a trustworthy name exists, use:

```text
<name>_報告.png
```

and show a staff-side warning that phone metadata is missing.

Filename values must be sanitized for filesystem-invalid characters. **Never fall back to PID in the filename.**

The browser may require permission for multiple downloads. Trigger the separate downloads from the one explicit staff action and surface a short staff message if the browser blocks multiple files. Do not silently switch to PDF. A ZIP fallback is not the default product requirement unless explicitly requested later.

## 6. Data-source contract

Scientific report values must come from accepted backend report payload/scientific state, not incomplete local form state and not a second client-side scoring engine.

Conceptually:

```text
accepted current participant outputs
+ report reference distribution/version
+ exact display/contact lookup
-> read-only participant-report payload
-> one reusable report renderer
-> PNG rasterization
-> one separate downloaded PNG per participant
```

The internal report payload may contain the PID solely as a staff-side lookup key, but the renderer/download filename must not expose it.

For each metric the internal payload should retain enough information to safely draw the bar, e.g.:

```text
metric_code
participant_label
plain_language_explanation
accepted_value
normalized_direction
relative_position_0_100
interpretation_label
reference_group_definition
reference_n_internal
reference_data_version
```

Missing values remain unavailable, never zero.

## 7. Rendering/export implementation boundary

Reuse the current one-page report renderer where practical; do not rewrite scientific scoring merely to make PNG files.

The implementation must ensure the actual rendered `.participant-report-page` (including visible bar fills and labels) is rasterized to PNG. A small pinned client-side DOM-to-canvas dependency such as `html2canvas`, or an equally bounded self-contained rendering approach, is acceptable if required. Do not add a server-side PDF stack or a broad frontend framework.

If a third-party browser library is used:

- HTTPS only;
- pin a concrete version;
- use it only for rasterization;
- do not send report data to an external service.

PNG generation should occur client-side from the already-rendered participant page.

## 8. What must never appear in the participant image

Do not expose:

- PID / SID / participant display ID;
- internal group/eligibility decisions;
- Admin action classes;
- Event/Raw/Field Provenance lineage;
- authority-gate codes;
- payment/receipt status;
- raw technical field names;
- debugging/pipeline diagnostics;
- percentile numbers or cohort N.

## 9. Current acceptance boundary

The report feature is accepted when staff can:

1. type two numeric PID bounds into `P [ ] 到 P [ ]`;
2. click one `下載報告圖片` action;
3. receive one separate PNG per existing participant in the inclusive range;
4. see no PID/SID in image or filename;
5. see name + phone on the participant-facing image when uniquely resolvable;
6. see real horizontal bars for available metrics, with longer = better;
7. see `待確認` without a fabricated bar when a metric is unavailable;
8. get filenames based on phone/name rather than internal participant ID;
9. preserve the established nine-metric scientific mapping/direction contract.

Browser-native print/PDF may remain as an optional secondary/debug capability, but it is no longer the primary acceptance path.
