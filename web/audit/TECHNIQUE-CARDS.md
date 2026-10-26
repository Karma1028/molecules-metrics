# Technique Cards: portfolio reference sites → Molecules→Metrics

Date: 2026-10-15. Read-only research. Browser inspection via computed styles, keyframes, script list, canvas rects. Values marked `(measured)` came from computed CSS. Values marked `(inferred)` came from class names or keyframe shape, not a live interaction.

Target stack: React 19 + Vite 8 + `motion` ^14 (motion/react). No three.js or R3F installed today. Any 3D recipe below means adding a dep (flagged L).

Hard constraints applied to every recipe: one screen per page, no page scroll. Scroll-driven ideas are converted to pointer, wheel-step, or time-driven. Every recipe needs a reduced-motion fallback.

## Site status

| Site | Status |
|---|---|
| kodeimmersive.com | Inspected (intro gate clicked, one screenshot per state) |
| madebyhart.com | BLOCKED: navigate returned "denied or failed" twice. No data. |
| dejiajetomobi.com | Inspected. Almost no motion (negative control). |
| davidwhyte.com/experience | Inspected (loader state captured, computed CSS read) |
| about.senbuzy.com | Inspected (computed CSS, loop keyframes). Hover recheck not possible (synthetic events do not fire :hover). |
| quangdinh.im | BLOCKED: navigate "denied or failed". No data. |
| meermohsin.me | BLOCKED: navigate "denied or failed". No data. |
| nealenadar.com | Inspected (sticker/collage system, keyframes, modal) |
| threeui.com/browse | Inspected (computed CSS, keyframes, library grid) |

Skipped by request: jameschugh.com, huyml.co.

Blocked sites: the browser policy or host refused the navigation. Retry from the user side, or send screenshots and a DevTools dump (computed CSS or keyframes) for those three.

## Shared easing vocabulary (measured on the live sites)

| Curve | Seen on | Use in our system |
|---|---|---|
| `cubic-bezier(0.19, 1, 0.22, 1)` (expo-out) | davidwhyte (x15 opacity, 0.8s) | Hero reveals, big panel moves |
| `cubic-bezier(0.16, 1, 0.3, 1)` (expo-ish out) | senbuzy (padding-left 0.3s), threeui (browse-item-in 0.36s) | Row hover and card entry |
| `cubic-bezier(0.165, 0.84, 0.44, 1)` (quart-out) | davidwhyte (stroke-dashoffset 0.7s, transform 0.6s) | SVG line draws, small reveals |
| `cubic-bezier(0.215, 0.61, 0.355, 1)` (cubic-out) | davidwhyte (transform 0.8s x10) | Translate reveals |
| `cubic-bezier(0.32, 0.72, 0, 1)` | threeui (drawer transform 0.3s) | Sheet or drawer slide |
| `cubic-bezier(0, 0, 0.2, 1)` (ease-out) | kodeimmersive (color/opacity/transform 0.2–0.5s) | Generic UI state |
| `cubic-bezier(0.65, 0, 0.35, 1)` (ease-in-out) | senbuzy cueDot 1.9s | Looping cue dot |
| `ease` / `ease-in-out` at 0.14–0.2s | threeui buttons (0.14s), davidwhyte (0.2–0.4s) | Hover state colour |

Rule for us: state changes (hover, focus) at 140–200ms ease-out. Reveals at 600–800ms expo-out. Loops at 1.8–2.5s. Never exceed 1s for a UI-blocking state.

---

## 1. KODE Immersive (kodeimmersive.com)

**Signature moment:** A black intro gate with a logo and `[ ENTER ]`. Behind the hero sits a 3D folded red object that overlaps the huge serif word "PURPOSE" on a flat orange field.

**Techniques**

