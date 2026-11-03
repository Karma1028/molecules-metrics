# Round 4: twelve more complete flows (2026-10-30)

Status: IDEATION. Nothing built. These add to P1-P7 in `SITE-FLOWS-MASTER-2026-10-30.md` (Painted Door, Metro, Bag, Proof Reel, Wrapped, Match Day, Table), and all the earlier parts (Two Doors, patachitra film, stories deck, case files, nine-box, Mekko, KPI tree, cast layer, `/li` `/ig` doors) stay available to mix in.
Skills used: `superpowers:brainstorming`, `frontend-design-direction`, `storytelling`, `ig-profile`, `dataviz`, `motion-patterns`; anatomy repo for R7. No agents.
Every flow keeps your shape: **landing (animated) → the two sides → deeper data**. Honesty rule throughout: nothing about Tuhin that is not in his real data; anything needing his own voice, schedule or photos is marked **NEEDS TUHIN**.

## Why these are different from the first seven
The first seven vary the *metaphor*. These vary the *mechanism*: how the two sides relate (focus, flip, day/night, versus, formation), what the visitor does (talk, type, drag, tune), and what kind of page the site is (a deck, a spreadsheet, a newspaper, a control room).

---

## R1 "Rack Focus" (the camera's depth of field is the fork)
Landing: a single cinematic scene with two layers in one frame: a printed photograph in the foreground, a live dashboard in the background. A focus ring (scroll or drag) racks focus between them: photo sharp and chart blurred, then the reverse.
Fork: where the focus rests decides the side; tap to lock it. This is the camera-and-data identity as an actual optical effect, not a toggle.
LinkedIn: land with the focus on the dashboard layer (role line sharp), rack to the photo for the human side. Instagram: land on the photo, rack to the data for "the numbers behind it".
Two sides tie: one scene, two focal planes, always visible as blur behind the sharp one.
Depth: case files and gallery as usual. Reuse: sky-shift/world-motion tokens, gallery images. New: layered scene art, CSS blur and scale ramps (cheap, runs on the GPU).
Cost: low-medium. Risk: blur is a performance cost on weak phones; must test in Instagram's browser.

## R2 "Recto / Verso" (every photo has a data side)
Landing: a full-bleed wall of your photographs. A single global switch flips the whole wall: each photo turns over to show *its own data* (shutter, aperture, ISO, time, colour palette, a tiny histogram). Flip back and it is a gallery again.
Fork: the flip is the fork: front = Artist world, back = Analyst world. Tap one photo for its single flip, tap the switch to flip all.
LinkedIn: sees that the "photographer" is also analysing his own work (the EXIF scatter already exists). Instagram: it is just a photo wall until they discover the back.
Two sides tie: they are literally two faces of the same object.
Depth: the Analyst depth for photos is the EXIF analysis; the rest of the Analyst world (cases, Scorecard) opens from a "more on the back" card.
Reuse: Gallery, EXIF scatter, shutter sound. New: flip component, per-photo derived stats (real EXIF only).
Cost: low-medium. Risk: the data side must be real EXIF, so only photos with intact metadata flip.

## R3 "The Pitch" (the site is a consulting deck)
Landing: slide 1 of a clean pitch deck, "Why hire Tuhin", with an action title as every consultant writes them. Arrow keys or swipe move slides; a presenter mode shows the next slide.
Fork: slide 3 is the fork ("Two ways to read this deck: the work, or the person"); both are short sub-decks.
Depth: case slides carry Mekko, 2x2, waterfall and the KPI driver tree. Every slide has an "export to PDF/one-pager" and the same deck re-exports as a LinkedIn document post.
LinkedIn: exactly the format a recruiter or consultant recognises. Instagram: weaker, so `/ig` opens the photo sub-deck first.
Two sides tie: a shared appendix slide "How the two connect" with the interchange examples (football analytics, photo data).
Reuse: case-comp deck engine and style, nine-box, one-pagers. New: slide shell and keyboard handling.
Cost: medium. Risk: reads corporate; the artist half needs strong design to not feel bolted on.

