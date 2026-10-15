# REFS-DASHBOARD-R3: creative "person in numbers" references

Goal: replace template Scorecard (5 KPI tiles + drill panel) with one-screen, no-scroll, 375px layout that is creative but keeps BI craft (definition, lineage, honest data).

Status key: LOADED = URL fetched and confirmed. SEARCH-ONLY = found in search, not opened.

## References

1. Feltron Annual Reports - https://feltron.com - LOADED (nav only; annual reports 2005-2014 listed; Reporter app used for 2012 edition)
   Format: self-tracked annual data book, dense categorical spreads.
   Mechanic to steal: sample-based self-reporting (Reporter pinged at random intervals). Every number carries how it was collected.
   KPI map: each KPI as a ledger row with a "collected via" caption (survey, app, manual log).

2. Dear Data (Lupi + Posavec) - https://www.stefanieposavec.com/projects/dear-data - LOADED
   Format: one hand-drawn postcard per week, one theme per week, 104 postcards (MoMA collection).
   Mechanic to steal: a weekly theme with a key printed on the card, so the mark system is explained on the object itself.
   KPI map: five cards, each a week-theme for one KPI, legend strip on each card.

3. Spotify Wrapped story cards - https://newsroom.spotify.com - LOADED (Wrapped listed in topics; card specs not opened; analysis from search: one stat per card, tap-through, one share step)
   Format: vertical tap-through story cards, one stat per card, bold type, year-specific identity.
   Mechanic to steal: one stat per card with a single hero number and a share/export end state.
   KPI map: a stack of KPI cards with a tap-to-advance, final card = whole-person summary.

4. The Pudding - "mowing experiment" - https://pudding.cool/2026/06/mow - LOADED
   Format: visual essay with interactive playground.
   Section "Data and Methods" defines metrics (pace = seconds per required square, not per square mowed).
   Mechanic to steal: user drives the metric live (arrow keys move a counter) so the calculation is felt, not read.
   KPI map: a tap on any KPI opens a mini playground showing its formula with the user's own input.

5. The Pudding - "ethical champions" - https://pudding.cool/2026/06/ethical-champions - LOADED
   Format: NBA visual essay with "Data and Methods" appendix naming sources (darko.app, basketball-reference.com).
   Mechanic to steal: named source per chart. Weak as calc explainer (no interactive calc shown).
   KPI map: a lineage footer per KPI naming its source system.

6. Visual Cinnamon (Nadieh Bremer) - https://www.visualcinnamon.com - LOADED (home lists portfolio items; sub-pages linked, not all opened)
   Format: data-art portfolio, bespoke visuals per dataset (e.g. "Elemental Flows", "Searching for Birds" at /portfolio/searching-for-birds/).
   Mechanic to steal: the number becomes a unique generated glyph; the form is the data.
   KPI map: each KPI rendered as a bespoke glyph, value readable as a label beside it.

7. Shirley Wu studio - https://shirleywu.studio/ - LOADED ("coming soon"; past work at https://sxywu.github.io/ not opened)
   Format: data-experience studio. Thin on about-page content; low priority.
   Mechanic: none verified. Keep as craft reference only.

8. Baseball Savant player card - https://baseballsavant.mlb.com/savant-player/aaron-judge-592450 - LOADED
   Format: stat card with season table and percentile rankings section. Tabular, not tiles. Tooltip presence not confirmed.
   Mechanic to steal: every stat is a rank against a peer group, not a raw number.
   KPI map: each KPI shows a percentile or benchmark bar, but only with a sourced benchmark (no invented comparisons).

9. Nadieh Bremer - Adyen Shareholder Report 2019 - https://www.visualcinnamon.com/portfolio/adyen-report-2019/ - SEARCH-ONLY (linked from her home page)
   Format: annual report rendered as data art.
   Mechanic: a corporate annual report reframed as a visual document, same as Feltron but for a company.

10. Federica Fragapane - "Space Junk" (MoMA) - https://www.moma.org/collection/works/447620 - SEARCH-ONLY
    Format: info-viz with lines for distance and colored circles for object type. Her personal site did not resolve (DNS failure, not verified).
    Mechanic: encoding legend is part of the composition; reader decodes the mark.

Not found, skipped (no verified source): trading card / boarding pass / lab report / receipt formats. Academic work exists on situated self-tracking displays (Bressa, Vermeulen, Willett: 30 apps over 10 months), not opened.

## Top 3 concept pitches (ranked)

1. Receipt of the Self (Ledger + Playground). One screen styled as a receipt: 5 line items = 5 KPIs, value right-aligned, definition as footnote, lineage as a source line under each item. Tap an item to open a mini playground (Pudding mow pattern) showing its formula with the owner's own inputs.
   Risk: receipt metaphor can read as gimmick and clash with the "boring" complaint; a receipt implies transactions, which may feel off-brand for a person.

2. Wrapped Deck with Flip-Card Backs. Five trading-card faces on one screen in a fan or 2x3 grid, each with one hero number and a percentile bar vs a sourced benchmark. Flip reveals Data and Methods (definition, lineage, sample size).
   Risk: flip and tap-through hide information behind interaction, and a 375px fan may crowd tap targets; the one-screen rule means all 5 must be visible at rest.

3. Week-One Postcards (Dear Data grid). Five postcard tiles, each a bespoke mark for one KPI with a printed key on the card, plus a legend strip. Marks give personality; the key keeps it honest.
   Risk: custom marks are hard to read at 375px and non-linear encodings weaken BI honesty; mitigate by printing the true value on every card.

No em-dashes in this file.
