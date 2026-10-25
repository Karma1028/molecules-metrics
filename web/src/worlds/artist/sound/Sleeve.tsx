import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import type { WrappedAlbum, WrappedYear } from "../../../lib/live"
import { fmt } from "./Readout"
import { Icon } from "../../../lib/icons"

/* The back of the record sleeve: every listening view is printed here as
   liner notes. Lists measure the space they are given and turn into sides
   (A, B, C) instead of ever scrolling or clipping. */

export interface Row {
  k: string
  n1: string
  n2?: string
  min: number
  plays?: number
  tag?: string
  /** cover thumbnail; `null` prints a blank sleeve swatch */
  img?: string | null
}

const SIDES = "ABCDEFGHIJKL"
const MAX_COLS = 2
/** fewer row-heights than this and the liner sentence moves to its own side */
const NOTE_INLINE_ROWS = 6
/** below this height the crate stops showing cover tiles and becomes a list */
const CRATE_GRID_MIN_H = 230

function useBox() {
  const ref = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ w: 0, h: 0, rowH: 34, colMin: 260 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const cs = getComputedStyle(el)
      const next = {
        w: el.clientWidth,
        h: el.clientHeight,
        rowH: parseFloat(cs.getPropertyValue("--row-h")) || 34,
        colMin: parseFloat(cs.getPropertyValue("--col-min")) || 260,
      }
      setBox((b) => (b.w === next.w && b.h === next.h && b.rowH === next.rowH && b.colMin === next.colMin ? b : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return { ref, ...box }
}

function Pager({ page, pages, onFlip }: { page: number; pages: number; onFlip: (p: number) => void }) {
  if (pages < 2) return null
  return (
    <div className="sl-pager" role="group" aria-label="sides">
      <button type="button" className="sl-flip sl-prev" onClick={() => onFlip((page - 1 + pages) % pages)} aria-label="previous side"><Icon id="i-arrow" /></button>
      <span className="sl-side" aria-live="polite">side {SIDES[page]} <small>of {pages}</small></span>
      <button type="button" className="sl-flip" onClick={() => onFlip((page + 1) % pages)} aria-label="next side"><Icon id="i-arrow" /></button>
    </div>
  )
}

function LinerRow({ r, n }: { r: Row; n: number }) {
  return (
    <li className="ln">
      {r.img !== undefined ? (
        <span className="ln-img">{r.img ? <img src={r.img} alt="" loading="lazy" /> : null}</span>
      ) : (
        <span className="ln-no">{String(n).padStart(2, "0")}</span>
      )}
      <span className="ln-t">
        <b>{r.n1}{r.tag ? <em className="ln-tag">{r.tag}</em> : null}</b>
        {r.n2 ? <i>{r.n2}</i> : null}
      </span>
      <span className="ln-lead" aria-hidden="true" />
      <span className="ln-m">
        <span><b>{fmt(r.min)}</b> min</span>
        {r.plays != null ? <small>{fmt(r.plays)} plays</small> : null}
      </span>
    </li>
  )
}

/** Tracklist / credits: numbered rows with dotted leaders, flowing down then across.
    On a short sleeve the liner sentence gets a side of its own instead of crushing the list. */
export function LinerList({ rows, note }: { rows: Row[]; note?: ReactNode }) {
  const outer = useBox()
  const box = useBox()
  const noteSide = Boolean(note) && outer.h > 0 && outer.h / outer.rowH < NOTE_INLINE_ROWS
  const cols = Math.max(1, Math.min(MAX_COLS, Math.floor(box.w / box.colMin)))
  const fitRows = Math.max(1, Math.floor(box.h / box.rowH))
  const perCol = Math.min(fitRows, Math.ceil(rows.length / cols))
  const per = perCol * cols
  const lead = noteSide ? 1 : 0
  const pages = Math.max(1, Math.ceil(rows.length / per)) + lead
  const [page, setPage] = useState(0)
  useEffect(() => setPage((p) => Math.min(p, pages - 1)), [pages])
  const onNote = noteSide && page === 0
  const listPage = page - lead
  const shown = onNote ? [] : rows.slice(listPage * per, listPage * per + per)
  const grid = { "--cols": cols, "--rows": perCol } as CSSProperties
  return (
    <div className="liner" ref={outer.ref}>
      {note && !noteSide ? <p className="liner-note">{note}</p> : null}
      <div className="liner-fit" ref={box.ref}>
        {onNote ? (
          <p className="liner-note liner-note-side">{note}</p>
        ) : (
          <ol className="liner-list" style={grid}>
            {shown.map((r, i) => (
              <LinerRow key={r.k} r={r} n={listPage * per + i + 1} />
            ))}
          </ol>
        )}
      </div>
      <Pager page={page} pages={pages} onFlip={setPage} />
    </div>
  )
}

const albumTitle = (a: WrappedAlbum) => a.album.replace(/\s*\(.*?\)/g, "")

/** The crate: the most-played albums, real covers where they are known. */
export function Crate({ albums, arts }: { albums: WrappedAlbum[]; arts: (string | null)[] }) {
  const box = useBox()
  const grid = box.h >= CRATE_GRID_MIN_H
  return (
    <div className="crate-box" ref={box.ref}>
      {grid ? (
        <div className="crate">
          {albums.map((a, i) => (
            <figure className="cv" key={`${a.artist}-${a.album}`}>
              <div className="cv-art">
                {arts[i] ? <img src={arts[i]!} alt={`${albumTitle(a)} cover`} loading="lazy" /> : <span className="cv-type">{albumTitle(a)}</span>}
              </div>
              <figcaption>
                <b>{albumTitle(a)}</b>
                <span>{a.artist} · {fmt(a.minutes)} min</span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <LinerList rows={albums.map((a, i) => ({ k: `${a.artist}-${a.album}`, n1: albumTitle(a), n2: a.artist, min: a.minutes, img: arts[i] }))} />
      )}
    </div>
  )
}

const SHORT_SPINE = 0.34

/** Eras: one sleeve spine per year, height = minutes listened that year. */
export function Shelf({ years }: { years: WrappedYear[] }) {
  const max = years.reduce((m, y) => Math.max(m, y.minutes), 1)
  return (
    <div className="shelf">
      <div className="shelf-row">
        {years.map((y) => {
          const p = Math.max(0.04, y.minutes / max)
          const short = p < SHORT_SPINE
          const artist = y.topArtist ? <span className="sp-artist">{y.topArtist}</span> : null
          return (
            <div className="sp-col" key={y.year} style={{ "--p": p } as CSSProperties}>
              {short ? artist : null}
              <div className={`sp${p === 1 ? " peak" : ""}`} title={`${y.year}: ${fmt(y.minutes)} min, ${fmt(y.plays)} plays`}>
                {short ? null : artist}
              </div>
              <span className="sp-year">{y.year}</span>
              <span className="sp-min">{fmt(y.minutes)}<span className="sp-unit"> min</span></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
