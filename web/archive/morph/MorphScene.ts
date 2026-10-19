/* The world-switch wow: a spinning caffeine molecule whose atoms break their
   bonds and re-stack as a rising bar chart (to analyst), or the reverse (to
   artist). Plain three.js, imperative, one render loop that lives only for the
   length of the transition. Loaded lazily; WorldTransition falls back to the
   horse wipe when this chunk or WebGL is missing. */
import {
  AmbientLight,
  BoxGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  PerspectiveCamera,
  Quaternion,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three"
import { assignCells, caffeine, unitChart, type Element, type Vec3 } from "./molecule"

export type MorphDirection = "to-analyst" | "to-artist"

/** Seconds. The overlay fade in WorldTransition reads these too. */
export const MORPH_TIMING = {
  total: 2.4,
  morphStart: 0.55,
  morphEnd: 1.6,
} as const

const FOV = 34
const FIT_W = 10.4
const FIT_H = 10.2
const BOND_R = 0.09
const STAGGER = 0.38
const CAMERA_AZ = 0.62
const CAMERA_EL = 0.34
const SPIN = 1.15

const RADIUS: Record<Element, number> = { C: 0.42, N: 0.4, O: 0.4, H: 0.25 }
const TINT: Record<Element, string> = { C: "#f4ead9", N: "#8fb3d6", O: "#e8b04b", H: "#e7c9ad" }
const BOND_TINT = "#f1dcc4"

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const span = (t: number, a: number, b: number) => clamp01((t - a) / (b - a))

export function canWebGL(): boolean {
  try {
    const c = document.createElement("canvas")
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"))
  } catch {
    return false
  }
}

export interface Morph {
  play(onDone: () => void): void
  dispose(): void
}

export function createMorph(canvas: HTMLCanvasElement, direction: MorphDirection): Morph {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  const width = canvas.clientWidth || window.innerWidth
  const height = canvas.clientHeight || window.innerHeight
  renderer.setSize(width, height, false)

  const aspect = width / height
  const camera = new PerspectiveCamera(FOV, aspect, 0.1, 200)
  const halfTan = Math.tan((FOV * Math.PI) / 360)
  const dist = Math.max(FIT_H / 2 / halfTan, FIT_W / 2 / (halfTan * aspect))

  const scene = new Scene()
  scene.add(new AmbientLight(0xffffff, 0.75))
  const key = new DirectionalLight(0xffffff, 1.9)
  key.position.set(5, 8, 10)
  scene.add(key)
  const rim = new DirectionalLight(0xffd9b0, 0.7)
  rim.position.set(-6, -3, -4)
  scene.add(rim)

  const mol = caffeine()
  const chart = unitChart(mol.atoms.length)
  const cellOf = assignCells(mol.atoms, chart)
  const n = mol.atoms.length
  // atoms bound for low cells leave first, so the chart builds bottom-up
  const rank = cellOf.map((c) => chart.cells[c][1])
  const lo = Math.min(...rank)
  const hi = Math.max(...rank)
  const delay = rank.map((y) => ((y - lo) / (hi - lo || 1)) * STAGGER)

  const sphereGeo = new SphereGeometry(1, 28, 20)
  const boxGeo = new BoxGeometry(chart.cell * 0.9, chart.cell * 0.9, chart.cell * 0.9)
  const bondGeo = new CylinderGeometry(1, 1, 1, 12)
  const mat = new MeshStandardMaterial({ roughness: 0.42, metalness: 0.06 })
  const bondMat = new MeshStandardMaterial({ color: BOND_TINT, roughness: 0.5, metalness: 0 })

  const spheres = new InstancedMesh(sphereGeo, mat, n)
  const boxes = new InstancedMesh(boxGeo, mat, n)
  const bonds = new InstancedMesh(bondGeo, bondMat, mol.bonds.length)
  const color = new Color()
  mol.atoms.forEach((a, i) => {
    color.set(TINT[a.el])
    spheres.setColorAt(i, color)
    boxes.setColorAt(i, color)
  })
  scene.add(spheres, boxes, bonds)

  const m4 = new Matrix4()
  const q = new Quaternion()
  const up = new Vector3(0, 1, 0)
  const pos = mol.atoms.map(() => new Vector3())
  const a = new Vector3()
  const b = new Vector3()
  const s = new Vector3()

  const rotY = (p: Vec3, ang: number, out: Vector3) => {
    const c = Math.cos(ang)
    const sn = Math.sin(ang)
    return out.set(p[0] * c + p[2] * sn, p[1], -p[0] * sn + p[2] * c)
  }

  /** Lays the scene out at analyst-order time `st` (molecule first, chart last). */
  function frame(st: number) {
    const { morphStart, morphEnd } = MORPH_TIMING
    const morphLen = morphEnd - morphStart
    const spin = st * SPIN
    for (let i = 0; i < n; i++) {
      const p = easeInOut(span(st, morphStart + delay[i] * morphLen, morphEnd - (STAGGER - delay[i]) * morphLen))
      rotY(mol.atoms[i].pos, spin, a)
      const cell = chart.cells[cellOf[i]]
      b.set(cell[0], cell[1], cell[2])
      // a little arc out of the plane so atoms visibly fly rather than slide
      pos[i].lerpVectors(a, b, p).z += Math.sin(p * Math.PI) * 1.6
      const morphed = span(p, 0.55, 1)
      const r = RADIUS[mol.atoms[i].el] * (1 - morphed)
      m4.compose(pos[i], q.identity(), s.setScalar(Math.max(r, 1e-4)))
      spheres.setMatrixAt(i, m4)
      m4.compose(pos[i], q.identity(), s.setScalar(Math.max(morphed, 1e-4)))
      boxes.setMatrixAt(i, m4)
    }
    const bondScale = 1 - span(st, morphStart - 0.1, morphStart + 0.2)
    mol.bonds.forEach(([i, j], k) => {
      a.subVectors(pos[j], pos[i])
      const len = a.length()
      q.setFromUnitVectors(up, a.normalize())
      b.addVectors(pos[i], pos[j]).multiplyScalar(0.5)
      const r = Math.max(BOND_R * bondScale, 1e-4)
      m4.compose(b, q, s.set(r, len, r))
      bonds.setMatrixAt(k, m4)
    })
    spheres.instanceMatrix.needsUpdate = true
    boxes.instanceMatrix.needsUpdate = true
    bonds.instanceMatrix.needsUpdate = true

    const cam = easeInOut(span(st, morphStart - 0.2, morphEnd + 0.3))
    const az = cam * CAMERA_AZ
    const el = 0.06 + cam * (CAMERA_EL - 0.06)
    camera.position.set(Math.sin(az) * Math.cos(el) * dist, Math.sin(el) * dist, Math.cos(az) * Math.cos(el) * dist)
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
  }

  let raf = 0
  let disposed = false
  const toScene = (t: number) => (direction === "to-analyst" ? t : MORPH_TIMING.total - t)

  return {
    play(onDone) {
      const t0 = performance.now()
      const tick = (now: number) => {
        if (disposed) return
        const t = Math.min((now - t0) / 1000, MORPH_TIMING.total)
        frame(toScene(t))
        if (t < MORPH_TIMING.total) raf = requestAnimationFrame(tick)
        else onDone()
      }
      frame(toScene(0))
      raf = requestAnimationFrame(tick)
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(raf)
      sphereGeo.dispose()
      boxGeo.dispose()
      bondGeo.dispose()
      mat.dispose()
      bondMat.dispose()
      spheres.dispose()
      boxes.dispose()
      bonds.dispose()
      // no forceContextLoss: a StrictMode remount reuses this canvas, and a lost context cannot be revived
      renderer.dispose()
    },
  }
}
