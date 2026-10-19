# device-teardown-D: how each site's devices work

Sources: `forensics/<slug>/device-code.md` (slices, primary). `SRC` = `forensics/<slug>/source.js.txt` (same site, cross-check only, not a device slice). `DIG` = `motion-digest.md`. `SPEC` = `specs-D.md`. Excerpts are verbatim slice text, indentation normalized. Slice refs are `device-code.md` line numbers.

---

## teletech

### 1. Persistent audio player (scrubber + volume steps)
- **What the user sees:** bottom track bar. Drag the progress bar to seek. Volume up, down, mute, half, full buttons.
- **Mechanism:** mousedown/touchstart on progress wrapper sets `isDragging`, scrubs, then binds document move to scrub. mouseup/touchend unbinds and commits `audio.currentTime`. Audio `play`/`pause` fire `audioPlayerPlay`/`audioPlayerPause` on `document` (jQuery). No listener for these found in the bundle, so whether the player persists across barba navigation is **unclear**.
- **Params:** `preload='none'`, `volume=1` default, volume step ±0.1 (SRC L1493). Commit on mouseup, no easing.
- **Excerpt:** pointer, `ttaudioplayer.js L306-319` (device-code L333-340)
```js
self.$progressBarWrapper.on("mousedown touchstart", function(event) {
  event.preventDefault();
  if (self.audio.readyState === 0) return false;
  self.isDragging = true;
  self.scrubSong(event);
  $(document2).on("mousemove.trueAudioPlayer touchmove.trueAudioPlayer", function(event2) {
    self.scrubSong(event2);
  });
```
- **Port:** one `<audio>` mounted outside the router outlet, state in a Zustand store. Scrub with pointer capture on the bar and write `currentTime` on pointerup.

### 2. Nav reveal (clip-path wipe on load)
- **What the user sees:** main nav items wipe up from below on load, staggered.
- **Mechanism:** CSS transition or WAAPI on `a.main-nav-item` at load+600ms. **No nav device slice exists**, so this rests on DIG and SPEC only.
- **Params:** DIG: `clip-path inset(67.56%)→inset(0%)`, 200ms, ease, delay 0 (load@600). SPEC: second pass at 1855ms, y 10→0, 250ms `expo.inOut`, stagger ~100ms. **Conflict** between DIG (CSS 200ms) and SPEC (expo 250ms). Which runs is **unclear**.
- **Excerpt:** DIG, motion-digest.md, GSAP calls list
```
set(a.main-nav-item) [{"clipPath":"inset(100% 0 0 0)"}]
```
- **Port:** `.main-nav-item{clip-path:inset(100% 0 0 0)}`, then `gsap.to(items,{clipPath:'inset(0% 0 0 0)',duration:.2,stagger:.1,delay:.6})`.

### 3. 3D orbit viewer (drag orbit, wheel dolly)
- **What the user sees:** 3D model panel. Drag to orbit, wheel to zoom.
- **Mechanism:** pointerdown sets pointer capture and binds move, which rotates. Wheel calls `dollyIn`/`dollyOut(getZoomScale())` then `scope.update()`. Pan uses `2*deltaY*targetDistance/clientHeight` for perspective.
- **Params:** `getZoomScale()` value is **unclear** (not in slice). Wheel sign picks direction. No smoothing on wheel.
- **Excerpt:** wheel-step, `OrbitControls.js L307-314` (device-code L303-310)
```js
function handleMouseWheel(event) {
  if (event.deltaY < 0) {
    dollyIn(getZoomScale());
  } else if (event.deltaY > 0) {
    dollyOut(getZoomScale());
  }
  scope.update();
}
```
- **Port:** R3F `<OrbitControls enableDamping />`. Add damping if the page wants a glide.

- **Smooth scroll:** no slice. SRC lib uses `1-Math.exp(-60*lerp*dt)` with default lerp .1. DIG measured .143/frame. **Conflict**, so treated as **unclear**.
- **Noise:** Webflow focus-visible, dropdown, file upload, tap plugin, GLTF specular shim (shader-uniforms).

