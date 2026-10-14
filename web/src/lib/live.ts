import { useEffect, useRef, useState } from "react"
import { apiUrl, dataUrl } from "./api"

/** Generic polling fetch to the proxied Python live endpoints. */
function usePoll<T>(path: string, ms: number): { data: T | null; error: boolean } {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => {
    let alive = true
    const hit = () => {
      fetch(path)
        .then((r) => r.json())
        .then((j) => {
          if (alive) {
            setData(j as T)
            setError(false)
          }
        })
        .catch(() => alive && setError(true))
    }
    hit()
    timer.current = window.setInterval(hit, ms)
    return () => {
      alive = false
      window.clearInterval(timer.current)
    }
  }, [path, ms])
  return { data, error }
}

export interface NowPlaying {
  configured: boolean
  isPlaying?: boolean
  title?: string | null
  artist?: string
  album?: string
  art?: string
  url?: string
  playedAt?: string | null
}
export const useNowPlaying = () => usePoll<NowPlaying>(apiUrl("now-playing"), 20000)

export interface Fixture {
  strTimestamp?: string | null
  strHomeTeam?: string | null
  strAwayTeam?: string | null
  intHomeScore?: string | null
  intAwayScore?: string | null
  strLeague?: string | null
  strStatus?: string | null
  strVenue?: string | null
}
export interface Barca {
  last: Fixture
  next: Fixture
  source?: string
  fetchedAt?: number
}
export const useBarca = () => usePoll<Barca>(apiUrl("barca"), 600000)

export interface Frame {
  id?: string
  name: string
  url: string
}
export interface FramesResp {
  frames: Frame[]
  source: string
  count?: number
  fetchedAt?: number
}
export const useFrames = () => usePoll<FramesResp>(apiUrl("frames"), 120000)

/** Local baked-in frames — his real roll (baked from the live-site gallery),
 *  shown when the Drive folder is empty/unreachable. Captions describe what is
 *  visibly in each frame; no dates or places are claimed. */
export const LOCAL_FRAMES: Frame[] = [
  ["roll-01", "lantern bokeh"],
  ["roll-02", "night lane"],
  ["roll-03", "red lanterns"],
  ["roll-04", "red banner"],
  ["roll-05", "night arena"],
  ["roll-06", "painted panels"],
  ["roll-07", "ridge line"],
  ["roll-08", "golden ridges"],
  ["roll-09", "blue ridges"],
  ["roll-10", "the summit"],
  ["roll-11", "night sky"],
  ["roll-12", "the pines"],
  ["roll-13", "rain glass"],
  ["roll-14", "dusk lake"],
  ["roll-15", "the arcade"],
  ["roll-16", "through the bars"],
  ["roll-17", "golden tree"],
  ["roll-18", "shoreline"],
  ["roll-19", "above the clouds"],
  ["roll-20", "arena beams"],
  ["roll-21", "doorway"],
  ["roll-22", "orange sun"],
  ["roll-23", "glass moon"],
  ["roll-24", "dusk field"],
  ["roll-25", "night ride"],
  ["roll-26", "tarmac haze"],
  ["roll-27", "pink dusk"],
  ["roll-28", "lone tree"],
  ["roll-29", "full moon"],
  ["roll-30", "mackerel sky"],
  ["roll-31", "green path"],
  ["roll-32", "the shelter"],
  ["roll-33", "open road"],
].map(([f, name]) => ({ url: `/frames/${f}.webp`, name }))

/* =====================================================================
   Typed live clients with graceful fallback.
   Contract: every hook returns { data, loading, error, fallback }.
   - `data` is NEVER null — it is seeded with a local fallback payload so
     the UI always renders something. The fallback payloads carry NO
     fabricated personal facts (configured:false + empty lists only).
   - `fallback` is true when the served data is the local fallback OR the
     endpoint answered `configured:false` (creds not wired yet).
   - `error` is true only when the fetch/parse itself failed.
   A failed fetch must populate `fallback` and never throw.
   ===================================================================== */

export interface Live<T> {
  data: T
  loading: boolean
  error: boolean
  fallback: boolean
}

/** Generic reachable-or-fallback client. Polls when `ms` is given, else fetches once. */
function useLive<T>(path: string, fallback: T, ms?: number): Live<T> {
  const [state, setState] = useState<Live<T>>({ data: fallback, loading: true, error: false, fallback: true })
  useEffect(() => {
    let alive = true
    const hit = () => {
      fetch(path, { cache: "no-store" })
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status))
          return r.json()
        })
        .then((j: T & { configured?: boolean }) => {
          if (!alive) return
          const notConfigured = j != null && j.configured === false
          setState({ data: j as T, loading: false, error: false, fallback: !!notConfigured })
        })
        .catch(() => {
          if (alive) setState({ data: fallback, loading: false, error: true, fallback: true })
        })
    }
    hit()
    let id: number | undefined
    if (ms) id = window.setInterval(hit, ms)
    return () => {
      alive = false
      if (id) window.clearInterval(id)
    }
  }, [path, ms, fallback])
  return state
}

