/* Artist -> Analyst. The page dissolves into its own pixels, which drain into
   a glass distillation column, boil upward tray by tray (heating from page
   colour to amber), then condense out of the top and rain down into the pixels
   of the new page. Both ends are textured planes, so the edges are seamless. */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Points,
  ShaderMaterial,
  TorusGeometry,
  type Texture,
} from "three"
import { createStage, FOV, GLSL_COMMON, runLoop, smooth, type Effect, type EffectInput } from "./stage"

const DURATION = 2.5
const POINTS_DESKTOP = 24000
const POINTS_MOBILE = 9000
const CAPTURE_AT = 0.7
const COLUMN_R = 0.32
const COLUMN_H = 1.7
const TRAYS = 5
const HEAT = "#FFB454"
const GLASS = "#34D3C6"
const BACKDROP = "#0E151B"

const vertex = /* glsl */ `
  ${GLSL_COMMON}
  uniform float uT; uniform float uSize; uniform float uR; uniform float uH; uniform float uTrays;
  attribute vec2 aUv; attribute vec4 aRand;
  varying vec2 vUv; varying float vHeat; varying float vNew; varying float vAlpha;
  void main() {
    vec3 grid = position;
    float bottom = -uH * 0.5;
    float top = uH * 0.5;
    // drain: fall into the column base, swirling
    float d = sstep(0.12 + aRand.x * 0.35, 0.55 + aRand.x * 0.35, uT);
    float ang = aRand.y * 6.2832 + uT * (2.0 + aRand.z * 3.0);
    float rad = uR * (0.25 + 0.7 * sqrt(aRand.z));
    vec3 swirl = vec3(cos(ang) * rad, 0.0, sin(ang) * rad);
    vec3 pool = swirl + vec3(0.0, bottom + 0.05 + aRand.w * 0.08, 0.0);
    // boil: climb tray by tray, pausing on each
    float climb = clamp((uT - 0.85 - aRand.x * 0.25) / 0.85, 0.0, 1.0) * uTrays;
    float tray = floor(climb);
    float hop = sstep(0.55, 1.0, fract(climb));
    float level = min(tray + hop, uTrays) / uTrays;
    vec3 rise = swirl * (1.0 - 0.4 * level) + vec3(0.0, mix(bottom + 0.08, top, level), 0.0);
    rise.y += sin(uT * 20.0 + aRand.w * 30.0) * 0.012;
    // condense: spray from the top of the column onto the new page grid
    float c = sstep(1.75 + aRand.y * 0.3, 2.2 + aRand.y * 0.2, uT);
    vec3 arc = mix(vec3(swirl.x * 0.5, top, swirl.z * 0.5), grid, c);
    arc.z += sin(c * 3.14159) * (0.25 + aRand.w * 0.4);
    float boiling = step(0.85 + aRand.x * 0.25, uT);
    vec3 p = mix(mix(grid, pool, d), rise, boiling);
    p = mix(p, arc, step(1.75 + aRand.y * 0.3, uT));
    vHeat = boiling * level * (1.0 - c);
    vNew = c;
    vUv = aUv;
    vAlpha = 1.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize / -mv.z * mix(1.0, 0.55, d * (1.0 - c));
    gl_Position = projectionMatrix * mv;
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uFrom; uniform sampler2D uTo; uniform float uToReady; uniform vec3 uHeat;
  varying vec2 vUv; varying float vHeat; varying float vNew; varying float vAlpha;
  void main() {
    vec3 from = texture2D(uFrom, vUv).rgb;
    vec3 c = mix(from, uHeat * (0.7 + 0.6 * vHeat), vHeat * 0.85);
    vec3 next = texture2D(uTo, vUv).rgb;
    c = mix(c, next, vNew * uToReady);
    gl_FragColor = vec4(c, vAlpha);
    #include <colorspace_fragment>
  }
`

const glassVertex = /* glsl */ `
  varying vec3 vN; varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const glassFragment = /* glsl */ `
  uniform vec3 uColor; uniform float uOpacity;
  varying vec3 vN; varying vec3 vView;
  void main() {
    float f = pow(1.0 - abs(dot(vN, vView)), 2.2);
    gl_FragColor = vec4(uColor, (0.04 + f * 0.9) * uOpacity);
  }
