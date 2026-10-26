import { describe, expect, it } from "vitest"
import { MODE_KEY, parseMode, readStoredMode, writeStoredMode } from "./mode"

describe("parseMode", () => {
  it("accepts day and night only, defaulting to day", () => {
    expect(parseMode("night")).toBe("night")
    expect(parseMode("day")).toBe("day")
    expect(parseMode("neon")).toBe("day")
    expect(parseMode(null)).toBe("day")
  })
})

describe("storage access", () => {
  it("returns null when storage throws (private window, blocked site data)", () => {
    const broken = {
      getItem: () => {
        throw new Error("denied")
      },
      setItem: () => {
        throw new Error("denied")
      },
    } as unknown as Storage
    expect(readStoredMode(broken)).toBeNull()
    expect(() => writeStoredMode("night", broken)).not.toThrow()
  })

  it("round-trips a valid mode through a working store", () => {
    const store = new Map<string, string>()
    const fake = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    } as unknown as Storage
    writeStoredMode("night", fake)
    expect(store.get(MODE_KEY)).toBe("night")
    expect(readStoredMode(fake)).toBe("night")
  })
})