## R4 "The Message Thread" (a voice note and a chat)
Landing: it looks like a messaging app. First bubble is a 40-second **voice note from Tuhin** (waveform, captions), then quick-reply chips: "What do you do?", "Show me your work", "Show me your photos", "How do I reach you?". Each reply drops a short, scripted answer bubble with a card that opens the page.
Fork: the chips. Both sides are two replies in the same conversation.
LinkedIn: voice and a real conversation feels human, with the résumé one bubble away. Instagram: the format is native to the phone.
Two sides tie: the conversation moves between topics freely; "and you also shoot?" is a natural next chip.
**NEEDS TUHIN:** the real recording and the scripted answers in his words. No synthetic voice.
Reuse: Contact page copy, résumé. New: chat shell, caption sync. Cost: low. Risk: scripted chat can feel gimmicky if the copy is stiff; keep answers to two lines.

## R5 "The Workbook" (the site is a spreadsheet)
Landing: a spreadsheet fills the screen. Cells reveal photographs and numbers as the visitor scrolls; formulas are visible and real (`=SUM(experience_months)` returns 12). Sheet tabs along the bottom: **Analyst**, **Artist**, **Both**.
Fork: tabs. A pivot table in the "Both" tab shows his year by type (hours of work, frames, matches, listening).
LinkedIn: analysts and finance people get the joke and the competence. Instagram: the surprise of photos inside cells is the hook.
Two sides tie: the pivot, and cell references crossing tabs (a photo cell referencing its EXIF row).
Depth: the Audit lens is built in: click any cell to see its source.
Reuse: KPI definitions, DAX flip, Audit lens idea. New: grid shell and the formula engine (simple).
Cost: medium. Risk: grid layouts can feel dated; needs a refined, not Excel-clone, visual language.

## R6 "Starting XI" (formation as the navigation)
Landing: a tactics board. Eleven players form a 4-3-3; each player is a page or project (the number is a real stat). A coach's arrows move the formation as you scroll.
Fork: two squads, **Artist XI** and **Analyst XI**; **substitutions** swap a player between squads (a page that belongs to both).
LinkedIn: scan the Analyst XI and tap the captain (Scorecard) or the striker (a case file). Instagram: football fans click straight into Matchday.
Two sides tie: substitutes and the shared midfield, football analytics, which sits in both lineups.
Reuse: Matchday data, 2x2 xG vs xA, scoreboard motion. New: board component, player cards.
Cost: medium. Risk: a niche metaphor; works only if the football thread is a real part of his identity (it is), and the formation never hides a page.

