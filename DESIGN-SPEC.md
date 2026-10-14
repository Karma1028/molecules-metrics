# Molecules → Metrics — Design Spec v0.1

Tuhin Bhattacharya portfolio. New build, approved 2026-10-12. Scraps tuhin-karma.
Read `D:\porfolio\PORTFOLIO-NOTES.md` for likes/wants/failures + reference synthesis.

## One-line concept
A chemical engineer turned data analyst — the site literally morphs **molecules into data**,
wearing his colourful hand-lettered orange personality, with award-level motion and
live, interactive proof of his work.

## Identity
- **Palette:** paper `#FAF6F0`, ink `#1A1613`, orange `#EA6A2B`, deep orange `#C9471A`,
  data accents teal `#2CA6A4`, violet `#6C5CE7`, dot grey `#C9BFB4`.
- **Type:** serif structure = Fraunces; hand-lettered accent = Caveat (700); mono label = JetBrains Mono.
  (matches live site's brush/hand personality without going comic.)
- **Texture:** faint paper grain; orange is the only saturated hero colour.
- **Motion rule:** everything eases (cubic), nothing linear; respects `prefers-reduced-motion`.

## Pages (restore ALL — live site parity + more)
1. **Hero** — reactive particle field (molecule ⇄ data morph, mouse-repel) + hand-lettered headline. [PROTOTYPE FIRST]
2. **About** — molecules→metrics story arc (from live copy).
3. **Journey** — scroll-pinned timeline (ONGC → Jadavpur → Celebal → GIM).
4. **Skills** — interactive proficiency, filter by domain.
5. **Work** — Bremer pattern: filter chips (BI / ML / Chem / Photo) → cards that open **live mini-dashboards**
   from his REAL numbers (6 projects: SUJAN P&L 54-pg, CLV/insurance RF, Tata quant XGBoost+FinBERT,
   Pure Storage KPI, ONGC H2, portfolio site).
6. **Gallery** — his real photographs (reuse tuhin-karma `/karma` set), day-arc scroll.
7. **Contact** — form (live site has Netlify forms) + socials.

## Reference → feature map
- Hero reactive particles ← Yan Holtz. Canvas2D, NO WebGL.
- Filterable interactive work ← Nadieh Bremer.
- Scroll reveals / pinned / page transitions ← Cappen (motion only).
- Hand signature + playful copy + display-type identity ← jhey.dev + lynnandtonic.
- Generative colour/grain bg ← ilithya.
- Orange + brush + real content ← his live site.

## Build plan (token-aware)
- **Step 1 (now):** standalone `prototype/hero.html` — no deps, instant review. Sign-off gate.
- **Step 2:** scaffold Vite + React + TS app in this folder; port hero as component.
- **Step 3:** mine live-site content into `src/data/*.ts`; build pages 2–7.
- **Step 4:** motion polish + QA every route vs live + screenshots. No "done" claim without QA.

## Constraints
No WebGL/3D. No secrets in repo. No deploy/push without Tuhin's say-so. Tier3 local only.
