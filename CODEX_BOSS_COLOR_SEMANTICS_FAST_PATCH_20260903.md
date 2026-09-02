# Codex Task — Boss Color Semantics Fast Patch

Date: 2026-09-03

Scope: **Boss diagnosis/presentation only.** Do not touch scientific values, Admin admission, Result scoring, historical migration, MRIadmin, report, frontend, or Step-3 runtime.

Read first:
- `CURRENT_STATUS.md`
- `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`
- `BOSS_SCAN_MODE_IMPLEMENTATION_PACKET.md`

## Fresh Production evidence — do not rediscover

Read-only Production inspection confirmed a concrete false-red bug in the QUIP / QUIP-RS derived classification columns.

For multiple current participants:

```text
QUIP_Status = negative
QUIP_Positive = 0
QUIP_Positive_Domains = blank
```

and/or:

```text
QUIPRS_Status = negative
QUIPRS_Positive = 0
QUIPRS_Positive_Domains = blank
```

The blank `*_Positive_Domains` cell is currently styled red and may carry notes such as `PARTICIPANT_EXISTS_RESULT_GATE` or `RESULT_EXISTS_BOSS_PUBLICATION_BREAK`.

That diagnosis is wrong. When the scale is validly negative, an empty positive-domain list is the expected scientific result. It is not a Result gate, publication break, source gap, or staff task.

## Product invariant

**A blank is not a problem merely because it is blank. Applicability / expected-blank semantics must be resolved before pipeline-break diagnosis.**

For QUIP and QUIP-RS:

- `Status=negative` or `Positive=0` means `Positive_Domains` is expected to be empty.
- expected empty `Positive_Domains` must be neutral/grey (or unstyled if that is the current neutral convention), with no red pipeline-break diagnosis and no staff action.
- if `Status=positive` / `Positive=1`, a missing required `Positive_Domains` may still be diagnosed according to actual evidence/first-break semantics.
- do not alter QUIP/QUIP-RS scoring or current values to satisfy styling.

## Boss color vocabulary — make it human-readable

Keep only these meanings:

- **grey** = 正常空白 / 不适用 / 无需处理
- **yellow** = 真的缺正式资料，需要补资料
- **orange** = 已有资料，但需要人工审核/权限决定
- **purple** = 身份未解决
- **red** = 上游已有应发布的资料，但 pipeline 在下游丢失；这是系统问题，不代表 staff 要重填
- **no style** = 无法安全判断 / 有效非空值

Do not use color for a valid nonblank value solely to make the sheet decorative.

## Cell-note readability

For styled Boss blanks, retain the technical diagnosis code if useful, but the first line of the note must be plain-language Chinese and immediately tell staff whether they need to act.

Examples:

```text
正常空白｜无需处理
原因：QUIP结果为阴性，因此阳性领域本来就应为空。
```

```text
缺资料｜需要补资料
原因：该字段所需正式来源确实不存在。
```

```text
系统断点｜不要重填
原因：上游已有资料，但Boss未成功发布。
```

Do not put full Raw/Event payloads in notes.

## Implementation boundary

Fresh-pull the current private diagnosis/output source first. Locate the current Boss blank resolver / styling path (for example the function currently called through `apathyDiagnosisApplyBossScan_` or its live equivalent).

Patch the **applicability / expected-blank decision before generic source/result/publication-break diagnosis**.

Prefer one reusable semantic rule for the two derived fields rather than participant-specific exceptions.

Expected field families:
- `QUIP_Positive_Domains`
- `QUIPRS_Positive_Domains`

Use sibling status/positive fields from the same current Boss/Result semantic record.

Do not globally suppress red. Red remains valid only where an actual upstream value/evidence should have reached Boss and did not.

## Required hostile fixtures

At minimum verify:

1. QUIP negative + Positive=0 + Positive_Domains blank -> not red; expected/no action.
2. QUIP-RS negative + Positive=0 + Positive_Domains blank -> not red; expected/no action.
3. QUIP positive + populated Positive_Domains -> unchanged valid nonblank.
4. QUIP-RS positive + populated Positive_Domains -> unchanged valid nonblank.
5. one established genuine pipeline-break blank remains red.
6. one established non-applicable blank remains grey/neutral.
7. one genuine source gap remains yellow if current source supports it.
8. Boss remains exactly 90 columns; no scientific values changed.
9. Admin Slice A acceptance remains intact.

## Deployment

This patch must not overlap another Apps Script Production deployment. If Step-3 helper or report work currently owns the write lane, inspect/prepare locally and STOP before deployment.

After the write lane is free:
- fresh-live comparison;
- smallest safe overlay;
- run `buildApathyOutput()` once only if the current styling path requires an Output rebuild;
- no Full;
- no participant Incremental.

## Final response only

```text
ROOT CAUSE: <exact live function/rule>
FILES CHANGED: <files>
QUIP NEGATIVE EXPECTED-BLANK FIXED: yes/no
QUIPRS NEGATIVE EXPECTED-BLANK FIXED: yes/no
GENUINE RED PIPELINE BREAK PRESERVED: yes/no
PLAIN-LANGUAGE NOTES: yes/no
BOSS 90 COLUMNS: yes/no
SCIENTIFIC VALUES CHANGED: yes/no
ADMIN SLICE A INTACT: yes/no
DEPLOYED: yes/no
OUTPUT REBUILD EXECUTIONS: 0 or 1
BLOCKER: <none or exact>
STOP
```