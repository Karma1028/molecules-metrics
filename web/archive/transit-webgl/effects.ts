/* Lazy chunk entry: everything that pulls in three.js lives behind this file. */
import { glass } from "./glass"
import { paper } from "./paper"
import { reactor } from "./reactor"
import { shatter } from "./shatter"
import { preloadHorse } from "./horse"

export { captureViewport, OVERLAY_ATTR } from "./capture"

export const effects = { shatter, reactor, paper, glass } as const
export type EffectName = keyof typeof effects

export function warmUp() {
  preloadHorse()
}

export function canWebGL(): boolean {
  try {
    const c = document.createElement("canvas")
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"))
  } catch {
    return false
  }
}
