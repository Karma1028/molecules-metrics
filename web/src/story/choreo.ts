/** Pure choreography math for the story scenes. No DOM, no motion imports: testable alone. */

export interface Arc {
  x: number[]
  y: number[]
}

/** Parabolic flight sampled as keyframes. y negative is up; lands at `drop`. */
export function ballArc({ dx, peak, drop, steps }: { dx: number; peak: number; drop: number; steps: number }): Arc {
  const n = Math.max(2, Math.round(steps))
  const x: number[] = []
  const y: number[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    x.push(dx * t)
    y.push(drop * t - 4 * peak * t * (1 - t))
  }
  return { x, y }
}

export interface Gait {
  times: number[]
  y: number[]
  rotate: number[]
}

const GAIT_TIMES = [0, 0.25, 0.5, 0.75, 1]
const GAIT_Y = [0, -14, 0, -9, 0]
const GAIT_ROT = [0, -2.5, 0, 1.5, 0]

/** One looping gallop bob: two uneven lifts per stride, with a matching rock. */
export function gaitKeyframes(amp: number): Gait {
  return {
    times: GAIT_TIMES,
    y: GAIT_Y.map((v) => (v === 0 ? 0 : v * amp)),
    rotate: GAIT_ROT.map((v) => (v === 0 ? 0 : v * amp)),
  }
}

export interface Char {
  char: string
  /** index among visible characters, -1 for a space */
  i: number
  isSpace: boolean
}

export function splitChars(text: string): Char[] {
  let visible = 0
  return Array.from(text).map((char) => {
    const isSpace = char === " "
    return { char, isSpace, i: isSpace ? -1 : visible++ }
  })
}

/** seconds: base + per-character step (ms) */
export function charDelay(i: number, stepMs: number, baseSec: number): number {
  return Math.max(0, i) * (stepMs / 1000) + baseSec
}

export interface Stat {
  prefix: string
  n: number
  suffix: string
  decimals: number
}

const STAT_RE = /^([+-]?)(\d+(?:\.(\d+))?)(.*)$/

export function parseStat(value: string): Stat | null {
  const m = STAT_RE.exec(value.trim())
  if (!m) return null
  return { prefix: m[1], n: Number(m[2]), suffix: m[4], decimals: m[3]?.length ?? 0 }
}

export function formatStat(s: Stat, v: number): string {
  return `${s.prefix}${v.toFixed(s.decimals)}${s.suffix}`
}

export interface Ghost {
  /** seconds behind the ball */
  lag: number
  opacity: number
}

const GHOST_LAG_SEC = 0.045
const GHOST_OPACITY = 0.5

/** Afterimages that follow the ball: nearest is brightest. */
export function trailGhosts(count: number): Ghost[] {
  return Array.from({ length: Math.max(0, count) }, (_, i) => ({
    lag: (i + 1) * GHOST_LAG_SEC,
    opacity: GHOST_OPACITY * (1 - i / count),
  }))
}

/** A closed, lazy figure-of-eight wander for a firefly, as keyframes. Stays inside `radius`. */
export function drift(seed: number, radius: number, steps = 8): Arc {
  const n = Math.max(3, Math.round(steps))
  const x: number[] = []
  const y: number[] = []
  for (let i = 0; i <= n; i++) {
    const a = ((i % n) / n) * Math.PI * 2
    x.push(radius * 0.9 * Math.sin(a + seed))
    y.push(radius * 0.6 * Math.sin(2 * a + seed * 1.7))
  }
  return { x, y }
}
