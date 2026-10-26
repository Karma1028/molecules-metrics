# specs-C: motion specs, 8 sites

Sources: forensics/<slug>/motion-digest.md (cited as `dig:Ln`), grep hits in source.css (`css:Ln`) and source.js.txt (`js:Ln`).
Global: every digest reports `smooth scroll: native (no lerp detected on window scroll)`. No site has a scroll lerp, cursor-lag library, SplitText or ScrollTrigger hit in source. Harness phase times (loaded/hover/cursorStep/scroll/end) are capture-run markers, not design timings.
Ease rule: rmse > 0.15 = compound/unknown. CSS-literal cubic-beziers have no rmse (they are the value itself).

---

## 1. gucci (https://www.gucci.com/#/en/)

1. Governing device: CSS-only text slide-mask (translate ±100%) on a 0.8s house ease, plus a 1s spinner. No JS tweens.
2. Timeline

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| loader spin | 600 | svg._loading | rotate 0→360deg | 1000ms | linear, infinite | - | dig:L13, css:L19 `1s linear infinite` |
| canvas init | 1082–2115 | 2d/webgl/webgl2 contexts (8) | n/a | n/a | n/a | - | dig:L4 |
| text slide-in | inferred ~0 | .text-main (`_text-main-slide-in_op6q6_1`) | translate 100%→0 (kf 55% hold at 100%) | 800ms | cubic-bezier(0.5,0,0,1) | - | css:2 `--g-transition-duration:0.8s`, `--g-transition-timing-function:cubic-bezier(0.5,0,0,1)`; dig:L8 kf; start time inferred |
| text slide-out | inferred | .text-main (`_text-main-slide-out_op6q6_1`) | translate -100%→0 | 800ms | cubic-bezier(0.5,0,0,1) | - | css:19, dig:L8; timing inferred |
| backdrop/opacity | n/a | misc | opacity .5s var(--ease) | 500ms | var(--ease) | - | dig:L10 |

3. Motion tokens
- House ease: cubic-bezier(0.5,0,0,1) (css:2; single use in digest, dig:L6 `×1`). Confidence on "house" status: low.
- Duration scale: 0.8s (transition), 0.5s (opacity), 1s (spinner). No stagger measured. Scroll lerp: none (native). Cursor lag: none.

4. Systems
- Scroll: native.
- Text split: none; mask-slide keyframes only.
- WebGL: webgl2/webgl contexts ~1.9–2.1s (dig:L4); no shaders.glsl; no shader evidence. Inferred: decorative canvas.
- Audio: 4× AudioContext (dig:L5); no audio-driven motion measured.

5. Recreate recipe
```
:root { --ease: cubic-bezier(.5,0,0,1); --dur: .8s }
.text-main-in  { animation: slideIn  var(--dur) var(--ease) forwards }   /* translate 100%→0 */
.loader svg    { animation: spin 1s linear infinite }
```

6. Confidence: med on tokens (grepped, single source), low on text-slide start time (keyframe partial, inferred).

---

## 2. poltronafrau (https://www.poltronafrau.com/it/it.html)

1. Governing device: CSS transitions with a Material-like default ease (.4,0,.2,1) and a 300ms carousel translate on load. WebGL not confirmed at runtime.

2. Timeline

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| carousel shift | 3000 | div.cmp-carousel__content.swiper-wrapper | translate3d 0→-1440px | 300ms | ease (kf linear) | - | dig:L12 |
| loader | loaded | div.loader (load5 / loader-rotation) | box-shadow dot ring; rotate 0→1turn | not captured | not captured | - | dig:L7 keyframes |
| hover/reveal | not captured | misc `all .6s` (×38), `all .3s` (×18) | misc | 600ms / 300ms | cubic-bezier(.4,0,.2,1) (dig:L5 ×45) | - | dig:L5,L9 |
| harness load | 1430 | page | n/a | n/a | n/a | - | dig:L14 |

3. Motion tokens
- Ease families (count in CSS): cubic-bezier(.4,0,.2,1) ×45 (default); cubic-bezier(.215,.61,.355,1) ×16 (ease-out-cubic); cubic-bezier(.85,0,.15,1) ×8 (in-out, distinctive); cubic-bezier(0,0,.2,1) ×18 (ease-out). dig:L5.
- House ease: cubic-bezier(.85,0,.15,1) only if the "8 uses" are the brand; inferred. Default by count is cubic-bezier(.4,0,.2,1).
- Durations: 0.3s, 0.6s, 0.224s (dig:L6, L9). Stagger: none measured. Scroll lerp: none. Cursor lag: none.

