import type { FocusEvent, MouseEvent, PointerEvent } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Icon } from "../../../lib/icons"
import { motionTokens, springs } from "../../../lib/motion-tokens"
import { splitGloss, type Entry } from "./entries"

const DRAW = { duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }
const INSTANT = { duration: 0 }
// leaves stack in reading order; the lifted one always sits above the rest
const Z_LIFTED = 10

export interface LeafHandlers {
  onPointerDown: (i: number, ev: PointerEvent<HTMLAnchorElement>) => void
  onPointerEnter: (i: number, ev: PointerEvent<HTMLAnchorElement>) => void
  onPointerLeave: (i: number, ev: PointerEvent<HTMLAnchorElement>) => void
  onClick: (i: number, ev: MouseEvent<HTMLAnchorElement>) => void
  onFocus: (i: number, ev: FocusEvent<HTMLAnchorElement>) => void
  onBlur: (i: number, ev: FocusEvent<HTMLAnchorElement>) => void
}

/** where the leaf rests on the desk: % box plus resting tilt in degrees */
export interface Spot {
  left: number
  top: number
  width: number
  height: number
  tilt: number
}

interface LeafProps {
  e: Entry
  i: number
  spot: Spot
  total: number
  on: boolean
  reduce: boolean
  h: LeafHandlers
}

/** A pencil stroke that draws itself in when the leaf is lifted. */
function Pencil({ d, on, reduce, viewBox }: { d: string; on: boolean; reduce: boolean; viewBox: string }) {
  return (
    <svg viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 0.85 : 0 }}
        transition={reduce ? INSTANT : DRAW}
      />
    </svg>
  )
}

function Fastener({ kind }: { kind: Entry["kind"] }) {
  if (kind === "card") return <span className="tape" aria-hidden="true" />
  if (kind === "kraft") return <span className="grommet" aria-hidden="true" />
  if (kind === "graph")
    return (
      <svg className="clip" viewBox="0 0 16 40" fill="none" aria-hidden="true">
        <path d="M5 30V7a3 3 0 0 1 6 0v26a5 5 0 0 1-10 0V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  return null
}

export function Leaf({ e, i, spot, total, on, reduce, h }: LeafProps) {
  const [pre, mark, post] = splitGloss(e)
  const fade = { opacity: on ? 1 : 0, x: on || reduce ? 0 : -motionTokens.distance.xs }

  return (
    <motion.div
      className="slot"
      style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.width}%`, height: `${spot.height}%`, zIndex: on ? Z_LIFTED : i + 1 }}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.lg, rotate: spot.tilt * 3 },
        visible: { opacity: 1, y: 0, rotate: 0, transition: reduce ? INSTANT : springs.gentle },
      }}
    >
      <motion.div
        className="lift"
        initial={false}
        style={reduce ? { rotate: spot.tilt } : undefined}
        animate={reduce ? undefined : { rotate: on ? 0 : spot.tilt, scale: on ? motionTokens.scale.pop : 1, y: on ? -motionTokens.distance.xs : 0 }}
        transition={springs.snappy}
      >
        <Link
          to={e.to}
          className={`leaf k-${e.kind}${on ? " is-on" : ""}`}
          onPointerDown={(ev) => h.onPointerDown(i, ev)}
          onPointerEnter={(ev) => h.onPointerEnter(i, ev)}
          onPointerLeave={(ev) => h.onPointerLeave(i, ev)}
          onClick={(ev) => h.onClick(i, ev)}
          onFocus={(ev) => h.onFocus(i, ev)}
          onBlur={(ev) => h.onBlur(i, ev)}
        >
          <Fastener kind={e.kind} />
          <div className="lf-top">
            <span className="lf-ic"><Icon id={e.icon} /></span>
            <motion.span className="lf-route" aria-hidden="true" initial={false} animate={fade} transition={reduce ? INSTANT : DRAW}>
              ↳ {e.to}
            </motion.span>
            <span className="lf-no">
              {e.no}
              <Pencil on={on} reduce={reduce} viewBox="0 0 100 40" d="M62 3C30 0 3 8 4 21c1 13 40 17 70 14 22-2 26-14 18-24C84 2 60 1 44 4" />
              <motion.span className="lf-count" aria-hidden="true" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={reduce ? INSTANT : DRAW}>
                {i + 1}/{total}
              </motion.span>
            </span>
          </div>
          <h2 className="lf-title">{e.title}</h2>
          <p className="lf-gloss">
            {pre}
            {mark && (
              <motion.span
                className="mk"
                initial={false}
                animate={{ backgroundSize: on ? "100% 1.5px" : "0% 1.5px" }}
                transition={reduce ? INSTANT : DRAW}
              >
                {mark}
              </motion.span>
            )}
            {post}
          </p>
          <span className="lf-read">
            open {e.read}
            <Icon id="i-arrow" />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  )
}
