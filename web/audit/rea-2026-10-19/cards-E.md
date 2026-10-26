# Awwwards reverse-engineering cards, batch E

### frost — https://www.frostype.xyz/typeface/system-blank
- **Core concept (the one idea):** The typeface is its own catalogue. The site is a specimen index that counts the object: "26 Styles / 13 Weights", a weight ladder, a full glyph grid.
- **Signature move:** Weight-ladder specimen. A sticky left index (Samples, Gallery, Family, Glyphs, Hierarchy, Technical) holds while sample lines step down the weight axis (Medium, Regular, Light, then Skeleton hairline). It moves on to poster-size in-use samples, then a glyph grid. Hero pairs a black word with grey numerals ("System Blank 123") and red diacritics ("áä"). Motion is inferred from the frames: the wheel scroll drives the ladder, but no animation was captured.
- **Structure:** Long scroll, 16.9vh (about 17 screens). Sticky left index plus top bar. Not one-screen.
- **Type + colour system:** FT System Blank family, many weights (Medium 500 dominant). Scale contrast is strong: H2 ~60px, H1 ~30px, body 17px, with a poster-size black word in the hero. Palette: warm off-white hero (~#ECE9E9), white body, black ink, grey numerals, one red accent for diacritics. The page also reports rgb(255,0,255) 12 times; it is not visible in any frame, so I left it unexplained.
- **Tech evidence:** Libs: nuxt only (ogl ignored). canvas 0, video 0, svg 0. splitChars 623 (likely per-glyph animation). sticky 13 (pinned index). clip-path 2. cursor:none 6 (partial custom cursor). fixed 16.
- **Creativity principle:** Show the object by counting its own axes (weight, glyph, count). Let those axes be the navigation.
- **Steal for Tuhin:** Skills page. Build a sticky left index of skill groups and a weight ladder of skill rows, heavy for daily tools and hairline for learning. Use Fraunces' variable weight axis, and keep it to about five steps so it fits one screen. Also on Home: a black word beside a grey numeral (for example "Metrics" with a grey "03"), which is the cheapest poster-scale contrast trick here.

### guess — https://www.barrettrm.com/typefaces/p/guess
- **Core concept (the one idea):** Unclear. It is a single product page for one display typeface on a shop template (Barrett RM Type, Squarespace). No overarching world beyond the storefront.
- **Signature move:** None visible. Static product layout: specimen poster left, title, price (US$15), Add to Cart right, then a "You Might Also Like" tile row. Nothing moves across the four frames.
- **Structure:** Short, 6vh, 13 sections. Scroll goes product, then a subscribe form, then a footer. Top nav: Typefaces, Portfolio, License, Contact, In Use, cart.
- **Type + colour system:** Roboto Mono 400 throughout (H1 61px, tracking -2.4px; body 17px). The specimen uses Clarkson, so the display face is only shown as an image. Palette: #EEEDEB ground, #3E4431 olive text, #1A1A1A buttons, white inputs. Low contrast in scale; everything is one mono voice.
- **Tech evidence:** No JS libs (Squarespace). canvas 0, video 0, svg 12, iframe 2 (social/analytics embeds). will-change 10, sticky 1, mask 1. No split text, no custom cursor.
- **Creativity principle:** Monospace the metadata and let the specimen be the only expressive object on the page.
- **Steal for Tuhin:** Work/Dashboard project pages. Under one large specimen image, add a mono spec-sheet block per project (tool, rows, date, source). It gives the analyst world a feel without any motion. Do not copy the subscribe block.

### zighead — https://www.headfonts.com/p/zighead-font/
- **Core concept (the one idea):** A storefront where each typeface is a colour-blocked poster cover, and the cover art is the product.
- **Signature move:** Product hero is a full-bleed yellow poster with the glyph art, a pill row ("a display headfonts typeface"), a thumbnail strip, and a green Add to cart. Below, a "More products" grid of three poster tiles, each in its own palette (grey-green, yellow/red, pink/blue). No motion captured across frames.
- **Structure:** Near one-screen: 2.5vh, roughly two screens. Top nav (Logo Templates, Fonts, About, Licensing, Contact, Blog, cart), then grid, then footer social row.
- **Type + colour system:** Syne 700 for H1 (35px), Syne 600 for H2 (29.75px), Poppins 400 16px body. Times New Roman fallback appears 18 times (unstyled text). Palette: white ground, mint CTA (rgb 198,244,213), black, and per-product poster colours (yellow, red, pink, blue, grey-green).
- **Tech evidence:** Libs: jQuery global, Sellfy store (ogl ignored). canvas 0, split 0, svg 9, img 13. backdrop-filter 4 (glass on nav/cart), sticky 2, will-change 4, filter 1. No custom cursor, no split text.
- **Creativity principle:** Make each item its own poster. The card is a specimen in its own colour.
- **Steal for Tuhin:** Notes index. Each notebook entry becomes a colour-blocked cover tile with its title set in one display face. Colours come from the Bengal alpona and terracotta palette. Keeps the Notes page inside one screen as a grid.

### zaft — https://wisetype.nl/collections/wt-zaft-2
- **Core concept (the one idea):** Unclear. The capture is a 404 page ("There's nothing here, please go back to Typefaces") for this URL. No specimen was rendered, so there is no concept to read.
- **Signature move:** Unclear. Only visible items: a centred monochrome floral engraving at the bottom, and fixed nav icons (cart, plus). All four frames are identical.
- **Structure:** Single screen, 1vh. No scroll. Sections: 6, links 13.
- **Type + colour system:** WT Main 16px for everything (404 heading, body, and nav). White ground (#FFF), text #333, grey ornament, rgba(0,0,0,0.3) borders. No scale contrast on this page.
- **Tech evidence:** Libs: jQuery global only. svg 8, img 1, fixed 6, sticky 2. No canvas, no split text, no custom cursor.
- **Creativity principle:** Unclear. Needs recapture of a live zaft specimen page before any principle can be drawn.
- **Steal for Tuhin:** Low confidence. One idea only: a Notes or Gallery empty state with one centred engraved ornament and a single line of copy linking back. It echoes the alpona motif. Recapture the real page before building on this.

### inkwell — https://inkwell.tech/
- **Core concept (the one idea):** Quiet, clinical AI studio. The cursor is the ink: the page reads as written, not clicked. The live copy, from the JSON h2, is "Bespoke AI and human ingenuity come together to radically transform your business". The ink metaphor is inferred from the cursor, not stated on the page.
- **Signature move:** Custom ink-dot cursor on the whole page (cursor:none on 1391 elements). The dot is visible in every frame, in a different position in each. Heavy per-character split (890) and will-change (757) suggest a text reveal, but the four frames show near-empty content, so the reveal was not captured.
- **Structure:** Long scroll, 32.4vh (about three screens). Minimal top-centre nav (three items). Cookie banner bottom-left. Content layout is unverified from the sheet.
- **Type + colour system:** FK Grotesk 300 at 26px for the headline (tracking -0.25px). FK Grotesk 400 body. FK Grotesk Mono 8px uppercase micro-labels (for example "EFFECTIVE DATE"). Palette: #F6F8FA ground, #1E272D ink, #BBBCC4 grey-blue, white, 8% white glass overlays. Scale contrast is low; the mono labels do the hierarchy.
- **Tech evidence:** Libs: nuxt (ogl ignored). canvas 1, svg 12. splitChars 890, cursor:none 1391, will-change 757, filter 97, mask 15, backdrop-filter 3, clip-path 4, sticky 1, fixed 40.
- **Creativity principle:** Change the pointer and you change the medium. One ink dot as the only cursor makes the page feel written.
- **Steal for Tuhin:** Notes page only. Swap the cursor for a small ink dot that leaves a faint trail while reading, and set Notes dates in mono uppercase. Keep the real cursor everywhere else (Contact, Dashboard). A cursor on every element hurts usability and accessibility, and the sheet does not show the content, so verify on a live reveal before copying more.

### lemkus — https://lemkus.com/blogs/news
- **Core concept (the one idea):** Heritage sneaker shop ("SINCE 1935", "FAMILY FIRST"). The brand is a red colour field with a giant wordmark. The news index is a product shelf.
- **Signature move:** Two parts. (1) Oversized grey "LEMKUS" wordmark filling the lower viewport over red, in the footer. (2) An "FIRST IN LINE" email modal on load, which dims the page (frames 2 to 4). Frame 1 is a product-tile grid with filter tabs (All, Air Jordan, Salomon, Veja). This modal is a dark pattern; do not copy it.
- **Structure:** Short, 2.5vh. Mega-menu top nav (LAUNCHES, SNEAKERS, MENS, WOMENS, KIDS, Sale, Account, Search, Cart), filter-tab row, 4-column grid, chat bubble bottom-right.
- **Type + colour system:** Greed Standard 700 at 40px, uppercase, tracking 3.2px for headings. Greed Condensed 900 and Anton for the wordmark. cofo sans mono 500 for labels. Palette: red (#FF0000) field, black, white, #F3F3F3 tiles, 40% black dim on the modal.
- **Tech evidence:** Libs: Shopify, Klaviyo (ogl ignored). svg 33, img 27, clip-path 8 (footer and mask shapes), will-change 17, fixed 10, sticky 1. No canvas, no split text, no custom cursor.
- **Creativity principle:** One loud colour field plus one giant word is enough to brand a whole page.
- **Steal for Tuhin:** Matchday page. A solid colour field with a giant outlined wordmark (for example "MESSI") bleeding off the bottom edge, and a one-line scoreline in mono above it. It stays inside one screen. Skip the modal.

### stripedev — https://stripe.dev/blog
- **Core concept (the one idea):** A developer changelog as a terminal-style index. The blog is a searchable database of 123 posts with topic counts, dated rows and single-letter keyboard shortcuts.
- **Signature move:** Top keyboard bar ([B] BLOG, [E] EVENTS, [D] DOCS, [Y] YOUTUBE, [G] GITHUB, [M] MEETUPS, [U] COMMUNITY, [C] CONSOLE). Left topic sidebar with live counts (Agentic Commerce (3), AI (23)...). Dated mono rows (2026.10.13) that highlight on hover (pink, then orange in frames 2 and 3). Frame 4 is a different state: a striped-line 3D "DEVELOPERS" wordmark built from repeated lines (svg 309). It is probably the site root hero, not the blog route. Flagged, not confirmed.
- **Structure:** List scroll, 9.3vh (about nine screens). Fixed top bar, sticky sidebar (sticky 1). Navigation is keyboard plus filter, not menu.
- **Type + colour system:** sohne-var 300 for titles (rows ~20px). Display "Blog (123)" at ~101px with tracking -6px. sohne-mono 300 for dates and labels, the most-used face (647 uses). Palette: #E8E8E8 ground, #1E1E1E ink, pink and orange hover rows, navy (rgb 1,22,39) for code blocks. Scale contrast is high at the title and low in the rows.
- **Tech evidence:** Libs: next (ogl ignored). canvas 3, svg 309, iframe 1, backdrop-filter 9 (glass panels), sticky 1, fixed 1. No split text, no custom cursor.
- **Creativity principle:** Let the index be the interface. Counts, dates and key letters are the layout.
- **Steal for Tuhin:** Notes index. Dated mono rows ("2026.10.13 / title"), a topic sidebar with counts (Analyst (4), Football (7)), and single-letter shortcuts ([N] new, [F] filter, [→] next page). Paging by shortcut instead of scroll keeps Notes inside the one-screen rule.
