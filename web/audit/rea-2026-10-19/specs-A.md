# Motion specs A: loiseau, kashyap, duhaihang, localstudio, rxk, monogrid, eisenberger

Sources: forensics/<slug>/motion-digest.md (cited as Lnn = digest line), plus grep hits in source.css / source.js.txt. t(ms) = ms from navigation. rmse rule: rmse > 0.15 marked compound/unknown. "inferred" = not directly measured.

---

## 1. loiseau (https://loiseau.framer.website/)

**Governing device:** WebGL wake/displacement hover field over a Framer page; reveals are short JS tweens.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 959 | ul | transform.x -454→-360.32 | 7400 | circ-out(.075,.82,.165,1), rmse 2.358 = compound/unknown | - | L13 |
| load | 2155 | a.framer-6jWyo | transform.y 9.982→0.025 | 350 | css ease (rmse 0.011) | - | L14 |
| load | 2155 | a.framer-6jWyo | opacity 0.003→1 | 600 | power3.out (rmse 0.048) | - | L15 |
| hover-in | 12374 | div.framer-yu0ah1, svg.framer-O0XeT | --extracted-r6o4lv / --21h8s6 12→195 | 300 | power4.out (rmse 0.027) | - | L16-17 |
| hover-out | 13281 | same two nodes | 195→0 | 200 | linear (rmse 0.034) | - | L18-19 |
| hover | 13281 | div.framer-31ste8 | transform.s 1.05→1.05 (from==to, suspect misread) | 400 | css ease-in-out (rmse 0.01) | 870, x6 | L20 |

- **Motion tokens:** house ease = power4.out (inferred cubic-bezier: not in source). Durations measured: 200, 300, 350, 400, 600, 7400 ms. Stagger 870 ms (x6, L20). Scroll lerp: none, native (L3). Cursor lag: not measured.
- **Scroll engine:** native. Lenis listed in bundle (L2) but no lerp on window scroll (L3).
- **Text split:** none recorded.
- **WebGL/shader:** 8 shaders, noise, displacement, mouse wake (u_wakes, u_wakeVelocity, u_decayTime), fresnel/lighting (L5). Source in shaders.glsl. 2d canvases 4320x2700 (L4).
- **Audio:** none recorded.
- **Recreate recipe:**
  ```
  hoverIn:  gsap.to(el, {'--extracted-r6o4lv':195, duration:.3, ease:'power4.out'})
  hoverOut: gsap.to(el, {'--extracted-r6o4lv':0, duration:.2, ease:'none'})   // linear
  items:    gsap.to(cells, {scale:1.05, duration:.4, ease:'ease-in-out', stagger:.87}) // verify: from==to
  wake:     shader u_decayTime drives wake fade (inferred)
  ```
- **Confidence: MED.** Hover fits are tight (rmse <= 0.034). Load ul is compound (2.358). Scale tween is from==to, so suspect. Shader features come from uniform names only.

---

## 2. kashyap (https://kashyaprayas.com/)

**Governing device:** staged preloader word/box reveal (GSAP power2.out family), then CSS hover states with a 0.3 s ease-in-out and a card 3D flip.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 1652 | span.mobile-word / bottom-word | transform.y 120→0, opacity 0→1 | 550-700 | power3.out / power2.out / css ease | - | L31-38 (rmse .028-.056) |
| load | 1653 | div.preloader-box | transform.r -5.999→0 | 950 | power2.inOut | - | L39 (rmse .014) |
| load | 1783 | span.bottom-word x4 | transform.y 118.2→0, opacity .015→1 | 600 | power2.out | 63 | L40-41 |
| load | 2623 / 3984 | div.counter-text | transform.y 201.9→0 / 0→-205 | 600 | power2.out / power2.in | - | L44-45 |
| load | 4583 / 4637 | span.word-anim span-1 (x4) / span-2 (x6) | transform.y 152→0 (exit 0→155) | 800 | power2.out / power2.in | 26 / 28 (enter); 0 (exit) | L46-49 |
| load | 8304 | div.preloader-box | widthPct 22.6→99.9 | 1450 | power3.inOut | - | L56 (rmse .048) |
| load | 8304 | img | transform.r 4.27→333.4 | 1450 | power2.in | - | L61 (rmse .134, under cap) |
| load | 8329 | path x76 | opacity 0.03→1 | 300 | power2.out | 0 | L64 |
| load | 8000 | rect._colonDot Top/Bottom | opacity keyframes 1→.15→1 | 1000 | ease-in-out | 120 (bottom) | L14-15 (CSS) |
| hover1 | ~9712 | div._homeCardInner | transform → rotateY(0), translate3d 0 | 700 | cubic-bezier(0.23,1,0.32,1) | - | L16 (WAAPI) |
| hover1 | ~9712 | h2._heading (active), a._second | color, bg-color | 300 | ease-in-out (bezier not in digest) | - | L19-22, L28 |

