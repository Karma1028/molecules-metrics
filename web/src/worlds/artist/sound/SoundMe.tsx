import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { Reveal } from "../../../components/collage"
import { useCountUp } from "../../../hooks/useCountUp"
import { useReducedMotion } from "../../../hooks/useSafeMotion"
import { motionTokens, springs } from "../../../lib/motion-tokens"
import {
  useNowPlaying,
  useSpotifyStats,
  useSpotifyWrapped,
  type WrappedArtist,
  type WrappedTrack,
  type WrappedYear,
} from "../../../lib/live"
import { SpotifyGlyph } from "./glyphs"

// Spotify brand green — the accent *inside* the paper world (SCOPE §4.3).
// Glyph unaltered; no implied endorsement.
const GREEN = "#1DB954"

const nf = new Intl.NumberFormat("en-IN")
const fmt = (n: number) => nf.format(n)
const barStyle = (pct: number, i = 0) =>
  ({ "--w": `${Math.max(2, pct)}%`, "--i": i }) as CSSProperties

function ago(iso?: string | null) {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 0 || Number.isNaN(diff)) return ""
  const m = Math.round(diff / 60000)
  if (m < 1) return "moments ago"
  if (m < 60) return `${m} min ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h} h ago`
  return `${Math.round(h / 24)} d ago`
}

// ── live: what's spinning right now ───────────────────────────────────
function OnNow() {
  const { data: np } = useNowPlaying()
  const has = !!np?.title
  const playing = !!np?.isPlaying
  return (
    <div className="onnow">
      <div className="art-wrap">
        {np?.art ? <img className="art" src={np.art} alt={has ? `${np.title} cover` : ""} /> : <div className="art ph" />}
      </div>
      <div className="meta">
        <div className="lbl">
          <SpotifyGlyph size={13} />
          {has ? (playing ? "on now" : "last played") : "sound"}
          {playing && (
            <span className="eq">
              <i />
              <i />
              <i />
            </span>
          )}
        </div>
        <div className="t">{has ? np!.title : "Nothing spinning right now."}</div>
        <div className="a">{np?.artist || ""}</div>
        {!playing && np?.playedAt ? <div className="when">{ago(np.playedAt)}</div> : null}
        {np?.url ? (
          <a className="splink" href={np.url} target="_blank" rel="noopener">
            <SpotifyGlyph size={14} /> open in Spotify
          </a>
        ) : null}
      </div>
    </div>
  )
}

// ── odometer: a single digit column rolling 0→target ──────────────────
function OdoDigit({ d, play, idx, instant }: { d: number; play: boolean; idx: number; instant: boolean }) {
  const y = play ? -d * 10 : 0 // strip is 10 digits; each digit = 10% of strip height
  return (
    <span className="odo-d">
      <span
        className="odo-col"
        style={{
          transform: `translateY(${y}%)`,
          transition: instant ? "none" : `transform .95s cubic-bezier(.2,.75,.2,1) ${idx * 0.07}s`,
        }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span className="odo-n" key={n}>{n}</span>
        ))}
      </span>
    </span>
  )
}

