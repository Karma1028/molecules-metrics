# Molecules → Metrics: Master Plan (story, motion, two worlds)

Written 2026-10-14, end of session 2k. Built from a code audit of `src/` and a 1280×800 walkthrough of
Landing, all 7 artist pages and the analyst pages, plus the 9 reference sites. This is the plan only.
**Nothing here is built yet and nothing is committed.** Execution = the continuation prompt at the bottom.

Standing rules still bind every phase:
- Every page fits ONE screen, no inner scroll, keeps ALL content.
- No fabricated facts or KPIs. `[ASK]` = must ask Tuhin first.
- No em-dash in UI copy.
- motion only from `motion/react`, values from `motionTokens`/`springs`, gated on `useReducedMotion`.
- QA light, dark, 375 mobile and reduced-motion before claiming done.
- No commit, push or deploy without an explicit OK.

---

## 0. The one idea that ties it together

The title already is the story: **molecules → metrics**. One person, two lenses on the same life.

| | ARTIST world ("Karma") | ANALYST world ("Tuhin") |
|---|---|---|
| Role in the story | the **raw material**: what he sees, hears, cheers for | the **instrument**: how he measures, models, decides |
| Verb | observe, feel, collect | measure, test, ship |
| Material | paper, tape, ink, film, terracotta | glass, grid, mono type, signal |
| Physics | soft springs, slight rotation, things *land* | snappy, axis-aligned, things *lock* |
| Numbering | Plates I to VI (roman, hand) | LOG.01 to LOG.06 (mono) |
| Time | Goa time of day, human ("evening in Goa") | HH:MM:SS telemetry |
| Accent | terracotta | pen-blue + teal |

Every page in one world gets a **twin** in the other. Each twin pair shares one subject and shows it through
both lenses, with a "crossover door" between them. That makes the site one story instead of 13 pages:

| Artist page | ↔ | Analyst twin | Shared subject | Door copy (draft) |
|---|---|---|---|---|
| Gallery (frames) | ↔ | Work (logs) | things he made | "See how I work" / "See what I see" |
| Sound (listening) | ↔ | Dashboard (telemetry) | his own data | "The numbers behind the playlist" |
| Matchday (the terrace) | ↔ | Work LOG.01 FC Barcelona Analytics System | Barça | "The system behind the fandom" |
| Field Notes (notebooks) | ↔ | Skills (capability map) | how he thinks | "Notebooks → toolkit" |
| About (the person) | ↔ | Journey (the trajectory) | his path | "Bankura to Goa, mapped" |
| Contact (postcard) | ↔ | Contact (uplink) | reaching him | (no door, both lead out) |

---

## 1. What the audit found

### 1a. Clashes between the two worlds (outer UI/UX)

