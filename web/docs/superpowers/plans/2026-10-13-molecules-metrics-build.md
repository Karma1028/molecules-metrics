# Molecules → Metrics — Implementation Plan

> **For agentic workers:** Native execution this session. Steps use checkbox (`- [ ]`) syntax. Frontend-heavy: unit tests where logic warrants (tokens, hooks, API clients, masking, resume data); every page/feature ends with a **browser-QA gate** (4 states + mobile + reduced-motion) instead of a unit test.

**Goal:** Build the two-world ("Artist" field-notebook / "Analyst" instrument-panel) React portfolio to a finished, deployable product per SCOPE.md.

**Architecture:** React 19 + Vite 8 SPA, `data-mode`/`data-theme`/`data-world` CSS scoping, `motion/react`. All live/heavy data behind `/api/*` (Python `5195` in dev; Netlify Functions + GitHub-Action JSON snapshots in prod via a `VITE_API_BASE`-less same-path swap). Assets generated via Google Flow (`flow` MCP, stills free).

**Tech Stack:** React 19.2, Vite 8.3, react-router-dom 7, `motion` 14, TypeScript ~6, oxlint, vitest (add), Netlify Functions, Supabase (Hostel Radio only).

**Spec:** `D:/porfolio/molecules-metrics/web/SCOPE.md`

## Global Constraints
- `motion` imported from `motion/react` — never `framer-motion`.
- Two-world scoping: `:root[data-mode="artist|analyst"]` + `[data-theme]` compose; both worlds coexist.
- Source files ≤ 800 lines; functions < 50; immutable updates; explicit error handling; no hardcoded secrets.
- NO invented personal facts — every life-detail is a typed placeholder sourced from a single `content/` module until Tuhin supplies it.
- Confidentiality: mask ALL client names (InfoLeap/Royal Enfield → "a major motorcycle brand"; SUJAN/Celebal → "enterprise hospitality client"); no confidential figures.
- Secrets never moved through tooling — stay in each server's `.env`.
- NO commit/push/deploy without Tuhin's explicit OK. NO attribution lines.
- Reduced-motion honored everywhere via `useSafeMotion`.
- Assets: Flow stills/characters free (generate freely); Veo clips cost credits (Tuhin OK per batch).

## Review Focus
- **Missing live data / API down** — every `/api/*` consumer shows a graceful local fallback, never a blank/broken box (seen live on the Hostel Radio Spotify embed). Owner: Task 2 (`live` hooks), each page.
- **Reduced-motion user** — no blur/drift/parallax; instant state swaps still legible. Owner: Task 1 (`useSafeMotion`), every animated component.
- **Mobile narrow (375px)** — collage restacks to one legible column, no horizontal overflow, nav → hamburger. Owner: each page QA gate.
- **Confidential-data leak** — masking helper is the only path that renders client names; a test asserts raw names never appear. Owner: Task 11 (case studies).
- **Keyboard/focus** — search player, lightbox, modals, résumé dual-download all keyboard-operable + focus-trapped. Owner: owning tasks.

---

## PHASE 0 — Systems foundation

### Task 1: Motion tokens + safe-motion hook
**Files:** Create `src/lib/motion-tokens.ts`, `src/hooks/useSafeMotion.ts`, `src/lib/motion-tokens.test.ts`
- [ ] Define `motionTokens` (duration/easing/distance/scale), `springs` (snappy/gentle); `useSafeMotion(distance)` returns `{initial,animate,exit}` collapsing to opacity-only under `prefers-reduced-motion`.
- [ ] Unit test: tokens frozen + in-range; `useSafeMotion` strips transforms when reduced-motion mocked true.
- [ ] Run vitest → PASS.

### Task 2: Live-data hooks + fallbacks (extend existing `src/lib/live.ts`)
**Files:** Modify `src/lib/live.ts`; Create `src/lib/live.test.ts`
- [ ] Add typed clients: `useMusicSearch`, `useSpotifyStats`, `useFootball`, `useGithub`, `useMedium`; every hook returns `{data,loading,error,fallback}` and a local fallback payload.
- [ ] Unit test: fetch-fail → `fallback` populated, never throws.

