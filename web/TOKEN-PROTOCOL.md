# Token Protocol (Opus + Haiku crew)

Written 2026-10-15 from what burned tokens in sessions 2a to 2m. Binding for every session on this repo.

## Where the tokens went (honest)

| Leak | Evidence | Cost driver |
|---|---|---|
| Huge page files re-read | Journey.tsx, Sound.tsx, Landing.tsx (738 lines), Matchday.tsx: CSS lives inside TSX template strings | Every edit forces a full re-read of hundreds of CSS lines |
| Full-res screenshots read by Opus | 1280px PNGs, many per change, some never looked at | Images are the most expensive input |
| Browser-pane screenshot timeouts | Retries before switching to Playwright | Wasted round trips |
| Opus doing grunt work | Renames, webp conversion, shot scripts, doc ticks written by Opus earlier | Opus rates on mechanical work |
| Long chat replies + long summaries | Recaps, re-explaining state | Output tokens + compaction loss |
| Compaction | 66 MB transcript this session; context lost, files re-read | Re-reading after every compaction |
| Encoding accident | PS 5.1 Get-Content/Set-Content mojibake, repair pass | Whole file rewritten twice |
| Agent results dumped verbatim | Long agent reports pasted into context | Context bloat |

## Rules

### Split of work
- **Opus**: production app code, design judgment, final critique, final verify of agent claims. Nothing else.
- **Haiku**: screenshots + contact sheets, QA sweeps, inventories, transcript mining, doc ticks (CHECKPOINT, MASTER-PLAN, memory), asset conversion, renames, research of reference sites, a11y/axe runs.
- Agents run in background, in parallel, and **write results to files** in `scratchpad/audit/` or `web/qa/`. Their final message is at most 15 lines: paths + problems only.

### Reading
- Never re-read a whole file to make a small edit. Use Grep with `-C` to get the exact lines, then Edit.
- Read big files with `offset`/`limit`.
- Opus looks at **contact sheets** (one image, many pages), not single full-res shots. Single shots only for the one thing being judged. Use `zoom` regions for detail.
- Agents report numbers (overflow, errors, counts). Opus does not open an image to confirm what a number already proves.

### Code shape (cuts future read cost)
- Move each page's CSS-in-TSX string into a sibling `Page.css` file (or `page.styles.ts`) as pages get touched. TSX logic and CSS can then be read separately.
- Keep files under 400 lines. Split data (`*-stations.ts`, `hostel-rooms.ts` pattern) from views.

### Editing
- Edit tool only. Never PowerShell Get-Content/Set-Content on source (UTF-8 mojibake risk).
- One batch of related edits, then one verify run (tsc + vitest + one shot script). Not verify after every line.

### Browser
- Playwright with system Chrome (`scratchpad/shots/*.mjs`). Do not use the built-in pane for screenshots; it times out.
- One script per check, printing a one-line result per viewport.

### Communication
- Chat replies: caveman, at most ~12 lines, a table if there are more than 3 items. No recaps of things the user already saw.
- Long content (reports, plans) goes to a file. Chat gets the path + 3 bullet headline.
- Ask open questions in one batch at the end, not spread across turns.

### Session hygiene
- Start: read `CHECKPOINT.md` top section + this file. Not the whole plan.
- End of each phase: Haiku updates CHECKPOINT.md (10 lines max per entry). That is the handoff, so compaction loses nothing important.
- When context is past ~60%, write the handoff before it compacts, not after.
