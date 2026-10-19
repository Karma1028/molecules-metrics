import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../../lib/icons"
import { motionTokens } from "../../../lib/motion-tokens"
import { PINS, STATIONS } from "../journey-stations"
import { LANES, SPANS, T0, T1, changesAt, coords, lengthLabel } from "./timeline"

const pad = (n: number) => String(n).padStart(2, "0")
const RANGE = T1 - T0
const ERAS = [...new Set(STATIONS.map((s) => s.era))]
const share = (t: number) => `${((t - T0) / RANGE) * 100}%`

/** Where this step sits in the whole route: its stage, its slice of the years, its era. All derived from STATIONS. */
function Readout({ i }: { i: number }) {
  const s = STATIONS[i]
  const sp = SPANS[i]
  return (
    <div className="dc-read">
      <div className="rd-cell">
        <span className="rd-k">stage <b>{pad(i + 1)}/{pad(STATIONS.length)}</b></span>
        <span className="rd-segs" aria-hidden="true">
          {STATIONS.map((st, k) => (
            <i key={st.title} className={`${st.accent}${k <= i ? " done" : ""}${k === i ? " now" : ""}`} />
          ))}
        </span>
      </div>
      <div className="rd-cell">
        <span className="rd-k">from start <b>+{Math.floor(sp.start - T0)} yrs</b></span>
        <span className="rd-track" aria-hidden="true">
          <i style={{ left: share(sp.start), width: `max(4px, ${((sp.end - sp.start) / RANGE) * 100}%)` }} />
        </span>
        <span className="rd-ends" aria-hidden="true"><span>{Math.floor(T0)}</span><span>{Math.ceil(T1)}</span></span>
      </div>
      <div className="rd-cell">
        <span className="rd-k">era</span>
        <span className="rd-eras">
          {ERAS.map((e) => (
            <span key={e} className={e === s.era ? "on" : undefined}>{e}</span>
          ))}
        </span>
      </div>
    </div>
  )
}

/** One step's facts. Every step is rendered in the same grid cell so the card never resizes while scrubbing. */
function Step({ i, on }: { i: number; on: boolean }) {
  const reduce = useReducedMotion()
  const s = STATIONS[i]
  const work = LANES[i] === "work"
  const dy = reduce ? 0 : motionTokens.distance.xs
  return (
    <motion.article
      className={`dc ${s.accent}`}
      aria-hidden={!on}
      inert={!on}
      initial={false}
      animate={on ? { opacity: 1, y: 0, visibility: "visible" } : { opacity: 0, y: -dy, transitionEnd: { visibility: "hidden" } }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
    >
      <div className="jc-top">
        <Icon id={s.icon} className="ic jc-ic" />
        <span className="jc-era">{s.era}</span>
        <span className="jc-per">
          step {pad(i + 1)} / {pad(STATIONS.length)}
        </span>
      </div>
      <h2 className="jc-title">{s.title}</h2>
      <div className="dc-where">
        <span className="jc-place">{s.place}</span>
        <span className="jc-note">{s.note}</span>
      </div>

      <dl className="dc-facts">
        <div>
          <dt>{work ? "tenure" : "result"}</dt>
          <dd className="dc-metric">{s.metric}</dd>
        </div>
        <div>
          <dt>period</dt>
          <dd>
            {s.period}
            {!work && <small>{lengthLabel(SPANS[i])}</small>}
          </dd>
        </div>
        <div>
          <dt>base</dt>
          <dd>
            {PINS[s.pin].label}
            <small>{coords(s.pin)}</small>
          </dd>
        </div>
      </dl>

      <div className="dc-block">
        <h3>what changed</h3>
        <ul className="dc-changes">
          {changesAt(i).map((c) => (
            <li key={c}>
              <Icon id="i-arrow" className="ic" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <Readout i={i} />
    </motion.article>
  )
}

export function DetailCard({ sel }: { sel: number }) {
  return (
    <div className={`jcard ${STATIONS[sel].accent}`} aria-live="polite">
      {STATIONS.map((s, i) => (
        <Step key={s.title} i={i} on={i === sel} />
      ))}
    </div>
  )
}
