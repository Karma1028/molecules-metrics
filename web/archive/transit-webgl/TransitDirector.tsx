import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useReducedMotion } from "motion/react"
import { pickTransit, type TransitName } from "./classify"
import { setTransiting } from "./state"

/**
 * Every in-site navigation between pages gets a 3D transit built from the real
 * page: a capture-phase click listener catches same-origin links, rasterises
 * the screen, mounts a WebGL canvas over it, navigates underneath, and lets the
 * effect hand off to the new page. Shatter (analyst -> artist), reactor
 * (artist -> analyst), paper fold (artist sections), glass blinds (analyst
 * sections). Skipped for reduced motion, no WebGL, modified clicks, or before
 * the lazy chunk has loaded; the normal route animation then runs as before.
 */
type Mod = typeof import("./effects")

const FADE_MS = 200
/** a warm capture is reused while nothing has been touched and it is this young */
const WARM_TTL_MS = 6000
/** after a route change, wait for entrances to settle before warming a capture */
const WARM_DELAY_MS = 1600
const HOVER_REWARM_MS = 1200
const SETTLE_TIMEOUT_MS = 1200
const GUARD_EXTRA_MS = 1500

let mod: Mod | null = null
let webgl = false

const frame = () => new Promise<void>((r) => requestAnimationFrame(() => r()))

function linkFrom(e: Event): HTMLAnchorElement | null {
  const a = (e.target as Element | null)?.closest?.("a[href]")
  if (!(a instanceof HTMLAnchorElement)) return null
  if (a.target && a.target !== "_self") return null
  if (a.hasAttribute("download") || a.origin !== location.origin) return null
  return a
}

/** Waits for the lazy page under the overlay to replace its loading fallback. */
async function settled() {
  const t0 = performance.now()
  while (document.querySelector(".route-fallback") && performance.now() - t0 < SETTLE_TIMEOUT_MS) await frame()
  await frame()
  await frame()
}

export function TransitDirector() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const loc = useLocation()
  const path = useRef(loc.pathname)
  path.current = loc.pathname

  useEffect(() => {
    if (reduce || mod) return
    const load = () =>
      import("./effects")
        .then((m) => {
          webgl = m.canWebGL()
          if (webgl) m.warmUp()
          mod = m
        })
        .catch(() => {
          /* chunk failed: plain route animations stay */
        })
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(load, 1500)
    return () => clearTimeout(id)
  }, [reduce])

  useEffect(() => {
    if (reduce) return
    let busy = false
    // Rasterising the DOM costs ~0.5 s, too slow to start on click, so a capture
    // is kept warm: once the page settles, again on hovering a link, and it is
    // discarded as soon as the user touches anything that could change the screen.
    let warm: { at: number; shot: Promise<HTMLCanvasElement | null> } | null = null
    let lastInput = 0
    let warmTimer = 0
    const fresh = () => Boolean(warm && warm.at > lastInput && performance.now() - warm.at < WARM_TTL_MS)
    const rewarm = () => {
      if (!mod) return scheduleWarm() // chunk still loading: try again shortly
      if (!webgl || busy) return
      warm = { at: performance.now(), shot: mod.captureViewport() }
    }
    const scheduleWarm = () => {
      window.clearTimeout(warmTimer)
      warmTimer = window.setTimeout(() => {
        if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(() => fresh() || rewarm(), { timeout: 1000 })
        else rewarm()
      }, WARM_DELAY_MS)
    }

    const eligible = (e: MouseEvent): { a: HTMLAnchorElement; name: TransitName; to: string } | null => {
      if (!mod || !webgl || busy || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null
      const a = linkFrom(e)
      if (!a) return null
      const to = a.pathname + a.search + a.hash
      const name = pickTransit(path.current, a.pathname)
      return name ? { a, name, to } : null
    }

    const onInput = (e: Event) => {
      if (e.type === "pointerdown" && eligible(e as MouseEvent)) return
      lastInput = performance.now()
      if (!busy) scheduleWarm()
    }
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !eligible(e)) return
      if (!fresh() || performance.now() - (warm?.at ?? 0) > HOVER_REWARM_MS) rewarm()
    }

    const onClick = (e: MouseEvent) => {
      const hit = eligible(e)
      if (!hit || !mod) return
      // preventDefault alone: React Router's Link skips its own navigation, while
      // other click handlers (closing the mobile drawer) still run
      e.preventDefault()
      const shot = fresh() && warm ? warm.shot : mod.captureViewport()
      warm = null
      void run(mod, hit.name, hit.to, shot)
    }

    async function run(m: Mod, name: TransitName, to: string, shot: Promise<HTMLCanvasElement | null>) {
      busy = true
      setTransiting(true)
      const canvas = document.createElement("canvas")
      let effect: Awaited<ReturnType<Mod["effects"][TransitName]>> | null = null
      let guard = 0
      let finished = false

      const finish = () => {
        if (finished) return
        finished = true
        window.clearTimeout(guard)
        window.removeEventListener("keydown", onKey)
        canvas.style.opacity = "0"
        window.setTimeout(() => {
          effect?.dispose()
          canvas.remove()
          setTransiting(false)
          busy = false
          scheduleWarm()
        }, FADE_MS)
      }
      const onKey = (k: KeyboardEvent) => {
        if (k.key === "Escape") finish()
      }

      try {
        const from = await shot
        if (!from) throw new Error("capture failed")
        canvas.className = "transit-canvas"
        canvas.setAttribute(m.OVERLAY_ATTR, "")
        canvas.setAttribute("aria-hidden", "true")
        document.body.appendChild(canvas)
        effect = await m.effects[name]({
          canvas,
          from,
          captureNext: async () => {
            await settled()
            return m.captureViewport()
          },
        })
        effect.play(finish)
        window.addEventListener("keydown", onKey)
        canvas.addEventListener("click", finish, { once: true })
        guard = window.setTimeout(finish, effect.duration * 1000 + GUARD_EXTRA_MS)
        navigate(to)
      } catch {
        effect?.dispose()
        canvas.remove()
        setTransiting(false)
        busy = false
        navigate(to)
      }
    }

    const INPUTS = ["pointerdown", "keydown", "wheel", "input", "resize", "popstate"] as const
    const target = (t: string) => (t === "resize" || t === "popstate" ? window : document)
    INPUTS.forEach((t) => target(t).addEventListener(t, onInput, true))
    document.addEventListener("pointerover", onOver, true)
    document.addEventListener("click", onClick, true)
    scheduleWarm()
    return () => {
      window.clearTimeout(warmTimer)
      INPUTS.forEach((t) => target(t).removeEventListener(t, onInput, true))
      document.removeEventListener("pointerover", onOver, true)
      document.removeEventListener("click", onClick, true)
    }
  }, [reduce, navigate])

  return null
}
