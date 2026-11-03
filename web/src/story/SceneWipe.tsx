import { useEffect } from "react"
import { motion, useReducedMotion } from "motion/react"
import { motionTokens } from "../lib/motion-tokens"

interface Props {
  /** cover: sweeps in from the left and holds. reveal: starts covering, sweeps out to the right. */
  phase: "cover" | "reveal"
  onDone?: () => void
}

/** The colour panel that carries the story from one scene to the next. Reduced motion: no panel, just the callback. */
export function SceneWipe({ phase, onDone }: Props) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce && phase === "cover") onDone?.()
  }, [reduce, phase, onDone])

  if (reduce) return null

  return (
    <motion.div
      className="scene-wipe"
      aria-hidden="true"
      initial={{ x: phase === "cover" ? "-101%" : "0%" }}
      animate={{ x: phase === "cover" ? "0%" : "101%" }}
      transition={{ duration: motionTokens.story.wipeSec, ease: motionTokens.easing.wipe }}
      onAnimationComplete={onDone}
    />
  )
}
