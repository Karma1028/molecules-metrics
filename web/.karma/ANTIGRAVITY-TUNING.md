# Antigravity Tuning — make the builder sharper

Applied playbook for the KARMA dual-agent build. Sources: Antigravity community
guides + Google codelab (the exact r/google_antigravity thread was unreachable
from Claude's fetch paths — reddit blocked by policy; paste it in and anything
extra gets folded here). Claude owns the quality bar; this is how Antigravity
produces fewer rejects.

## 1. Rules (set these as ALWAYS-ON agent rules)
Always-On rules are injected into every prompt. Make these permanent so they
don't have to be re-stated per TASK:
- **No fabricated facts.** Every named project / client / company / metric MUST
  trace to a repo source file (resume/data/bio). If no source, use an honest
  placeholder with a VISIBLE "pending" tell. A `*` on some values does NOT
  launder the rest. (This is what killed T:b1.)
- **Honest empty-states**, never invented filler. Cross-check new content vs
  `src/worlds/analyst/Skills.tsx` self-ratings for internal consistency.
- **Zero-scroll:** every page fits one screen; set `data-oneScreen` / `data-toc`
  on mount, clean up on unmount. No scrollable inner elements. Verify at
  desktop 1440 AND mobile 375 with content NOT clipped.
- **Motion:** import from `motion/react`; tokens from `src/lib/motion-tokens`;
  real `useReducedMotion()` guard (collapse stagger + y when reduced). Cite the
  guard by real `file:line` in every FINDING (N1 recurred twice — stop it).
- **No em-dash (`—`)** in UI copy. No `&larr;`/`&rarr;` entity leaks.
- **Secrets stay in the Python server `.env`** — never move secret values.
- **No commit / push / deploy** without Tuhin's explicit OK. No attribution lines.

