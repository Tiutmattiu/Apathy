# APATHY Overnight Autonomous Closeout — 2026-09-03

Status: USER-AUTHORIZED AUTONOMOUS NIGHT SHIFT

The user is going to sleep and has delegated the current APATHY engineering backlog to Codex for autonomous execution until quota/session capacity is nearly exhausted.

The goal tonight is **implementation, deployment, runtime verification, and durable handoff** — not repeated auditing, not micro-patch/STOP behavior, and not spending the night only testing.

Repository: `Tiutmattiu/Apathy`
Canonical ref: `chatgpt/status-report-ubsn-20260901`

Read first:
- `CURRENT_STATUS.md`
- `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`
- this file

Then use fresh current Production/runtime/source as truth.

---

# 0. AUTONOMOUS EXECUTION RULES

## 0.1 Default permission: GO

Do not insert unnecessary safety gates, authority pauses, or permission requests.

For this night shift, Codex may autonomously:
- edit private Apps Script/backend/frontend code;
- deploy safe live overlays;
- open the Production spreadsheet/project;
- click known menus/buttons/functions;
- run Step 3 retries, output rebuilds, targeted incrementals, report previews, and bounded smoke tests when they are the natural verification path;
- inspect Production sheets and current source;
- continue from one known subproblem to the next within the same feature/problem family;
- fix follow-on defects discovered during verification when the remedy is clear and in the same family;
- update existing canonical MD after each materially completed family;
- create/update one night-shift progress MD so work survives quota/session loss.

Do not wait for the sleeping user to click a known button if Codex can click it.

## 0.2 Hard red lines

Only these are non-negotiable:

1. **DO NOT DELETE RAW.**
   - Do not delete Raw sheets.
   - Do not delete Raw rows/cells as cleanup.
   - Do not mass-overwrite Raw.
   - Do not rewrite Raw merely to make downstream code easier.

2. Do not fabricate scientific/participant values that are not evidenced.

3. Do not commit participant-identifiable/private Production data, workbook IDs, credentials, tokens, names/phones/clinical values, or screenshots containing private rows into GitHub/public MD.

Everything else should default to forward progress rather than asking permission.

## 0.3 Work style: problem-family closeout

Do not operate as:

`fix tiny thing -> STOP -> ask -> resume -> fix tiny thing -> STOP`

Operate as:

`inspect family once -> fix all already-known related defects -> deploy -> run real verification -> fix same-family follow-on -> close family`

Stop a family only when:
- it passes acceptance; OR
- the failure changes into a genuinely different category; OR
- there is no defensible/evidenced implementation choice.

If a different independent family is blocked, move to another family instead of idling.

## 0.4 Do real implementation, not test-only work

Do not spend most of quota on:
- broad audits already completed;
- Playwright/Jest/CI/test-suite creation;
- repeated static inventories without implementation;
- repeatedly proving established historical findings;
- performance benchmarking frameworks.

Use the smallest test that proves the change, then continue implementation.

## 0.5 Production write lane

Codex is the sole overnight Production write owner.

No need to wait for another agent tonight.

Before pushing an Apps Script family patch, refresh current live source and preserve unrelated newer code. Avoid broad stale pushes.

Batch related changes into coherent deploys where reasonable.

## 0.6 Mandatory durable progress checkpoints

Create/maintain:

`CODEX_OVERNIGHT_PROGRESS_20260903.md`

Update it after **every completed or parked problem family**, not only at the end.

Each checkpoint must record, sanitized:
- timestamp;
- family worked;
- files changed;
- deployed yes/no;
- runtime actions performed;
- exact verified outcome;
- remaining blocker if any;
- next family.

Also update existing:
- `CURRENT_STATUS.md`
- `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`

after each materially verified family.

Do not create many redundant handoff files.

## 0.7 Quota/session exhaustion rule

Do **not** use the last meaningful quota on another risky implementation.

When remaining quota/context/session capacity looks too low to safely complete another family:

