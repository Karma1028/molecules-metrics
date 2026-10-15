import { describe, expect, it } from "vitest"
import { assignCells, caffeine, unitChart } from "./molecule"

describe("caffeine", () => {
  it("has the C8H10N4O2 formula and is connected", () => {
    const m = caffeine()
    const count = (el: string) => m.atoms.filter((a) => a.el === el).length
    expect([count("C"), count("H"), count("N"), count("O")]).toEqual([8, 10, 4, 2])
    // 10 ring bonds + 5 heavy substituents + 10 hydrogens
    expect(m.bonds).toHaveLength(25)
    const seen = new Set([0])
    let grew = true
    while (grew) {
      grew = false
      for (const [a, b] of m.bonds) {
        if (seen.has(a) !== seen.has(b)) {
          seen.add(a)
          seen.add(b)
          grew = true
        }
      }
    }
    expect(seen.size).toBe(m.atoms.length)
  })

  it("is centred on the origin", () => {
    const m = caffeine()
    const sx = m.atoms.reduce((s, a) => s + a.pos[0], 0)
    expect(Math.abs(sx)).toBeLessThan(1e-9)
  })
})

describe("unitChart", () => {
  it("has exactly one cell per unit and rises left to right", () => {
    const c = unitChart(24)
    expect(c.cells).toHaveLength(24)
    const heights = Array.from({ length: c.bars }, (_, b) => c.bar.filter((x) => x === b).length)
    expect(heights.reduce((a, b) => a + b, 0)).toBe(24)
    expect(heights[0]).toBeLessThan(heights[heights.length - 1])
    for (let i = 1; i < heights.length; i++) expect(heights[i]).toBeGreaterThanOrEqual(heights[i - 1])
  })
})

describe("assignCells", () => {
  it("is a one-to-one mapping", () => {
    const m = caffeine()
    const map = assignCells(m.atoms, unitChart(m.atoms.length))
    expect(new Set(map).size).toBe(m.atoms.length)
  })
})
