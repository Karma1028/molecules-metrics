import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useMotionValueEvent, useReducedMotion, useSpring } from "motion/react"
import { WORLDS } from "../../lib/worlds"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { useGoaClock } from "../../lib/useGoaClock"

interface SubsystemMeta {
  to: string
  label: string
  num: string
  gloss: string
  status: "built" | "in progress"
}

const ANALYST_META: Record<string, { num: string; gloss: string; status: "built" | "in progress" }> = {
  "/analyst/skills": { num: "01", gloss: "Mass balance to statistical modeling", status: "built" },
  "/analyst/work": { num: "02", gloss: "Four production pipelines with verified impact", status: "built" },
  "/analyst/journey": { num: "03", gloss: "Chemical engineering to analytics arc", status: "built" },
  "/analyst/dashboard": { num: "04", gloss: "Live telemetry and operational clock", status: "built" },
  "/analyst/resume": { num: "05", gloss: "Academic PDF and interactive curriculum vitae", status: "built" },
  "/analyst/contact": { num: "06", gloss: "Direct channel for analytics roles", status: "built" },
}

// Gauge geometry: a 180° dial, needle swept from -90° (channel 0, idle) to +90° (last channel)
const DIAL_SWEEP = 180
const DIAL_R = 78
const DIAL_CX = 100
const DIAL_CY = 96