- **Motion tokens:** house CSS ease = cubic-bezier(.4,0,.2,1) (L6 x4; L10 "all .3s ease-in-out" x26). Card ease = cubic-bezier(.23,1,.32,1) (L16). Durations: .15, .2, .3, .45, .55, .6, .7, .8, 1.0, 1.45 s (inferred scale from L7, L9-L56). Stagger: 26-28 ms (words), 63 ms (bottom words), 120 ms (blink), 535 ms (paths, L59). Scroll lerp: none measured (L3). Cursor lag: not measured; cursor marquee 9000 ms linear loop (L13).
- **Scroll engine:** native (L3). GSAP + ScrollTrigger + Lenis in bundle (L2). Lenis lerp not configured in grep, library default lerp .1 (inferred).
- **Text split:** none. Words are hand-authored spans (span.word-anim, span.mobile-word).
- **WebGL/shader:** none. 2d canvases only (L4).
- **Audio:** AudioContext + howler (L5). tap_01-05.wav fetched (L85-89). Trigger not confirmed in digest.
- **Recreate recipe:**
  ```
  tl.from('.preloader-box', {rotation:-6, duration:.95, ease:'power2.inOut'})
  tl.to('.preloader-box', {width:'99.9%', duration:1.45, ease:'power3.inOut'}, '<')
  tl.from('.word-anim', {y:152, duration:.8, ease:'power2.out', stagger:.027}, '-=.9')
  tl.from('.bottom-word', {y:120, opacity:0, duration:.6, ease:'power2.out', stagger:.063})
  .card:hover { transition: transform .7s cubic-bezier(.23,1,.32,1) }
  ```
- **Confidence: HIGH** on preloader timing (many repeats, rmse <= .06). MED on hover (WAAPI only). No SplitText evidence.

---

## 3. duhaihang (https://duhaihang.com/)

**Governing device:** GSAP-timed preloader progress bar and curtain (cen), then CSS staggered content fades with a stepped 1.5 s city-line wipe.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 604-832 | div.progress | scaleX 0→0.07→0.14→0.7→0.8→1 | .5/.5/.5/1/.3 s | Quad (obfuscated name, likely power1, inferred) | - | GSAP calls L5 |
| load | 832 | div.progress | transform.s 0→0.8 | 1200 | css ease (rmse .314 = unknown) | - | L28 |
| load | 1356 | div.cen | transform.s 1.1→0 | 1650 | power2.inOut (rmse .009) | - | L29 |
| load | 1356 | div.Home.f | opacity 0→1 | 400 | power2.inOut (rmse .043) | - | L30 |
| load | 1533 | div.Navi | opacity 0→1 | 500 | power2.inOut (rmse .005) | - | L31 |
| load | 2714 | div.Preloader.f | opacity 1→0 | 300 | power2.inOut (rmse .006) | - | L32 |
| hover0 | ~8690 | span.city1 | transform scaleX 0→1 | 1500 | cubic-bezier(.86,0,.07,1) | - | L15 (CSS) |
| hover0/1 | ~8690 | headline, journey, endline, footer, contact, copyright | opacity 0→1; translate3d(0,15px)→none | 400 / 700 | ease | - | L13,16-25 |
| scroll | 14263 | div.Home.f | transform.y -1455→-2880 | 900 | css ease-out (rmse .05) | 3785, x3 | L33 |
| scroll | 17998 | div.Home.f | transform.y -2895→-4320 | 1100 | css ease (rmse .043) | - | L34 |
| scroll | 21790 | div.Home.f | transform.y -5775→-6764 | 450 | linear (rmse .046) | - | L35 |

