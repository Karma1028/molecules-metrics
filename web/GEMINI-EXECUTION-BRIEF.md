# Gemini Execution Brief: Molecules → Metrics, Phase R0 to R8

You are the build agent for Tuhin Bhattacharya's portfolio. This brief is your **complete instruction set**.
It overrides the P3 to P7 section of `MASTER-PLAN.md`. Execute it in order, with full creative ambition
**inside** the guardrails. A guardrail is never a creative suggestion: it is a hard stop.

---

## 0. Read first, in this order (do not skip)

1. `web/AUDIT-2026-10-15.md`: the gap audit. It explains WHY every step below exists.
2. `web/MASTER-PLAN.md` §0 to §3: the twin-world story, the motion physics and the header grammars. These still stand.
3. `web/CHECKPOINT.md`, the top three sections: what is built.
4. `web/BENGAL-MOTIF.md` and `web/SKILLS.md`: the visual identity and the skill list.
5. `src/lib/world-motion.ts`, `src/lib/motion-tokens.ts`, `src/components/WorldLayout.tsx`, `src/components/WorldTransition.tsx`.

Repo: private GitHub `Karma1028/molecules-metrics`. The app lives in `web/`.
- Dev: `cd web && npm run dev`. It is usually already running on http://localhost:5176.
- Live data: the Python server on :5195 (KARMA side) serves `/api/*`. If it is down, Sound and Matchday show fallbacks. That is OK; do not "fix" it by hardcoding data.

---

## 1. Hard rules (any violation = stop, revert, report)

| # | Rule |
|---|---|
| H1 | **One screen.** Every route fits the viewport at 1280×800, 768×1024 and 375×812, in light and dark and with `?rm=1`. That means `scrollHeight === innerHeight`, `scrollWidth === innerWidth`, and **zero elements with overflow auto/scroll whose content exceeds their box**. This includes horizontal tab strips. ALL content kept: compress, re-layout or step through. Never delete content. |
| H2 | **No fabricated facts.** No invented roles, dates, cities, metrics, hobbies or quotes. If a fact is missing, write `[ASK]` in your report and use a neutral placeholder that is visibly a placeholder in dev only. |
| H3 | **No em-dash (—) in any UI copy.** Use a comma, a colon, a middle dot or a full stop. |
| H4 | **Motion**: import only from `motion/react`. Take every duration, ease and spring from `motionTokens`/`springs`/`world-motion.ts`. Gate everything on `useReducedMotion()`. Reduced motion = opacity only, ≤0.18s, no transforms, no loops. |
| H5 | **Effect budget**: per page, 1 entrance + 1 signature interaction. **≤8 `infinite` animations site-wide** (now 26). **Exactly one heavy (WebGL/three.js) effect in the whole site, on the cover `/` only.** |
| H6 | **Identity locks**: Matchday keeps the Barça garnet/blue. Sound keeps the Spotify green. The artist accent is terracotta. The analyst stays pen-blue + teal on dark-default. Terracotta appears in the analyst world ONLY on bridge elements: twin doors, the horse wipe, the brand dot. |
| H7 | **Secrets**: never read, print or commit `.env`, `.mcp.json` or tokens. Live-data creds stay in the Python server. |
| H8 | **Git**: work on a branch per phase (`r2-rule-debt`, `r3-bridge` …) and commit after every green step with a conventional message (`feat:`, `fix:`, `perf:`, `refactor:`, `docs:`). **No attribution or co-author lines.** **Never push and never merge to `main` without Tuhin's explicit OK in chat.** |
| H9 | **Proof, not claims.** "Done" requires the sweep JSON plus screenshots saved in `web/qa/<step>/`, plus `npx tsc -b` with exit 0 and `npx vitest run` all green. Report the exact numbers. Never write "100%" unless the JSON shows every row passing. |
| H10 | **Stay in scope.** Do not touch files unrelated to the current step. Keep the existing copy, routes and component APIs unless the step says otherwise. |

---

## 2. Verification harness (build it in R0, use it every step)

Create `web/scripts/qa-sweep.mjs`, a Playwright script run with `npx playwright` (install it as a devDependency if needed).
- **Routes:** `/`, the 7 artist routes and the 7 analyst routes.
- **Sizes:** 1280×800, 768×1024, 375×812.
- **Variants:** light, dark, and `?rm=1`.
- **Per run:** wait 2.5 s after load, then record:
  - `sh`, `ih`, `sw`, `iw`;
  - `inner`: classes of elements with overflow auto/scroll whose scroll size exceeds the client size by more than 2px;
  - `running`: `document.getAnimations().filter(a => a.playState === "running").length`, which must be 0 under `?rm=1` after 1 s;
  - `infinite`: the count of CSS animations with `iterationCount === Infinity`;
  - console errors, excluding live-API network failures, which are listed separately.
