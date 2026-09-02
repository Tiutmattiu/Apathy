# APATHY CURRENT STATUS

Last updated: 2026-09-03

This file is the canonical **sanitized engineering/product status**. Read `APATHY_CORE_PIPELINE_HANDOFF_20260903.md` for the current core data contract, authority map, read-only Production findings, MRI operations contract and agent routing.

**Canonical-doc discipline:** completed + verified work must update this file and the core handoff immediately. Synchronized canonical MD may be trusted by later agents; if current Production/source contradicts it, current truth wins and the MD must be corrected in the same closeout.

## AUTHORITATIVE CORE CONTRACT

```text
frontend submission
-> complete payload_json in Raw
-> lossless field-level Event evidence
-> identity resolution to Registry participant
-> Participant current evidence selected by field/domain/source ownership
-> Result / Medication / Decision calculation
-> Boss
-> Admin for genuine unresolved staff work only
```

### Boss admission

Boss eligibility requires valid/unique Registry identity, at least one formal Raw submission, and Contactlist not explicitly `Inclusion=n`. Blank Inclusion does not itself exclude.

### Raw policy

Raw is preserved by default and must not be rewritten merely to fix downstream identity/scoring/publication. A **narrow human-approved and auditable Raw correction is allowed** when the research authority explicitly approves the exact correction and leaving known-wrong primary evidence would perpetuate error.

### Data-recovery policy

- Do not infer source loss from a blank Boss/output cell.
- Existing formal evidence is preferred over staff recollection/re-entry.
- Staff re-entry is allowed when data are truly absent, but loss should be localized to exact fields.
- Recovery should support precise structured/JSON backfill rather than forcing an entire assessment to be recreated.
- Never fabricate item-level answers from summary totals.

## ACCEPTED / CURRENTLY RELIABLE

- Registry is participant identity authority once the participant exists there.
- Participant current state uses field/domain/source ownership; later unrelated events must not overwrite stronger owner evidence merely by chronology.
- Backfill is formal evidence only for fields it actually evidences.
- Historical broad data-loss diagnosis is complete; most apparent loss was downstream authority/promotion/publication rather than Raw loss. Do not reopen without new contradictory evidence.
- A real participant-scoped Incremental path is deployed and reuses the existing scientific engines.
- Boss remains the 90-column scientific output contract.
- Diagnosis/Trace/Admin are explanatory/operations layers, not scientific-data authorities.

## VERIFIED 2026-09-03 FAST-PATCH CLOSEOUT

The bounded Admin/MRI publication patch completed successfully:

- `TRACE_ONLY_NO_ACTION` is suppressed from active Admin; current count is 0.
- `NON_INCLUDED_CONTACT_CLOSEOUT` is no longer emitted merely because `Inclusion=n`; current count is 0.
- The previously recovered MRI-date publication tail was republished through the current participant-scoped Incremental path and is now visible in Boss.
- No additional Backfill or historical trace was required for that publication tail.

## VERIFIED 2026-09-03 ADMIN SLICE A CLOSEOUT

Admin Slice A is deployed and Production-verified.

Post-rebuild acceptance:

- active Admin contracted from 31 participant rows to 11;
- all 11 remaining rows retain genuine `STAFF_DATA_ACTION` work;
- active system-maintenance issues are 0;
- `TRACE_ONLY_NO_ACTION` is 0;
- `NON_INCLUDED_CONTACT_CLOSEOUT` is 0;
- non-identity rows with `执行` checkbox validation are 0;
- Boss remains exactly 90 columns;
- no Full or participant Incremental was required for this slice.

This closes **Admin admission/actionability Slice A**. It does not close Admin readability. Slice B remains: compact the visible staff task wording while retaining exact item/lineage detail through Trace/hidden technical evidence.

A fresh Production read of the 11 active rows shows the remaining inbox is now concentrated in genuine Stage 2 / Clinical source-item completion work. The main readability defect is no longer false admission; it is the extremely long exact-item wall in `为什么`. A bounded Slice B patch packet has been prepared to keep the visible row compact while preserving the complete exact detail in hidden Admin technical evidence.

Fresh read-only cross-checks also established that multiple representative historical/current `BACKEND_REPAIR` rows were false-positive/stale system diagnoses: Admin claimed results were not generated while the same current participants already had those derived values in Boss. Therefore system-maintenance diagnosis is not a data-rescue queue. Before any future “rescue,” compare actual Participant/Result/Boss state; do not re-enter data or reopen historical migration merely because a system-maintenance diagnosis exists.

Target product rule remains:

```text
Admin = human work projection
Admin != diagnosis table
Admin != developer/system repair queue
```

Technical lineage columns remain useful and should be preserved/hidden rather than deleted.

