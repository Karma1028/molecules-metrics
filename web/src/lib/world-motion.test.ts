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

  it("route variants never scale a page in-world, and swing across worlds", () => {
    type F = (t: unknown) => Record<string, unknown>
    const down = { dir: 1, cross: false }
    for (const world of ["artist", "analyst"] as const) {
      const v = routeVariants(world, false)
      expect((v.hidden as F)(down).scale ?? 1).toBe(1)
      expect((v.exit as F)(down).scale).toBeUndefined()
    }
    expect(((routeVariants("analyst", false).hidden as F)(down).clipPath)).toContain("100%")
    const v = routeVariants("analyst", false)
    expect((v.hidden as F)({ dir: -1, cross: true }).rotateY).toBe(90)
    expect(((v.exit as F)({ dir: 1, cross: true }).rotateY as number[]).at(-1)).toBe(90)
    expect(routeVariants("artist", true)).toBe(reducedFade)
  })

  it("analyst lock never rotates", () => {
    const hidden = worldMotion.analyst.lock.hidden as Record<string, unknown>
    expect(hidden.rotate).toBeUndefined()
  })
})
