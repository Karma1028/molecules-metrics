# Device teardown A: loiseau, kashyap, duhaihang, localstudio, rxk, monogrid, eisenberger

Sources: forensics/<slug>/device-code.md (section header = file + Lnn), `src:` = forensics/<slug>/source.js.txt (grep anchor given, not in device-code slices), `digest` = motion-digest.md, `specs` = specs-A.md. "unclear" = not in any slice. "noise" = framework/vendor code, no site device.

---

## 1. loiseau (Framer, WebGL)

Noise: framer.mjs loader/observer/page-transition (L78-96, L735-746, L1067-1080, L3752-3789), events.framer.com keyboard/page-transition, Framer layout projection (L9363-9403).

### D1. Cursor wake field (WebGL distortion over logo)
- User sees: the logo warps and drags like water where the cursor passes, with a chroma fringe at the edges.
- Mechanism: pointer enter/move/leave on the canvas wrapper set hover flags; rAF `pe2` keeps a pool of wakes (x, y, born, force, vx, vy) and uploads `u_wakes[12]`, `u_wakeVelocity[12]`; fragment shader displaces `sampleSource(uv + displacement*strength)`.
- Params: wake pool `ot=12` (src); per wake `life = clamp(age/(u_decayTime/1000), 0, 1)`, `fade = pow(1-life, 1.65)`; `radius = u_hoverRadius*mix(1.15, 2.1, force)`; `falloff = exp(-d²/radius²)`; `energy += falloff*fade*(0.55+force*0.4)`; mix `L` lerps to 1 at rate .12 (up) / .08 (down), to 0 at .2 when idle; pointer `I` lerps at .07; wakes older than 120 ms dropped when idle. Pointer-move handler body (`onPointerMove:W`) not in slices: unclear.
- Key excerpt (`src`, shader string ~offset 895671; device-code shader-uniforms L305-345):
```
float life = clamp(age / max(u_decayTime / 1000.0, 0.0001), 0.0, 1.0);
float fade = pow(1.0 - life, 1.65);
...
float radius = u_hoverRadius * mix(1.15, 2.1, force);
float falloff = exp(-(dist * dist) / max(radius * radius, 0.00001));
vec2 dragAspect = velocityDirAspect * falloff * fade * behind * (0.30 + speed * 0.08);
```
- Port: one fullscreen-quad fragment shader on a <canvas>, a ring buffer of 12 wakes in a ref (no React state), rAF loop, uniforms updated per frame.

### D2. Idle ambient wake (autonomous Lissajous when no pointer)
- User sees: after roughly 1.2-2.6 s without the pointer, the logo ripples by itself along a slow figure path, fading in over 1.4 s.
- Mechanism: rAF checks idle gap; if no ambient path is active it starts one; each frame it computes `x = .5 + (ax1*sin(t*fx1*2π+px1) + ax2*sin(t*fx2*2π+px2))*r` (y analogous) and pushes a wake with `V(x, y, vx, vy, force)`.
- Params: start when `e-re > 1200 + (1-clamp(y,0,1))*1400` ms; `fadeIn: 1.4`; `ax1 = .5+v*.18`, `ax2 = .08+v*.06`, `ay1 = .38+v*.16`, `ay2 = .07+v*.05`; `fx1 ∈ [.12,.2]`, `fx2 ∈ [.28,.48]`, `fy1 ∈ [.1,.18]`, `fy2 ∈ [.24,.42]`; force = clamp(.07+v*.14, .06, .24); `v` source unclear. `Z(a,b)` read as random-in-range, `nt` as lerp (inferred from use).
- Key excerpt (`src`, minified, ~offset 902215):
```
if(_&&!B.current.active&&e-re.current>1200+(1-X(y,0,1))*1400&&(B.current={active:!0,startTime:e,fadeIn:1.4,ax1:.5+v*.18,ax2:.08+v*.06,ay1:.38+v*.16,ay2:.07+v*.05,fx1:Z(.12,.2),fx2:Z(.28,.48),fy1:Z(.1,.18),fy2:Z(.24,.42),...
```
- Port: a function returning a 2D point from sines with random per-cycle frequencies; feed the same wake-push function as the pointer.

