# ASSETS

## Flow prompts

None generated. `flow_status` reported signed in but no project open ("Open or create a project in the Flow Chrome window"). No prompt was sent to Flow, so there is nothing to log here. If Flow is opened later, log each prompt below with date, prompt text, and output file.

## Reused assets

| File | Source | Used on | Notes |
|---|---|---|---|
| `public/img/lake-800w.webp` | `web/public/frames` (copied, not modified) | Journey intro | Alt text describes the photo as a still lake at dusk. Photographer's own work from the existing site. |

## Data copies (read-only, not modified)

| File | Source | Used by |
|---|---|---|
| `src/data/barca_analytics.json` | `web/public/data/barca_analytics.json` | Home morph, Journey source line |
| `src/data/barca_last_season.json` | `web/public/data/barca_last_season.json` | Not charted; only named in the Journey conflict warning |

Known conflict: 2025-26 differs between the two files (91 goals / xG 61.2 vs 95 goals / xG 99.7). See `CONCEPT-v2.md`.

## Generated files

- `shots/*.png`: six half-scale (deviceScaleFactor 0.5) screenshots from a Playwright script in the scratchpad. Not from Flow.
