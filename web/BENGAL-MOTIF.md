# Bengal / Bankura Motif System

Single source of truth for the site-wide cultural layer. Every page pulls from
here so "bold, everywhere" stays consistent and tasteful instead of turning to
decorative noise. Tuhin is from Bengal, Bankura — these motifs are his, used
respectfully, never tokenistic clip-art.

Intensity: **BOLD / expressive** (user choice, 2026-10-14). Applied across both
worlds. Analyst world stays legible: motifs are texture + markers there, never
block the data.

---

## 1. Palette — terracotta through-line

The existing orange accent is reframed as terracotta (Panchmura pottery /
Bishnupur temple brick). One warm ramp connects both worlds.

Tokens to add to the theme (names indicative, wire to existing vars):

```
--terracotta-50   #f7ece3   (wash / alpona paper)
--terracotta-200  #e6b89c
--terracotta-400  #cf7d4a
--terracotta-500  #b85c2e   (primary accent = current orange, renamed)
--terracotta-700  #8a3d1c   (temple brick, deep)
--alpona          #f4ead9   (rice-paste line colour, light on dark)
```

Accent-colour LOCK still applies: terracotta is the ONE accent for the whole
site. No second accent appears anywhere.

## 2. The four motifs

### A. Bankura horse (hero motif)
Panchmura elongated terracotta horse — the district's own symbol.
- Asset: one clean single-line / silhouette SVG (`public/motifs/bankura-horse.svg`).
- Artist world: loader glyph; cursor easter-egg; **gallops across** on page / route
  transitions (horizontal trot, terracotta silhouette, respects reduced-motion).
- Analyst world: tiny data-point marker + the loading / empty state glyph.

### B. Alpona (line language)
Ritual rice-paste linework — graphic, symmetric, elegant.
- Asset set: a few looping SVG line patterns (`public/motifs/alpona-*.svg`) — a
  corner flourish, a horizontal divider rule, a dotted border.
- Artist: frames the gallery / contact sheet; section dividers.
- Analyst: faint chart-grid texture; section rules; node connectors.
- Drawn in `--alpona` on dark, `--terracotta-400` on light.

### C. Terracotta temple tile (reveal + grid)
Bishnupur terracotta-temple relief tile feel.
- Lightbox "develop" uses a tile / shutter reveal keyed off this.
- Analyst bento / grid cells get a subtle relief edge.

### D. Baluchari / kantha stitch (connective tissue)
Narrative-weave + running-stitch line.
- Dashed "stitch" connectors between nodes (Journey, Work, knowledge links).
- Section borders in the artist world.

## 3. Per-world application

| Surface | Artist (expressive) | Analyst (legible-bold) |
|---|---|---|
| Accent | terracotta everywhere | terracotta accent only, generous neutrals |
| Horse | transitions, cursor, loader | marker + loading state only |
| Alpona | frames, dividers, flourishes | faint grid texture, thin rules |
| Tile | lightbox reveal, cover frames | grid-cell relief edge |
| Stitch | section borders | node / data connectors |

Reduced-motion: no galloping horse, no develop animation, no sound by default;
motifs render static. One-screen / no-scroll contract unchanged — motifs live in
margins, backgrounds, overlays, never add page height.

## 4. Lightbox v2 (first build slice)

Immersive, full-bleed, fills the screen. Sequence on open (user gesture):

1. **Sound** (default ON; reduced-motion forces off; speaker toggle persisted in
   localStorage): WebAudio synth — shutter clack + film-advance ratchet on open;
   soft advance tick on arrow step. No asset files.
2. **Develop animation** — image enters as dark, inverted, blurred negative and
   resolves to positive over ~700ms (temple-tile / shutter reveal). Prev/next =
   quick cross-dissolve, not a full re-develop.
3. **Shot-data strip** (real EXIF, honest, no location): e.g.
   `iPhone 14 · 2 Mar 2023 · 1/60s · f/1.5 · ISO 80 · 5.7mm`. **Full dates**
   (real 2019-2024 timeline). GPS never extracted (privacy + no place claims).
   Degrades to caption + frame number if a photo lacks EXIF.
4. **Annotation callouts** — 1-2 terracotta bubbles per frame with a thin
   Alpona-style connector arrow, pointing at what is **visibly** in the image
   ("paper lanterns", "the ridge trail"). Pop in after develop, staggered.
   HONEST ONLY: describe visible content, never invented places / events / dates.
5. **Narrative, hand-written in** — a short micro-story per frame that writes
   itself on, as if someone is scribbling it on a scratch pad: SVG handwriting
   stroke (stroke-dashoffset) or typewriter reveal, timed to a soft **pen-scratch**
   synth sound. 1-2 lines, atmospheric but honest — describes the visible moment,
   never invents place / event / date. If Tuhin has the REAL story behind a frame,
   he supplies it and it swaps in; the default draft stays visible-only.
6. Alpona flourishes in the margins; backdrop dimmed.

## 4.5 Transition language (site-wide polish)

Goal: every move feels intentional, smooth, "wow" — not default fades. Built on
the existing `motion-tokens` springs; no raw numbers. Motivated, never gratuitous.

- **Route / page enter** — content rises + fades with `springs.gentle`, staggered
  by block (heading, lede, body). Exit drops the opposite way. `AnimatePresence`
  `mode="wait"` so exit finishes before enter.
- **World switch (artist <-> analyst)** — the signature moment. The **Bankura
  horse gallops** across the viewport as a terracotta wipe; the incoming world
  develops behind it (temple-tile reveal). One deliberate hero transition.
- **Shared-element morphs** — `layoutId` carries a thumbnail into its hero (already
  in Gallery); extend to Work cards -> detail, Journey nodes -> focus.
