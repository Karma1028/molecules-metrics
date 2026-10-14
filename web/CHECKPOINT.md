# Molecules → Metrics — Portfolio Checkpoint

> ## 🔎 GAP AUDIT (2026-10-15) — read `AUDIT-2026-10-15.md` before continuing
> Revised order R0-R8 replaces MASTER-PLAN P3-P7. Key facts: git now set up (private Karma1028/molecules-metrics, baseline 96b874a); Gemini follows web/GEMINI-EXECUTION-BRIEF.md; cover `/` overflows at
> 768+375 (both axes); Skills/Work/Journey/Dashboard still have inner scrollers at 375; 26 infinite
> loops → budget ≤8; one wow = ThreeUI Woven Cloth on cover (pending OK); horse mask PNG 1.6 MB.

> ## 🗺 MASTER PLAN written (2026-10-14, end of 2k) — read `MASTER-PLAN.md` FIRST
> Audit + plan only, nothing built from it yet, nothing committed. Twin-page story (artist = raw
> material, analyst = instrument), two motion physics + horse bridge, clash list C1-C8, code debt
> K1-K10, phases P0-P7, open decisions in §6. Continuation prompt at the bottom of MASTER-PLAN.md.

> ## 📐 PHASE P2 Rule Debt — DONE (2026-10-15)
> - **K2 Mobile No-Scroll Across 6 Pages + Gallery + Sound Lyrics**:
>   - `Skills.tsx`: eliminated `body{overflow:auto}` and `.page.p-sk{height:auto;overflow:visible}`, replaced with strict one-screen responsive grid.
>   - `Contact.tsx`: eliminated `.p-ct{overflow-y:auto}`, redesigned channels into compact 2-col cards with zero overflow.
>   - `Dashboard.tsx`: eliminated `.p-db{overflow-y:auto}`, added mobile instrument switcher tabs (`dtabs`) showing active feed with full fidelity and zero scroll.
>   - `Journey.tsx`: eliminated `.p-jn{overflow-y:auto}`, added mobile era switcher tabs (`jtabs`) showing 2 nodes per era with zero scroll.
>   - `Resume.tsx`: eliminated `.p-rs{overflow-y:auto}`, added mobile section switcher tabs (`rtabs`) for Experience, Education, and Stack & Projects.
>   - `Sound.tsx` & `Radio.tsx`: replaced scrolling lyrics (`.lyrics-wrap{overflow-y:auto}`) with auto-advancing 5-line window centered on active line and `overflow:hidden`.
>   - `Gallery.tsx`: clamped mobile stage, deck, and film roll so that `scrollHeight === innerHeight`.
> - **K7 Stale Colour in Radio.tsx**: `VOID_PALETTE` reads `--terracotta-500` / `--accent` from CSS tokens with fallback `#b85c2e` (was hardcoded vermilion `#E4631F`).
> - **K9 Inline Durations to Tokens**: moved inline durations in `Matchday.tsx` (lightbox fade) and `GalleryLightbox.tsx` (develop, draw, step, tiles, arrow head, tip spring, notes) to `motionTokens` and `springs` with `duration: 0` reduced-motion branches.
> - **QA & Tests**: `tsc -b` green, vitest 44/44 green, Playwright QA sweep 126/126 world tests pass one-screen (no overflow, inner scroll = 0 across 1280x800, 768x1024, 375x812, light, dark, ?rm=1). Visual proof screenshots captured in `qa/p2/`.

> ## 🎨 PHASE P1 Separation — DONE (2026-10-14)
> - **§3 PlateHeader & LogHeader**: created `src/components/headers/PlateHeader.tsx` (artist: Fraunces 900 + Caveat hand note + Alpona rule + .hl sweep) and `src/components/headers/LogHeader.tsx` (analyst: mono ID line + blinking teal caret + Space Grotesk roman h1 without italics/highlighter). Replaced headers across all 13 pages.
> - **C3 Clock & Live Split**: `src/lib/useGoaClock.ts` separates telemetry `useGoaClock()` (analyst HH:MM) from `useGoaPhrase()` (artist human phrase, e.g. "night in Goa", no pulse dot).
> - **§2 Per-World Route Transitions**: `src/lib/world-motion.ts` implements paper turn for artist world and scan wipe for analyst world, gated on `useReducedMotion`.
> - **Landing em-dashes removed**: eliminated em-dashes from `Landing.tsx` UI copy.
> - **C8 Answer Applied**: InfoLeap role set to "Data Science Intern" across `Landing.tsx`, `Journey.tsx`, and `Resume.tsx`.
> - **QA & Tests**: `tsc -b` green, vitest 44/44 green, Playwright QA sweep 126/126 world tests pass one-screen.

> ## 🏗 PHASE P0 Foundations — DONE (2026-10-14)
> - **K1 useOneScreen**: unified hook `src/hooks/useOneScreen.ts` ("toc" | "one-screen"), tested, replaced 8+ copy-pasted useEffects across 15 pages.
> - **C1 Per-World Theme**: `src/lib/theme.ts` isolates `nb-theme-artist` (defaults light) and `nb-theme-analyst` (defaults dark); unit tested.
> - **K3/K10 World Motion**: `src/lib/world-motion.ts` sets token-derived presets (artist land/turn, analyst lock/scan) + reduced motion collapse.
> - **K8 Reduced Motion QA Switch**: `src/lib/rm-qa.ts` enables `?rm=1` forced mode (`<html data-rm>` + matchMedia override + CSS rule rewrite).
> - **K5 Lazy Routes**: `src/App.tsx` lazy loads all 14 pages with world-styled Suspense fallbacks.
> - **K6 App.css**: identified dead, pending user OK in §6 questionnaire.
> - **QA & Tests**: `tsc -b` green, vitest 42/42 green, Playwright QA sweep 126/126 world combinations pass one-screen (no overflow/scroll).

