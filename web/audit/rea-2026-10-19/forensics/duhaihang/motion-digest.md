# duhaihang — https://duhaihang.com/
- libs (bundle regex): gsap · JS 172 KB · CSS 13 KB · style mutations 3708
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: webgl 300x150@604ms, webgl2 300x150@609ms
- GSAP global calls: 16; first: to(div.progress) [0.5,{"scaleX":0.06999999999999999}] ; to(div.progress) [0.5,{"scaleX":0.13999999999999999}] ; to(div.progress) [0.5,{"scaleX":0.7}] ; to(div.progress) [1,{"scaleX":0.8}] ; to(div.progress) [0.3,{"scaleX":1}] ; to(div.cen) [1.7,{"scaleX":0,"delay":0.3}]
- CSS easings: cubic-bezier(.86,0,.07,1)×4
- CSS durations: 7s×4, 1.5s×4, 4s×3
- CSS keyframes (0): 
- CSS features: 
- top transitions: opacity .4s,-webkit-transform .7s×1 | opacity .4s,transform .7s×1 | opacity .4s,transform .7s,-webkit-transform .7s×1 | -webkit-transform 1.5s cubic-bezier(.86,0,.07,1)×1 | transform 1.5s cubic-bezier(.86,0,.07,1)×1

## Running CSS/WAAPI animations (13 unique)
- [hover0] CSSTransition opacity on div.headline.dsp: 400ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [hover0] CSSTransition transform on div.headline.dsp: 700ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate3d(0px, 15px, 0px)"},{"offset":"1","easing":"linear","transform":"none"}]
- [hover0] CSSTransition transform on span.city1: 1500ms cubic-bezier(0.86, 0, 0.07, 1) delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"scaleX(0)"},{"offset":"1","easing":"linear","transform":"none"}]
- [hover0] CSSTransition opacity on div.journey.dsp: 400ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [hover0] CSSTransition transform on div.journey.dsp: 700ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate3d(0px, 15px, 0px)"},{"offset":"1","easing":"linear","transform":"none"}]
- [hover1] CSSTransition opacity on div.endline.dsp: 400ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [hover1] CSSTransition transform on div.endline.dsp: 700ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate3d(0px, 15px, 0px)"},{"offset":"1","easing":"linear","transform":"none"}]
- [hover1] CSSTransition opacity on div.footer.dsp: 400ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [hover1] CSSTransition transform on div.footer.dsp: 700ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate3d(0px, 15px, 0px)"},{"offset":"1","easing":"linear","transform":"none"}]
- [hover1] CSSTransition opacity on div.contact.dsp: 400ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [hover1] CSSTransition transform on div.contact.dsp: 700ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate3d(0px, 15px, 0px)"},{"offset":"1","easing":"linear","transform":"none"}]
- [hover1] CSSTransition opacity on div.copyright.dsp: 400ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [hover1] CSSTransition transform on div.copyright.dsp: 700ms ease delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translate3d(0px, 15px, 0px)"},{"offset":"1","easing":"linear","transform":"none"}]

## JS-driven tween clusters (10 tweens → 8 groups; times ms from navigation; phases {"loaded":629,"hover":8690,"cursorStep":13043,"scroll":14251,"end":25531})
- [load @832] div.progress · transform.s 0→0.8 · 1200ms · css ease (rmse 0.314)
- [load @1356] div.cen · transform.s 1.1→0 · 1650ms · power2.inOut (rmse 0.009)
- [load @1356] div.Home.f · opacity 0→1 · 400ms · power2.inOut (rmse 0.043)
- [load @1533] div.Navi · opacity 0→1 · 500ms · power2.inOut (rmse 0.005)
- [load @2714] div.Preloader.f · opacity 1→0 · 300ms · power2.inOut (rmse 0.006)
- [scroll @14263] div.Home.f · transform.y -1455→-2880 · 900ms · css ease-out (rmse 0.05) · ×3, stagger ~3785ms
- [scroll @17998] div.Home.f · transform.y -2895→-4320 · 1100ms · css ease (rmse 0.043)
- [scroll @21790] div.Home.f · transform.y -5775→-6764 · 450ms · linear (rmse 0.046)

## Notable assets
- xmlhttprequest https://duhaihang.com/assets/config.json 0KB

Raw: forensics/duhaihang/ (forensics.json, source.css, source.js.txt, *.webm video of the run)