/* Keyless music sources for the radio, so it works with no Python proxy and on the
   static host: pasted YouTube / Spotify links play through their official embeds,
   text search falls back to the iTunes Search API (30 s previews + artwork), and
   lyrics fall back to LRCLIB directly. All three answer browser CORS requests. */

export type MusicSource = "youtube" | "spotify" | "apple"

export interface MusicTrack {
  id: string
  title: string
  artist: string
  source: MusicSource
  art?: string
  url?: string
  durationMs?: number
  preview?: string | null
  /** official embed player URL, set when the track came from a pasted link */
  embed?: string
  /** link kind for pasted links: "video" / "playlist" (YouTube), "track" / "album" / ... (Spotify) */
  kind?: string
  /** start offset in seconds from a pasted link's t= / start= */
  start?: number
}

export interface MusicLink {
  source: "youtube" | "spotify"
  kind: string
  id: string
  embed: string
  url: string
  /** start offset in seconds (YouTube t= / start=), 0 when absent */
  start?: number
}

const YT_ID = /^[\w-]{11}$/
const SPOTIFY_ID = "([A-Za-z0-9]{22})"
const SPOTIFY_KINDS = "(track|album|playlist|episode|show|artist)"
const SPOTIFY_URI = new RegExp(`^spotify:${SPOTIFY_KINDS}:${SPOTIFY_ID}$`)
const SPOTIFY_PATH = new RegExp(`^/(?:intl-[\\w-]+/)?(?:embed/)?${SPOTIFY_KINDS}/${SPOTIFY_ID}`)
const YT_PATH = /^\/(?:shorts|live|embed|v)\/([\w-]{11})/
const YT_HOSTS = new Set(["youtube.com", "music.youtube.com", "youtube-nocookie.com"])
const ITUNES_LIMIT = 6
const ITUNES_ART = 600
const TIMEOUT_MS = 8000

/** "90", "90s", "1m30s", "1h2m3s" → seconds; anything else → 0. */
function startSeconds(t: string | null): number {
  if (!t) return 0
  if (/^\d+s?$/.test(t)) return parseInt(t, 10)
  const m = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(t)
  return m ? Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0) : 0
}

function youtubeVideo(id: string, u: URL): MusicLink {
  const start = startSeconds(u.searchParams.get("t") ?? u.searchParams.get("start"))
  return {
    source: "youtube",
    kind: "video",
    id,
    embed: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ""}`,
    url: `https://www.youtube.com/watch?v=${id}`,
    start,
  }
}

function spotifyLink(kind: string, id: string): MusicLink {
  return {
    source: "spotify",
    kind,
    id,
    embed: `https://open.spotify.com/embed/${kind}/${id}`,
    url: `https://open.spotify.com/${kind}/${id}`,
  }
}

/** Recognises YouTube, YouTube Music and Spotify links (and spotify: URIs). Plain text → null. */
export function parseMusicLink(raw: string): MusicLink | null {
  const text = raw.trim()
  if (!text || /\s/.test(text)) return null
  const uri = SPOTIFY_URI.exec(text)
  if (uri) return spotifyLink(uri[1], uri[2])
  let u: URL
  try {
    u = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`)
  } catch {
    return null
  }
  const host = u.hostname.replace(/^(?:www|m)\./, "")
  if (host === "open.spotify.com" || host === "play.spotify.com") {
    const m = SPOTIFY_PATH.exec(u.pathname)
    return m ? spotifyLink(m[1], m[2]) : null
  }
  if (host === "youtu.be") {
    const id = u.pathname.slice(1).split("/")[0]
    return YT_ID.test(id) ? youtubeVideo(id, u) : null
  }
  if (!YT_HOSTS.has(host)) return null
  const v = u.searchParams.get("v")
  if (v && YT_ID.test(v)) return youtubeVideo(v, u)
  const p = YT_PATH.exec(u.pathname)
  if (p) return youtubeVideo(p[1], u)
  const list = u.searchParams.get("list")
  if (list && /^[\w-]+$/.test(list)) {
    return {
      source: "youtube",
      kind: "playlist",
      id: list,
      embed: `https://www.youtube.com/embed/videoseries?list=${list}&autoplay=1`,
      url: `https://www.youtube.com/playlist?list=${list}`,
    }
  }
  return null
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const timeout = AbortSignal.timeout(TIMEOUT_MS)
  const r = await fetch(url, { signal: signal ? AbortSignal.any([signal, timeout]) : timeout })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return (await r.json()) as T
}

