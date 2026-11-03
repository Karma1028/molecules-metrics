import { useEffect, useRef, useState } from "react"
import { animate, motion, useReducedMotion } from "motion/react"
import { motionTokens } from "../lib/motion-tokens"
import { gaitKeyframes } from "./choreo"
import { pickHorseView, type HorsePick, type HorseView } from "./horse-view"

export type KitLook = "pat" | "heat"
export type Enter = "left" | "right" | "none"

export interface Point {
  x: number
  y: number
}

interface Props {
  look: KitLook
  alt: string
  className?: string
  /** side the horse gallops in from; he then turns to follow the pointer */
  enter?: Enter
  /** a viewport point to watch instead of the pointer (the ball in flight) */
  lookAt?: Point | null
  /** bump this number to make the horse hop */
  cheer?: number
}

const REST: HorsePick = { view: "three-quarter", flip: false }
const VIEWS: HorseView[] = ["front", "three-quarter", "side", "back"]
/** where on the sprite the horse's eyes sit, as a share of its height */
const EYE_LINE = 0.35
const PUFF_KEYS = Array.from({ length: 4 }, (_, i) => i)

const { story, easing } = motionTokens
const viewSrc = (look: KitLook, view: HorseView) => `/story/kit/${look}/horse-${view}.webp`

/**
 * The clay horse. Gallops in from the edge (side view, a bobbing stride, dust
 * behind him, a shadow that breathes with the stride), halts, then turns to
 * face the pointer by swapping between the four turnaround cut-outs.
 * Reduced motion: fades in, holds one pose.
 */
export function HorseFollower({ look, alt, className, enter = "none", lookAt = null, cheer = 0 }: Props) {
  const reduce = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const hop = useRef<HTMLDivElement>(null)
  const [riding, setRiding] = useState(enter !== "none" && !reduce)
  const [pick, setPick] = useState<HorsePick>(REST)
  const pointer = useRef<Point | null>(null)

  const dir = enter === "right" ? 1 : -1
  const gait = gaitKeyframes(1)

  // warm the other views so a turn never shows a blank frame
  useEffect(() => {
    if (reduce) return
    for (const v of VIEWS) new Image().src = viewSrc(look, v)
  }, [look, reduce])

  const aimAt = (p: Point) => {
    const el = box.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = p.x - (r.left + r.width / 2)
    const dy = p.y - (r.top + r.height * EYE_LINE)
    setPick((cur) => {
      const next = pickHorseView(dx, dy, cur)
      return cur.view === next.view && cur.flip === next.flip ? cur : next
    })
  }

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY }
      if (!riding && !lookAt) aimAt(pointer.current)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduce, riding, lookAt])

  // the ball (or the pointer again once it lands) decides where he looks
  useEffect(() => {
    if (reduce || riding) return
    const target = lookAt ?? pointer.current
    if (target) aimAt(target)
  }, [lookAt, reduce, riding])

  // a hop on cue
  useEffect(() => {
    if (!cheer || reduce || !hop.current) return
    const controls = animate(
      hop.current,
      { y: [0, -story.hopRise, 0], rotate: [0, -3 * dir, 0] },
      { duration: story.hopSec, ease: easing.smooth },
    )
    return () => controls.stop()
  }, [cheer, reduce, dir])

  const shown: HorsePick = riding ? { view: "side", flip: enter === "right" } : pick

  return (
    <div ref={box} className={className}>
      <motion.div
        className="horse-ride"
        initial={reduce ? { opacity: 0 } : enter === "none" ? false : { x: `${dir * story.rideFromVw}vw` }}
        animate={reduce ? { opacity: 1 } : { x: 0 }}
        transition={reduce ? { duration: motionTokens.duration.fast } : { duration: story.rideSec, ease: easing.out }}
        onAnimationComplete={() => setRiding(false)}
      >
        {riding &&
          PUFF_KEYS.map((i) => (
            <motion.span
              key={i}
              className="horse-dust"
              style={{ [dir > 0 ? "right" : "left"]: `${-6 + i * 5}%`, bottom: `${2 + (i % 2) * 5}%` }}
              initial={{ opacity: 0, scale: 0.4, x: 0 }}
              animate={{ opacity: [0, 0.55, 0], scale: [0.4, 1.3, 1.9], x: [0, dir * 36, dir * 84] }}
              transition={{
                duration: story.dustSec,
                delay: i * (story.dustSec / PUFF_KEYS.length),
                repeat: story.dustPuffs / PUFF_KEYS.length,
                ease: easing.out,
              }}
            />
          ))}
        <motion.span
          className="horse-shadow"
          aria-hidden="true"
          animate={riding ? { scaleX: [1, 0.86, 1, 0.92, 1] } : { scaleX: 1 }}
          transition={riding ? { duration: story.gaitSec, times: gait.times, repeat: Infinity, ease: easing.inOut } : { duration: motionTokens.duration.normal }}
        />
        <div ref={hop}>
          <motion.div
            animate={riding ? { y: gait.y, rotate: gait.rotate.map((r) => r * dir) } : { y: 0, rotate: 0 }}
            transition={
              riding
                ? { duration: story.gaitSec, times: gait.times, repeat: Infinity, ease: easing.inOut }
                : { duration: motionTokens.duration.normal, ease: easing.smooth }
            }
          >
            <img
              className="horse-img"
              src={viewSrc(look, shown.view)}
              alt={alt}
              data-view={shown.view}
              style={{ transform: shown.flip ? "scaleX(-1)" : undefined }}
              draggable={false}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
