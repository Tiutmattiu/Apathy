# APATHY MRI Admin / Scheduling Workflow

Date: 2026-09-01
Status: corrected product contract / implementation target

Purpose: finish the MRIadmin workflow that already begins in Screening. Screening MRIadmin is the upstream source. Staff should receive an Admin scheduling task automatically, UBSN should match the participant's stored preferences to live facility availability, and a confirmed booking should be written to `MRI Time` automatically.

Privacy: this public specification must not contain participant names, phone numbers, private workbook values, credentials, or Production-only identifiers.

## 1. Proven current state

Read-only Production inspection on 2026-09-01 established that MRIadmin is **not being lost at submission or current Participant state**:

- Screening submits the MRIadmin fields in `screening_core`;
- `screening_raw.payload_json` contains them;
- `_Candidate_Event_Values` preserves them as formal payload values;
- resolved `_Candidate_Participant_State.state_json` already contains MRIadmin month/daypart preferences, assistance flags and remarks for many current participants.

`_Candidate_Field_Provenance` does not currently project these operational fields, but the scheduling feature does not require a scientific provenance redesign. The existing resolved Participant state is sufficient as the v1 current-state source.

The actual missing feature is **operational projection**: current Participant MRIadmin information is not turned into staff scheduling tasks, a UBSN waiting queue, or automatic MRI booking output.

Historical Contactlist MRI notes and manually maintained MRI lists existed because this loop was unfinished. They are workarounds, not authorities for the finished feature.

## 2. Authority model

### Screening MRIadmin / resolved Participant state

Screening is the authoritative upstream source for participant-provided MRI scheduling information: preferred months, weekday/daypart availability, transport/access needs, companion information and MRI administrative remarks.

Once identity is resolved, the current Participant state is the operational read source for v1. Do not rebuild a second phone/name identity matcher and do not rescan Raw when the resolved current state already contains the data.

### Admin

Admin owns **what staff must do next**.

A participant who is currently ready for MRI scheduling should automatically receive one MRI scheduling problem merged into that participant's existing Admin row.

### UBSN helper

UBSN consumes the derived waiting rows from the same current Participant MRIadmin state and matches them against live Human MRI availability.

UBSN must not read Contactlist or a manually maintained MRI waiting list as scheduling authority.

### MRI Time

`MRI Time` is the generated/staff-visible booking ledger output.

After staff completes the human CAPTCHA/final confirmation in UBSN and explicitly records BOOKED, APATHY should persist the confirmed booking state/evidence and write the booking to `MRI Time`.

`MRI Time` is not the upstream source used to decide who needs scheduling in the new workflow.

### Contactlist / historical manual MRI lists

Do not use these as inputs to the new MRIadmin scheduling engine. They exist because staff previously had to copy and maintain information manually.

The finished workflow should remove that duplicate work rather than canonize it.

## 3. Minimal operational states

Keep v1 small:

- `WAITING`: participant is currently ready for MRI scheduling and has usable MRIadmin preference.
- `PREFERENCE_MISSING`: participant is currently ready for MRI scheduling but usable MRIadmin preference is absent/incomplete.
- `BOOKED`: human-confirmed facility booking has been recorded by APATHY.
- `NOT_ACTIONABLE`: no MRI scheduling action is currently required.

A transient UBSN candidate can remain an action in the local helper and does not need to become a durable backend state in the first patch.

Withdrawal alone remains non-actionable and must not generate an Admin reminder.

Do not invent re-MRI state from Contactlist. A future re-MRI need must come from an explicit APATHY workflow/evidence path.

## 4. Admin task

For `WAITING`, Admin should show one participant-level MRI task:

- PID / Name;
- `需要預約 MRI`;
- concise preference summary from Screening MRIadmin;
- relevant pickup / wheelchair-access / companion flags and MRI admin remark;
- next action: open MRI Booking Assistant / arrange MRI.

For `PREFERENCE_MISSING`, show:

- `需要補 MRI 可用時間`;
- next action: update the participant's MRI scheduling information.

For `BOOKED` and `NOT_ACTIONABLE`, no active MRI scheduling problem should remain.

The MRI problem must be merged into the existing one-PID-per-row Admin model without deleting unrelated problems.

## 5. MRI preference representation

Do not collapse Screening MRIadmin into one broad `earliest_time/latest_time` window. Preserve month + weekday + daypart structure so combinations such as Tuesday AM and Thursday PM do not imply Tuesday PM or Thursday AM.

The UBSN waiting payload uses structured windows, e.g.:

```json
{
  "pid": "P0123",
  "mri_status": "WAITING",
  "wait_since": "2026-08-20",
  "availability_windows": [
    {"months": [9,10,11], "weekday": 1, "start": "09:00", "end": "12:00"},
    {"months": [9,10,11], "weekday": 3, "start": "13:00", "end": "18:00"}
  ],
  "minimum_duration": 90,
  "priority": 100
}
```

Blank preference must never be expanded to unrestricted availability.

AM/PM boundaries should use one project-level configuration/rule, not participant-specific hardcoding.

## 6. Correct implementation sequence

Functionality first.

### Patch 1 — operational projection

Use current resolved Participant state only:

1. determine whether each participant is currently eligible/ready for MRI scheduling from current APATHY Participant/workflow state;
2. extract current MRIadmin fields from Participant state;
3. derive `WAITING`, `PREFERENCE_MISSING`, or `NOT_ACTIONABLE`;
4. surface the MRI problem in Admin;
5. expose the same `WAITING` rows through the read-only UBSN waiting producer.

Do not read Contactlist, manual MRI lists, or MRI Time to construct this queue.

### Patch 2 — confirmed booking writeback

After human confirmation:

```text
UBSN candidate
  -> staff prepares booking
  -> human CAPTCHA + final UBSN confirmation
  -> explicit BOOKED outcome
  -> APATHY records booking state/evidence
  -> APATHY writes MRI Time
  -> Admin MRI task resolves
```

Use one narrow write function conceptually:

`recordMriBooking(pid, start, end, admin, remark, source)`

Rules:

- human-confirmed booking only;
- resolve Subject No. through existing Registry/participant identity authority;
- write the normalized MRI Time row according to current sheet convention;
- idempotent for same participant + start + end;
- no Contactlist writeback required;
- no Raw rewrite;
- no scientific Result/Boss changes.

## 7. UBSN integration

The local UBSN calendar/parser/session path is already live-working. Do not reopen it while building the backend producer.

UBSN should receive only the normalized waiting snapshot derived from current Participant MRIadmin state. `tools/ubsn/BACKEND_WAITING_CONTRACT.md` is the consumer contract.

## 8. Acceptance boundary

MRIadmin v1 is usable when:

- staff automatically sees an eligible unscheduled participant's MRI task in Admin;
- Admin displays the participant's actual Screening MRIadmin availability/assistance summary;
- missing preference creates `需要補 MRI 可用時間`, not unrestricted availability;
- UBSN consumes exactly the same waiting state without a second manual list;
- after human-confirmed facility booking, APATHY records BOOKED and writes the slot into `MRI Time`;
- the corresponding Admin MRI scheduling task resolves;
- staff no longer needs to duplicate MRI scheduling information into Contactlist/manual MRI lists.