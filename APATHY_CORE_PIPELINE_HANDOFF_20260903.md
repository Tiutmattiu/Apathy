# APATHY Core Pipeline Handoff — 2026-09-03

Status: **CURRENT PRODUCT / DATA CONTRACT + READ-ONLY INSPECTION HANDOFF**

This file is the current sanitized handoff for the APATHY core pipeline. It exists because several later repair/diagnosis/rollback documents describe implementation scaffolding or phase-specific work and must not be mistaken for the product's core data model.

Public-repo privacy rule: do not commit participant identifiers, names, phone numbers, clinical payload values, private workbook rows, Script/Spreadsheet IDs, credentials, tokens, or other private Production evidence. Production findings below are aggregate/sanitized only.

## 1. Core product contract

The APATHY core is intentionally simple:

```text
frontend submission
  -> append-only Raw row containing the complete payload_json
  -> parse every submitted payload field as evidence
  -> resolve the submission to the correct Registry participant
  -> combine that participant's formal evidence using field/domain/source ownership
  -> calculate scientific Result / Medication / Decision outputs
  -> publish Boss
  -> derive Admin only for genuine staff work
```

Technical Candidate, bridge, audit, diagnosis, checkpoint and rollback sheets are implementation/support surfaces. They are not additional scientific authorities and must not redefine this core contract.

### Raw / Event

- Raw is append-only research evidence.
- The complete submission is carried in `payload_json`; it must not be reduced to a fixed wide-column schema.
- Event parsing should expose every submitted payload field losslessly and preserve its source/submission lineage.
- Raw must never be rewritten merely to repair identity, scoring or downstream publication.

### Identity / Participant

- Registry is participant identity authority after inclusion.
- Formal submissions must be assigned to the correct Registry participant; ambiguous identity is resolved through the existing control/authority path, not by rewriting Raw.
- Participant current state must select evidence by field/domain/source ownership. A later unrelated event must not overwrite stronger owner evidence merely because it is later.
- Backfill is formal evidence for the fields it actually evidences; it is not blanket authority over unrelated fields.

### Boss admission — product rule

A participant belongs in Boss only when all are true:

1. the participant exists uniquely/validly in Registry;
2. at least one formal Raw submission is assigned to that participant;
3. Contactlist has explicit `Inclusion = y` for that participant.

S_ID, MRI date, Stage 2 completion and clinical/MRI completion are not Boss-admission gates.

**Do not weaken `Inclusion = y` into `Inclusion != n` as a product rule.**

## 2. CRITICAL current contract mismatch: Boss inclusion

Read-only inspection on the current Production workbook and current Result source found a material mismatch between the product rule above and the active 4A implementation.

Current `t4BossAdmission_()` does:

```text
inclusionAllowed = inclusion !== 'n'
```

so blank/unknown Contactlist Inclusion is treated as allowed. Its audit also describes the gate mainly as `Registry + at least one formal Raw`.

Current Production aggregate snapshot:

- Boss: 137 participant rows;
- Registry: 176 PID rows;
- Participant State: 174 `registry_qualified=1` rows;
- Contactlist: only 43 rows currently carry explicit `Inclusion=y`.

Therefore a blind code change from `!= n` to `== y` would remove a large historical cohort from Boss. **Do not make that code edit yet.** First reconcile why historical/current included Registry participants lack explicit Contactlist `y` and restore the missing inclusion authority where justified. This is a data/authority reconciliation problem before it is a one-line code change.

No historical inclusion value should be guessed from presence in Boss, Registry, MRI Time, group, or old output alone.

## 3. Proven historical data-loss mechanism

Earlier Production forensic work established that the apparent broad data loss was largely not Raw loss. Two design defects interacted:

### A. Frontend payload pollution

Current public `app.js` still demonstrates the risk:

- `payload()` calls the global `calculateAllDerived()`;
- then copies all keys from the shared `ST.answers` object into the outgoing payload, regardless of which workflow owns those fields.

This permits a non-owner route to emit unrelated/default completion values such as zeros or pending/default state.

### B. Participant latest-present overwrite

