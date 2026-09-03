# APATHY CODEX SURGICAL WORKPACK — 2026-09-03

Status: CURRENT EXECUTION PACKET

Use together with:
- `CURRENT_STATUS.md`
- `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`
- `CODEX_OVERNIGHT_PROGRESS_20260903.md`

Current Production/runtime/source wins if any stale document disagrees.

## Operating model

The current working mode is:

```text
ChatGPT = sheepdog / dispatcher / read-only diagnosis / acceptance / scope control
Codex   = surgeon / private source edit / deploy / runtime verification
Human   = mechanical UI actions only when a click/run cannot be invoked cleanly by Codex
Copilot = out of scope for now
```

### Pace rule

Do NOT micro-patch one symptom and stop when multiple defects are already known to belong to the same problem family.

Use:

```text
known problem family
-> inspect current live source
-> repair all already-evidenced related defects in one bounded implementation pass
-> deploy once if practical
-> verify the family as a whole
-> close out
```

Dependent defects should be repaired upstream-to-downstream in the same workstream when the downstream change is already known and safe.

Independent problem families may be prepared in parallel, but overlapping Production Apps Script writes must be serialized.

### Stop rule

Stop only when:
- the requested problem family is actually closed; or
- a genuinely new problem category appears; or
- evidence is insufficient for a unique safe implementation; or
- a real human research decision is required.

Do not stop because one sub-fix was completed.

### Hard preservation rule

- NEVER delete Raw, Raw rows, or Raw cells.
- Do not mass-overwrite Raw.
- Do not fabricate research values.
- Do not commit participant-identifying/private Production data to GitHub.

Downstream derived/candidate/output/technical layers may be repaired/rebuilt as needed.

### Current runtime truth

The previous Step-3 snapshot blocker is CLOSED.

The latest failed Full was retried overnight and subsequently:
- Step 3 PASS
- Step 4 PASS
- Full SUCCEEDED
- checkpoint committed

Do not reopen Step 3 unless a new regression is observed.

---

# FAMILY 1 — BOSS SCIENTIFIC VALUE SEMANTICS + QA PRESENTATION + DEAD COLUMN CLEANUP

## Goal

Make Boss scientifically trustworthy and visually sparse/readable in one family closeout.

This is NOT a color-only task.

## Current proven defects

### A. HC medication / LEDD placeholder pollution

Current Production evidence proves a healthy-control participant can have:
- formal Raw/Event medication/LEDD fields absent/null;
- Participant state explicitly marking medication / LEDD as `not_applicable`;
- internal technical zero placeholders present;
- Result A hospital LEDD result fields still blank/pending;
- Boss nevertheless publishing `Total_LEDD / DA_LEDD / Levodopa_LEDD` as numeric zero.

This is a downstream value-publication bug. HC non-applicable medication must not appear as scientific zero.

Inspect the exact current source path from Participant/Medication/Result -> Boss and fix the first place where not-applicable is collapsed into numeric zero.

Do not edit Raw.

Apply the same applicability-aware principle to other PD-only fields where current source uses placeholder values, including as relevant:
- PD duration
- HY
- UPDRS III / PD motor-only outputs
- medication / LEDD outputs

Do not blank a real valid value merely because it is zero. Applicability must decide first.

### B. QUIP / QUIP-RS expected blanks falsely diagnosed

If:
- QUIP status = negative / positive flag = 0,
then `QUIP_Positive_Domains` blank is expected.

Likewise for QUIP-RS.

Expected negative-domain blanks must NOT be red, yellow, or staff-action findings.

For positive status, missing domains may still be a real issue depending on current evidence.

### C. QA color overuse / stale notes

Boss currently has too many colored cells and APATHY QA notes.

Implement sparse semantic QA:
- normal valid value, including valid numeric 0 = white/no warning
- expected blank / non-applicable = neutral/grey only when useful
- genuine formal source gap = yellow
- real authority/review decision = orange
- unresolved identity = purple
- upstream accepted evidence/value exists but downstream publication loses it = red

Do not color merely because a cell is blank.
Do not assume every nonblank is valid; applicability-invalid placeholders must be corrected first.

Clear stale APATHY QA backgrounds/notes before reapplying current semantics so old diagnosis does not survive after the underlying issue is fixed.

Human-readable note first line should be concise, e.g.:
- `正常空白｜无需处理`
- `缺资料｜需要补资料`
- `待人工审核`
- `身份待确认`
- `系统断点｜不要重填`

Technical diagnosis code may remain below that.