### D3. Hover chip CSS-variable tween (digest only)
- User sees: hovered tile/icon grows its chip via a CSS variable.
- Params (digest L16-19): `--extracted-r6o4lv` and `--21h8s6` 12→195 in 300 ms power4.out; back 195→0 in 200 ms linear. No slice. Digest L20 (`transform.s 1.05→1.05`, from==to) is a suspect misread.
- Port: `gsap.to(el, {'--chip': 195, duration: .3, ease: 'power4.out'})`, reverse on leave.

Unclear: load tween `ul transform.x -454→-360` 7400 ms circ-out (digest, rmse 2.36).

---

## 2. kashyap (React + GSAP + ScrollTrigger + Lenis, Howler)

Noise: React DOM preload/keyboard/wheel dispatch/priority (L539-551, L1479-1621, L5442-5567, L6237, L6834), GSAP ScrollTrigger core (L7647-7687), Howler (L9216-9655: audio trigger in app code not in slices, unclear).

### D1. Preloader: counter, box expand, quote exit
- User sees: words rise, a % counter ticks 0-100, a rounded box expands to full screen, the quote lines rise, the counter slides up, then the page.
- Mechanism: two paused GSAP timelines (`v` box expand, `w` counter exit + quote enter); a counter tween updates `textContent = Math.round(value)+"%"`; when progress ≥ 99.5 the expand timeline resumes.
- Params (device-code X_ L9059-9093): counter `value→progress` 0.5 s power2.out; box expand `width/height 100%, borderRadius 0` 2 s expo.inOut; counter exit `yPercent -205` 0.6 s power2.in; quote `yPercent 155→0` 0.8 s power2.out stagger .03. Start box desktop `height 200, width 200*(w/h)`; mobile `width min(356, .8w)`, height 60 if h<400 else 200; rotation -6→0 (digest).
- Key excerpt (device-code L9059-9093):
```
v.to(".preloader-box", { width: "100%", height: "100%", borderRadius: 0, duration: 2, ease: "expo.inOut" }, "+=0"), d.current = v;
w.to(h.current, { yPercent: -205, duration: 0.6, ease: "power2.in" }), w.set(h.current, { display: "none" }), w.from(".quote-text.top .word-anim", { yPercent: 155, duration: 0.8, ease: "power2.out", stagger: 0.03 }, 
re.to(_.current, { value: a, duration: 0.5, ease: "power2.out", onUpdate: () => {
  h.current && (h.current.textContent = Math.round(_.current.value) + "%");
```
- Conflict: digest fit is 1450 ms power3.inOut (rmse .048) for widthPct 22.6→99.9, code says 2 s expo.inOut. Unclear which build the fit came from.
- Port: useLayoutEffect with paused gsap timelines, resume from onComplete; write counter text via onUpdate, not React state.

### D2. Cursor magnet (two layers)
- User sees: two elements lean a few pixels toward the cursor and settle.
- Mechanism: window mousemove → per ref: vector to element centre, influence `min(d, M*20)/(M*20)`, offset = unit vector × influence × M; gsap tween with overwrite.
- Params: maxMove 0.6 and 1.2 px (so max offset = maxMove px, influence radius 12 / 24 px); 0.6 s power2.out; `overwrite: "auto"`; gated by `de.current`. Not in digest (code-only).
- Key excerpt (device-code L10977-10991):
```
const bt = ke(Ye), mn = Ie.clientX - bt.x, dt = Ie.clientY - bt.y, On = Math.sqrt(mn * mn + dt * dt), Wt = Math.min(On, Me * 20) / (Me * 20), Sn = mn / On * Wt * Me, nr = dt / On * Wt * Me;
re.to(Ye, { x: isNaN(Sn) ? 0 : Sn, y: isNaN(nr) ? 0 : nr, duration: 0.6, ease: "power2.out", overwrite: "auto" });
```
- Port: window listener + gsap.quickTo for x/y per element.

### D3. Proximity opacity field (rAF lerp)
- User sees: tiles near the pointer dim toward the cursor, with smooth follow.
- Mechanism: rAF lerps `currX, currY, currStrength` toward targets; per element, manhattan distance to the cursor gives `k = min(R/30, 1)`; `opacity = 1 - strength*k*0.7`; stops when converged, then sets opacity 1.
- Params: `gf = 0.18` per frame, `fy = 30` px; convergence < 2e-3 strength and < 0.5 px. Where `targStrength` is set: unclear.
- Key excerpt (device-code L10858-10870):
```
m.currX += (m.targX - m.currX) * gf, m.currY += (m.targY - m.currY) * gf, m.currStrength += (m.targStrength - m.currStrength) * gf, v.forEach((b) => {
  const S = b.getBoundingClientRect(), j = S.left + S.width / 2, M = S.top + S.height / 2, R = Math.abs(j - m.currX) + Math.abs(M - m.currY), k = Math.min(R / fy, 1);
  b.style.opacity = String((1 - m.currStrength * k * 0.7).toFixed(3));
```
- Port: keep values in a ref, write style.opacity in rAF, no React re-render.