- **Motion tokens:** house ease = cubic-bezier(.86,0,.07,1) (CSS, L10, L15) with power2.inOut as JS counterpart (L29-32). Durations: .3, .4, .5, .7, 1.1, 1.5, 1.65, 1.7 s. Stagger 3785 ms x3 (scroll-tied panels, L33). Scroll lerp: none, native (L3). Cursor lag: not measured.
- **Scroll engine:** native. Bundle is GSAP only (L2). No Lenis, no ScrollTrigger. Scroll-linked tweens on Home.f (L33-35).
- **Text split:** none. Headline is a single block with opacity+translate.
- **WebGL/shader:** webgl contexts created at 604/609 ms (L4). No shader features recorded. Treat as unused or unknown.
- **Audio:** none.
- **Recreate recipe:**
  ```
  tl.to('.progress', {scaleX:.14, duration:.5, ease:'power1.out'}).to('.progress',{scaleX:.7,duration:.5}).to('.progress',{scaleX:.8,duration:1}).to('.progress',{scaleX:1,duration:.3})
  tl.to('.cen', {scaleX:0, duration:1.7, delay:.3, ease:'power2.inOut'})
  .city1 { transition: transform 1.5s cubic-bezier(.86,0,.07,1) }
  .headline, .journey { transition: opacity .4s ease, transform .7s ease }  // from translate3d(0,15px,0)
  ```
- **Confidence: MED.** CSS values are exact (grep). JS fits good except the progress bar (rmse .314 = unknown). Scroll panel timing is one run.

---

## 4. localstudio (https://localstudio.fr/about)

**Governing device:** quart-out (.19,1,.22,1) line-reveal on load, per-char hover roll (up then down), then scroll-linked wrapper and image parallax over three.js scenes.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 5137 | div.about--active / about__container | transform.y 17.3→0, -17.3→0 | 700 | power4.out (rmse .002) | - | L13-14 |
| load | 5236 | p.oh x6 | transform.y 103.7→0 | 600 | power1.out (rmse .025) | 76 | L15 |
| load | 5241 | span x5 | transform.y 102.3→0 | 800 | quart-out(.19,1,.22,1) (rmse .002) | 76 | L16 |
| load | 5435 | nav.nav | transform.y -96.3→0 | 1000 | quart-out (rmse .002) | - | L17 |
| hover-in | 11103 | span.char x32 | transform.y 126.1→0 | 350 | power1.out (rmse .024) | 7 | L18 |
| hover-out | 11998 | span.char x30 | transform.y 0→130 | 350 | power2.in (rmse .131) | 14 | L19 |
| hover-out | 11998 | span.char x4 | transform.y -2.8→-130 | 350 | css ease-out (rmse .026) | 14 | L20 |
| hover | 12047 | span.char x7 | transform.y -129.9→0 | 350 | linear (rmse .136) | 14 | L21 |
| hover | 12242 | span.char | transform.y -123.8→0 / 83.9→0 / 92.5→0 | 250/250/300 | linear / power1.out | - | L22-24 |
| scroll | 14950 | div#wrapper.about__wrapper | transform.y -24→-1440 | 850 | css ease-out (rmse .047) | 1961, x2 | L25 |
| scroll | 15179-17325 | img.about__infos__item__img | transform.y 0→-5 to -14 (sine/linear/power2.out) | 200-1200 | mixed (rmse .038-.093) | - | L26-32 |
| scroll | 18930 | div.about__services__container | transform.y 0→11.2 | 1250 | power2.out (rmse .072) | - | L35 |
| scroll | 18956 | section.about__services | transform.y -0.013→-19.9 | 1650 | power4.out (rmse .06) | - | L36 |
| scroll | 20734 | section.about__services / footer.footer | transform.y -19.9→-20 / -3.7→-19.8 | 550 / 1400 | quart-out (rmse .009 / .049) | - | L40-41 |

