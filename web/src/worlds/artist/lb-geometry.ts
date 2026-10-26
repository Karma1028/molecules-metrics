/** Hand-drawn leader geometry for the gallery lightbox annotations. Pure, so it can be tested. */

/** Deterministic pseudo-random in -1..1 from an integer seed (stable per frame,
 *  so the hand-drawn wobble never reflows between renders). */
export function jit(seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return (s - Math.floor(s)) * 2 - 1
}

const f1 = (n: number) => n.toFixed(1)
const HEAD_LEN = 13
const HEAD_SPREAD = 0.45 // radians each wing leans off the shaft

interface Curve {
  c1: [number, number]
  c2: [number, number]
  end: [number, number]
}

function curve(ax: number, ay: number, tx: number, ty: number, seed: number, gap: number): Curve {
  const dx = tx - ax
  const dy = ty - ay
  const L = Math.hypot(dx, dy) || 1
  const px = -dy / L // unit perpendicular
  const py = dx / L
  const bow = Math.min(30, L * 0.2) * (jit(seed) > 0 ? 1 : -1) // which way it bows
  const w1 = bow * (0.9 + jit(seed + 1) * 0.3)
  const w2 = bow * (0.3 + jit(seed + 2) * 0.25)
  return {
    c1: [ax + dx * 0.33 + px * w1, ay + dy * 0.33 + py * w1],
    c2: [ax + dx * 0.66 + px * w2, ay + dy * 0.66 + py * w2],
    end: [tx - (dx / L) * gap, ty - (dy / L) * gap],
  }
}

function shaftOf(ax: number, ay: number, c: Curve): string {
  return `M ${f1(ax)} ${f1(ay)} C ${f1(c.c1[0])} ${f1(c.c1[1])} ${f1(c.c2[0])} ${f1(c.c2[1])} ${f1(c.end[0])} ${f1(c.end[1])}`
}

/** A wobbly shaft from (ax,ay) toward (tx,ty), stopping `gap` px short of the target. */
export function shaftPath(ax: number, ay: number, tx: number, ty: number, seed: number, gap = 3): string {
  return shaftOf(ax, ay, curve(ax, ay, tx, ty, seed, gap))
}

/**
 * Shaft plus an open arrowhead. The head follows the shaft's FINAL tangent (the
 * last control point into the tip), not the straight chord, so a bowed shaft
 * never ends in a crooked head.
 */
export function arrowPaths(
  ax: number,
  ay: number,
  tx: number,
  ty: number,
  seed: number,
  gap = 3,
): { shaft: string; head: string; tangent: { x: number; y: number } } {
  const c = curve(ax, ay, tx, ty, seed, gap)
  const dx = tx - c.c2[0]
  const dy = ty - c.c2[1]
  const L = Math.hypot(dx, dy) || 1
  const ux = dx / L
  const uy = dy / L
  const cos = Math.cos(HEAD_SPREAD)
  const sin = Math.sin(HEAD_SPREAD)
  const a1: [number, number] = [tx - (ux * cos - uy * sin) * HEAD_LEN, ty - (uy * cos + ux * sin) * HEAD_LEN]
  const a2: [number, number] = [tx - (ux * cos + uy * sin) * HEAD_LEN, ty - (uy * cos - ux * sin) * HEAD_LEN]
  return {
    shaft: shaftOf(ax, ay, c),
    head: `M ${f1(a1[0])} ${f1(a1[1])} L ${f1(tx)} ${f1(ty)} L ${f1(a2[0])} ${f1(a2[1])}`,
    tangent: { x: ux, y: uy },
  }
}
