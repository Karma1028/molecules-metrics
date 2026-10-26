/** Pure rules for the /orbit page: pages are planets, and the pages you visit spin faster. */

export type Planet = { label: string; to: string; ring: 0 | 1; phase: number }

export const BASE_PERIOD_S = 120
const MIN_PERIOD_S = 12
const RINGS = [24, 40] // radii in a 0..100 box
const CENTRE = 50

/** Inner ring: the artist world. Outer ring: the analyst world. */
export const PLANETS: Planet[] = [
  { label: "Gallery", to: "/artist/gallery", ring: 0, phase: 0 },
  { label: "Sound", to: "/artist/sound", ring: 0, phase: 1.05 },
  { label: "Matchday", to: "/artist/matchday", ring: 0, phase: 2.1 },
  { label: "Notes", to: "/artist/notes", ring: 0, phase: 3.15 },
  { label: "About", to: "/artist/about", ring: 0, phase: 4.2 },
  { label: "Contact", to: "/artist/contact", ring: 0, phase: 5.25 },
  { label: "Skills", to: "/analyst/skills", ring: 1, phase: 0.4 },
  { label: "Work", to: "/analyst/work", ring: 1, phase: 1.45 },
  { label: "Journey", to: "/analyst/journey", ring: 1, phase: 2.5 },
  { label: "Dashboard", to: "/analyst/dashboard", ring: 1, phase: 3.55 },
  { label: "Resume", to: "/analyst/resume", ring: 1, phase: 4.6 },
  { label: "Get in touch", to: "/analyst/contact", ring: 1, phase: 5.65 },
]

export function visitCounts(thread: { path: string }[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const s of thread) out[s.path] = (out[s.path] ?? 0) + 1
  return out
}

/** Seconds per turn: slowest when never visited, faster for every visit, never below the floor. */
export function periodFor(visits: number): number {
  return Math.max(MIN_PERIOD_S, BASE_PERIOD_S / (1 + visits * 1.5))
}

export const angleAt = (phase: number, tSeconds: number, period: number): number => phase + (tSeconds / period) * Math.PI * 2

export function positionOf(ring: 0 | 1, angle: number): { x: number; y: number } {
  return { x: CENTRE + Math.cos(angle) * RINGS[ring], y: CENTRE + Math.sin(angle) * RINGS[ring] }
}
