import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { Headline } from "../../components/headline/Headline"

// Content lifted verbatim from the real CV (public/Tuhin_Bhattacharya_Resume.pdf).
const PDF = "/Tuhin_Bhattacharya_Resume.pdf"

type TabId = "exp" | "edu" | "side"
const RTABS: { id: TabId; label: string }[] = [
  { id: "exp", label: "Experience" },
  { id: "edu", label: "Education" },
  { id: "side", label: "Stack & Projects" },
]

const EDU = [
  { t: "PGDM · Big Data Analytics", p: "Goa Institute of Management", y: "2025 - 27", g: "5.23" },
  { t: "B.E. · Chemical Engineering", p: "Jadavpur University", y: "2019 - 23", g: "8.32" },
  { t: "Higher Secondary · Science", p: "Bankura Banga Vidyalaya", y: "2016 - 18", g: "90.0%" },
  { t: "Secondary (WBBSE)", p: "Bankura Zilla School", y: "2008 - 16", g: "93.9%" },
]

export const EXP = [
  {
    role: "Data Science Intern", org: "InfoLeap Research · Remote", when: "Mar - Aug 2026",
    bullets: [
      "Self-serve Streamlit MIS over 4,010 respondents, replacing a 5-user PHP dashboard; two-proportion Z-test at 95% in every comparable cell.",
      "Pulse pipeline: 1 LLM call sorts columns into 22 fixed buckets, 6,623 verbatims indexed for BM25, hand-coding cut over 95%.",
    ],
  },
  {
    role: "Business Intelligence Intern", org: "Celebal Technologies · Jaipur", when: "Jul - Dec 2023",
    bullets: [
      "Static Excel P&L to live Power BI: 300+ DAX across 54 pages, query load down 60%+, star schema on 35K rows.",
      "Pure Storage: 150+ KPIs in 2 weeks and 200+ SQL/DAX queries documented in one shared metric repository.",
    ],
  },
]

/** A grade only gets a bar when its own string states the scale (a percentage). CGPA scales are not on the CV, so none is assumed. */
const pctOf = (g: string): number | null => (g.endsWith("%") ? Number.parseFloat(g) / 100 : null)

const PROJECTS = [
  { t: "Give Goa · Tourism Water-Stress", d: "501 respondents, 21 zones, 86.43% water-stress signal, filterable Power BI." },
  { t: "Quant Portfolio Strategy", d: "XGBoost on Tata Motors (54.8% directional), 30+ features, FinBERT regime filter." },
]

const SKILLS = ["Power BI", "DAX", "SQL", "Python", "Pandas", "Streamlit", "Plotly", "LLM APIs", "Supabase", "GCP", "CI/CD", "Z-test", "ANOVA", "Logistic Reg."]

const STAGGER_S = 0.07