---

## marseille

### 1. Preloader (asset chain, intro gate, odometer count)
- **What the user sees:** a count-up number runs to 100%, then the intro reveals.
- **Mechanism:** `SoundManager.init` loads the `intro` Howl. Its load event emits `preloaded`. Asset loading is a recursive `preload(list, done)` that shifts one file, loads it, then recurses. Progress comes from `onProgress`, which emits `t/total`.
- **Gate:** the listener on `preloaded` is an empty `function(){}` (SRC), so the count is **not** gated on audio.
- **Params:** DIG: `Preload-numbers` scale .7→1.2 over 8650ms linear. Odometer ribbon translateY 0→-100% over 100ms. SPEC: post-scroll reveal delays 1000 / 1100 / 1200ms, 1000ms, `cubic-bezier(.16,1,.3,1)`.
- **Excerpt:** loader, `app.adf311ea.js L1116-1125` (device-code L219-225)
```js
}], [{ key: "preload", value: function(e3, t3) {
  var i2 = e3.shift(), o2 = "/";
  fn["a"].load(o2 + i2, (function(o3, a2) {
    if (o3) ;
    else {
      if (gn[i2] = a2, e3.length > 0) return n2.preload(e3, t3);
      t3 && t3();
```
- **Port:** `async` loop over assets setting `progress`. Start the intro when `progress===1`. Odometer is CSS digit translate.

### 2. Howler audio state machine (map loop, pin FX, 360 ambience)
- **What the user sees:** map drone, pin hover/out ticks, per-scene 360 ambience, global mute.
- **Mechanism:** route handlers call static methods. `map(true)` runs `pano360(false)` then `playSound('map_loop', loop)`. `pano360` stops every sound, then plays `pano_loop_<name>`. `stopSound` fades out over 2000ms, then calls `stop()` on a timer.
- **Params:** volumes: intro .5, map_loop .5 (loop), pin_over/out .7, pano_loop .5 (loop). `playSound` fade-in 2000ms. `stopSound` fade-out 2000ms. WebAudio gain ramps inside the vendor Howl `fade`.
- **Quirk:** `goto360` and `gotoMap` both play or stop the same `"goto360"` sound (device-code L53-58).
- **Excerpt:** audio, `app.adf311ea.js L217-275` (device-code L21-29)
```js
} }, { key: "playSound", value: function(e3) {
  var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  B[e3] && (B[e3].timer && clearTimeout(B[e3].timer), B[e3].audio.play(), t3 && B[e3].audio.fade(0, B[e3].volume, 2e3));
} }, { key: "stopSound", value: function(e3) {
  if (B[e3]) {
    var t3 = 2;
    B[e3].audio.fade(B[e3].volume, 0, 1e3 * t3), B[e3].timer = setTimeout((function() {
      B[e3].audio.stop();
    }), 1e3 * t3);
```
- **Port:** Howler map plus `gsap.to(howl,{volume:0,duration:2,onComplete:()=>howl.stop()})`. One AudioContext.