// ── odometer: the whole number, digits rolling into place on view ─────
function Odometer({ value, unit }: { value: number; unit?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()
  const play = reduced ? true : inView
  const chars = fmt(value).split("")
  let digitIdx = 0
  return (
    <span className="odo" ref={ref} aria-label={`${fmt(value)}${unit ?? ""}`}>
      <span aria-hidden="true" className="odo-row">
        {chars.map((c, i) => {
          if (c < "0" || c > "9") return <span className="odo-sep" key={i}>{c}</span>
          return <OdoDigit key={i} d={Number(c)} play={play} idx={digitIdx++} instant={reduced} />
        })}
      </span>
      {unit ? <span className="sb-unit">{unit}</span> : null}
    </span>
  )
}

// ── a single big rolled-up number (Wrapped headline) ──────────────────
function StatBig({ value, unit, label, note, accent }: {
  value: number; unit?: string; label: string; note?: string; accent?: boolean
}) {
  return (
    <div className={`statbig${accent ? " on" : ""}`}>
      <div className="sb-num">
        <Odometer value={value} unit={unit} />
      </div>
      <div className="sb-label">{label}</div>
      {note ? <div className="sb-note">{note}</div> : null}
    </div>
  )
}

// ── a record, still spinning (the No.1 "constant") ───────────────────
function Vinyl() {
  const grooves = [44, 52, 60, 68, 76, 84]
  return (
    <svg className="vinyl" viewBox="0 0 200 200" role="img" aria-label="a record, still spinning">
      <defs>
        <radialGradient id="vinyl-g" cx="42%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#2b2721" />
          <stop offset="100%" stopColor="#0c0a07" />
        </radialGradient>
      </defs>
      <g className="vinyl-disc">
        <circle cx="100" cy="100" r="96" fill="url(#vinyl-g)" />
        {grooves.map((r) => (
          <circle key={r} className="vinyl-groove" cx="100" cy="100" r={r} />
        ))}
        <path className="vinyl-sheen" d="M46 56 A96 96 0 0 1 150 42" />
        <circle className="vinyl-label" cx="100" cy="100" r="33" />
        <circle className="vinyl-label-ring" cx="100" cy="100" r="33" />
        <circle className="vinyl-hole" cx="100" cy="100" r="4.5" />
      </g>
    </svg>
  )
}

function No1Card({ artist, years }: { artist: WrappedArtist; years?: number }) {
  const [ref, min] = useCountUp(artist.minutes)
  return (
    <div className="no1">
      <Vinyl />
      <div className="no1-body">
        <div className="no1-tag">
          <SpotifyGlyph size={13} /> the constant
        </div>
        <div className="no1-name">{artist.name}</div>
        <div className="no1-stat" ref={ref as React.Ref<HTMLDivElement>}>
          <b>{fmt(min)}</b> minutes · <b>{artist.plays}</b> plays · most-played, {years ?? "many"} yrs running
        </div>
      </div>
      <span className="no1-hand">no.1</span>
    </div>
  )
}

// ── ranked countdown (artists or tracks) with minutes bars ────────────
function Countdown({ rows }: {
  rows: { k: string; n1: string; n2?: string; min: number; plays: number }[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const max = rows.reduce((m, r) => Math.max(m, r.min), 1)
  return (
    <div className={`cd${inView ? " in" : ""}`} ref={ref}>
      <ol className="cd-list">
        {rows.map((r, i) => (
          <li className="cd-row" key={r.k} style={barStyle((r.min / max) * 100, i)}>
            <span className="cd-rk">{String(i + 1).padStart(2, "0")}</span>
            <span className="cd-body">
              <span className="cd-names">
                <span className="cd-n1">{r.n1}</span>
                {r.n2 ? <span className="cd-n2">{r.n2}</span> : null}
              </span>
              <span className="cd-bar" aria-hidden="true">
                <span className="cd-fill" />
              </span>
            </span>
            <span className="cd-val">
              <b>{fmt(r.min)}</b> min<span className="cd-plays">{r.plays} plays</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ── eras: minutes per year, 2019 → now ────────────────────────────────
function Eras({ years }: { years: WrappedYear[] }) {
  const max = years.reduce((m, y) => Math.max(m, y.minutes), 1)
  return (
    <div className="eras">
      {years.map((y, i) => (
        <div className="era" key={y.year} style={barStyle((y.minutes / max) * 100, i)}>
          <div className="era-col" aria-hidden="true">
            <span className="era-fill" />
          </div>
          <div className="era-year">{String(y.year).slice(2)}</div>
          <div className="era-min">{fmt(y.minutes)}m</div>
          {y.topArtist ? <div className="era-top">{y.topArtist}</div> : null}
        </div>
      ))}
    </div>
  )
}

// ── when I listen: a radial 24-spoke listening clock ──────────────────
function Clock({ byHour, peak, nightShare }: { byHour: number[]; peak: number; nightShare: number }) {
  const max = byHour.reduce((m, v) => Math.max(m, v), 1)
  const hh = (h: number) => `${String(h).padStart(2, "0")}:00`
  const C = 150 // viewbox center
  const R0 = 58 // inner radius
  const RMAX = 128 // max spoke reach
  const spokes = byHour.map((v, h) => {
    const ang = (h / 24) * Math.PI * 2 - Math.PI / 2
    const len = R0 + (v / max) * (RMAX - R0)
    return {
      h,
      v,
      x1: C + Math.cos(ang) * R0,
      y1: C + Math.sin(ang) * R0,
      x2: C + Math.cos(ang) * len,
      y2: C + Math.sin(ang) * len,
    }
  })
  const tick = (h: number, label: string) => {
    const ang = (h / 24) * Math.PI * 2 - Math.PI / 2
    return (
      <text key={label} className="clk-tick" x={C + Math.cos(ang) * (RMAX + 14)} y={C + Math.sin(ang) * (RMAX + 14)}>
        {label}
      </text>
    )
  }
  return (
    <div className="clock">
      <svg className="clk-svg" viewBox="0 0 300 300" role="img" aria-label={`Peak listening around ${hh(peak)} IST`}>
        <circle className="clk-ring" cx={C} cy={C} r={R0} />
        {spokes.map((s) => (
          <line
            key={s.h}
            className={`clk-spoke${s.h === peak ? " peak" : ""}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            style={{ "--i": s.h } as CSSProperties}
          >
            <title>{`${hh(s.h)} · ${s.v} plays`}</title>
          </line>
        ))}
        {tick(0, "00")}
        {tick(6, "06")}
        {tick(12, "12")}
        {tick(18, "18")}
        <text className="clk-core" x={C} y={C - 6}>{hh(peak)}</text>
        <text className="clk-core-sub" x={C} y={C + 14}>peak hour</text>
      </svg>
      <div className="clk-read">
        most alive around <b>{hh(peak)}</b> · <b>{Math.round(nightShare * 100)}%</b> of plays after midnight
      </div>
    </div>
  )
}

// ── live "lately" rundown (medium-term, with album art) ───────────────
function LatelyView({ artists }: { artists: { name: string; img?: string | null }[] }) {
  return (
    <div className="lately">
      <div className="lt-strip">
        {artists.slice(0, 8).map((a, i) => (
          <div className="lt-art" key={`${a.name}-${i}`} style={{ "--i": i } as CSSProperties}>
            {a.img ? <img src={a.img} alt="" /> : <span className="lt-ph" />}
            <span className="lt-name">{a.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface DeckTab {
  id: string
  label: string
  kick: string
}

export function SoundMe() {
  const { data: w, fallback: wFallback } = useSpotifyWrapped()
  const { data: stats, fallback: statsFallback } = useSpotifyStats()
  const reduced = useReducedMotion()

  const life = w.lifetime
  const hasLife = !wFallback && !!life
  const days = life ? Math.round(life.minutes / 60 / 24) : 0

  const artistRows = (w.topArtists ?? []).slice(0, 8).map((a: WrappedArtist) => ({
    k: a.name, n1: a.name, min: a.minutes, plays: a.plays,
  }))
  const trackRows = (w.topTracks ?? []).slice(0, 8).map((t: WrappedTrack) => ({
    k: `${t.track}-${t.artist}`, n1: t.track, n2: t.artist, min: t.minutes, plays: t.plays,
  }))
  const no1 = (w.topArtists ?? [])[0]
  const no2 = (w.topArtists ?? [])[1]
  const span = w.span

  const latelyArtists = stats.topArtists ?? []
  const hasLately = !statsFallback && latelyArtists.length > 0

  // build the deck from whatever datasets the live feed actually returned
  const tabs = useMemo<DeckTab[]>(() => {
    const t: DeckTab[] = []
    if (no1) t.push({ id: "constant", label: "The constant", kick: "most-played, all-time" })
    if (trackRows.length) t.push({ id: "loop", label: "On loop", kick: "top tracks · by minutes" })
    if (artistRows.length) t.push({ id: "rotation", label: "Heavy rotation", kick: "top artists · by minutes" })
    if (w.perYear?.length) t.push({ id: "eras", label: "Eras", kick: "minutes per year" })
    if (w.clock) t.push({ id: "clock", label: "When I listen", kick: "plays by hour · IST" })
    if (hasLately) t.push({ id: "lately", label: "Lately", kick: "last 6 months · live" })
    return t
  }, [no1, trackRows.length, artistRows.length, w.perYear?.length, w.clock, hasLately])

  const [tab, setTab] = useState(0)
  useEffect(() => {
    if (tab > tabs.length - 1) setTab(0)
  }, [tabs.length, tab])

  // keyboard: arrows cycle, digits jump
  useEffect(() => {
    if (!hasLife || tabs.length < 2) return
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      if (e.key === "ArrowRight") { e.preventDefault(); setTab((i) => (i + 1) % tabs.length) }
      else if (e.key === "ArrowLeft") { e.preventDefault(); setTab((i) => (i - 1 + tabs.length) % tabs.length) }
      else if (/^[1-9]$/.test(e.key)) {
        const n = Number(e.key) - 1
        if (n < tabs.length) setTab(n)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [hasLife, tabs.length])

  const renderPanel = (id: string) => {
    switch (id) {
      case "constant":
        return no1 ? (
          <div className="constant">
            <No1Card artist={no1} years={span?.years?.length} />
            <div className="sofme">
              <div className="lbl"><SpotifyGlyph size={12} /> the sound of me</div>
              <p className="read">
                Nearly a thousand hours, and it still comes back to <b>{no1.name}</b>
                {no2 ? <> with <b>{no2.name}</b> close behind</> : null}. Measured, melancholic, and mine.
              </p>
            </div>
          </div>
        ) : null
      case "loop": return <Countdown rows={trackRows} />
      case "rotation": return <Countdown rows={artistRows} />
      case "eras": return w.perYear ? <Eras years={w.perYear} /> : null
      case "clock": return w.clock ? <Clock byHour={w.clock.byHour} peak={w.clock.peakHour} nightShare={w.clock.nightShare} /> : null
      case "lately": return <LatelyView artists={latelyArtists} />
      default: return null
    }
  }

  return (
    <div className="me">
      <style>{`.p-sound .me{--green:${GREEN}}`}</style>

      <div className="me-head">
        <div className="kicker" style={{ color: GREEN }}>
          <SpotifyGlyph size={14} />
          {hasLife && span?.years?.length
            ? `My Sound · ${span.years.length} years, logged`
            : "My Sound · live from Spotify"}
        </div>
        <h2 className="sec">Who I am, in listening data.</h2>
        <div className="sec-kick">the over-thinker&apos;s soundtrack · measured, not curated</div>
      </div>

      {hasLife && life ? (
        <div className="console">
          {/* fixed header — what's spinning now + the headline numbers */}
          <div className="con-head">
            <Reveal className="ch-now"><OnNow /></Reveal>
            <Reveal i={1} className="ch-stats">
              <div className="statgrid">
                <StatBig value={life.minutes} unit=" min" label="listened, all-time" note={`${fmt(life.hours)} hours ≈ ${days} days of sound`} accent />
                <StatBig value={life.plays} label="tracks played" note={`${fmt(life.uniqueTracks)} of them different`} />
                <StatBig value={life.uniqueArtists} label="artists in rotation" note={`${Math.round(life.skipRate * 100)}% skip rate · picky`} />
              </div>
            </Reveal>
          </div>

          {/* the tabbed deck — one panel per dataset, all reachable, none cut */}
          {tabs.length ? (
            <div className="deck">
              <div className="deck-tabs" role="tablist" aria-label="listening views">
                {tabs.map((t, i) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={i === tab}
                    className={`dt${i === tab ? " on" : ""}`}
                    onClick={() => setTab(i)}
                  >
                    {t.label}
                  </button>
                ))}
                <span className="deck-kick">{tabs[tab]?.kick}</span>
              </div>
              <div className="deck-panel">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tabs[tab]?.id ?? "none"}
                    className="deck-view"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.md }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.sm }}
                    transition={springs.gentle}
                  >
                    {renderPanel(tabs[tab]?.id ?? "")}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="console con-sync">
          <Reveal className="r-onnow"><OnNow /></Reveal>
          {hasLately ? <Reveal i={1}><LatelyView artists={latelyArtists} /></Reveal> : null}
          <Reveal i={2}>
            <p className="me-empty">Listening history is syncing. The full picture lands once it connects.</p>
          </Reveal>
        </div>
      )}
    </div>
  )
}
