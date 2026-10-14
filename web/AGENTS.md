# Molecules → Metrics — Agent Operating Contract (READ FIRST, EVERY SESSION)

> This file auto-loads for any Claude Code session opened in `web/`. `AGENTS.md`
> (same dir) is the identical contract for Gemini / Antigravity / any other agent.
> It exists because past sessions built pages WITHOUT the skill/plugin stack and
> shipped generic, templated results. That failure is the reason this file is law.
> If you are a fresh checkpoint from another app/account: you still obey all of it.

## 0. Boot sequence (do these in order, before any build or edit)
1. Read `web/CHECKPOINT.md` — current state, what's shipped, what's next, the live creative brief.
2. Read `web/SCOPE.md` — the full WHAT (all 13 pages, narrative spine, per-page specs).
3. Read `web/SKILLS.md` — the standing skill list. This is not optional reading.
4. Read this file fully. Then work.

## 1. SKILLS ARE MANDATORY, NOT OPTIONAL (the #1 rule — Tuhin's standing demand)
Every UI task invokes the relevant skills via the Skill tool. Do NOT hand-roll what a
skill covers. "Antigravity/this app might not have the skill" is not an excuse — invoke
what IS available; the output must use the skill guidance AND be a great animated result.

- **Core, almost every task:** `motion-foundations`, `motion-patterns`, `motion-advanced`,
  `frontend-design-direction`, `design-taste-frontend`, `browser-qa`.
- **Polish:** `make-interfaces-feel-better`, `high-end-visual-design`, `web-design-guidelines`, `storytelling`.
- **Stack:** `react-patterns`, `react-performance`, `vite-patterns`.
- **Verify:** `verification-before-completion`, `continuous-learning-v2`.
- Invoke skills BEFORE writing the page, not after. Load only what the page needs; batch; don't sprawl.

## 2. PLUGINS / TOOLCHAIN (also Tuhin's standing demand)
- **21st.dev — USE IT VIA DIRECT HTTP JSON-RPC (verified working 2026-10-13, no WARP, no restart).**
  The old blocker story (SNI RST → needs WARP + a fresh session so the plugin MCP registers at boot)
  is SUPERSEDED. `21st.dev` is reachable here now, and you do NOT need the `21st:21st-ui` plugin MCP to
  register — hit the MCP endpoint straight from the Bash tool with `curl`. Key `API_KEY_21ST` is in the
  bash env (also `~/.claude/settings.json`). Recipe (one Bash call):
  1. `initialize` (POST `https://21st.dev/api/mcp`, headers `x-api-key: $API_KEY_21ST`,
     `Accept: application/json, text/event-stream`, `Content-Type: application/json`) → grab
     `Mcp-Session-Id` from response headers (grep `^Mcp-Session-Id:` only — the ACL header also contains the string).
  2. POST `notifications/initialized` (no id) with that session id + `MCP-Protocol-Version: 2025-06-18` → expect 202.
  3. `tools/call` any tool. Responses may be SSE — strip a leading `data: ` before parsing JSON.
  - **Tools:** `search` (find components, UNLIMITED on free tier), `get_component` (full code — METERED:
    only **2 retrievals/day** on free tier, spend on signature/hero components), `get_theme`, `get_inspiration`,
    `get_usage` (check budget first). **`generate` / AI is OFF (0 credits)** — do NOT call generate; use
    `search` + `get_component`, then build it yourself with the coding agent.
  - If a fresh session's probe shows `21st.dev` unreachable again (curl RST/timeout), THEN fall back to WARP,
    or hand-build with `motion-patterns` + `motion-advanced` + `frontend-design-direction`. Probe before assuming either way.
  - **NEVER ship raw 21st output** — re-skin every component into the field-notebook (artist) / instrument-panel (analyst) system + motion tokens.
- **ECC rules** enforced site-wide (coding-style, files ≤800 lines, immutability, error handling, security);
  run ECC reviewers (`react-reviewer`/`typescript-reviewer`/`security-reviewer`) after each page.
- **ponytail** (`reel-crew:ponytail-review` / `ponytail-audit`) on built code to catch tech debt before sign-off.
- **Flow MCP** (`flow_*`) for generated imagery/characters — stills + characters are free (0 credits);
  animated Veo clips cost credits → only with Tuhin's OK per batch. Save assets to `web/public/` + commit so they persist.

## 3. HARD CONSTRAINTS (never violate — these outrank taste)
- **One screen per page.** No page is a scrollable element. Reveal overflow creatively (panel decks w/
  arrows/dots/keys/swipe, popovers, tooltips, "more" expanders, animation). Keep ALL content, never cut.
- **Caveman reply style** (terse; code/commits/security written normally).
- **NO commit / push / deploy without Tuhin's explicit OK.** Nothing auto-committed.
- **NO attribution lines** in commits/PRs.
- **Never move secret values through tools** — Spotify/Barça/YouTube/email creds stay in the Python server `.env`.
- **No fabricated personal facts / KPIs.** Honest empty-states, real numbers, ASK if unknown.
  The old `live-upgrade` site's fictional content is NOT a source.
- **Privacy tiers:** Tier 3 (finance/health/diary) = LOCAL ONLY, no cloud. Tier 2 (work/placement) = Groq/Gemini OK, no OpenAI.
- **Copy:** no em-dash (—) in UI text (en-dash – for ranges OK); no `&larr;`/`&rarr;` entity leaks; mirror arrows via `Icon i-arrow`.
- **QA before "done":** browser-QA all states — artist/analyst × light/dark + mobile 375 + reduced-motion. Verify, don't claim.
- **Ask before assuming** on any ambiguity. User-pasted reference links outrank refs you find.

## 4. Motion system (already built — use it, don't reinvent)
- `motion` from `motion/react` only (never framer-motion). `src/lib/motion-tokens.ts` = `motionTokens` + `springs`.
- Reduced-motion disables transforms (opacity ≤0.2s only). Animate transform/opacity only, never layout props.
- Per page: `document.documentElement.dataset.oneScreen = ""` on mount, delete on unmount. `.page` height is `calc(100dvh - nav - 44px)`, flex column, overflow hidden.
- Two worlds scoped by `:root[data-mode="artist"|"analyst"]` + `[data-theme]` on `<html>`.

## 5. Run
- `cd "D:/porfolio/molecules-metrics/web" && npm run dev` → Vite (port varies 5173–5176; navigate directly if preview_start reuses a stale server).
- Live-data Python server on `127.0.0.1:5195`, Vite proxies `/api`. Dev only; prod = Netlify Functions + baked JSON (see SCOPE §3.1).

## 6. Self-check before sign-off (the failure this file prevents)
- [ ] Did I invoke the relevant skills (§1) for this page — not hand-roll?
- [ ] Did I attempt 21st per §2 (or consciously fall back) — not silently skip it?
- [ ] One screen, all content, no inner scroll?
- [ ] QA'd all 4 states + mobile + reduced-motion in the browser?
- [ ] No fabricated facts, no moved secrets, no commit without OK?
If any box is unchecked, the work is not done — regardless of how it looks.
