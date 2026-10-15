import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react"
import { useReducedMotion } from "../../../hooks/useSafeMotion"
import { useMusicLyrics, type MusicTrack } from "../../../lib/live"
import { itunesSearch } from "../../../lib/music"
import { parseLrc, activeLine, type LrcLine } from "./lrc"
import { SpotifyGlyph, YouTubeGlyph } from "./glyphs"
import { getVoidPalette, sampleArt, type Palette } from "./art-palette"
import { STAGE_CSS } from "./stage.css"

/* The playing stages. Spotify / iTunes picks get the now-playing room: the cover
   blurred into the walls, the record sliding out of its sleeve, a transport
   driven by the real audio element, and the lyric sheet beside it. YouTube
   picks get the dimmed video room. */

/* Spotify's compact player height */
const EMBED_H = 80
const WINDOW = 7
const LEAD = 2

const norm = (s: string) => s.toLowerCase().replace(/\(.*?\)|\[.*?\]|-.*$/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim()

/** Spotify often ships no preview; borrow the matching iTunes 30 s clip so the karaoke still runs. */
function usePreview(track: MusicTrack): string | null {
  const [borrowed, setBorrowed] = useState<string | null>(null)
  const own = track.preview ?? null
  const need = !own && !track.embed && !!track.title
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

function Transport({ audio, st }: { audio: RefObject<HTMLAudioElement | null>; st: AudioState }) {
  const pct = st.dur ? Math.min(100, (st.time / st.dur) * 100) : 0
  const toggle = () => {
    const a = audio.current
    if (!a) return
    if (a.paused) a.play().catch(() => undefined)
    else a.pause()
  }
  return (
    <div className="st-transport">
      <button className="st-play" onClick={toggle} aria-label={st.playing ? "pause" : "play"}>
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
        value={st.time}
        aria-label="seek"
        style={{ "--pct": `${pct}%` } as CSSProperties}
        onChange={(e) => {
          if (audio.current) audio.current.currentTime = Number(e.target.value)
        }}
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
              open in {track.source === "apple" ? "Apple Music" : "Spotify"} →
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
  return { ref, st, handlers }
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

// ── Playing (Spotify / iTunes pick): album-recoloured room + synced lyrics ──
export function LyricStage({ track, onExit }: { track: MusicTrack; onExit: () => void }) {
  const { data: lyr, loading } = useMusicLyrics(track.artist, track.title)
  const reduced = useReducedMotion()
  const pal = usePalette(track.art)
  const lines = useMemo(() => parseLrc(lyr.synced), [lyr.synced])
  const preview = usePreview(track)
  const { ref: audioRef, st, handlers } = useAudioState(preview)
  const idx = preview && lines.length ? activeLine(lines, st.time) : -1
  const style = { "--pal-bg": pal.bg, "--pal-fg": pal.fg, "--pal-accent": pal.accent } as CSSProperties

  return (
    <div className="stage" style={style} role="dialog" aria-label={`${track.title} by ${track.artist}`}>
      <style>{STAGE_CSS}</style>
      {track.art ? <img className="st-bg" src={track.art} alt="" aria-hidden="true" /> : null}
      <div className="st-veil" aria-hidden="true" />
      <button className="exit" onClick={onExit} aria-label="power off">⏻ power off</button>

      <div className="st-grid">
        <div className="st-left">
          <Cover art={track.art} spinning={st.playing && !reduced} />
          <div className="stage-head">
            <div className="stage-src"><SourceMark source={track.source} /> now spinning</div>
            <div className="stage-title">{track.title}</div>
            {track.artist ? <div className="stage-artist">{track.artist}</div> : null}
          </div>
          {preview ? <Transport audio={audioRef} st={st} /> : null}
          {track.embed ? (
            // pasted Spotify link: the official player (full track when signed in, preview otherwise)
            <iframe
              className="stage-embed"
              src={track.embed}
              title={`${track.title} on Spotify`}
              height={EMBED_H}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : null}
          {!preview && !track.embed && track.url ? (
            <a className="stage-open" href={track.url} target="_blank" rel="noopener">
              <SpotifyGlyph size={14} /> play the full track on Spotify
            </a>
          ) : null}
        </div>
        <div className="lyrics-wrap">
          <LyricSheet lines={lines} idx={idx} timed={!!preview} plain={lyr.plain ?? null} loading={loading} track={track} />
        </div>
      </div>

      {preview ? <audio ref={audioRef} src={preview} autoPlay {...handlers} /> : null}
    </div>
  )
}

// ── Playing (YouTube pick): dimmed background video + overlay ─────────
export function VideoStage({ track, onExit }: { track: MusicTrack; onExit: () => void }) {
  const reduced = useReducedMotion()
  return (
    <div className={`vstage${reduced ? " reduced" : ""}`} role="dialog" aria-label={`${track.title} by ${track.artist}`}>
      <style>{STAGE_CSS}</style>
      <iframe
        className="vframe"
        src={track.embed ?? `https://www.youtube.com/embed/${track.id}?autoplay=1&rel=0`}
        title={track.title}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="vscrim" />
      <button className="exit" onClick={onExit} aria-label="power off">⏻ power off</button>
      <div className="voverlay">
        <div className="stage-src"><YouTubeGlyph size={16} /> now playing</div>
        <div className="stage-title">{track.title}</div>
        {track.artist ? <div className="stage-artist">{track.artist}</div> : null}
      </div>
    </div>
  )
}
