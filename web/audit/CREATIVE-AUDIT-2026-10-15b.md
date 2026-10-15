# Creative Audit: Molecules → Metrics (2026-10-15, after Wave B batch 2)

Evidence:
- A fresh sweep of 15 routes at 1440×900 and 375×812, with contact sheets in `scratchpad/shots/audit/sheet-d.png` and `sheet-m.png`.
- Per-page metrics: doc overflow, inner scrollers, tiny text, infinite animations and h1 size.
- tsc and vitest.

## 1. Status

| Area | State |
|---|---|
| One-screen rule | 15/15 routes: docOver 0, hOver 0, inner scrollers 0 (desktop + mobile) |
| Poster pass (Wave B) | **9 of 14** inner pages done: artist Home, Notes, About, Contact; analyst Home, Skills, Work, Résumé, Contact |
| Still small-header pages | Gallery (h1 38px), Sound (38), Matchday (38), Journey (36), Dashboard (36) |
| Infinite loops | 17 total across routes, ≤2 per page (budget ≤8 per page OK) |
| Waves C–F | Not started (three.js morph, page turns, signatures, story glue, easter eggs) |
| Cut-outs | Blocked (Chrome extension disconnected, Flow has no project open) |
| tsc | 0 errors |
| vitest | **2 failing / 42 pass** (new; likely stale tests from page rewrites) |
| Git | Everything since `178993e` uncommitted |

Honest progress against the brief has moved from ~35-40% to about **50%**. The craft is now good. The *story* and the *wow* are still missing.

## 2. External UI/UX findings (from the sheets)

**What works:**
- The cover collage.
- Artist Home film stage.
- Notes notebook spread.
- "Say hello."
- The analyst poster pages now read like posters.

**Problems:**

1. **Formula fatigue on the analyst side.** Home, Skills, Work, Résumé and Contact all use the same layout: giant two-word headline left, glass panel right. Five pages in one rhythm reads as a template, not as instruments.
2. **Analyst Home right half is empty** at 1440. The dial is a small widget bottom-left, but it should be the dominant object.
3. **Matchday is the weakest artist page.**
   - White haze over the photo.
   - 70 tiny-text nodes.
   - At 375, the Season panel text overlaps ("Concaded / match" collides with numbers).
4. **Dashboard mobile lede is a 1-2 word wide column.** That is a layout bug.
5. **Sound is "Spotify stats in beige".** It has numbers but no person or object.
6. **Journey map is plain.** It is a thin line on a grid with a big empty area.
7. **Cover on mobile:** h1 is 28px, the collage crowds, and the portrait is cut.
8. **Gallery:** the composition is good, but the title is small, so the poster scale is missing.

## 2b. Internal findings (Haiku health check, verified against my own tsc and vitest runs)

- **2 failing tests**, both stale text assertions after the poster rewrite split the headings with `<br/>`:
  - `b1.test.tsx:69` looks for "The Work";
  - `toc.test.tsx:68` looks for "The Analyst".
- **Main bundle** is 353 kB (112 kB gzip). Wave C three.js must be lazy-loaded or this doubles.
- **public/ is 19 MB.** 43 frame pairs exist as both `X.webp` and `X-1600w.webp` (~5 MB in the -1600w copies). Serve them through srcset or drop one copy.
- **Clean:** no em-dash in UI copy, no `console.log`, 80 aria-labels, and no obvious img-without-alt.

## 3. Creative: what MORE we can do (not fixes)

### A. One big idea that makes it *his*: chemical-engineering drawing language

No other portfolio has this. Make the analyst world speak in **process engineering's own visual vocabulary** instead of generic glass panels:

| Page | Process object |
|---|---|
| Journey | **P&ID / process flow diagram.** Life stages are unit operations: Bankura = feed tank, Jadavpur = reactor, Celebal = heat exchanger, InfoLeap = separator, GIM = distillation column, Next = product tank. Pipes animate flow; valves open on hover. |
| Skills | **Spectrometer.** A prism splits white light into the 9 lenses as spectral bands; pick a band to read its lines. |
| Dashboard | **DCS control room.** Analog gauges and strip-chart recorders with live Spotify/Barça feeds as process variables, with alarm limits. |
| Work | **Batch records / lab tubes.** Each project is a labelled sample; a status stamp gives the yield. |
| Résumé | **Plotter.** The CV draws itself in pen strokes. |
| Contact | **Telemetry uplink.** Keep it, add a signal-strength handshake. |

