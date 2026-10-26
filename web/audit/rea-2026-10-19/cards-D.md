# Awwwards reverse-engineering cards (set D)

Evidence basis: 4-frame contact sheet per site (frame 1 = after 6s load, frames 2-4 = successive wheel-scroll states) plus runtime fingerprint JSON. "ogl" ignored as false positive. Where a sheet shows only a loader or an overlay, that is stated, not filled in.

---

### marseille — https://marseille.laphase5.com/en
- **Core concept (the one idea):** unclear. All four frames show only a preloader percentage counter (07, 22, 47, 76) on a slate-blue gradient. The page never reaches its content in the capture window. The only readable copy comes from the JSON: "WHAT IF YOU DISCOVERED MARSEILLE DIFFERENTLY THIS YEAR?"
- **Signature move:** unclear. The visible device is a centred percentage counter that climbs to completion. Nothing beyond the loader was captured.
- **Structure:** one-screen. pageHeightVh = 1, zero sections, zero links in the DOM, a single canvas, and 3 fixed elements. Nav model not visible.
- **Type + colour system:** AntarcticaBeta / AntarcticaBetaMedium, 40px uppercase on the copy. Body text colour rgb(15,40,47), with a near-black to slate gradient behind the loader.
- **Tech evidence:** Howl global (audio engine present, no audio element in DOM). Single canvas (likely WebGL/2D, unconfirmed). No gsap, Lenis, or blend modes. css: fixed 3 only.
- **Creativity principle:** unclear from this capture. Treat the preloader as the first screen of the experience.
- **Steal for Tuhin:** Home loader. Show a counter that climbs to the real load percentage, then dissolves into the Artist-world intro. Tentative, because the sheet shows only the loader. Re-capture after the loader clears before building on this.

---

