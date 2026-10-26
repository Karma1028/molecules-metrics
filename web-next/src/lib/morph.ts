// Pure geometry for the signature morph: the same six seasons drawn as
// pass dots on a pitch (day) and as goal bars with an xG tick (night).
// Every element in the view is positioned at the origin and moved with a
// CSS transform, so the morph only ever animates transform and opacity.

export interface SeasonPoint {
  season: string
  goals: number
  xG: number
}

export interface MorphBox {
  w: number
  h: number
  /** horizontal inset of the first and last season */
  pad: number
  /** y coordinate of the bar baseline (the touchline in day mode) */
  base: number
}

export interface MorphFrame {
  label: string
  /** pass dot on the pitch (day) */
  pass: { x: number; y: number }
  /** goals bar (night): x is the left edge, top is the y of the bar top */
  bar: { x: number; top: number; w: number; h: number }
  /** centre x of the bar, reused for the xG tick and the dot's night target */
  cx: number
  /** y of the xG tick on the same scale as the bars */
  xgY: number
}

/** "2020-21" becomes "20/21": short enough for six labels on a 390px screen. */
export function seasonLabel(season: string): string {
  const [start, end] = season.split("-")
  return `${start.slice(2)}/${end}`
}

export function buildMorph(seasons: readonly SeasonPoint[], box: MorphBox): MorphFrame[] {
  if (seasons.length === 0) return []
  const n = seasons.length
  const plotH = box.base - box.pad
  const span = box.w - box.pad * 2
  const slot = span / n
  const barW = slot * 0.56
  // one shared scale for goals and xG; floor of 1 keeps all-zero data finite
  const max = Math.max(1, ...seasons.flatMap((s) => [s.goals, s.xG]))
  const scale = plotH / max

  return seasons.map((s, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1)
    const x = box.pad + t * span
    // the pitch arc: dots rise to a peak in the middle, like a pass chain
    const y = box.h * 0.5 - Math.sin(t * Math.PI) * box.h * 0.22
    const h = s.goals * scale
    const cx = box.pad + (i + 0.5) * slot
    return {
      label: seasonLabel(s.season),
      pass: { x, y },
      bar: { x: cx - barW / 2, top: box.base - h, w: barW, h },
      cx,
      xgY: box.base - s.xG * scale,
    }
  })
}