4. Systems
- Scroll: native.
- Text split: none.
- WebGL: libs "three, curtains" detected (dig:L2, js grep `curtains` at forensics.json:749) but canvas contexts = none (dig:L4). Conflict; inferred: WebGL present in bundle but not active on this capture.
- Blend/clip: mix-blend-mode ×96, clip-path ×28, mask ×14, backdrop-filter ×33, perspective ×35 (dig:L8).
- Audio: none.

5. Recreate recipe
```
.carousel { transition: transform .3s ease }        /* measured 300ms ease, 0→-1440px */
.reveal   { transition: all .6s cubic-bezier(.4,0,.2,1) }
.hero-mask{ clip-path: inset(0) ; transition: clip-path .6s cubic-bezier(.85,0,.15,1) }  /* inferred pairing */
```

6. Confidence: med on timing (grepped counts), low on WebGL (lib present, no canvas at runtime).

---

## 3. peppa (https://www.peppasauce.love/)

1. Governing device: Webflow-ix2/tram-driven scrolling marquee + spinning stars + Lottie frame sequences; hover-triggered cursor follow and bottle tilt.

2. Timeline (tween clusters, dig:L11-L56; "×N" = instances)

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| marquee in | 1065 | div.text-container | y -8.08→-42.42 | 300ms | power4.out (rmse .05) | 0 (×3) | dig:L12 |
| marquee in | 1065 | div.scrolling-text | x -3.64→-17.58 | 300ms | power4.out (.05) | 0 (×7) | dig:L13 |
| marquee in | 1065 | div.scrolling-text-right | x 4→19.30 | 300ms | power4.out (.05) | 0 (×4) | dig:L15 |
| star spin-in | 1065 | img.star | rotate 360→719.96 | 200ms | cubic-bezier(.075,.82,.165,1) (.068) | 0 (×74) | dig:L18 |
| star spin-in | 1065 | img.star | rotate 2.68→5.32 | 100ms | power4.out (.01) | 0 (×6) | dig:L19 |
| settle | 1908 | div.text-container | y -11.03→-11.20 | 150ms | power2.out (.031) | 0 | dig:L21 |
| settle | 1908 | div.scrolling-text(-right) | x ±19.7→±20 | 200ms | power3.out (.028) | 0 (×8) | dig:L22-24 |
| page cover out | 5977 | div.page-cover | opacity 1→0 | 1000ms | power4.out (.034) | - | dig:L26 |

| hover in | 9414 | div.bottle | x 0.46→28.42; rotate 0.07→4.26 | 450ms | power2.inOut (.123) | - | dig:L36-37 |
| hover in | 9414 | div.cursor, .cursor-learn-more, .cursor-check-out, .cursor-close | x,y -5→-50 | 750ms | expo.out (.012) | 0 | dig:L38-45 |
| hover in (rmse fail) | 9414 | div.text-container / scrolling-text / img.star | y -8.78→-4.18; x -6.7→-4.5; rotate various | 300–500ms | circ-out / expo.inOut / power2.in: rmse .48–3.31 = compound/unknown | 0 | dig:L27-35 |
| hover out / long hover | 10275 / 11772 | scrolling-text, img.star, bottle, text-container | x,y,rotate → 0 or -44 | 250–700ms | expo.out (.01), power4.out (.019), power3.out (.016) | 0 | dig:L46-56 |

3. Motion tokens
- House ease: cubic-bezier(.075,.82,.165,1) on load (.068), cubic-bezier(.19,1,.22,1) on settle (.017). Duration scale: 100/150/200/250/300/450/700/750/1000ms. Stagger: 0ms. Scroll lerp: none. Cursor lag: 750ms expo.out, -5→-50px (inferred follower).

4. Systems
- Scroll: native; marquee is time-driven, not scroll-linked (inferred).
- Text split: none. WebGL: none. Audio: none.
- Lottie JSON: fire 671KB, webp-sequence2 1457KB, snake, cereal, mint, steak, mama-joyce-wink (dig:L59-74). 2D canvases 742–1348ms (dig:L4), inferred Lottie renderer.
- Webflow ix2 lib (dig:L2); tram easing table js:17.

5. Recreate recipe (GSAP)
```
tl.to('.scrolling-text',{x:-18,duration:.3,ease:'power4.out'}, 1.065)
tl.to('img.star',{rotation:720,duration:.2,ease:'cubic-bezier(.075,.82,.165,1)'}, 1.065)
tl.to('.page-cover',{opacity:0,duration:1,ease:'power4.out'}, 5.977)
hover: gsap.to('.cursor',{x:-50,y:-50,duration:.75,ease:'expo.out'})
```

6. Confidence: high on load timing (rmse .01–.07, 74 star instances), med on hover (rmse-failing clusters marked compound).

---

## 4. vana (https://vana.org/)

