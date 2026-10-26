# device-teardown-E — how each site's devices work (from slices)

Source: forensics/<slug>/device-code.md (esbuild-reprinted slices). Cross-checked against motion-digest.md and specs-E.md. Excerpts are verbatim from the slice unless marked "source.js.txt". Blank lines inside excerpts removed. "unclear" = not in any slice.

---

## inkwell (inkwell.tech)

**Glass cursor (17px glass, 6px dot)** — a glass blob follows the pointer, lagging behind it, and pulls toward magnetic targets.
- Mechanism: document mousemove/dragover/touchstart/touchmove write a mouse ref (pointer slice, BtC8HlFy.js L27666-27702). A per-frame ticker (delta) runs Damp(..., 6e-3, delta) on x/y, then writes transform px on the cursor node. If a target is attached, the aim point is the target centre plus 0.2 x (vector from centre to pointer).
- Params: lambda 6e-3 per Damp call; RoundWhenClose snaps near-equal values; magnet factor 0.2. Damp body not in any slice, so the formula is unclear (likely 1-exp(-lambda*dt)).
- Excerpt (source.js.txt L609-611, not in device-code.md):
```
const p = o.currentState.attached.value.getBoundingClientRect(), l = new y(p.x + p.width * 0.5, p.y + p.height * 0.5), C = l.distance(new y(n.value.x, n.value.y)), I = new y(n.value.x, n.value.y).sub(l).normalize(), b = new y(I.x * C * 0.2, I.y * C * 0.2);
a = r.Damp(a, l.x + b.x, 6e-3, u), s = r.Damp(s, l.y + b.y, 6e-3, u), a = r.RoundWhenClose(a, l.x + b.x), s = r.RoundWhenClose(s, l.y + b.y), r.T(c.value, a, s, "px");
```
- Conflict: specs-E/cursor-probe claim a CSS `.glass{transition:transform 1s cubic-bezier(.19,1,.22,1)}`. The slice shows JS writing transform every frame. Unclear whether both run; the CSS transition would double-lag if both apply.
- Port: one rAF loop, damp x/y toward pointer (or magnet point), write transform: translate3d. Keep the CSS ease only if JS is removed.

**Text-line blur/stagger reveal** — lines fade from blurred to sharp as they enter, with the block scaling in.
- Mechanism: a paused GSAP timeline is built on the line split. Its progress is driven by the watcher on textUiLeaveScrub (handler body not in slice, so scrub vs time is unclear). Initial state is rotateY -50, rotateZ 10, y = innerHeight.
- Params: lines opacity 0 with filter blur(3px), stagger 0.05, overwrite auto; parent scale 0.95; no duration (scrubbed). Line splitter is not in the slice (unclear; specs say custom, not SplitText).
- Text UI show/hide (same file, L127-147): show = opacity 1, 0.4s, power3.inOut; hide = opacity 0, 0.1s, power3.inOut; flag T guards re-entry.
- Excerpt (b1fLF-N-.js L102-118):
```
d = ce(_.value, true), se(() => {
  f.set(_.value, {
    rotateY: -50,
    rotateZ: 10,
    y: window.innerHeight
  }), p = f.timeline({
    paused: true
  }), p.to(d.lines.value, {
    opacity: 0,
    filter: "blur(3px)",
    stagger: 0.05,
    overwrite: "auto"
```
- Port: split lines (custom or SplitText), GSAP timeline paused, scrub with ScrollTrigger scrub: true, filter blur(3px) on each line.

**Scrubbed word rise (scroll)** — words rise out of masks as you scroll.
- Mechanism: ScrollTrigger timeline with scrub true from start 25 to +=200. Words start at yPercent 100 and move to -120 with stagger 0.01. A second element moves to -200 over 0.5s, ease none.
- Excerpt (DruYjBBn.js L34-56):
```
const a = n.timeline({
  scrollTrigger: {
    start: 25,
    end: "+=200",
    scrub: true
  }
});
a.to(p, {
  yPercent: -120,
  stagger: 0.01
}, 0), a.to(b.value, {
```
- Cross-check: digest "word rise" 1000ms power2.inOut stagger 9-14ms is a load/hover tween, not this scrub. Digest "scroll words" 150ms is a sampling artifact of a scrub. Stagger 0.01 agrees with digest.
- Port: GSAP ScrollTrigger scrub on a span.word mask, yPercent 100 to -120, stagger 0.01.

