import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Mascot } from "./Mascot"

const mount = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Mascot />
    </MemoryRouter>,
  )

describe("Mascot", () => {
  it("renders one accessible button and an empty live bubble", () => {
    mount()
    expect(screen.getByRole("button", { name: /horse mascot/i })).toBeTruthy()
    expect(screen.getByRole("status").textContent).toBe("")
  })

  it("speaks a line when poked", () => {
    mount()
    fireEvent.click(screen.getByRole("button", { name: /horse mascot/i }))
    expect(screen.getByRole("status").textContent?.length).toBeGreaterThan(0)
  })

  it("hops on click", () => {
    const { container } = mount()
    fireEvent.click(screen.getByRole("button", { name: /horse mascot/i }))
    expect(container.querySelector(".mascot")?.hasAttribute("data-hop")).toBe(true)
  })
})
