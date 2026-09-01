# UBSN backend waiting snapshot contract

Status: consumer implemented in `tools/ubsn/`; Production producer is **not yet implemented**.

Purpose: let the local UBSN helper consume one read-only APATHY MRI waiting snapshot derived from Screening MRIadmin instead of maintaining a second manual waiting list.

## Intended APATHY producer

The backend producer must derive the waiting snapshot from accepted/current, identity-resolved **Screening MRIadmin** information plus the current APATHY workflow state.

Do **not** derive the new waiting queue from Contactlist or manually maintained MRI booking/waiting sheets. Those surfaces were historical staff workarounds created because the MRIadmin operational loop was incomplete.

A blank MRIadmin preference means availability is unknown and must not be expanded to unrestricted availability.

Participants who are not currently actionable for MRI should not be emitted as `WAITING`. Withdrawal alone must not create an Admin/UBSN action.

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
        {"months": [9,10,11], "weekday": 1, "start": "09:00", "end": "12:00"},
        {"months": [9,10,11], "weekday": 3, "start": "13:00", "end": "18:00"}
      ]
    }
  ]
}
```

Weekdays use Python numbering: Monday=0 through Sunday=6. Months are 1 through 12.

The important rule is that MRIadmin combinations remain separate. For example, `Tuesday AM` plus `Thursday PM` must **not** be widened into Tuesday/Thursday all-day availability.

An explicit empty `availability_windows: []` is fail-closed and matches nothing. Preferred Production behavior is to classify that participant as `PREFERENCE_MISSING` for Admin rather than emit them as ordinary UBSN `WAITING`.

The legacy coarse fields remain supported only for local development compatibility while the Production producer is being built.

## MRIadmin daypart conversion

Screening records month / weekday / AM-PM preferences rather than exact clock ranges. The APATHY producer should convert AM/PM into explicit windows using one project-level rule, then emit separate `availability_windows`. Do not infer wider availability than the participant supplied.

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

The Production backend still needs the MRIadmin operational loop:

```text
Screening MRIadmin
  -> current participant MRI scheduling state
  -> Admin MRI task
  -> UBSN waiting snapshot
  -> human-confirmed booking
  -> APATHY booking state/evidence
  -> write MRI Time
  -> clear Admin task
```

`MRI Time` is a write/output target for the confirmed booking in this workflow, not an upstream source for building the new waiting queue.
