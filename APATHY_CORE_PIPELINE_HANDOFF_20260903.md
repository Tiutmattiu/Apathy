# APATHY Core Pipeline Handoff — 2026-09-03

Status: **CURRENT PRODUCT / DATA CONTRACT + READ-ONLY INSPECTION HANDOFF**

This file is the current sanitized handoff for the APATHY core pipeline. Phase-specific repair/diagnosis/rollback documents are supporting history; they must not redefine the core research-data contract.

Public-repo privacy rule: do not commit participant identifiers, names, phone numbers, clinical payload values, private workbook rows, Script/Spreadsheet IDs, credentials, tokens, or other private Production evidence. Production findings below are aggregate/sanitized only.

## 1. Core product contract

```text
frontend submission
  -> append-only Raw row with complete payload_json
  -> lossless field-level Event evidence
  -> resolve to Registry participant
  -> Participant current evidence selected by field/domain/source ownership
  -> Result / Medication / Decision calculation
  -> Boss
  -> Admin only for genuine staff work
```

Technical Candidate, bridge, audit, diagnosis, checkpoint and rollback sheets are implementation/support surfaces. They are not additional scientific authorities.

### Raw / Event

- Raw is append-only research evidence.
- The complete submission is carried in `payload_json`; it must not be reduced to a fixed wide-column schema.
- Event parsing should expose every submitted payload field losslessly and preserve source/submission lineage.
- Raw must not be rewritten to repair identity, scoring or downstream publication.

### Identity / Participant

- Registry is participant identity authority once a participant exists there.
- Formal submissions must be assigned to the correct Registry participant; ambiguous identity is resolved through the existing control/authority path, not by rewriting Raw.
- Participant current state selects evidence by field/domain/source ownership. A later unrelated event must not overwrite stronger owner evidence merely because it is later.
- Backfill is formal evidence for the fields it actually evidences; it is not blanket authority over unrelated fields.

### Boss admission — current product rule

A participant is Boss-eligible when:

1. the participant exists uniquely/validly in Registry;
2. at least one formal Raw submission is assigned to that participant;
3. Contactlist does **not** explicitly mark the participant `Inclusion=n`.

In code terms, the active intended exclusion rule is:

```text
inclusionAllowed = inclusion !== 'n'
```

A blank Inclusion value is therefore not, by itself, a Boss exclusion gate. S_ID, MRI date, Stage 2 completion and clinical/MRI completion are also not Boss-admission gates.

Do not confuse this Boss-admission rule with Registry-creation workflow rules: creating a new Registry identity from Contactlist can still require an explicit positive inclusion decision. Those are different operations.

## 2. Proven historical data-loss mechanism

Earlier Production forensic work established that the apparent broad data loss was largely not Raw loss. Two defects interacted.

### A. Frontend payload pollution

Current public `app.js` still demonstrates the risk:

- `payload()` calls global `calculateAllDerived()`;
- then broadly serializes keys from the shared `ST.answers` object into the outgoing payload.

A non-owner route can therefore emit unrelated/default completion or derived values.

### B. Participant latest-present overwrite

The older Participant merge effectively assigned present values chronologically. Later non-owner/default values could overwrite earlier valid domain-owner evidence.

The accepted repair direction is field/domain ownership at Participant projection, not Raw rewriting.

### Historical Boss recovery verdict

The historical Boss root-cause audit established that most audited material historical values were still represented in Event and/or provenance/current evidence. The dominant defect classes were authority, Event->Participant promotion, completion/publication, and downstream mapping gaps; only a small minority were genuine source migration gaps.

Therefore: **recover/publish existing formal evidence first; do not mass re-enter historical data and do not copy historical Boss values directly into current Boss.**

## 3. Current Production inspection — 2026-09-03 handoff

### Raw/Event payload integrity

- `_Candidate_Payload_Loss` currently contains its header only in the inspected snapshot: no active payload-loss rows were found.
- Screening `payload_json` contains MRIadmin fields.
- `_Candidate_Event_Values` contains formal `mri_avail_*` paths.
- resolved `_Candidate_Participant_State.state_json` contains MRIadmin preference/assistance fields for many current participants.

This supports the existing conclusion that MRIadmin's missing feature is operational projection, not ingestion recovery.

### Current visible outputs

- Boss currently contains 137 participant rows and retains the 90-column contract.
- Admin currently contains 35 participant-level rows in the inspected snapshot.
- Substantive CGT values are visible again in the current Boss for the previously obvious affected cohort. Do not reopen a broad CGT migration/repair without new evidence.
- One historical MRI-date publication case remains the known narrow downstream publication tail after the historical repair.
- Boss diagnosis coloring/notes and Admin actionability still require reconciliation after scientific values are correct.

### Full Step 3 runtime finding — recurrent timeout, not a proven deterministic regression

The current Full run has passed Event and Participant and has repeatedly encountered:

```text
Service Spreadsheets timed out
```

while attempting Result Core. No checkpoint has been committed.

Important historical ledger evidence:

- the same runner version successfully completed Step 3 and Full runs multiple times on 2026-08-26 and 2026-08-27;
- on 2026-09-01 an earlier Full run also needed repeated Step-3 attempts and then succeeded, followed by a successful Step 4/checkpoint;
- the current failing run records repeated Result-Core starts rather than a stable application exception identifying one code line.

Therefore the current evidence supports **Spreadsheet I/O/runtime instability or a performance-sensitive path**, but does not yet prove that rollback snapshot code or a new source change is the root cause.

