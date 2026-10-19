# device-teardown-C — how each site's devices work (from slices)

Sources: forensics/<slug>/device-code.md (slice headers cited as `[slice: file Lnn]`), raw source.js.txt / source.css (cited by line), motion-digest.md (`dig:Ln`), specs-C.md (`specs:`). Anything without a slice is marked **digest-only**. "unclear" = not determinable from evidence.

---

## 1. gucci (https://www.gucci.com/#/en/)

Only two real devices. Rest is React/GTM noise.

**G1. Loader spinner** — a small rotating svg while the page boots.
- Mechanism: page load → CSS class on `svg._loading` → infinite linear keyframe rotate. No JS, no state.
- Params: 1s, linear, infinite, rotate 0→360deg.
- Excerpt (source.css L19, verbatim):
```css
svg._loading_11iuc_1{animation:_loading_11iuc_1 1s linear infinite}@keyframes _loading_11iuc_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
```
- Port: `@keyframes spin { to { transform: rotate(360deg) } }` on the loader svg, `animation: spin 1s linear infinite`.

**G2. Text mask slide (CSS)** — labels/text slide in and out of a mask.
- Mechanism: CSS class toggled by route/state → keyframe translate on `.text-main`. No JS tween.
- Params: house ease `--g-transition-timing-function: cubic-bezier(0.5,0,0,1)`, `--g-transition-duration: 0.8s` (specs:css:2). Slide-out kf 45%: translate(-100%) → 100%: translate(0) (dig:L8). Slide-in kf holds translate(100%) from 55%; the start time is **unclear** (not captured).
- Excerpt (motion-digest.md L8, keyframe strings as logged):
```
_text-main-slide-in_op6q6_1 {55%{transform:translate(100%)}to{transform:translate(100%)}}
_text-main-slide-out_op6q6_1 {45%{transform:translate(-100%)}to{transform:translate(0)}}
```
- Port: CSS `clip-path`/overflow-hidden wrapper, two keyframes, `cubic-bezier(.5,0,0,1) .8s`.

- Noise: React DOM event tables (es2022/react-dom.mjs L1015-1192), parse-*.js preload/stylesheet loader (L528-6661), popstate tracking (web_tracking_compliance L30-55), keyboard/wheel maps. Smooth scroll: native.

---

## 2. poltronafrau (https://www.poltronafrau.com/it/it.html)

Device-code is mostly three.js / camera-controls / Swiper / GTM. One real interaction found in the slices, plus CSS carousel (digest-only).

**P1. Toast drag-to-dismiss** — a notification card can be dragged sideways; past a threshold it closes, otherwise it springs back.
- Mechanism: pointerdown/touchstart sets `canDrag`, start x/y → document move updates `delta` and translates the node → pointerup: if `|delta| > removalDistance` close, else snap back via CSS transition. Hover pauses timer (`pauseOnHover`).
- Params: snap-back `transition: transform 0.2s, opacity 0.2s`; threshold = `removalDistance` (value **unclear**, not in slice).
- Excerpt ([slice: clientlib-site.ACSHASH01c… L47898-47943], hit L47902; verbatim):
```js
        if (o3.canDrag && o3.didMove && t4) {
          if (o3.canDrag = false, Math.abs(o3.delta) > o3.removalDistance) return i3(true), void e3.closeToast();
          t4.style.transition = "transform 0.2s, opacity 0.2s", t4.style.transform = `translate${e3.draggableDirection}(0)`, t4.style.opacity = "1";
```
- Port: framer-motion `drag="x"` + `onDragEnd` threshold, or GSAP Draggable; snap back with `duration:0.2`.
- Caveat: generic toast component, not a brand-specific device.

**P2. Carousel shift (CSS, digest-only)** — slide track translate on load.
- Params: `translate3d 0→-1440px`, 300ms, ease `cubic-bezier(.4,0,.2,1)` default by count (dig:L12, dig:L5). No slice exists; source not verified in code.

- Noise: three.js equirect cubemap / ShaderMaterial (L3142-3356, L6742-6782: no canvas at runtime, specs:§2), camera-controls wheel/dolly (L23126-23210, library), AR button (L25221-25268), Swiper touch attach (L10264), input-mask formatters (L4264, L23888, L47207), beacon/GTM.

