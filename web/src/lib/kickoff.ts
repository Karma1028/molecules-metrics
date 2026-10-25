/** Pure physics + zones for the /kickoff page. Pitch coordinates are 0..1 on both axes. */

export type Pt = { x: number; y: number }
export type Ball = Pt & { vx: number; vy: number }
export type Zone = Pt & { label: string; to: string; r: number }

export const FRICTION = 0.985 // per 1/60 s frame
export const MAX_POWER = 1.6 // pitch-widths per second
const POWER_GAIN = 5
const MIN_DRAG = 0.02
const STOP_V = 0.01
const BOUNCE = 0.8
const ZONE_R = 0.085

/** The goals: where the ball can end up, and where that sends you. */
export const ZONES: Zone[] = [
  { label: "Gallery", to: "/artist/gallery", x: 0.12, y: 0.2, r: ZONE_R },
  { label: "Sound", to: "/artist/sound", x: 0.12, y: 0.8, r: ZONE_R },
  { label: "Matchday", to: "/artist/matchday", x: 0.5, y: 0.1, r: ZONE_R },
  { label: "Notes", to: "/artist/notes", x: 0.5, y: 0.9, r: ZONE_R },
  { label: "Work", to: "/analyst/work", x: 0.88, y: 0.2, r: ZONE_R },
  { label: "Dashboard", to: "/analyst/dashboard", x: 0.88, y: 0.8, r: ZONE_R },
]

/** Slingshot: pull the ball back, it flies the other way. */
export function kickVelocity(ball: Pt, pull: Pt): { vx: number; vy: number } {
  const dx = ball.x - pull.x
  const dy = ball.y - pull.y
  const d = Math.hypot(dx, dy)
  if (d < MIN_DRAG) return { vx: 0, vy: 0 }
  const p = Math.min(MAX_POWER, d * POWER_GAIN)
  return { vx: (dx / d) * p, vy: (dy / d) * p }
}

export function stepBall(b: Ball, dt: number): Ball {
  const k = Math.pow(FRICTION, dt * 60)
  let vx = b.vx * k
  let vy = b.vy * k
  let x = b.x + vx * dt
  let y = b.y + vy * dt
  if (x < 0 || x > 1) {
    x = x < 0 ? 0 : 1
    vx = -vx * BOUNCE
  }
  if (y < 0 || y > 1) {
    y = y < 0 ? 0 : 1
    vy = -vy * BOUNCE
  }
  if (Math.hypot(vx, vy) < STOP_V) {
    vx = 0
    vy = 0
  }
  return { x, y, vx, vy }
}

export function zoneAt(p: Pt): Zone | null {
  return ZONES.find((z) => Math.hypot(p.x - z.x, p.y - z.y) <= z.r) ?? null
}

export function nearestZone(p: Pt): Zone {
  return ZONES.reduce((a, z) => (Math.hypot(p.x - z.x, p.y - z.y) < Math.hypot(p.x - a.x, p.y - a.y) ? z : a))
}