**Scroll step indicator (7 steps) + light-mode switch** — a fixed indicator tracks which section is active and flips light/dark.
- Mechanism: 7 steps (Intro, Vision, Intelligence, Applications, Talents, Work, Contact) each read a progress ref. Active step = first with 0 <= progress < 1. Index > 2 turns on light mode, with the .light class added after 1.3s.
- Excerpt (BwPMNtDe.js L59-99 and L107-122):
```
d.to(r.value, {
  autoAlpha: 1,
  duration: 3.2,
  ease: "expo.out",
  delay: 0.8
}), D(l, (e, n) => {
```
- Port: a computed active index from scroll progress, light-mode store, GSAP delayedCall 1.3.

**Shader uniforms (WebGL card and glass)** — glass refracts the background, and card shaders darken with frost and light.
- Glass (shaders.glsl shader 13, L455-611), uIOR and uPortal:
  - uIOR (decl L475): refractedColor = bg*(1-uTransmissionOpacity) + bg*uTransmissionOpacity*uIOR (L604). Used as a background multiplier, not an optical index. uTransmissionOpacity is the real weight.
  - finalColor = mix(refracted, mix(gradient, matcap, matcap.r), 0.8). uNoiseStrength perturbs matcap UVs with snoise (L~585-600).
  - uPortal (L474, L611): `gl_FragColor = uPortal < 0.5 ? gl_FragColor : vec4(1.0, 0.0, 0.0, 1.0);` (red when >= 0.5). Card slice uses the opposite: uPortal >= 1 gives transparent. Two semantics; unclear which is live.
- Card (device-code.md shader-uniforms L1457-1517 and fragment L345-382 in shaders.glsl L689-723):
  - tFrost (decl L689) and uFrost (L695): `color.rgb *= mix(mix(0.90, 1., 1. - uFrost), 1., length(texture(tFrost, vUv).rgb));` At uFrost=1 this sets base brightness 0.90, lifted by the frost texture's luminance.
  - Vignette: `color.a *= 1. - smoothstep(0.4, 1., length(vUv - .5) * 2.) * .18 * uFrost;` (up to 18% alpha at corners).
  - uLight (L694): `color.rgb -= color.rgb * vec3(1.,1.,1.) * diffuse * 0.6 * uLight;` with diffuse = max(dot(vNormal, normalize(vec3(-10., -10., -1.))), 0). uLight = 1 - stackProgress.opacity (L1457).
  - uAspect (L698): sample y remapped as (vUv.y-.5)/uAspect+.5.
  - uSafari (L719): forces alpha = uOpacity (no-op in slice).
  - Writers of uPortal, uFrost, uAspect (ge(), We() stores) are not in slices: unclear.
- Excerpt (device-code.md shader-uniforms L362-373):
```
void main() {
    vec4 color = texture(tMap, vec2(vUv.x, (vUv.y - .5) / uAspect + .5));
    color.a = uOpacity;
    color.rgb *= mix(mix(0.90, 1., 1. - uFrost), 1., length(texture(tFrost, vUv).rgb));
    color.a *= 1. - smoothstep(0.4, 1., length(vUv - .5) * 2.) * .18 * uFrost;
    float diffuse = max(dot(vNormal, normalize(vec3(-10., -10., -1.))), 0.0);
    color.rgb -= color.rgb * vec3(1.,1.,1.) * diffuse * 0.6 * uLight;
```
- Port: OGL Program with uniforms tMap, tFrost, uFrost, uLight, uAspect, uPortal; drive uLight from the stack-progress store.

**Noise** — GSAP core and ScrollTrigger internals (BtC8HlFy L12382-12422, L10209 router, L14264-14307), Sentry (L23907), tweakpane debug UI (L30300, L30407), MutationObserver (L22480). The wheel-step gesture lib (L15369) is unclear whether the site uses it.

Timing cross-check: scrub stagger 0.01 vs digest 9-14ms agrees. Indicator 3.2s and text UI 0.4/0.1s are slice-only (no digest row).

---

## frost (frostype.xyz)

**Idle clock screensaver (17s)** — after 17s with no input, a clock face shows; the hands track real time.
- Mechanism: setInterval(saver, 17000). mousemove/keydown/scroll reset via clearTime. Above 800px width, saver adds class idle and body freeze_scroll_intro. A rAF loop (runClock) sets hand rotations from wall-clock time.
- Params: hour = 30*h + 0.5*min; minute = 6*min + 0.1*sec; second = 6*sec + 0.006*ms.
- Excerpt (default.5aa33629.js L1-36, slice L147-152):
```
var a = this.$el.querySelector(".hour"), h = this.$el.querySelector(".minute"), p = this.$el.querySelector(".second"), i = 30 * n + 0.5 * d, r = 6 * d + 0.1 * _, b = 6 * _ + 6e-3 * l;
a.style.transform = "rotate(" + i + "deg)", h.style.transform = "rotate(" + r + "deg)", p.style.transform = "rotate(" + b + "deg)", requestAnimationFrame(this.runClock);
```
- Port: useEffect with setInterval(17000) to set idle; rAF clock with CSS transform.

