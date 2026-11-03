# Round 2: creative direction, anatomy repo, consulting charts, KPIs, GitHub profile (2026-10-30)

Status: IDEATION, nothing built or installed into the site. Builds on `BOLD-PROPOSALS-2026-10-30.md` and `PROLOGUE-IDEATION-2026-10-30.md`.
Skills/tools used this round: `superpowers:brainstorming` (path: architectural, so no build before approval), `21st:21st-ui` (read; see 3), `dataviz` (read; drives section 2), `frontend-design-direction`, `motion-patterns`, plus the `anatomy` repo (section 1) and one Haiku agent (GitHub profile plan, section 5). One agent only.

## 0. The idea that ties everything together: two weaves, two registers
The landing already says "One thread, two weaves." Make that visible in the *drawing language*, not just the colours:
- **Artist weave = painted by hand.** Patachitra panels, kantha thread, paper. (Prologue, Gallery, About, Sound.)
- **Analyst weave = machined.** Isometric working objects, nine-boxes, driver trees on graph paper. (Work, Skills, Scorecard, case files.)
- **The bridge is panel 3 of the prologue:** the hand-painted bar chart of clay towers. When the seal breaks and the visitor enters the Analyst world, those clay towers re-draw as a precision isometric machine. Painted to machined is the "molecules to metrics" move, shown instead of told.

## 1. The anatomy repo (wheresryan22/anatomy)
What it is: an MIT-licensed Agent Skill (22.7k stars, updated today, zero dependencies, Node 20.10+) that has Claude invent a *physical object whose working is the concept* and build it as an interactive isometric SVG, optionally with WebGL shaders, in framework-free JS, standalone HTML, or React/Next components. Examples include a rocket-engine test stand, a ripple tank, an arcade cabinet, a dial indicator. It also prints a figure as an A4 PDF.

What I did: cloned it (shallow) to a scratch folder only, nothing installed, nothing run. I scanned the code: the kit itself (`kit/`, 728 KB) makes no network or shell calls; the only `child_process`/fetch use is in `scripts/` (headless Chrome capture and test drivers, localhost). Total clone is 40 MB, mostly example screenshots, so we would vendor only `kit/` plus a note, not the whole repo.

Why it fits: your site already has an analyst world drawn as an instrument panel on graph paper. Isometric working machines are the natural next level of that, and each one *explains* a case instead of decorating it. Effort per its own sizing: a "Figure" (40-80 parts) is under an hour of agent time; a "Hero" (80-150 parts) is 2-4 hours.

Where to use it (all from your real work; nothing invented):
| Figure | Machine | Real numbers it carries |
|---|---|---|
| CLV project | A sorting mill: customers fall in a hopper, 24 variables are 24 sieves, four value tiers come out | 9,134 customers, 24 variables (from the repo README) |
| InfoLeap verbatim coding | A hopper feeding a bank of 22 bins with a conveyor bypass for what the tool codes automatically | 6,623 verbatims, 22 buckets, 95% hand-coding cut (Résumé page; employer figures need your clearance before reuse on Work) |
| Football analysis | A shot-quality plinko board: shots drop through chance-quality pegs and land in xG bins | Your real StatsBomb-based season file (attribution required) |
| This site | "Anatomy of this site": feeds, the daily bake, Netlify functions and the page as one machine | Real pipeline; shows system thinking to a hiring manager |
| Scorecard | The seven KPIs as a bench of gauges | Same numbers as the cards |
Reuse bonus: the skill prints a figure as an A4 PDF, so every case can have a **one-page download** (consulting habit, case-comp style) that a recruiter can forward.

Risks to decide on:
- On 2026-10-15 you rejected the chem-eng / P&ID drawing language. These figures are *explanatory objects*, not flowsheets, but if they start to look like engineering drawings, stop. Please confirm you are fine with isometric machines.
- Style clash with the rest of the site: keep them to the analyst world only (the two-registers rule above).
- Install: not done. Options: (a) vendor `kit/` into the project and credit MIT; (b) install the skill project-locally (`.claude/skills/anatomy`) so I can generate figures. I need your OK for either.

## 2. The consulting layer (matrices, Mekko, and "KPIs that make sense")
Interpretation to confirm: you said "Gecko charts". I read that as **Mekko (Marimekko)** charts. If you meant Geckoboard-style tiles, say so.

Rules (from the `dataviz` skill): pick the chart by the question; one axis only; fixed-order colours validated by its script (not eyeballed); status colours reserved; every chart has a legend, hover tooltip, a table view and a one-line *action title* (the "so what"), as consultants write them.

| Chart | Question it answers | Real data on hand | Where |
|---|---|---|---|
| **3x3 nine-box (GE-McKinsey style)** | Where do my skills really stand? Y = depth (3 bands from the existing exploring/building/working/strong levels), X = **proof** (none / personal project / client work). The X axis makes it credible, not self-flattering. | Skills.tsx has 39 items with levels; proof column needs your confirmation | Skills |
| **2x2 (finishers vs creators)** | Who does what in the squad? xG vs xA per 90 | `barca_analytics.json` players | Matchday |
| **2x2 (value x churn risk)** | Which customers matter most and are most at risk? | CLV project segments | Work: CLV case |
| **Mekko** | Share of customers (width) vs share of value (height) per segment | CLV project | Work: CLV case |
| **Waterfall / bridge** | What moved points from last season to this? | `barca_last_season.json` vs season file | Matchday |
| **Harvey balls grid** | Per case: Data / Model / Viz / Deploy coverage | Your case ledger | Work |
| **Driver tree (MECE)** | Which question does each KPI answer? | The KPI set below | Scorecard |
Honesty rule: anything self-assessed is labelled "my own call"; employer-internal numbers stay masked until you clear them.

