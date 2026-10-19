# gallipoli — https://sonsofgallipoli.com/
- libs (bundle regex): gsap · JS 2231 KB · CSS 69 KB · style mutations 30127
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 300x150@6081ms, 2d 1x1@6081ms, 2d 300x150@6130ms, 2d 1x1@6130ms, webgl 300x150@9030ms, webgl 300x150@9035ms
- shaders: 26 · features: noise, displacement, blur, texture sampling · uniforms: translationMatrix, projectionVector, offsetVector, alpha, flipY, tint, color, uSampler, uMatrix, blur, displacementMap, scale, frame, noiseFrameSize, offset, dimensions, windowSize, mapDimensions
- audio/media: AudioContext
- CSS easings: none
- CSS durations: 
- CSS keyframes (0): 
- CSS features: perspective×15
- top transitions: 

## JS-driven tween clusters (100 tweens → 24 groups; times ms from navigation; phases {"loaded":4644,"hover":12739,"cursorStep":13556,"scroll":14765,"end":26064})
- [load @9118] div.progress · widthPct 100→44.05 · 16550ms · circ-out(.075,.82,.165,1) (rmse 0.639)
- [load @10635] div.section-intro · opacity 0.016→1 · 500ms · linear (rmse 0.005)
- [load @11230] div.language-container · opacity 0.004→1 · 1000ms · power1.out (rmse 0.001)
- [load @11534] div.ui-skip-button · opacity 0.014→1 · 1000ms · power1.out (rmse 0.001)
- [load @12632] div.quote-word · opacity 0.004→1 · 1800ms · power1.out (rmse 0.001) · ×2, stagger ~95ms
- [hover @12833] div.quote-word · opacity 0.006→1 · 1800ms · power1.out (rmse 0.001) · ×8, stagger ~99ms
- [cursor @13632] div.quote-word · opacity 0.004→1 · 1800ms · power1.out (rmse 0.001) · ×12, stagger ~97ms
- [scroll @14833] div.quote-word · opacity 0.004→1 · 1800ms · power1.out (rmse 0.001) · ×20, stagger ~98ms
- [scroll @15657] div.quote-word · opacity 0.032→1 · 1750ms · power1.out (rmse 0.001)
- [scroll @17632] div.hash · opacity 0.008→1 · 1000ms · power1.out (rmse 0.002)
- [scroll @25160] div.language-container · opacity 0.986→0 · 500ms · linear (rmse 0.001)
- [scroll @25160] div.quote-word · opacity 0.996→0 · 700ms · linear (rmse 0.004) · ×21, stagger ~8ms
- [scroll @25160] div.loading · transform.y 0.003→40 · 500ms · power2.in (rmse 0.14)
- [scroll @25160] div.loading · opacity 0.986→0 · 500ms · linear (rmse 0.001)
- [scroll @25160] div.progress · opacity 0.986→0 · 500ms · linear (rmse 0.001)
- [scroll @25256] div.hash · opacity 0.992→0 · 500ms · linear (rmse 0.005)
- [scroll @25356] div.ui-skip-button · opacity 0.992→0 · 500ms · linear (rmse 0.002)
- [scroll @25393] div.quote-word · opacity 0.99→0.045 · 650ms · linear (rmse 0.001) · ×5, stagger ~10ms
- [scroll @25438] div.quote-word · opacity 0.995→0.132 · 600ms · linear (rmse 0.001) · ×8, stagger ~7ms
- [scroll @25493] div.quote-word · opacity 0.996→0.216 · 550ms · linear (rmse 0.001) · ×8, stagger ~0ms
- [scroll @25542] div.quote-word · opacity 0.992→0.251 · 500ms · linear (rmse 0.001)
- [scroll @25653] div.label · transform.x 0→-50 · 400ms · circ-out(.075,.82,.165,1) (rmse 0.251)
- [scroll @25653] div.label · transform.y 40→0 · 400ms · circ-out(.075,.82,.165,1) (rmse 0.251)
- [scroll @25653] div.label · opacity 0→0.682 · 400ms · linear (rmse 0.002)

## Notable assets
- xmlhttprequest https://static.sonsofgallipoli.com/FgXoRbHwNL/assets/json/dmaf_data.json 0KB
- xmlhttprequest https://cms2.sonsofgallipoli.com/exports/cms_data.json 0KB
- video https://static.sonsofgallipoli.com/FgXoRbHwNL/videos/Soldier_walk-in_V02.webm 0KB
- video https://static.sonsofgallipoli.com/FgXoRbHwNL/videos/Soldier_Loop_V02.webm 0KB
- video https://static.sonsofgallipoli.com/FgXoRbHwNL/videos/Soldier_walk-out.webm 0KB

Raw: forensics/gallipoli/ (forensics.json, source.css, source.js.txt, shaders.glsl, *.webm video of the run)