- **Motion tokens:** house ease = cubic-bezier(.19,1,.22,1) (CSS, L6, L10; JS quart-out, rmse .002). Durations: 250, 350, 550, 600, 700, 800, 850, 1000, 1150, 1250, 1400, 1650 ms. Stagger 7 ms (char in), 14 ms (char out), 76 ms (words). Scroll lerp: none, native (L3). Cursor lag: not measured.
- **Scroll engine:** native. Libs: three, webflow-ix2 (L2). No Lenis, no ScrollTrigger. Scroll-linked transforms probably from webflow-ix2 (inferred).
- **Text split:** manual span.char and span.oh (no SplitText detected).
- **WebGL/shader:** three.js, 22 shaders: displacement, grain, blur, fresnel (L5). GLB + Draco decoder (L45-46).
- **Audio:** none. Video sources only (L48-54).
- **Recreate recipe:**
  ```
  tl.from('nav', {y:-96, duration:1, ease:'cubic-bezier(.19,1,.22,1)'})
  tl.from('.oh', {y:104, duration:.6, ease:'power1.out', stagger:.076}, .1)
  hoverIn:  gsap.to('.char', {y:0, duration:.35, ease:'power1.out', stagger:.007})
  hoverOut: gsap.to('.char', {y:130, duration:.35, ease:'power2.in', stagger:.014})
  scrollLinked: '.about__services' {y:-20, duration:.55, ease:'cubic-bezier(.19,1,.22,1)'}
  ```
- **Confidence: HIGH** on JS timing (most rmse <= .05, house ease repeated across 4 elements). MED on scroll engine (attribution to webflow-ix2 is inferred).

---

## 5. rxk (https://rxkstudio.com/)

**Governing device:** quart-out word reveal on load, then a scroll-linked shape/media stack (scale, translate, rotate) with mixed-fit eases; many fits fail (compound).

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 3790 | span.word-above x6 | transform.y 0→100 | 1000 | quart-out(.19,1,.22,1) (rmse .051) | 0 | L12 |
| scroll | 12258 | span.ligne-child x4 | transform.y →100 | 100-250 | sine.inOut (.038) / css ease-in-out (.07) | - | L14-17 |
| scroll | 12265 | div.shape | transform.s 0.99→0.29 / 0.94→0.10 | 550 | power3.out (.397 unknown) / expo.inOut (.162 compound) | - | L17-18 |
| scroll | 12265 | div.shape x5 | transform.s (various) | 550 | css ease-out (.053) / css ease-in-out (.03) OK; power2.in (.329) compound | 0 | L19-21 |
| scroll | 12446 | div.shape x2 | transform.y 0→802 | 800 | css ease-in-out (.046) OK | 0 | L22 |
| scroll | 12452 | div.group | transform.r 0.12→0.19 | 1800 | circ-out, rmse 24.35 = unknown | - | L27 |
| scroll | 12480 | div.media-child x2 / img.grey | transform.y -243.8→0 | 1000 | power3.inOut (.024) | 951 | L28-29 |
| scroll | 12598 | div.media-child x3 / img.grey | transform.y -243.8→0 | 1000 | expo.inOut (.014) | 112 | L30-31 |
| scroll | 12780 | div.shape x4 | transform.r 0.4→0 (2750-5600ms) | 2750-5600 | power2.in (rmse 18-40 = unknown) | - | L32-36 |
| scroll | 14348 | span.word-above / word-under x4 | transform.y →100 / -100→0 | 1150 | power4.out (.108) | 36 | L37-38 |

