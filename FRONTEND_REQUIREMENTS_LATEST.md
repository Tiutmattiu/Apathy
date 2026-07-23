# Apathy Frontend — Latest Consolidated Requirements

**Status:** implementation baseline after v9 testing  
**Purpose:** replace contradictory historical requirements before rebuilding individual frontend files.  
**Delivery method:** one source file at a time; do not rebuild from a reduced template and do not invent backend headers.

## 1. Non-negotiable architecture

- Preserve the complete v7/v9 approved question bank and the smoother v9 state-management/auto-save core.
- Remove stacked/duplicated renderer overrides. Each screen, scale result, conditional block and submit modal has one renderer and one event path.
- All visible text is Traditional Chinese. Raw keys may remain English internally.
- A failure in one backfill section must not stop later sections from rendering.
- No assumed fixed header count (including 533 or 544), and no `reserved_backend_*` fields.
- Unanswered values are `null`, never a scored zero. A derived score is formal only when its required raw inputs are complete.

## 2. Result disclosure rules

### First screening and MRI/on-site assessments

Participant and staff complete these together.

- During a scale: do not show current score, domain score, cutoff, review, positive/negative status, group or exclusion.
- Immediately after the final required answer of that scale: show the complete backend-needed result for that scale.
- The final screening summary (“full family portrait”) remains detailed and must include scores, completeness, cutoffs, review status, automatic grouping rationale and staff final decision.
- HADS result labels use `A` and `D`.
- QUIP and QUIP-RS use controlled domain labels (`A`, `B`, `C`, `D`, `E1`, `E2`, `E`, `F`, `AD`, `AF`) in results. Sensitive wording remains `B` only.

### Stage 2 participant channel

- Never show scores, domains, cutoffs, review, positive/negative status, group or exclusion.
- After each section show only a neutral completion message.

### Historical paper re-entry

- Recalculate and display all backend-needed results immediately while staff enter data.
- Show completion, exact missing items, all domains, totals, cutoffs, review, derived fields and calculation status.

## 3. Shared UI and interaction rules

- Completed navigation item: solid blue, white text, `✓`.
- Current item: white background with strong blue border.
- Partial/missing: amber with exact missing count.
- Blocking error: red. Not applicable: grey.
- Remove duplicated “current section” dropdown when the horizontal section navigation is present.
- Never focus an outer question/container. Text/numeric screens focus the first real input; choice screens start with no pre-highlighted answer.
- Selected answer: blue background, white text, `✓`. Focus must not resemble selected state.
- Single-line text and numeric fields: Enter/Done validates, saves and advances.
- Multiline remarks: Enter creates a new line; Ctrl+Enter completes on desktop.
- Normal single-choice questions auto-advance and do not rely on a “Next question” button.
- Buttons created after conditional expansion or rerendering must remain clickable; stop event propagation where parent toggles exist.
- Submit modal is a fully opaque white panel above a dark overlay. Submitting/success/failure are mutually exclusive states.
- Submission message: do not refresh, close or leave; normally allow about 15 seconds. Retry uses the same `submission_id`.
- Global controls: download local JSON, clear this device’s current participant/workflow draft with confirmation, return home.
- Staff entry gate password for the current test frontend: `080` (UI gate only, not server security).

## 4. Identity and basic data

- Staff inputs only the numeric part of IDs:
  - participant series chooses `P` or `Y`; typing `123` saves `P123` or `Y123`;
  - typing `082` for scan ID saves `S082`.
- Pad to three digits on completion. Do not require users to type prefix letters.
- Desktop identity fields use a compact multi-column grid; short fields remain short.
- Education requires both education level and verified actual education years. Level may suggest a value but must not silently overwrite a manually edited year value.

## 5. Formal scoring rules

### HADS

Raw: `hads01_score`…`hads14_score`, each 0–3.

Displayed answer order maps to raw scores:

`1:3210, 2:0123, 3:3210, 4:0123, 5:3210, 6:3210, 7:0123, 8:3210, 9:0123, 10:3210, 11:3210, 12:0123, 13:3210, 14:0123`.

- `A = 1+3+5+7+9+11+13`
- `D = 2+4+6+8+10+12+14`
- Review: `A > 6`; `D > 9`.
- Does not directly group or exclude.

### SAS

- Q1–8 displayed/saved direction `3210`; Q9–14 `0123`.
- Total = sum of 14 items.
- Cutoff `>=14`.
- Supports Apathy grouping for PD only when no QUIP-RS ICD exclusion.

### QUIP

- A–D: five binary items each; E: three; F: four.
- Legal raw only: `quip_a1_yes`…`a5`, `b1`…`b5`, `c1`…`c5`, `d1`…`d5`, `quip_e1_yes`…`e3`, `quip_f1_yes`…`f4`, `quip_e1_detail`, `quip_e2_detail`.
- Do not create `quip_e3_detail`, `quip_e4_yes`, `quip_e5_yes` or `quip_f5_yes`.
- Output domain yes counts/positivity, total yes count, positive-domain count/list and completeness.
- Review only; never directly excludes or groups.

