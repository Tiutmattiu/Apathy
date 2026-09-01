# APATHY Participant-Facing Report — Recovered Product Spec

Status: **PRIOR DESIGN RECOVERED / IMPLEMENTATION NOT YET WIRED INTO PUBLIC FRONTEND**

This document records prior participant-report work so future agents do not redesign the report from scratch.

The report is the **document handed to the participant**. It is not an SPSS/R analysis report, not Boss/Admin, not Trace, and not the current staff-only interim screening result screen.

## 1. Prior deliverables already produced

Earlier work produced:

- an editable APATHY participant-report template based on the older report;
- a three-page PDF visual prototype that was rendered and visually checked;
- a later single-page participant-report prototype in both DOCX and PDF form.

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

## 3. Presentation model already chosen in prior work

The report redesign moved away from simply printing raw scores.

Preserve these decisions:

- use **dynamic percentile / relative cohort position** rather than a fixed decorative bar;
- show the relevant **cohort N** so the participant can see the comparison base;
- use plain-language interpretation rather than technical research labels;
- include a **data/report version** so a generated report can be traced to the cohort/reference state used;
- use a visual bar where a longer bar represents better relative performance after directionality has been normalized;
- allow statuses such as `良好`, `一般`, or `待確認` in participant-readable wording, but derive them from the agreed report interpretation contract rather than arbitrary frontend thresholds.

The later single-page prototype grouped all nine outputs into three compact sections: `認知表現`, `動機與情緒`, `決策表現`.

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
accepted current Participant/Result/Boss-equivalent outputs
+ report cohort/reference distribution
-> read-only participant-report payload
-> one report renderer
-> screen / print / browser PDF
```

Do not build a second scientific scoring engine in the report UI.

Do not read arbitrary Boss cells and infer the report directly from presentation columns if a canonical accepted field exists upstream.

## 6. Percentile/reference contract

For each of the nine participant-facing outputs, the report needs:

```text
metric_code
participant_label
plain_language_explanation
raw_or_accepted_value
normalized_direction
reference_group_definition
reference_n
percentile_or_relative_position
interpretation_label
reference_data_version
```

Rules:

- reference group must be explicit, not silently mixed;
- `N` is dynamic and belongs to the reference distribution actually used;
- missing/unavailable values remain unavailable, never zero;
- a percentile is only shown when the reference distribution is valid for that metric;
- reverse-direction metrics must be normalized before drawing a "longer = better" bar;
- `待確認` is preferable to a misleading percentile when the current data/reference contract is insufficient.

## 7. v1 implementation target

Build the report into the existing APATHY staff frontend as a **staff-triggered read-only participant report view**.

Minimum v1:

1. staff selects/loads an eligible participant;
2. frontend fetches a dedicated read-only report payload from current accepted backend state;
3. renderer displays the recovered single-page structure;
4. printable A4 CSS hides navigation/actions;
5. `列印／儲存PDF` uses the browser print dialog (`window.print()` is sufficient for v1);
6. the report shows participant display ID, assessment/report date, cohort N/reference metadata, and report data version;
7. unavailable metrics render as `待確認`/unavailable without fabricating a percentile.

No server-side PDF stack is required for v1.

## 8. Acceptance boundary

Participant-report v1 is complete when a staff member can open a real finalized participant, obtain the same nine-domain participant-facing report structure as the prior prototype, and print/save it without exposing staff-only or technical fields.

Do not broaden v1 into a general research dashboard, SPSS export, or every-scale clinical report.
