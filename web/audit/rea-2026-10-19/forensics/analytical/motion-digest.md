# analytical — https://analytical-group.com/it
- libs (bundle regex): react, lottie, barba · JS 2618 KB · CSS 466 KB · style mutations 345
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 1x1@11611ms, webgl 300x150@11694ms
- CSS easings: cubic-bezier(0,.33,.07,1.03)×1, cubic-bezier(.58,.3,.005,1)×1
- CSS durations: 3s×30, 0.3s×20, 2s×17, 1s×15, 0s×8, 4s×7, 500ms×5, 02s×3
- CSS keyframes (9): eicon-spin {0%{transform:rotate(0deg)}to{transform:rotate(359deg)}} | fadeInDown {from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:none}} | hide-scroll {0%,to{overflow:hidden}} | hide-scroll {0%,to{overflow:hidden}} | fadeIn {from{opacity:0}to{opacity:1}} | swiper-preloader-spin {0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}} | a {0%{transform:rotate(0deg)}to{transform:rotate(359deg)}} | fa-spin {0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn} | fa-spin {0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn}
- CSS features: mix-blend-mode×4, clip-path×1, mask×9, perspective×7, preserve-3d×1, @media (prefers-reduced-motion×3, steps(×2
- top transitions: color 0.3s×12 | all var(--n-menu-title-transition)×6 | fill 0.3s×6 | all .3s×4 | max-height .3s,transform .3s×3

## Running CSS/WAAPI animations (2 unique)
- [load@8000] CSSAnimation fadeIn on div.elementor-element.elementor-element-8f439c6: 1250ms linear delay 0 iter 1 kf [{"offset":"0","easing":"ease","opacity":"0"},{"offset":"1","easing":"ease","opacity":"1"}]
- [scroll3] CSSTransition transform on div.swiper-wrapper: 500ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate3d(-1481.63px, 0px, 0px)"},{"offset":"1","easing":"linear","transform":"translate3d(-1728.57px, 0px, 0px)

## JS-driven tween clusters (7 tweens → 6 groups; times ms from navigation; phases {"loaded":6416,"hover":14478,"cursorStep":17973,"scroll":19195,"end":30467})
- [scroll @19217] div.elementor-motion-effects-layer · --translateX -241.171→-140.544 · 450ms · linear (rmse 0.014) · ×2, stagger ~3797ms
- [scroll @21084] div.elementor-motion-effects-layer · --translateX -361.843→-301.478 · 300ms · linear (rmse 0.006)
- [scroll @23211] div.elementor-element.elementor-element-552d57e · --translateY 7.24→-64 · 200ms · power2.out (rmse 0.013)
- [scroll @23211] a.elementor-element.elementor-element-6cbb408 · --translateY 7.24→-64 · 200ms · power2.out (rmse 0.014)
- [scroll @23212] a.elementor-element.elementor-element-55917d3 · --translateY 7.24→-64 · 200ms · power2.out (rmse 0.013)
- [scroll @24876] div.elementor-motion-effects-layer · --translateX -120.442→-19.872 · 500ms · linear (rmse 0.011)

## Notable assets
- xmlhttprequest /consentcdn.cookiebot.com/consentconfig/813fa6c8-60a9-43c9-8d24-d9e9acc11ffa/settings.json 0KB

Raw: forensics/analytical/ (forensics.json, source.css, source.js.txt, *.webm video of the run)