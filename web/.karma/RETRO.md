# RETRO — append-only mistakes + guards

Each FAIL / CRIT gets an entry. Both agents read before acting.

```
## [DATE][T:{id}] RETRO
MISTAKE: {what went wrong}
ROOT_CAUSE: {why}
FIX_APPLIED: {what changed}
GUARD: {rule to prevent recurrence}
```

---

## [2026-10-13][T:b1] RETRO — CRIT FABRICATION
MISTAKE: Antigravity's /analyst/work shipped 4 fully-detailed case studies (SUJAN P&L "300+ DAX / 54 pages", Strategic Insurance CLV "RandomForest+K-Means", Tata Quant "FinBERT+XGBoost", OEM/InfoLeap) with specific methods + numbers presented as real accomplishments. Only 4 KPIs carried a `*`; prose read as authentic.
ROOT_CAUSE: Builder invented plausible content to fill the structure instead of using real data or honest placeholders. Grep of whole repo = names appear ONLY in Work.tsx + its own test + build artifact — no resume/data/bio source exists. Content also CONTRADICTS the honest Skills.tsx (Power BI "building", scikit-learn 0.58 "building", GIM student) — a learner cannot have shipped a production enterprise + quant stack.
FIX_APPLIED: Rejected T:b1 (no ACK). Claude takes over the build directly (user: "your own autonomous work is way better"). Work.tsx rebuilt by Claude with honest content only — real InfoLeap entry + honest staged slots, zero fabricated metrics/clients. Real project specifics requested from Tuhin.
GUARD: R3 gate hardened — any named project / client / metric in a build MUST trace to a repo source file (resume/data/bio) OR be explicitly marked honest-placeholder with a visible "pending" tell. Cross-check new content against Skills.tsx self-ratings for internal consistency. A `*` on 4 of ~16 values does NOT make the other 12 honest. "Verify real thing" pass #2 applies: a fabricated value indistinguishable from real = FAIL.

## [2026-10-13] PROCESS PIVOT
MISTAKE (process): Delegating UI build to Antigravity produced lower craft than Claude's own autonomous work + skills (21st/design-taste/motion) not actually applied builder-side.
FIX_APPLIED: Claude = build owner + quality bar. Antigravity demoted to optional parallel grunt-work (ComingSoon stubs, asset wiring) via its OWN slash commands (/goal, /teamwork) when dispatched — never the quality gate. Every Antigravity FINDING still audited against RUBRIC before merge.
GUARD: If builder output < Claude's own bar on any CRIT/HIGH rubric row, Claude rebuilds that surface directly rather than looping corrections.

## [2026-10-13][Matchday] RETRO — fabricated live-data fallback
MISTAKE: Matchday.tsx Last-Result card hardcoded a fake scoreline fallback ("Barcelona 3-0 Getafe", "Spotify Camp Nou") shown whenever the Barça live feed was null/down — a fabricated result indistinguishable from a real one (verify-pass #2 violation). Also used a specific competition fallback ("UEFA Champions League") when no data.
ROOT_CAUSE: Component invented plausible defaults inline instead of an honest empty-state. It used the LEGACY useBarca() hook (data:null until loaded) and ignored the project's own honest live-data contract (live.ts:89-99) + the purpose-built useFootball() client (configured:false, zero fabricated facts).
FIX_APPLIED: Added hasResult gate (only render a scoreline when lastFix has real intHomeScore/intAwayScore). No data → honest "Awaiting the latest result from the live fixture feed." League fallback softened to "Fixture feed". Verified @5175: no 3-0/Getafe, honest text renders, overflow 0, 0 em-dash, b1 6/6.
GUARD: Any live-data UI must render an honest empty/awaiting state when the feed is null/configured:false — NEVER a fabricated plausible value. Prefer the useLive()/useFootball() honest clients (live.ts) over the legacy usePoll/useBarca inline-fallback pattern. Audit every `?? "value"` / `|| "value"` default on live fields: is the default a factual constant (home team, home venue) or an invented datum (score, opponent, result)?
OPEN: Matchday Origin tab is an unverified first-person narrative (Messi→data story + xT/carry-curve claims) — pending Tuhin confirm/rewrite, not auto-invented. Legacy useBarca→useFootball migration recommended (richer + honest-by-design).

## [2026-10-13][T:work-realdata] RETRO — fabricated slots replaced with REAL projects
CONTEXT: Tuhin confirmed real projects live scattered across D drive, told Claude to source + fill directly. Scanned D:\ — found substantial real work.
EVIDENCE (traced to repo/disk sources, not invented):
  - LOG.01 FC Barcelona Analytics System → D:\football data-analysis\BARCELONA_ANALYTICS_PROJECT_REPORT.md (v1.0, author "Karma / Tuhin Bhattacharya"): living Club/Player intel system, StatsBomb open data + FBref Big-5 + Transfermarkt valuations, per-90 normalisation, Python/Streamlit, seasons 2020-26. Match dossiers exist: obsidian-vault/projects/football-analytics/2026-08-23-Elche-vs-Barcelona-MD1-Report.md + FC-Barcelona-Season-Intelligence-Master-Dossier.md.
  - LOG.02 InfoLeap/LENS → obsidian-vault/projects/infoleap/session_memories.md: agentic survey-intelligence tool, hierarchical LLM orchestration (planner→code→synthesis), "Fetch-Wide Process-Local" (SQL extract / Pandas compute), qualitative feedback as structured JSON w/ respondent-ID citations, Streamlit. Employer-internal numbers (reach counts, DB sizes, model vendors) DELIBERATELY withheld from public site — Tier 2 work data, kept vague + marked pending.
  - LOG.03 Blinkit Retail Dashboard → D:\Blinkit Dashboard V-2\ (Blinkit Dashboard.pbix + Blinkit Portfolio/index.html): real Power BI retail dashboard, DAX measures, generated-data + Excel/Python pipeline. Consistent with Skills.tsx "Power BI building 0.68".
RESOLVED (Matchday OPEN from above): the Messi→Barça→football-analytics origin narrative is VERIFIED real — the FC Barcelona Analytics System is a genuine substantial project. The xT/carry-curve specifics are still slightly ahead of the report (report cites xG/xA/GCA/SCA/progressive passes/pressures, not explicitly xT); Work.tsx uses only the verified metric set (xG/xA/GCA). Matchday Origin prose can stay (verified in spirit); recommend softening "xT" if not in the actual pipeline.
RSLM NOT USED: obsidian-vault rule (.mindos/rules/projects/rslm.md) explicitly says RSLM is "a learning + research space, NOT a formal paper project" — so it was NOT logged as a shipped paper (would re-fabricate). Honest omission.
GUARD: when real sources exist, SOURCE them and fill — honest-reserved slots are a fallback for when nothing real exists, not a default. For employer/internship work, publish role + method, withhold proprietary figures (mark pending), never inflate. Cross-check every published project against its on-disk source + Skills.tsx self-ratings.
VERIFIED @5173: 3 real entries render, chips shipped/in-write-up/shipped, "2 shipped / 3 logged"; desktop zero-scroll 910=910 overflow 0; mobile375 overflow 0 both axes, densest entry (LOG.02) 4 readouts fit, report in viewport; console clean; 0 em-dash in UI copy; no entity leak; b1 6/6 PASS.
