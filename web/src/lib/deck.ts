/**
 * The deck: every world is a vertical stack of one-screen sections laid out in
 * depth. Scrolling (wheel, swipe) or clicking travels through the stack, and
 * the route wrapper in WorldLayout plays the 3D travel. Pure helpers live here
 * so the gesture rules are testable without a DOM.
 */
import { WORLDS } from "./worlds"
import type { World } from "./theme"

export type Travel = { dir: 1 | -1; cross: boolean }

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p)

export function worldOf(path: string): World | null {
  const p = norm(path)
  if (p === "/artist" || p.startsWith("/artist/")) return "artist"
  if (p === "/analyst" || p.startsWith("/analyst/")) return "analyst"
  return null
}

/** Position of a path in its world's section stack, -1 when unknown. */
export function deckIndex(path: string): number {
  const w = worldOf(path)
  if (!w) return -1
  const p = norm(path)
  return WORLDS[w].nav.findIndex((n) => n.to === p)
}

/**
 * Which way the camera travels between two paths. Same world: down the stack
 * when the target sits later in the nav. Cross world: the analyst lies to the
 * right of the artist, so going there swings right.
 */
export function travelBetween(from: string, to: string): Travel {
  const a = worldOf(from)
  const b = worldOf(to)
  if (a && b && a !== b) return { dir: b === "analyst" ? 1 : -1, cross: true }
  return { dir: deckIndex(to) < deckIndex(from) ? -1 : 1, cross: false }
}

/** Neighbouring section of `path` in direction `dir`, or null at either end. */
export function neighbour(path: string, dir: 1 | -1): string | null {
  const w = worldOf(path)
  const i = deckIndex(path)
  if (!w || i < 0) return null
  return WORLDS[w].nav[i + dir]?.to ?? null
}

/* ---------- wheel gesture ---------- */

/** Wheel distance (px) that commits one section of travel. */
export const WHEEL_COMMIT = 120
/** A pause this long (ms) ends a wheel gesture and resets the accumulator. */
export const WHEEL_IDLE_MS = 220
/** After a commit, ignore wheel input this long (ms) so inertia cannot skip two sections. */
export const WHEEL_LOCK_MS = 1000
/** Minimum vertical swipe (px) on touch screens. */
export const SWIPE_COMMIT = 70

export interface WheelState {
  acc: number
  last: number
  lockedUntil: number
}

export const wheelStart = (): WheelState => ({ acc: 0, last: 0, lockedUntil: 0 })

/**
 * Feeds one wheel delta (already in px) at time `now`. Returns the new state and
 * the direction to travel, if this delta completed a gesture. While locked, any
 * continuing input (trackpad inertia) keeps the lock alive until it goes quiet.
 */
export function wheelStep(s: WheelState, dy: number, now: number): { state: WheelState; go: 1 | -1 | 0 } {
  if (now < s.lockedUntil) {
    return { state: { acc: 0, last: now, lockedUntil: Math.max(s.lockedUntil, now + WHEEL_IDLE_MS) }, go: 0 }
  }
  const fresh = now - s.last > WHEEL_IDLE_MS || Math.sign(dy) !== Math.sign(s.acc)
  const acc = (fresh ? 0 : s.acc) + dy
  if (Math.abs(acc) >= WHEEL_COMMIT) {
    return { state: { acc: 0, last: now, lockedUntil: now + WHEEL_LOCK_MS }, go: acc > 0 ? 1 : -1 }
  }
  return { state: { acc, last: now, lockedUntil: s.lockedUntil }, go: 0 }
}

/* ---------- fly-through corridor ---------- */

/** Frames this close to the lens (px of translateZ, perspective 900) are already gone. */
const LENS_Z = 320
/** Frames further back than this fade into fog. */
const FOG_Z = 3000

export interface TunnelFrame {
  /** translateZ keyframes in px */
  z: number[]
  opacity: number[]
  /** which section this frame stands for, as an offset from the destination (0 = destination) */
  offset: number
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/**
 * The corridor for one fly-through: `count` frames spaced `gap` apart, each
 * moving three gaps toward the camera (forward) or away from it (back), sampled
 * into keyframes. The destination frame ends exactly on the screen plane (z 0),
 * where the arriving page takes its place, and every frame has faded by the end.
 */
export function tunnelFrames(dir: 1 | -1, count: number, gap: number, samples = 12): TunnelFrame[] {
  const travel = 3 * gap
  const dest = dir > 0 ? 2 : 0
  return Array.from({ length: count }, (_, k) => {
    const start = dir > 0 ? -(k + 1) * gap : travel - k * gap
    const z: number[] = []
    const opacity: number[] = []
    for (let j = 0; j <= samples; j++) {
      const p = j / samples
      const zz = start + dir * travel * ease(p)
      const vis = clamp01((LENS_Z - zz) / 360) * clamp01((zz + FOG_Z) / 1400)
      // everything clears in the last stretch so the live page owns the screen
      const out = 1 - clamp01((p - 0.78) / 0.22)
      z.push(Math.round(zz))
      opacity.push(+(vis * out).toFixed(3))
    }
    return { z, opacity, offset: k - dest }
  })
}