### gataperduda — https://lagataperduda.com/en/mapa/
- **Core concept (the one idea):** a cartography of everyone who co-created an opera. Every person and organisation is a node on one map. The sheet copy reads "This map aims to show all the associations and individuals who in one way or another have been involved in the co-creation of this opera."
- **Signature move:** a language and about modal sits over a dark map of faint nodes. A yellow ring cursor, visible in frames 2-4, circles the "Idioma / Language" control. The map is dimmed and the intro panel opens over it. Mapbox is the likely basis for the map.
- **Structure:** one-screen (pageHeightVh = 1). A fixed top header, a bottom nav row (TOOLS, CARTOGRAPHY OF ORGANISATIONS, ABOUT THE PROJECT, CAT/ENG, sound toggle), and the map as the whole canvas. Navigation is by map and by filter tools, not by scroll.
- **Type + colour system:** GT America Mono throughout (300 weight, 14px body, small caps labels). Near-black base (#000) with grey-on-black text. Colour appears only in the map's rare node tints (rgb 160,194,159 and rgb 206,148,148).
- **Tech evidence:** mapbox libHint and canvas 1 (real map). Howl global (audio engine). __NUXT__ / nuxt. css: fixed 8, filter 9, will-change 116. No blend-difference, no cursor:none, no clip-path.
- **Creativity principle:** the content is the map. Make the navigation a geography of people, not a menu.
- **Steal for Tuhin:** Journey page. Replace the plain timeline with a dark map of places and people who shaped the path. Bankura, Goa, Barca, and the hostel radio are nodes; tapping one opens a card. Use only facts Tuhin supplies, per the no-fabricated-facts rule.

---

### teletech — https://www.teletech.events/label
- **Core concept (the one idea):** a Manchester label as one node in a "Manchester to the world" scene. The Label page is the record arm of a club and events network. Music is the connective tissue.
- **Signature move:** a full-bleed blurred image sits behind a sticky content card, and the backdrop shifts through frames 2-4 as the reader scrolls. A persistent now-playing dock appears at the bottom: prev, play, next, progress bar, volume, and a "BUY NOW" link. Music persists while the reader moves through the page.
- **Structure:** long scroll (pageHeightVh = 62.1, 5 sections, 2 sticky). Sticky stage and card with a persistent player. Navigation is a top bar with a mega-style set of labels (INDEX EVENTS, APPAREL, ARCHIVE RESIDENTS, LABEL UPDATES) and a "MANCHESTER / TO THE WORLD" split.
- **Type + colour system:** Lomocopy LTStd (display, 43px bold uppercase, -1.3px tracking, plus 30px h2). Protomono (11px body, 300 weight) for labels and copy. Arial as the fallback. Near-black #0a0a0a base, with greys #d9d9d9 to #e4e4e4 for text on media. Scale contrast is strong: huge condensed display against tiny mono.
- **Tech evidence:** gsap, ScrollTrigger, THREE (canvas 1), Lenis, SplitType (141 split chars), Swiper, Webflow, jQuery. css: blend:difference 63 (inverted text over media), backdrop-filter 3, clip-path 8, filter 71, sticky 2, fixed 11, video 2.
- **Creativity principle:** let the music player be a persistent layer, not a page. The media lives under the content, and the content never stops for it.
- **Steal for Tuhin:** Sound page (hostel radio). A docked mini player that stays fixed while the page scrolls. Its blurred backdrop is the current track's artwork. One ambient loop only.

---

### bleibtgleich — https://www.bleibtgleich.com/
- **Core concept (the one idea):** "Bleibt Gleich" means "stays the same." The brand is entertainment with attitude, built on constancy. The lead article reads "Jeden Tag dasselbe – und genau das macht den Unterschied" (the same thing every day, and that is exactly what makes the difference). The theme is steady habit as the story.
- **Signature move:** none beyond the editorial grid. Article cards carry a gold left-border and a small gold tag (REDAKTION, the editorial label). The hero is a large Bebas Neue wordmark centred over a diagonal-line texture.
- **Structure:** short (pageHeightVh = 3.1), one section, a plain article grid with a footer. No fixed or sticky behaviour.
- **Type + colour system:** Bebas Neue (88px hero, 700 weight, 22px tracked uppercase labels). Barlow (16.8px body, 400/500/700). Navy base rgb(26,26,46) with two navy tints (#222234 and #272739). Gold accent rgba(245,200,66) at 15% opacity on tags. Orange heading accent on "LATEST ARTICLES."
- **Tech evidence:** next (libHint only). No canvas, video, svg, or audio. css: none recorded. No animation library. This is a CMS-driven editorial site.
- **Creativity principle:** a strong typographic wordmark plus a consistent card system can carry a brand without motion.
- **Steal for Tuhin:** Notes page (the notebook). Use the gold-tag and left-border card system for dated entries, with a Bebas section label. Keep it static.

---

### pencilvania — https://pencilvania.stutpak.com/
- **Core concept (the one idea):** "Pencilvania," a pun on Pennsylvania, as a fictional state drawn in pencil. The mascot is a pencil-sketched dog. The loader is the first thing you see.
- **Signature move:** the pencil-outlined dog and the pencil-hatched "WELCOME TO PENCILVANIA" title sit over a peach-to-lilac gradient. A percentage counter climbs (29%, 43%, 58%, 69%). All four frames are still in the loading state, so no post-load interaction was captured.
- **Structure:** one-screen (pageHeightVh = 1). Loader only. The copy "Visit the website on a computer for the full experience" suggests a desktop-only experience. The mobile gate is not confirmed.
- **Type + colour system:** ui-sans-serif fallback. Title 20px bold, body 14px. Background is a peach-to-lavender vertical gradient (about #ffb09c to #9d8ad9). White text, with purple-navy pencil linework on the mascot.
- **Tech evidence:** no named libraries (libHints empty). canvas 1 (likely pencil-hatch or loader drawing, unconfirmed). svg 2. fixed 3. Fathom analytics only. No blend modes, no clip-path, no cursor:none.
- **Creativity principle:** draw the loader as a character, so waiting becomes part of the world.
- **Steal for Tuhin:** Home loader with the planned chibi companion. A pencil-sketched Bengal-motif creature (terracotta palette) with a percentage counter, which then walks off the loader and becomes the page's companion.

---

### the3key — https://the3key.com/
- **Core concept (the one idea):** accounting for creatives, framed as "CREATIVES, TACKLE THE TAX MAN TOGETHER." The tax man is a bald character with a headset and a "TAX MAN" lapel badge. He is the mascot and the adversary.
- **Signature move:** tilted sticky-note cards ("Creative freelancers," "Studios and agencies," "Creative collectives," "Businesses") that rotate and stack as you scroll. Frames 2-3 show a green card slide over pink and mint cards, and then a fanned row. The mascot, a line-drawn tax man, appears again in frame 4 on the "Talk to us" step.
- **Structure:** long scroll (pageHeightVh = 13.2, 9 sections, 1 sticky). Alternating colour bands: white, deep green, cream. A fixed "W." side tab. A cookie banner occludes frames 1-4 (the cookie banner is visible in every frame).
- **Type + colour system:** Anton (128px hero, uppercase, tight tracking; 18px eyebrow). Inter (12px body, 500 weight). Palette: deep green rgb(8,38,32) for dark bands and text, cream rgb(254,249,242), mint rgb(226,255,239), blush rgb(255,235,241), and a hot-pink accent. Scale contrast is huge: poster display against small Inter.
- **Tech evidence:** WordPress + jQuery (libHints: wordpress, wp-content; the ogl hint is ignored). Digest (REA, passive): WordPress custom theme, jQuery/Foundation, no 3D or animation library. Fingerprint: cursor:none 1079 (likely a CSS rule counted per element; whether a custom cursor is actually drawn is unclear), mask 8, clip-path 12, svg 49, sticky 1, will-change 12. Clarity and GTM analytics.
- **Creativity principle:** let the brand mascot and the content share one set of paper-like objects. Stacking and tilting paper does the choreography, without any motion library.
- **Steal for Tuhin:** Work page (analyst world). Project cards as tilted sticky notes that stack and fan as you scroll, all within one screen. Each note is a metric or project, and the cards settle into a single dashboard-like stack.

---

### analytical — https://analytical-group.com/it
- **Core concept (the one idea):** "Making ... one test at a time" (the hero is partly occluded by the cookie banner, so the full headline is unclear). The story is reliable, certified measurement: 40+ years and services in 80+ countries, shown as numbers.
- **Signature move:** a large number reveal. The "1982" stat sits on a blue-violet photo of glassware, with a particle wave in the black hero (frame 1). The stat cards "Oltre 40 anni di esperienza" / "Global Quality Services" / "Vicino alle tue sedi produttive" / "Cross Industry Solutions" sit over a city-at-night photo. Frame 4 is a contact form.
- **Structure:** long-ish scroll (pageHeightVh = 8.1, no sections element). Fixed header, and a grey footer with company legal details. Language and contact CTAs in the header.
- **Type + colour system:** Graphik (25px headings, 400 and 600 weight), with sans-serif fallback for body (15px). Palette: black hero, white and #f4f4f4 content bands, a blue-violet photo gradient, and a #2e2e2e footer.
- **Tech evidence:** Swiper, jQuery, Cookiebot banner (consent dialog on every frame), HubSpot forms and analytics. svg 98 (the particle wave may be SVG; unconfirmed). fixed 9, will-change 4. No canvas, no WebGL, no GSAP, no blend modes.
- **Creativity principle:** a company that sells trust can show the trust as a number, huge and static.
- **Steal for Tuhin:** Analyst Home. A hero where the counted metrics are the display type (for example a big count-up of projects or rows analysed), with the number reveal triggered on scroll once.

---

## Cross-cutting takeaways (set D)
1. Metaphor first: gataperduda (the cartography of people), teletech (a music scene), the3key (paper stickies and a mascot). Each has one object that organises every page.
2. One persistent layer does the work: teletech's docked player, pencilvania's loader character. Both keep the same object alive across the page.
3. Two sites (marseille, pencilvania) were captured only in the loader state. Re-capture them after the load to confirm their concepts before building on them.
