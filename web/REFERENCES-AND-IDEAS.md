# References and ideas (2026-10-25)

Pushed to GitHub: branch `r4-calm-pass`, commit `e166c43`.

## 1. How we measure up (Lighthouse mobile, simulated slow 4G)

| Site | Perf | A11y | Largest paint |
|---|---|---|---|
| rxkstudio.com | 92 | 96 | 2.6 s |
| duhaihang.com | 91 | 74 | 2.5 s |
| **ours /artist** | **82** | **100** | **4.8 s** |
| kashyaprayas.com | 78 | 86 | 3.9 s |
| huyml.com | 65 | 92 | 2.9 s |
| moonsafari.archi | 58 | 82 | 8.5 s |
| yauch.oscilloscope.net | 58 | 65 | 10.2 s |
| jameschugh.com | 55 | 95 | 14.3 s |
| monogrid.com | 44 | 89 | 10.4 s |
| lusion.co | 40 | 85 | 15.5 s |
| localstudio.fr | 29 | 92 | 20.6 s |
| bruno-simon.com | 26 | 74 | 34.0 s |

(onedayinmyworld.com failed to score.)

Read: best accessibility of the 12. Speed is 3rd. The famous 3D showpieces (Bruno Simon, Lusion) are very slow, so we do not need 3D to win. Gap to the fastest two: about 2 s of largest paint.

## 2. Where to look for inspiration (found online)

- [Awwwards: Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/): recent winners, updated daily.
- [Awwwards: portfolio winners](https://www.awwwards.com/websites/winner_category_portfolio/) and [photography portfolio nominees](https://www.awwwards.com/inspiration_search/Photography%20portfolio/).
- [Awwwards nominee: Four-Chapter Portfolio](https://www.awwwards.com/sites/four-chapter-portfolio): chapter-by-chapter storytelling, tagged scrolling and storytelling.
- [Muzli: 100 best designer portfolios of 2026](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/): motion, storytelling and bold type.
- [Elementor: best developer portfolios](https://elementor.com/blog/best-web-developer-portfolio-examples/): Bruno Simon (drive a jeep through a 3D world) leads the list.
- [DesignRush: photography portfolios 2026](https://www.designrush.com/best-designs/websites/trends/best-photography-portfolio-websites) and [Hostinger: 25 portfolio examples](https://www.hostinger.com/tutorials/portfolio-website-examples/): Benjamin Von Wong presents projects as stories with measurable impact.

Takeaways that fit this site:
1. Chapters beat one long page. Our one-screen pages with paging already match this.
2. Playful but fast wins. Bruno Simon proves delight sticks; his 34 s load shows the cost. Keep our one-wow-per-page rule.
3. Stories with proof. Photographers that attach a result to each project stand out. Our Dashboard "Measure" view does this for the analyst side.

## 3. Your ideas: status

Full list: `IDEAS-2026-10-25.md` (25 ideas). Numbers below match that file.

**Built and live**
- #1 Contact sheet to scatter plot: the "count them" button on the gallery.
- #4 Cross-world echo: Analyst home says what you last watched in the gallery.
- #10 Real-shutter clack: the lightbox already had it.
- #17 Show the query: Dashboard cards flip to the real DAX formula.
- #21 Console letter: ASCII horse in DevTools.

**Not built yet (best next, by wow per effort)**
- #3 Kantha path: a thread in the margin gains one stitch per page you open, finishing into a route signature on Contact. Stays on the device. Effort M.
- #15 Honest feed horse: the horse shows whether the live feeds are really working. Effort S to M.
- #2 Through-ball navigation: flick the orange ball on the Analyst home; a dashed pass line predicts which row it opens. Effort M.
- #8 Live Match State, #11 Sonified scorecard, #12 Goa weather radio, #13 Chord of the visit: sound and data ideas, all real feeds.
- #24 Pressed-leaf daily papers: the daily papers as pressed leaves.

**Skip for now (clash with "no invented facts")**
#5 Listening Alpona, #7 golden-hour dial, #19 JD lens, #20 build ledger.

## 4. Still open
- Netlify: connect the repo in Netlify (base dir `web` is already in the root `netlify.toml`). Other `/api` endpoints use baked fallbacks.
- Speed: the 374 KB main script. Shrinking it means moving 41 files off the full motion library.
- Daily feed: runs 06:00 IST via GitHub Actions once the push lands; check the Actions tab.
