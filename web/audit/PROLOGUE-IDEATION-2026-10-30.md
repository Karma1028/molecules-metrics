# Prologue: a scrollable "brief me" in front of the site (ideation, 2026-10-30)

Status: IDEATION ONLY (brainstorming path: architectural; no build until Tuhin approves a direction, then a written spec). Skills used: `superpowers:brainstorming` (process), `frontend-design-direction`, `motion-patterns` (house tokens), `storytelling` (loaded; it is a generic design-system template, so I used it only for its "restate intent, then states, then QA" order). Plus one Sonnet agent for a persona critique (section 9).

## 1. My understanding (correct me)
- Keep the current site exactly as it is (both worlds, all pages, current landing).
- Add a scroll-driven prologue on top that briefs a stranger on who Tuhin is, animated as they scroll.
- At the end of the scroll the current landing "opens" and they navigate on as today.
- Success = a hiring manager understands role + proof in about 30 seconds and still feels the craft; a design peer remembers it; nobody is trapped in it.
- Assumptions to check: prologue only on `/` (deep links skip it); shown once per visitor, replayable; it does not replace the existing landing, it leads into it.

## 2. The surprise already on disk
`public/pat/panel-0..5.webp` are six finished patachitra (Bengali scroll-painting) panels of one stylised boy, same border, same paper: camera in a village, headphones + record player, football scarf in a stadium, notebook on a Goa shore, hands-folded beside the clay horse, a sealed letter with the horse behind. That is a scroll painting waiting to be unrolled. No other part of the Flow output needs to be finished for this: the PAT look was meant for the origin story anyway (ASSET-PLAN), and the paper colour already matches the site's.

Gap: all six panels are the "artist half". There is no molecule panel and no analyst panel, which is the half the hiring manager came for. Two new panels in the same style are needed (section 5).

## 3. Concepts I weighed

