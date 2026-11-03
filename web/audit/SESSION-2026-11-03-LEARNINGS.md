# Session 2026-11-03 — what was built, what failed, what was learned

Branch: `story/slice-1` (uncommitted until this file landed). Nothing pushed. PR #4 untouched.
Companion: `CONTINUATION-GRILL-2026-11-03.md` (the paste-in prompt for the next session).

## 1. Sequence of events
1. "Pat × Manga" origin-quest story, slice 1 built (`web/src/story/`): Pat opening, Matchday (Blue Lock look), Bankura horse companion, SceneWipe, kick sequence.
2. User: "pathetic output you have not used any skills and the animations are bullshit". Slice-1 motion redone with the full skill stack (motion-foundations / -patterns / -advanced, make-interfaces-feel-better, high-end-visual-design) plus tested choreography math (`choreo.ts`, 21 tests).
3. User: "this is one pathethic output". Then: "before building anything i think the idea is not that great !!! we can do something even more crazy!" Then: "stop building once!"
4. Five bigger concepts proposed (titration reactor, kiln, darkroom, manga volume, thread map). User did not pick one. Instead supplied a reference video.
5. Video analysed three ways (2 fps Haiku, motion-energy curve + 10 fps dense windows, `agy` Gemini 3.8 Flash High). User then said the analysis missed the minute detail: the site seems to BUILD as you scroll, and if scrolling stops the build stops.

## 2. User's words that must not be lost
- "pathetic output you have not used any skills and the animations are bullshit"
- "this is one pathethic output"
- "the idea is not that great !!! we can do something even more crazy!"
- "stop building once!"
- Reference video: "i want that kind of animation similar to the core and may be something crazy idea like that"
- "you have not thought it out very well with minute details how the site animation is working ... with scrolling down the site is getting build and if i stop the building also stop! i do not think our thinking caught such minute observations!!"
- Tool picks: "haikyuu agent" (read as Haiku, disclosed); "agy agent and skill ... flash in 3.8 high" = Antigravity CLI, `gemini-3.8-flash-high`.
- Standing: English text with Bengali motifs only; football as analyst only; no gym; honest data only; one-screen pages; use skills every build; CLAUDE.md rule: when the user names a specific repo or skill, use exactly that source and confirm it first.

## 3. Failures and root causes
| # | Failure | Root cause | Rule for next time |
|---|---|---|---|
| F1 | Slice 1 built without the skill stack; motion generic (rise/stagger) | Hand-coded blind, again (same as ASKS-LEDGER R-04) | Load motion + design skills BEFORE the first line; tokens file first |
| F2 | Built a whole concept the user had not signed off, then it was rejected as "not crazy" | I chose the concept myself and went straight to code | No code until a spec is approved in chat. Grill the idea first |
| F3 | Rest states bland, half of Matchday empty, composition pass abandoned | Motion polished before composition | Compose the still frame first; motion second |
| F4 | Video analysed at 2 fps, read as timed events; user spotted scroll-driven build | Sample rate below motion cadence; no hypothesis testing; no input visible in the video | See section 5: energy curve first, then 10 fps on bursts; ask for URL / screen capture with input visible |
| F5 | Unknown agent names guessed ("haikyuu", "agy") | Did not search memory first | Grep `~/.claude` memory + skills for an unknown name before guessing. `agy` is in memory `project_agy_headless_bridge` |
| F6 | Animation checks in the hidden browser pane showed nothing | Hidden pane does not tick rAF | Verify with headless Playwright (`chromium.launch({channel:"chrome"})`, abort font hosts, mock `/api/football`) |
| F7 | Impeccable "side-tab" border on `.heat-stats div` | Left accent stripe | Use an underline tick (already fixed) |
| F8 | Open visual defects on Pat opening: terracotta dashes at 150–1200 ms, caption crossing the sun edge | Never identified or fixed | Still open |

## 4. What the reference video actually shows (measured vs inferred)
Source: phone recording of a laptop, 64.8 s, 60 fps, a dark red/white/blue video-editor portfolio. Files: `web/audit/ref-video-2026-11-03/` (`ref.mp4`, `frames/` 2 fps, `sheets/`, `dense/` 10 fps windows, `energy.npy`, `agy-analysis.md`).

