import { beforeEach, describe, expect, it } from "vitest"
import { clearWatched, echoLine, getWatched, setWatched } from "./last-watched"

beforeEach(() => { clearWatched() })

describe("last-watched", () => {
  it("is empty on a cold visit and says so honestly", () => {
    expect(getWatched()).toBeNull()
    expect(echoLine(null)).toBe("nothing watched yet. go look.")
  })

  it("remembers the last frame opened, zero-padded in the echo", () => {
    setWatched({ kind: "frame", index: 13, total: 33, name: "red lanterns" })
    expect(getWatched()?.name).toBe("red lanterns")
    expect(echoLine(getWatched())).toBe('last watched -> frame 14 of 33, "red lanterns"')
  })

  it("keeps only the latest", () => {
    setWatched({ kind: "frame", index: 1, total: 33, name: "a" })
    setWatched({ kind: "frame", index: 2, total: 33, name: "b" })
    expect(getWatched()?.name).toBe("b")
  })

  it("ignores corrupt storage", () => {
    sessionStorage.setItem("mm-last-watched", "{nope")
    expect(getWatched()).toBeNull()
  })
})
