import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { ENTRIES, type Entry } from "./entries"
import { Leaf, type LeafHandlers, type Spot } from "./Leaf"

const STAGGER = 0.09
const LEAD_IN = 0.15
// desk fan: each leaf takes just under a quarter of the blotter, nudged off-grid
const FAN_W = 49
const FAN_H = 47
// phone stack: four full-width strips; tilt is damped so strips never cover a neighbour's text
const PHONE_QUERY = "(max-width: 600px)"
const STRIP_GAP = 1.6
const STRIP_TILT = 0.3

const fanSpot = (e: Entry): Spot => ({ left: e.at[0], top: e.at[1], width: FAN_W, height: FAN_H, tilt: e.tilt })
const stripSpot = (e: Entry, i: number, n: number): Spot => {
  const h = (100 - STRIP_GAP * (n - 1)) / n
  return { left: i % 2 ? 1.5 : 0, top: i * (h + STRIP_GAP), width: 98.5, height: h, tilt: e.tilt * STRIP_TILT }
}

function usePhone() {
  const [phone, setPhone] = useState(() => typeof window !== "undefined" && window.matchMedia(PHONE_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY)
    const on = () => setPhone(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return phone
}

/**
 * The notebook desk: four leaves fanned on a stitched blotter.
 * Mouse: hover lifts, click opens. Keyboard: focus lifts, Enter opens.
 * Touch/pen: first tap lifts (reveals the pencil notes), second tap opens.
 */
export function Desk({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState<number | null>(null)
  const phone = usePhone()
  // whether the leaf under the current touch was already lifted before this tap began
  const armed = useRef<{ i: number; wasOn: boolean; touch: boolean } | null>(null)

  const release = (i: number) => setActive((a) => (a === i ? null : a))

  const h: LeafHandlers = {
    onPointerDown: (i, ev) => {
      armed.current = { i, wasOn: active === i, touch: ev.pointerType !== "mouse" }
    },
    onPointerEnter: (i, ev) => {
      if (ev.pointerType === "mouse") setActive(i)
    },
    onPointerLeave: (i, ev) => {
      if (ev.pointerType === "mouse") release(i)
    },
    onClick: (i, ev) => {
      const tap = armed.current
      armed.current = null
      if (tap && tap.i === i && tap.touch && !tap.wasOn) {
        ev.preventDefault()
        setActive(i)
      }
    },
    onFocus: (i) => setActive(i),
    onBlur: (i) => release(i),
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : STAGGER, delayChildren: reduce ? 0 : LEAD_IN } },
  }

  return (
    <div className="desk">
      <motion.nav className="fan" aria-label="Notebook threads" variants={container} initial="hidden" animate="visible">
        {ENTRIES.map((e, i) => (
          <Leaf
            key={e.no}
            e={e}
            i={i}
            spot={phone ? stripSpot(e, i, ENTRIES.length) : fanSpot(e)}
            total={ENTRIES.length} on={active === i} reduce={reduce} h={h} />
        ))}
      </motion.nav>
    </div>
  )
}
