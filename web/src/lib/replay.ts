export type Entry = { hash: string; date: string; files: number; added: number; removed: number; subject: string }
export type Kind = "feat" | "fix" | "docs" | "test" | "perf" | "chore" | "other"
export type Block = { height: number; kind: Kind }
export type Frame = { done: Entry[]; typing: string; finished: boolean }

export const TYPE_MS = 18
export const HOLD_MS = 260
/** pacing pad: extra keystrokes of dwell per line */
const PREFIX = 12

/** Line format: hash|iso-date|files|added|removed|subject (subject last so it may contain pipes). */
export function parseLog(raw: string): Entry[] {
  return raw
    .split("\n")
    .map((l) => l.split("|"))
    .filter((p) => p.length >= 6 && /^\d{4}-\d{2}-\d{2}/.test(p[1]))
    .map((p) => ({
      hash: p[0],
      date: p[1].slice(0, 10),
      files: Number(p[2]) || 0,
      added: Number(p[3]) || 0,
      removed: Number(p[4]) || 0,
      subject: p.slice(5).join("|").trim(),
    }))
}

const KINDS: Kind[] = ["feat", "fix", "docs", "test", "perf", "chore"]

export function kindOf(subject: string): Kind {
  const type = /^(\w+)[(:!]/.exec(subject)?.[1]
  return type && (KINDS as string[]).includes(type) ? (type as Kind) : "other"
}

const MIN_H = 8
const MAX_H = 100

/** Skyline block for a commit: height grows with the log of lines touched. */
export function blockOf(e: Entry): Block {
  const lines = e.added + e.removed
  const height = Math.min(MAX_H, Math.max(MIN_H, Math.round(Math.log10(lines + 1) * 21)))
  return { height, kind: kindOf(e.subject) }
}

export const entryText = (e: Entry) => `${e.hash} ${e.subject}`
const lineMs = (e: Entry) => (e.subject.length + PREFIX) * TYPE_MS + HOLD_MS

/** Pure frame for elapsed time t: which lines are done and what is mid-typing. */
export function frameAt(entries: Entry[], t: number): Frame {
  let left = t
  const done: Entry[] = []
  for (const e of entries) {
    const ms = lineMs(e)
    if (left >= ms) {
      done.push(e)
      left -= ms
      continue
    }
    const chars = Math.min(Math.floor(left / TYPE_MS), e.subject.length + PREFIX)
    return { done, typing: entryText(e).slice(0, chars), finished: false }
  }
  return { done, typing: "", finished: true }
}
