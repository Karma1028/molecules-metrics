import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useReducedMotion } from "../../../hooks/useSafeMotion"
import { motionTokens, springs } from "../../../lib/motion-tokens"
import { useSpotifyStats, useSpotifyWrapped, type SpotifyWrapped } from "../../../lib/live"
import { SpotifyGlyph } from "./glyphs"
import { Turntable } from "./Turntable"
import { Readout, fmt } from "./Readout"
import { Crate, LinerList, Shelf, type Row } from "./Sleeve"
import { Dial, Lately } from "./Dial"
import { albumArt } from "./album-covers"
import { useArtPalette } from "./art-palette"
import { SOUND_ME_CSS } from "./sound-me.css"

/* Mode A, "me": one hi-fi deck. The most-played album turns on the platter,
   the display window holds the lifetime counters, and the record sleeve
   carries every other view as liner notes, picked with the deck's keys. */

// Spotify brand green: the accent identity inside the paper world. Glyph unaltered.
const GREEN = "#1DB954"
const LIST_LEN = 12
const CRATE_LEN = 8

interface DeckTab {
  id: string
  label: string
  /** phone-width key cap */
  short: string
  kick: string
}

type Lateness = { name: string; img?: string | null }[]

function buildTabs(w: SpotifyWrapped, hasLife: boolean, hasLately: boolean): DeckTab[] {
  const t: DeckTab[] = []
  const yrs = w.span?.years ?? []
  if (hasLife && w.topTracks?.length) t.push({ id: "tracks", label: "Tracklist", short: "Tracks", kick: "top tracks, by minutes played" })
  if (hasLife && w.topArtists?.length) t.push({ id: "credits", label: "Credits", short: "Artists", kick: "top artists, by minutes played" })
  if (hasLife && w.topAlbums?.length) t.push({ id: "crate", label: "Crate", short: "Crate", kick: "most-played albums" })
  if (hasLife && w.perYear?.length)
    t.push({ id: "eras", label: "Eras", short: "Eras", kick: yrs.length ? `minutes per year, ${yrs[0]} to ${yrs[yrs.length - 1]}` : "minutes per year" })
  if (hasLife && w.clock) t.push({ id: "clock", label: "Clock", short: "Clock", kick: "plays by hour of day, IST" })
  if (hasLately) t.push({ id: "lately", label: "Lately", short: "Lately", kick: "last 6 months, live" })
  return t
}

