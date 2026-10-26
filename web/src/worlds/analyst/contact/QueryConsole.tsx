import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Icon } from "../../../lib/icons"
import { motionTokens, springs } from "../../../lib/motion-tokens"
import { useCopy } from "./useCopy"

export interface Channel {
  id: string
  icon: string
  label: string
  handle: string
  href: string
  note: string
  copy?: string
}

export const QUERY = "SELECT channel, handle FROM reach WHERE open = true;"
/** One-shot typing: per-character interval and the pause before the first key. */
const TYPE_MS = 26
const TYPE_DELAY_MS = 380
const ROW_STAGGER_S = 0.08

/** Types the query once, then reports done. Reduced motion: printed instantly. */
function useTyped(text: string, reduce: boolean) {
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (reduce) {
      setN(text.length)
      return
    }
    let tick: number | undefined
    const start = window.setTimeout(() => {
      tick = window.setInterval(() => {
        setN((v) => {
          if (v + 1 >= text.length) window.clearInterval(tick)
          return Math.min(v + 1, text.length)
        })
      }, TYPE_MS)
    }, TYPE_DELAY_MS)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(tick)
    }
  }, [text, reduce])
  return { typed: text.slice(0, n), done: n >= text.length }
}

function Row({ c, k, show }: { c: Channel; k: number; show: boolean }) {
  const reduce = useReducedMotion() ?? false
  const { done, copy } = useCopy()
  return (
    <motion.li
      className="qr"
      initial={reduce ? { opacity: 1 } : { opacity: 0, x: -motionTokens.distance.sm }}
      animate={show ? { opacity: 1, x: 0 } : undefined}
      transition={reduce ? { duration: 0 } : { ...springs.gentle, delay: k * ROW_STAGGER_S }}
    >
      <a className="qr-a" href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener">
        <span className="qr-n">{String(k + 1).padStart(2, "0")}</span>
        <span className="qr-ch"><Icon id={c.icon} /><span className="qr-t">{c.label}</span></span>
        <span className="qr-h">{c.handle.split("@").map((part, i) => (i === 0 ? part : <span key={i}><wbr />@{part}</span>))}</span>
        <span className="qr-note">{c.note}</span>
        <span className="qr-go" aria-hidden="true"><Icon id="i-arrow" /></span>
      </a>
      {c.copy && (
        <button type="button" className="qr-copy" data-done={done} onClick={() => copy(c.copy as string)}>
          <Icon id={done ? "i-check" : "i-layers"} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={done ? "y" : "n"}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.xs }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -motionTokens.distance.xs }}
              transition={{ duration: reduce ? 0 : motionTokens.duration.fast }}
            >
              {done ? "Copied" : "Copy"}
            </motion.span>
          </AnimatePresence>
          <span className="sr-live" aria-live="polite">{done ? "Email copied to clipboard" : ""}</span>
        </button>
      )}
    </motion.li>
  )
}

/** The query console: a typed SELECT whose result set is the real channel list. */
export function QueryConsole({ channels, clock, phrase }: { channels: Channel[]; clock: string; phrase: string }) {
  const reduce = useReducedMotion() ?? false
  const { typed, done } = useTyped(QUERY, reduce)

  return (
    <section className="qc" aria-label="Contact channels">
      <header className="qc-bar">
        <span className="qc-db"><Icon id="i-database" /> reach.db</span>
        <span className="qc-meta">read only · {clock} IST</span>
      </header>
      <div className="qc-body">
        <p className="qc-q">
          <span className="qc-p" aria-hidden="true">reach=&gt;</span>{" "}
          <span className="qc-sr">{QUERY}</span>
          <code aria-hidden="true">{typed}</code>
          <span className={`qc-caret${done ? " off" : ""}`} aria-hidden="true" />
        </p>
        <div className="qc-head" aria-hidden="true">
          <span>#</span><span>channel</span><span>handle / note</span>
        </div>
        <ol className="qc-rows">
          {channels.map((c, k) => <Row key={c.id} c={c} k={k} show={done} />)}
        </ol>
        <motion.p
          className="qc-foot"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={done ? { opacity: 1 } : undefined}
          transition={reduce ? { duration: 0 } : { duration: motionTokens.duration.normal, delay: channels.length * ROW_STAGGER_S }}
        >
          ({channels.length} rows) · it is <b>{phrase}</b> right now
        </motion.p>
      </div>
    </section>
  )
}
