/** A single timestamped lyric line parsed from an LRC string. */
export interface LrcLine {
  t: number // seconds
  text: string
}

const STAMP = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g

/**
 * Parse an LRCLIB `syncedLyrics` string into sorted, timestamped lines.
 * Handles multi-timestamp lines (`[00:12][01:04]text`) and blank interludes.
 * Returns [] for null/empty/plain-text input.
 */
export function parseLrc(synced: string | null | undefined): LrcLine[] {
  if (!synced) return []
  const out: LrcLine[] = []
  for (const raw of synced.split(/\r?\n/)) {
    STAMP.lastIndex = 0
    const stamps = raw.match(STAMP)
    if (!stamps) continue
    const text = raw.replace(STAMP, "").trim()
    for (const s of stamps) {
      const m = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/.exec(s)
      if (!m) continue
      const frac = m[3] ? Number(`0.${m[3]}`) : 0
      out.push({ t: Number(m[1]) * 60 + Number(m[2]) + frac, text })
    }
  }
  return out.sort((a, b) => a.t - b.t)
}

/**
 * Index of the line that should be highlighted at `time` seconds — the last
 * line whose timestamp has passed. Returns -1 before the first line.
 */
export function activeLine(lines: LrcLine[], time: number): number {
  let idx = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].t <= time) idx = i
    else break
  }
  return idx
}
