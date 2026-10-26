import { describe, expect, it } from "vitest"
import { buildMorph, seasonLabel, type SeasonPoint } from "./morph"

const BOX = { w: 600, h: 360, pad: 40, base: 320 }

const SEASONS: SeasonPoint[] = [
  { season: "2020-21", goals: 89, xG: 79.73 },
  { season: "2021-22", goals: 99, xG: 80.22 },
  { season: "2022-23", goals: 67, xG: 67.15 },
]

describe("seasonLabel", () => {
  it("shortens 2020-21 to 20/21 so six labels fit a phone", () => {
    expect(seasonLabel("2020-21")).toBe("20/21")
    expect(seasonLabel("2025-26")).toBe("25/26")
  })
})

describe("buildMorph", () => {
  it("returns one frame per season, in chronological order", () => {
    const frames = buildMorph(SEASONS, BOX)
    expect(frames.map((f) => f.label)).toEqual(["20/21", "21/22", "22/23"])
  })

  it("scales the tallest goals value to the full plot height", () => {
    const frames = buildMorph(SEASONS, BOX)
    const plotH = BOX.base - BOX.pad
    const tallest = frames[1]
    expect(tallest.bar.h).toBeCloseTo(plotH, 6)
    expect(tallest.bar.top).toBeCloseTo(BOX.base - plotH, 6)
  })

  it("keeps bar heights proportional to goals on one shared scale", () => {
    const frames = buildMorph(SEASONS, BOX)
    expect(frames[0].bar.h / frames[2].bar.h).toBeCloseTo(89 / 67, 6)
  })

  it("places the xG tick on the same scale as the goals bars", () => {
    const frames = buildMorph(SEASONS, BOX)
    const plotH = BOX.base - BOX.pad
    const max = 99
    expect(BOX.base - frames[2].xgY).toBeCloseTo((67.15 / max) * plotH, 6)
  })

  it("keeps every pass dot inside the pitch box and ends on the touchlines", () => {
    const frames = buildMorph(SEASONS, BOX)
    for (const f of frames) {
      expect(f.pass.x).toBeGreaterThanOrEqual(0)
      expect(f.pass.x).toBeLessThanOrEqual(BOX.w)
      expect(f.pass.y).toBeGreaterThanOrEqual(0)
      expect(f.pass.y).toBeLessThanOrEqual(BOX.h)
    }
    expect(frames[0].pass.x).toBeCloseTo(BOX.pad, 6)
    expect(frames[2].pass.x).toBeCloseTo(BOX.w - BOX.pad, 6)
  })

  it("never returns NaN for zero goals or an empty list", () => {
    expect(buildMorph([], BOX)).toEqual([])
    const zero = buildMorph([{ season: "2020-21", goals: 0, xG: 0 }], BOX)
    expect(Number.isFinite(zero[0].bar.h)).toBe(true)
    expect(zero[0].bar.h).toBe(0)
  })
})
