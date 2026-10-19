# rxk — https://rxkstudio.com/
- libs (bundle regex): gsap, ScrollTrigger, Lenis, vue · JS 1151 KB · CSS 40 KB · style mutations 8210
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: none
- CSS easings: cubic-bezier(.16,.03,.08,1.55)×1
- CSS durations: 1s×3, 4s×2, 55s×1
- CSS keyframes (1): btnAnimation {0%{transform:translate(0)}to{transform:translateY(100%)}}
- CSS features: clip-path×6, mask×6
- top transitions: background 1s×2 | fill 1s×1 | filter .4s×1 | opacity .4s×1

## JS-driven tween clusters (52 tweens → 27 groups; times ms from navigation; phases {"loaded":2156,"hover":10210,"cursorStep":11027,"scroll":12242,"end":23686})
- [load @3790] span.word-above · transform.y 0→100 · 1000ms · quart-out(.19,1,.22,1) (rmse 0.051) · ×6, stagger ~0ms
- [scroll @12258] span.ligne-child · transform.y 0.978→100 · 100ms · sine.inOut (rmse 0.038)
- [scroll @12258] span.ligne-child · transform.y 0.35→100 · 150ms · css ease-in-out (rmse 0.07)
- [scroll @12258] span.ligne-child · transform.y 0.178→100 · 200ms · css ease-in-out (rmse 0.069)
- [scroll @12258] span.ligne-child · transform.y 0.108→100 · 250ms · css ease-in-out (rmse 0.069)
- [scroll @12265] div.shape · transform.s 0.993→0.291 · 550ms · power3.out (rmse 0.397)
- [scroll @12265] div.shape · transform.s 0.941→0.1 · 550ms · expo.inOut (rmse 0.162)
- [scroll @12265] div.shape · transform.s 0.514→0.617 · 550ms · power2.in (rmse 0.329) · ×4, stagger ~0ms
- [scroll @12265] div.shape · transform.s 0.219→0.998 · 550ms · css ease-out (rmse 0.053)
- [scroll @12265] div.shape · transform.s 0.066→0.964 · 550ms · css ease-in-out (rmse 0.03)
- [scroll @12446] div.shape · transform.y 0.002→802.369 · 800ms · css ease-in-out (rmse 0.046) · ×2, stagger ~0ms
- [scroll @12446] div.shape · transform.y 2268.64→220.356 · 800ms · css ease (rmse 0.502) · ×2, stagger ~0ms
- [scroll @12446] div.shape · transform.y 966.634→21.666 · 800ms · expo.inOut (rmse 1.47) · ×2, stagger ~0ms
- [scroll @12446] div.shape · transform.y 292.128→3941.96 · 800ms · linear (rmse 0.075) · ×2, stagger ~0ms
- [scroll @12446] div.shape · transform.y 38.717→1974.1 · 800ms · sine.inOut (rmse 0.038) · ×2, stagger ~0ms
- [scroll @12452] div.group · transform.r 0.119→0.189 · 1800ms · circ-out(.075,.82,.165,1) (rmse 24.352)
- [scroll @12480] div.media-child · transform.y -243.844→0 · 1000ms · power3.inOut (rmse 0.024) · ×2, stagger ~951ms
- [scroll @12480] img.grey · transform.y 243.844→0 · 1000ms · power3.inOut (rmse 0.024) · ×2, stagger ~951ms
- [scroll @12598] div.media-child · transform.y -243.844→0 · 1000ms · expo.inOut (rmse 0.014) · ×3, stagger ~112ms
- [scroll @12598] img.grey · transform.y 243.844→0 · 1000ms · expo.inOut (rmse 0.014) · ×3, stagger ~112ms
- [scroll @12780] div.group · transform.r 0.315→79.965 · 1750ms · linear (rmse 0)
- [scroll @12780] div.shape · transform.r 0.395→0 · 5600ms · power2.in (rmse 40.274)
- [scroll @12780] div.shape · transform.r 0.526→0 · 4650ms · power2.in (rmse 35.678)
- [scroll @12780] div.shape · transform.r 0.788→0 · 3700ms · power2.in (rmse 28.815)
- [scroll @12780] div.shape · transform.r 1.568→0 · 2750ms · power2.in (rmse 18.132)
- [scroll @14348] span.word-above · transform.y 0.001→100 · 1150ms · power4.out (rmse 0.108) · ×4, stagger ~36ms
- [scroll @14348] span.word-under · transform.y -100.233→0 · 1150ms · power4.out (rmse 0.108) · ×4, stagger ~36ms

## Notable assets
- link https://rxkstudio.com/_payload.json 0KB

Raw: forensics/rxk/ (forensics.json, source.css, source.js.txt, *.webm video of the run)