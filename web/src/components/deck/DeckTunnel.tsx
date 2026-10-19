import { motion } from "motion/react"
import { motionTokens } from "../../lib/motion-tokens"
import { tunnelFrames } from "../../lib/deck"
import type { World } from "../../lib/theme"
import type { NavItem } from "../../lib/worlds"

const { deck } = motionTokens

/**
 * The corridor seen during a same-world fly-through: the sections of the deck
 * as frames hanging in depth, rushing past the camera (forward) or falling
 * away from it (back). The destination frame lands on the screen plane just as
 * the arriving page grows into it. Artist frames are loose paper sheets with a
 * hand-set label; analyst frames are teal wireframes with corner ticks and a
 * mono readout. Mounted once per navigation (keyed by the caller); one-shot.
 */
export function DeckTunnel({ world, nav, dest, dir }: { world: World; nav: NavItem[]; dest: number; dir: 1 | -1 }) {
  const frames = tunnelFrames(dir, deck.frames, deck.gap)
  const twist = world === "artist" ? deck.twist : deck.twist * 0.4
  return (
    <div className={`deck-tunnel dt-${world}`} aria-hidden="true">
      <motion.div
        className="dt-rig"
        initial={{ rotateZ: -dir * twist }}
        animate={{ rotateZ: dir * twist * 0.25 }}
        transition={{ duration: deck.tunnel, ease: motionTokens.easing.inOut }}
      >
        {frames.map((f, k) => {
          const i = dest + f.offset
          const item = nav[i]
          const tilt = world === "artist" ? ((i * 7) % 5) - 2 : 0
          return (
            <motion.div
              key={k}
              className={`dt-frame${f.offset === 0 ? " dest" : ""}`}
              style={{ rotateZ: tilt }}
              initial={{ z: f.z[0], opacity: 0 }}
              animate={{ z: f.z, opacity: f.opacity }}
              transition={{ duration: deck.tunnel, ease: "linear" }}
            >
              {item && (
                <span className="dt-label">
                  <b>{String(i + 1).padStart(2, "0")}</b> {item.label}
                </span>
              )}
              <i className="dt-tick tl" />
              <i className="dt-tick br" />
            </motion.div>
          )
        })}
      </motion.div>
      <motion.div
        className="dt-flash"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.55, 0], scale: [0.6, 1.1, 1.4] }}
        transition={{ duration: deck.tunnel, times: [0, 0.38, 1], ease: "easeOut" }}
      />
    </div>
  )
}
