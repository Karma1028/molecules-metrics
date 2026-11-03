# Six site flows for LinkedIn + Instagram (ideation, 2026-10-30)

Status: IDEATION. Nothing built. Confirmed with Tuhin: the charts are **Mekko** charts (Marimekko).
Skills used: `superpowers:brainstorming`, `ig-profile` (its rule: a bio link is a door, not a menu, and it must match what the bio promised), `frontend-design-direction`, `motion-patterns`, `dataviz`; earlier docs supply the anatomy, consulting and prologue ideas. No agents this round.

## 1. The two audiences, honestly

| | LinkedIn visitor | Instagram visitor |
|---|---|---|
| Who | Recruiter, hiring manager, analytics/consulting peers, case-comp people | Followers, photo / football / music people, designers |
| Arrives | Desktop at work or phone, link in a post, DM, or the profile | Phone only, inside Instagram's in-app browser, from a bio link or story |
| Attention | 30-90 s, scanning for fit | About 10 s before leaving |
| Wants | Role fit, proof, résumé, how to reach him | Vibe, photos, the horse, "is there more of this" |
| Constraints | Normal browser | No hover, vertical screen, video must be muted + inline, heavy WebGL risky, back button exits to Instagram |
| Leaves when | They cannot tell in 20 s what he does | The first screen is text or a data table |

The two share one thing: both are deciding in seconds whether this person is worth more time. So every flow below has the same shape you described: **(1) a high-animation scroll landing, (2) a fork into two sides, (3) a deeper layer where the data lives.** The flows differ in *what the landing is* and *how the fork works*.

## 2. The rule that ties unlike pages together: reorder, never hide
One site, one set of pages. What changes by audience is **which page leads, what the first line says, and how a page is framed**, not what exists. Every page also gets a **bridge card** to the other world, so the "wrong" page reads as depth, not clutter (the cross-world echo already exists once: Analyst Home mentions what you last watched in the gallery).

| Page | LinkedIn framing | Instagram framing | Bridge to the other side |
|---|---|---|---|
| Gallery | "Eye for detail": the contact-sheet scatter plot (EXIF data) | Lead page | "How I'd analyse my own roll" |
| Sound | "Listening data as a case": 21,000 min, sources shown | Lead page | to the Scorecard |
| Matchday | Football analytics case (xG 2x2, season bridge) | Lead page, live scores | to the football case file |
| Notes | Lead: writing | Secondary | Medium feed |
| Skills (nine-box), Work, Scorecard | Lead | Tucked: "The numbers behind the photos" | "See the work behind it" |
| Résumé | Lead, one tap | Tucked in footer | n/a |
| About, Journey, Contact | Both | Both | both |
| Playroom (darkroom, orbit, kickoff, replay) | Design-peer bonus | Fun lead | n/a |
Tie-in for the KPIs: Instagram visitors never see KPIs as a table; they see the same numbers as the "data behind" a photo, a match or a playlist.

## 3. Entry doors by audience
Following the `ig-profile` rule (one door matching the promise): give each channel its own bio link rather than one generic URL.
- `/li` (LinkedIn) and `/ig` (Instagram), plus `/for/<company>` for applications. All three open the same landing; only the **first beat and the default fork** change.
- Primary signal is the URL (reliable). Optional extra: Instagram's in-app browser and LinkedIn's app announce themselves in the user-agent, used only as a hint. Fallback for everything else: a one-tap "I'm here for: the work / the photos".
- Shared and trackable: add `?s=` source tags only if you want to know which channel works; no tracking beyond that.

## 4. The six flows

Common legend: **L** = LinkedIn view, **I** = Instagram view, "reuse" = what already exists on the site.

### Flow A: The Scroll Film (cinematic prologue, then fork)
Landing: one long scroll-driven film. Opens on the patachitra scroll unrolling (six panels on disk, two new ones for molecules and metrics), seal-break, then the current landing.
Fork: the existing Karma/Tuhin switch at the end, plus a "Hiring? Résumé, Scorecard" pill.
L: first screen states name + role; a "Just the facts" strip; Skip always visible. I: the same film is the vibe; it is already vertical.
Deep: today's two worlds, upgraded (nine-box Skills, KPI driver tree, case files).
Reuse: current landing, worlds, thread device, `data-intro` hook. New: 2 panels, optional 1-2 Flow video loops (horse blink / walk).
Strength: the most cinematic, uses assets already made. Risk: the longest to sit through; hard for a 10-second Instagram visitor.

### Flow B: Two Doors (split-screen entry)
Landing: no prologue. The screen is split in two living doors, **Artist | Analyst** (phone: top and bottom). Each door loops a short Flow clip or animated panel; tap/hover expands a door into a 15-second self-playing mini-brief. The entry URL pre-opens a door (`/ig` opens Artist, `/li` opens Analyst).
Fork: the choice *is* the landing.
L: the Analyst door lands in 5 seconds with role, one real number, Résumé. I: the Artist door is photos and the horse straight away.
Deep: the chosen world; a persistent "Other side" tab keeps the bridge.
Reuse: the two worlds and the switch (it becomes the hero). New: two clips or animated panels; the expand-to-brief motion.
Strength: fastest to meaning; fits both attention spans. Risk: less story; the choice happens before they know what each side holds.

### Flow C: The Case Reel (proof first, person second)
Landing: a 20-second showreel of three case results, each shown as an animated anatomy machine with its real number (CLV mill, verbatim hopper, shot board), ending on "pick a case".
Fork: not "two sides" but "cases, then life". The artist half arrives as the last chapter, "Off the clock".
L: perfect; it is a consulting-style opening. I: weaker; a variant `/ig` swaps the reel for a photo/match reel and puts "Off the clock" first.
Deep: each case file = one machine + one consulting chart (nine-box, 2x2, Mekko, waterfall) + three sourced KPIs + an A4 one-pager. Reuse: Work, Dashboard internals, DAX/lineage flip. New: anatomy figures (about 1 h each for a Figure), case template.
Strength: strongest for hiring; the most differentiated for a data role. Risk: the artist side becomes secondary; needs employer-data clearance.

