import type { Point } from "../../lib/damp"

export interface Box {
  readonly left: number
  readonly top: number
  readonly width: number
  readonly bottom: number
}

/**
 * Where the artist ball rests when "passed" to a control: at its feet
 * (just under the bottom edge, so it never covers the label), sliding
 * k of the way along with the pointer like inkwell's 0.2 magnet.
 */
export function feetAim(box: Box, pointer: Point, k: number, r: number, gap: number): Point {
  const cx = box.left + box.width / 2
  return { x: cx + (pointer.x - cx) * k, y: box.bottom + r + gap }
}

/**
 * Degrees a ball of radius r turns while it travels (dx, dy): arc length / r.
 * Rolls clockwise when moving right (or down when there is no sideways motion).
 */
export function rollDegrees(dx: number, dy: number, r: number): number {
  const dist = Math.hypot(dx, dy)
  if (!dist || r <= 0) return 0
  const sign = Math.abs(dx) >= Math.abs(dy) * 0.25 ? Math.sign(dx) : Math.sign(dy)
  return (sign * dist / r) * (180 / Math.PI)
}

/** 0..1 strength of speed lines for a speed in px/ms. */
export function speedAmount(pxPerMs: number, full: number): number {
  if (!(pxPerMs > 0) || full <= 0) return 0
  return Math.min(1, pxPerMs / full)
}

/** Short, readable label for a control: aria-label, then title, then first line of text. */
export function labelOf(el: Element, max: number): string {
  const raw = el.getAttribute("aria-label") || el.getAttribute("title") || (el.textContent ?? "")
  const line = raw.split("\n").map((s) => s.trim()).find(Boolean) ?? ""
  const clean = line.replace(/\s+/g, " ")
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean
}
