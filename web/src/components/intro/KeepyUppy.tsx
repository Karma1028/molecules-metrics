import { useEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { motionTokens } from "../../lib/motion-tokens"
import { BALL_SEAM } from "../pointer/pointer-shared"
import { splitHeadline } from "../headline/headline-split"
import { countIn } from "../headline/count-in"
import { introSeen, markIntroSeen } from "./intro-session"
import "../headline/headline.css"
import "./intro.css"

const I = motionTokens.intro
const H = motionTokens.headline

type Phase = "play" | "line" | "exit" | "done"

/**
 * Landing intro, R2 spine in one breath: a ball is kept up and each touch is
 * counted (n=01..), then it is kicked out of frame and the line lands.
 * "He watched." is written in like the artist world; "Then he counted." is
 * counted in like the analyst world. Once per session, any input skips it,
 * reduced motion never sees it. The landing's own entrance waits underneath.
 */
export function KeepyUppy() {
  const reduced = useReducedMotion() ?? false
  const [phase, setPhase] = useState<Phase>(() => (reduced || introSeen() ? "done" : "play"))
  const [n, setN] = useState(0)
  const [counting, setCounting] = useState(false)
  const countRef = useRef<HTMLSpanElement>(null)

  const watched = useMemo(() => splitHeadline("He watched.", { chars: false }).nodes, [])
  const counted = useMemo(() => splitHeadline("Then he counted.", { chars: true }).nodes, [])

  // timeline: touches, kick + line, hold, lift
  useEffect(() => {
    if (phase !== "play") return
    markIntroSeen()
    const root = document.documentElement
    root.setAttribute("data-intro", "")
    const timers = Array.from({ length: I.touches }, (_, i) =>
      window.setTimeout(() => setN(i + 1), (i + 0.5) * I.beatMs))
    timers.push(window.setTimeout(() => setPhase("line"), I.touches * I.beatMs))
    const skip = () => setPhase("exit")
    const opts = { once: true, passive: true } as const
    window.addEventListener("pointerdown", skip, opts)
    window.addEventListener("keydown", skip, opts)
    window.addEventListener("wheel", skip, opts)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("pointerdown", skip)
      window.removeEventListener("keydown", skip)
      window.removeEventListener("wheel", skip)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== "line") return
    let stop = () => {}
    const el = countRef.current
    const start = window.setTimeout(() => {
      if (el) stop = countIn(el)
      setCounting(true)
    }, I.countDelayMs)
    const chars = el?.querySelectorAll(".hc").length ?? 0
    const settled = I.countDelayMs + H.rollMs + chars * H.charMs
    const lift = window.setTimeout(() => setPhase("exit"), settled + I.holdMs)
    return () => { clearTimeout(start); clearTimeout(lift); stop() }
  }, [phase])

  useEffect(() => {
    if (phase !== "exit") return
    // the landing's entrance plays as the paper lifts off it
    document.documentElement.removeAttribute("data-intro")
    const t = window.setTimeout(() => setPhase("done"), I.exitMs)
    return () => clearTimeout(t)
  }, [phase])

  // never leave the landing paused if we unmount mid-intro
  useEffect(() => () => document.documentElement.removeAttribute("data-intro"), [])

  if (phase === "done") return null
  const lineOn = phase !== "play"
  return (
    <div className="kp" data-phase={phase} aria-hidden="true"
      style={{ ["--beat" as string]: `${I.beatMs}ms`, ["--touches" as string]: I.touches,
        ["--kick" as string]: `${I.kickMs}ms`, ["--lift" as string]: `${I.exitMs}ms` }}>
      <div className="kp-stage">
        <span className="kp-ball">
          <svg viewBox="-10 -10 20 20" width="100%" height="100%">
            <circle r="9" className="kp-skin" />
            <path className="kp-seam" d={BALL_SEAM} />
          </svg>
        </span>
        <span className="kp-shadow" />
        <span key={n} className="kp-n">n={String(n).padStart(2, "0")}</span>
      </div>
      <p className="kp-line">
        <span className={`kp-watched hl-write${lineOn ? " in" : ""}`} style={{ ["--hs" as string]: `${H.stagger}s` }}>{watched}</span>{" "}
        <span ref={countRef} className={`kp-counted hl-count${counting ? " in" : ""}`}>{counted}</span>
      </p>
    </div>
  )
}
