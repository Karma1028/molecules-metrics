### 1. Per-Second Website Timeline (Phone/IG UI ignored)
- **0.0–0.5s**: Loader/Reset; cyan corner crop-marks `[ ]` define empty 16:9 monitor bounding-box on #0A0A0D dark canvas.
- **0.5–3.5s**: Hero entrance; red accent slab snaps left; `Hello, I'm RENANDO` slides up from clip-mask; crimson display type `PORTFOLIO` punches behind subject; center cutout photo scales up 0.95→1.0; bottom NLE timeline/timecode bar mounts.
- **3.5–5.0s**: (Phone screen interrupted by iOS control center); website holds steady Hero state.
- **5.5–7.5s**: Replay trigger; viewport collapses to wireframe box + glowing particle dust + floating `R`; cyan crop-box scales out; red block sweeps in; Renando cutout zooms in.
- **7.5–10.0s**: Hero idle; playhead ticker runs along bottom scrubber bar; subtle cursor-follow parallax on cutout.
- **10.5–12.0s**: Scroll 1 (Hero → Work); hero slides up/fades; section title `KARYA YANG BICARA` slides up via clip-path.
- **12.5–15.5s**: Work Reel; horizontal NLE video track slides from right; 3 project cards (`01`, `02`, `03`) slide onto track with sequential snap; cyan playhead activates.
- **16.0–19.5s**: Work scrub & scroll; cursor hovers project cards (cyan border highlight + scale 1.02); scroll reveals brand ticker (`Netflix N`, `MAGMA`, `RAIN`).
- **20.0–23.5s**: Awards section; left panel locks with crimson `10+` counter & starburst under `THE WORK. THE RECOGNITION.`; right panel cascades stacked award rows (2023–2025) styled as an NLE inspector panel with cyan scrub bars.
- **24.0–27.5s**: Awards inspection; row hover-highlight with cyan caret; scroll continues downward.
- **28.0–31.5s**: Split Before/After; left typography slides in (`FROM RAW.` white / `TO REAL.` red); right panel mounts cyan-framed video preview window.
- **32.0–35.5s**: Video preview active with cyan progress bar; scroll transitions into Philosophy section.
- **36.0–39.5s**: Philosophy (`BUKAN SEKADAR VISUAL...`); 3-column NLE layout (left: skills as audio/video tracks with mute/solo toggles; center: nodal pipeline; right: red quote card); blue particle sprites start trailing cursor.
- **40.0–43.5s**: Process node scrub; cursor particle density increases across timeline nodes.
- **44.0–47.5s**: Milestone timeline (`TERUS BERGERAK...` / `LITTLE WINS...`); cyan playhead sweeps bottom time ruler.
- **48.0–51.5s**: Career track stack scrolls up; smooth deceleration into footer boundary.
- **52.0–55.5s**: Contact section entrance (`LET'S WORK TOGETHER.` / `MAKE IT FEEL REAL.`); cursor moves into empty right canvas; blue emissive particle swarm spawns at pointer.
- **56.0–61.5s**: Signature particle interaction; cursor circles in right canvas; 60+ blue-white spark particles follow with velocity lag, form an elliptical vortex/orbit around pointer, then explode in a radial burst.
- **62.0–64.5s**: Loop wipe; canvas collapses into wireframe box + `R` monogram flash; Hero reconstitutes.

