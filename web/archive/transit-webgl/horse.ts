/* Turns the Bankura horse motif (an alpha mask) into a cloud of 3D points:
   the silhouette gives x/y, and thickness grows with distance from the edge,
   so the shards settle into a rounded, sculpted horse rather than a cut-out. */

const MASK_URL = "/motifs/bankura-horse.webp"
const GRID = 140
const MAX_DEPTH = 0.3

export interface HorseCloud {
  /** xyz triples, centred, height ~1 */
  points: Float32Array
}

let cache: Promise<{ xs: number[]; ys: number[]; depth: number[] } | null> | null = null

function loadMask() {
  cache ??= new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const c = document.createElement("canvas")
      c.width = c.height = GRID
      const g = c.getContext("2d", { willReadFrequently: true })
      if (!g) return resolve(null)
      const s = Math.min(GRID / img.width, GRID / img.height)
      g.drawImage(img, (GRID - img.width * s) / 2, (GRID - img.height * s) / 2, img.width * s, img.height * s)
      const a = g.getImageData(0, 0, GRID, GRID).data
      const inside = new Uint8Array(GRID * GRID)
      for (let i = 0; i < inside.length; i++) inside[i] = a[i * 4 + 3] > 120 ? 1 : 0
      const dist = distanceToEdge(inside)
      const xs: number[] = []
      const ys: number[] = []
      const depth: number[] = []
      const maxD = Math.max(1, ...dist)
      for (let y = 0; y < GRID; y++)
        for (let x = 0; x < GRID; x++) {
          const k = y * GRID + x
          if (!inside[k]) continue
          xs.push(x / GRID - 0.5)
          ys.push(0.5 - y / GRID)
          depth.push(Math.sqrt(dist[k] / maxD))
        }
      resolve(xs.length ? { xs, ys, depth } : null)
    }
    img.onerror = () => resolve(null)
    img.src = MASK_URL
  })
  return cache
}

/** Chamfer distance from each inside pixel to the nearest outside pixel. */
function distanceToEdge(inside: Uint8Array): Uint16Array {
  const d = new Uint16Array(inside.length)
  const BIG = 9999
  for (let i = 0; i < d.length; i++) d[i] = inside[i] ? BIG : 0
  const at = (x: number, y: number) => (x < 0 || y < 0 || x >= GRID || y >= GRID ? 0 : d[y * GRID + x])
  for (let y = 0; y < GRID; y++)
    for (let x = 0; x < GRID; x++) {
      const k = y * GRID + x
      if (d[k]) d[k] = Math.min(d[k], at(x - 1, y) + 1, at(x, y - 1) + 1)
    }
  for (let y = GRID - 1; y >= 0; y--)
    for (let x = GRID - 1; x >= 0; x--) {
      const k = y * GRID + x
      if (d[k]) d[k] = Math.min(d[k], at(x + 1, y) + 1, at(x, y + 1) + 1)
    }
  return d
}

/** Starts loading the mask early so the transition never waits on it. */
export const preloadHorse = () => void loadMask()

/** `count` points spread over the horse volume, deterministic per index. */
export async function horseCloud(count: number): Promise<HorseCloud | null> {
  const m = await loadMask()
  if (!m) return null
  const points = new Float32Array(count * 3)
  const n = m.xs.length
  for (let i = 0; i < count; i++) {
    const k = Math.floor(hash(i * 3.17) * n)
    const z = (hash(i * 7.31) * 2 - 1) * MAX_DEPTH * m.depth[k]
    points[i * 3] = m.xs[k] + (hash(i * 1.9) - 0.5) / GRID
    points[i * 3 + 1] = m.ys[k] + (hash(i * 2.7) - 0.5) / GRID
    points[i * 3 + 2] = z
  }
  return { points }
}

function hash(x: number) {
  const s = Math.sin(x * 12.9898 + 78.233) * 43758.5453
  return s - Math.floor(s)
}
