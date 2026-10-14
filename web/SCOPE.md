# Molecules → Metrics — Full Site SCOPE

**Owner:** Tuhin Bhattacharya · chem-eng → data analyst + photographer · Goa (IST)
**Date:** 2026-10-13
**Status of this doc:** DRAFT for Tuhin's review. This is the **WHAT**, not the code — every page, section, what you see, what each click/hover does, what pops up, and how it moves. We lock this, then build page-by-page against it.

> Decisions already locked with Tuhin (2026-10-13):
> - Scope = **whole site, equal depth** (13 pages — 7 artist + 6 analyst — both worlds).
> - Inner pages carry **full collage-chaos** energy (not clean grids — grids read "AI-generated").
> - Motion = **high, scroll-driven** (reveals, parallax, pinned/scrubbed sections, counters).
> - Case studies: **all four** (InfoLeap, SUJAN, CLV, Tata+others) — confidential ones masked.
> - Dashboard page **DROPPED** (not enough real info) — live GitHub readout folds into Analyst Home.
> - **Medium** account is the real Field-Notes writing feed.
> - **Football = a 5-view "Football Room"** (Hub · Season-live · Player Lab · vs-Messi · Messi-Story masterpiece) on his real Barcelona Analytics pipeline — flagship bridge + case study.
> - **Backend A locked:** Python API owns all fetch/scrape/calc/cache; frontend only calls `/api/*`. "Live" = current-season, post-match-updated (realistic free).
> - **Confidentiality:** mask ALL client names + hide confidential data (InfoLeap/Royal Enfield → "major motorcycle brand"; SUJAN → "hospitality client"). Images: mix real-CC + illustrated.
> - Every page carries a **storytelling spine + easter eggs + cinematic/vox motion** (see §2B).
> - Résumé download = **hover-split: Classic CV (GIM Drive PDF) + Modern CV (creative animated HTML, same content)**. Contact = **working form**.
> - Skills/plugins used throughout: this doc itself drafted with `frontend-design-direction` + `motion-patterns`. Each page's build will invoke `frontend-design`/`motion-*`/`design-taste` + browser-QA.

**Legend:** 🟢 built & QA'd · 🟡 partial · 🔴 ComingSoon placeholder · `[NEED]` = real data owed by Tuhin (full list at end).

---

## 0. North star

One portfolio, **two fully-separate worlds** off one signature hero. Not a theme toggle swapping text — two different rooms.

- **THE ARTIST** — warm field-notebook. Paper texture, Fraunces + Caveat, orange. Photography, Spotify, Barça, Goa, the over-thinker. Emotional, tactile, hand-made.
- **THE ANALYST** — dark instrument panel. Navy/graph-paper, Space Grotesk + JetBrains Mono, pen-blue/teal. Chem-eng rigour pointed at data. Precise, evidence-first, "building in the open."

The job: (a) land a **data role** — prove transferable rigour with real work; (b) show a **whole person** — the artist half makes him memorable. Both halves must feel crafted, alive (real feeds), and unmistakably *his* — never templated.

---

## 1. Global art direction — the collage-chaos language

The hero proved the language. Every inner page inherits it (tuned per world). The rule that was missing before: **overlap for DEPTH, never collide with reading text.** Chaos is *composed*, not random — every tilt/overlap is deliberate, text stays on its own clean plane above the mess.

**Shared "field-notebook" grammar (both worlds):**
- **Taped objects** — photos, cards, chits sit on the page like taped/pinned clippings (washi-tape corners, drop shadows, 1–3° rotations). Never a flush CSS grid of equal cards.
- **Margin marks** — hand-scrawl (Caveat) annotations, arrows, circles, underlines, page numbers, `FIG.01`, coordinates, timestamps in the gutters.
- **Layered paper/graph texture** — warm paper (artist) / blueprint graph (analyst) base, subtle grain, registration marks, fold lines.
- **Asymmetry** — content hangs off an editorial baseline grid; columns offset; big display type overlaps a photo edge; whitespace is intentional, not uniform.
- **One "specimen"** per page — a hero object (a photo, a chart, a clipping) that anchors the chaos.

**Palette (multi-dimensional, not one hue — per design-direction skill):**
- Artist: paper `#ECE2D0`, ink `#241E17`, orange `#E4631F`, + supporting warm neutrals, a muted teal + a dusty red for accents/tape. Dark artist = warm charcoal `#1C1813`, orange `#FF8A4C`.
- Analyst: ink navy base, graph-line blue, pen-blue `#2B4C6F`, teal/cyan data accent, amber for "warning/highlight" stats, off-white text. (Analyst is dark-first.)
- Each world uses `data-mode` + `data-theme` scoping already in place.

**Type:** Fraunces 900 (artist display) / Space Grotesk (analyst display) · Caveat (hand) · Inter (body) · JetBrains Mono (labels, data, terminal). Contextual sizing — not one giant generic hero size on every page.

**Explicit anti-clichés (locked):** no purple gradients, no decorative blobs, no card-inside-card, no vague "I build beautiful experiences" hero copy, no stock-atmosphere filler. Assets carry real subject matter (his photos, his data).

