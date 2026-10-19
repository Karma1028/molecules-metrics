# moonsafari — https://www.moonsafari.archi/
- libs (bundle regex): gsap, SplitText · JS 1423 KB · CSS 197 KB · style mutations 3512
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: 2d 300x150@3876ms, 2d 300x150@3877ms, 2d 300x150@3883ms, 2d 300x150@3883ms, 2d 300x150@3883ms, 2d 300x150@3883ms, 2d 300x150@3884ms, 2d 300x150@3886ms, 2d 300x150@3886ms, 2d 300x150@3886ms, 2d 300x150@3886ms, 2d 300x150@3887ms, 2d 300x150@3887ms, 2d 300x150@3887ms, 2d 300x150@3887ms, 2d 300x150@3887ms, 2d 300x150@3887ms, 2d 300x150@3887ms, 2d 300x150@3887ms, 2d 300x150@3887ms
- CSS easings: cubic-bezier(.165,.84,.44,1)×213, cubic-bezier(.25,.46,.45,.94)×131, cubic-bezier(.77,0,.175,1)×91, cubic-bezier(.455,.03,.515,.955)×46, cubic-bezier(.645,.045,.355,1)×25, cubic-bezier(0,0,.25,1)×22
- CSS durations: 5s×379, 0s×99, 3s×85, 8s×63, 2s×37, 15s×20, 1s×17, 18s×17
- CSS keyframes (8): cursor-circle-loading {10%{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}80%{opacity:0;-web} | cursor-circle-loading {10%{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}80%{opacity:0;-web} | cursor-pt-loading {0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d} | cursor-pt-loading {0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d} | lg-right-end {0%{left:0}50%{left:-30px}100%{left:0}} | lg-right-end {0%{left:0}50%{left:-30px}100%{left:0}} | lg-left-end {0%{left:0}50%{left:30px}100%{left:0}} | lg-left-end {0%{left:0}50%{left:30px}100%{left:0}}
- CSS features: clip-path×4, mask×23, @media (prefers-reduced-motion×2, text-stroke×1
- top transitions: -webkit-transform .5s cubic-bezier(.77,0,.175,1)×24 | opacity .5s cubic-bezier(.25,.46,.45,.94),-webkit-transform .5s cubic-bezier(.165,.84,.44,×20 | opacity .5s cubic-bezier(.25,.46,.45,.94)×18 | all .5s cubic-bezier(.165,.84,.44,1)×16 | -webkit-transform .5s cubic-bezier(.165,.84,.44,1)×16

## Running CSS/WAAPI animations (7 unique)
- [load@600] CSSTransition background-color on figure.fp-img-bg-item.img-lazy-container: 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955) delay 500 iter 1 kf [{"offset":"0","easing":"linear","backgroundColor":"rgba(136, 136, 136, 0.1)"},{"offset":"1","easing":"linear","backgroundColor":"rgba(0, 0, 0, 0)"}]
- [load@600] CSSTransition opacity on img.fp-img-bg.img-lazy: 1000ms cubic-bezier(0.455, 0.03, 0.515, 0.955) delay 0 iter 1 kf [{"offset":"0","easing":"linear","opacity":"0"},{"offset":"1","easing":"linear","opacity":"1"}]
- [load@600] CSSAnimation cursor-circle-loading on div.cursor-loader: 1200ms linear delay 0 iter null kf [{"offset":"0","easing":"cubic-bezier(0.165, 0.84, 0.44, 1)","transform":"none","opacity":"1"},{"offset":"0.1","easing":"cubic-bezier(0.165, 0.84, 0.44, 1)","tr
- [load@600] CSSAnimation cursor-pt-loading on div.cursor-loader: 1200ms linear delay 0 iter null kf [{"offset":"0","easing":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","transform":"scale3d(1, 1, 1)"},{"offset":"0.5","easing":"cubic-bezier(0.455, 0.03, 0.515, 0.9
- [load@3000] CSSTransition transform on div.scroll-txt: 300ms cubic-bezier(0.165, 0.84, 0.44, 1) delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translateX(100%)"},{"offset":"1","easing":"linear","transform":"none"}]
- [load@3000] CSSTransition transform on div.scroll-txt-mask: 300ms cubic-bezier(0.165, 0.84, 0.44, 1) delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translateX(-100%)"},{"offset":"1","easing":"linear","transform":"none"}]
- [load@3000] CSSTransition transform on div.scroll-line: 500ms cubic-bezier(0.77, 0, 0.175, 1) delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"translateX(100%)"},{"offset":"1","easing":"linear","transform":"translateX(-80%)"}]

## JS-driven tween clusters (31 tweens → 17 groups; times ms from navigation; phases {"loaded":3902,"hover":11947,"cursorStep":12766,"scroll":13977,"end":25191})
- [load @4342] div#main-loader · opacity 1→0 · 500ms · css ease-in-out (rmse 0.016)
- [load @4851] div · transform.x 49.337→0 · 1500ms · power3.out (rmse 0.001) · ×3, stagger ~131ms
- [load @4851] div · opacity 0→1 · 1500ms · css ease-in-out (rmse 0.007) · ×3, stagger ~131ms
- [load @5245] div.fp-btn-skip · transform.x 49.469→0 · 1500ms · power3.out (rmse 0.001)
- [load @5245] div.fp-btn-skip · opacity 0→1 · 1500ms · css ease-in-out (rmse 0.007)
- [load @5397] div.list-prog.fp-list-prog · opacity 0→1 · 500ms · css ease-in-out (rmse 0.011)
- [hover @11966] div#cursor.show · transform.x 699.348→1100 · 2500ms · power3.inOut (rmse 0.625)
- [scroll @13995] div.page-content.center-wrapper · transform.y -21.6→-1430 · 1550ms · power3.out (rmse 0.062)
- [scroll @14314] div.list-prog-nb · transform.y 49.599→-50 · 200ms · linear (rmse 0.111)
- [scroll @14314] div.list-prog-nb · opacity 0.008→0 · 200ms · power2.in (rmse 71.291)
- [scroll @15863] div.page-content.center-wrapper · transform.y -1451.6→-2950 · 1750ms · power3.out (rmse 0.047) · ×2, stagger ~1868ms
- [scroll @15904] div.list-prog-nb · transform.y 49.583→-50 · 250ms · linear (rmse 0.129) · ×4, stagger ~180ms
- [scroll @15904] div.list-prog-nb · opacity 0.008→0 · 250ms · power2.in (rmse 66.41) · ×5, stagger ~180ms
- [scroll @16252] div.list-prog-nb · transform.y 49.18→-50 · 250ms · power1.out (rmse 0.095)
- [scroll @16369] div.list-prog-nb · transform.y 49.968→0 · 150ms · css ease (rmse 0.045) · ×2, stagger ~1868ms
- [scroll @16369] div.list-prog-nb · opacity 0.001→1 · 150ms · css ease (rmse 0.045) · ×2, stagger ~1868ms
- [scroll @18106] div.list-prog-nb · transform.y 49.997→-50 · 300ms · css ease-out (rmse 0.111)

Raw: forensics/moonsafari/ (forensics.json, source.css, source.js.txt, *.webm video of the run)