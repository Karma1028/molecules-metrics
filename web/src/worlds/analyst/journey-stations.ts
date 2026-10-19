// Every date, institution, CGPA and role below is taken verbatim from the
// real CV (public/Tuhin_Bhattacharya_Resume.pdf). Coordinates are the real
// cities; InfoLeap was remote, worked from home in Bankura (confirmed by Tuhin).

export type Accent = "pen" | "teal" | "orange"

export interface Station {
  icon: string
  period: string
  title: string
  place: string
  metric: string
  note: string
  era: string
  accent: Accent
  pin: number
}

export interface Pin {
  label: string
  at: { lat: number; lon: number }
  /** where the name sits so close pins (Bankura / Kolkata) never collide */
  side: "left" | "right" | "below"
}

export const PINS: readonly Pin[] = [
  { label: "Bankura", at: { lat: 23.23, lon: 87.07 }, side: "left" },
  { label: "Kolkata", at: { lat: 22.5, lon: 88.37 }, side: "below" },
  { label: "Jaipur", at: { lat: 26.91, lon: 75.79 }, side: "right" },
  { label: "Goa", at: { lat: 15.49, lon: 73.83 }, side: "right" },
]

export const CAMERA_ZOOM = 1.35

export const STATIONS: readonly Station[] = [
  {
    icon: "i-award", period: "2008 to 2016", title: "Secondary (WBBSE)",
    place: "Bankura Zilla School", metric: "93.85%", note: "Bankura, West Bengal.",
    era: "Foundations", accent: "pen", pin: 0,
  },
  {
    icon: "i-award", period: "2016 to 2018", title: "Higher Secondary, Science",
    place: "Bankura Banga Vidyalaya", metric: "90.00%", note: "Physics, chemistry, maths.",
    era: "Foundations", accent: "pen", pin: 0,
  },
  {
    icon: "i-flask", period: "2019 to 2023", title: "B.E. Chemical Engineering",
    place: "Jadavpur University", metric: "8.32 CGPA", note: "Mass balances, process optimization, DoE.",
    era: "Engineering", accent: "teal", pin: 1,
  },
  {
    icon: "i-chart", period: "Jul to Dec 2023", title: "Business Intelligence Intern",
    place: "Celebal Technologies · Jaipur", metric: "6 months", note: "Power BI P&L, 300+ DAX, star schema.",
    era: "Engineering", accent: "teal", pin: 2,
  },
  {
    icon: "i-database", period: "2025 to 2027", title: "PGDM, Big Data Analytics",
    place: "Goa Institute of Management", metric: "5.23 CGPA", note: "Minor: IT & Ops. In progress.",
    era: "Analytics", accent: "orange", pin: 3,
  },
  {
    icon: "i-route", period: "Mar to Aug 2026", title: "Data Science Intern",
    place: "InfoLeap Research · Remote, from Bankura", metric: "6 months", note: "Streamlit MIS, GenAI survey pipelines.",
    era: "Analytics", accent: "orange", pin: 0,
  },
]

// Plot frame: an equirectangular slice of India, 72 to 90°E × 14.5 to 27.5°N.
export const MAP = { w: 600, h: 440, pad: { x: 46, y: 34 }, lon: [72, 90], lat: [14.5, 27.5] } as const

export function project(pin: Pin): [number, number] {
  const { w, h, pad, lon, lat } = MAP
  const x = pad.x + ((pin.at.lon - lon[0]) / (lon[1] - lon[0])) * (w - pad.x * 2)
  const y = pad.y + ((lat[1] - pin.at.lat) / (lat[1] - lat[0])) * (h - pad.y * 2)
  return [Math.round(x), Math.round(y)]
}

/** Graticule ticks every 3 degrees, labelled like an instrument plot. */
export function graticule() {
  const { w, h, pad, lon, lat } = MAP
  const lons: Array<{ x: number; label: string }> = []
  const lats: Array<{ y: number; label: string }> = []
  for (let d = 72; d <= lon[1]; d += 3) {
    lons.push({ x: pad.x + ((d - lon[0]) / (lon[1] - lon[0])) * (w - pad.x * 2), label: `${d}°E` })
  }
  for (let d = 15; d <= lat[1]; d += 3) {
    lats.push({ y: pad.y + ((lat[1] - d) / (lat[1] - lat[0])) * (h - pad.y * 2), label: `${d}°N` })
  }
  return { lons, lats }
}

/** Chronological route through the pins, with gentle arcs between hops. */
export function routePath(): { travel: string; signal: string } {
  const pts = PINS.map(project)
  const arc = (a: readonly [number, number], b: readonly [number, number], bend: number) => {
    const mx = (a[0] + b[0]) / 2
    const my = (a[1] + b[1]) / 2
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    // control point pushed off the chord, perpendicular, so hops read as flights
    return `Q ${Math.round(mx - dy * bend)} ${Math.round(my + dx * bend)} ${b[0]} ${b[1]}`
  }
  const [bk, kol, jai, goa] = pts
  const travel = `M ${bk[0]} ${bk[1]} ${arc(bk, kol, 0.35)} ${arc(kol, jai, -0.18)} ${arc(jai, goa, 0.22)}`
  // the remote internship: a dashed line from Goa back home to Bankura
  const signal = `M ${goa[0]} ${goa[1]} ${arc(goa, bk, 0.16)}`
  return { travel, signal }
}

/** The camera as a viewBox: zoom into a pin, pulled toward centre, never past the plot edge. */
export function cameraBox(xy: readonly [number, number] | null, zoom = CAMERA_ZOOM): string {
  if (!xy) return `0 0 ${MAP.w} ${MAP.h}`
  const vw = MAP.w / zoom
  const vh = MAP.h / zoom
  const clamp = (v: number, hi: number) => Math.min(hi, Math.max(0, v))
  const x = clamp(xy[0] - vw / 2, MAP.w - vw)
  const y = clamp(xy[1] - vh / 2, MAP.h - vh)
  return `${Math.round(x)} ${Math.round(y)} ${Math.round(vw)} ${Math.round(vh)}`
}
