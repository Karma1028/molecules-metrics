import { useState, type CSSProperties } from "react"
import { HOSTEL_ROOMS, dialPosition, type HostelRoom } from "./hostel-rooms"
import { SpotifyGlyph } from "./glyphs"

/** One tuned room: scene photo, a line overheard in it, and its track. */
export function HostelRooms({ room, noteIdx, onSearch }: { room: HostelRoom; noteIdx: number; onSearch: () => void }) {
  // the Spotify player only loads after a tap, so the page stays light until asked
  const [playingId, setPlayingId] = useState<string | null>(null)
  const playing = playingId === room.id
  const note = room.notes[noteIdx % room.notes.length]

  return (
    <div className="rooms">
      <figure className="scene" data-room={room.id}>
        <img
          className="scene-img"
          src={`/hostel/${room.id}.webp`}
          alt={`${room.name}, a hostel scene`}
          width={1376}
          height={768}
          decoding="async"
        />
        <figcaption className="scene-cap">
          <span className="scene-freq">{room.freq} FM</span>
          <span className="scene-name">{room.name}</span>
          <span className="scene-note">"{note}"</span>
        </figcaption>
      </figure>

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
          {r.freq}
        </button>
      ))}
    </div>
  )
}
