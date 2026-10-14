import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ComingSoon } from "../components/ComingSoon"

describe("ComingSoon Honest Stubs", () => {
  beforeEach(() => {
    delete document.documentElement.dataset.oneScreen
  })

  it("sets and cleans up data-one-screen attribute", () => {
    const { unmount } = render(
      <MemoryRouter>
        <ComingSoon
          world="artist"
          icon="i-quote"
          kicker="Field Notes"
          title="Field Notes"
          blurb="Honest description."
          backTo="/artist"
          backLabel="Back to Contents"
        />
      </MemoryRouter>
    )

    expect(document.documentElement.dataset.oneScreen).toBe("")
    unmount()
    expect(document.documentElement.dataset.oneScreen).toBeUndefined()
  })

  it("renders honest in progress state with zero em-dashes", () => {
    const { container } = render(
      <MemoryRouter>
        <ComingSoon
          world="analyst"
          icon="i-route"
          kicker="Trajectory Log"
          title="Journey"
          blurb="Academic and professional progression telemetry in progress."
          backTo="/analyst"
          backLabel="Back to Index"
        />
      </MemoryRouter>
    )

    expect(screen.getByText("in progress")).toBeDefined()
    expect(screen.getByText("Journey")).toBeDefined()
    expect(screen.getByText("Trajectory Log Spread")).toBeDefined()
    expect(screen.getByText("Back to Index")).toBeDefined()

    // Assert zero em-dashes (— or –) anywhere in rendered HTML
    const html = container.innerHTML
    expect(html.includes("—")).toBe(false)
    expect(html.includes("–")).toBe(false)
  })
})
