# specs-E: motion specs from measured evidence (9 sites)

Sources: forensics/<slug>/motion-digest.md (cited as "digest @t" = JS tween cluster at t ms from nav, "digest CSS" = CSS/WAAPI line), grep hits in source.css / source.js.txt / shaders.glsl, cursor-probe.json.
Rules: rmse > 0.15 = "compound/unknown". "inferred" = not measured. GSAP names mapped to standard Penner cubic-bezier (approx): power1.out ~ .25,.46,.45,.94; power2.out ~ .215,.61,.355,1; power2.inOut ~ .645,.045,.355,1; power3.out ~ .165,.84,.44,1; power4.out ~ .23,1,.32,1; expo.out ~ .19,1,.22,1.

---

## inkwell (https://inkwell.tech/)
1. Governing device: scroll-driven word/indicator reveals (span.--word, text-indicator) on a custom glass cursor (17px glass wrapper, 6px dot) over WebGL glass cards.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| cursor appear | 5032 | .cursor__wrapper, .dot-cursor | --v 90→122 | 400ms | quart-out .19,1,.22,1 (rmse .58 → compound/unknown) | - | digest @5032 |
| text in | 5671 | .text-indicator | opacity .012→.943 | 1250ms | power1.out (rmse .05) | - | digest @5671 |
| text settle | 7354 | .text-indicator | opacity .944→1 | 1250ms | circ-out .075,.82,.165,1 (rmse .17, compound) | - | digest @7354 |
| cursor glide | 11736 | .cursor__wrapper | x 4→103, y 32→807 | 2000ms | circ-out .075,.82,.165,1 (rmse .07) | - | digest @11736 |
| word rise | 12520 | span.--word x4 | translateY 100→0 | 1000ms | power2.inOut (rmse .006) | 9ms | digest @12520 |
| word rise (hover) | 12561 | span.--word x3 | translateY 100→0 | 1000ms | power2.inOut (rmse .009) | 14ms | digest @12561 |
| indicator | 14040 | div.indicator-wrapper x2 | x -17→-78 | 500ms | power2.out (rmse .004) | 0 | digest @14040 |
| hint fade | 14318 | p.scroll-1 | opacity .011→1 | 1550ms | expo.out (rmse .009) | - | digest @14318 |
| cursor travel | 17276 | .cursor__wrapper | x 111→1100, y 792→450 | 2750ms | circ-out (rmse .10) | - | digest @17276 (--v leg power3.inOut rmse .23 = compound) |
| dot | 18088 | .dot-cursor | --v 89→-90 | 650ms | css ease-in-out (rmse .11) | - | digest @18088 |
| scroll words | 19325 | span.--word x6 | translateY -4→-120 | 150ms | css ease-out (rmse .04) | 0 | digest @19325 |
| scroll info | 19346 | div.info-scrub x2 | translateY 91→0, opacity .01→1 | 150ms | power4.out (rmse .03) | 0 | digest @19346 |
| scroll varying | 24000 | span.varying x4, p.faded.info x2 | translateY -5→-250; opacity .99→0 | 2200ms | expo.out (rmse .005) | 0 | digest @24000 |
| scroll info2 | 24048 | p.faded.info2 x4 | translateY 104→300; opacity .99→1 | 2200ms | expo.out (rmse .004) | 0 | digest @24048 |
| cursor lag probe | 0 (ref) | .glass 17px | transform lag t63 218ms, t95 552ms | 1s | cubic-bezier(.19,1,.22,1) | - | cursor-probe.json |
| dot lag probe | 0 (ref) | .dot-cursor 6px | t63 59ms | bg .2s | cubic-bezier(.39,.575,.565,1) | - | cursor-probe.json |
3. Tokens: house ease cubic-bezier(.19,1,.22,1) (5 CSS uses, all GSAP expo.out reveals). Secondary cubic-bezier(.39,.575,.565,1) (x29 CSS, 0.2s color/opacity). Durations: 0.2 / 0.4 / 0.5 / 0.6 / 1.0 / 1.25 / 1.55 / 2.2 / 2.75s. Word stagger 9-14ms. Cursor lag: 1s glass transition, 0.2s dot bg. Scroll lerp: none measured on window (digest says native), but Lenis is in the bundle (conflict, unresolved).
4. Systems: Scroll: scroll-linked GSAP tweens; Lenis bundled, digest reports no lerp. Text split: custom span.--word (not SplitText; SplitText absent from libs). WebGL: 60 shaders; uniforms uIOR, uTransmissionOpacity, uNoiseStrength, uFrost, tFrost, uLight, uPortal, uColorStart/End, uOpacity, uSafari, uAspect (shaders.glsl); features noise, fxaa, fresnel/lighting (digest). Keyboard: none measured.
5. Recipe:
```
gsap.fromTo('.--word',{yPercent:100},{yPercent:0,duration:1,ease:'power2.inOut',stagger:0.009});
gsap.fromTo('.scroll-1',{opacity:0.01},{opacity:1,duration:1.55,ease:'expo.out'});
.glass{transition:transform 1s cubic-bezier(.19,1,.22,1)}   /* 17px, lag ~218ms @63% */
.dot-cursor{transition:background .2s cubic-bezier(.39,.575,.565,1)}  /* 6px */
```
6. Confidence: HIGH for CSS cursor (probe + CSS grep). MED for GSAP timeline (rmse-checked, but scroll triggers inferred from timing, not events). LOW for scroll engine (Lenis vs native conflict).

