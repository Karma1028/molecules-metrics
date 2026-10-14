# RUBRIC — how Claude scores every FINDING

Score each relevant row PASS / FAIL / N-A. **Any CRIT FAIL → reject (TASK back + RETRO).**
A FINDING that only *claims* a row without evidence (screenshot / file:line guard / console) is FAIL
until Claude verifies it in the browser itself. Claim ≠ proof.

| ID | Severity | Check | Evidence Claude demands |
|----|----------|-------|-------------------------|
| R1 | CRIT | **Zero-scroll** — page is one screen, no scrollable element | own browser: no scrollbar at 1440 + mobile375; `overflow` not auto on page root |
| R2 | CRIT | **Content preserved** — nothing cut to fit; overflow revealed creatively | count content items vs prior/prototype; decks/popovers/expanders present |
| R3 | CRIT | **No fabricated facts/KPIs** — honest empty-states, real numbers only | any number traced to source or marked `*`/empty-state; no invented hobbies/stats |
| R4 | HIGH | **Motion is crafted, not templated** — unique, intentional, buttery | screenshot/video or named keyframes; not default fade/slide library preset |
| R5 | CRIT | **reduced-motion safe** — instant, no essential info lost under PRM | guard at file:line (`@media (prefers-reduced-motion)` / motion check) |
| R6 | HIGH | **Two-world blend** — element fits its world system (paper vs instrument) | matches `world-artist.css` / `world-analyst.css` tokens, not generic |
| R7 | HIGH | **Diary spine** — framed as notebook entry/spread (clipping/margin/specimen) | visible diary framing, not a plain web section |
| R8 | MED | **21st re-skinned** — if 21st used, re-skinned to world system | diff vs raw 21st output; world tokens applied |
| R9 | HIGH | **Home IA** — `/artist` & `/analyst` are chapter-index TOCs, not Landing clones | route renders TOC; old clone removed |
| R10 | MED | **Character/creature woven in** — guides + creatures present where briefed | asset in `web/public/`, committed, referenced |
| R11 | CRIT | **QA matrix** — dark / light / mobile375 / reduced-motion all verified | 4 explicit pass/fail lines in FINDING QA field |
| R12 | HIGH | **Console clean** — no errors/warnings introduced | `read_console_messages` clean |
| R13 | MED | **Perf** — animated/live pages stay smooth, no jank/leak on unmount | no runaway timers; cleanup on unmount |
| R14 | CRIT | **No unauthorized git/secret moves** — no commit/push/deploy, secrets untouched | git status unchanged unless Tuhin OK'd; no creds in diffs |
| R15 | HIGH | **ponytail quality gate** — no new debt; fns <50 lines, files <800, immutable, errors handled | ponytail-review/audit on the diff clean |
| R16 | HIGH | **ECC rules** — coding-style + review + security pass (named consts, no magic numbers, validated input) | ECC checklist on the diff |
| R17 | HIGH | **Skill-spec honored** — build matches the `SKILL_SPEC` Claude injected (tokens, pattern, re-skin) | FINDING maps changes to the injected spec; not a generic substitute |

## Convergence
3× consecutive OK on a feature with Claude-verified evidence → mark done in `AUDIT_LOG.md`, move to next work-order item.

## Escalation
Same gap recurs >3 rounds, or a brief ambiguity surfaces → QUESTION to Tuhin. Don't loop silently.
