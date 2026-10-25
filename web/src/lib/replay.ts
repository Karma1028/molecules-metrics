export type Entry = { hash: string; date: string; subject: string }
export type Frame = { done: Entry[]; typing: string; finished: boolean }

export const TYPE_MS = 18
export const HOLD_MS = 260
/** pacing pad: extra keystrokes of dwell per line */
const PREFIX = 12

export function parseLog(raw: string): Entry[] {
  return raw
    .split("\n")
    .map((l) => l.split("|"))
    .filter((p) => p.length >= 3 && /^\d{4}-\d{2}-\d{2}/.test(p[1]))
    .map((p) => ({ hash: p[0], date: p[1].slice(0, 10), subject: p.slice(2).join("|") }))
}

const lineText = (e: Entry) => `${e.hash} ${e.subject}`
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
    return { done, typing: lineText(e).slice(0, chars), finished: false }
  }
  return { done, typing: "", finished: true }
}

export const entryText = lineText