## frost (https://www.frostype.xyz/typeface/system-blank)
1. Governing device: clip-path snip wipes and a 4.5s linear-quad progress bar sequencing the hero, plus slow trial-option opacity fades on scroll.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| hero progress | 600 | div.image_object (progBar) | width 0→100% | 4500ms | cubic-bezier(.75,0,.25,1) | - | digest CSS @600 |
| title tint | 1500 | p.image_title | color #000→rgba(0,0,0,.5) | 500ms | ease (kf linear) | - | digest CSS @1500 |
| intro out | 3000 | div.site_intro | opacity 1→0 | 1000ms | ease | - | digest CSS @3000 |
| carousel prog | 8000 | .typeface_page_header_carousel_prog | width 0→100% | 5000ms | cubic-bezier(.75,0,.25,1) | - | digest CSS @8000 |
| clock hand | 621 | div.hand.second | rotate 84→236deg | 25350ms | linear (rmse 0) | - | digest @621 |
| trial opts | 14491 | .typeface_page_trials_options_option_product, .cut_feature_tab | --opacity 123→-10 | 550ms | linear (rmse .008) | 0 | digest @14491 |
| trial opts | 18461 | same x3 | --opacity -517→-650 | 500ms | linear (rmse .012) | 3744ms (inferred: group offset, not design stagger) | digest @18461 |
| trial opts | 20343 | same | --opacity -357→-490 | 450ms | linear (rmse .018) | - | digest @20343 |
| link hover | hover | a | color #000→rgba(0,0,0,.5) | 500ms | ease | - | digest CSS hover1 |
3. Tokens: house ease cubic-bezier(.75,0,.25,1) (x11). Durations: 0.5 / 0.55 / 1.0 / 4.5 / 5.0s; 5s dominates CSS (x187, likely looping/ambient, inferred). Stagger: none confirmed.
4. Systems: CSS keyframes snipIn/snipOut (clip-path polygon wipe), snipContentIn/Out (translate -50px), progBar. No smooth scroll. No text split. No WebGL (2d canvases only). Keyboard: none.
5. Recipe:
```
.image_object.progBar{animation:progBar 4.5s cubic-bezier(.75,0,.25,1) .6s both}
.site_intro{animation:fade 1s ease 3s forwards}
gsap.to(opts,{'--opacity':-650,duration:.5,ease:'none',stagger:0})  /* linear, scroll-scrubbed */
```
6. Confidence: MED. Keyframe names and progBar timing are clear; snip wipe duration and the 5s loop meaning are inferred; the 3744ms stagger looks like a grouping artifact.

