import type { MouseEvent } from "react"
import { ANALYTICS_GENERATED, SOURCE_NOTE } from "../lib/barca"
import { STATIONS, findGaps, monthIndex, type Gap, type Station } from "../lib/journey"

const GAPS = findGaps(STATIONS)

// The chain of passes. Each station is one pass; a gap is drawn as a dashed
// stretch that says it is not on record, never as a filled-in story.
function gapAfter(station: Station): Gap | undefined {
  return GAPS.find((g) => monthIndex(g.from) === monthIndex(station.end) + 1)
}

export function Journey({
  go,
}: {
  go: (to: string) => (e: MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <div className="journey">
      <section className="container j-intro" aria-labelledby="j-title">
        <a className="back" href="/" onClick={go("/")}>Back to the pitch</a>
        <h1 id="j-title">Each station is a pass.</h1>
        <p className="lede">
          From Bankura to Goa, one pass at a time. The stretch in the middle is not on record yet, and
          it stays blank rather than invented.
        </p>
        <img
          className="j-photo"
          src="/img/lake-800w.webp"
          width="800"
          height="450"
          alt="A still lake at dusk, from the photography side of the site"
        />
      </section>

      <section className="container" aria-labelledby="chain-title">
        <h2 id="chain-title">The pass chain</h2>
        <ol className="chain">
          {STATIONS.map((s, i) => {
            const gap = gapAfter(s)
            return (
              <li key={s.title} className="pass-wrap">
                <article className={`pass era-${s.era.toLowerCase()}`}>
                  <p className="pass-no">Pass {String(i + 1).padStart(2, "0")}</p>
                  <p className="pass-period">{s.period}</p>
                  <h3>{s.title}</h3>
                  <p className="pass-place">{s.place}</p>
                  <p className="pass-metric">{s.metric}</p>
                  <p className="pass-note">{s.note}</p>
                </article>
                {gap && (
                  <div className="gap" role="note">
                    <p className="gap-range">
                      {gap.from} to {gap.to}
                    </p>
                    <p>{gap.label}</p>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </section>

      <section className="container diagram-sec" aria-labelledby="flow-title">
        <h2 id="flow-title">How the Barcelona numbers reach this page</h2>
        <ol className="flow" aria-label="Data flow, four steps">
          <li className="flow-col">
            <p className="flow-title">Four sources</p>
            <ul className="flow-sources">
              <li>fbref</li>
              <li>fotmob</li>
              <li>understat</li>
              <li>transfermarkt</li>
            </ul>
          </li>
          <li className="flow-col flow-step">
            <p className="flow-title">Analytics file</p>
            <p className="flow-sub">2020-21 to 2025-26, one row per season</p>
          </li>
          <li className="flow-col flow-step">
            <p className="flow-title">Build-time bake</p>
            <p className="flow-sub">read once, no live call from the page</p>
          </li>
          <li className="flow-col flow-step flow-end">
            <p className="flow-title">Home chart</p>
            <p className="flow-sub">pass dots, then goal bars with xG ticks</p>
          </li>
        </ol>
        <p className="flow-warn">
          Two copies disagree on 2025-26: 91 goals and xG 61.2 in the analytics file, 95 goals and xG 99.7 in the
          last-season file. This page charts the analytics file.
        </p>
        <p className="source">
          {SOURCE_NOTE} Generated {ANALYTICS_GENERATED}. This page charts the analytics file; the
          last-season file is a second copy and is not used in the chart.
        </p>
      </section>

      <footer className="container j-foot">
        <p>Photography, football and data. Built as a concept, not the live site.</p>
      </footer>
    </div>
  )
}
