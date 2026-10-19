import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { useReducedMotion } from "./useSafeMotion"

/**
 * Counts 0 → target the first time the element scrolls into view.
 * Reduced-motion / SSR safe: jumps straight to the target.
 * Returns [ref, value] — attach ref to the element whose entry triggers it.
 */
export function useCountUp(target: number, durationMs = 1200) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced || target <= 0) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs)
      // easeOutExpo for a Wrapped-style quick-then-settle roll-up
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, target, durationMs])

  return [ref, value] as const
}
