import { describe, expect, it } from "vitest"
import { clampPage, pageCount, pageOffset } from "./paging"

describe("column paging", () => {
  it("counts pages from the flow width, gap included", () => {
    expect(pageCount(400, 400, 40)).toBe(1)
    expect(pageCount(1000, 400, 40)).toBe(3)
    // three columns of 400 with two 40px gaps are exactly 1280 wide
    expect(pageCount(1280, 400, 40)).toBe(3)
    expect(pageCount(1281, 400, 40)).toBe(4)
  })
  it("never reports fewer than one page, even when unmeasured", () => {
    expect(pageCount(0, 0, 40)).toBe(1)
    expect(pageCount(10, 400, 40)).toBe(1)
  })
  it("offsets by whole pages", () => {
    expect(pageOffset(0, 400, 40)).toBe(0)
    expect(pageOffset(2, 400, 40)).toBe(880)
  })
  it("clamps the current page into range", () => {
    expect(clampPage(-1, 3)).toBe(0)
    expect(clampPage(9, 3)).toBe(2)
    expect(clampPage(1, 3)).toBe(1)
  })
})
