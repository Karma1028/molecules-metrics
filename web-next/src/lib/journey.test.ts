import { describe, expect, it } from "vitest"
import { STATIONS, findGaps, monthIndex } from "./journey"

describe("journey stations", () => {
  it("keeps every station in chronological order by start month", () => {
    const starts = STATIONS.map((s) => monthIndex(s.start))
    const sorted = [...starts].sort((a, b) => a - b)
    expect(starts).toEqual(sorted)
  })

  it("uses no em dash in any visible copy (site rule)", () => {
    for (const s of STATIONS) {
      for (const text of [s.period, s.title, s.place, s.metric, s.note]) {
        expect(text).not.toContain("—")
      }
    }
  })

  it("only uses metrics that the repo's CV data already states", () => {
    const metrics = STATIONS.map((s) => s.metric)
    expect(metrics).toContain("8.32 CGPA")
    expect(metrics).toContain("5.23 CGPA")
    expect(metrics).toContain("93.85%")
  })
})

describe("findGaps", () => {
  it("reports the 2024 to early 2025 gap as not on record, never as filled", () => {
    const gaps = findGaps(STATIONS)
    expect(gaps).toHaveLength(1)
    expect(gaps[0].from).toBe("2024-01")
    expect(gaps[0].to).toBe("2024-12")
    expect(gaps[0].label).toMatch(/not on record/i)
  })

  it("reports no gap when stations touch", () => {
    const touching = [
      { ...STATIONS[0], start: "2020-01", end: "2020-12" },
      { ...STATIONS[0], start: "2021-01", end: "2021-12" },
    ]
    expect(findGaps(touching)).toEqual([])
  })
})