## BOSS PRODUCT ACCEPTANCE — SCIENTIFIC PUBLICATION PROVISIONALLY OK, DIAGNOSIS/PRESENTATION OPEN

- Boss retains the 90-column scientific output contract.
- The targeted recovered MRI date now publishes through the current pipeline.
- Current positive control: non-applicable PD-specific fields for an HC participant can be rendered grey with `NON_APPLICABLE` / no staff action.
- Current diagnosis coverage/first-break semantics still require reconciliation on a small set of hostile fixtures; do not infer diagnosis from blankness alone.
- MRI-date display is not normalized across all rows: date objects/strings can render in different textual formats. Treat this as representation normalization, not a scientific-data rewrite.

Do not reopen the historical 108-participant migration audit to fix Boss presentation. Obtain the exact current diagnosis source and reconcile current first-break/applicability/publication semantics narrowly.

## FULL STEP 3 — FRESH FAILURE NOW LOCALIZED TO PRE-RESULT SNAPSHOT CAPTURE

A fresh real Full run reproduced the blocker with a more precise boundary:

- Step 1 Event passed with 360 formal payloads, 0 Pipeline Data Loss and 0 unaccounted rows.
- Step 2 Participant passed with 176 Registry rows, 174 qualified Registry participants, 360 assigned formal events and 0 unassigned events.
- Step 3 failed before Result/Decision completion with `OUTPUT_SNAPSHOT_CAPTURE_FAILED: Service Spreadsheets timed out ...`.
- Step 4 did not run.
- Checkpoint was not committed and this run did not complete an official Full Boss/Admin publication.

This is stronger evidence that the immediate blocker is the pre-Result rollback-snapshot Spreadsheet I/O path, not a scientific Result/Decision regression. Current reviewed helper source still creates rollback backups through a generic exact-size allocator that can delete surplus default rows/columns; the existing fast-fix packet now explicitly targets a snapshot-only grow-only/no-shrink allocator.

The failed-stage retry contract already permits retrying the same `RESULT_CORE` stage. After the helper patch is deployed and the persisted run is confirmed still failed at Step 3, the safest acceptance action is **retry Step 3 once**, not rerun Step 1/2. If the same timeout persists after the no-shrink patch, move to the already-identified participant-fingerprint I/O cost as a separate performance task.

## FRONTEND PAYLOAD HYGIENE

Current public `app.js` still demonstrates the known defect: global derived calculation + broad serialization of shared `ST.answers` can emit non-owner/default evidence into unrelated submissions. Fix route-owned/applicable payload emission; keep Participant ownership defense as a second line of protection.

## MRIADMIN / UBSN

Formal MRI preference/assistance authority is:

```text
Screening MRIadmin payload
-> resolved Participant state
-> determine need/waiting/preference-follow-up
-> electronic scheduling state
-> Admin + UBSN
-> staff human reconciliation / booking
-> APATHY electronic BOOKED / scheduling evidence
```

Key rules:

- MRI scheduling is human-in-the-loop, not fully automated.
- Contactlist MRI note is **not** preference authority, but it is a useful real-world operational remark surface because staff may record participant calls, requested time changes and messy logistics there. Treat it as a reconciliation signal; never silently overwrite Raw/Participant MRIadmin from it.
- `MRI Time` is a **transitional manually maintained legacy sheet** created before electronic MRIadmin/booking existed. Preserve and reconcile existing confirmed history, but after the electronic MRIadmin + UBSN workflow is established, MRI Time should stop receiving new routine updates and must not become the future scheduling authority.
- Blank preference means unknown, not unrestricted availability.
- Structured month/weekday/daypart windows must not be widened.
- CAPTCHA/final UBSN booking confirmation remains human.

### Verified MRI migration inventory

Read-only Patch-0 inventory found 18 existing `MRI Time` booking rows:

- 14/18 have an exact unique Subject-No./SID match in current resolved Participant state and are safe candidates for idempotent booking adoption;
- 3/18 can be associated only through Contactlist while current Participant state lacks that SID, so they are **not** safe for automatic adoption and require human reconciliation;
- 1/18 uses a noncanonical/variant Subject No. with no exact current identity match and also requires human reconciliation.

Among future bookings in the inspected snapshot, seven exact current Participant-state matches form a safe fixture set for Patch 0. Existing `MRI Time` rows must remain unchanged. The first implementation slice should adopt only exact current identity matches into APATHY `BOOKED` evidence and route ambiguous rows to reconciliation; it must not guess from Contactlist.

Current resolved Participant state also contains structured MRIadmin fields for a current subset of participants, confirming again that the missing component is the Production operational producer, not Raw ingestion. The UBSN local consumer exists; Production still needs the Participant-state -> MRI status/Admin -> read-only waiting snapshot -> human-confirmed BOOKED loop.

## PARTICIPANT REPORT