## exat (https://exat.hottype.co/)
1. Governing device: GSAP ScrollTrigger scrubbed clip-path media reveal plus SplitText word rise (expo.out, 13ms stagger) on scroll.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| playground title | 3533 | div.playground-title | --fnt 31.4→42; --x -0.09→-0.12 | 300ms | power2.out (rmse .002) | - | digest @3533 |
| path rise | 3000 | svg path | translateY 100%→0 | 800ms | cubic-bezier(.84,.01,.18,1) | delay 300ms | digest CSS @3000 |
| media wipe | scroll | img.media | clipPath polygon(0 0%,100% 0%,100% 100%,0 100%)→polygon(0 100%,...) | scrub | none (scrub:true, start top 50%, end bottom 50%) | - | source.js.txt GSAP first call |
| title flip | hover | .title | rotateX 0→-360 | 1000ms | back.out (GSAP name) | - | source.js.txt gsap.to(e,{rotateX:-360,duration:1,ease:"back.out"}) |
| hover bars | hover | span.hover-line x2 | scale .947→.999 | 300ms | power1.out (rmse .02) | 8457ms (inferred grouping artifact) | digest @11071 |
| width tabs | hover | .fill | width 15%→40%, x -25% | 750ms | power3.out | - | source.js.txt |
| split words | 21703 | div.split-words x91 | y -245→0 | 1000ms | expo.out (rmse .001) | 13ms | digest @21703 |
| rotator | 25618 | img.rotator (multi) | rotate ~2→~140deg | 2100ms | compound (rmse .08-.17) | 0 | digest @25618 |
| numbers | 27653 | div.number x7 | y ±50 | 1900ms | unknown (rmse 1.5-6.8) | 0 | digest @27653 |
| inner bars | 31807 | div.inner x5 | width 19.8→15% | 700ms | power3.out (rmse .015) | 0 | digest @31807 |
3. Tokens: house ease expo.out ~ .19,1,.22,1 (text, 1.0s); power3.out ~ .165,.84,.44,1 (UI, 0.4-0.75s); cubic-bezier(.84,.01,.18,1) (media, 0.8s); back.out (title). Stagger 13ms words. Lenis default lerp .1 present in bundle (config not verified; lerp not measured).
4. Systems: GSAP 3.x + ScrollTrigger (scrub x4) + SplitText 3.12.7 (new SplitText on .title) + Lenis bundled. Scroll engine: scrub-linked (ScrollTrigger). No WebGL. No keyboard nav.
5. Recipe:
```
const split = SplitText.create('.split-words', {type:'words'});
gsap.fromTo(split.words,{yPercent:-245},{yPercent:0,duration:1,ease:'expo.out',stagger:0.013,scrollTrigger:{start:'top 80%'}});
gsap.fromTo('.media',{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'},{clipPath:'polygon(0 100%,100% 100%,100% 100%,0 100%)',ease:'none',scrollTrigger:{trigger:'.media-frame',start:'top 50%',end:'bottom 50%',scrub:true}});
```
6. Confidence: HIGH for split and scrub (source + digest agree). MED for rotator and numbers (compound/unknown eases). Scroll trigger start values inferred from GSAP call shape.

