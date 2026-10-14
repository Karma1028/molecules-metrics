import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { useGoaClock, useGoaPhrase } from "./useGoaClock"

describe("useGoaClock (C3 split)", () => {
  it("provides HH:MM time string for analyst", () => {
    const { result } = renderHook(() => useGoaClock())
    expect(result.current).toMatch(/^\d{2}:\d{2}$/)
  })

  it("provides human phrase for artist", () => {
    const { result } = renderHook(() => useGoaPhrase())
    expect(result.current).toMatch(/(morning|afternoon|evening|night) in Goa/)
  })
})