1. **Intro gate (click to enter).** Full-screen black layer with the wordmark `KO)E.IMMERSIVE` and `[ ENTER ]`. Click removes the gate. Trigger: click. Library: none detected (no GSAP/Lenis globals). Duration not measured.
2. **Clip-path panel wipe.** Fixed overlay `div.flex.pointer-events-none.fixed.inset-0.z-40` and an `.inner.text-black` panel use `clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)` when closed (measured). They open to full rect. Trigger: nav (menu). Duration unknown. Likely a CSS transition on clip-path (inferred).
3. **Colour and transform micro-states.** `transform 0.3s / 0.5s cubic-bezier(0,0,0.2,1)` on about 9 elements. `color, background-color, border-color, text-decoration-color 0.5s cubic-bezier(0.4,0,0.2,1)` on 13 elements (measured). Trigger: hover (inferred).
4. **Opacity fades.** `opacity 0.2s / 0.3s / 0.5s cubic-bezier(0,0,0.2,1)` on about 9 elements (measured).
5. **Loop pulse.** Keyframe `pulse-7e3056ed`, 2s, `cubic-bezier(0.4,0,0.6,1)`, on 2 elements (measured). Probably a live-dot.
6. **SVG outline paths.** 62 `path` elements; `r, fill, stroke 0.3s` on 2 (measured). Shapes in the services section are SVG.
7. **Long scroll with slow response.** Document height about 13.5k px (14.8× viewport). Five wheel ticks moved only 126px (measured). Scroll is likely pinned or custom-driven (inferred). Not verified further.

**3D / WebGL**
- Three full-viewport canvases at `0,0` (758×914) with class `w-full h-full`. One more canvas (876×154) sits at y=380 in the hero band (measured).
- `canvas.getContext()` throws "control transferred to offscreen" on those canvases (measured). So rendering runs in a Web Worker through `transferControlToOffscreen`. The scene is not on the main thread.
- The hero object is a red folded ribbon-like form. It sits over the serif headline. Interaction reaction (pointer or scroll) was not tested.

**Paper / collage / tactile:** None. Flat orange and black, serif display type, hard colour blocks. No grain.

**Port to Molecules→Metrics**

- Fits: **cover** (intro gate → our cover), **artist Home** (3D object over wordmark), **Gallery** (clip-wipe panel for an image opening).
- Recipe (cover, motion + R3F, L effort):
  - Add `@react-three/fiber` and `three` (L: new deps, bundle +~200kB gz). Alternative without three: an SVG extruded path with `motion` `rotateX/rotateY` from pointer (M effort).
  - Keep the 3D object in its own `<Canvas>` absolutely positioned behind a 25vh wordmark with `mix-blend-mode: difference`. Keep it on the same screen.
  - Pointer: `useMotionValue` for x/y, `useSpring({stiffness:120, damping:22})` to drive the object's rotation. Clamp to ±12°.
  - Gate: `motion.div` clip-path `inset(0 0 100% 0)` → `inset(0)` on click, 0.8s `[0.19,1,0.22,1]`. Store the gate state in `sessionStorage` (try/catch).
  - Reduced motion: `useReducedMotion()` → render a static PNG of the object, skip the gate animation (instant show).
- Wow: 4. Effort: L (3D) / S (gate wipe).

---

## 2. madebyhart.com

**Status: BLOCKED.** Two navigate attempts returned "denied or failed". No computed styles, keyframes or screenshots captured. Do not treat this as a finding about the site.

**Action needed:** Allow navigation to this host, or send a screenshot and DevTools dump (keyframes, computed `transition`/`animation` on hero elements).

---

## 3. dejiajetomobi.com (Deji Ajetomobi, Designer)

**Signature moment:** None. Static designer portfolio: name, bio, case-study list, experience, press list, social links.

**Techniques (measured)**
- Only motion: `color 0.2s ease` on 4 links.
- Zero keyframes. Zero canvas. Zero animated elements. One inline SVG path.
- Scripts: Cloudflare Zaraz, GA4. No animation library.

**3D / WebGL:** None.
**Paper / collage / tactile:** None.

**Port to Molecules→Metrics**
- Use as a **negative control** for the Notes, Resume, Work, Skills and Journey pages. Restraint is a valid choice; do not add motion just because the other sites have it.
- Only useful recipe: the link colour transition, which is already the standard our CSS should have:
  - `transition: color 200ms ease, border-color 200ms ease` on `a`, `button`.
- Wow: 1. Effort: S.

---

## 4. davidwhyte.com/experience (David Whyte, Companion)

