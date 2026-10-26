import { describe, expect, it } from "vitest"
import { deckIndex, neighbour, travelBetween, wheelStart, wheelStep, WHEEL_COMMIT, WHEEL_LOCK_MS } from "./deck"

describe("deck", () => {
  it("indexes sections in nav order, ignoring trailing slashes", () => {
    expect(deckIndex("/artist")).toBe(0)
    expect(deckIndex("/artist/sound/")).toBe(2)
    expect(deckIndex("/")).toBe(-1)
  })

  it("travels down the stack to later sections and up to earlier ones", () => {
    expect(travelBetween("/analyst", "/analyst/work")).toEqual({ dir: 1, cross: false })
    expect(travelBetween("/analyst/resume", "/analyst/skills")).toEqual({ dir: -1, cross: false })
  })

  it("swings right into the analyst world and left into the artist world", () => {
    expect(travelBetween("/artist/notes", "/analyst")).toEqual({ dir: 1, cross: true })
    expect(travelBetween("/analyst/work", "/artist")).toEqual({ dir: -1, cross: true })
  })

  it("finds neighbours and stops at both ends", () => {
    expect(neighbour("/artist", 1)).toBe("/artist/gallery")
    expect(neighbour("/artist", -1)).toBeNull()
    expect(neighbour("/analyst/contact", 1)).toBeNull()
  })

  it("commits one section per wheel gesture and swallows inertia", () => {
    let s = wheelStart()
    let r = wheelStep(s, WHEEL_COMMIT / 2, 1000)
    expect(r.go).toBe(0)
    r = wheelStep(r.state, WHEEL_COMMIT / 2, 1050)
    expect(r.go).toBe(1)
    // inertia keeps streaming in: no second commit while it lasts
    s = r.state
    for (let t = 1100; t < 1000 + WHEEL_LOCK_MS + 600; t += 40) {
      r = wheelStep(s, 60, t)
      expect(r.go).toBe(0)
      s = r.state
    }
  })

  it("resets the accumulator when direction flips or input pauses", () => {
    let r = wheelStep(wheelStart(), 100, 1000)
    r = wheelStep(r.state, -30, 1020)
    expect(r.state.acc).toBe(-30)
    r = wheelStep(r.state, 100, 2000)
    expect(r.state.acc).toBe(100)
  })
})

describe("tunnelFrames", () => {
  it("lands the destination frame on the screen plane", async () => {
    const { tunnelFrames } = await import("./deck")
    for (const dir of [1, -1] as const) {
      const frames = tunnelFrames(dir, 6, 500)
      const dest = frames.find((f) => f.offset === 0)!
      expect(dest.z.at(-1)).toBe(0)
      frames.forEach((f) => expect(f.opacity.at(-1)).toBe(0))
    }
  })

  it("never shows a frame once it is near the lens", async () => {
    const { tunnelFrames } = await import("./deck")
    tunnelFrames(1, 6, 500).forEach((f) => f.z.forEach((z, j) => z > 320 && expect(f.opacity[j]).toBe(0)))
  })
})