1. STOP NEW IMPLEMENTATION.
2. Finish current atomic save/deploy state cleanly.
3. Update `CODEX_OVERNIGHT_PROGRESS_20260903.md` with:
   - Production-verified work;
   - deployed-but-unverified work;
   - local-only prepared work;
   - current runner state;
   - exact next executable action;
   - any worktree/live-source caveat.
4. Sync `CURRENT_STATUS.md` / core handoff if status changed.
5. Then STOP before quota death.

---

# 1. PRIORITY ORDER FOR TONIGHT

Work in this order unless one family is technically blocked and another can proceed independently:

1. Step 3 runtime / snapshot / fingerprint family — close Full-run blocker.
2. Boss diagnosis/color/note semantics family.
3. Participant Report feature family — finish PNG workflow and presentation semantics.
4. Admin Slice B daily-staff UX family.
5. MRIadmin -> operational state -> UBSN / BOOKED family.
6. Current-data rescue family (only proven current breaks, not historical broad audit).
7. Frontend payload hygiene family.
8. JSON exact-field recovery + contextual deep-link family.
9. Incremental / technical materialization / script slimming if quota remains.

Do not reopen the completed broad historical migration audit.

---

# 2. STEP 3 RUNTIME FAMILY — CLOSE IT END TO END

Current failed Full run has:
- Step 1 Event PASS;
- Step 2 Participant PASS;
- Step 3 FAIL;
- Step 4 not run;
- checkpoint uncommitted;
- outer error still `OUTPUT_SNAPSHOT_CAPTURE_FAILED: Service Spreadsheets timed out...`.

A snapshot no-shrink allocator patch is already deployed and a real retry produced the SAME outer failure. Therefore no-shrink alone is insufficient.

## 2.1 Snapshot V2

Stay inside snapshot capture while the outer error remains `OUTPUT_SNAPSHOT_CAPTURE_FAILED`.

Fresh-inspect:
- `apathyCaptureProductionOutputSnapshot_`
- `apathyCaptureSheetForRollback_`
- snapshot backup creation/replacement
- range copy
- per-column width/hidden loops
- frozen rows/columns
- hidden gridlines
- snapshot fingerprints
- restore/discard functions

The reviewed implementation historically still performs many Spreadsheet-service calls after no-shrink:
- copy source range to backup;
- loop columns reading width + hidden state;
- set backup width per column;
- reconstruct metadata;
- fingerprint sources again.

Boss has 90 columns, so this remains an expensive service-call path.

Preferred implementation if current Apps Script behavior verifies it:

`source Sheet -> Sheet.copyTo(spreadsheet) -> rename rollback copy -> hide`

Use native sheet-level cloning if it preserves needed rollback state such as values/formulas, formatting, notes, validation, widths, hidden columns, frozen rows/columns, and visual/grid properties.

If native clone preserves them, remove redundant per-column reconstruction.

Improve contextual errors in the same family so future failures say the exact subphase/sheet, e.g. clone/fingerprint/restore, instead of only generic snapshot failure.

Do not add persistent debug tables.

## 2.2 Restore contract

Do not optimize capture while breaking restore.

Verify:
- known-good Boss/Admin/checkpoint can be captured before risky publication;
- restore can return them if later stage fails;
- checkpoint state remains truthful;
- restoration verification remains meaningful.

## 2.3 Autonomous retry

After deploying Snapshot V2, Codex is authorized to invoke the existing Step-3/RESULT_CORE retry itself.

Do not rerun Step 1/2 merely for convenience.

If Step 3 passes, continue the existing runner workflow through Step 4/final Full verification where supported.

If snapshot succeeds but the next failure moves to the already-known huge participant candidate fingerprint I/O, continue in this SAME runtime family:
- identify exact expensive full-range hash/read;
- reduce redundant/full-range Spreadsheet I/O while preserving deterministic change/freshness semantics;
- do not create a persistent cache/table unless absolutely necessary.

