import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { springs, motionTokens } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { TwinDoor } from "../../components/TwinDoor"
import { Headline } from "../../components/headline/Headline"

type Level = "exploring" | "building" | "working" | "strong"
interface Item { name: string; note: string; lv: Level }
interface Cat { id: string; icon: string; name: string; short: string; blurb: string; items: Item[] }

// Honest capability map. Levels are self-assessed words, not scores.
// AI & modern stack is seeded from real work (building this agent OS) and is meant to be expanded.
const CATS: Cat[] = [
  {
    id: "data", icon: "i-database", name: "Technical · data", short: "Data",
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
    id: "eng", icon: "i-flask", name: "Engineering rigour", short: "Rigour",
    blurb: "Chemical-engineering discipline that transfers to any system.",
    items: [
      { name: "Mass / energy balances", note: "Account for every input and output; nothing vanishes.", lv: "strong" },
      { name: "Process optimization", note: "Find the setting that lifts the whole output.", lv: "strong" },
      { name: "Root-cause / bottleneck", note: "Trace a symptom to the one real constraint.", lv: "strong" },
      { name: "Design of experiments", note: "Change one variable at a time, on purpose.", lv: "working" },
    ],
  },
  {
    id: "ai", icon: "i-cpu", name: "AI & the modern stack", short: "AI stack",
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
    id: "finance", icon: "i-scale", name: "Finance & markets", short: "Markets",
    blurb: "Reading a business and a market like a system. Correct these to your real call.",
    items: [
      { name: "Case-comp strategy", note: "Frame a problem, back the call with numbers, defend it.", lv: "strong" },
      { name: "Valuation & market sizing", note: "Size a market and sanity-check what a business is worth.", lv: "working" },
      { name: "Business model analysis", note: "Pull apart how a company actually makes money.", lv: "working" },
      { name: "Investing fundamentals", note: "Risk, return, and why most edges disappear.", lv: "building" },
    ],
  },
  {
    id: "research", icon: "i-quote", name: "Research & writing", short: "Research",
    blurb: "Turning a pile of sources into something you can use.",
    items: [
      { name: "Literature synthesis", note: "Read widely, keep what is load-bearing, cite it.", lv: "strong" },
      { name: "Research pipelines", note: "Automate the find, read and summarise loop.", lv: "working" },
      { name: "Academic writing", note: "Structure an argument so it survives review.", lv: "working" },
      { name: "Knowledge systems", note: "Graphs and notebooks that stay searchable.", lv: "working" },
    ],
  },
  {
    id: "design", icon: "i-camera", name: "Design & creative", short: "Design",
    blurb: "Making the work clear, then making it land.",
    items: [
      { name: "UI & motion design", note: "Interfaces that move with intent, not decoration.", lv: "working" },
      { name: "Visual storytelling", note: "Sequence information so it reads in one pass.", lv: "working" },
      { name: "Deck & brand craft", note: "Slides and identity that look considered.", lv: "working" },
      { name: "Creative direction", note: "Set a look and hold the whole thing to it.", lv: "building" },
    ],
  },
  {
    id: "product", icon: "i-funnel", name: "Product & strategy", short: "Product",
    blurb: "Deciding what to build and what to cut.",
    items: [
      { name: "Problem framing", note: "Name the real question before touching a tool.", lv: "strong" },
      { name: "Scoping & prioritisation", note: "Cut to the version that ships and matters.", lv: "working" },
      { name: "Systems design", note: "Draw the parts, interfaces and failure points first.", lv: "working" },
      { name: "Go / no-go judgment", note: "Call it early when the evidence says stop.", lv: "building" },
    ],
  },
  {
    id: "transfer", icon: "i-route", name: "Transferable", short: "Transfer",
    blurb: "How I think, independent of the tool in front of me.",
    items: [
      { name: "Systems thinking", note: "See inputs, limits and loops in anything.", lv: "strong" },
      { name: "Bottleneck instinct", note: "Spend effort only where it changes the result.", lv: "strong" },
      { name: "Measure, change, read", note: "Baseline, ship one change, read the delta, repeat.", lv: "strong" },
      { name: "Technical writing", note: "Explain a complex thing so a decision gets made.", lv: "strong" },
    ],
  },
  {
    id: "tools", icon: "i-grid", name: "Tooling & delivery", short: "Tooling",
    blurb: "The plumbing that ships the work and keeps it reproducible.",
    items: [
      { name: "Git · branches, PRs", note: "Version everything; nothing lives only on my laptop.", lv: "working" },
      { name: "Jupyter / notebooks", note: "Explore, narrate and share an analysis in one place.", lv: "working" },
      { name: "scikit-learn · core models", note: "Baselines and classical models before anything fancy.", lv: "building" },
    ],
  },
]

