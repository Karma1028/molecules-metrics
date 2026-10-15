# Portfolio Companion: Options

Scope: recurring on-site companion character for molecules-metrics (React 19 + Vite + motion/react). Appears on every page, pose/state changes per page, reacts to: day/night in Goa (IST), live Barça match, page change, idle, hover. Must stay small and never block content (one-screen pages).

Status: research only. Nothing built. Bundle numbers are estimates unless marked measured; verify with a real build before committing.

---

## 1. Implementation tech comparison

| Tech | Bundle cost (est., gz) | Authoring effort | Interactivity | Live examples |
|---|---|---|---|---|
| Sprite sheets (Flow / Nano Banana stills, CSS `background-position` or `<img>` swap) | ~0 KB runtime; 1 sheet ~20-80 KB webp, lazy-loaded | Low. Generate poses as stills, pack into sheet, done | Low: state = which frame/row; no tweening | oneko.js-style cat (GIF/sprite swap via data-cat attr); classic desktop pets |
| CSS `steps()` animation | 0 KB JS; reuses sheet above | Low. Keyframes with `steps(n)` | Low-med: idle loops, blink, bob. Pure CSS, no JS per frame | oneko.js family (sprite cycles) |
| Lottie (lottie-web or dotlottie-web) | lottie-web: tens of KB gz runtime plus JSON per animation. dotLottie player ~150 KB runtime (vendor figure) | Med: needs After Effects / LottieFiles pipeline; character must be vector | Med: markers and segments, limited state logic | LottieFiles marketing demos; many product onboarding mascots |
| Rive state machine (`@rive-app/react-canvas`, `useRive`, `useStateMachineInput`) | Heavy: canvas runtime WASM ~261 KB brotli (v2 figure from Rive docs). `react-canvas-lite` smaller but no text/audio | High. Rig in Rive editor; state machine inputs (`look`, `react`, `night`) | High: real state machine, pointer-driven look-at, blend states | Rive mascots on product sites; Codrops "Valley Adventures" React integration (2025) |
| SVG + motion (`motion/react`, `LazyMotion` + `m`) | Low: motion ~tens of KB gz full; `LazyMotion` trims it. SVG per pose ~2-10 KB | Med: hand-built vector parts (eyes, hair, limbs as groups) | High and cheap: variants, spring look-at, drag, reactions. Matches existing stack | Animated SVG mascots (Duolingo-style pattern) |

Recommendation for this stack: hybrid.
- Poses = sprite sheet (Flow stills) or per-pose SVG.
- Idle/blink = CSS `steps()`.
- Reactions, look-at, page transitions = motion/react (already in the project).
- Skip Rive unless the character needs a real state machine. Skip Lottie unless an After Effects source already exists.

---

## 2. Messi likeness risk

Not legal advice. Practical risk levels only.

What the research found:
- Messi's commercial image, name and signature rights are held by Leo Messi Management SL and licensed out (e.g. a 2021 apparel trademark licence to MGOTEAM 1). Source: [Justia contract](https://contracts.justia.com/companies/mgo-global-inc-15718/contract/261214)
- Messi's name is a registered EU trademark for sports goods after the 2018 General Court ruling (fame outweighed the "Massi" conflict). Source: [Bloomberg Law](https://news.bloomberglaw.com/ip-law/soccer-star-lionel-messi-scores-trademark-goal-at-eu-court-1)
- FC Barcelona's crest outline was refused as an EU trademark (2014 office decision, 2015 General Court). The crest is still used as a trademark in other forms, so treat it as protected. Source: [FC Business](https://fcbusiness.co.uk/news/general-court-turns-down-fc-barcelonas-trademark-bid/)
- Image-rights regimes differ: Spain has a constitutional right in one's image, the US has right of publicity. Caricature treatment is jurisdiction-specific and the search found nothing on it.

Risk table (portfolio = public, personal, non-commercial, but visitors/recruiters see it):

