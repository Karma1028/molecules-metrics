import { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../../lib/icons"
import { springs } from "../../../lib/motion-tokens"
import { STATIONS } from "../journey-stations"
import { LANES, SPANS, T0, T1, yearLabel, type Lane } from "./timeline"

const RANGE = T1 - T0
const TICKS = Array.from({ length: Math.floor(RANGE) + 1 }, (_, k) => Math.ceil(T0) + k).filter((y) => y <= T1)
// every fifth year from the start, then the end year; spaced so phones never collide
const LABELLED = new Set([...TICKS.filter((y) => (y - TICKS[0]) % 5 === 0 && T1 - y >= 3), TICKS[TICKS.length - 1]])
const LANE_ORDER: readonly Lane[] = ["study", "work"]
const MONTH = 1 / 12

const pct = (t: number) => `${((t - T0) / RANGE) * 100}%`

interface Props {
  t: number
  sel: number
  onScrub: (t: number) => void
  onStep: (d: number) => void
  onJump: (i: number) => void
}

/** A year axis with every span drawn as a bar; drag, hover or arrow-key the playhead. */
export function Scrubber({ t, sel, onScrub, onStep, onJump }: Props) {
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState(false)
  const s = STATIONS[sel]

  const fromX = (clientX: number) => {
    const r = track.current?.getBoundingClientRect()
    if (!r || r.width === 0) return
    const f = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
    onScrub(Math.round((T0 + f * RANGE) / MONTH) * MONTH)
  }
  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => onStep(1),
      ArrowUp: () => onStep(1),
      ArrowLeft: () => onStep(-1),
      ArrowDown: () => onStep(-1),
      Home: () => onJump(0),
      End: () => onJump(STATIONS.length - 1),
      PageUp: () => onScrub(Math.min(T1, t + 1)),
      PageDown: () => onScrub(Math.max(T0, t - 1)),
    }
    const run = keys[e.key]
    if (!run) return
    e.preventDefault()
    e.stopPropagation()
    run()
  }
  const at = (t - T0) / RANGE
  const bubble = at < 0.08 ? "l" : at > 0.92 ? "r" : "c"

  return (
    <div className="jscrub">
      <button className="sc-btn prev" onClick={() => onStep(-1)} disabled={sel === 0} aria-label="previous step">
        <Icon id="i-arrow" />
      </button>
      <div className="sc-lanes" aria-hidden="true">
        {LANE_ORDER.map((l) => <span key={l}>{l}</span>)}
      </div>
      <div
        ref={track}
        className={`sc-track${drag ? " drag" : ""}`}
        role="slider"
        tabIndex={0}
        aria-label="Career timeline scrubber"
        aria-valuemin={T0}
        aria-valuemax={T1}
        aria-valuenow={Math.round(t * 100) / 100}
        aria-valuetext={`${yearLabel(t)}: ${s.title}, ${s.place}`}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          setDrag(true)
          fromX(e.clientX)
        }}
        onPointerMove={(e) => {
          if (drag || e.pointerType === "mouse") fromX(e.clientX)
        }}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
      >
        <div className="sc-rows" aria-hidden="true">
          {LANE_ORDER.map((lane) => (
            <div className="sc-row" key={lane}>
              {STATIONS.map((st, i) =>
                LANES[i] !== lane ? null : (
                  <span
                    key={st.title}
                    className={`sc-bar ${st.accent}${i === sel ? " on" : ""}`}
                    style={{ left: pct(SPANS[i].start), width: pct(T0 + SPANS[i].end - SPANS[i].start) }}
                  />
                ),
              )}
            </div>
          ))}
        </div>
        <div className="sc-axis" aria-hidden="true">
          {TICKS.map((y) => (
            <span key={y} className={`sc-tick${LABELLED.has(y) ? " lab" : ""}`} style={{ left: pct(y) }}>
              {LABELLED.has(y) && <b className={y === TICKS[0] ? "l" : y === TICKS[TICKS.length - 1] ? "r" : ""}>{y}</b>}
            </span>
          ))}
        </div>
        <motion.div
          className={`sc-head ${s.accent}`}
          aria-hidden="true"
          initial={false}
          animate={{ left: pct(t) }}
          transition={drag || reduce ? { duration: 0 } : springs.gentle}
        >
          <span className={`sc-read ${bubble}`}>{yearLabel(t)}</span>
          <span className="sc-knob" />
        </motion.div>
      </div>
      <button className="sc-btn" onClick={() => onStep(1)} disabled={sel === STATIONS.length - 1} aria-label="next step">
        <Icon id="i-arrow" />
      </button>
    </div>
  )
}