`

export async function reactor(input: EffectInput): Promise<Effect> {
  const stage = createStage(input.canvas)
  const { planeW, planeH, scene, camera, renderer } = stage
  const target = stage.mobile ? POINTS_MOBILE : POINTS_DESKTOP
  const aspect = planeW / planeH
  const cols = Math.round(Math.sqrt(target * aspect))
  const rows = Math.round(cols / aspect)
  const n = cols * rows

  const pos = new Float32Array(n * 3)
  const uvs = new Float32Array(n * 2)
  const rand = new Float32Array(n * 4)
  for (let r = 0, i = 0; r < rows; r++)
    for (let c = 0; c < cols; c++, i++) {
      pos[i * 3] = -planeW / 2 + (planeW / cols) * (c + 0.5)
      pos[i * 3 + 1] = planeH / 2 - (planeH / rows) * (r + 0.5)
      uvs[i * 2] = (c + 0.5) / cols
      uvs[i * 2 + 1] = 1 - (r + 0.5) / rows
      for (let k = 0; k < 4; k++) rand[i * 4 + k] = Math.random()
    }
  const geo = new BufferGeometry()
  geo.setAttribute("position", new BufferAttribute(pos, 3))
  geo.setAttribute("aUv", new BufferAttribute(uvs, 2))
  geo.setAttribute("aRand", new BufferAttribute(rand, 4))

  const from = stage.texture(input.from)
  // point size in px at distance 1: one grid cell, slightly overdrawn so no gaps
  const pxPerUnit = (stage.h * renderer.getPixelRatio()) / (2 * Math.tan((FOV * Math.PI) / 360))
  const uniforms = {
    uT: { value: 0 },
    uSize: { value: (planeH / rows) * pxPerUnit * 1.25 },
    uR: { value: COLUMN_R },
    uH: { value: COLUMN_H },
    uTrays: { value: TRAYS },
    uFrom: { value: from as Texture },
    uTo: { value: from as Texture },
    uToReady: { value: 0 },
    uHeat: { value: new Color(HEAT) },
  }
  const mat = new ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: true, depthWrite: false })
  const cloud = new Points(geo, mat)
  cloud.frustumCulled = false

  // the real pages at both ends, so frame 0 and the last frame are exact
  const startMat = new MeshBasicMaterial({ map: from, transparent: true, depthWrite: false })
  const endMat = new MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  const plane = new PlaneGeometry(planeW, planeH)
  const start = new Mesh(plane, startMat)
  const end = new Mesh(plane, endMat)
  end.position.z = 0.001

  const backMat = new MeshBasicMaterial({ color: BACKDROP, transparent: true, opacity: 0, depthWrite: false })
  const back = new Mesh(new PlaneGeometry(planeW * 4, planeH * 4), backMat)
  back.position.z = -1

  const glassUniforms = { uColor: { value: new Color(GLASS) }, uOpacity: { value: 0 } }
  const glassMat = new ShaderMaterial({
    uniforms: glassUniforms,
    vertexShader: glassVertex,
    fragmentShader: glassFragment,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    blending: AdditiveBlending,
  })
  const column = new Mesh(new CylinderGeometry(COLUMN_R * 1.15, COLUMN_R * 1.15, COLUMN_H + 0.1, 48, 1, true), glassMat)
  const trayGeo = new TorusGeometry(COLUMN_R * 1.15, 0.008, 6, 64)
  const trays = Array.from({ length: TRAYS + 1 }, (_, k) => {
    const t = new Mesh(trayGeo, glassMat)
    t.rotation.x = Math.PI / 2
    t.position.y = -COLUMN_H / 2 + (COLUMN_H * k) / TRAYS
    return t
  })
  scene.add(back, column, ...trays, start, cloud, end)

  let requested = false
  let stop = () => {}
  const frame = (t: number) => {
    uniforms.uT.value = t
    if (!requested && t >= CAPTURE_AT) {
      requested = true
      input.captureNext().then((c) => {
        if (!c) return
        const tex = stage.texture(c)
        uniforms.uTo.value = tex
        uniforms.uToReady.value = 1
        endMat.map = tex
        endMat.needsUpdate = true
      })
    }
    startMat.opacity = 1 - smooth(0.05, 0.3, t)
    endMat.opacity = uniforms.uToReady.value * smooth(2.2, 2.45, t)
    backMat.opacity = 0.92 * smooth(0.05, 0.35, t) * (1 - smooth(2.15, 2.45, t))
    glassUniforms.uOpacity.value = smooth(0.3, 0.7, t) * (1 - smooth(1.9, 2.25, t))
    const dolly = Math.sin(Math.PI * smooth(0.1, 2.4, t))
    const yaw = 0.35 * Math.sin(Math.PI * smooth(0.4, 2.2, t))
    camera.position.set(Math.sin(yaw) * stage.fit * 0.4, dolly * 0.1, stage.fit + dolly * 0.9)
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
  }

  return {
    duration: DURATION,
    play(onDone) {
      stop = runLoop(DURATION, frame, onDone)
    },
    dispose() {
      stop()
      ;[geo, plane, back.geometry, column.geometry, trayGeo].forEach((g) => g.dispose())
      ;[mat, startMat, endMat, backMat, glassMat].forEach((m) => m.dispose())
      stage.dispose()
    },
  }
}
