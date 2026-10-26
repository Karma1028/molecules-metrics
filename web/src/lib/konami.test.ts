import { describe, expect, it } from "vitest"
import { KONAMI, createKonami } from "./konami"

const feed = (seq: string[]) => {
  const k = createKonami()
  return seq.map((key) => k.push(key))
}

describe("konami", () => {
  it("fires only on the last key of the full sequence", () => {
    const out = feed(KONAMI)
    expect(out.slice(0, -1).every((v) => v === false)).toBe(true)
    expect(out.at(-1)).toBe(true)
  })
  it("recovers after a wrong key and still matches", () => {
    const out = feed(["x", ...KONAMI])
    expect(out.at(-1)).toBe(true)
  })
  it("does not fire on a partial sequence", () => {
    expect(feed(KONAMI.slice(0, -1)).every((v) => v === false)).toBe(true)
  })
  it("is case-insensitive for the letter keys", () => {
    const out = feed(KONAMI.map((k) => (k.length === 1 ? k.toUpperCase() : k)))
    expect(out.at(-1)).toBe(true)
  })
  it("resets after firing so it can fire again", () => {
    const k = createKonami()
    KONAMI.forEach((key) => k.push(key))
    expect(KONAMI.map((key) => k.push(key)).at(-1)).toBe(true)
  })
})
