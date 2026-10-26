import type { MouseEvent } from "react"
import { Morph } from "../components/Morph"
import { SOURCE_NOTE, seasonPoints } from "../lib/barca"
import type { Mode } from "../lib/mode"

const SEASONS = seasonPoints()

export function Home({
  go,
  mode,
}: {
  go: (to: string) => (e: MouseEvent<HTMLAnchorElement>) => void
  mode: Mode
}) {
  const night = mode === "night"
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">Karma and Tuhin, one pitch</p>
        <h1 id="hero-title">He watched. Then he counted.</h1>
        <p className="lede">
          Karma is the photography and football side. Tuhin is the data side. Six Barcelona seasons,
          read both ways.
        </p>
        <p className="caption" aria-live="polite">
          {night
            ? "Night, Tuhin: goals as bars, with the xG tick beside each one."
            : "Day, Karma: each season is a pass on the pitch."}
        </p>
        <a className="cta" href="/journey" onClick={go("/journey")}>
          Walk the journey
          <span aria-hidden="true" className="cta-arrow">→</span>
        </a>
      </div>
      <div className="hero-visual">
        <Morph seasons={SEASONS} mode={mode} />
        <p className="source">{SOURCE_NOTE}</p>
      </div>
    </section>
  )
}
