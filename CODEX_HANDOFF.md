# Codex handoff — Operations vNext vertical slice

Timestamp: 2026-08-27 17:40 +08:00
Branch: `codex/ops-vnext-vertical-slice`

## Commits

- `7549381d3c6b4ff4d40564af24dc3e9ee63e97cb` — backend source-sync contract and first Operations contract test
- `36342f3a80cba2541a1bcb68ef33dd16127260f7` — production-staging test support
- `2bb8483e8ca31e3bc115582152a95aca02ac79f3` — matcher regression guard from real runtime finding
- `af53b127647239c664e7662f73058f9ecbfcc51d` — Trace participant-view contract
- `49af19003533b80d3ff77b015a66bcd91b7b872f` — batched Boss scan-write contract

Private Apps Script backend source is intentionally not committed to this public repository.

## Files changed

Public repository:

- `BACKEND_SOURCE_SYNC.md`
- `tools/compare-backend-source.ps1`
- `tests/apps-script/ops-vnext-contract.test.js`
- `CURRENT_STATUS.md`
- `CODEX_HANDOFF.md`

Reviewed Production Apps Script change set:

- `diagnosis.gs` — shared diagnosis classifier, Admin action mapping, indexed Boss scan, batched formatting/notes
- `trace.gs` — shared diagnosis use, participant search/overview/views, safe lineage navigation; selected-cell entrypoint preserved
- `output.gs` — diagnosis summary, hidden action/diagnosis columns, read-only archive preview, hardened Record_Control write
- `helper.gs` — participant search and confirmation-first identity-resolution menu integration
- obsolete participant-specific diagnostic entry removed

All other live Apps Script files were staged from a fresh pull and remained byte-identical. Event, Participant, Result, Receiver, Backfill, legacy calculation sources, and manifest were not edited by this work.

## Implemented

- One shared deterministic diagnosis vocabulary for Boss, Trace, and Admin.
- Applicability-aware blank classification; unsupported/low-confidence fields remain `UNKNOWN` and do not create speculative tasks.
- Boss blank coloring and concise notes without modifying values or the 90-column schema.
- Aggregate, sanitized Output diagnosis counts.
- Existing selected-cell Trace retained.
- Participant-first search by P_ID, S_ID, or name, with suspicious blanks, all blanks, current values, and field drill-down.
- Safe navigation to allowed lineage sheets/rows.
- Admin action classes: `RESOLVABLE_IN_APP`, `STAFF_DATA_ACTION`, `TRACE_ONLY_NO_ACTION`, `ESCALATE`.
- Read-only preview and explicit confirmation before the existing Record_Control identity authority write.
- Operator/timestamp recording when the existing control schema provides those columns.
- Durable live/local inventory and SHA-256 reconciliation workflow.

## Deliberately not implemented

- No Raw rewrite, fake participant, scientific-rule change, identity redesign, Participant Phase 5B change, Incremental enablement, or migration.
- No automatic/fuzzy identity merge.
- No new real identity assignment was made during this cycle because no participant-to-submission authority decision was supplied. The write path itself was already accepted; the new Production preview completed read-only.
- Broader Admin lifecycle/action domains and full UI polish remain product work; Admin is not marked complete.

## Tests and runtime evidence

- `node --check` on all reviewed/staged Apps Script files: PASS.
- `node tests/apps-script/ops-vnext-contract.test.js backend-production-stage`: PASS.
- `node tests/apps-script/output-m0-contract.test.js backend-production-stage/output.js`: PASS.
- Source-sync script fixture (`SAME`, `LIVE_ONLY`, `CANDIDATE_ONLY`): PASS.
- Pre-push live re-pull versus reviewed baseline: all files SAME.
- Post-push live re-pull versus complete staging package: all files SAME.
- Production read-only Admin archive preview: PASS.
- Production empty-query Trace search endpoint: PASS.
- Production Output acceptance after correction: PASS.
  - Boss exists, 90 columns, expected row count, legal/unique PID: PASS.
  - Admin headers, expected row count, human-action fields: PASS.
  - Boss scan value-preservation guard: PASS.
  - Aggregate diagnosis summary returned without participant identifiers.

The first Production Output run failed on an incorrect matcher argument. The Output rollback wrapper ran, the defect was reduced to one call, a regression assertion was added, and later Production runs completed successfully.

## Authoritative execution reconciliation

- The Apps Script Executions page classifies the latest corrected `buildApathyOutput` execution as **Completed**, not timed out.
- Start: 2026-08-27 04:14:53 +08:00; duration: 48.55 seconds.
- The immediately preceding post-fix execution also completed; the earlier matcher-defect execution is recorded as Failed.
- The successful result verified the published Boss/Admin pair and returned only aggregate counts: Boss 132 rows, Admin 50 rows.
- The earlier failed execution returned the rollback-wrapper error only after both visible output snapshots had been restored. No blind rerun was performed during this reconciliation.
- This was a direct Output acceptance call, not a staged `continueApathyCandidateFull('OUTPUT_CORE')` call. It therefore does not advance or commit the staged-run checkpoint/state; no checkpoint mutation was expected from this acceptance run.

Classification: **SUCCESS**. It is not an explicit failure, timeout-with-rollback, or unknown run.

## Performance

- Technical source sheets are read once into in-memory indexes per Output scan; there is no Boss-cells-times-full-history rescan.
- Boss backgrounds and notes are written as two matrix operations, not one Sheets call per cell.
- The accepted real-workbook run completed within the normal Apps Script execution window.
- The 48.55-second authoritative execution confirms that the indexed scan plus batched background/note writes resolved the runtime-cost risk. The public regression contract rejects a return to per-cell formatting writes.

## Phase 5B rollback-harness compatibility

