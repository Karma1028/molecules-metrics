/**
 * Ceiling fan for the hostel rooms, synthesised in the browser so nothing is
 * downloaded: a band of filtered noise for the air, a low hum for the motor,
 * and a slow wobble on the air level for the blades going round. Starts only
 * from a tap (browsers block audio before a gesture) and fades in and out.
 */
const FADE_S = 0.6
const AIR_LEVEL = 0.18
const HUM_HZ = 98
const HUM_LEVEL = 0.025
const BLADE_HZ = 3.2
const BLADE_DEPTH = 0.05
const NOISE_SECONDS = 2

export interface Fan {
  stop: () => void
}

function noiseBuffer(ctx: AudioContext): AudioBuffer {
  const buf = ctx.createBuffer(1, ctx.sampleRate * NOISE_SECONDS, ctx.sampleRate)
  const data = buf.getChannelData(0)
  // brown-ish noise: integrated white noise sounds like moving air, not hiss
  let last = 0
  for (let i = 0; i < data.length; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
    data[i] = last * 3.5
  }
  return buf
}

export function startFan(): Fan | null {
  const Ctx = typeof window !== "undefined" ? window.AudioContext : undefined
  if (!Ctx) return null
  const ctx = new Ctx()
  const out = ctx.createGain()
  out.gain.setValueAtTime(0, ctx.currentTime)
  out.gain.linearRampToValueAtTime(1, ctx.currentTime + FADE_S)
  out.connect(ctx.destination)

  const air = ctx.createBufferSource()
  air.buffer = noiseBuffer(ctx)
  air.loop = true
  const band = ctx.createBiquadFilter()
  band.type = "lowpass"
  band.frequency.value = 700
  const airGain = ctx.createGain()
  airGain.gain.value = AIR_LEVEL
  air.connect(band).connect(airGain).connect(out)

  const blade = ctx.createOscillator()
  blade.frequency.value = BLADE_HZ
  const bladeDepth = ctx.createGain()
  bladeDepth.gain.value = BLADE_DEPTH
  blade.connect(bladeDepth).connect(airGain.gain)

  const hum = ctx.createOscillator()
  hum.type = "triangle"
  hum.frequency.value = HUM_HZ
  const humGain = ctx.createGain()
  humGain.gain.value = HUM_LEVEL
  hum.connect(humGain).connect(out)

  air.start()
  blade.start()
  hum.start()

  return {
    stop() {
      const t = ctx.currentTime
      out.gain.cancelScheduledValues(t)
      out.gain.setValueAtTime(out.gain.value, t)
      out.gain.linearRampToValueAtTime(0, t + FADE_S)
      window.setTimeout(() => void ctx.close().catch(() => undefined), FADE_S * 1000 + 50)
    },
  }
}
