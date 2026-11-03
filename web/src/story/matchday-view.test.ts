import { describe, expect, it } from "vitest"
import { matchdayView, kickoffLabel } from "./matchday-view"
import type { FootballResp } from "../lib/live"

const NOW = new Date("2026-11-03T12:00:00Z").getTime()

describe("kickoffLabel", () => {
  it("is null for a missing or past timestamp", () => {
    expect(kickoffLabel(null, NOW)).toBeNull()
    expect(kickoffLabel("2026-11-03T11:00:00Z", NOW)).toBeNull()
  })
  it("counts days and hours, then hours and minutes, then minutes", () => {
    expect(kickoffLabel("2026-11-05T15:00:00Z", NOW)).toBe("2d 3h to kickoff")
    expect(kickoffLabel("2026-11-03T15:30:00Z", NOW)).toBe("3h 30m to kickoff")
    expect(kickoffLabel("2026-11-03T12:45:00Z", NOW)).toBe("45m to kickoff")
  })
})

describe("matchdayView", () => {
  it("reports an honest empty state when the feed is not configured", () => {
    const v = matchdayView({ configured: false }, NOW)
    expect(v.state).toBe("empty")
    expect(v.fixture).toBeNull()
    expect(v.stats).toEqual([])
    expect(v.form).toEqual([])
  })

  it("builds fixture, stats and form from a live response", () => {
    const fb: FootballResp = {
      configured: true,
      next: { strHomeTeam: "Barcelona", strAwayTeam: "Girona", strTimestamp: "2026-11-05T15:00:00Z" },
      form: ["W", "W", "D", "L", "W"],
      standing: { rank: 2, points: 24, played: 10, gd: 11, goals: 25, conceded: 14 },
    }
    const v = matchdayView(fb, NOW)
    expect(v.state).toBe("live")
    expect(v.fixture).toEqual({ home: "Barcelona", away: "Girona", kickoff: "2d 3h to kickoff" })
    expect(v.stats.map((s) => s.label)).toEqual(["Played", "Points", "Goal diff", "Rank"])
    expect(v.stats.find((s) => s.label === "Goal diff")?.value).toBe("+11")
    expect(v.form).toEqual(["W", "W", "D", "L", "W"])
  })

  it("never invents a fixture when only one team name is present", () => {
    const v = matchdayView({ configured: true, next: { strHomeTeam: "Barcelona" } }, NOW)
    expect(v.fixture).toEqual({ home: "Barcelona", away: "Opponent TBC", kickoff: null })
  })

  it("keeps only W/D/L in form and caps it at six", () => {
    const fb = { configured: true, form: ["W", "D", "L", "W", "W", "D", "L", "W"] } as FootballResp
    expect(matchdayView(fb, NOW).form).toHaveLength(6)
  })
})
