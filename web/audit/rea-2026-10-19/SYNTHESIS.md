# Synthesis — how the 40 references are creative, and what Molecules → Metrics should take

> Status: **PROPOSAL, not approved.** Tuhin picks; nothing is built from this file until he does.
> Evidence: `cards-A..F.md` (per-site), `fingerprints/`, `sheets/`, `rea-digest.md`.
> Two cards were re-verified by eye (kashyap, moonsafari): both accurate.
> Locked decisions from `CREATIVE-DIRECTION-R2.md` still win (one-screen pages, ≤8 loops,
> one wow = world-switch morph, no chem-eng drawing language, sound off by default,
> companion = chibi Tuhin in plain No.10).

## 1. The finding that matters most

**Creativity on these sites is art direction, not technology.** Of 35 sites captured:
- Only 3 run the "award stack" (GSAP + ScrollTrigger + Lenis + three.js): teletech, localstudio, monogrid.
- The memorable ones are often low-tech: the3key (WordPress + jQuery), peppa (Webflow IX2 + Lottie),
  moonsafari (near-static + custom cursor), sainturbain (plain grid), eisenberger (jQuery tile grid).
- What they share is **one governing device, applied without exception.** Moon Safari is one line and
  one node. La Gata Perduda is one map. Kashyap's portfolio is one design tool's chrome.

Implication: our gap is not missing libraries. It is pages that each have several nice ideas
instead of one law.

## 2. Nine transferable principles (ranked by evidence + fit)