**Signature moment:** On load, a circular loader spins with the line "Access David's library..." then the Companion page fades in. A "Scroll to explore" underline draws and resets on a loop.

**Stack:** WordPress + WooCommerce, custom theme `app.js`, jQuery 3.7, Mapbox GL 3.14, dash.js video player, Tarteaucitron cookie banner, reCAPTCHA. Plain CSS keyframes. No GSAP, Lenis or Three detected.

**Techniques (measured unless noted)**

1. **Circle loader.** `rotate-loader 1s linear` infinite, plus `spin 1s` (`rotate(0)→rotate(1turn)`). Trigger: load. Captured visible state: a light-grey circle with a black arc, label "Loading". Use for: Sound (radio buffering) and the Matchday feed.
2. **Looping marquee.** `marquee` keyframe: `translate3d(100vw,0,0) → translate3d(-100vw,0,0)`. Duration not captured (inferred: linear loop). Trigger: time. Use for: a ticker strip on Matchday.
3. **Scroll-cue underline.** `scrollToExplore_underline` and `sign_in_underline`: `translateX(-100%)` at 0% → `translateX(0)` at 20% → hold to 70% → exit to `translateX(100%)` at 100%. Trigger: load (loop). Use for: a "NEXT" or "PLAY" cue on no-scroll pages.
4. **Hero entrance (slow).** `opacity 1.8s ease` and `transform 2.4s cubic-bezier(0.14,1,0.34,1)` on 6 elements (measured). Total duration about 2.4s. Use for: cover reveal, but cut to 1.2s for us.
5. **Expo-out reveals.** `opacity 0.8s cubic-bezier(0.19,1,0.22,1)` on 15 elements (measured), and `transform 0.8s cubic-bezier(0.215,0.61,0.355,1)` on 10 elements. Trigger: IntersectionObserver class toggle (inferred from class churn). Use for: the page-level stagger on artist Home.
6. **SVG draw.** `stroke-dashoffset 0.7s cubic-bezier(0.165,0.84,0.44,1)` on 2 elements (measured). Trigger: class toggle. Use for: a hand-drawn underline or a route line on Journey.
7. **Interaction states.** `border-color, background-color 0.3s linear` on 6 elements; `opacity 0.8s cubic-bezier(0.19,1,0.22,1)` on hover images (inferred from class names). Use for: Gallery hover.
8. **Map.** Mapbox GL v3.14. Interactive literary map. Map is not a canvas in our use case; skip the map but keep the "pin then zoom" idea for Journey.

**3D / WebGL:** None. One 340×340 canvas (measured) sits at 294,372 on the loader. Probably a loader or product spin. Not verified.

**Paper / collage / tactile:** None. Clean sans and serif type, white and grey.

**Port to Molecules→Metrics**
- **Matchday (ticker):** a `marquee` strip driven by `motion` `animate` with `repeat: Infinity`, `ease: "linear"`, pause on `hover` and `focus`. Reduced motion: `animate` off and text becomes a static list.
  - Recipe: `const x = useMotionValue(0); useAnimationFrame(...)` or `animate(x, [0, -w], {duration: 30, ease:'linear', repeat: Infinity})`. Stop when `useReducedMotion()`.
  - Wow: 3. Effort: S.
- **Sound (radio buffering loader):** circular arc rotation `rotate 1s linear` with `prefers-reduced-motion` → static pulsing dot. Effort: S.
- **Cover / artist Home:** expo-out reveal stagger.
  - `motion` `variants`: parent `staggerChildren: 0.08`, child `initial {opacity:0, y: 24}` → `{opacity:1, y:0}` with `transition: {duration: 0.8, ease: [0.19,1,0.22,1]}`. Trigger: mount (no scroll).
  - Reduced motion: `duration: 0`.
  - Wow: 3. Effort: S.
- **Cover (scroll-cue replacement):** the underline loop under the "ENTER" or "NEXT" control, `motion` keyframes `x: ['-100%', '0%', '0%', '100%']`, `times: [0, 0.2, 0.7, 1]`, `duration: 2.4`, `repeat: Infinity`. Stop under reduced motion.
  - Wow: 2. Effort: S.