### QUIP-RS

- A/B/C/D/E1/E2/F each have four items scored 0–4.
- `E=E1+E2`; `AD=A+B+C+D`; `AF=AD+E+F`.
- Cutoffs: `A>=6`, `B>=8`, `C>=8`, `D>=7`, `E>=7`, `AD>=10`; F has no exclusion cutoff.
- PD with any applicable cutoff: ICD excluded; group analysis value remains pending/999 as defined by backend.

### RBDSQ

- 13 scored points. Q10 disease subitems combine to a single 0/1 point.
- PD cutoff `>=6`; HC cutoff `>=5`.
- Sleep review only.

### GAS

- 16 items: strongly disagree=3, disagree=2, agree=1, strongly agree=0.
- Domains: Q1–8 Cognitive/Social; Q9–12 Emotion/Reaction; Q13–16 Autonomy.
- PD cutoff `>=16`; HC has no GAS grouping cutoff.

### AMI-18

- Each item 0–4.
- Social: 2,3,4,8,14,17.
- Emotional: 1,6,7,13,16,18.
- Behavioural: 5,9,10,11,12,15.
- Output three domain means, overall 18-item mean and completeness. No cutoff.

### C-DARS

- Pastimes 4; Food/Drink 4; Social 4; Sensory 5; each 0–4.
- Output four domain totals, 17-item overall total and completeness.
- Pastimes example entry requires at least two activities mainly not involving interaction with other people.
- Each rating item must continuously display the participant’s previously entered examples for that domain.

### R-GPTS / PTS

- 18 items, each 0–4, with one number displayed once alongside the full approved anchor.
- Reference = Q1–8; Persecutory = Q9–18; Total = Q1–18.
- Review when Persecutory `>=18`.

### PDI

- 21 items. Unselected at page exit means No and three dimensions become 0.
- Yes expands Distress, Preoccupation and Conviction, each 1–5.
- Output Yes count, three dimension totals, `total_severity`, `pdi_total = yes_count + total_severity`, completeness.
- Two pages: 1–10 and 11–21. Both pages use direct elderly-friendly instructions.
- Only selected items require the three follow-up ratings.

### IOR

- 15 scenarios; Frequency, Conviction and Distress each 1–5.
- Output three totals, overall total and separate `>=3` scenario counts for each dimension.
- All three button sets must remain clickable after scenario changes; complete all three before advancing.

## 6. QUIP formal screening UI

QUIP has exactly three screens/groups, never seven single-question pages.

1. **A–D group:** full approved introduction, complete examples and all five full shared stems on one page. Each row has clickable behaviour-name cells: Gambling, B, Shopping, Eating. Unselected means No; no Yes/No controls or checkboxes.
2. **F group:** all four full medication-use questions and all examples on one page. The complete question itself is clickable; unselected means No.
3. **E group:** all three full questions and examples on one page. E1/E2 reveal their detail field in place; E3 has no detail field.

Do not abbreviate stems or omit bracketed examples. Do not duplicate a group title and a separate repeated question title.

## 7. QUIP-RS UI

- One compact page only: four complete shared stems × seven behaviour rows = 28 small numeric inputs.
- Do not split into 28 pages or four groups.
- Keep `0=從不, 1=極少, 2=有時, 3=經常, 4=非常頻繁` permanently visible.
- Keep full behaviour examples visible; display sensitive category as `B` only.
- Each input accepts exactly one `0–4`; a legal digit saves and focuses the next empty cell.
- Reject multi-digit values, paste strings, invalid digits and answer carry-over. One key event writes to one cell only.
- The 28th cell stops and offers one “完成QUIP-RS” action.

## 8. MoCA and MRI visit

- Screening and MRI MoCA are different assessments. Preserve first and second raw/derived results.
- MRI visit must load the latest valid MoCA date/result from backend when an API is available.
- Compare the local MRI visit date with the latest valid MoCA using a calendar two-month rule, not a simple fixed 60 days.
- Only request an MRI-day/repeat MoCA when the result is over two months old or cannot be verified.
- Repeat MoCA shows Raw, education adjustment, Adjusted, 16th-percentile cutoff, difference and result.
- The latest valid output may use the second assessment, but never delete the first raw record.
- Automatically create a score-change remark.
- MRI safety change is independent of MoCA validity.
- Visit number (first/second MRI), MRI safety change, and PD medication ON/OFF must be working single-select controls.

## 9. MRI administration after recruitment