> ## 🐎 SESSION 2k — read first (2026-10-14)
> **Both decision gates cleared by user ("horse okay... terracotta accent okay and good to go").
> Slice 3 (artist rollout) STARTED. NOTHING COMMITTED.**
>
> ### 1. Terracotta accent swap — DONE + QA'd
> `src/styles/world-artist.css`: `--orange` `#E4631F`→`#b85c2e` (light), `#FF8A4C`→`#d2763d` (dark).
> `--terracotta-500` now literal (was `var(--orange)`). Whole artist world shifts vermilion →
> browner Panchmura terracotta via the `--accent`/`--orange` cascade. QA'd artist home light:
> FIELD NOTEBOOK label, BUILT badges, arrow circles, heading accents all terracotta. Cohesive.
>
> ### 2. Bankura horse GALLOP on world switch — DONE + QA'd (the §4.5 signature moment)
> NEW `src/components/WorldTransition.tsx`, mounted in `WorldLayout` above `.bg`. Module-scoped
> `lastWorld` survives the WorldLayout remount that the artist<->analyst route change forces, so it
> only fires on real WORLD change (not first load / in-world nav). `useReducedMotion()` guard →
> no mount under reduced-motion (doc: "no galloping horse"). motion `.world-wipe` terracotta panel
> wipes in/holds/out (x keyframes, times [0,.34,.6,1], 1.05s); cream horse silhouette traverses
> -34vw→112vw via CSS `mask-image:url(/motifs/bankura-horse.png)` tint (slice-2 note). Transforms only.
> **GOTCHA:** CSS went in `theme-base.css`, NOT `App.css` — App.css is imported NOWHERE (dead Vite
> default); first attempt put it there and nothing applied. Verified via JS probe + mid-wipe
> screenshot: panel #b85c2e full-cover, horse mask loaded (2131²), traverses facing travel (no flip
> needed), overlay clears clean, 0 console errs, tsc 0.
>
> ### 3. Alpona linework — DONE + QA'd
> NEW `src/components/motifs/Alpona.tsx` (inline-SVG `AlponaRule` + `AlponaCorner`, currentColor →
> terracotta). (a) Site-wide artist CORNER flourishes in WorldLayout (`world==="artist"` only, fixed
> overlay, .14 light / .2 dark, pointer-events none, zero layout impact). (b) Alpona DIVIDER replaces
> ArtistHome masthead rule. CSS in theme-base.css. QA'd ArtistHome light+dark+mobile375 + Gallery +
> Matchday clean. DECISIONS: Matchday keeps Barça garnet/blue (not terracotta); loader-glyph +
> cursor easter-egg skipped (rare state / gimmick). OPTIONAL left: dividers on other artist headers.
>
> ### 4. Artist HOME redesigned — card grid KILLED (user: "very basic", rejected desk/darkroom/notebook concepts)
> `src/worlds/artist/ArtistHome.tsx` fully rewritten → "The Masthead": editorial split. LEFT = kicker +
> giant "The Artist" + statement + indexed list of the 6 spreads (num/name/gloss, active state, each a
> Link). RIGHT = cinematic stage photo in a terracotta mat + alpona corner, cross-fades (AnimatePresence)
> as you move through the index; honest caption per frame. Reuses REAL frames (Gallery=lantern-street,
> Sound=blue-beams, Matchday=terrace, Notes=doorway, About=me.jpg, Contact=lake) — Sound/Contact are
> stand-ins, swap for dedicated Flow stills later. GOTCHA: `html[data-toc] .page{display:flex}` has higher
> specificity than `.p-ah2{display:grid}` on the same element → grid never applied; FIX = grid is now a
> flex CHILD div inside `.page`, items pinned with explicit grid-area. QA'd desktop light+dark + mobile375
> (one screen, no scroll), hover-swap verified via JS (image+caption update per row), tsc 0.
> NOTE: in the built-in pane under width-emulation, dvh resolves to the real pane height so a black band
> shows below the page — artifact only; real-desktop measurements show page/grid fill full height.
>
> ### 4b. Home v2.1 tweak pass — DONE + QA'd (user: "close, needs tweaks", gave no specifics → my call)
> Columns .82/1.18 (stage heavier). Kicker gets terracotta Bankura HORSE glyph (mask-tinted PNG).
> Title bigger (to 104px), AlponaRule under it (hidden mobile). Gloss always visible (muted), active row
> = italic terracotta name. Stage = FILM STRIP: dark stock mat, round sprocket punches top+bottom
> (radial-gradient repeat-x), slight .4deg tilt, "FR 03 / 06" edge mark, whole mat links to spread.
> Ken Burns settle (scale 1.08→1, 7s). IDLE AUTO-ADVANCE every 5.2s (touch has no hover), paused on
> hover/focus-within, OFF under reduced-motion; 6 clickable progress ticks under stage (role=tab), active
> tick fills linearly over the interval. Images preloaded. Dark: hairline rim on mat (else merged).
> Honesty: dropped a "Kodak" film-stock label I'd added (photos are iPhone). QA: desktop 1440 measured
> (lede 430 / stage 619, both 714h, scrollHeight=vh), auto-advance verified (Sound→Matchday + img swap),
> light + dark + mobile375 (scroll=vh), tsc 0. Console "AlponaRule is not defined" = stale mid-edit HMR
> log (same timestamp), live module fine.
>
> ### 4c. ALL artist pages enhanced in the same language (user: "enhance all the other pages... and other things too")
> SHARED MOTIF KIT in `theme-base.css` (end): `.horse-glyph` (mask-tinted Bankura horse), `.film-mat`
> (dark film stock + sprocket punches, dark-mode rim), `.stitch` (kantha dashed inset border via ::after).
> Every artist page header now = horse-glyph kicker + italic-terracotta em title + AlponaRule.
> - **Field Notes**: entries → ruled notebook LEAVES (ruled-paper bg, terracotta margin line, 3 punch holes,
>   ghost numeral 01-04, hand-font gloss, stitch appears on hover, slight tilt). Dispatch strip = dashed rule.
> - **About**: photo → film-mat frame "FR 05 / 06" (matches home stage). Pull quote = dashed terracotta rule.
>   Facts = stitched tiles; "From Bankura" fact uses the HORSE glyph as its icon. Mobile = photo+pull side by
>   side, prose + 3-col facts below.
> - **Contact**: postal theme. Inked POSTMARK (SVG ring text "Goa · India · from Bankura · Bengal", horse at
>   centre, -14deg). Channels = perforated stamp-tickets (radial-gradient perforation edge) + stitch, big
>   ghost 01/02/03, handwritten tag pinned over the ticket edge (was eating handle width → email truncated).
>   Handles wrap (overflow-wrap:anywhere), never ellipsis.
> - **Gallery**: negatives sheet now sits on `.film-mat` stock (true contact sheet), cells dark-stock style,
>   hero = paper print with card outline. **PRE-EXISTING MOBILE SCROLL FIXED**: mobile now one screen —
>   micro contact sheet, 9 cols (`--mcols`), hero flex:1 (243px @375), all 33 frames visible.
> - **Matchday**: keeps Barça identity (no terracotta). **Mobile/tablet (≤900) was releasing the one-screen
>   cap (1279px scroll) → now ONE SCREEN** via tab deck (pattern borrowed from Sound): lead print on top,
>   pill tab strip Season · Fixture · Wire · Prints swaps one panel into the rest (`data-tab` on `.spread`,
>   `MTABS`). Each panel measured 289h, no overflow. Desktop untouched (`.mtabs` display:none).
> - **Sound**: audited, fits, keeps Spotify-green identity (deliberate, like Barça) → left as is.
> - **Em-dash sweep** (rule: none in UI copy): ArtistHome captions, Gallery empty-state, Radio.tsx 2 strings.
> QA: tsc 0. Notes/About/Contact/Gallery/Matchday measured doc=vh at 1280×800 AND 375×812; dark checked on
> Notes/About/Contact/Home. Console: only stale HMR log + one "Transition was aborted" from scripted theme
> click during navigation (automation timing, not reproduced by hand).
>
> ### 4d. Reference-driven INTERACTION pass (user: 4c was "just film strip pasted on, not enhanced")
> User refs (READ before any further artist work): jameschugh.com, huyml.co + screenshots of
> davidwhyte.com/experience, kodeimmersive.com, dejiajetomobi.com, meermohsin.me, about.senbuzy.com,
> quangdinh.im, madebyhart.com. (3D sites fail to load in the built-in pane; worked from screenshots.)
> Each page now has its OWN interaction, not just a shared frame:
> - **Home**: huyml big blur-in frame counter `01/06` on stage; wheel/trackpad + swipe step frames
>   (STEP_LOCK_MS 650); quangdinh live Goa clock in stage-foot (`src/lib/useGoaClock.ts`, shared hook).
> - **About**: meermohsin ribbon "Molecules to Metrics · Bankura to Goa" scrolling THROUGH the photo
>   (inside frame, screen-blend; first try crossed the bio text, moved); quangdinh floating pill tags
>   around photo linking real sections (Photography/Listening/Barça/Field notes, hidden mobile);
>   jameschugh word-by-word ink-in on pull quote; pointer 3D tilt on photo (TILT_DEG 7, mouse only).
> - **Gallery**: huyml print DECK: next 2 frames stacked tilted under hero, fan wider on hover (p2 hidden
>   mobile); big blur-in counter replaces small `01 / 33`.
> - **Notes**: jameschugh "pick a card": desktop leaves fanned as a hand (CSS `rotate`/`translate` props on
>   wrappers so motion's inline transform doesn't clash), hovered leaf straightens + lifts, neighbour slides.
> - **Contact**: deji cursor-sticker trail = terracotta horse + dashed ring stamps (gap 64px, max 12,
>   1.1s life, mouse only, reduced-motion hidden); live IST clock in "Based in Goa" line.
> - **Shared**: `.hl` highlighter sweep (theme-base.css) on title words: Home "Artist", About "frames",
>   Notes "notebooks", Gallery "sheet".
> QA: tsc 0; doc=vh at 1280×800 + 375×812 for Home/About/Gallery/Notes/Contact, no h-scroll; About dark OK.
> Not yet borrowed: davidwhyte poetic line fade, madebyhart skeuomorphic object (candidate: Sound as retro
> radio, ties to Hostel Radio), kodeimmersive drag-object, jameschugh journey MAP with pins (candidate:
> analyst Journey page, slice 4).
>
> ### 5. Reduced-motion: code-verified only (can't toggle OS pref in built-in pane) — same caveat as 2j.
>
> ### STILL OPEN / NEXT (slice 3 cont. + 4-5)
> - Artist world slice 3 essentially COMPLETE. Optional: Sound header horse-glyph (kept Spotify identity).
> - Tablet 761-900 not individually screenshotted for every page (measured Matchday 768 pre-fix only).
> - Slice 4: analyst world (swap analyst accent to terracotta, markers, grid texture, stitch connectors).
> - Slice 5: full QA sweep. Pre-existing: Gallery page scrolls on mobile (~1700px) — not yet fixed.
> - Nothing committed; await explicit OK.

