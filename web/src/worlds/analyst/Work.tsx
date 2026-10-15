import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"
import { TwinDoor } from "../../components/TwinDoor"

/**
 * The Work — honest living work-log, styled as an instrument panel.
 *
 * HONESTY CONTRACT (see .karma/RETRO.md T:b1): every entry here is real or an
 * explicitly-marked reserved slot. No invented clients, projects, or metrics.
 * `shipped` entries carry only facts defensible in an interview; anything not
 * yet verified reads "pending" in plain sight. `reserved` slots are deliberate
 * empty instrument readouts — the log fills as real work is written up.
 */

type Status = "shipped" | "writeup" | "reserved"

interface Readout {
  v: string
  k: string
  pending?: boolean
}

interface LogEntry {
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

const STATUS_LABEL: Record<Status, string> = {
  shipped: "shipped",
  writeup: "in write-up",
  reserved: "reserved",
}

const ENTRIES: LogEntry[] = [
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
      "Internship work, still being written up. Employer-internal figures stay out until they are cleared and verified. The method and my contribution are honest exactly as stated here.",
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

const CSS = String.raw`
  .p-wk{height:100%;min-height:0;display:flex;flex-direction:column;justify-content:space-between;max-width:1160px;margin:0 auto;width:100%;overflow:hidden}

  /* Masthead */
  .p-wk .masthead{padding:clamp(2px,1vh,8px) 0 clamp(6px,1.2vh,12px);border-bottom:1px solid color-mix(in srgb,var(--teal) 25%,var(--rule));display:flex;justify-content:space-between;align-items:flex-end;gap:16px}
  .p-wk .mast-kick{font:600 10px/1 var(--font-mono);letter-spacing:.24em;text-transform:uppercase;color:var(--teal);display:flex;align-items:center;gap:7px}
  .p-wk .mast-kick .live{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
  .p-wk .mast-title{font-family:var(--font-display);font-size:clamp(22px,3vw,34px);font-weight:700;line-height:1;letter-spacing:-.02em;color:var(--ink);margin:5px 0 3px}
  .p-wk .mast-sub{font:500 11.5px/1.45 var(--font-mono);color:var(--muted);letter-spacing:.01em;max-width:46ch}
  .p-wk .mast-sub b{color:var(--teal);font-weight:600}
  .p-wk .mast-right{font:500 9.5px/1.5 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-align:right;white-space:nowrap}
  .p-wk .mast-right .n{color:var(--ink);font-weight:600}

  /* Body split: index spine + report pane */
  .p-wk .ledger{flex:1;min-height:0;display:grid;grid-template-columns:clamp(220px,26%,300px) 1fr;gap:clamp(12px,1.8vw,22px);margin:clamp(8px,1.4vh,16px) 0}

  /* Index spine */
  .p-wk .spine{display:flex;flex-direction:column;gap:clamp(6px,1vh,10px);min-height:0}
  .p-wk .idx{appearance:none;text-align:left;cursor:pointer;flex:1;min-height:0;
    background:color-mix(in srgb,var(--card) 92%,transparent);border:1px solid var(--rule);border-left:2px solid transparent;border-radius:9px;
    padding:clamp(9px,1.4vh,14px) clamp(11px,1.2vw,15px);display:flex;flex-direction:column;justify-content:center;gap:4px;
    transition:border-color .2s,background .2s,transform .18s}
  .p-wk .idx:hover{background:var(--card)}
  .p-wk .idx.active{border-left-color:var(--teal);border-color:color-mix(in srgb,var(--teal) 35%,var(--rule));background:var(--card);box-shadow:var(--glow)}
  .p-wk .idx-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
  .p-wk .idx-reg{font:700 9.5px/1 var(--font-mono);letter-spacing:.12em;color:var(--teal)}
  .p-wk .idx-title{font-family:var(--font-display);font-size:clamp(13px,1.05vw,15px);font-weight:600;color:var(--ink);line-height:1.25;letter-spacing:-.01em}
  .p-wk .idx-ic{width:14px;height:14px;color:var(--muted)}
  .p-wk .idx.active .idx-ic{color:var(--teal)}

  /* Status chip */
  .p-wk .chip{font:600 8px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;padding:3px 7px;border-radius:20px;white-space:nowrap}
  .p-wk .chip.shipped{color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent);border:1px solid color-mix(in srgb,var(--accent) 30%,transparent)}
  .p-wk .chip.writeup{color:var(--teal);background:color-mix(in srgb,var(--teal) 12%,transparent);border:1px solid color-mix(in srgb,var(--teal) 28%,transparent)}
  .p-wk .chip.reserved{color:var(--muted);background:color-mix(in srgb,var(--ink) 6%,transparent);border:1px dashed var(--rule)}

  /* Report pane */
  .p-wk .pane{position:relative;min-height:0;overflow:hidden}
  .p-wk .report{position:absolute;inset:0;background:color-mix(in srgb,var(--card) 95%,transparent);border:1px solid color-mix(in srgb,var(--teal) 24%,var(--rule));
    border-radius:13px;box-shadow:var(--shadow);padding:clamp(11px,1.6vh,22px) clamp(14px,2vw,24px);display:flex;flex-direction:column;justify-content:flex-start;gap:clamp(5px,1.1vh,11px);
    background-image:radial-gradient(ellipse at 92% 8%,color-mix(in srgb,var(--teal) 9%,transparent),transparent 68%)}
  .p-wk .report::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;border-radius:13px 13px 0 0;background:linear-gradient(90deg,var(--teal),var(--accent),transparent)}

  .p-wk .rep-top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid color-mix(in srgb,var(--teal) 18%,var(--rule));padding-bottom:clamp(6px,1vh,10px)}
  .p-wk .rep-reg{display:inline-flex;align-items:center;gap:7px;font:700 10.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--teal)}
  .p-wk .rep-role{font:500 10px/1 var(--font-mono);color:var(--muted);letter-spacing:.05em}
  .p-wk .rep-h{font-family:var(--font-display);font-size:clamp(16px,0.8vw+1vh,25px);font-weight:700;color:var(--ink);letter-spacing:-.01em;margin:clamp(2px,0.5vh,6px) 0 0;text-wrap:balance}

  .p-wk .steps{flex:1 1 auto;min-height:0;overflow:hidden;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(9px,1.3vw,16px);align-content:start}
  .p-wk .step{min-height:0;overflow:hidden;background:var(--paper2);border:1px solid var(--rule);border-radius:9px;padding:clamp(8px,1.1vh,14px) clamp(10px,1vw,14px)}
  .p-wk .step-lab{font:600 8.5px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--teal);margin-bottom:clamp(4px,0.7vh,7px);display:flex;align-items:center;gap:5px}
  .p-wk .step.res .step-lab{color:var(--accent)}
  .p-wk .step-p{font-size:clamp(9.5px,0.4vw+0.85vh,13px);color:var(--ink);line-height:1.42;text-wrap:pretty}

  .p-wk .readouts{flex:0 0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(8px,1.1vw,13px);border-top:1px dashed color-mix(in srgb,var(--teal) 22%,var(--rule));padding-top:clamp(6px,0.9vh,12px)}
  .p-wk .ro{background:color-mix(in srgb,var(--teal) 8%,var(--card));border:1px solid color-mix(in srgb,var(--teal) 20%,transparent);border-radius:7px;padding:clamp(5px,0.8vh,7px) 10px}
  .p-wk .ro.pending{background:color-mix(in srgb,var(--ink) 4%,transparent);border-style:dashed}
  .p-wk .ro-v{font:700 clamp(13px,0.8vw+0.7vh,19px)/1 var(--font-display);font-variant-numeric:tabular-nums;color:var(--ink)}
  .p-wk .ro.pending .ro-v{color:var(--muted);font-style:italic}
  .p-wk .ro-k{font:500 8px/1.2 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:4px}

  /* Reserved empty state */
  .p-wk .reserved-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;padding:clamp(10px,2vh,24px)}
  .p-wk .reserved-mark{width:clamp(40px,5vw,56px);height:clamp(40px,5vw,56px);border-radius:12px;border:1.5px dashed color-mix(in srgb,var(--teal) 40%,var(--rule));
    display:flex;align-items:center;justify-content:center;color:color-mix(in srgb,var(--teal) 70%,var(--muted))}
  .p-wk .reserved-mark .ic{width:22px;height:22px}
  .p-wk .reserved-note{font-size:clamp(12px,1.05vw,14px);color:var(--muted);line-height:1.6;max-width:50ch;text-wrap:pretty}
  .p-wk .reserved-stamp{font:600 9px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:color-mix(in srgb,var(--teal) 70%,var(--muted));display:flex;align-items:center;gap:7px}
  .p-wk .reserved-stamp::before,.p-wk .reserved-stamp::after{content:"";width:28px;height:1px;background:var(--rule)}

  /* Footer */
  .p-wk .foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid color-mix(in srgb,var(--teal) 22%,var(--rule));padding-top:clamp(6px,1vh,10px)}
  .p-wk .foot-note{font:500 9.5px/1.4 var(--font-mono);letter-spacing:.03em;color:var(--muted)}
  .p-wk .foot-note b{color:var(--teal);font-weight:600}
  .p-wk .nav-btns{display:flex;gap:7px}
  .p-wk .nav-btn{background:var(--card);border:1px solid color-mix(in srgb,var(--teal) 24%,var(--rule));color:var(--ink);padding:5px 11px;border-radius:7px;
    font:600 9.5px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:5px;transition:border-color .2s}
  .p-wk .nav-btn:hover{border-color:color-mix(in srgb,var(--teal) 50%,var(--rule))}
  .p-wk .nav-btn.prev .ic{transform:scaleX(-1)}

  @media(max-width:820px){
    .p-wk .ledger{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:8px}
    .p-wk .spine{flex-direction:row;overflow:hidden;flex:0 0 auto;gap:6px;padding-bottom:0}
    .p-wk .idx{flex:1 1 0;min-width:0;padding:6px 8px;gap:2px;border-left-width:1px;border-top:2px solid transparent}
    .p-wk .idx.active{border-left-color:color-mix(in srgb,var(--teal) 35%,var(--rule));border-top-color:var(--teal)}
    .p-wk .idx-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px}
    .p-wk .idx-role{display:none}
    .p-wk .mast-right{display:none}
    .p-wk .report{padding:13px}
  }
  @media(max-width:560px){
    .p-wk .masthead{padding-top:0;padding-bottom:5px}
    .p-wk .mast-sub{font-size:10.5px}
    .p-wk .report{padding:10px 12px;gap:6px}
    .p-wk .rep-h{font-size:16.5px;line-height:1.1;margin:3px 0 0}
    .p-wk .steps{grid-template-columns:1fr;gap:5px;margin:0}
    .p-wk .step{padding:6px 9px}
    .p-wk .step-lab{margin-bottom:2px}
    .p-wk .step-p{font-size:9.8px;line-height:1.3}
    .p-wk .readouts{grid-template-columns:repeat(2,1fr);gap:5px;padding-top:5px}
    .p-wk .ro{padding:4px 8px}
    .p-wk .ro-v{font-size:14px}
    .p-wk .ro-k{font-size:7.5px}
    .p-wk .rep-role{display:none}
    .p-wk .foot-note{display:none}
  }
  @media(min-width:821px) and (max-height:760px){
    .p-wk .masthead{padding-top:0;padding-bottom:clamp(3px,0.6vh,7px)}
    .p-wk .mast-title{font-size:clamp(19px,2.2vw,26px);margin:2px 0 1px}
    .p-wk .mast-sub{font-size:10px}
    .p-wk .ledger{margin:clamp(5px,0.8vh,9px) 0}
    .p-wk .report{padding:clamp(8px,1vh,13px) clamp(12px,1.5vw,19px);gap:clamp(3px,0.6vh,7px)}
    .p-wk .readouts{padding-top:clamp(4px,0.6vh,9px)}
    .p-wk .rep-h{font-size:clamp(15px,0.7vw+0.8vh,22px)}
    .p-wk .step{padding:clamp(7px,0.9vh,12px) clamp(9px,0.9vw,13px)}
    .p-wk .step-p{font-size:clamp(9px,0.35vw+0.7vh,12px);line-height:1.38}
    .p-wk .step-lab{margin-bottom:clamp(3px,0.5vh,6px)}
    .p-wk .ro{padding:clamp(4px,0.6vh,6px) 9px}
    .p-wk .ro-v{font-size:clamp(12px,0.7vw+0.6vh,17px)}
  }
`

export function Work() {
  const [activeIdx, setActiveIdx] = useState(0)
  const reduce = useReducedMotion()

  useOneScreen()

  const active = ENTRIES[activeIdx]
  const shippedCount = ENTRIES.filter((e) => e.status === "shipped").length

  const next = useCallback(() => {
    setActiveIdx((p) => (p + 1) % ENTRIES.length)
  }, [])
  const prev = useCallback(() => {
    setActiveIdx((p) => (p - 1 + ENTRIES.length) % ENTRIES.length)
  }, [])

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
          setActiveIdx(d - 1)
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev])

