import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { useFootball } from "../lib/live"
import { useOneScreen } from "../hooks/useOneScreen"
import { motionTokens, springs } from "../lib/motion-tokens"
import { matchdayView } from "./matchday-view"
import { CharLine } from "./CharLine"
import { HorseFollower } from "./HorseFollower"
import { SceneWipe } from "./SceneWipe"
import { StatValue } from "./StatValue"
import { useKick, type KickParts } from "./useKick"
import "./heat.css"

const MINUTE_MS = 60_000
const FORM_WORD = { W: "Win", D: "Draw", L: "Loss" } as const
const GHOST_KEYS = Array.from({ length: motionTokens.story.ghosts }, (_, i) => i)
/** seconds after the page opens before the left column starts arriving */
const COLUMN_DELAY = 0.35

const { story, easing, duration } = motionTokens

export function StoryMatchday() {
  useOneScreen()
  const reduce = useReducedMotion()
  const arrivedByWipe = Boolean((useLocation().state as { wipe?: boolean } | null)?.wipe)
  const { data: fb } = useFootball()
  const [now, setNow] = useState(() => Date.now())

  const stage = useRef<HTMLElement>(null)
  const man = useRef<HTMLImageElement>(null)
  const ball = useRef<HTMLImageElement>(null)
  const ghosts = useRef<(HTMLImageElement | null)[]>([])
  const flash = useRef<HTMLSpanElement>(null)
  const dust = useRef<HTMLImageElement>(null)
  const word = useRef<HTMLSpanElement>(null)
  const speed = useRef<HTMLSpanElement>(null)

  const parts = useCallback(
    (): KickParts => ({
      stage: stage.current,
      man: man.current,
      ball: ball.current,
      ghosts: ghosts.current,
      flash: flash.current,
      dust: dust.current,
      word: word.current,
      speed: speed.current,
    }),
    [],
  )
  const { run, busy, lookAt, cheer } = useKick(parts)

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), MINUTE_MS)
    return () => window.clearInterval(id)
  }, [])

  const v = matchdayView(fb, now)

  const column: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: story.itemStagger, delayChildren: reduce ? 0 : COLUMN_DELAY } },
  }
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -motionTokens.distance.lg },
    show: { opacity: 1, x: 0, transition: reduce ? { duration: duration.fast } : { duration: duration.slow, ease: easing.smooth } },
  }
  const chip: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1, transition: reduce ? { duration: duration.fast } : springs.snappy },
  }

  return (
    <main className="story-heat" aria-labelledby="heat-title">
      <motion.div
        className="heat-slash"
        aria-hidden="true"
        initial={reduce ? { opacity: 0 } : { x: "40vw", opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { x: 0, opacity: 1 }}
        transition={reduce ? { duration: duration.fast } : { duration: duration.slow + 0.2, ease: easing.smooth, delay: arrivedByWipe ? 0.25 : 0 }}
      />
      <motion.section className="heat-left" variants={column} initial="hidden" animate="show">
        <h1 id="heat-title" className="heat-title">
          <CharLine text="Matchday" variant="slam" baseSec={arrivedByWipe && !reduce ? 0.3 : 0.1} />
        </h1>

        {v.fixture ? (
          <motion.p className="heat-fixture" variants={item}>
            <span>{v.fixture.home}</span>
            <i aria-hidden="true">vs</i>
            <span>{v.fixture.away}</span>
          </motion.p>
        ) : (
          <motion.p className="heat-fixture heat-empty" variants={item}>
            No fixture on the wire right now.
          </motion.p>
        )}
        {v.fixture?.kickoff && (
          <motion.p className="heat-kick" variants={item}>
            {v.fixture.kickoff}
          </motion.p>
        )}

        {v.stats.length > 0 ? (
          <dl className="heat-stats">
            {v.stats.map((s, i) => (
              <motion.div key={s.label} variants={item}>
                <dt>{s.label}</dt>
                <dd>
                  <StatValue value={s.value} delaySec={COLUMN_DELAY + 0.5 + i * story.itemStagger} />
                </dd>
              </motion.div>
            ))}
          </dl>
        ) : (
          <motion.p className="heat-note" variants={item}>
            Standings arrive when the live feed is on. Nothing here is made up.
          </motion.p>
        )}

        {v.form.length > 0 && (
          <ol className="heat-form" aria-label="Last results, newest first">
            {v.form.map((r, i) => (
              <motion.li key={i} data-r={r} variants={chip} style={{ skewX: -12 }}>
                <span aria-hidden="true">{r}</span>
                <span className="sr-only">{FORM_WORD[r]}</span>
              </motion.li>
            ))}
          </ol>
        )}

        <motion.p className="heat-src" variants={item}>
          {v.state === "live" ? "Live feed, refreshed every ten minutes." : "Feed offline."}{" "}
          <Link to="/artist/matchday">Full matchday room</Link>
        </motion.p>
      </motion.section>

      <section ref={stage} className="heat-right" aria-label="Tuhin and the clay horse at the touchline">
        <span ref={speed} className="heat-speed" aria-hidden="true" />
        <button type="button" className="heat-kicker" onClick={run} disabled={busy} aria-label="Kick the ball">
          <motion.div
            className="heat-man-in"
            initial={reduce ? { opacity: 0 } : { x: "14vw", opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { x: 0, opacity: 1 }}
            transition={reduce ? { duration: duration.fast } : { ...springs.slow, delay: arrivedByWipe ? 0.45 : 0.2 }}
          >
            <img ref={man} className="heat-man" src="/story/kit/heat/tuhin-kick.webp" alt="" draggable={false} />
          </motion.div>
          <span ref={flash} className="heat-flash" aria-hidden="true" />
          <img ref={dust} className="heat-dust" src="/story/kit/heat/fx-dust.webp" alt="" draggable={false} />
          {GHOST_KEYS.map((i) => (
            <img
              key={i}
              ref={(el) => {
                ghosts.current[i] = el
              }}
              className="heat-ball heat-ghost"
              src="/story/kit/heat/ball.webp"
              alt=""
              draggable={false}
            />
          ))}
          <img ref={ball} className="heat-ball" src="/story/kit/heat/ball.webp" alt="" draggable={false} />
          <span ref={word} className="heat-word" aria-hidden="true">
            WHAM
          </span>
        </button>
        <HorseFollower
          look="heat"
          enter="right"
          lookAt={lookAt}
          cheer={cheer}
          className="heat-horse"
          alt="The Bankura horse, watching the match"
        />
      </section>
      {arrivedByWipe && <SceneWipe phase="reveal" />}
    </main>
  )
}
