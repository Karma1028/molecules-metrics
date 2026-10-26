# zaft — https://wisetype.nl/collections/wt-zaft-2
- libs (bundle regex): none · JS 381 KB · CSS 97 KB · style mutations 93
- smooth scroll: native (no lerp detected on window scroll)
- canvas contexts: none
- CSS easings: cubic-bezier(0.30, 1, 0.15, 1)×4, cubic-bezier(0.80, 0, 0.20, 1)×1, cubic-bezier(0.70, 0, 0.30, 1)×1
- CSS durations: 200ms×3, 300ms×1, 1s×1, 50ms×1
- CSS keyframes (4): bounce { 0%{ transform: translateY(0); } 50%{ transform: translateY(-3px); }} | fades { 0%{ opacity: 0%; } 100%{ opacity: 100%; }} | fade-in { 0%{ opacity: 0; } 100%{ opacity: 1; }} | fade-out { 0%{ opacity: 1; } 100%{ opacity: 0; }}
- CSS features: mix-blend-mode×1, clip-path×1, mask×10, backdrop-filter×4
- top transitions: transform var(--timing) var(--easing)×4 | opacity var(--timing) var(--easing)×3 | opacity var(--timing) var(--easing),
		transform var(--timing) var(--easing)×1 | opacity var(--timing) linear×1 | opacity 200ms var(--easing),
		transform 200ms var(--easing)×1

## JS-driven tween clusters (1 tweens → 1 groups; times ms from navigation; phases {"loaded":3675,"hover":11741,"cursorStep":13442,"scroll":14652,"end":25589})
- [load @4276] div#loader · opacity 1→0 · 600ms · sine.inOut (rmse 0.002)

## Notable assets


Raw: forensics/zaft/ (forensics.json, source.css, source.js.txt, *.webm video of the run)