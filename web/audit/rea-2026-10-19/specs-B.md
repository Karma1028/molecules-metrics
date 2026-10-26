# specs-B: motion specs from measured evidence (7 sites)

Sources: forensics/<slug>/motion-digest.md (cited as dig[...]), grep hits in source.js.txt / source.css (cited as grep). Times are ms from navigation unless marked CSS (relative to element start). Eases with rmse > 0.15 are "compound/unknown". "inferred" = not measured.

Global: all 7 sites use native window scroll (no lerp detected in digest). No site has measured cursor lag except as noted under moonsafari.

---

## 1. onelastbeat (http://onelastbeat.com/)
1. Governing device: single measured fade-in on load; rest of page is WebGL/2d canvases + audio, no measured tween choreography.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| loaded | 1878 | div#use-fking-headphones | opacity 0→1 | 400 | power1.out (rmse 0.011) | - | dig[load @1878] |
| hover | 9965 | (none measured) | - | - | - | - | dig phases |
| CSS | - | any transition | color/fill/stroke/transform | 300 | not measured (CSS easings: none) | - | dig[top transitions] |
3. Tokens: house ease = not measured (CSS none). GSAP source names: Quad.easeInOut ×41, Quad.easeOut ×32 (grep, unmapped to elements). Duration scale: 0.1s, 0.3s (CSS), 0.4s (JS). Stagger: none. Scroll lerp: none. Cursor lag: none.
4. Systems: scroll native. Text split: none. WebGL 300x150 ×2 contexts + 2d canvases. Audio: AudioContext ×2, new Howl ×2 (grep).
5. Recipe:
```
tl.to('#use-fking-headphones', {opacity:1, duration:0.4, ease:'power1.out'}, 1.878)
// no other measured tweens; do not invent choreography
```
6. Confidence: LOW. One tween measured; 63 style mutations unmapped.

---

## 2. yauch (https://yauch.oscilloscope.net/panorama/main_01)
1. Governing device: preloader CSS loop, then hover-triggered opacity reveals on display type; ambient CSS spins 15–45s; SFX on hover/click.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 600 | span.preloader-ring | rotate 0→360 (spinRing) | 1000 | linear | - | dig[CSSAnimation spinRing] |
| load | 600 | span.preloader-text | flickText opacity 0→0.8→0.2 | 600 ×2 iter | linear | - | dig[flickText] |
| load | 5000 | footer copyright/links | blur 5px→0 ; opacity 0→1 | 1000 | ease; delay 1500 / 1000 | - | dig[CSSTransition filter/opacity] |
| hover | 13169 | h2.component-title | opacity 0.068→1 | 300 | linear (rmse 0.246) → compound/unknown | 0 | dig[hover @13169] |
| hover | 13169 | span.rotator-circle | opacity 0.008→1 | 1500 | power1.out (rmse 0.002) | 0 | dig[hover @13169] |
| hover | 13218 | h3.hero-text | opacity 0.057→1 | 300 | linear (rmse 0.239) → unknown | +49 start offset | dig[hover @13218] |
| hover | 13766 | span.outline | opacity 0.003→1 | 2000 | power1.out (rmse 0.001) | +298 start offset | dig[hover @13766] |
| cursor | 15773 | span.drag-text-line-1 | opacity 0.053→1 | 450 | linear (rmse 0.239) → unknown | +299 vs line-2 | dig[cursor @15773] |
| cursor | 16072 | span.drag-text-line-2 | opacity 0.068→1 | 300 | linear (rmse 0.242) → unknown | - | dig[cursor @16072] |
3. Tokens: house CSS ease = cubic-bezier(.4,.04,0,1.02) (×11, grep/dig CSS easings; inferred house). Overshoot cubic-bezier(.19,-1.18,.3,-1.18) ×8 (usage not mapped). Duration scale: 0.15/0.2/0.25/0.3s UI, 1/1.5/2/3/5s reveal, 15–45s ambient. Stagger: start offsets 49/97/150/298 ms (measured hover). Scroll lerp: none. Cursor lag: none measured.
4. Systems: scroll native. Text split: SplitText, words+chars classes (grep). WebGL: 2 shaders, texture sampling, 100x100 + 1440x900 canvases. Audio: AudioContext ×4, mouseover/click wav assets (dig). Lottie lib.
5. Recipe:
```
tl.to('h2.component-title', {opacity:1, duration:0.3, ease:'none'}, hoverT)   // linear, rmse>0.15 → verify
tl.to('.rotator-circle', {opacity:1, duration:1.5, ease:'power1.out'}, hoverT)
tl.to('.hero-text', {opacity:1, duration:0.3, ease:'none'}, hoverT+0.049)
tl.to('.outline', {opacity:1, duration:2, ease:'power1.out'}, hoverT+0.298)
```
6. Confidence: MED. Hover timing measured; 4 of 6 hover/cursor eases are linear with rmse 0.24 (unknown).

---

