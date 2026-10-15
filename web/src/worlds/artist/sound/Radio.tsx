import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { useReducedMotion } from "../../../hooks/useSafeMotion"
import { useNowPlaying, useMusicSearch, useMusicLyrics, type MusicTrack } from "../../../lib/live"
import { parseLrc, activeLine } from "./lrc"
import { SpotifyGlyph, YouTubeGlyph } from "./glyphs"
import { HostelRooms, RoomDial } from "./HostelRooms"
import { HOSTEL_ROOMS } from "./hostel-rooms"

interface Palette {
  bg: string
  fg: string
  accent: string
}

function getFallbackAccent(): string {
  if (typeof window !== "undefined") {
    const val =
      getComputedStyle(document.documentElement).getPropertyValue("--terracotta-500").trim() ||
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()
    if (val) return val
  }
  return "#b85c2e"
}

export function getVoidPalette(): Palette {
  return { bg: "#0b0b0d", fg: "#f2ede3", accent: getFallbackAccent() }
}

export const VOID_PALETTE: Palette = { bg: "#0b0b0d", fg: "#f2ede3", accent: "#b85c2e" }

/** Average an album image down to a representative {bg,fg,accent}. */
function sampleArt(url: string): Promise<Palette> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      try {
        const c = document.createElement("canvas")
        c.width = c.height = 12
        const ctx = c.getContext("2d")
        if (!ctx) return resolve(getVoidPalette())
        ctx.drawImage(img, 0, 0, 12, 12)
        const { data } = ctx.getImageData(0, 0, 12, 12)
        let r = 0, g = 0, b = 0, n = 0
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          n++
        }
        r = Math.round(r / n)
        g = Math.round(g / n)
        b = Math.round(b / n)
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        // darken toward a near-black room, keep a vivid accent from the art
        const bg = `rgb(${Math.round(r * 0.28)},${Math.round(g * 0.28)},${Math.round(b * 0.28)})`
        const fg = lum > 0.5 ? "#f6f2ea" : "#fbf7ee"
        const accent = `rgb(${Math.min(255, r + 60)},${Math.min(255, g + 50)},${Math.min(255, b + 40)})`
        resolve({ bg, fg, accent })
      } catch {
        resolve(getVoidPalette()) // tainted canvas / CORS → safe default
      }
    }
    img.onerror = () => resolve(getVoidPalette())
    img.src = url
  })
}

