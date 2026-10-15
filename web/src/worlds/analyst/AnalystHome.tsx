import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { WORLDS } from "../../lib/worlds"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"

interface SubsystemMeta {
  to: string
  label: string
  num: string
  icon: string
  gloss: string
  status: "built" | "in progress"
}

const ANALYST_META: Record<string, { num: string; icon: string; gloss: string; status: "built" | "in progress" }> = {
  "/analyst/skills": {
    num: "01",
    icon: "i-layers",
    gloss: "Mass balance to statistical modeling",
    status: "built",
  },
  "/analyst/work": {
    num: "02",
    icon: "i-grid",
    gloss: "Four production pipelines with verified impact",
    status: "built",
  },
  "/analyst/journey": {
    num: "03",
    icon: "i-route",
    gloss: "Chemical engineering to analytics arc",
    status: "built",
  },
  "/analyst/dashboard": {
    num: "04",
    icon: "i-database",
    gloss: "Live telemetry and operational clock",
    status: "built",
  },
  "/analyst/resume": {
    num: "05",
    icon: "i-download",
    gloss: "Academic PDF and interactive curriculum vitae",
    status: "built",
  },
  "/analyst/contact": {
    num: "06",
    icon: "i-mail",
    gloss: "Direct channel for analytics roles",
    status: "built",
  },
}

const CSS = String.raw`
  .p-an-toc{height:100%;min-height:0;display:flex;flex-direction:column;justify-content:space-between;max-width:1040px;margin:0 auto;width:100%;overflow:hidden}
  
  /* Masthead */
  .p-an-toc .masthead{padding:clamp(2px,1vh,10px) 0 clamp(8px,1.5vh,16px);border-bottom:1px solid color-mix(in srgb,var(--accent) 25%,var(--rule));display:flex;justify-content:space-between;align-items:flex-end}
  .p-an-toc .mast-kick{font:600 10px/1 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--teal)}
  .p-an-toc .mast-title{font-family:var(--font-display);font-size:clamp(24px,3.2vw,38px);font-weight:700;line-height:1;letter-spacing:-.02em;color:var(--ink);margin:4px 0 2px}
  .p-an-toc .mast-sub{font:500 12px/1.4 var(--font-mono);color:var(--muted);letter-spacing:.02em}
  .p-an-toc .mast-sub b{color:var(--teal);font-weight:600}
  .p-an-toc .mast-cta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
  .p-an-toc .cv-cta{display:inline-flex;align-items:center;gap:7px;padding:8px 14px;border-radius:8px;background:var(--accent);color:var(--bg);
    font:600 11px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:filter .2s var(--ease)}
  .p-an-toc .cv-cta .ic{width:13px;height:13px}
  .p-an-toc .cv-cta:hover{filter:brightness(1.08)}
  .p-an-toc .cv-alt{font:500 11px/1 var(--font-mono);letter-spacing:.08em;color:var(--muted);text-decoration:underline;text-underline-offset:3px}
  .p-an-toc .cv-alt:hover{color:var(--accent)}
  .p-an-toc .entry-card{transition:border-color .2s var(--ease)}
  .p-an-toc .entry-card:hover{border-color:var(--accent)}

  /* Index Grid */
  .p-an-toc .index-grid{flex:1;min-height:0;display:grid;grid-template-rows:repeat(6,1fr);gap:clamp(6px,1vh,12px);margin:clamp(8px,1.5vh,16px) 0;overflow:hidden}
  
  .p-an-toc .entry-card{display:grid;grid-template-columns:36px 32px 1.4fr 2fr auto auto;align-items:center;gap:clamp(8px,1.5vw,18px);
    background:var(--card);border:1px solid color-mix(in srgb,var(--accent) 18%,var(--rule));border-radius:8px;padding:0 clamp(12px,1.8vw,20px);
    text-decoration:none;color:inherit;box-shadow:var(--shadow-sm);transform-origin:center left}
  .p-an-toc .entry-num{font:700 12px/1 var(--font-mono);color:var(--teal);letter-spacing:.08em}
  .p-an-toc .entry-ic{width:18px;height:18px;color:var(--accent);display:flex;align-items:center;justify-content:center}
  .p-an-toc .entry-ic .ic{width:16px;height:16px}
  .p-an-toc .entry-title{font-family:var(--font-display);font-weight:600;font-size:clamp(14px,1.2vw,16.5px);color:var(--ink);white-space:nowrap;letter-spacing:-.01em}
  .p-an-toc .entry-gloss{font:500 clamp(11.5px,1vw,13px)/1 var(--font-mono);color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .p-an-toc .entry-state{font:600 8.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;padding:4px 8px;border-radius:4px;white-space:nowrap}
  .p-an-toc .entry-state.built{color:var(--teal);background:color-mix(in srgb,var(--teal) 12%,transparent);border:1px solid color-mix(in srgb,var(--teal) 30%,transparent)}
  .p-an-toc .entry-state.in-progress{color:var(--muted);background:color-mix(in srgb,var(--ink) 6%,transparent);border:1px solid var(--rule)}
  .p-an-toc .entry-arrow{color:var(--accent);opacity:.7;display:flex;align-items:center}
  .p-an-toc .entry-arrow .ic{width:13px;height:13px;transition:transform .2s var(--ease)}
  .p-an-toc .entry-card:hover .entry-arrow .ic{transform:translateX(3px)}

  @media(max-width:760px){
    .p-an-toc .cv-alt{display:none}
    .p-an-toc .entry-card{grid-template-columns:28px 24px 1.2fr auto auto;gap:10px;padding:0 12px}
    .p-an-toc .entry-gloss{display:none}
  }
  @media(max-width:440px){
    .p-an-toc .entry-card{grid-template-columns:24px 1.2fr auto;gap:8px;padding:0 10px}
    .p-an-toc .entry-ic{display:none}
    .p-an-toc .entry-state{font-size:7.5px;padding:3px 6px}
  }
  @media(prefers-reduced-motion:reduce){
    .p-an-toc .entry-card{transform:none!important}
  }
`

