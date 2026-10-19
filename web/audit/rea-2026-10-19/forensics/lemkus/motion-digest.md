# lemkus — https://lemkus.com/blogs/news
- libs (bundle regex): barba · JS 6090 KB · CSS 526 KB · style mutations 11
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 200x50@2178ms
- CSS easings: cubic-bezier(.215,.61,.355,1)×32, cubic-bezier(.4,0,.2,1)×12, cubic-bezier(.4,0,.22,1)×9, cubic-bezier(.39,.575,.565,1)×8, cubic-bezier(.34,1.56,.64,1)×6, cubic-bezier(.33,0,0,1)×5
- CSS durations: 3s×121, 0s×107, 5s×78, 2s×45, 1s×41, 25s×27, 4s×23, 15s×21
- CSS keyframes (60): heroFadeIn {0%{opacity:.001;transform:translateY(15px)}to{opacity:1;transform:none}} | heroFadeOut {0%{opacity:1;transform:none}to{opacity:0;transform:translateY(15px)}} | dash {0%{stroke-dashoffset:100}to{stroke-dashoffset:0}} | fadeIn {0%{opacity:0}to{opacity:1}} | fadeOut {0%{opacity:1}to{opacity:0}} | fadeToggle {0%{opacity:0}10%{opacity:1}90%{opacity:1}to{opacity:0}} | slideInLeft {0%{opacity:0;transform:none;visibility:hidden}to{opacity:1;transform:translate(100%);visib} | slideOutLeft {0%{opacity:1;transform:translate(100%);visibility:unset}to{opacity:0;transform:none;visibi} | slideInRight {0%{opacity:0;transform:none;visibility:hidden}to{opacity:1;transform:translate(-100%);visi} | slideOutRight {0%{opacity:1;transform:translate(-100%);visibility:unset}to{opacity:0;transform:none;visib}
- CSS features: clip-path×22, mask×29, backdrop-filter×8, perspective×18, preserve-3d×1
- top transitions: none×19 | color .3s ease×9 | transform .4s cubic-bezier(.4,0,.22,1)×6 | opacity .5s ease×5 | opacity .3s ease,visibility .3s×5

## Running CSS/WAAPI animations (9 unique)
- [load@600] CSSTransition opacity on header.theme__header.aos-animate: 1000ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [load@600] CSSTransition transform on header.theme__header.aos-animate: 1000ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"none"},{"offset":"1","easing":"linear","transform":"translateZ(0px)"}]
- [load@600] CSSTransition opacity on img.fit-cover: 500ms ease-in delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"1e-06"},{"offset":"1","easing":"linear","opacity":"1"}]
- [load@600] CSSTransition transform on figure.image-wrapper.lazy-image: 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) delay 150 iter 1 kf [{"offset":"0","easing":"linear","transform":"scale(1.05)"},{"offset":"1","easing":"linear","transform":"none"}]
- [load@600] CSSTransition opacity on img: 500ms ease-in delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"1e-06"},{"offset":"1","easing":"linear","opacity":"1"}]
- [load@600] CSSAnimation indeterminate on div.loader-indeterminate: 2100ms linear delay 0 iter null kf [{"offset":"0","easing":"cubic-bezier(0.65, 0.815, 0.735, 0.395)","transform":"translate(0px) scaleX(0.35)"},{"offset":"0.6","easing":"cubic-bezier(0.65, 0.815,
- [load@600] CSSAnimation indeterminate-short on div.loader-indeterminate: 2100ms linear delay 1150 iter null kf [{"offset":"0","easing":"cubic-bezier(0.165, 0.84, 0.44, 1)","transform":"translate(0px) scaleX(2)"},{"offset":"0.6","easing":"cubic-bezier(0.165, 0.84, 0.44, 1
- [load@600] CSSAnimation heroFadeIn on div.article__text-wrapper.aos-animate: 1000ms linear delay 0 iter 1 kf [{"offset":"0","easing":"ease","transform":"translateY(15px)","opacity":"0.001"},{"offset":"1","easing":"ease","transform":"none","opacity":"1"}]
- [load@8000] CSSAnimation klaviyo-fadein on div.needsclick.kl-private-reset-css-Xuajs1: 350ms linear delay 0 iter 1 kf [{"offset":"0","easing":"ease","opacity":"0"},{"offset":"1","easing":"ease","opacity":"1"}]

## JS-driven tween clusters (0 tweens → 0 groups; times ms from navigation; phases {"loaded":2425,"hover":10492,"cursorStep":18447,"scroll":19654,"end":30651})

## Notable assets
- other cdn/shopifycloud/storefront/assets/storefront/storefronts.moderate.specrules-eb468f32.json 1KB

Raw: forensics/lemkus/ (forensics.json, source.css, source.js.txt, *.webm video of the run)