/* Artist sections. The page is a letter: the bottom third folds up, the top
   third folds down over it, and the folded sheet is tossed away. The canvas is
   transparent wherever the paper is not, so the new page is already there
   underneath as the letter leaves. */
import { Color, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, type Texture } from "three"
import { createStage, GLSL_COMMON, runLoop, smooth, type Effect, type EffectInput } from "./stage"

const DURATION = 1.45
const BACK = "#f4ead9"
const SEGMENTS_Y = 90

const vertex = /* glsl */ `
  ${GLSL_COMMON}
  uniform float uBottom; uniform float uTop; uniform float uH;
  varying vec2 vUv; varying float vShade;
  void main() {
    float third = uH / 6.0;
    vec3 p = position;
    float shade = 1.0;
    if (p.y < -third) {
      float rel = p.y + third;
      float a = uBottom * 3.14159;
      p.y = -third + rel * cos(a);
      p.z = -rel * sin(a) + 0.004 * uBottom;
      shade = 0.82 + 0.18 * abs(cos(a));
    } else if (p.y > third) {
      float rel = p.y - third;
      float a = uTop * 3.14159;
      p.y = third + rel * cos(a);
      p.z = rel * sin(a) + 0.008 * uTop;
      shade = 0.82 + 0.18 * abs(cos(a));
    }
    vUv = uv;
    vShade = shade;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uFrom; uniform vec3 uBack;
  varying vec2 vUv; varying float vShade;
  void main() {
    vec3 c = gl_FrontFacing ? texture2D(uFrom, vUv).rgb : uBack * 0.94;
    float grain = fract(sin(dot(floor(vUv * 700.0), vec2(12.9898, 78.233))) * 43758.5453);
    c *= vShade * (0.98 + 0.04 * grain);
    gl_FragColor = vec4(c, 1.0);
    #include <colorspace_fragment>
  }
`

export async function paper(input: EffectInput): Promise<Effect> {
  const stage = createStage(input.canvas)
  const { planeW, planeH, scene, camera, renderer } = stage
  const from = stage.texture(input.from)
  const uniforms = {
    uBottom: { value: 0 },
    uTop: { value: 0 },
    uH: { value: planeH },
    uFrom: { value: from as Texture },
    uBack: { value: new Color(BACK) },
  }
  const geo = new PlaneGeometry(planeW, planeH, 1, SEGMENTS_Y)
  const mat = new ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: fragment, side: DoubleSide })
  const sheet = new Mesh(geo, mat)
  scene.add(sheet)

  let stop = () => {}
  const frame = (t: number) => {
    uniforms.uBottom.value = smooth(0.06, 0.5, t) * 0.985
    uniforms.uTop.value = smooth(0.32, 0.78, t) * 0.97
    // toss: lift, spin and fly up and off to the right
    const toss = smooth(0.72, DURATION, t)
    const ease = toss * toss
    sheet.position.set(ease * planeW * 0.9, ease * planeH * 0.9 - Math.sin(toss * Math.PI) * 0.12, Math.sin(toss * Math.PI) * 0.6)
    sheet.rotation.set(-toss * 0.5, toss * 0.4, -ease * 0.9)
    sheet.scale.setScalar(1 - 0.35 * smooth(0.5, 1.0, t))
    camera.position.set(0, 0, stage.fit)
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
      stage.dispose()
    },
  }
}
