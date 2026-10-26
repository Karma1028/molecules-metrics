import { motion } from "motion/react"
import { motionTokens } from "../../lib/motion-tokens"

const { deck } = motionTokens
/** Point in the seam's life when the card is edge-on (end of the leaving turn). */
const EDGE = deck.exit / deck.seam

/**
 * The spine of the two-sided world card, lit for one beat while it turns: a
 * hairline of terracotta running into teal, brightest at the instant the card
 * is edge-on and the world changes over. One-shot, keyed by the caller.
 */
export function DeckSeam() {
  return (
    <div className="deck-seam" aria-hidden="true">
      <motion.i
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 0.35, 1, 0.2], opacity: [0, 0.6, 1, 0] }}
        transition={{ duration: deck.seam, times: [0, EDGE * 0.6, EDGE, 1], ease: "easeInOut" }}
      />
      <motion.b
        initial={{ opacity: 0, scaleX: 0.2 }}
        animate={{ opacity: [0, 0, 0.5, 0], scaleX: [0.2, 0.2, 1, 1.6] }}
        transition={{ duration: deck.seam, times: [0, EDGE * 0.6, EDGE, 1], ease: "easeOut" }}
      />
    </div>
  )
}