**Header carousel: 5s autoplay + follow-cursor prev/next hints**
- Mechanism: setInterval(this.next, 5e3) in mounted. Progress bar class moves to the active slide. prevCursor/nextCursor position a hint at the arrow's rect plus the pointer offset (offsetX/offsetY), opacity 1. hideCursor sets opacity 0. Drag: records scrollLeft and clientX, then scrolls by the delta.
- Cross-check: specs carousel prog 5000ms matches 5e3.
- Excerpt (Typeface.87c0fccf.js L72-112, slice L97-101):
```
nextCursor(o) {
  const t = this.$el.querySelector(".typeface_page_header_carousel_cursor_next");
  t.style.opacity = 1;
  const s = this.$el.querySelector(".typeface_page_header_carousel_next").getBoundingClientRect(), c = s.top, r = s.left, a = o.offsetY + c, l = o.offsetX + r;
  t.style.top = a + "px", t.style.left = l + "px";
```
- Port: React state for slide index with setInterval 5000; cursor hint as absolutely positioned element.

**Hide-on-scroll title nav (desktop only)**
- Mechanism: scroll handler titleNav: if pageYOffset > oldScroll (down), desk nav translateY(-100px) and page title nav translateY(0); if up, reverse. Gated to innerWidth > 1000.
- Excerpt (Typeface slice L68-69, truncated in slice):
```
var o = window.pageYOffset;
const t = document.querySelector(".desk_nav_title"), s = document.querySelector(".typeface_page_title_nav");
window.innerWidth > 1e3 && (o > this.oldScroll ? (this.oldScroll = o, t.style.transform = "translateY(-100px)", s.style.transform = "translateY(0)") : o < this.oldScroll && (this.oldScroll = o, t.style.transform = "tra
```
- Port: scroll-direction state, transform on two nav elements.

**Dark nav by background luminance** — the nav switches to dark when the sampled background is dark.
- Mechanism: on input and mousemove, darkMode() reads computed background of .typeface_page_background_edit. If r+g+b < 210, body gets dark classes.
- Port: sample element background, sum rgb channels, toggle body class.

**Image lazy-load and play-on-view**
- Mechanism: on scroll, if the container top minus innerHeight plus 100 is < 0 and the video readyState >= 3, play it and show. Pause when bottom < 0. Aspect ratio via padding-top = height/width*100%.
- Excerpt (Image.48909f74.js L1-25, lazyLoad line truncated in slice):
```
const e = this.$el.querySelector(".image_image_container"), t = e.getBoundingClientRect().top - window.innerHeight + 100, l = e.getBoundingClientRect().bottom, i = e.querySelector(".image_image")
```
- Port: IntersectionObserver with rootMargin -100px; play/pause video.

**Intro letter build** — "F", then "FR", then "FRO" on 500/550ms timers; body overflow hidden.
- Excerpt (default.5aa33629.js slice L162-169): setTimeout(() => { e.innerHTML = "F"; }, 500); then 550 for "FR", then "FRO". Later timings are truncated in the slice: unclear.

**Noise** — Snipcart (entry L5324-5355, snipcart.js), nuxt-link prefetch (L2-42, L88-101), Nuxt history (entry L3769-3805), Nuxt 404 (L4604-4611), lottie runtime (L7015-7067, L7861-7901; the Image component imports Vue3Lottie, but its content is not in a slice: unclear).

---

## exat (exat.hottype.co)

**Scrubbed media wipe (clip-path)** — the second media in a section wipes from top to bottom as you scroll through it.
- Mechanism: paused gsap.fromTo on t[1] (second .media), scrub true, between top 50% and bottom 50% of .media-frame. ease none.
- Excerpt (source.js.txt, minified; device-code.md L51 is cut off at the trigger):
```
window.R2Methods.typeDemo=function(e){const o=e,t=o.querySelectorAll(".media");gsap.fromTo(t[1],{clipPath:"polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)"},{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",ease:"none",paused:!0,scrollTrigger:{trigger:o.querySelector(".media-frame"),toggleActions:"none none none none",start:"top 50%",end:"bottom 50%",scrub:!0}});
```
- Port: GSAP fromTo with ScrollTrigger scrub true, clipPath polygon.