---

## 3. peppa (https://www.peppasauce.love/)

Real motion is **Webflow IX2 config** (source.js.txt L44, minified JSON; device-code.md has no cursor/star slice) plus one JS swipe detector. Lottie/bodymovin is the frame-sequence noise.

**Q1. Star spin, scroll-linked** — stars rotate with scroll; on load they spin fast.
- Mechanism: IX2 `SCROLLING_IN_VIEW` event (e-5) → continuous action group a-4 "spin star" → `SCROLL_PROGRESS` 0→100 → `TRANSFORM_ROTATE` z 0→720deg. Smoothing 50.
- Load spin (digest-only): `img.star` rotate 360→719.96, 200ms, cubic-bezier(.075,.82,.165,1), ×74 (dig:L18).
- Excerpt (source.js.txt L44, verbatim fragments from ix2 JSON):
```json
"a-4":{"id":"a-4","title":"spin star","continuousParameterGroups":[{"id":"a-4-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-4-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true, ...
"keyframe":100 ... "zValue":720 ... "config":[{"continuousParameterGroupId":"a-4-p","smoothing":50
```
- Port: ScrollTrigger `scrub: 0.5` (smoothing ~50 ≈ scrub), `rotation: 0→720` on the star.

**Q2. Cursor follower + reveal** — a hover-revealed cursor bubble that follows the mouse.
- Mechanism: `MOUSE_OVER` (e-50, e-52…) → GENERAL_START a-11 "Cursor-Reveal" → `.cursor` scale 0→1. Mouse X/Y continuous group a-10 "move-cursor" → `.cursor.move` translate between ±50vw.
- Params: IX2 reveal scale easing `[0.86,0,0.07,1]`, 700ms. Move duration in IX2 = 500ms, easing "". Digest-measured follow = 750ms expo.out, -5→-50 (dig:L38-45). **Conflict**: runtime measure (750ms expo.out) vs IX2 config (500ms, empty easing). Runtime measure is what the user sees; IX2 config may be overridden at runtime. Unclear which governs.
- Excerpt (source.js.txt L44, a-11 verbatim fragment):
```json
"a-11":{"id":"a-11","title":"Cursor-Reveal","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".cursor", ... "xValue":0,"yValue":0,"locked":true}}]},{"actionItems":[{"id":"a-11-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":[0.86,0,0.07,1],"duration":700,
```
- Port: `gsap.quickTo('.cursor', {x, y, duration:.75, ease:'expo.out'})` on pointermove; `gsap.to('.cursor', {scale:1, duration:.7, ease:'power2.inOut'})` on hover (match easing `cubic-bezier(.86,0,.07,1)` via CSS if preferred).

**Q3. Swipe detector** — horizontal touch/mouse swipe fires a `swipe` event with direction.
- Mechanism: touchstart/mousedown records x → move computes dx; when `|dx| > threshold` emit `swipe` `{direction}` and stop tracking (`u()`). Threshold = `min(round(0.04·innerWidth), 40)` px.
- Excerpt ([slice: js/mama-joyce-peppa-sauce.js L9744-9769], hit L9766, verbatim):
```js
      var n2, i2, a = false, s = false, o = Math.min(Math.round(0.04 * window.innerWidth), 40);
          var n3 = e4.touches, h2 = n3 ? n3[0].clientX : e4.clientX, l2 = h2 - i2;
          i2 = h2, Math.abs(l2) > o && r2 && "" === String(r2()) && (!(function(e5, r3, n4) {
```
- Port: `useDrag` (pointer capture) with `Math.min(0.04*innerWidth, 40)` threshold, emit onSwipe.

- Noise: lottie bezier-length + ImagePreloader (L4169-5034), canvas 2d (lottie renderer), webflow tram/ix2 runtime (library), marquee (`.scrolling-text`, digest-only load tween 300ms power4.out, dig:L12-15, not verified in code).

---

## 4. vana (https://vana.org/)

One real device (CSS). Rest is Next/Turbopack/React noise.