- **Journey (SVG draw):** `pathLength` `0 → 1` with `motion.path` and `transition: {duration: 0.7, ease: [0.165,0.84,0.44,1]}`. Trigger: mount or card focus. Effort: S.

---

## 5. about.senbuzy.com (Sen, creative technologist)

**Signature moment:** A small orbiting-dot loader, then a full-height canvas on the left and a scroll cue dot that keeps falling. The résumé and works list shift right on hover.

**Stack:** Vite bundle (`index-*.js`), vanilla DOM, GA4, Cloudflare. No GSAP, Lenis, Three or Framer detected. One full-page canvas at 0,0 (743×914) and one 300×150 canvas (measured, the second is likely an orbit/loader mini-canvas).

**Techniques (measured)**

1. **Orbit loader.** `zooop-dot-spin 2.5s linear` infinite on 3 elements. `lrSpin` (rotate 360) also defined. Trigger: load.
2. **Scroll cue (dot).** `cueDot 1.9s cubic-bezier(0.65,0,0.35,1)`: `translateY(-10px) opacity 0 → opacity 1 at 25% → 1 at 75% → translateY(+) opacity 0`. Loops. Use for: a "NEXT" cue on no-scroll pages.
3. **Cue label pulse.** `cueLabelPulse 2.4s ease-in-out`, opacity 0.6 ↔ 1. Pairs with 2.
4. **Load fade.** `fadeDown 1.8s ease`: `opacity 0, translateY(-16px)` → `opacity 1, translateY(0)`. Used on the header block.
5. **Ambient pulse.** `fadePulse` (opacity 0.4 ↔ 0.85), not clearly assigned in the measured sample. Use for: a status dot.
6. **Row slide on hover (inferred).** `padding-left 0.3s cubic-bezier(0.16,1,0.3,1)` on 14 elements, plus `color 0.2s ease` on 15 elements (measured). The `.wk-line-name` span is one of them. The slide was not confirmed live: synthetic mouse events do not trigger `:hover`. Treat it as inferred.
7. **Button state.** `color, border-color, background, transform 0.2s ease` on 3 elements (measured).

**3D / WebGL:** Not confirmed. Full-page canvas 743×914 at 0,0 (measured). Probably a 2D or WebGL background. Not verified. Do not port a 3D claim from this site without checking.

**Paper / collage / tactile:** None. Dark UI, sans type, orbit loader.

**Port to Molecules→Metrics**
- **Work list (artist Home, Work, Gallery index):** hover row slide. `motion.li` with `whileHover={{ paddingLeft: 16 }}` and `transition: {duration: 0.3, ease: [0.16,1,0.3,1]}`. Keyboard focus parity: `whileFocus` with the same value. Reduced motion: no padding change, use a border-left instead.
  - Wow: 3. Effort: S.
- **Cover / every no-scroll page (scroll cue):** replace the "SCROLL" cue with a looping dot cue.
  - `motion` keyframes `y: [-10, 0, 0, 10]`, `opacity: [0, 1, 1, 0]`, `times: [0, 0.25, 0.75, 1]`, `duration: 1.9`, `repeat: Infinity`, `ease: [0.65,0,0.35,1]`.
  - Use it as a hint that the page has more content, even though we never scroll. Make the hint a "NEXT" button instead of an actual scroll.
  - Wow: 2. Effort: S.
- **Matchday / Dashboard loader:** orbit dots, `rotate 360` linear 2.5s, 3 dots at 120° offsets. Reduced motion: static three-dot row.
  - Wow: 2. Effort: S.

---

## 6. quangdinh.im

**Status: BLOCKED.** Two navigate attempts returned "denied or failed". No data.

---

## 7. meermohsin.me

**Status: BLOCKED.** Two navigate attempts returned "denied or failed". No data.

---

## 8. nealenadar.com (Neale, illustrator and motion)

**Signature moment:** A chunky pink hand-lettered wordmark "NEALE" sits on a green pixel-checker field. Round sticker photos are scattered around an "ABOUT ME" block. A pixel-art self-portrait sits in a pink frame.

