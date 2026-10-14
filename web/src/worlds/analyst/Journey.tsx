import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"

// Every date, institution, CGPA and role below is taken verbatim from the
// real CV (public/Tuhin_Bhattacharya_Resume.pdf). Nothing fabricated.
interface Node {
  icon: string
  period: string
  title: string
  place: string
  metric: string
  note: string
}
interface Era {
  tag: string
  span: string
  accent: "pen" | "teal" | "orange"
  nodes: Node[]
}

const ERAS: Era[] = [
  {
    tag: "Foundations",
    span: "2008 – 2018",
    accent: "pen",
    nodes: [
      {
        icon: "i-award", period: "2008 – 2016", title: "Secondary (WBBSE)",
        place: "Bankura Zilla School", metric: "93.85%", note: "Bankura, West Bengal.",
      },
      {
        icon: "i-award", period: "2016 – 2018", title: "Higher Secondary, Science",
        place: "Bankura Banga Vidyalaya", metric: "90.00%", note: "Physics, chemistry, maths.",
      },
    ],
  },
  {
    tag: "Engineering",
    span: "2019 – 2023",
    accent: "teal",
    nodes: [
      {
        icon: "i-flask", period: "2019 – 2023", title: "B.E. Chemical Engineering",
        place: "Jadavpur University", metric: "8.32 CGPA", note: "Mass balances, process optimization, DoE.",
      },
      {
        icon: "i-chart", period: "Jul – Dec 2023", title: "Business Intelligence Intern",
        place: "Celebal Technologies", metric: "6 months", note: "Power BI P&L, 300+ DAX, star schema.",
      },
    ],
  },
  {
    tag: "Analytics",
    span: "2025 - 2027",
    accent: "orange",
    nodes: [
      {
        icon: "i-database", period: "2025 - 2027", title: "PGDM, Big Data Analytics",
        place: "Goa Institute of Management", metric: "5.23 CGPA", note: "Minor: IT & Ops. In progress.",
      },
      {
        icon: "i-route", period: "Mar - Aug 2026", title: "Data Science Intern",
        place: "InfoLeap Research", metric: "6 months", note: "Streamlit MIS, GenAI survey pipelines.",
      },
    ],
  },
]

const CSS = String.raw`
  .p-jn{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1200px;margin:0 auto;width:100%;overflow:hidden}

  .p-jn .jn-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;
    padding-bottom:clamp(8px,1.5vh,14px);margin-bottom:clamp(10px,1.8vh,18px);border-bottom:1px solid var(--rule)}
  .p-jn .jn-kick{display:inline-flex;align-items:center;gap:8px;font:500 10px/1 var(--font-mono);letter-spacing:.26em;
    text-transform:uppercase;color:var(--accent)}
  .p-jn .jn-kick .ic{width:13px;height:13px}
  .p-jn .jn-title{font-family:var(--font-display);font-weight:700;font-size:clamp(24px,3.3vw,40px);line-height:1;
    letter-spacing:-.02em;color:var(--ink);margin:8px 0 5px}
  .p-jn .jn-lede{font-size:clamp(12px,1vw,14px);color:var(--muted);max-width:52ch}
  .p-jn .jn-lede b{color:var(--ink);font-weight:600}
  .p-jn .jn-arc{display:flex;flex-direction:column;gap:6px;align-items:flex-end;text-align:right;white-space:nowrap}
  .p-jn .jn-arc .flow{font:600 10px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
    display:inline-flex;align-items:center;gap:8px}
  .p-jn .jn-arc .flow b{color:var(--ink)} .p-jn .jn-arc .flow .a{color:var(--accent)}
  .p-jn .jn-arc .flow .ic{width:12px;height:12px;color:var(--accent)}
  .p-jn .jn-arc .sub{font:500 9px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}

  /* the telemetry rail: 3 era columns + a connecting spine */
  .p-jn .rail{flex:1;min-height:0;position:relative;display:grid;grid-template-columns:repeat(3,1fr);
    gap:clamp(10px,1.4vw,20px);align-content:stretch}
  .p-jn .spine{position:absolute;left:3%;right:3%;top:clamp(26px,4vh,40px);height:2px;z-index:0;
    background:linear-gradient(90deg,var(--pen),var(--teal) 50%,var(--orange));opacity:.5;border-radius:2px}

  .p-jn .era{position:relative;z-index:1;min-height:0;display:flex;flex-direction:column}
  .p-jn .era-head{display:flex;align-items:center;gap:9px;margin-bottom:clamp(8px,1.4vh,16px)}
  .p-jn .era-dot{width:13px;height:13px;border-radius:50%;flex:0 0 auto;border:2px solid var(--paper);
    box-shadow:0 0 0 2px currentColor,0 0 12px -2px currentColor}
  .p-jn .era.pen{color:var(--pen)} .p-jn .era.teal{color:var(--teal)} .p-jn .era.orange{color:var(--orange)}
  .p-jn .era-meta{display:flex;flex-direction:column;gap:1px}
  .p-jn .era-tag{font-family:var(--font-display);font-weight:700;font-size:clamp(14px,1.5vw,18px);color:var(--ink);line-height:1}
  .p-jn .era-span{font:500 9px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}

  .p-jn .nodes{flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(8px,1.3vh,14px)}
  .p-jn .node{flex:1;min-height:0;background:color-mix(in srgb,var(--card) 92%,transparent);
    border:1px solid color-mix(in srgb,var(--accent) 16%,var(--rule));border-left:2px solid currentColor;
    border-radius:10px;box-shadow:var(--shadow-sm);padding:clamp(11px,1.5vh,16px) clamp(12px,1.3vw,16px);
    display:flex;flex-direction:column;justify-content:center;gap:4px;transition:border-color .3s,box-shadow .3s,transform .3s}
  .p-jn .node:hover{box-shadow:var(--glow);transform:translateY(-2px)}
  .p-jn .node-top{display:flex;align-items:center;gap:8px}
  .p-jn .node-ic{width:15px;height:15px;color:currentColor;flex:0 0 auto}
  .p-jn .node-per{font:500 9px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-left:auto}
  .p-jn .node-metric{font:700 12px/1 var(--font-mono);color:currentColor;font-variant-numeric:tabular-nums;
    padding:3px 8px;border-radius:20px;background:color-mix(in srgb,currentColor 12%,transparent)}
  .p-jn .node-title{font-family:var(--font-display);font-weight:600;font-size:clamp(13px,1.3vw,16px);color:var(--ink);
    line-height:1.12;letter-spacing:-.01em}
  .p-jn .node-place{font:600 10.5px/1.3 var(--font-mono);color:var(--muted)}
  .p-jn .node-note{font-size:11px;line-height:1.35;color:var(--muted);text-wrap:pretty}

  .p-jn .jtabs{display:none}

  @media(max-width:760px){
    .p-jn{height:100%;min-height:0;overflow:hidden}
    .p-jn .spine{display:none}
    .p-jn .jn-arc{display:none}
    .p-jn .jtabs{display:flex;gap:4px;overflow:hidden;margin-bottom:8px;flex:0 0 auto}
    .p-jn .jtab{flex:1 1 0;min-width:0;text-align:center;padding:6px 4px;font:600 10px/1 var(--font-mono);letter-spacing:.06em;text-transform:uppercase;
      border-radius:16px;border:1px solid var(--rule);background:transparent;color:var(--muted);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .p-jn .jtab .jtab-span{display:none}
    .p-jn .jtab.on{color:var(--accent);border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent)}
    .p-jn .rail{flex:1;min-height:0;display:flex;flex-direction:column;gap:8px}
    .p-jn .era{display:none;flex:1;min-height:0;flex-direction:column}
    .p-jn .rail[data-tab="0"] .era:nth-of-type(1){display:flex}
    .p-jn .rail[data-tab="1"] .era:nth-of-type(2){display:flex}
    .p-jn .rail[data-tab="2"] .era:nth-of-type(3){display:flex}
    .p-jn .nodes{flex:1;min-height:0;gap:8px}
    .p-jn .node{min-height:0;padding:8px 12px;gap:3px}
    .p-jn .node-note{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:10.5px}
  }

  @media(min-width:761px) and (max-width:880px){
    .p-jn{height:100%;min-height:0;overflow:hidden}
    .p-jn .spine{display:none}
    .p-jn .jn-arc{display:none}
    .p-jn .rail{grid-template-columns:repeat(3,1fr);gap:10px;flex:1;min-height:0}
    .p-jn .node{min-height:0;padding:8px 10px}
  }
`