**V1. Settle reveal (CSS)** — content fades up 16px on mount.
- Mechanism: element mounts with `.reveal` class → keyframe `settleUp` runs once; `prefers-reduced-motion` kills it.
- Params: ease `--ease-standard: cubic-bezier(.2, 0, 0, 1)`; duration **unclear** (not captured, specs:§4); element **unclear**.
- Excerpt (source.css L2, verbatim from grep):
```css
@keyframes settleUp{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}
--ease-standard:cubic-bezier(.2, 0, 0, 1)
```
- Port: `.reveal{animation:settleUp .6s var(--ease-standard) both}` (duration inferred), wrap in `@media (prefers-reduced-motion:reduce)`.

- Noise: Turbopack chunk loader (14bzl6qv… L382-385, turbopack-08 L309-368), React keyboard/wheel/page-transition maps (3mxqm L1146-7311), App Router history sync (L5666-5675, L7719-7726), IntersectionObserver rootMargin 200px = Next link prefetch (1zboaohv L2846). Hero is a 2MB webm (dig:L14), not a device.

---

## 5. pienso (https://pienso.com/)

Real devices are in the 3D runtime chunk (80507811…js, SPE-style event system, likely Spline runtime — **unclear**, no name in slices). WebGL canvases start at 18.8s (specs:§5). Shader list in shaders.glsl (50 shaders, digest:L5).

**S1. Camera drag-orbit with damped follow** — drag rotates the camera; motion eases out after release.
- Mechanism: pointerdown (firstPointerId) → pointermove on ownerDocument → `eulerDelta.y = -dx * mouseOrbitSensitivity` (gated by `uj && uG < 15.5 && !uV`) → per-frame lerp toward target using `lerpFactorPosStart/End`.
- Params: `lerpFactorPosStart = 1 - 0.02^(1/(delayPos[0]·60))`, default delayPos 0.3s → per-frame retain 0.805, lerp 0.195 at 60fps (98% converged in 0.3s). `mouseOrbitSensitivity` **unclear** (truncated in slice).
- Excerpt ([slice: chunks/80507811 L31991-32052], hit L31994, verbatim fragment, slice-truncated at end):
```js
        this.lerpFactorPosStart = 1 - 0.02 ** (1 / ((null !== (y10 = i10.delayPos[0]) && void 0 !== y10 ? y10 : 0.3) * 60)),
        "mouse" === e11.pointerType && "keys" !== this.rotBy && (uj && uG < 15.5 && !uV ? (this.eulerDelta.y = -t11 * this.mouseOrbitSensitivity, this.eulerDelta.x = -i11 * t
```
- Port: R3F `useFrame` with `damp(current, target, 4, dt)` (1-exp(-λdt)); keep `λ ≈ -ln(0.02)/0.3 ≈ 13` for 0.3s-to-98%.

**S2. Timeline reveal** — staggered scene tweens built into one timeline, rebuilt on resume.
- Mechanism: `buildTimeline()` → iterate tweens → each `add(params, duration + delay)` → `timeline.duration += endDelay` → pause previous action.
- Params: `startOnceDelay: 0` on the first tween when already started; delay/endDelay from config (values **unclear**, not in slice). Timeline library name **unclear**.
- Excerpt ([slice: chunks/80507811 L31292-31322], hit L31297, verbatim lines 576-578):
```js
            -1 !== c10 && s11 === t11 && Object.assign(h11.params, { startOnceDelay: 0 }), this.tweens[s11] = h11, this.timeline.add(h11.params, this.timeline.duration + (s11 === t11 ? e11.delay : 0));
          }
          this.timeline.duration += e11.endDelay;
```
- Port: one GSAP `gsap.timeline()` per scene; `tl.add(..., '+=delay')`; rebuild on resize.

**S3. Object hover / drag / scroll gating** — hover, drag and wheel events are routed to scene objects; wheel only listens while the scene is in view.
- Mechanism: connect() registers `pointerdown/move/up` on the canvas (DragDrop) and `pointerenter`-style MouseHover objects; `IntersectionObserver` sets `isInview`; `wheel` is only bound when Scroll events exist.
- Excerpt ([slice: chunks/80507811 L33118-33148], hit L33138, verbatim):
```js
      this.intersectionObserver = new IntersectionObserver((e11) => {
        let t11 = e11[0];
        t11 && (this.isInview = t11.isIntersecting);
      }, { root: null }), this.intersectionObserver.observe(this.eventContext.domElement),
```
- Port: `useInView` + pointer handlers on the R3F canvas; only attach `wheel` when in view.

