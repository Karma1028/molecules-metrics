import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useNowPlaying, useMusicSearch, type MusicTrack } from "../../../lib/live"
import { linkToTrack, parseMusicLink, type MusicLink } from "../../../lib/music"
import { HostelRooms, RoomDial, RoomScene } from "./HostelRooms"
import { HOSTEL_ROOMS } from "./hostel-rooms"
import { LyricStage, SourceMark, VideoStage } from "./Stage"

const SWIPE_MIN = 50

/** A pasted YouTube / Spotify link resolves straight to its embed; title lookup is best effort. */
function useLinkTrack(link: MusicLink | null): MusicTrack | null {
  const [track, setTrack] = useState<MusicTrack | null>(null)
  const key = link ? `${link.source}:${link.kind}:${link.id}` : ""
  useEffect(() => {
    setTrack(null)
    if (!link) return
    const ctl = new AbortController()
    linkToTrack(link, ctl.signal).then((t) => !ctl.signal.aborted && setTrack(t))
    return () => ctl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return track
}

// ── Idle / searching: the void + search field + suggestion lines ──────
function SearchVoid({ onPick }: { onPick: (t: MusicTrack) => void }) {
  const [query, setQuery] = useState("")
  const [debounced, setDebounced] = useState("")
  const [active, setActive] = useState(0)
  const { data: np } = useNowPlaying()
  const link = useMemo(() => parseMusicLink(query), [query])
  const linked = useLinkTrack(link)
  const { data: search, loading: searching, error } = useMusicSearch(link ? "" : debounced)
  const results = link ? (linked ? [linked] : []) : search.results
  const loading = link ? !linked : searching

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

  const typed = debounced.length > 0 || !!link
  return (
    <div className="void">
      {np?.title ? <div className="ghost">{np.title}</div> : null}
      <div className="search">
        <label className="hint" htmlFor="radio-q">
          type a song, or paste a YouTube or Spotify link.
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
            <li className="s-note">{link ? "tuning in to that link…" : "searching…"}</li>
          ) : results.length === 0 ? (
            <li className="s-note">
              {error ? "search is offline right now. paste a YouTube or Spotify link instead." : "nothing found. try another title."}
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
                  {t.artist ? (
                    <>
                      <span className="s-sep">·</span>
                      <span className="s-artist">{t.artist}</span>
                    </>
                  ) : null}
                </span>
                <span className="s-src"><SourceMark source={t.source} /></span>
              </li>
            ))
          )}
        </ul>
      )}
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

  // swipe across the room to retune, like the original app on a phone
  const swipeFrom = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    if (band !== "rooms" || e.pointerType === "mouse") return
    swipeFrom.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const from = swipeFrom.current
    swipeFrom.current = null
    if (!from) return
    const dx = e.clientX - from.x
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(e.clientY - from.y)) return
    const next = Math.max(0, Math.min(HOSTEL_ROOMS.length - 1, roomIdx + (dx < 0 ? 1 : -1)))
    tune(next)
  }

  return (
    <div className="radio" data-band={band} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      {band === "rooms" && !picked ? <RoomScene room={HOSTEL_ROOMS[roomIdx]} /> : null}
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
        // portal: a transformed page ancestor would otherwise trap the fixed takeover under the site header
        createPortal(
          picked.source === "youtube" ? (
            <VideoStage track={picked} onExit={exit} />
          ) : (
            <LyricStage track={picked} onExit={exit} />
          ),
          document.body,
        )
      ) : band === "rooms" ? (
        <HostelRooms room={HOSTEL_ROOMS[roomIdx]} noteIdx={tunes} onSearch={() => setBand("search")} />
      ) : (
        <SearchVoid onPick={setPicked} />
      )}
    </div>
  )
}
