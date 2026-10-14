# 21st.dev Component Catalog — Molecules → Metrics

> Sourced live from 21st.dev via the direct-curl MCP recipe in `CLAUDE.md §2` (2026-10-13).
> `search` = unlimited but RATE-WINDOWED (many fast calls → empty responses; space them ~30–60s,
> or burst 3–4 then pause). `get_component` (full code) = **2/day** on free tier — spend only on the
> hardest-to-hand-build WebGL pieces. Everything else: hand-build with `motion-advanced`, matching the
> component's idea, re-skinned into the two worlds. NEVER ship raw output.
>
> This catalog is a shortlist of CANDIDATES, not a commitment. Re-search each session (patterns grow).

## Signature mechanics (the locked 8-layer system)
| Layer | 21st seed(s) | Build note |
|---|---|---|
| Entry / Projector Gate | `Cinema Grain Preloader`, `Grainy Light Leak Shader Background` | Notebook cover opens through a film-grain gate; light leaks between artist pages. |
| Hero / Chemical Bath | `Ripple Distortion`, `WaterRippleImage`, `Fractal Glass` | **get_component candidate #1.** WebGL water-refraction on portrait = darkroom developer tray; ripples under cursor; album-art tint bleeds in. |
| Per-page / Torch Specimen | `Interactive Blur Reveal`, `Torch Reveal`, `Cursor Spotlight` | **get_component candidate #2.** Frosted page, sharp where cursor trails + film grain; reveals specimen + margin data. |
| Site-wide / Reaction-Arrow spine | `Scroll Morph Hero`, `Svg follow scroll` | Morphing → glyph as progress; drags other-world bleed-through. Hand-build (SVG pathLength, motion-advanced). |
| Name / About / molecule→metric | `ParticleTextCanvas`, `Particle Text` | Glyph-sampled particles shatter + reassemble molecule→chart; repel cursor. |
| Theme / Eclipse Observatory | `Scroll Morph Hero`, `Spotlight` | Terminator sweep on toggle; constellation at totality. |
| Overflow / Tape-peel | `Reveal on hover`, `Image Reveal`, `Optimized Tilt Card` | Peel specimens to swap spreads; tilt-card depth + pointer light-sheen (mobile touch-hold). |
| Sound / Live signal | `Live Waveform`, `Waveform`, `Sonic Waveform`, `Audio Frequency Visualizer Card` | Audio-reactive viz tied to real Spotify now-playing + Hostel Radio. |

## Small reusable pieces (hand-build, seeded by these)
| Use | 21st seed | Where |
|---|---|---|
| Instrument KPI readout | `Segmented LCD Number Ticker` (seven-segment) | Analyst Home tiles, football score-bug, Skills meters |
| Rolling counters | `Rolling Digits`, `Number Flow` (odometer) | KPIs, countdowns, Spotify minutes (already have an Odometer in SoundMe) |
| Grain/dither textures | `Halftone Dots`, `Halftone CMYK`, `Halftone Dots · Round and square` (WebGL, Apache-2.0) | Artist paper grain bg, gallery duotone, analyst plotter noise |
| Reveal cards | `Reveal on hover`, `Great UI Image Hover Reveal` (directional + spring slices) | Dispatches board, gallery, case dossier |
| 3D depth cards | `Parallax Card`, `Optimized Tilt Card`, `Tilt Card` (spotlight sheen) | Taped specimens, dossier tabs, channel cards |
| Page-transition shader | `Great UI Liquid Ripple Shader` (fullscreen route-change ripple) | Artist cross-page develop dissolve |
| Profile / bio cards | `Profile Card`, `Profile Hover Card`, `Glow Card Grid`, `Hover Border Gradient` | About, Contact channels, Lab player card |
| SVG line/route draw | `Line Draw SVG`, `Path drawing`, `SVG Path Drawing Text Animation`, `Animated SVG Background` | Journey P&ID flow-line, Messi WC-2022 run map, Reaction-Arrow spine |

## Hand-build (21st not needed — trivial with motion tokens)
News ticker/marquee · fullscreen lightbox + keyboard nav · contact form (floating label + success stamp) ·
live-dot status chip · scroll-reveal container (already have `Reveal.tsx`) · animated toggle switch.

## Sourcing status (2026-10-13)
21st served INTERMITTENTLY this session — equally-phrased queries hit or miss unpredictably (not purely phrasing,
not a clean rate-limit; no error field on empties). ~30 searches run; catalog above is deep enough to build.
Re-search the "still to search" list opportunistically next session; don't block the build on it.

## SEARCH PHRASING LESSON (2026-10-13)
`search` is SEMANTIC. Descriptive multi-word queries hit ("profile card with gradient border and hover glow");
bare nouns ("card","button","tabs") return EMPTY — that is a no-match, NOT a rate-limit (no error field).
Phrase queries as what the component DOES. The earlier "throttle" theory was wrong.

## Still to search (hit rate-window 2026-10-13 — retry spaced next session/burst)
text scramble/decode · infinite marquee ticker (football) · svg route/map draw (Messi WC-2022 run, Journey P&ID flow) ·
glitch rgb split · sticky-scroll pinned storytelling · gooey metaball · card/button/badge/tabs/tooltip/timeline/bento/masonry-lightbox base kits.

## Spend log (get_component, 2/day)
- (none spent yet — awaiting lock to pull Ripple Distortion + Interactive Blur Reveal)
