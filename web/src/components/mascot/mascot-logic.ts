/** Pure behaviour for the Bankura horse mascot: where it looks, when it sleeps, what it says. */

export const SLEEP_MS = 45_000
const MAX_TILT_DEG = 18
const TILT_GAIN = 40
const FLATTEN_PX = 120 // keeps a pointer right beside the horse from snapping the head to the limit

export type Mood = "awake" | "asleep"

/** Which way the horse faces and how far its head tips (negative = up) toward a pointer. */
export function lookAt(ox: number, oy: number, px: number, py: number): { facing: 1 | -1; tilt: number } {
  const dx = px - ox
  const dy = py - oy
  const raw = (dy / (Math.abs(dx) + FLATTEN_PX)) * TILT_GAIN
  const tilt = Math.max(-MAX_TILT_DEG, Math.min(MAX_TILT_DEG, raw))
  return { facing: dx < 0 ? -1 : 1, tilt: tilt || 0 }
}

export function moodFor(idleMs: number): Mood {
  return idleMs >= SLEEP_MS ? "asleep" : "awake"
}

/** UI hints only: no claims about the owner. Longest matching route prefix wins. */
const LINES: Array<[prefix: string, lines: string[]]> = [
  ["/artist/gallery", ["Press → to print the next negative.", "Click the big print to open it."]],
  ["/artist/sound", ["Turn the dial. It's a radio.", "Try the hostel rooms."]],
  ["/artist/matchday", ["Visca Barça.", "Numbers first, then feelings."]],
  ["/artist/notes", ["Papers refresh every day.", "Medium posts mirror in on their own."]],
  ["/artist/about", ["Bankura, by way of Goa.", "That's where my kind comes from."]],
  ["/artist/contact", ["Leave a stamp on the sheet.", "Say hi. I'll pretend I didn't read it."]],
  ["/artist", ["Pick a door.", "Hover a card. It's alive."]],
  ["/analyst/dashboard", ["Pick a stat. Watch it run.", "Left and right arrows work too."]],
  ["/analyst/journey", ["Drag the scrubber through time.", "Each station opens a card."]],
  ["/analyst/work", ["Four pipelines, one per row.", "Open a row for the numbers."]],
  ["/analyst/skills", ["Hover a skill to see it work.", "Mass balance to regression."]],
  ["/analyst", ["Point at a line. The dial follows.", "Six subsystems, all online."]],
  ["/", ["Hi. Click me.", "Karma or Tuhin? Both.", "Try /kickoff. Bring boots."]],
]
const DEFAULT_LINES = ["Hi. Click me.", "Neigh."]

export function lineFor(pathname: string, n: number): string {
  const hit = LINES.find(([prefix]) => (prefix === "/" ? pathname === "/" : pathname === prefix || pathname.startsWith(`${prefix}/`)))
  const lines = hit ? hit[1] : DEFAULT_LINES
  return lines[((n % lines.length) + lines.length) % lines.length]
}