**SplitText word rise on reveal** — titles split into lines and words, then words rise on enter.
- Mechanism: SplitText 3.12.7 (bundled plugin, real) splits [reveal-title] into lines and words. gsap.from(words) with y -250%, skewY -5deg, expo.out, duration 1, stagger = data-stagger or 0.1, triggered at top 90%. On <=768px toggleActions = "play none none none". Footer: chars split, y -105% desktop / -25% mobile, stagger 0.1 / 0.15.
- Discrepancy: specs-E digest measured stagger 13ms and y -245. The slice default is 0.1s, so 13ms must come from a per-element data-stagger (unverified).
- Excerpt (scripts/index.min.js L1-7, slice L104-106; last line cut in slice):
```
const t = new SplitText(e, { type: "lines, words", linesClass: "split-lines", wordsClass: "split-words" });
let o = window.innerWidth <= 768 ? "play none none none" : e.dataset.toggleActions;
e.anim = gsap.from(t.words, { y: "-250%", skewY: "-5deg", ease: "expo.out", stagger: e.dataset.stagger || 0.1, duration: 1, paused: true, scrollTrigger: { trigger: e, start: "top 90%", toggleActions: o || "play none
```
- Port: SplitText (or the GSAP Club version) on lines and words, gsap.from with ScrollTrigger.

**Smooth scroll (Lenis)** — desktop only, driven by the GSAP ticker (per slice).
- Config: duration 0.9, lerp 0.2, easing 1-(1-t)^6. Specs-E says Lenis default lerp 0.1, which the slice contradicts. Lenis may ignore lerp when duration is set (library behaviour, unverified here).
- Excerpt (scripts/index.min.js L23-27, truncated):
```
R2Dom(), RevealsInit(), videosControl(), menuControl(), menuHoverAnimation(), footerControl(), initHeaderAnchors(), isMobile || (lenis = new Lenis({ duration: 0.9, lerp: 0.2, easing: (e) => 1 - Math.pow(1 - e, 6) }), g
```

**Numbers wheel (spring-like sine wobble)** — digit columns sway with sin(), pulled toward targets, and scroll pushes the targets.
- Mechanism: while in view (ScrollTrigger on/off), a rAF loop eases each phase s toward target i (rate 0.1 per 16.67ms), transform translateY(55*sin(s)%). Scroll adds 0.05 to every target. Pointer moves are throttled to 16ms.
- Targets: 3.5 - 0.6*index.
- Excerpt (break_section script L1-28, slice L82):
```
for (let e3 = n.length - 1; e3 >= 0; e3--) s[e3] += (i[e3] - s[e3]) * (0.1 * t2), n[e3].style.transform = `translateY(${55 * Math.sin(s[e3])}%)`;
```
- Port: rAF with dt-normalised lerp; Lenis/ScrollTrigger hooks.

**Rotating pieces (pointer-follow rotation)** — rotator images turn to point at the pointer, with shortest-path unwrap.
- Mechanism: mousemove computes target angle atan2(dy,dx)*180/pi + 90, unwrapped to the shortest path (g). A per-frame lerp a += 0.1*(s - a) writes rotate(a deg). Auto mode is gsap rotate 360 infinite, 6s, offset 5deg per index. Scroll fallback fires synthetic pointer at centre, 16.67ms throttle.
- Excerpt (scripts/index.min.js L132-179, slice L160-173):
```
let c2 = Math.atan2(a2, r2) * (180 / Math.PI) + 90;
s[t2] = g(s[t2], c2);
...
if (d && e2 - c > 16 && (p(d), d = null, c = e2), !l) for (let e3 = 0; e3 < o.length; e3++) a[e3] += 0.1 * (s[e3] - a[e3]), o[e3].style.transform = `rotate(${a[e3]}deg)`;
```
- Port: rAF with lerp 0.1; keep the unwrap helper.

**Glyph 45-degree snap** — the glyph rotates in 45-degree steps toward the pointer.
- Excerpt (glyph_section script L8-18, slice L346-352): `let l = Math.atan2(c, a2) * (180 / Math.PI) - 90;` then `o = 45 * Math.round(o / 45);`.

