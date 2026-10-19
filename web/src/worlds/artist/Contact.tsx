import { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { SOCIAL } from "../../lib/worlds"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useGoaPhrase } from "../../lib/useGoaClock"
import { useOneScreen } from "../../hooks/useOneScreen"
import { TwinDoor } from "../../components/TwinDoor"
import { FilmStrip, type Channel } from "./contact/FilmStrip"
import { DARKROOM_CSS } from "./contact/darkroom.css"
import { Headline } from "../../components/headline/Headline"

/** Stamp trail (ref: dejiajetomobi.com cursor stickers): spacing, cap, lifetime. */
const TRAIL_GAP_PX = 64
const TRAIL_MAX = 12
const TRAIL_LIFE_MS = 1100
interface Stamp { id: number; x: number; y: number; kind: "horse" | "ring"; rot: number }

const CHANNELS: Channel[] = [
  { icon: "i-camera", label: "Instagram", handle: "@_threads_of_karma_", href: SOCIAL.instagram, note: "Frames, as they happen.", hand: "start here" },
  { icon: "i-mail", label: "Email", handle: SOCIAL.email, href: `mailto:${SOCIAL.email}`, note: "Shoots, collaborations, longer notes.", hand: "for the real talk", copy: SOCIAL.email },
  { icon: "i-link", label: "LinkedIn", handle: "/in/tuhinbhattacharya28", href: SOCIAL.linkedin, note: "The analyst half of the story.", hand: "the other world" },
]

export function Contact() {
  const reduce = useReducedMotion()
  const goaPhrase = useGoaPhrase()
  const [stamps, setStamps] = useState<Stamp[]>([])
  const last = useRef<{ x: number; y: number } | null>(null)
  const seq = useRef(0)
  const onTrail = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const p = last.current
    if (p && Math.hypot(x - p.x, y - p.y) < TRAIL_GAP_PX) return
    last.current = { x, y }
    const id = ++seq.current
    const stamp: Stamp = { id, x, y, kind: id % 3 === 0 ? "ring" : "horse", rot: (id * 37) % 40 - 20 }
    setStamps((s) => [...s.slice(-(TRAIL_MAX - 1)), stamp])
    window.setTimeout(() => setStamps((s) => s.filter((t) => t.id !== id)), TRAIL_LIFE_MS)
  }

  useOneScreen()

  const rise = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.sm },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : springs.gentle,
  }

  return (
    <main
      className="page p-ac"
      aria-label="Contact"
      onPointerMove={onTrail}
      style={{ "--trail-life": `${TRAIL_LIFE_MS}ms` } as React.CSSProperties}
    >
      <style>{DARKROOM_CSS}</style>
      <div className="trail" aria-hidden="true">
        {stamps.map((t) => (
          <span key={t.id} className={`stamp ${t.kind}`} style={{ left: t.x, top: t.y, rotate: `${t.rot}deg` }} />
        ))}
      </div>

      <motion.header className="band" {...rise}>
        <div>
          <div className="ac-kick"><span className="horse-glyph" aria-hidden="true" /> <b>Plate VI</b> · Open signals</div>
          <Headline world="artist" className="ac-title">Say<span className="ac-hand">hello.</span></Headline>
        </div>
        <div className="side">
          <div className="side-txt">
            <p className="ac-lede">For <b>frames, collaborations</b> and conversations that start with a photo and end up somewhere else. Fastest on Instagram.</p>
            <div className="ac-row">
              <span className="ac-where"><Icon id="i-pin" /> Based in Goa · India · <b className="ac-clock">{goaPhrase}</b></span>
              <TwinDoor to="/analyst/contact" label="You've met Karma. Meet Tuhin" world="analyst" />
            </div>
          </div>
          <div className="postmark" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="pm-ring" d="M60 60m-50 0a50 50 0 1 1 100 0a50 50 0 1 1 -100 0" />
              </defs>
              <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <text className="pm-text">
                <textPath href="#pm-ring">Goa · India · from Bankura · Bengal ·</textPath>
              </text>
            </svg>
            <span className="horse-glyph" />
          </div>
        </div>
      </motion.header>

      <FilmStrip channels={CHANNELS} />
    </main>
  )
}
