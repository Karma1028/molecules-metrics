import { useEffect, useRef } from "react"
import { motionTokens } from "../../lib/motion-tokens"
import { damp, settled } from "../../lib/damp"
import { feetAim, rollDegrees, speedAmount } from "./pointer-math"
import { BALL_SEAM, isTextField, listenAll, pointerMemory, targetOf, translate } from "./pointer-shared"

const P = motionTokens.pointer

/**
 * Artist pointer = the ball he watched. The ink nib is the exact hotspot and
 * never lags (a damped hotspot read as a laggy cursor); the ball is dribbled behind it on inkwell's damp (lambda 0.006/ms), rolls
 * by the distance it travels, throws speed lines when fast, and when you
 * hover a control it is passed to that control's feet (magnet 0.2).
 */
export function InkPointer({ reduced, handoff }: { reduced: boolean; handoff: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const nibRef = useRef<HTMLSpanElement>(null)
  const ballRef = useRef<HTMLSpanElement>(null)
  const spinRef = useRef<SVGSVGElement>(null)
  const linesRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const start = { x: pointerMemory.x, y: pointerMemory.y }
    const mouse = { ...start }
    const nib = { ...start }
    const ball = { ...start }
    let spin = 0
    let target: Element | null = null
    // hovered control's box, measured on hover/scroll/resize, never per frame
    let rect: DOMRect | null = null
    let raf = 0
    let last = 0

    const setTarget = (el: Element | null) => {
      target = el
      rect = el ? el.getBoundingClientRect() : null
      root.dataset.hover = el ? "true" : "false"
    }

    const step = (now: number) => {
      const dt = last ? Math.min(now - last, P.maxDtMs) : P.firstDtMs
      last = now
      // a control that unmounted (route change) must not keep the ball
      if (target && !target.isConnected) setTarget(null)
      const aim = target && rect ? feetAim(rect, mouse, P.magnet, P.ballR, P.ballRest) : mouse
      const k = reduced ? Infinity : 1
      const bx = ball.x
      const by = ball.y
      nib.x = mouse.x
      nib.y = mouse.y
      ball.x = damp(ball.x, aim.x, P.ring * k, dt)
      ball.y = damp(ball.y, aim.y, P.ring * k, dt)
      const dx = ball.x - bx
      const dy = ball.y - by
      spin += reduced ? 0 : rollDegrees(dx, dy, P.ballR)
      const fast = reduced ? 0 : speedAmount(Math.hypot(dx, dy) / dt, P.speedFull)
      if (nibRef.current) nibRef.current.style.transform = translate(nib.x, nib.y)
      if (ballRef.current) ballRef.current.style.transform = translate(ball.x, ball.y)
      if (spinRef.current) spinRef.current.style.transform = `rotate(${spin}deg)`
      const lines = linesRef.current
      if (lines) {
        lines.style.opacity = String(fast)
        lines.style.transform = `rotate(${Math.atan2(dy, dx)}rad) scaleX(${0.4 + fast * 0.6})`
      }
      pointerMemory.x = mouse.x
      pointerMemory.y = mouse.y
      const done = settled([[nib.x, mouse.x], [nib.y, mouse.y], [ball.x, aim.x], [ball.y, aim.y]], P.settleEps)
      raf = done ? 0 : requestAnimationFrame(step)
      if (done) { last = 0; if (lines) lines.style.opacity = "0" }
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(step) }
    const remeasure = () => { if (target) rect = target.getBoundingClientRect(); kick() }

    const release = () => { root.dataset.press = "false" }
    if (pointerMemory.x > 0) { root.dataset.hidden = "false"; kick() }
    return listenAll([
      [window, "pointermove", (e: PointerEvent) => {
        if (e.pointerType !== "mouse" && e.pointerType !== "pen") return
        mouse.x = e.clientX
        mouse.y = e.clientY
        root.dataset.hidden = isTextField(e.target) ? "true" : "false"
        kick()
      }],
      [document, "pointerover", (e: PointerEvent) => { setTarget(targetOf(e.target)); kick() }],
      [window, "pointerdown", () => { root.dataset.press = "true" }],
      [window, "pointerup", release],
      [window, "pointercancel", release],
      // leaving the page or focusing an embedded iframe: no frozen ball at the edge
      [window, "blur", () => { release(); root.dataset.hidden = "true" }],
      [document.documentElement, "pointerleave", () => { root.dataset.hidden = "true" }],
      // content moved under a still pointer (deck travel, resize): re-aim
      [window, "scroll", remeasure, true],
      [window, "resize", remeasure],
    ], () => cancelAnimationFrame(raf))
  }, [reduced])

  return (
    <div ref={rootRef} className="ptr ptr-ink" aria-hidden="true" data-hidden="true" data-handoff={handoff ? "true" : "false"} style={{ ["--handoff" as string]: `${P.handoff}s` }}>
      <span ref={ballRef} className="ptr-pos">
        <span ref={linesRef} className="ptr-lines" />
        <span className="ptr-ball">
          <span className="ptr-ball-sh" />
          <svg ref={spinRef} viewBox="-10 -10 20 20" width="100%" height="100%">
            <circle r="9" className="ptr-ball-skin" />
            <path className="ptr-ball-seam" d={BALL_SEAM} />
          </svg>
        </span>
      </span>
      <span ref={nibRef} className="ptr-pos">
        <span className="ptr-dot" />
      </span>
    </div>
  )
}
