# specs-D: motion specs, 7 sites

Sources: forensics/<slug>/motion-digest.md (cited as `dig:N` = digest line N). Greps on source.js.txt / source.css cited as `src:`. cursor-probe.json cited as `probe`. Times are ms from navigation unless marked `scroll`/`hover` (phase label, untimed). "inferred" = not measured. rmse > 0.15 = compound/unknown.

---

## 1. teletech (https://www.teletech.events/label)

**Governing device:** inertia scroll (Lenis-class, lerp ~0.143) + staggered nav clip-path reveal on load + WebGL "pixel" hero canvas driven by scroll; 3D carousel rotate via CSS var.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 600 | a.main-nav-item | clip-path inset(67.6%)→0; translateY 6.8%→0 | 200 | ease (CSS) | - | dig:15-16 |
| load | 600 | div.grained | translate steps(20) loop | 500 | steps(20) | - | dig:19 |
| load | 1739 | div.tracklist | y 100→0; opacity 0→1 | 900 | expo.out | - | dig:24-25 (rmse .02) |
| load | 1790 | carousel_item ×47 | scale .939→.85 | 350 | power2.inOut | ~0 | dig:26 (rmse .091) |
| load | 1855 | a.main-nav-item ×4 | y 9.995→0 | 250 | expo.inOut | ~100 | dig:29 (rmse .023) |
| load | 1819 | a.main-nav-item | y 9.99→0 | 250 | power3.inOut | - | dig:28 (rmse .165, compound/unknown) |
| load | 2236 | div.on-load-modal | opacity .03→1 | 600 | power2.out | - | dig:33 (rmse .007) |
| scroll | 13069 | #canvasContainer.hero-pixel | y .02→41.3 | 1400 | css ease | - | dig:38 (rmse .059) |
| scroll | 15207 | aside.main-media-player | y 10→0 | 800 | power3.inOut | - | dig:40 (rmse .028) |
| scroll | 15360 | div.carousel_wrap | --3d-carousel-rotate -0.08→-3.54 | 1000 | power3.out | - | dig:42 (rmse .021) |

**Motion tokens**
- Ease (house): expo.out / expo.inOut (rmse .016-.023); CSS cubic-bezier(.455,.03,.515,.955) x3 (dig:8, declared). power3.* only for single tweens.
- Durations: 200, 250, 350, 400, 600, 800, 900, 1000, 1400 ms.
- Stagger: nav ~100 ms (dig:29).
- Scroll lerp 0.143/frame (dig:3, n=16). Source default lerp .1 (src: Lenis class, lerp default). Measured value used.
- Cursor lag: none (no probe).

**Systems**
- Scroll: Lenis present (dig:2, src hit). Hero canvas translate tied to scroll.
- Text split: none measured.
- WebGL: 2 shaders (shaders.glsl), texture sampling, fresnel/lighting; uniforms uDataTexture, pixels, progress; webgl2 canvas 300x150 @1640 (dig:4-5).
- Map: none. Audio: no audio assets; 2 mp4 videos only (dig:6). AudioContext strings in bundle (src), unconfirmed use.

**Recreate recipe**
```
lenis = new Lenis({ lerp: 0.143 })                       // dig:3
gsap.from('.main-nav-item', { clipPath:'inset(100% 0 0 0)', y:10, duration:.25, ease:'expo.inOut', stagger:.1 })
gsap.fromTo('.tracklist', {y:100,opacity:0}, {y:0,opacity:1,duration:.9,ease:'expo.out'})
gsap.to('#canvasContainer', {y:50, ease:'none', scrollTrigger:{scrub:true}})   // scrub: inferred
gsap.to('.carousel_wrap', {'--3d-carousel-rotate':-3.5, duration:1, ease:'power3.out'})
```

**Confidence: MED-HIGH.** 9 of 10 tween groups rmse <= .091. Nav @1819 compound. Lerp measured (n=16) vs source default conflict; measured used.

---

## 2. marseille (https://marseille.laphase5.com/en)

