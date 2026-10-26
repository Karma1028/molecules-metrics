import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Icon } from "../../../lib/icons"
import { motionTokens, springs } from "../../../lib/motion-tokens"
import { useCopy } from "./useCopy"

export interface Channel {
  icon: string
  label: string
  handle: string
  href: string
  note: string
  hand: string
  copy?: string
}

/** Negative look: inverted, warm orange-mask cast, a touch soft. Positive: plain print. */
const NEGATIVE = "invert(1) sepia(0.35) blur(0.6px)"
const POSITIVE = "invert(0) sepia(0) blur(0px)"
/** Touch screens have no hover: develop each frame once, in order, after the strip lands. */
const TOUCH_DEVELOP_START_MS = 700
const TOUCH_DEVELOP_GAP_MS = 380

/** Soft wrap points before "@" and after "/" so long handles break at a seam, never mid-word. */
function withBreaks(handle: string) {
  return handle.split(/(?=@)|(?<=\/)/).map((part, i) => (i === 0 ? part : <span key={i}><wbr />{part}</span>))
}

function useTouchDevelop(count: number, onDevelop: (i: number) => void) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(hover: none)").matches) return
    const timers = Array.from({ length: count }, (_, i) =>
      window.setTimeout(() => onDevelop(i), TOUCH_DEVELOP_START_MS + i * TOUCH_DEVELOP_GAP_MS),
    )
    return () => timers.forEach((t) => window.clearTimeout(t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])
}

function Frame({ c, idx, developed, onDevelop, onRest }: {
  c: Channel
  idx: number
  developed: boolean
  onDevelop: () => void
  onRest: () => void
}) {
  const reduce = useReducedMotion() ?? false
  const { done, copy } = useCopy()
  const no = String(idx + 1).padStart(2, "0")
  const develop = reduce
    ? { duration: 0 }
    : { duration: developed ? motionTokens.duration.slow : motionTokens.duration.normal, ease: motionTokens.easing.smooth }

  return (
    <motion.li
      className="cell"
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md },
        visible: { opacity: 1, y: 0, transition: springs.gentle },
      }}
    >
      <span className="edge top" aria-hidden="true">{no} <i>&#9656;</i> {c.label}</span>
      <motion.div
        className="frame"
        data-developed={developed}
        animate={{ filter: developed ? POSITIVE : NEGATIVE }}
        initial={false}
        transition={develop}
        onPointerEnter={(e) => e.pointerType === "mouse" && onDevelop()}
        onPointerLeave={(e) => e.pointerType === "mouse" && onRest()}
        onPointerDown={onDevelop}
        onFocus={onDevelop}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && onRest()}
      >
        <a
          className="frame-a"
          href={c.href}
          target={c.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener"
          aria-label={`${c.label}: ${c.handle}`}
        >
          <span className="f-top">
            <span className="f-no" aria-hidden="true">{no}</span>
            <span className="f-label"><Icon id={c.icon} /> {c.label}</span>
          </span>
          <span className="f-handle">{withBreaks(c.handle)}</span>
          <span className="f-note">{c.note}</span>
          <span className="f-foot">
            <span className="f-hand">{c.hand}</span>
            <span className="f-arrow" aria-hidden="true"><Icon id="i-arrow" /></span>
          </span>
        </a>
        {c.copy && (
          <button type="button" className="f-copy" data-done={done} onClick={() => copy(c.copy as string)}>
            <Icon id={done ? "i-check" : "i-layers"} /> {done ? "Copied" : "Copy email"}
          </button>
        )}
        <AnimatePresence>
          {done && (
            <motion.span
              className="f-stamp"
              aria-hidden="true"
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.6, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: -9 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, transition: { duration: motionTokens.duration.fast } }}
              transition={reduce ? { duration: 0 } : springs.snappy}
            >
              Copied
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <span className="edge bot" aria-hidden="true">{no}A <i>&#9656;</i> Plate VI</span>
      {c.copy && <span className="sr-live" aria-live="polite">{done ? "Email copied to clipboard" : ""}</span>}
    </motion.li>
  )
}

/** The darkroom strip: every channel is a frame that develops from negative to print. */
export function FilmStrip({ channels }: { channels: Channel[] }) {
  const reduce = useReducedMotion() ?? false
  const [lit, setLit] = useState<ReadonlySet<number>>(() => new Set())
  const [touched, setTouched] = useState<ReadonlySet<number>>(() => new Set())

  const setOn = (i: number) => setLit((s) => (s.has(i) ? s : new Set([...s, i])))
  const setOff = (i: number) => setLit((s) => {
    if (!s.has(i)) return s
    const next = new Set(s)
    next.delete(i)
    return next
  })
  useTouchDevelop(channels.length, (i) => setTouched((s) => new Set([...s, i])))

  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.1 } } }

  return (
    <div className="strip film-mat">
      <motion.ol className="cells" aria-label="Contact channels" variants={container} initial="hidden" animate="visible">
        {channels.map((c, i) => (
          <Frame
            key={c.label}
            c={c}
            idx={i}
            developed={lit.has(i) || touched.has(i)}
            onDevelop={() => setOn(i)}
            onRest={() => setOff(i)}
          />
        ))}
      </motion.ol>
    </div>
  )
}