### 3. Pano drag camera (eased heading and pitch)
- **What the user sees:** drag inside 360 scenes. Motion eases out after release. Pitch is clamped.
- **Mechanism:** Hammer pan sets a target heading and pitch from the drag delta. Every rAF, `update()` moves heading and pitch 10% toward target. `updateHeadingPitch` clamps pitch, then moves the camera target by `camera_damping`.
- **Params:** lerp 0.1 per frame on both axes. Drag scale `Dn = jt.pano.camera_rotation_speed` (config value **unclear**). Pitch clamp ±90 in move. Config `min/max_polar_angle`, `camera_fov` (not in slice).
- **Excerpt:** `app.adf311ea.js L1126-1164` (label says wheel-step, but this is the pano drag). device-code L245 and L250-251
```js
requestAnimationFrame(this.update.bind(this)), Mn += 0.1 * (Tn - Mn), En += 0.1 * (Pn - En), this.updateHeadingPitch();
...
} }, { key: "onMoveHandler", value: function(e3) {
  _n && (Cn.x += e3.deltaX, Cn.y += e3.deltaY, Cn.x *= 0.25, Cn.y *= 0.25, Tn = -(On.x - e3.center.x) * (Dn / this.zoom) + Ln, Pn = (e3.center.y - On.y) * (Dn / this.zoom) + zn, Pn = Math.min(90, Math.max(-90, Pn)));
```
- **Port:** store target heading and pitch in refs. Each frame: `h += (target-h)*0.1`, then set the camera look-at.
- **Map travel (SRC, not a slice):** GSAP `to(this,{time:1,ease:easeNone,duration 25s default})`. Lookahead 0.094. Camera x/z lerp factor 0.05. Min distance 750 + time·maxDist·0.3. Controls are disabled during flight.
- **Pin label:** `hover_title` label scale `max(0.5, 1.5 - (d-min)/(max-min)*1.5)` (device-code L461-471, reveal-timeline). Truncated, so use is **partial**.
- **Noise:** Vue/i18n, `Hammer` boilerplate, and Three.js `OrbitControls` shims (rest of wheel-step).

---

## gataperduda

### 1. Custom cursor glide (lerped SVG cursor, grows on links)
- **What the user sees:** a circle cursor trails the pointer. It grows over links and shrinks off them. On touch it fades in and out.
- **Mechanism:** pointermove writes a target `{x,y}`. Each rAF `render()` sets `previous = (1-amt)*previous + amt*current` for `tx`, `ty`, `radius`, then writes `translateX/Y`. `enter()` sets radius 60, `leave()` sets 30. Links get enter/leave on mount, and the cursor rebinds on `after-page-enter`.
- **Params:** `tx`/`ty` `amt` = **0.08** (pointer), or **0.6** when flag `e` is true. Flag `e = Object(m.d)()` is the same helper that sets `isInstallationMode` (inferred, so treat as installation/touch mode). Radius `amt` 0.1. Touchstart fade-in 0.5s `Power3.easeOut` opacity 1. Touchend fade-out 0.5s. Pointermove re-anchor fade 0.9s. DIG: `svg.cursor` hover glide y 571→649 over 2600ms `css ease`. y 612→990 over 2700ms `power3.inOut` (**compound, unclear**).
- **Excerpt:** pointer, `_nuxt/2521c0a.js L175-221` (device-code L120-124)
```js
} }, { key: "enter", value: function() {
  this.renderedStyles.radius.current = 60;
} }, { key: "leave", value: function() {
  this.renderedStyles.radius.current = 30;
} }]);
```
  Lerp line (SRC L16): `this.renderedStyles[o].previous=(a=this.renderedStyles[o].previous,b=this.renderedStyles[o].current,(1-(e=this.renderedStyles[o].amt))*a+e*b)`
- **Port:** `useRef` + rAF. `x += (tx-x)*0.08`, or radius via CSS var. Use `pointer:coarse` to switch to 0.6.

### 2. Installation-mode idle timers (kiosk reset)
- **What the user sees:** in kiosk mode, after the last touch: 20s sets short-inactive. 180s returns to `/`.
- **Mechanism:** touchstart clears both timers. touchend with 0 touches arms them. At 20s it commits `isShortInactive=true`. At 180s it posts `"isLongInactive"` and calls `router.replace("/")`. Gated by `isInstallationMode`.
- **Params:** 2e4 ms (20s) and 18e4 ms (180s).
- **Excerpt:** audio mounted, `_nuxt/2521c0a.js L75-110` (device-code L60-64)
```js
window.addEventListener("touchend", (function(o3) {
  0 === o3.touches.length && (n2 = setTimeout((function() {
    window.postMessage("isLongInactive"), e2.$router.replace("/");
  }), 18e4), r2 = setTimeout((function() {
    e2.$store.commit("isShortInactive", true);
  }), 2e4));
```
- **Port:** `useIdleTimer` hook, `window` touch listeners, `navigate('/')` at 180s.