**S4. Audio fade-out** — sound fades to 0 over 1s, optionally after a delay.
- Mechanism: `fade(delay, dur=1000)` → if delay: `setTimeout` then `sound.fade(volume, 0, dur)`; else immediate.
- Excerpt ([slice: chunks/80507811 L22230-22235], hit L22233, verbatim):
```js
    fade(e10) {
      let t10 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
      e10 ? (this.sound.volume(this._volume), this.clearFade(), this.fadeTimerId = window.setTimeout(() => {
        this.sound.fade(this._volume, 0, t10), this.clearFade();
```
- Port: Howler `howl.fade(vol, 0, 1000)`, cancel timer on re-entry.

**S5. Depth-of-field kernel** — bokeh/CoC post pass; kernel precomputed.
- Mechanism: `generateKernel()` fills 80 sample taps (Float32Array 128) → shader samples `inputBuffer`/`cocBuffer` with scale uniform. Active on the hero: **unclear** (no runtime proof of the pass running).
- Excerpt ([slice: chunks/80507811 L23910-23950], hit L23925, verbatim lines 556-558):
```js
    generateKernel() {
      let e10 = new Float32Array(128), t10 = new Float32Array(32), i10 = 0, r10 = 0;
      for (let s11 = 0; s11 < 80; ++s11) {
```
- Port: keep as a `postprocessing` DOF `BokehEffect` in R3F, or drop if unclear.

- Noise: next/image loader (L114-122), video hero state machine (mux `onPlaying/onWaiting`, L127-187: real but generic), React/event tables (L4636-4931, L5149-5274), scheduler (L1008-1022), history wrap (L142-165), three.js math `damp`/`lerp` (L666-907), cookie banner slide 250ms cubic-bezier(.19,1,.22,1) (specs:§5, js:923, not in slices).

---

## 6. gcloud (https://cloud.google.com/infrastructure)

Mostly Google loader/closure noise. Real: viewport reveal and the progress bar.

**C1. Viewport reveal (card)** — content flags as visible once it is half in view (or 25% / 50px on small screens).
- Mechanism: IntersectionObserver on the card element → when ≥25% visible (or ≥50px on viewport <900px) → set attribute `XTLgCe` and unobserve. Threshold array has 21 steps.
- Params: `threshold: 0.5`, `rootMargin 0px` for the `.dGHBmb` element (L9301-9308); `intersectionRatio >= 0.25 || (height/viewport >= 0.25 || viewport < 900 && height >= 50)` (L11241-11255).
- Excerpt ([slice: dti=1/m=ws9Tlc… L9301-9308], hit L9303, verbatim):
```js
        c && (a.j = new IntersectionObserver((d) => {
          d.forEach((e) => {
            _.Zk(b, "XTLgCe", e.isIntersecting);
          });
        }, { rootMargin: "0px", threshold: 0.5 }), a.j.observe(c));
```
- Port: `IntersectionObserver` hook setting `data-visible`, CSS `transition: opacity .5s, transform .5s`.

**C2. Card fade-up (CSS, partly unverified)** — two cards fade up together at 600ms.
- Params (digest-only): fadeInFromBottom translateY 32→0 + opacity 0→1, 500ms, ease-out, delay 600ms, both cards same t (dig:L12-13). Keyframe text **not located** verbatim in source.css (grep miss); treat as unclear beyond the digest.

**C3. Progress bar (CSS)** — indeterminate loader bar.
- Excerpt (source.css, verbatim from grep):
```css
@keyframes progressmove{0%{margin-left:-100%}to{margin-left:100%}
```
- Params: 1.5s linear infinite (css:1252, specs:§6). Port: `@keyframes` on a `margin-left`/`translateX` bar.

- Noise: Google loader modules (L7289-11775), closure positioning (raf-lerp label, L4189-4251 = offsetParent math), keyboard/focus (L1022-1728), history popstate (L22040-22128), gapi mousemove (L5974). Smooth scroll: native.

---

## 7. telekom (https://www.telekom.de/start)

