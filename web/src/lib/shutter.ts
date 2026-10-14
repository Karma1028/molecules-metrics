/** Synthesised camera sounds for the Gallery lightbox — no audio asset files.
 *
 *  All sounds are generated with the Web Audio API on demand. The AudioContext
 *  is created lazily on the first call, which must happen inside a user gesture
 *  (the open-click) so browser autoplay policy is satisfied.
 *
 *  Mute state persists in localStorage. Callers also gate on prefers-reduced-
 *  motion before the first open; once unmuted by the user it simply plays.
 */

const STORE_KEY = "mm-gallery-sound"

let ctx: AudioContext | null = null
let noiseBuf: AudioBuffer | null = null
let muted = readMuted()

function readMuted(): boolean {
  try {
    return localStorage.getItem(STORE_KEY) === "off"
  } catch {
    return false
  }
}

export function isMuted(): boolean {
  return muted
}

export function setMuted(next: boolean): void {
  muted = next
  try {
    localStorage.setItem(STORE_KEY, next ? "off" : "on")
  } catch {
    /* storage unavailable — keep in-memory state only */
  }
}

/** Force the default (used once on first open to honour reduced-motion). */
export function primeDefault(soundOn: boolean): void {
  try {
    if (localStorage.getItem(STORE_KEY) == null) setMuted(!soundOn)
  } catch {
    muted = !soundOn
  }
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctx = new AC()
    }
    if (ctx.state === "suspended") void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function noise(c: AudioContext): AudioBuffer {
  if (noiseBuf) return noiseBuf
  const len = Math.floor(c.sampleRate * 0.4)
  const buf = c.createBuffer(1, len, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  noiseBuf = buf
  return buf
}

/** One filtered noise burst — the building block of a mechanical click. */
function click(c: AudioContext, at: number, dur: number, freq: number, gain: number, type: BiquadFilterType = "bandpass"): void {
  const src = c.createBufferSource()
  src.buffer = noise(c)
  const f = c.createBiquadFilter()
  f.type = type
  f.frequency.value = freq
  f.Q.value = 0.9
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(gain, at + 0.002)
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  src.connect(f).connect(g).connect(c.destination)
  src.start(at)
  src.stop(at + dur + 0.02)
}

/** Shutter clack + film-advance ratchet. Fired on lightbox open. */
export function shutterOpen(): void {
  if (muted) return
  const c = audio()
  if (!c) return
  const t = c.currentTime
  // mirror-up then shutter-close: two sharp clacks
  click(c, t, 0.045, 2600, 0.5)
  click(c, t + 0.05, 0.06, 1500, 0.42)
  // film-advance ratchet: descending rapid clicks
  for (let i = 0; i < 7; i++) {
    click(c, t + 0.14 + i * 0.03, 0.02, 1900 - i * 120, 0.18, "highpass")
  }
}

/** Soft single advance tick. Fired on prev/next step. */
export function advanceTick(): void {
  if (muted) return
  const c = audio()
  if (!c) return
  const t = c.currentTime
  click(c, t, 0.03, 1700, 0.28)
  click(c, t + 0.035, 0.02, 1200, 0.16, "highpass")
}

/** Pen / pencil scratch while the narrative writes itself in.
 *  `ms` matches the handwriting duration. Returns a stop() to cut it short. */
export function penScratch(ms: number): () => void {
  if (muted) return () => {}
  const c = audio()
  if (!c) return () => {}
  const t = c.currentTime
  const dur = Math.max(0.2, ms / 1000)
  const src = c.createBufferSource()
  src.buffer = noise(c)
  src.loop = true
  const f = c.createBiquadFilter()
  f.type = "bandpass"
  f.frequency.value = 3200
  f.Q.value = 0.6
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.07, t + 0.04)
  // wobble the gain so it reads as a moving nib, not steady hiss
  for (let i = 0; i < Math.floor(dur / 0.06); i++) {
    const tt = t + 0.04 + i * 0.06
    g.gain.setValueAtTime(0.03 + Math.random() * 0.05, tt)
  }
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(f).connect(g).connect(c.destination)
  src.start(t)
  src.stop(t + dur + 0.05)
  return () => {
    try {
      g.gain.cancelScheduledValues(c.currentTime)
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.05)
      src.stop(c.currentTime + 0.08)
    } catch {
      /* already stopped */
    }
  }
}
