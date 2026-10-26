/** Honest status of every data feed on the page, so the mascot can say what is really live. */
export type FeedStatus = "loading" | "live" | "snapshot" | "asleep"

const feeds = new Map<string, FeedStatus>()

export function reportFeed(path: string, status: FeedStatus): void {
  feeds.set(path, status)
}

export function resetFeeds(): void {
  feeds.clear()
}

export function feedLine(): string | null {
  const count = { live: 0, snapshot: 0, asleep: 0 }
  feeds.forEach((s) => { if (s !== "loading") count[s] += 1 })
  const parts = (["live", "snapshot", "asleep"] as const).filter((k) => count[k] > 0).map((k) => `${count[k]} ${k}`)
  return parts.length ? `feeds: ${parts.join(", ")}` : null
}
