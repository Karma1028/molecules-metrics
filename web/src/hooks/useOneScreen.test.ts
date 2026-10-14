import { describe, it, expect, afterEach } from "vitest"
import { renderHook } from "@testing-library/react"
import { useOneScreen } from "./useOneScreen"

afterEach(() => {
  delete document.documentElement.dataset.oneScreen
  delete document.documentElement.dataset.toc
})

describe("useOneScreen", () => {
  it("defaults to one-screen and cleans up", () => {
    const { unmount } = renderHook(() => useOneScreen())
    expect(document.documentElement.dataset.oneScreen).toBe("")
    unmount()
    expect(document.documentElement.dataset.oneScreen).toBeUndefined()
  })

  it("toc mode sets data-toc only", () => {
    const { unmount } = renderHook(() => useOneScreen("toc"))
    expect(document.documentElement.dataset.toc).toBe("")
    expect(document.documentElement.dataset.oneScreen).toBeUndefined()
    unmount()
    expect(document.documentElement.dataset.toc).toBeUndefined()
  })

  it("switching mode moves the flag", () => {
    const { rerender, unmount } = renderHook(({ m }) => useOneScreen(m), {
      initialProps: { m: "toc" as "toc" | "one-screen" },
    })
    rerender({ m: "one-screen" })
    expect(document.documentElement.dataset.toc).toBeUndefined()
    expect(document.documentElement.dataset.oneScreen).toBe("")
    unmount()
  })
})
