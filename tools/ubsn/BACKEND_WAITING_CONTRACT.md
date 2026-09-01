# UBSN backend waiting snapshot contract

Status: consumer implemented in `tools/ubsn/`; Production producer is **not yet implemented**.

Purpose: let the local UBSN helper consume one read-only APATHY scheduling snapshot instead of maintaining a second manual waiting list.

## Intended APATHY producer

The future backend adapter should derive the snapshot from the existing research workflow, not from a new hand-maintained UBSN table:

1. accepted/current Participant MRIadmin availability from Screening;
2. current MRI scheduling/booking state from `MRI Time`;
3. operational overrides such as inclusion / re-MRI / existing booking from Contactlist where those fields are authoritative.

A blank MRIadmin preference means availability is unknown and must not be expanded to unrestricted availability.

Participants who already have a valid current booking should not be emitted as ordinary `WAITING` rows. Withdrawal alone must not create an Admin/UBSN action.

## Read-only JSON response

The local helper accepts either a bare array or an object with `participants`.

The preferred Production shape preserves each MRIadmin weekday/time combination independently:

```json
{
  "participants": [
    {
      "pid": "P0123",
      "mri_status": "WAITING",
      "wait_since": "2026-08-20",
      "earliest_date": "2026-09-01",
      "latest_date": "2026-11-30",
      "minimum_duration": 90,
      "priority": 100,
      "availability_windows": [
        {
          "months": [9, 10, 11],
          "weekday": 1,
          "start": "09:00",
          "end": "12:00"
        },
        {
          "months": [9, 10, 11],
          "weekday": 3,
          "start": "13:00",
          "end": "18:00"
        }
      ]
    }
  ]
}
```

Weekdays use Python numbering: Monday=0 through Sunday=6. Months are 1 through 12.

The important rule is that MRIadmin combinations remain separate. For example, `Tuesday AM` plus `Thursday PM` must **not** be widened into Tuesday/Thursday all-day availability. The matcher now understands multiple `availability_windows` and also preserves month selections.

An explicit empty `availability_windows: []` is fail-closed and matches nothing. This can represent availability that is still unknown, although the preferred Production behavior is to classify that participant as `PREFERENCE_MISSING` for Admin rather than emit them as an ordinary UBSN `WAITING` row.

The legacy coarse fields below remain supported only for the local development fallback while the Production producer is being built:

```json
{
  "allowed_weekdays": [1, 3],
  "earliest_time": "09:00",
  "latest_time": "12:30"
}
```

## MRIadmin daypart conversion

Screening currently records month / weekday / AM-PM preferences rather than exact clock ranges. The APATHY producer should convert AM/PM into explicit windows using one project-level rule, then emit separate `availability_windows`. Do not infer wider availability than the participant supplied.

## Privacy

The UBSN matcher needs research PID and scheduling constraints only. Do not expose participant names, telephone numbers, email addresses, raw Screening payloads, Contactlist free text, credentials, or workbook identifiers through this endpoint.

## Local helper configuration

Development/local fallback remains explicit:

```json
"waiting_source": "file",
"waiting_list_file": "waiting-list.local.json"
```

When the APATHY read-only producer exists:

```json
"waiting_source": "backend",
"waiting_list_url": "<private read-only endpoint>",
"waiting_list_timeout_seconds": 10
```

Backend mode fails closed on fetch/shape errors and does not silently fall back to a stale local JSON list.

## Producer still required

The Production backend still needs the MRIadmin operational loop itself:

`Screening MRIadmin -> current scheduling state -> Admin MRI task -> MRI Time read/write -> confirmed booking clears task`

Only after that state is authoritative should it emit the UBSN waiting snapshot above.
