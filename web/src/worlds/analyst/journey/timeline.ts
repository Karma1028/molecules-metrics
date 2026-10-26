// Time maths for the career scrubber. Every number here is derived from the
// period strings and pin coordinates in journey-stations.ts; nothing is added.
import { PINS, STATIONS, type Station } from "../journey-stations"

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

export interface Span {
  /** decimal years, e.g. Jul 2023 -> 2023.5 */
  start: number
  end: number
  /** true when the period names months, so the length reads in months */
  monthly: boolean
}

/** "2008 to 2016" | "Jul to Dec 2023" (a hyphen or dash separator also parses) */
export function parsePeriod(period: string): Span {
  const parts = period.split(/\s*(?:[–-]|\bto\b)\s*/)
  const years = period.match(/\d{4}/g) ?? []
  const month = (s: string) => MONTHS.indexOf(s.trim().slice(0, 3).toLowerCase())
  if (years.length >= 2) return { start: Number(years[0]), end: Number(years[1]), monthly: false }
  const y = Number(years[0] ?? 0)
  const m0 = Math.max(0, month(parts[0] ?? ""))
  const m1 = Math.max(m0, month(parts[1] ?? ""))
  return { start: y + m0 / 12, end: y + (m1 + 1) / 12, monthly: true }
}

export const SPANS: readonly Span[] = STATIONS.map((s) => parsePeriod(s.period))
export const T0 = Math.min(...SPANS.map((s) => s.start))
export const T1 = Math.max(...SPANS.map((s) => s.end))

/** internships sit on their own lane; everything else is study */
export type Lane = "study" | "work"
export const LANES: readonly Lane[] = STATIONS.map((s) => (/intern/i.test(s.title) ? "work" : "study"))

/** The step "live" at time t: the latest-started span covering t, else the latest one already begun. */
export function stationAt(t: number): number {
  let covering = -1
  let begun = 0
  SPANS.forEach((sp, i) => {
    if (sp.start <= t + 1e-6) {
      if (sp.start >= SPANS[begun].start) begun = i
      if (t <= sp.end + 1e-6 && (covering === -1 || sp.start >= SPANS[covering].start)) covering = i
    }
  })
  return covering === -1 ? begun : covering
}

export function lengthLabel(sp: Span): string {
  if (sp.monthly) {
    const m = Math.round((sp.end - sp.start) * 12)
    return `${m} month${m === 1 ? "" : "s"}`
  }
  const y = sp.end - sp.start
  return `${y} yr${y === 1 ? "" : "s"}`
}

export function yearLabel(t: number): string {
  const y = Math.floor(t + 1e-6)
  const m = Math.min(11, Math.floor((t - y) * 12 + 1e-6))
  return `${MONTHS[m][0].toUpperCase()}${MONTHS[m].slice(1)} ${y}`
}

/** great-circle distance between two pins, rounded to 10 km */
function km(a: number, b: number): number {
  const rad = Math.PI / 180
  const p = PINS[a].at
  const q = PINS[b].at
  const h =
    Math.sin(((q.lat - p.lat) * rad) / 2) ** 2 +
    Math.cos(p.lat * rad) * Math.cos(q.lat * rad) * Math.sin(((q.lon - p.lon) * rad) / 2) ** 2
  return Math.round((2 * 6371 * Math.asin(Math.sqrt(h))) / 10) * 10
}

export function coords(pin: number): string {
  const { lat, lon } = PINS[pin].at
  return `${lat.toFixed(1)}°N ${lon.toFixed(1)}°E`
}

/** What is different about step i compared with step i-1. */
export function changesAt(i: number): string[] {
  if (i === 0) return ["Route starts here", `Base: ${PINS[STATIONS[0].pin].label}`]
  const a: Station = STATIONS[i - 1]
  const b: Station = STATIONS[i]
  const out: string[] = []
  if (a.pin !== b.pin) out.push(`${PINS[a.pin].label} to ${PINS[b.pin].label}, ~${km(a.pin, b.pin).toLocaleString("en-IN")} km`)
  else out.push(`Same base: ${PINS[b.pin].label}`)
  if (a.era !== b.era) out.push(`Era: ${a.era} to ${b.era}`)
  if (LANES[i] !== LANES[i - 1]) out.push(`Lane: ${LANES[i - 1]} to ${LANES[i]}`)
  const gap = Math.floor(SPANS[i].start) - Math.floor(SPANS[i - 1].end)
  if (SPANS[i].start < SPANS[i - 1].end) out.push(`Overlaps ${a.title}`)
  else if (gap >= 1) out.push(`${gap} yr${gap === 1 ? "" : "s"} gap`)
  return out
}

/** years spent at each step, for the sparkline */
export const DURATIONS: readonly number[] = SPANS.map((s) => s.end - s.start)
