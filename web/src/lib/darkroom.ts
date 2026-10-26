/** Pure rules for the /darkroom page: how long a print takes to develop, and how it looks along the way. */

export const MIN_DEV_MS = 1200
export const MAX_DEV_MS = 6000
/** Past this progress the print is overdeveloped. */
export const OVER_AT = 1.25
const FOG_AT = 2
const STRETCH = 1000 // real shutter seconds -> develop ms
const UNKNOWN_MS = 2800

export type Grade = "underdeveloped" | "perfect" | "overdeveloped"

/** Develop time for a frame: its real shutter speed, stretched 1000x, within a playable range. */
export function developMs(shutterSeconds: number | null): number {
  if (shutterSeconds == null || !(shutterSeconds > 0)) return UNKNOWN_MS
  return Math.max(MIN_DEV_MS, Math.min(MAX_DEV_MS, shutterSeconds * STRETCH + MIN_DEV_MS))
}

/** 0 = nothing, 1 = the right amount, up to 2 = fogged. */
export function progressAt(elapsedMs: number, devMs: number): number {
  return Math.min(FOG_AT, Math.max(0, elapsedMs / devMs))
}

export function gradeOf(p: number): Grade {
  if (p < 0.8) return "underdeveloped"
  if (p > OVER_AT) return "overdeveloped"
  return "perfect"
}

/** CSS filter values for the print at progress p. */
export function printLook(p: number): { opacity: number; brightness: number; contrast: number } {
  const clear = Math.min(1, p)
  const over = Math.max(0, p - 1)
  return {
    opacity: clear,
    brightness: 1 + over * 1.1,
    contrast: Math.max(0.35, 1.05 - over * 0.7),
  }
}

/* ---- the full process: develop -> stop bath -> fixer -> dry -> lights on ---- */

export type Stage = "develop" | "stop" | "fix" | "dry" | "lights"
export const STAGES: Stage[] = ["develop", "stop", "fix", "dry", "lights"]
export const STAGE_MS = { stop: 1500, fix: 3000, dry: 4000 } as const

export const nextStage = (s: Stage): Stage => STAGES[Math.min(STAGES.length - 1, STAGES.indexOf(s) + 1)]

export const stagePct = (elapsedMs: number, needMs: number): number => Math.min(1, Math.max(0, elapsedMs / needMs))

export type FixOutcome = "stable" | "fogs" | "fades"
const FULL = 0.95

/** Skipping the stop bath lets developer carry on (fogs); a short fix leaves silver that fades. */
export function fixOutcome(stopPct: number, fixPct: number): FixOutcome {
  if (stopPct < FULL) return "fogs"
  if (fixPct < FULL) return "fades"
  return "stable"
}

/** What the print looks like once the lights come on. */
export function finalLook(devProgress: number, outcome: FixOutcome): { opacity: number; brightness: number; contrast: number } {
  const base = printLook(devProgress)
  if (outcome === "fogs") return { ...base, brightness: base.brightness * 0.55, contrast: base.contrast * 0.8 }
  if (outcome === "fades") return { ...base, opacity: base.opacity * 0.55 }
  return base
}