### 3. Ambient bed and idle-loop crossfader (Howler)
- **What the user sees:** a drone plays on all pages, louder on the map. An idle loop crossfades into a copy of itself near its end.
- **Mechanism:** `soundAmbience` autoplays at volume 0. On first play it fades to 1 (map) or .5. A `$route` watcher fades it to 1 (map) or .5. Two idle Howls share one `setInterval(500)`. When `seek >= duration-10`, the current one fades out, swaps, and the other fades in.
- **Params:** first play fade 3000ms. Route change fade 2000ms. Idle crossfade 5000ms out and 5000ms in. Poll 500ms. Map test is `route.name.includes("mapa")`.
- **Excerpt:** audio, `_nuxt/2521c0a.js L75-110` (device-code L76-79)
```js
setInterval((function() {
  !l2 && "loaded" === o2.state() && o2.seek() >= o2.duration() - 10 && (console.log("starting fade"), l2 = true, o2.fade(e2.activeIdleSound.volume(), 0, 5e3), o2.once("fade", (function() {
    console.log("faded out"), o2.stop();
  })), e2.activeIdleSound = t2, t2.play(), v(e2.$route) ? (t2.fade(0, 1, 5e3), t2.once("fade", (function() {
```
- **Port:** two Howls plus a `useEffect` interval. Fade with `howl.fade()` or GSAP on `volume`.

- **Map and places/people nodes:** only Mapbox GL internals appear in slices (zoom/pitch/bearing defaults, `setCenter`, `flyTo`). No app camera config and no node component. **Unclear**.
- **Scroll:** Locomotive lib default `lerp:.1` (SRC). SPEC says `.035` on `[data-scroll-container]`, but the instance options are truncated in the slice. **Unclear**.
- **Noise:** beacon, Fathom SPA hook, Nuxt async loader, punycode (raf-lerp), Mapbox tile internals.

---

## bleibtgleich

### 1. noise
All slices are analytics beacon and SPA history (device-code L4-27). No device. SPEC confirms 0 tweens, no canvas.

---

## the3key

### 1. Cursor (per-tick follow, hover and press states)
- **What the user sees:** a custom cursor. Over the hero image or tap button it changes. Press swaps to the active glyph. Hidden on touch.
- **Mechanism:** `mousemove` writes `o2.x/y`. A GSAP ticker each frame runs `a2.x += o2.x - a2.x`, which is a full follow (factor 1, **no lerp**), then `gsap.set`. Hover on `.flx-hero-main__image, .tap-btn` shows the element with duration 0. Mousedown and mouseup toggle `.cursor-default` and `.cursor-active`. `(hover:none)` removes it.
- **Params:** factor 1.0. Visibility and state swaps use duration 0. Probe: t63=61ms (cursor-probe.json via SPEC).
- **Conflict:** SPEC says the site uses `gsap.quickTo`. The only `quickTo` in SRC is GSAP's library definition. The slice is authoritative: direct per-tick assignment.
- **Excerpt:** pointer, `vanilla.min.js L4046-4075` (device-code L414-417)
```js
Kr.set(e2, { opacity: 0, visibility: "hidden", scale: 1, x: a2.x, y: a2.y }), Kr.set(n2, { opacity: 0 }), Kr.set(t2, { opacity: 1 }), Kr.ticker.add(function() {
  a2.x += o2.x - a2.x, a2.y += o2.y - a2.y, Kr.set(e2, a2);
}), window.addEventListener("mousemove", function(e3) {
  o2.x = e3.clientX, o2.y = e3.clientY;
```
- **Port:** `gsap.ticker` or rAF writing `transform`. For a glide, add `x += (mx-x)*0.2` (not in source).