If another same-family Spreadsheet I/O hotspot appears, fix it and retry without stopping for permission.

Close this family only when Full Step 3 is PASS or a genuinely different blocker is proven.

Checkpoint MD immediately after closeout/parking.

---

# 3. BOSS DIAGNOSIS / COLORS / NOTES FAMILY

Boss scientific values must remain untouched by presentation repair.

Current Production proves the diagnosis layer has false positives and confusing semantics.

## 3.1 Proven QUIP / QUIP-RS expected-blank bug

When QUIP is negative:
- `QUIP_Status = negative`
- `QUIP_Positive = 0`
- `QUIP_Positive_Domains = blank`

that blank is expected and must NOT be red/yellow/actionable.

Same rule for QUIP-RS:
- status negative;
- positive flag 0;
- Positive_Domains blank;
- expected blank.

Current Boss incorrectly marks some such blanks red with notes like RESULT gate/publication break.

Fix applicability-before-missingness generally, not participant-specific hardcoding.

## 3.2 Decision order for blank diagnostics

For each blank field:
1. Is this field applicable / expected to have a value in the current state?
2. If expected, does formal source evidence exist?
3. Does Participant resolved state contain required evidence?
4. Does Result/review/Decision contain or gate the value?
5. Is Boss publication the first break?

Blank alone is never evidence of a problem.

## 3.3 Stable color semantics

Implement/reconcile current rules as:
- grey/neutral = expected blank / non-applicable / no action;
- yellow = genuine formal source gap requiring staff data action;
- orange = evidence exists but review/authority gate blocks publication;
- purple = identity unresolved;
- red = upstream evidence/value exists but downstream pipeline/publication loses it;
- white/no special style = valid value or safely unclassified.

Do not use red for expected blank or source absence.

## 3.4 Make notes human-readable in the same patch

First line should tell staff what it means, for example:
- `正常空白｜无需处理`
- `缺资料｜需要补资料`
- `待人工审核`
- `身份待确认`
- `系统断点｜不要重填`

Technical diagnosis code/first-break may appear below.

## 3.5 Acceptance

Use a small set of real current fixtures:
- QUIP negative expected blank;
- QUIP-RS negative expected blank;
- HC participant PD-only non-applicable blank;
- genuine source gap yellow;
- real review/authority orange if available;
- real upstream->downstream publication break red if available;
- valid nonblank unchanged.

Do not rerun the historical 108-participant audit.

Run one Output rebuild if needed to regenerate Boss styles/notes.

Checkpoint docs after this family.

---

# 4. PARTICIPANT REPORT FEATURE FAMILY — FINISH THE ACTUAL PRODUCT

Read current report task/spec:
- `PARTICIPANT_REPORT_SPEC.md`
- `CODEX_PARTICIPANT_REPORT_PNG_BATCH_20260903.md`

Do not fall back to the old print/PDF-first acceptance.

## 4.1 Required workflow

Primary staff control:

`P [number] 到 P [number]`

Numbers only in boxes. Normalize internally to current PID format. Inclusive range. Same start/end = one participant.

One click downloads one separate PNG per existing participant.

Do not require print dialog for normal delivery.

## 4.2 Participant privacy/presentation

Participant-facing report/image must never show PID/SID/internal participant number.

Header should show ordinary identity metadata:
- name;
- phone when uniquely resolvable.

Boss has name but no phone. Use exact PID-linked operational contact lookup only; no fuzzy name matching.

Filename preference:
`<phone>_<name>_报告.png`
with safe fallbacks that never use PID/SID.

If neither trusted name nor phone can be resolved, skip/download warning rather than exposing PID.

## 4.3 Bars

Nine metric rows must render visible horizontal bars for available metrics.

Use existing accepted normalized relative position; do not recompute scientific scoring in HTML.

Longer = better.

Missing/TBD = `待确认` with no fabricated fill.

