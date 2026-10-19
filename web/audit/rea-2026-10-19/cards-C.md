# Creative-direction cards, set C (7 sites)

Evidence: `<slug>.jpg` contact sheet (TL = first view after 6s, then 3 wheel-scroll states) and `<slug>.json` fingerprint. `ogl` ignored as false positive. REA digest used for peppa only.

### gucci — https://www.gucci.com/#/en/
- **Core concept (the one idea):** unclear. The sheet shows only a country-selector gate: black field, "Welcome to Gucci", a cookie modal, a "Select your country/region" field and a SHOP button. No product or brand world is visible.
- **Signature move:** none observed. The cookie modal stays in place across all four frames and nothing moves.
- **Structure:** one screen (pageHeightVh 1). Navigation not visible; the only path is the country select and SHOP.
- **Type + colour system:** Gucci Sans Pro throughout. H1 32px weight 100, tracking -0.96px. Body black (rgb 0,0,0) with white text. Near-monochrome.
- **Tech evidence:** libHints three + react, but canvas 0 and no WebGL seen, so the three hint is unverified. svg 51, fixed 3, sticky 1. topBgs includes rgb(39,69,92), source unclear.
- **Creativity principle:** a single-screen gate with one choice can carry an entire brand when the type is light and the field is black.
- **Steal for Tuhin:** Home page as a one-screen gate with two buttons, "Artist" and "Analyst". Black field, light-weight H1, nothing else. This is the two-world structure made literal.

### poltronafrau — https://www.poltronafrau.com/it/it.html
- **Core concept (the one idea):** a furniture house presenting its pieces as rooms and craft ("Heritage", "Artigianalita senza tempo"). Each hero slide is a real interior, so the product sits inside a lived space.
- **Signature move:** a full-bleed hero carousel of interior photographs that changes slowly. Each slide has a large light serif title overlaid ("Vanity Fair XG In Motion", "Archibald Delicato Balance", "Palazzo Tirso", "Armadi e cabine armadio"). Navigation is arrows plus a row of index dashes at the bottom. The title is set over the photo, not beside it.
- **Structure:** a long page (pageHeightVh 8.1) with a hero that stays one screen. Top bar with menu, search and icon links; fixed header elements (40 fixed nodes).
- **Type + colour system:** SangBleu for headings (60px, weight 300, tracking 0.9px) against Executive for UI (14px uppercase labels). Warm off-white bg rgb(250,248,246), grey text rgb(101,101,108), beige panels rgb(232,230,224). The orange in the sheet belongs to the cookie banner; it is not in the page fingerprint, so do not read it as brand colour.
- **Tech evidence:** no canvas, no WebGL; img 73, video 1, blend 1, fixed 40. Masked reveals, clip-path and split text are not present (clip-path 0, split 4). The motion is slow photo crossfade plus type, not technical animation.
- **Creativity principle:** put the title on the image in a light serif and let the photo do the work; the restraint is the luxury signal.
- **Steal for Tuhin:** Gallery page. Full-bleed photo, a light serif caption placed over it, and a row of index dashes as the only navigation. Each photo gets its own title, as the hero does.

### peppa — https://www.peppasauce.love/
- **Core concept (the one idea):** a loud, pun-driven food-pairing billboard. The sauce is "the thing that goes great with" everything: CHICKEN, STEAK, CEREAL, "EVERYTHING". The product bottle is the constant in the middle of a ticker of "BUY NOW".
- **Signature move:** giant cream condensed words sit on navy, with the words changing as you scroll ("CHICKEN" to "EAK / STEAK" to "THING" to "CEREAL"). A "BUY NOW" ticker runs across the full width, and the bottle stays fixed and re-appears across frames. Rounded arch-cards hold small copy ("THE JOY OF PEPPA SAUCE", "2,400 SHU", "HAND MILLED", "BUY THE DAMN STUFF"). The horizontal sweep is inferred from the stills, not from a recording.
- **Structure:** pageHeightVh 8.6, so a long scroll, but it reads as a sequence of full-screen "posters". Navigation is minimal (8 links). Sticky 5 and fixed 10.
- **Type + colour system:** Obviously 700/400 for display; Vulf Sans 400 for body and captions. Navy bg rgb(21,19,41) and cream text rgb(254,238,226). Bottle label in red-orange. Two-colour system with the product as the only warm object.
- **Tech evidence (digest + json):** Webflow and jQuery globals; the digest reports a webpack bundle with a Lottie require and an "ix2" interaction module. clip-path 78 (masked reveals), mask 11, will-change 211 (heavy scroll-driven motion), sticky 5. canvas 1 is unexplained; the digest found no WebGL, so treat it as unclear.
- **Creativity principle:** let the copy be the illustration: huge words that change on scroll, with the product held still.
- **Steal for Tuhin:** Matchday. The wheel cycles giant words in a single screen (e.g. "GOL", "MESSI") with one fixed object (a ball or scarf) at the centre. Keep it inside the screen: scroll switches the word, not the page, which respects the no-scroll rule.