### 2. Tilted overlapping notes (desktop stack, scrubbed)
- **What the user sees:** on desktop (min-width 1025px), cards stack and tilt as you scroll. Each card has a random tilt.
- **Mechanism:** `matchMedia` on `.overlapping-card`. Each inner tween gets `rotationZ = 10*(rand-0.5)`, which is fixed at setup. ScrollTrigger scrubs the card, and the wrapper is pinned.
- **Params:** tilt ±5°. Scale .7. `rotationX` 40. Ease `power1.in`. `scrub:true`. start `top 0%`, end `+=innerHeight`.
- **Reveal cards** (same file, `.flx-reveal-cards`): per-card rotation `-3*(n-1)/2` degrees, `power1.out`, scrub, pinned text.
- **Excerpt:** observer, `vanilla.min.js L3966-3976` (device-code L387-391)
```js
e2.add("(min-width: 1025px)", function() {
  var e3 = document.querySelectorAll(".flx-overlapping-cards .overlapping-card");
  if (e3.length) return e3.forEach(function(e4) {
    var t3 = e4.querySelector(".content-wrapper"), n3 = e4.querySelector(".overlapping-card__inner");
    Kr.to(n3, { rotationZ: 10 * (Math.random() - 0.5), scale: 0.7, rotationX: 40, ease: "power1.in", scrollTrigger: { pin: t3, trigger: e4, start: "top 0%", end: "+=" + window.innerHeight, scrub: true } }), Kr.to(n3,
```
- **Port:** `gsap.matchMedia()`. Set `rotationZ: gsap.utils.random(-5,5)` once per card. Pin and scrub with ScrollTrigger.

### 2. Scroll-scrubbed letter roll (horizontal, elastic)
- **What the user sees:** a horizontal text strip. Letters bounce and rotate into place as it scrolls.
- **Mechanism:** horizontal ScrollTrigger scrub. End is `+=scrollWidth - innerWidth - 0.3*innerHeight`. Each `.letter` starts at `yPercent 400*(rand-0.5)` and `rotation 60*(rand-0.5)`, then eases to 0 with `elastic.out(1.2,1)` between `left 90%` and `left 10%`.
- **Excerpt:** observer, `vanilla.min.js L3928-3941` (device-code L367-368)
```js
}, pin: true, pinSpacing: true, invalidateOnRefresh: true }), n3.forEach(function(e5) {
  Kr.from(e5, { yPercent: 400 * (Math.random() - 0.5), rotation: 60 * (Math.random() - 0.5), ease: "elastic.out(1.2, 1)", scrollTrigger: { trigger: e5, containerAnimation: i2, start: "left 90%", end: "left 10%",
```
- **Port:** Split letters into spans. Use `gsap.from` with `containerAnimation` for horizontal scrub.
- **Noise:** select2, jQuery mousewheel, Foundation accordion and tabs, lazyload, observer shims.

---

## analytical

### 1. Elementor mouse-position interaction
- **What the user sees:** elements shift with the pointer (Elementor mouse-move effect).
- **Mechanism:** window `mousemove` sets `mousePosition`. `run()` converts it to % of viewport: `x% = 100/innerWidth*x`, `y% = 100/innerHeight*y`. The callback fires only on change. **No lerp**.
- **Params:** range 0–100% per axis. Scroll-linked `--translateX/Y` CSS vars (SPEC) have no slice.
- **Excerpt:** pointer, `js/frontend.min.js?ver=4.2.3 L362-402` (device-code L429-434)
```js
run() {
  const e2 = MouseMoveInteraction.mousePosition, t2 = this.oldMousePosition;
  if (t2.x === e2.x && t2.y === e2.y) return;
  this.oldMousePosition = { x: e2.x, y: e2.y };
  const n2 = 100 / innerWidth * e2.x, s2 = 100 / innerHeight * e2.y;
  this.runCallback(n2, s2);
```
- **Port:** `pointermove` sets CSS vars `--mx`, `--my` as percents. Add a CSS transition if a glide is wanted.

