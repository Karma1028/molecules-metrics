import { useMemo } from "react"
import { buildMorph, type SeasonPoint } from "../lib/morph"
import type { Mode } from "../lib/mode"

// The signature moment. Six seasons start as pass dots on a pitch (day) and
// move, with a CSS transform only, into goal bars with an xG tick (night).
// Every element sits at the origin and is placed by transform, so the morph
// animates transform and opacity and nothing that triggers layout.

const BOX = { w: 600, h: 360, pad: 56, base: 300 }

export function Morph({ seasons, mode }: { seasons: readonly SeasonPoint[]; mode: Mode }) {
  const frames = useMemo(() => buildMorph(seasons, BOX), [seasons])
  const night = mode === "night"
  const route = frames.map((f, i) => `${i === 0 ? "M" : "L"} ${f.pass.x} ${f.pass.y}`).join(" ")
  const maxGoals = Math.max(0, ...seasons.map((s) => s.goals))

  return (
    <figure className="morph">
      <svg
        viewBox={`0 0 ${BOX.w} ${BOX.h}`}
        role="img"
        aria-label={
          night
            ? "Bar chart: goals per Barcelona season, with xG ticks, 2020-21 to 2025-26"
            : "Pitch: six Barcelona seasons drawn as a pass chain, 2020-21 to 2025-26"
        }
      >
        <g className="pitch" style={{ opacity: night ? 0 : 1 }}>
          <rect x="8" y="8" width="584" height="344" rx="6" />
          <line x1="300" y1="8" x2="300" y2="352" />
          <circle cx="300" cy="180" r="46" />
          <path className="route" d={route} />
        </g>
        <line className="axis" x1={BOX.pad - 20} x2={BOX.w - BOX.pad + 20} y1={BOX.base} y2={BOX.base} style={{ opacity: night ? 1 : 0 }} />
        {frames.map((f, i) => {
          const delay = `${i * 70}ms`
          const barT = night
            ? `translate(${f.bar.x}px, ${f.bar.top}px) scale(${f.bar.w}, ${f.bar.h})`
            : `translate(${f.bar.x}px, ${BOX.base}px) scale(${f.bar.w}, 0)`
          const dotT = night
            ? `translate(${f.cx}px, ${f.bar.top}px)`
            : `translate(${f.pass.x}px, ${f.pass.y}px)`
          const labelT = night
            ? `translate(${f.cx}px, ${BOX.base + 32}px)`
            : `translate(${f.pass.x}px, ${f.pass.y - 24}px)`
          const tickT = `translate(${f.cx - 18}px, ${f.xgY - 2}px) scale(36, 4)`
          return (
            <g key={f.label}>
              <rect className="bar" width="1" height="1" style={{ transform: barT, transitionDelay: delay }} />
              <rect className="tick" width="1" height="1" style={{ transform: tickT, opacity: night ? 1 : 0, transitionDelay: delay }} />
              <circle className="dot" r="10" style={{ transform: dotT, transitionDelay: delay }} />
              <text className="label" x="0" y="0" textAnchor="middle" style={{ transform: labelT, opacity: 1, transitionDelay: delay }}>
                {f.label}
              </text>
            </g>
          )
        })}
      </svg>
      <table className="sr-only">
        <caption>Barcelona goals and xG by season, source: personal analytics file</caption>
        <thead>
          <tr>
            <th scope="col">Season</th>
            <th scope="col">Goals</th>
            <th scope="col">xG</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((s) => (
            <tr key={s.season}>
              <th scope="row">{s.season}</th>
              <td>{s.goals}</td>
              <td>{s.xG.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="sr-only">Tallest season: {maxGoals} goals.</span>
    </figure>
  )
}
