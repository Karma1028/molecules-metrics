import { describe, expect, it } from "vitest"
import { pickHorseView, HORSE_NEAR_PX } from "./horse-view"

describe("pickHorseView", () => {
  it("faces the viewer when the pointer is close to the horse", () => {
    expect(pickHorseView(10, 10)).toEqual({ view: "front", flip: false })
    expect(pickHorseView(-HORSE_NEAR_PX + 1, 0).view).toBe("front")
  })

  it("shows the side profile when the pointer is level and far", () => {
    expect(pickHorseView(400, 5)).toEqual({ view: "side", flip: false })
  })

  it("mirrors the sprite when the pointer is on the left", () => {
    expect(pickHorseView(-400, 5)).toEqual({ view: "side", flip: true })
  })

  it("uses three-quarter for a diagonal pointer, above or below", () => {
    expect(pickHorseView(300, -150).view).toBe("three-quarter")
    expect(pickHorseView(300, 150).view).toBe("three-quarter")
  })

  it("turns its back when the pointer is far above", () => {
    expect(pickHorseView(20, -500).view).toBe("back")
  })

  it("comes back to the front when the pointer is far below", () => {
    expect(pickHorseView(20, 500).view).toBe("front")
  })

  it("keeps the current view just past a boundary (no flicker)", () => {
    const deg = (d: number) => Math.tan((d * Math.PI) / 180) * 300
    // 24 degrees above level: raw pick is three-quarter, but a horse already in side view holds
    expect(pickHorseView(300, -deg(24)).view).toBe("three-quarter")
    expect(pickHorseView(300, -deg(24), { view: "side", flip: false }).view).toBe("side")
    // 17 degrees: raw pick is side, but a three-quarter horse holds
    expect(pickHorseView(300, -deg(17)).view).toBe("side")
    expect(pickHorseView(300, -deg(17), { view: "three-quarter", flip: false }).view).toBe("three-quarter")
  })

  it("lets go of the held view once the pointer is clearly past the band", () => {
    const deg = (d: number) => Math.tan((d * Math.PI) / 180) * 300
    expect(pickHorseView(300, -deg(40), { view: "side", flip: false }).view).toBe("three-quarter")
  })

  it("updates flip even when the view is held", () => {
    const r = pickHorseView(-300, -20, { view: "side", flip: false })
    expect(r).toEqual({ view: "side", flip: true })
  })

  it("never returns an unknown view for any angle", () => {
    const ok = new Set(["front", "three-quarter", "side", "back"])
    for (let a = 0; a < 360; a += 7) {
      const r = (a * Math.PI) / 180
      expect(ok.has(pickHorseView(Math.cos(r) * 300, Math.sin(r) * 300).view)).toBe(true)
    }
  })
})