**Governing device:** numeric preloader (odometer + scale) that hands off to scroll-stepped text reveals; WebGL 3D terrain/water/pin models; Howl-style UI audio on interaction.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 1500 | span.odometer-ribbon-inner | translateY 0→-100% | 100 | ease | - | dig:13 (CSS) |
| load | 4029 | div.Preload-numbers | scale .7→1.2 | 8650 | linear | - | dig:22 (rmse .061) |
| scroll1 | untimed | div.Preload-numbers | scale 1.2→.8; translateY -130px | 1000 (delay 1000) | cubic-bezier(.16,1,.3,1) | - | dig:14 |
| scroll1 | untimed | p | lineHeight 80→56px; opacity 0→1; translateY 100→0 | 1000 (delay 1100) | cubic-bezier(.16,1,.3,1) | - | dig:15-17 |
| scroll1 | untimed | div.Button-container | opacity 0→1; translateY 100→0 | 1000 (delay 1200) | cubic-bezier(.16,1,.3,1) | - | dig:18-19 |
| scroll | 13571 | span.odometer-digit | x 0→45 | 500 | power3.out | - | dig:23 (rmse .004) |

**Motion tokens**
- Ease (house): cubic-bezier(.16,1,.3,1) (dig:6, x1241, declared). Secondary: cubic-bezier(.165,.84,.44,1) x136; (.64,0,.78,0) x38 (exit); (.83,0,.17,1) x5.
- Durations: 300, 500, 600, 1000 ms (dig:7 dominant 1s x457; 6s x574 not mapped to a motion token, inferred non-UI).
- Stagger: reveal delays step 100 ms (1000 → 1100 → 1200).
- Scroll lerp: none (native, dig:3).
- Cursor: none.

**Systems**
- Scroll: native; scroll-stepped section reveals (labels scroll1, scroll).
- Text split: none; line-height/transform reveal on p only.
- WebGL: three.js; webgl2 canvas 300x150 @3659, experimental-webgl @2487 (dig:4). GLBs: terrain.glb 2350KB, water.glb 1037KB, pin4.glb 108KB (dig:37-39). No shaders captured.
- Map: 3D terrain model, not a tile map. Mapbox/leaflet: none.
- Audio: Howl-style createSound (src: intro .5, map_loop .5 loop, pin_over/out .7, zoom .5, btn_click/btn_over 1, 360_* ambient); AudioContext x2 (dig:5). mp3 sizes dig:26-36.

**Recreate recipe**
```
.reveal p        { transition: transform 1s, opacity 1s, line-height 1s cubic-bezier(.16,1,.3,1); transition-delay: 1.1s; }   // dig:15-17
.Button-container{ transition: transform 1s, opacity 1s cubic-bezier(.16,1,.3,1); transition-delay: 1.2s; }                    // dig:18-19
gsap.to('.Preload-numbers', { scale:1.2, duration:8.65, ease:'linear' })                                                        // dig:22
const intro = new Howl({ src:['intro.mp3'], volume:.5 })   // src createSound
```

**Confidence: HIGH for CSS timings (declared), MED for preloader (scroll labels untimed), LOW for WebGL (no shaders captured).**

---

## 3. gataperduda (https://lagataperduda.com/en/mapa/)

**Governing device:** Mapbox GL globe-to-terrain map (60 shaders, DEM uniforms) with a custom SVG cursor glide and locomotive-style smooth scroll on a container.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 1993 | svg.cursor | y -8.8→-108.6 | 650 | power2.out | - | dig:14 (rmse .064) |
| load | 2176 | div.main-container | opacity .024→.997 | 450 | power1.out | - | dig:15 (rmse .014) |
| load | 2766 | svg.cursor | y -108.7→-110 | 1600 | quart-out (.19,1,.22,1) | - | dig:16 (rmse .043) |
| load | 2766 | #intro-lang-container | opacity 0→1 | 2050 (src 2.2s, delay .7s) | power1.inOut | - | dig:17 (rmse .037); src |
| hover | 10232 | svg.cursor | y 571→649; opacity 0→1 | 2600 | css ease / circ-out | - | dig:18-19 (rmse .193 / .087) |
| hover | 16682 | svg.cursor | y 612→990 | 2700 | power3.inOut | - | dig:20 (rmse .654, compound/unknown) |