export function Journey() {
  const reduce = useReducedMotion()
  const [jtab, setJtab] = useState(0)

  useOneScreen()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } },
  }
  const col = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  }

  return (
    <main className="page p-jn" aria-label="Career and academic journey">
      <style>{CSS}</style>

      <LogHeader
        log="LOG.03"
        section="JOURNEY"
        tag="2008-2027"
        title="From reactors to regressions."
        lede={<>A straight line through <b>chemical engineering</b>, a Celebal BI internship, and a Big Data Analytics PGDM. Same instinct throughout: <b>measure, tune, de-bottleneck</b>.</>}
        right={
          <div className="jn-arc">
            <span className="flow">
              <b>chem-eng</b> <Icon id="i-arrow" /> <span className="a">analytics</span>
            </span>
            <span className="sub">6 stations · 2008 - 2027</span>
          </div>
        }
      />

      <div className="jtabs" role="tablist" aria-label="Journey eras">
        {ERAS.map((e, idx) => (
          <button
            key={e.tag}
            type="button"
            role="tab"
            className={`jtab${jtab === idx ? " on" : ""}`}
            aria-selected={jtab === idx}
            onClick={() => setJtab(idx)}
          >
            {e.tag}<span className="jtab-span"> · {e.span}</span>
          </button>
        ))}
      </div>

      <motion.div className="rail" data-tab={jtab} variants={container} initial="hidden" animate="visible">
        <div className="spine" aria-hidden="true" />
        {ERAS.map((e) => (
          <motion.section className={`era ${e.accent}`} key={e.tag} variants={col}>
            <div className="era-head">
              <span className="era-dot" />
              <div className="era-meta">
                <span className="era-tag">{e.tag}</span>
                <span className="era-span">{e.span}</span>
              </div>
            </div>
            <div className="nodes">
              {e.nodes.map((n) => (
                <article className="node" key={n.title}>
                  <div className="node-top">
                    <Icon id={n.icon} className="ic node-ic" />
                    <span className="node-metric">{n.metric}</span>
                    <span className="node-per">{n.period}</span>
                  </div>
                  <h2 className="node-title">{n.title}</h2>
                  <div className="node-place">{n.place}</div>
                  <p className="node-note">{n.note}</p>
                </article>
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </main>
  )
}