// ── MODE B radio: music search (YouTube + Spotify), query-driven ──────
export interface MusicTrack {
  id: string
  title: string
  artist: string
  source: "youtube" | "spotify"
  art?: string
  url?: string
  durationMs?: number
  preview?: string | null
}
export interface MusicSearchResp {
  configured: boolean
  query: string
  results: MusicTrack[]
}
export const MUSIC_FALLBACK: MusicSearchResp = { configured: false, query: "", results: [] }

/** Debounced-by-caller search. Empty query → fallback (no request fired). */
export function useMusicSearch(query: string): Live<MusicSearchResp> {
  const [state, setState] = useState<Live<MusicSearchResp>>({
    data: MUSIC_FALLBACK,
    loading: false,
    error: false,
    fallback: true,
  })
  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setState({ data: MUSIC_FALLBACK, loading: false, error: false, fallback: true })
      return
    }
    let alive = true
    setState((s) => ({ ...s, loading: true }))
    fetch(`${apiUrl("music/search")}?q=${encodeURIComponent(q)}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((j: MusicSearchResp) => {
        if (alive) setState({ data: j, loading: false, error: false, fallback: j.configured === false })
      })
      .catch(() => {
        if (alive) setState({ data: { ...MUSIC_FALLBACK, query: q }, loading: false, error: true, fallback: true })
      })
    return () => {
      alive = false
    }
  }, [query])
  return state
}

// ── MODE B radio: synced lyrics (LRCLIB, keyless) ─────────────────────
export interface LyricsResp {
  configured: boolean
  found: boolean
  synced?: string | null
  plain?: string | null
}
export const LYRICS_FALLBACK: LyricsResp = { configured: true, found: false }

/** Fetches lyrics for a picked track. Blank artist/title → no request. */
export function useMusicLyrics(artist: string, title: string): Live<LyricsResp> {
  const [state, setState] = useState<Live<LyricsResp>>({
    data: LYRICS_FALLBACK,
    loading: false,
    error: false,
    fallback: true,
  })
  useEffect(() => {
    if (!artist || !title) {
      setState({ data: LYRICS_FALLBACK, loading: false, error: false, fallback: true })
      return
    }
    let alive = true
    setState((s) => ({ ...s, loading: true }))
    const qs = `artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`
    fetch(`${apiUrl("music/lyrics")}?${qs}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((j: LyricsResp) => {
        if (alive) setState({ data: j, loading: false, error: false, fallback: !j.found })
      })
      .catch(() => {
        if (alive) setState({ data: LYRICS_FALLBACK, loading: false, error: true, fallback: true })
      })
    return () => {
      alive = false
    }
  }, [artist, title])
  return state
}

// ── MODE A: his Spotify listening analytics ───────────────────────────
export interface SpotifyAura {
  danceability: number
  energy: number
  valence: number
  acousticness: number
  tempo: number
  n: number
}
export interface SpotifyStatsResp {
  configured: boolean
  range?: string
  topArtists?: { name: string; plays?: number; img?: string }[]
  topTracks?: { title: string; artist: string; img?: string; url?: string }[]
  topGenres?: { name: string; weight: number }[]
  aura?: SpotifyAura | null
}
export const SPOTIFY_STATS_FALLBACK: SpotifyStatsResp = { configured: false }
export const useSpotifyStats = () => useLive<SpotifyStatsResp>(apiUrl("spotify/stats"), SPOTIFY_STATS_FALLBACK, 300000)

// ── MODE A: lifetime "Wrapped" from his extended streaming-history export.
//    Baked at build time into /public/data/spotify_wrapped.json (anonymized —
//    no IPs/geo). Real counts straight from his plays; never fabricated.
export interface WrappedArtist { name: string; minutes: number; plays: number }
export interface WrappedTrack { track: string; artist: string; minutes: number; plays: number }
export interface WrappedAlbum { album: string; artist: string; minutes: number }
export interface WrappedYear { year: number; minutes: number; plays: number; topArtist: string | null }
export interface SpotifyWrapped {
  generatedAt?: string
  source?: string
  span?: { from: string | null; to: string | null; years: number[] }
  lifetime?: {
    minutes: number; hours: number; plays: number; skips: number
    skipRate: number; uniqueTracks: number; uniqueArtists: number
  }
  topArtists?: WrappedArtist[]
  topTracks?: WrappedTrack[]
  topAlbums?: WrappedAlbum[]
  perYear?: WrappedYear[]
  clock?: { byHour: number[]; peakHour: number; nightShare: number }
  byWeekday?: number[]
}
export const WRAPPED_FALLBACK: SpotifyWrapped = {}
/** Static baked export — fetched once (not via /api). fallback=true only if the file is missing. */
export const useSpotifyWrapped = () => useLive<SpotifyWrapped>("/data/spotify_wrapped.json", WRAPPED_FALLBACK)

