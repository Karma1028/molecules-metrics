# device-teardown-F — how each site's devices work (from slices)

Source: forensics/<slug>/device-code.md (esbuild-reprinted slices). Cross-checked against motion-digest.md, forensics.json (phases, tweens, gsapCalls, audio, canvasCtx, jsLibs) and shaders.glsl (uniform lines only). Excerpts are verbatim from the slice unless marked "source.js.txt" or "motion-digest.md". Numbers are literal from device-code or the digest. Anything else is "inferred", or withheld when it only exists outside the slices. "unclear" = not in any slice.

Gate facts are from the live browser check today (as reported by the caller). They were not re-run for this file. Gate step values are in tools/gates.json.

Sites covered: yauch, crumbskees, marseille, onelastbeat. Only devices found in the slices are listed.

---

## yauch (https://yauch.oscilloscope.net/panorama/main_01)

Gate (live check today): ~15 s loader ring, then the "drag to explore the studio" panorama. Entry is a drag, not a click. The scripted run dragged twice (tools/gates.json: wait, drag, wait, drag, wait).

**Panorama wheel zoom** — wheel changes camera FOV in steps.
- Mechanism: jQuery-style mousewheel handler on the panorama container. It calls preventDefault, fires a synthetic keydown on document, then sets camera fov to a clamped value: fov − deltaY × deltaFactor / 12.
- Params: `/ 12` (literal divisor). `deltaFactor` comes from the wheel normaliser in the vendor plugin slice (not cited). `m._MIN_FOV` and `m._MAX_FOV` are named clamps; their values are unclear (not in slice). Zoom buttons animate with `.2` in source.js.txt (not in device-code, withheld).
- Excerpt (device-code L537-541, PanoramaManager.js L103-110):
```
    $(this.container).on("mousewheel", function(t2) {
      if (t2.preventDefault(), !i2.camera.isAnimating() && !i2._forceDisableRendering) {
        ...
        var a2 = Math.max(m._MIN_FOV, Math.min(m._MAX_FOV, i2.camera.fov - t2.deltaY * t2.deltaFactor / 12));
```
- Port: wheel → target fov, clamp, ease the camera toward it. Normalise deltaMode first (see marseille).

**Drag-to-explore control (rotation Draggable with throw)** — the entry drag.
- Mechanism: a `.component-draggable-element` wraps a GSAP Draggable in `rotation` mode with `throwProps`, so the release carries inertia. onDrag and onDragEnd drive a paused timeline that fades the two "drag to explore / the studio" lines out. Not in device-code; read from source.js.txt. The slices contain no panorama drag code of their own. The Draggable engine itself is vendor (GSAP) and is skipped.
- Params: `throwProps:!0` (true). `edgeResistance`, `bounds` and `snap` numbers exist in source.js.txt but not in any device-code slice, so they are withheld under the rule. Line fades: 450ms (line 1) and 300ms (line 2), from motion-digest.md.
- Excerpt (source.js.txt, numeric literals elided):
```
var r=Draggable.create(n,{cursor:"grab",type:"rotation",throwProps:!0,edgeResistance:[...],bounds:[...],snap:[...],onClick:function(){i()},onDrag:function(){e.u[...]
```
- Port: a rotation drag with velocity-based release and snap to two states. Do not use a wheel for this entry.

**Pointer → look direction (hover aim)** — mouse position becomes a unit direction on the sphere.
- Mechanism: window mousemove and container mouseup/touchend call _updatePointerDirection. The offset from viewport centre (minus panoramaOffset) is normalised with the projection distance as z. It emits CHANGE. No inertia at this layer.
- Params: `n2.viewWidth / 2`, `n2.viewHeight / 2`, `-1 *` on Y (screen Y is inverted), `n2.projectionDistance` as z.
- Excerpt (device-code L565-566, PointerPositionManager.js L14-48; L565 cut in the slice):
```
    var n2 = this._panoramaManager.camera, o2 = e2 - n2.viewWidth / 2 - this.panoramaOffset.x, i2 = -1 * (t2 - n2.viewHeight / 2 - this.panoramaOffset.y), r2 = n2.projectionDistance, a = Math.sqrt(o2 * o2 + i2 * i2 + r2 …
    this._pointerDirection.x = o2 / a, this._pointerDirection.y = i2 / a, this._pointerDirection.z = r2 / a, this.dispatchEvent(new s.default(s.default.CHANGE));
```
- Port: compute the pointer ray in camera space on each move, and read it in the render loop.

