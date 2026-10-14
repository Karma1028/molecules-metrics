import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"

// Content lifted verbatim from the real CV (public/Tuhin_Bhattacharya_Resume.pdf).
const PDF = "/Tuhin_Bhattacharya_Resume.pdf"

const RTABS = [
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

const EXP = [
  {
    role: "Data Science Intern", org: "InfoLeap Research", when: "Mar - Aug 2026",
    bullets: [
      "Self-serve Streamlit MIS over 4,010 respondents, replacing a 5-user PHP dashboard; two-proportion Z-test at 95% in every comparable cell.",
      "Pulse pipeline: 1 LLM call sorts columns into 22 fixed buckets, 6,623 verbatims indexed for BM25, hand-coding cut over 95%.",
    ],
  },
  {
    role: "Business Intelligence Intern", org: "Celebal Technologies", when: "Jul - Dec 2023",
    bullets: [
      "Static Excel P&L to live Power BI: 300+ DAX across 54 pages, query load down 60%+, star schema on 35K rows.",
      "Pure Storage: 150+ KPIs in 2 weeks and 50+ SQL/DAX queries documented in one shared metric repository.",
    ],
  },
]

const PROJECTS = [
  { t: "Give Goa · Tourism Water-Stress", d: "501 respondents, 21 zones, 86.43% water-stress signal, filterable Power BI." },
  { t: "Quant Portfolio Strategy", d: "XGBoost on Tata Motors (54.8% directional), 30+ features, FinBERT regime filter." },
]

const SKILLS = ["Power BI", "DAX", "SQL", "Python", "Pandas", "Streamlit", "Plotly", "LLM APIs", "Supabase", "GCP", "CI/CD", "Z-test", "ANOVA", "Logistic Reg."]

const CSS = String.raw`
  .p-rs{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1220px;margin:0 auto;width:100%;overflow:hidden}
  .p-rs .grid{flex:1;min-height:0;display:grid;grid-template-columns:4.3fr 7.7fr;grid-template-rows:auto 1fr auto;
    gap:clamp(9px,1.2vw,15px);grid-template-areas:"id exp" "edu exp" "edu side"}
  .p-rs .grid>*{min-width:0;min-height:0}
  .p-rs .a-id{grid-area:id} .p-rs .a-edu{grid-area:edu} .p-rs .a-exp{grid-area:exp} .p-rs .a-side{grid-area:side}

  .p-rs .pnl{background:color-mix(in srgb,var(--card) 92%,transparent);border:1px solid color-mix(in srgb,var(--accent) 16%,var(--rule));
    border-radius:12px;box-shadow:var(--shadow-sm);overflow:hidden;display:flex;flex-direction:column}
  .p-rs .ph{display:flex;align-items:center;gap:8px;padding:8px 13px;border-bottom:1px solid var(--rule);
    font:500 9.5px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);flex:0 0 auto}
  .p-rs .ph .ic{width:13px;height:13px;color:var(--accent)}
  .p-rs .pb{flex:1;min-height:0;padding:clamp(10px,1.3vw,15px);display:flex;flex-direction:column;overflow:hidden}
  .p-rs .a-id .log-head{border-bottom:none;padding-bottom:0;margin-bottom:0}

  /* identity + download */
  .p-rs .name{font-family:var(--font-display);font-weight:700;font-size:clamp(20px,2.4vw,30px);line-height:1;letter-spacing:-.02em;color:var(--ink)}
  .p-rs .role{font:600 10.5px/1.4 var(--font-mono);letter-spacing:.06em;color:var(--muted);margin-top:5px}
  .p-rs .role b{color:var(--accent)}
  .p-rs .dl{margin-top:auto;display:inline-flex;align-items:center;justify-content:space-between;gap:12px;text-decoration:none;
    background:var(--accent);color:#fff;border-radius:30px;padding:9px 9px 9px 16px;font:600 10px/1 var(--font-mono);letter-spacing:.14em;
    text-transform:uppercase;transition:transform .5s cubic-bezier(.32,.72,0,1),filter .3s}
  .p-rs .dl:hover{transform:translateY(-2px);filter:brightness(1.08)}
  .p-rs .dl .circ{width:28px;height:28px;border-radius:50%;background:color-mix(in srgb,#000 18%,transparent);display:grid;place-items:center;
    transition:transform .5s cubic-bezier(.32,.72,0,1)}
  .p-rs .dl:hover .circ{transform:translateY(2px)}
  .p-rs .dl .circ .ic{width:13px;height:13px;color:#fff}

  /* education rows */
  .p-rs .edu{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-around}
  .p-rs .edu-row{display:grid;grid-template-columns:1fr auto;gap:4px 10px;align-items:center;padding:clamp(5px,.9vh,10px) 0;border-bottom:1px solid var(--rule)}
  .p-rs .edu-row:last-child{border-bottom:none}
  .p-rs .edu-t{font-family:var(--font-display);font-weight:600;font-size:clamp(12px,1.15vw,14.5px);color:var(--ink);line-height:1.1}
  .p-rs .edu-p{font:600 10px/1.2 var(--font-mono);color:var(--muted);grid-column:1}
  .p-rs .edu-g{font:700 13px/1 var(--font-mono);color:var(--teal);font-variant-numeric:tabular-nums;grid-row:1 / 3;align-self:center}
  .p-rs .edu-y{font:500 9px/1 var(--font-mono);letter-spacing:.1em;color:var(--muted);grid-row:1 / 3;align-self:center;white-space:nowrap}
  .p-rs .edu-row{grid-template-columns:1fr auto auto;column-gap:12px}

  /* experience */
  .p-rs .exp{flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(8px,1.2vh,14px)}
  .p-rs .job{flex:1;min-height:0;display:flex;flex-direction:column;border-left:2px solid var(--accent);padding-left:12px}
  .p-rs .job-top{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
  .p-rs .job-role{font-family:var(--font-display);font-weight:600;font-size:clamp(14px,1.5vw,18px);color:var(--ink);line-height:1.1}
  .p-rs .job-org{font:600 11px/1 var(--font-mono);color:var(--accent)}
  .p-rs .job-when{margin-left:auto;font:500 9.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
  .p-rs .job ul{list-style:none;margin:7px 0 0;padding:0;display:flex;flex-direction:column;gap:5px}
  .p-rs .job li{position:relative;padding-left:13px;font-size:11.5px;line-height:1.4;color:var(--muted);text-wrap:pretty}
  .p-rs .job li::before{content:"";position:absolute;left:0;top:7px;width:4px;height:4px;border-radius:50%;background:var(--accent)}
  .p-rs .job li b{color:var(--ink);font-weight:600}

  /* side: skills + projects */
  .p-rs .side{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:clamp(10px,1.3vw,18px)}
  .p-rs .side h3{font:500 9px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
  .p-rs .chips{display:flex;flex-wrap:wrap;gap:5px;align-content:flex-start}
  .p-rs .chips span{font:600 9.5px/1 var(--font-mono);color:var(--ink);background:var(--paper2);border:1px solid var(--rule);
    border-radius:20px;padding:5px 9px}
  .p-rs .projs{display:flex;flex-direction:column;gap:9px;border-left:1px solid var(--rule);padding-left:clamp(10px,1.3vw,18px)}
  .p-rs .proj .pt{font-family:var(--font-display);font-weight:600;font-size:12.5px;color:var(--ink);line-height:1.15}
  .p-rs .proj .pd{font-size:10.5px;line-height:1.35;color:var(--muted);margin-top:2px}

  .p-rs .rtabs{display:none}

  @media(max-width:760px){
    .p-rs{height:100%;min-height:0;overflow:hidden}
    .p-rs .rtabs{display:flex;gap:5px;overflow-x:auto;overflow-y:hidden;padding-bottom:3px;margin-bottom:8px;flex:0 0 auto}
    .p-rs .rtab{padding:5px 10px;font:600 10px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;
      border-radius:20px;border:1px solid var(--rule);background:transparent;color:var(--muted);cursor:pointer;white-space:nowrap;flex:0 0 auto}
    .p-rs .rtab.on{color:var(--accent);border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent)}
    .p-rs .grid{display:flex;flex-direction:column;gap:8px;flex:1;min-height:0}
    .p-rs .grid .a-id{flex:0 0 auto;min-height:0}
    .p-rs .grid .a-exp,.p-rs .grid .a-edu,.p-rs .grid .a-side{display:none;flex:1;min-height:0}
    .p-rs .grid[data-tab="exp"] .a-exp{display:flex}
    .p-rs .grid[data-tab="edu"] .a-edu{display:flex}
    .p-rs .grid[data-tab="side"] .a-side{display:flex}
    .p-rs .side{grid-template-columns:1fr;gap:8px}
    .p-rs .projs{border-left:none;border-top:1px solid var(--rule);padding-left:0;padding-top:8px}
    .p-rs .job li{font-size:10.5px;line-height:1.3}
  }

  @media(min-width:761px) and (max-width:900px){
    .p-rs{height:100%;min-height:0;overflow:hidden}
    .p-rs .grid{grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr 1fr;
      grid-template-areas:"id id" "exp edu" "side side";gap:10px;flex:1;min-height:0}
    .p-rs .pnl{min-height:0}
    .p-rs .job li{font-size:11px}
  }
`

export function Resume() {
  const reduce = useReducedMotion()
  const [rtab, setRtab] = useState("exp")

  useOneScreen()

  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.04 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.sm, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  }

  return (
    <main className="page p-rs" aria-label="Résumé">
      <style>{CSS}</style>

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

      <motion.div className="grid" data-tab={rtab} variants={container} initial="hidden" animate="visible">
        {/* identity + download */}
        <motion.section className="pnl a-id" variants={item}>
          <div className="pb">
            <LogHeader
              log="LOG.05"
              section="RESUME"
              tag="curriculum-vitae"
              title="Tuhin Bhattacharya"
              lede={<>BI &amp; Data Analyst · <b>chem-eng to analytics</b></>}
              right={
                <a className="dl" href={PDF} download style={{ marginTop: 0 }}>
                  Download PDF
                  <span className="circ"><Icon id="i-download" /></span>
                </a>
              }
            />
          </div>
        </motion.section>

        {/* education */}
        <motion.section className="pnl a-edu" variants={item}>
          <div className="ph"><Icon id="i-award" /> Academic Record</div>
          <div className="pb">
            <div className="edu">
              {EDU.map((e) => (
                <div className="edu-row" key={e.t}>
                  <div className="edu-t">{e.t}</div>
                  <span className="edu-y">{e.y}</span>
                  <span className="edu-g">{e.g}</span>
                  <div className="edu-p">{e.p}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* experience */}
        <motion.section className="pnl a-exp" variants={item}>
          <div className="ph"><Icon id="i-chart" /> Experience · 12 months</div>
          <div className="pb">
            <div className="exp">
              {EXP.map((j) => (
                <div className="job" key={j.org}>
                  <div className="job-top">
                    <span className="job-role">{j.role}</span>
                    <span className="job-org">{j.org}</span>
                    <span className="job-when">{j.when}</span>
                  </div>
                  <ul>{j.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* skills + projects */}
        <motion.section className="pnl a-side" variants={item}>
          <div className="ph"><Icon id="i-cpu" /> Competencies &amp; Projects</div>
          <div className="pb">
            <div className="side">
              <div>
                <h3>Core stack</h3>
                <div className="chips">{SKILLS.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
              <div className="projs">
                <h3>Selected projects</h3>
                {PROJECTS.map((p) => (
                  <div className="proj" key={p.t}>
                    <div className="pt">{p.t}</div>
                    <div className="pd">{p.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  )
}
