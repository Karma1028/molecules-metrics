import { describe, it, expect } from "vitest"
import { paperTilt, preset, reducedFade, routeVariants, worldMotion } from "./world-motion"

describe("world-motion", () => {
  it("paperTilt is deterministic and within ±1.5deg", () => {
    for (let i = 0; i < 50; i++) {
      const t = paperTilt(i)
      expect(t).toBe(paperTilt(i))
      expect(Math.abs(t)).toBeLessThanOrEqual(1.5)
    }
  })

  it("reduced twin is opacity only and <= 0.2s", () => {
    const v = reducedFade.visible as { opacity: number; transition: { duration: number } }
    expect(Object.keys(reducedFade.hidden as object)).toEqual(["opacity"])
    expect(v.transition.duration).toBeLessThanOrEqual(0.2)
  })

  it("preset collapses to reduced", () => {
    expect(preset(worldMotion.artist.land, true)).toBe(reducedFade)
    expect(preset(worldMotion.analyst.lock, false)).toBe(worldMotion.analyst.lock)
  })

  it("route variants use per-world physics (turn vs scan)", () => {
    expect(routeVariants("artist", false)).toBe(worldMotion.artist.turn)
    expect(routeVariants("analyst", false)).toBe(worldMotion.analyst.scan)
    expect(routeVariants("artist", true)).toBe(reducedFade)
    expect(routeVariants("analyst", true)).toBe(reducedFade)
  })

  it("analyst lock never rotates", () => {
    const hidden = worldMotion.analyst.lock.hidden as Record<string, unknown>
    expect(hidden.rotate).toBeUndefined()
  })
})
