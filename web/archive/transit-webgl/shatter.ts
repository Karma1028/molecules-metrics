/* Analyst -> Artist. The page cracks into a few thousand shards of itself,
   the shards fly up and fuse into a lit terracotta Bankura horse, the horse
   gallops across, then bursts and every shard lands in its slot of the new
   page (re-skinned with a capture of it), so the hand-off to the DOM is exact. */
import {
  Color,
  InstancedBufferAttribute,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  ShaderMaterial,
  Texture,
  Vector2,
  Vector3,
} from "three"
import { horseCloud } from "./horse"
import { createStage, GLSL_COMMON, instancedQuad, runLoop, smooth, type Effect, type EffectInput } from "./stage"

const DURATION = 2.3
const SHARDS_DESKTOP = 2600
const SHARDS_MOBILE = 1100
const HORSE_SCALE = 1.35
const CAPTURE_AT = 0.75
const CLAY = "#b85c2e"
const BACKDROP = "#1b120c"

const vertex = /* glsl */ `
  ${GLSL_COMMON}
  uniform float uT; uniform float uR; uniform float uFlip; uniform float uHorseScale;
  uniform vec2 uCell; uniform vec2 uCellUv; uniform vec3 uGallop; uniform float uYaw; uniform float uRock;
  attribute vec2 aCell; attribute vec2 aUv; attribute vec3 aHorse; attribute vec4 aRand;
  varying vec2 vUv; varying float vShade; varying float vClay; varying float vMove; varying float vNew; varying float vBody;
  void main() {
    float wave = length(aCell) / uR;
    float e = sstep(0.10 + wave * 0.28 + aRand.x * 0.08, 0.55 + wave * 0.28 + aRand.x * 0.1, uT);
    float g = sstep(0.62 + aRand.y * 0.3, 1.12 + aRand.y * 0.3, uT);
    float b = sstep(1.62 + wave * 0.22 + aRand.z * 0.1, 2.05 + wave * 0.12 + aRand.z * 0.08, uT);
    vec3 grid = vec3(aCell, 0.0);
    vec2 dir = normalize(aCell + (aRand.xy - 0.5) * 0.5 + 0.0001);
    vec3 scatter = grid + vec3(dir * (0.2 + aRand.z * 0.8), 0.3 + aRand.w * 1.2);
    // the horse turns to a three-quarter view and rocks on each stride, so it reads as a sculpture
    vec3 hp = rotAxis(vec3(0.0, 0.0, 1.0), uRock) * (vec3(aHorse.x * uFlip, aHorse.y, aHorse.z) * uHorseScale);
    vec3 horse = rotAxis(vec3(0.0, 1.0, 0.0), uYaw) * hp + uGallop;
    // clay lit from upper front-left: thicker (nearer) parts and the back catch more light
    vBody = clamp(0.5 + aHorse.z * 2.2 + aHorse.y * 0.35 - aHorse.x * uFlip * 0.25, 0.15, 1.15);
    vec3 p = mix(mix(grid, scatter, e), horse, g);
    p = mix(p, grid, b) + vec3(0.0, 0.0, sin(b * 3.14159) * (0.35 + aRand.w * 0.7));
    vec3 ax = normalize(aRand.xyz - 0.5 + 0.001);
    float spin = (e * (1.0 - g) * (1.5 + aRand.x * 4.0) + sin(b * 3.14159) * (1.5 + aRand.y * 3.0)) * 3.14159;
    spin += g * (1.0 - b) * 0.5 * sin(uT * 9.0 + aRand.x * 6.28);
    mat3 R = rotAxis(ax, spin);
    float sc = mix(1.0, 0.5 + aRand.z * 0.3, g * (1.0 - b));
    vec3 local = R * vec3(position.xy * uCell * sc * 1.012, 0.0);
    vec3 n = R * vec3(0.0, 0.0, 1.0);
    vShade = 0.45 + 0.55 * max(abs(dot(n, normalize(vec3(0.45, 0.7, 1.0)))), 0.0);
    vClay = g * (1.0 - b);
    vMove = e * (1.0 - b);
    vNew = b;
    vUv = aUv + uv * uCellUv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p + local, 1.0);
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uFrom; uniform sampler2D uTo; uniform float uToReady; uniform vec3 uClay;
  varying vec2 vUv; varying float vShade; varying float vClay; varying float vMove; varying float vNew; varying float vBody;
  void main() {
    vec3 page = texture2D(uFrom, vUv).rgb * mix(1.0, vShade, vMove);
    float grain = fract(sin(dot(floor(vUv * 900.0), vec2(12.9898, 78.233))) * 43758.5453);
    vec3 clay = uClay * vBody * (0.6 + 0.6 * vShade) * (0.9 + 0.2 * grain);
    vec3 c = mix(page, clay, vClay);
    vec3 next = texture2D(uTo, vUv).rgb * mix(vShade, 1.0, vNew);
    c = mix(c, next, vNew * uToReady);
    float a = mix(1.0, 1.0 - vNew, 1.0 - uToReady);
    gl_FragColor = vec4(c, a);
    #include <colorspace_fragment>
  }
`

