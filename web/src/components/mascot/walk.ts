/** Pure walking physics for the roaming Bankura horse (px and px/s). */

export type Gait = "idle" | "walk" | "trot" | "gallop"
export type Walker = { x: number; v: number }

export const ARRIVE_PX = 14
const MAX_V = 620
const ACCEL = 900
const BRAKE = 0.6 // fraction of ACCEL used to plan the stop, so it never overshoots
const MIN_WANDER = 120
const MAX_WANDER = 420

export function gaitFor(v: number): Gait {
  const s = Math.abs(v)
  if (s < 8) return "idle"
  if (s < 140) return "walk"
  if (s < 340) return "trot"
  return "gallop"
}

/** One physics step toward a target x. Settles inside ARRIVE_PX with v = 0. */
export function stepWalker(s: Walker, target: number, dt: number): Walker {
  const dist = target - s.x
  if (Math.abs(dist) <= ARRIVE_PX && Math.abs(s.v) < 30) return { x: Math.abs(dist) < 1 ? s.x : s.x + dist, v: 0 }
  const want = Math.sign(dist) * Math.min(MAX_V, Math.sqrt(2 * ACCEL * BRAKE * Math.abs(dist)))
  const dv = Math.max(-ACCEL * dt, Math.min(ACCEL * dt, want - s.v))
  const v = s.v + dv
  return { x: s.x + v * dt, v }
}

/** A place to amble to: 120-420 px away, bouncing off the walls. r in [0,1). */
export function wanderTarget(x: number, maxX: number, r: number): number {
  const dist = MIN_WANDER + r * (MAX_WANDER - MIN_WANDER)
  const dir = r < 0.5 ? -1 : 1
  let t = x + dir * dist
  if (t > maxX || t < 0) t = x - dir * dist
  return Math.max(0, Math.min(maxX, t))
}

/** Distance between hoofprints. */
export function strideFor(g: Gait): number {
  return g === "gallop" ? 78 : g === "trot" ? 54 : g === "walk" ? 34 : 0
}
