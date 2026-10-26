# Awwwards reverse-engineering cards — set A

Note: "ogl" in libHints ignored (false positive). "unclear" = not evidenced in sheet or json.

### loiseau — https://loiseau.framer.website/
- **Core concept (the one idea):** Botanical luxury atelier. Nature (flowers, leaves, bird-named brand) is the world; product is shown inside it.
- **Signature move:** Full-bleed hero photo with a giant display wordmark "L'OISEAU DÉ" (~196px) spanning the full width over the face and flower. Category words (E-COMMERCE / COSMETICS / BEAUTY) sit on a hairline rule under it. Later frames show photo tiles offset on flat colour fields (lime, sage, cream), and a halftone dot-screen laid over a product photo with words pushed to left and right edges ("CURATED DAILY LIFE" / "GRACE FOR SIMPLICITY"). Exact trigger of the motion: unclear from stills.
- **Structure:** Medium long scroll. pageHeightVh 10.2, 8 sections. Sticky x5, fixed x4. Nav = fixed top-left logo pill with hamburger, plus fixed bottom-right "GET FOR FREE" CTA.
- **Type + colour system:** Clash Display (500 uppercase for headings, 400 for hero), Inter for body. Scale contrast is extreme (196px wordmark vs 16px labels). Palette: forest green rgb(72,110,70), lime rgb(195,231,148), sage rgb(215,226,193), cream rgb(247,245,237), plus black and white.
- **Tech evidence:** Framer platform only (globals __framer_importFromPackage). No WebGL or GSAP. canvas3 = Framer decorative. mask3, sticky5, will-change5. Motion is Framer-native.
- **Creativity principle:** The type is the image. Size the wordmark to equal the photograph.
- **Steal for Tuhin:** Home page. Put "MOLECULES → METRICS" at near-full width over a single photo, with the two worlds as hairline-ruled labels beneath (ARTIST / ANALYST), echoing the dotted-rule nav here.

### kashyap — https://kashyaprayas.com/
- **Core concept (the one idea):** The portfolio is a working design tool. The designer's craft is shown as a live UI prop (a font picker, a selection box, a bento grid), not described.
- **Signature move:** Intro is a 0% to 100% counter card in a teal rectangle with the line "To think outside the box, we must see through it." that resolves into the hero. The hero is a bento grid: "Unconventional ideas, minimalist execution" with a font-picker popup (Stara, Lora, Abril Fatface...) overlaid on it, a selection box around "Product", and an arrow to a line-art portrait. Frame 3 shows the work list (Leagas Delaney, POSSIBLE, MEDIALAND, FCB) in small mono, then a big "Maybe just drop me a line". Whether the font picker is interactive: unclear from stills.
- **Structure:** json says pageHeightVh 1, but the sheet shows multiple scroll states (intro, bento, credits list, contact). Likely an inner scroll container or a load-time measurement; treat as long-ish scroll. Nav: top-left name block, fixed.
- **Type + colour system:** Stara (600 for 42px hero, 400 for 18px body and 15px captions). Lora 600 as a serif accent. Palette: mint-white rgb(251,255,253), pale aqua rgb(236,248,245), page teal rgb(194,233,231), teal rgb(0,160,132), deep teal rgb(0,99,82), near-black rgb(18,19,18).
- **Tech evidence:** rive (canvas7, the illustration is likely Rive). Howl global (audio library, no audio elements found). splitChars179 = per-character text reveals. svg105 = vector UI and illustration. will-change137 = heavy animation. blend:overlay7, clip-path7, mask6.
- **Creativity principle:** Show the craft as the interface. The portfolio uses its own tool chrome as the content.
- **Steal for Tuhin:** Analyst world, Dashboard page. Mount the BI work sample inside a bento grid with a callout selection box and a small annotation tool panel (metric picker) beside it. Also: the Home intro as a 0 to 100% counter card that counts up "started counting", then resolves into the hero. Keep it to one screen.