### 2. Motion Recipes (Estimated & Inferred)
- **Clip-Path Title Reveal**: `clip-path: inset(0 0 100% 0) -> inset(0 0 0% 0)`, `translateY(40px -> 0)`. Duration: ~500ms. Ease: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out). *(Inferred: parent `overflow: hidden`, letter-spacing tightens by 0.02em)*.
- **Cutout Subject Scale/Pop**: `opacity: 0 -> 1`, `scale: 0.94 -> 1.0`, `translateY: 50px -> 0`. Duration: ~700ms. Ease: `cubic-bezier(0.2, 0.8, 0.2, 1)`. *(Inferred: 150ms delay after background text, pointer lerp ~0.06)*.
- **NLE Horizontal Reel Snap**: `translateX(120px -> 0)`, `opacity: 0 -> 1`, stagger: 90ms. Duration: ~450ms. Ease: `cubic-bezier(0.25, 1, 0.5, 1)`.
- **Scrubber Playhead**: `translateX(0% -> 100%)`. Linear loop (~4s) or scroll-linked via `useScroll` + `useTransform`.
- **Orbital Particle Swarm (Canvas)**: Point-mass system (60–80 particles). Damped spring attraction (`mass: 0.8, damping: 14, stiffness: 120`). *(Inferred: tangential angular force added based on pointer velocity delta; life ~1.1s; alpha decay 1 -> 0; radial outward impulse triggered when pointer velocity crosses threshold)*.
- **Viewport Box Wipe**: Bounding box border `scale(1 -> 0.4 -> 1)`, border `#22D3EE` to `#FF2A3A`. Duration: ~400ms. Ease: `cubic-bezier(0.7, 0, 0.3, 1)` anticipatory snap.

### 3. Signature Mechanics
1. **NLE Pro-App Skeuomorphism**: Modern Premiere/Resolve translation—track mute/solo toggles for skills, crop-bracket viewports `[ ]`, timecode tickers, and inspector metadata rows.
2. **Dual-Tone Primaries**: Deep charcoal (#0A0A0D) punctuated exclusively by punchy crimson (#FF2A3A) for hero typography and electric cyan (#22D3EE) for active tool telemetry.
3. **Orbital Particle Vortex**: Negative canvas space activated by a responsive spark swarm that transitions from fluid drag trail into an elliptical orbit before blooming outward.
4. **Monitor Crop-Frame Viewport**: Page architecture anchored inside a fixed video monitor wireframe, utilizing inward/outward frame collapses for scene transitions.

### 4. 3 Buildable Concepts for Molecules to Metrics (React + motion, one-screen)
1. **The Distillation Column / Reaction Pipeline (Chem-Eng → Data)**:
   - *Architecture*: Screen split into a vertical fractionation column (left) and data transformation DAG (right). Dragging an interactive reflux dial modulates vapor velocity; column plates represent career epochs (Lab, SQL/Python, Production Models). Honest metrics (actual query times, real data volume) condense down glass tubing into readout beakers. The terracotta Bankura horse perches on the condenser as catalyst; clicking it triggers a ceramic ring sound and vents an SVG vapor bloom that re-condenses into a scatterplot of real matchday telemetry.
2. **The Darkroom Viewfinder & Tactical Sonar (Photography → Football)**:
   - *Architecture*: Split-plane optical bench. Left is a 35mm darkroom contact sheet; right is an xG tactical pass sonar. A mode toggle shifts lighting between amber darkroom safelight (revealing genuine photographic prints with loupe zoom) and stadium floodlight (where print grain coordinates snap into tactical event heatmaps). The Bankura horse is etched as the aperture ring mechanism; rotating it adjusts optical depth of field while filtering matchday pass lengths. Zero scroll: carousel trays wipe via shutter-blade `clip-path` masks.
3. **The Terracotta Telemetry Chronograph (Bankura Horse as Instrument)**:
   - *Architecture*: Centerpiece is a precision vector Bankura horse in burnt terracotta (#C85A32) wired with live SVG telemetry calipers and oscilloscope lines. The horse’s spine is a calibrated time-scrubber: scrubbing across it deconstructs clay polygons into benzene ring molecules (chem-eng), which morph via spring paths into radar charts and shot-creation vectors (analytics). The horse's tall ears act as dual antenna meters pinging audio/visual feedback during mode switches. All stats, charts, and artifacts dock into a dense one-screen perimeter instrument panel.
