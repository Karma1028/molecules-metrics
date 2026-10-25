# Last batch: ideas I can build now (2026-10-26)

Built this round (all test-first, checked in browser): full `/darkroom` (developer, stop bath, fixer, dry, lights on; skipping a step ruins the print), horse errands (poke twice and it runs to a nav item and points), `/orbit` (pages are planets, visited ones spin faster), `/kickoff`, `/replay`, roaming mascot, Konami.

Every idea below is real-data-only, self-contained, and sized to finish in one sitting. Pick any by number.

## Fast (under an hour each)
1. **Horse reacts to the darkroom.** In `/darkroom` it stands outside under the red light, sneezes at fixer. Tiny, charming.
2. **Orbit moons.** Each planet gets small moons: one per note or frame on that page (counts from real data).
3. **Replay: commit sound.** Opt-in tick per commit, pitch from size. Same data as the skyline.
4. **Kickoff scoreboard.** Goals this session, kept in sessionStorage. "Tried 4 shots, 1 goal."
5. **Darkroom contact sheet.** After 3 prints, a strip of your results on a clothesline, downloadable as one image.
6. **Console games.** Typing `horse()` in DevTools makes the mascot gallop across the page.

## Medium (an afternoon)
7. **Mascot rides the ball.** In `/kickoff` the horse chases and nudges the ball back to centre after each goal.
8. **Orbit live from history.** `/orbit` scales a planet by how many commits touched its page (real `git log` data baked at build).
9. **Gallery time-lapse.** Real EXIF capture dates play as a time-lapse: frames appear in the order they were taken, with the month ticking.
10. **Darkroom dodge and burn.** After lights on, drag over the print to dodge (lighten) or burn (darken) areas, like real printing.
11. **Matchday freeze-frame offside line.** Draw a line on a still; labels use real open-data positions (check licence first).
12. **Field-notes constellation.** Notes as stars; lines between notes that share tags. Click a star to read.

## Bigger swings (a day)
13. **Self-assembling home.** On first load the landing is built live from the commit history: components appear in the order they were committed.
14. **Weather-dependent site.** Goa's real cloud cover sets the page light, with a static fallback.
15. **Shareable darkroom print.** Prints get a small caption strip (frame name, shutter, process outcome) and a share link.

## Honest limits
- #11 needs a StatsBomb licence check.
- #14 needs a weather feed; keep a static fallback.
- No idea above claims anything about you that is not in your real data.
