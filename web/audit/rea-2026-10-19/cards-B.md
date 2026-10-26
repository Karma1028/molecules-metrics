# Creative-direction cards, batch B (7 sites)

Evidence: contact sheets (2x2, 6s load then 3 wheel-scroll states) + runtime fingerprint JSON + REA digest. "ogl" ignored (false positive). Where REA static digest and runtime fingerprint disagree, runtime wins and the conflict is noted.

### inmyworld — https://www.onedayinmyworld.com/
- **Core concept:** unclear. Captured page is a WordPress "Error establishing a database connection" screen, not the creative site.
- **Signature move:** none captured. Sheet shows the same error frame in all 4 states.
- **Structure:** pageHeightVh 1, 0 sections. Nothing to navigate.
- **Type + colour system:** system sans (-apple-system), #444 on white. No brand system visible.
- **Tech evidence:** libHints = wordpress only. canvas 0, svg 0, split 0, css all empty. REA digest: 0 scripts, nothing to fingerprint.
- **Creativity principle:** unclear. Re-capture once the site is back up before carding it.
- **Steal for Tuhin:** none from this capture.

### onelastbeat — http://onelastbeat.com/
- **Core concept:** a sound-first intro. Black room, a small line-art robot-head with headphones, "BETTER WITH HEADPHONES". The site asks for the listener's ears before it shows anything.
- **Signature move:** the headphones gate on first load (sheet frames 1–4 hold the same gate; no scroll change). Audio-first entry, not a menu.
- **Structure:** one screen, pageHeightVh 1, no sections, no links. Gate-then-experience model; nothing past the gate was captured.
- **Type + colour system:** custom pixel-ish display face "olbminiregular" on pure black (#000), dark grey #111 as the secondary background. Monochrome, very low contrast icon, tiny caps labels.
- **Tech evidence:** runtime globals PIXI (2D WebGL renderer) and Howl (audio engine) both detected. canvas 0 at capture (PIXI likely starts after the gate, unverified). fixed 1. REA static digest found no WebGL fingerprint and a 1 MB custom app.js with intro.json audio data. The runtime PIXI detection is the newer evidence; the static view missed it.
- **Creativity principle:** make the first screen a condition, not content. Ask for one sense (here hearing) before you show anything.
- **Steal for Tuhin:** Sound page (hostel radio). Put a "better with headphones" gate on it: one black screen, one icon, Howl-style audio unlock on click, then the radio player. Stays one screen and keeps the audio engine in a single place.

### yauch — https://yauch.oscilloscope.net/panorama/main_01
- **Core concept:** unclear beyond the loader. Oscilloscope-label "Panorama" site for Adam Yauch; the sheet only shows the loading state, so the world behind it is not captured.
- **Signature move:** a radial countdown loader. A thin yellow circle fills as a clockwise pie wipe while the number counts down (frame 4 shows "2" over a half-filled yellow sector). The counter is the feature.
- **Structure:** pageHeightVh 1. Sheet shows no scroll change, so the loader blocked the page. Scroll structure unknown.
- **Type + colour system:** Helvetica Neue Bold at 69px with -4px tracking for display (h2), Helvetica Neue regular for body. Runtime background mix is heavy yellow rgb(255,206,0) (26 hits), white, near-black (#1c1c1c), translucent black overlays. Yellow on black is the core pairing.
- **Tech evidence:** lottie + bodymovin globals (vector animation, the loader is likely Lottie). svg 60, canvas 2, splitChars 128 (per-character text animation). filter 6 and clip-path 1 (image or text effects), fixed 3. jQuery present.
- **Creativity principle:** turn wait time into the first piece of content. A loader that counts is a clock, and the viewer's patience becomes the interaction.
- **Steal for Tuhin:** Molecules→Metrics world switch (the "one wow" morph). Use a radial pie wipe in terracotta on the Artist↔Analyst switch, with a count-down numeral. It ties "started counting" to the transition itself.

### patronus — https://www.harrypotter.com/patronus (lands on /register)
- **Core concept:** a sign-up gate framed as a ritual. The form is wrapped in a night sky, "Sign Up to Reveal your Patronus!", so signing up is the reveal.
- **Signature move:** unclear. The only visible motion is a slow drifting cloud/starfield backdrop. The form itself is static, and no reveal interaction was captured.
- **Structure:** pageHeightVh 1.2, so effectively one screen with a slight scroll. Sticky 1, fixed 2. Single-column form, language switch at the bottom, login link below the fold.
- **Type + colour system:** display serif "Harry Beast" for H1 at 40px, Sofia Pro for labels (16px bold caps, 18px light body). Palette: deep navy-black #10141b, cream #faf6f0 text, electric indigo #5757ff for buttons. Tight, dark, one accent colour.
- **Tech evidence:** __NEXT_DATA__ global confirms Next.js. libHints "three" unverified (canvas 0, so no WebGL visible). iframe 3 (likely captcha/consent embeds). svg 6, sections 4, splitChars 7. css: fixed 2, sticky 1. No cursor:none, no blend modes.
- **Creativity principle:** put the brand's fiction inside the functional copy. The headline is the story, and the form is the magic step.
- **Steal for Tuhin:** Contact page. Keep the form on one screen on a dark starfield, with a single serif headline in the artist voice (e.g. "Say hello to the lab"). Pair it with one indigo-or-terracotta button. Frames the contact step as a small ritual, not a form.

### gallipoli — https://sonsofgallipoli.com/
- **Core concept:** unclear. Captured sheet shows only the loading state on a flat slate-blue field.
- **Signature move:** none captured. All 4 frames identical, centred "LOADING" in small serif caps.
- **Structure:** pageHeightVh 1. No scroll change. Structure unknown.
- **Type + colour system:** body background rgb(121,145,162) (desaturated steel blue). Typekit font "europa" loaded. Text colour black on load, white loading label.
- **Tech evidence:** libHints ogl only (false positive, ignored). canvas 0, svg 0, img 0, split 0, css empty. Only Google Analytics and Typekit hosts. No libraries that support motion.
- **Creativity principle:** unclear. Not enough evidence to name a rule.
- **Steal for Tuhin:** none. Possible loose tie: the single muted steel colour as a page background is a calm option for an About page, but this rests on one frame only.

### moonsafari — https://www.moonsafari.archi/
- **Core concept:** architecture as a sequence of places. The page is a slideshow of building projects, each a full-bleed photo with a title block and a counter, navigated by a single connector line to a point.
- **Signature move:** a circular mask reveals the project photo inside a black field, and a thin diagonal leader line with a node points from the bottom-left to the project title. Frame 1 is a black intro with ghost letters "MOON SAFARI" cropped at the edge. Scrolling advances to project 04/10 (indoor pool), then 10/10 (Bordeaux building), each with a new photo under the same circle and line.
- **Structure:** pageHeightVh 6. Long scroll tied to a project index (counter "04 · 10"). Fixed nav: logo top-left, "Accueil" link and circular "MENU" button top-right. Sections 1, links 21.
- **Type + colour system:** nimbus-sans-extended (700/900) for titles, nimbus-sans for small labels. Scale contrast: large white 40px titles against tiny caps counters and labels. Palette: black #000 and white with greyed photo overlays. No accent colour.
- **Tech evidence:** canvas 4 (likely the connector/cursor drawn on canvas or the image effects, unverified). cursor:none 284 means a custom cursor, which fits the line-and-node element. fixed 11, will-change 12 (GPU-layered animation). No blend modes, no clip-path, no split text. Digest conflict: REA static view called the site "essentially static, no JS stack", but the runtime shows 4 canvases, 284 cursor:none rules and a scroll-driven slideshow. Runtime wins.
- **Creativity principle:** one persistent pointer device carries the whole page. A single line and node linking the viewer to the content is the navigation.
- **Steal for Tuhin:** Gallery (artist world). Full-bleed photo with a circle-masked reveal, a counter "04 / 10", and a thin leader line from a node to the caption. Ghost-cropped word ("GALLERY") in the background. Keeps it one screen: scroll = next photo, not more page.

### crumbskees — https://crumbskees.com/
- **Core concept:** a cartoon world. Two wobbly characters on a purple couch sit inside pulsing concentric rings of colour; the brand is an animated comic set, not a product page.
- **Signature move:** a looping illustration with a rippling wave-ring background, a vertical marquee strip on both edges ("IT'S A MUNCHY LUNCHY WASTE OF TIME") and a top ticker ("MADE WITH <3 BY UPPERQUAD"). The sheet shows the rings pulsing and a small ticker moving; the scroll states barely change. Press "PLAY NOW" to enter the game (not captured).
- **Structure:** pageHeightVh 1, one screen. Navigation is a single "PLAY NOW" call-to-action in a bottom bar.
- **Type + colour system:** Ginto Nord 900 at 52px for "It's the CRUMBSKEES" (heavy black caps with a hard offset shadow), Fakt 700 for smaller text. Palette: violet #3f1bd0, sun yellow #ffe945, orange, pink, black outlines. High saturation, the most colour of the seven.
- **Tech evidence:** video 1 (looping background or clip), Howl (audio engine, likely the game or ambient music), clip-path 1 (shape mask), fixed 1, svg 1, img 1. Canvas 0, so motion is video or CSS.
- **Creativity principle:** commit to one saturated world and let the type and the mascot carry the brand. Keep the whole thing on one screen with a single action.
- **Steal for Tuhin:** Home (analyst world) or Matchday (artist world). A single-screen hero with a looping illustration, a hard offset-shadow headline and one "PLAY NOW" style button, with a marquee strip of short lines (e.g. "COUNTED. NOT JUST WATCHED."). Reuse the Bengal terracotta/alpona palette rather than Crumbskees' neon one.
