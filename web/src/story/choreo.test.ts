import { describe, expect, it } from "vitest"
import { ballArc, gaitKeyframes, splitChars, parseStat, formatStat, charDelay, trailGhosts } from "./choreo"

describe("ballArc", () => {
  it("starts at the foot and lands at the drop", () => {
    const a = ballArc({ dx: 100, peak: 40, drop: 10, steps: 8 })
    expect(a.x[0]).toBe(0)
    expect(a.y[0]).toBe(0)
    expect(a.x.at(-1)).toBe(100)
    expect(a.y.at(-1)).toBe(10)
  })

  it("rises above the start to the peak, y negative is up", () => {
    const a = ballArc({ dx: 100, peak: 40, drop: 0, steps: 8 })
    expect(Math.min(...a.y)).toBeCloseTo(-40, 5)
  })

  it("moves x monotonically", () => {
    const a = ballArc({ dx: 90, peak: 20, drop: 0, steps: 6 })
    for (let i = 1; i < a.x.length; i++) expect(a.x[i]).toBeGreaterThan(a.x[i - 1])
  })

  it("has steps + 1 samples, clamped to at least 2 steps", () => {
    expect(ballArc({ dx: 1, peak: 1, drop: 0, steps: 5 }).x).toHaveLength(6)
    expect(ballArc({ dx: 1, peak: 1, drop: 0, steps: 0 }).x).toHaveLength(3)
  })
})

describe("gaitKeyframes", () => {
  it("loops: first and last frame match", () => {
    const g = gaitKeyframes(1)
    expect(g.y[0]).toBe(g.y.at(-1))
    expect(g.rotate[0]).toBe(g.rotate.at(-1))
  })

  it("scales amplitude, zero amplitude is flat", () => {
    expect(gaitKeyframes(0).y.every((v) => v === 0)).toBe(true)
    const big = Math.min(...gaitKeyframes(2).y)
    const small = Math.min(...gaitKeyframes(1).y)
    expect(big).toBeCloseTo(small * 2, 5)
  })

  it("has matching lengths and ascending times from 0 to 1", () => {
    const g = gaitKeyframes(1)
    expect(g.times).toHaveLength(g.y.length)
    expect(g.times).toHaveLength(g.rotate.length)
    expect(g.times[0]).toBe(0)
    expect(g.times.at(-1)).toBe(1)
  })
})

describe("splitChars", () => {
  it("keeps every character, marks spaces", () => {
    const c = splitChars("He ran")
    expect(c.map((x) => x.char).join("")).toBe("He ran")
    expect(c[2].isSpace).toBe(true)
    expect(c[0].isSpace).toBe(false)
  })

  it("numbers only visible chars so spaces do not eat the stagger", () => {
    const c = splitChars("a b")
    expect(c.map((x) => x.i)).toEqual([0, -1, 1])
  })
})

describe("charDelay", () => {
  it("is index times step in seconds plus the base", () => {
    expect(charDelay(3, 14, 0.2)).toBeCloseTo(0.2 + 0.042, 5)
  })
  it("never negative", () => {
    expect(charDelay(-1, 14, 0)).toBe(0)
  })
})

describe("parseStat / formatStat", () => {
  it("parses plain ints", () => {
    expect(parseStat("45")).toEqual({ prefix: "", n: 45, suffix: "", decimals: 0 })
  })
  it("parses signed goal difference", () => {
    expect(parseStat("+12")).toEqual({ prefix: "+", n: 12, suffix: "", decimals: 0 })
    expect(parseStat("-3")).toEqual({ prefix: "-", n: 3, suffix: "", decimals: 0 })
  })
  it("parses rank suffixes", () => {
    expect(parseStat("2nd")).toEqual({ prefix: "", n: 2, suffix: "nd", decimals: 0 })
  })
  it("returns null when there is no number to count", () => {
    expect(parseStat("TBC")).toBeNull()
    expect(parseStat("")).toBeNull()
  })
  it("formats mid-count and lands exactly on the real value", () => {
    const p = parseStat("+12")!
    expect(formatStat(p, 0)).toBe("+0")
    expect(formatStat(p, 5.4)).toBe("+5")
    expect(formatStat(p, 12)).toBe("+12")
    expect(formatStat(parseStat("2nd")!, 2)).toBe("2nd")
  })
})

describe("trailGhosts", () => {
  it("returns fading ghosts, oldest faintest", () => {
    const g = trailGhosts(3)
    expect(g).toHaveLength(3)
    expect(g[0].opacity).toBeGreaterThan(g[2].opacity)
    expect(g[0].lag).toBeLessThan(g[2].lag)
  })
  it("empty for zero", () => {
    expect(trailGhosts(0)).toEqual([])
  })
})

import { drift } from "./choreo"

describe("drift", () => {
  it("is a closed loop so it can repeat without a jump", () => {
    const d = drift(1, 20, 8)
    expect(d.x[0]).toBeCloseTo(d.x.at(-1)!, 5)
    expect(d.y[0]).toBeCloseTo(d.y.at(-1)!, 5)
  })
  it("stays inside its radius", () => {
    const d = drift(2, 30, 12)
    for (let i = 0; i < d.x.length; i++) expect(Math.hypot(d.x[i], d.y[i])).toBeLessThanOrEqual(30 + 1e-9)
  })
  it("differs by seed", () => {
    expect(drift(1, 20, 8).x).not.toEqual(drift(2, 20, 8).x)
  })
})
