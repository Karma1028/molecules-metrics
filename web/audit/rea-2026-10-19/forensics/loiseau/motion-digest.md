# loiseau — https://loiseau.framer.website/
- libs (bundle regex): react, Lenis · JS 1384 KB · CSS 0 KB · style mutations 2153
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: webgl 1440x900@887ms, 2d 4320x2700@957ms, 2d 4320x2700@1028ms, webgl 1440x900@1065ms, 2d 4320x2700@1141ms, webgl2 300x150@8967ms, webgl2 300x150@18324ms
- shaders: 8 · features: noise, displacement, mouse, texture sampling, fresnel/lighting · uniforms: u_logo, u_time, u_wakes, u_wakeVelocity, u_wakeCount, u_pointer, u_pointerMix, u_distortionStrength, u_hoverRadius, u_decayTime, u_aspect, u_useChromaColors, u_chromaColorR, u_chromaColorG, u_chromaColorB, u_texture, u_cells, u_thickness, u_invert, u_reverseSymbols, u_colorMode, u_foreground, u_background, u_resolution, u_deltaTime
- CSS easings: none
- CSS durations: 
- CSS keyframes (0): 
- CSS features: 
- top transitions: 

## JS-driven tween clusters (13 tweens → 8 groups; times ms from navigation; phases {"loaded":205,"gateClick":8270,"hover":12324,"cursorStep":16721,"scroll":17927,"end":30286})
- [load @959] ul · transform.x -454→-360.32 · 7400ms · circ-out(.075,.82,.165,1) (rmse 2.358)
- [load @2155] a.framer-6jWyo.framer-n0ccwk · transform.y 9.982→0.025 · 350ms · css ease (rmse 0.011)
- [load @2155] a.framer-6jWyo.framer-n0ccwk · opacity 0.003→1 · 600ms · power3.out (rmse 0.048)
- [hover @12374] div.framer-yu0ah1 · --extracted-r6o4lv 12→195 · 300ms · power4.out (rmse 0.027)
- [hover @12374] svg.framer-O0XeT.framer-oes2ju · --21h8s6 12→195 · 300ms · power4.out (rmse 0.027)
- [hover @13281] div.framer-yu0ah1 · --extracted-r6o4lv 195→0 · 200ms · linear (rmse 0.034)
- [hover @13281] svg.framer-O0XeT.framer-oes2ju · --21h8s6 195→0 · 200ms · linear (rmse 0.034)
- [hover @13281] div.framer-31ste8 · transform.s 1.05→1.05 · 400ms · css ease-in-out (rmse 0.01) · ×6, stagger ~870ms

## Notable assets


Raw: forensics/loiseau/ (forensics.json, source.css, source.js.txt, shaders.glsl, *.webm video of the run)