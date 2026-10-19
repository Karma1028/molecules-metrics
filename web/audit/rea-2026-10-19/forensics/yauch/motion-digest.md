# yauch — https://yauch.oscilloscope.net/panorama/main_01
- libs (bundle regex): lottie · JS 1948 KB · CSS 203 KB · style mutations 1380
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 300x150@3720ms, webgl 100x100@7385ms, 2d 1440x900@7391ms, webgl 100x100@7392ms
- shaders: 2 · features: texture sampling · uniforms: uSampler, uMVMatrix, uPMatrix
- audio/media: AudioContext
- CSS easings: cubic-bezier(.4,.04,0,1.02)×11, cubic-bezier(.19,-1.18,.3,-1.18)×8, cubic-bezier(.45,.1,.5,.8)×4, cubic-bezier(.55,.12,0,.82)×2, cubic-bezier(.25,.25,.75,.75)×2
- CSS durations: 25s×134, 1s×75, 2s×70, 3s×44, 5s×40, 1.5s×32, 45s×19, 15s×17
- CSS keyframes (38): spin-stroke {0%{stroke-dashoffset:315;stroke-dasharray:80;-webkit-transform:rotate(0);transform:rotate(} | spin-stroke {0%{stroke-dashoffset:315;stroke-dasharray:80;-webkit-transform:rotate(0);transform:rotate(} | spinReverse {0%{-webkit-transform:rotate(35deg);transform:rotate(35deg)}33%{-webkit-transform:rotate(5d} | spinReverse {0%{-webkit-transform:rotate(35deg);transform:rotate(35deg)}33%{-webkit-transform:rotate(5d} | spinDelayed {0%{-webkit-transform:translate(0,50%) rotate(-100deg);transform:translate(0,50%) rotate(-1} | spinDelayed {0%{-webkit-transform:translate(0,50%) rotate(-100deg);transform:translate(0,50%) rotate(-1} | spinDelayed2 {0%{-webkit-transform:translate(0,50%) rotate(-65deg);transform:translate(0,50%) rotate(-65} | spinDelayed2 {0%{-webkit-transform:translate(0,50%) rotate(-65deg);transform:translate(0,50%) rotate(-65} | clipping {0%{-webkit-clip-path:inset(40px 0 40px 0);clip-path:inset(40px 0 40px 0)}100%{-webkit-clip} | clipping {0%{-webkit-clip-path:inset(40px 0 40px 0);clip-path:inset(40px 0 40px 0)}100%{-webkit-clip}
- CSS features: clip-path×151, mask×5, preserve-3d×8, steps(×6
- top transitions: opacity ease .25s×60 | opacity .2s ease×8 | border .15s×6 | -webkit-transform ease-out .2s×6 | all .2s ease×4

## Running CSS/WAAPI animations (19 unique)
- [load@600] CSSAnimation spinRing on span.preloader-ring: 1000ms linear delay 0 iter null kf [{"offset":"0","easing":"linear","transform":"translate(-50%, -50%) rotate(0deg)"},{"offset":"1","easing":"linear","transform":"translate(-50%, -50%) rotate(360
- [load@600] CSSAnimation flipFilter on span.film-filter: 400ms linear delay 0 iter null kf [{"offset":"0","easing":"steps(1)","transform":"rotate(0deg)"},{"offset":"0.25","easing":"steps(1)","transform":"rotate(270deg)"},{"offset":"0.5","easing":"step
- [load@600] CSSAnimation flickText on span.preloader-symbol.preloader-symbol-1: 500ms linear delay 200 iter null kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"0.15","easing":"linear","opacity":"0.8"},{"offset":"0.3","easing":"linear","opacity":"0.2"},{"offset"
- [load@600] CSSAnimation flickText on span.preloader-text: 600ms linear delay 0 iter 2 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"0.15","easing":"linear","opacity":"0.8"},{"offset":"0.3","easing":"linear","opacity":"0.2"},{"offset"
- [load@600] CSSAnimation flickText on span.preloader-symbol.preloader-symbol-2: 550ms linear delay 150 iter null kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"0.15","easing":"linear","opacity":"0.8"},{"offset":"0.3","easing":"linear","opacity":"0.2"},{"offset"
- [load@5000] CSSTransition filter on div.component-footer-copyright.active: 1000ms ease delay 1500 iter 1 kf [{"offset":"0","easing":"linear","filter":"blur(5px)"},{"offset":"1","easing":"linear","filter":"blur(0px)"}]
- [load@5000] CSSTransition opacity on div.component-footer-copyright.active: 1000ms ease delay 1000 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [load@5000] CSSTransition filter on div.component-footer-links.active: 1000ms ease delay 2000 iter 1 kf [{"offset":"0","easing":"linear","filter":"blur(5px)"},{"offset":"1","easing":"linear","filter":"blur(0px)"}]
- [load@5000] CSSTransition opacity on div.component-footer-links.active: 1000ms ease delay 1500 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [load@5000] CSSAnimation fullSpin on svg: 20000ms linear delay 0 iter null kf [{"offset":"0","easing":"linear","transform":"rotate(0deg)"},{"offset":"1","easing":"linear","transform":"rotate(360deg)"}]
- [load@5000] CSSAnimation fullSpin on span.circle-outline: 5000ms linear delay 0 iter null kf [{"offset":"0","easing":"linear","transform":"rotate(0deg)"},{"offset":"1","easing":"linear","transform":"rotate(360deg)"}]
- [load@5000] CSSAnimation halfSpin on div.circle-outline-container: 3500ms linear delay 0 iter null kf [{"offset":"0","easing":"ease","transform":"rotate(0deg)"},{"offset":"0.2","easing":"ease","transform":"rotate(160deg)"},{"offset":"1","easing":"ease","transfor
- [load@5000] CSSAnimation revealLeft on span.circle-small.circle-small-1: 3500ms linear delay 0 iter null kf [{"offset":"0","easing":"ease","transform":"rotate(115deg)"},{"offset":"0.15","easing":"ease","transform":"rotate(69deg)"},{"offset":"0.25","easing":"ease","tra
- [load@5000] CSSAnimation revealRight on span.circle-small.circle-small-2: 3500ms linear delay 0 iter null kf [{"offset":"0","easing":"ease","transform":"rotate(25deg)"},{"offset":"0.15","easing":"ease","transform":"rotate(69deg)"},{"offset":"0.25","easing":"ease","tran
- [load@8000] CSSTransition filter on div.component-logo.active: 1500ms ease delay 1500 iter 1 kf [{"offset":"0","easing":"linear","filter":"blur(5px)"},{"offset":"1","easing":"linear","filter":"blur(0px)"}]
- [load@8000] CSSAnimation rota on div.pie.spinner: 1000ms linear delay 0 iter null kf [{"offset":"0","easing":"linear","transform":"rotate(0deg)"},{"offset":"1","easing":"linear","transform":"rotate(360deg)"}]
- [load@8000] CSSAnimation fill on div.pie.filler: 1000ms linear delay 0 iter null kf [{"offset":"0","easing":"steps(1)","opacity":"0"},{"offset":"0.5","easing":"steps(1)","opacity":"1"},{"offset":"1","easing":"steps(1)","opacity":"1"}]
- [load@8000] CSSAnimation mask on div.pie-mask: 1000ms linear delay 0 iter null kf [{"offset":"0","easing":"steps(1)","opacity":"1"},{"offset":"0.5","easing":"steps(1)","opacity":"0"},{"offset":"1","easing":"steps(1)","opacity":"0"}]
- [hover1] CSSTransition color on a.footer-link: 500ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(255, 255, 255, 0.6)"},{"offset":"1","easing":"linear","color":"rgb(255, 206, 0)"}]

## JS-driven tween clusters (8 tweens → 8 groups; times ms from navigation; phases {"loaded":3156,"gateClick":11222,"gateDone":32669,"hover":32670,"cursorStep":36755,"scroll":37968,"end":49457})
- [gate @12986] h2.component-title.extra-large · opacity 0.068→1 · 300ms · linear (rmse 0.246)
- [gate @12986] span.rotator-circle.js-rotator · opacity 0.008→1 · 1500ms · power1.out (rmse 0.001)
- [gate @13035] h3.hero-text · opacity 0.045→1 · 300ms · linear (rmse 0.237)
- [gate @13132] div.layer-corner-lines · opacity 0.012→1 · 500ms · linear (rmse 0.23)
- [gate @13285] span.final-circle · opacity 0.005→1 · 1500ms · power1.out (rmse 0.001)
- [gate @13583] span.outline · opacity 0.003→1 · 2000ms · power1.out (rmse 0.001)
- [gate @15591] span.drag-text-line.drag-text-line-1 · opacity 0.053→1 · 450ms · linear (rmse 0.24)
- [gate @15889] span.drag-text-line.drag-text-line-2 · opacity 0.057→1 · 300ms · linear (rmse 0.239)

## Notable assets
- xmlhttprequest https://yauch.oscilloscope.net/version/src/data/content.json 27KB
- xmlhttprequest https://yauch.oscilloscope.net/version/src/data/sphere_position_data.json 3KB
- xmlhttprequest https://yauch.oscilloscope.net/version/src/data/json/bm-wave.json 2KB
- xmlhttprequest https://yauch.oscilloscope.net/version/src/data/sound/bb_click_floorplan_room.wav 75KB
- xmlhttprequest https://yauch.oscilloscope.net/version/src/data/sound/bb_click_generic.wav 67KB
- xmlhttprequest https://yauch.oscilloscope.net/version/src/data/sound/bb_click_index_floorplan.wav 69KB
- xmlhttprequest https://yauch.oscilloscope.net/version/src/data/sound/bb_mouseover_generic.wav 25KB
- xmlhttprequest https://yauch.oscilloscope.net/version/src/data/sound/bb_mouseover_index_floorplan.wav 24KB

Raw: forensics/yauch/ (forensics.json, source.css, source.js.txt, shaders.glsl, *.webm video of the run)