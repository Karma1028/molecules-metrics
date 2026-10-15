import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ArtistHome } from "./artist/ArtistHome"
import { AnalystHome } from "./analyst/AnalystHome"

describe("Home IA Chapter Index (TOC) Rebuild per SKILL_SPEC", () => {
  beforeEach(() => {
    delete document.documentElement.dataset.toc
  })

  describe("ArtistHome (Field Notebook TOC)", () => {
    it("sets document.documentElement.dataset.toc on mount and removes on unmount", () => {
      const { unmount } = render(
        <MemoryRouter>
          <ArtistHome />
        </MemoryRouter>
      )
      expect(document.documentElement.dataset.toc).toBe("")
      unmount()
      expect(document.documentElement.dataset.toc).toBeUndefined()
    })

    it("renders all 6 chapters derived directly from WORLDS.artist.nav", () => {
      render(
        <MemoryRouter>
          <ArtistHome />
        </MemoryRouter>
      )

      expect(screen.getByText(/^Field Notebook/)).toBeDefined()
      expect(screen.getByRole("heading", { level: 1, name: "The Artist" })).toBeDefined()

      // Verify all 6 chapters are present
      expect(screen.getByText("Gallery")).toBeDefined()
      expect(screen.getByText("Sound")).toBeDefined()
      expect(screen.getByText("Matchday")).toBeDefined()
      expect(screen.getByText("Field Notes")).toBeDefined()
      expect(screen.getByText("About")).toBeDefined()
      expect(screen.getByText("Contact")).toBeDefined()

      // Verify gloss text (short, no em-dashes)
      expect(screen.getByText("Ten exposures, curated.")).toBeDefined()
      expect(screen.getByText("Eight years of listening, logged.")).toBeDefined()
    })
  })

  describe("AnalystHome (Instrument Logbook TOC)", () => {
    it("sets document.documentElement.dataset.toc on mount and removes on unmount", () => {
      const { unmount } = render(
        <MemoryRouter>
          <AnalystHome />
        </MemoryRouter>
      )
      expect(document.documentElement.dataset.toc).toBe("")
      unmount()
      expect(document.documentElement.dataset.toc).toBeUndefined()
    })

    it("renders all 6 subsystems derived directly from WORLDS.analyst.nav", () => {
      render(
        <MemoryRouter>
          <AnalystHome />
        </MemoryRouter>
      )

      expect(screen.getByText(/Instrument Logbook/i)).toBeDefined()
      expect(screen.getByRole("heading", { level: 1, name: /The\s*Analyst\./i })).toBeDefined()

      // Verify all 6 subsystems are present
      expect(screen.getByText("Skills")).toBeDefined()
      expect(screen.getByText("Work")).toBeDefined()
      expect(screen.getByText("Journey")).toBeDefined()
      expect(screen.getByText("Dashboard")).toBeDefined()
      expect(screen.getByText("Résumé")).toBeDefined()
      expect(screen.getByText("Contact")).toBeDefined()

      // Verify gloss text (3-6 words, no em-dashes)
      expect(screen.getByText("Mass balance to statistical modeling")).toBeDefined()
      expect(screen.getByText("Four production pipelines with verified impact")).toBeDefined()
    })
  })
})