**Gyro look (touch devices only; inferred)** — pano2vrGyro.
- Mechanism: deviceorientation → yaw/pitch via a rotation matrix. Sensor input is ignored while a touch is down. It resumes after a 1 s lockout from touch release. Above 70 degrees of pitch, yaw blends toward alpha over 10 degrees. An adaptive V offset damps tilt by 0.98.
- Params: `1e3 < e3.getTime() - d` (1 s lockout). `70` and `/ 10` (blend start and width). `diffTilt *= 0.98`. `h = 10` (initial frames before moveTo).
- Excerpt (device-code L240 and L260):
```
      if (n2 && (d = e3.getTime()), !n2 && m && 1e3 < e3.getTime() - d) {
          s2 %= 360, 180 < Math.abs(s2 - o2) && (s2 += s2 < o2 ? 360 : -360), o2 = o2 * (1 - (i3 = Math.min(1, (Math.abs(a2) - 70) / 10))) + s2 * i3;
```
- Port: skip on desktop. On mobile, use DeviceOrientation with a touch-release lockout and a pitch-based blend to avoid the pole flip.

**Audio (createjs WebAudio, not Howler)** — no Howler on this site.
- Mechanism: createjs WebAudioPlugin. An AudioContext is created on first use. A 1-sample empty buffer unlocks it. One master gain node. _updateVolume writes 0 when master is muted, else the sound volume.
- Params: `createBuffer(1, 1, 22050)` (silent unlock buffer). `tracks: -1`. No fade ramp in device-code.
- Excerpt (device-code L379-381):
```
  }, e2._updateVolume = function() {
    var t2 = createjs.Sound._masterMute ? 0 : this._volume;
    t2 != this.gainNode.gain.value && (this.gainNode.gain.value = t2);
```
- Fades: unclear. The brief says "Howler fades"; no Howler is present for yauch (source.js.txt has 0 matches). forensics.json audio shows one AudioContext at 8411 ms.
- Port: one master gain; mute = 0; unlock the context inside the gate click.

**Loaders** — CSS preloader ring plus Gaia asset-complete event.
- Mechanism: CSS-only spinner. spinRing runs at 600 ms. The gate ring is a separate long spin. JS side: Gaia preload() builds the view controller and emits ASSET_COMPLETE per view.
- Params (motion-digest.md): spinRing 1000ms linear on span.preloader-ring at 600 ms. fullSpin 20000ms linear on svg. halfSpin 3500ms on div.circle-outline-container. revealLeft / revealRight 3500ms.
- Excerpt (device-code L87, preload callback):
```
      a2._controller = new e4.default(), a2.onComplete(), n3 && a2._controller.setTemplate(n3), a2._controller.setViewModel(new t3.default()), a2.dispatchEvent(new c.default(c.default.ASSET_COMPLETE, a2));
```
- Port: CSS ring for the loader; a ready promise per route that resolves on asset complete.

**Post-loader reveal (digest only)** — opacity tweens fired in a cluster after the gate.
- Mechanism: eight opacity tweens start between 12986 ms and 15889 ms. Their source is vendor timeline code, not in device-code.
- Params (motion-digest.md): h2.component-title 300ms linear; span.rotator-circle 1500ms power1.out; h3.hero-text 300ms linear; div.layer-corner-lines 500ms linear; span.final-circle 1500ms power1.out; span.outline 2000ms power1.out; drag-text-line-1 450ms linear; drag-text-line-2 300ms linear.
- Excerpt: none in device-code (the reveal-timeline slices are TweenMax vendor).
- Port: opacity-only fades with power1.out for rings and linear for text.