**Circle rotation (scroll-gated)** — rings rotate continuously, speed ramps down when centred.
- Excerpt (glyph_section circleAnimation, slice L372): `e2.anim = gsap.fromTo(e2, { rotate: 0 }, { rotate: 360, duration: 32 - 4 * t2, delay: n2, ease: "none", repeat: -1, paused: true });`. Speed ramp: timeScale tween 10 to 1, expo.out, 10s, on centre hit (slice L364-368). Pinned above 768px, pinSpacing false.

**Splide wheel** — carousel steps one slide per wheel tick, threshold-gated.
- Excerpt (plugins/splide slice L951): `U(u2) > r3 && o2 < i2 - a2 && (e2.go(t4 ? "<" : ">"), a2 = i2)`. Whether this option is enabled on exat is unclear.

**Noise** — SplitText library and ScrollTrigger lib internals (ScrollTrigger L112-146, L441-515), Splide ARIA and key map (L288-406), wheel-step handlers for ScrollTrigger (L112-146).

Keyboard: no site keyboard motion in slices (Splide key map only). Unclear.

---

## hvdmatch (hvdfonts.com)

**Hero control** — unclear. No hero element appears in any slice. Closest real control: the variable-font demo, below.

**Fullscreen type/image viewer (lightbox)** — opens a fullscreen viewer, closes with fade-out.
- Mechanism: open sets display block, adds keydown listener, optional requestFullscreen, className "visible" after 50ms. Close clears className, then display none after 500ms, exits fullscreen, restores focus. Which keys close: unclear (keydown handler De not in slice).
- Excerpt (assets/app-BHmhj9u_.js slice L83-88):
```
function Fe() {
  y.noScrollbars && (document.documentElement.style.overflowY = "auto", document.body.style.overflowY = "auto"), r.style.display !== "none" && (Je(document, "keydown", De), r.className = "", setTimeout(function()
```
- Port: state flag, body overflow lock, CSS fade with 500ms timeout.
- Cross-check: specs-E says hvdmatch has no JS tweens and no keyboard. The slices contradict both.

**Font ready reveal** — text reveals once its webfont CSS loads.
- Mechanism: init loops [data-font-family] and injects /assets/fonts/css/<family>-<woff2|woff>.css. On load: class webfont-loading to webfont-loaded, then webfont-loaded-done on transitionend or after 1000ms.
- Excerpt (assets/app slice L40-41):
```
var t = "/assets/fonts/css/" + e + "-" + (window.fontLoader.supportsWoff2 ? "woff2" : "woff") + ".css";
window.fontLoader.fontsLoaded[e] = loadCSS(t), onloadCSS(window.fontLoader.fontsLoaded[e], function() {
```
- Port: document.fonts.load and a class toggle, no GSAP needed.

**Type tester controls** — a size slider and style select drive the sample text.
- Mechanism: slider change/mousemove sets font-size px on the sample. Select change calls fontLoader.setStyle, which sets font-family and dataset weight.
- Excerpt (assets/app slice L96-101): `r.on("change mousemove", function(c) { i.css("font-size", $(this).val() + "px"); });`

**Variable-font demo (axis sliders + visibility gating)**
- Mechanism: IntersectionObserver on .js-vf-demo-title calls Op() when visible and Lp() when not. Axes read from the fvar table (min, max, default). Font select change sets Gt and calls wp() and Fp(). Op/Lp/wp/Fp bodies are not in the slice: unclear what they animate.
- Excerpt (assets/app slice L182-188):
```
new IntersectionObserver((t) => {
  t.forEach((r) => {
    r.isIntersecting ? Op() : Lp();
  });
}).observe(Rr[0]), $(".js-vf-demo-select-font-control").change(function(t) {
```

**Noise** — beacon.min.js once-listeners (L420-433), history pushState patch for analytics (L860-863), font parser bytecode (L5347-5359), CFF/TTF glyph loaders (L3937-3977).

---

## stripedev (stripe.dev/blog)

**Art card title follower (spring)** — the card art follows the pointer with a fast spring, offset +10px. Hovering the title toggles a state.
- Mechanism: motion values set on document mousemove as clientX+10 and clientY+10. A spring (damping 50, stiffness 500, restDelta 0.01) smooths them. IntersectionObserver (thresholds [0, 0.01, 0.99, 1], rootMargin -20px) reports title visibility; mouse enter/leave flags hover.
- Excerpt (3ih8kydmq861j.js slice L430-434):
```
n10 = { damping: 50, stiffness: 500, restDelta: 0.01 }
function e11(e12) {
  a10.set(e12.clientX + 10); s10.set(e12.clientY + 10);
}
return document.addEventListener("mousemove", e11), () => document.removeEventListener("mousemove", e11);
```
- Port: framer-motion useSpring with those values, or GSAP quickTo with power3 easing.