**Asset generation — Google Flow (`flow` MCP).** Custom imagery (duotone football/player cutouts, Messi-story illustrated frames, character portraits, Hostel Radio scenes, texture/grain, decorative cutouts) is generated via Flow (Veo/Imagen). **Still images + characters = 0 credits (free) → use freely.** **Animated clips = Veo credits (~10–100 each, Tuhin's Google AI credits) → only where cinematic payoff justifies (e.g. Messi-story stingers, hero accents), and only with Tuhin's OK per batch.** Keep a consistent look via Flow `flow_character` (reusable on-model characters) + `reference_previous`. Real photos/data still outrank generated art where they exist; generated assets fill the gaps + stylized cutouts.

---

## 2. Global motion system (high, scroll-driven)

Built on `motion/react` (already in stack). First implementation task = a **motion-tokens module** (durations, easings, springs, distances) + a **`useSafeMotion` reduced-motion hook** so nothing is hand-numbered (per `motion-foundations`/`motion-patterns`).

**Motion vocabulary used site-wide:**
1. **Scroll reveals** — content enters with `whileInView` + `viewport={{ once:true, margin:"-80px" }}`, staggered 0.06–0.08s. Taped objects "slap" in with a tiny rotate+settle.
2. **Scroll-linked (scrubbed)** — `useScroll` + `useTransform` for parallax layers (photo moves slower than caption), progress rails, a "develop" effect (photos fade from blank→exposed as they enter), counters/meters that fill tied to scroll.
3. **Pinned story sections** — 1–2 per content-heavy page: a specimen pins while captions/steps advance beside it (e.g. analyst "reactor → regression" lineage; artist gallery featured shot).
4. **Page + world transitions** — `AnimatePresence mode="wait"`. Intra-world nav = quick paper-slide/cross-fade. Cross-world (artist⇄analyst) = the signature eclipse/curtain wipe already on the hero.
5. **Micro-interactions** — hover lift on taped objects (single-object, not group drift — the bug already fixed), button press springs, link underlines drawing in, tape peel on hover.
6. **Live-data motion** — new Spotify track cross-fades in; Barça countdown ticks; numbers roll up when scrolled into view.

**Hard motion rules (from `motion-patterns`):** every conditional render wrapped in `AnimatePresence` with a `key` + `exit`; reveals `once:true` (no re-fire on scroll-out); stagger capped 0.10s; `layout` only on small isolated shifts; **everything degrades to instant/opacity under `prefers-reduced-motion`**; 60fps budget — transform/opacity only, no layout thrash.

---

## 2B. Narrative spine, easter eggs & cinematic layer  ← the "why it's not generic" layer

### The spine — "THE EXPERIMENT"
The whole site is one lab notebook documenting a single reaction: **a chemical engineer turning himself into a data mind without killing the artist.** "Molecules → Metrics" is the reaction equation. The artist and analyst are not two people — they're **the same negative developed in two baths** (the hero's double-exposure *is* the thesis, extended site-wide). The eclipse toggle = changing the light you observe the sample under. Every page is a logged **FIG.0X** entry in the notebook.

**Recurring motifs that thread all 13 pages (the "connection" you asked for):**
- **The reaction arrow `→`** — one morphing glyph that re-skins per context: molecule→chart, film→frame, question→decision, cross→goal. Doubles as the scroll-progress indicator.
- **Specimen log** — each page stamped `FIG.0X`, timestamp, Goa coordinates (15.49°N, 73.82°E) in the margin. The site feels *catalogued*.
- **Bleed-through** — each world faintly shows the other: a regression line ghosted behind an artist photo; an xG curve under the Barça crest; a film-sprocket edge on an analyst chart. Proof the two halves are one.
- **The catalyst colour** — orange never fully leaves. It persists as the one warm accent inside the cold analyst world. The artist is always in the room.

### Easter eggs (delight, discoverable, never blocking)
- **Total eclipse** — click the eclipse toggle ×5 → screen darkens, a corona flares, his data points rise as a constellation, then dawn. One-time per session.
- **`goal`** typed on the Barça page → vox "GOOOAL!" lower-third, garnet confetti, crowd-roar (opt-in sound).
- **Konami code** → the hero portrait rapidly "develops" through all its exposures.
- **Footer molecule** — hover → it reacts into a tiny bar chart (molecules→metrics, literalised).
- **Album-driven accent** — Spotify now-playing's dominant colour subtly re-tints the live accent (real-signal, ties to "mood from a real signal").
- **Margin whispers** — click a page's `FIG.0X` → a hand-scrawled aside in his voice unfolds.
All eggs: keyboard/`prefers-reduced-motion` safe, never trap focus, never autoplay sound.

### Cinematic / vox / motion-graphics treatment (per domain — used deliberately, not everywhere)
- **Barça = broadcast.** Score bug, lower-thirds, ticker, stadium ambience (opt-in), vox commentary line, slow-mo replay wipes.
- **About = title sequence.** Kinetic typography; his name assembles like film credits over the double-exposure.
- **Analyst cases = data documentary.** Terminal types, charts plot *live* (line-draw), KPIs scrub up as counters.
- **Transitions:** developing-photo dissolve + light-leak between artist pages; pen-plot / scanline wipe between analyst pages; the eclipse circular-wipe stays for cross-world.
- **Texture film:** grain + halation on artist; faint scanline/plotter on analyst.
- **Sound:** always opt-in, muted by default, one persistent tiny sound toggle; never autoplay; reduced-motion also dampens sound cues.
Tooling: `motion-advanced` (SVG draw, text/char reveal, counters, imperative sequencing) + `motion-patterns` for the above; consider the `remotion`/`tasteforge-video` skills only if we pre-render any true video stingers (optional, phase-2).

---

## 3. Global chrome

