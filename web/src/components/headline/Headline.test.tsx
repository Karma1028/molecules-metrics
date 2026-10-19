import { describe, expect, it, vi, beforeEach } from "vitest"
import { render } from "@testing-library/react"
import { Headline } from "./Headline"
import { splitHeadline, textOf } from "./headline-split"
import { countIn } from "./count-in"

describe("headline split", () => {
  it("reads the plain text with <br> as a space", () => {
    expect(textOf(<>Let's talk<br /> <em>data.</em></>)).toBe("Let's talk data.")
  })

  it("orders the hand word after every plain word", () => {
    const { container } = render(<h1>{splitHeadline(<>The <em>work.</em> today</>, { chars: false }).nodes}</h1>)
    const order = Array.from(container.querySelectorAll<HTMLElement>(".hw")).map((w) => [w.textContent, w.style.getPropertyValue("--w")])
    expect(order).toEqual([["The", "0"], ["work.", "2"], ["today", "1"]])
  })

  it("treats a handwriting span as the hand word", () => {
    const { container } = render(<h1>{splitHeadline(<>Say<span className="ac-hand">hello.</span></>, { chars: false }).nodes}</h1>)
    expect(container.querySelector(".ac-hand .hw")?.getAttribute("style")).toContain("--w: 1")
  })

  it("splits letters when counting, keeping spaces as text", () => {
    const { container } = render(<h1>{splitHeadline("On paper", { chars: true }).nodes}</h1>)
    expect(container.querySelectorAll(".hc")).toHaveLength(7)
    expect(container.textContent).toBe("On paper")
  })
})

describe("Headline", () => {
  beforeEach(() => {
    // jsdom has no IntersectionObserver: report visible at once
    vi.stubGlobal("IntersectionObserver", class {
      cb: IntersectionObserverCallback
      constructor(cb: IntersectionObserverCallback) { this.cb = cb }
      observe() { this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver) }
      disconnect() {}
    })
  })

  it("labels the h1 with the full text and hides the split spans", () => {
    const { getByRole, container } = render(<Headline world="artist" className="big">Working<br /><em>notebooks</em>.</Headline>)
    const h1 = getByRole("heading", { level: 1 })
    expect(h1.getAttribute("aria-label")).toBe("Working notebooks.")
    expect(h1.className).toBe("hl-write big in")
    expect(container.querySelector(".hw")?.getAttribute("aria-hidden")).toBe("true")
  })

  it("counts analyst letters through digits, never punctuation", () => {
    const { getByRole } = render(<Headline world="analyst">The <em>work.</em></Headline>)
    const h1 = getByRole("heading", { level: 1 })
    expect(h1.className).toBe("hl-count in")
    const dot = Array.from(h1.querySelectorAll<HTMLElement>(".hc")).find((c) => c.textContent === ".")
    expect(dot?.dataset.d).toBeUndefined()
    expect(h1.querySelector<HTMLElement>(".hc")?.dataset.d).toMatch(/^\d$/)
  })

  it("countIn cleanup restores every real letter", () => {
    const { container } = render(<h1>{splitHeadline("Skills", { chars: true }).nodes}</h1>)
    const stop = countIn(container.querySelector("h1")!)
    expect(container.querySelectorAll(".hc[data-d]").length).toBe(6)
    stop()
    expect(container.querySelectorAll(".hc[data-d]").length).toBe(0)
  })
})
