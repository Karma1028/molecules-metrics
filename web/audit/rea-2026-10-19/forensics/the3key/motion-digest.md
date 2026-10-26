# the3key — https://the3key.com/
- libs (bundle regex): gsap, ScrollTrigger · JS 1320 KB · CSS 644 KB · style mutations 1132
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 300x150@3482ms
- CSS easings: cubic-bezier(.4,0,.6,1)×4, cubic-bezier(.28,.84,.42,1)×2, cubic-bezier(0.47, 0, 0.74, 0.71)×1, cubic-bezier(0.22, 0.61, 0.36, 1)×1, cubic-bezier(0.5, 0, 0.14, 1)×1, cubic-bezier(0, 0, 0.25, 1)×1
- CSS durations: 5s×63, 25s×31, 1s×20, 0s×20, 200ms×15, 2s×7, 0.5s×6, 3s×5
- CSS keyframes (23): cmplz-fadein {from{opacity:0}to{opacity:1}} | fa-beat {0%,90%{-webkit-transform:scale(1);transform:scale(1)}45%{-webkit-transform:scale(var(--fa-} | fa-beat {0%,90%{-webkit-transform:scale(1);transform:scale(1)}45%{-webkit-transform:scale(var(--fa-} | fa-bounce {0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}10%{-webkit-t} | fa-bounce {0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}10%{-webkit-t} | fa-fade {50%{opacity:var(--fa-fade-opacity,.4)}} | fa-fade {50%{opacity:var(--fa-fade-opacity,.4)}} | fa-beat-fade {0%,to{opacity:var(--fa-beat-fade-opacity,.4);-webkit-transform:scale(1);transform:scale(1)} | fa-beat-fade {0%,to{opacity:var(--fa-beat-fade-opacity,.4);-webkit-transform:scale(1);transform:scale(1)} | fa-flip {50%{-webkit-transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),va}
- CSS features: mix-blend-mode×1, clip-path×4, mask×13, perspective×6, preserve-3d×1, @media (prefers-reduced-motion×1, steps(×2
- top transitions: none×30 | all .5s ease×19 | border-color .25s ease-in-out,-webkit-box-shadow .5s×8 | none×7 | background-color .25s ease-out,color .25s ease-out×6

## Running CSS/WAAPI animations (2 unique)
- [load@600] CSSAnimation tapFloat-desktop on a.tap-btn: 4000ms linear delay 0 iter null kf [{"offset":"0","easing":"ease-in-out","transform":"rotate(0deg) translate(-100%, -50%)"},{"offset":"0.5","easing":"ease-in-out","transform":"rotate(3deg) transl
- [scroll0] CSSAnimation mc_slideOut on button.cmplz-btn.cmplz-manage-consent: 500ms linear delay 0 iter 1 kf [{"offset":"0","easing":"ease","bottom":"-35px"},{"offset":"1","easing":"ease","bottom":"-35px"}]

## JS-driven tween clusters (7 tweens → 4 groups; times ms from navigation; phases {"loaded":3848,"hover":12765,"cursorStep":13596,"scroll":14803,"end":25847})
- [scroll @16669] div.circles · transform.y 2.911→-1.533 · 450ms · linear (rmse 0.011)
- [scroll @22350] div.overlapping-card__inner · opacity 1→0 · 250ms · power2.in (rmse 0.136) · ×2, stagger ~1666ms
- [scroll @22350] div.overlapping-card__inner · transform.s 0.988→0.7 · 250ms · linear (rmse 0.084) · ×2, stagger ~1666ms
- [scroll @22350] div.overlapping-card__inner · transform.r 0.328→4.58 · 250ms · linear (rmse 0.084) · ×2, stagger ~1666ms

## Notable assets


Raw: forensics/the3key/ (forensics.json, source.css, source.js.txt, *.webm video of the run)