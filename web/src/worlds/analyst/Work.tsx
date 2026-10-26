import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { TwinDoor } from "../../components/TwinDoor"
import { Headline } from "../../components/headline/Headline"

/**
 * The Work — honest living work-log, styled as an instrument panel.
 *
 * HONESTY CONTRACT (see .karma/RETRO.md T:b1): every entry here is real or an
 * explicitly-marked reserved slot. No invented clients, projects, or metrics.
 * `shipped` entries carry only facts defensible in an interview; anything not
 * yet verified reads "pending" in plain sight. `reserved` slots are deliberate
 * empty instrument readouts — the log fills as real work is written up.
 */

export type Status = "shipped" | "writeup" | "reserved"

interface Readout {
  v: string
  k: string
  pending?: boolean
}

export interface LogEntry {
  id: string
  reg: string
  tag: string
  title: string
  role: string
  icon: string
  status: Status
  // shipped / writeup
  problem?: string
  method?: string
  result?: string
  readouts?: Readout[]
  // reserved
  reservedNote?: string
}

export const STATUS_LABEL: Record<Status, string> = {
  shipped: "shipped",
  writeup: "in write-up",
  reserved: "reserved",
}

export const ENTRIES: LogEntry[] = [
  {
    id: "barca",
    reg: "LOG.01",
    tag: "PERSONAL BUILD",
    title: "FC Barcelona Analytics System",
    role: "solo build · data + football",
    icon: "i-ball",
    status: "shipped",
    problem:
      "Public football data is scattered across StatsBomb, FBref and Transfermarkt, and a plain dashboard won't tell you if a player is ascending or a side is overperforming its xG. I wanted a system that reads a match and gives a verdict.",
    method:
      "Pulled event-level and season data (StatsBomb, FBref, Transfermarkt valuations), normalised to per-90, and built Club and Player views in Python and Streamlit: rolling form, xG for vs against, xG+xA per 90 vs positional average, valuation vs performance.",
    result:
      "Updates after every Barcelona match into an opinionated per-match dossier, not just numbers. Personal project across the 2020-26 seasons. Every figure comes straight from the source feeds, nothing hand-entered.",
    readouts: [
      { v: "2020-26", k: "seasons" },
      { v: "Event-level", k: "data" },
      { v: "xG/xA/GCA", k: "metrics" },
      { v: "Python", k: "stack" },
    ],
  },
  {
    id: "infoleap",
    reg: "LOG.02",
    tag: "INTERNSHIP",
    title: "InfoLeap · Survey Intelligence (LENS)",
    role: "Data Science Intern",
    icon: "i-cpu",
    status: "writeup",
    problem:
      "Market-research surveys produce thousands of quantitative responses plus open-text feedback, and analysts need answers that are correct and traceable back to the exact respondents and documents, not a black-box summary.",
    method:
      "Built an agentic tool with hierarchical LLM orchestration (a planner delegating to code and synthesis) on a strict Fetch-Wide, Process-Local rule: SQL pulls the rows, Python does the maths. Qualitative feedback returns structured JSON so every claim cites its respondent IDs.",
    result:
      "Internship work, full case study still being written up. Headline figures are cleared and listed on the résumé. The method and my contribution are honest exactly as stated here.",
    readouts: [
      { v: "Agentic", k: "approach" },
      { v: "SQL + Python", k: "split" },
      { v: "pending", k: "metrics", pending: true },
      { v: "verified-only", k: "write-up", pending: true },
    ],
  },
  {
    id: "blinkit",
    reg: "LOG.03",
    tag: "PERSONAL BUILD",
    title: "Blinkit Retail Dashboard",
    role: "solo build · BI",
    icon: "i-grid",
    status: "shipped",
    problem:
      "Retail sales and inventory data is only useful if someone can read outlet performance, category mix and fulfilment at a glance. The raw tables do not answer a manager's questions on their own.",
    method:
      "Modelled the data and built an interactive Power BI dashboard: DAX measures for sales, outlet and category breakdowns, backed by a generated dataset and an Excel and Python loading pipeline.",
    result:
      "Shipped as a portfolio dashboard (a .pbix plus a web portfolio page). Power BI is a skill I am still deepening, so this is logged as real finished work, not a mock.",
    readouts: [
      { v: "Power BI", k: "tool" },
      { v: "DAX", k: "measures" },
      { v: "Retail", k: "domain" },
      { v: "Dashboard", k: "deliverable" },
    ],
  },
]


