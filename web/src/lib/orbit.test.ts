import { describe, expect, it } from "vitest"
import { PLANETS, periodFor, angleAt, positionOf, visitCounts, BASE_PERIOD_S } from "./orbit"

describe("PLANETS", () => {
  it("has two rings and unique routes", () => {
    expect(new Set(PLANETS.map((p) => p.to)).size).toBe(PLANETS.length)
    expect(new Set(PLANETS.map((p) => p.ring))).toEqual(new Set([0, 1]))
  })
})

describe("visitCounts", () => {
  it("counts stitches per path", () => {
    expect(visitCounts([{ path: "/a" }, { path: "/b" }, { path: "/a" }])).toEqual({ "/a": 2, "/b": 1 })
  })
})

describe("periodFor", () => {
  it("never-visited planets orbit slowest", () => {
    expect(periodFor(0)).toBe(BASE_PERIOD_S)
  })
  it("more visits means a faster orbit, with a floor", () => {
    expect(periodFor(3)).toBeLessThan(periodFor(1))
    expect(periodFor(1000)).toBeGreaterThan(0)
  })
})

describe("angleAt / positionOf", () => {
  it("completes a turn in one period", () => {
    expect(angleAt(0, 40, 40)).toBeCloseTo(Math.PI * 2)
    expect(angleAt(1, 0, 40)).toBe(1)
  })
  it("places a planet on its ring around the centre", () => {
    const p = positionOf(0, 0.3)
    const r = Math.hypot(p.x - 50, p.y - 50)
    const q = positionOf(1, 0.3)
    expect(Math.hypot(q.x - 50, q.y - 50)).toBeGreaterThan(r)
  })
})
