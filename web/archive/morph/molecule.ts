/* Geometry for the world-switch morph: a caffeine molecule (the site's
   "molecules") and the unit bar chart its atoms re-form into ("metrics").
   Pure data, no three.js, so it stays testable and tree-shakes cleanly. */

export type Element = "C" | "N" | "O" | "H"
export type Vec3 = [number, number, number]

export interface Atom {
  el: Element
  pos: Vec3
}

export interface Molecule {
  atoms: Atom[]
  bonds: [number, number][]
}

const RING_R = 1.4
const SUB_LEN = 1.3
const H_LEN = 0.95
const DEG = Math.PI / 180

const ringVertex = (deg: number): Vec3 => [RING_R * Math.cos(deg * DEG), RING_R * Math.sin(deg * DEG), 0]

/** Point `len` out from `from`, along the direction away from `center`. */
function outward(from: Vec3, center: Vec3, len: number): Vec3 {
  const d = [from[0] - center[0], from[1] - center[1]]
  const n = Math.hypot(d[0], d[1]) || 1
  return [from[0] + (d[0] / n) * len, from[1] + (d[1] / n) * len, 0]
}

/** Three hydrogens around a methyl carbon, splayed in 3D so the molecule has depth when it spins. */
function methylHs(c: Vec3, away: Vec3): Vec3[] {
  const d = [c[0] - away[0], c[1] - away[1]]
  const n = Math.hypot(d[0], d[1]) || 1
  const [ux, uy] = [d[0] / n, d[1] / n]
  const [px, py] = [-uy, ux]
  const along = H_LEN * 0.34
  const side = H_LEN * 0.94
  return [0, 120, 240].map((a) => {
    const s = Math.cos(a * DEG) * side
    const z = Math.sin(a * DEG) * side
    return [c[0] + ux * along + px * s, c[1] + uy * along + py * s, z] as Vec3
  })
}

/** Caffeine, C8H10N4O2: a fused 6-ring + 5-ring (purine) with three methyls and two carbonyls. */
export function caffeine(): Molecule {
  const atoms: Atom[] = []
  const bonds: [number, number][] = []
  const add = (el: Element, pos: Vec3) => atoms.push({ el, pos }) - 1
  const bond = (a: number, b: number) => bonds.push([a, b])

  const hexC: Vec3 = [0, 0, 0]
  const c4 = add("C", ringVertex(-30))
  const c5 = add("C", ringVertex(30))
  const c6 = add("C", ringVertex(90))
  const n1 = add("N", ringVertex(150))
  const c2 = add("C", ringVertex(210))
  const n3 = add("N", ringVertex(270))
  ;[c4, c5, c6, n1, c2, n3].forEach((a, i, ring) => bond(a, ring[(i + 1) % ring.length]))

  // 5-ring fused on the C4-C5 edge
  const apothem = RING_R / (2 * Math.tan(36 * DEG))
  const circum = RING_R / (2 * Math.sin(36 * DEG))
  const pentC: Vec3 = [atoms[c4].pos[0] + apothem, 0, 0]
  const pent = (deg: number): Vec3 => [pentC[0] + circum * Math.cos(deg * DEG), circum * Math.sin(deg * DEG), 0]
  const n7 = add("N", pent(72))
  const c8 = add("C", pent(0))
  const n9 = add("N", pent(-72))
  bond(c5, n7)
  bond(n7, c8)
  bond(c8, n9)
  bond(n9, c4)

  const sub = (on: number, center: Vec3, el: Element, len = SUB_LEN) => {
    const a = add(el, outward(atoms[on].pos, center, len))
    bond(on, a)
    return a
  }
  sub(c6, hexC, "O")
  sub(c2, hexC, "O")
  sub(c8, pentC, "H", H_LEN)
  for (const [n, center] of [[n1, hexC], [n3, hexC], [n7, pentC]] as [number, Vec3][]) {
    const me = sub(n, center, "C")
    for (const h of methylHs(atoms[me].pos, atoms[n].pos)) bond(me, add("H", h))
  }

  // centre on the origin so it spins in place
  const mid = atoms.reduce((m, a) => [m[0] + a.pos[0], m[1] + a.pos[1], m[2] + a.pos[2]] as Vec3, [0, 0, 0])
  const k = 1 / atoms.length
  for (const a of atoms) a.pos = [a.pos[0] - mid[0] * k, a.pos[1] - mid[1] * k, a.pos[2] - mid[2] * k]
  return { atoms, bonds }
}

export interface Chart {
  cells: Vec3[]
  /** bar index for each cell, same order as `cells` */
  bar: number[]
  bars: number
  cell: number
}

/** A rising unit bar chart with exactly `units` cells, one per atom. Heights grow left to right. */
export function unitChart(units: number, bars = 6, cell = 0.82): Chart {
  const base = Math.floor(units / bars)
  const extra = units - base * bars
  // spread the remainder onto the right-hand bars, then tilt so the chart climbs
  const heights = Array.from({ length: bars }, (_, i) => base + (i >= bars - extra ? 1 : 0))
  const tilt = Math.min(base - 1, 2)
  for (let i = 0; i < Math.floor(bars / 2); i++) {
    const j = bars - 1 - i
    const shift = Math.max(0, Math.round(tilt * (1 - i / bars)))
    heights[i] -= shift
    heights[j] += shift
  }
  const cells: Vec3[] = []
  const bar: number[] = []
  const tallest = Math.max(...heights)
  const gap = cell * 0.45
  const width = bars * cell + (bars - 1) * gap
  heights.forEach((h, b) => {
    for (let lvl = 0; lvl < h; lvl++) {
      cells.push([b * (cell + gap) - width / 2 + cell / 2, lvl * cell - (tallest * cell) / 2 + cell / 2, 0])
      bar.push(b)
    }
  })
  return { cells, bar, bars, cell }
}

/** Pairs atoms with chart cells: heavy atoms take the low cells, hydrogens the tops, so the build reads bottom-up. */
export function assignCells(atoms: Atom[], chart: Chart): number[] {
  const order = atoms.map((a, i) => ({ i, w: a.el === "H" ? 1 : 0, x: a.pos[0] }))
  order.sort((p, q) => p.w - q.w || p.x - q.x)
  const cellOrder = chart.cells.map((c, j) => ({ j, y: c[1], x: c[0] })).sort((p, q) => p.y - q.y || p.x - q.x)
  const out = new Array<number>(atoms.length)
  order.forEach((o, k) => (out[o.i] = cellOrder[k].j))
  return out
}
