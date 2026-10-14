import { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { SOCIAL } from "../../lib/worlds"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { PlateHeader } from "../../components/headers/PlateHeader"
import { useGoaPhrase } from "../../lib/useGoaClock"
import { useOneScreen } from "../../hooks/useOneScreen"

/** Stamp trail (ref: dejiajetomobi.com cursor stickers): spacing, cap, lifetime. */
const TRAIL_GAP_PX = 64
const TRAIL_MAX = 12
const TRAIL_LIFE_MS = 1100
interface Stamp { id: number; x: number; y: number; kind: "horse" | "ring"; rot: number }

interface Channel {
  icon: string
  label: string
  handle: string
  href: string
  note: string
  hand: string
}
const CHANNELS: Channel[] = [
  { icon: "i-camera", label: "Instagram", handle: "@_threads_of_karma_", href: SOCIAL.instagram, note: "Frames, as they happen.", hand: "start here" },
  { icon: "i-mail", label: "Email", handle: SOCIAL.email, href: `mailto:${SOCIAL.email}`, note: "Shoots, collaborations, longer notes.", hand: "for the real talk" },
  { icon: "i-link", label: "LinkedIn", handle: "/in/tuhinbhattacharya28", href: SOCIAL.linkedin, note: "The analyst half of the story.", hand: "the other world" },
]

const CSS = String.raw`
  .p-ac{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1120px;margin:0 auto;width:100%;overflow:hidden}
  .p-ac .grid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,4.6fr) minmax(0,5.4fr);gap:clamp(16px,3vw,48px);align-items:center}
  .p-ac .grid>*{min-width:0;min-height:0}

  .p-ac .lead{position:relative;display:flex;flex-direction:column;justify-content:center}
  .p-ac .ac-kick{display:inline-flex;align-items:center;gap:9px;font:600 10px/1 var(--font-mono);letter-spacing:.24em;text-transform:uppercase;color:var(--accent)}
  .p-ac .ac-title{font-family:var(--font-display);font-weight:900;font-size:clamp(44px,8vw,112px);line-height:.86;letter-spacing:-.04em;color:var(--ink);margin:12px 0 0}
  .p-ac .ac-hand{font-family:var(--font-hand);font-weight:700;font-size:clamp(28px,4vw,52px);color:var(--accent);rotate:-3deg;display:inline-block;margin-left:.6em;margin-top:-.15em}
  .p-ac .ac-rule{display:block;width:min(100%,320px);height:12px;color:var(--accent);opacity:.55;margin:10px 0 0}
  .p-ac .ac-lede{font-size:clamp(13px,1.1vw,16px);color:var(--muted);max-width:36ch;margin-top:14px;text-wrap:pretty}
  .p-ac .ac-lede b{color:var(--ink);font-weight:600}
  .p-ac .ac-where{margin-top:14px;display:inline-flex;align-items:center;gap:8px;font:600 10px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-ac .ac-where .ic{width:13px;height:13px;color:var(--accent)}
  .p-ac .ac-clock{color:var(--ink);font-weight:600}

  /* postmark: horse + ring text, inked at an angle */
  .p-ac .postmark{position:absolute;right:0;top:4%;width:clamp(96px,11vw,150px);aspect-ratio:1/1;color:var(--accent);opacity:.7;rotate:-14deg;pointer-events:none}
  .p-ac .postmark svg{width:100%;height:100%;overflow:visible}
  .p-ac .postmark .pm-text{font:600 9.5px/1 var(--font-mono);letter-spacing:.32em;text-transform:uppercase;fill:currentColor}
  .p-ac .postmark .horse-glyph{position:absolute;inset:30%;width:auto}

  /* channels: perforated stamp-tickets with a kantha stitch */
  .p-ac .chans{display:flex;flex-direction:column;gap:clamp(10px,1.6vh,18px);min-height:0}
  .p-ac .chan{position:relative;display:block;text-decoration:none;color:inherit;background:var(--card);
    border-radius:4px;box-shadow:var(--shadow-sm);padding:clamp(14px,1.9vw,22px) clamp(16px,2vw,24px) clamp(14px,1.9vw,22px) clamp(26px,2.6vw,34px);
    transition:transform .4s cubic-bezier(.32,.72,0,1),box-shadow .3s;isolation:isolate}
  .p-ac .chan::before{content:"";position:absolute;left:-5px;top:0;bottom:0;width:10px;z-index:1;
    background:radial-gradient(circle at center,var(--paper) 3.4px,transparent 4px) 0 0 / 10px 12px repeat-y}
  .p-ac .chan.stitch::after{inset:6px 6px 6px 14px;border-radius:2px;opacity:.6}
  .p-ac .chan:nth-child(2){rotate:.6deg}
  .p-ac .chan:nth-child(3){rotate:-.5deg}
  .p-ac .chan:hover,.p-ac .chan:focus-visible{transform:translateX(-6px) rotate(-.8deg);box-shadow:var(--shadow)}
  .p-ac .chan:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
  .p-ac .chan-row{display:flex;align-items:center;gap:14px}
  .p-ac .chan-no{font-family:var(--font-display);font-weight:900;font-size:clamp(26px,3vw,40px);line-height:1;letter-spacing:-.04em;
    color:color-mix(in srgb,var(--accent) 30%,transparent);flex:0 0 auto;transition:color .3s}
  .p-ac .chan:hover .chan-no{color:var(--accent)}
  .p-ac .chan-meta{min-width:0;flex:1}
  .p-ac .chan-label{display:inline-flex;align-items:center;gap:6px;font:600 9px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
  .p-ac .chan-label .ic{width:12px;height:12px;color:var(--accent)}
  .p-ac .chan-handle{font-family:var(--font-display);font-weight:700;font-size:clamp(14px,1.4vw,20px);color:var(--ink);line-height:1.1;margin-top:4px;
    overflow-wrap:anywhere}
  .p-ac .chan-note{font-size:11.5px;color:var(--muted);margin-top:4px}
  .p-ac .chan-hand{position:absolute;top:-13px;right:22px;z-index:2;font-family:var(--font-hand);font-size:clamp(15px,1.5vw,19px);color:var(--accent);
    rotate:-4deg;white-space:nowrap;background:var(--paper);padding:0 6px;border-radius:4px}
  .p-ac .chan-arrow{margin-left:4px;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;flex:0 0 auto;
    background:color-mix(in srgb,var(--accent) 14%,transparent);transition:transform .5s cubic-bezier(.32,.72,0,1),background .3s}
  .p-ac .chan-arrow .ic{width:13px;height:13px;color:var(--accent)}
  .p-ac .chan:hover .chan-arrow{background:var(--accent);transform:translate(3px,-2px)}
  .p-ac .chan:hover .chan-arrow .ic{color:var(--paper)}

  /* cursor stamp trail */
  .p-ac{position:relative}
  .p-ac .trail{position:absolute;inset:0;pointer-events:none;z-index:5;overflow:hidden}
  .p-ac .stamp{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;animation:ac-stamp ${TRAIL_LIFE_MS}ms cubic-bezier(.22,1,.36,1) forwards}
  .p-ac .stamp.horse{background:var(--accent);-webkit-mask:url(/motifs/bankura-horse.png) center / contain no-repeat;mask:url(/motifs/bankura-horse.png) center / contain no-repeat}
  .p-ac .stamp.ring{border:1.5px dashed var(--accent);border-radius:50%;width:22px;height:22px;margin:-11px 0 0 -11px}
  @keyframes ac-stamp{0%{opacity:0;scale:.4}18%{opacity:.85;scale:1.08}100%{opacity:0;scale:.9;translate:0 10px}}

  @media(max-width:820px){
    .p-ac .grid{grid-template-columns:1fr;grid-template-rows:auto auto;align-content:center;gap:18px}
    .p-ac .ac-title{font-size:clamp(44px,15vw,64px)}
    .p-ac .ac-rule{display:none}
    .p-ac .ac-lede{margin-top:10px;font-size:13px}
    .p-ac .ac-where{margin-top:10px}
    .p-ac .postmark{width:86px;top:0;right:4px}
    .p-ac .chan-hand{display:none}
    .p-ac .chan{padding:12px 14px 12px 24px}
    .p-ac .chan-no{font-size:24px}
  }
  @media(prefers-reduced-motion:reduce){.p-ac .trail{display:none}.p-ac .chan,.p-ac .chan-arrow{transition:none}}
`

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

  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.05 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  }

  return (
    <main className="page p-ac" aria-label="Contact" onPointerMove={onTrail}>
      <div className="trail" aria-hidden="true">
        {stamps.map((t) => (
          <span key={t.id} className={`stamp ${t.kind}`} style={{ left: t.x, top: t.y, rotate: `${t.rot}deg` }} />
        ))}
      </div>
      <style>{CSS}</style>
      <div className="grid">
        <div className="lead">
          <div className="postmark" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="pm-ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" />
              </defs>
              <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <text className="pm-text">
                <textPath href="#pm-ring">Goa · India · from Bankura · Bengal ·</textPath>
              </text>
            </svg>
            <span className="horse-glyph" />
          </div>
          <PlateHeader
            plate="Plate VI"
            kicker="Open Signals"
            title={<>Say <span className="ac-hand">hello.</span></>}
            lede={<>For <b>frames, collaborations</b> and conversations that start with a photo and end up somewhere else. Fastest on Instagram.</>}
            showRule={true}
          />
          <span className="ac-where"><Icon id="i-pin" /> Based in Goa · India · <b className="ac-clock">{goaPhrase}</b></span>
        </div>

        <motion.div className="chans" variants={container} initial="hidden" animate="visible">
          {CHANNELS.map((c, idx) => (
            <motion.a
              key={c.label}
              className="chan stitch"
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener"
              variants={item}
            >
              <div className="chan-row">
                <span className="chan-no" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
                <div className="chan-meta">
                  <div className="chan-label"><Icon id={c.icon} /> {c.label}</div>
                  <div className="chan-handle">{c.handle}</div>
                  <div className="chan-note">{c.note}</div>
                </div>
                <span className="chan-hand">{c.hand}</span>
                <span className="chan-arrow"><Icon id="i-arrow" /></span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