### 2. Elementor scroll-percent interaction
- **What the user sees:** an effect keyed to how far an element has scrolled through the viewport.
- **Mechanism:** IntersectionObserver with thresholds generated from `sensitivity` (`0, 100/s, … 100`). The callback sends `scrollPercentage = |ratio*100|`, `isInViewport`, and direction from `boundingClientRect.y` vs the previous y.
- **Params:** threshold steps = 100/sensitivity. Start and end offsets in vh %.
- **Excerpt:** scroll, `js/frontend-modules.min.js?ver=4.2.4 L465-493` (device-code L345-348)
```js
return new IntersectionObserver(function handleIntersect(r3) {
  const n = r3[0].boundingClientRect.y, i = r3[0].isIntersecting, s = n < t2 ? "down" : "up", o = Math.abs(parseFloat((100 * r3[0].intersectionRatio).toFixed(2)));
  e2.callback({ sensitivity: e2.sensitivity, isInViewport: i, scrollPercentage: o, intersectionScrollDirection: s }), t2 = n;
}, r2);
```
- **Port:** IntersectionObserver with the same threshold array, then `setProgress`.
- **Noise:** Sentry breadcrumbs (page-transition), React synthetic-event tables (keyboard), Elementor lightbox and form loaders, punycode (raf-lerp), query-string filter pushState.

---

## sainturbain

### 1. Smooth scroll (lerp 0.135, dt-normalized rAF)
- **What the user sees:** wheel scroll eases toward its target.
- **Mechanism:** wheel handler stores deltas and sets `targetScroll`. `_onRAF` computes `dt = min(ceil((now-last)/nt*10)/10, 1)` and calls `scroll.raf(dt)`. While `isMouseWheeling`, `raf` sets `lastScroll = mt(lastScroll, targetScroll, lerp*dt)`, then `scrollTo`.
- **Params:** `lerp: 0.135` (device-code L387). `mt` is presumably `lerp(a,b,t)`, but its definition is not in the slice (**unclear**). `nt` is not in the slice either.
- **Excerpt:** raf-lerp, `app.fa8187d7bc9a8853efaa.bundle.js L7471-7534` (device-code L387, L393-395)
```js
this.scroll = new Dt({ lerp: 0.135 }), this.direction = new Bt(this.scroll), this.intersection = new ie(this.scroll), ...
if (this._started) {
  var n3 = performance.now(), r3 = this._lastTime ? Math.min(Math.ceil((n3 - this._lastTime) / nt * 10) / 10, 1) : 1;
  this._lastTime = n3, this.scroll.raf(r3), ...
```
- **Port:** `new Lenis({ lerp: 0.135 })`, or a GSAP ticker with `lerp` from `1 - Math.pow(1-0.135, dt)`.
- **Cross-check:** SPEC marked the .135 hit as unconfirmed. It is now confirmed by this slice.

### 2. Page transition (windmill link intercept, scale-out and slide-in timeline)
- **What the user sees:** click an internal link. The current page scales to 0.9 and fades to 0.5, and the next page slides in.
- **Mechanism:** a document click finds the closest `a`. `_checkPrevent` rejects modifier keys, `_blank`, and cross-origin links. It then runs `history.pushState` or `replaceState` (per `data-windmill-method`) and `_run`. The out-timeline is on the current container.
- **Params:** out: opacity → 0.5 `linear`, scale → 0.9, duration 766.67ms, `cubicBezier(0.20, 0.00, 0.23, 1.00)`. In: `translateY` on next container (value cut in slice).
- **Excerpt:** reveal-timeline, `app.fa8187d7bc9a8853efaa.bundle.js L7801-7808` (device-code L445-450)
```js
} }, { key: "enter", value: function(t3) {
  var e3 = t3.current, n3 = t3.next, r3 = this;
  return new Promise((function(t4) {
    i.d1.style.height = "".concat(i.d1.scrollHeight, "px"), n3.container.parentElement.style.overflow = "hidden", i.dy.style.removeProperty("cursor");
    var s2 = hi.timeline({ autoplay: false });
    s2.add({ targets: e3.container, opacity: { value: 0.5, easing: "linear" }, scale: 0.9, duration: 766.66666667, easing: "cubicBezier(0.20, 0.00, 0.23, 1.00)" }, 0), s2.add({ targets: n3.container, translateY: ["
```
- **Port:** a route-change hook (`AnimatePresence` or GSAP). Use `cubic-bezier(.2,0,.23,1)` at 0.77s.

