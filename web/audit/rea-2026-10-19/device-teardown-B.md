# device-teardown-B (7 sites)

Sources: forensics/<slug>/device-code.md (slices, cited "slice Lnn"), motion-digest.md, specs-B.md (cross-check only).
"grep src" = line from forensics/<slug>/source.js.txt or source.css, not in device-code slices (slice set missed it).
Slice set is mostly vendor (Howler, pixi, TweenMax/GSAP, lottie, Next.js, Sentry, video.js, knockout). Vendor = "noise", one line each.

---

## 1. onelastbeat

Noise: audio x3 (Howler), raf-lerp (sourcemap VLQ), loader x3 (resource loader), pointer (pixi a11y hook), shader x3 (pixi), reveal x3 (TweenMax). Only one JS tween in run (dig: #use-fking-headphones).

### D1. "BETTER WITH HEADPHONES" gate (timed, NOT click-to-start)
- User sees: full-screen overlay with headphones gif + "BETTER WITH HEADPHONES". Auto-dismisses.
- Mechanism: boot fades overlay in. start() computes wait = max(5 - elapsedSec, 0) (0 if debug). After wait: fade out, remove node, show("story"). No pointer/key gesture.
- Params: min display 5 s; fade 0.4 s in and out. Digest: fade-in at 1878 ms, power1.out 400 ms (rmse 0.011).
- Excerpt (grep src, source.js.txt L2007):
```
start:function(){h.init();var i=e.env.debug?0:5,n=((new Date).getTime()-this.startTime)/1e3,r=Math.max(i-n,0);t.to(this.dom.headphones,.4,{opacity:0,delay:r,onComplete:function(){this.dom.headphones.parentNode.removeChild(this.dom.headphones),this.hasClass(document.body,"main")&&this.show("story")}.bind(this)})}
```
- Audio gate verdict: no click gate. Whether Howl audio waits for a gesture: unclear (Howler vendor, no app gate in slices).
- Port: `gsap.to(el,{opacity:0,delay:Math.max(5-elapsed,0),duration:.4,onComplete:()=>{el.remove();setScene('story')}})` in useEffect. Do not add a click gate unless wanted.

### D2. Canvas button hit-test (cursor-dom)
- User sees: canvas buttons show pointer cursor on hover.
- Mechanism: mouse/touch -> canvas rect -> scale to canvas px -> point-in-polygon per button -> hovering[]; onHover fires on enter edge only; cursor set to pointer or default.
- Params: scale = canvas.width / rect.width. No timings.
- Excerpt (slice cursor-dom L12243-12260, hit L12259; [...] = elided):
```
    var e, i2, n = this.canvas.getBoundingClientRect(), r = this.canvas.width / n.width, s2 = this.canvas.height / n.height, o = false;
    [...]
    e = (e - n.left) * r, i2 = (i2 - n.top) * s2;
    [...]
    this.cursor && this.hovering.length ? this.canvas.style.cursor = this.cursor : this.canvas.style.cursor = "default";
```
- Port: onPointerMove on canvas, same scale math, or overlay real `<button>`s and use CSS :hover.

### D3. Keyboard demo ball + key sequence (keyboard)
- User sees: keycaps pop in one by one; in demo a ball hops key to key; real key press pulses the key. Numpad 96-105 maps to digits; space = "SPACE".
- Mechanism: show() scales keys 0->1 (stagger 0.1 s x i), container fades in. demoStep() every demoIntervalTime presses next key; ball left 0.1 s, top -30 (0.05 s) then -10 (0.05 s at 0.05 s). onKeyDown -> ref[key].onPress; strictSequence advances on match.
- Params: defaultDemoIntervalTime 300 ms; key pop 0.1 s, stagger 0.1 s; container in 0.5 s, out 0.3 s; press echo at +100 ms.
- Excerpt (slice keyboard L12564-12627, hit L12625):
```
  }, show: function() {
    this.demoIndex = this.strictSequence ? 0 : -1;
    for (var t2, i3 = 0; i3 < this.buttons.length; ++i3) t2 = this.buttons[i3].getDom(), e.from(t2, 0.1, { scaleX: 0, scaleY: 0, delay: 0.1 * i3 });
    e.set(this.container, { visibility: "visible" }), e.to(this.container, 0.5, { opacity: 1 }), this.visible = true;
```
- Port: keydown handler in React + GSAP `from` with stagger 0.1 and scale 0; demo ball = rAF-free GSAP `to` on left/top, 300 ms setInterval step.

### D4. Hover-enable with touch ghost lockout (watchforhover)
- User sees: hover styles only on non-touch; no sticky hover after tap.
- Mechanism: touchstart stamps lastTouchTime; enableHover adds class `has-hover` to body unless touch was < 500 ms ago; touch removes it and sets isTouch.
- Excerpt (slice pointer L11707-11722, hit L11711):
```
  enableHover: function() {
    /* @__PURE__ */ new Date() - this.lastTouchTime < 500 || this.hasHoverClass || (this.container.className += " " + this.className, this.hasHoverClass = true);
```
- Port: CSS `@media (hover:hover)` is simpler; keep 500 ms only if sticky hover bug seen.

Verdict: headphones gate = timed 5 s, not click. Keyboard demo + cursor-dom = real interaction devices.

---

## 2. yauch

Noise: loader x3 (Flow/AssetEvent), keyboard (knockout punches), reveal x3 (TweenLite/TimelineLite), raf-lerp nearest-point (L13592), page-transition (history polyfill L14255-14270), audio (createjs WebAudio plugin L16542-16605, lib), wheel-step (jQuery mousewheel L18310-18355, gsap Draggable L18254-18294).
Hover/cursor reveal timings (13169-16072 ms): digest/specs-B only, no slice; 4 of 6 eases linear rmse .24 = unknown.

### D1. Panorama look-at from pointer (PointerPositionManager)
- User sees: panorama pans toward cursor direction.
- Mechanism: window mousemove (capture) -> pixel offset from view center -> unit direction vector using camera projectionDistance -> dispatch CHANGE -> pan/tilt via directionRelativeToAbsolute (asin/atan math).
- Params: none numeric in slice; cursorEnabled toggles listeners.
- Excerpt (slice panorama/PointerPositionManager.js L14-48, hit L26, line 566):
```
    this._pointerDirection.x = o2 / a, this._pointerDirection.y = i2 / a, this._pointerDirection.z = r2 / a, this.dispatchEvent(new s.default(s.default.CHANGE));
```
- Port: store dir vector in ref; pass to panorama lib (pannellum/three) each frame.

### D2. Wheel zoom = FOV clamp (PanoramaManager)
- User sees: wheel zooms panorama FOV; zoom buttons disable at limits.
- Mechanism: wheel -> preventDefault -> skip if camera animating -> fov = clamp(fov - deltaY*deltaFactor/12, MIN, MAX); ULTRAZOOM special case; also dispatches synthetic keydown on document.
- Params: divisor 12; MIN_FOV/MAX_FOV values unclear (not in slice). deltaFactor normalized by jQuery mousewheel (noise).
- Excerpt (slice panorama/PanoramaManager.js L103-110, hit L107):
```
        var a2 = Math.max(m._MIN_FOV, Math.min(m._MAX_FOV, i2.camera.fov - t2.deltaY * t2.deltaFactor / 12));
```
- Port: onWheel -> setFov(clamp(fov - dy*factor/12, MIN, MAX)); preventDefault.

### D3. Gyro look (pano2vr gyro, bundled, app/bundle.js L13934-13990, hit L13942)
- User sees: on phones, tilting device pans view; touch pauses it.
- Mechanism: deviceorientation -> yaw/pitch (rad->deg). Touch (touchstart/end/cancel) sets isTouching; gyro acts only if not touching and >1000 ms since last touch. Near zenith/nadir (|pitch|>70) blend yaw toward compass alpha. First 10 frames (h=10) hard-set pan, then track deltas. Tilt damped 0.98 when adaptive offset on.
- Params: pitch threshold 70 deg; blend width 10 deg; lockout 1000 ms; warmup 10 frames; tilt damping 0.98.
- Excerpt (slice L13934-13990):
```
          o2 = o2 * (1 - (i3 = Math.min(1, (Math.abs(a2) - 70) / 10))) + s2 * i3;
```
```
      if (n2 && (d = e3.getTime()), !n2 && m && 1e3 < e3.getTime() - d) {
```
- Port: useEffect add deviceorientation listener; same 70/10/1000 constants as named consts; drive panorama pan/tilt.

### D4. Hotspot word rotation via SplitText (ButtonHotspot)
- User sees: hotspot label letters set absolute; words rotated by char count (static, no animation in slice).
- Mechanism: init() splits .text into words+chars; chars position absolute; words rotation = -10*(charCount+1) deg.
- Excerpt (slice text-split app/component/button-hotspot/ButtonHotspotController, L20880-20896, hit L20884):
```
    var t2 = this.element.getElementsByClassName("text"), e3 = new TimelineLite(), n2 = new SplitText(t2, { type: "words, chars", wordsClass: "word", charsClass: "char" }), i3 = n2.chars, r2 = n2.words;
    e3.set(i3, { position: "absolute" }), e3.set(r2, { rotation: -10 * (i3.length + 1) + "deg" });
```
- Port: split with SplitText or manual spans; apply inline transform rotate per word.

---

## 3. patronus

All slices noise: Next.js image config (chunks/3qbt L143-153), next-translate (0_7ovw L445-488), IntersectionObserver lib (1yb8 L123-133, 0h4w L508), GSAP core (2rpt, 18c6 lottie raf-lerp), focus-visible polyfill (1-kz0 L87-121), Next router (06xd L139-166, 0jx6 L5481-5490), Sentry breadcrumbs/session (23u0, 04t7), React event plugin (0jx6 L1420-1460), lottie modifiers (18c6 L1781-1821).

Devices: none real in slices. Digest/specs-B only (CSS keyframes, no JS): Header fadeIn (left -550->192 px, opacity), QuizQuestion clipIn + slideDown (translateY 50->0), Poll fillBackground, SearchInputMobile fadeInScaleUp. Durations: not measured -> unclear. ScrollTrigger.create: grep count only, wiring unclear.

Port: none from slices. Rebuild only after capturing CSS keyframes from source.css.

---

## 4. gallipoli

Noise: reveal x3 (TweenMax FgXoRb L635-739), loader x3 (TweenMax globals L691-721, L986-992), shader x3 (pixi filters L7591-7648), raf-lerp x3 (spine L9407-9449), keyboard x3 and pointer x3 (video.js L12128-12235, L12433, L12980-12992), wheel x1 is real (see D4).

### D1. Word-by-word quote reveal (IntroQuote)  [GSAP vendor slices absent; driver from grep src]
- User sees: quote words fade up one at a time; on exit words fade out at random delays.
- Mechanism: quote.split(" ") -> one div.quote-word per word, autoAlpha 0. animateIn -> Rotator.animateIn(words, {duration 1.8, stagger .1, yOffset 5, delay, ease Quad.easeOut}, done). animateOut: each word autoAlpha 0 over .7 s Linear.easeIn with random delay 0-0.4 s; done after delayedCall 1.3 s.
- Params (src): 1.8 s, stagger .1 (digest fit ~95-99 ms), yOffset 5, Quad = power1.out (digest rmse .001). Exit: .7 s, stagger ~8 ms (digest), random 0-0.4 s.
- Trigger: digest shows same cluster at load 12632 / hover 12833 / cursor 13632 / scroll 14833 ms. Caller not in slices -> trigger unclear.
- Expo.easeOut x183 in source conflicts with power1.out fit: unresolved. Utils/Rotator body not in slices: unclear.
- Excerpt (grep src, source.js.txt L1281; split):
```
this.words=quote.split(" "),this.wordElements=[],this.words.forEach(function(w){if("<br>"==w)this.append("<br>");else{var word=new SpookyEl('<div class="quote-word">'+w+"</div>");word.appendTo(this),this.wordElements.push(word),gsap.set(word,{autoAlpha:0})}}.bind(this))}
```
- Excerpt (grep src, source.js.txt L1281; anim):
```
animateIn:{value:function(delay,done){Rotator.animateIn(this.wordElements,{duration:1.8,stagger:.1,yOffset:5,delay:delay,ease:Quad.easeOut},done)}},animateOut:{value:function(delay,done){gsap.killTweensOf(this.wordElements),this.wordElements.forEach(function(w){var delay=.4*Math.random();gsap.to(w,.7,{autoAlpha:0,delay:delay,ease:Linear.easeIn})}),done&&gsap.delayedCall(1.3,done)}}}
```
- Port: split quote into spans; GSAP timeline `.to(words,{autoAlpha:1,y:0,duration:1.8,stagger:.095,ease:'power1.out'})`; exit `.to(words,{autoAlpha:0,duration:.7,stagger:{each:.008}})`; use yOffset 5 for y start.

### D2. Audio unlock on first gesture (NO click gate)
- User sees: nothing. Sound becomes allowed on first mousemove (desktop) or touchstart (touch).
- Mechanism: document listener mousemove|touchstart -> plays 1-sample silent buffer (noteOn(0)) -> dispatch "_internal:unlocked" -> deferred sound scheduler (grep src L1263 c.once("_internal:unlocked", g)) flushes. preListen = 30 ms.
- Excerpt (slice audio L15594-15617, hit L15610):
```
      function f(a2) {
        document.removeEventListener(a2.type, f, false);
        var c2 = b.require("context"), d2 = c2.createBufferSource();
        d2.buffer = c2.createBuffer(1, 100, 44100), d2.noteOn(0), b.dispatch("_internal:unlocked");
      }
      function h(b2) {
        return document.addEventListener(a.touch ? "touchstart" : "mousemove", f, false), g(new b2());
```
- Port: on first pointermove/touchstart call `ctx.resume()`; no overlay. Click-to-start is NOT present.

### D3. Sound fade on stop (audio engine, bundled lib)
- User sees: sounds fade out, not hard cut.
- Mechanism: play() schedules gain ramp in (fadeIn ms); stop(a) -> stops.schedule(a, fadeOut) -> clearAll ramps gain to 0 over ms then noteOff. Volume dB -> WA via dbToWAVolume.
- Params: fadeIn/fadeOut values unclear (set at runtime, not in slices).
- Excerpt (slice audio L15420-15473, hit L15423):
```
      } }, stop: { value: function(a2) {
        this.log("stop", a2), this.plays.cancel(), this.stops.cancel(), this.stops.schedule(a2, this.fadeOut);
```
- Port: GainNode with `linearRampToValueAtTime`; fade constants in config.

### D4. Map wheel + zoom-in camera (spooky map)
- User sees: wheel or buttons zoom from the globe-level to the map; minimap fades out.
- Mechanism: wheel deltaY>0 -> zoomOut else zoomIn. zoomIn: buttons disabled; blackBox y->50 (0.5 s Expo.easeOut); camera z minZ->0 over 1.2 s, delay .4 s, Expo.easeOut; onUpdate sets camera.x=y=125e4/(4e3-z)*4; mini autoAlpha 1->0, scale ->1.5, 0.6 s Expo.easeIn.
- Params: minScale = max(innerW,innerH)/2500/4; minZ = 4e3 - 1e3/minScale.
- Excerpt (slice L18952-18992, hit L18967):
```
        this.on("wheel", function(e2) {
          e2.deltaY > 0 ? that.zoomOut() : that.zoomIn();
        }), this.zoomOut(true);
```
```
        var minScale = Math.max(window.innerWidth, window.innerHeight) / 2500 / 4, minZ = 4e3 - 1e3 / minScale;
        TweenMax2.fromTo(this.camera, 1.2 * multiplier, { z: minZ, x: 2500 * minScale * 2, y: 2500 * minScale * 2 }, { z: 0, delay: 0.4 * multiplier, onUpdate: function() {
```
- Port: GSAP fromTo on a z-value object; onUpdate maps to camera x/y; same Expo eases.

### D5. Archive image pan on cursor (archive viewer, slice L17548-17588, hit L17563)
- User sees: zoomed image pans opposite the cursor; zoom cursor follows mouse, hidden within 40 px of edge.
- Mechanism: mousemove -> pan(): panX = -(x - W/2)/(W/2) * maxPanX; TweenMax to x/y 0.4 s Quad.easeOut (0 if noTween).
- Excerpt (slice L17548-17588):
```
          var length, panX = -(x - windowWidth / 2) / (windowWidth / 2) * this.image.maxPanX, panY = -(y - windowHeight / 2) / (windowHeight / 2) * this.image.maxPanY;
          length = noTween ? 0 : 0.4, TweenMax2.to(that.image, length, { x: panX, y: panY, ease: Quad.easeOut });
```
- Port: rAF-free: on mousemove compute target, gsap.to(img,{x,y,duration:.4,ease:'power1.out'}).

Archive button overlay (slice L17548, hit L17563): overlayDuration 0.3 s; clip wipe in 0.05 s; text width grows with delay .3 s, Expo.easeOut. Excerpt: `var overlayDuration = 0.3;`

---

## 5. moonsafari

Noise: loader x3 (TweenLite/CSSPlugin/Bezier L2383-2458; TimelineLite totalTime L296-307), observer x1 (lazyload lib L4466-4483), wheel-step/Draggable base (mapped in D1 only), text-split chars letter helper (see D4), reveal-timeline cascadeTo (L2636, GSAP vendor), page-transition (see D6).
Preloader fade (main-loader 1->0, 500 ms @4342) and team/page-content tweens: digest/specs-B only, no slice code -> unclear code.

### D1. Team strip wheel stepper with magnet snap (ag-team, wheel-step)
- User sees: wheel/drag spins a strip of portraits; it snaps to nearest portrait; page scroll at bottom.
- Mechanism: wheel listener -> deltaY accumulates (line-mode x40). rAF: deltaYI = getInertia(deltaY, deltaYI, 0.09) moves slider. Snap: _magnet tweens y to nearest step, 0.5 s Quart.easeInOut. Desktop wheel; mobile Draggable (maxDuration 0.8, throwProps). isBottom passes wheel to page.
- Params: ITEM_W 320 desktop / 240 mobile; MARGIN 30 / 20; inertia 0.09; snap 0.5 s Quart.easeInOut (= gsap power4.inOut).
- Excerpt (slice wheel-step L6444-6507, hit L6506):
```
    } }, { key: "_magnet", value: function() {
      for (var t3, e3 = 1 / 0, i3 = 1 / 0, n2 = 0; n2 < this.step.length; n2++) t3 = this.step[n2], Ri(t3 - this.y) < i3 && (i3 = Ri(t3 - this.y), e3 = t3);
      this.tw.scroll = TweenLite.to(this, 0.5, { y: e3, ease: Quart.easeInOut }), this.deltaYI = 0, this.deltaY = 0;
```
```
    } }, { key: "_setDeltaY", value: function() {
      this.deltaYI = hn.a.getInertia(this.deltaY, this.deltaYI, 0.09), this.deltaY = 0;
```
- Port: wheel -> accumulate; rAF lerp with 0.09 (or getInertia impl; body not in slices, unclear); snap via gsap.to(y,{duration:.5,ease:'power4.inOut'}).

### D2. Project-list magnet (stepper for list, reveal-timeline class yn, slice L6107-6162, hit L6144)
- User sees: after scroll stops, list settles so one project row is centered.
- Mechanism: scroll -> clearTimeout -> setTimeout 500 ms -> _magnetProjectList(0.5). Steps = each item center c and half height e. Pick nearest; target = c on desktop, max(0, c-e-20) on mobile. Non-iOS: TweenLite window.scrollTo 0.5 s Quart.easeInOut. iOS: TimelineLite scrollY fromTo (Power2.easeInOut).
- Params: debounce 500 ms; snap 0.5 s; -20 px mobile offset. List rolling numbers (list-prog-nb, 250 ms linear, rmse .129): digest only.
- Excerpt (slice L6144-6148 region, hit L6144):
```
      clearTimeout(this.sto.scroll), this.sto.scroll = setTimeout(function() {
        t3._magnetProjectList(0.5);
      }, 500);
```
```
      })) : this.tw.scroll = TweenLite.to(Fi.a.$window, 0.5, { scrollTo: { y: n2 }, ease: Quart.easeInOut });
```
- Port: scroll debounce 500 ms, then `window.scrollTo` via gsap ScrollToPlugin `{y: target, duration:.5, ease:'power4.inOut'}`.

### D3. SplitText title reveal + breadcrumb char swap (text-split class bn, slice L6305-6351, hit L6326; grep src for breadcrumb)
- User sees: project title splits into lines and reveals; breadcrumb title swaps char by char.
- Mechanism: playShow -> SplitText(title, {type:"lines"}) -> TimelineLite show; rotate lines timeline (lines.rotate). Breadcrumb: updateCurrentTitle -> new SplitText(words,chars) -> current chars out: y -20, opacity 0, Power2.easeOut, .5 s, stagger -0.03; next chars in after 1.5 s.
- Excerpt (slice L6305-6351, hit L6326):
```
      var n2 = new SplitText(this.$title, { type: "lines" }).lines;
```
- Excerpt (grep src, source.js.txt, breadcrumb):
```
this.tl.title.staggerTo(this.bcCurrentPageChars,.5,{y:-20,opacity:0,ease:Power2.easeOut},-.03,1.5)
```
- Port: `SplitText` (GSAP club) or manual split; `staggerTo(chars,.5,{y:-20,opacity:0,ease:'power2.out'},-0.03)`.

### D4. 404 letter jelly physics (e404 Hn + Gn, slice text-split L7293-7354 hit L7325; raf-lerp L7281-7289 hit L7286)
- User sees: 404 title letters wobble and push away from the cursor, then settle.
- Mechanism: title split to chars; each char = Gn with origin oX/oY. Per frame: offset += (origin - pos)/JELLY. If cursor distance <= APPROACH, push offset radially by (cos*APPROACH - dx)/(APPROACH/10). offset *= (1 - VISCOSITY); |offset| < 1e-3 -> 0; pos += offset.
- Params: JELLY 20; VISCOSITY 0.1; APPROACH 200 (grep src: `t.APPROACH=100,t.APPROACH=200` so 200 effective); cursor MOUSE_INERTIA .03 (grep src).
- Excerpt (slice L7281-7289, lines 460 + 462-464 + 466):
```
      this.offsetX += (this.oX - this.x) / this.JELLY, this.offsetY += (this.oY - this.y) / this.JELLY;
```
```
      if (Math.sqrt(t3 * t3 + e3 * e3) <= this.APPROACH) {
        var i3 = this.APPROACH / 10, n2 = Li(e3, t3);
        this.offsetX += (Math.cos(n2) * this.APPROACH - t3) / i3, this.offsetY += (Math.sin(n2) * this.APPROACH - e3) / i3;
```
```
      this.offsetX *= 1 - this.VISCOSITY, this.offsetY *= 1 - this.VISCOSITY, 1e-3 > Ri(this.offsetX) && (this.offsetX = 0), 1e-3 > Ri(this.offsetY) && (this.offsetY = 0), this.x += this.offsetX, this.y += this.offsetY;
```
- Port: per-char state in a ref; rAF loop with the same three lines; write transform translate(x,y) per char. Use these constants verbatim.

### D5. Cursor follower inertia (pointer, slice L1697-1729)
- Mechanism: mousemove stores x,y; rAF xI = getInertia(x, xI, 0.03). Helper body not in slices: unclear.
- Excerpt (slice pointer L1697-1729, hit L1717):
```
      this.xI = h.a.getInertia(this.x, this.xI, this.MOUSE_INERTIA), this.yI = h.a.getInertia(this.y, this.yI, this.MOUSE_INERTIA);
```
- Port: `xI += (x - xI) * 0.03` is an assumption; mark as unverified until getInertia body found.

### D6. SPA page transition (router, slice L7379-7430, hit L7394)
- User sees: same-site link click swaps page content without reload.
- Mechanism: window click -> findParent("a") -> clickTester (no modifier keys, same protocol/host) -> if path changed: preventDefault, changePage(url). Non-page changes: search/hash only. changePage freezes, loads via XHR, swaps DOM (_updateDom), then content transitions. BASIC_TRANS flag picks simple vs full transition.
- Excerpt (slice L7379-7430):
```
          s2 && o2.isPageChange ? (event.preventDefault(), this._changePage(i3, true)) : s2 && o2.isSearchChange && (event.preventDefault(), this.currentUrl = i3, history.pushState({}, null, this.currentUrl), this._changeS
```
- Port: Next/React Router link; keep preserve-modifier rule.

---

## 6. crumbskees

Noise: audio x3 (Howler lib L184-224, L351-368, L593-606), loader x3 (bodymovin bezier L3953-3989, ImagePreloader L4775-4831), keyboard x3 (React event plugin L8597-8965), wheel x2 (React events L9103-9204), raf-lerp (pixi/bezier L13593), pointer (pixi a11y hook L15275-15315), shader x3 (pixi uniforms L16870-17004).
Gate (click 11127 ms -> SetupStage fade 750 ms linear) and board keyframes: digest/specs-B only, no slice -> code unclear.

### D1. Music + SFX manager (app audio, grep src)
- User sees: looping music per screen (landing, setup, play, result); one-shot SFX (munch, join, ready, power, snack).
- Mechanism: singleton creates Howl instances once; screen changes swap which music loops; SFX fired by name. firstMusicPlayed / currentMusic flags track state. Click gating of first music: unclear.
- Excerpt (grep src, source.js.txt L1961):
```
t._musics={landing:new V.Howl({src:[ze.a,Ve.a],loop:!0}),setup:new V.Howl({src:[Xe.a,We.a],loop:!0}),play:new V.Howl({src:[Ke.a,Qe.a],loop:!0}),result:new V.Howl({src:[er.a,Je.a],loop:!0})},t._sounds={munch:new V.Howl({src:[nr.a]})
```
- Port: one `Howl` per track in a module store; `play/stop` on route change; keep fade via Howl.fade.

### D2. Howler auto-suspend (lib default, slice audio L184-224, hit L199)
- User sees: nothing; audio context suspends after idle, resumes on next play.
- Mechanism: when all sounds idle, timer 30 s -> ctx.suspend(). _autoResume() on next play.
- Params: 30000 ms (lib default; app override not seen).
- Excerpt (slice L184-224):
```
          return t2._suspendTimer && clearTimeout(t2._suspendTimer), t2._suspendTimer = setTimeout(function() {
            t2.autoSuspend && (t2._suspendTimer = null, t2.state = "suspending", t2.ctx.suspend().then(function() {
```
- Port: rely on Howler defaults or disable `Howler.autoSuspend = false` if sound cuts out after 30 s idle.

Verdict: no click-to-start gate in slices. Gate timing (11127 ms) from digest only.

---

## 7. pencilvania

Noise: page-transition (fathom analytics SPA hook, cdn.usefathom.com L10-18).
Real devices: wheel-zoom with pan, asset loader, sound on click.

### D1. Wheel zoom with clamped pan (canvas map)
- User sees: wheel zooms the canvas map toward the cursor; limits on zoom in and out.
- Mechanism: wheel -> preventDefault -> zoom.curr += deltaY*(zoomSpeed*zoom), clamped to [max(1/maxZoom.out, fit), maxZoom.in]. Pan: x += l(x, offsetX, area.width) keeps cursor point fixed; x,y clamped by m() to area.
- Params (grep src): zoomSpeed 5e-4; maxZoom in 1.5 / out 2; padding out 400. l() and m() helper bodies not in slice: unclear.
- Excerpt (slice dist/main.js L60-67, hit L64):
```
    e2.preventDefault(), i.zoom.curr = ((t2) => {
      const e3 = i.zoom.curr + t2 * (o.zoomSpeed * i.zoom.curr), a3 = { x: innerWidth / (o.area.width / 2), y: innerHeight / (o.area.height / 2) }, s3 = Math.max(1 / o.maxZoom.out, Math.max(a3.x, a3.y));
      return Math.min(o.maxZoom.in, Math.max(s3, e3));
    })(e2.deltaY);
    const a2 = i.x + l(i.x, e2.offsetX, o.area.width), s2 = i.y + l(i.y, e2.offsetY, o.area.height);
    i.x = m(a2, t.width, o.area.width), i.y = m(s2, t.height, o.area.height), i.zoom.prev = i.zoom.curr;
```
- Port: `onWheel` -> clamp zoom state; draw on canvas with setTransform(zoom,0,0,zoom,x,y) each rAF.

### D2. Asset loader gate -> splash (dist/main.js L74-91, hit L74 and L89)
- User sees: loading percentage, then layout of tiles/dogs, then canvas shows.
- Mechanism: each asset load: assets++, percentage = assets/R.length*100. When all loaded: build pattern grid (ceil(area.h/img.h) x ceil(area.w/img.w)), place spotlight and cards (skip overlaps), preload sounds (V()), load fonts (Y()); 250 ms later loading.done = true; canvas then draws patterns and pole.
- Params: 250 ms; percentage = loaded/total.
- Excerpt (slice L74 line, hit L74):
```
    I.assets++, i.loading.percentage = I.assets / R.length * 100, I.assets === R.length && ((() => {
```
- Excerpt (slice L89 region):
```
      })(), V(), Y(), setTimeout((() => {
      i.loading.done = true;
    }), 250));
```
- Port: useEffect counting promise resolves; set `done` after 250 ms via setTimeout; keep `done` gate in draw loop.

### D3. Tap sound with drag tolerance (grep src, source.js.txt, not in slices)
- User sees: a click/tap on the map plays one random SFX; a drag does not.
- Mechanism: click handler checks drag start within +-4 px (drag.start), then picks random sound from 15 mp3s preloaded as `new Audio` (V()) and plays it. No click-to-start gate: audio plays on any click.
- Excerpt (grep src):
```
e.x>=i.drag.start.x-4&&e.x<=i.drag.start.x+4&&e.y>=i.drag.start.y-4&&e.y
```
```
(g(e),sounds[r(sounds)].audio.play(),"object"==typeof fathom&&fathom.trackGoal("MIEZNUHI",0))
```
- Port: onPointerUp: if movement < 4 px -> play random `Audio` from preloaded array.
