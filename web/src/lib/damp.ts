/**
 * Frame-rate-independent smoothing, ported from the reference teardown
 * (audit/rea-2026-10-19 SYNTHESIS §2d: inkwell `Damp(x, target, 6e-3, dt)`).
 * x moves toward target by 1 - e^(-lambda * dt), so 2 frames of 16 ms land
 * exactly where 1 frame of 32 ms does. lambda is per millisecond.
 */
export function damp(current: number, target: number, lambda: number, dtMs: number): number {
  if (!(dtMs > 0)) return current
  return current + (target - current) * (1 - Math.exp(-lambda * dtMs))
}

export interface Point {
  readonly x: number
  readonly y: number
}

/** Magnet: aim at the element centre plus k of the pointer's offset from it. */
export function magnetAim(centre: Point, pointer: Point, k: number): Point {
  return { x: centre.x + (pointer.x - centre.x) * k, y: centre.y + (pointer.y - centre.y) * k }
}

/** True when every [value, target] pair is within eps, so the rAF loop can stop. */
export function settled(pairs: ReadonlyArray<readonly [number, number]>, eps: number): boolean {
  return pairs.every(([v, t]) => Math.abs(t - v) < eps)
}