- Recruitment approval automatically opens Stage 2; no manual “open Stage 2” option.
- Collect available months and weekday morning/afternoon slots.
- Assistance toggles include entrance assistance, companion, wheelchair borrowing, own wheelchair and accessible route.
- Companion count appears only when companion is selected.
- QR-code count = participant 1 + exact companion count; changing count invalidates a previous “QR codes applied” completion state.
- Electronic payment availability conditionally reveals a single-select PayMe / AlipayHK / FPS choice, then payment phone.
- Payment method availability is separate from actual paid/receipt-completed status.

## 10. UPDRS Part III

- Never display raw names such as `updrs3_01` or `undefined`.
- Show 33 Traditional Chinese numbered labels, full approved cueing and item-specific 0–4 anchors.
- Required structure:
  - 3.1 speech; 3.2 facial expression;
  - 3.3 rigidity: neck, right upper, left upper, right lower, left lower;
  - 3.4–3.8 bilateral;
  - 3.9–3.14 single items;
  - 3.15–3.16 bilateral;
  - 3.17 right upper, left upper, right lower, left lower, lips/jaw;
  - 3.18 single item.
- Research-administered route outputs formal total only when all 33 values are complete; otherwise show exact missing items.

## 11. Medication and LEDD

- Search/select a drug first; preserve original name, canonical mapping, aliases and mapping source.
- Structured input: drug, strength, times/day, units/time. Every completed field saves immediately.
- Machine LEDD is unavailable (not zero) while required drug data are incomplete.
- Keep medication text parsing and staff review before accepting parsed rows.
- Preserve conversion factors/assumptions from the supplied calculator with visible warnings for defaults and unresolved cases.
- Calculate machine Levodopa, DA, Other and Total LEDD.
- Staff independently enters manual Levodopa, DA and Total LEDD.
- Output both sets, their differences, warnings/unresolved items, final accepted values and final source.
- Clinical order: medication → machine LEDD → manual LEDD → comparison → final source → summary → submit.

## 12. Historical paper re-entry (highest priority)

- Must render every section through the end: basic data, MoCA, HADS, QUIP, QUIP-RS, SAS, RBDSQ, MRI safety, GAS, AMI, C-DARS, R-GPTS, PDI, IOR, MRI data, MID, CGT placeholder, Digit Span, sequences, UPDRS, UPDRS 1.5, HY, medication/LEDD, payment/receipt, remarks, exact missing summary and submit.
- Wrap each section renderer separately so one failure does not remove later sections.
- Use compact staff-entry layout and immediate full derived results.
- Missing paper values may remain null and be saved, with exact missing-item descriptions.

## 13. Backend contract from supplied partial files

Current partial backend indicates:

- Receiver v3.1 writes append-only to `screening_raw` and `mri_raw`, uses `submission_id` idempotency, stores `payload_json`, and maintains `logical_record_key` / `is_latest`.
- Allowed event types include `screening_core`, `stage_2_questionnaires`, `first_school_assessment`, `mri_scan`, `clinical_supplement`, `historical_paper_reentry`, and `field_correction`.
- `form_type` currently accepts only `screening` or `mri`; clinical/backfill therefore require deliberate event-type/source mapping rather than invented physical tables unless Receiver is updated.
- IDs must be canonical `Pxxx/Yxxx` and `Sxxx`; repeat MRI uses the same S_ID plus `visit_number=2`.
- Backend GET actions currently include health/status plus extension actions such as allocation, screening summary and admin dashboard.
- The supplied Admin Workflow scripts are partial/older and contain outdated rules (for example SAS-only Apathy grouping and manual Stage 2 release). Frontend preview and final backend recalculation must be reconciled before deployment.

### Payload rules

- Build a clean payload once; serialize `payload_json` once. Never recursively embed an existing `payload_json`.
- Keep `form_type`, `event_type`, `workflow_stage`, `visit_number`, `data_source`, IDs and source metadata consistent.
- Reuse the same `submission_id` for retries.
- Do not invent a total number of canonical columns.
- Downloaded local JSON must preserve every applicable current raw field and metadata; incomplete values remain null.

## 14. Priority and deployment gate

### P0 — must pass before deployment

- Historical backfill renders through the final section.
- IOR, PDI conditional ratings, MRI visit toggles and payment method buttons work.
- QUIP and QUIP-RS use the required layouts.
- UPDRS labels are defined and all 33 items map correctly.
- No participant sees in-progress results; Stage 2 sees no results at all.
- Missing data never become scored zero.
- Payload has correct identity/event metadata and no recursive JSON.
- Submit modal is opaque, non-overlapping and state-safe.

### P1

- MRI latest-MoCA lookup/two-month decision, subject to backend query support.
- Complete machine/manual LEDD comparison and trace.
- Full final screening summary and grouping rationale.

### Deferred

- Full research-progress management and correction-event UI may be completed after the core collection, backfill, MRI and clinical workflows are stable.