export async function shatter(input: EffectInput): Promise<Effect> {
  const stage = createStage(input.canvas)
  const { planeW, planeH, scene, camera, renderer } = stage
  const target = stage.mobile ? SHARDS_MOBILE : SHARDS_DESKTOP
  const aspect = planeW / planeH
  const cols = Math.max(8, Math.round(Math.sqrt(target * aspect)))
  const rows = Math.max(6, Math.round(cols / aspect))
  const n = cols * rows
  const horse = await horseCloud(n)

  const cell = new Float32Array(n * 2)
  const uvs = new Float32Array(n * 2)
  const rand = new Float32Array(n * 4)
  const cw = planeW / cols
  const ch = planeH / rows
  for (let r = 0, i = 0; r < rows; r++)
    for (let c = 0; c < cols; c++, i++) {
      cell[i * 2] = -planeW / 2 + cw * (c + 0.5)
      cell[i * 2 + 1] = planeH / 2 - ch * (r + 0.5)
      uvs[i * 2] = c / cols
      uvs[i * 2 + 1] = 1 - (r + 1) / rows
      for (let k = 0; k < 4; k++) rand[i * 4 + k] = Math.random()
    }

  const geo = instancedQuad(n)
  geo.setAttribute("aCell", new InstancedBufferAttribute(cell, 2))
  geo.setAttribute("aUv", new InstancedBufferAttribute(uvs, 2))
  geo.setAttribute("aHorse", new InstancedBufferAttribute(horse?.points ?? new Float32Array(n * 3), 3))
  geo.setAttribute("aRand", new InstancedBufferAttribute(rand, 4))

  const from = stage.texture(input.from)
  const uniforms = {
    uT: { value: 0 },
    uR: { value: Math.hypot(planeW / 2, planeH / 2) },
    uFlip: { value: -1 },
    uHorseScale: { value: horse ? Math.min(HORSE_SCALE, planeW * 0.7) : 0.01 },
    uCell: { value: new Vector2(cw, ch) },
    uCellUv: { value: new Vector2(1 / cols, 1 / rows) },
    uGallop: { value: new Vector3() },
    uYaw: { value: 0 },
    uRock: { value: 0 },
    uFrom: { value: from as Texture },
    uTo: { value: from as Texture },
    uToReady: { value: 0 },
    uClay: { value: new Color(CLAY) },
  }
  const mat = new ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: true, depthTest: true })
  const shards = new Mesh(geo, mat)
  shards.frustumCulled = false

  const backMat = new MeshBasicMaterial({ color: BACKDROP, transparent: true, opacity: 0, depthWrite: false })
  const back = new Mesh(new PlaneGeometry(planeW * 3, planeH * 3), backMat)
  back.position.z = -0.6
  scene.add(back, shards)

  let requested = false
  let stop = () => {}
  const frame = (t: number) => {
    uniforms.uT.value = t
    if (!requested && t >= CAPTURE_AT) {
      requested = true
      input.captureNext().then((c) => {
        if (!c) return
        uniforms.uTo.value = stage.texture(c)
        uniforms.uToReady.value = 1
      })
    }
    // gallop: the horse crosses right to left, bobbing on each stride
    const run = smooth(0.95, 1.75, t)
    const reach = Math.min(0.55, planeW * 0.22)
    uniforms.uGallop.value.set(reach - run * reach * 2, 0.06 * Math.abs(Math.sin(t * 11)) - 0.05, 0.15 * Math.sin(run * Math.PI))
    uniforms.uYaw.value = 0.85 - 1.1 * smooth(0.7, 1.7, t)
    uniforms.uRock.value = 0.1 * Math.sin(t * 11) * smooth(0.9, 1.1, t) * (1 - smooth(1.6, 1.8, t))
    backMat.opacity = 0.82 * smooth(0.15, 0.6, t) * (1 - smooth(1.65, 2.1, t))
    const orbit = Math.sin(Math.PI * smooth(0.3, 2.05, t))
    camera.position.set(orbit * 0.5, orbit * 0.22, stage.fit + orbit * 0.15)
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
      geo.dispose()
      mat.dispose()
      back.geometry.dispose()
      backMat.dispose()
      stage.dispose()
    },
  }
}