### D. Valid nonblank cells must not be visually treated as missing

Inspect current style/diagnosis application logic so ordinary valid values are not overlaid by stale issue styling.

Do not remove normal table banding/selection behavior; only fix APATHY QA styling.

### E. Retire `Sequence_Recorded` from Boss

Current Production inspection shows the populated Boss range has `Sequence_Recorded` empty for all participants, and the user wants the unused Boss output column removed.

Before removal:
- inspect current source and known consumers for `Sequence_Recorded`;
- if no current downstream consumer requires the Boss column, remove it from the Boss output contract;
- preserve any actual MRI sequence evidence elsewhere in Raw/Event/Participant if it exists;
- this is removal of a dead Boss projection column only.

Expected Boss width becomes 89 if this column is safely retired.

### F. Normalize Boss MRI-date display representation

Current Boss contains MRI dates represented in multiple textual/date styles.

Normalize display formatting without rewriting research meaning.
Do not reinterpret dates.
Do not mutate Raw to make formatting consistent.

## Scope / files

Refresh current live Apps Script source first.
Likely relevant files include current Result/Medication/Boss output/diagnosis source; do not assume old filenames are current.

Do not touch participant-report UI, MRI scheduling workflow, frontend submission payloads, or Admin Slice-B wording in this family unless shared code is genuinely required.

## Implementation rule

Fix value semantics first, then regenerate Boss, then clear/reapply QA semantics against the corrected values.

Do not patch colors around scientifically wrong values.

## Verification

Verify the family with real fixtures covering:
- HC with non-applicable medication -> Boss LEDD fields blank/not-applicable, not zero
- PD with genuine medication zero if such a valid case exists -> retain valid zero
- QUIP negative -> blank positive-domains no red/yellow
- QUIP positive -> actual domains preserved
- QUIP-RS equivalent fixtures
- one genuine source-gap yellow fixture
- one genuine review orange fixture if present
- one genuine publication-break red fixture if present
- valid nonblank cells remain white
- stale APATHY QA notes/backgrounds do not remain after issue resolution
- `Sequence_Recorded` removed only if no consumer depends on it
- Boss width/current contract updated accordingly
- MRI date display normalized

Perform one Boss/Output rebuild if needed for acceptance; do not run Full unless genuinely required by current source semantics.

## Closeout

Update `CURRENT_STATUS.md` and `APATHY_CORE_PIPELINE_HANDOFF_20260903.md` with the verified new Boss contract.

---

# FAMILY 2 — PARTICIPANT REPORT COMPLETE PRODUCT CLOSEOUT

## Goal

Finish the participant report as one usable staff-facing generation feature, not a sequence of print-button patches.

Refresh current live `report.html` / report backend before assuming what is already deployed.

## Required staff workflow

UI:

```text
P [number]  到  P [number]
[下载报告图片]
```

Rules:
- numeric boxes accept digits only
- internally normalize e.g. 65 -> P065
- inclusive range
- same start/end = single participant
- absent/nonexistent participants are skipped/reported without aborting the entire batch

## Delivery

Primary action = direct image download.

One click should create ONE SEPARATE PNG per participant.
Do not create a combined PDF as the primary product.

If browser multiple-download permission is required, give a clear one-time instruction; do not silently fall back to PDF.

## Privacy / identity

Participant-facing image must NEVER show:
- PID
- SID
- internal lineage IDs

Header should use:
- participant name
- phone
- no fake report-wide assessment date

Contact metadata lookup:
1. current Contactlist exact PID linkage may supply name/phone;
2. Boss name may be fallback for name;
3. exact unique historical import-directory PID mapping may be used only as display/contact fallback if current source already supports it;
4. no fuzzy identity matching;
5. if phone unavailable, do not substitute PID.

Preferred filename:
`<phone>_<name>_報告.png`
with sanitization and safe non-PID fallbacks.

## Report content

Preserve the accepted nine-metric scientific mapping and existing directionality.
Do not invent new scoring.

Requirements:
- real visible horizontal bars
- longer bar = better relative performance
- missing/TBD metric = `待確認` and no fabricated filled bar
- risk adjustment stays `待確認` until accepted mapping exists

## Reference-group verification

Inspect the existing relative-position implementation and identify the actual reference group used.

Do not silently mix a scientifically unintended population.
Do not create a second scoring engine.

Use current accepted cohort/reference logic if it is defensible from current source/docs; if a real unresolved reference-group research decision exists, stop only on that decision while completing all non-scientific report UX work.

## Remove incorrect report-wide date

