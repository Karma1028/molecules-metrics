# Artist world: the pat scroll (spec v1, 2026-10-19)

Decided with Tuhin (FINDINGS-v7 question rounds 1-5):
- the artist world is a scenario, not the analyst template re-skinned;
- the surface is a Bengal patua (pat) scroll, using the "draws where you look" mechanism;
- pages are painted objects or panels on the scroll; no geography and no real places on the artist side (the route stays in analyst Journey);
- entering a page is a plain click plus a camera glide (no ball kick), then an ink wipe;
- wheel scrolling: in the artist world it moves the camera along the scroll; in the analyst world it steps tabs;
- art: SVG line art in code, plus Flow for one or two painted hero plates;
- modules: witcher script labels, gata sticker lift plus typewriter, onelastbeat hand menu, inmyworld chapter bar (About), dither bridge (world switch). Analyst modules: crumbskees token, lemkus morph, bleibtgleich title, gcloud arcs, exat weight.

Honesty: the pat scroll is a documented Bengal craft and is used here as motif inspiration only. Nothing on the page claims Tuhin is a patua (BENGAL-MOTIF §5). Captions describe only what is drawn.

## 1. Story
"He watched." The scroll starts as pencil underdrawing. Wherever the ball goes, ink and terracotta bloom into the drawing. Watching is what finishes the picture. The analyst world then "counts" the same things: the dither bridge turns the inked scroll into pixels, then into dots.

## 2. Home = the scroll
- **One horizontal strip.** About 3.2 viewport widths long, full height, inside the one-screen frame. Painted borders top and bottom (pat border bands: leaf vine, dots).
- **Six panels**, read left to right like a patua unrolling a scroll, each holding one drawn object:

| # | panel object (SVG) | page | caption source |
|---|---|---|---|
| 1 | camera + film roll | Gallery | SPREADS[0].gloss |
| 2 | headphones + record | Sound | SPREADS[1] |
| 3 | scarf + ball | Matchday | SPREADS[2] |
| 4 | open notebook + pen | Field Notes | SPREADS[3] |
| 5 | self-portrait in pat style (eyes large, outline) | About | SPREADS[4] |
| 6 | letter + Bankura horse | Contact | SPREADS[5] |

- **Opening panel 0:** a title cartouche containing the Headline ("written in"), the Goa clock phrase and the hand line. The horse motif sits here.
- **Camera:** wheel or trackpad, drag, or arrow keys move `x` along the strip (damped with `damp`, one transformed layer). Panels snap softly at rest. Edge pencil marks show how much scroll remains. There is no native scroll element.

## 3. Reveal (the signature)
- **Layers per panel:** `pencil` (thin grey strokes, always visible), `ink` (full line plus terracotta fills), `wash` (Flow plate behind panels 0 and 5 only).
- **Mechanism:** a canvas sits above the pencil SVG. The ink art is pre-rasterised once per panel into an offscreen bitmap at DPR ≤ 1.5. On each pointer frame the ball trail stamps a soft brush, drawing the ink bitmap through a circle clip into the visible canvas, dirty rect only. Cost: a few small drawImage calls per frame, no SVG re-layout.
- **Guarantees:**
  - Hovering or focusing an object completes its reveal, a 600 ms bloom outward from the ball.
  - Touch, reduced motion, or keyboard-only use sees everything fully inked from the start.
  - Reveal state is kept in memory for the session (not localStorage).
- **Readability:** captions and labels are DOM text and are never masked. Only the drawing is revealed.

## 4. Hover / focus
- The object lifts like a sticker: translateY -6px, a 1.5deg rotate, and a paper shadow (a static pseudo-element, no filter).
- The name writes itself along the panel's doodle path (SVG textPath, stroke-dashoffset on an outline font layer, then a fill fade): the witcher script label.
- The ball rests on the object (existing pointer magnet).

## 5. Enter a page
1. On click, the camera glides so the panel is centred (duration.slow, easing.glide), but only if it is off-centre.
2. A terracotta ink wipe opens: a diagonal polygon clip-path with a hand-cut edge (an SVG path with 3-4 jag points) sweeps across in 520 ms (onelastbeat).
3. The page renders as a sheet over the scroll; the scroll stays mounted underneath and paused.
4. Close is the onelastbeat hand menu: two hand-lettered words (BACK / NEXT), each colour-cycling its letters on hover. The wipe reverses and the camera is still at that panel.

Routes stay real (`/artist/gallery`...), so deep links open the sheet with the scroll positioned behind it. The top tab bar is removed in the artist world. The moonsafari line menu (top-right) lists all six panels for keyboard and a11y use.

## 6. Performance budget (enforced by frameprobe.cjs)
- One transformed layer for the camera. No backdrop-filter, and no CSS filter on moving layers.
- Canvas reveal: one dirty rect per frame, nothing when the pointer is idle.
- Targets (headless dev): pan p95 ≤ 16.7 ms, 0 frames > 50 ms during pan or hover; enter wipe p95 ≤ 16.7 ms.

## 7. Build slices
1. **Prototype Home**: scroll strip, camera, six pencil/ink SVG panels (simple first pass), canvas reveal, hover lift. Run the probe and send a contact sheet to Tuhin.
2. **Enter/close**: ink wipe, sheet host, hand menu, deep links, removal of the artist tab bar.
3. **Labels**: textPath script labels; gata typewriter on sheet ledes.
4. **About**: chapter bar.
5. **Dither bridge** on the world switch.
6. **Analyst modules**, one per page.
7. **Flow plates** for panels 0 and 5 (prompt brief written first, Tuhin approves the plate).