Preview is working and report content/scoring is not the current defect.

The print/save-PDF root cause was proven in current private report source:

- the `id="print"` button starts disabled;
- `loadReports()` attempted `print.disabled = false`;
- in that scope `print` resolves to native `window.print`, not the button element;
- therefore the button never became enabled and its existing `onclick="window.print()"` handler was never reached.

The two-line `report.html` fix changing those references to `document.getElementById('print').disabled` has now been deployed through a fresh live overlay. The deploy reported that only `report.html` changed and all other files matched the live baseline. Remaining acceptance is only one human browser-native click: confirm the Print dialog opens and Save-as-PDF/A4 pagination behaves correctly. Do not redesign the report unless that human acceptance exposes a new defect.

## AGENT ROUTING

- **ChatGPT:** default for read-only Production inspection, source/history reconciliation, precise web/research work, product contract and narrow implementation packets when access is sufficient.
- **Copilot/local heavy worker:** preferred for long/token-heavy mechanical audits and large offline scans, especially when local/network constraints make simultaneous GPT/Codex use impractical. When VPN prevents Copilot use, do not force that lane; ChatGPT can perform smaller read-only work and heavy local inventory can wait.
- **Codex:** primarily after direction/root cause is narrowed: precise code edits, precise tests, narrow reconnaissance requiring private repo/runtime access, deployment/runtime verification. Broad Codex audit only when the problem is genuinely unknown and GPT/Copilot lack the needed access.
- **Human:** research/identity authority, approval of Raw corrections, ambiguous real-world MRI decisions, minimal safe runtime actions and final UBSN confirmation.

**Do not use Codex as a finger.** If a task is mostly `find/open/click/run/copy` and a human or ChatGPT can already identify the exact target, do not spend Codex quota on it. Human mechanical actions include selecting a known Apps Script function, clicking Run, opening a known sheet/row and copying an error. Codex is for `modify/implement/instrument/deploy/precise private-runtime probe`, not routine UI operation.

**Serialize Production writes; parallelize independent reads.** Two agents must not concurrently deploy overlapping Apps Script source. A secondary workstream may inspect/read and prepare a patch while another agent owns the Production write lane, then refresh/rebase before deployment.

## ANTI-RATIONALIZATION RULES

- Synchronized canonical MD is usable; stale historical MD is not current truth.
- Boss blank != source missing.
- Known diagnosis != permission to re-audit everything.
- Narrow defect != new persistent technical table.
- Raw is preserve-by-default, not absolutely immutable: only human-approved targeted corrections may change it.
- Staff re-entry is allowed but existing evidence comes first; true loss should be field-specific and support structured/JSON recovery.
- A system-maintenance Admin diagnosis does not prove that current data are missing or unpublished; compare current Participant/Result/Boss before attempting rescue.
- MRI Time is transitional history, not future MRI authority.
- Contactlist MRI note is neither authoritative nor useless: it is a human operational reconciliation signal.
- MRI scheduling remains human-in-the-loop.
- A successful narrow patch != product acceptance of the whole surface.
- System-maintenance diagnosis may remain in Trace/Boss without belonging in staff Admin.
- Do not globally suppress `ESCALATE`; suppress/route non-staff system-maintenance semantics specifically.
- FAST PATCH overrides broad planning/audit workflows when the requested change is already explicit.

## CURRENT MAINLINE

1. Step-3 rollback-snapshot fast fix: snapshot-only grow/no-shrink allocation, then one human Step-3 retry if the failed run state remains retryable.
2. Admin acceptance Slice B: compact visible Stage 2/Clinical wording while preserving complete exact detail in hidden technical evidence; bounded implementation packet prepared.
3. Participant-report print/save-PDF: code patch is deployed; one human native Print/Save-as-PDF acceptance click remains.
4. MRIadmin Patch 0: adopt only unambiguous existing MRI Time bookings into durable APATHY BOOKED evidence; reconcile ambiguous rows without changing legacy rows. Then implement Participant-state -> Admin/UBSN waiting producer and booking writeback.
5. Reconcile Boss diagnosis/color/action presentation and normalize date display without changing scientific values.
6. Fix frontend route-owned payload hygiene.
7. Add structured JSON recovery + contextual deep links for genuine exact-field source gaps.
8. Optimize Incremental / technical contraction only after correctness and daily operations are stable.

## OPERATING RULES

- Functionality first; evidence path first; scaffolding second.
- No participant-specific hardcoding.
- No new persistent data layer for a narrow repair.
- `Inclusion=n` excludes from Boss; blank Inclusion does not itself exclude.
- Give Codex one narrow deliverable at a time.
- Do not spend Codex quota on trivial human UI/mechanical actions.
- Serialize overlapping Production writes; parallelize independent read-only work.
- At verified task completion, synchronize canonical MD immediately.