---

## crumbskees (https://crumbskees.com/)

Gate (live check today): a DIV "PLAY NOW" (Button-button--2dnz7), not a <button>. The probe clicks it (tools/gates.json: click text=PLAY NOW, then move, then click canvas). Post-gate: a canvas game on PIXI with 16 shader programs.

**Howler fade (linear gain ramp)**.
- Mechanism: Howl.fade(from, to, ms). Sets gain to `from` at now, then linear-ramps to `to` at now + ms/1000. Skipped when the sound is muted. A parallel interval handles the HTML5 path.
- Params: `r3 / 1e3` (fade arg is in ms). Fade durations from the game code are not in the slices (unclear).
- Excerpt (device-code L60-62):
```
            if (n2 || i3._stopFade(o2[s2]), i3._webAudio && !l2._muted) {
              var h2 = a.ctx.currentTime, u2 = h2 + r3 / 1e3;
              l2._volume = t2, l2._node.gain.setValueAtTime(t2, h2), l2._node.gain.linearRampToValueAtTime(e2, u2);
```
- Port: Web Audio gain with cancelScheduledValues, then setValueAtTime and linearRamp. Clamp inputs to 0..1 as the vendor build does.

**AudioContext auto-suspend (30 s idle)**.
- Mechanism: after a sound stops, a timer is armed. When it fires, the context suspends (state "suspending" then "suspended"). A pending play sets _resumeAfterSuspend, and _autoResume resumes the context.
- Params: `3e4` (30000 ms, arithmetic on the literal).
- Excerpt (device-code L7-11):
```
          return t2._suspendTimer && clearTimeout(t2._suspendTimer), t2._suspendTimer = setTimeout(function() {
            t2.autoSuspend && (t2._suspendTimer = null, t2.state = "suspending", t2.ctx.suspend().then(function() {
              t2.state = "suspended", t2._resumeAfterSuspend && (delete t2._resumeAfterSuspend, t2._autoResume());
            }));
          }, 3e4), t2;
```
- Port: suspend on idle to save battery. Resume inside the first user gesture.

**Image loader with 1x1 transparent fallback**.
- Mechanism: ImagePreloader loads <img crossOrigin="anonymous">. On error it replaces the asset with a shared 1x1 transparent canvas and still counts it as loaded, so progress keeps moving.
- Params: `t2.width = 1, t2.height = 1` and `rgba(0,0,0,0)` fill.
- Excerpt (device-code L156-159):
```
        var n2 = r(e2, this.assetsPath, this.path), i2 = createTag("img");
        i2.crossOrigin = "anonymous", i2.addEventListener("load", this._imageLoaded, false), i2.addEventListener("error", function() {
          a.img = t, this._imageLoaded();
        }.bind(this), false), i2.src = n2;
```
- Port: on asset error, resolve to a placeholder and advance the progress count. Do not block the loader.

**Wheel normalisation (React synthetic event)**.
- Mechanism: deltaY is read from deltaY, else negated wheelDeltaY, else negated wheelDelta, else 0. The sign is flipped for legacy events so that positive means down. No deltaMode handling in this path.
- Params: none.
- Excerpt (device-code L303-304):
```
  }, deltaY: function(t2) {
    return "deltaY" in t2 ? t2.deltaY : "wheelDeltaY" in t2 ? -t2.wheelDeltaY : "wheelDelta" in t2 ? -t2.wheelDelta : 0;
```
- Port: one normaliser that also converts deltaMode 1 (lines) and 2 (pages) to pixels.

**Shader uniforms (PIXI, upload on change; no time or pointer uniforms)**.
- Mechanism: each uniform setter caches the last value and calls the GL uniform only when it changes.
- Uniform names from shaders.glsl (16 programs, `uniform` lines only): translationMatrix, uColor, projectionMatrix, uTransform, uMapCoord, uClampFrame, uClampOffset, tint, uSampler, uSamplers[16]. None is a time, mouse or resolution uniform. So no shader here is time- or pointer-driven.
- Params: `uSamplers[16]` (batch texture slots). Float upload path is the one quoted below.
- Excerpt (device-code L454, the float setter string, literal `\n` shown as in source):
```
  var ds = { float: "\n    if(cv !== v)\n    {\n        cv.v = v;\n        gl.uniform1f(location, v)\n    }", vec2: "...
```
- Port: nothing to copy. If a shader needs time, add one uniform and drive it from the game loop.

