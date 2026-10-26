import { beforeEach, describe, expect, it } from "vitest"
import { feedLine, reportFeed, resetFeeds } from "./feed-health"

beforeEach(() => { resetFeeds() })

describe("feed-health", () => {
  it("says nothing is loaded before any feed reports", () => {
    expect(feedLine()).toBeNull()
  })

  it("counts live, snapshot and asleep honestly", () => {
    reportFeed("/api/github", "live")
    reportFeed("/data/medium.json", "snapshot")
    reportFeed("/api/barca", "asleep")
    reportFeed("/api/frames", "asleep")
    expect(feedLine()).toBe("feeds: 1 live, 1 snapshot, 2 asleep")
  })

  it("keeps the latest status per feed, not a running total", () => {
    reportFeed("/api/github", "asleep")
    reportFeed("/api/github", "live")
    expect(feedLine()).toBe("feeds: 1 live")
  })

  it("ignores feeds still loading", () => {
    reportFeed("/api/github", "loading")
    expect(feedLine()).toBeNull()
  })
})
