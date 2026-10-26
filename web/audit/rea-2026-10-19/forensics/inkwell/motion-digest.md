# inkwell — https://inkwell.tech/
- libs (bundle regex): Lenis, ogl, vue · JS 2421 KB · CSS 37 KB · style mutations 25621
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: webgl 300x150@4261ms, webgl2 300x150@4990ms
- shaders: 60 · features: noise, fxaa, texture sampling, fresnel/lighting · uniforms: tMap, uResolution, normalMatrix, modelViewMatrix, projectionMatrix, tBg, uColorStart, uColorEnd, uOpacity, uPortal, uIOR, uTransmissionOpacity, uNoiseStrength, tFrost, uId, uLight, uFrost, uSafari, uAspect
- CSS easings: cubic-bezier(.39,.575,.565,1)×29, cubic-bezier(.19,1,.22,1)×5, cubic-bezier(.075,.82,.165,1)×3, cubic-bezier(.52,0,0,1)×3, cubic-bezier(.85,0,.15,1)×1
- CSS durations: 2s×19, 1s×6, 5s×6, 0s×4, 3s×3, 4s×3, 6s×2, 7s×2
- CSS keyframes (0): 
- CSS features: clip-path×11, mask×26, backdrop-filter×2, perspective×2
- top transitions: opacity .2s cubic-bezier(.39,.575,.565,1) 0s×3 | color .2s cubic-bezier(.39,.575,.565,1)×2 | opacity .7s cubic-bezier(.52,0,0,1)×2 | opacity .2s cubic-bezier(.39,.575,.565,1)×2 | border .2s cubic-bezier(.39,.575,.565,1),transform 1s cubic-bezier(.19,1,.22,1)×2