### duhaihang — https://duhaihang.com/
- **Core concept (the one idea):** A bilingual code-and-design voice. "Los Angeles / Shanghai. A coding skin with a design soul." Mono type is the coding skin, bold grotesk is the design soul.
- **Signature move:** Text-first scrolling. Hairline diagonal strokes drawn across the top-left of the intro (gsap-driven). Long running paragraphs in mono, a credits list in small mono (agencies and project names), then a large bold sans closing line "Maybe just drop me a line to grab a drink". Rotated vertical side rail (BEHANCE / LINKEDIN / CONTACT) on the right edge, fixed. Exact motion triggers: unclear from stills.
- **Structure:** json says pageHeightVh 1 but the sheet shows four distinct states, so it reads as a long scroll of text chapters. Navigation is the fixed vertical right rail, not a top bar.
- **Type + colour system:** ApercuProMono 400 for body (30px, 0.5px tracking), ApercuBold for the 126px display. Monochrome: white rgb(255,255,255) ground, text rgb(47,47,47). Single ink, no accent.
- **Tech evidence:** gsap only (globals gsap). svg2, links5, splitChars3 (very little split text), fixed4. No canvas, no video, no blend. Motion is a minimal GSAP layer.
- **Creativity principle:** One voice, one ink, one rail. Let the copy move, not the decoration.
- **Steal for Tuhin:** Contact or Journey page. Use a fixed vertical side rail for the contact links instead of a nav bar, and set the Journey timeline as a mono credits list. Add the mono header "Bankura / Goa" (his two places) as the dual-location line, the way the site does "Los Angeles / Shanghai".

### localstudio — https://localstudio.fr/about
- **Core concept (the one idea):** "The power of homemade for brands". Hand-drawn stippled illustration and raw condensed type feel like a photocopied zine. Anti-gloss, anti-polish.
- **Signature move:** Huge condensed uppercase headline "THE POWER OF 'HOMEMADE' FOR BRANDS" over stippled black-and-white illustrations pasted in at skewed angles with hairline frames. Text overlaps the image edges. Frames 1 and 2 are blank (reveal or canvas not yet painted), so the load reveal is unclear.
- **Structure:** json says pageHeightVh 1, so the about route is treated as one screen with per-route transitions. barba is present, so routes swap without full reloads. Lenis smooth-scroll. Fixed x16. Nav: top-left LOCAL wordmark, top-right GET IN TOUCH button.
- **Type + colour system:** Roc Grotesk Condensed 700 (uppercase display, extreme size). Times Now 400 serif for body copy ("We are Matthieu and Thibaud..."). Palette: white rgb(255,255,255), ink rgb(16,16,16), one hot orange-red rgb(255,72,35) used as an accent, cream rgb(255,255,241). Monochrome plus one accent.
- **Tech evidence:** three (canvas3). lenis (smooth scroll), barba (page transitions). splitChars633 = heavy per-letter animation. blend:difference3 = inverted text over media. mask6, clip-path2.
- **Creativity principle:** Pair a brutal grotesk with a fussy serif, and let collaged, rotated images break the grid.
- **Steal for Tuhin:** Gallery page. Show photos as tilted, hairline-framed tiles that break the grid, with a stipple or halftone filter on each photo. The filter reads as "memory of an old photograph". Keep it on one screen.

### rxk — https://rxkstudio.com/
- **Core concept (the one idea):** Scale as architecture. The studio is reduced to a three-letter monolith "RXK". The page builds up to it and ends on it.
- **Signature move:** Hero statement in heavy grotesk, set as a block: "RXK© IS THE DIGITAL STUDIO OF FRENCH DESIGNER GILLES TOSSOUKPE". Lines in the mid-scroll state are stacked and clipped in horizontal strips (OVER 15 YEARS OF EXPERIENCE / CRAFTING WEBSITES AND DESIGN) that look sliced and offset. Final frames: the giant "RXK" logotype fills the bottom 60% of the screen, with a contact row above it (Twitter, Instagram, LinkedIn, Savee, Email). Video is embedded (10 video elements) as work reels between text bands.
- **Structure:** pageHeightVh 4, so a short scroll (about four screens), 3 sections. Fixed x3, sticky not listed. Nav: top-left name, top-right live clock "09:33 GMT+1".
- **Type + colour system:** NeueMontreal 500 (body, 22px) and 700 (uppercase display). Monochrome: warm off-white rgb(244,243,237) ground, ink rgb(23,23,23). No accent colour. Scale contrast is the only contrast tool.
- **Tech evidence:** Nuxt (globals __NUXT__), lenis. video10 = embedded reels. clip-path14 and mask7 = masked line reveals. will-change10, filter5. splitChars63 = moderate split-text use.
- **Creativity principle:** Monochrome plus scale. Let the logotype be the last screen, so the ending is the brand.
- **Steal for Tuhin:** Home page, Molecules → Metrics. End the Home screen with the two-world wordmark set huge at the bottom, half "MOLECULES" and half "METRICS", as the single closing image. Add a live IST clock in the header of the Analyst world (his time zone is Asia/Kolkata) as a small quiet detail.