### 3. Site nav overlay (body class, scroll lock and restore)
- **What the user sees:** the nav opens as an overlay. Escape or the trigger closes it, and scroll returns to where it was.
- **Mechanism:** trigger click or Escape calls `toggle()`. `open()` saves `scrollY`, adds `--js-site-nav-opened` to `<body>`, and sets `aria-expanded`. `close()` removes the class, runs `window.scrollTo(savedY)`, and on `transitionend` on `.site-nav__bg` it restarts `SiteScroll`.
- **Params:** no timing in slice. Restore uses `scrollY` saved at open.
- **Excerpt:** nav, `app.fa8187d7bc9a8853efaa.bundle.js L11753-11785` (device-code L596-599)
```js
} }, { key: "toggle", value: function() {
  true === this._opened ? this.close() : this.open();
} }, { key: "_handleTriggers", value: function(t3) {
  t3 && (t3.preventDefault(), t3.stopPropagation()), this.toggle();
} }, { key: "_handleKeyDown", value: function(t3) {
```
- **Port:** `useState(open)` plus `document.body.classList`. `window.scrollTo(saved)` on close. Keydown listener for Escape.

### 4. Project archive grid and list morph (archive page)
- **What the user sees:** switch between grid and list. The list shows only the items that fit the viewport.
- **Mechanism:** list click sets the grid to opacity .4, scale .9, translateY 10, 650ms `easeOutCubic`. Row height is chosen by breakpoint: width ≥1200 → 72px, ≥768 → 60px, else 46px. `filter(e3*n2 < viewportHeight)` limits the items that animate.
- **Excerpt:** archive, `app.fa8187d7bc9a8853efaa.bundle.js L10425-10460` (device-code L536-537)
```js
var e2, i2 = wt.height, n2 = (e2 = wt.width) >= 1200 ? Ns[2] : e2 >= 768 ? Ns[1] : Ns[0], r2 = this.listItems.filter((function(t4, e3) {
  return e3 * n2 < i2;
```
- **Port:** GSAP timeline on the two containers. Compute visible count with `Math.ceil(vh / rowH)`.
- **Noise:** Lottie loader worker (infra), `ImagePreloader` 50ms poll, jQuery-like event shim (keyboard), Swiper `grabCursor` (cursor-dom), mouseWheel custom-event shim.

---

## Cross-check: specs-D vs slices

1. the3key cursor: SPEC says `quickTo`. Slice shows per-tick assignment (factor 1). **Slice wins.**
2. sainturbain lerp .135: SPEC "unconfirmed" → **confirmed** (device-code L387).
3. gataperduda cursor lag: SPEC "unknown" → **0.08 pointer / 0.6 flagged** (SRC L16).
4. gataperduda scroll lerp: SPEC `.035` vs lib default `.1`, instance value truncated. **Unclear.**
5. teletech scroll lerp: DIG .143 vs SRC formula with default .1. **Unclear.**
6. teletech nav timing: DIG (CSS 200ms @600) vs SPEC (expo 250ms @1855). **Unclear.**
7. marseille preloader: `preloaded` has no gate (SRC). The SPEC timings come from DIG and are not contradicted.
8. Slice truncation: many slices end mid-expression (see gataperduda L116, teletech L1, the3key L391). Excerpts stop where the slice does.
