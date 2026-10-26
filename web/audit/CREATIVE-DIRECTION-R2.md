# Creative Direction, Round 2 (2026-10-15)

Inputs:
- `REFS-ROUND2.md`: 12 new references, of which 9 were verified live.
- `COMPANION-OPTIONS.md`: 8 companion concepts plus a risk check.
- `DASHBOARD-KPIS.md`: a source inventory.
- Tuhin's answers:
  - no chemical-engineering drawing language;
  - Dashboard = critical KPIs only;
  - companion ideas should include a chibi Messi;
  - sound off by default.

This round I judged every agent output critically rather than passing it through.

## 1. The spine: tell the story he already has

The chem-eng drawing language is out. The real through-line is already written on the Matchday page, in his own words: **he watched Messi, started counting, and became an analyst.** That one sentence connects both worlds better than any metaphor I invented:

- Artist world = **what he watched and felt**: photos, music, terraces, Bankura → Goa.
- Analyst world = **what he counted**: the data, the models, the work.
- The bridge between them = the moment watching turned into counting.

Every big idea below serves this sentence. Ideas that don't serve it get cut.

## 2. Companion: chibi Tuhin in a No.10 shirt (not a chibi Messi)

**Critical call:** a recognisable Messi caricature is high risk. His likeness is commercially licensed, and the Barça crest and kit are trademarks. Image generators also tend to refuse real-celebrity likenesses, so it may not even be producible. Low-risk versions keep the *feeling* without depicting him.

**Recommendation: one companion, Tuhin himself as a chibi, wearing a plain blaugrana No.10 shirt with no crest.** It is the fan, not the star, and that IS the story (§1).

- Props by page:
  - camera on Gallery;
  - headphones on Sound;
  - scarf on Matchday;
  - notebook on Notes;
  - laptop on analyst pages.
- Behaviour:
  - sleeps when it is night in Goa;
  - celebrates if Barça scores live;
  - trots in on page change;
  - looks at the cursor when idle.
- Optional sidekick: the terracotta Bankura horse as a small toy he carries on About and Journey. It is one asset and ties in heritage.
- Tech: Flow sprite sheet built from his real photo (the cut-out approval already covers `me-1600w.webp`), animated with CSS `steps()` and motion/react. No Rive, because its WASM runtime costs about 261 kB.
- Budget: 1 idle loop. It stays inside the ≤8-loop rule.

## 3. Matchday's big swing: a Messi data portrait from StatsBomb Open Data

The references agent's #4 (WC26 Data Portraits: matches rebuilt from event data) is the right instinct, but the data source it cited (FotMob/Opta) is licensed. **StatsBomb Open Data is free for non-commercial use with attribution, and includes Messi's La Liga career event data.** Tuhin's own Work entry already uses StatsBomb.

- A one-screen **pitch canvas**: every Messi shot or assist from a chosen season, drawn as dots and arcs.
- A season slider steps through the years (wheel or drag).
- A counter shows the running tally.
- The same pitch has two readings:
  - artist world: a chalk sketch;
  - analyst world: an xG-coloured plot.
- This is the bridge page: watching (artist) and counting (analyst) on one canvas. It honours Messi legally, through data, not likeness.
- Cost: L. Pre-bake one JSON per season at build time (~200 kB) and lazy-load it.

## 4. Dashboard: make the page itself the proof

**Critical note on the agent's KPI set:** it restates the CV (programme, latest role, CGPA), which duplicates the Résumé page. It also puts CGPA 5.23 as a headline tile, which works against him. **I reject that set.**

Reframe: **the Dashboard is a work sample.** Tuhin builds BI dashboards for a living (Power BI, 300+ DAX measures at Celebal), so this page should demonstrate dashboard craft on his own honest data:

- **max 5 tiles**;
- each tile has a **definition tooltip**, a **source/lineage footnote** and a **"last refreshed" stamp**;
- a filter or drill interaction, because that is what a BI person is judged on.

| # | KPI | Source | Status |
|---|---|---|---|
| 1 | Months of industry data work | Résumé EXP dates (12) | Ready |
| 2 | Products shipped vs in write-up | Work.tsx ENTRIES status (2 · 1) | Ready |
| 3 | Public code activity, last 90 days | `/api/github` contributions | Needs the static-build fallback (bake at build) |
| 4 | Writing published | `/api/medium` count + latest title | Needs the same bake |
| 5 | Availability + next step | Contact STATUS ("2027 full-time · open now") | Reuse; ask to confirm |

Cut from the Dashboard:
- the system clock with unsourced coordinates;
- now-playing (it lives on Sound);
- the Barça table (it lives on Matchday).

Spotify lifetime can stay only as a **drill-through example**, labelled as a demo of the craft, not as a KPI.

## 5. Per-page signatures (references mapped, critiqued)

| Page | Steal | From | Critical note |
|---|---|---|---|
| Gallery | Horizontal print strip, drag/wheel locked to one screen | ddanga.com | Replaces the flat grid feel. Keep the existing lightbox |
| Journey | Year rail stepping through time, one card per era | theimmortals.world | Better than the plain map: the map becomes a backdrop and the rail becomes the controller |
| Matchday | Live next-match countdown as a hero, plus the §3 data portrait | williamsgptech.com + StatsBomb | We already have a countdown, so make it giant (poster scale) |
| Contact (both) | "Copied" toast with personality | inherited.band | Small. Analyst Contact already has copy; add it to artist Contact |
| Sound | Real radio object | madebyhart (round 1) | Still the best fit; Hostel Radio exists |

Weak spots in the agent's research: no live darkroom, clothesline or companion references were found, and motion timings were not observed (text-only fetch). Before building each signature, a Haiku agent should screen-record or shot-sheet the reference to confirm the motion.

## 6. Honesty conflict (needs Tuhin)

- `Resume.tsx:29` shows InfoLeap internal figures (4,010 respondents and others).
- `Work.tsx:84` says employer-internal figures stay out until they are cleared.
- The two pages contradict each other. Either the PDF figures are cleared (then update the Work note) or they are not (then remove them from Résumé).

## 7. Plugins and skills for the build

- **Enabled now:** Design (design-critique), motion-foundations / patterns / advanced, frontend-design-direction, browser-qa.
- **Offered, pending your install:** audit-suite (emil-design-engineering, web-animation-design, make-interfaces-feel-better), frontend-design.
- **Use:** a design-critique pass on each finished page's contact sheet, run by a Haiku agent.

## 8. Build order (biggest jump first)

1. Bugs: Matchday 375 overlap, Dashboard mobile lede. S. Sonnet/Haiku.
2. Dashboard as work sample (§4). M. Opus.
3. Companion sprite: generate in Flow (Haiku), wire it (Opus). M. *Blocked* until the Chrome extension or Flow is back.
4. Matchday Messi data portrait (§3). L. Opus; Haiku bakes the data.
5. Gallery strip, Journey rail, Sound radio. M each. Opus.
6. Wave C molecule→chart morph. It now uses the pitch dots: a **ball → chart** morph on the world switch. Revisit after #4.