### Task 3: Collage primitives
**Files:** Create `src/components/collage/{Taped,MarginMark,Specimen,Reveal,Pinned}.tsx`
- [ ] Build 5 primitives on motion tokens; `Reveal` = `whileInView once`; `Pinned` = `useScroll`.
- [ ] Browser-QA gate: render a scratch route, verify stagger + reduced-motion.

### Task 4: Deploy skeleton
**Files:** Create `netlify.toml`, `netlify/functions/.gitkeep`, `.github/workflows/snapshots.yml`, `src/lib/api.ts` (same-path `/api` base)
- [ ] `netlify.toml` SPA redirect + functions dir; snapshot workflow stub (writes `public/data/*.json`); `api.ts` resolves `/api/*`.
- [ ] Verify `npm run build` passes.

### Task 5: API endpoints (Python dev `5195`, mirrored later as Functions)
**Files:** (live-data server repo) add `/api/github`, `/api/medium`, `/api/music/{search,lyrics,preview}`, `/api/spotify/stats`, `/api/football/{season,player,compare,messi,news}`, `POST /api/contact`
- [ ] Each endpoint: cached, keyed from `.env`, graceful empty-state. (Blocked endpoints degrade to fallback until keys supplied — flagged, not fatal.)

---

## PHASE 1 — Artist world
Per-page loop each task: design (frontend-design + motion) → build in-theme → ECC review (react/ts/security) → ponytail debt gate → **browser-QA gate (artist light+dark, mobile 375, reduced-motion)**.

- [ ] **Task 6: Hero rework** — single portrait (kill twin ghost); hover-reveal (cards scatter off face, scene desaturates, face stays color); touch tap-toggle; `?mode`/`?theme` overrides intact.
- [ ] **Task 7: `/artist` Home** — taped-clippings board, live channel previews.
- [ ] **Task 8: `/artist/sound`** — tuner toggle → **ME** (Spotify analytics, your-world×Spotify-green) + **HOSTEL RADIO** (re-crafted non-AI skin: tactile radio hardware, grain, broadcast type; search player powered by `/api/music/*`; LRCLIB lyrics; album-art recolor). Port Hostel Radio systems; strip glass card + embed strip.
- [ ] **Task 9: `/artist/football/*`** — Hub, Season, Lab, vs-Messi, then Messi-Story masterpiece. Flow cutouts/illustrations.
- [ ] **Task 10: `/artist/notes`** (Medium feed + local) · `/artist/about` · `/artist/gallery` polish.

---

## PHASE 2 — Analyst world
- [ ] **Task 11: `/analyst/work` case studies** — real set, **masking helper** (test: raw client names never rendered).
- [ ] **Task 12: `/analyst` Home** (+ live GitHub readout) · `/analyst/skills` · `/analyst/journey`.
- [ ] **Task 13: `/analyst/resume`** — dual-download hover-split: Classic (GIM Drive PDF) + Modern (animated HTML CV, same data from one `content/resume.ts`); print-clean; keyboard-accessible.

---

## PHASE 3 — Contact + ship
- [ ] **Task 14: Contact** (both worlds) — working form → `/api/contact`, honeypot + validation, inline success/error.
- [ ] **Task 15: Full cross-world QA** — all routes × light/dark × mobile × reduced-motion × eclipse × switch; fix; present build; (deploy only on Tuhin OK).

## Self-review
Spec coverage: §3–§6 pages all mapped (Tasks 6–14); §3.1 hosting (Task 4); §3.2 hero (Task 6); Flow assets (global). Review-focus inputs each owned. Proportion: plan ≪ code — frontend bodies left to implementer. Data gaps (Drive link, API keys, Medium handle, Spotify profile) degrade to fallback/placeholder, flagged per task, non-blocking.