**Stack:** Plain HTML/CSS with exported keyframes (`animation_N_1`). YouTube iframe API, hls.js 1.1.4, `viewer.js` (image lightbox). No GSAP, Lenis, Three or Framer detected.

**Techniques (measured)**

1. **Sticker cluster.** About 20 `div.animation-container` elements, each with inline `offset-path: path("M x y")` (zero-length motion path), `offset-distance: 0px`, `left/top/width/height`, and `z-index` 381–402. Each uses a keyframe `animation_N_1`:
   - `animation_1_1`, `_2_1`, `_3_1`: `opacity 0 → 1`, `offset-distance: 0`, timing `ease-in-out`.
   - `animation_4_1`, `_5_1`, ... : `transform: rotate(0deg) scale(1) opacity 0` → `rotate(0deg) scale(1.15) opacity 1`.
   - `animation_9_1`: `scale(1) → scale(1.1)`, opacity 1 to 1 (hover pop).
   - Timing: `opacity 0.2s ease`, 94 instances (measured). `transform, opacity 0s` on 13 (measured, instant reset).
   - Trigger: load and hover (inferred from scale keyframes). Scale 1.1–1.15 is the hover amount.
2. **Zero-length offset-path pivot.** The `offset-path: path("M 22 22")` trick keeps elements in place while `transform` drives scale and rotation. Reusable for any sticker, no layout shift.
3. **Loading indicator.** `formsloadingindicatoranimation 2s linear` on 1 element (measured).
4. **Hover buttons.** `opacity 0.2s ease` (about 94, the majority of the page). `background-color 0.3s ease`, `transform 0.3s ease`, `color 0.1s ease` (measured).
5. **Project modal.** "Close" text on the project page. `opacity 0.1s ease-out` on close control (measured). Modal is a full-screen overlay on the project page.

**3D / WebGL:** None.

**Paper / collage / tactile:** This is the strongest tactile reference in the batch.
- Sticker photos with slight rotation (`rotate` 0 to ±, varies per item) overlapping at angles.
- Pixel-art checker border (green and cream blocks) above and below the wordmark. Tape-like strips.
- Chunky pink wordmark with a hand-cut feel. Uneven letterforms.
- Pixel self-portrait in a framed card.
- Video (YouTube, HLS) embedded in the project modal.

**Port to Molecules→Metrics**
- **Gallery (sticker collage):**
  - Each tile: `motion.div` with `initial={{opacity:0, scale:0.9}}` → `animate={{opacity:1, scale:1}}`, `transition: {duration: 0.2}`, plus `whileHover={{scale: 1.1, rotate: r}}` where `r` is a per-tile constant (±3°).
  - Keep the zero-length pivot: use `transformOrigin: 'center'` and avoid `layout` animation.
  - Reduced motion: skip scale; opacity only.
  - Wow: 4. Effort: M.
- **Artist Home / cover (chunky wordmark + pixel checker):** the checker strip is a static SVG or CSS `repeating-conic-gradient`. Not animated. Use it as an accent band on Notes and About.
  - Wow: 3. Effort: S.
- **About (pixel portrait):** the portrait is a static `img` with `image-rendering: pixelated`. Hover: `filter: contrast(1.1)`. No keyframes.
  - Wow: 2. Effort: S.
- **Journey (sticker ribbon):** place 4–5 small stickers along a path using `motion`, `initial` at 0 opacity, staggered `delay: i*0.06`. No scroll.
  - Wow: 3. Effort: M.
- **Work (project modal):** open with `motion` `layoutId` from the sticker tile to a centred modal. Close with the reverse. Reduced motion: crossfade only.
  - Wow: 4. Effort: M.

---

## 9. threeui.com/browse (ThreeUI library)

**Signature moment:** A dark library grid of Three.js components. On first paint, a faint ghost drifts in from the left and each card rises in turn.

**Stack:** Vite bundle (`index-*.js`), vanilla DOM, GA4, PromoteKit. Dark theme with pill filter chips and a search box.

**Techniques (measured unless noted)**

