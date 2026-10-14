import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { springs, motionTokens } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"

type Level = "strong" | "working" | "building" | "exploring"
interface Item { name: string; note: string; lv: Level }
interface Cat { id: string; icon: string; name: string; blurb: string; items: Item[] }

// Honest capability map. Levels are self-assessed words, not scores.
// AI & modern stack is seeded from real work (building this agent OS) and is meant to be expanded.
const CATS: Cat[] = [
  {
    id: "data", icon: "i-database", name: "Technical · data",
    blurb: "The core analyst toolkit, used on real datasets end to end.",
    items: [
      { name: "Python · pandas, numpy", note: "Clean, reshape and analyse data from raw to answer.", lv: "working" },
      { name: "SQL · joins, windows, CTEs", note: "Pull and shape data straight from the source.", lv: "working" },
      { name: "Power BI · models, DAX", note: "Turn tables into a view people act on.", lv: "building" },
      { name: "Excel · advanced, pivots", note: "The fast scratchpad for models and what-ifs.", lv: "strong" },
      { name: "Statistics · inference", note: "Test whether a difference is real or just noise.", lv: "working" },
    ],
  },
  {
    id: "eng", icon: "i-flask", name: "Engineering rigour",
    blurb: "Chemical-engineering discipline that transfers to any system.",
    items: [
      { name: "Mass / energy balances", note: "Account for every input and output; nothing vanishes.", lv: "strong" },
      { name: "Process optimization", note: "Find the setting that lifts the whole output.", lv: "strong" },
      { name: "Root-cause / bottleneck", note: "Trace a symptom to the one real constraint.", lv: "strong" },
      { name: "Design of experiments", note: "Change one variable at a time, on purpose.", lv: "working" },
    ],
  },
  {
    id: "ai", icon: "i-cpu", name: "AI & the modern stack",
    blurb: "Built and run by me, not just read about. Actively expanding.",
    items: [
      { name: "LLM orchestration", note: "Wire models into real workflows, not demos.", lv: "working" },
      { name: "Agent & automation design", note: "Systems that run tasks on their own, on a schedule.", lv: "working" },
      { name: "RAG / knowledge graphs", note: "Make a model answer from a trusted corpus.", lv: "building" },
      { name: "Prompt & context design", note: "Reliable output from a probabilistic box.", lv: "working" },
      { name: "Your next frontier", note: "Tell me what else to show here.", lv: "exploring" },
    ],
  },
  {
    id: "finance", icon: "i-scale", name: "Finance & markets",
    blurb: "Reading a business and a market like a system. Correct these to your real call.",
    items: [
      { name: "Case-comp strategy", note: "Frame a problem, back the call with numbers, defend it.", lv: "strong" },
      { name: "Valuation & market sizing", note: "Size a market and sanity-check what a business is worth.", lv: "working" },
      { name: "Business model analysis", note: "Pull apart how a company actually makes money.", lv: "working" },
      { name: "Investing fundamentals", note: "Risk, return, and why most edges disappear.", lv: "building" },
    ],
  },
  {
    id: "research", icon: "i-quote", name: "Research & writing",
    blurb: "Turning a pile of sources into something you can use.",
    items: [
      { name: "Literature synthesis", note: "Read widely, keep what is load-bearing, cite it.", lv: "strong" },
      { name: "Research pipelines", note: "Automate the find, read and summarise loop.", lv: "working" },
      { name: "Academic writing", note: "Structure an argument so it survives review.", lv: "working" },
      { name: "Knowledge systems", note: "Graphs and notebooks that stay searchable.", lv: "working" },
    ],
  },
  {
    id: "design", icon: "i-camera", name: "Design & creative",
    blurb: "Making the work clear, then making it land.",
    items: [
      { name: "UI & motion design", note: "Interfaces that move with intent, not decoration.", lv: "working" },
      { name: "Visual storytelling", note: "Sequence information so it reads in one pass.", lv: "working" },
      { name: "Deck & brand craft", note: "Slides and identity that look considered.", lv: "working" },
      { name: "Creative direction", note: "Set a look and hold the whole thing to it.", lv: "building" },
    ],
  },
  {
    id: "product", icon: "i-funnel", name: "Product & strategy",
    blurb: "Deciding what to build and what to cut.",
    items: [
      { name: "Problem framing", note: "Name the real question before touching a tool.", lv: "strong" },
      { name: "Scoping & prioritisation", note: "Cut to the version that ships and matters.", lv: "working" },
      { name: "Systems design", note: "Draw the parts, interfaces and failure points first.", lv: "working" },
      { name: "Go / no-go judgment", note: "Call it early when the evidence says stop.", lv: "building" },
    ],
  },
  {
    id: "transfer", icon: "i-route", name: "Transferable",
    blurb: "How I think, independent of the tool in front of me.",
    items: [
      { name: "Systems thinking", note: "See inputs, limits and loops in anything.", lv: "strong" },
      { name: "Bottleneck instinct", note: "Spend effort only where it changes the result.", lv: "strong" },
      { name: "Measure, change, read", note: "Baseline, ship one change, read the delta, repeat.", lv: "strong" },
      { name: "Technical writing", note: "Explain a complex thing so a decision gets made.", lv: "strong" },
    ],
  },
  {
    id: "tools", icon: "i-grid", name: "Tooling & delivery",
    blurb: "The plumbing that ships the work and keeps it reproducible.",
    items: [
      { name: "Git · branches, PRs", note: "Version everything; nothing lives only on my laptop.", lv: "working" },
      { name: "Jupyter / notebooks", note: "Explore, narrate and share an analysis in one place.", lv: "working" },
      { name: "scikit-learn · core models", note: "Baselines and classical models before anything fancy.", lv: "building" },
    ],
  },
]

