# teletech — https://www.teletech.events/label
- libs (bundle regex): webflow-ix2, lottie, three, gsap, ScrollTrigger, Lenis, barba · JS 2553 KB · CSS 233 KB · style mutations 7548
- smooth scroll: lerp≈0.143/frame (decay 0.857, n=16)
- canvas contexts: 2d 300x150@1582ms, webgl2 300x150@1640ms
- shaders: 2 · features: texture sampling, fresnel/lighting · uniforms: modelMatrix, modelViewMatrix, projectionMatrix, viewMatrix, normalMatrix, cameraPosition, isOrthographic, time, pixels, progress, uDataTexture, uTexture, resolution
- audio/media: VIDEO 58cdc24b90dd798e2fa1d/67058cdc24b90dd798e2fa74_brand-icons-cropped-transcode.mp4 | VIDEO com/67058cdc24b90dd798e2fa1d/67058cdc24b90dd798e2fa8a_tt-logo-spin-transcode.mp4
- GSAP global calls: 400; first: to(.load_grid-item) [{"opacity":0,"duration":0.004}] ; set(list8) [{"yPercent":10}] ; set(a.main-nav-item) [{"clipPath":"inset(100% 0 0 0)"}] ; set(a.main-nav-item) [{"clipPath":"inset(100% 0 0 0)"}] ; set(a.main-nav-item.external) [{"clipPath":"inset(100% 0 0 0)"}] ; set(a.main-nav-item) [{"clipPath":"inset(100% 0 0 0)"}]
- CSS easings: cubic-bezier(.455,.03,.515,.955)×3
- CSS durations: 2s×18, 1s×4, 3s×2, 8s×1, 4s×1
- CSS keyframes (2): spin {0%{transform:rotate(0)}to{transform:rotate(360deg)}} | swiper-preloader-spin {100%{transform:rotate(360deg)}}
- CSS features: mix-blend-mode×31, mask×20, backdrop-filter×6, perspective×1, preserve-3d×3
- top transitions: all .2s×7 | opacity .2s cubic-bezier(.455,.03,.515,.955)×2 | background-color .2s×2 | unset×1 | background-color .1s,color .1s×1