- **Motion tokens:** house ease = quart-out(.19,1,.22,1), shared with localstudio (rmse .051 on the load reveal). CSS overshoot cubic-bezier(.16,.03,.08,1.55) used once (L5). Durations: 100, 150, 200, 250, 550, 800, 1000, 1150 ms; rotation 1800-5600 ms (unknown fit). Stagger: 36 ms (words), 112 ms and 951 ms (media). Scroll lerp: none, native (L3). Cursor lag: not measured.
- **Scroll engine:** native (L3). Bundle has gsap, ScrollTrigger 3.12.2, Lenis, vue (L2). Lenis not configured.
- **Text split:** manual span.word-above, word-under, ligne-child (no SplitText).
- **WebGL/shader:** none (L4). Clip-path x6, mask x6 (L8).
- **Audio:** none.
- **Recreate recipe:**
  ```
  gsap.from('.word-above', {yPercent:100, duration:1, ease:'cubic-bezier(.19,1,.22,1)'})
  scrub: gsap.to('.shape', {scale:.55, duration:.55, ease:'css ease-out'})   // rmse .05; power3.out rejected (.40)
  gsap.from('.media-child', {y:-244, duration:1, ease:'power3.inOut', stagger:.95})
  gsap.to('.word-above', {y:100, duration:1.15, ease:'power4.out', stagger:.036})
  ```
- **Confidence: MED.** Load reveal is good. Scroll stack has about 10 fits above rmse .15 (compound or unknown), so the shape ease is not pinned down.

---

## 6. monogrid (https://monogrid.com/en/)

**Governing device:** fast intro line-reveal (power3.inOut), then scroll-scrubbed CSS custom properties (--v6840ce0d / --v6840ce0e) on a fixed wrapper, with a WebGL trail/bloom scene.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 2454 | div.wrapper-content | opacity 0.29→1 | 150 | power1.out (rmse .016) | - | L32 |
| load | 3465 | div.flex.items-center | widthPct 0→100 | 1100 | css ease (rmse .095) | - | L33 |
| load | 3565 | div x23 | transform.y 140→0 | 1000 | power3.inOut (rmse .006) | 28 | L35 |
| load | 4613 | span x6 / span x3 | opacity 0→1 | 100 / 150 | power2.in (.116 / .153) | 0 / 2214 (suspect) | L39-40 |
| hover | 11821 | div.wrapper.fixed | --v6840ce0d .069→.172; --v6840ce0e .99→.94 | 200 | power3.inOut (.036) / expo.inOut (.021) | - | L44-45 |
| hover/cursor | 14373 / 16050 | div.layer-image | --scale 1→1.015 / 1.015→1 | 1000 | linear (.003 / .001) | - | L46-47 |
| scroll | 17267 | div.wrapper.fixed | --v6840ce0d .619→.751 | 1500 | power2.out (.075) | 7783 (x2, suspect) | L48 |
| scroll | 17267 | div.w-full | transform.y -18.8→-62.4 | 1500 | power2.out (.073) | 0, x3 | L50 |
| scroll | 19584 | div.wrapper.fixed | --v6840ce0d .25→.344; --v6840ce0e .875→.764 | 500 | power1.out (.069) / css ease-out (.063) | - | L56-57 |
| scroll | 20245 | div.wrapper.fixed | --v6840ce0d .344→.351 | 550 | circ-out (.124) | - | L59 |
| scroll | 21974-22302 | span x2-4 | opacity →0 / →0.14..0.66 | 100-600 | css ease-out / power2.out (.023-.051) | 14-445 | L63-72 |

