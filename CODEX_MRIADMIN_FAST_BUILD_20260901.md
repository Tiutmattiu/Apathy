# APATHY FAST BUILD MODE — MRIadmin operational projection

Run **after** the current CGT/P065/diagnosis repair finishes. Do not overlap that active repair.

## Established from read-only Production — do not re-audit

The MRIadmin data is **not currently being lost at submission or Participant state**:

- frontend Screening already submits `mri_avail_*`, `mri_need_*`, companion/access fields and `mri_admin_remark` in `screening_core`;
- Production `screening_raw.payload_json` contains those MRIadmin values;
- `_Candidate_Event_Values` preserves the MRIadmin payload paths as formal payload evidence;
- current resolved `_Candidate_Participant_State.state_json` already contains MRIadmin month/daypart preferences, assistance flags and remarks for many PIDs;
- `_Candidate_Field_Provenance` does not currently contain these operational MRIadmin fields, but that is **not a blocker** for this feature and must not trigger a provenance redesign.

Therefore the missing feature is **operational projection**, not ingestion recovery.

Historical Contactlist MRI notes and manually maintained MRI waiting lists are not inputs/authorities for participant availability/eligibility in the new MRIadmin scheduling engine.

However, the existing `MRI Time` sheet is an actively staff-maintained booking ledger. **Preserve it. Do not clear, rebuild, replace, reorder, or overwrite existing rows.** Existing manual bookings must survive rollout and should be adopted into APATHY booking evidence non-destructively when unambiguous.

Correct direction:

`Screening MRIadmin -> resolved Participant state -> APATHY scheduling state -> Admin / UBSN -> human-confirmed booking -> APATHY BOOKED evidence -> link/append MRI Time`

Existing `MRI Time` booking rows may be used only for **booking reconciliation/adoption**, never to infer eligibility, preferences, assistance needs, or waiting priority.

UBSN live calendar monitoring and persistent login are already working. Do not modify the UBSN calendar parser.

## One deliverable

Make current Screening MRIadmin information operationally visible and usable while preserving the current manual `MRI Time` ledger exactly.

Use current resolved `_Candidate_Participant_State` / existing Participant-state functions as the source for scheduling need/preferences. Do not rescan Raw when a resolved current state is already available.

### First: safe booking adoption

Before broadly generating new MRI waiting tasks:

1. inspect current `MRI Time` rows read-only;
2. resolve Subject No. through the existing Registry/participant identity authority;
3. for unambiguous existing confirmed/current bookings, create/adopt idempotent APATHY `BOOKED` evidence;
4. leave every existing `MRI Time` row and cell unchanged;
5. if a row cannot be safely linked, or one participant has conflicting future bookings, surface a concise reconciliation problem and do not guess.

No whole-sheet writes. No normalization rewrite of legacy rows. No deletions.

### Then: operational projection

For each current resolved participant:

1. determine whether the participant is currently eligible/ready for MRI scheduling from current APATHY Participant/workflow state;
2. extract MRIadmin month + weekday + AM/PM preferences and assistance/remark fields from current Participant state;
3. check APATHY booking evidence, including safely adopted existing manual bookings;
4. derive only:
   - `WAITING` — ready for MRI scheduling + usable preference exists + no confirmed booking;
   - `PREFERENCE_MISSING` — ready for MRI scheduling + no usable preference + no confirmed booking;
   - `BOOKED` — human-confirmed booking already recorded/adopted;
   - `NOT_ACTIONABLE` — excluded, withdrawn, pending/not-ready, or otherwise no MRI scheduling action now;
5. merge the MRI task into the existing one-PID-per-row Admin output without removing other problems;
6. expose the same `WAITING` rows through the backend UBSN waiting producer using `availability_windows` from `tools/ubsn/BACKEND_WAITING_CONTRACT.md`.

Do **not** implement automatic MRI Time writeback in this patch unless the booking-adoption mechanism already has a trivial safe place for the exact idempotency checks. The actual new-booking append is the next narrow patch after staff visibility + waiting producer work.

## Admin behavior

Keep one PID per Admin row.

- `WAITING` -> `需要預約 MRI` + concise Screening MRIadmin preference/assistance summary.
- `PREFERENCE_MISSING` -> `需要補 MRI 可用時間`.
- `BOOKED` -> no active scheduling task.
- `NOT_ACTIONABLE` -> no MRI scheduling task.
- ambiguous/conflicting existing booking -> concise staff reconciliation problem; do not overwrite MRI Time.

Preserve all existing non-MRI problems for that participant.

Withdrawal alone remains non-actionable. Blank MRI preference is never unrestricted availability.

## MRIadmin preference handling

Preserve combinations exactly. Example: Tuesday AM + Thursday PM must remain two distinct windows; never widen to Tuesday/Thursday all day.

Convert Screening month/daypart values into `availability_windows` only. AM/PM clock boundaries should use one project-level config/rule, not participant-specific hardcoding.

Include only scheduling-relevant operational fields in the staff summary, such as pickup, wheelchair/access, companion, and MRI admin remark.

## MRI Time hard safety rules

- existing manual rows are protected;
- no `clearContents`, whole-range replacement, regeneration, destructive sort, or delete-row logic against existing `MRI Time` data;
- do not rewrite existing admin / remark / status text simply to normalize it;
- same participant + same start + same end -> adopt/link existing row, never duplicate;
- same participant + conflicting active/future time -> stop and surface reconciliation;
- past rows stay as history;
- future automatic booking writeback must append one narrow row only when no identical booking row exists;
- keep source/evidence metadata internally so `manual_existing`, later `manual_new`, and `apathy_ubsn_confirmed` can be distinguished without altering legacy row content.

## Explicit non-goals

- no Contactlist read for waiting/eligibility/preference logic;
- no manual MRI waiting-list read;
- no destructive MRI Time rewrite;
- no Raw rewrite;
- no changes to frontend submission;
- no attempt to force MRIadmin into `_Candidate_Field_Provenance`;
- no new scientific scoring/Result/Boss rules;
- no participant hardcoding;
- no Full;
- no broad repo/doc audit;
- no rollback exercise;
- do not touch CGT/P065 repair paths.

## Deployment / verification

Deploy only after the active CGT/P065/diagnosis repair is finished.

Use one output rebuild only if the current Admin architecture requires it. Do not run Full.

Verify narrowly:

1. capture pre-change `MRI Time` row count/values for safety comparison;
2. run/adopt existing bookings;
3. verify all pre-existing `MRI Time` rows/cells are unchanged;
4. one included/ready participant with stored MRIadmin preference and no booking -> Admin `需要預約 MRI`;
5. same participant appears in UBSN waiting producer with truthful structured windows;
6. one ready participant with no usable MRIadmin preference -> `需要補 MRI 可用時間`;
7. one participant with an existing valid manual booking -> adopted `BOOKED`, no duplicate Admin scheduling task, no duplicate MRI Time row;
8. one excluded/pending/withdrawn/non-ready participant -> no MRI scheduling task;
9. if a conflicting booking case exists, verify it produces reconciliation rather than overwrite.

Stop after this works.

## Next separate patch

After this patch is accepted:

`human confirms UBSN booking -> record APATHY BOOKED state/evidence -> link identical existing row OR append one new MRI Time row -> MRI Admin task resolves`

`MRI Time` remains the familiar staff-visible booking ledger and preserved operational history. It is not the authority for participant preferences/eligibility, but confirmed manual rows may be adopted as booking evidence.