import { describe, expect, it, vi } from "vitest"
import { HORSE_ASCII, letterLines, printLetter } from "./console-letter"

describe("console letter", () => {
  it("keeps the ascii horse within 60 columns", () => {
    expect(HORSE_ASCII.split("\n").every((l) => l.length <= 60)).toBe(true)
  })

  it("names the stack and invites a hello without personal claims", () => {
    const text = letterLines().join("\n")
    expect(text).toMatch(/React/)
    expect(text).toMatch(/tuhin\.gim@gmail\.com/)
  })

  it("prints once per page load", () => {
    const log = vi.fn()
    printLetter(log)
    const first = log.mock.calls.length
    printLetter(log)
    expect(log.mock.calls.length).toBe(first)
  })
})