This also fixes formula fatigue, because each page gets a different object.

### B. Story glue (the "felt through-line")

1. **The Reaction (world switch).**
   - The molecule → chart morph is already planned.
   - Push it further: use *his* data. Gallery photo pixels become a scatter cloud, then his Spotify bar chart.
   - Going back reverses it: the chart dissolves into a photo.
2. **Bankura horse as companion.** A small terracotta horse lives in the page corner and reacts to state:
   - sleeps when it is night in Goa;
   - wears a garnet scarf on Barça matchday;
   - trots when the page changes.
   - It is one asset with many poses, and it ties heritage across both worlds.
3. **Passport / stamp trail.**
   - Every page visited inks a stamp in the notebook spine.
   - Collect all 14 and the back cover unlocks a handwritten note.
   - This gives visitors progression ("page 12 feels like page 2" is solved).
4. **Bankura → Goa arc.** About, Journey and Contact share one map geometry. The pin you see on Contact is the end of the Journey route.

### C. Live-ness as narrative (uses data he already has)

- **Goa sun.** Artist-world lighting follows real IST: golden-hour warm tint at sunset, a safelight-red darkroom feel at night.
- **Match mode.**
  - If Barça is playing *now*, a garnet ribbon runs across both worlds: "Live: Barça 1-0, Tuhin is not answering email."
  - Typing `visca` triggers a goal celebration.
- **Now playing everywhere.** A tiny cassette in the nav spins only when Spotify is actually playing.

### D. Per-page signatures still unbuilt (artist side)

| Page | Idea |
|---|---|
| Gallery | **Darkroom.** A print develops in the tray under red safelight; drag it out and pin it on a clothesline. Grease-pencil circles on the contact sheet mark his picks. |
| Matchday | **Ticket stub you tear (drag).** Giant "VISCA" type, the chalkboard 4-3-3 with the Messi drift, all as one screen. |
| Sound | **Real radio object.** A tuning knob scrubs stations (Hostel Radio rooms); the vinyl scrubs with the cursor. Opt-in room tone. |
| About | **Bankura → Goa as a scroll-less train window.** Landscape slides behind the photo on pointer move. |

### E. Delight layer (cheap, memorable)

- **Easter eggs:** eclipse clicked 5× gives an eclipse totality; Konami gives the horse galloping; `goa` gives a sunset.
- **Console:** a message for recruiters with a fake SQL query: `SELECT * FROM tuhin WHERE hireable = true;`.
- **404 page:** "Reaction failed. Yield 0%." with a beaker that tips over.
- **Tab title when away:** "Come back to Goa ☀"; the favicon swaps per world.
- **Cursor per world:** artist = loupe that sharpens grain; analyst = crosshair with live x/y coordinate readout.
- **Loader:** a titration whose colour flips at the endpoint, instead of a spinner.
- **Opt-in sound:**
  - paper rustle on artist page turns;
  - relay click on analyst nav.
- **Per-page share cards (OG images):** a poster version of each page, so links look designed in WhatsApp and LinkedIn.

### F. Recruiter path (UX, not art)

- **`?hire` mode or a "60-second version" button:** one screen with the role, 3 proofs, the PDF and an email.
- **Résumé print stylesheet:** Ctrl+P produces a clean A4.

## 4. Recommended order (impact ÷ effort)

1. **Fix the 3 visible bugs:** Matchday 375 overlap, Dashboard mobile lede, 2 failing tests. *Small.*
2. **P&ID Journey + spectrometer Skills.** This is the analyst identity: one page proves the concept, the rest follow. *Medium.*
3. **Reaction morph with his own data** (Wave C, the one wow). *Large.*
4. **Horse companion + stamp trail.** This is the story glue. *Medium.*
5. **Matchday ticket + Darkroom Gallery + Radio Sound.** These are the artist signatures. *Medium each.*
6. **Delight layer:** easter eggs, 404, tab title, cursors, OG cards. *Small each; good for Haiku-scoped tasks.*

## 5. Decisions needed

1. Approve the **P&ID / chem-eng language** for the analyst world? This replaces the glass-panel formula on Journey, Skills and Dashboard.
2. **Dashboard:** keep it (as the DCS control room), merge it into Home, or cut it?
3. **Horse companion:** yes or no? It needs Flow poses (4-6) once the browser path works.
4. **Sound default:** off with opt-in (recommended)?
5. **Commit** the current batch as a checkpoint?
