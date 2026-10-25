import { beforeEach, describe, expect, it } from "vitest"
import { clearThread, getThread, recordVisit, stitchColor } from "./route-thread"

beforeEach(() => { clearThread() })

describe("route-thread", () => {
  it("starts empty", () => {
    expect(getThread()).toEqual([])
  })

  it("adds one stitch per new page, keeping order", () => {
    recordVisit("/artist")
    recordVisit("/artist/gallery")
    expect(getThread().map((s) => s.path)).toEqual(["/artist", "/artist/gallery"])
  })

  it("does not stitch the same page twice in a row", () => {
    recordVisit("/artist")
    recordVisit("/artist")
    expect(getThread()).toHaveLength(1)
  })

  it("caps the thread so the margin never overflows", () => {
    for (let i = 0; i < 40; i++) recordVisit(`/artist/p${i}`)
    expect(getThread()).toHaveLength(24)
    expect(getThread().at(-1)?.path).toBe("/artist/p39")
  })

  it("ignores corrupt storage", () => {
    sessionStorage.setItem("mm-route-thread", "{bad")
    expect(getThread()).toEqual([])
  })

  it("colours by section, never random", () => {
    expect(stitchColor("/artist/gallery")).toBe(stitchColor("/artist/gallery"))
    expect(stitchColor("/artist/gallery")).not.toBe(stitchColor("/analyst/work"))
  })
})