| # | Concept | Verdict |
|---|---|---|
| A | **Pater gaan: the patua scroll unrolls.** In Bengal a patua unrolls a painted scroll panel by panel while singing it. Scrolling = unrolling. One caption line per panel, like a verse. | **Recommended spine.** Culturally true to Tuhin, uses assets we own, native-scroll friendly. |
| B | Kantha thread as progress: one running stitch is pulled through every panel as you scroll, needle at the leading edge. | **Use as the progress device** (it is already the landing's governing device, so the prologue and the page share one idea). |
| C | The seal: the last panel is the letter; press-and-hold to break the wax seal; the page opens. | **Recommended ending.** One deliberate gesture, no accidental scroll-through, a real "doors open" moment. |
| D | Match-day timeline: 90 minutes = a life, goals = milestones, final whistle opens the site. | Fun, but needs the Heat look (no folder on disk) and says less about analysis. Park. |
| E | Darkroom print: a photograph develops as you scroll, bio emerges with it. | Beautiful for the artist half only; `/darkroom` already exists as its own piece. Keep it separate. |
| F | Recruiter-first résumé-in-motion: count-up numbers, no art. | Too plain alone, but its *content* belongs inside A as live fact tags and a skip lane. |
| G | Molecule-to-chart morph (the old "one wow"). | Already archived; heavy. Do not revive. |
| H | Chem-eng P&ID flowsheet as the scroll. | Rejected by Tuhin 2026-10-15. Not proposing. |

Recommended: **A + B + C**, with F's content as the hiring lane.

## 4. Viewpoints: what matters, what does not

| Viewpoint | What they need | Consequence |
|---|---|---|
| Hiring manager, on a phone, from LinkedIn | Role and proof before any art. Out quickly. | First screen states name + role. Skip and Résumé pills always visible. Whole prologue ≈ 6-7 screens (30-40 s). |
| Design peer | One thing they have not seen. | The unrolling scroll plus the seal break. Everything else stays quiet. |
| Same person, second visit | Not to sit through it again. | Seen once (stored), "replay" link in the footer, `?prologue=1` for QA. |
| Phone user | Thumb scroll that never fights the page. | Native scroll only. No scroll-jacking, no wheel hijack. Panels stack vertically on phone. |
| Accessibility | Works without motion. | `prefers-reduced-motion` = static stack of panels with captions; captions are real text; keyboard Skip is first tab stop. |
| Football / photo fans | The warm bits. | Live fact tags on those panels (below). |
| Performance | Do not undo the 95 Lighthouse score. | First panel eager, rest lazy (≈105 KB each), CSS scroll-driven animation where supported, no new library. |

**Matters:** the first 3 seconds (name, role, a reason to scroll); a skip lane; one true fact per panel; the ending gesture; mobile feel.
**Does not matter (cut):** audio by default (opt-in only, Sound stays opt-in), 3D, a second cursor effect, a loader screen, long Bengali verses (one short line each), more than 7 beats.

## 5. Storyboard (draft captions only; every fact must be confirmed by Tuhin, none invented)

| Beat | Panel | What the scroll does | One true fact tag (live where the site already has the data) |
|---|---|---|---|
| 0 Door | rolled scroll roller at the bottom edge | Name, role line, "scroll to unroll", Skip, Résumé | none |
| 1 Origin | panel 4 (horse, hands folded) | Scroll unrolls to it; the folk horse blinks once | "From Bankura, West Bengal" |
| 2 Molecules | **NEW panel** (flask / atoms as lotus + alpona) | Atoms pop in as the panel passes centre | "Chemical engineer by training" |
| 3 Metrics | **NEW panel** (bar chart as clay towers under the banyan) | Bars rise on scroll; ties to the Scorecard | "12 months in real company data · 2 internships" (Scorecard number) |
| 4 The other half | panels 0, 1, 2, 3 as a quick sequence | Each lives for a half-screen: camera shutter, vine of notes from the record, scarf sways, crab walks | "33 frames in the roll" · "listening minutes" · latest Barça line · latest note |
| 5 Letter | panel 5 | Envelope; seal glows | "Write to me" + email |
| 6 Open | seal break | See section 6 | |

Progress: one kantha thread runs along the left edge (top edge on phone) and is stitched a little further per panel.
Motion budget: one micro-motion per panel, 500-800 ms, house ease `cubic-bezier(.19,1,.22,1)`, reveal stagger 26-36 ms. No looping animation off-screen.

## 6. The ending (the bit that has to feel expensive)
1. Press and hold the seal (400 ms, keyboard Enter/Space). The wax cracks, the envelope opens.
2. The thread leaves the scroll and **splits into two weaves**, which is the line already on the landing: "One thread, two weaves."
3. The painted horse steps out of the frame and, as it crosses the border, redraws from flat folk outline to the Ghibli relief horse from the Flow kit, with Tuhin beside it (Tuhin leads, horse follows, per your rule). This is the hand-off from origin look (PAT) to the site's cast (GHIBLI/SYSTEM).
4. The scroll rolls up out of view and the current landing's own entrance plays (the `data-intro` hook already pauses and releases it).
5. Choice is exactly what exists today: Karma/Tuhin switch, "Enter Karma, the artist", plus a new "Hiring? Résumé · Scorecard" pill beside it.
Fallback for 3: if the cut-outs are not approved yet, the horse simply fades into the landing's ink-ball animation. The prologue still works without the Flow art.

## 7. Hiring lane (inside the prologue, not a separate site)
- Persistent top-right: **Skip ↓** and **Résumé**.
- After beat 3 an optional card strip "Just the facts": role · 12 months · Scorecard · Résumé · Email. One tap each.
- `/for/<company>` sets a line "Prepared for <company>" and opens at beat 3. Costs one route; the only text that changes is that line.

## 8. Wilder ideas worth a look (not recommended yet)
- **Referrer-aware start**: LinkedIn visitors start at beat 2, Instagram visitors at beat 4.
- **Panels are places**: Bankura, Goa (GIM), Jaipur (Celebal). Only the confirmed places; no invented ones.
- **Audit lens preview**: hold on any fact tag to see its source (the Audit lens from the other doc, shown first at the front door).
- **Scroll-speed read**: if someone scrolls fast, the captions shorten to one word per panel. Cute, low priority.
- **One shared ball**: the football from the scarf panel rolls down the margin as a second progress marker and lands in the seal. Charming but competes with the thread; pick one.

## 9. Persona critique
I did this pass myself rather than spawning another agent (no new agent was needed; the earlier Haiku run covered the Flow history). Four readers, reading the plan cold:
- **Recruiter (phone, 40 s budget):** likes that the role is on screen 1 and Skip exists. Worry: beat 4 (four panels) is the longest stretch and says nothing about the job. Fix: beat 4 is optional-feeling, half-screen each, and the "Just the facts" strip must appear before it, not after.
- **Design peer:** the seal break and the horse changing style are the memorable parts. Worry: a patachitra scroll followed by a Field Notebook landing could feel like two sites. Fix: the thread and the paper colour carry across, and the hand-off in section 6 is the explicit bridge. If the bridge looks cheap, cut to a plain roll-up.
- **Accessibility reviewer:** press-and-hold is a barrier. Fix: a single click/Enter also works after a visible "press and hold" cue times out, and Skip is the first tab stop.
- **Skeptic:** is eight new panels' worth of art plus a transition worth it versus a clean headline? Fix: ship in two slices (see section 11) so the cheap version already works alone.
Weakest idea: the shared ball (section 8): drop it. Missing idea: a very short "what I'm looking for" line (role type, location, availability) before the seal, since a hiring manager's real question is "is this person for my opening?". Needs Tuhin's words.

## 11. Suggested slicing (so risk stays small)
1. Slice 1 (no new art): door + panels 4 and 5 + the 4 artist panels + seal + landing opens, thread progress, Skip/Résumé, reduced-motion stack, seen-once. Works today with what is on disk.
2. Slice 2: the two new panels (molecules, metrics) and the "Just the facts" strip.
3. Slice 3: live fact tags, the horse style hand-off with Flow cut-outs, `/for/<company>`.

## 10. Risks and open decisions
Risks: scroll-driven CSS is not in every browser (needs an IntersectionObserver fallback); the two new panels must look like the same hand as the six or the scroll breaks; a scroll that is too long reads as a delay; the existing KeepyUppy intro overlaps in purpose.
Decisions for Tuhin:
1. Go with A+B+C (patua scroll, thread, seal)? Or prefer another from section 3?
2. Does the prologue **replace** the KeepyUppy intro (my suggestion) or sit before it?
3. Confirm the facts and write the one-line captions in your voice (I will not invent any).
4. Approve generating the 2 new panels (molecules, metrics) in the exact patachitra style (Nano Banana, 0 credits), checked against panels 0-5 before use.
5. Opt-in sound on the prologue (one ektara note) or none?