interface OEmbed {
  title?: string
  author_name?: string
  thumbnail_url?: string
}

/** Turns a parsed link into a playable track. Title lookup is best effort: the embed plays either way. */
export async function linkToTrack(link: MusicLink, signal?: AbortSignal): Promise<MusicTrack> {
  const base: MusicTrack = {
    id: link.id,
    source: link.source,
    title: link.source === "youtube" ? (link.kind === "playlist" ? "YouTube playlist" : "YouTube video") : `Spotify ${link.kind}`,
    artist: "pasted link",
    url: link.url,
    embed: link.embed,
    kind: link.kind,
    start: link.start,
  }
  const endpoint =
    link.source === "youtube"
      ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(link.url)}`
      : `https://open.spotify.com/oembed?url=${encodeURIComponent(link.url)}`
  try {
    const o = await getJson<OEmbed>(endpoint, signal)
    return {
      ...base,
      title: o.title?.trim() || base.title,
      artist: o.author_name?.trim() || (link.source === "spotify" ? "" : base.artist),
      art: o.thumbnail_url ?? undefined,
    }
  } catch {
    return base
  }
}

interface ItunesSong {
  trackId: number
  trackName?: string
  artistName?: string
  artworkUrl100?: string
  previewUrl?: string
  trackViewUrl?: string
  trackTimeMillis?: number
}

/** Keyless song search with 30 s previews. */
export async function itunesSearch(q: string, signal?: AbortSignal): Promise<MusicTrack[]> {
  const j = await getJson<{ results?: ItunesSong[] }>(
    `https://itunes.apple.com/search?media=music&entity=song&limit=${ITUNES_LIMIT}&term=${encodeURIComponent(q)}`,
    signal,
  )
  return (j.results ?? [])
    .filter((s) => s.trackName && s.artistName)
    .map((s) => ({
      id: String(s.trackId),
      source: "apple" as const,
      title: s.trackName ?? "",
      artist: s.artistName ?? "",
      art: s.artworkUrl100?.replace("100x100", `${ITUNES_ART}x${ITUNES_ART}`),
      url: s.trackViewUrl,
      durationMs: s.trackTimeMillis,
      preview: s.previewUrl ?? null,
    }))
}

interface LrcLib {
  syncedLyrics?: string | null
  plainLyrics?: string | null
}

/** Direct LRCLIB lookup: exact match when the artist is known, else best search hit. */
export async function lrclibLyrics(
  artist: string,
  title: string,
  signal?: AbortSignal,
): Promise<{ synced: string | null; plain: string | null } | null> {
  const exact = artist
    ? await getJson<LrcLib>(
        `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(title)}`,
        signal,
      ).catch(() => null)
    : null
  // credits differ across catalogs ("Mithoon & Arijit Singh"), so fall back to a fuzzy search
  const hit =
    exact ??
    (await getJson<LrcLib[]>(`https://lrclib.net/api/search?q=${encodeURIComponent(`${artist} ${title}`.trim())}`, signal).catch(() => []))
      .find((l) => l.syncedLyrics) ??
    null
  if (!hit || (!hit.syncedLyrics && !hit.plainLyrics)) return null
  return { synced: hit.syncedLyrics ?? null, plain: hit.plainLyrics ?? null }
}
