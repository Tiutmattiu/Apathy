# APATHY CODEX QUOTA EFFICIENCY PROTOCOL — 2026-09-03

Status: ACTIVE OPERATING RULE

## Role split

- ChatGPT = sheepdog. Performs read-only diagnosis, source/Production inspection, root-cause localization, product/data-contract decisions, acceptance design, global sequencing, and post-deploy read-only verification whenever connector access is sufficient.
- Codex = surgeon. Performs private source edits, precise deployment, private-runtime actions unavailable to ChatGPT, and the minimum necessary runtime check proving the patch works.
- Human = mechanical UI operator only when an exact click/run cannot be performed by Codex.
- Copilot = out of scope for now.

## Codex quota rule

Do not spend Codex quota on work ChatGPT or a human can already perform.

Codex should NOT be asked to:
- reread many broad status documents when ChatGPT can distill the current truth;
- perform broad source audits after root cause is already known;
- repeat read-only Production checks that ChatGPT can do through Drive/GitHub;
- prove already-established historical facts;
- run large fixture matrices when a small targeted runtime check plus ChatGPT read-only acceptance is enough;
- repeatedly review the same patch for style/safety after the exact edit is known;
- produce long planning documents before implementation;
- use quota as a browser finger for known UI actions a human can click;
- stop after one micro-fix inside a known problem family.

## Required workflow

1. ChatGPT pre-operates:
   - inspect current Production/source read-only;
   - identify the exact first broken invariant;
   - identify likely file/function/edit boundary;
   - batch all known same-family dependent defects;
   - define a compact acceptance set.

2. Codex receives a surgical prompt containing:
   - current truth;
   - exact problem family;
   - exact likely files/functions when known;
   - required edits;
   - explicit non-goals;
   - one minimal runtime verification path.

3. Codex acts:
   - refresh fresh live source;
   - edit;
   - deploy;
   - run the minimum necessary private-runtime action;
   - report changed files/deploy result/new blocker.

4. ChatGPT accepts:
   - perform read-only Production verification itself wherever possible;
   - compare actual outputs to acceptance criteria;
   - decide closeout or next surgical delta.

## Testing philosophy

This is a small research operations system, not a commercial platform requiring exhaustive automated test infrastructure.

Prefer:
- direct targeted checks;
- one or a few representative real fixtures;
- deterministic aggregate acceptance reads;
- manual/browser check only when UI behavior itself is the feature.

Avoid:
- repeated exhaustive fixture review after the mechanism is already proven;
- broad regression ceremonies for isolated derived-output changes;
- duplicated ChatGPT + Codex + human verification of the same fact;
- building test frameworks solely to support a narrow patch.

## Problem-family batching

If multiple defects share one known mechanism, repair them in one bounded surgery.

Example:
`applicability gate -> HC LEDD + HY + PD-only fields -> Boss QA cleanup`
should not become four separate Codex tasks.

Independent families remain separate if they touch unrelated Production write surfaces.

## Prompt size rule

Codex prompts should be short and operational once ChatGPT has already done the diagnosis.

Do not send Codex giant packets that ask it to rediscover the entire project state.
Canonical docs remain available for reference, but the active prompt should distill only what is needed for the surgery.

## Verification ownership

Default:
- Codex verifies that deployment/runtime execution succeeded.
- ChatGPT verifies resulting Production data/UX read-only.
- Human verifies only actions requiring actual human UI interaction or research judgment.

## Quota conservation trigger

If Codex has already consumed substantial quota without editing/deploying, stop the workstream and return to ChatGPT for further narrowing.

A healthy Codex session should spend most of its effort on modification/deployment, not review/planning.

## Durable handoff

Canonical/handoff writing should happen at coherent family closeout or when quota is genuinely low, not after every tiny substage.
