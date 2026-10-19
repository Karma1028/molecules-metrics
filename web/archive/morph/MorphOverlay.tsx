import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import type { World } from "../../lib/theme"
import { motionTokens } from "../../lib/motion-tokens"

type SceneModule = typeof import("./MorphScene")

const FADE = motionTokens.duration.slow
// matches MORPH_TIMING.total; kept here so the overlay does not pull in the three.js chunk
const TOTAL = 2.4
const LABEL_IN = 0.42
const LABEL_HOLD = 0.82
const GUARD = 0.25

let mod: SceneModule | null = null
let webgl: boolean | null = null

/** Fetches the three.js chunk once the page is idle. Returns a cleanup for the idle callback. */
export function preloadMorph(): (() => void) | undefined {
  if (mod || typeof window === "undefined") return
  const load = () => {
    import("./MorphScene")
      .then((m) => {
        mod = m
        webgl = m.canWebGL()
      })
      .catch(() => {
        /* chunk failed to load: the horse wipe stays the transition */
      })
  }
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(load, { timeout: 4000 })
    return () => window.cancelIdleCallback(id)
  }
  const id = setTimeout(load, 1500)
  return () => clearTimeout(id)
}

export const morphReady = () => Boolean(mod && webgl)

interface Props {
  direction: "to-analyst" | "to-artist"
  world: World
  label: string
  onDone: () => void
}

export function MorphOverlay({ direction, world, label, onDone }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    if (!mod || !canvas.current) {
      done.current()
      return
    }
    let morph: ReturnType<SceneModule["createMorph"]> | null = null
    try {
      morph = mod.createMorph(canvas.current, direction)
      morph.play(() => done.current())
    } catch {
      done.current()
    }
    // a slow GPU can stall rAF; never hold the page longer than the planned length
    const guard = window.setTimeout(() => done.current(), (TOTAL + GUARD) * 1000)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && done.current()
    window.addEventListener("keydown", onKey)
    return () => {
      window.clearTimeout(guard)
      window.removeEventListener("keydown", onKey)
      morph?.dispose()
    }
  }, [direction])

  const fadeAt = (TOTAL - FADE) / TOTAL
  return (
    <motion.div
      className={`world-morph dir-${direction}`}
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: TOTAL, times: [0, fadeAt, 1], ease: "easeIn" }}
      onClick={() => done.current()}
    >
      <canvas ref={canvas} className="world-morph-canvas" />
      <motion.div
        className={`world-wipe-label world-morph-label ${world}`}
        initial={{ opacity: 0, y: motionTokens.distance.sm }}
        animate={{ opacity: [0, 0, 1, 1], y: [motionTokens.distance.sm, motionTokens.distance.sm, 0, 0] }}
        transition={{ duration: TOTAL, times: [0, LABEL_IN, LABEL_HOLD - 0.2, 1], ease: "easeOut" }}
      >
        <span className="ww-text">{label}</span>
      </motion.div>
    </motion.div>
  )
}
