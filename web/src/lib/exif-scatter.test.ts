import { describe, expect, it } from "vitest"
import { parseDate, parseIso, parseShutter, scatterPoints } from "./exif-scatter"

describe("exif parsing", () => {
  it("parses shutter fractions, seconds and the 8000+ artifact", () => {
    expect(parseShutter("1/30s")).toBeCloseTo(1 / 30)
    expect(parseShutter("0.5s")).toBe(0.5)
    expect(parseShutter("2s")).toBe(2)
    expect(parseShutter("1/8000s+")).toBeCloseTo(1 / 8000)
    expect(parseShutter(undefined)).toBeNull()
    expect(parseShutter("junk")).toBeNull()
  })
  it("parses ISO", () => {
    expect(parseIso("ISO 250")).toBe(250)
    expect(parseIso(undefined)).toBeNull()
  })
  it("parses 'D Mon YYYY' dates", () => {
    expect(parseDate("27 Apr 2024")).toBe(Date.UTC(2024, 3, 27))
    expect(parseDate("nope")).toBeNull()
  })
})

describe("scatterPoints", () => {
  const exifs = [
    { date: "01 Jan 2020", shutter: "1/1000s", iso: "ISO 50" },
    { date: "01 Jan 2024", shutter: "1/10s", iso: "ISO 800" },
    {},
    { date: "01 Jan 2022", shutter: "1/100s", iso: "ISO 200" },
  ]
  const pts = scatterPoints(exifs)

  it("maps to 0..1 with earliest left and fastest shutter at top", () => {
    expect(pts[0]).toMatchObject({ x: 0, y: 0 })
    expect(pts[1]).toMatchObject({ x: 1, y: 1 })
    expect((pts[3] as { x: number }).x).toBeGreaterThan(0)
    expect((pts[3] as { x: number }).x).toBeLessThan(1)
  })
  it("marks frames without data instead of guessing a position", () => {
    expect(pts[2]).toEqual({ missing: true })
  })
  it("sizes dots by ISO within 0..1", () => {
    expect(pts[0]).toMatchObject({ s: 0 })
    expect(pts[1]).toMatchObject({ s: 1 })
  })
  it("handles a single plottable frame without NaN", () => {
    const one = scatterPoints([{ date: "01 Jan 2020", shutter: "1/60s", iso: "ISO 100" }])
    expect(one[0]).toEqual({ x: 0.5, y: 0.5, s: 0.5 })
  })
})