The older Participant merge used effectively `merged[path] = value` over chronological events. Later non-owner/default values could therefore overwrite earlier valid domain-owner evidence.

Earlier real-data audit found substantial cross-workflow conflicts, including 1->0 completion regressions and workflow-stage regressions. The accepted repair direction is field/domain ownership at Participant projection, not Raw rewriting.

### Historical Boss recovery verdict

The historical Boss root-cause audit established:

- all 108 historical participants were still present in the then-current Boss;
- 128 potentially material old-nonblank/current-blank cells were inspected;
- 109/128 retained equivalent evidence in Event and/or Field Provenance;
- most defects were authority, Event->Participant promotion, completion/publication, or downstream mapping gaps;
- only a small minority were true source migration gaps.

Therefore: **recover/publish existing formal evidence first; do not mass re-enter historical data and do not copy old Boss values directly into current Boss.**

## 4. Current Production inspection — 2026-09-03 handoff

### Raw/Event payload integrity

- `_Candidate_Payload_Loss` currently contains its header only: no active payload-loss rows were found in the current snapshot.
- Screening `payload_json` contains MRIadmin fields.
- `_Candidate_Event_Values` contains formal `mri_avail_*` payload paths.
- resolved `_Candidate_Participant_State.state_json` contains current MRIadmin preference/assistance fields for many participants.

This supports the existing conclusion that current MRIadmin work is operational projection, not another ingestion-recovery project.

### Current visible outputs

- Boss currently contains 137 participant rows and retains the 90-column contract.
- Admin currently contains 35 participant-level rows in the inspected snapshot.
- Substantive CGT values are again visible in the current Boss for the previously obvious affected cohort. Do not reopen a broad CGT migration/repair unless new evidence proves a remaining CGT break.
- One historical MRI-date publication case remains the known narrow downstream publication tail after the historical repair.
- Boss diagnosis coloring/notes and Admin actionability still require reconciliation after the scientific values are correct.

### Current Full Step 3 failure

The current Full run reached:

```text
Event Core PASS
Participant Core PASS
Result Core RUNNING
```

and repeated Step 3 attempts failed with `Service Spreadsheets timed out`; no checkpoint was committed.

The current helper captures a persistent Boss/Admin/checkpoint rollback snapshot before entering Result Core. Read-only workbook/ledger inspection shows partially created rollback sheets and a cell-count change consistent with snapshot-sheet construction during the failed Step 3 attempt. This is strong evidence that the current staged orchestration/snapshot path is involved in the second Step-3 Spreadsheet-I/O bottleneck.

However, the correct next engineering action is **not** to invent another rollback architecture. Compare the current Step-3 preamble/path against the last known working source/runtime and identify the smallest concrete regression. Preserve the simple core pipeline above.

Do not keep retrying Full while this deterministic Step-3 failure is unresolved.

## 5. MRIadmin contract

MRIadmin is ordinary Screening payload evidence, not a second data system.

Correct direction:

```text
Screening MRIadmin
  -> identity-resolved Participant current state
  -> MRI scheduling operational state
  -> Admin + UBSN waiting producer
  -> human-confirmed booking
  -> APATHY BOOKED evidence/state
  -> link/append MRI Time
```

Rules:

- Contactlist and historical manual MRI waiting lists are not MRI preference/eligibility/waiting authorities. They existed because the operational loop was unfinished.
- Contactlist `Inclusion=y` still matters upstream as the participant-inclusion authority.
- `MRI Time` is the familiar staff booking ledger/history. Existing confirmed rows may be adopted/reconciled non-destructively as booking evidence, but MRI Time must not be used to infer participant availability, assistance needs, eligibility or waiting priority.
- Existing MRI Time rows must not be cleared/rebuilt/reordered/normalized by a generated cache.
- Current v1 states remain `WAITING`, `PREFERENCE_MISSING`, `BOOKED`, `NOT_ACTIONABLE`.
- Blank preference means unknown, never unrestricted availability.
- Month + weekday + AM/PM combinations must remain structured windows; never widen combinations.

