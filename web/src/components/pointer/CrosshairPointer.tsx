import { useEffect, useRef } from "react"
import { motionTokens } from "../../lib/motion-tokens"
import { damp, settled } from "../../lib/damp"
import { labelOf } from "./pointer-math"
import { countSeen, isTextField, listenAll, pointerMemory, targetOf, translate } from "./pointer-shared"

const P = motionTokens.pointer

const pad4 = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0")

/**
 * Analyst pointer = the same ball, now a data point. The orange point at the
 * crosshair centre is the ball (catalyst colour: the artist is still in the
 * room). Hairlines and numbers track with no lag (the3key, factor 1); a corner
 * bracket locks onto a hovered or focused control and the readout names it
 * with the session tally n: how many things you have looked at, counted.
 */
export function CrosshairPointer({ reduced, handoff }: { reduced: boolean; handoff: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const hRef = useRef<HTMLSpanElement>(null)
  const vRef = useRef<HTMLSpanElement>(null)
  const readRef = useRef<HTMLSpanElement>(null)
  const lockRef = useRef<HTMLSpanElement>(null)
  const pointRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const box = { x: 0, y: 0, w: 0, h: 0 }
    const aim = { x: 0, y: 0, w: 0, h: 0 }
    const mouse = { x: pointerMemory.x, y: pointerMemory.y }
    let label = ""
    let n = pointerMemory.n
    let target: Element | null = null
    let raf = 0
    let last = 0
    let text = ""

    const writeReadout = () => {
      const r = readRef.current
      if (!r) return
      const next = target ? `→ ${label.toUpperCase()}  n=${String(n).padStart(2, "0")}` : `x ${pad4(mouse.x)}  y ${pad4(mouse.y)}`
      if (next !== text) { r.textContent = next; text = next }
      const fx = mouse.x > window.innerWidth - P.readoutFlip ? -1 : 1
      const fy = mouse.y > window.innerHeight - P.readoutOffset * 3 ? -1 : 1
      r.style.transform = translate(mouse.x + P.readoutOffset * fx, mouse.y + P.readoutOffset * fy)
      r.dataset.flipX = fx < 0 ? "true" : "false"
    }

    const step = (now: number) => {
      const dt = last ? Math.min(now - last, P.maxDtMs) : P.firstDtMs
      last = now
      const lambda = reduced ? Infinity : P.dot
      box.x = damp(box.x, aim.x, lambda, dt)
      box.y = damp(box.y, aim.y, lambda, dt)
      box.w = damp(box.w, aim.w, lambda, dt)
      box.h = damp(box.h, aim.h, lambda, dt)
      // four corners move by transform only (no width/height layout work)
      const corners = lockRef.current?.children
      if (corners && corners.length === 4) {
        const xs = [box.x, box.x + box.w, box.x, box.x + box.w]
        const ys = [box.y, box.y, box.y + box.h, box.y + box.h]
        for (let i = 0; i < 4; i++) (corners[i] as HTMLElement).style.transform = translate(xs[i], ys[i])
      }
      const done = settled([[box.x, aim.x], [box.y, aim.y], [box.w, aim.w], [box.h, aim.h]], P.settleEps)
      raf = done ? 0 : requestAnimationFrame(step)
      if (done) last = 0
    }

    /** Lock onto el (or release with null); re-measures, so it also follows a moved target. */
    const lockOn = (el: Element | null, from: { x: number; y: number } = mouse) => {
      const live = el && el.isConnected ? el : null
      target = live
      root.dataset.hover = live ? "true" : "false"
      if (!live) { aim.w = 0; aim.h = 0; return }
      label = labelOf(live, P.labelMax)
      n = countSeen(live.getAttribute("href") || label)
      const r = live.getBoundingClientRect()
      const fresh = aim.w === 0
      aim.x = r.left - P.lockPad
      aim.y = r.top - P.lockPad
      aim.w = r.width + P.lockPad * 2
      aim.h = r.height + P.lockPad * 2
      if (fresh) Object.assign(box, { x: from.x, y: from.y, w: 0, h: 0 })
      if (!raf) raf = requestAnimationFrame(step)
    }
    const relock = () => { if (target) { lockOn(target); writeReadout() } }

    return listenAll([
      [window, "pointermove", (e: PointerEvent) => {
        if (e.pointerType !== "mouse" && e.pointerType !== "pen") return
        mouse.x = e.clientX
        mouse.y = e.clientY
        root.dataset.hidden = isTextField(e.target) ? "true" : "false"
        if (hRef.current) hRef.current.style.transform = translate(0, mouse.y)
        if (vRef.current) vRef.current.style.transform = translate(mouse.x, 0)
        if (pointRef.current) pointRef.current.style.transform = translate(mouse.x, mouse.y)
        pointerMemory.x = mouse.x
        pointerMemory.y = mouse.y
        // no re-measure per move (forced layout); scroll/resize relock a moved target
        writeReadout()
      }],
      [document, "pointerover", (e: PointerEvent) => {
        const next = targetOf(e.target)
        if (next === target) return
        lockOn(next)
        writeReadout()
      }],
      // keyboard users get the same lock-on (bracket grows from the control's corner)
      [document, "focusin", (e: FocusEvent) => {
        const el = targetOf(e.target)
        if (!el || !(e.target as Element).matches(":focus-visible")) return
        const r = el.getBoundingClientRect()
        lockOn(el, { x: r.left, y: r.top })
      }],
      [window, "blur", () => { root.dataset.hidden = "true" }],
      [document.documentElement, "pointerleave", () => { root.dataset.hidden = "true" }],
      [window, "scroll", relock, true],
      [window, "resize", relock],
    ], () => cancelAnimationFrame(raf))
  }, [reduced])

  // arriving from the artist world: draw the point where the ball was
  useEffect(() => {
    const p = pointerMemory
    if (p.x < 0) return
    const root = rootRef.current
    if (root) root.dataset.hidden = "false"
    if (hRef.current) hRef.current.style.transform = translate(0, p.y)
    if (vRef.current) vRef.current.style.transform = translate(p.x, 0)
    if (pointRef.current) pointRef.current.style.transform = translate(p.x, p.y)
  }, [])

  return (
    <div ref={rootRef} className="ptr ptr-cross" aria-hidden="true" data-hidden="true" data-handoff={handoff ? "true" : "false"} style={{ ["--handoff" as string]: `${P.handoff}s` }}>
      <span ref={hRef} className="ptr-hair ptr-hair-h" />
      <span ref={vRef} className="ptr-hair ptr-hair-v" />
      <span ref={lockRef} className="ptr-lock">
        <i data-c="tl" /><i data-c="tr" /><i data-c="bl" /><i data-c="br" />
      </span>
      <span ref={pointRef} className="ptr-pos">
        <span className="ptr-point" />
      </span>
      <span ref={readRef} className="ptr-read" />
    </div>
  )
}
