# APATHY MRI Admin / Scheduling Workflow

Date: 2026-09-01
Status: product contract / implementation target

Purpose: turn MRI preferences collected during Screening into a visible staff scheduling workflow, connect that workflow to the existing `MRI Time` sheet and Contactlist, and make UBSN consume the same source of truth. This is an operations feature, not a new scientific scoring domain.

Privacy: this public specification must not contain participant names, phone numbers, private workbook values, credentials, or Production-only identifiers.

## 1. Problem

MRI preference / assistance information is collected during Screening, but staff primarily work from Admin, Contactlist, and `MRI Time`. Today those preferences can therefore exist in accepted participant evidence without becoming an operational task. The result is a broken handoff: data is collected but nobody is explicitly told that a participant needs MRI scheduling.

The current `MRI Time` sheet is already an operational booking ledger with columns equivalent to:

- MRI Date
- MRI Time (from)
- MRI Time (To)
- Subject No.
- admin
- remark

Contactlist also carries operational MRI fields including MRI contact, MRI time/date, re-MRI-needed state, inclusion state, and free-text remarks.

MRIadmin is not complete until these surfaces form one closed loop.

## 2. Ownership model

### Screening MRIadmin / accepted Participant state

Owns participant-provided MRI scheduling preferences and assistance needs. Examples include preferred months, weekday/daypart availability, transport/access needs, companion information, and MRI administrative remarks.

This is evidence about **when/how the participant can attend**. It is not the booking ledger.

### Admin

Owns **what staff must do next**. MRI scheduling problems should appear here as one participant-level task, consistent with the existing one-PID-per-row Admin model.

### MRI Time

Owns the **actual booked MRI resource slot**. It should be read as the operational appointment ledger and should be writable through a narrow explicit booking function after staff confirmation.

### Contactlist

Remains a staff-facing operational/contact surface and compatibility mirror. Structured fields such as inclusion, MRI contact, MRI time/date, and re-MRI-needed may affect scheduling state. Free-text remarks may be shown to staff but must not be the only machine-readable authority for booking state.

### UBSN helper

Owns live facility availability monitoring and candidate-slot matching. It must not invent participant availability or become a second identity engine. It consumes the derived MRI waiting/scheduling state and proposes usable slots.

## 3. Derived MRI scheduling states

The backend should derive a participant-level MRI scheduling state from accepted Participant MRIadmin evidence + Contactlist + MRI Time + completed MRI evidence.

Minimum states:

- `NOT_ACTIONABLE`: excluded / withdrawn / otherwise not currently intended for MRI.
- `PREFERENCE_MISSING`: MRI is expected but usable scheduling preference is absent or incomplete.
- `TO_SCHEDULE`: MRI is expected, no current booked MRI slot exists, and usable preference exists.
- `MATCH_AVAILABLE`: UBSN has a live candidate slot but booking is not yet confirmed.
- `BOOKED`: current future appointment exists in MRI Time / accepted operational booking state.
- `COMPLETED`: MRI completion evidence exists for the intended visit.
- `RE_MRI_TO_SCHEDULE`: re-MRI is explicitly required and no replacement appointment is booked.
- `SYNC_CONFLICT`: structured operational sources disagree (for example Contactlist says booked but MRI Time has no corresponding appointment, or duplicate/conflicting future appointments exist).

Do not infer `NOT_ACTIONABLE` merely from PD/HC classification. Use the actual study inclusion/protocol/operational state.

Withdrawal alone remains non-actionable in Admin; preserve evidence without producing a staff reminder.

## 4. Admin tasks

MRI scheduling should use a small explicit task vocabulary.

### `MRI_SCHEDULE_NEEDED`

Condition: MRI expected + no current booking + usable MRI preference.

Visible Admin summary should include:

- PID / Name
- `需要預約 MRI`
- concise preference summary, e.g. preferred months + weekday/daypart windows
- relevant transport/access/companion flags
- next action: `打開 MRI Booking Assistant / 安排 MRI`

### `MRI_PREFERENCE_NEEDED`

Condition: MRI expected + no booking + preference unavailable/incomplete.

Next action: contact participant / update MRI availability. Do not treat blank preference as all-day availability.

### `MRI_RESCHEDULE_NEEDED`

Condition: structured re-MRI state or replacement MRI required + no future replacement booking.

### `MRI_BOOKING_SYNC_CONFLICT`