**Motion tokens**
- Ease: GSAP power4.out x5, Power3.easeOut x3, power1.inOut x2 (src counts). quart-out (.19,1,.22,1) measured rmse .043.
- Durations: 450-2700 ms; cursor glide is slow (2.6-2.7 s).
- Scroll lerp: src `lerp:.035, smooth:true` on [data-scroll-container] (2 hits). Digest: no window lerp (dig:3). Scope inferred: container only.
- Cursor lag: not probed; svg.cursor glide 2.6 s measured (dig:18), per-frame lag unknown.

**Systems**
- Scroll: locomotive-class container smoothing (src), multiplier .25.
- Text split: none.
- WebGL: 60 shaders: grain, blur, texture sampling, fresnel (dig:5). Uniforms: u_is_globe, u_globe_transition, u_dem, u_dem_prev, u_dem_lerp, u_exaggeration, u_tile_*_up (dig:5). webgl 1440x900 @2013 (dig:4).
- Map: Mapbox GL v2.15.0 (src); styles mapbox-streets-v8, terrain-v2, custom fgtl style (dig:26-28).
- Audio: Howl + AudioContext (src); ambient_raval.mp3 17MB, idle.mp3 6.7MB (dig:23-24). Playback use: inferred.

**Recreate recipe**
```
new LocomotiveScroll({ el: '[data-scroll-container]', lerp: .035, smooth: true, multiplier: .25 })  // src
gsap.to('svg.cursor', { y: 649, duration: 2.6, ease: 'circ.out' })          // dig:18-19 (target inferred from hover)
gsap.to('#intro-lang-container', { opacity:1, delay:.7, duration:2.2, ease:'power1.inOut' })      // src
map.setProjection('globe')   // globe<->flat via u_globe_transition (inferred)
```

**Confidence: MED.** Mapbox and shader counts measured well. Cursor: 2 of 3 hover tweens rmse > .15 (compound/unknown). Scroll lerp conflicts with digest (scoped inferred).

---

## 4. bleibtgleich (https://www.bleibtgleich.com/)

**Governing device:** none captured. Static page.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| - | - | - | none | - | - | - | dig:11 (0 tweens) |

**Motion tokens:** none. Scroll native (dig:3). Durations: none. Stagger: none. Cursor: none.

**Systems:** none. No canvas (dig:4), no libs (dig:2), no CSS easings/keyframes (dig:5-10). 8 style mutations only.

**Recreate recipe:** none. Do not add motion without a new reference.

**Confidence: HIGH** that no motion occurred in the captured run (0 tweens, 0 CSS animations, 0 canvas). MED on completeness: single run, hover/scroll phases did run (dig:11).

---

## 5. the3key (https://the3key.com/)

**Governing device:** GSAP ScrollTrigger scrub sections (scrub .4-.5) + GSAP quickTo cursor. Probe shows fast cursor follow.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 600 | a.tap-btn | tapFloat rotate 0→3deg, translate loop | 4000 | ease-in-out kf | - | dig:12 (CSS, infinite) |
| scroll | 16669 | div.circles | y 2.91→-1.53 | 450 | linear | - | dig:16 (rmse .011) |
| scroll | 22350 | div.overlapping-card__inner x2 | opacity 1→0 | 250 | power2.in | cluster gap ~1666 (not stagger) | dig:17 (rmse .136) |
| scroll | 22350 | same | scale .988→.7; rotate .33→4.58 | 250 | linear | cluster gap | dig:18-19 (rmse .084) |
| scroll | - | ScrollTrigger (src) | rotate/y/autoAlpha, scrub true or .4/.5 | scrub | power1.out / power1.in / expo.inOut | - | src ScrollTrigger hits |