### D4. Smooth scroll (Lenis, vendor) and hero drift
- User sees: inertial smooth scroll; hero text drifts 60 px across the top of the page.
- Mechanism: Lenis `Animate.advance` lerps `value` toward `to` each frame (`hg(value, to, lerp*60, dt)`); the React wrapper runs Lenis with `autoRaf: true` (device-code L13572-13633, `k.current?.lenis`). Hero drift is ScrollTrigger scrub (L11048-11050).
- Params: Lenis default lerp not in slice (unclear); `scrollTo` default lerp = options.lerp, duration only if set. Hero: `y: 60, ease: "none", start "top top", end "bottom top", scrub: 1`.
- Conflict: digest says "native, no lerp"; slice shows Lenis instantiated. Trust the slice, verify in browser.
- Key excerpt (device-code L7106-7146, Lenis Animate):
```
this.value = hg(this.value, this.to, this.lerp * 60, s23), Math.round(this.value) === this.to && (this.value = this.to, n = true);
```
- Port: Lenis (npm `lenis`) with its own rAF; hero drift as gsap scrub tween.

---

## 3. duhaihang (Vue 2 + GSAP + custom scroll engine in build.js)

Noise: Vue async component loader (L976-1001), GSAP timeline/transform core (L2758-2798, L3466-3473), vue-router pushState (L4289-4491).

### D1. Custom wheel/touch scroll engine (translate3d wrapper)
- User sees: page glides with momentum after wheel or touch; content moves by transform.
- Mechanism: wheel/touch deltas accumulate into pending `$`; rAF `z()` moves `position` by a fraction of pending and writes `translate3d(0px, -pos px, 0px)` on the wrapper; position clamped to [0, S].
- Params: damping `T = .08` (option default); `P = [1, 28, 500]` deltaMode factors (pixel, line, page); touch velocity EMA `0.9*i + 0.1*v`; overscroll `bounce` default 0 (disabled); `I = .15` overscroll decay × .98; `scrollTo(t, e)` default 500 ms with `tt(t) = t<.5 ? 2t² : 4t-2t²-1`; `L = 2` on mobile, 1 desktop; `M = 50` purpose unclear.
- Key excerpt (src, `G`; device-code raf-lerp L4673-4679 for `z`):
```
function G(){var t=$;Math.abs(t)<.01&&(j.target=0,j.position=E+t);var e=t*(1-T);e|=0,j.target=e,j.position=E+t-e}
function Z(t){v.style.transform="translate3d(0px, "+-t+"px, 0px)"}
```
- Effective behavior: each frame ~8% of pending delta is committed to position and the pending value shrinks by 0.92, an exponential ease-out.
- Conflict: digest says "native". Digest Home.f transform.y tweens (-1455→-2880 css ease-out 900 ms, etc.) fit a transform wrapper, but which element this engine drives is unclear.
- Port: one rAF loop with `pending += delta; pos += pending*0.08; pending *= 0.92`; transform on one wrapper; overflow hidden on the page.

### D2. Preloader sequence (progress bar, curtain)
- User sees: thin bar fills to 80% during load, goes to 100%, a curtain (cen) scales away, app shows at ~2 s.
- Mechanism: Vue Preloader component. `next()` tweens prog to .8 over 1 s and waits for event `prep:buffer`; `done()` tweens prog to 1 (.3 s), cen scaleX 0 (1.7 s, delay .3), component x 0 (delay 1.7), emits `app` at .3 s and `prep:lazy` + destroy at 2 s.
- Key excerpt (src, grep "prep:buffer"):
```
next:function(){var t=this;gsap.to(this.$refs.prog,1,{scaleX:.8,ease:Quad.LS69n}),h.a.PHL0A("prep:buffer",function(){t.done()})},done:function(){gsap.to(this.$refs.prog,.3,{scaleX:1,ease:Quad.LS69n}),gsap.to(this.$refs.cen,1.7,{scaleX:0,delay:.3,ease:Cubic.LS69n})
```
- Conflict: digest cen fit 1650 ms power2.inOut vs code 1.7 s with obfuscated ease name (GSAP Cubic = power3 family). Progress fit rmse .314 (unknown). Ease name unclear.
- Port: gsap timeline with the same stages; emit ready from the asset loader.