- **Top nav (`WorldLayout`)** 🟢 — brand `TUHIN./ARTIST` or `/ANALYST`, section NavLinks, **world-switch pill** (THE ARTIST / THE ANALYST), **eclipse** light/dark toggle (sun↔crescent + circular wipe), mobile hamburger. Sticky, condenses on scroll.
- **Footer** 🟢 — copyright, cross-world enter link, socials. Per-world themed.
- **Live-data contracts** (Vite proxies `/api` → Python `127.0.0.1:5195`; secrets stay server-side):
  - **Backend owns everything (locked):** the Python API does all fetching, scraping, calculation + caching; the frontend only ever calls `/api/*`, never a third party (no CORS, no client-side blocks). Scrapes are scheduled server-side + cached (never on page load) → won't get rate-limited/blocked.
  - `GET /api/now-playing` 🟢 — Spotify last/now played.
  - `GET /api/barca` 🟢 — last result + next fixture + countdown.
  - `GET /api/frames` 🟢 — rotating gallery photo list (local fallback).
  - `GET /api/github` `[NEW]` — commits/repos/langs/streak (live readout on analyst **Home**).
  - `GET /api/medium` `[NEW]` — Medium RSS proxy (cached) for Field Notes.
  - `GET /api/football/{season,player/<id>,compare,messi,news}` `[NEW]` — football room; sources football-data.org + FBref(`soccerdata`, cached) + Transfermarkt CSVs + StatsBomb 20-21 + curated Messi JSON; all cached in `football_karma.db`.
  - `POST /api/contact` `[NEW]` — contact form → email (backend A, §6).
  - **Confidentiality rule (global):** mask ALL client/company names and hide any explicitly confidential data — InfoLeap/Royal Enfield → "a major motorcycle brand" (no raw figures), SUJAN/Celebal → "enterprise hospitality client" (no figures, redacted visuals). Show method + skill, never protected data.
- **Accessibility/responsive baseline (every page):** keyboard-navigable, focus-visible, alt text on photos, `aria` on controls/modals, color-contrast AA, reduced-motion honored, mobile = collage restacks to a single legible column (tilts flatten, overlaps unstack) — stable dimensions, no overflow.
- **No invented personal facts (hard rule).** Nothing about Tuhin's life — hobbies, sports, books, camera, "why Barça", KPIs — is ever fabricated or assumed. Every such item lives in §9 `[NEED FROM TUHIN]` and stays blank/placeholder until he supplies it. (The old `live-upgrade` site's fictional "badminton/trophies/technical-documentation" content is **not** a source.)

### 3.1 Hosting & live-update architecture (Netlify + GitHub)
**Target:** push to GitHub → **Netlify auto-builds + deploys** the static React app → every viewer sees the latest. The catch: Netlify serves **static only** — the Python `5195` server can't run there. So data is split by cadence:

| Data | Cadence | How it works in prod |
|---|---|---|
| Football season/charts, GitHub stats, Medium posts | slow (hrs/post-match) | **GitHub Action cron** runs the Python pipeline → writes JSON snapshots to `web/public/data/*.json` → committed → baked into the static build. No live server. Always fresh-ish, robust, free. |
| Spotify now-playing, music search/lyrics, football news, contact POST | per-request (live) | **Netlify Functions** (small serverless TS endpoints, secrets in Netlify env vars) serve the same `/api/*` paths. One platform, free tier, nothing to keep awake. |