**Audio: looping bossa-nova bed + pitched chime bursts**
- Mechanism (069kld4u2z67z.js slice L85-89): Q(on) creates a Howl with html5 loop, volume 0.5 (default u), preload false, and plays it. Q(off) fades volume to 0 over 500ms, then stops. M(v) sets volume = v/10. Source of the chime (z and E, source.js.txt): z plays 6 copies at semitone offsets -12, 0, 12, 24, 36, 48 (shifted by t mod 60) with rate 2^(e/12) and volume (1-|e-30|/30)*0.3. E plays one sample at rate t and volume o.
- Excerpt (slice L85-89):
```
}, "Q", 0, function(e2) {
  if (e2) {
    let e3;
    e3 = d || (d = new r.Howl({ src: [`${i}/bossa_adapter.mp3`], html5: true, loop: true, volume: u, preload: false })), t || (t = e3.play());
  } else if (d && t) {
    let e3 = d;
    e3.fade(u, 0, 500, t), e3.once("fade", () => {
```
- Trigger for z/E/Q: unclear (not in slices).
- Port: Howler or Web Audio; gain ramp 500ms on stop; pitch via playbackRate.

**Keyboard nav** — none. The slices contain React synthetic key normalisation (221levnk5b_6s.js L1423-1463) and a key-name map. specs-E confirms no custom arrow-key motion. Verdict: no keyboard device.

**Index page** — unclear. No index-specific device appears in the slices.

**Noise** — Next image loader (42w8 L132-153), chunk-load retry (turbopack L343-357: one retry after 200+rand*401ms), Next router (L963-990), React event priorities (L7661-7701), Howler AudioContext auto-suspend after 30s (069kld L240-280). The framer-motion whileInView observer (3zs8w L3364-3374, L3617-3636) is a real mechanism (threshold from amount, default "some") but is library code.

---

## guess (barrettrm.com)

**Lightbox side-hover nav hints** — hovering the left or right half of the lightbox shows the matching arrow for 500ms.
- Mechanism: mousemove on lightbox content: clientX < half the viewport width shows previous arrow, else next arrow (class mouseover). Removed after 500ms; entering the nav cancels the timer.
- Excerpt (common-7d289a9a1e9549aa.js slice L534-535):
```
this._lightboxContentEl.on("mousemove", d.bind(function(E) {
  E.clientX < d.one("body").get("winWidth") / 2 ? y(this._previousEl) : y(this._nextEl);
```
- Port: onMouseMove sets a side state, CSS class with 500ms timeout.

**Folder nav keyboard (Escape / Enter / Space / Tab)**
- Mechanism: keydown on each folder: Escape closes and returns focus; Enter/Space toggle aria-expanded; Tab on the last item closes the folder. Parent-folder open pops depth and focuses the parent. Desktop and mobile arrow icons are injected as SVG.
- Excerpt (site-bundle slice L141-146):
```
}, E = (e3, t3) => (n3) => {
  switch (n3.code) {
    case "Escape":
      n3.preventDefault(), S(e3, true);
      break;
```
- Port: onKeyDown handler on the folder element; aria-expanded state.

**Product image zoom (mouse pan)**
- Excerpt (product-detail.83fdeb19.js slice L229 region): on zoom in, add scroll and mousemove listeners to the node, add class is-zoomed, set zoomed flag.

**Lazy images (IntersectionObserver + rAF)**
- Mechanism: when an image intersects, a rAF calls load and unobserves. Loading classes sqs-image-loading and loading (constants, slice L330-338).
- Excerpt (site-bundle slice L94-101): `e5.isIntersecting && self.requestAnimationFrame(function() {` (followed by load and unobserve).

**Hover reveal on first mousemove (product list)**
- Excerpt (product-list.c48df97d7a2b831ccf1d.js slice L173-179): `this._node.matches(":hover") ? t2() : this._node.addEventListener("mousemove", t2, { once: true });` then display block, class loaded.

**Uniform-driven reveal (draw / fade / fadeScale)** — unclear whether this drives GL or CSS; the slice has uniform names but no shader.
- Excerpt (common-7d289a9a1e9549aa.js slice L19865-19876), setInitialState: draw sets progressReveal=1, progressDraw=direction==="right"?-1:1; fade/fadeScale sets progressReveal=0, progressDraw=0; otherwise progressReveal=1, progressDraw=0. onUpdateDraw/onUpdateReveal set the value and call onUpdate.