const CSS = String.raw`
  html[data-one-screen] .page.p-rs,html[data-toc] .page.p-rs,.p-rs{min-height:0;display:grid;
    grid-template-columns:minmax(0,5fr) minmax(0,7fr);grid-template-rows:auto minmax(0,1fr);grid-template-areas:"poster sheet" "edu sheet";
    column-gap:clamp(20px,4vw,64px);row-gap:clamp(10px,2vh,22px);max-width:1240px;margin:0 auto;width:100%;overflow:hidden;position:relative}

  /* material: graph paper, same sheet as the Analyst index */
  .p-rs::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
    background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px),
      linear-gradient(color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px);
    background-size:24px 24px,24px 24px,120px 120px,120px 120px;
    mask-image:radial-gradient(ellipse 80% 75% at 50% 45%,#000 40%,transparent 100%)}

  /* left top: poster */
  .p-rs .rs-poster{grid-area:poster;min-width:0}
  .p-rs .rs-kick{display:inline-flex;align-items:center;gap:8px;font:600 10px/1.4 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--teal)}
  .p-rs .rs-kick .ic{width:13px;height:13px}
  .p-rs .rs-big{font-family:var(--font-display);font-weight:700;font-size:clamp(56px,min(7.6vw,12vh),120px);line-height:.86;letter-spacing:-.045em;color:var(--ink);margin:clamp(6px,1.2vh,14px) 0 0}
  .p-rs .rs-big em{font-style:normal;color:var(--accent)}
  .p-rs .rs-lede{font:500 clamp(12px,1vw,14px)/1.5 var(--font-mono);color:var(--muted);margin:clamp(12px,2.2vh,22px) 0 0;max-width:38ch}
  .p-rs .rs-lede b{color:var(--ink);font-weight:600}
  .p-rs .rs-cta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:clamp(10px,1.8vh,18px)}
  .p-rs .rs-dl{display:inline-flex;align-items:center;gap:12px;text-decoration:none;background:var(--accent);color:var(--paper);border-radius:30px;
    padding:8px 8px 8px 16px;font:600 10.5px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;transition:filter ${motionTokens.duration.normal}s var(--ease)}
  .p-rs .rs-dl:hover{filter:brightness(1.08)}
  .p-rs .rs-dl .circ{width:28px;height:28px;border-radius:50%;background:color-mix(in srgb,#000 18%,transparent);display:grid;place-items:center;transition:transform ${motionTokens.duration.normal}s var(--ease)}
  .p-rs .rs-dl:hover .circ{transform:translateY(2px)}
  .p-rs .rs-dl .ic{width:13px;height:13px}
  .p-rs .rs-alt{font:500 11px/1 var(--font-mono);letter-spacing:.08em;color:var(--muted);text-decoration:underline;text-underline-offset:3px}
  .p-rs .rs-alt:hover{color:var(--accent)}

  /* left bottom: academic record, each grade read out on its own gauge */
  .p-rs .rs-edu{grid-area:edu;min-height:0;display:flex;flex-direction:column;justify-content:flex-end}
  .p-rs .rs-h{display:flex;align-items:center;gap:7px;font:700 9px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--teal);
    padding-bottom:8px;border-bottom:1px solid var(--rule)}
  .p-rs .rs-h .ic{width:12px;height:12px}
  .p-rs .rs-h .sc{margin-left:auto;color:var(--muted);letter-spacing:.12em}
  .p-rs .edu-row{display:grid;grid-template-columns:minmax(0,1fr) auto auto;column-gap:12px;row-gap:3px;align-items:center;
    padding:clamp(5px,.9vh,9px) 0;border-bottom:1px dashed color-mix(in srgb,var(--ink) 12%,transparent)}
  .p-rs .edu-t{font:600 clamp(12.5px,1.1vw,15px)/1.15 var(--font-display);color:var(--ink)}
  .p-rs .edu-p{font:500 10px/1.3 var(--font-mono);color:var(--muted);grid-column:1}
  .p-rs .edu-y{font:500 9px/1 var(--font-mono);letter-spacing:.1em;color:var(--muted);grid-row:1 / 3;grid-column:2;white-space:nowrap}
  .p-rs .edu-g{font:700 clamp(13px,1.2vw,17px)/1 var(--font-mono);color:var(--teal);font-variant-numeric:tabular-nums;grid-row:1 / 3;grid-column:3;text-align:right;min-width:4.2ch}
  .p-rs .edu-g small{display:block;font:600 7.5px/1 var(--font-mono);letter-spacing:.14em;color:var(--muted);margin-top:3px}
  .p-rs .edu-bar{grid-column:1 / -1;position:relative;height:5px;border-radius:3px;overflow:hidden;margin-top:3px;
    background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--ink) 9%,transparent) 0 calc(10% - 2px),transparent calc(10% - 2px) 10%)}
  .p-rs .edu-bar i{position:absolute;inset:0;transform-origin:left center;border-radius:inherit;background:linear-gradient(90deg,var(--teal),var(--accent))}

  /* right: the CV as an instrument panel, same frame as the Skills lens */
  .p-rs .rs-desk{grid-area:sheet;min-height:0;display:flex}
  .p-rs .rs-sheet{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(8px,1.5vh,14px);overflow:hidden;
    padding:clamp(14px,2.4vh,26px) clamp(16px,2vw,30px);border-radius:16px;
    background:linear-gradient(140deg,color-mix(in srgb,var(--card) 74%,transparent),color-mix(in srgb,var(--card) 38%,transparent));
    border:1px solid color-mix(in srgb,var(--teal) 22%,var(--rule));backdrop-filter:blur(10px);
    box-shadow:inset 0 1px 0 color-mix(in srgb,#fff 8%,transparent),var(--shadow-sm)}
  .p-rs .rs-sheet::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
    background:linear-gradient(115deg,color-mix(in srgb,#fff 6%,transparent) 0 26%,transparent 26.5%)}
  .p-rs .sh-head{display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:1px solid var(--rule);padding-bottom:clamp(8px,1.4vh,12px)}
  .p-rs .sh-name{display:inline-flex;align-items:center;gap:8px;font:600 10px/1.3 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
  .p-rs .sh-name .live{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
  .p-rs .sh-meta{font:600 8.5px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);text-align:right;
    padding:5px 8px;border:1px solid var(--rule);border-radius:20px;white-space:nowrap}

  .p-rs .exp{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-evenly;gap:clamp(8px,1.4vh,14px)}
  .p-rs .job{position:relative;display:flex;flex-direction:column;padding-left:14px}
  .p-rs .job::before{content:"";position:absolute;left:0;top:2px;bottom:2px;width:3px;border-radius:2px;background:linear-gradient(var(--accent),var(--teal))}
  .p-rs .job-top{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:baseline;column-gap:12px;row-gap:4px}
  .p-rs .job-role{font:600 clamp(16px,1.75vw,24px)/1.1 var(--font-display);letter-spacing:-.015em;color:var(--ink)}
  .p-rs .job-org{grid-row:2;font:600 10.5px/1.2 var(--font-mono);letter-spacing:.06em;color:var(--teal)}
  .p-rs .job-when{grid-row:1 / 3;grid-column:2;align-self:center;font:700 9px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;
    color:var(--ink);padding:6px 9px;border:1px solid color-mix(in srgb,var(--teal) 34%,transparent);border-radius:6px;white-space:nowrap;
    background:color-mix(in srgb,var(--teal) 8%,transparent);font-variant-numeric:tabular-nums}
  .p-rs .job ul{list-style:none;margin:clamp(6px,1.1vh,10px) 0 0;padding:0;display:flex;flex-direction:column}
  .p-rs .job li{position:relative;padding:clamp(4px,.8vh,7px) 0 clamp(4px,.8vh,7px) 16px;font-size:clamp(12px,min(1vw,1.9vh),14.5px);line-height:1.5;
    color:color-mix(in srgb,var(--ink) 86%,var(--muted));text-wrap:pretty;border-top:1px dashed color-mix(in srgb,var(--ink) 12%,transparent)}
  .p-rs .job li::before{content:"";position:absolute;left:1px;top:calc(clamp(4px,.8vh,7px) + .55em);width:6px;height:6px;border-radius:1px;background:var(--teal)}

  .p-rs .side{flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,1.6vw,22px);padding-top:clamp(8px,1.4vh,14px);border-top:1px solid var(--rule)}
  .p-rs .side h3{display:flex;justify-content:space-between;font:700 8.5px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin:0 0 8px}
  .p-rs .side h3 b{color:var(--teal);font-variant-numeric:tabular-nums}
  .p-rs .chips{display:flex;flex-wrap:wrap;gap:4px;align-content:flex-start}
  .p-rs .chips span{font:600 9.5px/1 var(--font-mono);color:var(--ink);background:color-mix(in srgb,var(--teal) 7%,transparent);
    border:1px solid color-mix(in srgb,var(--teal) 26%,transparent);border-radius:4px;padding:5px 7px}
  .p-rs .projs{display:flex;flex-direction:column;gap:8px}
  .p-rs .proj{padding-left:10px;border-left:2px solid color-mix(in srgb,var(--teal) 50%,transparent)}
  .p-rs .proj .pt{font:600 12.5px/1.15 var(--font-display);color:var(--ink)}
  .p-rs .proj .pd{font:500 10.5px/1.4 var(--font-mono);color:var(--muted);margin-top:3px}

  .p-rs .rtabs{display:none}

  @media(max-width:900px){
    html[data-one-screen] .page.p-rs,html[data-toc] .page.p-rs,.p-rs{grid-template-columns:1fr;grid-template-rows:auto auto minmax(0,1fr);
      grid-template-areas:"poster" "tabs" "sheet";row-gap:10px}
    .p-rs .rs-big{font-size:clamp(40px,11vw,64px);margin-top:4px}
    .p-rs .rs-big br{display:none}
    .p-rs .rs-lede{font-size:11px;margin-top:5px;max-width:none}
    .p-rs .rs-cta{margin-top:8px}
    .p-rs .rs-dl{padding:6px 6px 6px 12px;font-size:9.5px}
    .p-rs .rs-dl .circ{width:24px;height:24px}
    .p-rs .rtabs{grid-area:tabs;display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
    .p-rs .rtab{padding:7px 6px;font:600 9.5px/1.15 var(--font-mono);letter-spacing:.06em;text-transform:uppercase;text-align:center;
      border-radius:20px;border:1px solid var(--rule);background:transparent;color:var(--muted);cursor:pointer}
    .p-rs .rtab.on{color:var(--accent);border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent)}
    .p-rs .rs-edu{grid-area:sheet;justify-content:flex-start;display:none}
    .p-rs[data-tab="edu"] .rs-edu{display:flex}
    .p-rs[data-tab="edu"] .rs-desk{display:none}
    .p-rs .rs-sheet{padding:12px 14px}
    
    .p-rs[data-tab="side"] .exp{display:none}
    .p-rs .side{grid-template-columns:1fr;border-top:0;padding-top:0;gap:14px}
    .p-rs .job li{font-size:12px;line-height:1.4;padding-top:4px;padding-bottom:4px}
    .p-rs .job li::before{top:calc(4px + .5em)}
    .p-rs .edu-row{padding:10px 0}
  }
  @media(max-width:600px){
    .p-rs[data-tab="exp"] .side{display:none}
  }
  @media(max-width:900px) and (max-height:760px){
    .p-rs .rs-lede{display:none}
  }
  @media(prefers-reduced-motion:reduce){
    .p-rs .rs-dl,.p-rs .rs-dl .circ{transition:none}
  }
`

