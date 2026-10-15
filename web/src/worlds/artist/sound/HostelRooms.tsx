import { useState, type CSSProperties } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { motionTokens } from "../../../lib/motion-tokens"
import { HOSTEL_ROOMS, dialPosition, type HostelRoom } from "./hostel-rooms"
import { SpotifyGlyph } from "./glyphs"

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

/** One tuned room: what you overhear in it, and its track. The scene itself is the page. */
export function HostelRooms({ room, noteIdx, onSearch }: { room: HostelRoom; noteIdx: number; onSearch: () => void }) {
  // the Spotify player only loads after a tap, so the page stays light until asked
  const [playingId, setPlayingId] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const playing = playingId === room.id
  const note = room.notes[noteIdx % room.notes.length]

  return (
    <div className="rooms">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${room.id}-${noteIdx}`}
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
          <p className="room-note">"{note}"</p>
        </motion.div>
      </AnimatePresence>

      <div className="room-deck">
        {playing ? (
          <iframe
            key={room.id}
            className="room-embed"
            title={`${room.track} by ${room.artist} on Spotify`}
            src={`https://open.spotify.com/embed/track/${room.trackId}?utm_source=generator&theme=0`}
            height={80}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : (
          <button className="room-play" onClick={() => setPlayingId(room.id)}>
            <span className="rp-btn" aria-hidden="true">▶</span>
            <span className="rp-txt">
              <span className="rp-track">{room.track}</span>
              <span className="rp-artist">{room.artist}</span>
            </span>
            <SpotifyGlyph size={16} />
          </button>
        )}
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