**Noise** — moment-js timezone (extract-css-moment L1272), YUI history (common-vendors L3344-3396; legacy), performance observers (performance-d937 L128-135, L1881-1890, L3303-3310), commerce number parsing (L1400-1427, L3730-3757), microtask polyfill (site-bundle L104-116), Squarespace constants (L330-338), React/Sentry-style event priority (commerce L12274-12314).

Specs-E cross-check: exit 650ms, 11.1ms stagger, and the 800ms card transition are CSS counts. No JS slice confirms them.

---

## zighead (headfonts.com)

**Store loading state** — the content block gets a loading class while a fetch runs.
- Excerpt (gen/packed_store.68d54223.js slice L102-108):
```
this.hideLoader = function(callback) {
  this.$(".content").removeClass("loading");
  this.resizeTo();
```
- showLoader adds the class (slice L32-34). Error path shows an alert (onFail, L51-56).

**Delayed third-party script loader (300ms)**
- Excerpt (packed_store slice L390-399):
```
window.delayedScriptLoader = (src, delay = 300) => {
  if (!src) return;
  setTimeout(() => {
    const scriptNode = document.createElement("script");
```
- Port: useEffect with setTimeout to inject script.

**Product image wheel pan (zoomed)** — wheel pans the zoomed image and does not scroll the page.
- Mechanism: if zoom > fitRatio, stop propagation; deltaMode 1 scales by 18 px; legacy wheelDelta scaled by -0.16; then panTo(x - dx, y - dy).
- Excerpt (packed_productpage.d8d6812f.js slice L251):
```
if ("deltaX" in a) 1 === a.deltaMode ? (T.x = 18 * a.deltaX, T.y = 18 * a.deltaY) : (T.x = a.deltaX, T.y = a.deltaY);
```

**Tabs with history (Semantic UI changeTab)**
- Mechanism: local tabs activate via activate.all, cache content, fire onTabLoad. Remote content fetches. Deep anchors open the parent tab.
- Port: router-driven tabs, pushState on change.

**Contact char counter**: keyup on textarea runs countChars (slice L665). Minor.

**Noise** — VAT/CPF validators (checkout L30289-30338), colour parsing (L22025-22052), Semantic UI checkbox keys (L2391-2394), Backbone history (L11103-11163), audio latency probe (checkout L23103-23108), in-view counters (checkout L31674-31695; unclear whether used).

Specs-E says ambient rings and 160ms CSS transitions. No JS or code slice covers them: unclear.

---

## zaft (wisetype.nl)

**Autoplay video in view** — videos play when on screen, pause when off screen.
- Mechanism: IntersectionObserver: entering calls play(), then checkLazy; leaving pauses if not lazy. A ScrollTrigger version (scripts/index.min.js L49-67) also exists; which one runs is unclear.
- Excerpt (js/global.js slice L8-12):
```
const target = entry.target;
if (entry.isIntersecting) {
  target.play().then(() => checkLazy(target)).catch(() => checkLazy(target, observeVideos));
} else {
  if (!target.paused && !target.classList.contains("lazy")) {
```

**Horizontal carousel drag + active slide**
- Mechanism: pointerdown (button 0, only when scrollWidth > innerWidth) prevents default, saves scrollLeft and startX, then listens on window for pointermove, pointerup, blur, pointercancel. The active-slide observer adds class active to intersecting slides.
- Excerpt (components/carousel-track.js slice L136-141):
```
onPointerDown = (event) => {
  if (event.button !== 0 || this.scrollWidth <= window.innerWidth) return;
  event.preventDefault();
  this.pointerId = event.pointerId;
  this.startScroll = this.scrollLeft;
  this.startX = event.clientX;
```

**Slider arrow keys (desktop, hover-active)**
- Mechanism: mouseenter on .module-slider makes it active. keyup ArrowLeft/ArrowRight call prevSlide or nextSlide on the active slider.
- Excerpt (modules/slider.js slice L159-163):
```
document.addEventListener("keyup", (e) => {
  if (e.key == "ArrowLeft") {
    prevSlide($(".module-slider.active"));
  } else if (e.key == "ArrowRight") {
    nextSlide($(".module-slider.active"));
```

