# APATHY GLOBAL EXECUTION BOARD — 2026-09-03

Purpose: durable global roadmap so active workstreams and side branches are not forgotten while one family is being implemented.

Current operating model:
- ChatGPT = sheepdog / read-only diagnosis / integration mapping / acceptance / sequencing.
- Codex = surgeon / private-source edit / deploy / minimum private-runtime smoke check.
- Human = mechanical UI actions only when unavoidable.
- Copilot = not used for now.

Quota rule: `CODEX_QUOTA_EFFICIENCY_PROTOCOL_20260903.md` is active. Codex should spend most of its quota editing/deploying, not rereading broad docs, re-auditing known facts, or duplicating ChatGPT Production acceptance.

## COMPLETED / DO NOT REOPEN WITHOUT NEW EVIDENCE

- Historical 108-participant Boss forensic audit.
- Six exact historical source-gap recoveries.
- 38-PID historical repair campaign.
- Admin Slice A false system-maintenance admission cleanup.
- Step-3 snapshot/runtime blocker; later Full completed through Step 4 with checkpoint committed.
- Boss Family 1: applicability-aware PD-only publication, HC placeholder pollution fixed, legitimate zeros preserved, QUIP/QUIP-RS expected blanks fixed, sparse QA, `Sequence_Recorded` retired, Boss=89 columns, MRI date display normalized.
- Broad claim that BACKEND_REPAIR means data needs rescue: disproven; always compare current Participant/Result/Boss.

## ACTIVE NOW — FAMILY 2

### Unified APATHY Staff Console

ChatGPT read-only pre-op/integration mapping is complete.

Read: `STAFF_CONSOLE_INTEGRATION_MAP_20260903.md`.

Key implementation finding: reuse the existing public APATHY single-page frontend (`index.html` + `app.js`) as the one staff shell. Do **not** create another standalone Staff Console web app.

Current frontend already has:
- `home()` / `start(flow)` / `staffGate()` SPA routing;
- staff flows for Screening, Backfill, MRI visit, Clinical and UBSN;
- receiver GET/POST bridge;
- `renderUBSNAssistant()` inside the same interface.

Family-2 surgical target:
- replace ordinary staff dropdown with one `工作台` entry;
- add `staff_console` flow;
- add bounded receiver reads: `staff_search`, `staff_tasks`, `staff_participant`;
- use current `_Candidate_Participant_State` and Admin as read models; no new persistent table;
- participant workspace shows truthful current summary/tasks;
- wire the existing report launcher/tool without duplicating report scoring;
- wire current UBSN/MRI entry internally;
- do not expose pipeline/rebuild buttons in ordinary staff UX;
- keep helper out of this unless absolutely necessary.

Codex should do only edit/deploy/minimal smoke. ChatGPT owns post-deploy data/UX acceptance.

## FOLLOWING FEATURE FAMILIES

### Family 3 — Participant report complete product
- numeric P-range input;
- one separate PNG per participant;
- no PID/SID participant-facing exposure;
- name + phone header;
- no MRI date masquerading as generic assessment date;
- visible comparative bars;
- verify actual reference group;
- remove unjustified coarse labels if no accepted threshold contract;
- risk adjustment remains TBD unless accepted mapping exists;
- real HC + PD acceptance;
- live under the Staff Console rather than as a remembered standalone URL.

### Family 4 — Admin Slice B + action UX
- compact visible task summaries;
- exact missing-item detail preserved in Trace/hidden evidence;
- no fake Execute on ordinary missing-data tasks;
- contextual participant/form/section actions;
- recovery entry point;
- ordinary workflow through Staff Console, not direct Admin-sheet use.

### Family 5 — MRIadmin -> operational state -> UBSN -> BOOKED
- adopt exact legacy MRI Time bookings idempotently;
- ambiguous rows -> reconciliation;
- WAITING / PREFERENCE_MISSING / BOOKED / NOT_ACTIONABLE;
- preserve submitted scheduling windows;
- Admin + UBSN waiting producer;
- human final booking/CAPTCHA;
- durable APATHY BOOKED writeback;
- stop routine MRI Time duplication.

### Family 6 — Frontend payload ownership + route-safe deep links
- stop shared `ST.answers` / global-derived leakage;
- route-owned applicable payload fields;
- valid zero preserved;
- contextual participant/form/section navigation;
- historical Raw untouched.

### Family 7 — Structured JSON exact-field recovery
- partial JSON recovery;
- validate participant/form/field/type/range/conflicts;
- preview exact changes;
- preserve stronger evidence;
- audited recovery/backfill path;
- targeted refresh;
- Staff Console/Admin integration.

### Family 8 — Current-data contamination patterns
- only current concrete default/promotion anomalies;
- formal evidence -> Participant -> Result -> Boss;
- mechanism-wide fixes only;
- no broad 108-person re-audit.

### Family 9 — Performance / materialization / helper contraction
Only after ordinary workflow correctness stabilizes:
- repeated full-sheet reads;
- huge fingerprints/materializations;
- oversized technical sheets on hot paths;
- dead code/output projections;
- helper responsibility contraction;
- no architecture rewrite for aesthetics;
- never delete Raw.

## Human-interface destination

```text
ONE APATHY STAFF CONSOLE
  -> search participant
  -> process tasks
  -> generate reports
  -> handle MRI
  -> contextual recovery/data completion
```

Spreadsheet tabs and pipeline rebuild controls become backend/advanced-maintenance surfaces, not routine staff interfaces.

## Preservation rules

- NEVER delete Raw, Raw rows, or Raw cells.
- Do not mass-overwrite Raw.
- Do not fabricate research values.
- Do not expose participant-identifying Production data in public GitHub docs.
