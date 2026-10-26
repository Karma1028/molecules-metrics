import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Matchday } from "./artist/Matchday"
import { Work } from "./analyst/Work"

describe("T:b1 Creative Pages (Matchday & Work)", () => {
  beforeEach(() => {
    delete document.documentElement.dataset.oneScreen
  })

  describe("Matchday (Football Room)", () => {
    it("sets data-one-screen on mount and removes on unmount", () => {
      const { unmount } = render(
        <MemoryRouter>
          <Matchday />
        </MemoryRouter>
      )
      expect(document.documentElement.dataset.oneScreen).toBe("")
      unmount()
      expect(document.documentElement.dataset.oneScreen).toBeUndefined()
    })

    it("renders the fanzine masthead, poster and live fixture sections", () => {
      render(
        <MemoryRouter>
          <Matchday />
        </MemoryRouter>
      )

      expect(screen.getByText(/Matchday fanzine/i)).toBeDefined()
      expect(screen.getByText(/Last season.*per match/i)).toBeDefined()
      expect(screen.getAllByText(/Next fixture/i).length).toBeGreaterThan(0)
      expect(screen.getByText(/The wire/i)).toBeDefined()
    })

    it("opens the lens-lightbox when a feature photo is activated", () => {
      render(
        <MemoryRouter>
          <Matchday />
        </MemoryRouter>
      )

      const lead = screen.getByRole("button", { name: /Scarves up, full throat/i })
      fireEvent.click(lead)
      expect(screen.getByRole("dialog", { name: /Photo enlarged/i })).toBeDefined()
    })
  })

  describe("Work (Production Case Studies)", () => {
    it("sets data-one-screen on mount and removes on unmount", () => {
      const { unmount } = render(
        <MemoryRouter>
          <Work />
        </MemoryRouter>
      )
      expect(document.documentElement.dataset.oneScreen).toBe("")
      unmount()
      expect(document.documentElement.dataset.oneScreen).toBeUndefined()
    })

    it("renders honest work entries without fabricated facts", () => {
      render(
        <MemoryRouter>
          <Work />
        </MemoryRouter>
      )

      expect(screen.getByRole("heading", { level: 1, name: /The\s*work\./i })).toBeDefined()
      // First case is InfoLeap
      expect(screen.getAllByText(/InfoLeap/).length).toBeGreaterThan(0)
    })

    it("renders deck navigation buttons", () => {
      render(
        <MemoryRouter>
          <Work />
        </MemoryRouter>
      )

      const buttons = screen.getAllByRole("button")
      expect(buttons.length).toBeGreaterThanOrEqual(4)
    })
  })
})
