/* YouTube as THE full-length player for the radio. Pure helpers (query building,
   match picking, playback plans, lyric lookup keys) plus a lazy, single-shot
   loader for the official IFrame Player API and a resolver that turns any
   picked track into a YouTube video id through /api/music/search. */

import { apiUrl } from "./api"
import type { MusicTrack } from "./music"

const YT_ID = /^[\w-]{11}$/
const QUERY_MAX = 110
const RESOLVE_TIMEOUT_MS = 8000
const IFRAME_API = "https://www.youtube.com/iframe_api"
const TOPIC_SUFFIX = " - Topic"
/* marketing words YouTube uploaders bolt onto titles; stripped for lyric lookup only */
const NOISE =
  /\b(?:official|music|video|audio|lyrics?|lyrical|full|song|hd|4k|hq|visuali[sz]er|remaster(?:ed)?|with|from)\b/gi

const squash = (s: string) => s.replace(/\s+/g, " ").trim()
const dropBrackets = (s: string) => s.replace(/\(.*?\)|\[.*?\]|\{.*?\}/g, " ")

/** Lower-cased title core: no bracketed suffixes, no punctuation. */
export function normTitle(s: string): string {
  return squash(dropBrackets(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " "))
}

/** Main credited artist ("Arijit Singh, Mithoon" → "Arijit Singh"); placeholder artists → "". */
export function leadArtist(artist: string): string {
  if (!artist || artist === "pasted link") return ""
  return squash(artist.split(/,|&|\s(?:x|feat\.?|ft\.?)\s/i)[0] ?? "")
}

/** Search query used to find a full-length YouTube upload for a non-YouTube pick. */
export function youtubeQuery(track: Pick<MusicTrack, "artist" | "title">): string {
  return squash(`${leadArtist(track.artist)} ${dropBrackets(track.title)} official audio`).slice(0, QUERY_MAX)
}

/** First embeddable YouTube hit, preferring one whose title contains the wanted title. */
export function pickYouTubeMatch(
  results: readonly MusicTrack[],
  want?: Pick<MusicTrack, "title">,
): MusicTrack | null {
  const yt = results.filter((r) => r.source === "youtube" && YT_ID.test(r.id))
  if (!yt.length) return null
  const key = want ? normTitle(want.title) : ""
  return (key && yt.find((r) => normTitle(r.title).includes(key))) || yt[0]
}

export type PlayPlan =
  | { kind: "resolving" }
  | { kind: "yt"; videoId?: string; list?: string; start: number }
  | { kind: "fallback"; tried: boolean }

/** YouTube picks play directly; everything else needs a lookup (or has nothing to look up). */
export function directPlan(track: MusicTrack): PlayPlan | null {
  if (track.source !== "youtube") return null
  if (track.kind === "playlist") return { kind: "yt", list: track.id, start: 0 }
  return YT_ID.test(track.id) ? { kind: "yt", videoId: track.id, start: track.start ?? 0 } : null
}

/** Only single songs can be matched to one video (not Spotify albums, playlists, shows). */
export function canResolve(track: MusicTrack): boolean {
  return track.source !== "youtube" && !!track.title && (track.kind === undefined || track.kind === "track")
}

/** Artist / title to ask LRCLIB for. YouTube titles are cleaned of uploader noise. */
export function lyricLookup(track: Pick<MusicTrack, "artist" | "title" | "source">): { artist: string; title: string } {
  if (track.source !== "youtube") return { artist: leadArtist(track.artist) ? track.artist : "", title: track.title }
  const channel = track.artist.endsWith(TOPIC_SUFFIX) ? track.artist.slice(0, -TOPIC_SUFFIX.length) : ""
  const core = dropBrackets(track.title.split("|")[0] ?? "").replace(NOISE, " ")
  const parts = core.split(/\s[-–—:]\s/).map(squash).filter(Boolean)
  // "Artist - Song" is the common upload convention; a " - Topic" channel already names the artist
  if (!channel && parts.length === 2) return { artist: parts[0], title: parts[1] }
  return { artist: channel, title: squash(parts.join(" ")) }
}

/** Title shown on the stage: YouTube's "Song | Cast | Label" trimmed to the song. */
export function displayTitle(track: Pick<MusicTrack, "title" | "source">): string {
  return track.source === "youtube" ? squash(track.title.split("|")[0] ?? track.title) || track.title : track.title
}

/* ── IFrame Player API (typed to the slice we use) ─────────────────────────── */

export interface YTPlayer {
  playVideo(): void
  pauseVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  getCurrentTime(): number
  getDuration(): number
  getPlayerState(): number
  destroy(): void
}

interface YTEvent {
  target: YTPlayer
  data: number
}

export interface YTPlayerOptions {
  width?: string | number
  height?: string | number
  videoId?: string
  playerVars?: Record<string, string | number | undefined>
  events?: {
    onReady?: (e: YTEvent) => void
    onStateChange?: (e: YTEvent) => void
    onError?: (e: YTEvent) => void
  }
}

export interface YTNamespace {
  Player: new (el: HTMLElement, opts: YTPlayerOptions) => YTPlayer
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number; BUFFERING: number; CUED: number }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTNamespace> | null = null

/** Loads https://www.youtube.com/iframe_api once, on first use. */
export function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (apiPromise) return apiPromise
  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      if (window.YT) resolve(window.YT)
      else reject(new Error("YouTube API missing"))
    }
    const s = document.createElement("script")
    s.src = IFRAME_API
    s.async = true
    s.onerror = () => {
      apiPromise = null
      s.remove()
      reject(new Error("YouTube API failed to load"))
    }
    document.head.appendChild(s)
  })
  return apiPromise
}

/** Finds a full-length YouTube upload for a track. null when unconfigured, offline or no hit. */
export async function resolveYouTube(track: MusicTrack, signal?: AbortSignal): Promise<string | null> {
  const timeout = AbortSignal.timeout(RESOLVE_TIMEOUT_MS)
  const r = await fetch(`${apiUrl("music/search")}?q=${encodeURIComponent(youtubeQuery(track))}`, {
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  })
  if (!r.ok) return null
  const j = (await r.json()) as { configured?: boolean; results?: MusicTrack[] }
  if (j.configured === false) return null
  return pickYouTubeMatch(j.results ?? [], track)?.id ?? null
}
