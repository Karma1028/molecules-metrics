import type { CSSProperties } from "react"

/* The deck's dial: plays by hour of day around a 24-hour face, with the
   peak hour lit in Spotify green. Plus the live "lately" strip. */

const C = 150 // viewbox centre
const R0 = 62 // inner radius
const RMAX = 122 // longest spoke
const TICK_R = 138

const hh = (h: number) => `${String(h).padStart(2, "0")}:00`
const polar = (h: number, r: number) => {
  const ang = (h / 24) * Math.PI * 2 - Math.PI / 2
  return { x: C + Math.cos(ang) * r, y: C + Math.sin(ang) * r }
}

export function Dial({ byHour, peak, nightShare }: { byHour: number[]; peak: number; nightShare: number }) {
  const max = byHour.reduce((m, v) => Math.max(m, v), 1)
  return (
    <div className="dial">
      <svg className="dial-svg" viewBox="0 0 300 300" role="img" aria-label={`Peak listening around ${hh(peak)} IST`}>
        <circle className="dial-face" cx={C} cy={C} r={RMAX + 26} />
        <circle className="dial-ring" cx={C} cy={C} r={R0} />
        {byHour.map((v, h) => {
          const a = polar(h, R0 + 4)
          const b = polar(h, R0 + 4 + (v / max) * (RMAX - R0 - 4))
          return (
            <line
              key={h}
              className={`dial-spoke${h === peak ? " peak" : ""}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              style={{ "--i": h } as CSSProperties}
            >
              <title>{`${hh(h)} · ${v} plays`}</title>
            </line>
          )
        })}
        {[0, 6, 12, 18].map((h) => {
          const t = polar(h, TICK_R)
          return (
            <text key={h} className="dial-tick" x={t.x} y={t.y}>
              {String(h).padStart(2, "0")}
            </text>
          )
        })}
        <text className="dial-core" x={C} y={C - 5}>{hh(peak)}</text>
        <text className="dial-core-sub" x={C} y={C + 16}>peak hour</text>
      </svg>
      <p className="dial-read">
        most alive around <b>{hh(peak)}</b>, and <b>{Math.round(nightShare * 100)}%</b> of plays land after midnight
      </p>
    </div>
  )
}

export function Lately({ artists }: { artists: { name: string; img?: string | null }[] }) {
  return (
    <div className="lately">
      {artists.slice(0, 8).map((a, i) => (
        <figure className="lt" key={`${a.name}-${i}`} style={{ "--i": i } as CSSProperties}>
          {a.img ? <img src={a.img} alt="" /> : <span className="lt-ph" />}
          <figcaption>{a.name}</figcaption>
        </figure>
      ))}
    </div>
  )
}