### monogrid — https://monogrid.com/en/
- **Core concept (the one idea):** Creative innovation as a stage. One saturated colour field and video are the world. The studio is an immersive production house for luxury brands.
- **Signature move:** Giant ghost wordmark "MONOGRID" in heavy display type, blue on blue, bleeding past the screen edge behind the hero. Below it, the statement "MONOGRID is a Creative Innovation Studio..." in light 62px. Work scroll: stacked video and image cards (a glass-egg display film with a centre play button, Oakley store, Loro Piana x Harrods), each with a mono tag chip (INSTALLATIONS / EVENTS, WEB-BASED EXPERIENCES). Cookie banner (iubenda) covers most of frames 2 to 4, so the work-card states are partly hidden.
- **Structure:** Long scroll. pageHeightVh 13, 5 sections, sticky x8, fixed x6. Nav: fixed top bar (CONTACT_UB left, MONOGRID centre, PROJECTS and MENU pills right). Fixed bottom bar with a language picker.
- **Type + colour system:** HelveticaNeue LT Pro 300 for display (62px, light) and 400 for body (14px). Space Mono 400 for labels and metadata (242 instances, heaviest font in the page). Palette: saturated ultramarine blue (oklab ~0.45,-0.03,-0.31), black, white, and small neon accent tags. The blue is the entire environment.
- **Tech evidence:** three (canvas1, WebGL 3D). ogl ignored (false positive). video7 = project films. lenis. sticky8, fixed6. blend: present with an empty suffix (exact mode unclear). clip-path3. splitChars101. GTM and iubenda.
- **Creativity principle:** Make one colour field the entire site, and let video inside it carry the content.
- **Steal for Tuhin:** Home page world switch, which is the planned "one wow" morph. The ghost wordmark "MOLECULES → METRICS" sits behind the hero in one saturated field, and the switch floods the screen with the other world's colour. Mono bracket labels ({ OUR FEATURED WORKS }) also work as section markers on single screens.

### eisenberger — https://www.eisenberger.co.at/en/photography/
- **Core concept (the one idea):** A photographer's catalogue. The photographs are the world, and the site is an index that stays out of the way.
- **Signature move:** Category index as a grid of photo tiles, each labelled in thin white type over the image (People, Food, Hotel, Home, Commercial, Books). Tiles are staggered, not a uniform grid. Hero is a black-field image with falling feathers and a dancer. No strong motion is visible in the sheet. Interaction: unclear.
- **Structure:** Short scroll. pageHeightVh 3.8, 5 sections. Nav: top-left hamburger, centred small title, EN toggle top-right. Footer: three address columns and a single teal bar with legal links.
- **Type + colour system:** Yoga Sans Thin and Hairline (88px "Work" heading, 40px paragraph, 400 weight only). Hairline weights throughout; body grey rgb(121,120,120). Palette: white ground, near-black hero, light grey rgb(245,245,245), one petrol teal rgb(11,85,102) used only in the footer bar.
- **Tech evidence:** jQuery global. Google Analytics and GTM. will-change16 (hover or transition states). fixed2. No canvas, no video, no split text, no blend, no mask. Almost no motion tech, so the design is static by choice.
- **Creativity principle:** Let the photographs carry the design. Type recedes into hairlines, and the only interaction is the grid.
- **Steal for Tuhin:** Gallery page. Make the photo catalogue a single-screen grid of category tiles with hairline labels over each photo, and open a tile into a full-bleed view. Use one accent colour once in the footer, as this site does, to keep the page calm.
