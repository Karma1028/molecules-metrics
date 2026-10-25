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
