// Career stations, taken from the facts already on the live site (the CV
// in journey-stations.ts of web/). Months are YYYY-MM so gaps can be
// measured. Nothing here is new: dates, places and CGPA match the CV.

export interface Station {
  start: string
  end: string
  period: string
  title: string
  place: string
  metric: string
  note: string
  era: "Foundations" | "Engineering" | "Analytics"
}

export interface Gap {
  from: string
  to: string
  label: string
}

export const STATIONS: readonly Station[] = [
  {
    start: "2008-01", end: "2016-12", period: "2008 to 2016", era: "Foundations",
    title: "Secondary (WBBSE)", place: "Bankura Zilla School", metric: "93.85%",
    note: "Bankura, West Bengal.",
  },
  {
    start: "2016-01", end: "2018-12", period: "2016 to 2018", era: "Foundations",
    title: "Higher Secondary, Science", place: "Bankura Banga Vidyalaya", metric: "90.00%",
    note: "Physics, chemistry, maths.",
  },
  {
    start: "2019-01", end: "2023-12", period: "2019 to 2023", era: "Engineering",
    title: "B.E. Chemical Engineering", place: "Jadavpur University", metric: "8.32 CGPA",
    note: "Mass balances, process optimization, DoE.",
  },
  {
    start: "2023-07", end: "2023-12", period: "Jul to Dec 2023", era: "Engineering",
    title: "Business Intelligence Intern", place: "Celebal Technologies, Jaipur", metric: "6 months",
    note: "Power BI P&L, 300+ DAX, star schema.",
  },
  {
    start: "2025-01", end: "2027-12", period: "2025 to 2027", era: "Analytics",
    title: "PGDM, Big Data Analytics", place: "Goa Institute of Management", metric: "5.23 CGPA",
    note: "Minor: IT and Ops. In progress.",
  },
  {
    start: "2026-03", end: "2026-08", period: "Mar to Aug 2026", era: "Analytics",
    title: "Data Science Intern", place: "InfoLeap Research, remote from Bankura", metric: "6 months",
    note: "Streamlit MIS, GenAI survey pipelines.",
  },
]

/** "2024-01" becomes a month number, so two dates subtract cleanly. */
export function monthIndex(ym: string): number {
  const [y, m] = ym.split("-").map(Number)
  return y * 12 + (m - 1)
}

function fromIndex(idx: number): string {
  const y = Math.floor(idx / 12)
  const m = (idx % 12) + 1
  return `${y}-${String(m).padStart(2, "0")}`
}

/**
 * Months with no station between the end of one and the start of the next.
 * These are shown as gaps, never filled in: the site does not invent a story.
 */
export function findGaps(stations: readonly Station[]): Gap[] {
  const sorted = [...stations].sort((a, b) => monthIndex(a.start) - monthIndex(b.start))
  const gaps: Gap[] = []
  let covered = -Infinity
  for (const s of sorted) {
    const start = monthIndex(s.start)
    if (covered !== -Infinity && start > covered + 1) {
      const from = fromIndex(covered + 1)
      const to = fromIndex(start - 1)
      gaps.push({
        from,
        to,
        label: "Not on record yet. Tuhin to fill this stretch.",
      })
    }
    covered = Math.max(covered, monthIndex(s.end))
  }
  return gaps
}
