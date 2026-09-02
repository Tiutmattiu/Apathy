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

## CURRENT NARROW CLOSEOUT FINDINGS

- Substantive CGT values are visible again; broad CGT repair is not active.
- The remaining historical MRI-date case is already present in current Participant state and Result A; the visible Boss value requires targeted republish, not another trace or Backfill.
- `apathyOutputAdmin_()->add()` currently computes `TRACE_ONLY_NO_ACTION` but can still push those rows into active Admin. Intended narrow fix: suppress them from active Admin.
- The current `inc==='n'` participant-action branch can generate `NON_INCLUDED_CONTACT_CLOSEOUT`; non-inclusion/withdrawal alone must return without active staff work.

## FULL STEP 3

The current Full run repeatedly encounters Spreadsheet-service timeout around Result Core. This is not proven to be a semantic/scientific regression: the same runner version has completed Step 3/Full before. Treat as a runtime/Spreadsheet-I/O/performance-sensitive blocker and do not reopen established scientific semantics merely because Full is slow/failing.

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

## PARTICIPANT REPORT

Preview is working. Remaining task is the existing Apps Script print/save-PDF path only; do not reopen scientific payload/scoring unless required by concrete evidence.

## AGENT ROUTING

- **ChatGPT:** default for read-only Production inspection, source/history reconciliation, precise web/research work, product contract and narrow implementation packets when access is sufficient.
- **Copilot/local heavy worker:** preferred for long/token-heavy mechanical audits and large offline scans, especially when local/network constraints make simultaneous GPT/Codex use impractical.
- **Codex:** primarily after direction/root cause is narrowed: precise code edits, precise tests, narrow reconnaissance requiring private repo/runtime access, deployment/runtime verification. Broad Codex audit only when the problem is genuinely unknown and GPT/Copilot lack the needed access.
- **Human:** research/identity authority, approval of Raw corrections, ambiguous real-world MRI decisions, minimal safe runtime actions and final UBSN confirmation.

## ANTI-RATIONALIZATION RULES

- Synchronized canonical MD is usable; stale historical MD is not current truth.
- Boss blank != source missing.
- Known diagnosis != permission to re-audit everything.
- Narrow defect != new persistent technical table.
- Raw is preserve-by-default, not absolutely immutable: only human-approved targeted corrections may change it.
- Staff re-entry is allowed but existing evidence comes first; true loss should be field-specific and support structured/JSON recovery.
- MRI Time is transitional history, not future MRI authority.
- Contactlist MRI note is neither authoritative nor useless: it is a human operational reconciliation signal.
- MRI scheduling remains human-in-the-loop.
- FAST PATCH overrides broad planning/audit workflows when the requested change is already explicit.

## CURRENT MAINLINE

1. Complete the narrow Admin fixes and targeted remaining MRI-date republish/verification.
2. Stabilize Step-3 runtime without redesigning scientific semantics.
3. Reconcile Boss diagnosis/color/action presentation.
4. Fix frontend route-owned payload hygiene.
5. Build electronic MRIadmin Participant-state -> Admin/UBSN human-in-loop scheduling and migrate/reconcile legacy MRI Time; stop routine MRI Time updates after cutover.
6. Fix participant-report print path in the separate report thread.
7. Optimize Incremental / technical contraction only after correctness and daily operations are stable.

## OPERATING RULES

- Functionality first; evidence path first; scaffolding second.
- No participant-specific hardcoding.
- No new persistent data layer for a narrow repair.
- `Inclusion=n` excludes from Boss; blank Inclusion does not itself exclude.
- Give Codex one narrow deliverable at a time.
- At verified task completion, synchronize canonical MD immediately.