// ── Football room: richer than the hero Barça card ────────────────────
export interface FootballResp {
  configured: boolean
  next?: Fixture
  last?: Fixture
  form?: ("W" | "D" | "L")[]
  standing?: {
    rank: number; points: number; played: number; gd: number
    goals?: number; conceded?: number; win?: number; draw?: number; loss?: number
    season?: string
  }
  source?: string
}
export const FOOTBALL_FALLBACK: FootballResp = { configured: false }
export const useFootball = () => useLive<FootballResp>(apiUrl("football"), FOOTBALL_FALLBACK, 600000)

// ── Barça previous completed season: baked from his local FBref + Understat
//    files (D:/football data-analysis). Real totals, never fabricated. Pairs
//    with the LIVE current-season standing above for an honest last-vs-this
//    comparison (prev = baked tiny; this = fetched live at request time).
export interface BarcaLastSeason {
  team?: string; competition?: string; season: string; champions?: boolean
  played: number; win: number; draw: number; loss: number
  points: number; goals: number; conceded: number; gd: number
  xG?: number; xGA?: number; cleanSheets?: number; possession?: number
  source?: string; note?: string
}
export const BARCA_LAST_SEASON_FALLBACK: BarcaLastSeason = {
  season: "2025-26", played: 38, win: 31, draw: 1, loss: 6,
  points: 94, goals: 95, conceded: 36, gd: 59, xG: 99.67, xGA: 50.71,
  cleanSheets: 15, possession: 68.9,
}
export const useBarcaLastSeason = () =>
  useLive<BarcaLastSeason>(dataUrl("barca_last_season.json"), BARCA_LAST_SEASON_FALLBACK)

// ── Barça analytics: baked from his personal football-analytics project ──
//    (fbref + fotmob + understat + transfermarkt, 2020-2026). Static snapshot
//    in public/data/barca_analytics.json — real numbers, never fabricated.
export interface BarcaSeason {
  goals: number; xG: number; conceded: number; xGA: number
  points: number; ppda: number; possession: number
  top_scorer: string; top_scorer_goals: number
}
export interface BarcaPlayerStat {
  season: string; games: number; goals: number
  xG: number; xA: number; key_passes: number; xGBuildup: number; xGChain: number
}
export interface BarcaPlayer { name: string; value_trajectory: number[]; stats: BarcaPlayerStat[] }
export interface BarcaAnalytics {
  source?: string; generatedAt?: string; team?: string
  seasons?: Record<string, BarcaSeason>
  players?: BarcaPlayer[]
  topScorers?: { season: string; name: string; goals: number }[]
}
export const BARCA_ANALYTICS_FALLBACK: BarcaAnalytics = {}
export const useBarcaAnalytics = () => useLive<BarcaAnalytics>(dataUrl("barca_analytics.json"), BARCA_ANALYTICS_FALLBACK)

// ── Mainstream football news: keyless RSS proxied by the Python server ──
//    (Guardian football RSS). Honest empty-state when the feed is unreachable.
export interface NewsItem { title: string; url: string; source?: string; published?: string }
export interface FootballNewsResp { configured: boolean; items?: NewsItem[] }
export const FOOTBALL_NEWS_FALLBACK: FootballNewsResp = { configured: false }
export const useFootballNews = () => useLive<FootballNewsResp>(apiUrl("football-news"), FOOTBALL_NEWS_FALLBACK, 1800000)

// ── GitHub activity ────────────────────────────────────────────────────
export interface Repo {
  name: string
  desc?: string
  stars?: number
  lang?: string
  url: string
}
export interface GithubResp {
  configured: boolean
  user?: string
  repos?: Repo[]
  totalStars?: number
  contributions?: number
}
export const GITHUB_FALLBACK: GithubResp = { configured: false }
export const useGithub = () => useLive<GithubResp>(apiUrl("github"), GITHUB_FALLBACK, 1800000)

// ── Medium writing ─────────────────────────────────────────────────────
export interface Post {
  title: string
  url: string
  published?: string
  snippet?: string
  claps?: number
}
export interface MediumResp {
  configured: boolean
  handle?: string
  posts?: Post[]
}
export const MEDIUM_FALLBACK: MediumResp = { configured: false }
export const useMedium = () => useLive<MediumResp>(apiUrl("medium"), MEDIUM_FALLBACK, 1800000)

/** Live IST clock (hh:mm:ss, 24h). */
export function useClock() {
  const [t, setT] = useState("--:--:--")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const tick = () => setT(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return t
}