## 4.4 Fix currently known report presentation defects in this SAME pass

Known current defects beyond basic PNG:

1. Report-wide `评估日期` currently appears to be sourced from MRI date in at least one real report. That is semantically wrong for a multi-assessment summary.
   - If there is no already-established canonical report/assessment date, OMIT the date.
   - Do not label MRI_Date as overall assessment date.

2. Existing categorical text mapping can label very low relative positions as `一般` merely because everything below a broad threshold shares one label.
   - Inspect current intended label contract/history.
   - If no defensible accepted thresholds exist, REMOVE `优秀/良好/一般` categorical labels from participant output rather than inventing new thresholds.
   - Keep bars and a plain footer explaining that longer means relatively better performance among the accepted reference group.

3. Verify the actual reference group used by the relative-position calculation.
   - Do not silently change scientific reference populations.
   - If current implementation unintentionally mixes groups contrary to accepted report spec, fix it only if the correct group rule is already documented/currently implemented elsewhere.
   - If no accepted reference-group contract exists, do not invent one; surface it as the only scientific blocker while still completing UI/download work.

4. Risk adjustment remains `待确认` unless accepted mapping exists.

## 4.5 PNG implementation

Use bounded client-side rasterization of the rendered participant report page. Pinned html2canvas or equivalent is acceptable if data never leaves the browser to an external service.

Output separate crisp PNGs, one participant per file.

Browser multiple-download permission is an operational prompt, not backend failure.

## 4.6 Report acceptance

Verify at least one HC and one PD current fixture when possible:
- numeric range works;
- separate PNGs download;
- no PID/SID in report or filename;
- name/phone correct when uniquely available;
- actual bars visible with differing lengths;
- missing metric `待确认` has no fake fill;
- no MRI date masquerading as overall report date;
- no misleading low-score `一般` label if categorical thresholds are not defensible;
- Chinese text crisp/readable.

Do not change the nine scientific metric definitions/scoring to make the UI pass.

Checkpoint docs after this family.

---

# 5. ADMIN SLICE B — DAILY STAFF UX FAMILY

Slice A is already closed and must stay closed:
- active Admin reduced to genuine staff work;
- system-maintenance noise removed;
- fake universal Execute checkbox removed.

Read:
`CODEX_ADMIN_SLICE_B_FAST_PATCH_20260903.md`

Now make the remaining genuine rows fast to use.

## 5.1 Visible row design

The primary Admin row should answer at a glance:
- who;
- what domain/assessment is incomplete;
- roughly how much is missing;
- exact next action.

Do not show a giant field-name wall in visible `为什么`.

Convert exact-item detail into compact summaries, e.g. conceptually:
- `Stage 2：AMI、PDI、IOR 等，共 N 项缺失`
- `Clinical：UPDRS III 共 N 项缺失`

Keep exact missing field/item detail in hidden technical evidence / Trace / an `Exact_Detail` field if current output architecture supports it safely.

## 5.2 Action text

Use direct operational Chinese, not developer language.

Examples conceptually:
- `补 Stage 2 缺失部分，不要重填已有资料`
- `补 Clinical 的 UPDRS III 缺失项目`

Do not tell ordinary staff about bridge/provenance/backend concepts in the visible row.

## 5.3 Contextual navigation/deep link

If current frontend already supports stable participant/route/section parameters, wire Admin to jump directly to the relevant operation context in this same family.

If current frontend does NOT yet have a defensible deep-link contract, do not invent a fragile hack here; leave exact deep links for the later JSON/deep-link family while still completing compact wording.

Do not reintroduce generic Execute checkboxes for STAFF_DATA_ACTION.

Checkpoint docs after this family.

---

# 6. MRIADMIN -> UBSN / BOOKED OPERATIONS FAMILY

