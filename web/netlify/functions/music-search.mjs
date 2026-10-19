// GET /api/music/search?q=... (rewritten here by netlify.toml).
// Mirrors prototype/server.py music_search() for the YouTube half: embeddable
// music videos from the YouTube Data API v3, in the radio's MusicTrack shape.
// Needs the YOUTUBE_API_KEY site env var; without it answers configured:false
// and the client falls back to keyless iTunes 30 s previews.

const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"
const MAX_Q = 120
const MAX_RESULTS = 6
const TIMEOUT_MS = 8000
const CACHE = "public, max-age=300, s-maxage=300, stale-while-revalidate=600"

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#039;": "'" }
const unescape = (s) =>
  String(s ?? "")
    .replace(/&(?:amp|lt|gt|quot|#0?39);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))

const json = (body, status = 200, cache = CACHE) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": cache },
  })

export default async (req) => {
  const q = (new URL(req.url).searchParams.get("q") ?? "").trim()
  if (!q) return json({ configured: true, query: "", results: [] })
  if (q.length > MAX_Q) return json({ configured: true, query: "", results: [], error: "query too long" }, 400, "no-store")

  const key = process.env.YOUTUBE_API_KEY
  if (!key) return json({ configured: false, query: q, results: [] })

  const qs = new URLSearchParams({
    part: "snippet",
    q,
    type: "video",
    videoEmbeddable: "true",
    videoCategoryId: "10",
    maxResults: String(MAX_RESULTS),
    key,
  })
  try {
    const r = await fetch(`${SEARCH_URL}?${qs}`, { signal: AbortSignal.timeout(TIMEOUT_MS) })
    if (!r.ok) {
      // never echo the upstream body: it can quote the request URL (and so the key)
      console.error(`[music-search] YouTube API HTTP ${r.status}`)
      return json({ configured: true, query: q, results: [] }, 200, "no-store")
    }
    const d = await r.json()
    const results = (d.items ?? [])
      .filter((it) => it?.id?.videoId)
      .map((it) => {
        const id = it.id.videoId
        const sn = it.snippet ?? {}
        return {
          id,
          title: unescape(sn.title),
          artist: unescape(sn.channelTitle),
          source: "youtube",
          url: `https://www.youtube.com/watch?v=${id}`,
          art: sn.thumbnails?.medium?.url ?? sn.thumbnails?.default?.url,
        }
      })
    return json({ configured: true, query: q, results })
  } catch (e) {
    console.error(`[music-search] ${e?.name ?? "error"}`)
    return json({ configured: true, query: q, results: [] }, 200, "no-store")
  }
}
