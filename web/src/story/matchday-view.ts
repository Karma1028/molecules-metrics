import type { FootballResp } from "../lib/live"

export type FormLetter = "W" | "D" | "L"

export interface MatchdayStat {
  label: string
  value: string
}

export interface MatchdayFixture {
  home: string
  away: string
  kickoff: string | null
}

export interface MatchdayView {
  /** "empty" = the feed has nothing real to show; the page says so instead of inventing */
  state: "live" | "empty"
  fixture: MatchdayFixture | null
  stats: MatchdayStat[]
  form: FormLetter[]
}

const FORM_MAX = 6
const MS_PER_MIN = 6e4
const MS_PER_HOUR = 36e5
const MS_PER_DAY = 864e5

export function kickoffLabel(ts: string | null | undefined, now: number): string | null {
  if (!ts) return null
  const diff = new Date(ts).getTime() - now
  if (!Number.isFinite(diff) || diff <= 0) return null
  const d = Math.floor(diff / MS_PER_DAY)
  const h = Math.floor((diff / MS_PER_HOUR) % 24)
  const m = Math.floor((diff / MS_PER_MIN) % 60)
  if (d > 0) return `${d}d ${h}h to kickoff`
  if (h > 0) return `${h}h ${m}m to kickoff`
  return `${m}m to kickoff`
}

const isFormLetter = (v: unknown): v is FormLetter => v === "W" || v === "D" || v === "L"

export function matchdayView(fb: FootballResp, now: number): MatchdayView {
  const next = fb.next
  const hasFixture = !!(next?.strHomeTeam || next?.strAwayTeam)
  const fixture: MatchdayFixture | null = hasFixture
    ? {
        home: next?.strHomeTeam || "Home TBC",
        away: next?.strAwayTeam || "Opponent TBC",
        kickoff: kickoffLabel(next?.strTimestamp, now),
      }
    : null

  const s = fb.standing
  const stats: MatchdayStat[] = s
    ? [
        { label: "Played", value: String(s.played) },
        { label: "Points", value: String(s.points) },
        { label: "Goal diff", value: s.gd > 0 ? `+${s.gd}` : String(s.gd) },
        { label: "Rank", value: String(s.rank) },
      ]
    : []

  const form = (fb.form ?? []).filter(isFormLetter).slice(0, FORM_MAX)

  const state = fb.configured && (fixture || stats.length || form.length) ? "live" : "empty"
  return { state, fixture, stats, form }
}