Current report previously displayed MRI date as `评估日期`. That is semantically wrong for a multi-domain report.

If there is no canonical report-wide assessment date in current system, omit the date entirely.
Do not use MRI_Date as a generic assessment date.

## Interpretation labels

The old coarse label logic could call an extremely low relative position `一般`.

Inspect whether an accepted categorical threshold contract actually exists.

If no defensible accepted thresholds exist:
- remove `优秀 / 良好 / 一般` categorical labels;
- keep the bar and a concise footer explaining that longer bar indicates better relative performance.

Do not invent arbitrary thresholds merely to preserve labels.

## PNG implementation

Use current rendered report DOM and client-side rasterization if practical.
A fixed, reviewed rasterizer version such as html2canvas is acceptable if already prepared/current environment supports it.

Aim for crisp A4-like portrait output suitable for messaging/printing, but PNG is primary.

Preserve one participant per rendered report page/image.

## Verification

Verify at least:
- one HC fixture
- one PD fixture
- single range
- multi-participant range
- missing participant inside range
- name/phone display
- no PID/SID in image or filename
- bars visibly render
- missing metric shows `待確認`
- MRI date not presented as generic report date
- labels removed or justified by accepted contract
- separate PNG files actually download

Do not run Full/Incremental/Boss rebuild unless the current report backend genuinely requires it.

Update canonical docs after full product acceptance.

---

# FAMILY 3 — ADMIN SLICE B + OPERATIONAL ACTION UX + EXACT-DETAIL PRESERVATION

## Goal

Turn Admin from a technically correct list of genuine staff work into a fast daily operations surface.

Current Slice A already proved active rows are genuine `STAFF_DATA_ACTION` rather than system-maintenance noise. Do not reopen admission logic unless current Production contradicts that.

Current defect: visible `为什么` fields can contain enormous exact-item walls.

## Required visible Admin shape

For each participant/task row, show compact staff-facing information:
- participant identifier/name for staff
- concise problem summary
- compact affected assessment/domain summary
- counts where useful
- clear next action
- clear status

Examples of the desired shape:
- `Stage 2：AMI、PDI、IOR 等共 N 项缺失`
- `Clinical：UPDRS III 共 N 项缺失`
- `Screening：整份正式提交未找到`

Do not print dozens/hundreds of item names into the ordinary visible row.

## Preserve exact detail

Exact missing/invalid item detail must remain available in hidden technical evidence / Trace / an exact-detail field.

Do not discard lineage.
Do not force staff to lose the precise list merely because the visible row is compact.

## Operational controls

Controls must match the actual action class.

- `STAFF_DATA_ACTION`: do not show a fake generic Execute checkbox that implies the system can synthesize missing data.
- identity resolution: keep the explicit identity-resolution path where applicable.
- system-maintenance/trace-only: remain out of active Admin.

## Contextual deep links

Where current frontend/router architecture can support it safely, add direct links/actions from Admin to the relevant operation surface:
- participant
- form type
- section/domain
- missing-field context

Examples:
- Stage 2 missing -> open Stage 2 form at correct participant/section
- Clinical missing -> open Clinical form at relevant section
- Screening whole submission missing -> guide to recovery/import path rather than opening a random form

Do not duplicate scientific validation in the link layer.

If current frontend cannot accept contextual route parameters without a separate feature change, implement the Admin-side contract now and pair the frontend route support with FAMILY 5 rather than inventing a fragile one-off URL.

## Structured JSON recovery entry point

For genuine exact-field source gaps, Admin should expose a clear recovery option that can accept structured JSON evidence rather than forcing complete manual form reconstruction.

The actual JSON validation/write engine belongs to FAMILY 6, but Admin should be designed to surface/use it cleanly when available.

## Verification

Verify against current Admin rows covering:
- whole Screening missing
- Stage 2 item gaps
- Clinical item gaps
- combined issues

Acceptance:
- ordinary visible rows are readable without horizontal-wall text
- exact detail is still retrievable
- action text matches what staff can actually do
- no fake checkbox on non-identity staff-data tasks
- deep links work where implemented
- no system-maintenance rows reappear

Do not run Full unless required; a targeted output rebuild is preferred.

---

# FAMILY 4 — MRIADMIN -> OPERATIONAL STATE -> UBSN -> BOOKED LOOP

## Goal

Complete the MRI scheduling operational workflow using already-existing Screening MRIadmin evidence.

Do NOT reimplement MRIadmin ingestion. Screening Raw/Event/Participant already contain formal MRI preference/assistance data.

