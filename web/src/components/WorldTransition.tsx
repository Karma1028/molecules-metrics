import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { World } from "../lib/theme"

/**
 * Signature world-switch moment (BENGAL-MOTIF §4.5): the Bankura horse gallops
 * across a terracotta wipe as artist <-> analyst swap. Module-scoped `lastWorld`
 * survives the WorldLayout remount that the route change triggers, so the
 * overlay knows it is a WORLD change (not a first load or an in-world nav).
 * Reduced-motion skips the gallop entirely — the new world simply appears.
 */
let lastWorld: World | null = null

const DUR = 1.05

export function WorldTransition({ world }: { world: World }) {
  const reduce = useReducedMotion()
  const [play, setPlay] = useState(false)
  const token = useRef(0)

  useEffect(() => {
    const changed = lastWorld !== null && lastWorld !== world
    lastWorld = world
    if (!changed || reduce) return
    token.current += 1
    setPlay(true)
  }, [world, reduce])

  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key={token.current}
          className="world-wipe"
          aria-hidden="true"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "0%", "0%", "100%"] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: DUR,
            times: [0, 0.34, 0.6, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={() => setPlay(false)}
        >
          <motion.div
            className="world-wipe-horse"
            initial={{ x: "-34vw" }}
            animate={{ x: "112vw" }}
            transition={{ duration: DUR, ease: [0.3, 0.1, 0.5, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
