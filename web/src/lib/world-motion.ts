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
import type { Travel } from "./deck"

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

/* ---------------- DECK: 3D travel between sections ---------------- */

const { deck } = motionTokens
const still: Travel = { dir: 1, cross: false }

/**
 * A world switch flips the site like a two-sided card: artist on one face,
 * analyst on the other. The page shrinks to card size, turns edge-on (the
 * theme flips at that instant, while nothing is visible), and the other face
 * turns in and comes forward. Into the analyst the card turns right-to-left.
 */
function flipVariants(): Variants {
  const r = deck.recede
  return {
    hidden: (t: Travel = still) => ({ rotateY: -t.dir * 90, scale: r, opacity: 1, x: "0vw", y: "0vh", rotateX: 0, rotateZ: 0 }),
    visible: (t: Travel = still) => ({
      rotateY: [-t.dir * 90, 0, 0],
      scale: [r, r, 1],
      opacity: 1,
      x: "0vw",
      y: "0vh",
      rotateX: 0,
      rotateZ: 0,
      transition: { duration: deck.enter, times: [0, deck.split, 1], ease: [easing.smooth, easing.inOut] },
    }),
    exit: (t: Travel = still) => ({
      rotateY: [0, 0, t.dir * 90],
      scale: [1, r, r],
      transition: { duration: deck.exit, times: [0, 1 - deck.split, 1], ease: [easing.inOut, easing.depart] },
    }),
  }
}

/**
 * Same-world travel is a fly-through (components/deck/DeckTunnel draws the
 * corridor). Forward: the camera dives through the page (it swells past the
 * lens and dissolves) and the next section arrives from deep in the corridor.
 * Back: the camera pulls out, the page shrinks into the distance and the
 * previous section comes in over the shoulder. Artist pages keep a whisper of
 * paper roll; analyst pages stay axis-true.
 */
function flyVariants(world: World): Variants {
  const roll = world === "artist" ? deck.roll * 3 : 0
  const size = (dir: number, side: 1 | -1) => (dir * side > 0 ? deck.far : side > 0 ? deck.nearIn : deck.near)
  return {
    hidden: (t: Travel = still) => ({ scale: size(t.dir, 1), rotateZ: -t.dir * roll, opacity: 0, x: "0vw", y: "0vh", rotateX: 0, rotateY: 0 }),
    visible: (t: Travel = still) => ({
      scale: [size(t.dir, 1), 1],
      rotateZ: [-t.dir * roll, 0],
      opacity: [0, 1],
      x: "0vw",
      y: "0vh",
      rotateX: 0,
      rotateY: 0,
      transition: { duration: deck.flyEnter, ease: easing.smooth, opacity: { duration: deck.flyEnter * 0.5, ease: easing.out } },
    }),
    exit: (t: Travel = still) => ({
      scale: [1, size(t.dir, -1)],
      rotateZ: [0, t.dir * roll],
      opacity: [1, 0],
      transition: { duration: deck.flyExit, ease: easing.depart },
    }),
  }
}

/** Picks fly-through or cube swing from the Travel handed to each variant. */
export function deckVariants(world: World): Variants {
  const fly = flyVariants(world)
  const swing = flipVariants()
  const pick = (k: "hidden" | "visible" | "exit") => (t: Travel = still) => {
    const v = (t.cross ? swing : fly)[k]
    return typeof v === "function" ? v(t, {}, {}) : v
  }
  return { hidden: pick("hidden"), visible: pick("visible"), exit: pick("exit") }
}

/** Route wrapper variants: the deck, or an opacity fade under reduced motion. */
export function routeVariants(world: World, reduce: boolean | null): Variants {
  return reduce ? reducedFade : deckVariants(world)
}
