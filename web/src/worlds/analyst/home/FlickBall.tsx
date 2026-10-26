import { useEffect, useRef, useState } from "react"
import { flickTarget, velocityFrom, type Sample } from "../../../lib/flick"

const TRAVEL_MS = 420
const HOME_RESET_MS = 700

/**
 * The orange ball on the instrument panel. Grab it, flick it at the index and the row its
 * path reaches opens, with a dashed pass line showing where it is heading. Rows still work
 * with a plain click, so this is a bonus. Off under reduced motion and on touch.
 */
export function FlickBall({ rowSelector, onHint }: { rowSelector: string; onHint: (h: string | null) => void }) {
  const ballRef = useRef<HTMLButtonElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const samples = useRef<Sample[]>([])
  const drag = useRef<{ dx: number; dy: number; ox: number; oy: number } | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return
    const fine = window.matchMedia("(pointer: fine)").matches
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnabled(fine && !calm)
  }, [])

  const rows = () => [...document.querySelectorAll<HTMLAnchorElement>(rowSelector)]

  const reset = () => {
    const b = ballRef.current
    if (!b) return
    b.style.transition = `translate ${HOME_RESET_MS}ms cubic-bezier(.19,1,.22,1)`
    b.style.translate = "0px 0px"
    lineRef.current?.setAttribute("d", "")
  }

  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const b = ballRef.current
    if (!b) return
    const r = b.getBoundingClientRect()
    drag.current = { dx: e.clientX - (r.left + r.width / 2), dy: e.clientY - (r.top + r.height / 2), ox: r.left + r.width / 2, oy: r.top + r.height / 2 }
    samples.current = [{ x: e.clientX, y: e.clientY, t: performance.now() }]
    b.style.transition = "none"
    b.setPointerCapture(e.pointerId)
    onHint("flick the ball at a row")
  }

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current
    const b = ballRef.current
    if (!d || !b) return
    samples.current.push({ x: e.clientX, y: e.clientY, t: performance.now() })
    samples.current = samples.current.slice(-12)
    b.style.translate = `${e.clientX - d.dx - d.ox}px ${e.clientY - d.dy - d.oy}px`
    const v = velocityFrom(samples.current)
    const hit = flickTarget({ x: e.clientX, y: e.clientY }, v, rows().map((a) => a.getBoundingClientRect()))
    const line = lineRef.current
    if (!line) return
    if (hit === null) { line.setAttribute("d", ""); return }
    const t = rows()[hit].getBoundingClientRect()
    line.setAttribute("d", `M${e.clientX} ${e.clientY} L${t.left + 20} ${t.top + t.height / 2}`)
  }

  const onUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current
    drag.current = null
    onHint(null)
    if (!d) return
    const all = rows()
    const hit = flickTarget({ x: e.clientX, y: e.clientY }, velocityFrom(samples.current), all.map((a) => a.getBoundingClientRect()))
    if (hit === null) { reset(); return }
    const b = ballRef.current
    const t = all[hit].getBoundingClientRect()
    if (b) {
      b.style.transition = `translate ${TRAVEL_MS}ms cubic-bezier(.19,1,.22,1)`
      b.style.translate = `${t.left + 20 - d.ox}px ${t.top + t.height / 2 - d.oy}px`
    }
    window.setTimeout(() => { all[hit].click(); reset() }, TRAVEL_MS)
  }

  if (!enabled) return null
  return (
    <>
      <svg className="flick-line" aria-hidden="true"><path ref={lineRef} d="" /></svg>
      <button
        ref={ballRef}
        type="button"
        className="flick-ball"
        aria-label="Orange ball: drag and flick it at a row to open it"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => { drag.current = null; reset() }}
      />
    </>
  )
}