**Board CSS motion (post-gate game; digest only)**.
- Mechanism: CSS keyframes on game board elements.
- Params (motion-digest.md): Board-power-ring stroke-dashoffset 0 to 182.2128. Board-item-appear scale 0.1 to 1. Board-round-name-appear translateY(-500%) scale(1.5) to none. GameZoneWrapper blink 0 to 1 to 0. MarqueeText linear 12000ms translateX 0 to -200%.
- Excerpt (motion-digest.md):
```
Board-power-ring--2EXwA {0%{stroke-dashoffset:0}to{stroke-dashoffset:182.2128}}
```
- Port: CSS keyframes; no JS needed.

---

## marseille (https://marseille.laphase5.com/en)

Gate (live check today): wait 20 s then click body (tools/gates.json). The site is broken today: console "Uncaught Cannot tween a null target", loader stuck at "0". Code captured, motion not. The digest and forensics.json come from an earlier run (see Conflicts).

**Sound fades (Howler, fixed in/out)** — a sound fades in over 2 s and out over 2 s, then stops.
- Mechanism: playSound(name, fadeIn) starts the sound. With fadeIn set, it fades 0 to the sound's volume over 2e3 ms. stopSound fades to 0 over 1e3 × t3 with t3 = 2, then calls stop() after the same delay.
- Params: `2e3` (fade in). `var t3 = 2` and `1e3 * t3` (fade out, 2000 ms; stop timer uses the same value). Sound volumes passed to createSound: 0.5, 0.7, 1 (defaults).
- Excerpt (device-code L23 and L26-27):
```
B[e3] && (B[e3].timer && clearTimeout(B[e3].timer), B[e3].audio.play(), t3 && B[e3].audio.fade(0, B[e3].volume, 2e3));
        var t3 = 2;
        B[e3].audio.fade(B[e3].volume, 0, 1e3 * t3), B[e3].timer = setTimeout((function() {
```
- Port: Howler-style fade with a per-sound timer. Clear the pending stop timer when a sound restarts.

**Howler ramp (vendor, clamps and ms → s)** — the same ramp as crumbskees, with input clamping.
- Mechanism: fade clamps from and to to 0..1, calls volume(), then ramps gain at currentTime + ms/1000. Vendor build; cited for the ramp math only.
- Params: `n3 / 1e3`. `Math.min(Math.max(0, parseFloat(t2)), 1)`.
- Excerpt (device-code L490 and L495):
```
        t2 = Math.min(Math.max(0, parseFloat(t2)), 1), e2 = Math.min(Math.max(0, parseFloat(e2)), 1), n3 = parseFloat(n3), i2.volume(t2, r3);
              var l2 = a.ctx.currentTime, u2 = l2 + n3 / 1e3;
```
- Port: one ramp helper with the clamps; use it for every fade.

