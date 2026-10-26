// Bakes the Field Notes wire (daily papers + interest news) to public/data/feed.json.
// Runs server-side (GitHub Action / `npm run snapshot`), so no CORS and no keys.
// A source that fails is skipped; if everything fails the previous file is left untouched.
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { dedupeSort, fromHfDaily, parseFeed, tagByInterest } from "./feed-parse.mjs"

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, "..", "public", "data", "feed.json")
const TIMEOUT_MS = 12000
const UA = "Mozilla/5.0 (compatible; karma-feed-bot/1.0; +https://github.com/Karma1028/molecules-metrics)"

async function get(url) {
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "*/*" }, signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res
}

async function pull(source, cap) {
  try {
    const res = await get(source.url)
    const items = source.kind === "hf" ? fromHfDaily(await res.json()) : parseFeed(await res.text())
    console.log(`ok   ${source.name} (${items.length})`)
    return items.slice(0, cap).map((i) => ({ ...i, source: source.name, _tag: source.tag, _only: source.only }))
  } catch (e) {
    console.warn(`warn ${source.name}: ${e.message}`)
    return []
  }
}

/** Tags by keyword, adds the source's default tag, and honours `only` (keep just items matching that interest). */
function finish(items, interests) {
  return tagByInterest(items, interests)
    .map(({ _tag, _only, ...i }) => ({ ...i, tags: [...new Set([...(i.tags ?? []), ...(_tag ? [_tag] : [])])], _only }))
    .filter((i) => !i._only || i.tags.includes(i._only))
    .map(({ _only, ...i }) => i)
}

async function main() {
  const cfg = JSON.parse(await readFile(join(HERE, "feed-config.json"), "utf8"))
  const [papersRaw, newsRaw] = await Promise.all([
    Promise.all(cfg.papers.map((s) => pull(s, cfg.perSourceCap * 3))),
    Promise.all(cfg.news.map((s) => pull(s, cfg.perSourceCap))),
  ])
  const papers = dedupeSort(finish(papersRaw.flat(), cfg.interests), cfg.papersCap)
  const news = dedupeSort(finish(newsRaw.flat(), cfg.interests), cfg.newsCap)

  if (papers.length === 0 && news.length === 0) {
    console.warn("warn feed: every source failed; kept existing feed.json")
    return
  }
  const body = {
    generatedAt: new Date().toISOString(),
    interests: cfg.interests.map(({ id, label }) => ({ id, label })),
    papers,
    news,
  }
  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify(body, null, 2) + "\n")
  console.log(`ok   feed.json (${papers.length} papers, ${news.length} news)`)
}

main().catch((e) => {
  console.warn(`warn feed: ${e.message}`)
})