## JS-driven tween clusters (59 tweens → 32 groups; times ms from navigation; phases {"loaded":3647,"hover":12550,"cursorStep":18076,"scroll":19291,"end":30888})
- [load @5032] div.cursor__wrapper.theme-dark · --v10789d65 90→122 · 400ms · quart-out(.19,1,.22,1) (rmse 0.577)
- [load @5032] div.dot-cursor.theme-dark · --v10789d65 90→122 · 400ms · quart-out(.19,1,.22,1) (rmse 0.577)
- [load @5671] div.text-indicator.--behind · opacity 0.012→0.943 · 1250ms · power1.out (rmse 0.05)
- [load @5671] div.text-indicator · opacity 0.012→0.943 · 1250ms · power1.out (rmse 0.05)
- [load @7354] div.text-indicator.--behind · opacity 0.944→1 · 1250ms · circ-out(.075,.82,.165,1) (rmse 0.169)
- [load @7354] div.text-indicator · opacity 0.944→1 · 1250ms · circ-out(.075,.82,.165,1) (rmse 0.169)
- [load @11736] div.cursor__wrapper.theme-dark · --v10789d65 122→60 · 2000ms · quart-out(.19,1,.22,1) (rmse 0.034)
- [load @11736] div.dot-cursor.theme-dark · --v10789d65 122→61 · 700ms · power1.out (rmse 0.032)
- [load @11736] div.cursor__wrapper.theme-dark · transform.x 4.118→103 · 2000ms · circ-out(.075,.82,.165,1) (rmse 0.066)
- [load @11736] div.cursor__wrapper.theme-dark · transform.y 32.263→807 · 2000ms · circ-out(.075,.82,.165,1) (rmse 0.066)
- [load @12520] span.--word · transform.y 100→0 · 1000ms · power2.inOut (rmse 0.006) · ×4, stagger ~9ms
- [hover @12561] span.--word · transform.y 100→0 · 1000ms · power2.inOut (rmse 0.009) · ×3, stagger ~14ms
- [hover @14040] div.indicator-wrapper · transform.x -17.262→-78.305 · 500ms · power2.out (rmse 0.004) · ×2, stagger ~0ms
- [hover @14318] p.scroll-1 · opacity 0.011→1 · 1550ms · expo.out (rmse 0.009)
- [hover @17276] div.cursor__wrapper.theme-dark · --v10789d65 60→-90 · 2750ms · power3.inOut (rmse 0.228)
- [hover @17276] div.dot-cursor.theme-dark · --v10789d65 60→89 · 650ms · css ease-out (rmse 0.033)
- [hover @17276] div.cursor__wrapper.theme-dark · transform.x 111.103→1100 · 2750ms · css ease (rmse 0.12)
- [hover @17276] div.cursor__wrapper.theme-dark · transform.y 792.317→450 · 2750ms · circ-out(.075,.82,.165,1) (rmse 0.1)
- [cursor @18088] div.dot-cursor.theme-dark · --v10789d65 89→-90 · 650ms · css ease-in-out (rmse 0.106)
- [scroll @19325] span.--word · transform.y -3.998→-120 · 150ms · css ease-out (rmse 0.038) · ×6, stagger ~0ms
- [scroll @19325] p.scroll-1 · transform.y -3.36→-200 · 150ms · linear (rmse 0.068)
- [scroll @19346] span.--word · transform.y -8.669→-120 · 100ms · css ease-out (rmse 0.05)
- [scroll @19346] div.info-scrub · transform.y 91.271→0 · 150ms · power4.out (rmse 0.029) · ×2, stagger ~0ms
- [scroll @19346] div.info-scrub · opacity 0.013→1 · 150ms · linear (rmse 0.048) · ×2, stagger ~0ms
- [scroll @19346] div.varying-scrub · transform.y 100→0 · 150ms · power2.out (rmse 0.079) · ×2, stagger ~0ms
- [scroll @19346] div.varying-scrub · opacity 0.013→1 · 150ms · sine.inOut (rmse 0.034) · ×2, stagger ~0ms
- [scroll @24000] span.varying · transform.y -5.374→-250 · 2200ms · expo.out (rmse 0.005) · ×4, stagger ~0ms
- [scroll @24000] p.faded.info · transform.y -5.374→-250 · 2200ms · expo.out (rmse 0.004) · ×2, stagger ~0ms
- [scroll @24000] p.faded.info · opacity 0.986→0 · 2200ms · quart-out(.19,1,.22,1) (rmse 0.06) · ×2, stagger ~0ms
- [scroll @24048] p.faded.info2 · transform.y 104.299→300 · 2200ms · expo.out (rmse 0.004) · ×4, stagger ~0ms
- [scroll @24048] p.faded.info2 · opacity 0.986→1 · 2200ms · quart-out(.19,1,.22,1) (rmse 0.061) · ×4, stagger ~0ms
- [scroll @27810] div.indicator-wrapper · transform.x -81.692→-162.461 · 500ms · power2.out (rmse 0.001) · ×2, stagger ~0ms

## Notable assets
- link https://inkwell.tech/_payload.json 0KB
- link https://inkwell.tech/_nuxt/rapier_wasm3d_bg.F-GQkyDT.wasm 1534KB
- fetch https://inkwell.tech/_nuxt/rapier_wasm3d_bg.F-GQkyDT.wasm 0KB
- fetch https://inkwell.tech/static/card-uv-compress.glb 7KB
- fetch https://inkwell.tech/static/logo.glb 16KB
- fetch https://inkwell.tech/_nuxt/builds/meta/da30904f-80ad-4271-8624-43459ecf3667.json 0KB
- fetch https://inkwell.tech/static/logo-v3-compress.glb 428KB
- fetch https://inkwell.tech/static/cards/architecture/Pre-Design.ktx2 22KB
- fetch https://inkwell.tech/static/cards/industries/Aerospace.ktx2 22KB
- fetch https://inkwell.tech/static/cards/industries/Marketing.ktx2 26KB
- fetch https://inkwell.tech/static/cards/industries/Healthcare.ktx2 19KB
- fetch https://inkwell.tech/static/cards/industries/Gaming.ktx2 30KB
- fetch https://inkwell.tech/static/cards/industries/Urban%20Planning.ktx2 29KB
- fetch https://inkwell.tech/static/cards/industries/Supply%20Chain.ktx2 19KB
- fetch https://inkwell.tech/static/cards/industries/Energy.ktx2 19KB

Raw: forensics/inkwell/ (forensics.json, source.css, source.js.txt, shaders.glsl, *.webm video of the run)