# APATHY Core Pipeline Handoff — 2026-09-03

Status: **CURRENT PRODUCT / DATA CONTRACT + READ-ONLY INSPECTION HANDOFF**

This file is the current sanitized handoff for the APATHY core pipeline. Phase-specific repair/diagnosis/rollback documents are supporting history; they must not redefine the core research-data contract.

**Canonical-doc rule:** when an implementation or verified operational change is completed, synchronize this handoff and `CURRENT_STATUS.md` immediately. Once synchronized, agents may rely on these canonical files instead of re-auditing established facts. If a contradiction is discovered, current Production/runtime/current source wins and the canonical docs must then be corrected in the same closeout. Old unsynchronized MD is historical context only.

Public-repo privacy rule: do not commit participant identifiers, names, phone numbers, clinical payload values, private workbook rows, Script/Spreadsheet IDs, credentials, tokens, or other private Production evidence. Production findings below are aggregate/sanitized only.

## 1. Ubiquitous language / authority map

```text
Contactlist = recruitment/candidate layer; Inclusion=n is an exclusion signal.
Registry = participant identity authority once the participant exists there.
Raw = primary submitted research evidence; default policy is preserve, not rewrite.
Event = lossless field-level evidence parsed from submitted payload_json.
Participant state = resolved current evidence selected from formal evidence; not a new authority.
Backfill = formal evidence only for fields it actually evidences.
Result / Medication / Decision = derived scientific calculation layers.
Boss = scientific output for Boss-eligible participants.
Admin = genuine unresolved human work only, not a generic warning dump.
MRIadmin = Screening-derived MRI preference/assistance evidence resolved to the participant.
Contactlist MRI note = non-authoritative operational remark / real-world staff interface.
MRI Time = legacy transitional manually maintained booking sheet, not future MRI authority.
Audit / Bridge / Diagnosis / Candidate sheets = implementation/support surfaces, never scientific authority.
```

## 2. Core product contract

```text
frontend submission
  -> Raw row with complete payload_json
  -> lossless field-level Event evidence
  -> resolve to Registry participant
  -> Participant current evidence selected by field/domain/source ownership
  -> Result / Medication / Decision calculation
  -> Boss
  -> Admin only for genuine staff work
```

Technical Candidate, bridge, audit, diagnosis, checkpoint and rollback sheets are implementation/support surfaces. They are not additional scientific authorities.

### Raw / Event

- Default rule: Raw is preserved as primary submitted research evidence; do not rewrite it merely to make downstream identity/scoring/publication easier.
- The complete submission is carried in `payload_json`; it must not be reduced to a fixed wide-column schema.
- Event parsing should expose every submitted payload field losslessly and preserve source/submission lineage.
- **Narrow exception:** a direct Raw correction is allowed when a human research authority has explicitly approved the correction and leaving known-wrong Raw evidence would create continuing downstream corruption. Such edits must be targeted, auditable and limited to the approved row/field/value; never use broad automated Raw rewriting as a repair shortcut.
- Identity/scoring/publication bugs normally belong downstream and do not justify Raw mutation.

### Identity / Participant

- Registry is participant identity authority once a participant exists there.
- Formal submissions must be assigned to the correct Registry participant; ambiguous identity is resolved through the existing control/authority path.
- Participant current state selects evidence by field/domain/source ownership. A later unrelated event must not overwrite stronger owner evidence merely because it is later.
- Backfill is formal evidence for the fields it actually evidences; it is not blanket authority over unrelated fields.

### Boss admission — current product rule

A participant is Boss-eligible when:

1. the participant exists uniquely/validly in Registry;
2. at least one formal Raw submission is assigned to that participant;
3. Contactlist does **not** explicitly mark the participant `Inclusion=n`.

In code terms:

```text
inclusionAllowed = inclusion !== 'n'
```

A blank Inclusion value is not, by itself, a Boss exclusion gate. S_ID, MRI date, Stage 2 completion and clinical/MRI completion are also not Boss-admission gates.

Do not confuse Boss admission with Registry creation from Contactlist; creating a new Registry identity may still require an explicit positive inclusion decision.

## 3. Data-preservation and recovery policy

APATHY is a research system. The first priority is to avoid losing already-collected participant evidence.