| Variant | Depicts Messi? | Risk | Notes |
|---|---|---|---|
| Recognisable Messi caricature (face, hair, build, No.10) | Yes | HIGH | Likeness of a real person whose image is commercially licensed. Do not use. |
| Name "Messi" in copy, alt text, or file names | Refers | MED | Fine in editorial text. Avoid in logos or as a character name. |
| Generic chibi No.10 seen from behind (no face) | No (hint only) | LOW-MED | Number + Barça colours still reads as Messi to fans. Keep it unbranded. |
| Kid in blaugrana stripes, "10" shirt, no crest/sponsor | No | MED | Kit colours are not themselves protected, but no crest, sponsor, or club name. |
| Football with a face | No | LOW | Pure original mascot. |
| Tuhin as chibi in No.10 shirt | No (Tuhin) | LOW | Own likeness; the shirt is a costume reference only. |

Verdict: Messi-face or Messi-body = HIGH; any Barça crest/kit logo = HIGH; faceless No.10 or ball mascot = LOW-MED to LOW.

---

## 3. Eight concepts

Pages referenced: Home, Gallery, Sound, Matchday, Notes, About, Contact, Analyst. Poses assume 6 per companion; the per-page mapping is a proposal.

### C1. Chibi Tuhin (camera + headphones) — "Shutter"
- Personality: curious, quick, a bit of a fidget; always has a camera strap and headphones.
- Poses: Home (wave), Gallery (camera raised), Sound (headphones on, bobbing), Matchday (phone with score, cheering), Notes (pencil, thinking), About/Contact (sitting, relaxed) + Analyst (magnifier, squinting at a chart).
- Reactions: hover = turns head to cursor; night IST = sleepy, headphones off; live Barça goal = jumps and waves scarf.
- Assets: 6 pose stills + 3 blink/idle frames + 2 night variants + 2 reaction frames = ~13.

### C2. Bankura terracotta horse — "Bankura"
- Personality: calm, steady, Bengal-rooted; the Bankura horse is the state's folk icon. Fits the existing BENGAL-MOTIF.md system.
- Poses: Home (standing, head up), Gallery (side-on, like a frame), Sound (ears up, listening), Matchday (rearing, joyful), Notes (head down, reading), About (lying down, resting) + Analyst (sideways stare at a dashboard).
- Reactions: hover = head turns; night = small terracotta glow; page change = trot across the top edge.
- Assets: 6 poses + 2 idle + 2 night + 1 trot loop = ~11.

### C3. Goa cat — "Sunset Cat"
- Personality: lazy, sun-loving, judges your scroll speed.
- Poses: Home (sprawled, sunning), Gallery (paw on a photo), Sound (tail flicking to beat), Matchday (on back, paws up), Notes (sitting, tail wrapped), About (curled up) + Analyst (ears forward, stalking).
- Reactions: IST night = sleepy curl; hover = paw swat; day = stretches on page load.
- Assets: 6 poses + 2 sleep + 2 idle + 1 stretch = ~11. (oneko-style sprite cycling works well here.)

### C4. Cassette — "Tape"
- Personality: retro, sincere, a little melancholy; reels turn when music plays.
- Poses: Home (closed, label up), Gallery (open, shows tiny photo), Sound (reels spinning, notes), Matchday (fast-forward with score), Notes (rewind), About (side-on, dusty) + Analyst (equaliser bars).
- Reactions: hover = reels turn; night = reels slow; page change = clicks to next side.
- Assets: 6 poses + 3 reel-spin frames + 2 night = ~11. Motion via SVG is cheap here.

### C5. Film canister — "Roll"
- Personality: thoughtful, slow to speak, likes light and exposure.
- Poses: Home (canister, lid on), Gallery (lid off, frames out), Sound (sound track as film edge), Matchday (sprocket spins fast), Notes (exposed frame with note), About (sealed, labelled) + Analyst (light meter).
- Reactions: hover = lid pops; night = dark, glow inside; page change = film advances one frame.
- Assets: 6 poses + 2 spin + 2 night = ~10.

### C6. Chibi No.10, back view (generic) — "Ten"
- Personality: competitive, focused, pure Matchday energy. No face shown, so reads as a fan figure, not a person.
- Poses: Home (standing, back to viewer), Gallery (looking at pictures over shoulder), Sound (dribble stance), Matchday (arms up, celebrating), Notes (sitting on bench), About (walking off) + Analyst (hands on hips, tactic board).
- Reactions: live match goal = arms up; night = bench nap; hover = turns half-way.
- Risk: LOW-MED (see section 2). Keep generic, no crest or sponsor.
- Assets: 6 poses + 3 match frames + 2 idle = ~11.