Measured (motion-energy curve): bursts of screen motion at about 9–10 s, 14–16 s, 31–34 s, 42–45 s. Dead-still holds at about 1 s, 11 s, 19–22 s, 27–28 s, 39–41 s, 50–53 s. Pattern fits stop-start scrolling. 56–62 s reads near-still, which contradicts the swarm seen there, so that region is distrusted.

Layers (confidence in brackets):
1. Hero stack lifts continuously and clips at the viewport top; photo moves slightly slower than text (likely scroll-linked).
2. Section swap: old headline leaves line by line upward through a top clip while the next rises from a bottom clip, 35–40% of the screen in ~0.4 s (looks threshold-triggered).
3. Staged pieces: placeholder tile to photo in one frame; tiles slide in from the right one per 0.2–0.3 s with horizontal motion blur; outlines red then grey; dim images to full colour in ~0.2 s (triggered stagger).
4. Slow drift between swaps: paragraph lines and boxes rise in the left column while headline and image barely move.
5. Ambient: 10–20 cursor-like sprites in every frame; late they swarm, orbit a red box and collapse (time-driven, or pointer-driven; unresolved).
6. Scene wipes: blue panel scale-in at 0–1 s, 6–7.5 s and ~62.5–63.5 s, looping to the hero.
7. Editing-app skin (agy, corroborated by Haiku): bottom progress bar = playhead/scrubber, crop brackets, track rows, inspector panel.

NOT known: whether the reference truly freezes mid-reveal when scrolling stops; easing curves; true durations. `agy`'s hex colours, cubic-beziers and particle counts are inference, not measurement.

## 5. Method that worked (reuse)
1. ffmpeg `fps=10,scale=192:-1` to PNGs; numpy mean-abs-diff over the central region per frame; print per-second bars. Gives bursts vs holds in seconds.
2. Cut 3–3.5 s windows around each burst at 10 fps, 6-column contact sheet with yellow timestamps (`dense/`).
3. One Haiku agent per sheet with a file-path brief and a precise hypothesis to confirm or deny; ask for "max 30 lines, flag uncertainty".
4. In parallel run `agy` (below) as an independent second opinion.
5. Compare; label each claim measured / inferred / unknown.

`agy` (Antigravity headless): `agy -p "<prompt>" --mode plan --model gemini-3.8-flash-high --output-format text --add-dir <folder> > out.md`. Plan mode is read-only. Never use `gemini-4-argon-*` (user order 2026-11-02). Output appears only when finished (file is 0 bytes while running).

## 6. Design implication (proposal, not approved)
Pinned single viewport; wheel / touch / keys drive one 0..1 progress value; the whole timeline is scrubbed by it (stop = stop, reverse = reverse). Only the ambient layer runs on time. This reconciles the reference's scroll-built feel with the one-screen rule (ASKS-LEDGER conflict C-3). Needs the user's decision.

## 7. Concepts on the table
- Mine: A molecule swarm (particles flock from gas into bars and numbers; horse in the ring), B editor timeline, C titration reactor.
- `agy`: distillation column, darkroom + tactical sonar, terracotta telemetry horse (spine as scrubber, clay polygons to benzene rings to radar charts).
- Suggested combination: pinned scrub timeline + pointer-following molecule swarm + horse as scrub control. Not approved.

## 8. Open items
- Which concept, and what "crazy" means to the user, in their own words.
- Scroll-scrub with no page scroll: confirm (C-3).
- 3D/WebGL rule (C-2) still undecided; swarm needs canvas 2D at least.
- Request the reference site URL or a screen capture with input visible.
- Pat opening defects (F8); rest-state composition (F3).
- Housekeeping: `_cut/`, `.bak` files, `.claude/` and `.impeccable/` must not be committed; PR #4 merge only on explicit "merge PR #4"; Hevy decision; Resume figures sourcing; Spotify creds by the user only; `drift()` helper and its tests are dead code unless the firefly returns.
