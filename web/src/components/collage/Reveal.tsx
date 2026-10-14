import { motion } from "motion/react"
import type { ReactNode } from "react"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useSafeMotion } from "../../hooks/useSafeMotion"

/**
 * Collage scroll-reveal built on motion tokens. Enters once when scrolled into
 * view; collapses to opacity-only under prefers-reduced-motion. `i` staggers the
 * delay (0.05–0.10s band) so a group rises in sequence.
 */
export function Reveal({
  children,
  i = 0,
  distance = motionTokens.distance.md,
  className,
}: {
  children: ReactNode
  i?: number
  distance?: number
  className?: string
}) {
  const safe = useSafeMotion(distance)
  return (
    <motion.div
      className={className}
      initial={safe.initial}
      whileInView={safe.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springs.gentle, delay: i * 0.07 }}
    >
      {children}
    </motion.div>
  )
}