## 2. Use the Agent Manager, not a single chat
Dispatch parallel agents per job (stubs / asset-wiring / tests) so contexts stay
clean. Use Antigravity's own slash commands:
- **`/goal`** — state the one outcome for the agent (e.g. "honest ComingSoon for
  /analyst/journey, one-screen, zero fabricated facts").
- **`/teamwork`** (multi-agent) — split the 7 remaining stub pages across agents
  instead of one long thread.
- **Planning mode ON** — let the agent emit a To-Do/plan BEFORE coding so it's
  review-steerable; Claude audits the plan against the RUBRIC before build.

## 3. Verify by inspection, not assumption
Before any FINDING STATUS:OK — inspect the actual DOM/console/build/tests, cite
real `file:line`. Matches Claude's "verify the real thing" pass. Reproducible
test or it didn't happen.

## 4. Context hygiene
- `.antigravityignore` added (gitignore syntax) — node_modules/dist/.vite/locks
  out of context. Less rot = more project-specific output.
- Don't load the whole codebase; scope each TASK to the files it touches.
- Skill descriptions matter — the one line is all the agent sees before loading
  the skill. Keep SKILL_SPEC blocks tight + intent-matched.

## 5. MCP (if Antigravity adds servers)
- Config: `.agents/mcp_config.json` (per-workspace) or `~/.gemini/config/mcp_config.json`.
- Creds in env/secret manager, never hard-coded. Only trusted servers.

## 6. r/google_antigravity thread — merged (2026-10-13, from Tuhin's 41-pp PDF)
The thread (SoulzPhoenix "Universal Rules (31)" + 11-agent set, temroa's "Proportional
Gate Escalation", Swiss_Robear's Gemini-planning workflow). Most of it already matches
this repo's karma-dualagent RETRO guards. The NEW mechanisms worth adopting:

### 6a. Proportional Gate Escalation (3-tier ladder) — the headline fix
Dumping 30+ static rules into every prompt causes "constraint fatigue + attention
dilution" — the model starts ignoring rules. Fix: scale rigor to blast radius.
- **TIER 1 (fast path)** — 1-2 files, <20 lines diff. No planning doc, no subagents,
  no ADR. Edit, run local typecheck/unit test, ship. (e.g. copy fix, a single CSS value.)
- **TIER 2 (standard)** — 3-8 files / an endpoint / a component. Mandatory plan.md +
  Blast-Radius map before symbol mutations. Strict Type + Lint + Unit before done.
- **TIER 3 (architectural / high-risk)** — >8 files, data migration, auth, or protocol
  change. Interactive design grilling first, formal ADR log, depth-tree execution,
  mandatory multi-agent independent verifiers.
For THIS portfolio: nearly all page work is Tier 1-2. Reserve Tier 3 for live.ts /
routing / data-contract changes.

### 6b. Progressive Disclosure Skills
Don't load all skills every prompt. Load a skill ONLY when its trigger condition fires
(grill-me before non-trivial code, antislop before UI, unlazy for big multi-file refactor).
Keeps context lean → sharper output. (Pairs with #4 context hygiene.)

### 6c. Call-Graph Reachability (run after every build)
After wiring a new component/route/export: grep the entry points to confirm it's
actually imported + rendered. **Zero callers = unwired = delivery blocked**, even if the
file compiles. (Catches "built but never routed" — would've flagged orphaned pages.)

### 6d. Impact Map / Blast Radius (run before every edit to shared code)
Before mutating a shared type/signature/interface, trace its callers (depth=1; core
schemas depth=2). If affected files > 8 → auto-escalate Tier 2 → Tier 3. For us: editing
`live.ts` interfaces or `motion-tokens` hits many consumers → always map first.

### 6e. Immutable Test Invariant (Goodhart protection) — hard rule
Never weaken an assertion, comment-out a test (skip), or change an expected failure to
turn a gate green. **When a test fails, the SOURCE changes, not the test.** Legacy Test
Migration: if a test breaks on an intended private-detail refactor (not a contract
change), it needs an explicit [Legacy Test Migration] note to retire/promote it — never a
silent assertion weakening. (Directly guards the b1 failure class: don't fake the pass.)

### 6f. Gap-Round Declaration (every delivery)
Each FINDING/delivery must explicitly list what was NOT verified (mock limits,
unconfigured third-party webhooks, live feeds not exercised). Critical unverified gaps
BLOCK completion until Tuhin sign-off. (= our GAP-ROUND; already in the 5-pass, now
mandatory in every FINDING footer.)

### 6g. Verification Pipeline Order (fixed sequence, Tier 2+)
1. Type & Syntax gate (`tsc --noEmit`) → fail routes to build-error-resolver.
2. Format & Lint (eslint/prettier) → auto-fix.
3. Call-Graph Reachability (grep; 0 callers = unwired).
4. Deterministic Seam/Unit tests (`npm test`) → fix SOURCE, never the test.
5. Security & Silent-Failure audit (Tier 3 + auth/storage only).
6. Gap-Round Declaration → critical gap = BLOCKED until approval.

### 6h. Context hygiene ("think in code")
Never read whole multi-file trees into context. Use one-line bash (grep/jq/awk) to pipe
only filtered results. Never dump raw build logs. (Reinforces `.antigravityignore`.)

### 6i. Circuit Breaker (loop guard)
Cap changes ~10% per pass. 3 identical tool calls / repeating errors / zero-delta between
passes = a loop → name the suspect fundamental assumption, present 2-3 options to Tuhin,
stop. Hard 3-iteration cap before escalating. (= our 3-round escalation.)

### 6j. Tooling the thread recommends
- **lightpanda MCP** — default web search/browse/markdown/html fetch tools for the agent
  (`search`, `goto`, `markdown`, `html`). Add if Antigravity needs web reads.
- **Global rules file** lives at `~/.gemini/GEMINI.md` (or `agent.md`) — append, never
  overwrite existing rules. Restart Antigravity after editing.
- **Workflow (Swiss_Robear):** use Gemini planning/thinking for requirements (TDD plan +
  tech-doc + architecture + PRD into the project folder), biggest local model (Qwen
  Coder in LM Studio) for bulk building, high-end models only for review/bugfix/tricky.
- **11-agent topology (reference):** plan · logic · build · surgical · design · scribe ·
  tester · advisor · hunter · sentinel · ship. build/tester/advisor/hunter run auto and
  CANNOT be the main agent (they're verifiers). Maps onto our Claude=advisor/sentinel,
  Antigravity=build/surgical split.

## TUHIN — UI toggles Claude can't flip (set once in Antigravity):
- Terminal policy → **Request Review** (no auto-run of shell/commit/push).
- Autonomy → review-driven for this repo until trusted.
- Planning mode → ON.
- Consider the **3-tier gate** (#6a) as the autonomy model: let Tier-1 edits run, review
  Tier-2, hard-gate Tier-3.