- **Output:** write `web/qa/<step>/results.json`, a one-line PASS/FAIL summary per route, and screenshots of any failing row.

Baseline you must reproduce first (from the audit):
- The cover `/` fails at 768 (sh 2451, sw 844) and at 375 (sh 1784, sw 389).
- `/analyst/skills` has an inner `.rail` at 768 and 375.
- `/analyst/work` has an inner `.spine` at 375.
- `.jtabs` and `.dtabs` scroll at 375.

If your harness does not show these failures, the harness is wrong. Fix it before continuing.

---

## 3. The creative core: "One thread, two weaves"

Tuhin's Instagram is `_threads_of_karma_`. He is from Bankura, the district of the Bishnupur weavers and the terracotta horse. The site title is *Molecules → Metrics*. Fuse these into ONE idea and let every decision serve it:

> **The same thread, woven two ways.** The artist world is the *hand-loom*: warm, irregular, terracotta, things that land like cloth settling. The analyst world is the *jacquard grid*: precise, indigo/teal, things that lock into a weave. The cover is the loom where you choose. The horse is the shuttle that carries you across.

Use this metaphor to decide motion, transitions and copy tone. Examples of good translation:
- Artist entrance = cloth settling: soft overshoot, slight drape (`springs.gentle`, tiny rotate).
- Analyst entrance = threads locking into a grid: clip reveals along an axis, `springs.snappy`.
- **World switch = shuttle pass**: the horse gallop *is* the shuttle. It runs left→right going to the analyst and right→left going to the artist (flip with `scaleX(-1)`). It trails a single terracotta thread line that remains for 300ms as the new world lands.
- **Twin door** = a pulled thread: a small link styled as a thread loop ("Pull the thread → The system behind the fandom"). Hover tightens the loop (a stroke-dashoffset or pathLength tween).

Creative process for every visual step (mandatory, keep it short):
1. Write **3 distinct options** (one sentence each) in your step notes.
2. Pick one against the rubric (§6) and say why in one line.
3. Build it. Screenshot it. Critique it once against the ThreeUI rules: is it behind a strong idea? Is it more than a colour change? Is the copy always readable? Is mobile lighter? Then refine once.

Be bold in **one** place per page, quiet everywhere else.

---

## 4. Steps

### R0 · Safety and harness
- Confirm a clean git state. Create branch `r0-harness`.
- Build `scripts/qa-sweep.mjs` (§2) and reproduce the baseline failures. Commit.
- Add `web/qa/` to `.gitignore` except `qa/**/results.json`. Proof JSON is versioned; PNGs are not.

### R1 · Truth (ASK; do not guess)
Ask Tuhin these **in one message**, and keep building non-dependent steps while waiting:
1. The InfoLeap title exactly as on the CV PDF ("Data Science Intern" or "BI & Analytics Intern"). Then make Landing, Journey and Resume match it.
2. The target role to name on `/analyst`.
3. The cities (or "remote") for Celebal Technologies and InfoLeap Research, for the Journey map.
4. The Hostel Radio production URL (`RADIO_FULL_URL`), or keep it hidden.
5. OK to delete the dead `src/App.css`.

### R2 · Rule debt (branch `r2-rule-debt`)
- **Cover `/`:** remove the vertical and horizontal overflow at 768 and 375. The cover is an HTML string in `Landing.tsx`. Fix the layout now; the full React port happens in R5.
- **Skills `.rail`, Work `.spine`, Journey `.jtabs`, Dashboard `.dtabs`:** replace the scroll strips with non-scrolling patterns:
  - wrap the chips onto 2 rows;
  - use a segmented control with abbreviations;
  - use a prev/next stepper with an `n/N` counter;
  - or use a `<select>`-style picker on ≤440px.
  Keep every item reachable by keyboard.
- **Horse mask:** `public/motifs/bankura-horse.png` is 1.6 MB. Make a ≤40 KB version: an SVG trace or a 512px WebP alpha. Keep its silhouette fidelity and update the CSS mask URL.
- **Images:** generate responsive 800w/1600w WebP/AVIF for `public/frames/*` and `public/me.jpg` (q≈70). Use `srcset`/`sizes`. Do not change the crops.
- **Done when:** the sweep is all PASS at every size, and the sweep JSON is committed.

