import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { skyShift, SKY_MS } from "./sky-shift"

describe("skyShift", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // jsdom has no WAAPI; a stub is enough to take the animated path
    document.body.animate = vi.fn(() => ({})) as unknown as typeof document.body.animate
    HTMLElement.prototype.animate = vi.fn(() => ({})) as unknown as typeof HTMLElement.prototype.animate
  })
  afterEach(() => {
    vi.runAllTimers()
    vi.useRealTimers()
    document.body.innerHTML = ""
  })

  it("flips the theme once, mid-run", () => {
    const flip = vi.fn()
    skyShift({ toDark: true, flip })
    expect(flip).not.toHaveBeenCalled()
    vi.advanceTimersByTime(SKY_MS)
    expect(flip).toHaveBeenCalledTimes(1)
  })

  it("ignores a second tap while the sky is running (it used to flip early and desync)", () => {
    const first = vi.fn()
    const second = vi.fn()
    skyShift({ toDark: true, flip: first })
    vi.advanceTimersByTime(300)
    skyShift({ toDark: true, flip: second })
    vi.advanceTimersByTime(SKY_MS)
    expect(second).not.toHaveBeenCalled()
    expect(first).toHaveBeenCalledTimes(1)
  })

  it("accepts a new tap after the run ends", () => {
    skyShift({ toDark: true, flip: vi.fn() })
    vi.advanceTimersByTime(SKY_MS + 100)
    const next = vi.fn()
    skyShift({ toDark: false, flip: next })
    vi.advanceTimersByTime(SKY_MS)
    expect(next).toHaveBeenCalledTimes(1)
  })

  it("flips immediately under reduced motion", () => {
    const flip = vi.fn()
    skyShift({ toDark: true, reduce: true, flip })
    expect(flip).toHaveBeenCalledTimes(1)
  })
})
