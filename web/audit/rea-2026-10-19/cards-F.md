# Creative-direction cards, batch F

### carbonation — https://thecarbonation.com/
- **Core concept (the one idea):** unclear. Capture failed: contact sheet shows "no available server" in all 4 frames; JSON has empty fingerprint (0 libs, 0 elements, pageHeightVh 1).
- **Signature move:** unclear (no rendered frames).
- **Structure:** unclear. Recapture needed.
- **Type + colour system:** unclear (only body default Times New Roman, no real styles captured).
- **Tech evidence:** none usable. Re-run the capture before analysing.
- **Creativity principle:** unclear, no evidence.
- **Steal for Tuhin:** nothing yet. Re-capture first, then decide.

### exat — https://exat.hottype.co/
- **Core concept (the one idea):** the typeface is shown as its own world. One letter ("a", drawn from a single letter per the copy) grows into a full universe of specimens, glyph construction and colour-block panels.
- **Signature move:** hero is a full-bleed orange screen with a huge "Exat" wordmark. On scroll the page cuts to dark and white panels: a blue bezier-construction view of the "a" with node and handle numbers, a red "h" on green, a grid of tiled glyph strokes, and a stacked "exat exat" wordmark. Trigger is scroll position (GSAP ScrollTrigger + Lenis smooth scroll). Exact per-panel motion not verified from stills.
- **Structure:** long scroll, about 33 viewports (pageHeightVh 33.4), 10 sections. Nav is a minimal top bar (logo, "Get Font", menu). No sticky sub-nav seen.
- **Type + colour system:** Exat family in 4 cuts (Variable, Condensed, Wide, static 400/500/700), display headline at about 106px, weight 500, tracking -2px. Palette from fingerprint: near-black #1C1D1E (dominant), off-white #EEEFEB, orange #FF6200 as hero ground, plus pink, cobalt blue, green #1C7511, and yellow #FFCE2E as specimen fills.
- **Tech evidence:** gsap + ScrollTrigger + Lenis (smooth scroll), split-text (327 split chars), 9 blend-mode elements, 17 clip-path, 3 fixed, 52 svg, 9 video. Libraries/css support scroll-driven reveals and blend/clip specimen panels.
- **Creativity principle:** let the product be the set piece. Show the thing it sells (the letterform) at full scale and in its construction, not as a description of it.
- **Steal for Tuhin:** Work page (analyst world). Show the one case study as an annotated construction drawing: blue panel with callouts and numbered handles pointing at the dashboard's metric definitions. Same visual language as Exat's bezier panel, same one screen.

### hvdmatch — https://www.hvdfonts.com/fonts/match
- **Core concept (the one idea):** the typeface is sold as a live specimen you tune before you buy. The weight slider and dropdown are the product page.
- **Signature move:** Match hero is a grey palm photo in a pale frame with the "Match" label. Below, a grid of 12 weight tiles (Light to Ultra, Italic). A "Display View / Text View" toggle and a blue-dot range slider with a "Thin / Medium / Bold" dropdown and Buy link set the preview weight. Licence configurator tabs (Desktop / Web / App / Server / Company) then drive a price table with Add buttons. Trigger is click and drag; no scroll-driven motion seen in the stills.
- **Structure:** conventional long scroll, 38 viewports, 39 sections, 70 links. Cookie bar fixed at bottom. Navigation is hamburger plus in-page sections, not a sticky sub-nav.
- **Type + colour system:** UI in Brix (400/700), headings in Pluto Sans extra-light 86px, specimen text in the Match family cuts (thin to bold). Background white #FFF and warm off-white #FBF8F6 / #F4F0EE, black text, one pale mint #F3FBF6 and rgb(27,193,139) mint that appears 72 times, probably the cookie bar and UI. Mostly neutral, low-chroma.
- **Tech evidence:** jQuery, GTM, Cloudflare insights, 1 iframe, 2 video, will-change 2, fixed 2. No GSAP/Lenis/canvas, so motion is light and interaction is UI-driven.
- **Creativity principle:** when the product is a variable setting, put the control in the hero and let the sample change under the user's hand.
- **Steal for Tuhin:** Dashboard page (BI work sample). Replace one static chart control with a single range slider in the blue-dot style that scrubs the time window or metric threshold and updates one chart live. One control, one screen.

### sainturbain — https://www.sainturbain.com/
- **Core concept (the one idea):** a dark, quiet studio page where a big plain-language statement carries the brand and the work comes in as a grid of images, not as a pitch.
- **Signature move:** hero is a large centred statement "Saint Urbain is a creative agency obsessed with branding and design" in PP Neue Montreal on near-black. Below, a 2-column image grid of campaign shots (Tezza, Cob, Yosi, Cerca). Then an About block with a line-drawn globe and a city ticker "LOS ANGELES · MEXICO CITY · MONTRÉAL · NEW YORK". Mask reveals (15 mask elements) and blend-difference (2) suggest image reveals and text-over-image. Exact trigger not verified; the "In the news" section that got it tagged is not in the four captured views.
- **Structure:** short page, about 9 viewports (pageHeightVh 8.9), 2 sections, 47 links. Top bar: logo left, globe icon centre, WORK / ABOUT / NEWS / CONTACT right, dark/light toggle. Sticky elements (3) present.
- **Type + colour system:** PP Neue Montreal sans for UI and headlines (120px hero, 36px uppercase section labels, 12px uppercase captions). ITC Garamond 300 as an accent face. Colours: near-black #1A1918 background, off-white #E8E8E8 text, one yellow #F6EA18 accent used sparingly.
- **Tech evidence:** mask 15, blend:difference 2, clip-path 4, sticky 3, fixed 2 (supports mask image reveals and difference text). canvas 2 plus svg 20 likely the globe; ogl hint ignored as false positive. GA/GTM/doubleclick present.
- **Creativity principle:** a confident one-line statement and a plain image grid beat any effect. Restraint is the signature; motion only supports reveals.
- **Steal for Tuhin:** Gallery page (artist world). Use a 2-column masonry of Gallery pieces with a mask-reveal on hover or tap and a one-line statement above, no scroll. Separately, Contact page: a single-line city ticker of places from Tuhin's own record (Bankura, Goa), with no invented locations.