The local UBSN parser/session/matcher is already a separate working staff helper. The missing backend feature is the read-only APATHY waiting producer and later confirmed-booking writeback, after the core backend repair is stable.

## 6. What technical sheets mean — and what they do not mean

Current Production contains large materialized technical surfaces including Event Values, Participant State, Field Provenance, Result Bridge, Result/Review/Audit, Decision, Output facts, Admin lineage, run ledgers and rollback sheets.

For current work:

- do not create another persistent technical table to solve a narrow bug;
- do not promote an audit/diagnosis/bridge table into a new authority;
- Result Bridge is an interface adapter from Participant State into the legacy exact Result engines, not a conceptual research-data source;
- diagnosis/Trace surfaces explain current evidence and staff actionability; they must not alter scientific evidence;
- contraction/cleanup is later work and must not block restoring the reliable core path.

## 7. Current priority order

### P0 — restore the core contract/runtime

1. **Boss Inclusion reconciliation:** determine why current historical/current official participants lack explicit Contactlist `Inclusion=y`; produce a safe authority reconciliation plan. Do not guess or mass-write yet.
2. **Step 3 deterministic failure:** compare current Step-3 orchestration against the last known working path and isolate the exact second I/O regression; patch only that regression.
3. **Historical publication tail:** finish the one remaining historical MRI-date downstream publication case generically.
4. **Boss/Admin reconciliation:** once values are correct, make color/diagnosis/action text agree with the evidence. Pipeline breaks must not become staff re-entry requests.

### P1 — prevent new evidence pollution

5. Fix frontend payload hygiene so each route emits only its owned/applicable evidence plus shared identity/metadata; do not globally serialize unrelated `ST.answers`/derived defaults into every submission.
6. Keep Participant field/domain ownership defense even after frontend is clean, because historical and external submissions remain evidence.

### P2 — finish operational features

7. MRIadmin Participant-state -> Admin/UBSN waiting projection; then human-confirmed BOOKED -> narrow MRI Time link/append.
8. Participant report: fix only the existing Apps Script print/save-PDF path; do not redesign scoring/report content.

## 8. Agent/work split

### ChatGPT

Own:

- read-only Production inspection;
- source/history reconciliation;
- product/data-contract protection;
- sanitized GitHub handoffs/status;
- offline diffs and exact narrow implementation packets;
- public UBSN module/doc corrections.

Do not ask Codex to rediscover facts that can be established read-only first.

### Mainline Codex window

Use only after ChatGPT has reduced a defect to a narrow implementation change. Preserve the existing thread/context; do not start a broad new audit.

Current likely next code task, after exact diff confirmation: the smallest Step-3 orchestration/I/O regression patch. Then separately the remaining MRI publication mapping and diagnosis/Admin reconciliation. One slice at a time.

### Participant-report Codex window

Keep isolated to `report.html` print/save-PDF behavior. Preview/scientific payload/scoring are not the task.

### Copilot / heavy offline worker

Good tasks:

- mechanical current-vs-last-known-good source diff on the Step-3 caller/preamble only;
- offline Contactlist/Registry/Boss inclusion reconciliation report, preserving participant-level details locally/private and producing only aggregate public findings;
- frontend route -> owned payload-field matrix and identification of cross-route/default emissions;
- large static dependency inventories when they are useful.

Do not let Copilot write Production or invent inclusion/identity authority.

### Human operator

Owns:

- actual research/authority decisions where historical Contactlist Inclusion is blank/ambiguous;
- minimal safe UI/runtime actions;
- CAPTCHA/final UBSN booking confirmation.

## 9. Operating rules

- Functionality first.
- Core evidence path first; scaffolding second.
- No Raw rewrite.
- No participant hardcoding.
- No new persistent data layer for a narrow repair.
- Do not infer missing source from a blank Boss cell.
- Do not infer `Inclusion=y` from historical Boss presence alone.
- Prefer existing data/evidence over recollection/re-entry.
- Use Full only for a true global change and only when the staged runner is working again.
- Give Codex one narrow deliverable at a time; do not spend quota on broad rediscovery.