The rollback snapshot remains a plausible expensive preamble because it copies visible output sheets before Result, but that is a hypothesis, not a proven regression.

Next diagnostic rule:

1. do not redesign the runner;
2. do not keep hammering Full indefinitely;
3. compare the current Step-3 path/source with the last known successful same-version path only if a code delta exists;
4. if source is unchanged, profile/inspect the largest current Spreadsheet I/O operations and workbook growth rather than inventing a semantic fix;
5. preserve the existing Result/Decision scientific engines unless a concrete defect is demonstrated.

## 4. MRIadmin contract

MRIadmin is ordinary Screening payload evidence, not a second data system.

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

- Contactlist and historical manual MRI waiting lists are not MRI preference/availability/waiting authorities.
- Contactlist `Inclusion=n` is an upstream exclusion condition; blank/y are not MRI preference evidence.
- `MRI Time` is the familiar staff booking ledger/history. Existing confirmed rows may be adopted/reconciled non-destructively as booking evidence, but MRI Time must not be used to infer availability, assistance needs or waiting priority.
- Existing MRI Time rows must not be cleared/rebuilt/reordered/normalized by a generated cache.
- v1 states remain `WAITING`, `PREFERENCE_MISSING`, `BOOKED`, `NOT_ACTIONABLE`.
- blank preference means unknown, never unrestricted availability.
- month + weekday + AM/PM combinations must remain structured windows; never widen combinations.

The local UBSN parser/session/matcher is already a separate staff helper. The missing backend feature is the read-only APATHY waiting producer and later confirmed-booking writeback, after the core backend runtime is stable enough to change safely.

## 5. What technical sheets mean — and what they do not mean

Current Production contains large materialized technical surfaces including Event Values, Participant State, Field Provenance, Result Bridge, Result/Review/Audit, Decision, Output facts, Admin lineage, run ledgers and rollback sheets.

For current work:

- do not create another persistent technical table to solve a narrow bug;
- do not promote an audit/diagnosis/bridge table into a new authority;
- Result Bridge is an interface adapter from Participant State into the legacy exact Result engines, not a conceptual research-data source;
- diagnosis/Trace surfaces explain current evidence and staff actionability; they must not alter scientific evidence;
- contraction/cleanup is later work and must not block restoring reliable daily operation.

## 6. Current priority order

### P0 — stabilize current backend and close known publication tail

1. **Step 3 runtime:** determine whether current source differs from the last successful same-version path. If not, treat the repeated timeout as a performance/Spreadsheet-I/O problem and isolate the dominant operation; patch only a proven bottleneck.
2. **Historical publication tail:** finish the one remaining historical MRI-date downstream publication case generically.
3. **Boss/Admin reconciliation:** once values are correct, make color/diagnosis/action text agree with the evidence. Pipeline breaks must not become staff re-entry requests.

### P1 — prevent new evidence pollution

4. Fix frontend payload hygiene so each route emits only owned/applicable evidence plus shared identity/metadata; do not globally serialize unrelated `ST.answers`/derived defaults into every submission.
5. Keep Participant field/domain ownership defense even after frontend is clean, because historical and external submissions remain evidence.

### P2 — finish operational features

6. MRIadmin Participant-state -> Admin/UBSN waiting projection; then human-confirmed BOOKED -> narrow MRI Time link/append.
7. Participant report: fix only the existing Apps Script print/save-PDF path; do not redesign scoring/report content.

## 7. Agent/work split

### ChatGPT

Own:

- read-only Production inspection;
- source/history/runtime reconciliation;
- product/data-contract protection;
- sanitized GitHub handoffs/status;
- offline diffs and narrow implementation packets;
- public UBSN module/doc corrections.

Do not ask Codex to rediscover facts that can be established read-only first.

### Mainline Codex window

Use only after a defect has been reduced to a narrow implementation change. Preserve the existing thread/context; do not start a broad audit.

Likely next task depends on the source comparison:

- if a concrete current-vs-last-successful Step-3 code delta exists, patch only that delta;
- if not, inspect/profile the dominant current Spreadsheet I/O path and reduce only that bottleneck;
- then separately finish the remaining MRI publication mapping and diagnosis/Admin reconciliation.

### Participant-report Codex window

Keep isolated to `report.html` print/save-PDF behavior. Preview/scientific payload/scoring are not the task.

### Copilot / heavy offline worker

Good tasks:

- mechanical current-vs-last-known-successful source diff on the Step-3 caller/preamble and Result entry path;
- static inventory of large Spreadsheet reads/writes/copies in Step 3, ranked by likely cost;
- frontend route -> owned payload-field matrix and identification of cross-route/default emissions;
- large static dependency inventories when useful.

Do not let Copilot write Production or invent identity/scientific authority.

### Human operator

Owns:

- genuine research/identity authority decisions;
- minimal safe UI/runtime actions;
- CAPTCHA/final UBSN booking confirmation.

## 8. Operating rules

- Functionality first.
- Core evidence path first; scaffolding second.
- No Raw rewrite.
- No participant hardcoding.
- No new persistent data layer for a narrow repair.
- Do not infer missing source from a blank Boss cell.
- `Inclusion=n` excludes from Boss; blank Inclusion is not itself exclusion.
- Prefer existing data/evidence over recollection/re-entry.
- Give Codex one narrow deliverable at a time; do not spend quota on broad rediscovery.
