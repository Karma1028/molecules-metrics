import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react"
import { useReducedMotion } from "../../../hooks/useSafeMotion"
import { useMusicLyrics, type MusicTrack } from "../../../lib/live"
import { itunesSearch } from "../../../lib/music"
import {
  canResolve,
  directPlan,
  displayTitle,
  loadYouTubeApi,
  lyricLookup,
  resolveYouTube,
  type PlayPlan,
  type YTPlayer,
} from "../../../lib/youtube"
import { parseLrc, activeLine, type LrcLine } from "./lrc"
import { SpotifyGlyph, YouTubeGlyph } from "./glyphs"
import { getVoidPalette, sampleArt, type Palette } from "./art-palette"
import { STAGE_CSS } from "./stage.css"

/* The playing stage. Every pick lands in the now-playing room: the cover blurred
   into the walls, a framed YouTube screen (the official IFrame player, so songs
   run full length) over the album sleeve, a transport driven by that player, and
   the synced lyric sheet beside it. With no YouTube match the room falls back to
   the record + 30 s preview (or the Spotify embed for pasted Spotify links). */

/* Spotify's compact player height */
const EMBED_H = 80
const WINDOW = 7
const LEAD = 2

const norm = (s: string) => s.toLowerCase().replace(/\(.*?\)|\[.*?\]|-.*$/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim()

/** Spotify often ships no preview; borrow the matching iTunes 30 s clip so the karaoke still runs. */
function usePreview(track: MusicTrack): string | null {
  const [borrowed, setBorrowed] = useState<string | null>(null)
  const own = track.preview ?? null
  const need = !own && !track.embed && !!track.title && track.source !== "youtube"
  useEffect(() => {
    setBorrowed(null)
    if (!need) return
    const ctl = new AbortController()
    itunesSearch(`${track.artist} ${track.title}`, ctl.signal)
      .then((hits) => hits.find((h) => norm(h.title) === norm(track.title) && h.preview))
      .then((hit) => !ctl.signal.aborted && setBorrowed(hit?.preview ?? null))
      .catch(() => undefined)
    return () => ctl.abort()
  }, [need, track.artist, track.title])
  return own ?? borrowed
}

export function SourceMark({ source }: { source: MusicTrack["source"] }) {
  if (source === "youtube") return <YouTubeGlyph size={17} />
  if (source === "spotify") return <SpotifyGlyph size={15} />
  return <span className="s-prev">30s</span>
}

const mmss = (s: number) => {
  const t = Number.isFinite(s) ? Math.max(0, Math.floor(s)) : 0
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`
}

interface AudioState {
  time: number
  dur: number
  playing: boolean
}

interface Controls {
  toggle: () => void
  seek: (t: number) => void
}

function Transport({ st, ctl }: { st: AudioState; ctl: Controls }) {
  const pct = st.dur ? Math.min(100, (st.time / st.dur) * 100) : 0
  return (
    <div className="st-transport">
      <button className="st-play" onClick={ctl.toggle} aria-label={st.playing ? "pause" : "play"}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          {st.playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}
        </svg>
      </button>
      <span className="st-time">{mmss(st.time)}</span>
      <input
        className="st-seek"
        type="range"
        min={0}
        max={st.dur || 30}
        step={0.1}
        value={Math.min(st.time, st.dur || 30)}
        aria-label="seek"
        style={{ "--pct": `${pct}%` } as CSSProperties}
        onChange={(e) => ctl.seek(Number(e.target.value))}
      />
      <span className="st-time">{mmss(st.dur)}</span>
    </div>
  )
}

function LyricSheet({ lines, idx, timed, plain, loading, track }: {
  lines: LrcLine[]; idx: number; timed: boolean; plain: string | null; loading: boolean; track: MusicTrack
}) {
  if (loading) return <p className="ly-note">pulling lyrics…</p>
  if (!lines.length && plain) return <pre className="ly-plain">{plain}</pre>
  if (!lines.length) {
    return (
      <p className="ly-note">
        no synced lyrics for this one.
        {track.url ? (
          <>
            {" "}
            <a href={track.url} target="_blank" rel="noopener">
              open in {track.source === "apple" ? "Apple Music" : track.source === "youtube" ? "YouTube" : "Spotify"} →
            </a>
          </>
        ) : null}
      </p>
    )
  }
  const center = idx >= 0 ? idx : 0
  const start = Math.max(0, Math.min(Math.max(0, lines.length - WINDOW), center - LEAD))
  return (
    <ul className="lyrics">
      {lines.slice(start, start + WINDOW).map((l, w) => {
        const i = start + w
        const cls = i === idx ? " on" : timed && idx >= 0 && i < idx ? " past" : ""
        return (
          <li key={`${l.t}-${i}`} className={`ly-line${cls}`}>
            {l.text || "·"}
          </li>
        )
      })}
    </ul>
  )
}

function useAudioState(preview: string | null) {
  const ref = useRef<HTMLAudioElement>(null)
  const [st, setSt] = useState<AudioState>({ time: 0, dur: 0, playing: false })
  useEffect(() => setSt({ time: 0, dur: 0, playing: false }), [preview])
  const handlers = {
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const t = e.currentTarget.currentTime
      setSt((s) => ({ ...s, time: t }))
    },
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const d = e.currentTarget.duration
      setSt((s) => ({ ...s, dur: Number.isFinite(d) ? d : 0 }))
    },
    onPlay: () => setSt((s) => ({ ...s, playing: true })),
    onPause: () => setSt((s) => ({ ...s, playing: false })),
    onEnded: () => setSt((s) => ({ ...s, playing: false })),
  }
  const ctl: Controls = {
    toggle: () => {
      const a = ref.current
      if (!a) return
      if (a.paused) a.play().catch(() => undefined)
      else a.pause()
    },
    seek: (t) => {
      if (ref.current) ref.current.currentTime = t
    },
  }
  return { ref, st, handlers, ctl }
}

function usePalette(art?: string) {
  const [pal, setPal] = useState<Palette>(getVoidPalette)
  useEffect(() => {
    if (!art) return
    let alive = true
    sampleArt(art).then((p) => alive && setPal(p))
    return () => {
      alive = false
    }
  }, [art])
  return pal
}

function Cover({ art, spinning }: { art?: string; spinning: boolean }) {
  return (
    <div className="st-cover-wrap">
      <div className={`st-disc${spinning ? " spin" : ""}`} aria-hidden="true">
        <span className="st-disc-label">{art ? <img src={art} alt="" crossOrigin="anonymous" /> : null}</span>
      </div>
      {art ? <img className="stage-art" src={art} alt="" crossOrigin="anonymous" /> : <div className="stage-art ph" />}
    </div>
  )
}

/** Plays YouTube picks directly; looks up a full-length upload for everything else. */
function usePlan(track: MusicTrack): PlayPlan {
  const direct = useMemo(() => directPlan(track), [track])
  const [resolved, setResolved] = useState<PlayPlan | null>(null)
  useEffect(() => {
    setResolved(null)
    if (direct) return
    if (!canResolve(track)) {
      setResolved({ kind: "fallback", tried: false })
      return
    }
    const ctl = new AbortController()
    const settle = (id: string | null) => {
      if (!ctl.signal.aborted) setResolved(id ? { kind: "yt", videoId: id, start: 0 } : { kind: "fallback", tried: true })
    }
    resolveYouTube(track, ctl.signal).then(settle, () => settle(null))
    return () => ctl.abort()
  }, [track, direct])
  return direct ?? resolved ?? { kind: "resolving" }
}

const TIME_EPSILON = 0.05

/** The official IFrame player mounted inside `host`; time polled with rAF only while playing. */
function useYouTubePlayer(host: RefObject<HTMLDivElement | null>, plan: PlayPlan) {
  const videoId = plan.kind === "yt" ? plan.videoId : undefined
  const list = plan.kind === "yt" ? plan.list : undefined
  const start = plan.kind === "yt" ? plan.start : 0
  const player = useRef<YTPlayer | null>(null)
  const [st, setSt] = useState<AudioState>({ time: 0, dur: 0, playing: false })
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = host.current
    if (!el || (!videoId && !list)) return
    let alive = true
    let raf = 0
    setSt({ time: start, dur: 0, playing: false })
    setFailed(false)
    const stopLoop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const tick = () => {
      const p = player.current
      if (!alive || !p) return
      const t = p.getCurrentTime()
      const d = p.getDuration()
      setSt((s) => (Math.abs(s.time - t) < TIME_EPSILON && s.dur === d ? s : { ...s, time: t, dur: d || s.dur }))
      raf = requestAnimationFrame(tick)
    }
    // the API replaces its target node, so hand it one React does not own
    const mount = document.createElement("div")
    el.appendChild(mount)
    loadYouTubeApi()
      .then((YT) => {
        if (!alive) return
        player.current = new YT.Player(mount, {
          width: "100%",
          height: "100%",
          videoId,
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            rel: 0,
            start: start || undefined,
            ...(list ? { listType: "playlist", list } : {}),
          },
          events: {
            onReady: (e) => {
              if (!alive) return
              setSt((s) => ({ ...s, dur: e.target.getDuration() || s.dur }))
              e.target.playVideo()
            },
            onStateChange: (e) => {
              if (!alive) return
              const playing = e.data === YT.PlayerState.PLAYING
              const p = e.target
              setSt((s) => ({ time: p.getCurrentTime(), dur: p.getDuration() || s.dur, playing }))
              stopLoop()
              if (playing) raf = requestAnimationFrame(tick)
            },
            onError: () => {
              if (alive) setFailed(true)
            },
          },
        })
        if (import.meta.env.DEV) (window as Window & { __radioYT?: YTPlayer | null }).__radioYT = player.current
      })
      .catch(() => {
        if (alive) setFailed(true)
      })
    return () => {
      alive = false
      stopLoop()
      player.current?.destroy()
      player.current = null
      el.replaceChildren()
    }
  }, [host, videoId, list, start])

  const ctl: Controls = {
    toggle: () => {
      const p = player.current
      if (!p) return
      if (st.playing) p.pauseVideo()
      else p.playVideo()
    },
    seek: (t) => {
      const p = player.current
      if (!p) return
      p.seekTo(t, true)
      setSt((s) => ({ ...s, time: t }))
    },
  }
  return { st, ctl, failed }
}

/** The framed YouTube screen, sat over the album sleeve. Never covered, never under 200 x 200. */
function Screen({ host, art, resolving }: { host: RefObject<HTMLDivElement | null>; art?: string; resolving: boolean }) {
  return (
    <div className="st-screen-wrap">
      {art ? <img className="st-screen-sleeve" src={art} alt="" aria-hidden="true" /> : null}
      <div className="st-screen">
        {resolving ? (
          <div className="st-screen-ph">
            {art ? <img src={art} alt="" aria-hidden="true" /> : null}
            <span>finding the full song…</span>
          </div>
        ) : null}
        <div className="st-screen-host" ref={host} />
      </div>
    </div>
  )
}

const FALLBACK_NOTE = "30 s preview, full song needs the YouTube search key"

// ── Playing: album-recoloured room, YouTube screen (or preview fallback) + synced lyrics ──
export function Stage({ track, onExit }: { track: MusicTrack; onExit: () => void }) {
  const lookup = useMemo(() => lyricLookup(track), [track])
  const { data: lyr, loading } = useMusicLyrics(lookup.artist, lookup.title)
  const reduced = useReducedMotion()
  const pal = usePalette(track.art)
  const lines = useMemo(() => parseLrc(lyr.synced), [lyr.synced])
  const plan = usePlan(track)
  const host = useRef<HTMLDivElement>(null)
  const yt = useYouTubePlayer(host, plan)
  const preview = usePreview(track)
  const fallback = plan.kind === "fallback"
  const audioSrc = fallback ? preview : null
  const audio = useAudioState(audioSrc)
  const onScreen = !fallback
  const st = onScreen ? yt.st : audio.st
  const timed = onScreen ? plan.kind === "yt" && !yt.failed : !!audioSrc
  const idx = timed && lines.length ? activeLine(lines, st.time) : -1
  const style = { "--pal-bg": pal.bg, "--pal-fg": pal.fg, "--pal-accent": pal.accent } as CSSProperties
  const title = displayTitle(track)
  const artist = track.artist && track.artist !== "pasted link" ? track.artist : ""
  const ytUrl =
    plan.kind === "yt" && plan.videoId
      ? `https://www.youtube.com/watch?v=${plan.videoId}`
      : track.source === "youtube"
        ? track.url
        : undefined

  return (
    <div className="stage" style={style} role="dialog" aria-label={`${title}${artist ? ` by ${artist}` : ""}`} data-plan={plan.kind}>
      <style>{STAGE_CSS}</style>
      {track.art ? <img className="st-bg" src={track.art} alt="" aria-hidden="true" /> : null}
      <div className="st-veil" aria-hidden="true" />
      <button className="exit" onClick={onExit} aria-label="power off">⏻ power off</button>

      <div className="st-grid">
        <div className={`st-left${onScreen ? " on-screen" : ""}`}>
          {onScreen ? (
            <Screen host={host} art={track.art} resolving={plan.kind === "resolving"} />
          ) : (
            <Cover art={track.art} spinning={st.playing && !reduced} />
          )}
          <div className="stage-head">
            <div className="stage-src">
              <SourceMark source={onScreen ? "youtube" : track.source} /> {onScreen ? "now playing" : "now spinning"}
            </div>
            <div className="stage-title">{title}</div>
            {artist ? <div className="stage-artist">{artist}</div> : null}
          </div>
          {plan.kind === "yt" && !yt.failed ? <Transport st={yt.st} ctl={yt.ctl} /> : null}
          {audioSrc ? <Transport st={audio.st} ctl={audio.ctl} /> : null}
          {fallback && track.embed && track.source === "spotify" ? (
            // pasted Spotify link with no YouTube match: the official player (full track only for Premium listeners)
            <iframe
              className="stage-embed"
              src={track.embed}
              title={`${track.title} on Spotify`}
              height={EMBED_H}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : null}
          {fallback && !audioSrc && !track.embed && track.url ? (
            <a className="stage-open" href={track.url} target="_blank" rel="noopener">
              <SpotifyGlyph size={14} /> play the full track on Spotify
            </a>
          ) : null}
          {fallback && plan.tried ? <p className="st-note">{FALLBACK_NOTE}</p> : null}
          {yt.failed && ytUrl ? (
            <p className="st-note">
              this one will not play here.{" "}
              <a href={ytUrl} target="_blank" rel="noopener">
                open it on YouTube
              </a>
            </p>
          ) : null}
        </div>
        <div className="lyrics-wrap" data-line={idx}>
          <LyricSheet lines={lines} idx={idx} timed={timed} plain={lyr.plain ?? null} loading={loading} track={track} />
        </div>
      </div>

      {audioSrc ? <audio ref={audio.ref} src={audioSrc} autoPlay {...audio.handlers} /> : null}
    </div>
  )
}

