import { describe, it, expect } from "vitest"
import { parseLrc, activeLine } from "./lrc"

const SAMPLE = `[00:00.00]intro
[00:12.50]first line
[00:18.20]second line
[01:05.00]last line`

describe("parseLrc", () => {
  it("returns empty for null/empty/plain input", () => {
    expect(parseLrc(null)).toEqual([])
    expect(parseLrc("")).toEqual([])
    expect(parseLrc("just plain lyrics\nno timestamps")).toEqual([])
  })

  it("parses timestamps to seconds and keeps text", () => {
    const lines = parseLrc(SAMPLE)
    expect(lines).toHaveLength(4)
    expect(lines[1]).toEqual({ t: 12.5, text: "first line" })
    expect(lines[3].t).toBe(65)
  })

  it("expands a multi-timestamp line into one entry per stamp, sorted", () => {
    const lines = parseLrc("[00:10.00][00:40.00]chorus")
    expect(lines.map((l) => l.t)).toEqual([10, 40])
    expect(lines.every((l) => l.text === "chorus")).toBe(true)
  })
})

describe("activeLine", () => {
  const lines = parseLrc(SAMPLE)
  it("returns -1 before the first line", () => {
    expect(activeLine(lines, -1)).toBe(-1)
  })
  it("returns the last passed line", () => {
    expect(activeLine(lines, 13)).toBe(1)
    expect(activeLine(lines, 19)).toBe(2)
    expect(activeLine(lines, 999)).toBe(3)
  })
})
