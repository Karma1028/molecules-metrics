import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { World } from "../lib/theme"
import { motionTokens } from "../lib/motion-tokens"
import { MorphOverlay, morphReady, preloadMorph } from "./morph/MorphOverlay"
import { isTransiting } from "./transit/state"

/**
 * Signature world-switch moment (GEMINI-EXECUTION-BRIEF §3, §4 R3):
 * The Bankura horse shuttle gallops across a terracotta wipe as artist <-> analyst swap.
 * - Directional gallop: Left->Right into Analyst, Right->Left (scaleX(-1)) into Artist.
 * - Trailing thread line runs behind the horse across the pass.
 * - Mid-wipe destination label appears in Fraunces (Artist) or JetBrains Mono (Analyst).
 * - Single terracotta thread line lingers on screen for 300ms as the new world lands.
 * - Reduced-motion skips wipe & gallop entirely — the destination simply appears.
 * When WebGL and the lazy three.js chunk are ready, the molecule -> chart morph
 * (morph/MorphScene) plays instead; the horse wipe is the fallback.
 */
let lastWorld: World | null = null

const DUR = motionTokens.duration.cinematic
const LINGER = motionTokens.duration.normal
const { wipe: WIPE_EASE, glide: GLIDE_EASE } = motionTokens.easing

export function WorldTransition({ world }: { world: World }) {
  const reduce = useReducedMotion()
  const loc = useLocation()
  const [play, setPlay] = useState(false)
  const [morph, setMorph] = useState(false)
  const [lingering, setLingering] = useState(false)
  const [direction, setDirection] = useState<"to-analyst" | "to-artist">("to-analyst")
  const [label, setLabel] = useState<string>("")
  const token = useRef(0)
  const lingerTimer = useRef(0)

  useEffect(() => () => window.clearTimeout(lingerTimer.current), [])
  useEffect(() => {
    if (!reduce) return preloadMorph()
  }, [reduce])

  useEffect(() => {
    const changed = lastWorld !== null && lastWorld !== world
    lastWorld = world
    // a 3D transit (components/transit) already carried the switch
    if (!changed || reduce || isTransiting()) return

    const dir = world === "analyst" ? "to-analyst" : "to-artist"
    setDirection(dir)

    const stateLabel = (loc.state as { doorLabel?: string } | null)?.doorLabel
    const fallbackLabel = world === "artist" ? "Artist World" : "Analyst World"
    setLabel(stateLabel ?? fallbackLabel)

    token.current += 1
    if (morphReady()) setMorph(true)
    else setPlay(true)
  }, [world, reduce, loc.state])

  const onWipeComplete = () => {
    setPlay(false)
    setLingering(true)
    window.clearTimeout(lingerTimer.current)
    lingerTimer.current = window.setTimeout(() => setLingering(false), LINGER * 1000)
  }

  if (reduce) return null

  return (
    <>
      {morph && (
        <MorphOverlay
          key={`morph-${token.current}`}
          direction={direction}
          world={world}
          label={label}
          onDone={() => setMorph(false)}
        />
      )}
      {lingering && (
        <motion.div
          key={`linger-${token.current}`}
          className="world-thread-line"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: LINGER, ease: "linear" }}
          aria-hidden="true"
        />
      )}
      <AnimatePresence>
        {play && (
          <motion.div
            key={token.current}
            className={`world-wipe dir-${direction}`}
            aria-hidden="true"
            initial={{ x: direction === "to-analyst" ? "-100%" : "100%" }}
            animate={{
              x:
                direction === "to-analyst"
                  ? ["-100%", "0%", "0%", "100%"]
                  : ["100%", "0%", "0%", "-100%"],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: DUR,
              times: [0, 0.34, 0.6, 1],
              ease: WIPE_EASE,
            }}
            onAnimationComplete={onWipeComplete}
          >
            {/* Trailing thread line on the wipe */}
            <motion.div
              className={`world-wipe-thread ${direction === "to-artist" ? "reverse" : ""}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 1, 1] }}
              style={{
                transformOrigin: direction === "to-analyst" ? "left center" : "right center",
              }}
              transition={{ duration: DUR, times: [0, 0.34, 0.6, 1], ease: GLIDE_EASE }}
            />

            {/* Destination label mid-wipe */}
            <motion.div
              className={`world-wipe-label ${world}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{
                opacity: [0, 0, 1, 1, 0],
                scale: [0.94, 0.94, 1, 1, 1.02],
              }}
              transition={{
                duration: DUR,
                times: [0, 0.24, 0.36, 0.62, 0.86],
                ease: "easeInOut",
              }}
            >
              <span className="ww-text">{label}</span>
            </motion.div>

            {/* Galloping Bankura horse shuttle */}
            <motion.div
              className="world-wipe-horse"
              initial={{
                x: direction === "to-analyst" ? "-34vw" : "112vw",
                scaleX: direction === "to-analyst" ? 1 : -1,
              }}
              animate={{
                x: direction === "to-analyst" ? "112vw" : "-34vw",
                scaleX: direction === "to-analyst" ? 1 : -1,
              }}
              transition={{ duration: DUR, ease: GLIDE_EASE }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