// Scale runs low → high; a meter fills one segment per step reached.
const SCALE: Level[] = ["exploring", "building", "working", "strong"]
const LVW: Record<Level, string> = { strong: "fluent", working: "working", building: "building", exploring: "learning" }
const COUNT_WORD = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"]
const WHEEL_LOCK_MS = 430
const WHEEL_MIN_DELTA = 6
const STAGGER_S = 0.06

const pad = (v: number) => String(v).padStart(2, "0")

const CSS = String.raw`
  html[data-one-screen] .page.p-sk,html[data-toc] .page.p-sk,.p-sk{min-height:0;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);
    gap:clamp(20px,4vw,64px);max-width:1240px;margin:0 auto;width:100%;overflow:hidden;position:relative}

  /* material: graph paper, same sheet as the Analyst index */
  .p-sk::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
    background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px),
      linear-gradient(color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px);
    background-size:24px 24px,24px 24px,120px 120px,120px 120px;
    mask-image:radial-gradient(ellipse 80% 75% at 50% 45%,#000 40%,transparent 100%)}

  /* left: poster + lens picker */
  .p-sk .poster{min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(10px,2vh,22px)}
  .p-sk .kick{display:inline-flex;align-items:center;gap:8px;font:600 10px/1.4 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--teal-ink)}
  .p-sk .kick .ic{width:13px;height:13px}
  .p-sk .big{font-family:var(--font-display);font-weight:700;font-size:clamp(56px,min(7.6vw,13vh),120px);line-height:.86;letter-spacing:-.045em;color:var(--ink);margin:clamp(6px,1.2vh,14px) 0 0}
  .p-sk .big em{font-style:normal;color:var(--accent-ink)}
  .p-sk .lede{font:500 clamp(12px,1vw,14px)/1.5 var(--font-mono);color:var(--muted);margin:clamp(8px,1.6vh,16px) 0 0;max-width:38ch}
  .p-sk .lede b{color:var(--ink);font-weight:600}

  .p-sk .lenses{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}
  .p-sk .lens{position:relative;display:flex;align-items:baseline;gap:7px;padding:clamp(6px,1.1vh,10px) 10px;border:0;border-radius:8px;
    background:transparent;color:var(--muted);cursor:pointer;text-align:left;min-width:0;transition:color .2s var(--ease)}
  .p-sk .lens:hover,.p-sk .lens.on{color:var(--ink)}
  .p-sk .lens:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
  .p-sk .lens .ind{position:absolute;inset:0;border-radius:8px;z-index:0;background:color-mix(in srgb,var(--accent) 12%,transparent);
    border:1px solid color-mix(in srgb,var(--accent) 28%,transparent)}
  .p-sk .lens .ln{position:relative;z-index:1;font:700 9.5px/1 var(--font-mono);letter-spacing:.08em;color:var(--teal-ink)}
  .p-sk .lens .lt{position:relative;z-index:1;font:600 clamp(12px,1.05vw,14.5px)/1.1 var(--font-display);letter-spacing:-.01em;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .p-sk .sk-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
    font:500 10px/1.5 var(--font-mono);letter-spacing:.06em;color:var(--muted)}

  /* right: the spectrograph, one lens at a time */
  .p-sk .sk-panel{position:relative;min-height:0;display:flex;flex-direction:column;overflow:hidden;
    padding:clamp(14px,2.4vh,26px) clamp(16px,2vw,30px);border-radius:16px;
    background:linear-gradient(140deg,color-mix(in srgb,var(--card) 74%,transparent),color-mix(in srgb,var(--card) 38%,transparent));
    border:1px solid color-mix(in srgb,var(--teal) 22%,var(--rule));backdrop-filter:blur(10px);
    box-shadow:inset 0 1px 0 color-mix(in srgb,#fff 8%,transparent),var(--shadow-sm)}
  .p-sk .sk-panel::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
    background:linear-gradient(115deg,color-mix(in srgb,#fff 6%,transparent) 0 26%,transparent 26.5%)}
  .p-sk .ghost{position:absolute;right:clamp(10px,1.6vw,24px);top:-.12em;font:800 clamp(120px,15vw,230px)/1 var(--font-display);letter-spacing:-.06em;
    color:color-mix(in srgb,var(--teal) 9%,transparent);pointer-events:none;user-select:none}
  .p-sk .deck{position:relative;flex:1;min-height:0;display:flex;flex-direction:column}
  .p-sk .dh{flex:0 0 auto;padding-bottom:clamp(8px,1.6vh,16px);border-bottom:1px solid var(--rule)}
  .p-sk .dk{font:600 10px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--accent-ink)}
  .p-sk .dt{font-family:var(--font-display);font-weight:700;font-size:clamp(26px,3.1vw,46px);line-height:1;letter-spacing:-.03em;color:var(--ink);margin:6px 0 6px}
  .p-sk .db{font:500 clamp(11px,.9vw,12.5px)/1.45 var(--font-mono);color:var(--muted);max-width:52ch}

  .p-sk .scale{flex:0 0 auto;display:grid;grid-template-columns:minmax(0,1fr) var(--meter-w);gap:clamp(12px,1.6vw,24px);
    padding:clamp(6px,1vh,10px) 0 2px;--meter-w:clamp(140px,15vw,220px)}
  .p-sk .scale .sl{display:flex;justify-content:space-between;align-items:center;gap:6px;font:600 8px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
  .p-sk .scale .sl span:last-child{color:var(--teal-ink)}
  .p-sk .scale .sl i{flex:1;height:1px;background:linear-gradient(90deg,var(--rule),var(--teal))}

  .p-sk .rows{list-style:none;margin:0;padding:0;flex:1;min-height:0;display:grid;grid-auto-rows:minmax(0,1fr);--meter-w:clamp(140px,15vw,220px)}
  .p-sk .row{min-height:0;display:grid;grid-template-columns:minmax(0,1fr) var(--meter-w);align-items:center;gap:clamp(12px,1.6vw,24px);
    border-bottom:1px dashed color-mix(in srgb,var(--ink) 12%,transparent)}
  .p-sk .row:last-child{border-bottom:0}
  .p-sk .rn{font:600 clamp(15px,min(1.55vw,2.7vh),23px)/1.15 var(--font-display);letter-spacing:-.015em;color:var(--ink)}
  .p-sk .ro{font-size:clamp(11px,.9vw,12.5px);line-height:1.4;color:var(--muted);margin-top:3px;text-wrap:pretty}
  .p-sk .lvm{display:flex;flex-direction:column;gap:5px}
  .p-sk .segs{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
  .p-sk .seg{position:relative;height:clamp(8px,1.2vh,12px);border-radius:3px;overflow:hidden;background:color-mix(in srgb,var(--ink) 8%,transparent)}
  .p-sk .seg i{position:absolute;inset:0;transform-origin:left center;background:linear-gradient(90deg,var(--teal),var(--accent))}
  .p-sk .seg i[data-lv="exploring"]{background:var(--orange)}
  .p-sk .lvw{font:700 8.5px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-align:right}
  .p-sk .lvw[data-lv="strong"]{color:var(--teal-ink)}
  .p-sk .lvw[data-lv="exploring"]{color:var(--orange-ink)}
  .p-sk .hint{flex:0 0 auto;font:500 9.5px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
    padding-top:clamp(6px,1vh,10px);text-align:right}
  .p-sk .hint b{color:var(--accent-ink)}

  @media(max-width:900px){
    html[data-one-screen] .page.p-sk,html[data-toc] .page.p-sk,.p-sk{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:10px}
    .p-sk .poster{gap:8px}
    .p-sk .big{font-size:clamp(40px,11vw,64px);margin-top:4px}
    .p-sk .big br{display:none}
    .p-sk .lede{font-size:11px;margin-top:5px;max-width:none}
    .p-sk .lens{padding:5px 7px;gap:5px}
    .p-sk .lens .lt{font-size:11.5px}
    .p-sk .sk-foot .fh{display:none}
    .p-sk .sk-panel{padding:12px 14px;border-radius:12px}
    .p-sk .ghost{font-size:110px}
    .p-sk .dt{font-size:22px;margin:4px 0}
    .p-sk .db{font-size:10.5px}
    .p-sk .dh{padding-bottom:6px}
    .p-sk .scale,.p-sk .rows{--meter-w:92px;gap:10px}
    .p-sk .scale .sl{font-size:7px;letter-spacing:.08em}
    .p-sk .rn{font-size:clamp(13.5px,2.2vw,18px)}
    .p-sk .ro{font-size:10.5px;line-height:1.3;margin-top:1px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .p-sk .hint{display:none}
  }
  @media(max-width:900px) and (max-height:760px){
    .p-sk .lede{display:none}
  }
  @media(prefers-reduced-motion:reduce){
    .p-sk .lens{transition:none}
  }
`

