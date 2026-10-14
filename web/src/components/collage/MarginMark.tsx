import { motion } from "motion/react"
import type { ReactNode } from "react"
import { motionTokens } from "../../lib/motion-tokens"

/**
 * A handwritten margin annotation (Caveat script) with a little hand-drawn
 * arrow that draws itself in when scrolled into view. Points toward the thing
 * it annotates: `side="left"` arrow curls rightward, `side="right"` leftward.
 */
export function MarginMark({
  children,
  side = "left",
  rotate = -5,
  className,
}: {
  children: ReactNode
  side?: "left" | "right"
  rotate?: number
  className?: string
}) {
  const d = side === "left" ? "M3 6 C18 2 30 10 44 20" : "M49 6 C34 2 22 10 8 20"
  const head = side === "left" ? "M44 20 L35 19 M44 20 L42 11" : "M8 20 L17 19 M8 20 L10 11"
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
      style={{
        width: 128,
        rotate: `${rotate}deg`,
        font: '600 17px/1.05 "Caveat", cursive',
        color: "var(--accent)",
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      {children}
      <svg
        viewBox="0 0 52 30"
        aria-hidden="true"
        style={{ width: 52, height: 30, display: "block", margin: "3px auto 0", color: "var(--accent)" }}
      >
        <motion.path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth, delay: 0.15 }}
        />
        <motion.path
          d={head}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth, delay: 0.55 }}
        />
      </svg>
    </motion.div>
  )
}