**Motion tokens**
- Ease (GSAP, src counts): power1.out x2, power1.in x2, expo.inOut x1 (scrub .4), elastic.out(1.2,1) x1 (pin reveal). Tiny sample: inferred house ease = power1.
- Durations: 250, 450 ms (tweens); 4000 ms (tap loop); CSS 200 ms x15 (dig:6).
- Stagger: 0 in src (stagger:0 x2). Cluster gap ~1666 ms is not stagger.
- Scroll lerp: none, native (dig:3).
- Cursor (probe, cursor-probe.json entry the3key): `.gsap-cursor` 48px, `.gsap-cursor__item.cursor-active` 38px, transition "all"; t63 = 61 ms, t95 = 61 ms, overshoot 0%. Src: `quickTo` used, duration not captured.

**Systems**
- Scroll: GSAP ScrollTrigger, 7x scrub:true, scrub .4 and .5, pin on reveal; horizontal containerAnimation (src).
- Text split: none.
- WebGL: none. One 2d canvas 300x150 @3482 (dig:4), no shaders.
- Map: none. Audio: none.
- Cursor: gsap-cursor with quickTo (src, probe).

**Recreate recipe**
```
gsap.to(el, { rotation:r, y:'-50%', ease:'power1.out', scrollTrigger:{ trigger:el, start:'top top', end:'+='+h, scrub:true } })  // src
gsap.to(cards, { opacity:0, scale:.7, rotation:4.58, duration:.25, ease:'power2.in' })                                          // dig:17-19
const cx = gsap.quickTo(cursor, 'x', { duration: /* not captured */ })   // probe: t63 61ms
```

**Confidence: MED-LOW.** Only 4 tween groups. Cursor t63 measured, but its transition duration isn't in the probe (the "all" transition). Ease house is inferred from 6 src hits.

---

## 6. analytical (https://analytical-group.com/it)

**Governing device:** Elementor scroll-linked motion effects (CSS vars --translateX / --translateY) + swiper track; fade-in hero.

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 8000 | div.elementor-element-8f439c6 | opacity 0→1 | 1250 | ease (kf) | - | dig:12 (CSS) |
| scroll | 19217 | div.elementor-motion-effects-layer x2 | --translateX -241.2→-140.5 | 450 | linear | cluster gap ~3797 | dig:16 (rmse .014) |
| scroll | 21084 | same | --translateX -361.8→-301.5 | 300 | linear | - | dig:17 (rmse .006) |
| scroll | 23211 | div/a.elementor-element x3 | --translateY 7.24→-64 | 200 | power2.out | - | dig:18-20 (rmse .013-.014) |
| scroll | 24876 | motion-effects-layer | --translateX -120.4→-19.9 | 500 | linear | - | dig:21 (rmse .011) |
| scroll3 | untimed | div.swiper-wrapper | translate3d -1481.6→-1728.6px | 500 | ease | - | dig:13 (CSS) |

**Motion tokens**
- Ease: no house ease. Single-use CSS cubic-bezier(0,.33,.07,1.03) and (.58,.3,.005,1), 1 use each, unknown.
- Durations: 200, 300, 450, 500 (scroll); 1250 (hero fade); CSS 300 ms x20 (dig:6).
- Stagger: none measured (cluster gap only).
- Scroll lerp: none, native (dig:3). Scroll-linked via Elementor, not lerped.
- Cursor: none.

**Systems**
- Scroll: Elementor motion effects (src: class elementor-motion-effects-layer), CSS var driven.
- Text split: none.
- WebGL: webgl 300x150 @11694 (dig:4). No shaders captured. Treat as unknown.
- Map: none. Audio: AudioContext strings in bundle (dig:2 / src), no audio assets. Not confirmed used.
- Swiper track for carousel.

**Recreate recipe**
```
hero:   gsap.fromTo(hero, {opacity:0}, {opacity:1, duration:1.25, ease:'linear'})          // dig:12
scroll: layer.style.setProperty('--translateX', lerp(-241.2,-140.5,p))  // p scroll progress, linear
card:   el.style.setProperty('--translateY', easePowerOut2(p)*-71.24+7.24)  // 200ms, power2.out, dig:18
```
(`lerp` here is value-mapping, not scroll lerp.)

**Confidence: MED-LOW.** Good rmse on 6 scroll tweens. Sample small (2 CSS anims). No ease house. Hero load time (8000) may be a lazy trigger, not timing.

