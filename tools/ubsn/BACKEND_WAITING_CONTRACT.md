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

The local helper accepts either a bare array or an object with `participants`:

```json
{
  "participants": [
    {
      "pid": "P0123",
      "mri_status": "WAITING",
      "wait_since": "2026-08-20",
      "earliest_date": "2026-09-01",
      "latest_date": "2026-10-31",
      "allowed_weekdays": [1, 3],
      "earliest_time": "09:00",
      "latest_time": "12:30",
      "minimum_duration": 90,
      "priority": 100,
      "notes": ""
    }
  ]
}
```

Weekdays use Python numbering: Monday=0 through Sunday=6.

This is a normalized transport contract for the current matcher. The backend remains responsible for converting MRIadmin month/daypart semantics into truthful scheduling constraints; it must not invent availability that the participant did not provide.

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
