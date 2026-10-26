import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { act, render } from "@testing-library/react"
import { KeepyUppy } from "./KeepyUppy"
import { motionTokens } from "../../lib/motion-tokens"

const I = motionTokens.intro

describe("KeepyUppy intro", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    sessionStorage.clear()
    vi.stubGlobal("requestAnimationFrame", () => 0)
    vi.stubGlobal("cancelAnimationFrame", () => {})
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    document.documentElement.removeAttribute("data-intro")
  })

  it("counts every touch, then lands the line and lifts off", () => {
    const { container } = render(<KeepyUppy />)
    expect(document.documentElement.hasAttribute("data-intro")).toBe(true)
    act(() => { vi.advanceTimersByTime(I.touches * I.beatMs) })
    expect(container.querySelector(".kp-n")?.textContent).toBe(`n=${String(I.touches).padStart(2, "0")}`)
    expect(container.querySelector(".kp")?.getAttribute("data-phase")).toBe("line")
    expect(container.querySelector(".kp-watched")?.classList.contains("in")).toBe(true)
    // each phase schedules the next from an effect: step through them
    act(() => { vi.advanceTimersByTime(4000) })
    expect(container.querySelector(".kp")?.getAttribute("data-phase")).toBe("exit")
    act(() => { vi.advanceTimersByTime(I.exitMs) })
    expect(container.querySelector(".kp")).toBeNull()
    expect(document.documentElement.hasAttribute("data-intro")).toBe(false)
  })

  it("plays once per session", () => {
    render(<KeepyUppy />).unmount()
    const { container } = render(<KeepyUppy />)
    expect(container.querySelector(".kp")).toBeNull()
  })

  it("any key skips straight to the lift", () => {
    const { container } = render(<KeepyUppy />)
    act(() => { window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" })) })
    expect(container.querySelector(".kp")?.getAttribute("data-phase")).toBe("exit")
    expect(document.documentElement.hasAttribute("data-intro")).toBe(false)
  })

  it("never leaves the landing paused when unmounted mid-intro", () => {
    render(<KeepyUppy />).unmount()
    expect(document.documentElement.hasAttribute("data-intro")).toBe(false)
  })
})
