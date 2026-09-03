# APATHY Overnight Progress — 2026-09-03

Status: **DURABLE HANDOFF — FAMILY 1 CLOSED**

This is a sanitized operational checkpoint created after the autonomous Codex session exhausted quota. Use it together with `CURRENT_STATUS.md` and `APATHY_CORE_PIPELINE_HANDOFF_20260903.md`. Current Production/runtime remains authoritative.

## 1. Most important verified overnight result — Step 3 / Full runtime blocker CLOSED

The previously failing Full run was retried after the helper/snapshot runtime work.

Production run ledger now shows the same Full run progressed as follows:

- Step 1 Event: PASS
- Step 2 Participant: PASS
- earlier Step 3 retries: `OUTPUT_SNAPSHOT_CAPTURE_FAILED`
- final overnight Step 3 retry: PASS
- Step 4 Output: PASS
- Full final status: **SUCCEEDED**
- checkpoint committed: **yes**
- direct Boss/Admin publication completed and verified by the runner

Therefore the Step-3 snapshot/runtime blocker is no longer an active blocker. Do **not** start the next session from the old assumption that Step 3 is still failing.

The private helper implementation was subsequently reconciled from current live source and documented: normal snapshot capture uses native sheet cloning; per-column reconstruction remains only on rollback restore.

## 1A. Boss Family 1 — Production accepted

- Applicability-invalid HC PD-only and LEDD placeholders no longer publish as scientific zeros; legitimate applicable PD zero values remain.
- Negative QUIP/QUIP-RS Positive Domains blanks are expected and warning-free, while positive-domain values remain published.
- QA is sparse, clears stale APATHY notes/backgrounds, touches data rows only, and uses human-readable first-line notes.
- The unused `Sequence_Recorded` Boss projection was retired; Boss is now 89 columns while MRI sequence evidence remains upstream.
- All nonblank Boss MRI dates now display as `yyyy-mm-dd` without rewriting source evidence.
- Production Result/Decision-to-Boss and Output/Admin verification passed: 138 Boss rows and 27 Admin rows.

## 2. Admin after successful Full

Admin Slice A semantics survived the successful Full: current active rows are genuine `STAFF_DATA_ACTION` work rather than system-maintenance/trace-only rows.

The active count is no longer the old 11-row snapshot because new/current genuine gaps are present after the latest Full. Current inspected Admin has approximately 27 participant rows, concentrated in:

- whole Screening source missing / expected-not-received;
- Stage 2 item gaps;
- Clinical / UPDRS III item gaps;
- combinations of the above.

This is not a Slice-A regression merely because the count increased. The remaining open Admin problem is still Slice B readability/operability: visible `为什么` cells contain extremely long exact-item walls. Compact the visible summary while preserving exact detail in Trace/hidden technical evidence.

## 3. Boss Family 1 — closed

The applicability, QUIP/QUIP-RS expected-blank, QA presentation, dead-column and MRI display issues described in the earlier checkpoint are now repaired and Production-verified. The accepted evidence is recorded in section 1A and the canonical status/handoff documents. Do not reopen this family without new contradictory runtime evidence.

## 4. Participant report — feature family remains open

The old print/PDF-first workflow is superseded.

Current desired report product:

- staff enters numeric `P [start]` to `P [end]` range;
- one click downloads separate PNG files, one participant per file;
- participant-facing report never shows PID/SID;
- header uses trusted name + phone where exact-linked;
- filename uses phone/name and never PID;
- real visible horizontal bars;
- missing metric remains `待确认` with no fabricated fill;
- MRI date must not masquerade as a report-wide assessment date;
- do not use misleading broad categorical labels such as calling an extremely low relative position `一般` unless a defensible accepted threshold contract exists; if not, remove the label and keep the bar + explanatory footer;
- risk adjustment remains `待确认` until accepted mapping exists.

A prior local/private report patch fixed the disabled print button and later report PNG work was being developed, but quota exhaustion occurred before a durable final report closeout was recorded. Refresh current live report source and verify actual deployed state before assuming the PNG feature is complete.

## 5. MRIadmin / UBSN

No overnight implementation closeout was recorded before quota exhaustion.

Existing verified inventory remains:

- MRIadmin preference/assistance evidence already exists in Screening Raw/Event/Participant;
- MRI Time has 18 legacy booking rows;
- 14 have exact unique current Participant identity matches and are safe candidates for idempotent BOOKED adoption;
- 4 require reconciliation (3 only suggestible through Contactlist, 1 noncanonical Subject No.);
- existing MRI Time rows must remain unchanged;
- local UBSN consumer exists;
- Production still needs MRI operational-state producer + Admin/waiting snapshot + human-confirmed BOOKED writeback.

## 6. Current-data rescue

Do not reopen the broad historical 108-participant audit.

Important current lesson: old `BACKEND_REPAIR` diagnosis rows were proven capable of being false-positive/stale while Boss already contained the result. A diagnosis row is not itself evidence that data need rescue.

For real current rescue, compare current formal evidence -> Participant -> Result -> Boss and repair the first true break.

The HC LEDD placeholder publication bug above is a real current downstream semantic bug and belongs in the Boss/Result publication family, not historical re-entry.

## 7. Frontend payload hygiene / JSON recovery / deep links / contraction

Still open:

- route-owned payload filtering for shared `ST.answers` / global derived pollution;
- structured JSON exact-field recovery;
- contextual deep links from Admin to the relevant participant/form/section;
- Incremental/materialization/script slimming after daily correctness is stable.

## 8. Hard preservation rule

User's overnight red line:

- **NEVER delete Raw, Raw rows, or Raw cells as cleanup.**
- Do not mass-overwrite Raw.
- Do not fabricate scientific values.

Downstream derived/candidate/output layers may be repaired/rebuilt as needed.

## 9. Recommended next write order

1. **Participant report family**
   - refresh live state;
   - finish/verify numeric range -> separate PNG downloads + privacy/header/bars/date/label rules.

2. **Admin Slice B**
   - compact summaries + preserve exact detail.

3. **MRIadmin -> UBSN / BOOKED**.

4. **Frontend payload hygiene**.

5. **JSON recovery + contextual deep links**.

6. Performance/materialization contraction only after the above.

## 10. Current agent state

Boss Family 1 is deployed, Production-verified and documented. No blocker remains in this family.
