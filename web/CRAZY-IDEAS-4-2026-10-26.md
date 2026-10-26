# Crazy ideas, batch 4 (2026-10-26)

Built since last batch: `/replay` (git skyline), `/kickoff` (slingshot nav), `/darkroom` (hold to develop), roaming mascot (trots after your cursor, gaits, hoofprints). Konami swaps worlds. This batch goes stranger again.

## The mascot, made truly alive
1. **Horse that does errands.** It trots to a thing on the page (a card, a link, the newest note) and nudges it. Click "ask the horse" and it fetches the answer: runs to the relevant section and stands on it.
2. **Horse has a real day.** Sleeps at Goa night, grazes at dawn, shades itself at noon, all from real sun maths. No API.
3. **Horse leaves a trail you can follow.** Hoofprints already fade; make them the route breadcrumb: click a print to go back to the page where it was dropped.
4. **Horse and ball.** On /kickoff it plays: it dribbles the ball back to centre after a goal, and it can be the keeper.
5. **Horse photobombs.** Randomly, once per visit, it wanders through the frame of the darkroom print. Saved prints show it if it was there.

## Strange pages (standalone, hidden, shareable)
6. **/lab: titrate your taste.** Drip real photos into a flask, the solution colour becomes the roll's real average colour. Stop at the end point: your colour is the page theme for the session.
7. **/orbit: the portfolio as a solar system.** Pages are planets whose orbit period is how long visitors really stay there (session-local). Click a planet to land.
8. **/autopsy: view the site's anatomy.** X-ray mode: every component outlined with its real render cost in ms from the Performance API. The honest-performance page.
9. **/tape: a cassette.** The sound page as a tape you can fast-forward and rewind by dragging the reels; spools are drawn from the real Spotify listening history volume.
10. **/weather: the site in Goa's sky.** The whole page sky is the real current cloud cover and sunset hour for Goa (open weather feed), the gallery lightens or darkens with it.
11. **/cut: the visitor edits the film.** Drag five photos into a strip; the site renders them as a 5-frame GIF (client side) with real EXIF captions. Download or share.
12. **/offside: the page as a VAR check.** Draw a line across a Matchday freeze-frame; the tool computes offside from real StatsBomb open-data positions.

## Meta
13. **Hidden credits roll.** After 3 minutes idle, the whole site scrolls its own credits: tools, libraries, fonts, with true version numbers read from package.json at build.
14. **The commit you broke.** `/replay` gets a "blame" mode: click a block to see the real diff stats and the lesson learned, from commit bodies.

## Top picks from this batch
- **#1 horse errands** (turns the mascot from decoration into the site's guide).
- **#7 orbit** (a signature page, honest data).
- **#12 offside** (football + engineering, very you; check StatsBomb licence first).

## Flagged
- #7 and #10 need small data feeds; keep static fallbacks.
- #12 depends on StatsBomb open-data licence terms.
- #2 and #10 never claim anything about you, only the sky.
