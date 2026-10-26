# REFS ROUND 2 - Tuhin portfolio (Artist + Analyst worlds)

Scope: new refs only. Excluded (already used): jameschugh.com, huyml.co, davidwhyte.com, kodeimmersive.com, dejiajetomobi.com, meermohsin.me, senbuzy.com, quangdinh.im, madebyhart.com.

Verification key:
- LOADS = WebFetch returned rendered page content (text capture only; motion/timing NOT seen).
- TECH-INFERRED = technique taken from Awwwards tags or page text, not observed. Open the live site and confirm before building.
- HELD = URL failed (DNS / 403 / reset / 404). Not counted.

Timing figures are estimates. Confirm in browser.

Build cost: S = under 1 day, M = 2-4 days, L = week+.

Honesty note: round-1 style search returned mostly Awwwards listing pages. Few 2025 personal portfolios with a recurring character surfaced. Items below are the best verified-live set found, not a full 2024-26 SOTD sweep.

---

## Card 1. Williams GP Tech (motorsport team, Awwwards Honorable Mention listed Jul 31 2026)
- URL: https://www.williamsgptech.com/
- Category: Sport / race-day site. Verification: LOADS.
- THE technique: Single long scroll. Hero uses depth-map grayscale images with a "Skip 1/6" intro. Live "Next race" countdown (days:hours:minutes:seconds). Tags say "Drag" and "Sound on" video. Motion details: TECH-INFERRED. Countdown trigger: on load, ticks each second.
- Why it fits: Match-day countdown is the core of a Matchday page. Race calendar block maps to fixtures list.
- Maps to: Matchday (countdown, fixtures). Possibly Home for the Artist world.
- Build cost: M (countdown + fixture list is S; depth-map hero is M).
- Caution: copy on page has a stray calendar ordering bug. Do not copy text, only the structure.

## Card 2. Nick Ho Motorsports (Awwwards Site of the Day listed Oct 11 2026)
- URL: https://nickho-motorsports.nl/
- Category: Sport / driver personal site. Verification: LOADS (copy has an unfilled "{{year}}" placeholder; the site is live but unfinished).
- THE technique: Hero with rotating background media and pause/play control. Sector and tab cards with "Select tab" and "Next" controls. Milestone timeline (The Foundation, First Victories...). Hero: "98" car number, 17 podiums stat block. Motion and timing: TECH-INFERRED (carousel likely auto-advance, est. 4-6 s per slide).
- Why it fits: Driver-career timeline is a template for a "Journey" page. Stat-block hero is close to an analyst KPI strip without the dark UI.
- Maps to: Journey, Work (career milestones), Matchday hero stat block.
- Build cost: S.
- Caution: this is a personal athlete site, so the layout is the reference, not the content.

## Card 3. The Immortals (FIFA World Cup visual archive, Awwwards Honorable Mention Aug 3 2026)
- URL: https://theimmortals.world/
- Category: Football editorial / archive. Verification: LOADS (full text capture).
- THE technique: Year navigation rail from 2026 down to 1930. Header "Menu" toggles an overlay with "Close". Each edition is a card (image, title, host, winner, "Visit Story" link). Intro reads "The story begins / The story continues" with numerals. Motion: TECH-INFERRED. Expect card reveal on scroll (est. 300-500 ms fade).
- Why it fits: A year-rail is a clean way to do a season archive: Barca seasons, match-by-year, or the Journey timeline. Keeps Matchday in the same visual language as Journey.
- Maps to: Matchday (season archive), Journey (year rail).
- Build cost: S (rail) to M (card story pages).
- Note: the page scrolls. For a no-scroll Journey, convert the cards into a horizontal rail of one-screen panels.

