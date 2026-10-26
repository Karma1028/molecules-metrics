import type { FrameExif } from "./gallery-meta"

export type ScatterPoint = { x: number; y: number; s: number } | { missing: true }

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

export function parseShutter(v?: string): number | null {
  if (!v) return null
  const frac = /^1\/(\d+)s\+?$/.exec(v)
  if (frac) return 1 / Number(frac[1])
  const sec = /^(\d+(?:\.\d+)?)s$/.exec(v)
  return sec ? Number(sec[1]) : null
}

export function parseIso(v?: string): number | null {
  const m = v ? /(\d+)/.exec(v) : null
  return m ? Number(m[1]) : null
}

export function parseDate(v?: string): number | null {
  const m = v ? /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(v) : null
  if (!m) return null
  const mon = MONTHS.indexOf(m[2].toLowerCase())
  return mon < 0 ? null : Date.UTC(Number(m[3]), mon, Number(m[1]))
}

const norm = (v: number, lo: number, hi: number) => (hi === lo ? 0.5 : (v - lo) / (hi - lo))

/** x = capture date, y = shutter speed on a log scale (fast on top, y=0 is the top edge), s = ISO (log). Frames lacking any field are marked missing, never guessed. */
export function scatterPoints(exifs: FrameExif[]): ScatterPoint[] {
  const raw = exifs.map((e) => {
    const t = parseDate(e.date)
    const sh = parseShutter(e.shutter)
    const iso = parseIso(e.iso)
    return t == null || sh == null || iso == null ? null : { t, ls: Math.log(sh), li: Math.log(iso) }
  })
  const ok = raw.filter((r): r is NonNullable<typeof r> => r !== null)
  const range = (pick: (r: (typeof ok)[number]) => number) => [Math.min(...ok.map(pick)), Math.max(...ok.map(pick))] as const
  const [t0, t1] = range((r) => r.t)
  const [s0, s1] = range((r) => r.ls)
  const [i0, i1] = range((r) => r.li)
  return raw.map((r) =>
    r === null
      ? { missing: true as const }
      : { x: norm(r.t, t0, t1), y: norm(r.ls, s0, s1), s: norm(r.li, i0, i1) },
  )
}
