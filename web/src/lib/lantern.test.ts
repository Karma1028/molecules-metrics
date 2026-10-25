import { describe, expect, it } from "vitest"
import { LANTERN_RADIUS, SOFT_EDGE, lanternMask, pointInBox } from "./lantern"

describe("lantern", () => {
  it("builds a radial mask centred on the pointer with a soft edge", () => {
    const m = lanternMask(120, 80)
    expect(m).toContain("120px 80px")
    expect(m).toContain(`transparent ${LANTERN_RADIUS - SOFT_EDGE}px`)
    expect(m).toContain(`${LANTERN_RADIUS + SOFT_EDGE}px`)
    expect(m).toMatch(/transparent/)
  })
  it("converts client coords to box-local coords", () => {
    expect(pointInBox(150, 90, { left: 100, top: 50 })).toEqual({ x: 50, y: 40 })
  })
})
