import analytics from "../data/barca_analytics.json"
import type { SeasonPoint } from "./morph"

// Six Barcelona seasons from the personal analytics file (fbref, fotmob,
// understat, transfermarkt). This file is the one the chart uses. The
// separate last-season file disagrees for 2025-26 (goals and xG), and the
// page says so instead of picking a side silently.

interface SeasonRow {
  goals: number
  xG: number
}

export const SOURCE_NOTE =
  "Personal analytics file: fbref, fotmob, understat, transfermarkt, 2020-21 to 2025-26."

export function seasonPoints(
  seasons: Record<string, SeasonRow> = analytics.seasons as Record<string, SeasonRow>,
): SeasonPoint[] {
  return Object.entries(seasons)
    .map(([season, row]) => ({ season, goals: row.goals, xG: row.xG }))
    .sort((a, b) => a.season.localeCompare(b.season))
}

export const ANALYTICS_GENERATED = analytics.generatedAt