## Card 4. United in Football (2026 World Cup editorial, Awwwards "No-code" honors Jul 2026)
- URL: https://www.unitedinfootball.tilljanek.com/
- Category: Football editorial / narrative scroll. Verification: LOADS. Awwwards credit placeholder unfilled (cosmetic).
- THE technique: Six anchored chapters (Start, Peace, Coming Together, Languages, World Champions, Last Dance) with in-page nav links. Stat block and "Can you spot your country?" table. Each language card has a "Play Sound" button. Motion and timing: TECH-INFERRED.
- Why it fits: Chapter-anchor nav and per-card "Play Sound" is exactly a Sound-page pattern for Tuhin's music taste (Spotify-led, but not the content). Narrative structure suits a Matchday "story of a match".
- Maps to: Sound (audio cards), Matchday (chapter nav), Notes.
- Build cost: S (anchor nav + audio button), M (full narrative).
- Caution: this is multi-screen. Use the chapter-anchor idea but keep each chapter inside one viewport on Tuhin's site.

## Card 5. WC 2026 - Data Portraits (match rebuilt from event data)
- URL: https://wc26.bogachev.fr
- Category: Data art / football. Verification: LOADS PARTIAL (the match list showed "Loading matches..." in the capture; the concept text rendered).
- THE technique: Each match is rebuilt from about 1,500 recorded events (touches, passes, shots, cards). Source cited as FotMob and WhoScored (Opta). Output is a generated visual per match, not footage. Matches list leads to a per-match view plus an About page. Renderer and motion: TECH-INFERRED (likely canvas or SVG). Timing: not observed.
- Why it fits: This is the Analyst x Football bridge. A match-as-data-portrait fits Tuhin's data-analyst side and his Barca fandom in one piece. It is the closest thing in this round to a Feltron-style personal data piece with football content.
- Maps to: Matchday (per-match print), Analyst Home (data art tile), Dashboard.
- Build cost: L (event-data pipeline + renderer).
- Caution: check FotMob/Opta terms before any reuse. Do not scrape. Use only licensed or self-collected data.

## Card 6. Feltron (Nicholas Felton personal annual reports, classic)
- URL: https://feltron.com/
- Category: Data art / personal data viz. Verification: LOADS (nav only; body not captured). Not a 2024-26 award item. Included because it is the canonical reference for the "year in review" brief.
- THE technique: Plain HTML site with a single nav row. Entries per year are "FAR" pages (FAR05 to FAR14 seen in nav). Report layout: dense data grids per year. Motion: none observed (static pages). Visual density is the technique.
- Why it fits: Year-in-review format for Spotify data, plus gym, photo, and reading counts if Tuhin later wants them. Pages can be one screen each, so it respects the no-scroll rule.
- Maps to: Sound (year in review), Analyst Home, Dashboard, Resume (annual summary).
- Build cost: S for the nav pattern (year rail), L for full annual report.
- Caution: the brief said no invented facts. Use only Tuhin's real Spotify export.

