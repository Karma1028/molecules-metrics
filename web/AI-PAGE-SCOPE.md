# Scope: "AI in Practice" page (FUTURE — not started)

Status: **parked**. Build order: finish Gallery rework + Flow images first, then this.
Owner note (Tuhin): a dedicated page proving real, practical AI capability — aimed at recruiters
and people who should understand *what I actually do with AI*, not just that I "know" it.

## Intent (user's words, distilled)
- "I am capable of using AI in a very good way" — proven by real use: built this website with AI,
  runs other projects, knows things *practically*.
- Want a page: what I do + some numbers + important projects + my idea/POV + a news angle +
  different attention-grabbing things.
- Must read as credible to a recruiter: shows knowledge AND capability.
- Options to be researched (Claude to search own knowledge + web when building) on what to show.

## Hard constraints (carry from site rules)
- **No fabricated facts/numbers.** Every metric, project, date = real and user-confirmed. Placeholders
  stay visibly marked until Tuhin fills them.
- One screen per page, no inner scroll, keep all content (reveal via panels/swap like Skills).
- No em-dash in copy. No logo walls (design-taste ban). No meters/gauges as capability display.
- Motion motivated; dark/light/mobile375 + reduced-motion QA before "done".

## Candidate content modules (menu — pick + confirm when building)
1. **Proof-of-work strip** — real AI builds with one-line "what AI did here":
   this portfolio (React+motion, built with AI), KARMA-OS agent OS, reel/video pipeline,
   case-comp deck engine, NotebookLM research pipelines. (All real; confirm which to feature.)
2. **Honest numbers** — e.g. # projects shipped with AI, # agents/automations running,
   tools in active rotation, years using AI daily. ALL placeholder until Tuhin gives real figures.
3. **"How I use AI" cards** — orchestration, agent & automation design, RAG/knowledge graphs,
   prompt & context design, AI-assisted code, research automation. (Mirror Skills AI lens; expand.)
4. **POV / idea** — short manifesto in Tuhin's voice: AI as leverage, taste stays human, build>talk.
   (Tuhin writes; do not invent his opinions.)
5. **"Currently tracking" / news pulse** — a small live or curated feed of AI developments he follows.
   Reuse site's live-feed infra (see src/lib/live). Real sources only; no fake ticker.
6. **Systems-I-run diagram** — light schematic of the agent OS (Hermes/Nanobot, crons, skills, memory).
   Shows architecture literacy. Honest to actual system.
7. (stretch) **Interactive proof** — a tiny "ask my agent" / live demo widget. Ambitious; later.

## Research to do WHEN building (not now)
- Search for recruiter-facing AI-capability page patterns that avoid slop (no buzzword walls).
- Current, dateable AI landscape points worth referencing in the POV/news module.
- Confirm which live-feed sources the site already wires, for the "tracking" module.

## Open questions for Tuhin (ask at build time)
- Real numbers for module 2.
- Which 3-5 projects to feature in module 1.
- His actual POV text for module 4.
- Where this page sits in nav (new analyst subsystem? artist/analyst bridge?).