Current facts already established:
- Screening MRIadmin is present in Raw/Event/Participant for current participants;
- ingestion is not the missing component;
- MRI Time is transitional legacy booking history;
- current read-only inventory found 18 existing MRI Time booking rows: 14 have exact unique current Participant-state SID matches; 4 are ambiguous/noncanonical and should not be auto-guessed;
- UBSN local consumer/parser/persistent browser helper already exists;
- missing Production component is operational scheduling state + waiting producer + durable BOOKED writeback/reconciliation.

## 6.1 Legacy booking adoption

Implement idempotent adoption of exact, uniquely linked legacy MRI Time bookings into durable APATHY booking evidence.

Do not modify/delete existing MRI Time history rows.

Do not auto-adopt ambiguous/noncanonical identities merely from Contactlist guesses.

Route ambiguous cases to a compact reconciliation task/surface.

## 6.2 Scheduling state

Derive operational state from current Participant MRIadmin + booking evidence, conceptually:
- `WAITING`
- `PREFERENCE_MISSING`
- `BOOKED`
- `NOT_ACTIONABLE`
- reconciliation flag when real-world remarks conflict/need confirmation.

Blank preference = unknown, not unrestricted.

Preserve structured month + weekday + daypart combinations.

## 6.3 Admin / UBSN producer

Create/finish the Production waiting/status producer consumed by the existing UBSN helper.

UBSN should receive only actionable waiting participants/preferences needed for slot matching.

Final external booking/CAPTCHA remains an operational human/browser action, but Codex may exercise non-destructive portions of the workflow tonight if possible.

## 6.4 Booking writeback

When booking is confirmed through the supported flow, persist durable APATHY `BOOKED` evidence/state so waiting/Admin tasks close automatically.

If MRI Time still needs one transitional link/append for compatibility, keep it narrow and do not make MRI Time the new authority.

Do not delete legacy rows.

Checkpoint docs after this family.

---

# 7. CURRENT-DATA RESCUE FAMILY — ONLY REAL CURRENT BREAKS

Do NOT reopen the completed broad historical migration audit.

A system diagnosis such as `BACKEND_REPAIR` is not proof that data are currently stuck; current Production already showed false-positive/stale backend repair diagnoses while Boss values were populated.

Only rescue when current evidence proves a real first break.

## 7.1 Known demographic/default signal

A current report/Boss inspection revealed a historical HC participant with current `Edu_Year = 0` where historical accepted evidence previously had a nonzero education-year value. Similar older records may share this default/promotion pattern.

Treat this as a current field-family issue, not permission to rerun all historical forensic work.

Inspect current evidence chain for education-year/default pollution:
- Raw/Event evidence;
- Participant ownership/current projection;
- Boss publication.

If there is a generic owner/default overwrite bug affecting a field family, fix the generic rule and republish affected current participants.

Do not copy old Boss values blindly into current Boss.

## 7.2 Current publication breaks

For any other current issue discovered through Boss/Trace/Admin:
- verify formal evidence exists;
- find first break;
- fix generic mapping/promotion/publication logic;
- targeted rebuild affected participants.

Do not create new broad historical Backfill unless formal evidence is genuinely missing.

Checkpoint docs after this family.

---

# 8. FRONTEND PAYLOAD HYGIENE FAMILY

Known root cause is already established; do not re-audit history.

Current frontend broadly serializes shared `ST.answers` after global derived calculation, allowing unrelated/default fields to leak into route submissions.

Fix current frontend so outgoing submission payload is:
- shared identity/metadata legitimately allowed across routes;
- route-owned user-entered fields;
- route-owned/applicable derived fields;
- no unrelated defaults/completion flags from other routes.

Prefer a clear route-owned field resolver/whitelist at payload boundary, and route-scope derived calculation if needed.

Do not remove Participant ownership defense; frontend hygiene is first line, Participant ownership remains second line.

Do not change scientific scoring unnecessarily.

Verify representative Screening/Stage2/MRI/Clinical payloads do not carry unrelated defaults.

Checkpoint docs after this family.

---