## Legacy migration Patch 0

Current verified inventory:
- 18 rows in legacy `MRI Time`
- 14 exact unique matches to current Participant identity -> safe candidates for automatic idempotent BOOKED adoption
- 4 ambiguous/noncanonical -> must go to reconciliation, not guessed

Rules:
- leave all existing MRI Time cells unchanged
- adopt only exact unique current identity matches
- adoption must be idempotent
- ambiguous rows create reconciliation work
- Contactlist may assist staff reconciliation but is not automatic identity authority

## Durable APATHY scheduling states

Implement operational derivation around at least:
- `WAITING`
- `PREFERENCE_MISSING`
- `BOOKED`
- `NOT_ACTIONABLE`

Preserve submitted month + weekday + AM/PM combinations exactly.
Blank preference = unknown, not unrestricted.

## Producer

Build Production current-state producer:

```text
Participant MRIadmin
+ adopted durable booking evidence
-> operational MRI state
-> Admin MRI tasks
-> read-only UBSN waiting snapshot
```

Do not make MRI Time the future authority.

## UBSN integration

Existing local UBSN consumer/browser workflow should consume a stable read-only waiting snapshot.

Provide the minimum stable contract UBSN needs:
- participant operational identity reference needed internally
- allowed scheduling windows
- assistance/contact notes needed for staff workflow
- current state
- booking status

Do not expose unnecessary clinical data.

## Human booking / writeback

Final UBSN booking/CAPTCHA remains human.

After human confirms booking:
- write durable APATHY `BOOKED` evidence/state
- resolve waiting Admin task
- if transition policy requires maintaining legacy MRI Time during migration, link identical existing row or append only according to the already-agreed narrow transition rule; do not routinely maintain two independent authorities

Participant-requested changes/cancellations must be explicit human reconciliation events, not silent preference rewrites.

## Verification

Verify fixtures for:
- exact legacy booking adoption
- ambiguous legacy row -> reconciliation
- MRIadmin preference present -> WAITING
- MRIadmin missing preference -> PREFERENCE_MISSING
- booked -> BOOKED and no waiting task
- not actionable -> NOT_ACTIONABLE
- booking writeback closes Admin/UBSN waiting item
- rerun is idempotent

Do not modify Raw to store operational state.

Update canonical MRI workflow contract after acceptance.

---

# FAMILY 5 — FRONTEND PAYLOAD OWNERSHIP + ROUTE-SAFE SUBMISSION + DEEP-LINK SUPPORT

## Goal

Fix the known frontend evidence-pollution mechanism and make forms safe for contextual navigation.

## Proven existing defect pattern

Current/public frontend historically:
- mutates shared `ST.answers` through global derived calculation;
- serializes broad/shared keys into outgoing payload;
- unrelated routes can therefore emit default/non-owner values.

Participant ownership defense exists downstream, but frontend should not emit polluted evidence in the first place.

## Required architecture

Define route/form ownership for payload emission.

For each submission route:
- emit identity/common metadata
- emit only fields owned/applicable to that form/route
- emit derived fields that legitimately belong to that form
- do not serialize unrelated shared defaults

Do not create multiple divergent scoring engines.
Reuse current derivation logic where appropriate but constrain serialization.

## Schema evolution

Older payloads may not have newer fields. Preserve backward compatibility in backend readers.

Frontend fix should prevent new pollution; do not mass-rewrite historical Raw.

## Contextual navigation

Add/support route parameters needed by Admin deep links, such as:
- participant lookup key
- target form
- target section/domain

The navigation layer must not auto-submit or fabricate answers.
It should only reduce staff clicking and focus the correct operation surface.

## Script slimming within this family

Once route ownership is explicit, remove only clearly dead/redundant frontend serialization/derived glue made obsolete by the new boundary.

Do not perform a broad aesthetic rewrite.
Do not change questionnaire wording/scoring without evidence.

## Verification

For representative Screening / Stage 2 / Clinical / MRI routes:
- generated payload contains owner fields
- unrelated default/completion fields are absent
- legitimate zero remains zero
- missing remains absent/null according to route contract
- old backend can still consume payload
- contextual deep link opens correct participant/form/section
- no auto-submission

No Raw deletion or historical mass correction.

---

# FAMILY 6 — STRUCTURED JSON EXACT-FIELD RECOVERY + SAFE WRITEBACK

## Goal

Provide a fast recovery path for genuine source gaps without forcing staff to recreate entire forms manually.

## Product workflow

From Admin / recovery UI:

