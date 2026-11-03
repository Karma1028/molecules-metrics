# CONTINUATION PROMPT — grill session (2026-11-03)
_Paste the block below into a fresh Claude Code session in `D:\porfolio\molecules-metrics\web`._

---

## COPY-PASTE THIS

You are resuming the Molecules → Metrics portfolio for Tuhin Bhattacharya. **Do not build, edit code or commit.** Your only job this session is to read everything, then grill me until we reach firm decisions on the portfolio idea.

### Step 1 — Read, in this order (use Grep or offsets on the big files, do not re-read)
1. `D:\porfolio\molecules-metrics\web\audit\SESSION-2026-11-03-LEARNINGS.md` — newest: failures F1–F8, my exact words, the reference-video findings, open decisions.
2. `D:\porfolio\molecules-metrics\web\audit\ASKS-LEDGER.md` — every ask I made (213 rows), repeated asks (top 10), and conflicts C-1 to C-15. C-3 (scroll vs no-scroll) is the live one.
3. `D:\porfolio\PORTFOLIO-NOTES.md` — likes and dislikes, the v0.6 failure analysis F1–F5.
4. `D:\porfolio\molecules-metrics\web\audit\ref-video-2026-11-03\agy-analysis.md` and the `dense/*.jpg` sheets only if a question needs them (send image review to a Haiku agent with a file-path brief).
5. `D:\porfolio\molecules-metrics\web\audit\BOLD-PROPOSALS-2026-10-30.md`, `ROUND2-CREATIVE-2026-10-30.md`, `SITE-FLOWS-MASTER-2026-10-30.md` — earlier concept rounds (skim headings).
6. Memory: `C:\Users\tuhin\.claude\projects\D--porfolio\memory\MEMORY.md` and `…\D--antigravity-project-karma---zeroclaw\memory\project_agy_headless_bridge.md`, `feedback_no_agy_argon.md`.
7. Code state: `git status`, `git log --oneline -8` on branch `story/slice-1`; skim `web/src/story/` (choreo.ts, useKick.ts, HorseFollower.tsx) and `web/src/lib/motion-tokens.ts`.

### Step 2 — Recap in 15 lines or fewer
State back, in plain words: what is built, what I rejected and why (quote me), what the reference video taught (measured vs inferred), and the decisions still open. If any of this disagrees with the files, say so.

### Step 3 — Grill me
Ask **one decision at a time** (use AskUserQuestion, at most 4 questions per round, 2–4 options each, your recommendation first). Do not move on until the answer is firm. Push back on weak answers. Cover, in this order:
1. **What "crazy" means to me**, with examples of sites or moments I have loved. Which of my previous rejections tells you the most?
2. **The scroll-built feel.** My belief: the site builds as I scroll and stops when I stop. Pinned single screen driven by wheel/touch/keys progress (reconciles C-3), real page scroll, or both? What stays on time (the swarm)?
3. **The idea.** Pick or kill: molecule swarm → metrics; editor/darkroom timeline; titration reactor; distillation column; telemetry horse with the spine as scrubber; the combination in the learnings file; or something new. Ask what each would make a recruiter or a football-analytics hiring manager feel in 10 seconds.
4. **Who it is for and what it must do** (job offers, freelance photography, football analytics?) and the one thing a visitor must do.
5. **Real material.** Which projects, photos, data and numbers are real and usable? What must never be invented?
6. **The horse and the story.** Keep Pat × Manga? Keep the Bankura horse, and as what (mascot, control, instrument)? Keep or kill the registers (Ghibli / Heat / Solo / Northern / System)?
7. **Hard rules still true?** English with Bengali motifs only, football as analyst only, no gym, honest data, one-screen, no WebGL/3D (C-2), sound opt-in (C-4).
8. **Budget and limits.** Performance on a phone, reduced-motion fallbacks, number of loops, time I can spend.
9. **Definition of done.** What would make me say "this is the best creative website"? How will we check it (frame strips, a scroll-stop test, your own eyes)?

### Step 4 — Conclude
End with a one-page decision record (what we decided, what we rejected, what is still open, the single recommended next step) and write it to `web/audit/DECISIONS-<date>.md`. Ask me before saving anything outside `web/audit/`. Then stop. Building starts only when I say "approved, build slice N", and only after a written spec and motion plan.

### Rules for you
- Use the skills every time you design: motion-foundations / -patterns / -advanced, make-interfaces-feel-better, high-end-visual-design, impeccable, design-taste-frontend, idea-refine.
- Named tool or agent I mention (e.g. `agy`): search memory and skills first, confirm, then use exactly that source. `agy` = Antigravity CLI, model `gemini-3.8-flash-high` only, never argon.
- Image review goes to Haiku agents with contact sheets, not to you.
- No commit, push, deploy or PR merge without my explicit OK. Caveman style replies.
- Honest data only. Label every claim measured / inferred / unknown.
