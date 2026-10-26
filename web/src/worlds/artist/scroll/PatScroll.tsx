import { useEffect, useRef, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { useReducedMotion } from "motion/react"
import { motionTokens } from "../../../lib/motion-tokens"
import { damp } from "../../../lib/damp"
import { useFinePointer } from "../../../components/pointer/pointer-shared"
import { createSlot, finish, measure, rasterise, stamp, type InkSlot } from "./ink-reveal"
import "./pat-scroll.css"

const S = motionTokens.scroll
const P = motionTokens.pointer
/** px a touch must travel before it counts as a drag, not a tap */
const DRAG_TAP_PX = 8

export interface ScrollPanel {
  to: string
  num: string
  label: string
  gloss: string
  /** the painted plate, 3:4 */
  img: string
}

interface Bloom { slot: number; lx: number; ly: number; at: number }

/**
 * Artist home: a patua-style scroll read left to right (PAT-SCROLL-SPEC).
 * Drawings sit in pencil; wherever the pointer looks, ink blooms in. The
 * camera is one transformed strip moved by wheel, keys or a touch drag,
 * damped and settled on the nearest panel. No native scroll element.
 */
export function PatScroll({ opening, panels }: { opening: ReactNode; panels: ReadonlyArray<ScrollPanel> }) {
  const reduce = useReducedMotion() ?? false
  const fine = useFinePointer()
  const viewRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const boxRefs = useRef<(HTMLDivElement | null)[]>([])
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const slots = useRef<InkSlot[]>([])
  const api = useRef<{ bloom: (i: number, lx?: number, ly?: number) => void; centre: (i: number) => void } | null>(null)

  // camera + reveal loop
  useEffect(() => {
    const view = viewRef.current
    const strip = stripRef.current
    if (!view || !strip) return
    const all = !fine || reduce
    slots.current = canvasRefs.current.map((c) => createSlot(c as HTMLCanvasElement))

    let cam = 0
    let target = 0
    let maxX = 0
    let viewLeft = 0
    let viewTop = 0
    let viewW = 0
    let raf = 0
    let last = 0
    let snapT = 0
    let ptr: { x: number; y: number } | null = null
    let prev: { x: number; y: number } | null = null
    const blooms: Bloom[] = []

    const remeasure = () => {
      const r = view.getBoundingClientRect()
      viewLeft = r.left
      viewTop = r.top
      viewW = view.clientWidth
      maxX = Math.max(0, strip.scrollWidth - viewW)
      target = Math.min(target, maxX)
      if (barRef.current) barRef.current.style.width = `${Math.min(100, (viewW / Math.max(1, strip.scrollWidth)) * 100)}%`
      slots.current.forEach((s, i) => {
        const box = boxRefs.current[i]
        if (box) measure(s, box, strip)
      })
    }
    const clamp = (x: number) => Math.min(maxX, Math.max(0, x))
    const panelCentres = () =>
      Array.from(strip.children as HTMLCollectionOf<HTMLElement>).map((el) => el.offsetLeft + el.offsetWidth / 2)
    const snap = () => {
      const mid = target + viewW / 2
      const cs = panelCentres()
      let best = cs[0] ?? 0
      for (const c of cs) if (Math.abs(c - mid) < Math.abs(best - mid)) best = c
      target = clamp(best - viewW / 2)
      kick()
    }

    const stampAt = (sx: number, sy: number) => {
      slots.current.forEach((s) => { stamp(s, sx - s.x, sy - s.y, S.brushR) })
    }

    const frame = (now: number) => {
      const dt = last ? Math.min(now - last, P.maxDtMs) : P.firstDtMs
      last = now
      let busy = false

      cam = damp(cam, target, S.camLambda, dt)
      if (Math.abs(target - cam) < P.settleEps) cam = target
      else busy = true
      strip.style.transform = `translate3d(${-cam}px,0,0)`
      // thumb width is view/strip of the track, so cam/view thumb widths is its offset
      if (barRef.current && viewW > 0) barRef.current.style.transform = `translate3d(${(cam / viewW) * 100}%,0,0)`

      // the pointer looks at the strip; moving the camera under a still pointer looks too
      if (ptr && !all) {
        const sx = ptr.x - viewLeft + cam
        const sy = ptr.y - viewTop
        const from = prev ?? { x: sx, y: sy }
        const dist = Math.hypot(sx - from.x, sy - from.y)
        if (dist > 0.5 || !prev) {
          const n = Math.min(24, Math.max(1, Math.ceil(dist / (S.brushR * S.stampStep))))
          for (let k = 1; k <= n; k++) stampAt(from.x + ((sx - from.x) * k) / n, from.y + ((sy - from.y) * k) / n)
          prev = { x: sx, y: sy }
        }
      }

      for (let b = blooms.length - 1; b >= 0; b--) {
        const bl = blooms[b]
        const s = slots.current[bl.slot]
        const t = Math.min(1, (now - bl.at) / S.bloomMs)
        const r = Math.hypot(s.w, s.h) * (0.15 + 0.85 * (1 - Math.pow(1 - t, 3)))
        stamp(s, bl.lx, bl.ly, r)
        if (t >= 1) { finish(s); blooms.splice(b, 1) } else busy = true
      }

      raf = busy ? requestAnimationFrame(frame) : 0
      if (!raf) last = 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return
      e.preventDefault()
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const px = e.deltaMode === 1 ? d * 16 : e.deltaMode === 2 ? d * viewW : d
      target = clamp(target + px * S.wheelGain)
      clearTimeout(snapT)
      snapT = window.setTimeout(snap, S.snapIdleMs)
      kick()
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return
      ptr = { x: e.clientX, y: e.clientY }
      kick()
    }
    const onLeave = () => { ptr = null; prev = null }
    let drag: { x: number; cam: number; moved: boolean } | null = null
    let swallow = false
    const onDown = (e: PointerEvent) => { if (e.pointerType === "touch") drag = { x: e.clientX, cam: target, moved: false } }
    const onTouchMove = (e: PointerEvent) => {
      if (!drag || e.pointerType !== "touch") return
      if (Math.abs(e.clientX - drag.x) > DRAG_TAP_PX) drag.moved = true
      target = clamp(drag.cam - (e.clientX - drag.x))
      kick()
    }
    const onUp = () => { if (drag) { swallow = drag.moved; drag = null; snap() } }
    // a drag along the scroll must not open the panel it ends on
    const onClick = (e: MouseEvent) => { if (swallow) { e.preventDefault(); e.stopPropagation(); swallow = false } }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
      if ((e.target as Element | null)?.closest("input,textarea,select,[contenteditable]")) return
      const cs = panelCentres()
      const mid = target + viewW / 2
      const dir = e.key === "ArrowRight" ? 1 : -1
      const next = dir > 0 ? cs.find((c) => c > mid + 4) : [...cs].reverse().find((c) => c < mid - 4)
      if (next == null) return
      e.preventDefault()
      target = clamp(next - viewW / 2)
      kick()
    }

    api.current = {
      bloom: (i, lx, ly) => {
        const s = slots.current[i]
        if (!s || s.done || blooms.some((b) => b.slot === i)) return
        blooms.push({ slot: i, lx: lx ?? s.w / 2, ly: ly ?? s.h / 2, at: performance.now() })
        kick()
      },
      centre: (i) => {
        const el = strip.children[i + 1] as HTMLElement | undefined
        if (!el) return
        const c = el.offsetLeft + el.offsetWidth / 2
        if (c - target < viewW * 0.15 || c - target > viewW * 0.85) { target = clamp(c - viewW / 2); kick() }
      },
    }

    remeasure()
    const ro = new ResizeObserver(() => { remeasure(); paintAll(); kick() })
    ro.observe(view)
    view.addEventListener("wheel", onWheel, { passive: false })
    view.addEventListener("pointermove", onMove)
    view.addEventListener("pointerleave", onLeave)
    view.addEventListener("pointerdown", onDown)
    view.addEventListener("pointermove", onTouchMove)
    view.addEventListener("click", onClick, true)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    window.addEventListener("keydown", onKey)

    function paintAll() {
      slots.current.forEach((s, i) => {
        const src = imgRefs.current[i]
        if (!src) return
        if (all) s.done = true
        rasterise(s, src).catch((err) => console.error("[ERROR] pat-scroll ink:", err))
      })
    }
    paintAll()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(snapT)
      ro.disconnect()
      view.removeEventListener("wheel", onWheel)
      view.removeEventListener("pointermove", onMove)
      view.removeEventListener("pointerleave", onLeave)
      view.removeEventListener("pointerdown", onDown)
      view.removeEventListener("pointermove", onTouchMove)
      view.removeEventListener("click", onClick, true)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      window.removeEventListener("keydown", onKey)
      api.current = null
    }
  }, [fine, reduce])

  const local = (i: number, e: React.PointerEvent) => {
    const r = boxRefs.current[i]?.getBoundingClientRect()
    return r ? [e.clientX - r.left, e.clientY - r.top] as const : [undefined, undefined] as const
  }

  return (
    <div className="ps" data-own-wheel>
      <div className="ps-view" ref={viewRef}>
        <div className="ps-strip" ref={stripRef}>
          <section className="ps-open">{opening}</section>
          {panels.map((p, i) => (
            <Link key={p.to} to={p.to} className="ps-panel"
              onPointerEnter={(e) => { const [x, y] = local(i, e); api.current?.bloom(i, x, y) }}
              onFocus={() => { api.current?.centre(i); api.current?.bloom(i) }}>
              <div className="ps-art" ref={(el) => { boxRefs.current[i] = el }}>
                <img className="ps-pencil" loading={i < 2 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" ref={(el) => { imgRefs.current[i] = el }} src={p.img} alt="" draggable={false} />
                <canvas className="ps-ink" ref={(el) => { canvasRefs.current[i] = el }} aria-hidden="true" />
              </div>
              <div className="ps-cap">
                <span className="ps-num">{p.num}</span>
                <span className="ps-name">{p.label}</span>
                <span className="ps-gloss">{p.gloss}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="ps-track" aria-hidden="true">
        <span className="ps-thumb" ref={barRef} />
      </div>
    </div>
  )
}
