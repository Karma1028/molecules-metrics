import "./story-shared.css"
import { motion, useReducedMotion } from "motion/react"
import { motionTokens, springs } from "../lib/motion-tokens"
import { charDelay } from "./choreo"

interface Props {
  text: string
  /** seconds before the first letter moves */
  baseSec?: number
  /** rise: letters climb out of a mask. slam: letters shoot in from the left, skewed. */
  variant?: "rise" | "slam"
  className?: string
}

const { story, easing, duration } = motionTokens

/**
 * One line of a headline, set letter by letter. Screen readers get the whole
 * line once; the animated letters are hidden from them. Reduced motion: a plain
 * opacity fade, no transform.
 */
export function CharLine({ text, baseSec = 0, variant = "rise", className }: Props) {
  const reduce = useReducedMotion()
  let seen = 0
  const words = text.split(" ").map((word) => {
    const start = seen
    seen += word.length
    return { word, start }
  })

  return (
    <span className={`char-line${className ? ` ${className}` : ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(({ word, start }, w) => (
          <span key={w} className="char-word">
            {Array.from(word).map((ch, k) => {
              const delay = reduce ? 0 : charDelay(start + k, story.charMs, baseSec)
              return (
                <motion.span
                  key={k}
                  className="char"
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : variant === "slam"
                        ? { opacity: 0, x: -motionTokens.distance.xl, skewX: -18 }
                        : { y: "105%" }
                  }
                  animate={reduce ? { opacity: 1 } : variant === "slam" ? { opacity: 1, x: 0, skewX: 0 } : { y: "0%" }}
                  transition={
                    reduce
                      ? { duration: duration.fast }
                      : variant === "slam"
                        ? { ...springs.snappy, delay }
                        : { duration: story.heroSec, ease: easing.smooth, delay }
                  }
                >
                  {ch}
                </motion.span>
              )
            })}
            {w < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  )
}