- **Dev stays as-is:** local Python `5195` + Vite proxy; prod swaps those endpoints to Netlify Functions / baked JSON behind the same `/api/*` contract, so page code never changes.
- **Secrets** (Spotify/YouTube/football/email keys) live in Netlify env vars + GitHub Action secrets — never in the repo, never through tooling.
- **Alt (if we'd rather keep Python whole):** host the FastAPI server on Render/Fly/HF-Space free tier; frontend calls it via `VITE_API_BASE`. Simpler code reuse, but a 2nd deploy that cold-starts on free tier. → **Decision in §7.**

### 3.2 The hero (`/`) — signature portrait interaction 🟢→rework (Tuhin 2026-10-13)
**One portrait, never two.** Current bug: the parallax drift renders a **second ghost copy of the face** → reads as two overlapping images. Fix: a **single** portrait layer, no twin/drift duplicate. The "developed in two baths / double-exposure" thesis is now carried by the **hover reveal + eclipse recolor**, not by stacking two photos.

**Hover-the-image reveal (both artist + analyst sides):**
- Hover **on the portrait itself** (not on any card) → the collage **cards scatter outward/off the face** and the **whole screen desaturates to monochrome — except the portrait, which stays in full color** (spotlight). The face is the only colored thing → it gets noticed.
- Leave hover → cards **settle back down** over the image, color returns to the whole scene.
- "Monochrome" = true B&W if it reads well, else a **monochromatic desaturate/duotone** (per side's accent) — whichever makes the portrait pop more; decide in build QA.
- Cards scatter *away from*, never *across*, the face (respects the "overlap for depth, never collide" rule). Pointer-move does **not** add a ghost copy.

**Motion:** cards use spring stagger out/in (`motion` layout + transforms, not the old global mousemove parallax that caused the ghost); scene desaturation = CSS `filter: grayscale()` crossfade on everything except the portrait node; reduced-motion → instant desaturate, no scatter travel. Touch (no hover) → tap toggles the reveal.

---

## 4. ARTIST WORLD — 7 pages

### 4.1 `/artist` — Home 🟢→enhance
**Purpose:** artist landing + hub to the four channels.
**Now:** hero echo + Barça card, "Dispatches" 4 cards (Gallery/Sound/Matchday/Field Notes).
**Scope upgrades:** turn the 4 flush cards into a **taped-clippings board** (varied sizes, tilts, overlaps, tape). Each channel card pulls a **live preview** (Sound shows current track art; Matchday shows live countdown; Gallery shows newest frame; Field Notes shows latest note title). Big specimen portrait off to one side.
**Interactions:** hover = tape-peel + lift; click = paper-slide to that channel. Live previews refresh on an interval.
**Motion:** staggered slap-in of clippings on load; portrait parallax on scroll; live track crossfade.
**Data:** reuses existing feeds. `[NEED]` Instagram/Pinterest/Spotify URLs for the "elsewhere" strip.

### 4.2 `/artist/gallery` — The Gallery 🟢→enhance
**Purpose:** his photography, Goa + travels.
**Now:** masonry frames + lightbox, numbered, auto-detects frames folder.
**Scope upgrades:** **editorial contact-sheet** feel — varied frame sizes, a few "taped" standouts breaking the grid, film-strip edge marks, handwritten captions/locations per shot. One **pinned featured shot** that holds while its story-caption scrolls. "Develop" reveal (blank→exposed) as frames enter.
**Interactions:** click frame → **lightbox** (full image, caption, location, frame no., prev/next, keyboard + swipe, Esc, focus-trapped). Optional filter chips by place/roll.
**Motion:** develop-on-scroll, pinned featured, lightbox shared-element (`layoutId`) zoom from thumb.
**Data:** photos already feeding. `[NEED]` captions/locations per shot (or auto `IMG_xx`), camera + film stock for the film-strip cred line.

### 4.3 `/artist/sound` — Sound 🔴 ⭐ TWO modes behind a toggle · own near-black sub-theme
**A toggle at the top switches two halves of the same room:**
- **MODE A — "ME" (My Sound, analytics):** data that *defines Tuhin through music* — his own Spotify history + what he's on now. Theme = **his field-notebook theme × Spotify brand** (paper/orange warmth + Spotify green `#1DB954`, real Spotify logo/icons, proper adjusted album imagery, mono/duotone where it needs calm). Creative + intuitive reads, not a raw stats dump.
- **MODE B — "HOSTEL RADIO":** the aesthetic-scenario radio + black-void search player (his real project, below).

Toggle = a physical "tuner" / band-switch metaphor (AM↔FM), animated; deep-links `?mode=me|radio`; remembers last choice.

---

#### MODE A — "ME" · Spotify analytics 🔴
**Purpose:** who he is, told in listening data — the over-thinker's soundtrack, measured (ties artist→analyst wittily right here on the artist side).
**Sections (creative, not a dashboard):**
1. **On now / last played** — big album specimen (adjusted art), track/artist, "x min ago", live from `/api/now-playing`.
2. **Top artists / tracks** — short vs 6-month vs all-time, as a hand-annotated "chart rundown" (ranked strip, album thumbs, movement arrows).
3. **The sound of me** — audio-features portrait: energy/valence/danceability/tempo as a radar or "mood weather" — a witty self-read ("mostly melancholic mid-tempo at 1 AM").
4. **Listening patterns** — by hour/day/season from his **Spotify data export** (he has one in the KARMA vault) → a heatmap / "when I listen" clock; genres-over-time.
5. **Eras / obsessions** — songs he looped to death per period; a tiny "wrapped"-style story.
6. Spotify profile out-link (real logo).
**Theme/brand:** Spotify green as the accent *inside* the paper world — co-branded lockup, official Spotify glyph, album art color-sampled for section tints; keep it tasteful (Spotify brand rules: logo not altered, no implied endorsement).
**Motion:** rundown bars fill on scroll; radar line-draw; heatmap cells stagger; album crossfade on track change. Reduced-motion safe.
**Backend:** `GET /api/spotify/stats` (his OAuth refresh-token server-side → top artists/tracks/audio-features/recently-played) + a baked JSON from his **extended streaming-history export** for lifetime patterns (the live API only exposes ~50 recent plays + top lists). Keys/token never client-side.
**Data:** `[NEED]` confirm use of his Spotify data export (path in KARMA vault) for lifetime stats · Spotify profile URL · OK to show genres/top-artists publicly.

---

#### MODE B — HOSTEL RADIO
**This is a real shipped project, not a new invention.** `D:\antigravity project\Hostel Days\` = **"Hostel Radio"** — a single-page *aesthetic-scenario radio* (saloon.wtf / roadways.wtf genre): an always-on radio for Indian hostel night-life. TanStack Start + React + Tailwind v4 + shadcn + Supabase Realtime + Lovable. **Concept = strong + original + personal** ("made for hostel boys, by a hostel boy"): 5 "rooms" (2 AM Corridor / Mess Line / Exam Night / Sunday Laundry+Cricket / Power Cut Jam) + "Apna Gana Bajao" custom; tap a room → **scene photo + music + 6-var palette all swap**; live **"🟢 N log jaag rahe hain" presence counter** (Supabase); rotating Hinglish one-liners; viral modals (Hostel ID, Notice Board, Proxy Invite), Maggi timer, Nokia-1100 modal; disciplined black-canvas + 3-glass-surface UI, zero-scroll 100svh.

**In the portfolio** it becomes the artist **Sound page** = both a *fun playable artifact* **and** a real build credential. Keep it as its own deploy too; the portfolio page showcases + embeds it (decision: embed a live "room" vs link out — §7).

**Live judged 2026-10-13 (ran on `:8080`):** room→scene photo + music + 6-var palette swap works beautifully (corridor warm → mess daylight → freq 93.5↔98.3, Hinglish line + track all change). The **AUX / "Apna Gaana" mode already *is* his black-void search vision** — source chips (All/YouTube/Spotify), "YouTube videos stream in the background", paste-any-URL — it's **wired but unkeyed** (`0 results… requires SPOTIFY_CLIENT_ID & YOUTUBE_API_KEY in .env`). So the mechanic exists; it needs keys + the LRCLIB lyrics mode finished. **BUT the UI reads generic/AI-made** (Tuhin, verbatim: "very very very AI generated") — the shadcn floating **glass card + pill chips + centered search box** = templated Lovable look. The center `.player-widget` + Spotify embed strip render as an **empty black box** (fragile).

**Re-craft mandate (the real work here):** keep the concept + systems, **replace the generic shadcn-glass skin with crafted character** — no floating glass card, no pill row; instead **tactile radio/cassette hardware, broadcast lower-thirds, film grain, hand-lettering, condensed type**, tuned into the portfolio's field-notebook world. This is the "finished with utmost care, not AI-looking" bar.

**What Tuhin wants changed (his critique = exactly its own open roadmap):**
- ❌ center `.player-widget` glass card too busy · ❌ `.playlist-popup` + compact Spotify embed strip = clutter · ❌ the Spotify/YouTube link bit done wrong.
- ✅ Its unchecked roadmap already is the fix: *"replace Spotify embeds w/ queued YouTube playback + keep Spotify save links"*, *"YouTube song search + full-screen video takeover + live LRCLIB lyrics mode"*, *"ambience sound layer per room"*. **We finish those + add the black-void search player below — with utmost care/perfection.** Keep the room/scene/palette system, presence counter, Hinglish, ambience, viral modals (as easter eggs). Strip the busy center card + playlist popup.

**The new core flow (one screen, three states):**
1. **Idle — "powered off."** Full near-black void. Center: one **search field + blinking cursor**, nothing else. A ghost of the last-played track sits faint behind it (from `/api/now-playing`). Hint line in Caveat: *"type a song."*
2. **Searching.** As he types, **autosuggestions appear as single lines** — `Track — Artist` with a **YouTube glyph** and a **Spotify glyph** at the right of each row. Keyboard up/down + enter; no cards, no clutter. (Unified: query both sources server-side, merge, dedupe.)
3. **Playing** — two cinematic modes by which glyph is picked:
   - **▶ YouTube** → the **video plays fullscreen in the background, dimmed/blurred/desaturated with grain + vignette** (ambient, not foreground). Minimal overlay: big Fraunces title + artist, a thin scrubber, a dim "exit" — the song *is* the page.
   - **▶ Spotify** → screen goes **fully black → album-art palette sampled → synced lyrics fill the screen** (karaoke highlight, line-by-line), **background + type colored from the album art** so each song repaints the room. Album art as a small specimen corner.

**Honest capability split (flag — decide at build):**
- **YouTube** = real full playback via the IFrame Player API (any public video, free). Background-faded treatment works fully. Search needs a YouTube Data API key (server-side; ~quota-limited → cache + debounce).
- **Spotify** = search + metadata via Spotify API (server-side client-credentials token) ✓. **But Spotify has no public lyrics API and full in-browser playback needs each visitor's own Spotify **Premium** login (Web Playback SDK)** — not viable for public viewers. So the Spotify mode = **synced lyrics via `lrclib.net`** (free, no key; Genius fallback) + **album-art color** + a **30 s `preview_url`** when the track has one, else a **"open in Spotify" deep-link**. (Optional phase-2 power feature: a "connect Spotify" button that *does* give full playback to a visitor who is Premium + logs in.)

**Interactions:** type→suggest (debounced); pick glyph→enter mode; Esc / "power off" → back to the black void; palette recolor animates. Easter egg: idle long enough → a faint FM-static shimmer + a scribbled "still here."
**Motion:** void→play as a lights-dim / lens-focus transition; lyrics karaoke highlight synced to LRC timestamps; palette crossfade on track change; YT background slow ken-burns drift. Reduced-motion → no blur/drift, instant swaps.
**Backend:** all server-side via `/api/music/*` (keys never client-side): `GET /api/music/search?q=` (merged YT+Spotify), `GET /api/music/lyrics?track&artist` (lrclib→Genius), `GET /api/music/preview?spotifyId`. `/api/now-playing` 🟢 feeds the idle ghost.
**Hostel Radio systems to keep:** per-room scene/palette swap, Supabase presence counter, Hinglish rotators, ambience layer (fan hum/thali/study murmur/cricket/torch flicker), viral modals as easter eggs. The black-void search player becomes the "Apna Gana Bajao" / custom mode, promoted to the hero interaction.
**Data:** `[NEED]` **embed a live room vs link to full Hostel Radio site?** · Spotify **profile URL** · YouTube Data API key available? (gates YT search) · OK to use `lrclib.net` lyrics · phase-2 "connect Spotify for full playback" or skip · its Supabase project creds stay in that repo's `.env` (never moved).

### 4.4 `/artist/football/*` — "THE FOOTBALL ROOM" 🔴 ⭐⭐ centerpiece · own sub-theme · 5 views
**Origin-story hook:** *"I came to football through Messi, then tried to measure why he was different — that's how I fell into data."* The clearest artist↔analyst fusion on the site, and the **flagship analyst case study**. Built on Tuhin's real Barcelona Analytics pipeline (`D:\football data-analysis\` — FBref/StatsBomb/Transfermarkt → `football_karma.db` → xG/xA/xT + rolling-form + valuation engine) scaled into a living, opinionated football desk.

**Own sub-theme:** broadcast + blaugrana (garnet `#A50044` + blau `#004D98` + gold, Camp Nou night), condensed sport type for scorelines, broadcast grammar (score bug, lower-thirds, ticker) over the taped-notebook base. **Imagery:** mixed — real CC/Wikipedia where safe, illustrated duotone cutouts elsewhere (I source/generate + manage licensing).

**Backend (locked):** the **Python API owns all data + calculation**; the frontend only ever hits `/api/football/*` (never third parties → no CORS, no client blocks). Scrapes run **scheduled server-side (post-match), cached** in `football_karma.db`. **"Live" = current-season, updated ~24–48h after each match** (realistic free; not minute-by-minute).

**The 5 views:**
1. **`/artist/football` — Hub.** Broadcast open ("It started with one player"). Live scores/fixtures ticker (Barça highlighted) + optional mainstream football **news wall** (sports RSS, headline+link). Three doors ↓.
2. **`…/season` — This Season (live).** Current-season Barça only: form rating, xG for/against, table position, top performers, board-level verdict. Real `report_charts/*` where they fit. Updated post-match.
3. **`…/lab` — Player Lab.** Search/pick **any player** → creative animated stat card: radar, per-90 bars, role, rolling form (last 5/10), Transfermarkt value trajectory, image. From the DB else cached FBref scrape.
4. **`…/vs-messi` — Compare vs Messi.** Pick any player + season vs **Messi any season** (2004-05→2020-21, or whole career). Radar overlay, per-metric bars, a playful **"distance-from-Messi" meter** + verdict. Advanced metrics where both have data (~2017+); basic (G/A/apps) full career.
5. **`…/messi` — The Messi Story.** ⭐ Standalone scrollytelling **masterpiece**: Rosario → La Masia (growth-hormone) → debut → 6 Ballons d'Or → Argentina heartbreak → Copa 2021 → **World Cup 2022** → Inter Miami. Each act = a cinematic chapter with its own stat reveal (goals-per-season climb, trophy constellation, the WC-2022 run map, a "life in numbers" heatmap). Kinetic type, pinned parallax chapters, counters, broadcast/vox. Full-career basic stats + advanced where public.

**Interactions:** hub door picks; player search/pick (`layoutId` card morph); season/compare toggles; `goal` easter egg (confetti+vox); charts/counters reveal on scroll; source links out.
**Motion:** broadcast lower-thirds/score-bug, stat waves scrubbed via `useScroll`, radar line-draw, Messi-story pinned chapters, replay-wipes. (`motion-advanced` for SVG/counters; optional `remotion` pre-rendered stingers for the Messi acts.)
**API/data:** `/api/football/season`, `/api/football/player/<id>`, `/api/football/compare?a&b&seasons`, `/api/football/messi`, `/api/football/news`. Sources: football-data.org (live scores, wired) + FBref via `soccerdata` (season stats, cached) + his Transfermarkt CSVs + StatsBomb 20-21 + a **curated Messi-career JSON** (full-career basic stats). `[NEED]` default featured players for the Lab · confirm which `report_charts/*` are publishable · any Messi numbers you want to hand-curate.
**Phasing:** data views (Season → Lab → vs-Messi) first (reuse pipeline); **Messi Story as its own focused masterpiece build**.

### 4.5 `/artist/notes` — Field Notes 🔴
**Purpose:** margin-scribble blog — what he's reading, thinking, chasing.
**Sections:** (1) **Note index** as a stack of taped index-cards / torn-paper entries (date, title, 1-line). (2) **Reading now** shelf — current book(s) with cover + a scribbled take. (3) Entry view: click a card → expands (or routes) to the full note, typeset as a notebook page with Caveat margin marks.
**Interactions:** card click → expand (`layout`/`layoutId`) into full note; tags filter; "reading" covers hover → blurb.
**Motion:** cards slap/stagger; expand animates in place; margin marks draw-on.
**Medium:** his **Medium account** is the real writing feed — pull/syndicate recent posts (title, date, excerpt, cover) and link out; local notes + Medium posts share the same card stack. (Fetch via Medium RSS `https://medium.com/feed/@handle` through a small `/api/medium` proxy, cached.)
**Data:** `[NEED]` **Medium profile URL/handle** · current book(s) · any local-only notes. Content model: Medium feed + optional local MD/JSON for notebook-only scribbles (recommend, so he can append).

### 4.6 `/artist/about` — About 🔴
**Purpose:** the person. Identity centerpiece of the artist side.
**Sections (scrollytelling):** (1) **Big portrait specimen** + name + one true line. (2) **The arc** — chem-eng (Jadavpur) → data (GIM/InfoLeap) → camera → Goa, told as a pinned timeline with taped artifacts (a reactor sketch, a spreadsheet, a photo, a Barça crest) handing off down the scroll. (3) **Who he is off the clock** — over-thinker, night owl, gym, film shooter (pull the hero's mood signals). (4) **What he's chasing** (goals, open to data roles). (5) Soft bridge button → "See the analyst."
**Interactions:** scroll drives the arc; artifacts hover → captions; portrait parallax/double-exposure.
**Motion:** pinned timeline with scrubbed artifact handoff; text reveals; double-exposure drift.
**Data:** `[NEED]` a few personal truths beyond the known bio (3–5 lines in his voice); confirm the arc facts.

### 4.7 `/artist/contact` — Contact 🔴
**Purpose:** reach him (artist-side framing).
**Sections:** (1) **Working form** (name, email, message) themed as a torn notebook page / postcard. (2) Direct links — email, LinkedIn, Instagram, Pinterest, Spotify. (3) "Where I am" — Goa, IST, availability line.
**Interactions:** submit → `POST /api/contact` → success state (stamp/"sent" animation) + error handling (inline, never silent). Validation at boundary.
**Motion:** field focus lifts; submit = postcard "mails" out; success stamp.
**Data:** `[NEED]` public email to use (default `tuhin.gim@gmail.com`?), social URLs, availability line. `[NEW]` `/api/contact` backend (see §6).

---

## 5. ANALYST WORLD — 6 pages (Dashboard dropped)

### 5.1 `/analyst` — Home 🟢→enhance
**Purpose:** analyst landing + hub; "chemical engineer who learned to ship analysis."
**Now:** terminal `whoami` + KPI tiles (Domains:2, trajectory) + "Modules" 4 cards.
**Scope upgrades:** keep terminal specimen; turn Modules into an **instrument-panel collage** (offset tiles, graph-paper, annotation callouts) not a flush grid. Live mini-readouts on tiles (e.g. latest GitHub commit, current "open to roles" status). Keep the evidence-first, quiet-but-alive tone (design-direction: dense/scannable for the "tool" half).
**Interactions:** tile hover = readout detail; click → section with pen-slide transition.
**Motion:** terminal types in on load; sparkline draws; tiles stagger; counters roll on scroll.
**Data:** `[NEED]` real numbers for tiles; `/api/github` for live commit `[NEW]`.

### 5.2 `/analyst/skills` — Skills, instrumented 🟢→enhance
**Purpose:** transferable rigour as honest self-rated meters (no logo wall).
**Now:** 3 meter cards (Data/Rigour/Tooling) + "how lineage transfers."
**Scope upgrades:** meters **fill on scroll** (scrubbed), each with a one-line evidence note. Deepen the **"reactor → regression" lineage** into a **pinned diagram**: mass-balance/bottleneck concepts on the left morph into their data analogues on the right as you scroll (the thesis of the whole analyst side). Annotation callouts in the margins.
**Interactions:** meter hover → "where I use this" tooltip; lineage nodes hover → analogy detail.
**Motion:** scrubbed meter fill; pinned lineage morph (SVG); callout draw-on.
**Data:** `[NEED]` confirm the self-ratings are to taste; evidence one-liners per skill.

### 5.3 `/analyst/work` — Case Studies 🟡→expand
**Purpose:** real work, problem→approach→result, numbers that moved.
**Now:** InfoLeap case (narrative + KPI tiles).
**Scope upgrades:** a **case index** (taped dossier tabs), each opening a full case. Cases (all real, mostly linkable):
- **Barcelona Football Analytics System** ⭐ — self-driven "living intelligence" pipeline: FBref/StatsBomb/Transfermarkt → DuckDB → xG/xA/xT + rolling-form + valuation/contract-warning engine, Power BI + Streamlit. Shows initiative + end-to-end data engineering. **Cross-world proof:** it also powers the artist Barça desk (§4.4). Real charts available.
- **InfoLeap — motorcycle-brand MIS** — ⚠️ MASKED: on-site name it "a major motorcycle brand", **no raw research figures/segment data shown** — method only (Streamlit MIS: acceptor/rejector/booked-cancelled segment analytics, significance testing, 4-level netting taxonomy). Decide whether to link the public GitHub repo (its name reveals the client) or keep it unlinked/private.
- **InfoLeap — raw exports → decision view** 🟢 — the current lead case (keep).
- **Customer Lifetime Value (IBM)** — 9,134 customers × 24 variables, XGBoost prediction + segmentation, shipped as an interactive story site + predictor tool. (GitHub `CLV_IBM-project` + **live Netlify demo** → link out.)
- **SUJAN P&L (Celebal, Power BI)** — 54-pg, 300+ DAX. **CONFIDENTIAL:** client financials under NDA → show *method/architecture/skill* only, **mask client** ("enterprise hospitality client"), **no real figures** (relative/illustrative deltas, redacted shots), explicit "shown with confidentiality preserved" note.
- **Compact older cards** — Tata quant (XGBoost+FinBERT), Pure Storage KPI, ONGC Hydrogen (ASPEN).
**Each case:** context · problem · approach · result/impact · stack chips · live/GitHub links where they exist · (where allowed) a real chart specimen.
**Interactions:** index tab click → case expands (`layoutId`); KPI tiles roll up on view; chart specimens reveal.
**Motion:** dossier tabs slap-in; case expand; counters; chart draw-on.
**Data:** `[NEED]` real figures for non-confidential cases; confirm masking approach for SUJAN; any shareable (redacted) visuals.

### 5.4 `/analyst/journey` — Journey 🔴
**Purpose:** the chem-eng → analyst path as a timeline.
**Sections:** **pinned vertical timeline / process-flow** (styled like a P&ID or reactor train): Jadavpur Chem-Eng 2019–23 (CGPA 8.32) → projects/certs → GIM Big Data PGDM 2025–27 → InfoLeap (Mar 2026–) → "next: data role". Each node = a station with artifacts + a one-line "what it added."
**Interactions:** scroll advances the flow; node hover/click → detail popover.
**Motion:** scrubbed flow-line draw (SVG path); nodes light up in sequence; artifact reveals.
**Data:** `[NEED]` confirm dates/milestones + any certs (Celebal?), exact GIM/InfoLeap titles.

### 5.5 ~~`/analyst/dashboard`~~ — **DROPPED** ✂️ (Tuhin, 2026-10-13: "not providing any real information")
Removed from the analyst nav (7→**6 analyst pages**, site total **13**). The one genuinely-real signal worth keeping — **live GitHub activity** (commits/repos/langs via `/api/github`) — folds into the **Analyst Home** instrument panel as a live readout, not its own thin page. The listening/Barça "personal data streams" idea lives where it belongs: the Barça desk (§4.4) and the hero.

### 5.6 `/analyst/resume` — Résumé 🔴 · dual-download (Tuhin 2026-10-13)
**Purpose:** scannable résumé, in-world + downloadable — **two ways**.
**The download = a hover-split into two options** (one Download CV control; on hover two choices slide/pop out):
1. **Classic CV** → his **current GIM CV on Google Drive** (official, recruiter-standard PDF — opens/downloads the Drive file).
2. **Modern CV** → a **creatively-built, animated HTML résumé page** — same content as the real CV, rendered as a genius presentable piece (in-world instrument-panel/field-notebook styling, scroll reveals, motion), **print-to-PDF clean**. This is the showpiece; the classic is the safe copy.
**Sections (Modern CV page):** summary, experience, education, skills, projects as an instrument-panel document; content mirrors Journey/Skills/Work (single source where possible). Both options show the **same facts** — only the presentation differs.
**Interactions:** hover Download → two options reveal (keyboard-accessible too); Classic → Drive; Modern → the HTML page (or in-page); print-friendly; section jump-links.
**Motion:** the two-option reveal (spring slide/pop); Modern page section reveals on scroll; restrained — it's still a tool.
**Data:** `[NEED]` **GIM current CV Google Drive link** (for Classic). Modern CV content = the same CV, confirm which source PDF is canonical: currently wired `web/public/Tuhin_Bhattacharya_Resume.pdf` (`…TechConsulting_v5`, 2026-10-09) vs generic `…_v8.pdf` (2026-10-06) vs the GIM CV itself → **the GIM Drive CV should likely be the single source of truth** for both. Confirm figures.

### 5.7 `/analyst/contact` — Contact 🔴
**Purpose:** reach him (analyst framing: "open to data roles").
**Sections:** **working form** themed as a terminal/ticket (name, email, message); direct links (email, LinkedIn, GitHub); availability + location; "what I'm looking for" line.
**Interactions:** submit → `POST /api/contact` → success/error states; validation.
**Motion:** terminal-style field focus; submit = "request sent" log line; success state.
**Data:** shares `/api/contact` + socials with artist contact. `[NEED]` same contact details.

---

## 6. Contact form — backend note
Working form needs a sink. Two options, decide at build:
- **A (recommended, self-hosted):** `POST /api/contact` on the existing Python `5195` server → sends email via the KARMA `.env` creds (no new 3rd-party, no secret leaves the server).
- **B (fastest):** a 3rd-party (Formspree/Web3Forms) — but adds an external dependency + their branding/limits.
Both: honeypot + basic validation + rate-limit; success/error surfaced inline, never silent.

---

## 7. Open decisions to confirm
1. **Hosting model** — Netlify Functions + GitHub-Action snapshots (recommended, one platform) vs keep whole Python API on Render/Fly/HF + `VITE_API_BASE` (§3.1)?
2. **Sound/Radio (Hostel Radio §4.3)** — embed a live room in-page vs link to the full Hostel Radio site? · `lrclib.net` lyrics OK? · YouTube Data API key available (gates YT search)? · phase-2 "connect Spotify for full playback" or skip? · host Hostel Radio where (its own Netlify, or under the portfolio)?
3. **Contact backend** — A (Python/Function `/api/contact`) or B (3rd-party)?
4. **Field Notes content model** — Medium feed + local MD/JSON (recommended) vs Medium-only.
5. **SUJAN masking** — confirm "enterprise hospitality client, no figures, redacted visuals" is safe per your NDA.
6. **Football room** — which players to feature in the Lab? which `report_charts/*` OK to publish? Messi numbers to hand-curate?
7. **Résumé** — GIM current CV **Google Drive link** (for Classic) · which PDF is canonical source for the Modern HTML (GIM CV recommended as single source) vs wired TechConsulting v5 / generic v8.

---

## 8. Build order + skills/plugins toolchain

**Per-page loop (skills/plugins used throughout — Tuhin's standing demand):**
1. **Design** — `frontend-design` + `frontend-design-direction` + `motion-patterns`/`motion-advanced` + `design-taste`; pull references.
2. **Scaffold UI** — **21st-dev (`21st:21st-ui`)** to generate polished React component shells fast, then re-skin into our collage primitives + motion tokens (never ship raw 21st output — adapt to the field-notebook system).
3. **Standards** — **ECC** rules enforced (coding-style, file ≤800 lines, immutability, error handling, security) + ECC reviewers (`react-reviewer`/`typescript-reviewer`/`security-reviewer`) after each page.
4. **Debt gate** — **ponytail** (`reel-crew:ponytail-review` / `ponytail-audit`) on the built code to catch tech debt before sign-off; log + burn down.
5. **QA** — browser-QA all 4 states (artist/analyst × light/dark) + mobile + reduced-motion → Tuhin sign-off.

**Phases:**
**P0 — systems:** motion-tokens module + `useSafeMotion`; collage primitives (Taped, MarginMark, Specimen, Reveal, Pinned); **deploy skeleton** (Netlify + GitHub auto-deploy, `netlify.toml`, Functions dir, GitHub-Action snapshot cron, `VITE_API_BASE` shim); `/api/github` + `/api/contact` + `/api/music/*` endpoints.
**P1 — artist spine:** About → Sound/Radio → Football Room (Season→Lab→vs-Messi, Messi-Story after) → Field Notes → Gallery polish → Home polish.
**P2 — analyst spine:** Case Studies (real set: Barça-analytics/Royal-Enfield/InfoLeap/CLV/SUJAN-masked/compacts) → Journey → Skills polish → Home polish (+ live GitHub readout) → Résumé.
**P3 — contact (both)** → full cross-world QA (light/dark, mobile menu, eclipse, switch, reduced-motion) → sign-off.

---

## 9. [NEED FROM TUHIN] — consolidated data checklist
**Links:** Spotify profile · Pinterest profile · LinkedIn · Instagram · **Medium handle** · GitHub username.
**Hosting:** confirm Netlify + GitHub model (§3.1) · YouTube Data API key available? · OK to use `lrclib.net` for lyrics?
**Sound/Radio:** confirm the black-void search-player vision · phase-2 Spotify full-playback wanted or skip.
**Gallery:** per-photo captions/locations (or auto) · camera body + film stock.
**Matchday / Culé Desk:** which players to feature · confirm which `report_charts/*` are OK to publish · 2–3 "why Barça" lines · watch-ritual line · build live `/api/barca-stats` now or later. (Charts + data already on disk — no fetching needed.)
**Field Notes:** Medium profile URL · current book(s) · any local-only notes.
**About:** 3–5 personal truths in your voice · confirm the chem→data→camera arc facts.
**Analyst numbers:** real KPIs for Home tiles, Skills evidence lines, non-confidential case figures.
**Case studies:** confirm SUJAN masking · any shareable redacted visuals · exact titles.
**Journey:** confirm dates/milestones + certs (Celebal etc.).
**Résumé:** **GIM current CV Google Drive link** (Classic option) · confirm canonical source for the Modern HTML CV (GIM CV rec. as single source) vs wired TechConsulting v5 / generic v8 · confirm figures.
**Contact:** public email to use · availability line · form backend choice (A/B).
**Case studies:** add live/GitHub links for Royal Enfield MIS + CLV (Netlify) + confirm SUJAN masking.
