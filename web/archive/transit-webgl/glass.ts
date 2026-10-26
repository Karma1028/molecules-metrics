/* Analyst sections. The page is printed on a row of glass blinds; they turn
   open left to right, each slat catching a glint as it goes edge-on, and the
   new page is behind them (the canvas is transparent between slats). */
import { Color, DoubleSide, InstancedBufferAttribute, Mesh, ShaderMaterial, type Texture } from "three"
import { createStage, GLSL_COMMON, instancedQuad, runLoop, type Effect, type EffectInput } from "./stage"

const DURATION = 1.15
const SLATS_DESKTOP = 16
const SLATS_MOBILE = 7
const TINT = "#34D3C6"

const vertex = /* glsl */ `
  ${GLSL_COMMON}
  uniform float uT; uniform float uSlats; uniform float uW; uniform float uH;
  attribute float aIdx;
  varying vec2 vUv; varying float vGlint; varying float vTurn;
  void main() {
    float f = aIdx / max(uSlats - 1.0, 1.0);
    float turn = sstep(0.05 + f * 0.45, 0.55 + f * 0.45, uT);
    float a = turn * 1.5708;
    float sw = uW / uSlats;
    vec3 local = vec3(position.x * sw, position.y * uH, 0.0);
    local = vec3(local.x * cos(a), local.y, -local.x * sin(a));
    float cx = -uW * 0.5 + sw * (aIdx + 0.5);
    vUv = vec2((aIdx + position.x + 0.5) / uSlats, position.y + 0.5);
    vGlint = pow(sin(turn * 3.14159), 6.0);
    vTurn = turn;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(local + vec3(cx, 0.0, 0.0), 1.0);
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uFrom; uniform vec3 uTint;
  varying vec2 vUv; varying float vGlint; varying float vTurn;
  void main() {
    vec3 c = gl_FrontFacing ? texture2D(uFrom, vUv).rgb : uTint * 0.4;
    c = mix(c, uTint, 0.18 * vTurn);
    float band = smoothstep(0.35, 0.5, fract(vUv.y * 0.5 + vTurn)) * (1.0 - smoothstep(0.5, 0.65, fract(vUv.y * 0.5 + vTurn)));
    c += vec3(0.6, 0.9, 0.95) * vGlint * (0.25 + 0.5 * band);
    gl_FragColor = vec4(c, 1.0 - smoothstep(0.85, 1.0, vTurn));
    #include <colorspace_fragment>
  }
`

export async function glass(input: EffectInput): Promise<Effect> {
  const stage = createStage(input.canvas)
  const { planeW, planeH, scene, camera, renderer } = stage
  const slats = stage.mobile ? SLATS_MOBILE : SLATS_DESKTOP
  const geo = instancedQuad(slats)
  geo.setAttribute("aIdx", new InstancedBufferAttribute(Float32Array.from({ length: slats }, (_, i) => i), 1))
  const uniforms = {
    uT: { value: 0 },
    uSlats: { value: slats },
    uW: { value: planeW },
    uH: { value: planeH },
    uFrom: { value: stage.texture(input.from) as Texture },
    uTint: { value: new Color(TINT) },
  }
  const mat = new ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: true, side: DoubleSide })
  const blinds = new Mesh(geo, mat)
  blinds.frustumCulled = false
  scene.add(blinds)

  let stop = () => {}
  const frame = (t: number) => {
    uniforms.uT.value = t
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
      stage.dispose()
    },
  }
}
