import { motion } from "motion/react"
import { useReducedMotion } from "../../../hooks/useSafeMotion"
import { springs } from "../../../lib/motion-tokens"

/* The deck's platter: a black record whose centre label is the real cover,
   a static light sheen that stays put while the record turns underneath it,
   and a tonearm that lowers onto the outer groove when the page arrives. */

const ARM_REST = -24
const ARM_PLAY = 0

interface TurntableProps {
  art: string | null
  /** text printed on the label when there is no cover */
  label: string
  spinning: boolean
}

function Tonearm({ reduced }: { reduced: boolean }) {
  return (
    <svg className="tt-arm" viewBox="0 0 100 100" aria-hidden="true">
      <circle className="tt-arm-base" cx="86" cy="15" r="8.5" />
      <motion.g
        style={{ transformOrigin: "86px 15px", transformBox: "view-box" }}
        initial={{ rotate: reduced ? ARM_PLAY : ARM_REST }}
        animate={{ rotate: ARM_PLAY }}
        transition={reduced ? { duration: 0 } : { ...springs.slow, delay: 0.35 }}
      >
        <rect className="tt-arm-weight" x="88.5" y="3" width="7" height="9" rx="1.6" transform="rotate(-18 92 7.5)" />
        <path className="tt-arm-tube" d="M86 15 L80 58 Q78.6 66 72 70" />
        <rect className="tt-arm-head" x="66" y="67.5" width="9.5" height="6" rx="1.2" transform="rotate(32 70.7 70.5)" />
      </motion.g>
      <circle className="tt-arm-cap" cx="86" cy="15" r="3.2" />
    </svg>
  )
}

export function Turntable({ art, label, spinning }: TurntableProps) {
  const reduced = useReducedMotion()
  const spin = spinning && !reduced
  return (
    <div className="tt" role="img" aria-label={`a turntable playing ${label}`}>
      <div className="tt-platter">
        <div className={`tt-rec${spin ? " spin" : ""}`}>
          <div className="tt-label">
            {art ? <img src={art} alt="" crossOrigin="anonymous" /> : <span className="tt-label-ph">{label}</span>}
          </div>
        </div>
        <span className="tt-sheen" aria-hidden="true" />
        <span className="tt-spindle" aria-hidden="true" />
      </div>
      <Tonearm reduced={reduced} />
    </div>
  )
}
