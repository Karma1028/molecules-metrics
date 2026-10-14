/**
 * World motion vocabulary (K3/K10, MASTER-PLAN §2). Two physics, one bridge:
 *   artist  = paper physics: things LAND (soft spring, slight rotation)
 *   analyst = instrument physics: things LOCK (snappy, axis-aligned, clip reveal)
 * Pages compose these presets instead of inventing keyframes. Every value comes from
 * motionTokens/springs. Pass `reduce` from useReducedMotion(): reduced = opacity only,
 * at most duration.fast (0.18s), no travel, no rotation, no clip.
 */
import type { Variants } from "motion/react"
import { motionTokens, springs } from "./motion-tokens"
import type { World } from "./theme"

const { duration, easing, distance } = motionTokens

/** Reduced-motion twin shared by every preset. */
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
}

/** Deterministic ±1.5deg tilt per index so SSR/re-render never jitters. */
export function paperTilt(i: number, max = 1.5): number {
  const s = Math.sin((i + 1) * 12.9898) * 43758.5453
  return +(((s - Math.floor(s)) * 2 - 1) * max).toFixed(2)
}

/* ---------------- ARTIST: paper physics ---------------- */

/** Drop and settle. `custom` = index (drives tilt + stagger). */
const land: Variants = {
  hidden: (i: number = 0) => ({ opacity: 0, y: distance.md - 2, rotate: paperTilt(i) * 2 }),
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    rotate: paperTilt(i) * 0.33,
    transition: { ...springs.gentle, delay: i * 0.06 },
  }),
  exit: { opacity: 0, y: -distance.sm, transition: { duration: duration.fast } },
}

/** In-world route change: page turn (outgoing skews + slides left, new page lands). */
const turn: Variants = {
  hidden: { opacity: 0, x: distance.lg, rotate: 0.6, transformOrigin: "0% 50%" },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    skewY: 0,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    x: -distance.xl,
    skewY: -1.2,
    transformOrigin: "0% 50%",
    transition: { duration: duration.normal, ease: easing.inOut },
  },
}

/* ---------------- ANALYST: instrument physics ---------------- */

/** Lock in: clip reveal top to bottom, no rotation. */
const lock: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { ...springs.snappy, delay: i * 0.04 },
  }),
  exit: { opacity: 0, transition: { duration: duration.fast } },
}

/** In-world route change: scan wipe (page revealed behind a top-to-bottom line). */
const scan: Variants = {
  hidden: { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: duration.slow, ease: easing.inOut },
  },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: easing.out } },
}

export const worldMotion = {
  artist: { land, turn },
  analyst: { lock, scan },
} as const

/** Pick a preset, collapsing to the reduced twin when needed. */
export function preset(v: Variants, reduce: boolean | null): Variants {
  return reduce ? reducedFade : v
}

/**
 * Variants for the in-world route wrapper in WorldLayout (MASTER-PLAN §2).
 * - Artist: page turn (skews and slides left under paper-edge shadow, new page lands).
 * - Analyst: scan wipe (top to bottom clip reveal with snappy lock).
 * Reduced motion collapses to reducedFade (opacity only <= 0.18s).
 */
export function routeVariants(world: World, reduce: boolean | null): Variants {
  if (reduce) return reducedFade
  return world === "artist" ? worldMotion.artist.turn : worldMotion.analyst.scan
}