1. Governing device: CSS settleUp reveal (opacity 0→1, translateY 16px→0) on the React/Tailwind bundle; @property-based color transitions. No JS tweens.

2. Timeline

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| settle reveal | not captured | element not located | opacity 0→1; translateY 16px→0 | not captured | not captured | - | css:2 `settleUp{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`, dig:L7 |
| hero video | 0 | video hero.webm (2095KB) | n/a | n/a | - | - | dig:L14 |
| harness loaded | 390 | page | n/a | n/a | - | - | dig:L11 |
| text colour | hover | color, opacity | → token | var(--motion-large) (value not captured) | var(--ease-standard) | - | dig:L9 |
| link underline | hover | text-decoration-color | → | .15s | var(--ease-standard) | - | dig:L9 |

3. Motion tokens
- House ease: cubic-bezier(.2,0,0,1) = `--ease-standard` (css:2). Second ease cubic-bezier(.4,0,.2,1) ×2 (dig:L5).
- Durations: .15s (underline); --motion-large (value not captured). Long loops: 15s, 18s, 24s (dig:L6, likely background; inferred).
- Stagger: none. Scroll lerp: none. Cursor lag: none.
- Reduced motion: `prefers-reduced-motion` ×2 (dig:L8); css:2 `animation-duration:.001ms!important` override.

4. Systems
- Scroll: native.
- Text split: none.
- WebGL/shaders: none.
- @property ×81, mask ×2, backdrop-filter ×8, clip-path ×1 (dig:L8).
- Audio: none.

5. Recreate recipe
```
:root { --ease-standard: cubic-bezier(.2,0,0,1) }
@keyframes settleUp { from {opacity:0; transform:translateY(16px)} to {opacity:1; transform:none} }
.reveal { animation: settleUp var(--dur, .6s) var(--ease-standard) both }   /* --dur inferred */
@media (prefers-reduced-motion: reduce) { * { animation-duration: .001ms !important } }
```

6. Confidence: med on ease (grepped token), low on reveal timing (duration and element not captured).

---

## 5. pienso (https://pienso.com/)

1. Governing device: WebGL2 3D hero (three.js, 50 shaders: noise, displacement, grain, blur, fresnel) appearing ~18.8s, with cookie banner slide-in and a 4s marquee.

2. Timeline

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| cookie banner in | 5000 | div#CookieBannerNotice | translateY 96px→0; opacity 0→1 | 250ms | cubic-bezier(.19,1,.22,1) | - | dig:L14, js:923 `cookieBannerSlideIn 250ms cubic-bezier(.19,1,.22,1) 0s` |
| cookie banner out | on close | div#CookieBannerNotice | reverse | 250ms | cubic-bezier(.19,1,.22,1) | - | js:923 `cookieBannerSlideOut` |
| marquee | 0 (loop) | `_19qeu0f0` | translateX -100%→-200% | 4s | linear, infinite | - | css:23 |
| WebGL start | 18814–25621 | canvas webgl2 ×5 | n/a | n/a | n/a | - | dig:L4 |
| harness loaded | 1457 | page | n/a | n/a | - | - | dig:L16 |

3. Motion tokens
- House ease: cubic-bezier(.19,1,.22,1) (banner; quart/expo-out family). Second ease: cubic-bezier(.4,0,.6,1) ×4 (dig:L7), inferred UI.
- Durations: 250ms (banner), 4s (marquee), 2s/3s (dig:L8 counts, not located).
- Stagger: none. Scroll lerp: none. Camera damping: `lerpLookAt` / `restThreshold` identifiers in js:8380 (camera-controls style, inferred).

4. Systems
- Scroll: native.
- Text split: none.
- WebGL: webgl2 canvases; shaders.glsl (50 shaders). Features: noise, displacement, grain, blur, fresnel/lighting (dig:L5). Draco decoder (gstatic draco_decoder.wasm, dig:L21) = compressed mesh loaded.
- Video: mux HLS hero (dig:L6).
- Audio: none.

5. Recreate recipe
```
gsap.from('#CookieBannerNotice',{y:96,opacity:0,duration:.25,ease:'cubic-bezier(.19,1,.22,1)'}) // at t=5.0s
.marquee { animation: marquee 4s linear infinite }   /* translateX -100%→-200% */
// hero: three.js WebGL2 canvas, displacement+fresnel+grain shader; mount after 18.8s (measured)
```

6. Confidence: med on banner (CSS+digest agree), low on WebGL timing (run-specific).

---

## 6. gcloud (https://cloud.google.com/infrastructure)

1. Governing device: CSS fadeInFromBottom on load (translateY 32px→0, opacity 0→1) plus an indeterminate progress bar. No JS tweens.