// ── Idle / searching: the void + search field + suggestion lines ──────
function SearchVoid({ onPick }: { onPick: (t: MusicTrack) => void }) {
  const [query, setQuery] = useState("")
  const [debounced, setDebounced] = useState("")
  const [active, setActive] = useState(0)
  const { data: np } = useNowPlaying()
  const { data: search, loading, fallback } = useMusicSearch(debounced)
  const results = search.results

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query.trim()), 350)
    return () => window.clearTimeout(id)
  }, [query])
  useEffect(() => setActive(0), [results])

  const onKey = (e: React.KeyboardEvent) => {
    if (!results.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => (a + 1) % results.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => (a - 1 + results.length) % results.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      onPick(results[active])
    }
  }

  const typed = debounced.length > 0
  return (
    <div className="void">
      {np?.title ? <div className="ghost">{np.title}</div> : null}
      <div className="search">
        <label className="hint" htmlFor="radio-q">
          type a song.
        </label>
        <input
          id="radio-q"
          className="qin"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKey}
          placeholder=""
          autoComplete="off"
          spellCheck={false}
          aria-label="search for a song"
        />
        <span className="caret" aria-hidden="true" />
      </div>

      {typed && (
        <ul className="sugg" role="listbox" aria-label="results">
          {loading && results.length === 0 ? (
            <li className="s-note">searching…</li>
          ) : results.length === 0 ? (
            <li className="s-note">
              {fallback ? "search isn't wired up yet, keys pending." : "nothing found. try another title."}
            </li>
          ) : (
            results.map((t, i) => (
              <li
                key={`${t.source}-${t.id}`}
                className={`s-row${i === active ? " on" : ""}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => onPick(t)}
              >
                <span className="s-txt">
                  <span className="s-title">{t.title}</span>
                  <span className="s-sep">·</span>
                  <span className="s-artist">{t.artist}</span>
                </span>
                <span className="s-src">{t.source === "youtube" ? <YouTubeGlyph size={17} /> : <SpotifyGlyph size={15} />}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

// ── Playing (Spotify pick): album-recolored room + synced lyrics ──────
function LyricStage({ track, onExit }: { track: MusicTrack; onExit: () => void }) {
  const { data: lyr, loading } = useMusicLyrics(track.artist, track.title)
  const [pal, setPal] = useState<Palette>(getVoidPalette)
  const [time, setTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const lines = useMemo(() => parseLrc(lyr.synced), [lyr.synced])
  const hasPreview = !!track.preview
  const idx = hasPreview && lines.length ? activeLine(lines, time) : -1

  const center = idx >= 0 ? idx : 0
  const start = Math.max(0, Math.min(Math.max(0, lines.length - 5), center - 2))
  const windowLines = lines.slice(start, start + 5)

  useEffect(() => {
    if (!track.art) return
    let alive = true
    sampleArt(track.art).then((p) => alive && setPal(p))
    return () => {
      alive = false
    }
  }, [track.art])

  const style = {
    "--pal-bg": pal.bg,
    "--pal-fg": pal.fg,
    "--pal-accent": pal.accent,
  } as CSSProperties

  return (
    <div className="stage" style={style} role="dialog" aria-label={`${track.title} by ${track.artist}`}>
      <button className="exit" onClick={onExit} aria-label="power off">
        ⏻ power off
      </button>

      <div className="stage-head">
        {track.art ? <img className="stage-art" src={track.art} alt="" crossOrigin="anonymous" /> : null}
        <div>
          <div className="stage-src">
            <SpotifyGlyph size={13} /> now spinning
          </div>
          <div className="stage-title">{track.title}</div>
          <div className="stage-artist">{track.artist}</div>
        </div>
      </div>

      {track.preview ? (
        // 30-second Spotify preview drives the karaoke highlight.
        <audio
          ref={audioRef}
          src={track.preview}
          autoPlay
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        />
      ) : null}

      <div className="lyrics-wrap">
        {loading ? (
          <p className="ly-note">pulling lyrics…</p>
        ) : lines.length ? (
          <ul className="lyrics">
            {windowLines.map((l, wIdx) => {
              const actualIdx = start + wIdx
              const isOn = actualIdx === idx
              const isPast = hasPreview && idx >= 0 && actualIdx < idx
              return (
                <li
                  key={`${l.t}-${actualIdx}`}
                  className={`ly-line${isOn ? " on" : isPast ? " past" : ""}`}
                >
                  {l.text || "·"}
                </li>
              )
            })}
          </ul>
        ) : lyr.plain ? (
          <pre className="ly-plain">{lyr.plain}</pre>
        ) : (
          <p className="ly-note">
            no synced lyrics for this one.
            {track.url ? (
              <>
                {" "}
                <a href={track.url} target="_blank" rel="noopener">
                  open in Spotify →
                </a>
              </>
            ) : null}
          </p>
        )}
      </div>

      {!track.preview && track.url ? (
        <a className="stage-open" href={track.url} target="_blank" rel="noopener">
          <SpotifyGlyph size={14} /> play the full track on Spotify
        </a>
      ) : null}
    </div>
  )
}

// ── Playing (YouTube pick): dimmed background video + overlay ─────────
function VideoStage({ track, onExit }: { track: MusicTrack; onExit: () => void }) {
  const reduced = useReducedMotion()
  return (
    <div className={`vstage${reduced ? " reduced" : ""}`} role="dialog" aria-label={`${track.title} by ${track.artist}`}>
      <iframe
        className="vframe"
        src={`https://www.youtube.com/embed/${track.id}?autoplay=1&rel=0`}
        title={track.title}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="vscrim" />
      <button className="exit" onClick={onExit} aria-label="power off">
        ⏻ power off
      </button>
      <div className="voverlay">
        <div className="stage-src">
          <YouTubeGlyph size={16} /> now playing
        </div>
        <div className="stage-title">{track.title}</div>
        <div className="stage-artist">{track.artist}</div>
      </div>
    </div>
  )
}

type Band = "rooms" | "search"

export function Radio() {
  const [picked, setPicked] = useState<MusicTrack | null>(null)
  const [band, setBand] = useState<Band>("rooms")
  const [roomIdx, setRoomIdx] = useState(0)
  // each retune overhears a different line from that room
  const [tunes, setTunes] = useState(0)
  const exit = () => setPicked(null)
  const tune = (i: number) => {
    if (i === roomIdx) return
    setRoomIdx(i)
    setTunes((n) => n + 1)
  }

  useEffect(() => {
    if (!picked) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && exit()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [picked])

  return (
    <div className="radio">
      <div className="faceplate">
        <div className="fp-brand">HOSTEL RADIO</div>
        {band === "rooms" ? (
          <RoomDial index={roomIdx} onTune={tune} />
        ) : (
          <div className="fp-dial" aria-hidden="true">
            <span className="fp-freq">search · any song · any station</span>
          </div>
        )}
        <div className="fp-band" role="tablist" aria-label="radio band">
          <button role="tab" aria-selected={band === "rooms"} onClick={() => setBand("rooms")}>
            rooms
          </button>
          <button role="tab" aria-selected={band === "search"} onClick={() => setBand("search")}>
            search
          </button>
        </div>
      </div>

      {picked ? (
        picked.source === "youtube" ? (
          <VideoStage track={picked} onExit={exit} />
        ) : (
          <LyricStage track={picked} onExit={exit} />
        )
      ) : band === "rooms" ? (
        <HostelRooms room={HOSTEL_ROOMS[roomIdx]} noteIdx={tunes} onSearch={() => setBand("search")} />
      ) : (
        <SearchVoid onPick={setPicked} />
      )}
    </div>
  )
}
