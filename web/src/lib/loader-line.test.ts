import { describe, expect, it } from "vitest"
import { loaderLine } from "./loader-line"

describe("loaderLine", () => {
  it("speaks darkroom in the artist world", () => {
    expect(loaderLine("artist", "/artist/gallery")).toBe("developing the contact sheet")
  })
  it("speaks shell in the analyst world", () => {
    expect(loaderLine("analyst", "/analyst/skills")).toBe("> select * from skills;")
  })
  it("falls back per world for unknown pages", () => {
    expect(loaderLine("artist", "/artist/zzz")).toBe("turning the page")
    expect(loaderLine("analyst", "/analyst/zzz")).toBe("> loading module")
  })
  it("matches nested paths by prefix", () => {
    expect(loaderLine("artist", "/artist/notes/some-post")).toBe("setting the type")
  })
})
