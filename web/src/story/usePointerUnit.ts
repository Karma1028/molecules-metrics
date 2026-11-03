import { useEffect } from "react"
import { useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { springs } from "../lib/motion-tokens"

/** Pointer position as -1..1 on each axis, eased by a slow spring, for parallax. Still under reduced motion. */
export function usePointerUnit() {
  const reduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, springs.slow)
  const y = useSpring(rawY, springs.slow)

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduce, rawX, rawY])

  return { x, y }
}
