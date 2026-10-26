# REA reference teardown — 2026-10-19 (research checkpoint)

> Any agent (Claude / Gemini / Antigravity / Hermes): read this file before touching this folder.
> Obey `web/AGENTS.md` (skills mandatory, one-screen rule, ≤8 loops, verify yourself).
> This is RESEARCH ONLY. Nothing here is approved for build — Tuhin approves directions first
> (see memory: portfolio concept was rejected once when built without approval).

## Ask (Tuhin, 2026-10-19)
Reverse-engineer ~40 Awwwards references with the REA toolchain, extract *how* they are creative
(concept, signature move, system), then decide how to apply it to Molecules → Metrics.

## Method (reproducible)
1. **Harvest** — `tools/harvest.cjs` (Playwright, real Chrome channel, 1440×900).
   Per site: 6 s load wait, 3 wheel-scroll steps (wheel, not scrollTo, so Lenis/Locomotive react),
   2×2 contact sheet → `sheets/<slug>.jpg`; runtime fingerprint → `fingerprints/<slug>.json`
   (library globals, script hosts, fonts, palette, counts of canvas/video/svg/split-text,
   CSS technique tallies: blend modes, clip-path, mask, sticky, cursor:none, backdrop-filter).
   Run: `NODE_PATH=web/node_modules node tools/harvest.cjs <outDir>`; `ONLY=slug1,slug2` to subset.
   One line per site: `fingerprint-summary.txt`.
   **Known false positive:** `ogl` in libHints = substring of "google." — ignore.
