# APATHY Overnight Progress — 2026-09-03

Status: **DURABLE HANDOFF AFTER CODEX QUOTA EXHAUSTION**

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

The exact private helper implementation delta was not durable-synced by Codex before quota exhaustion, so the next code-writing agent should refresh current live `helper.js` before documenting the final implementation detail. Runtime truth is clear: the Full completed successfully.

## 2. Admin after successful Full

Admin Slice A semantics survived the successful Full: current active rows are genuine `STAFF_DATA_ACTION` work rather than system-maintenance/trace-only rows.

The active count is no longer the old 11-row snapshot because new/current genuine gaps are present after the latest Full. Current inspected Admin has approximately 27 participant rows, concentrated in:

- whole Screening source missing / expected-not-received;
- Stage 2 item gaps;
- Clinical / UPDRS III item gaps;
- combinations of the above.

This is not a Slice-A regression merely because the count increased. The remaining open Admin problem is still Slice B readability/operability: visible `为什么` cells contain extremely long exact-item walls. Compact the visible summary while preserving exact detail in Trace/hidden technical evidence.

## 3. Boss semantics — current high-priority family is broader than colors

Fresh Production inspection proves the Boss issue is not merely cosmetic coloring.

### 3.1 QUIP / QUIP-RS expected blanks

When QUIP or QUIP-RS is negative with positive flag 0, `Positive_Domains` being blank is expected. Current Boss has examples where these expected blanks are colored red and labelled as Result/Boss publication breaks. That is a false-positive diagnosis.

Rule: applicability/expectedness before missingness.

### 3.2 HC medication / LEDD placeholder pollution

A current HC fixture proves:

- formal Raw/Event LEDD fields are absent/null;
- Participant state explicitly says medication/LEDD are `not_applicable`;
- Participant also contains internal zero-valued technical placeholders;
- Result A keeps hospital LEDD result fields blank/pending;
- Boss nevertheless publishes LEDD values as `0 / 0 / 0`.

Therefore the Boss currently turns internal/default placeholder zeros into scientific-looking values for HC participants. This is a **value-publication semantic bug**, not a valid zero and not merely a color bug.

Required repair family:

- PD-only medication/LEDD/HY/UPDRS-style fields must respect applicability;
- HC `not_applicable` must not become numeric 0 merely because internal helpers use zero placeholders;
- Raw must not be edited to solve this;
- fix downstream value selection/publication and then QA styling.

### 3.3 QA styling should be sparse and semantic

Current Boss is over-colored. Next repair should clear stale APATHY QA notes/backgrounds and reapply only current semantic findings.

Accepted direction:

- normal valid value (including a genuine valid 0) = white/no warning;
- expected blank / non-applicable = neutral/grey only when useful;
- genuine source gap = yellow;
- real review/authority gate = orange;
- identity unresolved = purple;
- upstream evidence/value exists but downstream loses it = red;
- expected QUIP/QUIP-RS negative-domain blank must not be red.

Do not color cells simply because they are blank.
Do not treat every nonblank value as valid either: applicability-invalid placeholder values such as HC LEDD=0 must be caught before presentation.

### 3.4 Sequence_Recorded retirement candidate

Current Production inspection of the entire populated Boss range found `Sequence_Recorded` empty for every participant. The user explicitly wants this unused column removed rather than kept as dead output.

This means the old “Boss must always remain 90 columns” assumption is superseded for the next Boss product cleanup. If current source confirms no consumer depends on the column, retire it and update the Boss contract accordingly (expected 89 columns after removal).

Do not remove Raw/source MRI sequence evidence if such evidence exists elsewhere; this is about the unused Boss output column only.

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

## 9. Recommended next write order when Codex quota returns

1. **Boss applicability/value + QA presentation family**
   - fix HC LEDD/default placeholder publication;
   - fix QUIP/QUIP-RS expected blank diagnosis;
   - clear/recompute QA styling sparsely;
   - retire unused `Sequence_Recorded` if current source confirms no consumer;
   - regenerate/verify Boss once as one family.

2. **Participant report family**
   - refresh live state;
   - finish/verify numeric range -> separate PNG downloads + privacy/header/bars/date/label rules.

3. **Admin Slice B**
   - compact summaries + preserve exact detail.

4. **MRIadmin -> UBSN / BOOKED**.

5. **Frontend payload hygiene**.

6. **JSON recovery + contextual deep links**.

7. Performance/materialization contraction only after the above.

## 10. Current agent state

Codex quota is exhausted. No further Codex work should be assumed tonight.

ChatGPT can continue read-only Production inspection, contract reconciliation, canonical documentation, and prepare exact implementation packets. Private Apps Script edits/deployments requiring Codex should wait for quota restoration unless another authorized write-capable agent is available.