type StepId = "problem" | "method" | "result"
const STEPS: { id: StepId; label: string; icon: string }[] = [
  { id: "problem", label: "Problem", icon: "i-scale" },
  { id: "method", label: "Approach", icon: "i-funnel" },
  { id: "result", label: "Status", icon: "i-chart" },
]
const STAMP_TILT = -7
const STAGGER_S = 0.06

const pad = (v: number) => String(v).padStart(2, "0")

const CSS = String.raw`
  html[data-one-screen] .page.p-wk,html[data-toc] .page.p-wk,.p-wk{min-height:0;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);
    gap:clamp(20px,4vw,64px);max-width:1240px;margin:0 auto;width:100%;overflow:hidden;position:relative}

  /* material: graph paper, same sheet as the Analyst index */
  .p-wk::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
    background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px),
      linear-gradient(color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px);
    background-size:24px 24px,24px 24px,120px 120px,120px 120px;
    mask-image:radial-gradient(ellipse 80% 75% at 50% 45%,#000 40%,transparent 100%)}

  /* left: poster + ledger index */
  .p-wk .wk-poster{min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(10px,2vh,22px)}
  .p-wk .wk-kick{display:inline-flex;align-items:center;gap:8px;font:600 10px/1.4 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--teal-ink)}
  .p-wk .wk-kick .live{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
  .p-wk .wk-big{font-family:var(--font-display);font-weight:700;font-size:clamp(56px,min(7.6vw,13vh),120px);line-height:.86;letter-spacing:-.045em;color:var(--ink);margin:clamp(6px,1.2vh,14px) 0 0}
  .p-wk .wk-big em{font-style:normal;color:var(--accent-ink)}
  .p-wk .wk-lede{font:500 clamp(12px,1vw,14px)/1.5 var(--font-mono);color:var(--muted);margin:clamp(8px,1.6vh,16px) 0 0;max-width:36ch}
  .p-wk .wk-lede b{color:var(--ink);font-weight:600}

  .p-wk .wk-index{display:flex;flex-direction:column;border-top:1px solid var(--rule)}
  .p-wk .wk-row{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(10px,1.2vw,16px);
    padding:clamp(8px,1.5vh,14px) 10px;border:0;border-bottom:1px solid var(--rule);background:transparent;color:var(--muted);
    text-align:left;cursor:pointer;transition:color ${motionTokens.duration.fast}s var(--ease)}
  .p-wk .wk-row:hover,.p-wk .wk-row.on{color:var(--ink)}
  .p-wk .wk-row:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
  .p-wk .wk-row .bar{position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(var(--accent),var(--teal));border-radius:2px}
  .p-wk .wk-row .rn{font:700 clamp(20px,2.2vw,30px)/1 var(--font-mono);letter-spacing:-.02em;color:color-mix(in srgb,var(--teal) 70%,var(--muted))}
  .p-wk .wk-row.on .rn{color:var(--teal-ink)}
  .p-wk .wk-row .rt{font:600 clamp(14px,1.35vw,18px)/1.2 var(--font-display);letter-spacing:-.01em;text-wrap:balance}
  .p-wk .wk-row .rs{font:700 8px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;padding:3px 7px;border-radius:20px;white-space:nowrap;
    color:var(--teal-ink);border:1px solid color-mix(in srgb,var(--teal) 30%,transparent)}
  .p-wk .wk-row .rs[data-s="writeup"]{color:var(--orange-ink);border-color:color-mix(in srgb,var(--orange) 34%,transparent)}
  .p-wk .wk-row .rs[data-s="reserved"]{color:var(--muted);border-color:var(--rule)}
  .p-wk .wk-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;
    font:500 10px/1.5 var(--font-mono);letter-spacing:.06em;color:var(--muted)}
  .p-wk .wk-foot b{color:var(--teal-ink);font-weight:600}
  .p-wk .wk-foot .n{color:var(--ink);font-weight:700}

  /* right: the case file */
  .p-wk .wk-file{position:relative;min-height:0;display:flex;flex-direction:column;overflow:hidden;
    padding:clamp(14px,2.4vh,26px) clamp(16px,2vw,30px);border-radius:16px;
    background:linear-gradient(140deg,color-mix(in srgb,var(--card) 74%,transparent),color-mix(in srgb,var(--card) 38%,transparent));
    border:1px solid color-mix(in srgb,var(--teal) 22%,var(--rule));backdrop-filter:blur(10px);
    box-shadow:inset 0 1px 0 color-mix(in srgb,#fff 8%,transparent),var(--shadow-sm)}
  .p-wk .wk-file::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
    background:linear-gradient(115deg,color-mix(in srgb,#fff 6%,transparent) 0 26%,transparent 26.5%)}
  .p-wk .wk-ghost{position:absolute;right:clamp(10px,1.6vw,24px);bottom:clamp(44px,7vh,64px);font:800 clamp(110px,13vw,200px)/.74 var(--font-display);letter-spacing:-.06em;
    color:color-mix(in srgb,var(--teal) 8%,transparent);pointer-events:none;user-select:none}
  .p-wk .wk-case{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(8px,1.3vh,14px)}
  .p-wk .wk-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
  .p-wk .wk-reg{display:inline-flex;align-items:center;gap:7px;font:600 10px/1.3 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--accent-ink)}
  .p-wk .wk-reg .ic{width:14px;height:14px}
  .p-wk .wk-role{display:block;font:500 10.5px/1.3 var(--font-mono);letter-spacing:.06em;color:var(--muted);margin-top:5px}
  .p-wk .wk-stamp{flex:0 0 auto;font:800 clamp(11px,1vw,14px)/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;padding:7px 11px;
    border:2px solid currentColor;border-radius:6px;color:var(--teal-ink);box-shadow:inset 0 0 0 2px color-mix(in srgb,currentColor 18%,transparent)}
  .p-wk .wk-stamp[data-s="writeup"]{color:var(--orange-ink)}
  .p-wk .wk-stamp[data-s="reserved"]{color:var(--muted)}
  .p-wk .wk-h{font-family:var(--font-display);font-weight:700;font-size:clamp(24px,min(2.8vw,5vh),42px);line-height:1.02;letter-spacing:-.03em;color:var(--ink);margin:0;text-wrap:balance}

  .p-wk .wk-ros{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
  .p-wk .wk-ro{padding:clamp(7px,1.3vh,12px) 10px;border-right:1px dashed color-mix(in srgb,var(--ink) 12%,transparent);min-width:0}
  .p-wk .wk-ro:first-child{padding-left:0}
  .p-wk .wk-ro:last-child{border-right:0}
  .p-wk .wk-ro .v{font:600 clamp(13px,1.3vw,19px)/1.1 var(--font-display);letter-spacing:-.02em;color:var(--ink);text-wrap:balance}
  .p-wk .wk-ro .k{font:600 8.5px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:5px}
  .p-wk .wk-ro.pending .v{color:var(--orange-ink);font-style:italic}

  .p-wk .wk-tabs{display:none}
  .p-wk .wk-steps{flex:0 1 auto;min-height:0;display:grid;align-content:start;border-bottom:1px solid var(--rule)}
  .p-wk .wk-step{display:grid;grid-template-columns:clamp(92px,8vw,112px) minmax(0,1fr);gap:clamp(10px,1.2vw,18px);align-items:baseline;
    padding:clamp(6px,1vh,10px) 0;border-top:1px dashed color-mix(in srgb,var(--ink) 12%,transparent)}
  .p-wk .wk-step:first-child{border-top:0}
  .p-wk .wk-lab{display:inline-flex;align-items:center;gap:6px;font:700 9px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--teal-ink)}
  .p-wk .wk-lab b{font-weight:700;color:var(--muted);letter-spacing:.04em;font-variant-numeric:tabular-nums}
  .p-wk .wk-lab .ic{width:12px;height:12px}
  .p-wk .wk-p{margin:0;font-size:clamp(12px,min(.98vw,1.8vh),14px);line-height:1.5;color:color-mix(in srgb,var(--ink) 86%,var(--muted));text-wrap:pretty}

  /* meters: built only from this file's own data (readout flags, ledger statuses) */
  .p-wk .wk-meters{margin-top:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(12px,1.6vw,24px);
    padding-top:clamp(8px,1.4vh,14px);border-top:1px solid var(--rule)}
  .p-wk .wk-mt{display:flex;flex-direction:column;gap:6px;min-width:0}
  .p-wk .wk-mk{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font:600 8.5px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
  .p-wk .wk-mk b{font:700 clamp(12px,1.1vw,15px)/1 var(--font-mono);letter-spacing:0;color:var(--teal-ink);font-variant-numeric:tabular-nums}
  .p-wk .wk-segs{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:4px}
  .p-wk .wk-seg{position:relative;height:clamp(8px,1.2vh,12px);border-radius:3px;overflow:hidden;background:color-mix(in srgb,var(--ink) 8%,transparent)}
  .p-wk .wk-seg i{position:absolute;inset:0;transform-origin:left center;background:linear-gradient(90deg,var(--teal),var(--accent))}
  .p-wk .wk-seg i[data-s="writeup"],.p-wk .wk-seg i[data-s="pending"]{background:var(--orange)}
  .p-wk .wk-seg i[data-s="reserved"]{background:var(--muted)}
  .p-wk .wk-seg.on{box-shadow:0 0 0 1.5px var(--ink)}
  .p-wk .wk-ml{display:flex;justify-content:space-between;gap:6px;font:500 8.5px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
  .p-wk .wk-ml span{white-space:nowrap}
  .p-wk .wk-reserved{flex:1;display:flex;flex-direction:column;justify-content:center;gap:10px}
  .p-wk .wk-reserved p{margin:0;font-size:14px;line-height:1.5;color:var(--muted);max-width:52ch}

  .p-wk .wk-nav{display:flex;justify-content:space-between;align-items:center;gap:10px;flex:0 0 auto;padding-top:clamp(8px,1.4vh,14px)}
  .p-wk .wk-keys{font:500 9.5px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .p-wk .wk-btns{display:flex;gap:6px}
  .p-wk .wk-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 11px;border-radius:8px;border:1px solid var(--rule);background:transparent;
    font:600 10px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink);cursor:pointer;transition:border-color ${motionTokens.duration.fast}s var(--ease),color ${motionTokens.duration.fast}s var(--ease)}
  .p-wk .wk-btn:hover{border-color:var(--accent);color:var(--accent-ink)}
  .p-wk .wk-btn .ic{width:12px;height:12px}
  .p-wk .wk-btn.prev .ic{transform:scaleX(-1)}

  @media(max-width:900px){
    html[data-one-screen] .page.p-wk,html[data-toc] .page.p-wk,.p-wk{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:10px}
    .p-wk .wk-poster{gap:8px}
    .p-wk .wk-big{font-size:clamp(40px,11vw,64px);margin-top:4px}
    .p-wk .wk-big br{display:none}
    .p-wk .wk-lede{font-size:11px;margin-top:5px;max-width:none}
    .p-wk .wk-index{flex-direction:row;border-top:0;gap:6px}
    .p-wk .wk-row{flex:1;min-width:0;grid-template-columns:auto minmax(0,1fr);gap:6px;padding:7px 8px;border:1px solid var(--rule);border-radius:8px}
    .p-wk .wk-row .bar{top:auto;left:8px;right:8px;bottom:-1px;width:auto;height:2px}
    .p-wk .wk-row .rn{font-size:15px}
    .p-wk .wk-row{align-items:start}
    .p-wk .wk-row .rt{font-size:10.5px;line-height:1.15;text-wrap:balance}
    .p-wk .wk-row .rs{display:none}
    .p-wk .wk-foot .fn{display:none}
    .p-wk .wk-file{padding:12px 14px;border-radius:12px}
    .p-wk .wk-ghost{font-size:96px;bottom:48px}
    .p-wk .wk-case{gap:8px}
    .p-wk .wk-stamp{font-size:9.5px;padding:5px 8px}
    .p-wk .wk-h{font-size:clamp(19px,5.4vw,26px)}
    .p-wk .wk-ro{padding:6px 6px}
    .p-wk .wk-ro .v{font-size:12.5px}
    .p-wk .wk-ro .k{font-size:7px;letter-spacing:.1em}
    .p-wk .wk-step{grid-template-columns:clamp(84px,13vw,104px) minmax(0,1fr)}
    .p-wk .wk-p{font-size:12.5px}
    .p-wk .wk-meters{gap:12px;padding-top:8px}
    .p-wk .wk-ml{font-size:7.5px;letter-spacing:.04em}
    .p-wk .wk-keys{display:none}
  }
  @media(max-width:600px){
    .p-wk .wk-tabs{display:flex;gap:4px;flex:0 0 auto}
    .p-wk .wk-tab{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:6px 4px;border-radius:7px;border:1px solid var(--rule);
      background:transparent;font:700 9px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted);cursor:pointer}
    .p-wk .wk-tab .ic{width:11px;height:11px}
    .p-wk .wk-tab.on{color:var(--teal-ink);border-color:color-mix(in srgb,var(--teal) 45%,transparent);background:color-mix(in srgb,var(--teal) 10%,transparent)}
    .p-wk .wk-step{display:none;grid-template-columns:1fr}
    .p-wk .wk-step.on{display:grid}
    .p-wk .wk-step{padding:6px 0 4px}
    .p-wk .wk-step .wk-lab{display:none}
    .p-wk .wk-steps{border-bottom:0}
    .p-wk .wk-p{font-size:13px;line-height:1.5}
  }
  @media(max-width:900px) and (max-height:760px){
    .p-wk .wk-lede{display:none}
  }
  @media(prefers-reduced-motion:reduce){
    .p-wk .wk-row,.p-wk .wk-btn{transition:none}
  }
`