## hvdmatch (https://www.hvdfonts.com/fonts/match)
1. Governing device: CSS-only pop-in and overshoot reveals, plus a 1s color fade on the type tester at scroll; no JS tweens.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| header hide | 600 | header.header.has-hide-animation | translateY 15→-5→0 | 450ms (digest) | ease (kf) | - | digest CSS @600 |
| type tester in | scroll5 | .type-tester__line x2, .type-l-to-xl, .product__name, .tabs__tabs-contents, h1 | color rgba(0,0,0,0)→rgb(0,0,0) | 1000ms | ease (kf linear) | 0 (all delay 300ms) | digest CSS scroll5 |
| pop-in | (kf) | pop-in keyframe | scale 0→1; opacity 0→1 | not measured | cubic-bezier(.65,-.25,.31,1.99) (x1 top easing) | - | digest CSS keyframes |
| nav hint | (kf) | navihint | translateY 0→20→15px | not measured | ease (inferred) | - | digest CSS keyframes |
| dot pulse | (kf) | dotpulse / dotsonar | bg #d8ebea↔#8ecfd4; scale pulse | not measured (inferred) | - | - | digest CSS keyframes |
3. Tokens: overshoot cubic-bezier(.65,-.25,.31,1.99) (x1); transition ease-in-out 0.1/0.2/0.25s (x3/2/2); durations 0.1 / 0.25 / 0.4 / 1s. Stagger: none (identical delays).
4. Systems: no GSAP, no libs, no JS tweens. clip-path x41 (mask/reveal, not measured). No smooth scroll. No WebGL. No keyboard nav.
5. Recipe:
```
.type-tester__line{color:transparent;transition:color 1s ease .3s}
.in .type-tester__line{color:#000}
.pop{animation:pop-in .3s cubic-bezier(.65,-.25,.31,1.99) both}  /* 0.3s is inferred */
```
6. Confidence: LOW. One overshoot easing and 10 identical color transitions; no JS, no per-element durations for pop-in.

## guess (https://www.barrettrm.com/typefaces/p/guess)
1. Governing device: Material-standard 650-800ms WAAPI fade-plus-scale exit (preScale/preFade) staggered at ~11ms steps on load, Webflow-IX2 interactions, prefers-reduced-motion handled in CSS.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| title out | 600 (delay 256) | h2.newsletter-form-header-title.preScale | opacity 1→0; scale 1→.9 | 650ms | ease (kf linear) | 11.1ms steps | digest CSS @600 |
| sub out | 600 (delay 267) | p.preFade | opacity 1→0 | 650ms | ease | 11.1ms | digest CSS @600 |
| button out | 600 (delay 278) | div.newsletter-form-button-wrapper | opacity 1→0 | 650ms | ease | 11.1ms | digest CSS @600 |
| product title | 600 (delay 300) | h2.product-related-products-title.preScale | opacity; scale .9 | 650ms | ease | - | digest CSS @600 |
| image | 600 (delay 311) | figure.product-list-item-image.preScale | opacity; scale .9 | 650ms | ease | 11.1ms | digest CSS @600 |
| image block | 600 (delay 489) | div.image-block-wrapper.preScale | opacity; scale .9 | 650ms | ease | - | digest CSS @600 |
3. Tokens: house ease cubic-bezier(.4,0,.2,1) (x175; 800ms x130 = dominant duration); cubic-bezier(.19,1,.22,1) .6s transform (x15); cubic-bezier(.2,.6,.3,1) (x30). Stagger 11.1ms. Reduced motion: @media prefers-reduced-motion x12.
4. Systems: Webflow-IX2 + barba page transitions; WAAPI for exits. Canvas 2d x2 (not measured). Clip-path x167, mask x198, backdrop-filter x22. No Lenis. No text split. No WebGL. Keyboard: not measured.
5. Recipe:
```
.preScale{animation:scaleOut .65s ease both}   /* opacity 1->0, scale 1->.9 */
.preFade {animation:fadeOut .65s ease both}
.preScale:nth-child(n){animation-delay:calc(var(--i)*11.1ms)}
.card{transition:transform .8s cubic-bezier(.4,0,.2,1), opacity .8s cubic-bezier(.4,0,.2,1)}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
```
6. Confidence: MED. Exit counts and delays are measured; the exit is a page-transition inference (barba), not confirmed by a video frame.

