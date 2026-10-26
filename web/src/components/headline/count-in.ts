import { motionTokens } from "../../lib/motion-tokens"

const H = motionTokens.headline
const DIGITS = "0123456789"
const NOT_COUNTED = /[\s.,'’]/

/** Each .hc shows a ticking digit (data-d, drawn by CSS) until its settle time, then its real letter. */
export function countIn(root: HTMLElement): () => void {
  const chars = Array.from(root.querySelectorAll<HTMLElement>(".hc"))
  const roll = (c: HTMLElement) => {
    if (!NOT_COUNTED.test(c.textContent ?? "")) c.dataset.d = DIGITS[Math.floor(Math.random() * 10)]
  }
  chars.forEach(roll) // digits from the very first painted frame
  const t0 = performance.now()
  let lastTick = t0
  let raf = 0
  const frame = (now: number) => {
    const t = now - t0
    const tick = now - lastTick >= H.tickMs
    if (tick) lastTick = now
    let busy = false
    chars.forEach((c, i) => {
      if (t >= H.rollMs + i * H.charMs) { delete c.dataset.d; return }
      busy = true
      if (tick) roll(c)
    })
    raf = busy ? requestAnimationFrame(frame) : 0
  }
  raf = requestAnimationFrame(frame)
  return () => { cancelAnimationFrame(raf); chars.forEach((c) => delete c.dataset.d) }
}
