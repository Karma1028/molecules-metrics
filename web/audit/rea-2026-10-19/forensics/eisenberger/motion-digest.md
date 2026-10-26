# eisenberger — https://www.eisenberger.co.at/en/photography/
- libs (bundle regex): gsap · JS 1271 KB · CSS 70 KB · style mutations 1975
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: none
- CSS easings: cubic-bezier(0.165, 0.84, 0.44, 1)×5, cubic-bezier(0.77, 0, 0.175, 1)×4, cubic-bezier(0.4, 0, 0.22, 1)×4, cubic-bezier(0.25, 0.46, 0.45, 0.94)×4, cubic-bezier(0.39, 0.575, 0.565, 1)×1, cubic-bezier(0.64, -0.005, 0.58, 1)×1
- CSS durations: 0.5s×24, 0.4s×21, 0.3s×15, 1s×11, 0.6s×6, 0.7s×4, 0.1s×4, 0s×4
- CSS keyframes (5): newSlideUp { 0% { transform: translateY(100%); } 100% { transform: translateY(0%); }} | FillIn { from { fill-opacity: 0; } to { fill-opacity: 1; }} | FadeIn { from { opacity: 0; transform: translate(-50%, -65%); } to { opacity: 1; transform: transl} | FadeInBody { from { opacity: 0; } to { opacity: 1; }} | FadeOutBody { from { opacity: 1; } to { opacity: 0; }}
- CSS features: 
- top transitions: all 0.5s ease-in-out×7 | all 0.4s ease-in-out×6 | transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)×3 | all 0.7s cubic-bezier(0.77, 0, 0.175, 1)×2 | opacity 0.3s ease-in-out×2

## Running CSS/WAAPI animations (11 unique)
- [load@600] CSSTransition transform on header.js-site-head.site-head: 700ms cubic-bezier(0.77, 0, 0.175, 1) delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate(0px, -100%)"},{"offset":"1","easing":"linear","transform":"translate(0px)"}]
- [load@600] CSSTransition transform on a.js-menu-toggle.menu-toggle: 500ms cubic-bezier(0.165, 0.84, 0.44, 1) delay 400 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate(0px, -100%)"},{"offset":"1","easing":"linear","transform":"translate(0px)"}]
- [load@600] CSSTransition transform on a.site-title.delay--6: 500ms cubic-bezier(0.165, 0.84, 0.44, 1) delay 600 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate(-50%, -400%)"},{"offset":"1","easing":"linear","transform":"translate(-50%, -50%)"}]
- [load@600] CSSTransition transform on div.language-picker.delay--8: 500ms cubic-bezier(0.165, 0.84, 0.44, 1) delay 800 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate(0px, -150%)"},{"offset":"1","easing":"linear","transform":"translate(0px, -50%)"}]
- [load@600] CSSTransition opacity on img.js-video-fallback.video-fallback: 1000ms ease-in-out delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [scroll0] CSSTransition opacity on path.circle: 250ms ease-out delay 1500 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [scroll0] CSSTransition stroke-dashoffset on path.circle: 250ms ease-out delay 1500 iter 1 kf [{"offset":"0","easing":"linear","strokeDashoffset":"435.637px"},{"offset":"1","easing":"linear","strokeDashoffset":"0px"}]
- [scroll0] CSSTransition transform on path.circle: 250ms ease-out delay 1500 iter 1 kf [{"offset":"0","easing":"linear","transform":"none"},{"offset":"1","easing":"linear","transform":"translate(0px)"}]
- [scroll0] CSSTransition stroke-dashoffset on path: 660ms linear delay 1500 iter 1 kf [{"offset":"0","easing":"linear","strokeDashoffset":"63.4px"},{"offset":"1","easing":"linear","strokeDashoffset":"0px"}]
- [scroll0] CSSTransition opacity on span.icon-link__label: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) delay 1500 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [scroll0] CSSTransition transform on span.icon-link__label: 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) delay 1500 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate(0px, 10%)"},{"offset":"1","easing":"linear","transform":"translate(0px)"}]

## JS-driven tween clusters (0 tweens → 0 groups; times ms from navigation; phases {"loaded":3347,"hover":11388,"cursorStep":21675,"scroll":22888,"end":33964})

## Notable assets


Raw: forensics/eisenberger/ (forensics.json, source.css, source.js.txt, *.webm video of the run)