## Card 7. INHERITED (band site, Awwwards Honorable Mention Sep 21 2026)
- URL: https://inherited.band/
- Category: Music artist site. Verification: LOADS.
- THE technique: Single long page. Hero image, then member sections (anchor links #eder, #bats). Contact panel with a copy-email action; text shows "Copied in clipboard" confirmation. Featured track links out to Spotify, YouTube, and a separate experience site. Motion: TECH-INFERRED. Copy toast est. 1.5-2 s.
- Why it fits: Copy-to-clipboard toast is a cheap delight detail for Contact. Featured-release block maps to Sound's "now playing" card.
- Maps to: Contact (copy-email toast), Sound (release card).
- Build cost: S.

## Card 8. Chungi Yoo (art director / illustrator playground)
- URL: https://www.chungiyoo.com/ (root loads). The /404 path returned 404; the 404 page itself is not confirmed.
- Category: Illustrator personal site with cursor and 404 delight. Verification: LOADS (root). 404 cursor and minigame: NOT confirmed.
- THE technique: Long vertical scroll. Hero: "Welcome to the playground of...". Rotating "More about" blocks (3 items, likely stacked animation). Work cards numbered 1/5 to 5/5 (likely slider). "Please wait..." loader text is split into per-character spans, suggesting per-letter reveal. Smiley and star doodles plus "Click for more" prompts. A "/?playground=true" mode exists. Timing: not observed.
- Why it fits: Per-letter loader and doodle accents are on-brand for the Artist warm-paper world. Playground mode is an easter-egg pattern (hidden mode via query param).
- Maps to: Home (loader), About (doodles), 404 (if reconstructed), Notes.
- Build cost: S (per-letter loader), M (playground mode).

## Card 9. Danillo de Marco (illustrator portfolio, listed Awwwards Freelance Portfolios)
- URL: https://www.danilodemarco.com/
- Category: Illustration portfolio. Verification: LOADS (long scroll). Awwwards award: none shown.
- THE technique: Long single-column scroll: hero astronaut illustration, story section, social posters, branding case studies, type specimens, poster gallery, project grid, contact footer. Motion: TECH-INFERRED.
- Why it fits: Weak. Fails the one-screen rule, but the astronaut hero is a usable illustrated-mascot reference for the recurring-character brief (Priority 1).
- Maps to: Skills (illustrated hero), Work (grid reference only).
- Build cost: S for the hero illustration pattern. Do not copy the full scroll layout.

## Card 10. Scroll & drag images - ddanga.com (horizontal photo gallery)
- URL: http://ddanga.com/#/gallery (loads, the hash route rendered)
- Category: Photography / horizontal gallery. Verification: LOADS. Award: Awwwards element (no SOTD label shown).
- THE technique: Horizontal navigation with parallax and transition (tags only; not observed). Images scroll sideways with drag/scroll input. Trigger: scroll wheel or drag. Timing: TECH-INFERRED (lerped drag, est. 0.6-0.8 s ease).
- Why it fits: Horizontal gallery stays inside one screen width, so it respects the no-scroll rule when the vertical axis is locked. Good for Artist-world photo walls.
- Maps to: Gallery (horizontal strip), Sound (album strip), Work.
- Build cost: M.

## Card 11. Scroll navigation photography projects - Mathieu Levesque (Locomotive build)
- URL: https://mathieulevesque.com/ (loads; nav GALLERY / PROJECTS / BLOG)
- Category: Photography portfolio. Verification: LOADS. Award: none shown on the Awwwards listing.
- THE technique: Scroll-driven navigation through projects (tags: scroll navigation, photography, projects, gallery, animation). Motion and timing: TECH-INFERRED, not observed.
- Why it fits: Clean three-link nav (Gallery / Projects / Blog) mirrors the Artist world's top bar. Shows a photo-first layout with minimal chrome.
- Maps to: Gallery, Work, Notes (blog link), Home nav.
- Build cost: M.

## Card 12. Cursor Pet (Framer component) - companion character on cursor
- URL: https://www.framer.com/marketplace/components/cursor-pet/ (search result only; NOT fetched; live demo not confirmed)
- Category: Recurring-character companion. Verification: SEARCH-ONLY. Related open-source route: page-mascot (github repo URL guessed, returned 404; real repo not confirmed).
- THE technique: Pixel-art cat follows the pointer. Reacts to click and hold with hearts and sparkles. Four colour variants. Motion: described in listing; timing not confirmed.
- Why it fits: Priority 1 (recurring companion). Gives a delight character without touching content. The brief allows a character only if Tuhin supplies the concept. Do not invent his mascot's backstory or hobbies.
- Maps to: Home (companion), Gallery (cursor state), 404.
- Build cost: S (cursor pet) to M (custom sprite with reactions).

---

## Held or rejected (URL failed or content mismatch, not counted)
- hottakes.heypaulkotz.com (Paul Kotz, wheel drag-drop nav): DNS fail. Re-check later.
- valentingassend.com (404 scratch-grid cursor) and /404: 403 and reset. Re-check later.
- atmos.gallery: reset. Re-check later.
- almirakho.com, mathildedechiara.com: reset. Re-check later.
- sleutelaar.xyz (Hans Sleutelaar archive): title only, no body captured.
- perappelgren.de: page title mismatch (fashion campaign copy). Not a usable ref.
- clothesline-gallery.framer.website: fetched page returned a generic "My Framer Site" template. Clothesline demo NOT verified. Use Framer marketplace listing only.
- github.com/kamranahmedse/page-mascot: 404 at this guessed URL. Search-result claim only.
- godly.website: redirects to recent.design (not fetched further).
- Codrops polaroid/darkroom: search returned only 2014-2016 demos. No 2025 darkroom demo found.

## Gaps vs brief
- Priority 1 (recurring character): thin. Card 8 and 12 only. Card 12 is unverified live.
- Priority 2 (data-art / Spotify year in review): Feltron (card 6) and WC26 data portraits (card 5). No live 2024-26 personal Spotify viz site verified.
- Priority 3 (darkroom, contact sheet, clothesline): no verified 2024-26 site. Card 10 and 11 are the closest gallery references. Darkroom and clothesline remain unsolved.
- Priority 4 (football): Cards 3, 4, 5 verified. No club anniversary microsite verified for 2025. Card 3 and 4 are editorial, not club sites.
- Priority 5 (one-screen): Cards 1, 2, 10, 11 are the candidates. Most others scroll.
- Priority 6 (delight): Cards 7 (copy toast), 8 (per-letter loader, playground mode), 12 (cursor companion).

---

## Build-cost summary
| # | Ref | Cost | Page |
|---|-----|------|------|
| 1 | williamsgptech.com | M | Matchday |
| 2 | nickho-motorsports.nl | S | Journey / Work |
| 3 | theimmortals.world | S-M | Matchday / Journey |
| 4 | unitedinfootball.tilljanek.com | S-M | Sound / Matchday |
| 5 | wc26.bogachev.fr | L | Matchday / Analyst |
| 6 | feltron.com | S (nav) / L (report) | Sound / Analyst Home |
| 7 | inherited.band | S | Contact / Sound |
| 8 | chungiyoo.com | S-M | Home / About |
| 9 | danilodemarco.com | S | Skills (hero only) |
| 10 | ddanga.com gallery | M | Gallery |
| 11 | mathieulevesque.com | M | Gallery / Work |
| 12 | Cursor Pet (Framer) | S-M | Home / 404 |

---

## Top 5 to steal

1. **Williams GP Tech** (card 1): live next-race countdown in a hero plus a fixtures list. Steal for Matchday. Cost M.
2. **The Immortals** (card 3): year rail (2026 to 1930) with card-per-edition archive. Steal the rail for Journey and Matchday archive. Cost S-M.
3. **Scroll & drag images, ddanga** (card 10): horizontal photo strip with drag or wheel input, locked to one screen. Steal for Gallery. Cost M.
4. **WC 2026 Data Portraits** (card 5): match as a generated print from event data. Steal the concept for an Analyst x Football piece. Cost L. Check data licence first.
5. **INHERITED copy toast** (card 7): "Copied in clipboard" feedback on the email copy action. Steal for Contact. Cost S.

Honorable mentions: Feltron year-rail (card 6) for Sound year-in-review; per-letter loader (card 8) for Home.

Sources:
- https://www.williamsgptech.com/
- https://nickho-motorsports.nl/
- https://theimmortals.world/
- https://www.unitedinfootball.tilljanek.com/
- https://wc26.bogachev.fr
- https://feltron.com/
- https://inherited.band/
- https://www.chungiyoo.com/
- https://www.danilodemarco.com/
- http://ddanga.com/#/gallery
- https://mathieulevesque.com/
- https://www.framer.com/marketplace/components/cursor-pet/
