import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { velocityFrom, type Sample } from "../lib/flick"
import { shoot, type PenaltyResult } from "../lib/penalty"

const MESSAGES: Record<PenaltyResult, string> = {
  goal: "GOAL. Taking you home.",
  saved: "Saved by the horse. Try again.",
  wide: "Wide. Try again.",
  weak: "Needs a harder flick.",
}
const HOME_DELAY_MS = 1400
const KEEPER_MIN = 0.1
const KEEPER_SPAN = 0.8

const CSS = String.raw`
  .nf{min-height:100vh;display:grid;grid-template-rows:auto 1fr auto;justify-items:center;gap:12px;padding:28px 16px;background:var(--paper,#f4ead8);color:var(--ink,#2a1d14);text-align:center}
  .nf h1{margin:0;font:900 clamp(40px,9vw,96px)/.9 var(--font-display,Georgia,serif);letter-spacing:-.03em}
  .nf .sub{font:600 11px/1.5 var(--font-mono,monospace);letter-spacing:.16em;text-transform:uppercase;color:var(--muted,#8a7a66)}
  .nf .pitch{position:relative;width:min(560px,92vw);height:min(52vh,420px);touch-action:none}
  .nf .goal{position:absolute;left:12%;right:12%;top:0;height:30%;border:4px solid currentColor;border-bottom:0;border-radius:6px 6px 0 0;
    background:repeating-linear-gradient(45deg,transparent 0 8px,color-mix(in srgb,currentColor 14%,transparent) 8px 9px)}
  .nf .keeper{position:absolute;top:6%;width:56px;height:56px;margin-left:-28px;object-fit:contain;transition:left .35s cubic-bezier(.19,1,.22,1)}
  .nf .spot{position:absolute;left:50%;bottom:6%;width:10px;height:10px;margin:0 0 0 -5px;border-radius:50%;background:currentColor;opacity:.3}
  .nf .ball{position:absolute;left:50%;bottom:6%;width:26px;height:26px;margin:-8px 0 0 -13px;border:0;border-radius:50%;padding:0;cursor:grab;
    background:radial-gradient(circle at 35% 30%,#ffb27a,var(--orange,#c2562a) 55%,#a63f12);box-shadow:0 4px 10px -3px rgba(0,0,0,.5);touch-action:none}
  .nf .ball:focus-visible,.nf button.take:focus-visible,.nf a:focus-visible{outline:2px solid var(--accent,#c2562a);outline-offset:3px}
  .nf .msg{min-height:1.4em;font:700 14px/1.4 var(--font-mono,monospace);letter-spacing:.08em;text-transform:uppercase;color:var(--accent,#c2562a)}
  .nf .row{display:flex;gap:14px;align-items:center;justify-content:center;flex-wrap:wrap;font:600 11px/1 var(--font-mono,monospace);letter-spacing:.14em;text-transform:uppercase}
  .nf a{color:var(--accent,#c2562a)}
  .nf button.take{cursor:pointer;background:none;border:1px solid currentColor;border-radius:999px;padding:8px 14px;color:inherit;font:inherit;letter-spacing:inherit;text-transform:inherit}
  @media(prefers-reduced-motion:reduce){.nf .keeper{transition:none}}
`

/** A missing page becomes a penalty: flick the ball at the goal. A keyboard shot is one button away. */
export default function NotFound() {
  const navigate = useNavigate()
  const pitch = useRef<HTMLDivElement>(null)
  const goalRef = useRef<HTMLDivElement>(null)
  const ball = useRef<HTMLButtonElement>(null)
  const samples = useRef<Sample[]>([])
  const down = useRef<{ x: number; y: number } | null>(null)
  const [keeper, setKeeper] = useState(0.5)
  const [msg, setMsg] = useState("This page is not here. Score a penalty to go home.")
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const resolve = (from: { x: number; y: number }, v: { vx: number; vy: number }) => {
    const goal = goalRef.current?.getBoundingClientRect()
    if (!goal) return
    const kx = KEEPER_MIN + Math.random() * KEEPER_SPAN
    setKeeper(kx)
    const keeperX = goal.left + goal.width * kx
    const result = shoot(from, v, goal, keeperX)
    setMsg(MESSAGES[result])
    if (result === "goal") timer.current = window.setTimeout(() => navigate("/", { replace: true }), HOME_DELAY_MS)
  }

  const onUp = () => {
    if (!down.current) return
    const from = down.current
    down.current = null
    if (ball.current) ball.current.style.translate = "0 0"
    resolve({ x: from.x, y: from.y }, velocityFrom(samples.current))
  }

  const take = () => {
    const goal = goalRef.current?.getBoundingClientRect()
    const b = ball.current?.getBoundingClientRect()
    if (!goal || !b) return
    const aim = goal.left + goal.width * (0.1 + Math.random() * 0.8)
    const from = { x: b.left + b.width / 2, y: b.top + b.height / 2 }
    const t = 300
    resolve(from, { vx: (aim - from.x) / t, vy: (goal.bottom - from.y) / t })
  }

  return (
    <main className="nf" aria-label="Page not found">
      <style>{CSS}</style>
      <div>
        <h1>404</h1>
        <p className="sub">offside. the page you wanted is not here</p>
      </div>
      <div className="pitch" ref={pitch}>
        <div className="goal" ref={goalRef} />
        <img className="keeper" src="/motifs/bankura-horse.webp" alt="" style={{ left: `calc(12% + ${keeper} * 76%)` }} />
        <i className="spot" />
        <button
          ref={ball}
          type="button"
          className="ball"
          aria-label="Ball. Drag and flick it up at the goal."
          onPointerDown={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            down.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
            samples.current = [{ x: e.clientX, y: e.clientY, t: performance.now() }]
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            if (!down.current) return
            samples.current = [...samples.current, { x: e.clientX, y: e.clientY, t: performance.now() }].slice(-12)
            e.currentTarget.style.translate = `${e.clientX - samples.current[0].x}px ${e.clientY - samples.current[0].y}px`
          }}
          onPointerUp={onUp}
          onPointerCancel={() => { down.current = null }}
        />
      </div>
      <div>
        <p className="msg" role="status" aria-live="polite">{msg}</p>
        <div className="row">
          <button type="button" className="take" onClick={take}>Take the shot</button>
          <Link to="/">Skip: go home</Link>
        </div>
      </div>
    </main>
  )
}