## Running CSS/WAAPI animations (6 unique)
- [load@600] CSSTransition clip-path on a.main-nav-item: 200ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","clipPath":"inset(67.5622% 0px 0px)"},{"offset":"1","easing":"linear","clipPath":"inset(0% 0px 0px)"}]
- [load@600] CSSTransition transform on a.main-nav-item: 200ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate(0%, 6.75622%) translate3d(0px, 0px, 0px)"},{"offset":"1","easing":"linear","transform":"translate(0px)"}
- [load@600] CSSTransition clip-path on a.main-nav-item.w--current: 200ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","clipPath":"inset(66.7258% 0px 0px)"},{"offset":"1","easing":"linear","clipPath":"inset(0% 0px 0px)"}]
- [load@600] CSSTransition transform on a.main-nav-item.w--current: 200ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate(0%, 6.67258%) translate3d(0px, 0px, 0px)"},{"offset":"1","easing":"linear","transform":"translate(0px)"}
- [load@600] CSSAnimation grained on div.grained: 500ms linear delay 0 iter null kf [{"offset":"0","easing":"steps(20)","transform":"translate(-10%, 10%)"},{"offset":"0.1","easing":"steps(20)","transform":"translate(-25%)"},{"offset":"0.2","eas
- [load@600] CSSAnimation flicker on span.highlight-machine-grey.flicker: 30ms linear delay 0 iter null kf [{"offset":"0","easing":"ease","filter":"brightness(2.5)"},{"offset":"0.2","easing":"ease","filter":"brightness(1)"},{"offset":"0.4","easing":"ease","filter":"b

## JS-driven tween clusters (97 tweens → 23 groups; times ms from navigation; phases {"loaded":1815,"hover":10954,"cursorStep":11810,"scroll":13014,"end":25472})
- [load @1739] div.scroll-arrow-mask · transform.y 0→14 · 400ms · css ease (rmse 0.062)
- [load @1739] div.tracklist · transform.y 100→0 · 900ms · expo.out (rmse 0.02)
- [load @1739] div.tracklist · opacity 0→1 · 900ms · expo.out (rmse 0.02)
- [load @1790] div.carousel_item.w-dyn-item · transform.s 0.939→0.85 · 350ms · power2.inOut (rmse 0.091) · ×47, stagger ~0ms
- [load @1790] div.carousel_item.w-dyn-item · transform.s 0.856→0.85 · 300ms · power2.inOut (rmse 0.044) · ×8, stagger ~0ms
- [load @1819] a.main-nav-item · transform.y 9.989→0 · 250ms · power3.inOut (rmse 0.165)
- [load @1855] a.main-nav-item · transform.y 9.995→0 · 250ms · expo.inOut (rmse 0.023) · ×4, stagger ~100ms
- [load @1904] a.main-nav-item.external · transform.y 9.995→0 · 250ms · expo.inOut (rmse 0.016)
- [load @2084] a.main-nav-item · transform.y 9.973→0 · 200ms · power3.inOut (rmse 0.141)
- [load @2104] a.main-nav-item.w--current · transform.y 9.995→0 · 250ms · expo.inOut (rmse 0.013)
- [load @2236] div.on-load-modal · opacity 0.03→1 · 600ms · power2.out (rmse 0.007)
- [load @2549] div.fs-cc-banner_component · transform.y 98.774→0 · 300ms · css ease (rmse 0.025)
- [load @3278] div.on-load-modal-img-wrapper · opacity 0→1 · 500ms · power3.out (rmse 0.006)
- [load @7680] div.scroll-arrow-mask · transform.y 0→14 · 500ms · power2.inOut (rmse 0.01) · ×2, stagger ~1514ms
- [load @10016] div.fs-cc-prefs_toggle · transform.x 0.76→20 · 200ms · power3.out (rmse 0.03) · ×3, stagger ~0ms
- [scroll @13069] div#canvasContainer.canvascontainer.hero-pixel · transform.y 0.021→41.337 · 1400ms · css ease (rmse 0.059)
- [scroll @14944] div#canvasContainer.canvascontainer.hero-pixel · transform.y 41.375→50 · 350ms · css ease-out (rmse 0.063)
- [scroll @15207] aside.main-media-player · transform.y 10→0 · 800ms · power3.inOut (rmse 0.028)
- [scroll @15228] div.scroll-arrow-mask · transform.y 0→14 · 500ms · power2.inOut (rmse 0.013) · ×5, stagger ~3018ms
- [scroll @15360] div.carousel_wrap.w-dyn-list · --3d-carousel-rotate -0.084→-3.544 · 1000ms · power3.out (rmse 0.021)
- [scroll @15767] div.carousel_item.w-dyn-item · transform.s 1→1 · 400ms · power3.inOut (rmse 0.034) · ×10, stagger ~7ms
- [scroll @16867] div.carousel_wrap.w-dyn-list · --3d-carousel-rotate -3.6→-10.618 · 1400ms · css ease (rmse 0.052) · ×2, stagger ~6708ms
- [scroll @18797] div.carousel_wrap.w-dyn-list · --3d-carousel-rotate -10.674→-17.691 · 1450ms · css ease (rmse 0.046) · ×2, stagger ~2830ms

## Notable assets
- video es.com/67058cdc24b90dd798e2fa1d/67058cdc24b90dd798e2fa74_brand-icons-cropped-transcode.mp4 0KB
- video ite-files.com/67058cdc24b90dd798e2fa1d/67058cdc24b90dd798e2fa8a_tt-logo-spin-transcode.mp4 0KB

Raw: forensics/teletech/ (forensics.json, source.css, source.js.txt, shaders.glsl, *.webm video of the run)