Condition: MRI Time, Contactlist, or accepted booking state disagree materially.

Next action: review MRI booking record. This is a system/operations reconciliation task, not participant re-entry.

Once a valid booking exists, the scheduling task disappears from active Admin.

## 5. MRI preference representation

Do not collapse Screening MRIadmin into one broad `earliest_time/latest_time` window. Preserve weekday + daypart structure so combinations such as Tuesday AM and Thursday PM do not accidentally imply Tuesday PM or Thursday AM.

Derived UBSN waiting payload should be equivalent to:

```text
pid
wait_since
preferred_months[]
weekly_windows:
  mon: [AM|PM]
  tue: [AM|PM]
  ...
minimum_duration_minutes
assistance_flags
remark
priority
```

AM/PM clock boundaries must be configuration, not scientific hardcoding. Facility unavailable periods still come from live UBSN calendar data.

## 6. MRI Time read contract

Implement one read-only backend adapter that parses the existing MRI Time ledger by current sheet headers rather than fixed column positions.

It must return normalized appointments with at least:

```text
subject_no
pid_if_resolved
start
end
admin
remark
row_id_or_row_number
```

Identity should be resolved through existing Registry/Participant authority. Do not build new fuzzy PID/SID/phone matching inside UBSN.

The adapter should detect duplicate/conflicting future appointments and expose them as `SYNC_CONFLICT` rather than silently choosing one.

## 7. MRI Time write contract

Create a single narrow function, conceptually:

```text
recordMriBooking(pid, start, end, admin, remark, source)
```

Rules:

- explicit staff-confirmed booking only;
- resolve the current Subject No. according to existing Registry / MRI Time convention;
- write one normalized row to MRI Time;
- update the structured Contactlist `MRI TIME&DATE` / `MRI contact` mirror where appropriate;
- preserve existing manual remarks;
- no Raw rewrite;
- no scientific Result/Boss scoring changes;
- idempotent against the same PID + start + end booking;
- reject conflicting duplicate appointments rather than overwriting silently.

A UBSN candidate or prepared booking is **not** enough to write MRI Time. The write occurs only after the human completes CAPTCHA/final facility booking and explicitly records outcome `BOOKED`.

## 8. UBSN integration

UBSN should consume the derived MRI scheduling queue rather than a manually maintained `waiting-list.local.json` once the backend adapter exists.

Flow:

```text
Screening MRIadmin evidence
        +
Contactlist operational state
        +
MRI Time booked appointments
        +
MRI completion evidence
        -> derived MRI scheduling state
        -> Admin task
        -> UBSN waiting payload
        + live UBSN free slots
        -> candidate booking
        -> human CAPTCHA/final confirmation
        -> explicit BOOKED outcome
        -> recordMriBooking(...)
        -> MRI Time + Contactlist mirror
        -> Admin task resolves
```

## 9. Minimum implementation sequence

Functionality first. Do not begin with a broad audit/test programme.

1. **Read MRI Time** into a normalized appointment map.
2. **Derive MRI scheduling state** for current participants using accepted MRIadmin + Contactlist + MRI Time.
3. **Surface Admin tasks** `MRI_SCHEDULE_NEEDED` / `MRI_PREFERENCE_NEEDED` / `MRI_RESCHEDULE_NEEDED` / `MRI_BOOKING_SYNC_CONFLICT`.
4. **Expose read-only UBSN waiting payload** from the same derived state.
5. **Make UBSN consume that payload** instead of the local example waiting list.
6. **Add explicit confirmed-booking write** to MRI Time and Contactlist mirror after human outcome `BOOKED`.
7. Staff verifies one real unscheduled participant -> candidate slot -> human booking -> MRI Time update -> Admin task disappears.

No Full rebuild is required for narrow MRI scheduling/output changes. Use participant-scoped Incremental and/or output rebuild only where the current architecture requires it.

## 10. Acceptance boundary

MRIadmin v1 is usable when staff no longer need to remember that Screening contained hidden MRI preference data:

- an included participant who needs MRI and has no booking appears automatically in Admin;
- Admin shows the useful MRI preference/assistance summary;
- MRI Time appointments suppress already-booked participants from the waiting queue;
- UBSN matches live free slots against those preferences;
- after human-confirmed booking, one action writes the appointment to MRI Time and structured Contactlist fields;
- the Admin scheduling task then resolves automatically;
- missing preference produces a contact/update task, never an assumption of full availability.