**Panorama drag inertia (Hammer pan, per-frame lerp)** — the drag ease.
- Mechanism: Hammer pan events feed onMoveHandler, which sets a target heading and pitch from the pan centre (scaled by rotation speed and zoom). Pitch is clamped to ±90. update() runs every frame in requestAnimationFrame and moves the current heading and pitch 10% toward the target. Delta accumulator Cn is damped to 25% per move event. updateHeadingPitch applies polar limits and camera damping.
- Params: `0.1` (per-frame lerp on heading and pitch; frame-rate dependent, inferred). `Cn.x *= 0.25` and `Cn.y *= 0.25` (delta damping). `Math.min(90, Math.max(-90, Pn))` (pitch clamp). `Dn = 0.1` default, overwritten by `jt.pano.camera_rotation_speed`. `Mn = -180` (initial heading). `jt.pano.camera_damping`, `min_polar_angle`, `max_polar_angle` are config (values unclear).
- Excerpt (device-code L245 and L251):
```
      requestAnimationFrame(this.update.bind(this)), Mn += 0.1 * (Tn - Mn), En += 0.1 * (Pn - En), this.updateHeadingPitch();
      _n && (Cn.x += e3.deltaX, Cn.y += e3.deltaY, Cn.x *= 0.25, Cn.y *= 0.25, Tn = -(On.x - e3.center.x) * (Dn / this.zoom) + Ln, Pn = (e3.center.y - On.y) * (Dn / this.zoom) + zn, Pn = Math.min(90, Math.max(-90, Pn)));
```
- Port: replace the fixed 0.1 with a dt-based exponential ease, so inertia does not depend on frame rate. Keep the ±90 pitch clamp.

**Pan gesture setup (Hammer)**.
- Mechanism: Hammer on the canvas enables all-direction pan. tap, press and panstart start drag. pan moves. panend stops.
- Params: `Hammer.DIRECTION_ALL`.
- Excerpt (device-code L242-243):
```
      var t3 = new Hammer(this.domElement);
      t3.get("pan").set({ direction: Hammer.DIRECTION_ALL }), t3.on("tap press panstart", this.onDownHandler.bind(this)), t3.on("pan", this.onMoveHandler.bind(this)), t3.on("panend", this.onUpHandler.bind(this));
```
- Port: pointer events with a velocity tracker are enough. Keep the same start/move/end split.

**Wheel normalisation (zoom on the globe; vendored OrbitControls-style, inferred)**.
- Mechanism: wheel delta is scaled by deltaMode before it moves the zoom value. Pixels are scaled by 25e-5, lines by 0.01, pages by 0.025.
- Params: `0.025`, `0.01`, `25e-5`.
- Excerpt (device-code L426-436):
```
        switch (e3.deltaMode) {
          case 2:
            m2.y -= 0.025 * e3.deltaY;
            break;
          case 1:
            m2.y -= 0.01 * e3.deltaY;
            break;
          default:
            m2.y -= 25e-5 * e3.deltaY;
```
- Port: normalise deltaMode before any zoom math.

**Pointer idle timer (interaction reset)**.
- Mechanism: pointerdown sets a flag. pointermove while the flag is set calls setTimeout() and emits "interact". wheel sets a separate flag. The timer body is not in the slice.
- Params: none in slice. The timeout delay is unclear.
- Excerpt (device-code L443-448):
```
      window.addEventListener("pointerdown", (function() {
        t3 = true;
      })), window.addEventListener("pointerup", (function() {
        t3 = false;
      })), window.addEventListener("pointermove", (function() {
        true === t3 && (e3.setTimeout(), e3.emit("interact"));
```
- Port: one idle timer; reset on drag and on any pointer event.

**Pin pointer hook**.
- Mechanism: each pin listens to window mousemove and pointerdown and runs onMouseMove, which does the hover test for the pin.
- Params: none.
- Excerpt (device-code L183):
```
    return Jt.push(Object(K["a"])(r2)), new ie["j"](), nt = new ie["Db"](), window.addEventListener("mousemove", r2.onMouseMove), window.addEventListener("pointerdown", r2.onMouseMove), r2;
```
- Port: use pointer events only, with a hit-test per frame.

**Pin label scale from camera distance**.
- Mechanism: a pin label's scale is set from its distance to the camera. The label is clamped to 0.5 at the far end and 1.5 at the near end. A tween (fromTo) then drives the label in.
- Params: `Math.max(0.5, 1.5 - (...) / (...) * 1.5)`. The range comes from jt.controls.minDistance and maxDistance.
- Excerpt (device-code L2618, cut in the slice):
```
      e2.setText(e2.data.hover_title + " "), e2.scale = Math.max(0.5, 1.5 - (e2.data.distance - jt.controls.minDistance) / (jt.controls.maxDistance - jt.controls.minDistance) * 1.5), e2.tween = $n["g"].fromTo(e2.$refs. …
```
- Port: compute scale from camera distance in the render loop, clamped to 0.5 to 1.5.