> ## 🖍 SESSION 2j (2026-10-14)
> **Lightbox mobile reworked + markers simplified + light-bg fix; all 4 Bengal motif assets built
> (horse via Flow cutout). NOTHING COMMITTED. Skills invoked: browser-qa, frontend-design-direction,
> motion-foundations, verification-before-completion.**
>
> ### 1. Gallery lightbox — mobile now matches desktop (user: "Why mobile not like computer... circle + line")
> - `layoutNotes` (`src/worlds/artist/GalleryLightbox.tsx`): narrow/mobile path no longer uses numbered
>   badges + list-below. Notes go in BANDS above (`side:"T"`) / below (`side:"B"`) the photo, spread
>   evenly across width, each with the SAME hand-drawn leader line + circle/arrow marker as desktop.
>   `NoteSlot.side` now `"L"|"R"|"T"|"B"`; note `place` adds T (bottom-anchored) / B (top-anchored);
>   wrap class `g-top`/`g-bottom` (text-align:center, translateX(-50%)). Badges `<svg class=badges>` +
>   `<ol class=lb-notes-below>` blocks + their CSS DELETED. Mobile media query: `.lb-frame{padding:64px 0}`
>   so bands have room; stage max-height 54vh; smaller note font.
> - **Markers simplified (user: "No need to create square bracket or anything"):** `kind` coerced to
>   `circle` unless `"arrow"`. `box`/`bracket` render branches + `boxPath`/`bracketPath` helpers DELETED.
> - **Light-theme bug fixed:** `.p-gl-lb` backdrop was `color-mix(--paper 72%, #000 64%)` = mid-gray in
>   light mode → title/EXIF invisible. Now `color-mix(#120f0b 90%, --paper)` (near-black both themes);
>   `.lb-nm .nm` → `#f6efe4`, `.lb-exif` → `rgba(246,239,228,.72)`, rule `rgba(..,.28)`.
> - **QA'd (localhost 5176):** mobile375 red-lanterns (note above, leader+ring) + red-banner (3 notes
>   T/B) ✓; desktop night-arena (arrow + circle, no box/bracket) ✓; dark backdrop ✓; tsc --noEmit=0.
>   NOT shot: reduced-motion (couldn't toggle pref in pane; code gates every anim on `reduce`).
>
> ### 2. Bengal motif assets — ALL 4 built (slice 2 assets, was the open TODO)
> - `web/public/motifs/bankura-horse.png` — REAL terracotta Panchmura horse. Generated in Flow
>   (Nano Banana 2.1, 0 credits, x2 variants) via Claude-in-Chrome (Flow MCP couldn't see the project —
>   separate browser session), downloaded 2K, flood-fill cutout to transparent PNG (Python/PIL,
>   border-seeded flood so interior stays opaque), squared + padded. Authentic, clean edges. The old
>   dog-like placeholder `bankura-horse.svg` was DELETED.
> - `alpona-divider.svg`, `alpona-corner.svg`, `temple-tile.svg` — currentColor line motifs, eyeballed
>   in terracotta on dark. All valid XML.
> - Palette tokens (terracotta ramp + `--alpona`) already in `world-artist.css` from 2i, unchanged.
> - NO page wiring yet (slices 3-4). Flow project tab left open in your Chrome.
>
> ### STILL OPEN
> - Reduced-motion QA shot (verify on device / OS setting).
> - Terracotta accent hue swap (`-500 = #b85c2e` vs live vermilion `#E4631F`) — ASK before changing.
> - Gallery page scrolls on mobile (~1700px) — pre-existing mobile CSS exception, not touched this session.
> - Slices 3 (artist wiring) / 4 (analyst) / 5 (QA) not started.
>
> ---
>
> ## 🖍 SESSION 2i (2026-10-14)
> **Two things done this session. Lightbox v2 gutter fix (COMPLETE + QA'd) and Bengal-motif slice 2 tokens
> (COMPLETE). Slice 2 SVG assets + slices 3-4 wiring NOT started. Nothing committed.**
>
> ### 1. Gallery lightbox annotations → SIDE GUTTERS (user complaint: "Lines and annotations are coming on
> the image not on the side of the image!!") — DONE + browser-verified
> - **Root cause:** `.lb-stage` had `overflow:hidden` + shrink-wrapped the image, and the old `clampAnchor`
>   forced every note into `[19,81]×[12,88]` of the image box → notes/lines always sat ON the photo.
> - **Fix (`src/worlds/artist/GalleryLightbox.tsx`):**
>   - New `.lb-frame` wrapper = 3-col grid `[gutter | image | gutter]` (`--gut:clamp(128px,18vw,230px)`).
>     `.lb-stage` (still `overflow:hidden`) sits in col 2; the SVG leader layer + notes now live in `.lb-frame`
>     (unclipped), so they render in the gutters beside the photo.
>   - Measurement now relative to the **frame** not the stage: `frameRef` added, `measure()` computes the image
>     box as `imgRect - frameRect` → `ImgBox{left,top,w,h,sw,sh}` where sw/sh = whole frame.
>   - New `layoutNotes(pins, box)` (module scope): picks nearer side per pin (L if tip.x ≤ image mid, else R),
>     packs notes vertically with `NOTE_GAP=54` spacing, shifts a column up if it overflows the frame.
>     Returns `{stacked, items[]}`. Leader line drawn tail=gutter-note-anchor → tip=subject (reuses
>     `shaftPath`/`headPath`); subject markers (circle/box/bracket/arrowhead) unchanged, still on the subject.
>   - **Mobile / narrow fallback:** when `min(gutterL,gutterR) < SIDE_GUTTER_MIN=124` → `stacked:true` →
>     numbered badges on the photo (`.lb-arrows.badges`) + a numbered note list below the frame
>     (`<ol class="lb-notes-below">`). CSS media `max-width:760px` sets `.lb-frame{display:block;--gut:0}` so
>     mobile always uses this path.
>   - CSS all in `src/worlds/artist/Gallery.tsx` style string: `.lb-frame`, updated `.lb-stage` (grid-column:2),
>     `.lb-note-wrap.g-left`(text-align:right)/`.g-right`, note color kept **#fff + shadow** (lb backdrop is dark
>     both themes), `.lb-arrows.badges .lb-badge/.lb-badge-n`, `.lb-notes-below`. Old `.a-center/.a-left/.a-right`
>     rules removed.
> - **QA done:** `tsc --noEmit` clean. Browser (localhost **5176**): portrait frame ("red lanterns") → both notes
>   in LEFT gutter off-photo, leaders inward ✓. Landscape ("night arena") → "the stage…" LEFT gutter + "beams…"
>   RIGHT gutter, leaders to subjects, bracket marker stays on photo ✓. **NOT yet shot: mobile 375 stacked
>   fallback + reduced-motion + dark** (user redirected before that pass — do this first on resume).
>
> ### 2. Bengal/Bankura motif — slice 2 PALETTE TOKENS done (assets NOT)
> - Added terracotta ramp + `--alpona` to **both** artist blocks in `src/styles/world-artist.css` (light + dark).
>   `--terracotta-500:var(--orange)` so the live accent is unchanged — **nothing shifts visually yet** (reversible).
>   Light: 50 `#f7ece3` · 200 `#e6b89c` · 400 `#cf7d4a` · 500 =orange · 700 `#8a3d1c` · alpona `#f4ead9`.
>   Dark: 50 `#2a1d12` · 200 `#7d4a2c` · 400 `#c06b38` · 500 =orange · 700 `#e6b89c` · alpona `#e9dcc6`.
> - **OPEN CONFIRM (user decision needed):** BENGAL-MOTIF.md's ramp wants `-500 = #b85c2e` terracotta, i.e. shift
>   the site accent from the current vermilion `#E4631F`/`#FF8A4C` to a browner terracotta. I did NOT make that
>   swap — kept `-500` mapped to the existing accent. Confirm before any accent-hue change.
>
> ### NEXT (resume here, in order)
> 1. Finish the lightbox QA pass: mobile 375 (stacked badges+list), reduced-motion, dark theme. Screenshot.
> 2. **Bengal slice 2 assets** — 4 SVGs in `web/public/motifs/` (dir does NOT exist yet, create it):
>    `bankura-horse.svg` (clean single-path silhouette — user-approved style), `alpona-divider.svg`,
>    `alpona-corner.svg`, `temple-tile.svg`. Assets + tokens only; NO page wiring (that is slices 3-4).
> 3. Slice 3 = artist rollout, slice 4 = analyst rollout, slice 5 = QA each (per `web/BENGAL-MOTIF.md` build order).
> 4. Resolve the terracotta `-500` confirm above.
>
> ---

> ## ⚽ SESSION 2h — read first
> **Built the Football Room** (`src/worlds/artist/Matchday.tsx`) per the re-locked vision (own theme, not just
> Barça, Messi/Argentina storytelling). Replaced the theme-generic version in place; honesty gate (`useFootball`)
> kept intact — never fabricates a fixture/result, 502s from the down Python API render honest empty-states.
>
> - **Own scoped palette** on `.p-md` (auto-reverts on unmount; nav/footer outside it keep the world colour):
>   garnet `#A50044` + blaugrana blue `#004D98` (club) + Argentina sky `#2E7DC4` (country), chalk-pitch green.
>   `--accent` overridden locally → garnet. Dark theme brightens garnet → `#FF4D8D`.
> - **3 decks, upgraded:** (1) **Match Desk** — live Barça ticket (garnet/blue stub spine) + countdown + last
>   result + season standing, honesty-gated. (2) **Tactics** — its own dark CHALKBOARD (dark-green board both
>   themes), chalk 4-3-3, the **Messi node** (sky-blue "10") at RW with an animated `pathLength` drift trace to
>   a false-9, hand annotation. (3) **Two Homes** — club (Barcelona) + country (Argentina) crest cards with
>   flag-stripe spines (generic colours, no copyrighted crests) + the real Messi→data origin narrative. **No
>   invented stats** — public football facts + his genuine story only.
> - Deck tabs relabelled Match Desk / Tactics / Two Homes; masthead title now "Two Homes". Keyboard nav (1/2/3,
>   arrows) + dots + prev/next kept. No em-dash in UI copy.
>
> **QA'd in browser (localhost:5173):** all 3 decks render; artist light + dark both good (garnet→pink in dark,
> sky-blue holds, chalkboard identity strong). Mobile 375: `data-oneScreen` was clipping the tall Two Homes
> story → fixed by letting `.deck-viewport` scroll on `<=760px` only (matches the ArtistHome bento precedent;
> desktop stays strict one-screen). Full story + signature confirmed reachable, no content lost. Reduced-motion:
> code-guarded (every `motion` has a `reduce` branch; CSS `prefers-reduced-motion` rules) — not shot, same
> standard as the hero. Only console errors = pre-existing 502s (Python live-API 5195 down).
>
> **Also this session:** extracted 2 skills via `/learn` (user-approved): `verify-css-under-hidden-browser-pane`
> (the frozen-pane computed-style artifact + forced-final-state fix) and `build-21st-from-scraped-catalog` (the
> rebuild-by-hand-from-COMPONENTS-21ST.md workflow). Both at `~/.claude/skills/<name>/SKILL.md`.
>
> **Nothing committed** (awaiting user OK). **Do next:** user reaction to Football Room, then remaining stubs —
> CV split (Resume), real-source analyst (Skills/Work/Dashboard), Sound toggle, Field Notes, About, Contact.
>
> ---
> ## 🎞 SESSION 2g — read first
> **User re-locked scope** (searched 6 prior sessions to recover the real vision; the build had drifted):
> 1. **Hero = SCATTER-POP + HALFTONE texture** (user pick). Hover the photo → collage cards scatter out +
>    desaturate, photo pops (scale 1.035) and stays FULL COLOUR, the rest of the world prints to halftone dots.
>    Karma/artist = CMYK offset rosette; Tuhin/analyst = single-ink data-grid. **NO tint / colour wash** (user
>    said twice: no tint). The scatter mechanic already existed in CSS (`[data-reveal]`); the ChemicalBath
>    water-morph duotone that got bolted on top was the thing he hated → REMOVED.
> 2. **Landing = in-place toggle** (kept — not a portal split).
> 3. **Naming = Karma (creative) / Tuhin (professional) alter-egos**; artist/analyst kept as the sub-flavor /
>    data-mode. Switch labels, curtain, and "enter …" cue now say Karma / Tuhin.
> 4. **21st.dev = no downloads** (get_component limit hit; MCP not registered). Build from the already-scraped
>    catalog (`COMPONENTS-21ST.md`) by hand, call the HTTP API direct only if truly needed.
>
> **DONE this session (QA'd in browser, both modes × light/dark, computed-style verified under the frozen pane):**
> - **Ripped ChemicalBath entirely:** deleted `src/lib/chemical-bath.ts` + `src/components/ChemicalBath.tsx`;
>   removed the `<canvas id="bath">`, all `createChemicalBath`/`bath.*`/`data-bath` wiring from `Landing.tsx`;
>   removed `.bath` + `.ph.tint` CSS from `heroAssets.ts`; removed the `/lab` route + `ChemicalBath` import from `App.tsx`.
>   Grep confirms zero refs remain.
> - **Added the halftone layer** (`heroAssets.ts`): `.halftone` fixed overlay (z1, below the photo z6, above bg z0),
>   opacity 0 at rest → `.92` (artist) / `.8` (analyst) on `[data-reveal]`. CMYK 4-grid rosette for artist,
>   mono ink 7px dot-grid for analyst; `mix-blend-mode:multiply` (light) / `screen` (dark). Photo stays clean colour
>   above it; analyst photo stays its grayscale-specimen + plot-grid look (no tint).
> - **Relabelled Karma/Tuhin** in `Landing.tsx` (switch opts, curtain word + sub, `#enter` cue, LABEL/SIDE maps).
> - **Verified:** `/` artist light = CMYK rosette + scatter + full-colour photo pop (scatter computed: spot `94,-46`,
>   barca `-122,46`, grayscale .95; print filter none, scale 1.035). Analyst = mono ink grid + grayscale specimen +
>   plot grid, zero tint. Dark = screen-blend dots (backlit-proof look), photo still pops above (elementFromPoint at
>   photo = `.ph plot`, not halftone). Only console errors = 502 from the Python live-API (5195 down) — pre-existing.
>
> **NOT done / next:** mobile-375 + reduced-motion screenshot pass on the new reveal (computed-safe, not yet shot);
> then the remaining pages per the brief (world TOC to replace redundant Home clones; Sound toggle, football page,
> modern/classic CV hover, real-source analyst). **Nothing committed.**

**(prev) Last updated:** 2026-10-13 (session 2f — analyst KPI clip fixed; hero redesign decided = HALFTONE RESOLVE; 21st path = WARP + restart)

> ## 🧭 SESSION 2f — read first
> **User feedback this session:**
> 1. The ChemicalBath hero (orange/teal water-morph duotone + colour-pop) is NOT unique — **replace it.**
> 2. Analyst KPI cards + "pointers" were misaligned/clipped — **fix.**
>
> **DECISIONS (user, via AskUserQuestion):**
> - **Hero mechanic → "HALFTONE RESOLVE".** Portrait rendered as PRINT HALFTONE DOTS (CMYK dot language = artist /
>   data-grid dot language = analyst). Cursor = a loupe that TIGHTENS local dots into the real photo where you point
>   (resolution increases under the pointer), then relaxes back to coarse halftone when you leave. NO liquid warp,
>   NO tint-bleed, NO orange↔teal water morph. Keeps the "same negative, two baths" thesis via the two dot systems.
>   Mode switch (artist↔analyst) swaps the dot palette/pattern, not a water tint. Build re-skinned per world.
> - **21st.dev → WARP + RESTART path.** 21st is SNI-blocked from this local machine RIGHT NOW (verified this session:
>   curl `Connection was reset`, browser fetch `Failed to fetch`; the prior 05:33 session was ALSO fighting the same
>   block — no component code was actually fetched there to reuse). User will **turn Cloudflare WARP on**, then a
>   **fresh Code session** is opened so the `21st:21st-ui` plugin MCP registers at boot. FIRST THING next session:
>   verify `21st:21st-ui` `get_usage`/`search` live, then pull a halftone/dot WebGL seed (search e.g.
>   "halftone dots shader image resolve on hover", "CMYK halftone print effect", "dot matrix image reveal") and
>   build our OWN re-skinned component from its structure. `get_component` = 2/day — spend on the halftone core.
>
> **DONE this session (network-independent, QA'd):**
> - **Analyst Work KPI clip FIXED** (`src/worlds/analyst/Work.tsx`). Root cause: `.report` used
>   `justify-content:space-between`+`overflow:hidden` in a fixed-height pane; on laptop heights (≤~760px) the long
>   step paragraphs overflowed and pushed the **readout KPI cards (`.ro`) + step text off the bottom (clipped)**.
>   Fix: `.report` → flex column `flex-start`; `.steps` `flex:1;min-height:0;overflow:hidden`; **`.readouts`
>   `flex:0 0 auto` (pinned, never clipped)**; height-responsive step text (`clamp` with vh term); a
>   `@media(min-width:821px) and (max-height:760px)` compression block; tighter `@media(max-width:560px)` block;
>   and condensed the 3 entries' prose (ALL facts kept, just less verbose). **QA'd: 1440×900 ✓, 1280×720 ✓
>   (metrics: 0 step overflow, readouts inside pane), mobile 375 ✓ (0 overflow, readouts +11px inside).**
> - **Removed an em-dash** from the Skills lede (`src/worlds/analyst/Skills.tsx`) — contract bans em-dash in UI copy.
> - NOTE: browser-pane QA shows motion enter-anims FROZEN at initial opacity (`visibilityState:"hidden"` → rAF
>   paused). Not a real bug — forced final state via JS to inspect/measure true layout.
>
> **NOT done / next (fresh WARP session):** build the HALFTONE RESOLVE hero (replaces ChemicalBath) using 21st +
> motion-advanced + high-end-visual-design + frontend-design-direction; then remove the old ChemicalBath wiring
> (`chemical-bath.ts`, `ChemicalBath.tsx`, `<canvas id="bath">` + `data-bath` logic in `Landing.tsx`/`heroAssets.ts`)
> and the temp `/lab` route in `App.tsx`; then the remaining signature layers + ComingSoon pages. **Nothing committed.**

**(prev) Last updated:** 2026-10-13 (session 2e — ChemicalBath signature hero built + wired into real hero, both worlds QA'd)

> ## 🧪 SESSION 2e — ChemicalBath signature hero DONE + WIRED (read first)
> **What shipped (QA'd in browser, both worlds, no JS/WebGL errors):**
> - **Signature hero mechanic built hand-rolled with skills** (motion-advanced + high-end-visual-design +
>   frontend-design-direction) — raw WebGL, **zero new deps** (no three.js). 21st.dev get_component NOT spent.
>   Thesis "same negative, developed in two baths": portrait develops out of a darkroom bath to a **duotone**
>   (warm orange = artist / cool teal = analyst); pointer = developer brush → true-colour **bloom in a ripple
>   halo** where you touch (user-picked amp-ups: **Touch-to-develop colour + Two-baths duotone**). Per-pixel
>   film grain (no banding), wet-edge ring, catalyst-orange lingering in shadows, vignette.
> - **Factory extraction (DRY):** WebGL core = `src/lib/chemical-bath.ts` → `createChemicalBath(canvas,{src,mode,onFail})`
>   returns `{destroy,setMode,setPointer,setHover}`. Owns resize + visibility-pause + RAF cleanup only; pointer is
>   consumer-driven (works both when canvas captures pointer AND when it's pointer-events:none under overlays).
>   `BATHS` palette + `BathMode`/`BathHandle` types exported from there.
> - **React wrapper** `src/components/ChemicalBath.tsx` = thin consumer of the factory (attaches its own canvas
>   pointer listeners). Reduced-motion / GL-fail → static `<img>` fallback.
> - **WIRED INTO THE REAL HERO** (`Landing.tsx` + `heroAssets.ts`): `<canvas class="bath" id="bath">` added inside
>   `.print` above `.ph.base`; `initHero` creates the bath (reduced-motion/GL-fail → skip → `.ph.base` shows under
>   it as fallback), sets `root[data-bath]` which fades the canvas in + **zeroes `.ph.tint`** (bath owns the duotone
>   now) while **keeping `.ph.plot`** grid as analyst instrument texture. Mode switch → `bath.setMode(m)` swaps
>   palette live. Developer brush shares the existing #portrait reveal logic: bare print → `setHover(true)` + bloom;
>   on a collage card → `setHover(false)` (card runs its own pickup). `pointermove` on #portrait drives `setPointer`
>   (print-rect-normalized). Full teardown: `bath.destroy()` + remove `data-bath`/listeners.
> - **Verified:** `/` artist = warm orange bath + all 4 collage cards/pins/lede intact; switch → analyst = teal bath +
>   plotter grid + specimen notes/leaders intact; light/dark eclipse still works; only console errors = `502` from the
>   Python live-API (5195) being down (pre-existing, NOT from this change — Spotify card shows "feed offline").
> - **`/lab` TEMP route still in `App.tsx`** (two baths side-by-side) — **REMOVE before ship.**
>
> **NOT yet done / next:** QA the hero bath on **mobile 375 + reduced-motion** (desktop both-worlds done; the
> `.print` goes `position:relative aspect-ratio:4/5` under 900px — confirm canvas fills it + no overflow); then build
> the remaining signature layers (Projector Gate entry, Reaction-Arrow spine, Torch Specimen, Particle molecule→metric,
> Eclipse Observatory, Tape-peel, Live waveform) hand-built w/ skills, pulling the 2/day `get_component` (Ripple
> Distortion + Interactive Blur Reveal) opportunistically; then the ComingSoon pages. **Nothing committed — await OK.**
> Catalog of candidates + search lessons: `web/COMPONENTS-21ST.md`.

**(prev) Last updated:** 2026-10-13 (session 2d — 21st.dev now works via direct curl; agent contract baked into web/CLAUDE.md + AGENTS.md)

> ## 🔑 AGENT CONTRACT — read `web/CLAUDE.md` first (auto-loads for Claude Code; `web/AGENTS.md` = same, for Gemini/Antigravity)
> It hard-gates: invoke the skill stack (never hand-roll), use 21st, one-screen pages, no commit without OK,
> no fabricated facts, no moved secrets, QA all states. Written because past sessions skipped the skills → generic output.
>
> ## ✅ 21st.dev SOLVED (2026-10-13, session 2d) — SUPERSEDES the WARP/SNI story below
> `21st.dev` reachable now (HTTP 200, clean TLS). You do NOT need WARP, a session restart, or the plugin MCP to
> register at boot. Hit the MCP endpoint directly with `curl` from the Bash tool — full recipe + budget in
> `web/CLAUDE.md §2`. Verified live: `initialize` → `notifications/initialized` (202) → `tools/call`.
> Free tier: `search` UNLIMITED, `get_component` = **2/day**, AI-generate OFF (use search+get_component, build yourself).
> `API_KEY_21ST` in bash env + settings.json. Re-probe each session; fall back to WARP/hand-build only if curl RSTs.

> ## ⭐ NEXT SESSION = MASTERPIECE REBUILD (read this first)
> User decided the big rebuild happens in a **fresh session with WARP on so 21st.dev is live**
> (21st MCP registers only at session boot; see the 21st block below for the SNI-block story).
> **On boot, verify `21st:21st-ui` `get_usage`/`search` work before relying on it.**
>
> **Creative brief (user, 2026-10-13) — build to this bar:**
> - **No page is a scrollable element.** Every page fits one screen; reveal overflow creatively
>   (full-screen panel decks w/ arrows/dots/keys/swipe, popovers, tooltips, "more" expanders,
>   animations). **Keep ALL content — never cut to fit.**
> - **Every transition & motion = a creative masterpiece.** No default/templated motion. Use
>   `motion-foundations` + `motion-patterns` + `motion-advanced`; unique, intentional, buttery.
> - **Every element unique yet blends seamlessly** into the two-world UI/UX (Artist warm
>   field-notebook / Analyst dark instrument-panel). Nothing generic.
> - **Use 21st.dev components** — re-skinned into each world's system, never raw output.
> - **CHARACTER SYSTEM (LOCKED by user 2026-10-13 = options 1 + 3, BOTH):**
>   (a) **Split-self guides** — a warm film-grain **Artist self** + a precise instrument-panel
>   **Analyst self** (stylized personas of Tuhin, NOT fake facts) that guide/appear in each world;
>   PLUS (b) **motif-creatures** — a molecule/organism creature for the Artist world + a
>   data-sprite/bot for the Analyst world. Generate via **Flow MCP in the NEW session** and **SAVE
>   to `web/public/`** (commit) so they persist + are reused site-wide. Each world gets its guide +
>   its creature, woven into the diary framing below.
> - **STORY SPINE (LOCKED = Field-notebook diary):** everything framed as entries in a living field
>   notebook — clippings, margin notes, specimens, taped live feeds, logged in real time. Both
>   worlds share this diary language (Artist = warm paper notebook; Analyst = dark lab/instrument
>   logbook). Cover `/` = the notebook's cover; each world = a section of the notebook; each page =
>   a one-screen spread/entry. The split-self guides + creatures are recurring "margin" characters.
> - **Fix the home IA:** the per-world Home pages (`/artist`,`/analyst`) are redundant clones of
>   the Landing. Plan: kill them; entering a world opens a one-screen **chapter-index / contents**
>   (the notebook's section TOC), not a second landing. Cover button (just added) returns to `/`.
> - **Optimize token / skill / plugin usage** — load skills only when needed, batch, don't sprawl.
> - **Generate assets in the NEW session** (user chose this), not pre-generated. **Ask before
>   assuming** on any ambiguity (user's explicit instruction).
>
> Skills list: `web/SKILLS.md`.
>
> **Already shipped in session 2c (done + QA'd):** Countdown #2 motion; Landing card-hover fix
> (cards are children of #portrait — mouseover suppresses reveal on cards; cards "pick up"); dedicated
> **cover button** → `/` in nav (`.cover-btn`, WorldLayout + theme-base.css). Dev ran on Vite **5174**.

**(historical) Last updated:** 2026-10-13 (session 2b — Sound/ME Wrapped + unique-motion)
**Owner:** Tuhin Bhattacharya (chem-eng → data analyst + photographer, Goa)
**App root:** `D:\porfolio\molecules-metrics\web`
**Dev ports (this session):** Vite `localhost:5176` · live-API Python `127.0.0.1:5195` (Vite proxies `/api`)
**Live-data server (separate, keep as-is):** Python on `127.0.0.1:5195` (reads Spotify/Barça creds from KARMA `.env` at runtime — never move secrets through tooling)

---

## What this is

A React + Vite + TS single-page portfolio with **two fully-separate worlds** branching from one
signature hero:

- **Artist** — warm field-notebook (paper, Fraunces/Caveat, orange). Photography, Spotify, Barça, Goa.
- **Analyst** — dark data-dashboard (navy, Space Grotesk, blue/teal). Chem-eng → data-analyst work.

The hero (`/`) is the entry: eclipse light/dark toggle + a two-sided artist/analyst switch +
big double-exposure portrait + live auto-updating feed cards. Each nav section is its own page
continuing its world's theme (NOT one toggle swapping text).

## Stack

- React 19.2, Vite 8.3.4, react-router-dom 7.18, `motion` 14.1 (import from `motion/react`, never framer-motion)
- TypeScript ~6.0, oxlint
- Two-world CSS scoping: `data-mode` on `<html>` (`:root[data-mode="artist"]` / `[data-mode="artist"] .sel`)
  so both worlds coexist in one SPA; `data-theme` (light/dark) composes; `data-world` for app logic.
- Dev proxy: Vite proxies ONLY `/api` → `http://127.0.0.1:5195`. Static frames/me.jpg live in `web/public/`.

## How to run

```bash
# 1. live-data server (Python) must be up on 5195 (KARMA side) — gives /api/* feeds
# 2. web app:
cd "D:/porfolio/molecules-metrics/web"
npm install        # first time
npm run dev        # → http://localhost:5173
```

QA overrides on the hero: `?mode=artist|analyst` and `?theme=light|dark`.

## File map (key)

- `src/worlds/Landing.tsx` — hero island (injects prototype HTML+CSS+JS, imperative `initHero`, full cleanup on unmount). Live feeds: `loadSpotify` (`/api/now-playing`), `loadBarca` (`/api/barca`), rotating frames (`/api/frames` w/ local fallback), `updateMood`, countdown. Enter-link → SPA nav to `/artist` or `/analyst`.
- `src/worlds/heroAssets.ts` — `HERO_STYLE` (all selectors scoped under `.hero-root`). Hero card = `.obj` collage pieces (`.spot` Spotify, `.mood`, `.barca`, `.pola` polaroid).
- `src/components/WorldLayout.tsx` — shared shell per world: eclipse btn, nav (brand + NavLinks + world-switch pill + mobile menu), AnimatePresence page transitions, footer.
- `src/worlds/artist/ArtistHome.tsx` (`.p-ah`), `src/worlds/artist/Gallery.tsx` (`.p-gal`, Drive auto-detect frames + lightbox)
- `src/worlds/analyst/AnalystHome.tsx` (`.p-an`), `src/worlds/analyst/Skills.tsx` (`.p-sk`), `src/worlds/analyst/Work.tsx` (`.p-wk`)
- `src/components/ComingSoon.tsx` — placeholder shell for unbuilt pages
- `src/lib/live.ts` (usePoll/useNowPlaying/useBarca/useFrames/useClock), `src/lib/theme.ts` (useWorldTheme), `src/lib/worlds.ts` (nav + social), `src/lib/icons.tsx`, `src/components/Reveal.tsx`
- `src/styles/theme-base.css` + `world-artist.css` + `world-analyst.css` (imported in that order in `main.tsx`)
- `src/App.tsx` — routes. `src/index.css` emptied (Vite scaffold removed). `web/.claude/launch.json` = molecules-metrics-web / npm run dev / 5173.

## Status

### Done + QA'd in browser
- Hero `/` — renders 1:1, both sides of the switch, eclipse toggle, curtain transition, all live feeds (Spotify last-played, Barça fixture+countdown, rotating polaroid frames, signal mood). SPA nav into both worlds works.
- `WorldLayout` shell (nav/eclipse/switch/footer) — artist + analyst.
- `/artist` (ArtistHome), `/artist/gallery` (Gallery)
- `/analyst` (AnalystHome), `/analyst/skills` (Skills), `/analyst/work` (Work)

### Fixes applied 2026-10-13 (this checkpoint)
1. **Hover bug** — hero cards used a global mousemove parallax that drifted ALL `.obj` together.
   Removed per-card parallax (kept only the portrait double-exposure drift). Added per-card
   `:hover` lift (`translate:0 -7px` + z-index + deeper shadow) in `heroAssets.ts` — now only the
   hovered card reacts. (`translate` is used because the `slap` entrance animation holds scale/rotate.)
2. **Spotify card** — was small / empty-feeling / bleeding off right edge. Now `272px`, bigger
   album art (62px) + title (15.5px), Spotify-green left edge + radial glow, `right:6px` so it's
   fully on-screen. It's the visual hero of the collage now.
3. **Analyst headline** — "Messy questions, made into decisions." → **"Decisions, not dashboards."**
   (differentiating; no longer repeats the lede's reactor/bottleneck line).

### NOT built yet — still `ComingSoon` placeholders
- ARTIST: `/artist/sound`, `/artist/matchday`, `/artist/notes`, `/artist/about`, `/artist/contact`
- ANALYST: `/analyst/journey`, `/analyst/dashboard`, `/analyst/resume`, `/analyst/contact`
- Each needs its own content + info + real KPIs, in its world's theme. Port from prototype where one exists.

### Session 2c (2026-10-13) — Landing card-hover fix + no-scroll directive
- **Landing card-hover bug FIXED + QA'd** (desktop light+dark, spot+barça, reveal logic both ways).
  Root cause: the collage cards (`.spot/.mood/.barca/.pola`, class `.obj`) are **DOM children of
  `#portrait`**, so the portrait's `data-reveal` hover fired even when the pointer was on a card →
  cards scattered+desaturated instead of reacting, and the image "popped" when you were on a card.
  Fix (Landing.tsx): replaced portrait `mouseenter` with bubbling **`mouseover`** that checks
  `e.target.closest('.obj')` — a live card (not a `.note`) → `reveal(false)` so the card runs its own
  hover; bare image (or a `.note` during reveal) → `reveal(true)`. onTap ignores any `.obj`.
  Added a real per-card hover in `heroAssets.ts`: card **picks up** — `transform:rotate(-var(--r)) scale(1.055)`
  (straightens its tilt + grows; transform is free because slap holds the individual scale/rotate props),
  `translate:0 -12px` lift, brightness/saturate glow, deeper shadow, z14. **NOTE: the HERO_STYLE string is a
  JS template literal — never put backticks in its CSS comments (they terminate the string → vite parse error).**
- **NEW STANDING DIRECTIVE (user): no page may be a scrollable element.** Every page fits one screen;
  reveal overflow creatively (full-screen panel decks w/ arrows/dots/keys/swipe, popovers, tooltips,
  "more" expanders, animations). Keep ALL content, never cut. NOT YET built — next big workstream.
  Landing is already a fixed one-screen composition (`html[data-hero] body{overflow:hidden}`); on very
  short viewports cards clip rather than scroll — may need height-responsive scaling.

### Session 2b (2026-10-13) — Sound/ME "Spotify-Wrapped on paper"
Goal: make `/artist/sound?mode=me` a Wrapped-style section + roll unique/animated components
across whole site. Started with ME.

**Built + QA'd (dark/light/mobile375 + reduced-motion guard):**
- `/artist/sound` ME section — `src/worlds/artist/sound/SoundMe.tsx` + CSS in `Sound.tsx`.
  Wrapped aggregates baked (anonymized) at `web/public/data/spotify_wrapped.json`; served via
  `useSpotifyWrapped` in `src/lib/live.ts`. Honest empty-states (no fabricated facts). Genres/aura
  DROPPED — Spotify API returns `genres:[]` and `/audio-features` 403, so not faked.
- Components: `OnNow` (live now/last-played), `StatBig` (headline KPIs), `No1Card`+`Vinyl`,
  `Lately` (6-mo live strip), `Countdown` ×2 (tracks/artists by minutes), `Eras` (min/year),
  `Clock` (radial 24-spoke listening dial), `sofme` closing read.
- **Unique-motion upgrades done this session:**
  1. `Clock` — flat hour-bars → radial 24-spoke SVG dial (green peak spoke, staggered `spoke` kf).
  2. `No1Card` — static card → **spinning vinyl** (black disc + green label, 18s `vspin`,
     count-up minutes, flex-column collapse <560px).
- Baked Wrapped data (unchanged): lifetime {minutes 56168, hours 936, plays 15726, skipRate .332,
  uniqueTracks 3755, uniqueArtists 1311}; #1 Pritam, #2 Shankar-Ehsaan-Loy; peakHour 11;
  nightShare .143; years 2019-2026.

**Unique-motion queue — order 1) odometer → 2) Countdown stagger+wipe → 3) next page. QA each.**
- ✅ **#1 StatBig odometer DONE + QA'd** (desktop/mobile375; reduced-motion instant by construction).
  `Odometer`+`OdoDigit` in `SoundMe.tsx` (per-digit 0-9 strips, `translateY(-d*10%)`, staggered
  `transition` per column idx, reduced→instant), `StatBig` now renders `<Odometer>` in `.sb-num`,
  `.odo*` CSS added in `Sound.tsx`. `No1Card` kept on `useCountUp` (unchanged).
- ✅ **#2 Countdown stagger+bar-wipe DONE + FULLY QA'd (session 2c)** — browser-verified on `localhost:5174`:
  desktop **light** PASS + desktop **dark** PASS + **mobile375 dark** PASS. Both blocks ("On loop" tracks,
  "Heavy rotation" artists): ranks 01-08 green, green `barx` bars wipe L→R to correct proportional widths
  (Pritam #1 full → descending), names + min/plays aligned, long titles ellipsis ("Amar Deho…", "Tamakpa…"),
  no overflow/clip, Eras + vinyl clean. Reduced-motion: verified by CSS cascade (can't toggle the media
  query in-pane) — `.cd.in .cd-row/.cd-fill/.cd-rk{animation:none}` + `transform:none` sit later-in-source
  inside the matched media query → win → instant final at correct `var(--w)` widths.
  `Countdown` uses `useInView`→`.in`; anims in `.cd.in` scope (`rise`/`rkpop`/`barx`, `--i` stagger).
- ⏳ **#3 next page** (Football Room `/artist/matchday` or Field Notes `/artist/notes`), same bar.

**21st.dev — ROOT CAUSE FOUND + FIXED (session 2c):** NOT a config/auth/session problem. Config is
correct (`.mcp.json`: `url https://21st.dev/api/mcp`, header `x-api-key:${API_KEY_21ST}`; key in
`~/.claude/settings.json` env, propagates to shell). The real block was **SNI-based RST injection by the
ISP** (Goa/India): TCP 443 to 21st.dev connects, but the TLS ClientHello carrying SNI=`21st.dev` triggers
a RST → `errno=10054` / `ECONNRESET` on read → server never answers → Claude Code drops it at boot (that's
why `21st` was absent from `session_connectors_status`, not even `failed`). Diagnosed via `openssl s_client`
(wrote 1548 B, read 0) + node fetch (even root GET reset). curl "Connection was reset" = same thing, NOT a WAF.
**FIX: Cloudflare WARP / 1.1.1.1 (encrypts DNS + ECH, hides SNI).** Verified post-WARP: `fetch('https://21st.dev/')`
→ 200, MCP `initialize` → 200 `serverInfo{name:"21st",v0.1.1}`. **Plugin MCP registers only at session BOOT**,
so a session started AFTER WARP is on picks up `21st` automatically — the session that was already running
cannot (reconnect only re-dials already-listed `failed` servers). So: keep WARP on → **start a new Code
session** → verify `21st:21st-ui` `get_usage`/`search` live → use components **re-skinned into the
field-notebook/instrument-panel system** (never ship raw 21st output), site-wide. Fallback if ever blocked
again: hand-build with `motion-patterns` + `frontend-design-direction`.

## Open data items (need from Tuhin)
- **Pinterest + Spotify profile URLs** — links are hidden until supplied (`LINKS` in Landing.tsx line ~215; `SOCIAL` in `lib/worlds.ts`).
- **Real KPI numbers** — placeholders in AnalystHome/Skills/Work are marked with `*`. Confirm actual figures.
- Confirm "Decisions, not dashboards." headline is to taste (fallback: "Chemical rigour, pointed at data." / "I find the bottleneck — then prove it.").

## Skills to use (read every session)
See **`web/SKILLS.md`** — the standing list of skills this project relies on (motion-foundations,
motion-patterns, motion-advanced, frontend-design-direction, design-taste-frontend, browser-qa,
make-interfaces-feel-better, high-end-visual-design, storytelling, react-patterns, vite-patterns,
`21st:21st-ui` when WARP on). Invoke the relevant ones; don't hand-roll what a skill covers.

## Hard constraints (standing)
- Every page fits one screen — **no page is a scrollable element**; reveal overflow creatively
  (panel decks w/ arrows/dots/keys/swipe, popovers, tooltips, "more" expanders, animation), keep ALL content.
- Caveman reply style (terse; code/commits/security written normally).
- NO commit / push / deploy without explicit OK from Tuhin.
- NO attribution lines in commits/PRs.
- Never move secret values through tools — Spotify/Barça creds stay in the Python server's `.env`.
- QA in browser before claiming done.

## Next step when resuming
Finish the unique-motion queue on `/artist/sound?mode=me` in order **1 → 2 → 3** (see Session 2b):
1. StatBig odometer roll (half-wired — finish per the IN-PROGRESS notes above).
2. Countdown stagger-reveal rank numbers + bar wipe.
3. Move to next page (Football Room `/artist/matchday` or Field Notes `/artist/notes`), same bar.
Then the remaining ComingSoon pages, each in-theme w/ real info + KPIs. Get open data items from Tuhin
so links/numbers are real. Full cross-world QA, present for sign-off.

---

## ⏩ Continuation prompt (paste to resume)

> Resume Molecules → Metrics at `D:\porfolio\molecules-metrics\web`. **Read `web/CLAUDE.md` first (agent
> contract — auto-loads; obey it), then the SESSION 2e block at the top of `web/CHECKPOINT.md`, then
> `web/SCOPE.md` + `web/SKILLS.md` + `web/COMPONENTS-21ST.md`.** Standing rules: caveman replies (code/commits
> normal), **NO commit/push/deploy without my explicit OK** (nothing is committed), **no attribution lines** in
> commits/PRs, never move secret values through tools (Spotify/Barça creds live in the Python server `.env`),
> no fabricated personal facts (honest empty-states, ASK if unknown), **every page fits one screen / no inner
> scroll / keep all content**, no em-dash in UI copy, invoke the skill stack (never hand-roll what a skill covers).
>
> Dev: `cd "D:/porfolio/molecules-metrics/web" && npm run dev` → Vite (**lands on 5176** this machine; if
> preview_start reuses a stale server, start Vite and navigate to localhost:5176 directly). Python live-API on
> 5195 may be DOWN → `/api/*` 502s + "feed offline" cards are EXPECTED, not a regression.
>
> **State:** the signature **ChemicalBath** hero is BUILT + WIRED + QA'd on desktop both worlds (warm-orange/
> teal darkroom-bath duotone portrait + touch-to-develop colour bloom; raw WebGL, zero deps). Core =
> `src/lib/chemical-bath.ts` (`createChemicalBath` factory), React wrapper `src/components/ChemicalBath.tsx`,
> wired in `src/worlds/Landing.tsx` + `src/worlds/heroAssets.ts` (`<canvas id="bath">`, `root[data-bath]`).
>
> **Do next, in order:** (1) **QA the hero bath on mobile 375 + reduced-motion** (desktop both-worlds already
> passed; `.print` goes `position:relative;aspect-ratio:4/5` under 900px — confirm the canvas fills it, no
> overflow, and reduced-motion/GL-fail correctly shows `.ph.base` underneath). (2) **Remove the temp `/lab`
> route** from `src/App.tsx` (+ its `ChemicalBath` import there) before ship. (3) Build the remaining signature
> layers hand-rolled with skills (motion-advanced + high-end-visual-design + frontend-design-direction),
> re-skinned per world: Projector-Gate entry, Reaction-Arrow spine, Torch Specimen (per-page), Particle
> molecule→metric, Eclipse Observatory, Tape-peel overflow, Live waveform. Pull the **2/day** 21st `get_component`
> (Ripple Distortion + Interactive Blur Reveal) opportunistically via the direct-curl recipe in `CLAUDE.md §2`
> (search unlimited; re-probe each session). (4) Then the ComingSoon pages (artist sound/matchday/notes/about/
> contact; analyst journey/dashboard/resume/contact), each in-theme w/ real info + KPIs. QA all 4 states +
> mobile375 + reduced-motion before claiming done; present with screenshots for sign-off. Ask before assuming
> on any ambiguity; my pasted reference links outrank refs you find.
>
> ---
> ### (prev, session 2b) unique-motion queue on `/artist/sound?mode=me` — mostly DONE
> StatBig odometer ✅, Countdown stagger+bar-wipe ✅ (both QA'd). Only `#3 next page` (Football Room
> `/artist/matchday` or Field Notes `/artist/notes`) was left of that queue — folded into step (4) above.
