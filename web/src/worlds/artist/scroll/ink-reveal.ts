import { motionTokens } from "../../../lib/motion-tokens"

const S = motionTokens.scroll

/**
 * Ink reveal for one panel drawing (PAT-SCROLL-SPEC §3). The finished ink
 * drawing is rasterised once into `ink`; the pointer stamps soft alpha into
 * `mask`; the visible canvas shows ink where the mask has been painted. Each
 * stamp only touches its dirty rect, and nothing runs while the pointer rests.
 */
export interface InkSlot {
  /** visible canvas, sized to the art box */
  readonly view: HTMLCanvasElement
  /** art box position inside the strip (layout px, transform-free) */
  x: number
  y: number
  w: number
  h: number
  dpr: number
  ink: HTMLCanvasElement | null
  mask: HTMLCanvasElement
  done: boolean
}

export function createSlot(view: HTMLCanvasElement): InkSlot {
  return { view, x: 0, y: 0, w: 0, h: 0, dpr: 1, ink: null, mask: document.createElement("canvas"), done: false }
}

/** Offset of `el` inside `root` from offsetLeft/Top, so transforms never skew it. */
export function offsetIn(el: HTMLElement, root: HTMLElement): { x: number; y: number } {
  let x = 0
  let y = 0
  for (let n: HTMLElement | null = el; n && n !== root; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft
    y += n.offsetTop
  }
  return { x, y }
}

/** Re-measure a slot; keeps what was already inked by scaling the old mask. */
export function measure(slot: InkSlot, box: HTMLElement, strip: HTMLElement) {
  const { x, y } = offsetIn(box, strip)
  const w = box.offsetWidth
  const h = box.offsetHeight
  const dpr = Math.min(window.devicePixelRatio || 1, S.inkDpr)
  slot.x = x
  slot.y = y
  if (w === slot.w && h === slot.h && dpr === slot.dpr) return
  const old = slot.mask
  const mask = document.createElement("canvas")
  mask.width = Math.max(1, Math.round(w * dpr))
  mask.height = Math.max(1, Math.round(h * dpr))
  if (old.width > 1) mask.getContext("2d")?.drawImage(old, 0, 0, mask.width, mask.height)
  slot.mask = mask
  slot.view.width = mask.width
  slot.view.height = mask.height
  slot.w = w
  slot.h = h
  slot.dpr = dpr
}

/** Draw a decoded painting into the slot's ink canvas, cover-fit to the art box. */
export async function rasterise(slot: InkSlot, img: HTMLImageElement): Promise<void> {
  // no image decoding (jsdom): the pencil drawing stands on its own
  if (typeof img.decode !== "function") return
  await img.decode()
  const ink = document.createElement("canvas")
  ink.width = slot.view.width
  ink.height = slot.view.height
  ink.getContext("2d")?.drawImage(img, 0, 0, ink.width, ink.height)
  slot.ink = ink
  composite(slot)
}

/** Redraw the visible canvas (rect in backing px, or all of it). */
export function composite(slot: InkSlot, r?: { x: number; y: number; w: number; h: number }) {
  const v = slot.view.getContext("2d")
  if (!v || !slot.ink) return
  const { x, y, w, h } = r ?? { x: 0, y: 0, w: slot.view.width, h: slot.view.height }
  if (w <= 0 || h <= 0) return
  v.clearRect(x, y, w, h)
  v.globalCompositeOperation = "source-over"
  v.drawImage(slot.ink, x, y, w, h, x, y, w, h)
  if (slot.done) return
  v.globalCompositeOperation = "destination-in"
  v.drawImage(slot.mask, x, y, w, h, x, y, w, h)
  v.globalCompositeOperation = "source-over"
}

/** Stamp a soft brush at (lx, ly) in art-box px. Returns false if it missed. */
export function stamp(slot: InkSlot, lx: number, ly: number, r: number): boolean {
  if (slot.done || !slot.ink) return false
  if (lx < -r || ly < -r || lx > slot.w + r || ly > slot.h + r) return false
  const d = slot.dpr
  const m = slot.mask.getContext("2d")
  if (!m) return false
  const cx = lx * d
  const cy = ly * d
  const rr = r * d
  // a hand-laid wash: one soft core plus ragged satellite blobs, so the ink front is never a clean disc
  const blob = (bx: number, by: number, br: number, a: number) => {
    const g = m.createRadialGradient(bx, by, 0, bx, by, br)
    g.addColorStop(0, `rgba(0,0,0,${a})`)
    g.addColorStop(0.6, `rgba(0,0,0,${a * 0.6})`)
    g.addColorStop(1, "rgba(0,0,0,0)")
    m.fillStyle = g
    m.beginPath()
    m.arc(bx, by, br, 0, Math.PI * 2)
    m.fill()
  }
  blob(cx, cy, rr * 0.8, 0.95)
  for (let k = 0; k < 5; k++) {
    const ang = Math.random() * Math.PI * 2
    const dist = rr * (0.35 + Math.random() * 0.55)
    blob(cx + Math.cos(ang) * dist, cy + Math.sin(ang) * dist, rr * (0.22 + Math.random() * 0.25), 0.8)
  }
  const reach = rr * 1.4
  const x = Math.max(0, Math.floor(cx - reach))
  const y = Math.max(0, Math.floor(cy - reach))
  composite(slot, {
    x, y,
    w: Math.min(slot.view.width, Math.ceil(cx + reach)) - x,
    h: Math.min(slot.view.height, Math.ceil(cy + reach)) - y,
  })
  return true
}

/** Mark a slot fully inked and draw it whole. */
export function finish(slot: InkSlot) {
  slot.done = true
  composite(slot)
}