/** Two segment gauges, derived only from ENTRIES: which readouts are verified, and the ledger's status mix. */
function Meters({ active, activeIdx, reduce }: { active: LogEntry; activeIdx: number; reduce: boolean }) {
  const ros = active.readouts ?? []
  const verified = ros.filter((r) => !r.pending).length
  const fill = (k: number) =>
    reduce
      ? { initial: false as const, animate: { scaleX: 1 } }
      : {
          initial: { scaleX: 0 },
          animate: { scaleX: 1 },
          transition: { ...springs.gentle, delay: motionTokens.duration.fast + k * STAGGER_S },
        }
  const counts = (Object.keys(STATUS_LABEL) as Status[])
    .map((st) => ({ st, n: ENTRIES.filter((e) => e.status === st).length }))
    .filter((c) => c.n > 0)

  return (
    <div className="wk-meters" aria-label="Case meters">
      {ros.length > 0 && (
        <div className="wk-mt">
          <div className="wk-mk">Readouts verified <b>{verified}/{ros.length}</b></div>
          <div className="wk-segs" aria-hidden="true">
            {ros.map((r, k) => (
              <span key={r.k} className="wk-seg">
                <motion.i data-s={r.pending ? "pending" : "ok"} {...fill(k)} />
              </span>
            ))}
          </div>
          <div className="wk-ml" aria-hidden="true">
            {ros.map((r) => <span key={r.k}>{r.k}</span>)}
          </div>
        </div>
      )}
      <div className="wk-mt">
        <div className="wk-mk">Ledger <b>{pad(activeIdx + 1)}/{pad(ENTRIES.length)}</b></div>
        <div className="wk-segs" aria-hidden="true">
          {ENTRIES.map((e, k) => (
            <span key={e.id} className={`wk-seg${k === activeIdx ? " on" : ""}`}>
              <motion.i data-s={e.status} {...fill(k)} />
            </span>
          ))}
        </div>
        <div className="wk-ml">
          {counts.map((c) => <span key={c.st}>{c.n} {STATUS_LABEL[c.st]}</span>)}
        </div>
      </div>
    </div>
  )
}