1. **Load drift.** `threeui-initial-drift`: `translateX(-28px) opacity 0 → opacity 0.45 at 25%–65% → translateX(0) opacity 1`. Trigger: load. Applied to a background ghost element (inferred).
2. **Card entry.** `browse-item-in 0.36s cubic-bezier(0.16,1,0.3,1)`: `translateY(+) opacity 0 → translateY(0) opacity 1`. Applied to 28 items (measured). Delays were not captured (stagger likely; not verified).
3. **Sidebar preview entry.** `sidebar-preview-in`: `translate(-4px) scale(0.985) opacity 0 → translate(0) scale(1) opacity 1`. Trigger: select.
4. **Preview loading.** `preview-loading-spin` (rotate 360) and `preview-loading-reveal` (opacity to 0.6). Trigger: preview load.
5. **Accordion.** `grid-template-rows 0.18s ease` on 21 elements (measured). Classic 0fr → 1fr trick for filter groups. Trigger: click.
6. **Drawer.** `transform 0.3s cubic-bezier(0.32,0.72,0,1)` on 3 elements (measured). Mobile sheet.
7. **Buttons and chips.** `background-color, color, transform 0.14s ease` on 290 elements; `border-color, transform 0.18s cubic-bezier(0.16,1,0.3,1)` on 28 (measured). Dense hover system.
8. **Search tooltip.** `search-result-tooltip-in`: opacity 0 → 1 (fade only).
9. **Status pulse.** `purchase-status-pulse`: opacity 1 ↔ 0.35, scale 1 ↔ 0.8. Loop.

**3D / WebGL:** The library is about Three.js components. The index page itself has no canvas (measured: zero `canvas` elements). The 3D lives in the preview cards, which are not loaded on this grid.

**Paper / collage / tactile:** None. Dark UI, thin borders, high-density chips.

**Port to Molecules→Metrics**
- **Gallery (grid of cards):** `motion.li` with `initial={{opacity:0, y:8}}` → `animate={{opacity:1, y:0}}`, `transition: {duration: 0.36, ease: [0.16,1,0.3,1], delay: i*0.03}`. Cap total stagger at 0.6s for the whole grid (clamp `i` at 20).
  - Reduced motion: `duration: 0`.
  - Wow: 3. Effort: S.
- **Dashboard (filter accordion, Skills/Work filters):** `display:grid; grid-template-rows: 0fr → 1fr` with `transition: grid-template-rows 180ms ease`. No JS height measure needed. Reduced motion: `transition: none`.
  - Wow: 2. Effort: S.
- **Sound / Matchday sidebar preview:** `motion` `initial={{opacity:0, x:-4, scale:0.985}}` → `animate={{opacity:1,x:0,scale:1}}`, 0.2s, `ease: [0.16,1,0.3,1]`. Triggered by selection.
  - Wow: 2. Effort: S.
- **Global button system:** `transition: background-color 140ms ease, color 140ms ease, transform 140ms ease`. Add `:active { transform: scale(0.98) }`. Reduced motion: remove transform.
  - Wow: 2. Effort: S.
- **Ghost drift on cover:** a second copy of the cover wordmark at 0.45 opacity drifts `x: -28 → 0` over 1.2s with `ease: [0.16,1,0.3,1]`, then holds. Mix-blend `screen`. Reduced motion: none.
  - Wow: 3. Effort: S.

---

## Port matrix by target page

| Target page | Best technique source | Recipe summary |
|---|---|---|
| cover | kodeimmersive (gate, 3D object), davidwhyte (hero reveal), senbuzy (cue dot) | Click gate with clip-path wipe; ghost drift; looping cue dot instead of SCROLL |
| artist Home | davidwhyte (expo-out stagger), senbuzy (row slide), nealenadar (chunky wordmark + checker band) | Mount stagger; hover row indent; static checker accent |
| Gallery | nealenadar (sticker tiles), threeui (grid entry) | Sticker tiles with hover scale and per-tile rotation; grid stagger clamped at 0.6s |
| Sound / radio | davidwhyte (circle loader), senbuzy (orbit dots) | Buffer spinner; static pulse under reduced motion |
| Matchday | davidwhyte (marquee), senbuzy (orbit loader) | Ticker marquee, pause on hover/focus |
| Notes | dejiajetomobi (link colour, negative control), nealenadar (checker band) | Plain link colour; no motion on text |
| About | nealenadar (pixel portrait), senbuzy (fade down) | Static pixel portrait; header fade down 1.8s to 0.4s |
| artist Contact | dejiajetomobi (restraint) | No motion beyond focus rings |
| analyst Home | threeui (grid entry, drift) | Card stagger, no 3D |
| Skills | threeui (accordion, chips) | grid-rows accordion; chip hover 140ms |
| Work | nealenadar (modal), senbuzy (row slide) | layoutId modal open; row slide |
| Journey | davidwhyte (SVG draw), nealenadar (sticker path) | pathLength draw; sticker stagger |
| Dashboard | threeui (filters, drawer), davidwhyte (status) | Grid-rows filter; status pulse |
| Resume | dejiajetomobi (static), senbuzy (list hover) | Static; list hover only |
| analyst Contact | dejiajetomobi | Form focus only |

