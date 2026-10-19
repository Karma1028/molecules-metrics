import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { neighbour, SWIPE_COMMIT, wheelStart, wheelStep } from "../../lib/deck"

/** Elements that own the wheel or vertical drags themselves. */
const OWNS_INPUT = "input, textarea, select, iframe, [contenteditable], [data-own-wheel]"
const SWIPE_MAX_MS = 700

/** True when something between `el` and the page can still scroll in `dir`. */
function canScroll(el: Element | null, dir: 1 | -1): boolean {
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    const { overflowY } = getComputedStyle(n)
    if ((overflowY === "auto" || overflowY === "scroll") && n.scrollHeight > n.clientHeight + 1) {
      if (dir > 0 ? n.scrollTop + n.clientHeight < n.scrollHeight - 1 : n.scrollTop > 0) return true
    }
  }
  const doc = document.scrollingElement ?? document.documentElement
  return dir > 0 ? doc.scrollTop + window.innerHeight < doc.scrollHeight - 1 : doc.scrollTop > 0
}

/**
 * Wheel and vertical swipes travel the deck: one section per gesture, once
 * nothing under the pointer still has room to scroll that way.
 */
export function useDeckScroll(enabled: boolean) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const path = useRef(pathname)
  path.current = pathname
  // navigate changes identity on every route change; keep the listeners (and the
  // inertia lock inside them) alive across navigations
  const nav = useRef(navigate)
  nav.current = navigate

  useEffect(() => {
    if (!enabled) return
    let wheel = wheelStart()
    let touch: { x: number; y: number; at: number; target: Element | null } | null = null

    const go = (dir: 1 | -1, target: Element | null) => {
      if (target?.closest(OWNS_INPUT) || canScroll(target, dir)) return false
      const to = neighbour(path.current, dir)
      if (to) nav.current(to)
      return Boolean(to)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      const target = e.target as Element | null
      const dir = e.deltaY > 0 ? 1 : -1
      if (target?.closest(OWNS_INPUT) || canScroll(target, dir)) return
      const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY
      const r = wheelStep(wheel, px, performance.now())
      wheel = r.state
      if (r.go) go(r.go, target)
    }
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      touch = e.touches.length === 1 ? { x: t.clientX, y: t.clientY, at: performance.now(), target: e.target as Element } : null
    }
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0]
      if (!touch || !t) return
      const dx = t.clientX - touch.x
      const dy = t.clientY - touch.y
      const quick = performance.now() - touch.at < SWIPE_MAX_MS
      const target = touch.target
      touch = null
      if (quick && Math.abs(dy) > SWIPE_COMMIT && Math.abs(dy) > Math.abs(dx) * 1.5) go(dy < 0 ? 1 : -1, target)
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [enabled])
}