/** Arrow keys step through the deck keys, digits jump straight to one. */
function useDeckKeys(count: number, setTab: (f: (i: number) => number) => void) {
  useEffect(() => {
    if (count < 2) return
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      if (e.key === "ArrowRight") {
        e.preventDefault()
        setTab((i) => (i + 1) % count)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        setTab((i) => (i - 1 + count) % count)
      } else if (/^[1-9]$/.test(e.key) && Number(e.key) <= count) {
        setTab(() => Number(e.key) - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [count, setTab])
}

function Keys({ tabs, tab, onPick }: { tabs: DeckTab[]; tab: number; onPick: (i: number) => void }) {
  return (
    <div className="keys" role="tablist" aria-label="listening views">
      {tabs.map((t, i) => (
        <button key={t.id} role="tab" aria-selected={i === tab} className="key" onClick={() => onPick(i)}>
          <span className="key-led" aria-hidden="true" />
          <span className="key-lbl"><span className="key-lbl-l">{t.label}</span><span className="key-lbl-s">{t.short}</span></span>
        </button>
      ))}
    </div>
  )
}

function rowsOf(w: SpotifyWrapped): { tracks: Row[]; artists: Row[] } {
  const tracks = (w.topTracks ?? []).slice(0, LIST_LEN).map((t) => ({
    k: `${t.track}-${t.artist}`, n1: t.track.replace(/\s*\(Official\)/i, ""), n2: t.artist, min: t.minutes, plays: t.plays,
  }))
  const artists = (w.topArtists ?? []).slice(0, LIST_LEN).map((a, i) => ({
    k: a.name, n1: a.name, min: a.minutes, plays: a.plays, tag: i === 0 ? "the constant" : undefined,
  }))
  return { tracks, artists }
}

function creditsNote(w: SpotifyWrapped): ReactNode {
  const [a, b] = w.topArtists ?? []
  if (!a) return null
  return (
    <>
      Nearly a thousand hours, and it still comes back to <b>{a.name}</b>
      {b ? <>, with <b>{b.name}</b> close behind</> : null}. Measured, melancholic, and mine.
    </>
  )
}

function Panel({ id, w, arts, lately }: { id: string; w: SpotifyWrapped; arts: (string | null)[]; lately: Lateness }) {
  const { tracks, artists } = useMemo(() => rowsOf(w), [w])
  switch (id) {
    case "tracks": return <LinerList rows={tracks} />
    case "credits": return <LinerList rows={artists} note={creditsNote(w)} />
    case "crate": return <Crate albums={(w.topAlbums ?? []).slice(0, CRATE_LEN)} arts={arts} />
    case "eras": return <Shelf years={w.perYear ?? []} />
    case "clock": return w.clock ? <Dial byHour={w.clock.byHour} peak={w.clock.peakHour} nightShare={w.clock.nightShare} /> : null
    case "lately": return <Lately artists={lately} />
    default: return null
  }
}

function Sleeve({ tabs, tab, children }: { tabs: DeckTab[]; tab: number; children: ReactNode }) {
  const reduced = useReducedMotion()
  const cur = tabs[tab]
  return (
    <section className="sleeve" aria-label={cur?.label ?? "liner notes"}>
      <span className="sleeve-ring" aria-hidden="true" />
      <header className="sl-head">
        <span className="sl-title">{cur?.label ?? "Liner notes"}</span>
        <span className="sl-kick">{cur?.kick}</span>
      </header>
      <div className="sl-body">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cur?.id ?? "none"}
            className="sl-view"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.xs }}
            transition={reduced ? { duration: motionTokens.duration.fast } : springs.gentle}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function PlatterBay({ w, art }: { w: SpotifyWrapped; art: string | null }) {
  const lead = w.topAlbums?.[0]
  const title = lead ? lead.album.replace(/\s*\(.*?\)/g, "") : "My Sound"
  return (
    <div className="bay">
      <Turntable art={art} label={title} spinning />
      <div className="bay-cap">
        <span className="bay-k">on the platter</span>
        <b>{title}</b>
        {lead ? <span>{lead.artist} · {fmt(lead.minutes)} min, the most-played album</span> : null}
      </div>
    </div>
  )
}

export function SoundMe() {
  const { data: w, fallback: wFallback } = useSpotifyWrapped()
  const { data: stats, fallback: statsFallback } = useSpotifyStats()
  const life = !wFallback ? w.lifetime ?? null : null
  const lately = stats.topArtists ?? []
  const hasLately = !statsFallback && lately.length > 0
  const albums = useMemo(() => (w.topAlbums ?? []).slice(0, CRATE_LEN), [w.topAlbums])
  const arts = useMemo(() => albumArt(albums), [albums])
  const pal = useArtPalette(arts[0])
  const tabs = useMemo(() => buildTabs(w, !!life, hasLately), [w, life, hasLately])
  const [tab, setTab] = useState(0)
  useEffect(() => {
    if (tab > tabs.length - 1) setTab(0)
  }, [tabs.length, tab])
  useDeckKeys(tabs.length, setTab)
  const years = w.span?.years?.length
  const style = { "--green": GREEN, "--art": pal?.accent ?? GREEN } as CSSProperties

  return (
    <div className="me" style={style}>
      <style>{SOUND_ME_CSS}</style>
      <div className="hifi">
        <div className="hifi-badge">
          <span className="hb-brand"><SpotifyGlyph size={13} /> {life && years ? `My Sound · ${years} years, logged` : "My Sound · live from Spotify"}</span>
          <h2 className="hb-title">Who I am, in listening data.</h2>
        </div>
        <PlatterBay w={w} art={arts[0]} />
        <div className="hifi-side">
          <Readout life={life} />
          {tabs.length > 1 ? <Keys tabs={tabs} tab={tab} onPick={setTab} /> : null}
          <Sleeve tabs={tabs} tab={tab}>
            {tabs.length ? (
              <Panel id={tabs[tab]?.id ?? ""} w={w} arts={arts} lately={lately} />
            ) : (
              <p className="me-empty">Listening history is syncing. The full picture lands once it connects.</p>
            )}
          </Sleeve>
        </div>
      </div>
    </div>
  )
}