export function Resume() {
  const reduce = useReducedMotion() ?? false
  const [rtab, setRtab] = useState<TabId>("exp")

  useOneScreen()

  const lift = (k: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.sm },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { ...springs.gentle, delay: k * STAGGER_S },
  })

  return (
    <main className="page p-rs" aria-label="Résumé" data-tab={rtab}>
      <style>{CSS}</style>

      <section className="rs-poster">
        <span className="rs-kick"><Icon id="i-award" /> Log.05 · Curriculum vitae</span>
        <Headline world="analyst" className="rs-big">On<br /> <em>paper.</em></Headline>
        <p className="rs-lede">
          <b>Tuhin Bhattacharya.</b> Aspiring Technology Consultant, <b>chem-eng to analytics</b>. The one-page version, verbatim from the PDF.
        </p>
        <div className="rs-cta">
          <a className="rs-dl" href={PDF} download>
            Download PDF
            <span className="circ"><Icon id="i-download" /></span>
          </a>
          <Link className="rs-alt" to="/analyst/contact">Get in touch</Link>
        </div>
      </section>

      <div className="rtabs" role="tablist" aria-label="Resume sections">
        {RTABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            className={`rtab${rtab === t.id ? " on" : ""}`}
            aria-selected={rtab === t.id}
            onClick={() => setRtab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.section className="rs-edu" aria-label="Academic record" {...lift(1)}>
        <div className="rs-h"><Icon id="i-award" /> Academic record <span className="sc">{EDU.length} entries</span></div>
        {EDU.map((e, k) => {
          const pct = pctOf(e.g)
          return (
            <div className="edu-row" key={e.t}>
              <div className="edu-t">{e.t}</div>
              <span className="edu-y">{e.y}</span>
              <span className="edu-g">{e.g}{pct === null && <small>CGPA</small>}</span>
              <div className="edu-p">{e.p}</div>
              {pct !== null && (
                <span className="edu-bar" role="meter" aria-label={`${e.t} score`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct * 100}>
                  <motion.i
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: pct }}
                    transition={reduce ? { duration: 0 } : { ...springs.gentle, delay: motionTokens.duration.normal + k * STAGGER_S }}
                  />
                </span>
              )}
            </div>
          )
        })}
      </motion.section>

      <div className="rs-desk">
        <motion.article
          className="rs-sheet"
          aria-label="Experience, stack and projects"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : springs.gentle}
        >
          <header className="sh-head">
            <span className="sh-name"><span className="live" aria-hidden="true" />Tuhin Bhattacharya</span>
            <span className="sh-meta">Experience · 12 months</span>
          </header>

          <div className="exp">
            {EXP.map((j, k) => (
              <motion.div className="job" key={j.org} {...lift(k + 2)}>
                <div className="job-top">
                  <span className="job-role">{j.role}</span>
                  <span className="job-org">{j.org}</span>
                  <span className="job-when">{j.when}</span>
                </div>
                <ul>{j.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              </motion.div>
            ))}
          </div>

          <motion.div className="side" {...lift(4)}>
            <div>
              <h3>Core stack <b>{SKILLS.length}</b></h3>
              <div className="chips">{SKILLS.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
            <div className="projs">
              <h3>Selected projects <b>{PROJECTS.length}</b></h3>
              {PROJECTS.map((p) => (
                <div className="proj" key={p.t}>
                  <div className="pt">{p.t}</div>
                  <div className="pd">{p.d}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </main>
  )
}