**Pointer drag spreads the text ring (pointer-driven, not a shader)**.
- Mechanism: each non-needle text mesh moves toward its rest point scaled by 1 plus 1e-3 times the drag delta, then eases by a friction factor. The drag delta is the orbit-controls static delta.
- Params: `1e-3` (delta scale). `jt.text.friction` (friction; value unclear). `jt.text.letter_x_span` (unclear).
- Excerpt (device-code L281, cut):
```
          o3 != e3.needle && (n3.copy(i3.rest).multiplyScalar(1 + Math.abs(1e-3 * jn.delta.x)), t3.copy(i3.prev.position).add(n3), i3.position.x += (t3.x - i3.position.x) * jt.text.friction, i3.position.y += (t3.y - i3.p …
```
- Port: keep the friction ease in JS, driven by the drag delta.

**Shader uniforms (terrain, pins; not time-driven)**.
- Mechanism: roads use `uniform float radius` with `gl_FragColor.a *= vRadius` (radial fade). Pins and labels use `uniform vec2 delta` to offset and scale their UVs once at setup. Both invert colour through `gl_FragColor.rgb = vec3( 1. ) - gl_FragColor.rgb`. The roads radius comes from the geometry bounding sphere set to `256` in the loader. The source of vRadius is unclear. No time or pointer uniform is found in the slices (no shaders.glsl captured).
- Params: `256` (bounding sphere radius). `vec3( 1. )` (invert).
- Excerpt (device-code L136, cut):
```
      t3.geometry.setAttribute("position", new ie["e"](new Float32Array(l2), 3)), t3.geometry.needsUpdate = true, t3.geometry.computeBoundingSphere(), t3.geometry.boundingSphere.radius = 256, t3.loaded = true, t3.l …
```
- Port: radial alpha fade on roads; invert colours in a single pass if needed.

**Terrain / pin binary loader (GLB-like float buffer)**.
- Mechanism: fetches a binary, validates the byte length (3302 is the empty case), then reads 3 floats per vertex. A (-1, -1, -1) triple closes a strip. Polygons are built from the strip buffer.
- Params: `3302`. `r2 = 3` (floats per vertex). `4 * r2` (12-byte stride). `-1` sentinel.
- Excerpt (device-code L123-131):
```
          if (3302 != i2.byteLength) {
            for (var o2, a2, s2, r2 = 3, l2 = [], c2 = [], u2 = 0, d2 = 0; d2 < i2.byteLength; d2 += 4 * r2) {
              ...
              if (-1 == o2 && -1 == a2 && -1 == s2) {
```
- Port: keep the parse in a worker; the sentinel strip format is cheap to reuse.

**Preload tween (digest only, broken today)**.
- Mechanism: a single scale tween on the preloader numbers, then a per-digit odometer tween at gate time.
- Params (motion-digest.md): div.Preload-numbers transform.s 0.7 to 1.2, 8550ms linear. span.odometer-digit transform.x 0.716 to 45, 500ms power3.out.
- Excerpt: none in device-code (loader slices are fetch/parse plumbing). Gate-time number is digest only.
- Port: scale-up of the count over the load window; the tween target was null today (see Conflicts).

---

## onelastbeat (http://onelastbeat.com/)