### R3 · The bridge: story first (branch `r3-bridge`)
- **Build `src/components/TwinDoor.tsx`:** the thread-loop link (§3). It takes `to`, a `label` and the destination `world`, and it passes the label to `WorldTransition` through router state.
- **Twin pairs.** Use this door copy (no em-dash). You may tune it, but keep it short and factual:

  | Artist page | ↔ | Analyst page | Door copy |
  |---|---|---|---|
  | Gallery | ↔ | Work | "Pull the thread: how I work" / "Pull the thread: what I see" |
  | Sound | ↔ | Dashboard | "The numbers behind the playlist" / "The listening behind the numbers" |
  | Matchday | ↔ | Work LOG.01 FC Barcelona Analytics System | "The system behind the fandom" / "The terrace behind the model" |
  | Field Notes | ↔ | Skills | "Notebooks into toolkit" / "Toolkit, from notebooks" |
  | About | ↔ | Journey | "Bankura to Goa, mapped" / "The person behind the path" |

- **Contact endings.** Artist Contact ends with "You've met Karma. Meet Tuhin →". Analyst Contact ends with the mirror line.
- **`WorldTransition` changes:**
  - Directional gallop: the horse runs left→right when heading to the analyst world and right→left when heading to the artist world.
  - The destination label appears mid-wipe: Fraunces when the artist world is the destination, JetBrains Mono when the analyst world is.
  - Add the thread trail.
  - Reduced motion: no wipe, just the destination.
- **Cover thesis line** beside the switch, built from existing facts only. Draft: "Chemical engineer by training, analyst by trade, photographer by habit. One thread, two weaves." Ask Tuhin if unsure.
- **Done when:** every page links to its twin; you have a GIF of both directions saved to `qa/r3/`; the sweep passes.

### R4 · Calm pass (branch `r4-calm`)
Apply the keep/cut list in AUDIT §6 exactly:
- About: tags become static links; the pointer tilt is removed.
- Matchday: keep ONE of Ken Burns, beam, scan or glare.
- Sound: the vinyl spin stops when nothing is playing.
- Analyst: the pulse dots inside panels go; keep only the brand dot and the caret. Hover lifts become border-only.
- Highlighter sweep: plays on the first visit per session only, keyed in `sessionStorage` inside try/catch.

**Done when:** the sweep reports **≤8 infinite animations** and `running === 0` under `?rm=1`.

### R5 · The one wow: woven cover (branch `r5-cloth`)
**Source:** ThreeUI **Woven Cloth** — https://threeui.com/three-js/woven-cloth
- Open it, play with it, and **confirm its licence and free/pro status** before copying. If it is pro or unlicensed, STOP and ask Tuhin. Do not reimplement it from memory as a "clone".
- Also review the **Skeuomorphic Toggle** for the switch: https://threeui.com/ui-elements/skeuomorphic-toggle

**Steps**
1. **Port the cover to React** first. `Landing.tsx` is now a 738-line HTML string with imperative DOM.
   - Keep the existing copy, the switch, the live pins and the links.
   - Reuse `useWorldTheme` and the `live.ts` hooks.
   - Gate it with the sweep before adding anything.
2. **Add the cloth** as a lazy-loaded component, `src/components/cover/WovenCloth.tsx`. It loads `three` only on `/` via a dynamic `import()`, so the main chunk must not grow by more than 5 KB.
3. **Brand it with more than colour:**
   - **Weave:** terracotta `#b85c2e` / `#cf7d4a` warp and an alpona-cream `#f4ead9` weft, with a subtle Bishnupur-style border band. Optional: a small horse motif woven in.
   - **Type:** "Molecules → Metrics" woven in Fraunces.
   - **Wind:** slower than the demo.
   - **Cursor:** pushes gently, without whipping.
   - **Entrance:** the cloth *unfurls* from the top bar like a banner being hung (no fade-in).
4. **Re-weave on switch.** Flipping Karma → Tuhin re-dyes the cloth to the analyst palette: pen-blue `#4F93DB` / teal `#34D3C6` on `#0E151B`, with a tighter grid twill and the type swapped to Space Grotesk. Choreography: thread by thread, as a texture blend over about 600ms. The switch now *feels* like the loom.
5. **Placement and readability:**
   - Behind or beside the headline. It must never cover the h1, the switch or the links.
   - Add a contrast scrim only where the copy overlaps it.
   - Measure that the text contrast is ≥4.5:1.