2. **REA** (MCP `rea`, passive CDP, no JS eval) — headless Chrome on `--remote-debugging-port=9333`
   (NOT 9222: that port is Lenovo Vantage's Edge webview). `inspect_web_page` + `analyze_web_bundle`
   on 6 3D-suspect sites → `rea-digest.md`. Verdict: REA is good for stack/resource evidence, weak
   for *creativity* (no scroll/interaction) — hence the harvest layer.
3. **Cards** — Haiku agents read sheet + fingerprint, write technique cards
   `cards-A..F.md` (concept · signature move · structure · type/colour · tech evidence ·
   creativity principle · steal-for-Tuhin).
4. **Synthesis** — `SYNTHESIS.md` (Opus): cross-site principles → per-page application plan.

## Layer 2 — motion forensics (added 2026-10-19 after Tuhin: "cards too shallow, reverse-engineer every motion/transition/code")
- `tools/forensics.cjs` (Playwright, init-script instrumentation before page JS). Phases: load 8 s → cookie accept → start-gate click → hover 4 links → cursor 800px step → 6 wheel bursts.
  Records: CSS/WAAPI animations via `document.getAnimations()` (keyframes, duration, easing, delay); JS-driven tweens via MutationObserver on inline `style` (transform x/y/scale/rotate, opacity, clip-path, CSS vars) segmented into tweens with **easing fitted** against GSAP/CSS curves (rmse); global GSAP calls wrapped; scroll lerp from per-frame scrollY; WebGL `shaderSource` (GLSL saved); AudioContext/media play; resource list; full CSS + JS source saved.
  Run: `N=3 NODE_PATH=web/node_modules node tools/forensics.cjs forensics tools/sites.json` (`ONLY=slug` to subset).
- `tools/digest.cjs forensics` → `forensics/<slug>/motion-digest.md` (compact evidence: stack, shader features/uniforms, CSS ease/duration tallies, tween clusters with phase/stagger).
- `TRANSITION=1 ... tools/forensics.cjs` → `forensics/<slug>/transition.json` (click first visible internal link; classifies single-page / no-nav / hard / in-document; tweens since click).
- `tools/aggregate.cjs forensics motion-aggregate.md` → cross-site ease/duration/stagger statistics.
- **Layer 3 — code teardown (2026-10-19, Tuhin: "use REA + skills, reverse-engineer the critical concepts"):**
  `tools/slice.cjs forensics [slug,...]` → `forensics/<slug>/device-code.md`: esbuild reprints each site's own scripts (vendor URLs/bodies skipped), finds device signatures (pointer, raf-lerp, wheel-step, keyboard, loader, text-split, reveal-timeline, audio, page-transition, shader-uniforms, observer, cursor-dom) and cuts the smallest enclosing function (8–70 lines). Haiku agents turn slices into `device-teardown-A..E.md` (mechanism, exact params, ≤12-line verbatim excerpt, React port note).
  REA `capture_browser_scenario` (launch Chrome, `reduced_motion: no-preference` — default is `reduce`!) clicks past start gates → `gated-capture.md`.
  REA static JS graph tools (`analyze_javascript_application`, `trace_javascript_semantics`) target Electron/ASAR dirs and return the whole graph inline → impractical for 2–8 MB web bundles; slicer used instead.
- `tools/cursor-probe.cjs <url>` → custom-cursor follow lag (t63/t95) — `cursor-probe.json`.
- `specs-A..E.md` (Haiku) = per-site precise motion spec: choreography timeline table, motion tokens, systems, recreate recipe with measured numbers, confidence.
- Raw heavy files (source.js.txt, source.css, *.webm run videos) are git-ignored; regenerate with the tool.
- Limits: a fitted ease with rmse >0.15 = compound/unknown; GSAP bundled inside modules is caught only via style mutations, not call args; canvas-internal motion (WebGL uniforms over time) is not sampled.

## Coverage
| Group | Sites | Card file |
|---|---|---|
| A portfolios/studios | loiseau, kashyap, duhaihang, localstudio, rxk, monogrid, eisenberger | cards-A.md |
| B immersive/story | inmyworld, onelastbeat, yauch, patronus, gallipoli, moonsafari, crumbskees | cards-B.md |
| C brand/product | gucci, poltronafrau, peppa, vana, pienso, gcloud, telekom | cards-C.md |
| D maps/nav/audio | marseille, gataperduda, teletech, bleibtgleich, pencilvania, the3key, analytical | cards-D.md |
| E type/editorial | frost, guess, zighead, zaft, inkwell, lemkus, stripedev | cards-E.md |
| F retried | carbonation, exat, hvdmatch, sainturbain | cards-F.md |

**Blocked / dead:** witchernetflix.com (SSL error — campaign retired); onedayinmyworld.com
(served a WordPress error page on 2026-10-19, REA saw 0 scripts). No live URL given for
"Sapori e Natura" and "video view changer" Awwwards entries → skipped.
Limits: headless, no clicks — sites gated by "click to start" (onelastbeat, yauch, gallipoli)
show only their intro frame; motion timings are inferred, not measured.

## REA stack findings (rea-digest.md)
- onelastbeat: custom ~1 MB app.js, intro audio JSON, no framework → hand-built experience.
- peppasauce: Webflow IX2 + Lottie (~538 KB), no WebGL → craft from illustration + clip-path (78 clips).
- the3key: WordPress + jQuery/Foundation/slick → creativity is art direction, not tech.
- moonsafari: near-static, custom cursor (284 cursor:none) → atmosphere from photography + cursor.

## Status
- [x] Harvest 39/40 · [x] REA digest · [x] cards A–F (35 sites carded; ~8 "unclear" — loader/cookie/dead) · [x] SYNTHESIS.md (PROPOSAL, awaiting Tuhin picks)
- [x] Layer 2 forensics 38 sites · [x] specs-A..E (Haiku) · [x] motion-aggregate · [x] transition probe · [x] SYNTHESIS v2 §2b tokens/recipes + §2c transitions (Opus, spot-verified vs raw source)
- [x] Layer 3 code teardown: device-code.md ×38, device-teardown-A..E.md (Haiku), 17 params re-grepped by Opus, SYNTHESIS §2d · [~] gated-capture.md (2/6 gates passed)
- Next agent: read SYNTHESIS.md §2b–§5 (§2d = how devices are built in code). Do NOT build until Tuhin answers §5. Before building a device, Playwright-record the live reference to measure timings. Note: skill `taste-distillation` is video-grading only — not for web refs.