### D3. Entry text and city wipe (CSS only)
- User sees: "city" line wipes in from left; blocks fade up 15 px.
- Params (digest): `span.city1` scaleX 0→1, 1.5 s cubic-bezier(.86,0,.07,1); headline/journey/endline/footer/contact/copyright opacity 0→1 0.4 s and translate3d(0,15px)→none 0.7 s. No JS slice.
- Port: CSS transitions toggled by a class after preloader.

---

## 4. localstudio (Webflow ix2 + GSAP; three.js noise)

Noise: three.js shader chunks and ShaderMaterial (L122-209, L6325-7177, shaders.glsl), three.js math (L3589-4261), three.js FileLoader (L14773-14878), OrbitControls and cannon-es physics (L20440-20665), GSAP core (L15533, L15996), feature detection (L212-220). Wheel observer L17089-17129 is GSAP Observer-style vendor; site use unclear.

### D1. Character roll on hover (link/nav text)
- User sees: letters roll up and out; a second copy rolls in from below.
- Mechanism: text split into char spans twice (copy A visible, copy B `yPercent: 130` absolute); paused timeline plays on hover.
- Params (device-code L572-585): default `duration 0.35, ease Zt, stagger 0.015`; "Copied!" variant 0.4 s stagger .02, copy swaps `yPercent -130`. Digest: hover-in 350 ms power1.out stagger ~7 ms (x32); hover-out 350 ms power2.in stagger ~14 ms. Slice default .015 vs digest 7 ms: unclear which direction uses which.
- Key excerpt (device-code L572-585, cut):
```
const r = new $u(i, { types: "chars", tagName: "span" }).chars, o = document.createElement("div");
...
Ce.set(a, { yPercent: 130 }), this.tl = Ce.timeline({ paused: true, defaults: { duration: 0.35, ease: Zt, stagger: 0.015 } }), this.tl.to(
```
- Port: split once with SplitText, gsap paused timeline, play on mouseenter and reverse on leave.

### D2. Scroll-scrubbed section parallax
- User sees: service and footer blocks drift upward slower than the scroll.
- Mechanism: per element ScrollTrigger timeline, `start "top bottom"`, `end "90% bottom"`, `scrub: 1`, yPercent 0 → -amount, amount = `data-amount` or 50.
- Key excerpt (device-code L617 region, L600-625):
```
this.amount = Number(e.dataset.amount) || 50;
this.tl = Ce.timeline({ scrollTrigger: { trigger: this.element, start: "top bottom", end: "90% bottom", scrub: 1, paused: true } }), this.tl.fromTo(this.element, { yPercent: () => 0 }, { yPercent: () => -this.amount
```
- Digest: services -19.9 (1650 ms power4.out), footer -3.7→-19.8 (1400 ms quart-out). Those end values match an amount near 20, not the default 50: unclear which data-amount was used.
- Port: gsap.context + ScrollTrigger in useLayoutEffect, cleanup on unmount.

### D3. Staggered word/menu reveal
- User sees: nav and menu words rise in sequence on load.
- Mechanism: per item `animateIn` `yPercent 105 → 0`, delay `0.075*index`; `animateOut` sets yPercent 105.
- Key excerpt (device-code L600-611, L23599-23614):
```
Ce.to(this.elements.span, { yPercent: 0, ease: Zt, duration: 0.6, delay: 0.075 * this.index }), super.animateIn();
```
- Digest agrees: `p.oh` ×6 0→103.7 600 ms power1.out stagger 76 ms; `nav` -96→0 1000 ms quart-out (house ease cubic-bezier(.19,1,.22,1)). Ease name Zt = house quart-out (digest rmse .002).

---

## 5. rxk (Nuxt/Vue + GSAP ScrollTrigger + Lenis)