### C7. Football with a face — "Pelota"
- Personality: cheeky, expressive, minimal. Pure mascot.
- Poses: Home (bouncing), Gallery (in a tiny spotlight), Sound (bouncing to beat), Matchday (kicked, in air), Notes (on a notepad), About (rolling in), Analyst (tilted head, reading charts).
- Reactions: hover = wobbles; goal = spins; night = half-asleep, dims.
- Assets: 6 poses + 2 bounce frames + 2 night = ~10. Lowest risk and cheapest to produce.

### C8. Tuhin chibi in a No.10 shirt — "Ten-Tuhin"
- Personality: Tuhin's personality (photographer/listener vibe) plus fan energy. Blends C1 and C6 without depicting Messi.
- Poses: Home (wave, shirt "10"), Gallery (camera), Sound (headphones), Matchday (celebrate), Notes (pencil), About (sitting) + Analyst (chart).
- Reactions: live match = jumps; night = sleepy; hover = looks at cursor.
- Risk: LOW (own likeness; shirt is a costume reference only).
- Assets: 6 poses + 3 idle + 2 night = ~11. Note: depends on C1's pose set, so cheapest after C1.

Ranking of asset load: C7 is smallest (~10), C1 and C8 ~11-13, all within a sprite-sheet budget under 150 KB total.

---

## 4. Recommendation

Top 2:

1. C1 Chibi Tuhin with camera + headphones (with C8 as the Matchday variant). Most personal; ties to Gallery (camera) and Sound (headphones). Low risk. Tech: sprite sheet + CSS steps() for idle + motion/react for reactions.
2. C2 Bankura terracotta horse. Culturally specific (Bankura roots, BENGAL-MOTIF.md alignment), zero licensing exposure, distinctive silhouette. Tech: sprite sheet + motion/react for trot and head-turn.

Matchday add-on (optional): C6 generic No.10 back-view as a swap for Matchday only, kept faceless and crest-free.

Do not pursue: any Messi-face version (HIGH).

Next steps before build (not done here):
- Confirm the rejected-concept rule in memory (whole site concept was rejected earlier; get references and approval first).
- Measure bundle size of motion/react + LazyMotion and a sprite sheet in the real Vite build.
- Generate 1 pose set (C1) as a test before committing to 6 poses x sheets.

---

## Sources
- [oneko.js (desktop cat pet on the web)](https://git.gay/RiM/oneko.js/src/branch/main/README.md)
- [Rive: canvas vs webgl](https://rive.app/docs/runtimes/web/canvas-vs-webgl.md)
- [Rive: migrating from v1 to v2](https://rive.app/docs/runtimes/web/migrating-from-v1-to-v2)
- [Rive: React preloading wasm](https://rive.app/docs/runtimes/react/preloading-wasm)
- [Codrops: Integrating Rive into a React project (2025)](https://tympanus.net/codrops/2025/05/12/integrating-rive-into-a-react-project-behind-the-scenes-of-valley-adventures/)
- [LottieFiles: optimize Lottie files](https://lottiefiles.com/blog/working-with-lottie-animations/optimize-lottie-files-for-faster-page-load-speeds.md)
- [LottieFiles: dotLottie players](https://docs.lottiefiles.com/en/runtimes)
- [Messi/Massi EU trademark (Bloomberg Law)](https://news.bloomberglaw.com/ip-law/soccer-star-lionel-messi-scores-trademark-goal-at-eu-court-1)
- [Messi trademark licence (Justia)](https://contracts.justia.com/companies/mgo-global-inc-15718/contract/261214)
- [FC Barcelona crest refusal (FC Business)](https://fcbusiness.co.uk/news/general-court-turns-down-fc-barcelonas-trademark-bid/)
- [Messi image-rights patchwork (Swaab)](https://swaab.com.au/publication/a-messi-patchwork-of-image-rights)
