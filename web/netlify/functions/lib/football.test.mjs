import { describe, it, expect } from "vitest"
import { slim, formFrom, seasonOf, getBarca, getFootball, getNews } from "./football.mjs"

const ev = (home, away, hs, as) => ({ strHomeTeam: home, strAwayTeam: away, intHomeScore: hs, intAwayScore: as, strTimestamp: "2026-10-01T19:00:00", extra: "x" })
const json = (body, ok = true) => async () => ({ ok, status: ok ? 200 : 500, json: async () => body, text: async () => (typeof body === "string" ? body : JSON.stringify(body)) })

describe("football helpers", () => {
  it("slim keeps only the fixture fields", () => {
    expect(slim(ev("Barcelona", "Getafe", "2", "0")).extra).toBeUndefined()
    expect(slim(undefined)).toBeNull()
  })
  it("formFrom gives newest-first W/D/L from Barcelona's side", () => {
    const f = formFrom([ev("Barcelona", "A", "2", "0"), ev("B", "Barcelona", "1", "1"), ev("Barcelona", "C", "0", "3")])
    expect(f).toEqual(["W", "D", "L"])
  })
  it("seasonOf rolls over in July", () => {
    expect(seasonOf(new Date("2026-10-26"))).toBe("2026-2027")
    expect(seasonOf(new Date("2027-03-01"))).toBe("2026-2027")
  })
  it("getBarca returns last + next", async () => {
    const f = async (u) => json(u.includes("eventslast") ? { results: [ev("Barcelona", "A", "2", "1")] } : { events: [ev("Barcelona", "B", null, null)] })()
    const r = await getBarca(f)
    expect(r.last.strAwayTeam).toBe("A")
    expect(r.next.strAwayTeam).toBe("B")
  })
  it("getBarca survives upstream failure", async () => {
    const r = await getBarca(json({}, false))
    expect(r.last).toBeNull()
    expect(r.next).toBeNull()
  })
  it("getFootball adds form and standing", async () => {
    const f = async (u) => {
      if (u.includes("lookuptable")) return json({ table: [{ strTeam: "Barcelona", intRank: "1", intPoints: "30", intPlayed: "10", intGoalDifference: "15", strForm: "LWWWW" }] })()
      if (u.includes("eventslast")) return json({ results: [ev("Barcelona", "A", "2", "1")] })()
      return json({ events: [ev("Barcelona", "B", null, null)] })()
    }
    const r = await getFootball(f, new Date("2026-10-26"))
    expect(r.configured).toBe(true)
    expect(r.standing.rank).toBe(1)
    expect(r.form[0]).toBe("W")
  })
  it("getNews parses RSS items and caps at 12", async () => {
    const items = Array.from({ length: 15 }, (_, i) => `<item><title>T${i}</title><link>https://x/${i}</link><pubDate>d</pubDate></item>`).join("")
    const r = await getNews(json(`<rss><channel>${items}</channel></rss>`))
    expect(r.items).toHaveLength(12)
    expect(r.items[0]).toMatchObject({ title: "T0", url: "https://x/0", source: "The Guardian" })
  })
  it("getNews returns empty list on failure", async () => {
    expect((await getNews(json("", false))).items).toEqual([])
  })
})