export function Work() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [step, setStep] = useState<StepId>("problem")
  const reduce = useReducedMotion() ?? false

  useOneScreen()

  const active = ENTRIES[activeIdx]
  const shippedCount = ENTRIES.filter((e) => e.status === "shipped").length

  const pick = useCallback((idx: number) => {
    setActiveIdx(idx)
    setStep("problem")
  }, [])
  const next = useCallback(() => pick((activeIdx + 1) % ENTRIES.length), [activeIdx, pick])
  const prev = useCallback(() => pick((activeIdx - 1 + ENTRIES.length) % ENTRIES.length), [activeIdx, pick])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        next()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      } else {
        const d = parseInt(e.key, 10)
        if (d >= 1 && d <= ENTRIES.length) {
          e.preventDefault()
          pick(d - 1)
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev, pick])

  return (
    <main className="page p-wk" aria-label="Analyst work log">
      <style>{CSS}</style>

      {/* Character hook: analyst guide + data-bot creature (wired after asset gen) */}
      <div style={{ display: "none" }} data-character-slot="analyst-guide-creature" />

      <section className="wk-poster">
        <div>
          <span className="wk-kick"><span className="live" aria-hidden="true" /> Log.02 · Production ledger</span>
          <Headline world="analyst" className="wk-big">The<br /> <em>work.</em></Headline>
          <p className="wk-lede">An honest ledger. <b>Real work, verified numbers.</b> No logo wall, nothing inflated.</p>
        </div>

        <nav className="wk-index" aria-label="Work entries">
          {ENTRIES.map((e, idx) => (
            <button
              key={e.id}
              type="button"
              className={`wk-row${idx === activeIdx ? " on" : ""}`}
              onClick={() => pick(idx)}
              aria-current={idx === activeIdx}
              aria-label={`${e.title}, ${STATUS_LABEL[e.status]}`}
            >
              {idx === activeIdx && (
                <motion.span className="bar" layoutId="wk-bar" transition={reduce ? { duration: 0 } : springs.snappy} />
              )}
              <span className="rn">{pad(idx + 1)}</span>
              <span className="rt">{e.title}</span>
              <span className="rs" data-s={e.status}>{STATUS_LABEL[e.status]}</span>
            </button>
          ))}
        </nav>

        <div className="wk-foot">
          <TwinDoor
            to={active.id === "barca" ? "/artist/matchday" : "/artist/gallery"}
            label={active.id === "barca" ? "The terrace behind the model" : "Pull the thread: what I see"}
            world="artist"
          />
          <span><span className="n">{shippedCount}</span> shipped · <span className="n">{ENTRIES.length}</span> logged</span>
          <span className="fn">Logged as it ships. <b>Reactor → regression.</b> Same rigour, new instrument.</span>
        </div>
      </section>

      <section className="wk-file" aria-live="polite">
        <span className="wk-ghost" aria-hidden="true">{pad(activeIdx + 1)}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={active.id}
            className="wk-case"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.md }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.sm }}
            transition={reduce ? { duration: motionTokens.duration.fast } : springs.gentle}
          >
            <div className="wk-top">
              <div>
                <span className="wk-reg"><Icon id={active.icon} /> {active.reg} // {active.tag}</span>
                <span className="wk-role">{active.role}</span>
              </div>
              <motion.span
                className="wk-stamp"
                data-s={active.status}
                initial={reduce ? { opacity: 1, rotate: STAMP_TILT } : { opacity: 0, scale: 1.6, rotate: STAMP_TILT * 2 }}
                animate={{ opacity: 1, scale: 1, rotate: STAMP_TILT }}
                transition={reduce ? { duration: 0 } : { ...springs.snappy, delay: motionTokens.duration.fast }}
              >
                {STATUS_LABEL[active.status]}
              </motion.span>
            </div>

            <h2 className="wk-h">{active.title}</h2>

            {active.status === "reserved" ? (
              <div className="wk-reserved">
                <p>{active.reservedNote}</p>
              </div>
            ) : (
              <>
                <div className="wk-ros">
                  {active.readouts?.map((ro) => (
                    <div key={ro.k} className={`wk-ro${ro.pending ? " pending" : ""}`}>
                      <div className="v">{ro.v}</div>
                      <div className="k">{ro.k}</div>
                    </div>
                  ))}
                </div>

                <div className="wk-tabs" role="tablist" aria-label="Case sections">
                  {STEPS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={step === s.id}
                      className={`wk-tab${step === s.id ? " on" : ""}`}
                      onClick={() => setStep(s.id)}
                    >
                      <Icon id={s.icon} /> {s.label}
                    </button>
                  ))}
                </div>

                <div className="wk-steps">
                  {STEPS.map((s, k) => (
                    <div key={s.id} className={`wk-step${step === s.id ? " on" : ""}`}>
                      <span className="wk-lab"><b>{pad(k + 1)}</b><Icon id={s.icon} /> {s.label}</span>
                      <p className="wk-p">{active[s.id]}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Meters active={active} activeIdx={activeIdx} reduce={reduce} />
          </motion.article>
        </AnimatePresence>

        <div className="wk-nav">
          <span className="wk-keys">← → or 1-{ENTRIES.length} to flip the ledger</span>
          <div className="wk-btns">
            <button type="button" className="wk-btn prev" onClick={prev} aria-label="Previous entry"><Icon id="i-arrow" /> Prev</button>
            <button type="button" className="wk-btn" onClick={next} aria-label="Next entry">Next <Icon id="i-arrow" /></button>
          </div>
        </div>
      </section>
    </main>
  )
}