- **Motion tokens:** house ease = cubic-bezier(.4,0,.2,1) (CSS --ease-in-out, L7; top transitions L11). JS power3.inOut and power2.out. Durations: 100, 150, 200, 300, 450, 500, 550, 1000, 1100, 1500 ms. Stagger 28 ms (intro lines, L35), 14 ms (scroll spans). Scroll lerp: none, native (L3). Cursor lag: not measured.
- **Scroll engine:** native (L3). Bundle has GSAP, ScrollTrigger, Lenis, three, webflow-ix2, svelte (L2). Scrub is via CSS custom properties (L48-61), so ScrollTrigger scrub is inferred.
- **Text split:** source calls `.chars` with `.revert()` (grep: "r.chars ... r.revert()"), so SplitText-like behavior is inferred.
- **WebGL/shader:** three.js, 18 shaders: noise, grain, distortion/wave, velocity trail (uVelocity, tTrail), bloom pass (L5; grep "Bloom.Target"). 2d canvases 300x150 at ~2062 ms (L4).
- **Audio:** none. Looping video backgrounds (L6).
- **Recreate recipe:**
  ```
  gsap.from('.intro-line', {y:140, duration:1, ease:'power3.inOut', stagger:.028})
  scrub (ScrollTrigger scrub:1.5): gsap.to(wrap, {'--v6840ce0d':.751, duration:1.5, ease:'power2.out'})
  hover: gsap.to('.layer-image', {'--scale':1.015, duration:1, ease:'linear'}); back on leave, same
  css: .cta-primary { transition: background-color .3s ease, color .3s ease }
  ```
- **Confidence: MED-HIGH.** 155 tweens give a large sample. Stagger outliers (2214, 7783 ms) are flagged suspect, and the scrub engine is inferred.

---

## 7. eisenberger (https://www.eisenberger.co.at/en/photography/)

**Governing device:** CSS-only load sequence (header slide, then stepped 200 ms item delays), then a scroll0 stroke-draw on the path.circle icon. No JS tweens recorded.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 600 | header.js-site-head | transform translateY(-100%)→0 | 700 | cubic-bezier(.77,0,.175,1) (CSS) | - | L12 |
| load | 600 (delay 400) | a.js-menu-toggle | translateY(-100%)→0 | 500 | cubic-bezier(.165,.84,.44,1) | delay step 200 | L13 |
| load | 600 (delay 600) | a.site-title | translate(-50%,-400%)→(-50%,-50%) | 500 | cubic-bezier(.165,.84,.44,1) | delay step 200 | L14 |
| load | 600 (delay 800) | div.language-picker | translateY(-150%)→-50% | 500 | cubic-bezier(.165,.84,.44,1) | delay step 200 | L15 |
| load | 600 | img.video-fallback | opacity 0→1 | 1000 | ease-in-out | - | L16 |
| scroll0 | 1500 delay | path.circle | stroke-dashoffset 435.6→0; opacity 0→1 | 250 | ease-out | - | L17-19 |
| scroll0 | 1500 delay | path | stroke-dashoffset 63.4→0 | 660 | linear | - | L20 |
| scroll0 | 1500 delay | span.icon-link__label | opacity 0→1; translateY 10%→0 | 600 / 500 | cubic-bezier(.25,.46,.45,.94) | - | L21-22 |

- **Motion tokens:** house ease = cubic-bezier(.165,.84,.44,1) (CSS, used 5x, L5), with cubic-bezier(.77,0,.175,1) as the 700 ms header ease (L5, L12). Durations: 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 1 s (L6). Stagger: stepped 200 ms delays (400/600/800, L13-15). Scroll lerp: none, native (L3). Cursor lag: not measured.
- **Scroll engine:** native. Bundle is gsap only (L2). The "scroll0" label is a phase tag, not a measured scroll event.
- **Text split:** none. Text moves by transform only.
- **WebGL/shader:** none (L24 canvas contexts none).
- **Audio:** none.
- **Recreate recipe:**
  ```
  header:   .site-head { animation: slideDown .7s cubic-bezier(.77,0,.175,1) .6s both }   // translateY -100%->0
  toggle:   .menu-toggle { ...  .5s cubic-bezier(.165,.84,.44,1) .4s }
  title:    .site-title  { translate(-50%,-400%)->(-50%,-50%), .5s, delay .6s }
  picker:   .language-picker { delay .8s }
  icon:     path.circle  { stroke-dashoffset 435.6->0, .25s ease-out, delay 1.5s }
  ```
- **Confidence: HIGH** on CSS values (exact, from source.css). LOW on trigger semantics for scroll0 (phase label only, no scroll event recorded).

---

Confidence key: HIGH = several rmse < .05 or exact CSS. MED = partial fits or single run. LOW = trigger or ease unverified.
