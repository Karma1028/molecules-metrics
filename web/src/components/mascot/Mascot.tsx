import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { useReducedMotion } from "motion/react"
import { feedLine } from "../../lib/feed-health"
import { SLEEP_MS, lineFor, lookAt } from "./mascot-logic"
import { errandPick, gaitFor, stepWalker, strideFor, wanderTarget, type Gait, type Walker } from "./walk"
import "./mascot.css"

const BUBBLE_MS = 3600
const HOP_MS = 560
const FOLLOW_MS = 5000 // follows the pointer this long after it last moved
const MAX_PRINTS = 12

/**
 * The Bankura horse: a small terracotta mascot that stands in the corner of every page.
 * One SVG, CSS-only idle loops, and a single passive pointer listener that writes two CSS
 * variables (no React state per move). Sleeps after 45 s untouched; static under reduced
 * motion and on touch, where only the click-to-talk remains.
 */
export function Mascot() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const prints = useRef<HTMLDivElement>(null)
  const runTo = useRef<((x: number) => void) | null>(null)
  const errands = useRef(0)
  const [said, setSaid] = useState(0)
  const [line, setLine] = useState<string | null>(null)
  const [hop, setHop] = useState(false)
  const [asleep, setAsleep] = useState(false)

  // look at the pointer; wake on any input; doze off when idle
  useEffect(() => {
    const el = root.current
    if (!el) return
    const fine = window.matchMedia?.("(pointer: fine)").matches ?? true
    let raf = 0
    let sleepTimer = 0
    let last: PointerEvent | null = null

    const wake = () => {
      setAsleep((a) => (a ? false : a))
      window.clearTimeout(sleepTimer)
      sleepTimer = window.setTimeout(() => setAsleep(true), SLEEP_MS)
    }
    const aim = () => {
      raf = 0
      if (!last) return
      const r = el.getBoundingClientRect()
      const { facing, tilt } = lookAt(r.left + r.width / 2, r.top + r.height * 0.35, last.clientX, last.clientY)
      el.style.setProperty("--face", String(facing))
      el.style.setProperty("--tilt", `${tilt}deg`)
    }
    const onMove = (e: PointerEvent) => {
      wake()
      if (reduce || !fine) return
      last = e
      if (!raf) raf = requestAnimationFrame(aim)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("keydown", wake, { passive: true })
    window.addEventListener("pointerdown", wake, { passive: true })
    wake()
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("keydown", wake)
      window.removeEventListener("pointerdown", wake)
      window.clearTimeout(sleepTimer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  // roam: trot after the pointer, amble about when left alone, leave hoofprints
  useEffect(() => {
    const el = root.current
    const layer = prints.current
    const fine = window.matchMedia?.("(pointer: fine)").matches ?? true
    if (!el || !layer || reduce || !fine) return
    const width = () => el.getBoundingClientRect().width
    const maxX = () => Math.max(0, window.innerWidth - width() - 16)
    let w: Walker = { x: 0, v: 0 }
    let target = 0
    let raf = 0
    let prev = 0
    let gait: Gait = "idle"
    let sincePrint = 0
    let lastMove = 0
    let nextWander = performance.now() + 6000

    const stamp = (x: number) => {
      const dot = document.createElement("i")
      dot.className = "m-print"
      dot.style.left = `${x + width() * 0.55}px`
      dot.addEventListener("animationend", () => dot.remove())
      layer.appendChild(dot)
      if (layer.childElementCount > MAX_PRINTS) layer.firstElementChild?.remove()
    }
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      const before = w.x
      w = stepWalker(w, target, dt)
      el.style.setProperty("--x", `${w.x.toFixed(1)}px`)
      if (Math.abs(w.v) > 8) el.style.setProperty("--face", w.v < 0 ? "-1" : "1")
      const g = gaitFor(w.v)
      if (g !== gait) {
        gait = g
        el.dataset.gait = g
      }
      sincePrint += Math.abs(w.x - before)
      const stride = strideFor(g)
      if (stride && sincePrint >= stride) {
        sincePrint = 0
        stamp(w.x)
      }
      if (g === "idle" && Math.abs(target - w.x) < 1) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(frame)
    }
    const go = (t: number) => {
      target = Math.max(0, Math.min(maxX(), t))
      if (!raf) {
        prev = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    runTo.current = (x) => {
      lastMove = performance.now()
      nextWander = lastMove + FOLLOW_MS + 4000
      go(x)
    }
    const onMove = (e: PointerEvent) => {
      lastMove = performance.now()
      nextWander = lastMove + FOLLOW_MS + 4000
      go(e.clientX - width() / 2)
    }
    const wander = window.setInterval(() => {
      const now = performance.now()
      if (now - lastMove < FOLLOW_MS || now < nextWander || el.dataset.asleep) return
      nextWander = now + 7000 + Math.random() * 6000
      go(wanderTarget(w.x, maxX(), Math.random()))
    }, 1000)
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      runTo.current = null
      window.removeEventListener("pointermove", onMove)
      window.clearInterval(wander)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  // a new page, a fresh line
  useEffect(() => {
    setSaid(0)
    setLine(null)
  }, [pathname])

  // the bubble clears itself
  useEffect(() => {
    if (!line) return
    const t = window.setTimeout(() => setLine(null), BUBBLE_MS)
    return () => window.clearTimeout(t)
  }, [line, said])

  useEffect(() => {
    if (!hop) return
    const t = window.setTimeout(() => setHop(false), HOP_MS)
    return () => window.clearTimeout(t)
  }, [hop])

  // errand: every few pokes, run to a marked spot on the page and point at it
  const errand = (): string | null => {
    const go = runTo.current
    const el = root.current
    if (!go || !el) return null
    const spots = [...document.querySelectorAll<HTMLElement>("[data-horse-spot]")].map((node) => {
      const r = node.getBoundingClientRect()
      return { node, x: r.left + r.width / 2 }
    })
    const k = errandPick(spots, el.getBoundingClientRect().left, errands.current)
    if (k < 0) return null
    errands.current += 1
    const { node, x } = spots[k]
    go(x - el.getBoundingClientRect().width / 2)
    node.classList.add("horse-pointed")
    window.setTimeout(() => node.classList.remove("horse-pointed"), 2600)
    return node.dataset.horseSpot ?? null
  }

  const poke = () => {
    setAsleep(false)
    setHop(true)
    const said2 = said % 3 === 1 ? errand() : null
    setLine(said2 ?? (said % 3 === 2 ? feedLine() ?? lineFor(pathname, said) : lineFor(pathname, said)))
    setSaid((n) => n + 1)
  }

  return (
    <>
    <div ref={prints} className="m-prints" aria-hidden="true" />
    <div ref={root} className="mascot" data-asleep={asleep || undefined} data-hop={hop || undefined}>
      <div className="mascot-bubble" role="status" aria-live="polite">
        {asleep ? "zzz" : line}
      </div>
      <button type="button" className="mascot-btn" aria-label="Bankura horse mascot: click for a hint" onClick={poke}>
        <svg className="mascot-svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <ellipse className="m-shadow" cx="52" cy="94" rx="30" ry="3.2" />
          <g className="m-tail"><path d="M31 54 C20 52 15 62 17 76 C18 80 21 80 21 76 C20 68 23 60 31 60Z" /></g>
          <g className="m-leg m-leg-b"><rect x="35" y="68" width="6" height="24" rx="2.5" /><rect className="m-hoof" x="34.5" y="88" width="7" height="5" rx="2" /></g>
          <g className="m-leg"><rect x="43" y="70" width="6" height="22" rx="2.5" /><rect className="m-hoof" x="42.5" y="88" width="7" height="5" rx="2" /></g>
          <g className="m-body">
            <path d="M28 58 C28 45 42 41 57 43 C72 45 80 51 80 61 C80 71 71 75 56 75 C41 75 28 71 28 58Z" />
            <path className="m-band" d="M44 44 C46 52 46 66 44 74 L50 75 C52 66 52 52 50 43Z" />
            <circle className="m-dot" cx="58" cy="56" r="2.4" />
            <circle className="m-dot" cx="66" cy="62" r="1.8" />
            <circle className="m-ring" cx="58" cy="56" r="6.2" />
          </g>
          <g className="m-leg m-leg-f"><rect x="63" y="70" width="6" height="22" rx="2.5" /><rect className="m-hoof" x="62.5" y="88" width="7" height="5" rx="2" /></g>
          <g className="m-leg m-leg-f2"><rect x="71" y="68" width="6" height="24" rx="2.5" /><rect className="m-hoof" x="70.5" y="88" width="7" height="5" rx="2" /></g>
          <g className="m-head">
            <path d="M62 54 C61 40 64 27 70 19 L83 14 C88 13 92 17 91 22 L88 29 C86 33 81 33 78 33 C76 38 75 46 77 56Z" />
            <path className="m-mane" d="M62 52 C60 44 61 34 65 24 L69 22 C65 32 65 42 68 52Z" />
            <path className="m-ear" d="M69 21 L70 8 L77 18Z" />
            <path className="m-ear m-ear-b" d="M65 24 L63 12 L70 20Z" />
            <circle className="m-eye" cx="81" cy="22" r="2.1" />
            <path className="m-lid" d="M78.5 22.2 Q81 24 83.5 22.2" />
            <circle className="m-nostril" cx="89.2" cy="24" r="1" />
            <path className="m-dot-p" d="M72 28 h4" />
          </g>
          <g className="m-z" aria-hidden="true"><text x="78" y="12">z</text><text x="86" y="5">z</text></g>
        </svg>
      </button>
    </div>
    </>
  )
}
