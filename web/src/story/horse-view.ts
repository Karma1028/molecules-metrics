export type HorseView = "front" | "three-quarter" | "side" | "back"

export interface HorsePick {
  view: HorseView
  /** true when the pointer is left of the horse: kit sprites face right, so mirror */
  flip: boolean
}

/** inside this radius the horse looks straight at the visitor */
export const HORSE_NEAR_PX = 120
/** elevation (deg) below which the pointer reads as level: pure profile */
const SIDE_MAX_DEG = 20
/** elevation (deg) above which the horse turns its back (pointer far above) */
const BACK_MIN_DEG = 55
/** a held view survives this far past its boundary, so a pointer resting on an edge does not flicker */
const HOLD_DEG = 6
const HOLD_PX = 16

const toDeg = (rad: number) => (rad * 180) / Math.PI

/** does `view` still fit the pointer once its boundaries are widened by the hold band? */
function stillFits(view: HorseView, dist: number, elevation: number): boolean {
  const abs = Math.abs(elevation)
  switch (view) {
    case "front":
      return dist < HORSE_NEAR_PX + HOLD_PX || elevation <= -(BACK_MIN_DEG - HOLD_DEG)
    case "back":
      return dist >= HORSE_NEAR_PX - HOLD_PX && elevation >= BACK_MIN_DEG - HOLD_DEG
    case "side":
      return dist >= HORSE_NEAR_PX - HOLD_PX && abs <= SIDE_MAX_DEG + HOLD_DEG
    case "three-quarter":
      return dist >= HORSE_NEAR_PX - HOLD_PX && abs > SIDE_MAX_DEG - HOLD_DEG && abs < BACK_MIN_DEG + HOLD_DEG
  }
}

/**
 * Pick which turnaround view of the horse to show for a pointer offset
 * (dx, dy in px, y down) from the horse's centre. Pass the current pick to
 * get hysteresis: the view only changes once the pointer is clearly past a boundary.
 */
export function pickHorseView(dx: number, dy: number, current?: HorsePick): HorsePick {
  const flip = dx < 0
  const dist = Math.hypot(dx, dy)
  // elevation of the pointer above (+) or below (-) the horse's eye line
  const elevation = toDeg(Math.atan2(-dy, Math.abs(dx)))

  if (current && stillFits(current.view, dist, elevation)) {
    return { view: current.view, flip: current.view === "front" ? false : flip }
  }

  if (dist < HORSE_NEAR_PX) return { view: "front", flip: false }
  if (elevation >= BACK_MIN_DEG) return { view: "back", flip }
  if (elevation <= -BACK_MIN_DEG) return { view: "front", flip: false }
  if (Math.abs(elevation) <= SIDE_MAX_DEG) return { view: "side", flip }
  return { view: "three-quarter", flip }
}
