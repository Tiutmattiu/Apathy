# APATHY Overnight Boss Semantics Addendum — 2026-09-03

Read this BEFORE executing the Boss family in `CODEX_OVERNIGHT_AUTONOMOUS_CLOSEOUT_20260903.md`.

This supersedes any older assumption that Boss must remain exactly 90 columns merely because that was the previous contract. The user has explicitly retired one unused field.

## 1. Retire `Sequence_Recorded`

Fresh Production read confirms the current Boss `Sequence_Recorded` column is blank for the entire populated participant range. No current participant is actually using this field.

Therefore:

- remove `Sequence_Recorded` from the generated Boss output contract;
- update any current Boss header/mapping array accordingly;
- do not preserve a permanently empty column merely to keep the historical 90-column width;
- expected Boss width after removal is 89 columns, unless fresh current source proves another intentionally added field changes that count;
- search current code/report/trace consumers for literal `Sequence_Recorded` references and remove/adapt only the references required by this retirement;
- do NOT alter Raw evidence merely because Boss no longer exposes this field;
- do NOT delete historical Raw/Event fields if they exist; this is an output-contract retirement only.

If some technical source still contains sequence information, it may remain in source/Trace; it simply should not occupy a Boss column when nobody maintains/uses it.

## 2. Proven HC LEDD placeholder pollution — value bug, not just color bug

Fresh Production evidence proves a current HC participant has:

```text
formal Event/Backfill LEDD fields: absent/null (value_present=0)
Participant:
  PD_HC = HC
  medication_applicability = not_applicable
  ledd_status = not_applicable
  but technical placeholders such as ledd_system_* = 0 exist
Result A:
  ledd_hospital_* remain blank
  ledd_result_source = pending_recalculation
Boss:
  Total_LEDD = 0
  DA_LEDD = 0
  Levodopa_LEDD = 0
```

Those Boss zeros are NOT observed scientific zero values. They are downstream placeholder/default pollution.

Required invariant:

```text
APPLICABILITY FIRST
if domain/field is not applicable:
    internal placeholder/default values must never publish as Boss scientific values
    Boss should show expected blank/non-applicable output
else:
    legitimate observed zero remains a valid value
```

Inspect the coherent HC/PD applicability family, not only LEDD:

- PD_Duration
- HY
- Total_LEDD / DA_LEDD / Levodopa_LEDD
- UPDRS3 and other fields already marked PD-only/not-applicable by current Participant/Result contracts

Do NOT blindly convert every zero to blank. Many applicable scales legitimately score 0.

Use current participant applicability/status fields and result semantics, not participant-specific hardcoding.

Do not edit/delete Raw to fix this.

## 3. QUIP / QUIP-RS expected blanks

When:

```text
QUIP_Status = negative
QUIP_Positive = 0
QUIP_Positive_Domains = blank
```

that blank is expected and must not be red/yellow/actionable.

Same for QUIP-RS.

Applicability/conditional expectation must be evaluated before missingness.

## 4. Boss color system must be rebuilt from a clean slate

The user reports the current colors appear arbitrary. Do not merely layer more rules on top of old formatting.

During the Boss rebuild/format pass:

1. clear old/stale APATHY QA background colors and APATHY QA notes from the generated Boss data area first;
2. preserve unrelated intentional sheet formatting such as headers/layout where appropriate;
3. then re-apply ONLY current semantic QA styling.

This avoids stale colors/notes surviving after the underlying diagnosis changes.

## 5. Minimal, strict color semantics

Default state = ordinary white/no QA color.

A cell should be colored only when the color communicates a real current semantic state.

### White / no QA style
- valid nonblank scientific value;
- legitimate observed zero in an applicable field;
- ordinary valid text/status;
- safely unclassified valid output.

### Grey
- expected blank / explicitly non-applicable field;
- no staff action.

Use grey only for actual expected blank/non-applicability, not as broad decorative banding.

### Yellow
- value is expected/applicable;
- formal source evidence is genuinely missing/incomplete;
- staff must supply data.

### Orange
- evidence exists but a real review/authority decision is required before publication.

### Purple
- unresolved identity.

### Red
- upstream formal/resolved/derived evidence exists and the first break is downstream publication/system loss;
- staff should NOT re-enter source data.

Do not use red for:
- expected blank;
- not-applicable field;
- genuine source absence;
- negative QUIP/QUIP-RS positive-domain blank.

## 6. Nonblank values can also be invalid — QA must not be blank-only

Current QA logic is too blank-centric.

A nonblank value can still be semantically invalid if it violates applicability, e.g. HC LEDD placeholder zero.

Therefore the QA/application order should be:

```text
1. participant/domain applicability
2. whether current Boss value is semantically valid for that applicability
3. formal source evidence
4. Participant resolved evidence
5. Result/review/Decision state
6. Boss publication break
```

Do not equate:
- blank = bad;
- nonblank = good;
- zero = missing;
- zero = always valid.

## 7. Valid PTS fixture — do NOT alter

A current HC participant has Boss values:

- PTS_Part_A = 13
- PTS_Part_B = 8
- PTS_Total = 21

Fresh CellData confirms these cells are ordinary white valid cells with no QA note. The screenshot's surrounding shading/selection should not be interpreted as a PTS data defect.

Preserve valid PTS values.

## 8. Human-readable notes

Where a QA color is actually applied, first line should be plain operational Chinese:

- grey: `正常空白｜无需处理`
- yellow: `缺资料｜需要补资料`
- orange: `待人工审核`
- purple: `身份待确认`
- red: `系统断点｜不要重填`

Technical diagnosis/first-break may appear below.

Do not add notes to every valid ordinary cell.

## 9. Acceptance for this whole Boss family

In one coherent implementation/rebuild pass, verify:

1. `Sequence_Recorded` no longer appears in Boss output.
2. Boss width reflects the retired field (normally 89 columns after this change).
3. HC PD-only/medication fields do not publish placeholder zeros when explicitly not applicable.
4. Applicable legitimate zeros remain intact.
5. QUIP negative + Positive=0 -> blank Positive_Domains is expected/no error.
6. QUIP-RS same.
7. valid nonblank values such as PTS 13/8/21 remain white/unchanged.
8. stale QA colors/notes from old diagnoses are cleared before semantic reapplication.
9. only current meaningful states receive QA colors.
10. Raw is untouched.

Treat this as one Boss value+diagnosis+presentation family. Do not stop after fixing only one field or one color.