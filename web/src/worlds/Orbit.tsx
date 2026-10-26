import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { PLANETS, angleAt, periodFor, positionOf, visitCounts } from "../lib/orbit"
import { getThread } from "../lib/route-thread"

/** Every page is a planet. Pages you opened this session orbit faster. Hover to pause one, click to land. */
export default function Orbit() {
  const navigate = useNavigate()
  const counts = useMemo(() => visitCounts(getThread()), [])
  const nodes = useRef<(SVGGElement | null)[]>([])
  const angles = useRef(PLANETS.map((p) => p.phase))
  const hover = useRef(-1)
  const [label, setLabel] = useState("")

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let prev = performance.now()
    const draw = () => {
      PLANETS.forEach((pl, i) => {
        const { x, y } = positionOf(pl.ring, angles.current[i])
        nodes.current[i]?.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`)
      })
    }
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      PLANETS.forEach((pl, i) => {
        if (i === hover.current) return
        angles.current[i] = angleAt(angles.current[i], dt, periodFor(counts[pl.to] ?? 0))
      })
      draw()
      raf = requestAnimationFrame(tick)
    }
    draw()
    if (!reduce) raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [counts])

  return (
    <main className="ob">
      <header>
        <Link to="/">back to the cover</Link>
        <span>{label || "hover a planet"}</span>
      </header>
      <svg viewBox="0 0 100 100" role="group" aria-label="Site map as a solar system">
        {[24, 40].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} className="ring" />
        ))}
        <circle cx="50" cy="50" r="5" className="sun" />
        <text x="50" y="50.8" className="sun-t">TB</text>
        {PLANETS.map((pl, i) => {
          const visits = counts[pl.to] ?? 0
          return (
            <g
              key={pl.to}
              ref={(el) => {
                nodes.current[i] = el
              }}
              className={`planet r${pl.ring}`}
              tabIndex={0}
              role="link"
              aria-label={`${pl.label}${visits ? `, opened ${visits} time${visits > 1 ? "s" : ""} this session` : ""}`}
              onPointerEnter={() => {
                hover.current = i
                setLabel(`${pl.label}${visits ? ` · visited ${visits}x, orbits faster` : ""}`)
              }}
              onPointerLeave={() => {
                hover.current = -1
                setLabel("")
              }}
              onFocus={() => setLabel(pl.label)}
              onClick={() => navigate(pl.to)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate(pl.to)
              }}
            >
              <circle r={visits ? 3.1 : 2.4} />
              <text y="-4">{pl.label}</text>
            </g>
          )
        })}
      </svg>
      <p className="note">Inner ring: the Artist. Outer ring: the Analyst. Pages you have opened this session spin faster.</p>
      <style>{`
        .ob{min-height:100vh;box-sizing:border-box;padding:3vh 4vw;background:#0b1020;color:#cfd6ee;font:600 12px/1.4 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:1vh;overflow:hidden}
        .ob header{width:min(92vw,76vh);display:flex;justify-content:space-between;gap:12px}
        .ob a{color:inherit}
        .ob svg{width:min(92vw,76vh);height:min(92vw,76vh);flex:none}
        .ob .ring{fill:none;stroke:#2a3560;stroke-width:.2;stroke-dasharray:1 1.2}
        .ob .sun{fill:#ffb27a}
        .ob .sun-t{fill:#3a1a08;font-size:3px;text-anchor:middle;font-weight:700}
        .ob .planet{cursor:pointer;outline:none}
        .ob .planet circle{fill:#7db7e8;stroke:#0b1020;stroke-width:.4;transition:r .2s}
        .ob .planet.r0 circle{fill:#e8946a}
        .ob .planet text{fill:#cfd6ee;font-size:2.2px;text-anchor:middle;pointer-events:none}
        .ob .planet:hover circle,.ob .planet:focus-visible circle{stroke:#fff;stroke-width:.6}
        .ob .note{margin:0;opacity:.6;text-align:center}
      `}</style>
    </main>
  )
}
