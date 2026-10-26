import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ZONES, kickVelocity, nearestZone, stepBall, zoneAt, type Ball, type Pt, type Zone } from "../lib/kickoff"

const CLOCK_S = 45
const GOAL_PAUSE_MS = 900
const START: Ball = { x: 0.5, y: 0.5, vx: 0, vy: 0 }

/** Navigation as a match: slingshot the ball into a goal to go there. Full time sends you to the nearest goal. */
export default function Kickoff() {
  const navigate = useNavigate()
  const pitch = useRef<HTMLDivElement>(null)
  const ballEl = useRef<HTMLButtonElement>(null)
  const aim = useRef<SVGLineElement>(null)
  const ball = useRef<Ball>({ ...START })
  const drag = useRef<Pt | null>(null)
  const [left, setLeft] = useState(CLOCK_S)
  const [call, setCall] = useState<string | null>(null)
  const done = useRef(false)

  const place = () => {
    const el = ballEl.current
    if (!el) return
    el.style.left = `${ball.current.x * 100}%`
    el.style.top = `${ball.current.y * 100}%`
  }

  const score = (z: Zone, text: string) => {
    if (done.current) return
    done.current = true
    setCall(text)
    window.setTimeout(() => navigate(z.to), GOAL_PAUSE_MS)
  }

  // physics loop
  useEffect(() => {
    let raf = 0
    let prev = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      if (!done.current && (ball.current.vx || ball.current.vy)) {
        ball.current = stepBall(ball.current, dt)
        place()
        const z = zoneAt(ball.current)
        if (z) score(z, `GOAL! ${z.label}`)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // match clock
  useEffect(() => {
    const id = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          const z = nearestZone(ball.current)
          score(z, `Full time. ${z.label} it is.`)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toPitch = (e: React.PointerEvent): Pt => {
    const r = pitch.current!.getBoundingClientRect()
    return { x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)) }
  }
  const drawAim = (pull: Pt | null) => {
    const l = aim.current
    if (!l) return
    if (!pull) return l.setAttribute("opacity", "0")
    const b = ball.current
    l.setAttribute("x1", String(b.x * 100))
    l.setAttribute("y1", String(b.y * 100))
    l.setAttribute("x2", String((b.x + (b.x - pull.x)) * 100))
    l.setAttribute("y2", String((b.y + (b.y - pull.y)) * 100))
    l.setAttribute("opacity", "1")
  }

  return (
    <main className="ko">
      <header>
        <Link to="/" className="tap">leave the pitch</Link>
        <b aria-live="off">{String(left).padStart(2, "0")}s</b>
      </header>
      <p className="hint">Pull the ball back, let go. Score in a goal to go there.</p>
      <div
        ref={pitch}
        className="pitch"
        onPointerMove={(e) => {
          if (!drag.current) return
          drag.current = toPitch(e)
          drawAim(drag.current)
        }}
        onPointerUp={() => {
          if (!drag.current) return
          const v = kickVelocity(ball.current, drag.current)
          ball.current = { ...ball.current, ...v }
          drag.current = null
          drawAim(null)
        }}
      >
        <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="99" height="99" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <circle cx="50" cy="50" r="9" />
          <line ref={aim} x1="0" y1="0" x2="0" y2="0" opacity="0" className="aim" />
        </svg>
        {ZONES.map((z) => (
          <Link key={z.to} to={z.to} className="goal" style={{ left: `${z.x * 100}%`, top: `${z.y * 100}%` }}>
            {z.label}
          </Link>
        ))}
        <button
          ref={ballEl}
          type="button"
          className="ball"
          aria-label="Ball: drag back and release to kick. Or use the goal links to navigate."
          style={{ left: "50%", top: "50%" }}
          onPointerDown={(e) => {
            if (done.current) return
            e.currentTarget.setPointerCapture(e.pointerId)
            ball.current = { ...ball.current, vx: 0, vy: 0 }
            drag.current = toPitch(e)
          }}
        />
        {call && <div className="call" role="status">{call}</div>}
      </div>
      <style>{`
        .ko{min-height:100vh;box-sizing:border-box;padding:3vh 4vw;background:#10331f;color:#e9f5ec;font:600 12px/1.4 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:1.2vh;overflow:hidden}
        .ko header{width:min(92vw,calc(78vh*1.6));display:flex;justify-content:space-between}
        .ko a{color:inherit}
        .ko .hint{margin:0;opacity:.7}
        .ko .pitch{position:relative;width:min(92vw,calc(78vh*1.6));aspect-ratio:1.6;background:repeating-linear-gradient(90deg,#17492c 0 8%,#1b5434 8% 16%);touch-action:none;user-select:none}
        .ko .lines{position:absolute;inset:0;width:100%;height:100%;fill:none;stroke:rgba(255,255,255,.55);stroke-width:.4;vector-effect:non-scaling-stroke}
        .ko .aim{stroke:#ffb27a;stroke-width:.8;stroke-dasharray:2 2}
        .ko .goal{position:absolute;translate:-50% -50%;width:11%;aspect-ratio:1;border-radius:50%;border:2px dashed rgba(255,255,255,.7);display:grid;place-items:center;text-align:center;font-size:clamp(8px,1.1vw,12px);text-decoration:none}
        .ko .goal:hover,.ko .goal:focus-visible{background:rgba(255,255,255,.15);outline:none}
        .ko .ball{position:absolute;translate:-50% -50%;width:3.4%;aspect-ratio:1;border-radius:50%;border:0;padding:0;cursor:grab;touch-action:none;
          background:radial-gradient(circle at 35% 30%,#ffb27a,#c2562a 55%,#a63f12);box-shadow:0 4px 10px -3px rgba(0,0,0,.6)}
        .ko .call{position:absolute;inset:0;display:grid;place-items:center;font-size:clamp(20px,4vw,40px);background:rgba(0,0,0,.35);pointer-events:none}
      `}</style>
    </main>
  )
}