## R7 "Isometric Town" (the anatomy repo as a place)
Landing: one isometric scene of a small town in the anatomy style: GIM campus (Résumé, Skills), a studio (Gallery), a radio shack (Sound), a café with a Barça flag (Matchday), a post box (Contact), a clay-horse square (About). A little train line joins the **Analyst district** and the **Artist district** with a station at the bridge.
Fork: the districts; the train is the "other side" button.
Interaction: hover or tap a building and its "anatomy" opens (hover-to-explode, the skill's signature).
LinkedIn: buildings carry the proof. Instagram: the town is a toy, then each building a photo or a song.
Two sides tie: the train and the shared station ("Football analytics" stop).
Reuse: anatomy kit (MIT), nine-box and KPI cards inside the buildings. New: the whole scene (a "Hero" in the skill's sizing, about 2-4 hours of generation plus review), and the isometric registers must not look like the rejected P&ID language.
Cost: high. Risk: the most impressive and the heaviest; needs strong performance work.

## R8 "The Sky" (day and night are the two sides)
Landing: a scroll that moves the sun across a painted Goa sky. Day = the Analyst content (work, numbers); dusk = the bridge; night = the Artist content (photos, music, matches).
Fork: the existing eclipse/sun-moon toggle becomes the central device; scrolling or tapping moves time.
LinkedIn: `/li` opens in daylight, `/ig` at dusk. Instagram: the night side arrives as a reward.
Two sides tie: the sky is continuous; both sides share one horizon, one horse silhouette on the hill.
Reuse: `sky-shift`, theme tokens, the Landing's eclipse. New: scroll-linked sky scenes (stills and CSS).
**Not** claiming a daily schedule: day/night here is a design metaphor, not a statement about his routine.
Cost: low-medium. Risk: thin on its own; works best combined with another depth layer.

## R9 "Control Room" (a live wall of panels)
Landing: a wall of live panels: next Barça fixture, now-playing, latest commit, latest photo, months of data work, availability. They tick and update while the visitor watches.
Fork: panels are grouped left (Analyst) and right (Artist); tap one to enter that side's deep page.
LinkedIn: a live proof of pipelines and delivery. Instagram: now playing and a fresh photo make it feel alive.
Two sides tie: one wall, panels from both sides side by side with a shared timeline strip.
Reuse: live feeds, baked daily data, the KARMA-OS control-room idea. New: panel grid with offline states.
Cost: medium. Risk: if feeds are down it looks dead, so offline states and "last updated" labels are mandatory.

## R10 "The Notebook" (a real page-turning book)
Landing: a closed Field Notebook (the brand already says Issue 01 / Vol.01). Scroll opens the cover; spreads turn in true 3D; index tabs on the page edge are the two worlds.
Fork: tabs, or flick a page to jump.
Depth: each spread is a page of the site; the analyst spreads carry the charts and KPIs.
LinkedIn: tab "Work" first. Instagram: tab "Photos".
Two sides tie: the tabs sit on one spine; marginal notes cross-refer ("see Plate III").
Reuse: Field Notebook language, paper texture, kantha thread, Caveat notes. New: page-turn component (CSS 3D).
Cost: medium. Risk: page-turn novelty can slow the experience; keep a quick-jump index.

## R11 "Cabinet of Drawers" (a specimen cabinet)
Landing: a wooden museum cabinet filling the screen, drawers labelled with specimen cards ("Fig. 1"). Pull a drawer: it slides out showing a project or series with a museum label that doubles as the KPI definition and source.
Fork: two cabinets, left Analyst, right Artist, with a shared "Both" drawer in the middle.
LinkedIn: the labels carry definitions and sources, a quiet Audit lens. Instagram: drawer tactility and photos.
Reuse: Plate / Fig. / specimen language, anatomy "chest of drawers" idea. New: drawer component, label template. Cost: low-medium. Risk: heavy skeuomorphism can look dated; keep flat materials.

## R12 "The Daily" (a live front page)
Landing: a newspaper front page, **The Tuhin Daily**, regenerated each day from real data: the lead story is the freshest thing (a new case file, a new photo series, last night's Barça result, a new commit streak), with a data box and a photo.
Fork: Section A (Work) and Section B (Life); the paper itself is the navigation.
LinkedIn: the front page shows recent output, proof of momentum. Instagram: followers have a reason to return daily or weekly.
Two sides tie: the front page mixes both on one layout every day; the editor's note decides the day's lead.
Reuse: daily bake pipeline, Notes feed, match data. New: the layout template and story ranking rules. Cost: medium. Risk: if the data does not change, the paper looks stale; fall back to a weekly edition.

---

## Leaderboard across all options (P1-P7 and R1-R12)
Criteria: matches your landing → two sides → data layers, works for both LinkedIn and Instagram, ties the sides, low cost and risk, memorable.

| Rank | Option | Why it rises |
|---|---|---|
| 1 | **P1 Painted Door** (film + Two Doors + case files) | The most complete match to your description |
| 2 | **R2 Recto / Verso** | One object with two faces; cheap; real data; strongest "ties the sides" idea |
| 3 | **P2 Metro** | Verified data, interchange stations, low art cost |
| 4 | **R1 Rack Focus** | A genuinely new device for the camera-plus-data identity |
| 5 | **R3 The Pitch** | Best for consulting positioning; re-exports as a LinkedIn document |
| 6 | **R9 Control Room** | Live, honest proof; fits the KARMA-OS identity |
| 7 | R7 Isometric Town | The most striking, the heaviest |
| 8 | P3 Bag, R4 Message Thread, R5 Workbook | Strong personality; narrower |
| 9 | R8 The Sky, R10 Notebook, R11 Cabinet, R12 Daily, R6 Starting XI, P4-P7 | Better as parts than as the whole site |

## Combinations worth a look (a flow is a landing + a fork + a depth)
- **"The Flip Door"**: P1's film → R2's photo wall that flips between the sides → case files.
- **"The Focused Metro"**: P2's route ride, with R1's rack focus used at each station (photo sharp, data blurred, and back).
- **"The Pitch in a Cabinet"**: R3's deck for LinkedIn, R11's drawers for the artist half.
- **"Live Dossier"**: R9's control room as the fork, R12's daily front page as the weekly refresh.

## Decisions needed
1. Which of R1-R12 do you want to see mocked up beside P1 and P2? (My pick: R2 and R1, both cheap to prototype with real photos.)
2. Any you reject outright?
3. R4 and R12 need your own words and recordings: are you open to a voice note?
4. Should the mockups be static stills first (free Flow images, fast) or a small clickable prototype?
