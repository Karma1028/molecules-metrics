import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import type { World } from "../lib/theme"

export interface TwinDoorProps {
  to: string
  label: string
  world: World
  className?: string
}

/**
 * TwinDoor (GEMINI-EXECUTION-BRIEF §3, §4 R3):
 * The "pulled thread" crossover link connecting paired pages across worlds.
 * Carries the Bankura terracotta thread into either world, tightening on hover.
 * Passes the door label through router state to WorldTransition for mid-wipe display.
 */
export function TwinDoor({ to, label, world, className = "" }: TwinDoorProps) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={to}
      state={{ doorLabel: label, destinationWorld: world }}
      className={`twin-door to-${world} ${className}`}
      aria-label={`${label} (switch to ${world} world)`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="td-loop" aria-hidden="true">
        <svg viewBox="0 0 26 14" fill="none">
          <motion.path
            d="M 2 7 C 7 7, 9 2, 13 2 C 17 2, 18 12, 13 12 C 8 12, 11 7, 24 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={
              reduce
                ? undefined
                : hovered
                ? { pathLength: 0.88, strokeDashoffset: 4 }
                : { pathLength: 1, strokeDashoffset: 0 }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </span>
      <span className="td-label">{label}</span>
      <motion.span
        className="td-arr"
        aria-hidden="true"
        animate={reduce ? undefined : { x: hovered ? 3 : 0 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </Link>
  )
}
