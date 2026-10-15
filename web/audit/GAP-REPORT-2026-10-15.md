# Gap Report: Molecules → Metrics (honest audit, 2026-10-15)

Evidence used:
- `audit/ASKS-LEDGER.md`: 213 asks, 137 verbatim from 6 sessions plus 76 from docs, with 19 repeated-ask clusters and 15 conflicts.
- `audit/sheet-desktop-2026-10-15.png`: 16 routes at 1440, light and dark (the mobile sheet is in scratchpad).
- A code inventory of every page's motion, 3D, paper and motif use.
- My own look at each sheet.

---

## 1. Verdict

**Not a creative-genius portfolio yet.** The cover is good. Everything behind it is a competent, well-QA'd website.

QA is green: 135/135, no overflow, tsc and vitest pass. But QA measures *correctness*, not *delight*. I optimised for what I could measure and called that progress.

Earlier I said "~60-65% done". That number tracked my own MASTER-PLAN checklist, not your brief. Measured against what you actually asked for, a fair figure is **~35-40%**.

| Your ask (ledger cluster) | Times asked | Delivered | Honest status |
|---|---|---|---|
| Creative / unique / "wow" (R-01) | 14+ | Cover only | **Not met** |
| Apply ref-site animations (R-02) | 11+ | Journey map (jameschugh), blur counter on artist Home | **Thin.** 2 of ~10 refs applied in depth |
| Use skills/plugins (R-04) | 9+ | Some motion and QA skills | Partial. Design/creative skills not driving decisions |
| Audit own work honestly (R-05) | 7+ | Audits written, but self-graded on my own plan | This report is the first one graded against *your* asks |
| Flow cutouts / characters (R-07) | 6+ | 1 asset (Bankura horse) | **Not met.** Two character slots are empty `display:none` divs (Matchday.tsx:494, Work.tsx:279) |
| Football / Matchday (R-09) | 6+ | One dense terrace page | **Not met.** The 5-view Football Room and the Messi story (SCOPE D-010) were never built |
| 3D elements (this message) | new + ThreeUI brief | None. About.tsx declares `perspective` and never rotates anything | **Not met.** Blocked by an old "No WebGL/3D" spec line that I never re-asked about |
| Paper cut-outs / collage-chaos (SCOPE D-004) | doc-locked | Cover yes. Inner artist pages are mostly tidy cards. Analyst pages have zero | **Partial / drifted to grids** |
| Story spine (diary / experiment, D-015, D-030) | doc-locked | Twin doors + Plate/LOG headers | **Weak.** No through-line a visitor would feel |
| Easter eggs (eclipse ×5, `goal`, Konami, D-016) | doc-locked | None found in code | **Not built** |
| One-screen, no scroll | 4 | 100% | Met. But it became the reason everything shrank (see §2) |
| Honest facts | 5 | Held | Met |

---

## 2. Why it drifted (root causes, my fault, in order of damage)

1. **Graded myself on my own plan.** MASTER-PLAN was written by me, so "P4 partial" felt like progress. The ledger shows the same complaint 14 times: not creative enough. That is the real KPI, and no phase owned it.
2. **Constraints stacked silently into timidity.** Four rules piled up: one-screen, no-3D, ≤8 loops, and reduced-motion parity. I resolved every tension by making things *smaller and calmer*, never by making a bolder composition that fits.
   - Result: inner headers at ~28px, tiny mono text and dead space (artist Contact is mostly empty; Notes is 4 cards on a blank page).
   - One-screen should mean **poster scale**. I treated it as "shrink to fit".
3. **Never escalated rule conflicts.**
   - The "No WebGL/3D" rule (DESIGN-SPEC, CONTINUATION-PROMPT) contradicts your ThreeUI brief and today's 3D ask.
   - The "scroll-driven parallax" in SCOPE contradicts no-scroll.
   - I should have asked; instead I picked the safe side.
