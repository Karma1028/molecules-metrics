import { useEffect, useRef, useState, type CSSProperties } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { motionTokens } from "../../../lib/motion-tokens"
import { HOSTEL_ROOMS, dialPosition, type HostelRoom } from "./hostel-rooms"
import { YouTubeGlyph } from "./glyphs"
import { startFan, type Fan } from "./ambience"

/** Full-bleed scene behind the whole page; crossfades when the dial moves. */
export function RoomScene({ room }: { room: HostelRoom }) {
  const reduce = useReducedMotion()
  return (
    <div className="room-scene" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.img
          key={room.id}
          className="room-scene-img"
          src={`/hostel/${room.id}.webp`}
          alt=""
          decoding="async"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? motionTokens.duration.fast : motionTokens.duration.slow }}
        />
      </AnimatePresence>
      <div className="room-scrim" />
    </div>
  )
}

const MAGGI_S = 120

/** Room switches: a synthesised ceiling fan and the two-minute Maggi timer. */
function RoomKit() {
  const fan = useRef<Fan | null>(null)
  const [fanOn, setFanOn] = useState(false)
  const [left, setLeft] = useState<number | null>(null)

  useEffect(() => () => fan.current?.stop(), [])
  const toggleFan = () => {
    if (fan.current) {
      fan.current.stop()
      fan.current = null
      setFanOn(false)
      return
    }
    fan.current = startFan()
    setFanOn(Boolean(fan.current))
  }

  useEffect(() => {
    if (left === null || left <= 0) return
    const id = window.setTimeout(() => setLeft(left - 1), 1000)
    return () => window.clearTimeout(id)
  }, [left])
  const running = left !== null && left > 0
  const mm = left === null ? "2:00" : `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`

  return (
    <div className="room-kit">
      <button className="rk" aria-pressed={fanOn} onClick={toggleFan} aria-label="ceiling fan sound">
        <span className="rk-k">fan</span>
        <span className="rk-v">{fanOn ? "on" : "off"}</span>
      </button>
      <button
        className="rk"
        aria-pressed={running}
        onClick={() => setLeft(running ? null : MAGGI_S)}
        aria-label={left === 0 ? "maggi is ready, start again" : "two minute maggi timer"}
      >
        <span className="rk-k">maggi</span>
        <span className="rk-v">{left === 0 ? "tayyar hai" : mm}</span>
      </button>
    </div>
  )
}

/** One tuned room: what you overhear in it, and its track. The scene itself is the page. */
export function HostelRooms({
  room,
  noteIdx,
  onNote,
  onPlay,
  onSearch,
}: {
  room: HostelRoom
  noteIdx: number
  onNote: () => void
  onPlay: () => void
  onSearch: () => void
}) {
  const reduce = useReducedMotion()
  const note = room.notes[noteIdx % room.notes.length]

  return (
    <div className="rooms">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={room.id}
          className="room-cap"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -8 }}
          transition={{ duration: motionTokens.duration.normal }}
        >
          <span className="room-freq">
            <i className="room-led" aria-hidden="true" />
            {room.freq} FM · now tuned
          </span>
          <h2 className="room-name">{room.name}</h2>
          <button className="room-note" onClick={onNote} aria-label={`overheard: ${note}. Hear another line`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={noteIdx}
                initial={{ opacity: 0, x: reduce ? 0 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -10 }}
                transition={{ duration: motionTokens.duration.fast }}
              >
                "{note}"
              </motion.span>
            </AnimatePresence>
            <span className="rn-more" aria-hidden="true">overhear another ↻</span>
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="room-deck">
        <RoomKit />
        <button className="room-play" onClick={onPlay} aria-label={`play ${room.track} in full`}>
          <span className="rp-btn" aria-hidden="true">▶</span>
          <span className="rp-txt">
            <span className="rp-track">{room.track}</span>
            <span className="rp-artist">{room.artist}</span>
          </span>
          <span className="rp-full">full song</span>
          <YouTubeGlyph size={16} />
        </button>
        <button className="room-search" onClick={onSearch}>
          or search any song →
        </button>
      </div>
    </div>
  )
}

/** Dial stops for the five rooms; arrow keys tune like a real knob. */
export function RoomDial({ index, onTune }: { index: number; onTune: (i: number) => void }) {
  const last = HOSTEL_ROOMS.length - 1
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      onTune(Math.min(last, index + 1))
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      onTune(Math.max(0, index - 1))
    }
  }
  const pos = { "--pos": `${dialPosition(index) * 100}%` } as CSSProperties
  return (
    <div className="fp-dial tunable" role="radiogroup" aria-label="tune to a hostel room" onKeyDown={onKey} style={pos}>
      <span className="fp-needle" aria-hidden="true" />
      {HOSTEL_ROOMS.map((r, i) => (
        <button
          key={r.id}
          className="fp-stop"
          role="radio"
          aria-checked={i === index}
          aria-label={`${r.freq} FM, ${r.name}`}
          tabIndex={i === index ? 0 : -1}
          style={{ "--x": `${dialPosition(i) * 100}%` } as CSSProperties}
          onClick={() => onTune(i)}
        >
          <span className="fp-f">{r.freq}</span>
          <span className="fp-nm">{r.name}</span>
        </button>
      ))}
    </div>
  )
}
