import { useEffect, useRef } from "react"
import { animate, useReducedMotion } from "motion/react"
import { motionTokens } from "../lib/motion-tokens"
import { formatStat, parseStat } from "./choreo"

interface Props {
  value: string
  /** seconds before the count starts */
  delaySec?: number
}

/** A stat that counts up from zero to the real value, landing exactly on it. Text values and reduced motion show as-is. */
export function StatValue({ value, delaySec = 0 }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    const stat = parseStat(value)
    if (!el || !stat || reduce) return
    el.textContent = formatStat(stat, 0)
    const controls = animate(0, stat.n, {
      duration: motionTokens.story.countSec,
      delay: delaySec,
      ease: motionTokens.easing.smooth,
      onUpdate: (v) => {
        el.textContent = formatStat(stat, v)
      },
      onComplete: () => {
        el.textContent = value
      },
    })
    return () => controls.stop()
  }, [value, delaySec, reduce])

  return <span ref={ref}>{value}</span>
}
