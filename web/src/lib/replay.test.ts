import { describe, expect, it } from "vitest"
import { parseLog, frameAt, TYPE_MS, HOLD_MS } from "./replay"

const RAW = "aaa1111|2026-10-15T00:35:55+05:30|chore: baseline\nbbb2222|2026-10-16T10:00:00+05:30|feat: gallery\n\nbad line"

describe("parseLog", () => {
  it("keeps well-formed lines and drops the rest", () => {
    const e = parseLog(RAW)
    expect(e).toHaveLength(2)
    expect(e[0]).toEqual({ hash: "aaa1111", date: "2026-10-15", subject: "chore: baseline" })
  })
  it("keeps pipes inside the subject", () => {
    expect(parseLog("c|2026-01-01T00:00:00Z|fix: a|b")[0].subject).toBe("fix: a|b")
  })
})

describe("frameAt", () => {
  const e = parseLog(RAW)
  it("starts empty", () => {
    expect(frameAt(e, 0)).toEqual({ done: [], typing: "", finished: false })
  })
  it("types the first subject char by char", () => {
    const f = frameAt(e, TYPE_MS * 3)
    expect(f.done).toHaveLength(0)
    expect(f.typing.length).toBeGreaterThan(0)
    expect(f.typing.length).toBeLessThanOrEqual(3 + 12)
  })
  it("moves a finished line to done after the hold", () => {
    const per = (s: string) => (s.length + 12) * TYPE_MS + HOLD_MS
    const f = frameAt(e, per(e[0].subject) + 1)
    expect(f.done).toHaveLength(1)
  })
  it("finishes with every line done", () => {
    const f = frameAt(e, 1e9)
    expect(f.finished).toBe(true)
    expect(f.done).toHaveLength(2)
    expect(f.typing).toBe("")
  })
})
