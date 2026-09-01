# APATHY MRI Admin / Scheduling Workflow

Date: 2026-09-01
Status: corrected product contract / implementation target

Purpose: finish the MRIadmin workflow that already begins in Screening. Screening MRIadmin is the upstream source for participant availability/needs. Staff should receive an Admin scheduling task automatically, UBSN should match the participant's stored preferences to live facility availability, and confirmed bookings should coexist safely with the existing manually maintained `MRI Time` ledger.

Privacy: this public specification must not contain participant names, phone numbers, private workbook values, credentials, or Production-only identifiers.

## 1. Proven current state

Read-only Production inspection on 2026-09-01 established that MRIadmin is **not being lost at submission or current Participant state**:

- Screening submits the MRIadmin fields in `screening_core`;
- `screening_raw.payload_json` contains them;
- `_Candidate_Event_Values` preserves them as formal payload values;
- resolved `_Candidate_Participant_State.state_json` already contains MRIadmin month/daypart preferences, assistance flags and remarks for many current participants.

`_Candidate_Field_Provenance` does not currently project these operational fields, but the scheduling feature does not require a scientific provenance redesign. The existing resolved Participant state is sufficient as the v1 current-state source.

The actual missing feature is **operational projection**: current Participant MRIadmin information is not turned into staff scheduling tasks or a UBSN waiting queue, and confirmed booking state is not yet integrated safely with the existing `MRI Time` ledger.

Historical Contactlist MRI notes and manually maintained MRI waiting lists existed because this loop was unfinished. They are workarounds, not authorities for participant availability/eligibility in the finished feature.

The existing `MRI Time` sheet is different: it is an actively staff-maintained booking ledger and must be preserved non-destructively during migration.

## 2. Authority model

### Screening MRIadmin / resolved Participant state

Screening is the authoritative upstream source for participant-provided MRI scheduling information: preferred months, weekday/daypart availability, transport/access needs, companion information and MRI administrative remarks.

Once identity is resolved, the current Participant state is the operational read source for these preferences/needs in v1. Do not rebuild a second phone/name identity matcher and do not rescan Raw when the resolved current state already contains the data.

### Admin

Admin owns **what staff must do next**.

A participant who is currently ready for MRI scheduling should automatically receive one MRI scheduling problem merged into that participant's existing Admin row.

### UBSN helper

UBSN consumes the derived waiting rows from the same current Participant MRIadmin state and matches them against live Human MRI availability.

UBSN must not read Contactlist or a manually maintained MRI waiting list as scheduling authority.

### MRI Time

`MRI Time` is the staff-visible booking ledger. It already contains manually maintained operational booking records and **must not be cleared, rebuilt, replaced, reordered as a generated cache, or have existing rows overwritten by the new feature**.

The new system should be layered onto this ledger:

- existing manual rows remain intact;
- confirmed existing bookings may be read/reconciled as human-entered booking evidence;
- APATHY should adopt/link valid existing booking rows into durable `BOOKED` state/evidence so already-booked participants do not re-enter the waiting queue;
- after staff completes the human CAPTCHA/final confirmation in UBSN and explicitly records BOOKED, APATHY should persist the booking state/evidence and either link an already-identical MRI Time row or append the new normalized booking row;
- automatic writes must be narrow and idempotent, never whole-sheet regeneration.

`MRI Time` may therefore participate in **booking reconciliation**, but it is not the source used to infer MRI eligibility, participant availability, assistance needs, or waiting priority.

### Contactlist / historical manual MRI waiting lists

Do not use these as inputs to the new MRIadmin scheduling engine. They exist because staff previously had to copy and maintain information manually.

The finished workflow should remove that duplicate waiting-list work rather than canonize it.

## 3. Minimal operational states

Keep v1 small:

- `WAITING`: participant is currently ready for MRI scheduling, has usable MRIadmin preference, and has no adopted/recorded confirmed booking.
- `PREFERENCE_MISSING`: participant is currently ready for MRI scheduling but usable MRIadmin preference is absent/incomplete.
- `BOOKED`: a human-confirmed facility booking has been recorded by APATHY or safely adopted from an existing valid manual `MRI Time` row.
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

If reconciliation finds more than one conflicting future booking for the same participant, or a manual row cannot be safely linked to one participant, create a concise staff reconciliation problem instead of overwriting any row or guessing.

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

## 6. Non-destructive MRI Time coexistence rules

The rollout must preserve the current manually maintained `MRI Time` sheet as operational history and a staff surface.

Hard rules:

- no whole-sheet `clear`, rebuild, replacement, or sort-as-regeneration;
- no deletion of existing manual booking rows;
- no rewriting existing admin/remark/status text merely to normalize it;
- no assumption that an old row is wrong because its formatting/status text differs from the new schema;
- exact existing rows should be treated as immutable evidence unless a staff member explicitly edits them;
- new APATHY writes should append/link narrowly and should carry enough source/evidence metadata internally to distinguish `manual_existing`, `manual_new`, and `apathy_ubsn_confirmed` origins;
- if the same participant + start + end already exists, adopt/link it instead of creating a duplicate;
- if the same participant has a different active/future booking, stop and surface a reconciliation problem rather than overwriting;
- historical/past rows remain historical and are never removed by current-state generation.

The preferred migration pattern is:

```text
existing manual MRI Time rows
  -> read-only reconciliation / identity resolution
  -> create/adopt APATHY BOOKED evidence where unambiguous
  -> leave MRI Time rows unchanged
  -> build WAITING queue only after adopted bookings are known
```

After migration, staff may continue to enter a booking manually in `MRI Time` during transition. Such a row should be explicitly reconciled/adopted into APATHY booking evidence before it suppresses/updates the participant's durable scheduling state. This keeps manual work safe without turning the whole sheet into the authority for preferences or eligibility.

## 7. Correct implementation sequence

Functionality first.

### Patch 0 — safe legacy booking adoption

Before enabling automatic MRI scheduling tasks broadly:

1. read existing `MRI Time` rows without modifying them;
2. resolve Subject No. through existing Registry/participant identity authority;
3. identify unambiguous existing confirmed/current booking rows;
4. adopt those bookings into APATHY `BOOKED` state/evidence idempotently;
5. leave every `MRI Time` row/cell unchanged;
6. surface ambiguous/conflicting rows for staff review rather than guessing.

Do not use `MRI Time` to infer participant preference, eligibility, or unrestricted availability.

### Patch 1 — operational projection

Use current resolved Participant state for scheduling need/preferences, plus adopted APATHY booking state to avoid duplicate scheduling:

1. determine whether each participant is currently eligible/ready for MRI scheduling from current APATHY Participant/workflow state;
2. extract current MRIadmin fields from Participant state;
3. check durable/adopted APATHY booking state;
4. derive `WAITING`, `PREFERENCE_MISSING`, `BOOKED`, or `NOT_ACTIONABLE`;
5. surface the MRI problem in Admin;
6. expose the same `WAITING` rows through the read-only UBSN waiting producer.

Do not read Contactlist or manual MRI waiting lists to construct this queue.

### Patch 2 — confirmed booking writeback

After human confirmation:

```text
UBSN candidate
  -> staff prepares booking
  -> human CAPTCHA + final UBSN confirmation
  -> explicit BOOKED outcome
  -> APATHY records booking state/evidence
  -> link identical existing MRI Time row OR append one new row
  -> Admin MRI task resolves
```

Use one narrow write function conceptually:

`recordMriBooking(pid, start, end, admin, remark, source)`

Rules:

- human-confirmed booking only;
- resolve Subject No. through existing Registry/participant identity authority;
- preserve current MRI Time sheet structure and existing rows;
- write only the one normalized new row when an identical row does not already exist;
- idempotent for same participant + start + end;
- never overwrite a conflicting future booking; surface reconciliation instead;
- no Contactlist writeback required;
- no Raw rewrite;
- no scientific Result/Boss changes.

## 8. UBSN integration

The local UBSN calendar/parser/session path is already live-working. Do not reopen it while building the backend producer.

UBSN should receive only the normalized waiting snapshot derived from current Participant MRIadmin state and APATHY booking state. `tools/ubsn/BACKEND_WAITING_CONTRACT.md` is the consumer contract.

## 9. Acceptance boundary

MRIadmin v1 is usable when:

- all pre-existing manually maintained `MRI Time` rows are still present and unchanged after rollout;
- existing valid manual bookings can be adopted into APATHY `BOOKED` evidence without duplicating rows;
- staff automatically sees an eligible unscheduled participant's MRI task in Admin;
- Admin displays the participant's actual Screening MRIadmin availability/assistance summary;
- missing preference creates `需要補 MRI 可用時間`, not unrestricted availability;
- UBSN consumes exactly the same waiting state without a second manual waiting list;
- after human-confirmed facility booking, APATHY records BOOKED and links/appends the slot in `MRI Time` non-destructively;
- the corresponding Admin MRI scheduling task resolves;
- staff can still inspect/use `MRI Time` as the familiar booking ledger;
- staff no longer needs to duplicate MRI scheduling preferences into Contactlist/manual waiting lists.