- A blank Boss/output cell does **not** prove source loss. Trace existing formal evidence first.
- Staff re-entry is allowed, but it is operationally expensive and should not be the first remedy when valid evidence already exists somewhere in the system.
- When data are genuinely lost, localize the loss to the exact participant + field(s), not an entire assessment by default.
- Recovery tooling should support precise structured re-entry, including direct JSON upload/backfill for known missing fields, so staff do not need to manually recreate an entire form.
- Human-approved corrections may be applied directly to Raw when that is the cleanest authoritative repair, provided the correction is narrow and auditable as described above.
- Do not mass-copy historical Boss values into current Boss and do not fabricate missing item-level answers from totals.

## 4. Proven historical data-loss mechanism

Earlier Production forensic work established that the apparent broad data loss was largely not Raw loss. Two defects interacted.

### A. Frontend payload pollution

Current public `app.js` still demonstrates the risk:

- `payload()` calls global `calculateAllDerived()`;
- then broadly serializes keys from the shared `ST.answers` object into the outgoing payload.

A non-owner route can therefore emit unrelated/default completion or derived values.

### B. Participant latest-present overwrite

The older Participant merge effectively assigned present values chronologically. Later non-owner/default values could overwrite earlier valid domain-owner evidence.

The accepted repair direction is field/domain ownership at Participant projection, plus frontend payload hygiene; do not reopen the completed historical root-cause audit without new evidence.

### Historical Boss recovery verdict

The historical Boss root-cause audit established that most audited material historical values were still represented in Event and/or provenance/current evidence. The dominant defect classes were authority, Event->Participant promotion, completion/publication, and downstream mapping gaps; only a small minority were genuine source migration gaps.

Therefore: **recover/publish existing formal evidence first; do not mass re-enter historical data.**

## 5. Current Production inspection — 2026-09-03 handoff

### Raw/Event payload integrity

- `_Candidate_Payload_Loss` contained its header only in the inspected snapshot: no active payload-loss rows were found.
- Screening `payload_json` contains MRIadmin fields.
- `_Candidate_Event_Values` contains formal `mri_avail_*` paths.
- resolved `_Candidate_Participant_State.state_json` contains MRIadmin preference/assistance fields for current participants.

This supports the conclusion that MRIadmin's missing feature is operational projection, not ingestion recovery.

### Verified narrow closeout

The bounded 2026-09-03 fast patch is complete and verified:

- active Admin has `TRACE_ONLY_NO_ACTION = 0`;
- active Admin has `NON_INCLUDED_CONTACT_CLOSEOUT = 0`;
- the previously recovered MRI-date publication tail was republished through the current participant-scoped Incremental path and is visible in Boss;
- no new Backfill or historical trace was required.

This closes that narrow patch. It does **not** constitute whole-surface Admin/Boss product acceptance.

### Admin acceptance finding — current root cause is narrower

Current active Admin has 31 participant rows. Aggregate read-only classification counts are:

- 28 rows contain `ESCALATE`;
- 11 rows contain `STAFF_DATA_ACTION`;
- 0 rows contain `RESOLVABLE_IN_APP`;
- therefore 20 rows are system/escalation-only and 8 rows combine a staff-data action with a system/escalation component.

The current staff inbox is still polluted by system-maintenance issues. Codes used for backend/system repair include `BACKEND_REPAIR`, `PIPELINE_DATA_LOSS` and `SCREENING_RESULT_BACKEND_REPAIR`; they may classify as `ESCALATE` and survive the `TRACE_ONLY_NO_ACTION` suppression even though ordinary staff cannot resolve them.

Do **not** globally suppress `ESCALATE`: some future/current authority or identity escalation may be genuine human work. Route/suppress specifically by non-staff system-maintenance semantics while preserving diagnosis/Trace evidence.

The current Output helper also applies checkbox validation to the entire `执行` column. This creates a false affordance for `STAFF_DATA_ACTION` rows: a real source gap requires staff to supply/complete source evidence, not press a backend repair checkbox. Restrict executable controls to issue types for which an actual in-app executor exists; the established identity-resolution workflow is the primary current example.

Participant-level collapse currently concatenates exact-item detail into the visible staff row, producing long walls of text. Preserve exact item/lineage evidence in Trace/technical detail, but summarize the primary staff view compactly.

Product invariant:

```text
Admin = human work projection
Admin != diagnosis table
Admin != developer/system repair queue
```

Technical lineage columns are useful and should remain available/hidden, not be deleted.

### Boss acceptance finding

- Boss retains the 90-column contract.
- Targeted recovered evidence can now publish through the current pipeline.
- Applicability handling has at least one current positive control where a non-applicable blank is grey and explicitly no-action.
- Diagnosis/first-break coverage is not yet product-accepted across all current blank fields; reconcile the exact current diagnosis source against current Participant/Result evidence on a small hostile fixture set rather than rerunning the historical migration audit.
- MRI-date representation is inconsistent across rows because values may arrive/render as different date/string types. Normalize display representation separately; do not reinterpret or rewrite scientific evidence merely for formatting.

