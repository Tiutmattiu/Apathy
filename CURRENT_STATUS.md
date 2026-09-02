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

These facts close the narrow patch only. They do **not** mean the overall Admin or Boss presentation is product-accepted.

## ADMIN PRODUCT ACCEPTANCE — NOT YET PASSED

Read-only Production acceptance after the fast patch found that active Admin is still not the intended staff operations console.

Current aggregate findings before Admin Slice A:

- active Admin has 31 participant rows;
- 28 rows contain `ESCALATE`;
- 11 rows contain `STAFF_DATA_ACTION`;
- 0 rows contain `RESOLVABLE_IN_APP`;
- the overlap implies 20 rows are system/escalation-only and 8 rows mix a real staff-data action with a system/escalation component.

The main current defect is no longer `TRACE_ONLY_NO_ACTION`. System-maintenance issue codes such as `BACKEND_REPAIR`, `PIPELINE_DATA_LOSS` and `SCREENING_RESULT_BACKEND_REPAIR` can still classify as `ESCALATE` and remain in the staff-facing inbox. Do **not** globally suppress all `ESCALATE`; authority/identity escalation may be genuine staff work. Admin Slice A targets non-staff system-maintenance issue semantics specifically.

**Important fresh finding:** do not treat those system-maintenance Admin rows as a current data-rescue backlog. Read-only cross-checks of several representative `BACKEND_REPAIR` rows found that Admin claimed questionnaire/clinical results were not generated while the corresponding current Boss already contained the derived results. Therefore a substantial part of this system-maintenance queue is stale/false-positive diagnosis, not evidence that participant data are still trapped. Remove these rows from ordinary Admin and later repair the diagnosis logic separately; do not rerun historical migration or re-enter data merely because `BACKEND_REPAIR` appears.

A second verified UX defect is universal checkbox validation: the current Output helper can apply an `执行` checkbox to every Admin row. `STAFF_DATA_ACTION` means staff must supply/complete real source data outside the in-app executor; it is not a checkbox-executable repair. Checkbox/action affordance must be restricted to issue types that have a real implemented in-app executor, such as the existing explicit identity-resolution workflow.

Readability also remains below acceptance: participant-level collapse can concatenate very long exact-item lists into the visible `为什么` cell. Exact lineage/detail should remain available through Trace/technical evidence, while the primary staff view should summarize the human task compactly.

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

## FULL STEP 3

The current Full run repeatedly encountered Spreadsheet-service timeout around Result Core. The stale persisted run state was safely cancelled; no checkpoint was committed and no official Full Boss/Admin publication completed from that run. The timeout is not proven to be a semantic/scientific regression: the same runner version has completed Step 3/Full before. Treat it as a runtime/Spreadsheet-I/O/performance-sensitive blocker and do not reopen established scientific semantics merely because Full is slow/failing.

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

Preview is working. Remaining task is the existing Apps Script print/save-PDF path only; do not reopen scientific payload/scoring unless required by concrete evidence. Current ChatGPT access does not include the deployed private `report.html` / `report_backend.js`, so the exact print-button root cause is not yet proven; a separate report Codex may inspect that narrow private source in parallel, but Production writes must remain serialized with mainline backend deployment.

## AGENT ROUTING

- **ChatGPT:** default for read-only Production inspection, source/history reconciliation, precise web/research work, product contract and narrow implementation packets when access is sufficient.
- **Copilot/local heavy worker:** preferred for long/token-heavy mechanical audits and large offline scans, especially when local/network constraints make simultaneous GPT/Codex use impractical.
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

1. Admin acceptance slice A: remove non-staff system-maintenance issues from the staff inbox and restrict checkbox/action affordance to implemented in-app actions; preserve genuine `STAFF_DATA_ACTION` and identity/authority work.
2. Admin acceptance slice B: compact visible staff wording while preserving exact detail/lineage through Trace/hidden technical columns.
3. Participant-report print/save-PDF narrow fix can be investigated in parallel but must not deploy concurrently with mainline backend changes.
4. MRIadmin Patch 0: adopt only unambiguous existing MRI Time bookings into durable APATHY BOOKED evidence; reconcile ambiguous rows without changing legacy rows. Then implement Participant-state -> Admin/UBSN waiting producer and booking writeback.
5. Stabilize Step-3 runtime without redesigning scientific semantics.
6. Reconcile Boss diagnosis/color/action presentation and normalize date display without changing scientific values.
7. Fix frontend route-owned payload hygiene.
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
