/**
 * Day <-> night, told as a sky. A twilight gradient rises over the page, the sun
 * sets (or the moon sets and the sun rises) along an arc, stars come out or go
 * in, and the theme flips at the moment the sky is fully opaque, so no half
 * repainted frame is ever seen. One overlay, WAAPI only (opacity/transform).
 */
import { motionTokens } from "./motion-tokens"

export const SKY_MS = 1500
/** fraction of the run at which the page theme flips (sky fully covers it) */
const FLIP_AT = 0.42
const STAR_COUNT = 34
const EASE = motionTokens.easing.inOut as unknown as number[]
const bezier = (e: number[]) => `cubic-bezier(${e.join(",")})`

const DUSK = "linear-gradient(180deg,#171338 0%,#4a2766 36%,#c9555a 70%,#f5a14e 100%)"
const DAWN = "linear-gradient(0deg,#f7b65c 0%,#f08c6c 28%,#8a7ab8 66%,#34457a 100%)"

let running = false

type SkyOpts = {
  toDark: boolean
  reduce?: boolean
  flip: () => void
}

/** deterministic star field so repeated toggles look the same */
function starAt(i: number): { x: number; y: number; s: number; d: number } {
  const r = (n: number) => {
    const v = Math.sin((i + 1) * n) * 43758.5453
    return v - Math.floor(v)
  }
  return { x: r(12.9898) * 100, y: r(78.233) * 62, s: 1.2 + r(39.346) * 1.8, d: r(11.135) }
}

function disc(kind: "sun" | "moon"): HTMLElement {
  const el = document.createElement("div")
  const size = kind === "sun" ? 76 : 64
  el.style.cssText = `position:absolute;left:0;top:0;width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px;border-radius:50%;opacity:0;will-change:transform,opacity;`
  el.style.background =
    kind === "sun"
      ? "radial-gradient(circle at 40% 38%,#fff3c4 0%,#ffc857 45%,#f2812f 100%)"
      : "radial-gradient(circle at 36% 34%,#fbf7ea 0%,#d9d7cf 60%,#a8a79f 100%)"
  el.style.boxShadow =
    kind === "sun" ? "0 0 70px 26px rgba(255,170,70,.55)" : "0 0 54px 16px rgba(220,225,255,.35)"
  return el
}

export function skyShift({ toDark, reduce, flip }: SkyOpts): void {
  if (reduce || typeof document === "undefined" || !document.body.animate || running) {
    flip()
    return
  }
  running = true
  const vw = innerWidth
  const vh = innerHeight
  const root = document.createElement("div")
  root.setAttribute("aria-hidden", "true")
  root.style.cssText = "position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden;"

  const sky = document.createElement("div")
  sky.style.cssText = `position:absolute;inset:0;background:${toDark ? DUSK : DAWN};opacity:0;`
  root.appendChild(sky)

  const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const p = starAt(i)
    const s = document.createElement("i")
    s.style.cssText = `position:absolute;left:${p.x}%;top:${p.y}%;width:${p.s}px;height:${p.s}px;border-radius:50%;background:#fff6dc;opacity:0;`
    root.appendChild(s)
    return { el: s, d: p.d }
  })

  const sun = disc("sun")
  const moon = disc("moon")
  root.append(sun, moon)
  document.body.appendChild(root)

  const ease = bezier(EASE)
  const at = (px: number, py: number) => `translate(${px * vw}px,${py * vh}px)`
  const opts = (delay = 0): KeyframeAnimationOptions => ({ duration: SKY_MS, easing: ease, fill: "forwards", delay })

  // the sky: rises to opaque by FLIP_AT, holds a beat, then clears onto the new theme
  sky.animate([{ opacity: 0 }, { opacity: 1, offset: FLIP_AT }, { opacity: 1, offset: 0.55 }, { opacity: 0 }], {
    duration: SKY_MS,
    easing: "linear",
    fill: "forwards",
  })

  // body that leaves (sets) then body that arrives (rises), along one arc
  const setter = toDark ? sun : moon
  const riser = toDark ? moon : sun
  setter.animate(
    [
      { transform: at(0.5, 0.2), opacity: 0 },
      { transform: at(0.58, 0.3), opacity: 1, offset: 0.2 },
      { transform: at(0.86, 0.82), opacity: 0.9, offset: 0.7 },
      { transform: at(0.9, 0.9), opacity: 0 },
    ],
    opts()
  )
  riser.animate(
    [
      { transform: at(0.12, 0.9), opacity: 0 },
      { transform: at(0.16, 0.8), opacity: 0, offset: 0.4 },
      { transform: at(0.3, 0.45), opacity: 1, offset: 0.75 },
      { transform: at(0.5, 0.22), opacity: 1 },
    ],
    opts()
  )

  // stars: come out as the sky darkens, or wink out as it brightens
  stars.forEach(({ el, d }) => {
    const peak = toDark ? 0.9 : 0.5
    el.animate(
      [{ opacity: 0 }, { opacity: peak, offset: 0.35 + d * 0.1 }, { opacity: peak, offset: 0.6 }, { opacity: 0 }],
      { duration: SKY_MS, easing: "linear", fill: "forwards" }
    )
  })

  window.setTimeout(flip, SKY_MS * FLIP_AT)
  window.setTimeout(() => {
    root.remove()
    running = false
  }, SKY_MS + 60)
}