const LVW: Record<Level, string> = { strong: "fluent", working: "working", building: "building", exploring: "learning" }

const CSS = String.raw`
  .p-sk{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1200px;margin:0 auto;width:100%;overflow:hidden}

  .p-sk .sk-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;
    padding-bottom:clamp(6px,1.1vh,12px);margin-bottom:clamp(9px,1.5vh,16px);border-bottom:1px solid var(--rule)}
  .p-sk .sk-kick{display:inline-flex;align-items:center;gap:8px;font:500 10px/1 var(--font-mono);letter-spacing:.26em;text-transform:uppercase;color:var(--accent)}
  .p-sk .sk-kick .ic{width:13px;height:13px}
  .p-sk .sk-title{font-family:var(--font-display);font-weight:700;font-size:clamp(22px,3.1vw,38px);line-height:1;letter-spacing:-.02em;color:var(--ink);margin:7px 0 4px}
  .p-sk .sk-title em{font-style:italic;font-weight:600;color:var(--accent)}
  .p-sk .sk-lede{font-size:clamp(11.5px,1vw,14px);line-height:1.5;color:var(--muted);max-width:60ch;text-wrap:pretty}
  .p-sk .sk-lede b{color:var(--ink);font-weight:600}
  .p-sk .sk-note{font:600 9px/1.6 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-align:right;white-space:nowrap}
  .p-sk .sk-note b{color:var(--teal)}

  .p-sk .body{flex:1;min-height:0;display:grid;grid-template-columns:minmax(188px,228px) 1fr;gap:clamp(16px,2.2vw,34px)}

  /* left rail — category selector with a sliding indicator */
  .p-sk .rail{min-height:0;display:flex;flex-direction:column;justify-content:center;gap:clamp(2px,.4vh,5px);position:relative}
  .p-sk .cat{position:relative;display:flex;align-items:center;gap:10px;padding:clamp(6px,1vh,11px) 12px;border:0;background:transparent;
    text-align:left;cursor:pointer;color:var(--muted);border-radius:10px;width:100%;transition:color .25s}
  .p-sk .cat:hover{color:var(--ink)}
  .p-sk .cat.on{color:var(--ink)}
  .p-sk .cat .ind{position:absolute;inset:0;border-radius:10px;background:color-mix(in srgb,var(--accent) 12%,transparent);
    border:1px solid color-mix(in srgb,var(--accent) 26%,transparent);z-index:0}
  .p-sk .cat .ic{width:16px;height:16px;flex:0 0 auto;position:relative;z-index:1;color:currentColor}
  .p-sk .cat.on .ic{color:var(--accent)}
  .p-sk .cat .cl{position:relative;z-index:1;display:flex;flex-direction:column;gap:2px;min-width:0}
  .p-sk .cat .cn{font:600 12.5px/1.1 var(--font-display);letter-spacing:-.01em}
  .p-sk .cat .cc{font:600 8px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}

  /* right stage — the selected category's skills, swapped in place */
  .p-sk .stage{position:relative;min-height:0;display:flex;flex-direction:column}
  .p-sk .deck{position:absolute;inset:0;display:flex;flex-direction:column;min-height:0}
  .p-sk .dh{display:flex;align-items:baseline;justify-content:space-between;gap:14px;flex:0 0 auto;margin-bottom:clamp(8px,1.4vh,14px)}
  .p-sk .dh .dt{font-family:var(--font-display);font-weight:700;font-size:clamp(17px,1.9vw,24px);letter-spacing:-.015em;color:var(--ink)}
  .p-sk .dh .db{font:500 10.5px/1.4 var(--font-mono);color:var(--muted);max-width:40ch;text-align:right}
  .p-sk .dh .dn{font:700 11px/1 var(--font-mono);letter-spacing:.1em;color:var(--accent)}

  .p-sk .cards{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;align-content:center;gap:clamp(8px,1.3vh,14px) clamp(8px,1vw,14px)}
  .p-sk .card{position:relative;overflow:hidden;background:color-mix(in srgb,var(--card) 92%,transparent);
    border:1px solid var(--rule);border-radius:12px;padding:clamp(11px,1.5vh,16px) clamp(13px,1.3vw,18px);
    display:flex;flex-direction:column;gap:5px;transition:border-color .3s,box-shadow .3s,transform .3s}
  .p-sk .card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(var(--accent),var(--teal));
    transform:scaleY(0);transform-origin:top;transition:transform .35s var(--ease)}
  .p-sk .card:hover{border-color:color-mix(in srgb,var(--accent) 42%,transparent);box-shadow:var(--glow);transform:translateY(-3px)}
  .p-sk .card:hover::before{transform:scaleY(1)}
  .p-sk .card .ct{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
  .p-sk .card .cnm{font:600 clamp(12.5px,1.2vw,15px)/1.2 var(--font-display);letter-spacing:-.01em;color:var(--ink)}
  .p-sk .card .lv{flex:0 0 auto;font:600 8px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;padding:3px 7px;border-radius:20px;
    color:var(--accent);background:color-mix(in srgb,var(--accent) 11%,transparent);border:1px solid color-mix(in srgb,var(--accent) 22%,transparent)}
  .p-sk .card .lv[data-lv="strong"]{color:var(--teal);background:color-mix(in srgb,var(--teal) 12%,transparent);border-color:color-mix(in srgb,var(--teal) 26%,transparent)}
  .p-sk .card .lv[data-lv="building"]{color:var(--muted);background:color-mix(in srgb,var(--ink) 6%,transparent);border-color:var(--rule)}
  .p-sk .card .lv[data-lv="exploring"]{color:var(--orange);background:color-mix(in srgb,var(--orange) 11%,transparent);border-color:color-mix(in srgb,var(--orange) 24%,transparent)}
  .p-sk .card .cno{font-size:clamp(10.5px,.95vw,12.5px);line-height:1.4;color:var(--muted);text-wrap:pretty}

  .p-sk .sk-stepper{display:none}

  @media(max-width:880px){
    .p-sk{height:100%;min-height:0;overflow:hidden;padding-bottom:8px}
    .p-sk .sk-note{display:none}
    .p-sk .body{display:flex;flex-direction:column;gap:8px;flex:1;min-height:0}
    .p-sk .rail{display:grid;grid-template-columns:repeat(4,1fr);overflow:hidden;gap:4px;flex:0 0 auto;padding-bottom:0}
    .p-sk .cat{padding:5px 6px;width:100%;text-align:center;justify-content:center;gap:6px}
    .p-sk .cat .cc{display:none}
    .p-sk .cat .ic{width:13px;height:13px}
    .p-sk .cat .cn{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .p-sk .stage{flex:1;min-height:0;display:flex;flex-direction:column;position:relative}
    .p-sk .deck{position:relative;display:flex;flex-direction:column;flex:1;min-height:0}
    .p-sk .dh{margin-bottom:6px}
    .p-sk .dh .dt{font-size:15px}
    .p-sk .dh .db{display:none}
    .p-sk .cards{grid-template-columns:repeat(2,1fr);align-content:start;gap:6px;flex:1;min-height:0}
    .p-sk .card{padding:7px 10px;gap:2px}
    .p-sk .card .cnm{font-size:12px}
    .p-sk .card .cno{font-size:10.5px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .p-sk .hint{display:none}
  }
  @media(max-width:540px){
    .p-sk .rail{display:none}
    .p-sk .sk-stepper{display:flex;align-items:center;justify-content:space-between;gap:8px;
      padding:6px 10px;background:var(--card);border:1px solid var(--rule);border-radius:10px;flex:0 0 auto;overflow:hidden}
    .p-sk .sk-step-btn{background:transparent;border:0;color:var(--ink);cursor:pointer;padding:4px 8px;display:grid;place-items:center}
    .p-sk .sk-step-btn.prev .ic{transform:scaleX(-1)}
    .p-sk .sk-step-btn .ic{width:14px;height:14px;color:var(--accent)}
    .p-sk .sk-step-info{display:flex;align-items:baseline;gap:8px;min-width:0;overflow:hidden}
    .p-sk .sk-step-num{font:700 11px/1 var(--font-mono);letter-spacing:.12em;color:var(--teal)}
    .p-sk .sk-step-name{font:600 12.5px/1.2 var(--font-display);color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .p-sk .cards{grid-template-columns:1fr;gap:5px}
    .p-sk .card{padding:6px 9px}
  }
`

