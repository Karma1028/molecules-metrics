# Bold proposals: what to change, and why (2026-10-30)

Status: PROPOSAL ONLY. Nothing here is built. Per the standing rule (see CHECKPOINT: concept rejected 2026-10-05), Tuhin approves before any build.
Method: walked every route in both worlds in the dev build, read the Flow kit sheets (`story-art/kit-*`), `ASSET-PLAN.md`, the prior idea lists, and 2 outside searches. Skills used: `verify-live-site-before-redesign`, `frontend-design-direction`, `motion-patterns` (house tokens, not the skill's defaults), plus one Haiku agent for the Flow-session summary.

## 1. Who is looking, and what they need in 60 seconds

| Visitor | Arrives from | Needs first | Does the site give it today? |
|---|---|---|---|
| Hiring manager / recruiter (primary) | LinkedIn, résumé PDF, a DM link | Role, proof, one real number, résumé, email | Partly. Proof is strong (Scorecard) but sits 5th in a nav. The landing asks them to choose "Karma / Tuhin" and "Artist / Analyst" before they know what any of it means. |
| Case-comp / design peers | Link shared in a team chat | Taste, craft, one memorable thing | Yes, this is where the site is strongest. |
| Photography / football people | Instagram | Photos, Barça, the playlist | Yes, but empty states hurt (see 2). |

Core tension: the site is built for the second and third groups; the job outcome depends on the first.

## 2. What is wrong right now (fix before any big build)

1. **P0: deep links to analyst pages can show a blank cream page.** Loading `/analyst/work` directly (fresh load) gave `html` dark, `body` background cream `rgb(236,226,208)`, text light `rgb(220,230,236)`: light text on paper, nothing readable. `/analyst/dashboard` rendered fine on one load and blank on another, so it is intermittent. A recruiter clicking a deep link is exactly this case. Dev build only so far: confirm on the Netlify build, then fix (body background not following `data-theme` on first paint; last commit touched landing-to-world theme hand-off, start there).
2. **Gallery first impression is an empty grey frame** ("lantern bokeh", 01/33) and a contact sheet of empty cells. Probably lazy loading in dev. Check production; if real, show a low-res blur-up instead of grey.
3. **Matchday reads as broken when feeds are down**: "Waiting on the live league table…", "Headlines loaded from the live football feed" with nothing under them. Needs designed offline states using the baked snapshot, labelled "last updated".
4. **First paint is slow to settle** (4-5 s of fading before content in dev; prod LCP 3.0 s). A visitor on a phone sees a cream screen for a while.
5. **Naming**: "Karma / Tuhin" toggle and "The Artist / The Analyst" mean different things to a stranger. One label system.

## 3. What the Flow work gives us

`story-art/` holds 5 looks of one cast (Tuhin + the Bankura terracotta horse): GHIBLI, SYSTEM, SOLO, NORTHERN, PAT, each with turn sheets (front/3q/side/back), action poses and a pair sheet, all on magenta key. Honest read of the sheets:
- **GHIBLI is the strongest**: warm, consistent faces, same horse, reads instantly as "Goa golden hour". Best for the Artist world.
- **SYSTEM works for the Analyst world**, but the teal glow halo and the Gemini sparkle watermark (bottom right) must be removed in the cut.
- **PAT is gorgeous but a different horse**: flat folk outlines, painted ornament, face slightly mule-like. It reads as a different character from the incised-relief horse in the other looks. Use PAT only as the origin/Bankura chapter and say so on purpose, or regenerate the horse from the GHIBLI one.
- **Six looks is too many for one site.** Keep three: PAT (origin), GHIBLI (artist), SYSTEM (analyst). HEAT only inside the football room, SOLO only on Sound, NORTHERN dropped or Journey-only.
- Nothing from the kit is on the live pages yet. It is all magenta sheets. That is the biggest unspent asset.

### 3b. What the earlier Flow session settled (Haiku agent, partial read of the transcript)
- Concept as agreed: chapter-book origin quest, Pat x manga. **Tuhin is the protagonist, the horse is the companion, never the other way round** (Tuhin: "I will be the protagonist with a horse companion, it can't be a horse protagonist"). Bets 1 and 3 below are written to that rule: Tuhin leads, the horse follows.
- Status on disk: GHIBLI K1-K6, SYSTEM K1-K8, NORTHERN anchor+K1-K6 (K6 armour varies between panels), SOLO anchor+K1-K6 (sheets partial, never approved), **PAT only K1 (+alt)**, **HEAT has no folder on disk** although the plan says K1-K6 done. No look-level approval from Tuhin was found.
- Not started: gallop cycles, parallax scene plates, firefly sprites, props, textures. Same-man/same-horse consistency was never checked at full size.
- Tuhin's own complaints to design around: "they are in same orientation, you can't do much with them" (so use the turn sheets and action poses, not one pose repeated); "horse walk is not that polished" (so no gallop-cycle hero moment until a cycle is genuinely good); "new one looks bad and AI generated" (so every cut must pass his eye before it ships, and the first build uses only the strongest look).
- Consequence for scope: Bet 3 starts with GHIBLI + SYSTEM only (both complete). PAT, HEAT and SOLO wait until their sheets exist and are approved.

## 4. The bold changes (ranked)

### Bet 1: "Brief me" — a 45-second guided ride for hiring managers
A single pill on the landing and on every analyst page: **Brief me · 45 s**. Press it and the cast takes over: Tuhin walks the horse across the screen (GHIBLI pair sheet) while the real pages scroll and highlight in order: role line, the Scorecard's 12 months, one case receipt, résumé, email. Captions are real copy from the site; no new claims. Skippable, pausable, reduced motion = a 5-card static strip.
- Why it is bold: turns the two-world maze into a directed film without hiding either world.
- Why it is relevant: it is the only change aimed at the visitor who decides the outcome.
- Companion: `/for/<company>` links whose only change is a line "Prepared for <company>" and Brief me opening automatically. Costs one route.
- Motion: house ease `cubic-bezier(.19,1,.22,1)`, 500-800 ms beats, 26-36 ms stagger (from SYNTHESIS §2b); no new tokens.

### Bet 2: "Audit lens" — every number on the site shows its receipt
The Dashboard already flips a KPI card to its real DAX and lineage. Make that the site's signature: a global **Audit** toggle (analyst nav). On: prose dims, every number gets an orange underline and a hover/tap card with `definition · source · refresh · formula`. Works on Home, Work cases, Matchday, Sound (the vinyl "21,000 minutes" gets its Last.fm/Spotify source).
- Why it is bold: no analyst portfolio makes the reader *audit* the claims. It is proof as an interaction.
- Rule: only numbers that already have a real source; masked client data stays masked. Numbers without a source get no underline, which is itself honest.

### Bet 3: Put the cast on the page: cut-outs, a horse that looks at you, live moods
Run the magenta sheets through one script (chroma key to alpha, webp, ≤120 KB each, per ASSET-PLAN gates) and use them as an in-page character layer:
- **Head-tracking horse**: the 4-view turn sheet (front, 3q left, 3q right, back) swaps by cursor angle. One sprite, zero 3D, the horse follows your pointer. Phone: it follows the scroll direction.
- **Pose swap by real data**: horse mood from live feeds (Barça won, listening now, quiet). Static pose if the feed is down.
- **Pair walk** between pages instead of a generic loader: the loader line already exists; give it the pair.
- Replaces the roaming mascot rather than adding a second one (effect budget: one wow, ≤8 loops).

### Bet 4: One look per room, changed by a real transition
Use the View Transitions API (or the existing route loader) so entering a room changes its look: Landing/Journey start = PAT, Artist = GHIBLI, Analyst = SYSTEM, Matchday = HEAT, Sound = SOLO. The cast stays constant; the lens changes. Shared-element morph for photo → lightbox and nav → page header.
- Guardrail: three core looks plus two single-room ones. If it starts feeling like five websites, cut back to three.

### Bet 5: Case files as film strips, not a ledger
Work currently opens as ledger plus case file. Make each case a pinned scroll: problem → data → model → result, with the chart drawing itself from the real (masked) numbers. Each frame ends with the Audit receipt. One case first (InfoLeap), measured, then the rest.

### Bet 6: Journey as the single quest, one continuous ride
Real places and people are still `[NEED]` from Tuhin (BLOCKED in checkpoint). Once supplied: one horizontal route, the horse carries you leg by leg, look changes at each leg per Bet 4. Do not invent places.

## 5. Small, high-value (under a day each)
- Sticky "Hiring? Résumé · Scorecard · Email" strip on analyst pages (mobile too).
- Offline states for every live feed, labelled with the snapshot time.
- Blur-up placeholders so no frame is ever grey.
- A single labelling system for the two worlds (pick Artist/Analyst, drop Karma/Tuhin or explain once).
- Console letter and darkroom already exist; link them from a "Playroom" footer entry so hiring managers are not asked to find them.

## 6. What I would not do
- Heavy 3D (Bruno Simon 26 and Lusion 40 on Lighthouse; ours is 95). The molecule-to-chart morph was already archived; do not revive it unless Bets 1-3 fail.
- All six looks. Generic AI-looking illustration beyond the cast. Any claim about Tuhin not in his real data (standing rule).

## 7. Order and what I need from Tuhin
1. Fix item 2.1 (blank deep link), 2.2-2.3 empty states. Half a day.
2. Chroma-key script + cut the GHIBLI and SYSTEM pairs. Check with one Haiku contact-sheet review.
3. Bet 3 (cast layer), then Bet 1 (Brief me), then Bet 2 (Audit lens).
4. Bets 4-5 after a review on phone.

Decisions needed: (a) keep three core looks or all five? (b) is PAT horse a deliberate "origin" variant or should it be regenerated to match? (c) go-ahead for Bets 1-3 as the first build.

Outside references (for taste, not copying): Awwwards cursor/page-transition entries; School of Motion's 2026 animation roundup (characters responding to scroll and cursor); Posit Closeread winners for data scrollytelling. Recruiter-facing guides agree on results-first openings.