const CSS = String.raw`
  html[data-toc] .page.p-an-toc,.p-an-toc{min-height:0;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(20px,4vw,64px);
    max-width:1240px;margin:0 auto;width:100%;overflow:hidden;position:relative}

  /* material: graph paper, minor 24px + major 120px, faded at the edges */
  .p-an-toc::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
    background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px),
      linear-gradient(color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px);
    background-size:24px 24px,24px 24px,120px 120px,120px 120px;
    mask-image:radial-gradient(ellipse 80% 75% at 50% 45%,#000 40%,transparent 100%)}

  /* left column: poster headline + instrument */
  .p-an-toc .poster{min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(10px,2vh,24px)}
  .p-an-toc .kick{font:600 10px/1.4 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--teal)}
  .p-an-toc .kick .caret{display:inline-block;margin-left:4px;color:var(--teal)}
  .p-an-toc .big{font-family:var(--font-display);font-weight:700;font-size:clamp(56px,7.6vw,120px);line-height:.86;letter-spacing:-.045em;color:var(--ink);margin:clamp(6px,1.2vh,14px) 0 0}
  .p-an-toc .big em{font-style:normal;color:var(--accent)}
  .p-an-toc .lede{font:500 clamp(12px,1vw,14px)/1.5 var(--font-mono);color:var(--muted);margin:clamp(8px,1.6vh,16px) 0 0;max-width:34ch}
  .p-an-toc .lede b{color:var(--ink);font-weight:600}
  .p-an-toc .cta-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:clamp(10px,1.8vh,18px)}
  .p-an-toc .cv-cta{display:inline-flex;align-items:center;gap:7px;padding:9px 14px;border-radius:8px;background:var(--accent);color:var(--paper);
    font:600 11px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:filter .2s var(--ease)}
  .p-an-toc .cv-cta .ic{width:13px;height:13px}
  .p-an-toc .cv-cta:hover{filter:brightness(1.1)}
  .p-an-toc .cv-alt{font:500 11px/1 var(--font-mono);letter-spacing:.08em;color:var(--muted);text-decoration:underline;text-underline-offset:3px}
  .p-an-toc .cv-alt:hover{color:var(--accent)}

  /* instrument: glass panel with a live dial */
  .p-an-toc .instrument{position:relative;display:grid;grid-template-columns:clamp(130px,13vw,190px) 1fr;align-items:center;gap:clamp(10px,1.4vw,20px);
    padding:clamp(10px,1.6vh,16px) clamp(12px,1.4vw,18px);border-radius:14px;
    background:linear-gradient(140deg,color-mix(in srgb,var(--card) 70%,transparent),color-mix(in srgb,var(--card) 35%,transparent));
    border:1px solid color-mix(in srgb,var(--teal) 22%,var(--rule));backdrop-filter:blur(10px);
    box-shadow:inset 0 1px 0 color-mix(in srgb,#fff 8%,transparent),var(--shadow-sm)}
  .p-an-toc .instrument::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
    background:linear-gradient(115deg,color-mix(in srgb,#fff 7%,transparent) 0 30%,transparent 30.5%)}
  .p-an-toc .dial{width:100%;height:auto;display:block;overflow:visible}
  .p-an-toc .dial .arc{stroke:color-mix(in srgb,var(--ink) 18%,transparent)}
  .p-an-toc .dial .tick{stroke:color-mix(in srgb,var(--ink) 35%,transparent)}
  .p-an-toc .dial .tick.on{stroke:var(--teal)}
  .p-an-toc .dial .tlabel{font:600 8px var(--font-mono);fill:var(--muted)}
  .p-an-toc .dial .tlabel.on{fill:var(--teal)}
  .p-an-toc .dial .needle{stroke:var(--grana);stroke-width:2.2;stroke-linecap:round}
  .p-an-toc .dial .hub{fill:var(--card);stroke:var(--grana);stroke-width:2}
  .p-an-toc .readout{min-width:0;font-family:var(--font-mono)}
  .p-an-toc .ro-k{font:600 9px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
  .p-an-toc .ro-ch{font:700 clamp(15px,1.4vw,19px)/1.2 var(--font-display);color:var(--ink);margin:6px 0 4px;letter-spacing:-.01em}
  .p-an-toc .ro-ch span{color:var(--teal);font-family:var(--font-mono);font-size:.72em;margin-right:8px}
  .p-an-toc .ro-gloss{font:500 11.5px/1.45 var(--font-mono);color:var(--muted);min-height:2.9em}
  .p-an-toc .ro-foot{display:flex;gap:12px;margin-top:8px;font:600 9px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-an-toc .ro-foot b{color:var(--teal);font-weight:600}

  /* right column: poster-scale index */
  .p-an-toc .index{min-height:0;display:grid;grid-auto-rows:minmax(0,1fr);border-top:1px solid color-mix(in srgb,var(--ink) 22%,transparent);counter-reset:row}
  .p-an-toc .row{position:relative;min-height:0;display:grid;grid-template-columns:clamp(30px,3vw,44px) minmax(0,1fr) auto;align-items:center;gap:clamp(8px,1.4vw,18px);
    border-bottom:1px solid color-mix(in srgb,var(--ink) 14%,transparent);color:var(--ink);text-decoration:none;
    transition:opacity .25s var(--ease)}
  .p-an-toc .index:hover .row:not(:hover),.p-an-toc .index:focus-within .row:not(:focus-visible){opacity:.38}
  .p-an-toc .row-num{font:700 11px/1 var(--font-mono);color:var(--teal);letter-spacing:.08em;align-self:center}
  .p-an-toc .row-main{min-width:0;display:flex;align-items:baseline;gap:clamp(10px,1.6vw,22px)}
  .p-an-toc .row-title{font-family:var(--font-display);font-weight:600;font-size:clamp(30px,min(4.2vw,6.2vh),64px);line-height:1;letter-spacing:-.035em;white-space:nowrap;
    transition:transform .35s var(--ease),color .25s var(--ease)}
  .p-an-toc .row-gloss{font:500 11.5px/1.3 var(--font-mono);color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;
    opacity:0;transform:translateX(-6px);transition:opacity .25s var(--ease),transform .3s var(--ease)}
  .p-an-toc .row-end{display:flex;align-items:center;gap:12px}
  .p-an-toc .row-state{font:600 8.5px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--teal);display:flex;align-items:center;gap:6px}
  .p-an-toc .row-state::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}
  .p-an-toc .row-state.in-progress{color:var(--orange)}
  .p-an-toc .row-arrow{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);color:var(--accent);
    transition:background .25s var(--ease),color .25s var(--ease),transform .3s var(--ease)}
  .p-an-toc .row-arrow .ic{width:13px;height:13px}
  .p-an-toc .row:hover .row-title,.p-an-toc .row:focus-visible .row-title{transform:translateX(10px);color:var(--accent)}
  .p-an-toc .row:hover .row-gloss,.p-an-toc .row:focus-visible .row-gloss{opacity:1;transform:none}
  .p-an-toc .row:hover .row-arrow,.p-an-toc .row:focus-visible .row-arrow{background:var(--accent);color:var(--paper);transform:rotate(-45deg)}
  .p-an-toc .row:focus-visible{outline:none}
  .p-an-toc .row:focus-visible .row-num{outline:2px solid var(--accent);outline-offset:4px}

  @media(max-width:980px){
    .p-an-toc .row-gloss{display:none}
  }
  @media(max-width:900px){
    html[data-toc] .page.p-an-toc,.p-an-toc{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:clamp(10px,2vh,18px)}
    .p-an-toc .instrument{display:none}
    .p-an-toc .big{font-size:clamp(44px,13vw,68px)}
    .p-an-toc .lede{margin-top:8px;font-size:12px}
    .p-an-toc .cta-row{margin-top:10px}
    .p-an-toc .cv-alt{display:none}
    .p-an-toc .row{grid-template-columns:26px minmax(0,1fr) auto}
    .p-an-toc .row-title{font-size:clamp(24px,7.4vw,34px)}
    .p-an-toc .row-state{display:none}
    .p-an-toc .row-arrow{width:26px;height:26px}
  }
  @media(prefers-reduced-motion:reduce){
    .p-an-toc .row-title,.p-an-toc .row-gloss,.p-an-toc .row-arrow{transition:none;transform:none!important}
  }
`