### vana — https://vana.org/
- **Core concept (the one idea):** your data is yours. The brand is an open data network, and the whole hero is a dot-matrix field, drawn as a particle globe on violet.
- **Signature move:** the dotted sphere on a lavender field as the hero image. A cookie popup is labelled "Obligatory popup" with the headline "A cookie banner. We hate it too.", so the legal gate is turned into a joke. The bottom hero strip has three colour-coded audience tiles ("FOR YOU 01", "FOR BUILDERS 02", "FOR THE MOVEMENT"), partly covered in the sheet.
- **Structure:** short page (pageHeightVh 2.6) with a hero plus a blog/post grid and a footer. Navigation is a top bar with Use, Build, Participate, Learn and a Launch App button.
- **Type + colour system:** Onest 108px weight 500, tracking -5.4px for the H1, with JetBrains Mono for labels and dates. Off-white bg rgb(252,252,250), ink rgb(17,17,17), violet rgb(65,65,252) for buttons and hero, lilac rgb(236,233,251) tint. Big-contrast scale: giant tight H1 against small mono labels.
- **Tech evidence:** next + react; video 1, svg 14, filter 3, blend 2 (blend modes mostly on the hero dot field), splitChars 31 (letter-split heading), sticky 1, fixed 1. The dot-field renderer itself is not identified in the fingerprint; treat it as unclear whether it is canvas or SVG.
- **Creativity principle:** turn a required element (the cookie gate) into a point of voice; the hero is one generative pattern, not a stock image.
- **Steal for Tuhin:** Home (analyst world). Build the hero from a dot grid where each dot is one row you counted, so the analyst world's first screen is literally the data. Keep it to one screen with a single line of copy.

### pienso — https://pienso.com/
- **Core concept (the one idea):** the expert, not the engineer. "For anyone with a data set and a question." Subject experts label and teach models. The product is shown as a human-labelling workbench, not a black box.
- **Signature move:** hard colour-blocked sections that change at each scroll (white, then green, then grey). One sample frame is an annotation demo: a customer message with a phrase highlighted ("password reset") and a common-phrase label panel. The label chips are the product screenshot. A faceted grey 3D shape sits in the green section (Spline hint).
- **Structure:** long scroll (pageHeightVh 20.8, 15 sections). Top menu with Platform, Use Cases, Resources, Company and a "Book a demo" button. Each section is one message with one visual.
- **Type + colour system:** a custom display face (__fontHeading) at 101px weight 500, tracking -3px, plus a body face (__fontBody). Some body text falls back to Times New Roman (body font declared, not applied), which is a fallback issue, not a design choice. Palette: green rgb(2,187,97), cyan accent in headline, greys rgb(242,242,242), black text. Strong colour-blocking with a single cyan accent word.
- **Tech evidence:** spline hint (3D object), next + react, video 1, will-change 15, filter 5, mask 1, scroll-snap 1, blend lighten 1. canvas 0, so the 3D appears to render as image or video, not WebGL canvas. ogl ignored.
- **Creativity principle:** show the product doing its job on a real-looking sample, with the key word highlighted.
- **Steal for Tuhin:** Dashboard (BI work sample). Use a real-looking row of the dataset with one phrase highlighted and tagged with a label chip, as the proof of the analyst work. Keep it within one screen.

### gcloud — https://cloud.google.com/infrastructure
- **Core concept (the one idea):** none beyond a corporate reference page. "Global Infrastructure" is a documentation-style list of regions and security claims. The page is a sales funnel, not a world.
- **Signature move:** none. The sheet shows a yellow announcement bar, a PayPal testimonial card, a security photo block, three link cards and a "Take the next step" band. The first frame is blank except for the bar (the page had not rendered at the 6s mark).
- **Structure:** long, link-heavy page (pageHeightVh 6.2, 815 links, 7 sections). Mega-menu footer.
- **Type + colour system:** Google Sans (36px / 500 H1) with Roboto body. Blue #0b57d0 for CTAs (rgb 11,87,208), white and light greys. Neutral, standard corporate system.
- **Tech evidence:** no canvas, no video, svg 2, img 58, fixed 8, will-change 31, sticky 1. The will-change count is probably from the header and nav transitions, not creative motion. ogl ignored.
- **Creativity principle:** a dense link farm and standard blocks signal reliability, not craft; it is the baseline to avoid.
- **Steal for Tuhin:** Contact. Take the restraint, not the look: one question line ("Tell us what you're solving for"), one button, nothing else. The link footer should not be copied.

### telekom — https://www.telekom.de/start
- **Core concept (the one idea):** unclear. The four frames are all covered by the consent dialog ("Cookies and similar technologies", Utiq, Only required / Accept All). The page underneath is a magenta commercial storefront (mobile tariffs, phones, TV) with no visible creative world.
- **Signature move:** none visible. The consent modal does not move; the page behind it scrolls only slightly between frames, and the bottom magenta band appears in frame 4.
- **Structure:** long commercial page (pageHeightVh 8, 9 sections) with a category navigation (Aktionen, Internet, TV, Mobilfunk, MeinMagenta App, Service).
- **Type + colour system:** TeleNeo (800 at 36px for the H1; 700 at 48px for section heads). Magenta rgb(226,0,116) as the single accent on buttons and bands, white bg, dark grey text rgb(56,56,56). One warm accent colour used sparingly.
- **Tech evidence:** react hint, Flickity and jQuery globals (carousel), tealium/tiqcdn tag manager, clip-path 2, filter 3, sticky 1, fixed 6, splitChars 55 (possibly the consent text). Mostly a standard commercial stack; the creative evidence is weak because of the cookie wall.
- **Creativity principle:** one accent colour used only where the action is makes a large catalogue legible.
- **Steal for Tuhin:** Skills or Work page. Choose one accent colour (terracotta in his Bengal motif) and reserve it for the one thing to click. Caveat: the sheet does not show the page itself, so this is a rule, not an observed effect.
