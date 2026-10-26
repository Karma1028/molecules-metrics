# Benchmark vs the 40 reference sites (2026-10-25)
Source principles: audit/rea-2026-10-19/SYNTHESIS.md §2. Status judged from code + browser checks this session.

| P | Principle | Status |
|---|---|---|
| P1 | One device carries the page | HAVE: kantha thread + needle on Landing |
| P2 | Craft is the interface | HAVE: Dashboard KPI cards switch Result / Detail / Measure (real DAX + lineage per number) = idea 4 already built; dial self-test on home |
| P3 | Waiting is content | HAVE (added): per-page route loader lines, src/lib/loader-line.ts |
| P4 | Ask for a sense first | HAVE: world choice; Sound opt-in |
| P5 | Change pointer, change medium | HAVE: Pointer component per world |
| P6 | Media is a layer | HAVE: Hostel Radio takeover |
| P7 | Index is the interface | HAVE: Field Notes counts/tabs/pages |
| P8 | Type is the image | HAVE (poster pages) |
| P9 | Restraint | HAVE: gallery lightbox kept quiet |

New this session: sky day/night transition, mascot (one wow, no idle JS), console letter, daily feed.
No structural gaps vs the nine principles. Remaining value: ideas 1 (cross-world echo), 2 (shutter clack), 3 (EXIF scatter). Not measured against any live competitor site; that needs your reference picks.

## Measured (Lighthouse mobile, simulated slow 4G, 2026-10-25)
| Site | Perf | A11y | LCP |
|---|---|---|---|
| rxkstudio.com | 92 | 96 | 2.6 s |
| duhaihang.com | 91 | 74 | 2.5 s |
| kashyaprayas.com | 78 | 86 | 3.9 s |
| **ours /artist (after panel shrink)** | **74** | **100** | **5.9 s** (was 7.5 s, perf 65 at first run) |
| moonsafari.archi | 58 | 82 | 8.5 s |
| yauch.oscilloscope.net | 58 | 65 | 10.2 s |
| localstudio.fr | 29 | 92 | 20.6 s |
Verdict: best accessibility of the set, mid-pack speed. Gap to the fast three is LCP (JS route chain + image weight).

## Re-run, like for like (2026-10-26)

Same machine, same session, same command (Lighthouse mobile, performance + accessibility), ours served from the production build (`vite preview`), the others live. Supersedes the 82 above, which was measured under different conditions.

| Site | Perf | A11y | Largest paint |
|---|---|---|---|
| **ours /artist** | **95** | **100** | 3.0 s |
| duhaihang.com | 95 | 74 | 2.2 s |
| rxkstudio.com | 86 | 96 | 2.8 s |
| kashyaprayas.com | 84 | 86 | 3.5 s |
| huyml.com | 69 | 92 | 1.9 s |
| moonsafari.archi | 38 | 82 | 9.7 s |
| monogrid.com | 34 | 89 | 10.3 s |
| jameschugh.com | 31 | 95 | 15.5 s |

Read: tied first on performance score, first on accessibility, fourth on largest paint (huyml 1.9 s, duhaihang 2.2 s, rxkstudio 2.8 s are quicker). Not re-run: yauch, lusion, localstudio, bruno-simon, onedayinmyworld (slow or unscoreable earlier). Lighthouse scores swing a few points between runs; treat gaps under 5 as ties.

This benchmarks speed and accessibility only. "Most creative" has no instrument.
