# marseille — https://marseille.laphase5.com/en
- libs (bundle regex): howler, three · JS 3171 KB · CSS 179 KB · style mutations 1442
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 300x150@2226ms, experimental-webgl 300x150@2233ms, webgl2 300x150@3133ms, 2d 512x512@3538ms
- audio/media: AudioContext | AudioContext
- CSS easings: cubic-bezier(.16,1,.3,1)×1241, cubic-bezier(.165,.84,.44,1)×136, cubic-bezier(.64,0,.78,0)×38, cubic-bezier(.83,0,.17,1)×5
- CSS durations: 6s×574, 1s×457, 5s×316, 0s×267, 3s×264, 4s×147, 8s×119, 2s×95
- CSS keyframes (0): 
- CSS features: text-stroke×2
- top transitions: opacity .6s cubic-bezier(.16,1,.3,1) .1s,-webkit-transform .6s cubic-bezier(.16,1,.3,1) .1×44 | opacity .6s cubic-bezier(.16,1,.3,1) 0s,-webkit-transform .6s cubic-bezier(.16,1,.3,1) 0s×40 | opacity .3s cubic-bezier(.16,1,.3,1),-webkit-transform .3s cubic-bezier(.16,1,.3,1)×38 | color .5s cubic-bezier(.16,1,.3,1)×36 | stroke .5s cubic-bezier(.16,1,.3,1)×36

## Running CSS/WAAPI animations (1 unique)
- [load@1500] CSSTransition transform on span.odometer-ribbon-inner: 100ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"none"},{"offset":"1","easing":"linear","transform":"translateY(-100%)"}]

## JS-driven tween clusters (2 tweens → 2 groups; times ms from navigation; phases {"loaded":2330,"gateClick":10380,"gateDone":34421,"hover":34423,"cursorStep":35239,"scroll":36444,"end":47511})
- [load @3546] div.Preload-numbers · transform.s 0.7→1.2 · 8550ms · linear (rmse 0.052)
- [gate @13021] span.odometer-digit · transform.x 0.716→45 · 500ms · power3.out (rmse 0.004)

## Notable assets
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/intro.mp3 257KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/map.mp3 259KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/pin_over.mp3 14KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/pin_out.mp3 14KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/zoom.mp3 22KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/btn_click.mp3 3KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/btn_over.mp3 3KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/360_enterprise.mp3 251KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/360_enterprise.mp3 0KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/360_culture.mp3 251KB
- xmlhttprequest https://marseille.laphase5.com/assets/sounds/360_outdoor.mp3 269KB
- xmlhttprequest https://marseille.laphase5.com/models/water.glb 1037KB
- xmlhttprequest https://marseille.laphase5.com/models/terrain.glb 2350KB
- xmlhttprequest https://marseille.laphase5.com/models/pin4.glb 108KB

Raw: forensics/marseille/ (forensics.json, source.css, source.js.txt, *.webm video of the run)