- **Scroll / in-view reveals** — `whileInView` once, slight rise + blur-in, Alpona
  rule draws itself (stroke-dashoffset) as a section enters.
- **Micro-interactions** — buttons: `scale.pop` hover / `scale.press` tap; links
  get a terracotta underline wipe; cards lift with a hue-tinted shadow.
- **Numbers / metrics (analyst)** — count-up on reveal; bars / sparklines draw in.
- **Polish rules** — animate transform / opacity / filter only (GPU); honour
  `prefers-reduced-motion` everywhere (fall back to instant); keep durations in
  token range; never block interaction behind an animation. Consider the native
  **View Transitions API** for route changes where supported, motion fallback else.

## 5. Honesty constraints (binding)

- Annotations + captions describe only what is visibly in the frame.
- No invented places, dates, events. EXIF dates are real; GPS excluded.
- Cultural references are real, documented Bankura/Bengal craft — stated as
  motif inspiration, never claiming Tuhin personally practises any craft.

## 6. Build order

1. **Lightbox v2** (Gallery) — ✅ DONE. Session 2i: annotations in SIDE GUTTERS off the photo
   (3-col `.lb-frame`, `layoutNotes` gutter packing, leader lines inward). Session 2j: mobile
   REWORKED — notes now sit in bands ABOVE/BELOW the photo with the same hand-drawn leader +
   circle marker (matches desktop, user ask), replacing badges+list; box/bracket markers REMOVED
   (circle or arrow only, user ask); light-theme backdrop fixed (was mid-gray, title/EXIF
   unreadable) → near-black both themes. QA'd: mobile375 + light + dark; tsc clean.
   Remaining: reduced-motion shot (couldn't toggle in pane — verify on device).
2. **Motif assets + palette tokens** — ✅ ASSETS DONE (session 2j). `public/motifs/`:
   `bankura-horse.png` (REAL Flow/Nano-Banana terracotta Panchmura horse, flood-fill cutout to
   transparent, 2131² — authentic elongated neck + studs, NOT the old dog-like placeholder SVG,
   which was deleted), `alpona-divider.svg`, `alpona-corner.svg`, `temple-tile.svg` (all
   currentColor, eyeballed in terracotta on dark). Terracotta ramp + `--alpona` tokens in
   `world-artist.css` (light+dark), `-500`=live accent so no visual shift yet. NOTE: horse is a
   PNG cutout not a flat silhouette — for the gallop wipe, tint via CSS `mask-image` (slice 3).
3. **Artist world** rollout — IN PROGRESS (session 2k). DONE: (a) terracotta accent swap
   — `--orange` now `#b85c2e` (light) / `#d2763d` (dark), `--terracotta-500` literal; cascades to
   all `--accent`/`--orange` usages, QA'd on artist home light. (b) Bankura horse GALLOP on
   world switch — `WorldTransition.tsx` (module-scoped `lastWorld` survives the WorldLayout
   remount; reduced-motion skips mount), terracotta `.world-wipe` panel + cream horse silhouette
   via CSS `mask-image` (tint-by-mask per slice-2 note), transforms only. Wired into WorldLayout;
   CSS in `theme-base.css` (NOT App.css — App.css is unimported/dead). Verified: panel #b85c2e
   covers, horse mask traverses L->R facing travel, overlay clears clean, 0 console errs, tsc 0.
   (c) ALPONA linework — NEW `src/components/motifs/Alpona.tsx` (inline-SVG `AlponaRule` +
   `AlponaCorner`, currentColor → terracotta). Site-wide artist corner flourishes mounted in
   WorldLayout (`world==="artist"` only, fixed overlay, opacity .14 light / .2 dark, z:1,
   pointer-events none → zero layout impact on the one-screen pages). Alpona DIVIDER replaces the
   ArtistHome masthead rule. QA'd: ArtistHome light+dark+mobile375, Gallery + Matchday render clean
   (corners faint, no overlap). DECISIONS: Matchday keeps its deliberate Barça garnet/blue identity
   (NOT terracotta-overridden); horse loader-glyph skipped (only rare inline "searching…" state,
   API usually down); cursor easter-egg skipped (gimmick / one-screen risk).
   (d) ArtistHome v2.1 "Masthead + film strip": horse glyph in kicker, AlponaRule under title,
   film-strip stage (sprockets, frame mark), idle auto-advance + progress ticks (reduced-motion off).
   (e) SHARED KIT `.horse-glyph` / `.film-mat` / `.stitch` (theme-base.css) rolled to every artist page:
   Notes (ruled leaves), About (film frame + stitched facts, horse = "From Bankura"), Contact (postmark +
   perforated stamp-tickets), Gallery (sheet on film stock). Stitch motif D now live in artist world.
   OPTIONAL remaining: alpona dividers on the other artist page headers (Sound/Notes/About/Contact)
   for consistency — corners already cover them; dividers are polish, each header differs.
4. **Analyst world** rollout — markers, grid texture, stitch connectors, legible. NOT started.
5. QA each slice: dark / light / mobile 375 / reduced-motion before "done".

## 7. Open items

- Horse asset: ✅ DONE as `bankura-horse.png` (Flow cutout, session 2j). Single-path SVG idea
  dropped in favour of the real terracotta cutout (user OK'd PNG-via-Flow route).
- Annotation authoring: ✅ DONE — 33 frames pinned + accuracy pass (pins matched to real
  baked frames, corrected in `gallery-meta.ts`).
- **Terracotta accent: ✅ RESOLVED (user-approved 2026-10-14, session 2k).** Swapped to
  `-500 = #b85c2e` (light) / `#d2763d` (dark, readable on dark paper); `--orange` tracks it so
  the whole artist world shifts from vermilion to browner Panchmura terracotta. QA'd light.
  Analyst world accent not yet swapped (slice 4).