Noise: vue-router popstate/404 (entry.5472ee6a.js L3858-3894, L4586-4593), GSAP ScrollToPlugin wheel-kill (L510-550), GSAP core (index L129-169), GSAP flip (L311-369). Keyboard/touch nav (AppFooter L514-522, L262) is real input, not motion.

### D1. Wheel-scrubbed "Have A Break" sentence (site code, src)
- User sees: spans flicker on and off in a loop; scrolling the wheel scrubs the loop; after 2 s idle the hidden words come back.
- Mechanism: paused timeline `o` animates span autoAlpha with stagger `{each: 1, repeat: -1}`, random 0/1 flicker on repeat; wheel listener adds `deltaY/1000` to scrub clock `i` (starts 400) and calls `o.time(i+40)`; 2 s timer after last wheel re-shows spans with autoAlpha 0.
- Key excerpt (src, HomepageSentence1, ~offset 65957):
```
o=l.timeline({paused:!0,repeatDelay:4}),o.to(s.value.querySelectorAll("span"),{duration:4,stagger:{each:1,repeat:-1,onRepeat(){l.set(this.targets()[0],{autoAlpha:Math.round(Math.random())})}}})
function h(m){i+=m.deltaY/1e3,o.time(i+40),window.clearTimeout(c),c=setTimeout(()=>{
```
- Stagger value for the reveal after idle is cut off in the grep window (reads ".1"): unclear.
- Port: gsap paused timeline, wheel handler calls tl.time(), debounced reveal via setTimeout.

### D2. Scroll-scrubbed line and word wipes
- User sees: hero lines slide up as the page scrolls; footer words wipe in on scrub.
- Mechanism: ScrollTrigger scrub tweens on `.ligne-child` (y → 100%) and `.word-above`/`.word-under` (y 100% / 0%).
- Params: hero `.word` opacity 1 delay 1 stagger .16 power4.inOut (device-code L22-28); `.ligne-child` y 100% power1.inOut `scrub: true`; word wipes y 100% power1.inOut `scrub: 1`, start "bottom bottom", end "top 55%", after delayedCall 1 s, desktop ≥1025px (L724-732).
- Key excerpt (device-code L724-732):
```
l.to(i, { y: "100%", ease: "power1.inOut", scrollTrigger: { trigger: i, start: "bottom bottom", end: "top 55%", scrub: 1 } });
```
- Conflict: digest word-above ease power4.out (1150 ms, stagger 36). Slice says power1.inOut. Unclear which is live.

### D3. Mobile scroll-velocity push and cycling stack (≤1024px)
- User sees: on mobile, scrolling nudges a stack of cards; cards cycle z-order on a 4 s loop.
- Mechanism: `quickTo(delta)` fed by scroll delta, eased back to 0 after 120 ms idle; scale loop with `stagger {each: .5, repeat: -1}`, z-index rotated in `onRepeat`; ticker only runs while the section is in view.
- Key excerpt (device-code L35-51):
```
r = l.quickTo(h, "delta", { duration: 0.5, ease: "power3" }), window.addEventListener("scroll", () => {
  r(window.scrollY - c), c = window.scrollY, window.clearTimeout(p), p = setTimeout(() => { r(0); }, 120);
}), s.to(a.value.children, { scale: 1, ease: "power2.inOut", duration: 4, stagger: { each: 0.5, repeat: -1, onRepeat() {
```
- Digest: shape transforms (scale/y/rotate) fit poorly (rmse .03-40); unclear.

### D4. Smooth scroll (Lenis, vendor) and conflict
- Lenis `Animate.fromTo` default `lerp = 0.1`; advance uses `1 - Math.exp(-n*a)` as the blend (device-code L909-949, L146-148).
- Key excerpt (device-code L909-949, cut):
```
})(t, r, 1 - Math.exp(-n * a))), Math.round(this.value) === this.to && (this.value = this.to, i = true);
```
- Conflict: digest says "native, no lerp". Lenis is in the bundle. Verify live.

---

## 6. monogrid (Vue + GSAP + Lenis + three.js)

Noise: three.js shader chunks (L569-1870, shaders not site-specific in slices; uniforms in digest: uVelocity, tVelocity, uPointer, uAspect, uSize, uOpacity: unclear), GSAP Inertia/Observer/Flip vendor (L1917-1920, L2129-2174, L2282-2341), punycode (L2519-2582), vueuse observer (dist L281-296).

