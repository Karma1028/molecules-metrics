# gataperduda — https://lagataperduda.com/en/mapa/
- libs (bundle regex): howler, vue, gsap, ScrollTrigger · JS 3380 KB · CSS 0 KB · style mutations 1567
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: webgl 1440x900@2013ms, 2d 300x150@2511ms
- shaders: 60 · features: grain, blur, texture sampling, fresnel/lighting · uniforms: vec4, vec2, float, vec3, u_globe_transition, u_is_globe, mat4, u_tile_tl_up, u_tile_tr_up, u_tile_br_up, u_tile_bl_up, u_tile_up_scale, sampler2D, u_dem, u_dem_prev, u_dem_unpack, u_dem_tl, u_dem_tl_prev, u_dem_scale, u_dem_scale_prev, u_dem_size, u_dem_lerp, u_exaggeration, u_meter_to_dem, u_label_plane_matrix_inv
- audio/media: AudioContext | AudioContext
- CSS easings: none
- CSS durations: 
- CSS keyframes (0): 
- CSS features: 
- top transitions: 

## JS-driven tween clusters (7 tweens → 7 groups; times ms from navigation; phases {"loaded":2060,"hover":10206,"cursorStep":17483,"scroll":18692,"end":30152})
- [load @1993] svg.cursor · transform.y -8.8→-108.56 · 650ms · power2.out (rmse 0.064)
- [load @2176] div.main-container.opacity-0 · opacity 0.024→0.997 · 450ms · power1.out (rmse 0.014)
- [load @2766] svg.cursor · transform.y -108.675→-110 · 1600ms · quart-out(.19,1,.22,1) (rmse 0.043)
- [load @2766] div#intro-lang-container.flex.w-full · opacity 0.009→1 · 2050ms · css ease-in-out (rmse 0.037)
- [hover @10232] svg.cursor · transform.y 571.11→648.88 · 2600ms · css ease (rmse 0.193)
- [hover @10232] svg.cursor · opacity 0→1 · 2600ms · circ-out(.075,.82,.165,1) (rmse 0.087)
- [hover @16682] svg.cursor · transform.y 612.17→990 · 2700ms · power3.inOut (rmse 0.654)

## Notable assets
- xmlhttprequest https://lagataperduda.com/sounds/ambient_raval.mp3 17026KB
- xmlhttprequest https://lagataperduda.com/sounds/idle.mp3 6759KB
- xmlhttprequest https://lagataperduda.com/sounds/idle.mp3 6759KB
- fetch https://api.mapbox.com/v4/mapbox.mapbox-traffic-v1.json 1KB
- fetch /mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2,danieverano.55hiywuc,fgtl.2c7xxyg7.json 5KB
- fetch .mapbox.com/styles/v1/fgtl/cm69ig6vc001r01pbemul9gq3/5x5x54uofv8dm46i84wvfkh3g/sprite.json 4KB

Raw: forensics/gataperduda/ (forensics.json, source.css, source.js.txt, shaders.glsl, *.webm video of the run)