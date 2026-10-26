import { describe, expect, it } from "vitest"
import { shoot } from "./penalty"

const goal = { left: 100, right: 300, top: 0, bottom: 80 } // goal mouth
const spot = { x: 200, y: 400 }

describe("penalty shoot", () => {
  it("is weak when the flick is a nudge", () => {
    expect(shoot(spot, { vx: 0, vy: -0.1 }, goal, 100)).toBe("weak")
  })
  it("is wide when the ball crosses the goal line outside the posts", () => {
    expect(shoot(spot, { vx: 0.9, vy: -0.9 }, goal, 200)).toBe("wide")
  })
  it("is saved when the keeper stands where the ball arrives", () => {
    expect(shoot(spot, { vx: 0, vy: -1 }, goal, 200)).toBe("saved")
  })
  it("is a goal when it arrives inside the posts away from the keeper", () => {
    expect(shoot(spot, { vx: 0, vy: -1 }, goal, 120)).toBe("goal")
  })
  it("is wide when the ball is hit away from the goal", () => {
    expect(shoot(spot, { vx: 0, vy: 1 }, goal, 200)).toBe("wide")
  })
})
