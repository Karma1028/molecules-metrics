# crumbskees — https://crumbskees.com/
- libs (bundle regex): lottie, howler · JS 1852 KB · CSS 67 KB · style mutations 147
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 1x1@2859ms, 2d 300x150@2860ms, 2d 16x16@2866ms, webgl 300x150@11043ms, webgl2 300x150@11052ms, webgl2 300x150@11068ms, webgl2 300x150@14557ms
- shaders: 16 · features: texture sampling · uniforms: translationMatrix, uColor, uSampler, projectionMatrix, uTransform, uMapCoord, uClampFrame, uClampOffset, tint, uSamplers
- audio/media: AudioContext | AudioContext
- CSS easings: cubic-bezier(0.785, 0.135, 0.15, 0.86)×6, cubic-bezier(0.19, 1, 0.22, 1)×4, cubic-bezier(0.165, 0.84, 0.44, 1)×2
- CSS durations: 3s×19, 1s×8, 2s×7, 6s×6, 15s×4, 0.4s×2, 0.3s×2, 1.5s×2
- CSS keyframes (12): Button-button-hover--3woSL {from{transform:none}50%{transform:translate(.34722vw, .34722vw)}to{transform:none}} | MarqueeText-marquee-text-inner--BHhJ5 {0%{transform:translateX(0)}100%{transform:translateX(-200%)}} | SetupStage-mode-hover--192KR {from{transform:none}50%{transform:translate(.27778vw, .27778vw)}to{transform:none}} | GameZoneWrapper-playstage-blink-bar-color--3P60k {0%{opacity:0}50%{opacity:1}100%{opacity:0}} | PopupMessage-message-fade-in--qtlQv {0%{opacity:0;transform:translate(-50%, -50%) scale(0.7)}100%{opacity:1;transform:translate} | PopupMessage-message-fade-out--1w0F3 {0%{opacity:1;transform:translate(-50%, -50%) scale(1)}100%{opacity:0;transform:translate(-} | Board-round-name-appear--2JJjA {from{opacity:0;transform:translateY(-500%) scale(1.5)}to{opacity:1;transform:none}} | Board-power-ring--2EXwA {0%{stroke-dashoffset:0}to{stroke-dashoffset:182.2128}} | Board-item-appear--3d5br {0%{opacity:0;transform:scale(0.1)}to{opacity:1;transform:scale(1)}} | Intro-intro-blink-color--3Ys4X {0%{color:#f4b7ed}50%{color:#fff}100%{color:#f4b7ed}}
- CSS features: mix-blend-mode×3, clip-path×3, text-stroke×44
- top transitions: opacity .3s×5 | transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86)×2 | padding 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),transform 0.4s cubic-bezier(0.165, 0.84, 0×1 | background .2s ease×1 | transform .15s ease-in-out×1

## Running CSS/WAAPI animations (1 unique)
- [load@600] CSSAnimation MarqueeText-marquee-text-inner--BHhJ5 on div.MarqueeText-marqueeInnerText--2xcAP: 12000ms linear delay 0 iter null kf [{"offset":"0","easing":"linear","transform":"translateX(0px)"},{"offset":"1","easing":"linear","transform":"translateX(-200%)"}]

## JS-driven tween clusters (0 tweens → 0 groups; times ms from navigation; phases {"loaded":2920,"gateClick":11008,"gateDone":24144,"hover":24145,"cursorStep":24960,"scroll":26170,"end":37424})

## Notable assets
- xmlhttprequest https://crumbskees.com/bc16f6bf75cd0930aa3c9d05c5bbff08.webm 3409KB
- xmlhttprequest https://crumbskees.com/c0c20f32e3e09ebb32cf4b5e72b82209.webm 1441KB
- xmlhttprequest https://crumbskees.com/bfb4a067abce6fc01979231b7a4303e2.webm 1036KB
- xmlhttprequest https://crumbskees.com/2e298d33094774ef56419fa1048df5c7.webm 2044KB
- xmlhttprequest https://crumbskees.com/a029ecfd104f532da7e75bd31117c487.mp3 3KB
- xmlhttprequest https://crumbskees.com/4c360883bd71234981ff04ca9c04bcfa.mp3 4KB
- xmlhttprequest https://crumbskees.com/bc2d85d2d2d01bf0fd76592caa35ff94.mp3 5KB
- xmlhttprequest https://crumbskees.com/781a75c39863caa30bba1550cfc5025f.mp3 14KB
- xmlhttprequest https://crumbskees.com/87651ff9b5e37e80a193b300345b6ec5.mp3 14KB
- xmlhttprequest https://crumbskees.com/3735759acac8ee829890eee943c3b36e.mp3 5KB
- xmlhttprequest https://crumbskees.com/806d5af761af08eff998c158fac54eb3.mp3 5KB
- video https://crumbskees.com/69344aa69b3ec5c2bb314bedd08cb07c.mp4 0KB
- video https://crumbskees.com/69344aa69b3ec5c2bb314bedd08cb07c.mp4 10KB
- video https://crumbskees.com/69344aa69b3ec5c2bb314bedd08cb07c.mp4 1681KB
- video https://crumbskees.com/618caec740beb232fd7ecc90b2784d2b.mp4 0KB

Raw: forensics/crumbskees/ (forensics.json, source.css, source.js.txt, shaders.glsl, *.webm video of the run)