export interface Sample { x: number; y: number; t: number }
export interface Rect { left: number; right: number; top: number; bottom: number }

/** Below this speed (px/ms) a release is a nudge, not a flick. */
export const MIN_SPEED = 0.35
const WINDOW_MS = 80

/** Velocity over the last 80 ms of pointer samples, px per ms. */
export function velocityFrom(samples: Sample[]): { vx: number; vy: number } {
  if (samples.length < 2) return { vx: 0, vy: 0 }
  const last = samples[samples.length - 1]
  const recent = samples.filter((s) => last.t - s.t <= WINDOW_MS)
  const first = recent[0]
  const dt = last.t - first.t
  if (recent.length < 2 || dt <= 0) return { vx: 0, vy: 0 }
  return { vx: (last.x - first.x) / dt, vy: (last.y - first.y) / dt }
}

/** How far (ms of travel at release speed) the ball coasts before it stops. */
export const REACH_MS = 300

/** Where a released ball comes to rest: release point plus velocity times REACH_MS. */
export function restPoint(from: { x: number; y: number }, v: { vx: number; vy: number }) {
  return { x: from.x + v.vx * REACH_MS, y: from.y + v.vy * REACH_MS }
}

/** Index of the row the ball comes to rest on, or null for a nudge or when it stops off the index. */
export function flickTarget(
  from: { x: number; y: number },
  v: { vx: number; vy: number },
  rects: Rect[],
): number | null {
  if (Math.hypot(v.vx, v.vy) < MIN_SPEED) return null
  const p = restPoint(from, v)
  const i = rects.findIndex((r) => p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom)
  return i < 0 ? null : i
}