# 9. JSON EXACT-FIELD RECOVERY + CONTEXTUAL DEEP LINKS FAMILY

Goal: when Admin proves a genuine source gap, staff should not have to reconstruct an entire assessment manually.

Implement one shared repair/write contract used by both interactive form/deep-link and JSON import, rather than separate authority semantics.

## 9.1 JSON import

Target flow:
- staff selects/uploads structured JSON;
- identify participant through the existing trusted operational key/path;
- validate schema;
- compare against currently missing/existing evidence;
- show exact preview diff;
- never overwrite valid existing evidence silently;
- write only authorized/explicit fields through the existing formal correction/Backfill/evidence mechanism;
- targeted Incremental/output rebuild;
- Admin task closes if resolved.

Do not directly rewrite/delete Raw as the implementation shortcut.

## 9.2 Deep links

Where the system already knows participant + assessment + exact missing fields, support contextual navigation to the correct frontend operation/section instead of forcing staff to search manually.

Conceptually:
`Admin task -> participant context -> Stage2/Clinical route -> missing section/fields`

Existing values should be preserved; repair mode should focus on missing fields.

Keep implementation simple; this is a small research operations tool, not a commercial platform.

Checkpoint docs after this family.

---

# 10. PERFORMANCE / SCRIPT / MATERIALIZATION CONTRACTION — ONLY IF QUOTA REMAINS

Do this only after daily-operation correctness above is stable.

## 10.1 Incremental performance

Identify repeated full-sheet reads/materialization triggered by participant-scoped runs.

Prefer bounded reads/batching/reuse of already-computed data.

Do not change scientific semantics for speed.

## 10.2 Technical-sheet contraction

Classify large technical surfaces before removing anything:
- authority/source of truth;
- required materialized view;
- rebuildable cache;
- debug projection;
- legacy repair scaffold.

Potentially large surfaces include provenance/bridge/candidate/audit sheets. Do not delete merely because large.

Only retire or make on-demand what is clearly rebuildable/non-authoritative and no longer needed operationally.

## 10.3 Code/script slimming

After ownership boundaries are stable, remove dead/duplicated wrappers, stale migration-only code, and redundant materialization helpers where current references prove they are unused.

Do not perform giant aesthetic refactors tonight.

Checkpoint docs after any completed contraction family.

---

# 11. DEFINITION OF A PRODUCTIVE NIGHT

Success is NOT “all tests written” or “all issues analyzed.”

Success is maximizing this list of **verified completed families**:
- Full Step 3/4 runs again;
- Boss colors/notes mean what staff think they mean;
- participant report directly downloads correct participant-facing PNGs;
- Admin 11-row queue becomes quick to read/use;
- MRIadmin operational queue/UBSN loop becomes real;
- proven current data breaks are repaired generically;
- frontend stops emitting unrelated payload evidence;
- staff gets exact-field JSON/deep-link recovery;
- then performance/contraction if time remains.

Implementation beats planning.
Verification beats speculative redesign.
Durable checkpointing beats dying with unsaved context.

---

# 12. FINAL NIGHT-SHIFT HANDOFF FORMAT

Before quota/session exhaustion, `CODEX_OVERNIGHT_PROGRESS_20260903.md` must end with:

```text
OVERNIGHT FINAL STATUS

PRODUCTION-VERIFIED COMPLETE:
- <family + result>

DEPLOYED BUT STILL NEEDS VERIFICATION:
- <family + exact verification>

LOCAL/PREPARED ONLY:
- <family + files/worktree>

CURRENT FULL RUN STATE:
- run id/status/stage/checkpoint (sanitized; do not publish private workbook IDs)

RAW PRESERVED:
- yes/no

CANONICAL DOCS SYNCED:
- yes/no + files

NEXT EXACT ACTION:
- <one executable action>

KNOWN BLOCKERS:
- <only actual blockers>

DO NOT REOPEN:
- <completed families/historical audits>
```

Then STOP before quota death.