function Dial({ active, count }: { active: number; count: number }) {
  const reduce = useReducedMotion()
  const step = DIAL_SWEEP / count
  // idle (-1) rests at the left stop; channel i points at its tick
  const angle = active < 0 ? -90 : -90 + step * (active + 0.5)
  const { stiffness, damping } = springs.gentle
  const rot = useSpring(angle, { stiffness, damping })
  useEffect(() => {
    if (reduce) rot.jump(angle)
    else rot.set(angle)
  }, [angle, reduce, rot])
  // SVG rotate(a cx cy) pivots on the hub; motion won't drive a <g> transform attribute, so mirror the spring into state
  const [needle, setNeedle] = useState(angle)
  useMotionValueEvent(rot, "change", setNeedle)
  const ticks = Array.from({ length: count }, (_, i) => {
    const a = ((-180 + step * (i + 0.5)) * Math.PI) / 180
    const x1 = DIAL_CX + Math.cos(a) * (DIAL_R - 8)
    const y1 = DIAL_CY + Math.sin(a) * (DIAL_R - 8)
    const x2 = DIAL_CX + Math.cos(a) * DIAL_R
    const y2 = DIAL_CY + Math.sin(a) * DIAL_R
    const lx = DIAL_CX + Math.cos(a) * (DIAL_R + 11)
    const ly = DIAL_CY + Math.sin(a) * (DIAL_R + 11)
    return { i, x1, y1, x2, y2, lx, ly }
  })
  return (
    <svg className="dial" viewBox="0 0 200 110" aria-hidden="true">
      <path className="arc" d={`M ${DIAL_CX - DIAL_R} ${DIAL_CY} A ${DIAL_R} ${DIAL_R} 0 0 1 ${DIAL_CX + DIAL_R} ${DIAL_CY}`} fill="none" strokeWidth="1.2" />
      <path className="arc" d={`M ${DIAL_CX - DIAL_R + 14} ${DIAL_CY} A ${DIAL_R - 14} ${DIAL_R - 14} 0 0 1 ${DIAL_CX + DIAL_R - 14} ${DIAL_CY}`} fill="none" strokeWidth=".6" strokeDasharray="1.5 3.5" />
      {ticks.map((t) => (
        <g key={t.i}>
          <line className={`tick${t.i === active ? " on" : ""}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth="1.6" />
          <text className={`tlabel${t.i === active ? " on" : ""}`} x={t.lx} y={t.ly + 3} textAnchor="middle">{String(t.i + 1).padStart(2, "0")}</text>
        </g>
      ))}
      <g transform={`rotate(${needle} ${DIAL_CX} ${DIAL_CY})`}>
        <line className="needle" x1={DIAL_CX} y1={DIAL_CY + 8} x2={DIAL_CX} y2={DIAL_CY - DIAL_R + 12} />
      </g>
      <circle className="hub" cx={DIAL_CX} cy={DIAL_CY} r="5" />
    </svg>
  )
}

export function AnalystHome() {
  const reduce = useReducedMotion()
  const clock = useGoaClock()
  const [active, setActive] = useState(-1)

  useOneScreen("toc")

  // Routes come from worlds.ts nav (Home itself excluded)
  const entries: SubsystemMeta[] = WORLDS.analyst.nav
    .filter((n) => !n.end)
    .map((n) => {
      const meta = ANALYST_META[n.to] ?? { num: "00", gloss: "Operational subsystem", status: "in progress" as const }
      return { to: n.to, label: n.label, ...meta }
    })

  const current = active >= 0 ? entries[active] : null
  const built = entries.filter((e) => e.status === "built").length

  const listVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.12 } },
  }
  const rowVariants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.lg },
    visible: { opacity: 1, y: 0, transition: springs.gentle },
  }

  return (
    <main className="page p-an-toc" aria-label="The Analyst: subsystem index">
      <style>{CSS}</style>

      <section className="poster">
        <div>
          <div className="kick">
            LOG.00 / Instrument logbook / Subsystems<span className="caret" aria-hidden="true">▍</span>
          </div>
          <h1 className="big">
            The<br />Analyst<em>.</em>
          </h1>
          <p className="lede">
            Aspiring <b>Technology Consultant</b>. Chemical engineer turned analyst. Decisions, not dashboards.
          </p>
          <div className="cta-row">
            <a className="cv-cta" href="/Tuhin_Bhattacharya_Resume.pdf" download>
              <Icon id="i-download" /> Résumé PDF
            </a>
            <Link className="cv-alt" to="/analyst/contact">Get in touch</Link>
          </div>
        </div>

        <div className="instrument" aria-live="polite">
          <Dial active={active} count={entries.length} />
          <div className="readout">
            <div className="ro-k">{current ? "Channel selected" : "Standing by"}</div>
            <div className="ro-ch">
              {current ? <><span>CH {current.num}</span>{current.label}</> : <><span>CH --</span>Pick a subsystem</>}
            </div>
            <div className="ro-gloss">{current ? current.gloss : "Point at any line on the right to read its channel."}</div>
            <div className="ro-foot">
              <span>Goa <b>{clock}</b> IST</span>
              <span><b>{built}/{entries.length}</b> online</span>
            </div>
          </div>
        </div>
      </section>

      <motion.nav
        className="index"
        aria-label="Subsystems"
        variants={listVariants}
        initial="hidden"
        animate="visible"
        onMouseLeave={() => setActive(-1)}
      >
        {entries.map((entry, i) => (
          <motion.div key={entry.to} variants={rowVariants} style={{ display: "grid", minHeight: 0 }}>
            <Link
              to={entry.to}
              className="row"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(-1)}
            >
              <span className="row-num">{entry.num}</span>
              <span className="row-main">
                <span className="row-title">{entry.label}</span>
                <span className="row-gloss">{entry.gloss}</span>
              </span>
              <span className="row-end">
                <span className={`row-state ${entry.status.replace(" ", "-")}`}>{entry.status}</span>
                <span className="row-arrow" aria-hidden="true"><Icon id="i-arrow" /></span>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.nav>
    </main>
  )
}