### Flow D: The Stories Deck (one asset, three surfaces)
Landing: the site opens as a 9:16 story deck, 8 tappable cards: one fact, one Flow image or short loop per card. Tap right/left to move; the last card says "open the full site" and drops into the fork.
Content engine: the *same eight cards* export as (a) an Instagram carousel or story, (b) a LinkedIn "document" post, (c) the site's landing. Make once, post three times, and every post links back to the matching door.
L: the carousel format is native on LinkedIn; recruiters swipe it. I: it is exactly what Instagram users already do.
Deep: the deck's last card opens the two worlds as today. Reuse: your reel/carousel pipeline (reel-crew), prologue panels. New: card template + export script.
Strength: the only flow that also feeds your social posts, so the site and the channels reinforce each other. Risk: the deck can feel shallow if it is the only entry; needs a "see everything" escape.

### Flow E: The Match (football as the narrative frame)
Landing: kickoff. A match clock runs across the top. First half = the Artist side, second half = the Analyst side, full time = contact, stoppage time = extras (playroom). A "highlights reel" jumps to the five best moments.
Fork: halves rather than doors; the visitor can swap ends.
L: the football-analyst angle is a real hook for sports-analytics roles and a memorable frame. I: instantly relatable to the football and Barça audience.
Deep: each "half" is a world; xG, season bridge and 2x2 sit in the Matchday room. Reuse: `/kickoff`, `/replay`, Matchday data, scoreboard idea. New: clock UI and half-time motion.
Strength: personality and a unique spine. Risk: a gimmick for non-football recruiters; the analysis can feel secondary.

### Flow F: The Magazine (issues, with a reason to return)
Landing: a cover (hero image + one headline) that scrolls into a contents page with two sections, **Photo essays** and **Case studies**. The site already says "Issue 01 / Vol.01".
Fork: contents page; readers pick a story, not a "side".
Returning visitors: a new Issue each month (new photo series, new case, new numbers), so Instagram followers have a reason to come back and recruiters see activity.
L: the case studies read as published work. I: photo essays are the lead.
Deep: stories open as long-form pages with data sidebars. Reuse: Notes, Gallery, Work. New: issue system and cover template.
Strength: gives the site a heartbeat and an editorial voice. Risk: a monthly cadence has to be kept up, or it looks stale.

## 5. Modules that plug into any flow
- **Fit Check** (LinkedIn): paste a job description; the page returns a one-sheet where your nine-box lights up the skills with proof and lists the matching cases. Pure keyword matching on the visitor's own text, in the browser, no model call and nothing stored. Only claims drawn from your verified skills and cases.
- **Audit lens**: toggle that shows every number's source and formula.
- **A4 one-pagers** per case (anatomy's print mode).
- **Brief me (45 s)**: the guided ride, usable on the Flow A landing or as a button anywhere.
- **Cast layer**: Tuhin and the horse as an in-page guide using the Flow cut-outs (Tuhin leads).

## 6. Comparison

| Flow | LinkedIn fit | Instagram fit | Reuses what exists | Build cost | Asset dependency | Memorability | Main risk |
|---|---|---|---|---|---|---|---|
| A Scroll Film | High | Medium | High | Medium | 2 panels, optional clips | High | Length |
| B Two Doors | High | High | High | Low-Med | 2 clips or panels | Medium | Choice before context |
| C Case Reel | Very high | Low | Medium | High | 3 anatomy figures | High | Artist side demoted |
| D Stories Deck | High | Very high | Medium | Medium | 8 card visuals | High | Shallow alone |
| E The Match | Medium | High | High | Medium | Little | Very high | Gimmick risk |
| F Magazine | Medium | High | High | High (ongoing) | Per-issue content | High | Cadence |

Video note: Flow stills are free; Flow video uses Veo credits and needs your OK per batch. Keep video to 2-3 short muted loops (4-6 s, under 1.5 MB, poster fallback) for the hero moments only. Instagram's in-app browser needs `muted playsinline`.

## 7. What I recommend (a hybrid, in stages)
This follows the flow you described: scroll landing, then two sides, then data.
1. **Spine = Flow A + Flow B's fork.** The Scroll Film is the landing; at its end the seal opens onto a Two-Doors fork (instead of today's small switch). `/li` and `/ig` pre-open the right door and shorten the film for Instagram.
2. **Depth = Flow C's case-file template** on the Analyst side (machine + consulting chart + sourced KPIs + one-pager), because that is where the data job is won.
3. **Content engine = Flow D.** Export the film's panels as the Instagram carousel and the LinkedIn document. Zero extra design.
4. Later, optional: Flow F's issue idea as the monthly refresh; Flow E's match clock as a playroom page, not the spine.
Why not just one: A alone is too long for Instagram; C alone demotes the artist half; B alone has no story. Together they cover both audiences without making two sites.

## 8. Decisions needed
1. Pick the spine: A+B hybrid as above, or one flow only?
2. Bio links: OK to plan `/li` and `/ig` doors?
3. How long may the Instagram version of the landing be (my suggestion: 10-15 s, ending on the door choice)?
4. Which Flow video loops, if any, may use credits (max 3)?
5. Do you want me to score your Instagram profile with the `ig-profile` rubric? That needs a screenshot of the top of the profile and the first two rows of the grid; I will not log in.
