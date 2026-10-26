import { useEffect, useState } from "react"

/** Colours lifted from an album cover: a deep room tone, a readable ink, a vivid accent. */
export interface Palette {
  bg: string
  fg: string
  accent: string
}

const SAMPLE = 12

function getFallbackAccent(): string {
  if (typeof window !== "undefined") {
    const val =
      getComputedStyle(document.documentElement).getPropertyValue("--terracotta-500").trim() ||
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()
    if (val) return val
  }
  return "#b85c2e"
}

export function getVoidPalette(): Palette {
  return { bg: "#0b0b0d", fg: "#f2ede3", accent: getFallbackAccent() }
}

export const VOID_PALETTE: Palette = { bg: "#0b0b0d", fg: "#f2ede3", accent: "#b85c2e" }

function averageOf(img: HTMLImageElement): [number, number, number] | null {
  const c = document.createElement("canvas")
  c.width = c.height = SAMPLE
  const ctx = c.getContext("2d")
  if (!ctx) return null
  ctx.drawImage(img, 0, 0, SAMPLE, SAMPLE)
  const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE)
  let r = 0, g = 0, b = 0, n = 0
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
    n++
  }
  return [Math.round(r / n), Math.round(g / n), Math.round(b / n)]
}

/** Average an album image down to a representative {bg,fg,accent}. */
export function sampleArt(url: string): Promise<Palette> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      try {
        const avg = averageOf(img)
        if (!avg) return resolve(getVoidPalette())
        const [r, g, b] = avg
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        // darken toward a near-black room, keep a vivid accent from the art
        const bg = `rgb(${Math.round(r * 0.28)},${Math.round(g * 0.28)},${Math.round(b * 0.28)})`
        const fg = lum > 0.5 ? "#f6f2ea" : "#fbf7ee"
        const accent = `rgb(${Math.min(255, r + 60)},${Math.min(255, g + 50)},${Math.min(255, b + 40)})`
        resolve({ bg, fg, accent })
      } catch {
        resolve(getVoidPalette()) // tainted canvas / CORS → safe default
      }
    }
    img.onerror = () => resolve(getVoidPalette())
    img.src = url
  })
}

/** Palette for a cover URL; null until sampled (or when there is no art). */
export function useArtPalette(url: string | null | undefined): Palette | null {
  const [pal, setPal] = useState<Palette | null>(null)
  useEffect(() => {
    setPal(null)
    if (!url) return
    let alive = true
    sampleArt(url).then((p) => alive && setPal(p))
    return () => {
      alive = false
    }
  }, [url])
  return pal
}