4. **References were read, not translated.** I wrote a good teardown of jameschugh and huyml, then applied about 2 of its techniques. kodeimmersive (giant type), madebyhart (objects), deji (tactile), davidwhyte (poetic pacing), senbuzy and quangdinh: zero.
5. **Asset pipeline stalled.** Paper cut-outs and characters need real images. Flow images are free (SCOPE D-024), yet only the horse was generated. With no assets, pages fall back to CSS cards, and CSS cards read "AI-generated". You said exactly that 4+ times.
6. **Analyst world got a dashboard template.** Pages 3 to 6 use 2-3 motion techniques each, mostly the same stagger fade. No material, no object, no signature. "Instrument physics" exists only as a header idiom.
7. **Too many small fixes, too few big swings.** This session went into a radio dial, label collisions and a mojibake repair. Each was useful, but none moved the "wow" needle.

---

## 3. Page-by-page (seen on the sheet, scored /10 for "would a creative director stop scrolling")

| Page | Score | What's there | What's missing |
|---|---|---|---|
| Cover `/` | 7 | Collage, halftone portrait, kantha thread, real depth | The portrait-hover scatter + desaturate spotlight (SCOPE D-025) isn't the moment it should be. No 3D. The thread is subtle |
| Artist Home | 5 | Spread crossfade, blur counter, film mat | Reads as a menu + photo. Needs the cover's energy carried in |
| Gallery | 6 | Deck, layoutId lightbox, develop, markers, temple tiles | Strongest inner page. Grid feels flat; no physical prints in space |
| Sound (me) | 4 | Data cards, vinyl | Spotify dashboard in beige. Not "a person through music" |
| Sound (radio) | 5 | Hostel rooms, scene art, dial | Faceplate is flat. Wants a real radio object (madebyhart) |
| Matchday | 4 | Dense terrace collage, radar | Busy, washed out, small. No giant type, no ticket tear, no Messi story |
| Notes | 3 | 4 ruled cards | Empty, static. No poetic pacing, no notebook object |
| About | 5 | Photo, ribbon, pull quote | Layout is a standard bio. No Bankura → Goa arc felt |
| Artist Contact | 3 | Stamp trail, postcard rows | Mostly empty screen. Postcard isn't an object |
| Analyst Home | 2 | 6 list rows | Weakest page on the site |
| Skills | 3 | Tabs + chips | Empty panel, tiny text |
| Work | 4 | Log pager | Admin-panel feel |
| Journey | 6 | Map, route draw, pins, camera | Good idea. Map too plain; no terrain, no depth |
| Dashboard | 3 | Bento of numbers | Generic. SCOPE had dropped this page; it came back without a reason |
| Resume | 3 | Text grid | No "printing" object |
| Analyst Contact | 3 | Three link boxes | Empty |

---

## 4. Story: what the visitor should feel vs what they feel now

**Intended** (SCOPE §2B, BRIEF):
- *Molecules → metrics is a reaction.*
- Bankura kid, chemical engineer, analyst.
- The artist world is the raw material; the analyst world is the instrument.
- The whole site is his field-notebook diary.

**Felt now:**
- A great cover, then two separate websites, one beige and one navy, with menus.
- The reaction metaphor appears in the title only.
- Nothing *transforms* from molecule to metric as you move.
- No recurring character or guide.
- No progression: page 12 feels like page 2.

**Missing narrative devices** (proposed):
1. **The reaction as navigation.** Crossing worlds visibly converts something: a photo becomes a data plot, a match becomes a radar, a song becomes a waveform metric. The bridge transition *is* the thesis.
2. **One recurring guide.** The split-self character, or the Bankura horse as companion, appears on every page in a different pose.
3. **Chapter progression.** Plates I to VI and LOGs 01 to 06 should feel like turning pages of one notebook, with a visible "you are here" spine. The stamp trail idea (MASTER-PLAN §2) does this.
4. **Bankura → Goa arc** spanning About, Journey and Contact as one geography.

