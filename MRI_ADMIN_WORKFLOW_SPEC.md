# APATHY MRI Admin / Scheduling Workflow

Date: 2026-09-01
Status: corrected product contract / implementation target

Purpose: finish the MRIadmin workflow that already begins in Screening. Screening MRIadmin is the upstream source. Staff should receive an Admin scheduling task automatically, UBSN should match the participant's stored preferences to live facility availability, and a confirmed booking should be written to `MRI Time` automatically.

Privacy: this public specification must not contain participant names, phone numbers, private workbook values, credentials, or Production-only identifiers.

## 1. Problem

MRI preference / assistance information is already collected during Screening, but that information has historically been swallowed by the unfinished MRIadmin workflow. Staff therefore compensated manually by maintaining MRI-related notes in Contactlist and manually maintaining MRI booking lists / `MRI Time`.

Those manual tables are workarounds, not authorities for the new feature.

The finished workflow must remove the need to copy Screening MRI information into Contactlist or a separate manual MRI waiting list.

## 2. Authority model

### Screening MRIadmin

Screening is the authoritative upstream source for participant MRI scheduling information collected during Screening, including preferred months, weekday/daypart availability, transport/access needs, companion information, and MRI administrative remarks.

The backend must preserve this information after identity resolution so it can be used operationally.

### Admin

Admin tells staff what needs to happen next.

After a participant's Screening MRIadmin information is accepted and the participant is ready for MRI scheduling, Admin should automatically show a concise MRI scheduling task with the participant's stored preference/assistance summary.

### UBSN helper

UBSN consumes the derived MRI waiting state from Screening MRIadmin and matches it against live Human MRI availability.

UBSN must not read Contactlist or a manually maintained MRI waiting list as scheduling authority.

### MRI Time

`MRI Time` is an output / staff-visible booking ledger.

After staff completes the human CAPTCHA/final confirmation in the UBSN booking flow, APATHY writes the confirmed booking into `MRI Time` automatically.

`MRI Time` is not the upstream source used to decide who needs scheduling in the new workflow.

### Contactlist / historical manual MRI lists

Do not use these as inputs to the new MRIadmin scheduling engine. They exist because the MRIadmin loop was previously incomplete and staff had to copy/maintain information manually.

Once the feature is working, staff should no longer need to maintain MRI availability or scheduling state there for this purpose.

## 3. Minimal operational states

Keep the state model small:

- `WAITING`: participant is ready for MRI scheduling and has usable MRIadmin preference.
- `PREFERENCE_MISSING`: participant is ready for MRI scheduling but usable MRIadmin preference is absent/incomplete.
- `BOOKING_READY`: UBSN has found a candidate slot for the participant, but staff has not yet completed the facility booking.
- `BOOKED`: human-confirmed facility booking has been recorded by APATHY.
- `NOT_ACTIONABLE`: no MRI scheduling action is currently required.

Withdrawal alone remains non-actionable and must not generate an Admin reminder.

Do not create re-MRI state from Contactlist. If re-MRI is needed later, it must come from an explicit APATHY workflow/evidence path rather than a legacy manual field.

## 4. Admin task

For `WAITING`, Admin should show one participant-level MRI task:

- PID / Name
- `需要預約 MRI`
- concise preference summary from Screening MRIadmin
- relevant transport/access/companion flags
- next action: open MRI Booking Assistant / arrange MRI

For `PREFERENCE_MISSING`, Admin should show:

- `需要補 MRI 可用時間`
- next action: update the participant's MRI scheduling information

For `BOOKING_READY`, Admin can indicate that a UBSN slot is available / ready for staff booking.

For `BOOKED` and `NOT_ACTIONABLE`, no active MRI scheduling problem should remain.

## 5. MRI preference representation

Do not collapse Screening MRIadmin into one broad `earliest_time/latest_time` window. Preserve month + weekday + daypart structure so combinations such as Tuesday AM and Thursday PM do not accidentally imply Tuesday PM or Thursday AM.

The UBSN waiting payload should preserve structured windows, for example:

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

AM/PM clock boundaries should be configuration, not participant-specific hardcoding.

## 6. Booking confirmation and MRI Time write

A UBSN free slot or prepared booking is not enough to write `MRI Time`.

The sequence is:

```text
Screening MRIadmin
  -> Admin MRI scheduling task
  -> UBSN live slot match
  -> staff opens/prepares booking
  -> human CAPTCHA + final UBSN confirmation
  -> staff records outcome BOOKED
  -> APATHY records the confirmed booking state
  -> APATHY writes the booking into MRI Time
  -> Admin MRI task resolves
```

Use one narrow write function conceptually:

```text
recordMriBooking(pid, start, end, admin, remark, source)
```

Rules:

- human-confirmed booking only;
- resolve current Subject No. through existing Registry / participant identity authority;
- append/update the normalized `MRI Time` booking row according to the existing sheet convention;
- no Contactlist writeback required for the new workflow;
- no Raw rewrite;
- no scientific Result/Boss scoring changes;
- idempotent against the same participant + start + end booking;
- preserve an internal authoritative booking outcome/evidence so the task can resolve without treating manually maintained sheets as source truth.

## 7. UBSN integration

UBSN should consume a read-only waiting snapshot derived from accepted/current Screening MRIadmin state.

It must not read Contactlist or a manually maintained MRI waiting list to decide availability.

Flow:

```text
Screening MRIadmin evidence
        -> resolved participant MRI scheduling state
        -> Admin task
        -> UBSN waiting payload
        + live UBSN free slots
        -> candidate booking
        -> human CAPTCHA/final confirmation
        -> explicit BOOKED outcome
        -> APATHY booking evidence/state
        -> write MRI Time
        -> Admin task resolves
```

## 8. Minimum implementation sequence

Functionality first.

1. Ensure current/accepted Screening MRIadmin fields survive into an identity-resolved participant scheduling read model.
2. Derive `WAITING` / `PREFERENCE_MISSING` / `NOT_ACTIONABLE` from that Screening state and current APATHY workflow state.
3. Surface the MRI task in Admin with the Screening preference summary.
4. Expose the same `WAITING` rows through the UBSN read-only endpoint.
5. Let UBSN match live Human MRI availability against the structured Screening windows.
6. On explicit human-confirmed `BOOKED`, record APATHY booking state and write the confirmed slot to `MRI Time`.
7. Resolve the Admin task automatically.

Do not build the new scheduling state by reading Contactlist or manual MRI lists.

## 9. Acceptance boundary

MRIadmin v1 is usable when:

- Screening MRIadmin information no longer disappears operationally;
- staff automatically sees who needs MRI booking in Admin;
- the task shows the participant's actual Screening availability/assistance information;
- UBSN matches against that same information without a second manual waiting list;
- after staff confirms the facility booking, APATHY writes the booking into `MRI Time`;
- the Admin task resolves;
- staff no longer needs to duplicate MRI scheduling information into Contactlist/manual MRI lists.
