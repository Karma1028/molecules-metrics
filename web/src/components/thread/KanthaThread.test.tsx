import { beforeEach, describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { KanthaThread } from "./KanthaThread"
import { clearThread } from "../../lib/route-thread"

beforeEach(() => { clearThread() })

describe("KanthaThread", () => {
  it("adds a stitch for the current page and says it stays on the device", () => {
    render(<MemoryRouter initialEntries={["/artist/gallery"]}><KanthaThread /></MemoryRouter>)
    const t = screen.getByRole("img")
    expect(t.getAttribute("aria-label")).toMatch(/1 page opened/)
    expect(t.getAttribute("aria-label")).toMatch(/stays on your device/)
    expect(t.querySelectorAll(".st")).toHaveLength(1)
  })
})