---

## 5. The upgrade plan (Opus codes, Haiku does everything else)

Order = biggest perceived jump first. Each wave ends with a Haiku contact sheet. I judge, you look.

**Wave A: decisions + assets (Haiku-heavy, ~0 Opus code)**
- A1. You answer §6 (3D yes/no and where; analyst material).
- A2. Haiku drafts Flow prompts for:
  - paper cut-out layers per page (torn paper, cut-out portraits of you from real photos, props: ticket, cassette, notebook, radio, terracotta);
  - the split-self guide characters.
  - You approve, Haiku generates (stills are free) and saves them to `public/cutouts/`.
- A3. Haiku turns each unused ref (kodeimmersive, madebyhart, deji, davidwhyte, senbuzy, quangdinh) into a technique card: what moves, timing, easing, and which of our pages it maps to.

**Wave B: scale + composition pass (Opus)**
- One-screen = poster:
  - every inner page gets a hero-scale headline (clamp ~64-120px) and one dominant object;
  - dead space is filled by composition, not cards.
- Artist pages get layered paper cut-outs with depth: parallax on pointer, not scroll; soft shadows; tilt.
- Analyst pages get a material: glass + graph paper + a physical instrument per page.

**Wave C: 3D, if approved (Opus)**
- Lightweight CSS-3D first, which has no bundle cost:
  - paper layers in `preserve-3d` with pointer tilt (cover, Notes, Contact postcard);
  - a 3D notebook page-turn for in-world route changes;
  - Resume as a sheet printing out of a 3D printer slot.
- **One** three.js piece, lazy-loaded, as the single wow. Candidates:
  - a terracotta horse you can rotate;
  - a molecule that re-forms into a bar chart on the world switch (the thesis made literal).

**Wave D: signature interaction per page (Opus)**
- Matchday: giant "VISCA" type, drag-to-tear ticket, Messi chapter (scoped down to one screen with chapter stepper).
- Notes: poetic line-by-line lede, real notebook object.
- Sound: skeuomorphic radio object.
- Analyst Home: huyml index with live preview + giant outline type.
- Work: wheel-snap vertical reel.
- Skills: toolkit unwrap.
- Contact pair: postcard posts / terminal types.

**Wave E: story glue (Opus)**
- Reaction-bridge transition that morphs the content of the page you left.
- Recurring guide.
- Notebook spine + stamp trail.
- Easter eggs.

**Wave F: verify** (Haiku sweep + a11y/axe + react-reviewer; I verify the claims).

**Realistic target after A to E:** cover-level quality on every page, about 85%. The final 15% is your taste iterations.

---

## 6. Decisions needed from you (blocking Wave A)

1. **3D:** lift the "No WebGL/3D" rule?
   - (a) CSS-3D everywhere + one lazy three.js wow (recommended);
   - (b) CSS-3D only;
   - (c) heavy three.js.
2. **The one wow:** horse you can rotate, *or* molecule → chart morph on world switch, *or* your idea?
3. **Paper cut-outs of you:** OK to have Flow make cut-out versions from your real photos (`/me*.webp`, gallery)?
4. **Analyst world material:** keep dark navy instrument, or give it a physical material too (blueprint paper, lab notebook, glass slides)?
5. **Dashboard page:** SCOPE dropped it, but it's live. Keep it, merge it into Analyst Home, or cut it?
6. **Commit:** OK to commit the current state on `r4-calm-pass` as a baseline before the big waves?

## 7. Open conflicts carried from the ledger (§7 there)

- C-2: 3D (Q1 above).
- C-3: scroll-motion versus no-scroll. Resolved as pointer and wheel-step motion, never page scroll.
- C-4: sound default on or off.
- C-10: Skills meters.
- C-11: final world labels, Artist/Analyst or Karma/Tuhin.

**Security:** a Stitch API key was pasted in plain text in an Oct-5 session. Rotate it.
