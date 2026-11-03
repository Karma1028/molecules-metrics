import { useCallback, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, useReducedMotion, useTransform } from "motion/react"
import { useOneScreen } from "../hooks/useOneScreen"
import { motionTokens, springs } from "../lib/motion-tokens"
import { CharLine } from "./CharLine"
import { HorseFollower } from "./HorseFollower"
import { SceneWipe } from "./SceneWipe"
import { usePointerUnit } from "./usePointerUnit"
import "./story.css"

const LINES = ["He watched.", "Then he counted."]
/** px the sun drifts against the pointer */
const SUN_DRIFT = { x: 22, y: 14 }

const { story, easing, duration } = motionTokens

export function StoryOpening() {
  useOneScreen()
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)
  const pointer = usePointerUnit()
  const sunX = useTransform(pointer.x, [-1, 1], [-SUN_DRIFT.x, SUN_DRIFT.x])
  const sunY = useTransform(pointer.y, [-1, 1], [-SUN_DRIFT.y, SUN_DRIFT.y])

  const copyDelay = reduce ? 0 : story.rideSec - 0.3
  const fadeUp = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.md },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: duration.fast }
      : { duration: duration.slow, ease: easing.smooth, delay: copyDelay },
  }

  const ride = useCallback(() => navigate("/story/matchday", { state: { wipe: true } }), [navigate])

  const onCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    setLeaving(true)
  }

  const band = (extra: string) => ({
    className: `pat-border ${extra}`,
    "aria-hidden": true as const,
    initial: reduce ? { opacity: 0 } : { scaleX: 0 },
    animate: reduce ? { opacity: 1 } : { scaleX: 1 },
    transition: reduce ? { duration: duration.fast } : { duration: duration.slow + 0.2, ease: easing.smooth },
  })

  return (
    <main className="story-pat" aria-labelledby="story-title">
      <motion.div {...band("")} />
      <section className="pat-copy">
        <h1 id="story-title" className="pat-title">
          {LINES.map((line, i) => (
            <CharLine key={line} text={line} baseSec={0.25 + i * story.lineGapSec * 2} />
          ))}
        </h1>
        <motion.p className="pat-sub" {...fadeUp}>
          The clay horse of Bankura leads the way. Follow it to the matchday room.
        </motion.p>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: reduce ? 0 : copyDelay + story.itemStagger * 2 }}>
          <Link to="/story/matchday" className="pat-cta" onClick={onCta}>
            Ride to the matchday room
          </Link>
        </motion.div>
      </section>
      <div className="pat-stage">
        <motion.div
          className="pat-sun"
          aria-hidden="true"
          style={{ x: sunX, y: sunY }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={reduce ? { duration: duration.fast } : { ...springs.slow, delay: 0.1 }}
        />
        <HorseFollower
          look="pat"
          enter="left"
          className="pat-horse"
          alt="A Bankura terracotta horse painted in patachitra style, turning to face you"
        />
        <motion.p className="pat-caption" {...fadeUp}>
          Bankura terracotta horse. Move your pointer or drag a finger; he turns to look.
        </motion.p>
      </div>
      <motion.div {...band("pat-border-b")} />
      {leaving && <SceneWipe phase="cover" onDone={ride} />}
    </main>
  )
}
