// Pure feed helpers for scripts/bake-feed.mjs (and unit-tested from src/lib/notes).
// No network, no filesystem: text in, plain objects out.

const SUMMARY_MAX = 280

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
}

/** CDATA or escaped markup -> plain single-line text. */
function clean(raw) {
  if (raw == null) return ""
  const cd = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
  let text = cd ? cd[1] : decode(raw)
  text = text.replace(/<\/(p|div|li|h[1-6]|br)>|<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "")
  if (cd) text = decode(text)
  return text.replace(/\s+/g, " ").trim()
}

function field(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"))
  return m ? m[1] : null
}

function isoDate(raw) {
  if (!raw) return ""
  const t = new Date(clean(raw))
  return Number.isNaN(t.getTime()) ? "" : t.toISOString()
}

function linkOf(block) {
  const text = clean(field(block, "link") ?? "")
  if (text) return text
  const alt = block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i) ?? block.match(/<link[^>]*href=["']([^"']+)["']/i)
  return alt ? decode(alt[1]) : clean(field(block, "id") ?? "")
}

function cap(s, max) {
  return s.length > max ? `${s.slice(0, max).trimEnd()}…` : s
}

/** RSS 2.0 <item> and Atom <entry> -> [{ title, link, date, summary }]. Never throws. */
export function parseFeed(xml, { max = SUMMARY_MAX } = {}) {
  if (typeof xml !== "string" || !xml) return []
  const blocks = [...xml.matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi)].map((m) => m[2])
  return blocks
    .map((b) => ({
      title: clean(field(b, "title")),
      link: linkOf(b),
      date: isoDate(field(b, "pubDate") ?? field(b, "published") ?? field(b, "updated") ?? field(b, "dc:date")),
      summary: cap(clean(field(b, "description") ?? field(b, "summary") ?? field(b, "content:encoded") ?? ""), max),
    }))
    .filter((i) => i.title && i.link)
}

/** https://huggingface.co/api/daily_papers -> [{ title, link, date, summary, score }]. */
export function fromHfDaily(json) {
  if (!Array.isArray(json)) return []
  return json
    .map((row) => row?.paper)
    .filter((p) => p && p.id && p.title)
    .map((p) => ({
      title: clean(p.title),
      link: `https://huggingface.co/papers/${p.id}`,
      date: isoDate(p.publishedAt),
      summary: cap(clean(p.summary ?? ""), SUMMARY_MAX),
      score: typeof p.upvotes === "number" ? p.upvotes : 0,
    }))
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/** Adds `tags` (interest ids) by whole-word keyword match over title + summary. */
export function tagByInterest(items, interests) {
  const matchers = interests.map((i) => ({
    id: i.id,
    re: new RegExp(`(?<![\\p{L}\\p{N}])(?:${i.keywords.map(escapeRe).join("|")})(?![\\p{L}\\p{N}])`, "iu"),
  }))
  return items.map((item) => {
    const text = `${item.title} ${item.summary}`
    return { ...item, tags: matchers.filter((m) => m.re.test(text)).map((m) => m.id) }
  })
}

function canonical(link) {
  try {
    const u = new URL(link)
    return `${u.origin}${u.pathname}`.replace(/\/+$/, "").toLowerCase()
  } catch {
    return link.replace(/[?#].*$/, "").toLowerCase()
  }
}

/** Drops repeats (same link ignoring query, or same title), newest first, undated last, capped. */
export function dedupeSort(items, cap = Infinity) {
  const links = new Set()
  const titles = new Set()
  const kept = []
  for (const item of items) {
    const l = canonical(item.link)
    const t = item.title.trim().toLowerCase()
    if (links.has(l) || titles.has(t)) continue
    links.add(l)
    titles.add(t)
    kept.push(item)
  }
  kept.sort((a, b) => (a.date === b.date ? 0 : !a.date ? 1 : !b.date ? -1 : a.date < b.date ? 1 : -1))
  return kept.slice(0, cap)
}