```text
select participant/task
-> upload/paste structured JSON
-> parse + validate
-> show exact preview diff
-> staff confirms
-> write formal recovery evidence
-> targeted incremental/result/output refresh
-> issue resolves if evidence is now complete
```

## Core rules

- existing formal evidence wins; do not overwrite stronger evidence silently
- recovery is exact-field, not blanket replacement
- never fabricate item values from summary totals
- never mass-edit Raw
- do not delete Raw

Preferred write target is the existing formal Backfill/evidence mechanism unless current architecture already has a better audited recovery event path.

If a narrow human-authorized Raw correction is truly required, it must remain explicit and auditable; do not make Raw mutation the default JSON workflow.

## JSON schema

Validate at minimum:
- participant identity reference
- form/domain
- field names
- value types/ranges where already defined
- no unknown dangerous fields unless explicitly allowed
- no participant mismatch

Support partial payloads containing only the evidenced missing fields.

## Preview

Before commit, show:
- field
- current effective value/source
- incoming value
- whether it fills blank / conflicts / would be ignored

Conflicting stronger evidence must not be silently replaced.

## Post-write

After commit:
- invoke targeted participant incremental/rebuild using existing engine
- do not run Full merely because one participant was recovered
- refresh Admin so resolved gap disappears

## Integration

Wire this to Admin Slice-B recovery actions and contextual navigation.

## Verification

Test:
- one clean missing-field import
- multi-field partial import
- type/range failure
- participant mismatch
- conflict with stronger existing evidence
- rerun/idempotency
- issue closure after targeted refresh

---

# FAMILY 7 — CURRENT-DATA CONTAMINATION RESCUE (ONLY PROVEN CURRENT PATTERNS)

## Goal

Repair current downstream contamination/default artifacts without reopening the completed broad historical migration audit.

This family starts only from concrete current anomalies.

Known example families:
- HC PD-only fields populated by technical/default zeros
- demographic/current values that appear suspiciously reset to defaults where stronger formal evidence exists
- completion/default pollution surviving into current projections

## Method

For each identified pattern:

```text
formal Event evidence
-> Participant selected state
-> Result/Medication/Decision
-> Boss
```

Find the first actual break and repair that layer.

Do not use old `BACKEND_REPAIR` diagnosis rows as proof of data loss.
Do not re-enter data when current formal evidence already exists.
Do not restart the 108-participant historical audit.

Use a pattern-wide repair if multiple participants share the same proven mechanism; do not hardcode individual PIDs.

## Verification

Use multiple current fixtures for each pattern and verify that legitimate zeros/blank/applicability are preserved.

---

# FAMILY 8 — PERFORMANCE / MATERIALIZATION / SCRIPT CONTRACTION (AFTER FUNCTIONAL FAMILIES)

## Goal

Reduce recurring Apps Script / Sheets I/O and technical-surface burden after functional correctness is stable.

Do not start by deleting technical evidence indiscriminately.

## Targets

Inspect current live call paths and identify repeated/high-cost operations such as:
- repeated full-sheet reads
- unnecessary full JSON hashing/serialization
- redundant candidate materializations
- oversized bridge/provenance surfaces read on hot paths
- repeated formatting/structural operations
- dead frontend/backend helper code after newer route/ownership architecture

## Rules

- preserve scientific outputs and rollback/checkpoint semantics
- prefer bounded reads, incremental updates, and cheaper deterministic fingerprints
- remove dead code/surfaces only when current consumers are proven absent
- avoid introducing a new cache/table unless it clearly reduces total complexity

## Verification

Benchmark current relevant operations before/after where feasible:
- targeted Incremental
- Result/Output stage
- Boss/Admin rebuild

Functional output equivalence is mandatory.

---

# RECOMMENDED EXECUTION ORDER

When Codex quota is available, use this order unless ChatGPT redirects based on fresh Production evidence:

1. FAMILY 1 — Boss value semantics + QA + dead column
2. FAMILY 2 — Participant report complete product
3. FAMILY 3 — Admin Slice B operational UX
4. FAMILY 4 — MRIadmin / UBSN / BOOKED loop
5. FAMILY 5 — Frontend payload ownership + deep links
6. FAMILY 6 — JSON exact-field recovery
7. FAMILY 7 — current-data contamination rescue for proven patterns
8. FAMILY 8 — performance/contraction

Independent families may be locally prepared in parallel, but Production deploy ownership must remain serialized.

At the end of each FAMILY, update canonical MD immediately. Do not create a new status file for every micro-step.
