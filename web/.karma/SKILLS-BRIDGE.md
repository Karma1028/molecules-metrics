# SKILLS-BRIDGE — how skills/plugins reach a builder that has none

**Problem:** Antigravity (builder) does NOT have Claude's skills or plugins. Left alone it ships
generic output. **Solution:** CLAUDE is the skill/plugin bridge. Claude loads the skills, distills
them into copy-ready `SKILL_SPEC` blocks inside every TASK, and audits every FINDING with the
review skills + quality plugins. The skill is therefore *used* on both sides of the wire, and the
output hits skill-grade (real animations, anti-slop design, re-skinned 21st, clean code).

**Standing rule (applies to the WHOLE project, every page, every TASK):**
the skill/plugin stack below is applied throughout — not once. 21st.dev (when live), all
`motion-*`, design-taste, storytelling, make-interfaces-feel-better, high-end-visual-design,
ECC rules, and the ponytail quality gate run on every build + every audit until the project ships.

## Skill registry — what Claude injects / runs

### A. BUILD-side skills (Claude distills → `SKILL_SPEC` in each TASK)
| Skill | Injected as | On which TASKs |
|-------|-------------|----------------|
| `frontend-design-direction` | design direction paragraph (world tokens, hierarchy, do/don't) | start of each page |
| `design-taste-frontend` | anti-slop checklist + audit-first note | every UI TASK |
| `motion-foundations` | motion tokens + spring presets + reduced-motion guard snippet | any TASK with motion |
| `motion-patterns` | the exact pattern (stagger/deck/popover/page-transition) + code shape | any reveal/transition |
| `motion-advanced` | orchestrated timeline / SVG-draw / physics recipe | hero/signature moments |
| `storytelling` | diary-spread sequencing + Wrapped beats | content pages |
| `make-interfaces-feel-better` | spacing/type/border/shadow/hit-area polish list | polish passes |
| `high-end-visual-design` | agency-grade font/shadow/card rules; blocked cheap defaults | polish passes |
| `21st:21st-ui` | **component source** — Claude generates/finds, re-skins to world, hands Antigravity the re-skinned code | component-heavy pages (decks, popovers, carousels) |
| `react-patterns` / `react-performance` / `vite-patterns` | idiomatic structure + perf guards | all code |

### B. AUDIT-side skills/plugins (Claude RUNS on each FINDING)
| Skill / plugin | What it gates | Rubric row |
|----------------|---------------|-----------|
| `browser-qa` | dark/light/mobile375/reduced-motion verified in real browser | R11 |
| `design-taste-frontend` (audit mode) | not templated/generic | R4 R6 |
| **ponytail** (`reel-crew:ponytail-review` / `-audit` / `-debt`) | code-quality gate — debt, review, gain | R15 (new) |
| **ECC rules** (`~/.claude/rules/ecc/*`) | <50-line fns, <800-line files, immutability, error handling, 80% test cov, no secrets | R16 (new) |
| `verification-before-completion` | claim ≠ proof; evidence at file:line | all |

## Injection protocol (Claude, before each TASK)
1. Pick the 2–4 skills that actually shape this TASK (don't load all — token discipline).
2. Load them (`Skill`), distill to a tight `SKILL_SPEC:` block (tokens, snippets, do/don't, the exact pattern).
3. For component-heavy work: Claude generates via `21st:21st-ui` (if live) **or** hand-builds via
   `motion-patterns`, re-skins to the world system, and pastes the re-skinned code into the TASK —
   Antigravity never touches raw 21st output.
4. Append `SKILL_SPEC` + `SKILLS_USED:` list to the TASK on the wire.

## Audit protocol (Claude, on each FINDING)
1. "Verify the real thing" 5-pass (PROTOCOL.md).
2. Own browser QA (`browser-qa`): dark/light/mobile375/reduced-motion.
3. Design-taste audit: reject generic/templated.
4. Run **ponytail** quality gate + **ECC** rule check on the diff.
5. Score vs RUBRIC (incl. R15 R16). PASS→ACK+next; FAIL→TASK-back+RETRO.

## 21st.dev availability
Registers only at session boot, needs WARP (ISP SNI-blocks `21st.dev`; see CHECKPOINT). On boot,
verify `21st:21st-ui` `get_usage`/`search` live. If dead this session → hand-build with
`motion-patterns` + `frontend-design-direction`, still re-skinned to world. Either way the
*design intent* of 21st components (decks, popovers, carousels) is delivered.
