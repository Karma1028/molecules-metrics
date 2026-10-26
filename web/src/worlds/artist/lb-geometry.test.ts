import { describe, expect, it } from "vitest"
import { arrowPaths, jit } from "./lb-geometry"

const nums = (d: string) => (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number)

describe("lb-geometry arrowPaths", () => {
  const cases: Array<[string, number, number, number, number, number]> = [
    ["straight right", 0, 0, 200, 0, 1],
    ["steep down, big bow", 10, 10, 60, 300, 7],
    ["up-left", 300, 280, 40, 30, 23],
    ["short", 100, 100, 130, 112, 4],
  ]

  it.each(cases)("head points along the shaft's final tangent (%s)", (_n, ax, ay, tx, ty, seed) => {
    const { head, tangent } = arrowPaths(ax, ay, tx, ty, seed)
    const [a1x, a1y, hx, hy, a2x, a2y] = nums(head)
    // the two wings are symmetric about the shaft direction: their midpoint sits behind the tip
    const mx = (a1x + a2x) / 2
    const my = (a1y + a2y) / 2
    const back = Math.atan2(hy - my, hx - mx)
    const want = Math.atan2(tangent.y, tangent.x)
    const diff = Math.abs(Math.atan2(Math.sin(back - want), Math.cos(back - want)))
    expect(diff).toBeLessThan(0.05)
  })

  it("puts the arrow tip exactly on the target", () => {
    const { head } = arrowPaths(0, 0, 150, 90, 3)
    const [, , hx, hy] = nums(head)
    expect(hx).toBeCloseTo(150, 0)
    expect(hy).toBeCloseTo(90, 0)
  })

  it("starts the shaft at the tail and ends it near the tip", () => {
    const { shaft } = arrowPaths(20, 30, 220, 130, 9)
    const n = nums(shaft)
    expect([n[0], n[1]]).toEqual([20, 30])
    const ex = n[n.length - 2]
    const ey = n[n.length - 1]
    expect(Math.hypot(ex - 220, ey - 130)).toBeLessThan(6)
  })

  it("is deterministic for the same seed", () => {
    expect(arrowPaths(0, 0, 90, 90, 5)).toEqual(arrowPaths(0, 0, 90, 90, 5))
    expect(jit(5)).toBe(jit(5))
  })
})
