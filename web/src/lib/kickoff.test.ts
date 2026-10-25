import { describe, expect, it } from "vitest"
import { kickVelocity, stepBall, zoneAt, nearestZone, ZONES, FRICTION, MAX_POWER, type Ball } from "./kickoff"

describe("kickVelocity", () => {
  it("shoots opposite to the pull-back", () => {
    const v = kickVelocity({ x: 0.5, y: 0.5 }, { x: 0.4, y: 0.5 })
    expect(v.vx).toBeGreaterThan(0)
    expect(v.vy).toBeCloseTo(0)
  })
  it("caps power", () => {
    const v = kickVelocity({ x: 0.5, y: 0.5 }, { x: -5, y: 0.5 })
    expect(Math.hypot(v.vx, v.vy)).toBeLessThanOrEqual(MAX_POWER + 1e-9)
  })
  it("a tiny drag is no kick", () => {
    expect(kickVelocity({ x: 0.5, y: 0.5 }, { x: 0.501, y: 0.5 })).toEqual({ vx: 0, vy: 0 })
  })
})

describe("stepBall", () => {
  it("slows down under friction and eventually stops", () => {
    let b: Ball = { x: 0.2, y: 0.5, vx: 0.8, vy: 0 }
    for (let i = 0; i < 600; i++) b = stepBall(b, 1 / 60)
    expect(b.vx).toBe(0)
    expect(b.x).toBeGreaterThan(0.2)
  })
  it("bounces off the walls", () => {
    let b: Ball = { x: 0.95, y: 0.5, vx: 1, vy: 0 }
    b = stepBall(b, 0.1)
    expect(b.x).toBeLessThanOrEqual(1)
    expect(b.vx).toBeLessThan(0)
  })
  it("is deterministic and keeps friction below 1", () => {
    expect(FRICTION).toBeLessThan(1)
    const a = stepBall({ x: 0.3, y: 0.3, vx: 0.4, vy: 0.2 }, 1 / 60)
    const b = stepBall({ x: 0.3, y: 0.3, vx: 0.4, vy: 0.2 }, 1 / 60)
    expect(a).toEqual(b)
  })
})

describe("zones", () => {
  it("every zone links to a distinct route", () => {
    expect(new Set(ZONES.map((z) => z.to)).size).toBe(ZONES.length)
  })
  it("zoneAt finds the zone containing a point", () => {
    const z = ZONES[0]
    expect(zoneAt({ x: z.x, y: z.y })).toBe(z)
    expect(zoneAt({ x: 0.5, y: 0.5 })).toBeNull()
  })
  it("nearestZone always answers", () => {
    expect(nearestZone({ x: 0.5, y: 0.5 })).toBeTruthy()
  })
})