  return (
    <main className="page p-wk" aria-label="Analyst work log">
      <style>{CSS}</style>

      {/* Character hook: analyst guide + data-bot creature (wired after asset gen) */}
      <div style={{ display: "none" }} data-character-slot="analyst-guide-creature" />

      <LogHeader
        log="LOG.02"
        section="WORK"
        tag="production-ledger"
        title="The Work"
        lede={<>An honest ledger. <b>Real work, verified numbers.</b> No logo wall, nothing inflated.</>}
        right={
          <div className="mast-right">
            <TwinDoor
              to={active.id === "barca" ? "/artist/matchday" : "/artist/gallery"}
              label={active.id === "barca" ? "The terrace behind the model" : "Pull the thread: what I see"}
              world="artist"
            />
            <div>
              <span className="n">{shippedCount}</span> shipped · <span className="n">{ENTRIES.length}</span> logged
            </div>
          </div>
        }
      />

      <div className="ledger">
        {/* Index spine */}
        <nav className="spine" aria-label="Work entries">
          {ENTRIES.map((e, idx) => (
            <motion.button
              key={e.id}
              className={`idx${idx === activeIdx ? " active" : ""}`}
              onClick={() => setActiveIdx(idx)}
              aria-current={idx === activeIdx}
              whileHover={reduce ? undefined : { x: 2, transition: springs.snappy }}
              whileTap={reduce ? undefined : { scale: motionTokens.scale.press, transition: springs.snappy }}
            >
              <div className="idx-top">
                <span className="idx-reg">{e.reg}</span>
                <span className={`chip ${e.status}`}>{STATUS_LABEL[e.status]}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="idx-ic">
                  <Icon id={e.icon} />
                </span>
                <span className="idx-title">{e.title}</span>
              </div>
            </motion.button>
          ))}
        </nav>

        {/* Report pane */}
        <div className="pane">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              className="report"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.md }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.md }}
              transition={springs.gentle}
            >
              <div className="rep-top">
                <span className="rep-reg">
                  <Icon id={active.icon} />
                  <span>
                    {active.reg} // {active.tag}
                  </span>
                </span>
                <span className="rep-role">{active.role}</span>
              </div>

              <h2 className="rep-h">{active.title}</h2>

              {active.status === "reserved" ? (
                <div className="reserved-body">
                  <span className="reserved-mark" aria-hidden="true">
                    <Icon id={active.icon} />
                  </span>
                  <p className="reserved-note">{active.reservedNote}</p>
                  <span className="reserved-stamp">awaiting real write-up</span>
                </div>
              ) : (
                <>
                  <div className="steps">
                    <div className="step">
                      <div className="step-lab">
                        <Icon id="i-scale" />
                        <span>Problem</span>
                      </div>
                      <p className="step-p">{active.problem}</p>
                    </div>
                    <div className="step">
                      <div className="step-lab">
                        <Icon id="i-funnel" />
                        <span>Approach</span>
                      </div>
                      <p className="step-p">{active.method}</p>
                    </div>
                    <div className="step res">
                      <div className="step-lab">
                        <Icon id="i-chart" />
                        <span>Status</span>
                      </div>
                      <p className="step-p">{active.result}</p>
                    </div>
                  </div>

                  <div className="readouts">
                    {active.readouts?.map((ro, i) => (
                      <div key={i} className={`ro${ro.pending ? " pending" : ""}`}>
                        <div className="ro-v">{ro.v}</div>
                        <div className="ro-k">{ro.k}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <footer className="foot">
        <div className="foot-note">
          Logged as it ships. <b>Reactor → regression.</b> Same rigour, new instrument.
        </div>
        <div className="nav-btns">
          <button className="nav-btn prev" onClick={prev} aria-label="Previous entry">
            <Icon id="i-arrow" /> Prev
          </button>
          <button className="nav-btn" onClick={next} aria-label="Next entry">
            Next <Icon id="i-arrow" />
          </button>
        </div>
      </footer>
    </main>
  )
}
