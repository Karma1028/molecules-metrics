/* Shared three.js stage for page transitions. The camera is fitted so a plane
   of height 2 at z = 0 covers the viewport exactly: frame zero of every effect
   is pixel-for-pixel the page that was just captured. */
import { CanvasTexture, InstancedBufferGeometry, LinearFilter, PlaneGeometry, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer, type Texture } from "three"

export const FOV = 40
const MAX_DPR = 1.5

export interface Stage {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  /** viewport in CSS px */
  w: number
  h: number
  /** plane size in world units (height is always 2) */
  planeW: number
  planeH: number
  /** camera distance that fits the plane */
  fit: number
  mobile: boolean
  texture(src: HTMLCanvasElement): Texture
  dispose(): void
}

export function createStage(canvas: HTMLCanvasElement): Stage {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: false, powerPreference: "high-performance" })
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR))
  renderer.setSize(w, h, false)
  renderer.setClearColor(0x000000, 0)

  const aspect = w / h
  const camera = new PerspectiveCamera(FOV, aspect, 0.01, 100)
  const fit = 1 / Math.tan((FOV * Math.PI) / 360)
  camera.position.set(0, 0, fit)
  camera.lookAt(0, 0, 0)

  const textures: Texture[] = []
  return {
    renderer,
    scene: new Scene(),
    camera,
    w,
    h,
    planeW: 2 * aspect,
    planeH: 2,
    fit,
    mobile: w < 700,
    texture(src) {
      const t = new CanvasTexture(src)
      t.colorSpace = SRGBColorSpace
      t.minFilter = LinearFilter
      t.generateMipmaps = false
      textures.push(t)
      return t
    },
    dispose() {
      textures.forEach((t) => t.dispose())
      renderer.dispose()
    },
  }
}

export interface EffectInput {
  /** overlay canvas the effect renders into */
  canvas: HTMLCanvasElement
  /** the page as it was when the link was clicked */
  from: HTMLCanvasElement
  /** rasterises the destination page once it has rendered under the overlay */
  captureNext: () => Promise<HTMLCanvasElement | null>
}

export interface Effect {
  /** seconds, used by the overlay for its closing fade */
  duration: number
  play(onDone: () => void): void
  dispose(): void
}

/** Runs `frame(t)` on rAF for `duration` seconds, then calls `onDone`. Returns a stop function. */
export function runLoop(duration: number, frame: (t: number) => void, onDone: () => void): () => void {
  let raf = 0
  let stopped = false
  // the clock starts on the first tick after frame 0, so shader compilation
  // (done by that first render) never eats into the animation
  let t0 = -1
  const tick = (now: number) => {
    if (stopped) return
    if (t0 < 0) t0 = now
    const t = Math.min((now - t0) / 1000, duration)
    frame(t)
    if (t < duration) raf = requestAnimationFrame(tick)
    else onDone()
  }
  frame(0)
  raf = requestAnimationFrame(tick)
  return () => {
    stopped = true
    cancelAnimationFrame(raf)
  }
}

export const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/** A unit quad (x, y in -0.5..0.5) ready for per-instance attributes. */
export function instancedQuad(count: number): InstancedBufferGeometry {
  const quad = new PlaneGeometry(1, 1)
  const geo = new InstancedBufferGeometry()
  geo.index = quad.index
  for (const k of ["position", "uv", "normal"]) geo.setAttribute(k, quad.getAttribute(k))
  geo.instanceCount = count
  return geo
}

/** GLSL helpers shared by the effect shaders. */
export const GLSL_COMMON = /* glsl */ `
  float sstep(float a, float b, float x) { float t = clamp((x - a) / (b - a), 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
  mat3 rotAxis(vec3 ax, float a) {
    float s = sin(a), c = cos(a), oc = 1.0 - c;
    return mat3(oc*ax.x*ax.x + c, oc*ax.x*ax.y + ax.z*s, oc*ax.z*ax.x - ax.y*s,
                oc*ax.x*ax.y - ax.z*s, oc*ax.y*ax.y + c, oc*ax.y*ax.z + ax.x*s,
                oc*ax.z*ax.x + ax.y*s, oc*ax.y*ax.z - ax.x*s, oc*ax.z*ax.z + c);
  }
`
