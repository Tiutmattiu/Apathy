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

Historical Contactlist MRI notes and manually maintained MRI lists exist because this workflow was unfinished. They are workarounds, **not inputs/authorities for the new MRIadmin scheduling engine**.

Correct direction:

`Screening MRIadmin -> resolved Participant state -> Admin / UBSN -> human-confirmed booking -> APATHY BOOKED state -> write MRI Time`

UBSN live calendar monitoring and persistent login are already working. Do not modify the UBSN calendar parser.

## One deliverable

Make current Screening MRIadmin information operationally visible and usable without reading Contactlist or a manual MRI list.

Use current resolved `_Candidate_Participant_State` / existing Participant-state functions as the source. Do not rescan Raw when a resolved current state is already available.

For each current resolved participant:

1. determine whether the participant is currently eligible/ready for MRI scheduling from current APATHY Participant/workflow state;
2. extract MRIadmin month + weekday + AM/PM preferences and assistance/remark fields from current Participant state;
3. derive only:
   - `WAITING` — ready for MRI scheduling + usable preference exists;
   - `PREFERENCE_MISSING` — ready for MRI scheduling + no usable preference;
   - `NOT_ACTIONABLE` — excluded, withdrawn, pending/not-ready, or otherwise no MRI scheduling action now;
4. merge the MRI task into the existing one-PID-per-row Admin output without removing other problems;
5. expose the same `WAITING` rows through the backend UBSN waiting producer using `availability_windows` from `tools/ubsn/BACKEND_WAITING_CONTRACT.md`.

Do **not** add `BOOKING_READY` persistence in this patch unless the current code already has a trivial natural place for it. Do **not** implement MRI Time writeback in this patch; that is the next narrow patch after staff visibility + waiting producer work.

## Admin behavior

Keep one PID per Admin row.

- `WAITING` -> `需要預約 MRI` + concise Screening MRIadmin preference/assistance summary.
- `PREFERENCE_MISSING` -> `需要補 MRI 可用時間`.
- `NOT_ACTIONABLE` -> no MRI scheduling task.

Preserve all existing non-MRI problems for that participant.

Withdrawal alone remains non-actionable. Blank MRI preference is never unrestricted availability.

## MRIadmin preference handling

Preserve combinations exactly. Example: Tuesday AM + Thursday PM must remain two distinct windows; never widen to Tuesday/Thursday all day.

Convert Screening month/daypart values into `availability_windows` only. AM/PM clock boundaries should use one project-level config/rule, not participant-specific hardcoding.

Include only scheduling-relevant operational fields in the staff summary, such as pickup, wheelchair/access, companion, and MRI admin remark.

## Explicit non-goals

- no Contactlist read;
- no manual MRI-list read;
- no MRI Time read/write in this patch;
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

Deploy the narrow backend/Admin change.

Use one output rebuild only if the current Admin architecture requires it. Do not run Full.

Verify read-only with only a few real rows:

1. one included/ready participant with stored MRIadmin preference -> Admin `需要預約 MRI`;
2. same participant appears in UBSN waiting producer with truthful structured windows;
3. one ready participant with no usable MRIadmin preference -> `需要補 MRI 可用時間`;
4. one excluded/pending/withdrawn/non-ready participant -> no MRI scheduling task.

Stop after this works.

## Next separate patch

After this patch is accepted:

`human confirms UBSN booking -> record APATHY BOOKED state/evidence -> write confirmed slot to MRI Time -> MRI Admin task resolves`

MRI Time is the generated staff-visible booking ledger/output, not the upstream waiting authority.