| # | Clash | Evidence | Fix |
|---|---|---|---|
| C1 | **Shared theme kills analyst identity.** The analyst world is designed dark-default. One eclipse click in the artist world stores `nb-theme=light`, and the analyst world then renders light too. | `src/lib/theme.ts` single `KEY="nb-theme"`. Walkthrough: every analyst page was light. | Remember theme per world (`nb-theme-artist`, `nb-theme-analyst`). |
| C2 | **Same header grammar in both worlds.** All 13 pages use kicker, then h1 with an accent word, then a muted lede. The analyst pages borrow the artist idiom too: italic `<em>`, as in "Skills, *mapped*." and "Let's talk *data*." | Skills.tsx:244, analyst Contact.tsx:100 | Two header systems (§3). Artist: Fraunces + hand note + `.hl` sweep. Analyst: mono ID line (`LOG.03 / JOURNEY / 2008-2027`) + roman h1, never italic. A blinking caret replaces the highlighter. |
| C3 | **"Live" idiom duplicated.** Live clocks now appear on artist Home and artist Contact, and Dashboard has its own. Pulse dots appear on the artist Home foot, the analyst brand and the Dashboard panels. | ArtistHome foot, artist Contact, Dashboard | Analyst owns telemetry: HH:MM, pulse dots, "live". The artist keeps time but says it as a human phrase from the same hook, e.g. "evening in Goa", with no seconds and no pulse. |
| C4 | **Same in-world page transition in both worlds.** It is a fade with y 14 and a hardcoded `0.35`. | WorldLayout.tsx `transition={{ duration: 0.35 ... }}` | Per-world route transition (§2) using tokens. |
| C5 | **Barça and Spotify appear in both worlds with no framing.** Barça is in Matchday, in Dashboard (#1 LaLiga) and in Work LOG.01. Spotify is in Sound and in Dashboard. Without framing it reads as repetition. | Dashboard.tsx:155,181 | Turn it into the twin story (§0). Same data, different lens, with an explicit crossover door. |
| C6 | **The planned slice-4 "analyst accent → terracotta" would erase the contrast.** | BENGAL-MOTIF slice 4 | **[DECISION D1]** Recommend instead that terracotta becomes the *bridge* colour only: the brand dot, the crossover doors, the world-switch wipe and the horse. The analyst keeps pen-blue + teal. |
| C7 | **Analyst Home is the weakest page.** It is six thin rows with a lot of dead space. The artist Home is the richest. The asymmetry says the analyst is an afterthought. | screenshot 1280 | Rebuild it as a huyml-style index with a preview (§4). |
| C8 | **Landing copy versus Journey.** Landing says "Data Science intern at InfoLeap". Journey says "BI & Analytics Intern". | Landing.tsx:50, Journey.tsx:64 | **[ASK]** which title is right. Use one everywhere. |

### 1b. Inner code

| # | Issue | Where | Fix |
|---|---|---|---|
| K1 | The one-screen `useEffect` is copy-pasted 8×. | About, artist Contact, analyst Contact/Dashboard/Journey/Resume/Skills/Work, ComingSoon | `src/hooks/useOneScreen.ts` (`"toc" \| "one-screen"`), plus a test. |
| K2 | **No-scroll rule broken in code.** Mobile `overflow-y:auto` on analyst Contact:69, Dashboard:90, Journey:122, Resume:100. Skills:167 sets `body{overflow:auto}`. Sound `.lyrics-wrap` scrolls. Gallery mobile scroll is pre-existing. | listed | Redesign each at ≤860 to fit: compress, use tabs or steppers, never scroll. Measure at 375×812 and 768×1024. |
| K3 | Route transition duration and ease are hardcoded. | WorldLayout.tsx | Use `motionTokens`. Variants come from a new `src/lib/world-motion.ts`. |
| K4 | Landing is an HTML-string port. It uses imperative `querySelector`/`setTxt`, has its own eclipse and theme code, and has 3 em-dashes in visible copy (lines 26, 49, 50). | Landing.tsx (738 lines) | Phase 1: remove the em-dashes. Phase 4: port it to React components that reuse `useWorldTheme` and the live hooks. |
| K5 | No code splitting. All 14 pages load eagerly. | App.tsx | `React.lazy` per page + `Suspense` with a world-styled fallback. |
| K6 | `App.css` is dead. It is imported nowhere and has 184 lines. | src/App.css | Delete it, after an OK. |
| K7 | Stale colour. Radio `VOID_PALETTE.accent` is `#E4631F`, the old vermilion from before the terracotta swap. | sound/Radio.tsx | Read it from the CSS token. |
| K8 | Reduced-motion is only verified in code, because the OS preference can't be toggled in the pane. | all | Dev-only `?rm=1` wraps the app in `<MotionConfig reducedMotion="always">` and sets `data-rm` for the CSS `@media` twins. Real QA becomes possible. |
| K9 | Inline durations in Matchday and GalleryLightbox. | Matchday.tsx:474-700, GalleryLightbox.tsx:381-438 | Move them to tokens. Keep `0` for the reduced branch. |
| K10 | The motion vocabulary is scattered. Each page invents its keyframes in its CSS string. | all pages | `src/lib/world-motion.ts` exports the per-world presets (`artist.land`, `artist.turn`, `analyst.lock`, `analyst.scan`). The pages compose them. |

---

## 2. Motion system: two physics, one bridge

**Artist "paper physics"**
- Enter: drop and settle. y +16, a slight random rotation of ±1.5deg ending at its rest angle, `springs.gentle`.
- Emphasis: ink-in, the `.hl` sweep and blur-in counters.
- Route change in-world: **page turn**. The outgoing page skews and slides left under a paper-edge shadow, and the new one lands. This reuses Landing's curtain idea at small scale. Transforms only.

**Analyst "instrument physics"**
- Enter: lock in. Opacity, plus `clip-path: inset(0 0 100% 0)` to `inset(0)`, `springs.snappy`. No rotation.
- Emphasis: number tickers (`useCountUp`), sparkline `pathLength` draw, a typed mono ID line with a caret.
- Route change in-world: **scan wipe**. A thin teal scan line sweeps top to bottom with the new page revealed behind it, and a mono readout flashes the route (`→ /analyst/journey`).

**The bridge (cross-world)**
- Keep the horse gallop (`WorldTransition`) and evolve it:
  1. Direction encodes travel. Artist→analyst gallops left to right, analyst→artist right to left.
  2. Mid-wipe, the panel shows the destination twin's name in Fraunces/hand when heading to the artist, and in mono when heading to the analyst.
  3. A crossover door (§0) passes its label so the wipe can say "Matchday → the system behind it".

**Evolving choreography** (the "animations that evolve" ask)
- The first visit of a session gets the full staged entrance. Repeat visits get a shortened one (`normal` → `fast`), keyed on `sessionStorage` (try/catch). The site gets quicker as you learn it, like a tool you are getting used to.
- Optional P3: a **trail of terracotta stamps** in the footer, one per page visited, in deji sticker style. It is the visitor's own progress through the story. When all 12 are visited, the cover switch shows a small "both sides seen" note. Local only.

Reduced motion everywhere: opacity ≤0.2s only. No wipe, no gallop, no tilt, no trail.

---

## 3. Two header grammars (fixes C2)

```
ARTIST                                  ANALYST
[horse] Plate III · Field Notes         LOG.04 / SKILLS / capability-map ▍
Working notebooks.  (Fraunces 900,      Skills map          (Space Grotesk 700,
  .hl sweep on one word)                 no italics, no highlighter)
  ~ hand note in Caveat, rotated        // mono lede, 1 line, teal key terms
```

Build two tiny components and replace the 13 hand-rolled headers with them:
- `src/components/headers/PlateHeader.tsx` (artist)
- `src/components/headers/LogHeader.tsx` (analyst)

---

## 4. Page-by-page plan (refs → interaction), with acceptance criteria

The ✅ rows were done in session 2k. The others are to build. Every row must pass the one-screen check at
1280×800, 768×1024 and 375×812.

### Artist
| Page | Status | Next move | Borrowed from |
|---|---|---|---|
| Landing (cover) | partly done | (a) Remove the em-dashes. (b) A hand-written "Karma" / "Tuhin" signature writes itself over the portrait as the switch flips (SVG stroke `pathLength`). (c) The switch flip previews the horse direction. | senbuzy (hand title over the figure), quangdinh |
| Home | ✅ counter, wheel strip, clock | Swap the clock to the human phrase (C3). | huyml |
| Gallery | ✅ deck + counter | Fix the mobile scroll (K2). On hover, the next print's caption ink-ins. Add a crossover door to Work. | huyml |
| Sound | not touched | **Retro radio object.** The page becomes one skeuomorphic set, in madebyhart style. The dial tunes between "Now playing" / "Top artists" / "Lyrics" instead of tabs; Spotify green stays as the display glow. Lyrics fit in a 5-line window that auto-advances. This replaces the scroll (K2) and ties in Hostel Radio (`RADIO_FULL_URL` [NEED]). | madebyhart, Hostel Radio |
| Matchday | not touched | **Giant type + tear-off ticket.** "VISCA" sits as huge outline type behind the hero, kodeimmersive style. The next-fixture card is a ticket stub you drag to tear, with springs.release, and it reveals the countdown. Keep garnet/blue. Add a crossover door to Work LOG.01. | kodeimmersive, deji (tactile) |
| Field Notes | ✅ fanned hand | **Poetic lede.** The intro arrives line by line, slow, davidwhyte style, over a faint watercolour wash in terracotta-50. Door to Skills. | davidwhyte |
| About | ✅ ribbon, tags, tilt, ink-in | Make the floating tags the twin doors: Barça → Matchday, "the path" → Journey. Add a door to Journey. | meermohsin, quangdinh, jameschugh |
| Contact | ✅ stamp trail, clock | Human clock phrase (C3). The postcard "posts" with a stamp-thunk spring on mailto click. | deji |

### Analyst
| Page | Status | Next move | Borrowed from |
|---|---|---|---|
| Home (index) | weak | **huyml index with preview.** Left: the 6 LOG rows with a typed mono ID. Right: a big blur-in counter `04/06` plus a live preview of the hovered log (sparkline, first stat, or one line from it). "ANALYST" sits as giant outline type behind (kodeimmersive). Wheel or arrow keys step rows *vertically* (artist Home steps horizontally: deliberate contrast). | huyml, kodeimmersive |
| Skills | built (tabs) | **Unwrap the toolkit.** The selected lens "unwraps": cards slide out of a closed case with a stagger. Each skill shows "used in → LOG.0x" evidence links into Work. Remove the italic `em`. Fix `body{overflow:auto}`. | jameschugh (unwrap toolkit) |
| Work | built (pager) | **Vertical log reel.** Wheel or swipe steps LOG.01 to 04 on the Y axis with the scan wipe and a `LOG 02/04` ticker. The FC Barcelona log gets a door back to Matchday. | huyml (wheel slider) |
| Journey | built (3 columns) | **Journey map with pins.** A stylised outline of West Bengal → Goa. A dashed route draws itself (`pathLength`) Bankura → Kolkata (Jadavpur) → … → Goa (GIM). The pins are the 6 nodes, and clicking one opens its card. The mobile version is a vertical route, no scroll. **[ASK]** where Celebal and InfoLeap were (city, or remote), since a pin can't be guessed. | jameschugh (map + pins) |
| Dashboard | built | Frame it as "the artist, measured": panel heads say whose data it is ("from Sound", "from Matchday") and link back. Numbers tick. Add a freshness stamp per panel. Fix mobile scroll. | the twin idea |
| Resume | built | **Printing sheet.** The CV page "prints" in with a scan line feeding paper, with the download button pinned. Fix mobile scroll. | madebyhart (object), instrument physics |
| Contact | built | **Uplink terminal.** The email is composed by a typed console line, with a copy-to-clipboard tick. Remove the italic. Fix mobile scroll. | console idiom |

---

## 5. Build order (phases)

| Phase | Scope | Why first |
|---|---|---|
| **✅ P0 Foundations** | K1 `useOneScreen` · K3/K10 `world-motion.ts` · K8 `?rm=1` QA switch · C1 per-world theme · K6 delete App.css (pending OK) · K5 lazy routes | Every later step uses these. |
| **✅ P1 Separation** | §3 PlateHeader/LogHeader across all 13 pages · C3 clock/live split · per-world route transitions (§2) · Landing em-dashes · C8 answer | Stops the worlds clashing before anything new is added. |
| **✅ P2 Rule debt** | K2 mobile no-scroll on 6 pages + Gallery + Sound lyrics · K7 · K9 | Brings the one-screen rule to 100%. |
| **P3 Bridge** | Twin doors on all pairs · horse direction + destination label · D1 bridge-colour decision applied | This is the story. |
| **P4 Analyst showpieces** | Home index + preview · Journey map · Work vertical reel · Skills unwrap | Raises the analyst to match the artist. |
| **P5 Artist showpieces** | Sound radio · Matchday giant type + ticket · Notes poetic lede · Landing signature | The remaining refs. |
| **P6 Evolve + polish** | Session-shortened choreography · optional stamp trail · Landing React port (K4) | Nice to have. |
| **P7 QA + review** | browser-qa at 1280/768/375 × light/dark × `?rm=1` · react-reviewer + a11y pass · tsc + vitest | Done means verified. |

Skills to invoke (see `SKILLS.md`):
- motion-foundations / motion-patterns / motion-advanced (P0, P3-5)
- frontend-design-direction (P1, P4-5)
- browser-qa + verification-before-completion (every phase end)
- react-reviewer agent (after P0, P4)

## 6. Decisions and data needed from Tuhin

- **D1** Analyst accent: keep pen-blue/teal and use terracotta as the bridge only (recommended), *or* the BENGAL-MOTIF slice-4 full swap?
- **C8** InfoLeap title: "Data Science intern" or "BI & Analytics Intern"?
- **Journey map:** cities for Celebal Technologies and InfoLeap Research, or remote?
- **Sound:** the Hostel Radio production URL (`RADIO_FULL_URL`), or leave the radio link hidden?
- **K6:** OK to delete the dead `src/App.css`?

---

## ⏩ Continuation prompt (paste to resume)

```
Resume Molecules → Metrics portfolio at D:\porfolio\molecules-metrics\web (React+Vite, dev server
http://localhost:5176). Read web/MASTER-PLAN.md FIRST, then CHECKPOINT.md (top section), SKILLS.md.

Task: EXECUTE MASTER-PLAN.md phase by phase starting at P0, then P1, P2 ... Do not re-plan.
Before P1, ask me the open items in §6 (D1, C8, journey cities, radio URL, App.css delete) in ONE
AskUserQuestion; proceed with recommended defaults for anything I skip, and never invent facts.

Per phase: invoke the skills listed in §5; keep motion in motion/react with motionTokens/springs and a
useReducedMotion gate; every page one screen, no inner scroll, all content kept (verify
scrollHeight===innerHeight and scrollWidth===innerWidth at 1280x800, 768x1024, 375x812, light+dark,
and with ?rm=1 once P0 ships it); tsc + vitest green; screenshot proof via SendUserFile.
After each phase: tick it in MASTER-PLAN.md, add a short CHECKPOINT.md entry, and stop for my look if
the phase changed visuals.

Rules: caveman terse replies; no em-dash in UI copy; no fabricated personal facts or KPIs (ask);
Matchday keeps Barça garnet/blue, Sound keeps Spotify green; secrets stay in the Python .env; Tier 3
local only; NO commit/push/deploy without my explicit OK; no attribution lines.
```