2. Timeline

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| card fade-up | 600 | div.qPg9F.YceVQd | translateY 32→0; opacity 0→1 (kf 74%) | 500ms | ease-out (kf) | 0 | dig:L12 |
| card fade-up | 600 | div.YceVQd.FcF3Kc | same | 500ms | ease-out | 0 | dig:L13 |
| progress bar | loop | progressmove | margin-left -100%→100% | 1.5s | linear, infinite | - | css:1252 |
| focus ring | on focus | focus-animation-2px | outline 0→2px offset | 300ms | ease-in-out, forwards | - | css:1252 |
| button fade | on hover | opacity | → | .5s | ease-out | - | dig:L9 |

3. Motion tokens
- House ease: ease-out keyword (kf). No cubic-bezier token measured; inferred that no custom ease exists.
- Durations: 300ms, 500ms, 1.5s. Stagger: 0 (both cards share t=600). Scroll lerp: none. Cursor lag: none.

4. Systems
- Scroll: native. Text split: none. WebGL: none. Audio: none. Libs: none detected (dig:L2).

5. Recreate recipe
```
@keyframes fadeInFromBottom { 0% {opacity:0; transform:translateY(32px)} 74% {opacity:1} 100% {opacity:1; transform:none} }
.card { animation: fadeInFromBottom .5s ease-out 600ms both }
.progress { animation: progressmove 1.5s linear infinite }
```

6. Confidence: high on card fade (CSSAnimation log + css grep agree); note digest logs "linear" while keyframes are ease-out (kf-level easing wins; inferred).

---

## 7. telekom (https://www.telekom.de/start)

1. Governing device: Swiper horizontal carousel (800ms ease translate) with scroll-snap, plus cubic-bezier(.215,.61,.355,1) UI transitions and Lottie.

2. Timeline

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| carousel slide | hover0 | div.swiper-wrapper | translate3d -1368px→0 | 800ms | ease (kf linear) | - | dig:L12 |
| UI transition | ongoing | all (×12) | misc | 200ms | cubic-bezier(.215,.61,.355,1) | - | dig:L9 (transition ×12); dig:L5 (ease ×42) |
| fade | not captured | fadein keyframes | opacity 0→1 | not captured | not captured | - | dig:L7 |
| harness loaded | 2170 | page | n/a | n/a | - | - | dig:L14 |

3. Motion tokens
- House ease: cubic-bezier(.215,.61,.355,1) (ease-out-cubic), 42 uses (dig:L5).
- Durations: 200ms (UI), 400ms (opacity), 800ms (carousel), 2s/4s/3s loops (dig:L6, not located).
- Stagger: none. Scroll lerp: none (native scroll with snap). Cursor lag: none.

4. Systems
- Scroll: native + scroll-snap-type x mandatory on .swiper-wrapper (css:11).
- Container queries @container ×25; perspective ×7; preserve-3d ×7 (dig:L8).
- Lottie lib (dig:L2). Audio: notification mp3 (dig:L18), not motion.
- Text split: none.

5. Recreate recipe
```
:root { --ease-out-cubic: cubic-bezier(.215,.61,.355,1) }
.ui    { transition: all .2s var(--ease-out-cubic) }
.track { transition: transform .8s ease; scroll-snap-type: x mandatory }
```

6. Confidence: med-high on ease (42 hits) and carousel (single measured tween); med on durations for loops.

---

## 8. carbonation (https://thecarbonation.com/)

1. Governing device: none measured. Digest is empty: JS 0 KB, CSS 0 KB, 0 tween clusters, no libs (dig:L2-L11). Likely blocked or not captured in the run.

2. Timeline: none. Only harness markers (loaded 2541, hover 10621, cursorStep 11445, scroll 12651, end 24103; dig:L11), not animation.

3. Motion tokens: none measured.
4. Systems: none measured.
5. Recreate recipe: none. Re-capture needed.
6. Confidence: none. Re-run the capture for this site before any spec.

---

## Cross-site notes
- Scroll: native on all 8 sites. No lerp, no ScrollTrigger, no SplitText, no Lenis in any source.js.txt grep.
- Ease families seen: cubic-bezier(.215,.61,.355,1) telekom ×42, cubic-bezier(.4,0,.2,1) poltronafrau ×45 and vana ×2, cubic-bezier(.19,1,.22,1) pienso/peppa, cubic-bezier(.075,.82,.165,1) peppa, cubic-bezier(.2,0,0,1) vana token, cubic-bezier(.5,0,0,1) gucci token.
- Compound/unknown eases: peppa hover circ-out (rmse .48–2.89), expo.inOut (1.025), power2.in (3.31).
- Shaders: pienso (50), no other site has shaders.glsl with measured features beyond crumbskees/gallipoli etc. (out of scope).
