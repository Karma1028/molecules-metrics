import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { useReducedMotion } from "motion/react"
import type { World } from "../../lib/theme"
import { motionTokens } from "../../lib/motion-tokens"
import { splitHeadline, textOf } from "./headline-split"
import { countIn } from "./count-in"
import "./headline.css"

const H = motionTokens.headline

/**
 * Page title, entered the way each world records things (R2: "he watched,
 * then he counted"). Artist: written in, word by word out of a soft blur,
 * the hand word last like a signature. Analyst: counted in, each letter
 * ticks through digits and settles, left to right.
 */
export function Headline({ world, className, children }: { world: World; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion() ?? false
  const [shown, setShown] = useState(false)
  const counted = world === "analyst"
  const nodes = useMemo(() => splitHeadline(children, { chars: counted }).nodes, [children, counted])
  const label = useMemo(() => textOf(children), [children])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let stop = () => {}
    let done = false
    let fallback: ReturnType<typeof setTimeout> | undefined
    const show = () => {
      if (done) return
      done = true
      io.disconnect()
      clearTimeout(fallback)
      if (counted && !reduced) stop = countIn(el)
      setShown(true)
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) show()
    }, { threshold: 0.2 })
    io.observe(el)
    // a page clipped or mid-travel may never report intersecting: never leave the title hidden
    if (!done) fallback = setTimeout(show, H.fallbackMs)
    return () => { io.disconnect(); clearTimeout(fallback); stop() }
  }, [counted, reduced])

  return (
    <h1 ref={ref} className={`hl-${counted ? "count" : "write"}${className ? ` ${className}` : ""}${shown ? " in" : ""}`} aria-label={label} style={{ ["--hs" as string]: `${H.stagger}s` }}>
      {nodes}
    </h1>
  )
}