export function Skills() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const lock = useRef(0)
  const n = CATS.length

  useOneScreen()

  const go = useCallback((d: number) => setI((c) => (c + d + n) % n), [n])

  // keyboard: up/down or left/right cycles categories
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1)
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  // wheel over the stage swaps category in place — the page itself never scrolls
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lock.current < 430) return
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < 6) return
      lock.current = now
      go(delta > 0 ? 1 : -1)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [go])

  const cat = CATS[i]

  const cardsWrap = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.05 } },
  }
  const cardV = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  }

  return (
    <main className="page p-sk" aria-label="Capability map">
      <style>{CSS}</style>

      <LogHeader
        log="LOG.01"
        section="SKILLS"
        tag="capability-map"
        title="Skills map"
        lede={<>Not a scorecard. Lenses on the same person: the <b>technical toolkit</b>, the <b>engineering rigour</b> under it, the <b>AI stack</b>, research, design and scoping. Pick a lens.</>}
        right={<div className="sk-note">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}<br />{n} lenses</div>}
      />

      <div className="body">
        <div className="sk-stepper" role="group" aria-label="Category stepper">
          <button type="button" className="sk-step-btn prev" onClick={() => go(-1)} aria-label="Previous category">
            <Icon id="i-arrow" />
          </button>
          <div className="sk-step-info">
            <span className="sk-step-num">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <span className="sk-step-name">{cat.name}</span>
          </div>
          <button type="button" className="sk-step-btn next" onClick={() => go(1)} aria-label="Next category">
            <Icon id="i-arrow" />
          </button>
        </div>

        <nav className="rail" aria-label="Skill categories">
          {CATS.map((c, idx) => (
            <button
              key={c.id}
              className={`cat${idx === i ? " on" : ""}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
            >
              {idx === i && (
                <motion.span
                  className="ind"
                  layoutId="cat-ind"
                  transition={reduce ? { duration: 0 } : springs.snappy}
                />
              )}
              <span className="ic"><Icon id={c.icon} /></span>
              <span className="cl">
                <span className="cn">{c.name}</span>
                <span className="cc">{c.items.length} skills</span>
              </span>
            </button>
          ))}
        </nav>

        <div className="stage" ref={stageRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              className="deck"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 18, filter: "blur(5px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18, filter: "blur(5px)" }}
              transition={reduce ? { duration: 0.15 } : springs.gentle}
            >
              <div className="dh">
                <span className="dt">{cat.name}</span>
                <span className="db">{cat.blurb}</span>
              </div>

              <motion.div className="cards" variants={cardsWrap} initial="hidden" animate="visible">
                {cat.items.map((it) => (
                  <motion.div className="card" key={it.name} variants={cardV}>
                    <div className="ct">
                      <span className="cnm">{it.name}</span>
                      <span className="lv" data-lv={it.lv}>{LVW[it.lv]}</span>
                    </div>
                    <span className="cno">{it.note}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="hint">Scroll, arrow or click a lens <b>→</b> swaps in place</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