## zighead (https://www.headfonts.com/p/zighead-font/)
1. Governing device: ambient rotating donut/ring loops (2-24s) and CSS 160ms UI transitions with an overshoot curve; no JS tweens.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| ring loop | ambient | clockwise kf | rotate 0→360deg | 2s / 11s / 16s / 24s (digest) | linear (inferred) | - | digest CSS keyframes |
| donut | ambient | donut-rotate | rotate 0→-140deg→0 | not measured | inferred ease | - | digest CSS keyframes |
| list item in | UI | fadeInItem | opacity 0→1; translateY -.5em→0 | not measured | ease (inferred) | - | digest CSS keyframes |
| row delete | UI | deleteItem | opacity→0; scale .9; visibility collapse | not measured | ease (inferred) | - | digest CSS keyframes |
| UI hover | hover | all | 160ms transitions x45 | 160ms | cubic-bezier(.4,0,.22,1) (x10) | - | digest CSS top transitions |
| overshoot | UI | overshoot element | transition | 200ms ease | cubic-bezier(.34,1.61,.7,1) (x2) | - | digest CSS easings |
3. Tokens: house ease cubic-bezier(.4,0,.22,1); overshoot cubic-bezier(.34,1.61,.7,1); durations 0.11 / 0.16 / 0.2s. Perspective x116 (3D, not measured). Stagger: none measured.
4. Systems: no GSAP, no smooth scroll, no WebGL, no text split. Canvas 2d x1 (not measured). Keyboard: none.
5. Recipe:
```
.ui-btn{transition:all .16s cubic-bezier(.4,0,.22,1)}
.ui-pop{transition:transform .2s cubic-bezier(.34,1.61,.7,1)}
.item-in{animation:fadeInItem .2s cubic-bezier(.4,0,.22,1) both}  /* duration inferred */
.spin-ring{animation:clockwise 16s linear infinite}
```
6. Confidence: LOW. Only CSS counts; no timing per element; ambient-loop durations are digest counts, not per-element.

## zaft (https://wisetype.nl/collections/wt-zaft-2)
1. Governing device: short loader fade (sine.inOut 600ms) then 200ms var-driven UI transitions; minimal motion surface.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| loader out | 4276 | div#loader | opacity 1→0 | 600ms | sine.inOut (rmse .002) | - | digest @4276 |
| UI transition | hover | transform/opacity | var(--timing) var(--easing) | 200ms (x3) | cubic-bezier(.30,1,.15,1) (x4; var resolution inferred) | - | digest CSS top transitions |
| bounce | ambient | bounce kf | translateY 0→-3px→0 | not measured | - | - | digest CSS keyframes |
| fade-in | UI | fade-in kf | opacity 0→1 | 300ms (x1) | inferred | - | digest CSS durations |
3. Tokens: cubic-bezier(.30,1,.15,1) (x4), cubic-bezier(.80,0,.20,1) (x1), cubic-bezier(.70,0,.30,1) (x1); durations 50 / 200 / 300ms / 1s. Stagger: none.
4. Systems: no libs, no smooth scroll, no WebGL, no text split. Mask x10 and backdrop-filter x4 (not measured). Keyboard: none.
5. Recipe:
```
gsap.to('#loader',{opacity:0,duration:.6,ease:'sine.inOut',delay:4.2});
:root{--timing:.2s;--easing:cubic-bezier(.30,1,.15,1)}
.btn{transition:transform var(--timing) var(--easing), opacity var(--timing) var(--easing)}
```
6. Confidence: LOW. One JS tween and four CSS easing hits; `var()` resolution is inferred.

