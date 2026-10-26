import { useRef } from "react"
import { useInView } from "motion/react"
import { useReducedMotion } from "../../../hooks/useSafeMotion"
import { useNowPlaying, type SpotifyWrapped } from "../../../lib/live"
import { SpotifyGlyph } from "./glyphs"

/* The deck's display window: lifetime counters on dark glass, and a ticker
   line for whatever the live feed says is (or last was) on. */

const nf = new Intl.NumberFormat("en-IN")
export const fmt = (n: number) => nf.format(n)

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

/** A number whose digits roll into place the first time it is seen. */
function Odometer({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const play = reduced || inView
  let digitIdx = 0
  return (
    <span className="odo" ref={ref} aria-label={fmt(value)}>
      <span aria-hidden="true" className="odo-row">
        {fmt(value).split("").map((c, i) =>
          c < "0" || c > "9" ? (
            <span className="odo-sep" key={i}>{c}</span>
          ) : (
            <OdoDigit key={i} d={Number(c)} play={play} idx={digitIdx++} instant={reduced} />
          ),
        )}
      </span>
    </span>
  )
}

type Life = NonNullable<SpotifyWrapped["lifetime"]>

function cells(life: Life) {
  const days = Math.round(life.minutes / 60 / 24)
  return [
    { k: "minutes", v: life.minutes, note: `${fmt(life.hours)} h, about ${days} days` },
    { k: "plays", v: life.plays, note: `${Math.round(life.skipRate * 100)}% skipped` },
    { k: "songs", v: life.uniqueTracks, note: "different tracks" },
    { k: "artists", v: life.uniqueArtists, note: "in rotation" },
  ]
}

export function NowLine() {
  const { data: np } = useNowPlaying()
  const has = !!np?.title
  const playing = !!np?.isPlaying
  return (
    <div className={`now${playing ? " live" : ""}`}>
      {np?.art ? <img className="now-art" src={np.art} alt="" /> : <span className="now-art ph" />}
      <span className="now-led" aria-hidden="true" />
      <span className="now-k">{has ? (playing ? "on now" : <>last<span className="now-k-long"> played</span></>) : "idle"}</span>
      <span className="now-t">
        {has ? (
          <>
            <b>{np!.title}</b>
            {np?.artist ? <i>{np.artist}</i> : null}
          </>
        ) : (
          <b>Nothing spinning right now.</b>
        )}
      </span>
      {!playing && np?.playedAt ? <span className="now-when">{ago(np.playedAt)}</span> : null}
      {np?.url ? (
        <a className="now-open" href={np.url} target="_blank" rel="noopener" aria-label="open in Spotify">
          <SpotifyGlyph size={14} /> <span>open</span>
        </a>
      ) : null}
    </div>
  )
}

export function Readout({ life }: { life: Life | null }) {
  return (
    <div className="vfd">
      {life ? (
        <div className="vfd-grid">
          {cells(life).map((c) => (
            <div className="vfd-cell" key={c.k}>
              <span className="vfd-k">{c.k}</span>
              <span className="vfd-v"><Odometer value={c.v} /></span>
              <span className="vfd-n">{c.note}</span>
            </div>
          ))}
        </div>
      ) : null}
      <NowLine />
    </div>
  )
}
