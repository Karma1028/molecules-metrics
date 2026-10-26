import { describe, expect, it } from "vitest"
import { MIN_SPEED, flickTarget, velocityFrom } from "./flick"

const rows = [
  { left: 100, right: 500, top: 0, bottom: 50 },
  { left: 100, right: 500, top: 50, bottom: 100 },
  { left: 100, right: 500, top: 100, bottom: 150 },
]

describe("velocityFrom", () => {
  it("uses only the last 80 ms of samples", () => {
    const v = velocityFrom([
      { x: 0, y: 0, t: 0 },
      { x: 50, y: 0, t: 100 },
      { x: 60, y: 0, t: 140 },
      { x: 80, y: 0, t: 180 },
    ])
    expect(v.vx).toBeCloseTo(0.375, 3)
    expect(v.vy).toBe(0)
  })
  it("is zero with fewer than two samples", () => {
    expect(velocityFrom([{ x: 1, y: 1, t: 1 }])).toEqual({ vx: 0, vy: 0 })
  })
})

describe("flickTarget", () => {
  // rows span y 0..150; REACH_MS=300 so travel = speed * 300 px
  it("opens the row the ball comes to rest on", () => {
    expect(flickTarget({ x: 200, y: 200 }, { vx: 0, vy: -0.4 }, rows)).toBe(1) // 200-120=80
    expect(flickTarget({ x: 200, y: 0 }, { vx: 0, vy: 0.4 }, rows)).toBe(2)   // 0+120=120
  })
  it("a faster flick goes further along the same line", () => {
    expect(flickTarget({ x: 200, y: 200 }, { vx: 0, vy: -0.4 }, rows)).toBe(1)
    expect(flickTarget({ x: 200, y: 200 }, { vx: 0, vy: -0.6 }, rows)).toBe(0) // 200-180=20
  })
  it("returns null for a slow nudge", () => {
    expect(flickTarget({ x: 200, y: 200 }, { vx: 0, vy: -MIN_SPEED / 2 }, rows)).toBeNull()
  })
  it("returns null when it stops off the index", () => {
    expect(flickTarget({ x: 200, y: 25 }, { vx: -1, vy: 0 }, rows)).toBeNull()
    expect(flickTarget({ x: 200, y: 25 }, { vx: 0, vy: 2 }, rows)).toBeNull()
  })
})