## lemkus (https://lemkus.com/blogs/news)
1. Governing device: AOS-style one-shot entrance (heroFadeIn 1s, 15px rise) with a figure settle (scale 1.05→1, 800ms, 150ms delay) on load.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| header in | 600 | header.theme__header.aos-animate | opacity 0→1; transform none→translateZ(0) | 1000ms | ease | - | digest CSS @600 |
| image in | 600 | img.fit-cover, img | opacity 0→1 | 500ms | ease-in | - | digest CSS @600 |
| image settle | 600 (delay 150) | figure.image-wrapper.lazy-image | scale 1.05→1 | 800ms | cubic-bezier(.25,.46,.45,.94) | 150ms delay | digest CSS @600 |
| hero text | 600 | div.article__text-wrapper.aos-animate (heroFadeIn) | translateY 15px→0; opacity .001→1 | 1000ms | ease (kf) | - | digest CSS @600 |
| loader | 600 | div.loader-indeterminate | scaleX .35↔2 | 2100ms | linear + cubic-bezier(.65,.815,.735,.395) per kf | short variant delay 1150ms | digest CSS @600 |
| popup | 8000 | klaviyo (third-party) | opacity 0→1 | 350ms | ease | - | digest CSS @8000 (exclude from house) |
3. Tokens: house ease cubic-bezier(.215,.61,.355,1) (x32, dominant CSS ease); overshoot cubic-bezier(.34,1.56,.64,1) (x6); cubic-bezier(.4,0,.2,1) x12; durations 0.3 / 0.4 / 0.5 / 0.8 / 1.0s. Stagger: 150ms single delay.
4. Systems: barba, AOS classes (inferred from aos-animate), no GSAP, no smooth scroll, no WebGL, no text split. Canvas 2d x1 (not measured). Keyboard: none.
5. Recipe:
```
.theme__header{animation:fadeIn 1s ease both}
.image-wrapper{animation:settle .8s cubic-bezier(.25,.46,.45,.94) .15s both}   /* scale 1.05->1 */
.article__text-wrapper{animation:heroFadeIn 1s ease both}  /* translateY 15px, opacity .001->1 */
.btn{transition:transform .4s cubic-bezier(.4,0,.22,1)}
```
6. Confidence: MED. WAAPI timings and delays measured; the AOS attribution and the 0.215 house-ease claim are based on count only.

## stripedev (https://stripe.dev/blog)
1. Governing device: ambient CSS marquee/ticker and vibes color cycle, plus a 42x42 canvas redraw loop (~28ms cadence, inferred); no measured keyboard-driven motion.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| art fade in | 600 | div.QRr6PW_Art, div.QRr6PW_canvasContainer | opacity 0→1 | 300ms | ease (kf) | - | digest CSS @600 |
| ticker | ambient | _6k8RLW_ticker | translateX 0→-33.33% | not measured (durations 15s x5, 8s x3, 90s x2) | linear (inferred) | - | digest CSS keyframes |
| marquee | ambient | marquee-left / right | translateX 0→-100% / 0→100% | not measured | linear (inferred) | - | digest CSS keyframes |
| vibes | ambient | D6Rhmq_vibes-flash | color #f0f→#0ff→#ff0 | not measured | steps/linear (inferred) | - | digest CSS keyframes |
| canvas loop | 370-1670 | 2d 42x42 x~50 | redraw cadence ~27.8ms | - | - | - | digest canvas contexts |
| hover fade | hover | UI | opacity .15s x4; transform .6s cubic-bezier(.19,1,.22,1) x1 | 150-600ms | cubic-bezier(.19,1,.22,1) (x2) | - | digest CSS top transitions |
3. Tokens: house ease cubic-bezier(.19,1,.22,1) (x2, transform .6s); durations 80 / 150 / 600ms / 1.2s. Stagger: none.
4. Systems: React app, howler/AudioContext x2 (not measured), no WebGL, no smooth scroll, no text split. Keyboard: no custom arrow-key motion found. The keydown/mousedown/pointerdown/click/scroll window listeners in source.js.txt belong to the Sprig feedback widget (`Sprig_SubmitSurvey`), not to page navigation. focus-visible rules only on copy-code and image-expand buttons (source.css).
5. Recipe:
```
.ticker{animation:ticker 15s linear infinite}   /* translate 0 -> -33.33%, duration inferred */
.art{animation:fadein .3s ease both}
.btn{transition:transform .6s cubic-bezier(.19,1,.22,1)}
.btn:focus-visible{outline:2px solid currentColor}   /* focus-visible seen in source.css */
```
6. Confidence: LOW. Canvas and marquee durations unmapped; keyboard nav absent from evidence.

---
Cross-site: no cursor-probe entries for the other 8 sites (only inkwell and the3key have followers; moonsafari empty). Cursor-lag tokens above apply to inkwell only.
