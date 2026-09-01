# APATHY Participant-Facing Report — Recovered Product Spec

Status: **PRIOR DESIGN RECOVERED / IMPLEMENTATION NOT YET WIRED INTO PUBLIC FRONTEND**

This document records prior participant-report work so future agents do not redesign the report from scratch.

The report is the **document handed to the participant**. It is not an SPSS/R analysis report, not Boss/Admin, not Trace, and not the current staff-only interim screening result screen.

## 1. Prior deliverables already produced

Earlier work produced:

- an editable APATHY participant-report template based on the older report;
- a three-page PDF visual prototype that was rendered and visually checked;
- a later **single-page A4** participant-report prototype in both DOCX and PDF form.

Those artifacts are private/user files and are not committed to this public repository.

## 2. Scientific/content scope that must be preserved

The participant report intentionally keeps the older report's participant-facing domains rather than dumping every APATHY scale.

### 認知表現

1. **順序記憶**
   - source concept: Digit Span Forward
   - participant explanation: short-term retention and repeating information in the original order.

2. **倒序記憶**
   - source concept: Digit Span Backward
   - participant explanation: retaining information, mentally reorganizing it, and repeating it in reverse order.

3. **整體認知能力**
   - source concept: MoCA
   - participant explanation: overall attention, memory, language and thinking performance.

### 動機與情緒

Keep the three-dimensional apathy presentation from the prior report work:

1. **思考與社交動機**
   - cognitive/social motivation dimension.

2. **情緒反應與表達**
   - emotional response/expression dimension.

3. **主動開始活動**
   - behavioural/autonomy/self-initiation dimension.

The final implementation must bind these human labels to the accepted current APATHY apathy-domain outputs rather than inventing a new scoring model.

### 決策表現

Keep the three CGT-derived participant-facing dimensions:

1. **決策速度**
2. **決策質素**
3. **風險調整**

The final mapping must use the accepted current CGT outputs and directionality. Do not assume that a numerically larger raw value always means better performance.

## 3. Final participant-facing presentation model

The **single-page A4 prototype is the current visual target**.

For each metric, participant-facing output contains exactly:

1. metric name;
2. one very short plain-language explanation;
3. horizontal comparative bar + simple category label.

The bar uses an internal cohort-relative normalized 0–100 position, but the participant-facing page must **not display**:

- percentile numbers;
- `第 XX 百分位`;
- cohort N;
- technical scoring-direction explanations;
- internal conversion rules.

The visual direction is always intuitive:

> **longer bar = better relative performance**

Therefore reverse-direction metrics are normalized internally before rendering. GAS/apathy dimensions and CGT speed require direction-aware conversion. CGT risk-adjustment direction must remain explicit `TBD` until the accepted current project direction is confirmed; do not guess.

Participant-readable category labels such as `良好`, `一般`, or `待確認` are secondary to the bar and must come from the agreed report interpretation contract rather than arbitrary frontend thresholds.

The one-page layout groups all nine outputs into:

- `認知表現`
- `動機與情緒`
- `決策表現`

Footer wording may remain:

`柱越長，代表在該項目中的相對表現越好。`

## 4. What is NOT the participant report

The current public frontend's `renderScreenResult()` is not the report.

It contains staff workflow language such as interim screening review, blocking conditions, and a staff final-decision control. That is useful during collection but must not be printed or handed to a participant as the report.

Likewise, do not expose:

- internal group/eligibility decisions;
- Admin action classes;
- Event/Raw/Field Provenance lineage;
- authority-gate codes;
- payment/receipt status;
- raw technical field names;
- debugging or pipeline diagnostics.

## 5. Data-source contract

The report must be generated from **final accepted backend data**, not from incomplete local browser state.

Preferred architecture:

```text
accepted current participant outputs
+ report reference distributions / version
-> read-only participant-report payload
-> one reusable report renderer
-> single report OR batch print view
```

Do not build a second scientific scoring engine in the report UI.

Do not read arbitrary Boss cells and infer the report directly from presentation columns if a canonical accepted field exists upstream.

## 6. Internal normalization/reference contract

For each of the nine participant-facing outputs, the internal report payload needs enough information to derive the bar safely, for example:

```text
metric_code
participant_label
plain_language_explanation
accepted_value
normalized_direction
reference_group_definition
reference_n_internal
relative_position_0_100
interpretation_label
reference_data_version
```

Rules:

- reference group must be explicit, not silently mixed;
- reference N and version remain internal/metadata unless staff need them for QA;
- missing/unavailable values remain unavailable, never zero;
- reverse-direction metrics must be normalized before drawing the bar;
- `待確認` is preferable to a misleading bar when the current data/reference contract is insufficient.

## 7. Delivery model — staff batch first

The primary v1 delivery model is **staff-controlled generation**, not participant self-service links.

The same renderer must support both:

### Single participant

- staff opens one finalized participant;
- preview the one-page report;
- print / save as PDF.

### Batch generation

- staff selects multiple finalized participants, or a defined eligible/completed set;
- frontend requests report payloads in one batch;
- render **one A4 report page per participant** in one print document;
- CSS uses page breaks so each participant starts on a separate A4 page;
- one browser `列印／儲存PDF` action can therefore produce a multi-page PDF containing many participants.

This is the preferred first implementation because it avoids introducing participant authentication, expiring-token links, email delivery and access-control complexity just to distribute a one-page result sheet.

### Optional later self-service

Participant self-download links are **not required for v1**.

If added later, they must use a dedicated read-only report endpoint and a participant-specific expiring/unpredictable token or equivalent approved access-control mechanism. Do not expose a report through a guessable `?pid=P123` URL.

## 8. v1 implementation target

Build the report into the existing APATHY staff frontend as a **staff-triggered read-only report view with single + batch mode**.

Minimum v1:

1. staff can choose one or many eligible/finalized participants;
2. frontend fetches dedicated read-only report payload(s) from current accepted backend state;
3. renderer reproduces the recovered single-page A4 structure;
4. batch mode renders one `.participant-report-page` per participant;
5. print CSS hides staff navigation/actions and inserts page breaks;
6. `列印／儲存PDF` uses the browser print dialog (`window.print()` is sufficient for v1);
7. unavailable metrics render as `待確認`/unavailable without fabricating a bar position;
8. participant-facing output shows participant display ID and assessment/report date but not internal reference N/percentile values.

No server-side PDF stack and no participant login/download portal are required for v1.

## 9. Acceptance boundary

Participant-report v1 is complete when staff can:

- open and print a real finalized participant's one-page report;
- select multiple finalized participants and produce a correctly paginated batch PDF/print document;
- reproduce the prior nine-metric single-page participant-facing design;
- avoid exposing staff-only/technical fields;
- avoid displaying percentile numbers/cohort N to participants;
- preserve `longer bar = better relative performance` through correct internal direction normalization.

Do not broaden v1 into a general research dashboard, SPSS export, every-scale clinical report, or participant authentication portal.
