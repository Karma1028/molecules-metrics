import { describe, expect, it } from "vitest"
import { gaitFor, stepWalker, wanderTarget, strideFor, ARRIVE_PX } from "./walk"

describe("gaitFor", () => {
  it("maps speed to gait", () => {
    expect(gaitFor(0)).toBe("idle")
    expect(gaitFor(60)).toBe("walk")
    expect(gaitFor(-200)).toBe("trot")
    expect(gaitFor(500)).toBe("gallop")
  })
})

describe("stepWalker", () => {
  it("accelerates toward a far target and never overshoots it", () => {
    let s = { x: 0, v: 0 }
    let maxX = 0
    for (let i = 0; i < 600; i++) {
      s = stepWalker(s, 400, 1 / 60)
      maxX = Math.max(maxX, s.x)
    }
    expect(maxX).toBeLessThan(400 + ARRIVE_PX)
    expect(Math.abs(s.x - 400)).toBeLessThanOrEqual(ARRIVE_PX)
    expect(gaitFor(s.v)).toBe("idle")
  })
  it("walks left too", () => {
    let s = { x: 500, v: 0 }
    for (let i = 0; i < 200; i++) s = stepWalker(s, 100, 1 / 60)
    expect(s.x).toBeLessThan(500)
  })
  it("far targets are faster than near ones", () => {
    const far = stepWalker({ x: 0, v: 0 }, 1500, 0.5).v
    const near = stepWalker({ x: 0, v: 0 }, 60, 0.5).v
    expect(far).toBeGreaterThan(near)
  })
  it("stands still when already there", () => {
    expect(stepWalker({ x: 200, v: 0 }, 200, 1 / 60)).toEqual({ x: 200, v: 0 })
  })
})

describe("wanderTarget", () => {
  it("stays inside bounds and moves a real distance", () => {
    for (const r of [0, 0.25, 0.5, 0.99]) {
      const t = wanderTarget(300, 1000, r)
      expect(t).toBeGreaterThanOrEqual(0)
      expect(t).toBeLessThanOrEqual(1000)
      expect(Math.abs(t - 300)).toBeGreaterThan(60)
    }
  })
  it("turns around at the right wall", () => {
    expect(wanderTarget(980, 1000, 0.9)).toBeLessThan(980)
  })
})

describe("strideFor", () => {
  it("longer strides at speed", () => {
    expect(strideFor("gallop")).toBeGreaterThan(strideFor("walk"))
  })
})

import { errandPick } from "./walk"

describe("errandPick", () => {
  const spots = [{ x: 100 }, { x: 400 }, { x: 900 }]
  it("starts with the nearest spot, then works outward and wraps", () => {
    expect(errandPick(spots, 350, 0)).toBe(1)
    expect(errandPick(spots, 350, 1)).toBe(0)
    expect(errandPick(spots, 350, 2)).toBe(2)
    expect(errandPick(spots, 350, 3)).toBe(1)
  })
  it("answers -1 when there is nowhere to go", () => {
    expect(errandPick([], 0, 0)).toBe(-1)
  })
})

import { strollStep, STROLL_PX_S } from "./walk"

describe("strollStep", () => {
  it("walks at a slow constant speed", () => {
    const s = strollStep({ x: 100, dir: 1 }, 1, 1000)
    expect(s.x).toBeCloseTo(100 + STROLL_PX_S)
    expect(STROLL_PX_S).toBeLessThan(60)
    expect(gaitFor(STROLL_PX_S)).toBe("walk")
  })
  it("turns around at the right wall and the left wall", () => {
    const r = strollStep({ x: 995, dir: 1 }, 1, 1000)
    expect(r.dir).toBe(-1)
    expect(r.x).toBeLessThanOrEqual(1000)
    const l = strollStep({ x: 3, dir: -1 }, 1, 1000)
    expect(l.dir).toBe(1)
    expect(l.x).toBeGreaterThanOrEqual(0)
  })
  it("never leaves the track even on a long frame", () => {
    const s = strollStep({ x: 500, dir: 1 }, 100, 1000)
    expect(s.x).toBeGreaterThanOrEqual(0)
    expect(s.x).toBeLessThanOrEqual(1000)
  })
})

describe("stepWalker speed cap", () => {
  it("honours a lower max speed", () => {
    let s = { x: 0, v: 0 }
    for (let i = 0; i < 300; i++) s = stepWalker(s, 5000, 1 / 60, 150)
    expect(Math.abs(s.v)).toBeLessThanOrEqual(150 + 1e-6)
  })
})
