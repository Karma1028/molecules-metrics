import { describe, expect, it } from "vitest"
import { SLEEP_MS, lineFor, lookAt, moodFor } from "./mascot-logic"

describe("lookAt", () => {
  it("faces the side the pointer is on", () => {
    expect(lookAt(100, 100, 400, 100).facing).toBe(1)
    expect(lookAt(100, 100, 10, 100).facing).toBe(-1)
  })
  it("looks up for a pointer above and down for one below, clamped", () => {
    expect(lookAt(100, 100, 300, 0).tilt).toBeLessThan(0)
    expect(lookAt(100, 100, 300, 900).tilt).toBeGreaterThan(0)
    expect(Math.abs(lookAt(100, 100, 120, -5000).tilt)).toBeLessThanOrEqual(18)
    expect(Math.abs(lookAt(100, 100, 120, 9000).tilt)).toBeLessThanOrEqual(18)
  })
  it("holds level when the pointer is level", () => {
    expect(lookAt(100, 100, 500, 100).tilt).toBe(0)
  })
  it("never returns NaN when the pointer is on the mascot", () => {
    const r = lookAt(100, 100, 100, 100)
    expect(Number.isFinite(r.tilt)).toBe(true)
    expect([1, -1]).toContain(r.facing)
  })
})

describe("moodFor", () => {
  it("is awake until the idle limit, then asleep", () => {
    expect(moodFor(0)).toBe("awake")
    expect(moodFor(SLEEP_MS - 1)).toBe("awake")
    expect(moodFor(SLEEP_MS)).toBe("asleep")
  })
})

describe("lineFor", () => {
  it("picks lines for the page and cycles through them", () => {
    const a = lineFor("/artist/gallery", 0)
    const b = lineFor("/artist/gallery", 1)
    expect(a.length).toBeGreaterThan(0)
    expect(a).not.toBe(b)
    expect(lineFor("/artist/gallery", 3)).toBe(a)
  })
  it("falls back to a default for unknown routes and keeps lines short", () => {
    expect(lineFor("/nope/never", 0).length).toBeGreaterThan(0)
    for (const p of ["/", "/artist", "/artist/notes", "/artist/sound", "/artist/matchday", "/analyst", "/analyst/dashboard", "/analyst/journey"]) {
      for (let i = 0; i < 4; i++) expect(lineFor(p, i).length).toBeLessThanOrEqual(56)
    }
  })
  it("uses the longest matching route prefix", () => {
    expect(lineFor("/artist/notes/some-post", 0)).toBe(lineFor("/artist/notes", 0))
  })
})
