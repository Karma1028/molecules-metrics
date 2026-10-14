import { motion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"
import { useReducedMotion } from "../../hooks/useSafeMotion"

/**
 * Scroll-linked parallax drift. As the element travels through the viewport,
 * it shifts by `distance` px (negative = rises faster than the page). Gives the
 * collage depth without triggering on-enter. Honors reduced-motion (no drift).
 */
export function Pinned({
  children,
  distance = -40,
  className,
}: {
  children: ReactNode
  distance?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, distance])
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduced ? 0 : y }}>{children}</motion.div>
    </div>
  )
}