6. **Mobile and reduced motion:**
   - ≤760px: drop the cloth segments by about 4× and cap DPR at 1.5, or show a static poster render if the frame time is over 16ms.
   - `?rm=1` / reduced motion: a poster image only, with no WebGL context created.
   - Pause rendering when the tab is hidden.
   - Dispose the renderer on unmount.
7. **Done when:**
   - the sweep passes;
   - Lighthouse mobile performance on `/` is **≥85**;
   - the main chunk grows by **≤5 KB**;
   - there are no WebGL console errors;
   - you have screenshots of the light cover, the switched cover, mobile and reduced motion.

### R6 · Analyst parity (branch `r6-analyst`)
The analyst world is the recruiter-facing half. Today it gives a recruiter nothing in 5 seconds.

- **`/analyst` Home:** a huyml-style index.
  - **Left:** the 6 LOG rows.
  - **Right:** a preview pane with a big blur-in counter `0N/06`. On row hover or focus it shows that page's single artefact.
  - Above the fold: the target role (from R1) and a pinned **Résumé (PDF)** button.
  - Wheel and arrow keys step rows *vertically*. That is deliberate: the artist Home steps horizontally.
- **Journey:** the **map with pins**.
  - A stylised outline from West Bengal to Goa.
  - The route draws itself with `pathLength`.
  - Pins are the 6 nodes; clicking one opens its card.
  - Only cities Tuhin confirmed in R1. An unconfirmed node gets an off-map "remote" chip.
  - Mobile is a vertical route stepper, with no scroll.
- **One calm artefact per analyst page:**
  - Skills: a small evidence matrix (skill × LOG where it was used).
  - Work: the real project screenshot per log, if assets exist. If not, `[ASK]`.
  - Dashboard: sparklines that draw once.
- **Done when:** the recruiter test passes. Load `/analyst` at 1280 and 375: are the role, the proof and the CV visible without interaction? The sweep passes.

### R7 · Showpiece #3, optional (ask before starting)
Sound as the retro radio, using ThreeUI **CRT** (https://threeui.com/backgrounds/crt) as the radio face, with Spotify-green phosphor. Since the cover cloth is already the one heavy effect, this must be **Canvas 2D or CSS only**, or it is skipped.

### R8 · Final QA
- The full sweep across all sizes, themes and `?rm=1`.
- A keyboard-only pass on the cover, strip, deck, tabs, doors and lightbox. Add a global `:focus-visible` ring per world.
- Lighthouse desktop and mobile on `/`, `/artist` and `/analyst`.
- GIFs of the 3 transitions.
- Update `CHECKPOINT.md`.
- Write `web/qa/FINAL.md` with the honest numbers.

---

## 5. Reporting format (after every step, in chat)

```
STEP Rn: <name>   branch: <branch>   commit: <sha>
Built: <3-6 bullets>
Options considered: A / B / C → chose B because <one line>
Proof: sweep <x>/<y> PASS (fails: …) · tsc 0 · vitest n/n · infinite=<k> · qa/<step>/
Open [ASK]: …
Next: …
```

Then stop for Tuhin's look after any step that changes visuals (R3, R5, R6).

---

## 6. Creative rubric (score each option 1 to 5, pick the highest total)

| Criterion | The question |
|---|---|
| Idea | Does it express "one thread, two weaves" or the twin story, not just decorate? |
| World fit | Paper/hand-loom physics for the artist, instrument/grid for the analyst. Does it clash with the other world? |
| Restraint | Is it the ONE bold thing on this page? Does it break the budget? |
| Legibility | Copy, CTA and data always readable, at 375 too? |
| Craft | Choreography feels intentional: entrance, settle, and how it responds to the cursor? |
| Cost | Bytes, frame time on mobile, and a reduced-motion twin? |

## 7. Anti-patterns (the audit found these: do not repeat them)

- Adding motion to every section ("effect soup").
- Claiming "100% pass" from a partial sweep, or without testing `/` and 768.
- Changing personal facts without a recorded answer from Tuhin.
- Copying a ThreeUI demo with only the colours changed.
- Ambient infinite loops with no meaning.
- Storing proof outside the repo.
- Editing files outside the current step.
- Pushing or merging without OK.
