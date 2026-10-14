# KARMA DualAgent — Molecules → Metrics (INVERTED ROLES)

**Project:** `D:\porfolio\molecules-metrics\web` · React 19 + Vite 8 + TS + `motion/react`, two-world SPA.
**Set up:** 2026-10-13. Based on `karma-dualagent` skill, **roles swapped**.

## Who is who (READ FIRST — this is the inversion)

| Agent | Session | DOES | NEVER |
|-------|---------|------|-------|
| **CLAUDE** (this session) | "Dual agent setup with antigravity" | Instruct, audit, critique, guide. Writes TASK, BRIEF, RUBRIC. Reviews every FINDING vs `RUBRIC.md` + `BRIEF.md`. Runs own browser QA to verify claims. Writes RETRO. Approves/rejects. | Write feature code. Edit `src/` during Antigravity's turn. Loosen the brief to make a FINDING pass. |
| **ANTIGRAVITY** (builder) | Google Antigravity IDE agent (+ reachable via RC SendMessage) | Write/edit `src/`, run dev server, implement per `BRIEF.md`, QA its own work, post FINDING. | Redefine the brief. Cut content to fit one screen. Ship raw 21st output. Fabricate personal facts. Commit/push/deploy. |

Transport = **BOTH**: `conversation.md` file wire is the source of truth (append-only); RC SendMessage is a live nudge channel. If they disagree, the file wire wins.

## Handoff flags (grep target — tail only, never whole file)
- `WAITING_ANTIGRAVITY: yes` — Claude posted, Antigravity must act.
- `WAITING_CLAUDE: yes` — Antigravity posted, Claude must act.

Claude arms the `Monitor` tool on `conversation.md` for `WAITING_CLAUDE` appearing in the **last 30 lines** (older occurrences in the append-only log false-trigger a whole-file grep). Re-arm on the 30-min cap. `TaskStop` once a reply lands.

Antigravity re-arms its own watcher (poll mtime+size, check last 10 non-empty lines for `WAITING_ANTIGRAVITY: yes`) after each FINDING, before going idle.

## Project specifics
- Dev: Vite (launch.json port 5173; recent sessions used 5174/5176 — read the running port). Live-API Python on `127.0.0.1:5195`, Vite proxies `/api`.
- QA overrides: `?mode=artist|analyst`, `?theme=light|dark`.
- Two-world scoping: `data-mode` on `<html>`, `data-theme` composes, `data-world` for logic.
- Secrets (Spotify/Barça) stay in the Python server `.env` — **never move through tooling**.

## Wire format — 5 message types, no prose
```
[TS][FROM→TO][T:{id}][TASK]       delegate build work, expect FINDING
[TS][FROM→TO][T:{id}][QUESTION]   clarify before acting, expect ANSWER
[TS][FROM→TO][T:{id}][ANSWER]     response to QUESTION
[TS][FROM→TO][T:{id}][FINDING]    result of TASK
[TS][FROM→TO][T:{id}][ACK]        done/blocked, no response
```
FROM/TO ∈ {CLAUDE, ANTIGRAVITY}. Budgets: TASK 150T · FINDING 300T · QUESTION 80T · ANSWER 150T · ACK 20T.

### TASK (Claude→Antigravity)
```
[TS][CLAUDE→ANTIGRAVITY][T:{id}][TASK]
TASK: {verb-first, one line}
IN: {≤5 bullets / refs to BRIEF section}
OUT: FINDING
ACCEPT: {rubric IDs that must pass}
WAITING_ANTIGRAVITY: yes
```

### FINDING (Antigravity→Claude)
```
[TS][ANTIGRAVITY→CLAUDE][T:{id}][FINDING]
STATUS: OK|WARN|FAIL
DID: {≤3 bullets what changed, file:line}
QA: {dark/light/mobile375/reduced-motion — pass/fail each}
EVIDENCE: {screenshot path / console-clean / guard at file:line}
OPEN: {≤3 remaining}
WAITING_CLAUDE: yes
```

## Build-Audit-Fix loop
```
Claude loads the 2-4 skills this TASK needs + distills SKILL_SPEC (see SKILLS-BRIDGE.md)
 → Claude posts TASK + SKILL_SPEC (WAITING_ANTIGRAVITY)   # builder has no skills; Claude injects them
 → Antigravity builds + self-QA → posts FINDING (WAITING_CLAUDE)
 → Claude Monitor wakes → "verify the real thing" pass + own browser QA + design-taste audit
 → Claude runs ponytail quality gate + ECC rule check on the diff
 → score vs RUBRIC.md (incl. R15 R16 R17): PASS → ACK + next TASK; FAIL → QUESTION/TASK with concrete gap
 → on any CRIT/FAIL: Claude appends RETRO.md
 → 3× OK in a row on a feature → convergence, mark AUDIT_LOG done
 → stuck >3 rounds → escalate QUESTION to Tuhin
```
**Skill/plugin bridge is mandatory & project-wide** — every TASK carries a SKILL_SPEC; every FINDING
is audited with the review skills + ponytail + ECC. The whole skill stack (21st, motion-*, design-taste,
storytelling, polish, react/vite, ECC, ponytail) applies throughout, not once. See `SKILLS-BRIDGE.md`.

## Claude watches the live UI
Claude runs the dev server (`preview_start` molecules-metrics-web) and, on each FINDING, loads the
changed route and screenshots / read_page to SEE Antigravity's UI — audit is visual, not just code.
Instruct corrections on the wire from what the rendered page actually looks like.

## "Verify the real thing, not a proxy" — run before EVERY ACK
1. Does the check test the actual claim or a proxy? (zero-scroll pass ≠ content preserved.)
2. Is a fallback/stub distinguishable from real to the end user? (honest empty-states, no fabricated facts.)
3. Is a path/URL absolute where its real consumer needs absolute (og:image, feeds)?
4. Does a stated guard exist in code (file:line), or only in prose?
5. Is a hardcoded fallback marked as placeholder + env override documented?
Append 6+ as new gap-shapes appear. Never ACK a rephrased claim — demand the concrete fix.

## Append-only logs — never overwrite
`conversation.md`, `AUDIT_LOG.md`, `RETRO.md`. Claude appends via Edit, never Write-overwrite.
Spec docs (`PROTOCOL.md`, `BRIEF.md`, `RUBRIC.md`) are versioned — may be edited.
