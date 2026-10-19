import { CAMERA_ZOOM, MAP } from "../journey-stations"
import type { Box } from "./useFitScale"

/** Below this many screen px per map unit the whole plot is too small to read. */
const MIN_PX_PER_UNIT = 0.55

export interface Camera {
  viewBox: string
  /** screen px per map unit, used to size labels */
  ppu: number
}

/**
 * A viewBox shaped like the figure. Large figures show the whole plot (as before);
 * a short, wide figure (phones) becomes a strip map that pans to the live pin
 * instead of shrinking the plot past legibility.
 */
export function camera(box: Box, focus: readonly [number, number] | null): Camera {
  if (box.w <= 0 || box.h <= 0) return { viewBox: `0 0 ${MAP.w} ${MAP.h}`, ppu: 1 }
  const meet = Math.min(box.w / MAP.w, box.h / MAP.h)
  const slice = Math.max(box.w / MAP.w, box.h / MAP.h)
  const base = Math.min(slice, Math.max(meet, MIN_PX_PER_UNIT))
  const ppu = focus ? base * CAMERA_ZOOM : base
  const vw = box.w / ppu
  const vh = box.h / ppu
  const [cx, cy] = focus ?? [MAP.w / 2, MAP.h / 2]
  const place = (c: number, v: number, full: number) =>
    v >= full ? (full - v) / 2 : Math.min(full - v, Math.max(0, c - v / 2))
  const x = place(cx, vw, MAP.w)
  const y = place(cy, vh, MAP.h)
  return { viewBox: `${Math.round(x)} ${Math.round(y)} ${Math.round(vw)} ${Math.round(vh)}`, ppu }
}
