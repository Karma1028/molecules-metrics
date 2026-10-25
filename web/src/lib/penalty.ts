import { MIN_SPEED, type Rect } from "./flick"

export type PenaltyResult = "goal" | "saved" | "wide" | "weak"

/** The keeper covers this half-width (px) either side of where it stands. */
export const KEEPER_REACH = 45

/** Where the flicked ball crosses the goal line, judged against the posts and the keeper. */
export function shoot(
  from: { x: number; y: number },
  v: { vx: number; vy: number },
  goal: Rect,
  keeperX: number,
): PenaltyResult {
  if (Math.hypot(v.vx, v.vy) < MIN_SPEED) return "weak"
  if (v.vy >= 0) return "wide"
  const t = (goal.bottom - from.y) / v.vy
  const x = from.x + v.vx * t
  if (x < goal.left || x > goal.right) return "wide"
  return Math.abs(x - keeperX) <= KEEPER_REACH ? "saved" : "goal"
}