## 3. patronus (https://www.harrypotter.com/patronus)
1. Governing device: CSS-keyframe UI reveals (quiz, poll, header, search); no GSAP tween measured; ScrollTrigger present in bundle.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 1506 | Header fadeIn | opacity 0→1, left -550→192px | not measured | not measured | - | dig[Header-module fadeIn] |
| CSS | - | QuizQuestion clipIn | clip-path inset(0 100% 0 0)→inset(0) | not measured | not measured | - | dig[QuizQuestion clipIn] |
| CSS | - | QuizQuestion slideDown | translateY 50→0 | not measured | not measured | - | dig[QuizQuestion slideDown] |
| CSS | - | Poll fillBackground | width 0→100%, padding 15px 0→15px 30px | not measured | not measured | - | dig[Poll fillBackground] |
| CSS | - | SearchInputMobile fadeInScaleUp | opacity 0→1, scale .8→1 | not measured | not measured | - | dig[SearchInputMobile] |
| hover | 9672 | (no tween measured) | - | - | - | - | dig phases |
3. Tokens: CSS easings cubic-bezier(.33,1,.68,1) ×2, cubic-bezier(.5856,.0703,.4143,.9297) ×2 (low count, likely not house). Transitions: all .2s ease-in ×5, all .3s ease-in ×5, opacity .5s ease-in-out ×4. Source gsap: duration:1 ×9, duration:0 ×12, power1.inOut ×1, stagger 0 ×2. Scroll lerp: none (lerp( ×5 in source, context unverified). Cursor lag: none.
4. Systems: scroll native + ScrollTrigger.create ×1 (grep). Canvas: 2000x200 2d ×2, webgl 300x150 ×2. Mask ×58 CSS, backdrop-filter ×4, text-stroke ×1. No SplitText, no audio.
5. Recipe:
```
// CSS only per digest: fadeIn/clipIn/slideDown keyframes already in CSS modules
ScrollTrigger.create({trigger: section, onEnter: () => el.classList.add('is-in')})  // inferred wiring
```
6. Confidence: LOW. Zero tween timings measured; all keyframe durations unmapped.

---

## 4. gallipoli (https://sonsofgallipoli.com/)
1. Governing device: staged quote-word reveal fired by load, hover, cursor and scroll triggers; scroll-driven exit with near-zero stagger; WebGL displacement/blur shaders.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 9118 | div.progress | width 100→44.05 % | 16550 | circ-out (rmse 0.639) → compound/unknown | - | dig[load @9118] |
| load | 10635 | div.section-intro | opacity 0.016→1 | 500 | linear (rmse 0.005) | - | dig[load @10635] |
| load | 11230 | div.language-container | opacity →1 | 1000 | power1.out (rmse 0.001) | - | dig[load @11230] |
| load | 12632 | div.quote-word ×2 | opacity →1 | 1800 | power1.out (rmse 0.001) | ~95 | dig[load @12632] |
| hover | 12833 | div.quote-word ×8 | opacity →1 | 1800 | power1.out | ~99 | dig[hover @12833] |
| cursor | 13632 | div.quote-word ×12 | opacity →1 | 1800 | power1.out | ~97 | dig[cursor @13632] |
| scroll | 14833 | div.quote-word ×20 | opacity →1 | 1800 | power1.out | ~98 | dig[scroll @14833] |
| scroll | 25160 | div.quote-word ×21 | opacity 0.996→0 | 700 | linear | ~8 | dig[scroll @25160] |
| scroll | 25653 | div.label | x 0→-50, y 40→0 | 400 | circ-out (rmse 0.251) → unknown | - | dig[scroll @25653] |
3. Tokens: reveal ease fitted = power1.out (rmse 0.001, n≈50 words). Source grep counts Expo.easeOut ×183, Expo.easeIn ×39: conflict with fits, unresolved. Durations: 0.5 / 0.7 / 1.0 / 1.8s. Stagger: reveal ~95–99 ms, exit ~0–10 ms. Scroll lerp: none. Cursor lag: none.
4. Systems: native scroll. WebGL: 26 shaders, noise, displacement, blur (dig). Audio: AudioContext ×4 (grep). Video soldier walk-in/loop webm (dig assets). Style mutations 30127 (huge, DOM-driven).
5. Recipe:
```
tl.to('.quote-word', {opacity:1, duration:1.8, ease:'power1.out', stagger:0.097}, t)  // reveal
tl.to('.quote-word', {opacity:0, duration:0.7, ease:'none', stagger:0.008}, tExit)     // exit
```
6. Confidence: MED. Reveal timing n≈100 tweens, strong. Ease name conflicts with source Expo usage.

---

## 5. moonsafari (https://www.moonsafari.archi/)
1. Governing device: GSAP loader → SplitText line/char title reveal; scroll-driven page-content translate (power3.out); rolling list-prog-nb numbers; cursor follower measured but unknown ease.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 4342 | div#main-loader | opacity 1→0 | 500 | css ease-in-out (rmse 0.016) | - | dig[load @4342] |
| load | 4851 | div ×3 | transform.x 49.3→0 | 1500 | power3.out (rmse 0.001) | ~131 | dig[load @4851] |
| load | 4851 | div ×3 | opacity 0→1 | 1500 | css ease-in-out (rmse 0.007) | ~131 | dig[load @4851] |
| load | 5245 | div.fp-btn-skip | transform.x 49.5→0 | 1500 | power3.out | - | dig[load @5245] |
| hover | 11966 | div#cursor.show | transform.x 699→1100 | 2500 | power3.inOut (rmse 0.625) → unknown | - | dig[hover @11966] |
| scroll | 13995 | div.page-content | transform.y -21.6→-1430 | 1550 | power3.out (rmse 0.062) | - | dig[scroll @13995] |
| scroll | 15863 | div.page-content | transform.y -1451.6→-2950 | 1750 | power3.out (rmse 0.047) | ~1868 | dig[scroll @15863] |
| scroll | 15904 | div.list-prog-nb ×4 | transform.y 49.6→-50 | 250 | linear (rmse 0.129) | ~180 | dig[scroll @15904] |
3. Tokens: CSS house eases by count: cubic-bezier(.165,.84,.44,1) ×213 (expo-out-like), cubic-bezier(.25,.46,.45,.94) ×131, cubic-bezier(.77,0,.175,1) ×91. Gsap source: Power2.easeInOut ×89, Power1.easeInOut ×58, Power2.easeOut ×35. Durations: 0.5s transitions; 1.5s / 1.75s / 2.5s GSAP. Scroll lerp: none. Cursor lag: cursor-probe.json has moonsafari followers = [] (no cursor measured).
4. Systems: native scroll. SplitText: lines + chars (grep ×6). Canvas 2d 300x150 ×20 (cursor loaders, dig). prefers-reduced-motion media query ×2 (CSS). No audio, no WebGL.
5. Recipe:
```
new SplitText(title, {type:'lines,chars'}); // reveal chars/lines
tl.to(mainLoader, {opacity:0, duration:0.5, ease:'power1.inOut'}, 4.342)  // digest: opacity 1→0
tl.to(pageContent, {y:-1430, duration:1.55, ease:'power3.out'}, 13.995)
```
6. Confidence: MED. Loader + page-content measured (rmse ≤0.06); list-prog opacity fit invalid (rmse 71), cursor ease unknown.

---

## 6. crumbskees (https://crumbskees.com/)
1. Governing device: gated game UI (gate click → stage fade), CSS keyframe board/popup animations, WebGL2 shaders, SFX audio. No GSAP tweens measured.
2. Timeline:
| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 600 | MarqueeText inner | translateX 0→-200% | 12000 | linear | - | dig[MarqueeText CSSAnimation] |
| gateClick | 11127 | SetupStage wrapper | opacity 0→1 (0.99 hold) | 750 | linear | - | dig[StageWrapper stage-appear, afterGate] |
| CSS | - | Board round-name | translateY -500%→0, scale 1.5→1, opacity 0→1 | not measured | not measured | - | dig CSS keyframes |
| CSS | - | Board item | scale 0.1→1, opacity 0→1 | not measured | not measured | - | dig CSS keyframes |
| CSS | - | Board power ring | stroke-dashoffset 0→182.2 | not measured | not measured | - | dig CSS keyframes |
| CSS | - | Button hover | translate .347vw bob | not measured | not measured | - | dig CSS keyframes |
3. Tokens: CSS easings cubic-bezier(0.785,0.135,0.15,0.86) ×6, cubic-bezier(0.19,1,0.22,1) ×4, cubic-bezier(0.165,0.84,0.44,1) ×2 (counts only). Transitions: transform 0.3s, padding 0.4s. No stagger measured. Scroll lerp: none. Cursor lag: none.
4. Systems: native scroll. WebGL2 16 shaders (texture sampling, mix-blend-mode ×3). text-stroke ×44. Audio: AudioContext ×4, new Howl ×1, mp3 SFX 3–14 KB ×7.
5. Recipe:
```
// gate click → stage
stage.animate([{opacity:0},{opacity:0,offset:.99},{opacity:1}], {duration:750, easing:'linear'})
marquee.animate([{transform:'translateX(0)'},{transform:'translateX(-200%)'}], {duration:12000, iterations:Infinity})
```
6. Confidence: LOW. Only 2 durations measured; board keyframes lack timing.

---

## 7. pencilvania (https://pencilvania.stutpak.com/)
1. Governing device: none measured. Audio-only cues (15 SFX) plus one 2d canvas.
2. Timeline: no measured motion (0 tweens, 0 CSS keyframes, 0 transitions; dig).
3. Tokens: none measured.
4. Systems: canvas 2d 300x150 @768ms (dig). Audio: sounds/1–15.mp3, 3–7 KB each (dig). No scroll engine, no split, no WebGL, no lerp.
5. Recipe: no recipe; no motion measured.
6. Confidence: HIGH that no motion is measured; no spec possible beyond audio asset list.