### D1. Text reveal effect library (GSAP custom helpers)
- User sees: intro lines rise out of a mask; text reveals as chars, words, scale or scaleX/Y.
- Mechanism: helpers wrap `gsap.from` with SplitText chars/words, revert on complete, add role=group for a11y.
- Params (device-code L3131-3171, L3178-3184): line helper `jf`: yPercent 140, power3.inOut, stagger .03; `Of` chars: power3.inOut, duration = charCount×0.167, stagger amount = duration/2 from start; `Df` opacity 0, ease none, .3 s stagger .03; `kf` words steps(1), color black; custom `blink` (stagger each .1 random, .65 s power2.in); `objScale` (rotation -20°→0, -90°→0). Digest intro: `div x23` y 140→0, 1000 ms power3.inOut, stagger 28 ms (rmse .006): matches `jf`.
- Key excerpt (device-code L3131-3171, `jf`):
```
function jf(e18, t2) {
  return ze.from(e18, { yPercent: 140, ease: `power3.inOut`, stagger: 0.03, ...t2 });
}
```
- Port: small functions returning paused gsap timelines, play from IntersectionObserver.

### D2. Viewport reveal trigger
- User sees: each block reveals once when it enters view and pauses when it leaves (optional).
- Mechanism: per element `IntersectionObserver`; enter → play reveal; leave → pause or seek to end and destroy. Default threshold 0.
- Key excerpt (device-code L3204-3208):
```
e18._reveal.observer = new IntersectionObserver(([{ isIntersecting: n2 }]) => {
  n2 ? Bf(e18) : t2 ? e18._reveal.animation.pause() : !e18._reveal.parent && !e18._reveal.animation.paused() && (e18._reveal.animation.seek(e18._reveal.animation.duration()), e18._reveal.destroy?.());
```
- Port: useEffect with IntersectionObserver; gsap paused timeline per block.

### D3. Bottom scroll progress bar (CSS vars bound to scroll)
- User sees: thin bar at the bottom fills as you scroll; loader state animates width to 100% / 0% in 1.5 s.
- Mechanism: `ScrollProgress` component: ScrollTrigger timeline `scrub: true` (start top top, end bottom bottom) drives `progress1`/`progress2`, exposed as CSS vars `--v6840ce0d` / `--v6840ce0e`; loader change tweens width.
- Params: loader width → "100%" or "0%", 1.5 s power4.inOut. Digest: `--v6840ce0d` .619→.751 1500 ms power2.out; `--v6840ce0e` .985→.905 1500 ms css ease. Scrub timeline body is truncated in the slice: unclear beyond the start/end.
- Key excerpt (device-code L8313-8353 region, L425-429):
```
f2 = kt.timeline({ scrollTrigger: { start: `top top`, end: `bottom bottom`, scrub: true } }).fr
i([c2, d2], ([e4, t3]) => { e4 && (Jt.refresh(), kt.to(e4, { width: t3 ? `0%` : `100%`, duration: 1.5, ease: `power4.inOut` })); });
```
- Port: one ScrollTrigger writing two CSS vars on a fixed bar; drive the bar with transform scaleX, not width.

### D4. Smooth scroll (Lenis, vendor; conflicts with digest "native")
- Lenis `Animate.advance`: `this.value = Ua(this.value, this.to, this.lerp * 60, e3)`; `scrollTo` uses `options.lerp` and `options.duration` only if programmatic; reduced motion → immediate.
- Key excerpt (device-code L7969-8009):
```
} else this.lerp ? (this.value = Ua(this.value, this.to, this.lerp * 60, e3), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t2 = true)) : (this.value = this.to, t2 = true);
```
- Default lerp: unclear (not in slice).

---

## 7. eisenberger (jQuery-era + GSAP + PhotoSwipe, CSS-led)

Noise: GSAP CSSPlugin and TweenLite (vendor L2020-2032), morphSVG (vendor L128-135), PhotoSwipe UI defaults (vendor L6-46: timeToIdle 4000, loadingIndicatorDelay 1000), PhotoSwipe key handler (L368-390).

