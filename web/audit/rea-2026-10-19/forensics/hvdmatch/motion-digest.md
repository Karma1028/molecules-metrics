# hvdmatch — https://www.hvdfonts.com/fonts/match
- libs (bundle regex): none · JS 1180 KB · CSS 1393 KB · style mutations 9
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: none
- CSS easings: cubic-bezier(.65,-.25,.31,1.99)×1
- CSS durations: 25s×18, 1s×16, 2s×15, 5s×9, 4s×9, 0s×4, 3s×2, 45s×2
- CSS keyframes (10): pop-in {0%{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}} | fadeInOut {0%{opacity:0}to{opacity:1}} | navihint {0%{transform:translateY(0)}30%{transform:translateY(20px)}to{transform:translateY(15px)}} | hidenavihint {0%{transform:translateY(15px)}30%{transform:translateY(-5px)}to{transform:translateY(0)}} | arrow {0%{transform:translate(-50%) rotate(45deg)}30%{transform:translate(-50%) rotate(45deg)}70%} | dotpulse {0%{background-color:#d8ebea}50%{background-color:#8ecfd4}to{background-color:#d8ebea}} | dotsonar {0%{transform:translate(-50%) translateY(-50%) scale(1);opacity:.75}to{transform:translate(} | bounceFromRight {0%{margin-left:0}50%{margin-left:-30px}to{margin-left:0}} | bounceFromLeft {0%{margin-left:0}50%{margin-left:30px}to{margin-left:0}} | bounce {0%,to{transform:scale(0)}50%{transform:scale(1)}}
- CSS features: clip-path×41, preserve-3d×3
- top transitions: all .1s ease-in-out×3 | .4s×3 | all .2s ease-in-out×2 | transform .1s ease×2 | transform .25s ease-in-out×2

## Running CSS/WAAPI animations (10 unique)
- [load@600] CSSAnimation hidenavihint on header.header.has-hide-animation: 450ms linear delay 0 iter 1 kf [{"offset":"0","easing":"ease","transform":"translateY(15px)"},{"offset":"0.3","easing":"ease","transform":"translateY(-5px)"},{"offset":"1","easing":"ease","tr
- [scroll5] CSSTransition color on div.type-styles__characters.webfont-loaded: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]
- [scroll5] CSSTransition color on p.type-tester__line.type-tester__line--medium: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]
- [scroll5] CSSTransition color on p.type-tester__line.type-tester__line--extralarge: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]
- [scroll5] CSSTransition color on div.type-l-to-xl.webfont-loaded: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]
- [scroll5] CSSTransition color on div.product__name.type-l-to-xl: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]
- [scroll5] CSSTransition color on p.webfont-loaded.webfont-loaded-done: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]
- [scroll5] CSSTransition color on p.ot-tnum.sample-with-lines: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]
- [scroll5] CSSTransition color on div.tabs__tabs-contents.mt: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]
- [scroll5] CSSTransition color on h1.type-xxl-to-xxxxl.lh--xs: 1000ms ease delay 300 iter 1 kf [{"offset":"0","easing":"linear","color":"rgba(0, 0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgb(0, 0, 0)"}]

## JS-driven tween clusters (0 tweens → 0 groups; times ms from navigation; phases {"loaded":2093,"hover":10167,"cursorStep":20426,"scroll":21633,"end":32683})

## Notable assets


Raw: forensics/hvdmatch/ (forensics.json, source.css, source.js.txt, *.webm video of the run)