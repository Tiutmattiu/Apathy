# Backend source-sync contract

This repository does not publish the private Apps Script backend. Use this contract to reconcile a fresh live-source pull with a reviewed private working copy without copying identifiers, workbook data, or source contents into Git.

## Authority and safety

- Production is the runtime truth; the private reviewed working copy is the change candidate.
- Always pull into a new temporary directory. Never pull over the candidate.
- Record the configured target privately and verify it before any remote write. Do not copy Script or workbook IDs into public artifacts.
- Create an immutable Apps Script version and retain the fresh pull as the rollback source before pushing.
- Stage deployment from the fresh pull, then overlay only reviewed files. This preserves unrelated live files.
- Never stage from a partial backend directory: `clasp push` replaces the project file set.
- Run inventory/hash comparison again immediately before push. Unknown deletions or unrelated changes stop the push.

## Fast reconciliation

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/compare-backend-source.ps1 `
  -LiveDir <fresh-pull-directory> `
  -CandidateDir <private-candidate-directory>
```

The command is read-only. It reports file names, SHA-256 hashes, and `SAME`, `DIFFERENT`, `LIVE_ONLY`, or `CANDIDATE_ONLY`. It never prints source contents.

## Safe merge and deployment workflow

1. Verify the configured Apps Script target privately.
2. Pull current live source into a fresh temporary directory.
3. Run the comparison script against the reviewed private candidate.
4. Review every `DIFFERENT` and `CANDIDATE_ONLY` file; explain every intended difference.
5. Copy the fresh pull to a new deployment staging directory.
6. Overlay only the exact reviewed files. Preserve every unrelated live file byte-for-byte.
7. Remove a live file only when deletion is explicitly reviewed (for example, participant-specific diagnostic code).
8. Run JavaScript syntax, focused contract tests, privacy scans, and a second inventory/hash comparison.
9. Create a pre-change Apps Script version. This plus the fresh pull is the rollback path.
10. Push only from the deployment staging directory, then pull again and hash-verify the remote result.
11. Run read-only Production diagnostics first. Perform only reversible derived-output operations that the task explicitly authorizes.
12. Record sanitized counts/verdicts in `CODEX_HANDOFF.md`; never record target IDs, participant data, or private paths.

## Stop conditions

- target identity is unknown or differs from the reviewed target;
- live source changed after review;
- staging would delete or overwrite an unrelated live file;
- source contains participant-specific constants, secrets, or private evidence;
- rollback version/pull is unavailable;
- requested runtime action would rewrite Raw or make an irreversible authority/scientific change.