---

## 7. sainturbain (https://www.sainturbain.com/)

**Governing device:** site loader fade, then staggered header slide-in and hero image scaleX wipe; per-letter roll on hover; continuous text ticker (15 s).

| phase | t(ms) | element | property from→to | duration | ease | stagger | evidence |
|---|---|---|---|---|---|---|---|
| load | 1153 | div.site-loader | opacity 1→0 | 250 | css ease-out | - | dig:29 (rmse .047) |
| load | 600 | figure.site-header__logo | translateY -75→0 | 650 | cubic-bezier(.215,.61,.355,1) | delay 50 | dig:13 |
| load | 600 | .site-header__globe | translateY -75→0 | 650 | same | delay 100 | dig:14 |
| load | 600 | li.menu-item (archive / post) | translateY -75→0 | 650 | same | delay 160 / 170 | dig:15-16 |
| load | 600 | button.prefers-color-scheme | translateY -75→0 | 650 | same | delay 200 | dig:17 |
| load | 600 | figure.pb-row-hero__imgBox | scaleX 1.0001→0 | 1050 | cubic-bezier(.645,.045,.355,1) | delay 300 | dig:18 |
| load | 600 | video.pb-row-hero__img | scale 1.2→1.01 | 1250 | cubic-bezier(.215,.61,.355,1) | delay 300 | dig:19 |
| hover | 9121 | span.char (per letter) | translateY 0→-200% | 700 | cubic-bezier(.645,.045,.355,1) | per letter (inferred) | dig:25 |
| hover | 9121 | span.char | translateY -200%→0 | 500 | same | delay 200 | dig:26 |
| scroll | 20585 | .pb-row-home-about__decorativeLine | --scroll-progress 0→1 | 500 | linear | - | dig:30 (rmse .033) |

**Motion tokens**
- Ease (house): cubic-bezier(.645,.045,.355,1) (easeInOutCubic, x37 declared, dig:6); cubic-bezier(.215,.61,.355,1) (easeOutCubic, x9). Plus cubic-bezier(.25,.46,.45,.94) x9, (.55,.085,.68,.53) x6 (exits).
- Durations: 250, 450, 500, 650, 700, 1050, 1250 ms; CSS 1 s x51 (dig:7).
- Stagger: irregular delays 50 / 100 / 160 / 170 / 200 ms (not uniform). Pb-row delays 300.
- Scroll lerp: none, native (dig:3). Src: `new Dt({lerp:.135})` in bundle (src grep), not matched in digest. Unconfirmed.
- Cursor: none.

**Systems**
- Scroll: native + --scroll-progress CSS var.
- Text split: span.char per letter; hover roll (translateY ±200%) and typewriterIn (opacity 0→.1, 10 ms, dig:21).
- WebGL: none. 2d canvases 1x1 / 300x150 / 84x84 @964-1141 (dig:4), no shaders.
- Map: none. Audio: none. Video headers only (dig:5, 6 mp4).
- Ticker: tickerText 15000 ms linear infinite (dig:22).

**Recreate recipe**
```
loader: opacity 1→0, .25s, ease-out, at 1.15s                        // dig:29
header: y -75→0, .65s, cubic-bezier(.215,.61,.355,1), delays [.05,.10,.16,.17,.20]   // dig:13-17
hero:   imgBox scaleX→0 1.05s cubic-bezier(.645,.045,.355,1) delay .3; img scale 1.2→1.01 1.25s delay .3   // dig:18-19
hover:  span.char y→-200% .7s cubic-bezier(.645,.045,.355,1); return after .2s over .5s               // dig:25-26
```

**Confidence: HIGH** for load/hover timings (declared CSS, 14 unique CSS anims). MED on stagger pattern (irregular). LOW on the lerp .135 bundle hit (not in digest).

---

## Cross-site note
Only teletech (lerp .143, dig:3) and the3key (ScrollTrigger scrub) have clear scroll smoothing or scrub. Sainturbain's lerp .135 and gataperduda's .035 are source-only.