function Meter({ lv, delay, reduce }: { lv: Level; delay: number; reduce: boolean }) {
  const reached = SCALE.indexOf(lv)
  return (
    <div className="lvm" aria-label={`Level: ${LVW[lv]}`}>
      <div className="segs" aria-hidden="true">
        {SCALE.map((s, k) => (
          <span className="seg" key={s}>
            {k <= reached && (
              <motion.i
                data-lv={lv}
                initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={reduce ? { duration: 0 } : { ...springs.snappy, delay: delay + k * STAGGER_S }}
              />
            )}
          </span>
        ))}
      </div>
      <span className="lvw" data-lv={lv}>{LVW[lv]}</span>
    </div>
  )
}

export function Skills() {
  const reduce = useReducedMotion() ?? false
  const [i, setI] = useState(0)
  const panelRef = useRef<HTMLElement>(null)
  const lock = useRef(0)
  const n = CATS.length

  useOneScreen()

  const go = useCallback((d: number) => setI((c) => (c + d + n) % n), [n])

  // keyboard: arrows cycle lenses
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1)
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  // wheel over the panel swaps lens in place; the page itself never scrolls
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lock.current < WHEEL_LOCK_MS) return
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < WHEEL_MIN_DELTA) return
      lock.current = now
      go(delta > 0 ? 1 : -1)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [go])

  const cat = CATS[i]
  const rowStagger = reduce ? 0 : STAGGER_S

  return (
    <main className="page p-sk" aria-label="Capability map">
      <style>{CSS}</style>

      <section className="poster">
        <div>
          <span className="kick"><Icon id="i-grid" /> Log.01 · Capability map</span>
          <Headline world="analyst" className="big">{COUNT_WORD[n] ?? n}<br /> <em>lenses.</em></Headline>
          <p className="lede">
            Not a scorecard. Lenses on the same person: the <b>technical toolkit</b>, the <b>engineering rigour</b> under it,
            the <b>AI stack</b>, research, design and scoping. Pick a lens.
          </p>
        </div>

        <nav className="lenses" aria-label="Skill lenses">
          {CATS.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              className={`lens${idx === i ? " on" : ""}`}
              aria-current={idx === i}
              aria-label={c.name}
              onClick={() => setI(idx)}
            >
              {idx === i && (
                <motion.span className="ind" layoutId="sk-lens" transition={reduce ? { duration: 0 } : springs.snappy} />
              )}
              <span className="ln">{pad(idx + 1)}</span>
              <span className="lt">{c.short}</span>
            </button>
          ))}
        </nav>

        <div className="sk-foot">
          <TwinDoor to="/artist/notes" label="Toolkit, from notebooks" world="artist" />
          <span className="fh">Levels are self-assessed words, not scores.</span>
        </div>
      </section>

      <section className="sk-panel" ref={panelRef} aria-live="polite">
        <span className="ghost" aria-hidden="true">{pad(i + 1)}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cat.id}
            className="deck"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.md }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.sm }}
            transition={reduce ? { duration: motionTokens.duration.fast } : springs.gentle}
          >
            <header className="dh">
              <div className="dk">Lens {pad(i + 1)} / {pad(n)} · {cat.items.length} skills</div>
              <h2 className="dt">{cat.name}</h2>
              <p className="db">{cat.blurb}</p>
            </header>

            <div className="scale" aria-hidden="true">
              <span />
              <span className="sl"><span>{LVW[SCALE[0]]}</span><i /><span>{LVW[SCALE[SCALE.length - 1]]}</span></span>
            </div>

            <ul className="rows" role="list">
              {cat.items.map((it, k) => (
                <motion.li
                  className="row"
                  key={it.name}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, x: -motionTokens.distance.sm }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={reduce ? { duration: 0 } : { ...springs.gentle, delay: k * rowStagger }}
                >
                  <div>
                    <div className="rn">{it.name}</div>
                    <div className="ro">{it.note}</div>
                  </div>
                  <Meter lv={it.lv} delay={k * rowStagger} reduce={reduce} />
                </motion.li>
              ))}
            </ul>

            <div className="hint">Scroll, arrow or pick a lens <b>→</b> swaps in place</div>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  )
}
