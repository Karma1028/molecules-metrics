# localstudio — https://localstudio.fr/about
- libs (bundle regex): three, webflow-ix2 · JS 1127 KB · CSS 37 KB · style mutations 7113
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: webgl2 300x150@2875ms, webgl2 300x150@2893ms, webgl2 300x150@2912ms, 2d 1800x1112@12159ms, 2d 1796x1112@13591ms, 2d 1796x1112@13654ms, 2d 1796x1112@13743ms, 2d 1440x900@13782ms, 2d 1796x1112@13848ms, 2d 1796x1112@13898ms, 2d 1796x1112@14236ms
- shaders: 22 · features: displacement, grain, blur, texture sampling, fresnel/lighting · uniforms: modelMatrix, modelViewMatrix, projectionMatrix, viewMatrix, normalMatrix, cameraPosition, isOrthographic, mapTransform, alphaMapTransform, lightMapTransform, aoMapTransform, bumpMapTransform, normalMapTransform, displacementMapTransform, emissiveMapTransform, metalnessMapTransform, roughnessMapTransform, anisotropyMapTransform, clearcoatMapTransform, clearcoatNormalMapTransform, clearcoatRoughnessMapTransform, sheenColorMapTransform, sheenRoughnessMapTransform, iridescenceMapTransform, iridescenceThicknessMapTransform
- CSS easings: cubic-bezier(.19,1,.22,1)×1
- CSS durations: 7s×1
- CSS keyframes (0): 
- CSS features: mix-blend-mode×3, mask×22, text-stroke×2
- top transitions: transform .7s cubic-bezier(.19,1,.22,1)×1

## JS-driven tween clusters (109 tweens → 30 groups; times ms from navigation; phases {"loaded":3032,"hover":11079,"cursorStep":13708,"scroll":14935,"end":26253})
- [load @5137] div.about.about--active · transform.y 17.329→0 · 700ms · power4.out (rmse 0.002)
- [load @5137] div.about__container · transform.y -17.329→0 · 700ms · power4.out (rmse 0.002)
- [load @5236] p.oh · transform.y 103.689→0 · 600ms · power1.out (rmse 0.025) · ×6, stagger ~76ms
- [load @5241] span · transform.y 102.254→0 · 800ms · quart-out(.19,1,.22,1) (rmse 0.002) · ×5, stagger ~76ms
- [load @5435] nav.nav · transform.y -96.339→0 · 1000ms · quart-out(.19,1,.22,1) (rmse 0.002)
- [hover @11103] span.char · transform.y 126.103→0 · 350ms · power1.out (rmse 0.024) · ×32, stagger ~7ms
- [hover @11998] span.char · transform.y 0.011→130 · 350ms · power2.in (rmse 0.131) · ×30, stagger ~14ms
- [hover @11998] span.char · transform.y -2.783→-130 · 350ms · css ease-out (rmse 0.026) · ×4, stagger ~14ms
- [hover @12047] span.char · transform.y -129.946→0 · 350ms · linear (rmse 0.136) · ×7, stagger ~14ms
- [hover @12242] span.char · transform.y -123.768→0 · 250ms · linear (rmse 0.081)
- [hover @12242] span.char · transform.y 83.853→0 · 250ms · power1.out (rmse 0.015)
- [hover @12242] span.char · transform.y 92.526→0 · 300ms · power1.out (rmse 0.012)
- [scroll @14950] div#wrapper.about__wrapper · transform.y -24→-1440 · 850ms · css ease-out (rmse 0.047) · ×2, stagger ~1961ms
- [scroll @14950] img.about__infos__item__img · transform.y -0.028→-7.996 · 450ms · sine.inOut (rmse 0.042)
- [scroll @14950] img.about__infos__item__img · transform.y -0.035→-12.783 · 500ms · linear (rmse 0.045)
- [scroll @15179] img.about__infos__item__img · transform.y -0.02→-9.382 · 1200ms · power2.out (rmse 0.086)
- [scroll @15540] img.about__infos__item__img · transform.y -0.012→-1.786 · 750ms · power4.out (rmse 0.038)
- [scroll @16911] img.about__infos__item__img · transform.y -9.406→-13.15 · 200ms · linear (rmse 0.084)
- [scroll @16911] img.about__infos__item__img · transform.y -1.809→-14.431 · 800ms · linear (rmse 0.042)
- [scroll @17325] img.about__infos__item__img · transform.y -0.021→-5.234 · 1000ms · power2.out (rmse 0.093)
- [scroll @18818] div#wrapper.about__wrapper · transform.y -2904→-4320 · 800ms · css ease-out (rmse 0.034)
- [scroll @18818] img.about__infos__item__img · transform.y -5.255→-13.28 · 500ms · sine.inOut (rmse 0.038)
- [scroll @18930] div.about__services__container · transform.y 0.018→11.223 · 1250ms · power2.out (rmse 0.072)
- [scroll @18956] section.about__services · transform.y -0.013→-19.914 · 1650ms · power4.out (rmse 0.06)
- [scroll @19435] footer.footer · transform.y -0.006→-3.666 · 1150ms · power4.out (rmse 0.028)
- [scroll @20727] div#wrapper.about__wrapper · transform.y -4344→-4965 · 400ms · css ease (rmse 0.029)
- [scroll @20727] div.about__services__container · transform.y 11.247→17.484 · 1000ms · power3.out (rmse 0.065)
- [scroll @20734] section.about__services · transform.y -19.916→-20 · 550ms · quart-out(.19,1,.22,1) (rmse 0.009)
- [scroll @20734] footer.footer · transform.y -3.71→-19.769 · 1400ms · quart-out(.19,1,.22,1) (rmse 0.049)
- [scroll @20838] media.footer__media · transform.y -0.024→-6.891 · 850ms · power4.out (rmse 0.055)

## Notable assets
- fetch https://localstudio.fr/pogs/POGSOLO-OPT.glb 42KB
- fetch https://localstudio.fr/draco/draco_decoder.wasm 279KB
- fetch https://localstudio.fr/pogs/kini.glb 167KB
- video https://localstudio.fr/videos/ayam_1.mp4 0KB
- video https://localstudio.fr/videos/gpc_1.mp4 2801KB
- video https://localstudio.fr/videos/lupo_2.mp4 0KB
- video https://localstudio.fr/videos/lupo_1.mp4 0KB
- video https://localstudio.fr/videos/pony_1.mp4 0KB
- video https://localstudio.fr/videos/pony_2.mp4 3090KB
- video https://localstudio.fr/videos/monin_1.mp4 0KB
- video https://localstudio.fr/videos/monin_2.mp4 0KB

Raw: forensics/localstudio/ (forensics.json, source.css, source.js.txt, shaders.glsl, *.webm video of the run)