### Full Step 3 runtime finding — recurrent timeout, not a proven deterministic regression

The current Full run has passed Event and Participant and has repeatedly encountered Spreadsheet-service timeout while attempting Result Core, with no checkpoint committed.

Historical ledger evidence shows the same runner version has successfully completed Step 3/Full before, including a run that required repeated Step-3 attempts before succeeding. Therefore current evidence supports Spreadsheet I/O/runtime instability or a performance-sensitive path, but not a proven semantic Result regression.

Do not let this runtime blocker trigger a broad re-audit of already established scientific/data semantics.

## 6. Admin interaction/action contract

Admin is a staff operations surface, not merely a readable error table.

Current action semantics remain conceptually:

- `RESOLVABLE_IN_APP`: the system has enough evidence and an implemented safe control path exists for an explicit staff authority/action decision.
- `STAFF_DATA_ACTION`: genuine source evidence is absent/incomplete and staff must obtain/enter the exact missing evidence; the row must not pretend a checkbox can synthesize it.
- `TRACE_ONLY_NO_ACTION`: explainable system state with no staff action; excluded from active Admin.
- `ESCALATE`: unresolved authority/system condition requiring escalation. This class alone does not prove it belongs in ordinary staff Admin; owner/issue semantics still matter.

The established identity-resolution design remains:

```text
unresolved formal event
-> Admin identity-review task
-> staff chooses correct Registry PID
-> explicit execute action
-> validate against Registry
-> persist durable manual-resolution authority in technical control state
-> deterministic rebuild consumes it
-> issue closes automatically
```

Raw is not rewritten merely to resolve identity.

Visible controls must match actual executors. `归档PID` / `执行` are not universal controls for every issue type.

## 7. MRIadmin / real-world operations contract

MRIadmin is ordinary Screening payload evidence, but MRI scheduling is intentionally **human-in-the-loop**, not a fully automated process.

```text
Screening MRIadmin payload
  -> identity-resolved Participant current state
  -> determine who needs MRI / waiting / preference follow-up
  -> electronic MRI scheduling state
  -> Admin + UBSN operational workflow
  -> staff reviews real-world changes and available slots
  -> human-confirmed booking/change/cancellation
  -> APATHY electronic BOOKED / scheduling evidence
```

Rules:

- Raw/resolved MRIadmin is the formal authority for submitted MRI preferences/assistance data.
- Contactlist MRI note is **not** a scientific/preference authority and must not silently overwrite Raw/Participant MRIadmin. However it is a useful real-world operational remark surface because staff may record participant calls, requested time changes and messy current logistics there. Treat it as a human reconciliation signal/interface, not as automatic truth.
- The electronic workflow must know which participants need MRI, are waiting, lack preference, are already booked, or are otherwise not actionable.
- `MRI Time` is a manually maintained **transitional** sheet created because electronic MRIadmin/booking was not yet available. Preserve its historical rows and use existing confirmed bookings only for safe migration/reconciliation. After the electronic MRIadmin + UBSN booking workflow is established, MRI Time should stop receiving new routine updates and should not become the future scheduling ledger.
- v1 operational states remain conceptually `WAITING`, `PREFERENCE_MISSING`, `BOOKED`, `NOT_ACTIONABLE`; additional human review/reconciliation signals may sit alongside these states without redefining submitted preference evidence.
- blank preference means unknown, never unrestricted availability.
- month + weekday + AM/PM combinations must remain structured windows; never widen combinations.
- Participant-requested changes and other real-world exceptions require staff confirmation/reconciliation before electronic scheduling state is updated.
- CAPTCHA/final UBSN booking confirmation remains human.

## 8. Agent/work split and audit routing

### ChatGPT

Default owner for:

- read-only Production inspection when connectors/source access are sufficient;
- source/history/runtime reconciliation;
- product/data-contract protection;
- precise research/web search and synthesis;
- sanitized canonical GitHub handoff/status maintenance;
- offline diffs and narrow implementation packets.

For a genuinely unknown complex problem, ChatGPT may perform the audit directly when it has the required read access. Do not send a broad audit to Codex merely because a bug exists.

### Copilot / local heavy worker

Preferred for token-heavy or long mechanical audits that can run locally, especially when local environment/network constraints make simultaneous ChatGPT/Codex use impractical. Good examples: large static inventories, repetitive source diffs, call-site enumeration, route/field matrices.