Two carousel systems. The "snap carousel" is Flickity physics (JS, rAF). Swiper is the second carousel (touch + grab + lazy IO).

**T1. Snap carousel (Flickity physics)** — slides spring to the nearest cell center; drag is damped and throws with momentum.
- Mechanism: pointer drag sets `dragX` / `isPointerDown` → rAF loop `animate()` → `applyDragForce` (pull to `dragX`) → `applySelectedAttraction` (pull to `-selectedSlide.target`) → `integratePhysics` (x += velocity; velocity *= 1 − friction) → `positionSlider` writes `translate` px → `settle` stops when rest ≥ 3 frames.
- Params: `friction: 0.28`, `freeScrollFriction: 0.075`, `cellAlign: "center"`, rest threshold `restingFrames > 2`. `selectedAttraction` **unclear** (truncated in slice). Per-frame velocity retain 0.72 (snap) / 0.925 (free scroll).
- Excerpt ([slice: 379488/entertainment.all.min.js L2398-2445], hit L2417, verbatim):
```js
  }, animate: function() {
    this.applyDragForce(), this.applySelectedAttraction();
    var t2, e = this.x;
    this.integratePhysics(), this.positionSlider(), this.settle(e), this.isAnimating && (t2 = this, n(function() {
      t2.animate();
    }));
  } }
```
- Defaults ([slice: 379488/entertainment.all.min.js L2459-2464], hit L2459, verbatim fragment, truncated):
```js
l.defaults = { accessibility: true, cellAlign: "center", freeScrollFriction: 0.075, friction: 0.28, namespaceJQueryEvents: true, percentPosit
```
- Port: Embla or Swiper `slidesToScroll`, or GSAP `inertia`/`snap` on a track; keep friction 0.28 / free 0.075 if matching feel.
- Caveat: **unclear** whether this instance is mounted on /start (library present in bundle; the captured run's carousel tween matched Swiper, see T2).

**T2. Swiper track + grab cursor + lazy reveal** — horizontal slides with scroll-snap, grab cursor on desktop, and IO-triggered load.
- Mechanism: attachEvents picks pointer events when `!touch && pointerEvents`, else touch; `grabCursor` sets `cursor: grab/grabbing` on desktop; `IntersectionObserver` with `rootMargin` loads each slide once then unobserves.
- Params: slide track translate3d -1368px→0, 800ms, ease (kf linear) (dig:L12); CSS `scroll-snap-type: x mandatory` (css:11, specs:§7); IO `rootMargin` = `${r3}px 0%`; UI transitions `cubic-bezier(.215,.61,.355,1)` 200ms (dig:L9).
- Excerpt ([slice: start/startseite.js?v=6523f94c L1529-1542], hit L1539, verbatim):
```js
      if (!o2.touch && o2.pointerEvents) r2.addEventListener(a2.start, e3.onTouchStart, false), t3.addEventListener(a2.move, e3.onTouchMove, l2), t3.addEventListener(a2.end, e3.onTouchEnd, false);
```
- Excerpt ([slice: start/startseite.js?v=6523f94c L1610-1616], hit L1614, verbatim, first line only):
```js
      if (!(t3.support.touch || !t3.params.simulateTouch || t3.params.watchOverflow && t3.isLocked || t3.params.cssMode)) {
```
- Excerpt ([slice: start/startseite.js?v=6523f94c L2345-2354], hit L2345, verbatim):
```js
              if (e5.isIntersecting || e5.intersectionRatio) {
                  var r4 = e5.target;
                  Gn(r4, t3, n3, a3), u3.unobserve(r4), 0 === c3.filter((function(e6) {
```
- Port: Swiper `slidesPerView:'auto'`, `freeMode` off, `grabCursor:true`, `lazy:true`; or CSS scroll-snap + IntersectionObserver for lazy images.

- Noise: footer focus trap / keyboard (584608/footer.js L10-81), footer.js touch-slider pointer (L214-219, legacy), React/ess-redesign event tables (L1359-1832), text-split hex helper (L346-351), Lottie keyframe interpolation (index-34905293 L2220-2272, mislabeled raf-lerp; Lottie bezier, not a brand device), utag teaser visibility (L3571, analytics), pollhero survey widget (L87-1626), trackpoint entropy (L1453).
