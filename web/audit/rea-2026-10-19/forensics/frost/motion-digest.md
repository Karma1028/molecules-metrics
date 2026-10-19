# frost — https://www.frostype.xyz/typeface/system-blank
- libs (bundle regex): lottie, vue · JS 2270 KB · CSS 313 KB · style mutations 3577
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 1x1@547ms, 2d 300x150@550ms
- CSS easings: cubic-bezier(.75,0,.25,1)×11
- CSS durations: 5s×187, 2s×20, 0s×12, 1s×9, 1.5s×9, 3s×9, 7s×8, 4s×2
- CSS keyframes (25): snipContentIn {0%{transform:translate(-50px)}to{transform:translate(0)}} | snipContentOut {0%{transform:translate(0)}to{transform:translate(-50px)}} | snipIn {0%{clip-path:polygon(100% 0,100% 0,100% 100%,100% 100%);-webkit-clip-path:polygon(100% 0,1} | snipOut {0%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);-webkit-clip-path:polygon(0 0,100% 0,100} | progBar {0%{width:0}to{width:100%}} | slideIn-data-v-00c4f9d2 {0%{transform:translateX(110%)}to{transform:translateX(0)}} | slideIn-data-v-00c4f9d2 {0%{transform:translateX(110%)}to{transform:translateX(0)}} | spin-data-v-00c4f9d2 {0%{transform:rotate(0deg)}to{transform:rotate(1turn)}} | spin-data-v-00c4f9d2 {0%{transform:rotate(0deg)}to{transform:rotate(1turn)}} | slideDown-data-v-00c4f9d2 {0%{height:0}to{height:100vh}}
- CSS features: mix-blend-mode×3, clip-path×16
- top transitions: .5s×42 | border .5s×20 | color .5s×18 | opacity .5s×14 | .2s ease-out×10

## Running CSS/WAAPI animations (5 unique)
- [load@600] CSSAnimation progBar on div.image_object: 4500ms linear delay 0 iter 1 kf [{"offset":"0","easing":"cubic-bezier(0.75, 0, 0.25, 1)","width":"0px"},{"offset":"1","easing":"cubic-bezier(0.75, 0, 0.25, 1)","width":"100%"}]
- [load@1500] CSSTransition color on p.image_title: 500ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","color":"rgb(0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgba(0, 0, 0, 0.5)"}]
- [load@3000] CSSTransition opacity on div.site_intro: 1000ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"1"},{"offset":"1","easing":"linear","opacity":"0"}]
- [load@8000] CSSTransition width on div.image_object.typeface_page_header_carousel_prog: 5000ms cubic-bezier(0.75, 0, 0.25, 1) delay 0 iter 1 kf [{"offset":"0","easing":"linear","width":"0px"},{"offset":"1","easing":"linear","width":"100%"}]
- [hover1] CSSTransition color on a: 500ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","color":"rgb(0, 0, 0)"},{"offset":"1","easing":"linear","color":"rgba(0, 0, 0, 0.5)"}]

## JS-driven tween clusters (11 tweens → 7 groups; times ms from navigation; phases {"loaded":601,"hover":8791,"cursorStep":13249,"scroll":14463,"end":25957})
- [load @621] div.hand.second · transform.r 84.24→236.232 · 25350ms · linear (rmse 0)
- [scroll @14491] div.typeface_page_trials_options_option.typeface_page_trials_options_option_product · --opacity 123.333→-10 · 550ms · linear (rmse 0.008)
- [scroll @14491] div.cut_feature_case.cut_feature_tab · --opacity 123.333→-10 · 550ms · linear (rmse 0.008)
- [scroll @18461] div.typeface_page_trials_options_option.typeface_page_trials_options_option_product · --opacity -516.667→-650 · 500ms · linear (rmse 0.012) · ×3, stagger ~3744ms
- [scroll @18461] div.cut_feature_case.cut_feature_tab · --opacity -516.667→-650 · 500ms · linear (rmse 0.012) · ×3, stagger ~3744ms
- [scroll @20343] div.typeface_page_trials_options_option.typeface_page_trials_options_option_product · --opacity -356.667→-490 · 450ms · linear (rmse 0.018)
- [scroll @20343] div.cut_feature_case.cut_feature_tab · --opacity -356.667→-490 · 450ms · linear (rmse 0.018)

## Notable assets
- fetch https://cdn.snipcart.com/themes/v3.9.1/l10n/en.json 0KB

Raw: forensics/frost/ (forensics.json, source.css, source.js.txt, *.webm video of the run)