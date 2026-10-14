# CONTINUATION PROMPT — Tuhin portfolio "Molecules → Metrics"
_Last session: 2026-10-12. Paste the block below into a fresh Antigravity / Claude Code session to resume._

---

## COPY-PASTE THIS INTO THE NEW SESSION

I'm continuing a from-scratch portfolio build for Tuhin Bhattacharya. **Before building anything: (1) read the files below in order, (2) INVOKE your frontend-design skill + a brainstorming/ideation skill + look at inspiration plugins/references — Tuhin has repeatedly, explicitly asked that these be USED critically every build, and the #1 recurring failure is NOT using them. Do not hand-code blind.**

Read FIRST, in order:
1. `D:\porfolio\PORTFOLIO-NOTES.md` — living ledger: likes/dislikes + full hero iteration log + **the v0.6 feedback ledger & FAILURE ANALYSIS (F1–F5) at the bottom**. Authoritative. Update it every round.
2. `D:\porfolio\molecules-metrics\prototype\hero5.html` — current prototype (v0.6, REJECTED — see why below). hero.html/hero2/3/4 are older rejected versions, reference only.
3. Live site to BEAT for content: `D:\porfolio\live-upgrade` (7 real pages, 6 real projects).

### Where we are
- Phase: HERO prototype sign-off, standalone HTML (NO npm yet — token-efficient). Scaffold Vite+React+TS only AFTER hero approved.
- Concept LOCKED and LANDING: warm "Field Notebook" + a **TWO-SIDES SWITCH** — one toggle flips the hero between **THE ARTIST** and **THE ANALYST**. Keep the switch, the eclipse light/dark toggle (sun↔crescent + View-Transitions circular wipe), the warm palette, and the double-exposure photo treatment. These are approved.

### WHY v0.6 WAS REJECTED (newest feedback — this is the real brief now)
v0.5 was rejected for messy/overlapping scatter cards → I over-corrected v0.6 into a rigid 2×2 grid. Tuhin's reaction to v0.6:
1. **Too structured / grid = "looks very AI generated."** The **chaotic/editorial collage was BETTER.** Want crafted controlled chaos + layered depth — NOT a tidy grid. (The real rule: overlap for DEPTH is good; cards COLLIDING with the headline text is the bug. Craft the asymmetry, don't randomize it.)
2. **PHOTO TOO SMALL.** The cards shrink his face. His **portrait/face must be BIG and dominant** — the hero subject, not a small polaroid sitting among cards.
3. **ANALYST content is bogus/hypothetical.** Drop the invented tiles ("featured SUJAN P&L dashboard", "toolkit", "availability"). The analyst side should express his **TRANSFERABLE SKILLS** (chemical-eng → data arc: analytical rigor, process/optimization thinking, statistical modeling, problem decomposition, storytelling) — real framing, not fabricated project cards.
4. **Data must be REAL + LIVE + auto-updating, not fake/static:**
   - **Spotify** — show **last played** (or currently playing), real. NOTE: the Spotify MCP `get_currently_playing` returns `{}` when idle (it did during this session). For "last played" you need Spotify Web API **`/me/player/recently-played`** — wire a tiny `/api/now-playing` backend at the Vite stage that calls that; keep the graceful idle fallback.
   - **Football** — he supports **BARCELONA**. Show real Barça (last result / next fixture), auto-updating. (Free source e.g. football-data.org API, team id 81 = FC Barcelona; or TheSportsDB.)
   - **Latest frame** — a **continuously changing** photo feed (rotate through his gallery webps), not one static shot.
   - **"Right now / mood"** — must change from a **REAL signal** (time-of-day, or Spotify audio features), not a hardcoded JS cycler.
   - Integrations he suggested: Spotify (now/last + playlist analysis), **Pinterest feed, LinkedIn, project links**. Artist side should pull real feeds + link out.

### Hard constraints (from PORTFOLIO-NOTES + CLAUDE.md)
- **USE the installed skills/plugins every build** (frontend-design, ideation/brainstorming, inspiration refs, motion). This is a hard requirement, not optional.
- Canvas2D / SVG / CSS only. NO WebGL/3D.
- Keep colourful hand-lettered orange personality. NOT austere/mono (reaction-chamber was 1/10). NOT rigid/AI-looking grid either.
- Real motion graphics / hypermotion, not fade-only.
- Restore ALL content eventually: About, Journey, Skills, Projects(6), Gallery, Contact.
- Token-efficient. QA every route + compare to live BEFORE claiming done (never repeat the "bogus" failure).
- Serve prototype over http for JS: `cd D:/porfolio/molecules-metrics/prototype && python -m http.server 5195` → http://localhost:5195/hero5.html. (file:// won't run JS.) QA in the browser pane: `navigate` to the http URL (NOT file://), force state via JS (`document.documentElement.dataset.mode/theme`), screenshot artist+analyst × light+dark @1280 & @1366 + mobile @375.
- Palette: --paper #ECE2D0, --ink #241E17, --orange #E4631F (artist accent), --pen #2B4C6F (analyst accent); dark = warm charcoal #1C1813, orange #FF8A4C. Fonts: Fraunces 900 + Caveat + Inter + JetBrains Mono.
- Assets in prototype/: me.jpg (portrait), shot-ridge.webp (one gallery photo). MORE gallery photos live in the live site / obsidian / tuhin-karma public/img/karma/*.webp — copy several in for the rotating frame feed.
- Smart-caveman reply style. No commit/push/deploy without Tuhin's explicit OK. No attribution lines in commits/PRs.
- Ignore the pixeltable@inline `validate_antipatterns.py` hook error on every Write/Edit — file missing, harmless, saves succeed.

### Real content (from live site — use, don't invent)
- Chemical Eng (Jadavpur Univ 2019–23, CGPA 8.32) → Big Data Analytics PGDM, Goa Institute of Management (2025–27). Data Science intern at InfoLeap since March 2026. Based in Goa (IST).
- 6 real projects (for later pages, NOT as hero analyst tiles): SUJAN P&L (Celebal, 54-pg Power BI, 300+ DAX), Strategic Insurance CLV (Random Forest + K-Means), Tata quant (XGBoost + FinBERT), Pure Storage KPI, Digital Portfolio, ONGC Hydrogen (ASPEN).
- Artist: Barcelona fan; shoots photography (own gallery webps); music/Spotify; over-thinker.
- Data gaps still to ask Tuhin: camera/film stock, current song/book, Pinterest + LinkedIn + Spotify profile URLs to link.

### Immediate next step
Invoke frontend-design + brainstorming skills. Rebuild the hero as **crafted editorial chaos with a BIG dominant portrait**, honest transferable-skills analyst side, and **real/live auto-updating artist feeds** (Spotify last-played, Barça fixture, rotating frames, signal-driven mood). Keep the two-sides switch + eclipse toggle + double-exposure. Overlap for depth, never colliding with headline text. QA all 4 states + mobile, show Tuhin for sign-off. THEN scaffold Vite + 7 pages + wire the real `/api` backends.