Gate (live check today): HTTP 429 on assets. The "BETTER WITH HEADPHONES" screen (#use-fking-headphones) never ends. Code captured, motion not. Probe gate (tools/gates.json): wait 12 s then click #use-fking-headphones.

**Headphones screen fade-in (digest only)**.
- Mechanism: opacity fade-in on the headphones overlay, start at 1830 ms.
- Params (motion-digest.md): div#use-fking-headphones opacity 0.02 to 1, 400ms power1.out.
- Excerpt: none in device-code (the tween source is not in the slices).
- Port: CSS opacity transition, 400ms ease-out.

**Howler fade (linear ramp)**.
- Mechanism: same ramp as crumbskees and marseille. Ramp to target at now + ms/1000.
- Params: `n2 / 1e3`.
- Excerpt (device-code L24-26):
```
        if (r2 || s3._stopFade(o2[a2]), s3._webAudio && !h2._muted) {
          var l2 = e.ctx.currentTime, u = l2 + n2 / 1e3;
          h2._volume = t3, h2._node.gain.setValueAtTime(t3, l2), h2._node.gain.linearRampToValueAtTime(i3, u);
```
- Port: Web Audio gain ramp, with clamps.

**Audio unlock and iOS guard**.
- Mechanism: creates AudioContext. Falls back to HTML5 audio on iOS older than 9 unless running in a standalone Safari context.
- Params: `n2 < 9` (iOS major version).
- Excerpt (device-code L44-45):
```
    if (t3 && n2 && n2 < 9) {
      var r2 = /safari/.test(e._navigator && e._navigator.userAgent.toLowerCase());
```
- Port: keep one context, create it inside the gate click.

**Asset loader (pixi resource loader) — concurrency and status check**.
- Mechanism: a queue of 10 concurrent XHRs by default. _xhrOnLoad then accepts 200, 204, or 0 with a body. The status is read as `void 0 === e2.status ? e2.status : 200`. Read literally, any defined status yields 200 here. So an HTTP 429 passes this check and its body is parsed as asset data (inferred from the code; not captured).
- Params: `10` (queue concurrency default). `200`, `204`, `0`. `5e3` (XDR timeout, IE only; not used in Chrome).
- Excerpt (device-code L73 and L175-177):
```
        var e2 = this, i3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
      }, t4.prototype._xhrOnLoad = function() {
        var e2 = this.xhr, i3 = void 0 === e2.status ? e2.status : 200;
        if (!(200 === i3 || 204 === i3 || 0 === i3 && e2.responseText.length > 0)) return void this.abort("[" + e2.status + "] " + e2.statusText + ": " + e2.responseURL);
```
- Port: check `response.ok` in fetch and treat 429 as retryable with backoff. Do not parse error bodies.

**Canvas hit test (cursor position to canvas pixels)**.
- Mechanism: pointer coordinates are mapped from CSS px to canvas px using the ratio of canvas size to its bounding rect. Each button polygon is tested. Hover fires on enter and out. The canvas cursor is set to the button's cursor or "default".
- Params: none (ratios computed at runtime).
- Excerpt (device-code L422 and L432):
```
    var e, i2, n = this.canvas.getBoundingClientRect(), r = this.canvas.width / n.width, s2 = this.canvas.height / n.height, o = false;
    e = (e - n.left) * r, i2 = (i2 - n.top) * s2;
```
- Port: keep the ratio in one helper; hit-test in CSS px after mapping.

**Touch-to-hover suppression (500 ms)**.
- Mechanism: the has-hover class is not added for 500 ms after a touchstart. This stops emulated mouse hover from sticking after a tap.
- Params: `500`.
- Excerpt (device-code L407):
```
    /* @__PURE__ */ new Date() - this.lastTouchTime < 500 || this.hasHoverClass || (this.container.className += " " + this.className, this.hasHoverClass = true);
```
- Port: gate hover CSS behind (hover: hover) plus this timestamp check.

**Keyboard sequencer (post-gate; not reached)** — cardboard-button key prompt with a demo ball.
- Mechanism: buttons appear with a scale-in stagger. The container fades in. A demo ball moves across buttons on a fixed interval. The numpad keys map to letters. Keys trigger onPress.
- Params: `defaultDemoIntervalTime = 300` (literal). Show: scale-in duration 0.1 with delay 0.1 × index; container opacity 0.5. Hide: opacity 0.3. Ball: left 0.1, top −30 at 0.05 then −10 at 0.05 offset 0.05. Demo step timeout 100.
- Excerpt (device-code L464 and L471-474):
```
    } }), t.to(this.demoBall, 0.1, { left: s2 }, 0), t.to(this.demoBall, 0.05, { top: -30 }, 0), t.to(this.demoBall, 0.05, { top: -10 }, 0.05), this.demoBallLastX = s2);
  }, show: function() {
    this.demoIndex = this.strictSequence ? 0 : -1;
    for (var t2, i3 = 0; i3 < this.buttons.length; ++i3) t2 = this.buttons[i3].getDom(), e.from(t2, 0.1, { scaleX: 0, scaleY: 0, delay: 0.1 * i3 });
    e.set(this.container, { visibility: "visible" }), e.to(this.container, 0.5, { opacity: 1 }), this.visible = true;
```
- Port: a small timeline with a ball tween; route numpad keys (see the next line in the slice) to the same handler.

**Pixi shader plumbing and blur**.
- Mechanism: pixi shader compile and blur kernels (Gaussian weights for 5 to 13 taps). Vendor; skipped. No time or pointer uniform in the slices. No shaders.glsl captured.
- Params: not cited (vendor).
- Excerpt: none (vendor).
- Port: none.

---

## Steal for Molecules → Metrics

- marseille: replace the fixed `0.1` per-frame heading lerp with a dt-based ease, keep the `0.25` delta damping on drag, and keep the ±90 pitch clamp.
- yauch: the entry "drag to explore" is a GSAP-style rotation Draggable with `throwProps:!0`. Use velocity-based inertia with a snap to two states.
- yauch: wheel-to-FOV is one step `/ 12` clamped to a min and max. Normalise `deltaMode` before the math (see marseille `0.025`, `0.01`, `25e-5`).
- marseille: fixed fade-in `2e3` and fade-out `1e3 * 2`, with a stop timer that matches the fade-out. Clamp inputs to 0..1.
- crumbskees: suspend the AudioContext after `3e4` ms idle and resume inside the first user gesture.
- onelastbeat: ignore hover for `500` ms after touch, and map pointer coordinates with canvas.width / rect.width before hit-testing.

## Conflicts / unknowns

- Caller said yauch uses "Howler fades". Yauch uses createjs WebAudio. No Howler in its source (0 matches in source.js.txt). Its fade values are unknown.
- Yauch drag and throw numbers (edgeResistance, bounds, snap) are in source.js.txt only. Withheld under the rule. The inertia-parameter slice is not captured.
- Yauch "~15 s loader ring" (live check) vs digest: spinRing 1000ms and forensics phases gateClick 11222 ms. The 15 s figure is from the live check; not reproduced here.
- Yauch shaders.glsl has only uSampler, uMVMatrix, uPMatrix: no time or pointer uniform.
- Crumbskees: no time or pointer shader uniform in 16 programs. Its game motion is CSS (digest). Fade durations used by the game are not in slices.
- Crumbskees gate-run.log first line says "gate click miss canvas" with no site name. It is read here as the canvas-click step missing. Not confirmed.
- Marseille: the live check says the site is broken today ("Cannot tween a null target", loader stuck at "0"). But forensics.json (16:24) has phases with gateDone 34421 and a Preload-numbers tween at 3546 ms. gate-run.log (16:24) says "marseille ok tweens=2". These conflict. The motion numbers are from the earlier run and may be stale.
- Marseille "Cannot tween a null target" is consistent with the Preload-numbers tween's target being missing. Inferred. Not verified in the slices.
- Onelastbeat: forensics.json phases show gateClick 9893 and gateDone 27918, and the headphones tween ran at 1830 ms. The live check says the screen never ends (429). gate-run.log says "onelastbeat ok tweens=1". Conflict: the phases may be from an earlier run.
- Onelastbeat 429 path: the status-check reading is inferred from the slice. Not captured. Whether that is the reason the screen never ends is unverified.
- Vendor code skipped: GSAP Draggable and TimelineLite, Howler core, PIXI shader and filter plumbing, jQuery mousewheel, Hammer.js, the Gaia framework, and the knockout bindings.
- Numbers in source.js.txt that are not in device-code (for example the yauch zoom ease `.2` and the marseille / yauch Draggable values) are withheld under the rule.