**Drawer close (scroll reset + easing)**
- Mechanism: animate scrollTop to 0 over timing*3 with bezier(0.7,0,0.3,1), then hide after timing*3, remove drawer backdrop class and transition class. Removes the basket param from the URL via pushState.
- Excerpt (modals/drawer.js slice L174): `drawer.animate({ scrollTop: 0 }, timing * 3, $.bez([0.7, 0, 0.3, 1])).attr("data-state", "close");`
- The timing constant is not in the slice: unclear in ms.

**Escape closes drawer or menu** — keyup Escape: closes the page-close button if no menu or drawer is visible (page.js L2-16), and hides the menu on desktop (menu.js L18-24).

**Page meta sync on route change**
- Excerpt (ajax/global.js slice L68-71): `function updateMeta(url) {` sets document.title, calls history.pushState({}, "", url), sets data-template.

**Loader fade (sine.inOut, 600ms, delay 4.2s)** — from digest and specs only; no code slice. Unclear.

**Noise** — lazysizes library (libs/lazysizes.min.js L338-355, L484-503) is real for lazy images but is a third-party library.

---

## lemkus (lemkus.com)

**Flickity physics (carousel)** — the carousel moves by spring and friction; drag adds force toward the pointer.
- Mechanism: rAF animate() each frame: applyDragForce (toward dragX while pointer down), applySelectedAttraction (pull toward the selected slide when not dragging), integratePhysics (x += velocity; velocity *= 1 - friction). Stops after 2 resting frames.
- Defaults (vendor.js slice L83): friction 0.28, freeScrollFriction 0.075, selectedAttraction 0.025, cellAlign center, percentPosition true. Site overrides are unverified.
- Excerpt (vendor.js slice L57-60):
```
applySelectedAttraction: function() {
  if (this.isDraggable && this.isPointerDown || this.isFreeScrolling || !this.slides.length) return;
  let t4 = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
  this.applyForce(t4);
```

**Grid slider (custom element) snap**
- Mechanism: on release, scrollToSlide sets start, distance (snap target), startTime and runs scrollStep via rAF with easeOutCubic over this.duration (duration not in slice). Destroys on touch-mobile or when content fits. Otherwise builds an observer and draggable.
- Excerpt (theme.js slice L247-248):
```
easeOutCubic(t2) {
  return t2 /= this.duration, t2--, this.distance * (t2 * t2 * t2 + 1) + this.startPosition;
```

**Scroll reveal on intersection** — two observers add reveal classes at thresholds [0, 0.1, 0.25, 0.5, 0.75, 1] and [0.1 .. 1], then unobserve.
- Excerpt (theme.js slice L305-308, class constants H/I/D not in slice):
```
}), { root: null, rootMargin: "0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }), $ = new IntersectionObserver(((t2, e2) => {
  t2.forEach(((t3) => {
    if (t3.intersectionRatio) {
```

**Item fully-in-view class (ratio >= 0.99)**: observer thresholds [0.01, 0.5, 0.75, 0.99] add class Bt when ratio >= 0.99, else remove (theme.js L886-895).

**Focus-visible mode**
- Mechanism: mousedown clears keyboard flag and class. keydown sets it. focusin adds the focus-visible class when keyboard, or more than 1s after the last mousedown.
- Excerpt (theme.js slice L208-215):
```
focusEvents() {
  let t2 = false, e2 = 0;
  document.addEventListener("mousedown", (() => {
    t2 = false, e2 = Date.now(), this.body.classList.remove(N);
  })), document.addEventListener("keydown", (() => {
    t2 = true;
  })), document.addEventListener("focusin", (() => {
```

**Focus trap** (trapFocus, theme.js L134-145): Tab cycles inside the drawer or modal, focusin and focusout listeners manage the state.

**Noise** — third-party draggable widget (wpm bundle L5244-5259: unclear, probably a Shopify app), accessibleLinks (theme.js L150-155, ARIA only), label float on keyup (theme.js L231-238; real but minor).

Specs-E says AOS entrance (heroFadeIn 1s, 15px rise) and settle 800ms. No JS slice covers this: unclear. Attribution to AOS is inferred from class names.

---

## stripedev and others not covered here

Only the nine sites above were in scope.

---

Summary of contradictions to resolve before port:
1. inkwell cursor: JS damp (slice) vs CSS transition (probe). Decide one.
2. exat Lenis: lerp 0.2 (slice) vs 0.1 (specs). exat word stagger 13ms (digest) vs 0.1s default (slice).
3. hvdmatch: JS lightbox and keydown exist (slice), but specs-E says none.
4. inkwell uPortal: red at >= 0.5 in the glass shader vs transparent at >= 1 in the card shader.