## Final table: technique | source site | target page | effort (S/M/L) | wow (1-5)

| # | Technique | Source | Target page | Effort | Wow |
|---|---|---|---|---|---|
| 1 | Intro gate with clip-path wipe (click to enter) | kodeimmersive | cover | S | 4 |
| 2 | Hero 3D object over wordmark, pointer-tilt spring | kodeimmersive | cover / artist Home | L | 5 |
| 3 | Sticker tiles with hover scale + per-tile rotation | nealenadar | Gallery | M | 4 |
| 4 | layoutId modal from sticker tile | nealenadar | Work | M | 4 |
| 5 | Expo-out mount stagger (0.8s, 0.19,1,0.22,1) | davidwhyte | artist Home / cover | S | 3 |
| 6 | Looping cue dot in place of SCROLL | senbuzy | all no-scroll pages | S | 2 |
| 7 | Ghost drift + mix-blend on wordmark | threeui | cover | S | 3 |
| 8 | Marquee ticker, pause on hover/focus | davidwhyte | Matchday | S | 3 |
| 9 | List row padding-left slide (0.3s expo) | senbuzy | Work / artist Home | S | 3 |
| 10 | Grid card entry stagger, clamped | threeui | Gallery / analyst Home | S | 3 |
| 11 | pathLength SVG draw (0.7s quart-out) | davidwhyte | Journey | S | 3 |
| 12 | Grid-rows accordion filter | threeui | Skills / Dashboard | S | 2 |
| 13 | Orbit / circle loader under reduced-motion fallback | davidwhyte, senbuzy | Sound / Matchday | S | 2 |
| 14 | Pixel checker accent band (static) | nealenadar | Notes / About | S | 3 |
| 15 | Link colour 200ms baseline (negative control) | dejiajetomobi | Notes / Resume / Contact | S | 1 |

Top 8 by wow/effort (wow ÷ effort weight, S=1 M=2 L=3):
1. Intro gate clip-path wipe (4, S) on cover
2. Expo-out mount stagger (3, S) on artist Home
3. Ticker marquee with pause (3, S) on Matchday
4. List row slide (3, S) on Work
5. Ghost drift wordmark (3, S) on cover
6. Sticker tiles hover (4, M) on Gallery
7. layoutId modal from sticker (4, M) on Work
8. Hero 3D tilt (5, L) on cover, only if we accept a new dep

## Open items

- madebyhart.com, quangdinh.im, meermohsin.me: navigation refused twice each. Re-run once access is allowed, or supply screenshots and DevTools dumps.
- senbuzy row slide: inferred from the padding-left transition. Confirm with real pointer hover.
- kodeimmersive hero object reaction: not tested (needs pointer movement). Confirm before committing to the tilt recipe.
- davidwhyte marquee duration and stagger delays not captured. Set to 30s linear as a starting value, tune by eye.
- threeui card stagger delays not captured. Recipe uses 30ms per index (assumed).

## Verification the recipes need (per SKILLS.md)

- Test dark, light, 375px mobile, and reduced-motion for every recipe above.
- Confirm no element causes page scroll (check `document.documentElement.scrollHeight <= innerHeight` on every page).
- Any 3D recipe: add `@react-three/fiber` and `three` only after a go/no-go, and keep the canvas below the 800-line file ceiling per file.
