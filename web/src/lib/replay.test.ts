import { describe, expect, it } from "vitest"
import { parseLog, frameAt, kindOf, blockOf, TYPE_MS, HOLD_MS } from "./replay"

const RAW = [
  "aaa1111|2026-10-15T00:35:55+05:30|3|120|4|chore: baseline",
  "bbb2222|2026-10-16T10:00:00+05:30|10|900|50|feat: gallery",
  "",
  "bad line",
].join("\n")

describe("parseLog", () => {
  it("keeps well-formed lines and drops the rest", () => {
    const e = parseLog(RAW)
    expect(e).toHaveLength(2)
    expect(e[0]).toEqual({ hash: "aaa1111", date: "2026-10-15", files: 3, added: 120, removed: 4, subject: "chore: baseline" })
  })
  it("keeps pipes inside the subject", () => {
    expect(parseLog("c|2026-01-01T00:00:00Z|1|2|3|fix: a|b")[0].subject).toBe("fix: a|b")
  })
  it("tolerates missing stats as zero", () => {
    expect(parseLog("c|2026-01-01T00:00:00Z|||| fix: x")[0].files).toBe(0)
  })
})

describe("kindOf", () => {
  it("reads the conventional-commit type", () => {
    expect(kindOf("feat(bridge): x")).toBe("feat")
    expect(kindOf("perf: x")).toBe("perf")
    expect(kindOf("random words")).toBe("other")
  })
})

describe("blockOf", () => {
  const e = parseLog(RAW)
  it("is taller for bigger changes, within bounds", () => {
    const a = blockOf(e[0])
    const b = blockOf(e[1])
    expect(b.height).toBeGreaterThan(a.height)
    expect(a.height).toBeGreaterThanOrEqual(8)
    expect(b.height).toBeLessThanOrEqual(100)
  })
  it("carries the kind", () => {
    expect(blockOf(e[1]).kind).toBe("feat")
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
  })
  it("moves a finished line to done after the hold", () => {
    const per = (s: string) => (s.length + 12) * TYPE_MS + HOLD_MS
    expect(frameAt(e, per(e[0].subject) + 1).done).toHaveLength(1)
  })
  it("finishes with every line done", () => {
    const f = frameAt(e, 1e9)
    expect(f.finished).toBe(true)
    expect(f.done).toHaveLength(2)
  })
})
