import type { ReactNode } from "react"
import { BALL_SEAM } from "../../../components/pointer/pointer-shared"

/** viewBox of every panel drawing */
export const ART_W = 200
export const ART_H = 260

export interface Palette {
  ink: string
  terra: string
  paper: string
  pencil: string
}

/**
 * One drawing in two states. "pencil" is the underdrawing that is always on
 * the scroll; "ink" is the finished pat panel (bold outline, flat terracotta
 * and wash fills) that the reveal paints in. Same shapes, so the ink lands
 * exactly on its pencil lines.
 */
export type Tone = "pencil" | "ink"

interface Pen {
  tone: Tone
  c: Palette
}

/** stroke props for a line of weight w (ink) */
const line = ({ tone, c }: Pen, w = 2.2) =>
  tone === "ink"
    ? { stroke: c.ink, strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
    : { stroke: c.pencil, strokeWidth: 0.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeDasharray: "3 2.2" }

type FillKind = "terra" | "wash" | "ink" | "paper"

/** fill props: flat colour in ink, nothing in pencil */
const fill = ({ tone, c }: Pen, k: FillKind) => {
  if (tone === "pencil") return { fill: "none" }
  if (k === "wash") return { fill: c.terra, fillOpacity: 0.3 }
  return { fill: k === "terra" ? c.terra : k === "ink" ? c.ink : c.paper }
}

/** Pat panel border: a double rule and a row of dots, top and bottom. */
function Frame(p: Pen) {
  const dots = Array.from({ length: 11 }, (_, i) => 20 + i * 16)
  return (
    <g>
      {p.tone === "ink" ? <rect x="6" y="6" width="188" height="248" rx="3" fill={p.c.paper} /> : null}
      <rect x="6" y="6" width="188" height="248" rx="3" fill="none" {...line(p, 2.4)} />
      <rect x="12" y="12" width="176" height="236" rx="2" fill="none" {...line(p, 1)} />
      {dots.map((x) => (
        <g key={x}>
          <circle cx={x} cy="21" r="1.7" {...fill(p, "terra")} {...(p.tone === "pencil" ? line(p) : {})} />
          <circle cx={x} cy="239" r="1.7" {...fill(p, "terra")} {...(p.tone === "pencil" ? line(p) : {})} />
        </g>
      ))}
    </g>
  )
}

function Camera(p: Pen) {
  const holes = Array.from({ length: 7 }, (_, i) => 50 + i * 16)
  return (
    <g>
      <g transform="rotate(-6 100 207)">
        <rect x="38" y="196" width="124" height="24" rx="2" {...fill(p, "ink")} {...line(p, 1.6)} />
        {holes.map((x) => <rect key={x} x={x} y="199" width="6" height="4" rx="1" {...fill(p, "paper")} {...(p.tone === "pencil" ? line(p) : {})} />)}
        {holes.map((x) => <rect key={x} x={x} y="213" width="6" height="4" rx="1" {...fill(p, "paper")} {...(p.tone === "pencil" ? line(p) : {})} />)}
      </g>
      <rect x="58" y="76" width="38" height="18" rx="3" {...fill(p, "paper")} {...line(p)} />
      <rect x="128" y="80" width="18" height="12" rx="2" {...fill(p, "ink")} {...line(p)} />
      <rect x="38" y="90" width="124" height="82" rx="9" {...fill(p, "terra")} {...line(p, 2.6)} />
      <path d="M38 112H162" fill="none" {...line(p, 1.2)} />
      <circle cx="100" cy="132" r="31" {...fill(p, "paper")} {...line(p, 2.4)} />
      <circle cx="100" cy="132" r="20" {...fill(p, "ink")} {...line(p)} />
      <circle cx="94" cy="126" r="5" {...fill(p, "wash")} />
      <circle cx="148" cy="102" r="3.5" {...fill(p, "paper")} {...line(p, 1.2)} />
    </g>
  )
}

function Headphones(p: Pen) {
  return (
    <g>
      <circle cx="100" cy="172" r="58" {...fill(p, "ink")} {...line(p)} />
      {[48, 39, 30].map((r) => (
        <circle key={r} cx="100" cy="172" r={r} fill="none"
          {...(p.tone === "ink" ? { stroke: p.c.paper, strokeWidth: 0.8, strokeOpacity: 0.5 } : line(p))} />
      ))}
      <circle cx="100" cy="172" r="15" {...fill(p, "terra")} {...line(p, 1.2)} />
      <circle cx="100" cy="172" r="2.6" {...fill(p, "paper")} />
      <path d="M46 132C46 64 154 64 154 132" fill="none" {...line(p, 7)} />
      <path d="M46 132C46 64 154 64 154 132" fill="none"
        {...(p.tone === "ink" ? { stroke: p.c.terra, strokeWidth: 3 } : { stroke: "none" })} />
      <rect x="32" y="118" width="28" height="48" rx="11" {...fill(p, "terra")} {...line(p, 2.4)} />
      <rect x="140" y="118" width="28" height="48" rx="11" {...fill(p, "terra")} {...line(p, 2.4)} />
      <rect x="56" y="126" width="9" height="32" rx="3.5" {...fill(p, "ink")} {...line(p, 1.2)} />
      <rect x="135" y="126" width="9" height="32" rx="3.5" {...fill(p, "ink")} {...line(p, 1.2)} />
    </g>
  )
}

function Matchday(p: Pen) {
  const scarf = "M26 66C70 86 58 128 100 140S150 178 176 202"
  return (
    <g>
      {p.tone === "ink" ? (
        <>
          <path d={scarf} fill="none" stroke={p.c.terra} strokeWidth="26" strokeLinecap="butt" />
          <path d={scarf} fill="none" stroke={p.c.ink} strokeWidth="26" strokeDasharray="9 11" strokeLinecap="butt" />
        </>
      ) : (
        <path d={scarf} fill="none" {...line(p)} />
      )}
      {[-8, -2, 4, 10].map((d) => (
        <path key={d} d={`M${20 + d * 0.4} ${60 + d}l-8 -6`} fill="none" {...line(p, 1.4)} />
      ))}
      {[-8, -2, 4, 10].map((d) => (
        <path key={`b${d}`} d={`M${178 + d * 0.5} ${196 + d}l6 8`} fill="none" {...line(p, 1.4)} />
      ))}
      <g transform="translate(104 152) scale(4.4)">
        <circle r="9" {...fill(p, "paper")}
          {...(p.tone === "ink" ? { stroke: p.c.ink, strokeWidth: 0.55 } : { stroke: p.c.pencil, strokeWidth: 0.22, strokeDasharray: "0.7 0.5" })} />
        <path d={BALL_SEAM} {...(p.tone === "ink" ? { fill: p.c.ink, stroke: p.c.ink, strokeWidth: 0.45 } : { fill: "none", stroke: p.c.pencil, strokeWidth: 0.22 })}
          strokeLinejoin="round" strokeLinecap="round" />
      </g>
    </g>
  )
}

function Notebook(p: Pen) {
  const rows = [122, 134, 146, 158, 170, 182]
  return (
    <g>
      <path d="M28 90L98 102V216L28 204Z" {...fill(p, "paper")} {...line(p, 2.4)} />
      <path d="M102 102L172 90V204L102 216Z" {...fill(p, "paper")} {...line(p, 2.4)} />
      <path d="M98 102Q100 98 102 102V216Q100 220 98 216" {...fill(p, "terra")} {...line(p, 1.4)} />
      {rows.map((y) => <path key={y} d={`M40 ${y - 6}L88 ${y + 3}`} fill="none" {...line(p, 1)} />)}
      {rows.slice(0, 4).map((y) => <path key={`r${y}`} d={`M112 ${y + 3}L160 ${y - 6}`} fill="none" {...line(p, 1)} />)}
      <g transform="rotate(36 146 150)">
        <rect x="140" y="64" width="11" height="98" rx="3" {...fill(p, "terra")} {...line(p, 2)} />
        <rect x="140" y="64" width="11" height="16" rx="3" {...fill(p, "ink")} {...line(p, 1.4)} />
        <path d="M140 162L145.5 180L151 162Z" {...fill(p, "ink")} {...line(p, 1.4)} />
      </g>
      <circle cx="116" cy="196" r="4" {...fill(p, "ink")} />
    </g>
  )
}

function Portrait(p: Pen) {
  return (
    <g>
      <path d="M50 122C50 56 150 56 150 122V156C142 116 58 116 50 156Z" {...fill(p, "ink")} {...line(p)} />
      <path d="M80 188V206C60 210 42 222 36 242H164C158 222 140 210 120 206V188" {...fill(p, "terra")} {...line(p, 2.4)} />
      <ellipse cx="100" cy="142" rx="42" ry="52" {...fill(p, "wash")} {...line(p, 2.4)} />
      <path d="M58 112C80 88 120 88 142 112C120 102 80 102 58 112Z" {...fill(p, "ink")} {...line(p, 1.6)} />
      <path d="M68 136Q81 124 95 136Q81 143 68 136Z" {...fill(p, "paper")} {...line(p, 1.8)} />
      <path d="M105 136Q119 124 132 136Q119 143 105 136Z" {...fill(p, "paper")} {...line(p, 1.8)} />
      <circle cx="82" cy="135" r="3.6" {...fill(p, "ink")} />
      <circle cx="118" cy="135" r="3.6" {...fill(p, "ink")} />
      <path d="M66 123Q81 112 96 121M104 121Q119 112 134 123" fill="none" {...line(p, 2)} />
      <path d="M100 140L95 163Q100 167 106 163" fill="none" {...line(p, 1.8)} />
      <path d="M88 177Q100 185 112 177Q100 172 88 177Z" {...fill(p, "terra")} {...line(p, 1.6)} />
    </g>
  )
}

function Letter(p: Pen) {
  return (
    <g>
      <path d="M70 112C70 98 128 96 132 112V128H70Z" {...fill(p, "terra")} {...line(p, 2.2)} />
      <path d="M118 112L121 62H137L134 112Z" {...fill(p, "terra")} {...line(p, 2.2)} />
      <path d="M121 62L148 68V80L135 78Z" {...fill(p, "terra")} {...line(p, 2.2)} />
      <path d="M125 62L128 51L132 62" fill="none" {...line(p, 1.8)} />
      <path d="M70 108C57 108 54 122 60 132" fill="none" {...line(p, 2.4)} />
      {[74, 88, 110, 123].map((x) => <rect key={x} x={x} y="128" width="7" height="22" rx="2" {...fill(p, "terra")} {...line(p, 1.8)} />)}
      <path d="M122 84H134M121 94H134M120 104H134" fill="none"
        {...(p.tone === "ink" ? { stroke: p.c.paper, strokeWidth: 1.4 } : line(p))} />
      <circle cx="140" cy="70" r="1.8" {...fill(p, "paper")} />
      <rect x="36" y="150" width="128" height="78" rx="3" {...fill(p, "paper")} {...line(p, 2.4)} />
      <path d="M36 150L100 198L164 150" fill="none" {...line(p, 2)} />
      <circle cx="100" cy="198" r="8" {...fill(p, "terra")} {...line(p, 1.6)} />
    </g>
  )
}

const OBJECTS: ReadonlyArray<(p: Pen) => ReactNode> = [Camera, Headphones, Matchday, Notebook, Portrait, Letter]

/** The full drawing for panel i (0..5) in one tone. */
export function PanelArt({ i, tone, c }: { i: number; tone: Tone; c: Palette }) {
  const Obj = OBJECTS[i]
  const p = { tone, c }
  return (
    <>
      <Frame {...p} />
      {Obj ? <Obj {...p} /> : null}
    </>
  )
}
