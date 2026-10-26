# exat — https://exat.hottype.co/
- libs (bundle regex): gsap, ScrollTrigger, SplitText, Lenis · JS 244 KB · CSS 77 KB · style mutations 36622
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: none
- audio/media: VIDEO 3fb9e8e0a66f4cb78b4e2a49e190e1d51f2f6105ad9a24a19b31faa8c37c946&user_id=46651466 | VIDEO 8f30f2a7db0e6728606d0b1b23036388eb21a3378a8432dccd0dfc4740fe80d&user_id=46651466 | VIDEO 89b7c261653f694a898fb9de44372dd888c6af0414701fda70ed7840124af57&user_id=46651466
- GSAP global calls: 150; first: fromTo(img.media) [{"clipPath":"polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)"},{"clipPath":"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)","ease":"none","paused":true,"scrollTrigger":{"trigger":"media-frame","start":"top 50%","end":"bottom 50%","scrub":true,"pin":false}}] ; set(div.inner) [{"width":"20%"}] ; set(div.inner) [{"width":"20%"}] ; set(div.inner) [{"width":"20%"}] ; set(div.inner) [{"width":"20%"}] ; set(div.inner) [{"width":"20%"}]
- CSS easings: cubic-bezier(0.84, 0.01, 0.18, 1)×1
- CSS durations: 200ms×16, 300ms×5, 150ms×3, 1s×2, 500ms×2, 800ms×1, 0ms×1, 100ms×1
- CSS keyframes (4): fadeInOut {0%,40%{opacity:1}60%,100%{opacity:0}} | ss-valueIn {0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}} | ss-valueOut {0%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}} | splide-loading {0%{transform:rotate(0)}to{transform:rotate(1turn)}}
- CSS features: mix-blend-mode×1, perspective×2
- top transitions: transform 200ms ease×7 | opacity 300ms ease×3 | opacity 150ms ease×3 | opacity 200ms ease,transform 200ms ease×2 | var(--ss-animation-timing)×2

## Running CSS/WAAPI animations (2 unique)
- [load@600] CSSAnimation zoom-start on div.svgs: 15000ms linear delay 0 iter 1 kf [{"offset":"0","easing":"linear","transform":"scale(0.65)"},{"offset":"1","easing":"linear","transform":"scale(1)"}]
- [load@3000] CSSTransition transform on path: 800ms cubic-bezier(0.84, 0.01, 0.18, 1) delay 300 iter 1 kf [{"offset":"0","easing":"linear","transform":"translateY(100%)"},{"offset":"1","easing":"linear","transform":"translateY(0%)"}]

## JS-driven tween clusters (171 tweens → 21 groups; times ms from navigation; phases {"loaded":2969,"hover":11039,"cursorStep":20336,"scroll":21543,"end":32934})
- [load @3533] div.playground-title · --fnt 31.398→42 · 300ms · power2.out (rmse 0.002)
- [load @3533] div.playground-title · --x -0.09→-0.12 · 300ms · power2.out (rmse 0.003)
- [hover @11071] span.hover-line · transform.s 0.947→0.999 · 300ms · power1.out (rmse 0.023) · ×2, stagger ~8457ms
- [scroll @21703] div.split-words · transform.y -244.855→0 · 1000ms · expo.out (rmse 0.001) · ×91, stagger ~13ms
- [scroll @25618] img.rotator · transform.r 5.941→141.428 · 2100ms · circ-out(.075,.82,.165,1) (rmse 0.121)
- [scroll @25618] img.rotator · transform.r 5.331→147.591 · 2100ms · expo.out (rmse 0.118)
- [scroll @25618] img.rotator · transform.r 1.639→154.762 · 2100ms · power4.out (rmse 0.08) · ×5, stagger ~0ms
- [scroll @25618] img.rotator · transform.r 5.142→136.288 · 2100ms · power3.out (rmse 0.148) · ×2, stagger ~0ms
- [scroll @25618] img.rotator · transform.r 3.635→150.41 · 2100ms · power2.out (rmse 0.13) · ×6, stagger ~0ms
- [scroll @25618] img.rotator · transform.r 3.831→136.354 · 2100ms · power1.out (rmse 0.16) · ×3, stagger ~0ms
- [scroll @25618] img.rotator · transform.r 2.075→128.22 · 2100ms · css ease-out (rmse 0.141) · ×5, stagger ~0ms
- [scroll @25618] img.rotator · transform.r -0.186→-177.485 · 2100ms · css ease (rmse 0.096)
- [scroll @25618] img.rotator · transform.r 2.25→124.757 · 2100ms · linear (rmse 0.166) · ×5, stagger ~0ms
- [scroll @25618] img.rotator · transform.r 0.7→135.008 · 2100ms · power2.in (rmse 0.163) · ×6, stagger ~0ms
- [scroll @27653] div.number · transform.y 49.016→35.94 · 1900ms · quart-out(.19,1,.22,1) (rmse 6.761) · ×3, stagger ~0ms
- [scroll @27653] div.number · transform.y -35.432→-48.71 · 1900ms · power2.in (rmse 4.67) · ×3, stagger ~0ms
- [scroll @27653] div.number · transform.y 13.159→32.379 · 1900ms · expo.inOut (rmse 1.461) · ×2, stagger ~0ms
- [scroll @27653] div.number · transform.y 26.368→6.155 · 1900ms · power4.out (rmse 2.367) · ×2, stagger ~0ms
- [scroll @27799] div.eye.rotator · transform.r -1.279→-159.314 · 1800ms · power2.in (rmse 0.156) · ×25, stagger ~0ms
- [scroll @31807] div.inner · widthPct 19.816→15 · 700ms · power3.out (rmse 0.015) · ×5, stagger ~0ms
- [scroll @31807] svg · transform.x -0.92→-25 · 750ms · power3.out (rmse 0.002)

## Notable assets
- video https://player.vimeo.com/progressive_redirect/playback/1061980643/rendition/720p/file.mp4 0KB
- video https://player.vimeo.com/progressive_redirect/playback/1062353089/rendition/1080p/file.mp4 0KB
- video https://player.vimeo.com/progressive_redirect/playback/1064458237/rendition/1080p/file.mp4 0KB
- video https://player.vimeo.com/progressive_redirect/playback/1061980881/rendition/1080p/file.mp4 0KB
- video https://player.vimeo.com/progressive_redirect/playback/1061981035/rendition/1440p/file.mp4 0KB
- video https://player.vimeo.com/progressive_redirect/playback/1061980985/rendition/1440p/file.mp4 0KB
- video https://player.vimeo.com/progressive_redirect/playback/1061981013/rendition/1440p/file.mp4 0KB
- video https://player.vimeo.com/progressive_redirect/playback/1062704604/rendition/1440p/file.mp4 0KB
- video https://player.vimeo.com/progressive_redirect/playback/1064287085/rendition/1440p/file.mp4 0KB

Raw: forensics/exat/ (forensics.json, source.css, source.js.txt, *.webm video of the run)