/* Freezes what is on screen into a canvas so a transition can tear, fold or
   melt the real page instead of a stand-in. Pages here never scroll, so the
   viewport is the whole page. Anything that cannot be rasterised (embeds,
   videos, our own overlay) is skipped rather than failing the capture. */
import { domToCanvas } from "modern-screenshot"

const MAX_SCALE = 1.25
const TIMEOUT_MS = 2000
export const OVERLAY_ATTR = "data-transit-overlay"

const skip = (node: Node) => {
  if (!(node instanceof Element)) return true
  if (node.hasAttribute(OVERLAY_ATTR)) return false
  return !/^(IFRAME|VIDEO|AUDIO|OBJECT|EMBED)$/.test(node.tagName)
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), ms))])
}

/** Rasterises the current viewport. Resolves null when capture fails or is too slow. */
export async function captureViewport(scale = Math.min(window.devicePixelRatio || 1, MAX_SCALE)): Promise<HTMLCanvasElement | null> {
  const w = window.innerWidth
  const h = window.innerHeight
  const bg = getComputedStyle(document.body).backgroundColor
  try {
    return await withTimeout(
      domToCanvas(document.body, {
        width: w,
        height: h,
        scale,
        backgroundColor: bg && bg !== "rgba(0, 0, 0, 0)" ? bg : getComputedStyle(document.documentElement).backgroundColor,
        filter: skip,
        style: { margin: "0" },
      }),
      TIMEOUT_MS,
    )
  } catch {
    return null
  }
}