Copilot findings are evidence/working material; they do not invent research authority.

### Mainline Codex

Use Codex primarily **after direction/root cause is already narrowed** for:

- precise code edits;
- precise tests;
- narrow reconnaissance that requires repository/private-runtime access unavailable to ChatGPT;
- deployment/runtime verification through the existing safe workflow.

Codex may audit only when the problem truly remains unknown **and** ChatGPT/Copilot cannot perform the required inspection because of missing access/capability. Preserve the existing thread/context and avoid broad rediscovery.

### Participant-report Codex

Keep isolated to the already narrowed report implementation issue(s); do not reopen scientific payload/scoring when not required.

### Human operator

Owns genuine research/identity authority decisions, approval of Raw corrections, ambiguous real-world MRI scheduling decisions, minimal safe runtime actions, and CAPTCHA/final booking confirmation.

## 9. Anti-rationalization / do-not-reopen rules

| Tempting shortcut | APATHY rule |
|---|---|
| “An old MD says this, so it must still be true.” | Use synchronized canonical docs; if contradicted by current Production/source, current truth wins and docs are immediately corrected. |
| “Boss is blank, so the source data are missing.” | Trace existing formal evidence first. |
| “This looks complex; re-audit everything.” | Do not reopen an already completed diagnosis without new contradictory evidence. |
| “A new persistent table would make this easier.” | Do not add a persistent data layer for a narrow defect unless it is genuinely required by the product model. |
| “Editing Raw is always forbidden.” | Default preserve Raw; only a narrow human-approved, auditable correction may change Raw. |
| “Just ask staff to redo the form.” | Re-entry is allowed but existing evidence comes first; if truly lost, identify exact fields and support precise structured/JSON recovery. |
| “System maintenance is still an Admin task because it is ESCALATE.” | No. Action class alone is insufficient; non-staff system-maintenance issues stay in diagnosis/Trace and out of ordinary staff Admin. |
| “Every Admin row should have an Execute checkbox.” | No. Expose executable controls only when a real safe executor exists for that issue type. |
| “A successful narrow patch means Admin is done.” | No. Patch acceptance and product-surface acceptance are separate. |
| “MRI Time already has bookings, so use it as MRI authority.” | MRI Time is transitional legacy booking history only; migrate/reconcile, then stop routine updates after electronic cutover. |
| “Contactlist MRI note is useless or authoritative.” | Neither: it is a non-authoritative real-world remark/reconciliation signal. |
| “MRI scheduling can be fully automated from payloads.” | No: electronic derivation supports staff, but booking/change/cancellation remains human-in-the-loop. |
| “Codex can investigate this from scratch.” | Prefer ChatGPT/Copilot audit when possible; give Codex narrowed implementation/test/recon work. |

## 10. Current priority order

### P0 — Admin acceptance + runtime stability

1. Admin slice A: remove non-staff system-maintenance issues from ordinary staff Admin without globally suppressing `ESCALATE`; restrict `执行`/checkbox affordance to implemented in-app actions.
2. Admin slice B: compact visible staff summaries while retaining exact detail/lineage in Trace/hidden technical evidence.
3. Stabilize the Step-3 runtime bottleneck without redesigning scientific semantics.
4. Reconcile Boss diagnosis/color/action presentation and normalize date display separately from scientific-value semantics.

### P1 — prevent new evidence pollution

5. Fix frontend payload hygiene so each route emits only owned/applicable evidence plus shared identity/metadata.
6. Keep Participant field/domain ownership defense even after frontend is clean.

### P2 — finish operational features

7. Build electronic MRIadmin Participant-state -> Admin/UBSN human-in-loop scheduling workflow; migrate/reconcile legacy MRI Time, then stop routine MRI Time updates after cutover.
8. Fix participant-report print/save-PDF path without redesigning scoring/report content.

### Later

9. Optimize Incremental and perform technical materialization/contraction only after correctness and daily operations are stable.

## 11. Operating rules

- Functionality first.
- Core evidence path first; scaffolding second.
- No participant hardcoding.
- No new persistent data layer for a narrow repair.
- Do not infer source loss from an output blank.
- `Inclusion=n` excludes from Boss; blank Inclusion is not itself exclusion.
- Prefer existing evidence over recollection/re-entry, while allowing precise staff re-entry when data are genuinely absent.
- FAST PATCH overrides broad planning/audit workflows when the defect and requested patch are already explicit.
- Give Codex one narrow deliverable at a time; do not spend quota on broad rediscovery.
- At verified task completion, synchronize the canonical MD immediately so future agents can trust it.