| # | Principle | Evidence (sites) | Fit for Tuhin |
|---|---|---|---|
| P1 | **One device carries the page.** A single object/gesture is the navigation, the layout and the motion. | moonsafari (line+node), gataperduda (map), the3key (paper notes), duhaihang (one rail) | Very high: our one-screen rule *needs* this |
| P2 | **The craft is the interface.** Show the work by operating it, not describing it. | kashyap (font-picker as content), hvdmatch (weight slider in hero), pienso (product on a sample), exat, frost | Highest for the Analyst world: a BI person should be judged on a working control |
| P3 | **Waiting is content.** Loader/gate counts, speaks, or is a character. | yauch (pie-wipe countdown), kashyap (73%→100% → manifesto line), pencilvania (pencil-dog loader), marseille (counter) | High: our spine is literally "started counting" |
| P4 | **Ask for a sense before showing.** First screen is a condition. | onelastbeat ("better with headphones"), gucci (single-choice gate) | High for Sound (already opt-in) and the Landing world choice |
| P5 | **Change the pointer, change the medium.** | inkwell (ink-dot cursor, cursor:none ×1391), moonsafari (cursor:none ×284), the3key | High: cheap, zero loops, instantly says "two worlds" |
| P6 | **Media is a layer, not a page.** Player persists while content changes. | teletech (docked player + blurred backdrop) | High: Hostel Radio already exists |
| P7 | **The index is the interface.** Counts, mono dates, key letters ARE the layout. | stripedev, frost (axis ladder as nav), duhaihang | High for Notes + Work (no-scroll friendly: page, don't scroll) |
| P8 | **Type is the image; one colour field + one giant word.** Words change, object stays still. | loiseau, lemkus, rxk, monogrid, peppa | Already adopted (poster pages). Add peppa's "word cycles, object still" |
| P9 | **Restraint as signature.** Photos carry it; type recedes to hairlines. | sainturbain, eisenberger, poltronafrau | Gallery guard-rail: do NOT over-motif the photos |

Anti-patterns seen (avoid): gcloud-style link farms; cookie walls covering the hero (gucci, telekom,
monogrid); lemkus's load-time email modal; loaders longer than ~2 s that say nothing.

## 2b. Measured motion system (v2, 2026-10-19 — from forensics, not stills)

Sources: `motion-aggregate.md` (38 sites, 1728 fitted tweens, rmse ≤ .15), `specs-A..E.md`,
`cursor-probe.json`. Opus spot-checked spec claims against raw source (marseille ×1241,
sainturbain ×37, gallipoli Expo ×183 all match).

**What winners actually animate:** opacity (796) + translateY (426) dominate; rotate 274, x 90,
scale 81. Nothing else matters at scale → our motion = transform + opacity only.

**Proposed tokens for Molecules → Metrics (each traced to evidence):**

| Token | Value | Evidence |
|---|---|---|
| `--ease-out` (house) | `cubic-bezier(.19,1,.22,1)` (expo/quart-out) | 7 sites JS + 6 CSS: inkwell, localstudio (rmse .002), rxk, stripedev, peppa, gataperduda (.043) |
| `--ease-in-out` | `cubic-bezier(.77,0,.175,1)` | eisenberger header 700 ms; power2.inOut 235 tweens / 6 sites (inkwell words) |
| `--ease-ui` | `cubic-bezier(.4,0,.2,1)` | 6 sites, 245 uses (kashyap, monogrid, guess 800 ms ×175) |
| `--ease-wipe` | `cubic-bezier(.86,0,.07,1)` | duhaihang city wipe 1.5 s |
| `--dur-ui` | 200–300 ms | tween p25 286; telekom UI 200; loiseau hover 300 in / 200 out |
| `--dur-reveal` | 500–800 ms | tween median 465, p75 758; gcloud 500; guess 800 |
| `--dur-hero` | 1000 ms | inkwell, exat, rxk, marseille word reveals all 1000 |
| `--dur-wipe` | 1500 ms | duhaihang, moonsafari page-content 1550–1750 |
| stagger chars | 7–14 ms | localstudio 7/14, exat 13, inkwell 9–14 |
| stagger words/items | 26–36 ms | kashyap 26–28, monogrid 28, cross-site median 36 |
| stagger "read aloud" | ~97 ms | gallipoli quote words, opacity 1800 ms power1.out (rmse .001) |
| pointer follow (soft) | `damp` λ = .006/ms (τ 167 ms; ≈ lerp .074/frame @60 fps) — see §2d | inkwell JS `Damp(…,6e-3,dt)` (probe t63 218, t95 552 ms) |
| pointer follow (tight) | lerp ≈ .25/frame (t63 ≈ 60 ms) | inkwell 6 px dot 59 ms; the3key 48 px 61 ms |

**Recipe per proposed device (measured numbers):**
- **Two pointers.** Artist: 6 px ink dot near-instant + 17–24 px ring on `damp` λ .006/ms with magnet .2 (inkwell code, §2d). Analyst: crosshair instant (≤60 ms, the3key), `x, y` readout updates per frame in mono, no easing on numbers.
- **Counting loader → gate.** Counter 0→100 in ≤1200 ms `power2.out` (kashyap preloader 550–1450 ms); manifesto words rise y 100 %→0, 1000 ms `--ease-in-out`, stagger 28 ms; loader exit opacity 500 ms ease-in-out (moonsafari). Total ≤ 2.0 s; skip on return visit.
- **Matchday word cycle.** Outgoing word chars y 0→-100 % 600 ms `--ease-in-out` stagger 9 ms; incoming 1000 ms `--ease-out` stagger 14 ms (inkwell word rise). Object still.
- **Gallery stepper.** Step = photo clip/mask + y, 1500 ms `cubic-bezier(.165,.84,.44,1)` (moonsafari house ×356, eisenberger); counter digits roll 600 ms `--ease-out`.
- **Skills control.** Chart re-compute 465 ms `--ease-ui`; handle pop 160 ms `cubic-bezier(.34,1.61,.7,1)` (zighead overshoot); no idle loop.
- **Hover (site-wide).** In 300 ms `power4.out`, out 200 ms linear (loiseau, rmse .027); char hover 350 ms stagger 7 ms (localstudio).
- **World switch (the one wow).** See §2c page transitions.

Low-confidence / not measured: canvas-internal WebGL motion (uniforms over time); sites with 0 data
(carbonation dead, bleibtgleich no motion, pencilvania SFX only); scroll lerp (sites scroll an element,
not window — irrelevant here: one-screen rule).

## 2c. Page transitions (measured: `TRANSITION=1 tools/forensics.cjs`, click first visible internal link)

- 38 refs → **18 single-page** (no internal link) · **10 click = no navigation** (menu/overlay/cookie) ·
  **5 hard navigation** (guess, teletech, telekom, gcloud, analytical — Barba in bundle but not driving) ·
  **5 in-document**, of which only **localstudio + monogrid** animate the swap.
- Finding: winners rarely spend their wow on route transitions → supports keeping ONE wow (world-switch morph) and making every other route change quiet.
- **localstudio (best measured swap, starts 39 ms after click — no wait for data):**
  overlay opacity 400 ms power1.out · outgoing chars y 0→-130 % and incoming chars 126→0 %, 350 ms power1.out, stagger ~10 ms, out/in interleaved (20 chars over 176 ms) · content block y 1000 ms power1.out · next panel y 1000 ms power4.out @232 ms.
- **monogrid:** old content opacity out 200 ms → ~1 s load gap → new content in 300 ms ease-out → items y 1000 ms power3.inOut stagger ~100 ms (CTA 500 ms).
- **teletech (hard nav, new page intro):** nav items y 200–300 ms power2/3.inOut, stagger ~20 ms, starting 470 ms after load.
- **Recipe for our quiet route change:** localstudio pattern — start <50 ms after click; title chars swap 350 ms `power1.out` stagger 10 ms; panel y 1000 ms `--ease-out`; never a blank/loading gap (monogrid's 1 s gap is the anti-pattern).
- **World switch (the wow):** build the locked world-switch morph on `--ease-in-out` 1000–1500 ms; no reference does this — it is ours (measured refs only bound duration/ease range).

## 2d. How the critical devices are built (code teardown — Layer 3)

Source: `tools/slice.cjs` → `forensics/<slug>/device-code.md` → Haiku `device-teardown-A..E.md`.
Opus re-grepped 17 quoted parameters in raw source: all present (e.g. inkwell `Damp(…,6e-3,u)`,
gallipoli `duration:1.8,stagger:.1,yOffset:5`, moonsafari `JELLY`, sainturbain `duration:766.66666667`,
marseille `fade(0,vol,2e3)`, gataperduda `18e4`). Agent claims that conflicted with code were dropped.

| Concept | How winners build it (verbatim params) | Our recipe |
|---|---|---|
| **Pointer follow** | Not CSS transitions. Frame-rate-independent damping `x = lerp(x, target, 1−e^(−λ·dt))`: inkwell λ = 0.006/ms (τ 167 ms → matches probe t63 218 / t95 552), + magnet pull 0.2 toward hovered element centre, `RoundWhenClose` snap. pienso same idea `1−0.02^(dt/0.3s)`. stripedev spring (stiffness 500, damping 50). the3key factor 1 = no lag. | Artist ink dot: `damp` λ .006/ms + magnet .2 on links. Analyst crosshair: factor 1 (instant) + mono `x, y` readout. One shared rAF, stops when settled. |
| **Text reveal** | Split into lines/words/chars, translate ≥100 % from under a mask: monogrid `yPercent:140` power3.inOut stagger .03; exat y −250 % skewY −5° expo.out stagger .1; localstudio char roll .35 s stagger .015; inkwell lines `blur(3px)` stagger .05; gallipoli words 1.8 s stagger .1 yOffset 5 Quad.easeOut (read-aloud pace). | Manifesto/Matchday: lines `yPercent 120→0` + `blur 3px→0`, stagger .03–.05; slow "read aloud" variant .1 for the one story line. |
| **Waiting = content** | onelastbeat headphones overlay shown `max(5 − elapsed, 0)` s then .4 s fade (timed, not a click); duhaihang progress jumps to .8 on buffer-ready then 1.7 s curtain; kashyap box expands 2 s expo.inOut. | Loader counts real asset progress, holds a floor (≤1.5 s), exits with a curtain; never fake 100. |
| **Sound layer** | Howler everywhere. Unlock on first `mousemove`/`touchstart` (gallipoli), not a forced gate. Fades: marseille in/out 2000 ms; gataperduda ambient crossfades 3000/2000/5000 ms; stripedev fade 500 ms on stop + pitched chime ±12 semitones; Howler autoSuspend 30 s. | Sound OFF default; on opt-in, 2 s fade in/out, UI ticks pitched to state (e.g. counter value), suspend when idle. |
| **Wheel → stepped states** | Normalise `deltaY` by `deltaMode` factors [1, 28, 500] (duhaihang), accumulate with damping .08; moonsafari strip inertia .09 then magnet snap .5 s Quart.easeInOut after 500 ms debounce; Flickity friction .28 / attraction .025 (lemkus, telekom); rxk scrubs a clock by deltaY/1000. | One-screen steppers (Gallery, Matchday, Notes): normalised delta → threshold → snap .5 s quart.inOut, 500 ms debounce, arrows/keys mirror. |
| **Route change** | sainturbain (anime.js): out = opacity .5 linear + scale .9, 766.67 ms `cubicBezier(.2,0,.23,1)`, next container translateY in parallel. localstudio char swap (§2c). | Quiet route change = scale .96 + opacity .5 out, 700 ms `(.2,0,.23,1)`, next panel y in, overlapped. |
| **Idle behaviour** | gataperduda kiosk: 20 s inactivity → hint, 180 s → `router.replace("/")`; loiseau idle Lissajous "wake" after 1.2–2.6 s; frost 17 s idle clock. | Companion/chibi acts only after idle 2–3 s (event-gated, counts toward ≤8 loops only while active). |
| **Tilted paper** | the3key notes: rotationZ ±5°, scale .7 → 1, rotationX 40 → 0, scrubbed. | Notes torn leaves: same values, stepped not scrolled. |
| **Pointer as medium (WebGL)** | loiseau 12-slot wake field, `pow(1−life,1.65)` decay, exp falloff; inkwell glass shader (uIOR bg multiplier, tFrost brightness .90, vignette .18) + Rapier rigid bodies driven by `mouseDamp`. | Only if the world-switch morph needs it; otherwise out of budget. |

Gate capture via REA `capture_browser_scenario` (`gated-capture.md`): 2/6 gates passed; code shows most
"gates" are not clicks (onelastbeat timed, gallipoli gesture-unlock).
v2 retry (live browser check + `tools/gates.json` scripted steps): yauch = ~15 s loader ring then a **drag** gesture ("drag to explore") — passed; crumbskees = a `<div>` "PLAY NOW" (why text/button probes missed it) → canvas game; marseille broken live (GSAP "Cannot tween a null target", loader stuck at 0); onelastbeat 429-throttled, so its headphones screen never clears. Code for all 4 in `device-teardown-F.md` (marseille pano lerp `0.1`, pan damping `0.25`, Howler fade `2e3`; crumbskees audio idle-suspend `3e4`). Lesson: a gate can be a gesture or a non-button element; detect by the "drag/hold/play" copy, not by tag.

## 3. Application to Molecules → Metrics (per page)

Each row = one device per page (P1). Scroll-driven refs are converted to **wheel-stepped states
inside one screen** (moonsafari's `04 · 10` counter is already a stepper, so it ports cleanly).

| Page | One device | From | Replaces / conflicts | Cost |
|---|---|---|---|---|
| **Landing** | **Counting loader → one-choice gate.** Counter ticks 0→100 as a ball bounces (watching); at 100 the manifesto line lands: *"He watched. Then he counted."*; then two doors, nothing else. | yauch, kashyap, gucci | Feeds the locked ball→chart world-switch wow (same ball) | M |
| **Both worlds** | **Two pointers.** Artist = ink dot that leaves a short fading trail. Analyst = crosshair with live `x, y` readout in mono. Touch: none. | inkwell, moonsafari | New; 0 loops (event-driven) | S |
| **Artist: Sound** | **Headphones gate + persistent radio layer.** First visit: "Better with headphones — tune in?" Once on, Hostel Radio docks as a mini-player that survives route changes in the artist world. | onelastbeat, teletech | Extends existing Hostel Radio; keeps sound default OFF | M |
| **Artist: Gallery** | **Line-and-node stepper.** One leader line from a node to a circle-masked photo, counter `04 · 12`, ghost Fraunces letters of the place behind; wheel/arrow steps. Captions in hairline type only (P9). | moonsafari, eisenberger | Alternative to R2's ddanga horizontal strip — **Tuhin picks one** | M |
| **Artist: Matchday** | **Word cycles, object still.** Ball/pitch fixed; giant outlined word cycles (WATCHED → COUNTED → MODELLED) on wheel steps, beside the planned StatsBomb data portrait. | peppa, lemkus | Complements R2 §3 data portrait | S |
| **Artist: Notes** | **Index is the interface.** Topic counts, mono dates, `[N]`ext / `[P]`rev keys, paging not scroll; existing torn leaves fan like the3key's tilted notes. | stripedev, the3key | Keeps the notebook-spread build; adds index + keys | S |
| **Analyst: Skills** | **Control in the hero.** One lens slider re-computes a real sample chart live (e.g. same dataset viewed as SQL→Power BI→Python output). | hvdmatch, kashyap, pienso | Upgrades "Nine lenses" from picker to working tool | M |
| **Analyst: Dashboard** | **Annotated working sample.** R2's 5-KPI BI work sample, plus pienso-style highlight: one tile annotated with its DAX/definition on hover. | pienso, analytical (big static numbers) | Fits locked R2 §4 exactly | — (already planned) |
| **Analyst: Journey** | **Map of places + people.** R2 year-rail stays the controller; the map becomes nodes (Bankura → Durgapur? → Goa — **facts from Tuhin only**), each node opens one card. | gataperduda, moonsafari | Merges with R2 §5 rail; needs Tuhin's real places/people | M |
| **Analyst: Work** | **Ledger as index.** Keep ledger; add mono metadata block per case (guess) and counts per status. | guess, stripedev | Light polish | S |
| **Contacts** | **One question, one action.** Story voice in the functional copy ("Kick-off?" / "Run the query"). | patronus, gcloud (as anti-ref) | Small copy pass | S |

## 4. Recommended first move (needs Tuhin's yes)

1. **Two pointers** (S, zero loops, every page benefits, proves the two-world idea in 1 day).
2. **Counting loader → gate** (M) — it is the spine made literal and sets up the ball→chart wow.
3. **Skills as working control** (M) — the strongest *hiring* signal for an analyst.
Then Sound layer, Gallery stepper vs strip decision, Journey map (blocked on facts).

## 5. Open questions for Tuhin
- Gallery: moonsafari **line-and-node stepper** or R2's **horizontal print strip**?
- Journey: which places + people are real and OK to show?
- Loader: is ~1.5 s of counting acceptable on every first visit (skip on return visits)?

## 6. Gaps in this research (honest)
- Headless, no clicks: onelastbeat, yauch, gallipoli, marseille, pencilvania show intro/loader only.
- Dead or broken on 2026-10-19: witchernetflix (SSL), onedayinmyworld (WP DB error), zaft (404),
  carbonation (no server). Cookie walls hid gucci/telekom/monogrid heroes.
- ~~Motion timings inferred from 4 stills~~ → v2: measured (§2b/§2c). Still unmeasured: WebGL
  uniform motion, gated sites' post-gate choreography (onelastbeat, pencilvania), 10 sites whose nav click did nothing.