### KPIs that make sense
Today's seven: months of industry data work, products shipped, public code activity, writing published, training consistency (gym), shipped-with-AI-agents commits, availability. Problems: gym and AI-commit counts are not hiring evidence; no number has a comparison or a so-what; the set is a list, not a structure.

Proposed structure (a driver tree, one question at the top: *"Can he deliver analysis inside a real team?"*):
1. **Evidence** (did it): months in industry data work (12 across 2 employers); products shipped (3, plus 1 in write-up); one cleared outcome per case.
2. **Craft** (how well): public commits, last 30 days with a trend line; writing cadence.
3. **Readiness**: availability date; response path.
Move gym, listening and Barça stats to the Artist side where they belong. "AI-assisted commits" only returns if framed as a defined share with a definition and a source.
Every KPI card must show: the question it answers, the definition, the source, a comparison (prior period or target), and one so-what sentence. The existing Result / Detail / Measure flip already gives the definition and source; the comparison and so-what are the missing parts.

## 3. Components and animation sources
- **21st.dev** (via the 21st plugin skill): I read the skill. Its MCP tools are not exposed in this session (it needs an API key from 21st.dev/mcp, then reconnect), so I could not search the catalog. Free tier is 2 component installs a day. Use it for *behaviour* inspiration (number tickers, bento grids, spotlight cards, text reveals), and always re-skin to the site's own tokens and house ease `cubic-bezier(.19,1,.22,1)`. Dropping in default styling is the "looks AI-generated" failure you have called out before.
- **motion-patterns / motion-advanced** for the prologue (scroll reveal, shared element, sticky story).
- **dataviz** for every chart; **diagram-design** for the matrix frames; **frontend-slides** or the anatomy PDF printer for one-pagers.
- Nothing new to install for any of these except the optional 21st key and the anatomy decision.

## 4. The combined plan (ranked)
0. Fix: blank analyst deep links, empty-state feeds (from the first doc).
1. **KPI re-think + nine-box Skills** (no new art, high recruiter value, small).
2. **Prologue, slice 1** (patachitra scroll, seal, existing panels).
3. **Case-file template**: one anatomy figure + one consulting chart + three sourced KPIs + A4 one-pager. Start with CLV (cleanest data).
4. **Bridge moment** (clay towers to machined chart) and the two new panels.
5. Cast layer, "Brief me", Audit lens, "Anatomy of this site".

## 5. GitHub profile README (side project)
Current state: your local draft still has `YOUR-LINKEDIN` and `YOUR-PORTFOLIO-URL` placeholders, relies on `github-readme-stats.vercel.app` (public instance, often rate-limited), and is long (a recruiter scrolls past featured projects, toolbox, stats).
The Haiku agent finished its plan before any build: `docs/github-profile/PLAN.md` in the karma repo (about 6-7 h, 10 steps, 11 open questions in its section 8). Its findings (I confirmed the private-repo point against `gh repo list`; the rest is the agent's reading of the live README and workflow):
- **Already partly dynamic:** the profile repo has `update.yml` running daily with `generate.py` rewriting KPI, heatmap, language and timeline SVGs (last 5 runs green). But `cards.py` is not in the workflow (cards are static) and KPI cards 5-8 are hardcoded.
- **Buries the work:** the live README has no name heading, employer or education; the first screen is a banner and badges.
- **Recruiter-breaking:** the local draft links and pins the PRIVATE `MIS---InfoLeap-X-RoyalEnfield` repo, and War-Portal is private too. Pins must be public repos only.
- **Unverified claims in the live README:** "$3.4M projection", "3 LLM providers wired", a Netlify demo link, and a Stock_App description that differs between sources. These need a source or must go.
- **Plan:** first screen = name, one line, links, 3 sourced proof lines, 4 public repos; everything else under collapsed `<details>`. Repo table regenerated by extending `generate.py` with markers. Drop `github-readme-stats`. Optional fine-grained token only for private counts, labelled "incl. private".
- **Photo:** `me-800w.webp`, circle-cropped to a 400 px PNG, one file (no light/dark variants).
Side-project questions still open for you: portfolio URL, OK to show InfoLeap details, GPA scale, whether to add a PAT, blog feed, CLV demo link, the $3.4M source, target roles, Give Goa visibility, whether to freeze the cards.

## 6. Questions for Tuhin
1. "Gecko" = Mekko? (or Geckoboard tiles)
2. OK to vendor/install the anatomy kit, and are isometric machines acceptable given the earlier P&ID rejection?
3. KPIs: drop gym and AI-commits from the analyst page? Clear any InfoLeap figures for public use?
4. Skills nine-box: for each skill, is the proof none / personal project / client work? (I will draft; you correct.)
5. Which photo for the GitHub profile (candidate: `public/me-800w.webp`)?
6. Want a 21st.dev key connected for component research?