### D1. CSS load sequence (header, menu, title, picker)
- User sees: header slides down; menu toggle, site title and language picker slide in with 200 ms steps.
- Mechanism: CSS transitions/animations keyed by load class; no JS tween recorded (digest: 0 JS tweens).
- Params (digest L12-16, source.css exact): header `translateY(-100%)→0` 700 ms cubic-bezier(.77,0,.175,1) at 600 ms; menu toggle 500 ms cubic-bezier(.165,.84,.44,1) delay 400; title `translate(-50%,-400%)→(-50%,-50%)` 500 ms delay 600; picker `translateY(-150%)→-50%` 500 ms delay 800; image fade 1000 ms ease-in-out.
- Key excerpt (digest L12-13, verbatim):
```
[load@600] CSSTransition transform on header.js-site-head.site-head: 700ms cubic-bezier(0.77, 0, 0.175, 1) delay 0 iter 1
[load@600] CSSTransition transform on a.js-menu-toggle.menu-toggle: 500ms cubic-bezier(0.165, 0.84, 0.44, 1) delay 400 iter 1
```
- Port: CSS animation with animation-delay; no JS needed.

### D2. Circle icon stroke draw (trigger unclear)
- User sees: a circle icon draws itself with its label fading in.
- Params (digest L17-22): `path.circle` stroke-dashoffset 435.6→0 and opacity 0→1, 250 ms ease-out, delay 1500; `path` stroke-dashoffset 63.4→0 660 ms linear; label opacity 600 ms and translateY 10%→0 500 ms cubic-bezier(.25,.46,.45,.94), delay 1500. Phase tag "scroll0" is not a measured scroll event: trigger unclear.
- Port: SVG stroke-dasharray/dashoffset keyframes in CSS.

### D3. Lightbox from thumbnail (PhotoSwipe)
- User sees: clicking a photo opens a full-screen viewer that zooms from the thumbnail; the browser back button closes it; wheel scroll closes it (modal).
- Mechanism: slide click builds the item list from the DOM and inits PhotoSwipe with `getThumbBoundsFn` (thumb rect + scrollY); the page pushes its own history state `{lightbox: true}`; a popstate listener closes the viewer.
- Params (device-code L594-613): `barsSize {top 90, bottom 25}`, `preload [1, 2]`, `showHideOpacity: false`, `spacing 0`, `history: false` (the page does its own pushState). Wheel (vendor L2333-2341): deltaMode 1 → ×18; close when `|deltaY| > 2` with closeOnScroll.
- Key excerpt (device-code L594-613, cut):
```
if ((a3 = { galleryUID: r2.getAttribute("data-pswp-uid"), getThumbBoundsFn: function(e2) {
  var t5 = c2[e2].el.getElementsByTagName("img")[0], n2 = window.pageYOffset || document.documentElement.scrollTop, i2 = t5.getBoundingClientRect();
  return { x: i2.left, y: i2.top + n2, w: i2.width };
}, showHideOpacity: false, spacing: 0, preloaderEl: false, fullscreenEl: false, zoomEl: false, shareEl: false, history: false, preload: [1, 2], barsSize: { top: 90, bottom: 25 } }).index = parseInt(t4, 10),
```
- Port: FLIP from the thumbnail rect (framer-motion layoutId or gsap Flip) in a plain modal, with history pushState and popstate close.

### D4. Lazy image reveal
- User sees: images fade in as they come near the viewport.
- Params (device-code L777-791): desktop threshold 800 px, mobile 400 px; throttle 200 / 40 ms; class `has-loaded`; `show_while_loading: true`; book image `src` swapped on book open.
- Key excerpt (device-code L777-791, cut):
```
return new n({ threshold: t2.isMobile ? 400 : 800, elements_selector: t2.lazyClass, throttle: t2.isMobile ? 40 : 200, data_src: "src", class_loaded: "has-loaded", show_while_loading: true, callback_set: t2.isBooks
```
- Port: native loading="lazy" or IntersectionObserver with rootMargin 800px.

### D5. Contact form: submit button flip (CSS class)
- User sees: the submit button flips to a state when the message is too short, flips back when long enough.
- Mechanism: keyup/paste on `#message` toggles `is-flipped` on the `.flip-trigger`; submit success clears fields and adds `is-submitted`.
- Key excerpt (device-code L60-62):
```
function d(t2) {
  t2.target.value.length >= parseInt(t2.target.getAttribute("data-min-length")) ? (e.removeClass(s2, "is-flipped"), e.removeClass(t2.target.parentNode, "is-error")) : e.addClass(s2, "is-flipped");
```
- Flip duration in CSS: unclear (not in digest).
- Port: React state for validity, class-driven CSS flip.