- Existing private/uncommitted rollback-harness work was preserved in the local private backend.
- It was not copied into Production. Production helper staging was based on a fresh live pull with only the reviewed Operations menu additions.
- No overlap altered Participant Phase 5B semantics.

## Production actions executed

- Verified target and environment separation privately.
- Created an immutable pre-change Apps Script rollback version.
- Pushed the complete reviewed source package.
- Ran reversible derived Output acceptance, read-only Admin preview, and read-only empty-query Trace smoke checks.
- No Raw, Registry, Contactlist, Event, Participant, Result, Decision, or scientific-rule mutation was performed by this task.

## Remaining blocker

No code or Production-runtime blocker remains for this vertical slice. A new real orphan-resolution write still requires a human-authorized participant/submission match; the system must not invent that authority decision.

Repository delivery succeeded: GitHub device authentication completed, `codex/ops-vnext-vertical-slice` was pushed with all nine original commits intact, and the remote tip matched the local tip before the later `origin/main` reconciliation.

The branch was then merged with current `origin/main` using a normal merge commit. Existing Operations commits were neither rewritten nor squashed. Public contract tests were rerun before the reconciled branch push.

The successful direct Production Output acceptance does not prove the staged Phase 5B Step 3/Step 4 runner rollback contract. That remains a separate release-validation boundary; it is not an unfinished part of the installed Operations vNext search/scan slice.

## Next human action

Reload the Production spreadsheet, confirm the refreshed menu, inspect several colored Boss blanks with selected-cell Trace, and use the confirmation preview on the next legitimately resolved identity-review item. Cancel if the match is ambiguous; cancellation makes no write. After a confirmed write, run the supported Full rebuild from Step 1 and verify the Admin item closes.

## Next Codex task

After staff acceptance, address only concrete usability defects from the real scan/search flow. Do not reopen scientific logic or Phase 5B semantics. If expanding Admin, add one evidence-backed action class at a time through the shared diagnosis resolver.

## Exact-field diagnosis reconciliation

The current live source was freshly pulled before each write and reconciled against the reviewed package. Unrelated live manifest state was preserved. Immutable rollback versions 51, 52, and 53 cover the bounded corrective iterations. Final post-run remote hashes match the reviewed package.

Private Apps Script changes remained limited to `trace.gs`, `diagnosis.gs`, and `output.gs`:

- `traceFieldSpec_()` now maps each supported Boss field to exact Result, Medication, Decision, Participant, and formal payload aliases. PD-only applicability is explicit, and absent PD-clinical evidence remains non-actionable for applicable PD rows.
- `traceLeafMatches_()` accepts only exact/wildcard mapped formal, present Event leaves; unrelated fields in the same domain no longer count.
- `traceAuthorityFields_()` and `traceDiagnose_()` use exact field authority. Generic MoCA review status is not age authority, formal-source absence cannot be hidden by a generic review, and an exact Result value can still expose a Boss publication break.
- `apathyDiagnosisScanBoss_()` reuses the shared exact-field diagnosis in one indexed pass and writes background/note matrices only for Boss data rows 2:N.
- `apathyOutputRestoreBossHeaderStyle_()` restores the dedicated dark-blue, white, bold Boss header after Output and rollback. Boss headers and scientific values are unchanged.

Public hostile regression coverage now proves:

- exact medication/final-source authority is evaluated independently of unrelated medication fields;
- a missing formal Screening age source breaks at `FORMAL_SOURCE`;
- HC rows treat PD-only duration, stage, medication, motor, and apathy fields as non-applicable;
- numeric zero is resolved, not blank;
- exact Result evidence can expose a publication break while unrelated domain evidence cannot;
- generic review status cannot replace exact source or authority evidence;
- Boss scanning remains indexed/batched, data-row-only, and preserves the 90-column/value contract.

### Production acceptance

The final authoritative `buildApathyOutput` execution completed in 40.194 seconds. Output and post-write verification both passed:

- Boss: 132 rows, exactly 90 columns, expected row count, legal and unique PID checks all PASS.
- Admin: 49 rows, headers, expected row count, and human-action checks all PASS.
- Boss header style was visually verified after Output.
- The built-in Boss value-preservation guard passed; no scientific value was changed by diagnosis/Admin generation.
- Real-workbook spot checks passed for the medication-authority case, missing-Screening age case, HC PD-only case, and a numeric-zero value.

Aggregate diagnosis counts (no participant identifiers):

| Classification | Before exact-field patch | Rejected first patch | Final accepted |
| --- | ---: | ---: | ---: |
| `REVIEW_OR_AUTHORITY_GATED` | 113 | 199 | 176 |
| `UNKNOWN` | 2056 | 3057 | 3123 |
| `RESULT_EXISTS_BOSS_PUBLICATION_BREAK` | 308 | 184 | 202 |
| `NO_FORMAL_SOURCE` | 136 | 236 | 175 |
| `SOURCE_EXISTS_PARTICIPANT_BREAK` | 894 | 23 | 23 |
| `NON_APPLICABLE` | 404 | 322 | 322 |
| `PARTICIPANT_EXISTS_RESULT_GATE` | 111 | 1 | 1 |

The rejected patch increased `NO_FORMAL_SOURCE` by 100 and was not accepted. The final correction reduced that to 175: +39 cells, under 1% of the 4,022 classified Boss cells, while Admin decreased from 50 to 49 rows. There was no `NO_FORMAL_SOURCE` or staff-action explosion.

No offline reclassifier totals were used as expected Production labels. No Raw, identity, Participant, Result, Decision, Receiver, scientific, or 90-column Boss-value logic changed. Remaining unsupported semantics stay `UNKNOWN` and create no speculative staff action.