export function AnalystHome() {
  const reduce = useReducedMotion()

  useOneScreen("toc")

  // Pull routes directly from worlds.ts nav (exclude Home itself)
  const entries: SubsystemMeta[] = WORLDS.analyst.nav
    .filter((n) => !n.end)
    .map((n) => {
      const meta = ANALYST_META[n.to] || {
        num: "00",
        icon: "i-arrow",
        gloss: "Operational subsystem",
        status: "in progress" as const,
      }
      return {
        to: n.to,
        label: n.label,
        num: meta.num,
        icon: meta.icon,
        gloss: meta.gloss,
        status: meta.status,
      }
    })

  const containerVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.07,
        delayChildren: reduce ? 0 : 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md },
    visible: {
      opacity: 1,
      y: 0,
      transition: springs.gentle,
    },
  }

  return (
    <main className="page p-an-toc" aria-label="Analyst Instrument Logbook Index">
      <style>{CSS}</style>

      <LogHeader
        log="LOG.00"
        section="INSTRUMENT LOGBOOK"
        tag="subsystems"
        title="The Analyst"
        lede={<>Aspiring <b>Technology Consultant</b>. Decisions, not dashboards.</>}
        right={
          <div className="mast-cta">
            <a className="cv-cta" href="/Tuhin_Bhattacharya_Resume.pdf" download>
              <Icon id="i-download" /> Résumé PDF
            </a>
            <Link className="cv-alt" to="/analyst/contact">Get in touch</Link>
          </div>
        }
      />

      <motion.nav
        className="index-grid"
        aria-label="Subsystems"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {entries.map((entry) => (
          <motion.div
            key={entry.to}
            variants={itemVariants}
            whileTap={reduce ? undefined : { scale: motionTokens.scale.press, transition: springs.snappy }}
          >
            <Link to={entry.to} className="entry-card">
              <span className="entry-num">{entry.num}</span>
              <span className="entry-ic">
                <Icon id={entry.icon} />
              </span>
              <span className="entry-title">{entry.label}</span>
              <span className="entry-gloss">{entry.gloss}</span>
              <span className={`entry-state ${entry.status.replace(" ", "-")}`}>
                {entry.status}
              </span>
              <span className="entry-arrow">
                <Icon id="i-arrow" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.nav>
    </main>
  )
}
