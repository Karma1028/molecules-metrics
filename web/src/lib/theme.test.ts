import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useWorldTheme, initialTheme, themeKey } from "./theme"

// Node's own (path-less) localStorage global shadows jsdom's; use a plain in-memory one.
beforeEach(() => {
  const m = new Map<string, string>()
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => (m.has(k) ? m.get(k)! : null),
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
    key: (i: number) => [...m.keys()][i] ?? null,
    get length() {
      return m.size
    },
  })
})

describe("per-world theme (C1)", () => {
  it("defaults: artist light, analyst dark", () => {
    expect(initialTheme("artist")).toBe("light")
    expect(initialTheme("analyst")).toBe("dark")
  })

  it("toggling the artist world does not leak into the analyst world", () => {
    const { result } = renderHook(() => useWorldTheme("artist"))
    act(() => result.current.toggle())
    expect(result.current.theme).toBe("dark")
    expect(localStorage.getItem(themeKey("artist"))).toBe("dark")
    expect(initialTheme("analyst")).toBe("dark")
    act(() => result.current.toggle())
    expect(initialTheme("artist")).toBe("light")
    expect(localStorage.getItem(themeKey("analyst"))).toBeNull()
  })

  it("ignores the legacy shared key", () => {
    localStorage.setItem("nb-theme", "light")
    expect(initialTheme("analyst")).toBe("dark")
  })
})

describe("rememberTheme (landing → world hand-off)", () => {
  it("stores the choice under the world's own key so entering that world keeps it", async () => {
    const { rememberTheme } = await import("./theme")
    rememberTheme("artist", "dark")
    expect(initialTheme("artist")).toBe("dark")
    expect(initialTheme("analyst")).toBe("dark")
    rememberTheme("analyst", "light")
    expect(initialTheme("analyst")).toBe("light")
    expect(initialTheme("artist")).toBe("dark")
  })
})
