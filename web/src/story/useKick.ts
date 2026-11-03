import { useCallback, useEffect, useRef, useState } from "react"
import { animate, useReducedMotion } from "motion/react"
import { motionTokens, springs } from "../lib/motion-tokens"
import { ballArc, trailGhosts } from "./choreo"
import type { Point } from "./HorseFollower"

type Controls = ReturnType<typeof animate>

export interface KickParts {
  stage: HTMLElement | null
  man: HTMLElement | null
  ball: HTMLElement | null
  ghosts: (HTMLElement | null)[]
  flash: HTMLElement | null
  dust: HTMLElement | null
  word: HTMLElement | null
  speed: HTMLElement | null
}

const { story, easing, duration } = motionTokens
const MAN_WIND = { x: -12, rotate: -4, scaleY: 0.97 }
const MAN_STRIKE = { x: 16, rotate: 5, scaleY: 1 }
/** the horse looks up at the apex: share of stage width / height */
const APEX = { x: 0.5, y: 0.2 }
/** the horse cheers when the ball is this far through its flight */
const CHEER_AT = 0.45

/**
 * The kick, as a sequence: wind-up, strike (shake, flash, dust, word, speed
 * lines), flight on a parabola with afterimages and spin, the horse's eyes on
 * the ball and a cheer hop, then the ball pops back at the foot. One run at a
 * time; leaving the page stops everything. Reduced motion: the ball blinks.
 */
export function useKick(parts: () => KickParts) {
  const reduce = useReducedMotion()
  const running = useRef<Controls[]>([])
  const alive = useRef(true)
  const [busy, setBusy] = useState(false)
  const [lookAt, setLookAt] = useState<Point | null>(null)
  const [cheer, setCheer] = useState(0)

  useEffect(() => {
    alive.current = true
    const live = running.current
    return () => {
      alive.current = false
      live.forEach((c) => c.stop())
    }
  }, [])

  const run = useCallback(async () => {
    const p = parts()
    const { stage, man, ball } = p
    if (!stage || !man || !ball) return
    const go = (c: Controls) => {
      running.current.push(c)
      return c
    }
    setBusy(true)

    if (reduce) {
      await go(animate(ball, { opacity: [1, 0.2, 1] }, { duration: duration.fast })).finished
      if (alive.current) setBusy(false)
      return
    }

    const r = stage.getBoundingClientRect()
    const arc = ballArc({ dx: r.width, peak: r.height * story.arcPeak, drop: 0, steps: story.arcSteps })
    const fly = { x: arc.x, y: arc.y, rotate: [0, story.spin], scale: [1, story.shrink] }
    const flightOpts = { duration: story.flightSec, ease: "linear" as const }

    await go(animate(man, MAN_WIND, { duration: story.windUpSec, ease: easing.inOut })).finished
    if (!alive.current) return

    go(animate(man, MAN_STRIKE, { duration: story.strikeSec, ease: easing.out }))
    go(animate(stage, { x: story.shake }, { duration: story.shakeSec, ease: easing.out }))
    if (p.flash) go(animate(p.flash, { opacity: [0, 1, 0], scale: [0.3, 1.7, 2.1] }, { duration: 0.3 }))
    if (p.dust) go(animate(p.dust, { opacity: [0, 0.9, 0], x: [0, -30, -60], scale: [0.5, 1.2, 1.5] }, { duration: 0.6 }))
    if (p.word) {
      go(
        animate(
          p.word,
          { opacity: [0, 1, 1, 0], scale: [0.4, 1.2, 1, 1], y: [0, -6, -6, -18] },
          { duration: 0.7, times: [0, 0.2, 0.7, 1] },
        ),
      )
    }
    if (p.speed) go(animate(p.speed, { opacity: [0, 0.9, 0], x: ["0%", "-18%"] }, { duration: 0.5 }))

    setLookAt({ x: r.left + r.width * APEX.x, y: r.top + r.height * APEX.y })
    const cheerTimer = window.setTimeout(() => alive.current && setCheer((n) => n + 1), story.flightSec * CHEER_AT * 1000)

    trailGhosts(story.ghosts).forEach((g, i) => {
      const el = p.ghosts[i]
      if (el) go(animate(el, { ...fly, opacity: [0, g.opacity, g.opacity, 0] }, { ...flightOpts, delay: g.lag }))
    })
    await go(animate(ball, fly, flightOpts)).finished
    window.clearTimeout(cheerTimer)
    if (!alive.current) return

    setLookAt(null)
    go(animate(man, { x: 0, rotate: 0, scaleY: 1 }, springs.gentle))
    p.ghosts.forEach((el) => el && go(animate(el, { x: 0, y: 0, opacity: 0 }, { duration: 0 })))
    await go(animate(ball, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 0 }, { duration: 0 })).finished
    await go(animate(ball, { opacity: 1, scale: [0.3, 1] }, { duration: duration.normal, ease: easing.smooth })).finished
    if (alive.current) setBusy(false)
  }, [parts, reduce])

  return { run, busy, lookAt, cheer }
}
