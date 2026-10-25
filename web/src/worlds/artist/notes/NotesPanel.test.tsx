import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { NotesPanel } from "./NotesPanel"

vi.mock("../../../lib/live", () => ({
  useMedium: () => ({
    fallback: false,
    loading: false,
    data: {
      configured: true,
      posts: [{ title: "A Medium essay", url: "https://medium.com/@x/essay?source=rss", published: "Tue, 10 Feb 2026 04:43:07 GMT", snippet: "snip" }],
    },
  }),
  useFeed: () => ({
    fallback: false,
    loading: false,
    data: {
      generatedAt: "2026-10-25T00:00:00.000Z",
      interests: [{ id: "football", label: "Football" }, { id: "ai", label: "AI" }],
      papers: [{ title: "A daily paper", link: "https://huggingface.co/papers/1", date: "2026-10-24T00:00:00.000Z", summary: "s", source: "Hugging Face", score: 9, tags: ["ai"] }],
      news: [
        { title: "Barca win", link: "https://news/1", date: "2026-10-24T00:00:00.000Z", summary: "", source: "BBC Sport", tags: ["football"] },
        { title: "Model released", link: "https://news/2", date: "2026-10-23T00:00:00.000Z", summary: "", source: "Hacker News", tags: ["ai"] },
      ],
    },
  }),
}))

const mount = () =>
  render(
    <MemoryRouter>
      <NotesPanel reduce />
    </MemoryRouter>,
  )

describe("NotesPanel", () => {
  it("lists the Medium mirror under Writing with an external link and a Medium badge", () => {
    mount()
    const link = screen.getByRole("link", { name: /A Medium essay/ })
    expect(link.getAttribute("href")).toBe("https://medium.com/@x/essay?source=rss")
    expect(link.getAttribute("target")).toBe("_blank")
    expect(link.getAttribute("rel")).toContain("noopener")
    expect(screen.getAllByText("Medium").length).toBeGreaterThan(0)
  })

  it("shows a count on every tab", () => {
    mount()
    expect(screen.getByRole("tab", { name: /Writing/ }).textContent).toContain("1")
    expect(screen.getByRole("tab", { name: /Papers/ }).textContent).toContain("1")
    expect(screen.getByRole("tab", { name: /The wire/ }).textContent).toContain("2")
  })

  it("switches to the wire and filters by interest", () => {
    mount()
    fireEvent.click(screen.getByRole("tab", { name: /The wire/ }))
    expect(screen.getByText("Barca win")).toBeTruthy()
    expect(screen.getByText("Model released")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Football" }))
    expect(screen.getByText("Barca win")).toBeTruthy()
    expect(screen.queryByText("Model released")).toBeNull()
  })

  it("resets the interest filter when changing tab", () => {
    mount()
    fireEvent.click(screen.getByRole("tab", { name: /The wire/ }))
    fireEvent.click(screen.getByRole("button", { name: "Football" }))
    fireEvent.click(screen.getByRole("tab", { name: /Papers/ }))
    expect(screen.getByText("A daily paper")).toBeTruthy()
  })

  it("keeps Previous disabled on the first page and shows page numbers", () => {
    mount()
    expect((screen.getByRole("button", { name: "Previous page" }) as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByText("01 / 01")).toBeTruthy()
  })
})
