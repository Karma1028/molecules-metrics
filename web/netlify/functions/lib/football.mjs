// FC Barcelona data for the hero card and the Matchday room. Keyless: TheSportsDB public
// key + Guardian RSS. Every getter takes an injectable fetch and never throws; on any
// upstream failure the fields come back empty so the UI shows its honest empty state.
const BASE = "https://www.thesportsdb.com/api/v1/json/123/"
const BARCA_ID = "133739"
const LALIGA_ID = "4335"
const FIELDS = ["strTimestamp", "strHomeTeam", "strAwayTeam", "intHomeScore", "intAwayScore", "strLeague", "intRound", "strStatus", "strVenue"]

export const slim = (e) => (e ? Object.fromEntries(FIELDS.map((k) => [k, e[k] ?? null])) : null)

export const seasonOf = (now) => {
  const y = now.getUTCFullYear()
  return now.getUTCMonth() >= 6 ? `${y}-${y + 1}` : `${y - 1}-${y}`
}

export function formFrom(results) {
  const out = []
  for (const e of results.slice(0, 5)) {
    const home = e.strHomeTeam === "Barcelona"
    const us = Number(home ? e.intHomeScore : e.intAwayScore)
    const them = Number(home ? e.intAwayScore : e.intHomeScore)
    if (Number.isNaN(us) || Number.isNaN(them) || e.intHomeScore == null) continue
    out.push(us > them ? "W" : us < them ? "L" : "D")
  }
  return out
}

async function getJson(fetchFn, url) {
  try {
    const r = await fetchFn(url)
    return r.ok ? await r.json() : null
  } catch {
    return null
  }
}

async function lastAndNext(fetchFn) {
  const [l, n] = await Promise.all([
    getJson(fetchFn, `${BASE}eventslast.php?id=${BARCA_ID}`),
    getJson(fetchFn, `${BASE}eventsnext.php?id=${BARCA_ID}`),
  ])
  return { results: l?.results ?? [], events: n?.events ?? [] }
}

export async function getBarca(fetchFn = fetch) {
  const { results, events } = await lastAndNext(fetchFn)
  return { last: slim(results[0]), next: slim(events[0]), source: "thesportsdb", fetchedAt: Date.now() }
}

export async function getFootball(fetchFn = fetch, now = new Date()) {
  const season = seasonOf(now)
  const [{ results, events }, tbl] = await Promise.all([
    lastAndNext(fetchFn),
    getJson(fetchFn, `${BASE}lookuptable.php?l=${LALIGA_ID}&s=${season}`),
  ])
  const row = (tbl?.table ?? []).find((t) => (t.strTeam ?? "").startsWith("Barcelona"))
  const n = (k) => Number(row?.[k] ?? 0)
  const standing = row
    ? { rank: n("intRank"), points: n("intPoints"), played: n("intPlayed"), gd: n("intGoalDifference"),
        goals: n("intGoalsFor"), conceded: n("intGoalsAgainst"), win: n("intWin"), draw: n("intDraw"), loss: n("intLoss"), season }
    : null
  // strForm is oldest-first; the match feed is newest-first and more reliable.
  const tableForm = [...(row?.strForm ?? "").toUpperCase()].reverse().filter((c) => "WDL".includes(c)).slice(0, 5)
  let form = formFrom(results)
  if (form.length < tableForm.length) form = tableForm
  return { configured: true, next: slim(events[0]), last: slim(results[0]), form, standing, source: "thesportsdb", fetchedAt: Date.now() }
}

export async function getNews(fetchFn = fetch) {
  try {
    const r = await fetchFn("https://www.theguardian.com/football/rss")
    if (!r.ok) return { configured: true, items: [] }
    const xml = await r.text()
    const tag = (s, t) => (s.match(new RegExp(`<${t}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${t}>`)) ?? [])[1]?.trim() ?? ""
    const items = []
    for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const title = tag(m[1], "title"), url = tag(m[1], "link")
      if (title && url) items.push({ title, url, source: "The Guardian", published: tag(m[1], "pubDate") })
      if (items.length >= 12) break
    }
    return { configured: true, items }
  } catch {
    return { configured: true, items: [] }
  }
}
