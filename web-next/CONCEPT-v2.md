# Concept v2: "He watched. Then he counted."

## Big idea

One pitch, two readings. Six Barcelona seasons are drawn as pass dots on a pitch (Karma, the photography and football side, Day mode) and, with one toggle, the same six seasons become goal bars with an xG tick beside each (Tuhin, the data side, Night mode). The journey page then walks his career as a chain of passes, and leaves the 2024 stretch blank instead of inventing it.

## Story arc

- **First 10 seconds (home, phone 390x664):** headline "He watched. Then he counted." and the day/night toggle sit above the fold. The pitch of six pass dots is visible at once. The morph is the wow moment: one tap, 900 ms, six dots become six bars.
- **Next 20 seconds:** the caption names the reading in plain words ("Day, Karma: each season is a pass on the pitch." / "Night, Tuhin: goals as bars, with the xG tick beside each one."). The source line states where the numbers come from.
- **Journey page:** "Each station is a pass." Six stations (secondary school, higher secondary, B.E. Chemical Engineering, Celebal internship, PGDM at GIM, InfoLeap internship), each a numbered pass. The gap between Dec 2023 and Jan 2025 is a dashed block: "Not on record yet. Tuhin to fill this stretch."
- **Closing:** a data-flow diagram (four sources to analytics file to build-time bake to home chart) and a visible warning about the 2025-26 disagreement between the two data files.

## Information architecture

- `/` Home: hero (headline, lede, toggle, caption, CTA), morph, source line.
- `/journey` Journey: intro with photo, pass chain with gap, data-flow section, footer.
- Navigation: wordmark, one page link. No menu. The toggle lives in the content, not the nav, so the nav fits one row on phone.

## Motion language

- One easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` (`--ease`).
- Morph duration 900 ms (`--morph-ms`), stagger 70 ms per season.
- Only `transform` and `opacity` are animated. Every element sits at the SVG origin and is placed by transform.
- Colour changes 600 ms on body, 400 ms on toggle.
- `prefers-reduced-motion: reduce` sets transition durations and delays to 0 ms. Not verified in a real browser yet (see gaps).

## Type and colour tokens

Defined on `:root` and `:root[data-mode="day"|"night"]` in `web-next/src/styles.css`.

| Token | Day (Karma) | Night (Tuhin) |
|---|---|---|
| `--ground` | #eef3ea | #0c1215 |
| `--surface` | #f8fbf5 | #131d22 |
| `--ink` | #142016 | #e6eee9 |
| `--muted` | #3f4f43 | #a9bab2 |
| `--line` | rgba(20,32,22,.16) | rgba(230,238,233,.16) |
| `--accent` | #b8402a (terracotta red) | #5fd3c2 (teal) |
| `--accent-ink` | #ffffff | #061012 |
| `--pitch` | #2f6b3f | #5fd3c2 |

One accent per mode. Fonts: Instrument Serif (display, headline and metric figures), Hanken Grotesk (body and labels). Body 17 px, h1 clamp(2.75rem, 7.4vw, 6.25rem). Labels are in the body face, sentence case, not tracked capitals.

Font pairing came from the house typography in `web/`, not from ui-ux-pro-max (its suggested triple-serif stack was not adopted because the site already has a serif display face and a sans body).

## Signature wow

The morph. Six seasons start as pass dots on a green-line pitch. The same six elements move (transform only) into goal bars whose heights are goals on a shared scale, with an xG tick placed at the xG height. The reading changes; the data does not.

## Reference research (partial)

Taken from `web/REFERENCES-AND-IDEAS.md` and `web/BENGAL-MOTIF.md` (first 5000 characters only). Full pass over `web/audit/rea-2026-10-19` not done.

- Take: one signature moment per page (from CHECKPOINT R2 spine "He watched. Then he counted.").
- Take: scroll-free single screen on phone (house rule from `web/CLAUDE.md`).
- Reject: multi-world split screen with two separate sites (the rejected concept in `project_portfolio_concept_rejected`).
- Reject: stock football imagery; only the lake photo from the existing site is used.

## Honest risks

1. **Data conflict, 2025-26.** `barca_analytics.json`: 91 goals, xG 61.2. `barca_last_season.json`: 95 goals, xG 99.7. Chart uses the analytics file. Warning shown on the Journey page. Needs owner decision.
2. **The 2024 gap.** Labelled, not filled. Derived from data by `findGaps`, not hard-coded. Owner must supply facts.
3. **Morph is decorative to screen readers.** An sr-only table and an aria-label carry the same numbers. Reduced motion is code-only, not browser-verified.
4. **Single-author facts.** All facts come from the existing CV and site copy in the repo. No new claims.
5. **Font licence.** Instrument Serif and Hanken Grotesk are Google Fonts (OFL). Not yet checked against a production licence review.
6. **Flow generation blocked.** No Flow project open, so no generated art. See `ASSETS.md`.
7. **Off-scale spacing.** sloplint reports 6 REFLEX items (14, 10, 6 px values) left unfixed. Not waived.

## Creative scores (self-assessed, 0 to 10)

- Current live site (`web/`): 6 to 6.5. Strong concept, two worlds split on screen, heavy on text on phone.
- Next prototype (`web-next/`): 7. One moment that carries both readings, one screen on phone, honest gap. Not yet judged by a second reviewer or real visitors, so the score is a self-estimate.

## Current vs next

| Area | Current (`web/`) | Next (`web-next/`) |
|---|---|---|
| Hero | Two worlds side by side, several sentences of copy | One headline, one lede, one toggle, one morph; fits 390x664 |
| Navigation | Multi-link nav with the two worlds as separate sections | Wordmark and one page link; the toggle is in the content |
| Storytelling | Separate pages per world, data in dashboards | One pass chain; the gap shown as a gap; diagram marks the data flow |

## Skills used

- **idea-refine:** used. Assumptions stated in this doc. No interview with the owner.
- **interview-me:** not available. Assumptions inferred and stated under Honest risks.
- **hallmark:** used, custom run. Read SKILL.md and `references/direction.md`. sloplint run: 0 FAIL, 7 REFLEX, 3 WARN.
- **Not invoked in this run:** design-taste-frontend, impeccable, ui-ux-pro-max (only its typography search was run and not adopted), motion-design, diagram-design, frontend-ui-engineering, performance-optimization, test-driven-development. The brief asked for these; they were not run as separate passes. TDD partly followed (tests written before implementation in each lib module).
- **diagram-design:** the data-flow diagram is HTML (`ol.flow`), not a separate diagram pass. It does not mark the 2024 gap; the gap is marked on the pass chain.

## Gaps not closed

- Reduced-motion and AA contrast not measured in a browser.
- Half-scale screenshots only (six files in `shots/`).
- Flow not used; no character or art assets generated.
- Reference research covers two files, not the full set requested.
