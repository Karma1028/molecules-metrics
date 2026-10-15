import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Link } from "react-router-dom"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { TwinDoor } from "../../components/TwinDoor"
import { useAi, useGithub, useMedium, useGym } from "../../lib/live"
import { useGoaClock } from "../../lib/useGoaClock"
import { EXP } from "./Resume"
import { ENTRIES, STATUS_LABEL } from "./Work"
import { STATUS } from "./Contact"

/* Dashboard as a work sample: a BI scorecard about the person who builds
   BI scorecards. Every tile derives from a source already on the site
   (résumé, work ledger, contact card) or a live feed, and says so. No
   number here is typed by hand. Dead feeds are shown as dead, with their
   lineage, the way a production dashboard should treat a broken source. */

type KpiId = "exp" | "ship" | "code" | "write" | "gym" | "ai" | "avail"
type FeedState = "static" | "live" | "off"

interface Kpi {
  id: KpiId
  code: string
  label: string
  value: string
  unit: string
  state: FeedState
  definition: string
  why: string
  lineage: string[]
  refresh: string
  /** three-letter stat code on the player card */
  short: string
  /** measure name as it would sit in the model */
  measure: string
  formula: string[]
  /** one plain sentence, Wrapped style */
  story: string
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const STAGGER_S = 0.05
const KEY_ORDER: KpiId[] = ["exp", "ship", "code", "write", "gym", "ai", "avail"]

/* ≤900px the console shows one side at a time; desktop shows measure and result together. */
type ViewId = "res" | "brk" | "src"
const VIEWS: { id: ViewId; label: string }[] = [
  { id: "res", label: "Result" },
  { id: "brk", label: "Detail" },
  { id: "src", label: "Measure" },
]

interface Span { role: string; org: string; start: number; end: number; months: number }

/** "Mar - Aug 2026" → absolute month indexes, inclusive. */
function parseSpan(when: string): { start: number; end: number } | null {
  const m = /^(\w{3})\s*-\s*(\w{3})\s+(\d{4})$/.exec(when.trim())
  if (!m) return null
  const a = MONTHS.indexOf(m[1])
  const b = MONTHS.indexOf(m[2])
  const y = Number(m[3])
  if (a < 0 || b < 0) return null
  return { start: y * 12 + a, end: y * 12 + b }
}

const SPANS: Span[] = EXP.flatMap((e) => {
  const s = parseSpan(e.when)
  return s ? [{ role: e.role, org: e.org, ...s, months: s.end - s.start + 1 }] : []
})
const TOTAL_MONTHS = SPANS.reduce((n, s) => n + s.months, 0)
const SHIPPED = ENTRIES.filter((e) => e.status === "shipped").length
const WRITEUP = ENTRIES.filter((e) => e.status === "writeup").length
const AVAIL = STATUS.find((s) => s.k === "Available")?.v ?? ""
const DARK_STORY = "Feed is dark in this build. Shown as dark, not faked."

/** IST hh:mm stamp, re-taken whenever `key` changes. */
function useStamp(key: unknown): string {
  const [t, setT] = useState("")
  useEffect(() => {
    setT(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }).format(new Date()))
  }, [key])
  return t
}

function useKpis(): Kpi[] {
  const gh = useGithub()
  const md = useMedium()
  const ghStamp = useStamp(gh.data)
  const mdStamp = useStamp(md.data)
  const ghOn = !gh.fallback && !gh.loading
  const mdOn = !md.fallback && !md.loading
  const gy = useGym()
  const al = useAi()
  const gym = gy.fallback ? null : gy.data
  const ai = al.fallback ? null : al.data
  return [
    {
      id: "exp", code: "K1", label: "Months of industry data work", value: String(TOTAL_MONTHS), unit: "months",
      state: "static",
      definition: "Calendar months inside a paid data role, summed across internships. Overlaps would count once; there are none.",
      why: "Answers the first hiring question: has this person shipped inside a real company, not just in coursework?",
      lineage: ["Résumé PDF", "EXP list", "parse month spans", "sum"],
      refresh: "on résumé change",
      short: "EXP", measure: "Months_Data",
      formula: ["Months_Data :=", "SUMX (", "    EXP,", "    DATEDIFF ( EXP[start], EXP[end], MONTH ) + 1", ")"],
      story: `${TOTAL_MONTHS} months inside real company data, across ${SPANS.length} internships.`,
    },
    {
      id: "ship", code: "K2", label: "Products shipped", value: String(SHIPPED), unit: `shipped · ${WRITEUP} in write-up`,
      state: "static",
      definition: "Entries in the production ledger whose status is shipped. Write-ups in progress are counted separately, never rounded up.",
      why: "Finished beats started. The split shows what is done and what is still being documented.",
      lineage: ["Work ledger", "ENTRIES", "group by status", "count"],
      refresh: "when a ledger entry changes",
      short: "SHP", measure: "Shipped",
      formula: ["Shipped :=", "CALCULATE (", "    COUNTROWS ( WORK ),", '    WORK[status] = "shipped"', ")"],
      story: `${SHIPPED} shipped to production. ${WRITEUP} still being written up, not rounded up.`,
    },
    {
      id: "code", code: "K3", label: "Public code activity",
      value: ghOn ? String(gh.data.contributions ?? gh.data.repos?.length ?? 0) : "off",
      unit: ghOn ? (gh.data.contributions != null ? "contributions" : "public repos") : "feed not wired",
      state: ghOn ? (gh.data.generatedAt ? "static" : "live") : "off",
      definition: "Contributions on the public GitHub profile, with repos and stars as context. Private client work is excluded by design.",
      why: "Shows the habit, not just the CV line: is code being written in public, and is anyone using it?",
      lineage: ["GitHub API", gh.data.generatedAt ? "build snapshot" : "Python proxy", "contributions"],
      refresh: ghOn ? (gh.data.generatedAt ? `baked · ${gh.data.generatedAt.slice(0, 10)}` : `polled · last ${ghStamp} IST`) : "source offline in this build",
      short: "COD", measure: "Code_Activity",
      formula: ["Code_Activity :=", "SUM ( GITHUB[contributions] )"],
      story: ghOn ? `${gh.data.contributions ?? gh.data.repos?.length ?? 0} contributions in the last year. The habit, not the CV line.` : DARK_STORY,
    },
    {
      id: "write", code: "K4", label: "Writing published",
      value: mdOn ? String(md.data.posts?.length ?? 0) : "off",
      unit: mdOn ? "posts" : "feed not wired",
      state: mdOn ? (md.data.generatedAt ? "static" : "live") : "off",
      definition: "Public posts on the Medium profile. Drafts and unpublished notes are not counted.",
      why: "Analysis only matters once someone else can read it. Writing is the hand-off.",
      lineage: ["Medium RSS", md.data.generatedAt ? "build snapshot" : "Python proxy", "posts"],
      refresh: mdOn ? (md.data.generatedAt ? `baked · ${md.data.generatedAt.slice(0, 10)}` : `polled · last ${mdStamp} IST`) : "source offline in this build",
      short: "WRT", measure: "Posts_Published",
      formula: ["Posts_Published :=", "COUNTROWS ( MEDIUM_POSTS )"],
      story: mdOn ? "Analysis only counts once someone else can read it." : DARK_STORY,
    },
    {
      id: "gym", code: "K5", label: "Training consistency", value: gym ? String(gym.workouts) : "off",
      unit: gym ? `workouts · best run ${gym.bestWeekStreak} weeks` : "feed not baked",
      state: gym ? "static" : "off",
      definition: "Sessions logged in Hevy, plus the longest run of consecutive weeks with at least one. Only these two numbers are published.",
      why: "Discipline compounds. Showing up every week is the same habit as shipping every week.",
      lineage: ["Hevy API", "bake-gym script", "count + streak only"],
      refresh: gym ? `baked · ${gym.generatedAt?.slice(0, 10) ?? ""}` : "file missing in this build",
      short: "GYM", measure: "Workouts_Logged",
      formula: ["Workouts_Logged :=", "COUNTROWS ( WORKOUTS )"],
      story: gym ? `${gym.workouts} sessions logged. Best run: ${gym.bestWeekStreak} weeks straight without missing one.` : DARK_STORY,
    },
    {
      id: "ai", code: "K6", label: "AI agent orchestration", value: ai ? String(ai.agentCalls) : "off",
      unit: ai ? `jobs delegated · ${ai.toolCalls.toLocaleString("en-IN")} tool calls` : "feed not baked",
      state: ai ? "static" : "off",
      definition: "Jobs handed to sub-agents while building, from local Claude Code logs. Only counts leave the machine.",
      why: "Work is moving from typing code to directing agents, and cache reuse keeps it cheap.",
      lineage: ["Claude Code logs", "bake-ai script", "dedupe by message id", "count"],
      refresh: ai ? `baked · ${ai.generatedAt?.slice(0, 10) ?? ""}` : "file missing in this build",
      short: "AGT", measure: "Agent_Jobs",
      formula: ["Agent_Jobs :=", "CALCULATE (", "    COUNTROWS ( TOOL_CALLS ),", '    TOOL_CALLS[tool] = "Agent"', ")"],
      story: ai
        ? `${ai.agentCalls} jobs delegated to sub-agents across ${ai.activeDays} build days. ${ai.cacheShare}% of context came from cache, not paid for twice.`
        : DARK_STORY,
    },
    {
      id: "avail", code: "K7", label: "Availability", value: AVAIL.split(" ")[0] ?? "", unit: AVAIL.split("·")[1]?.trim() ?? "",
      state: "static",
      definition: "Start window for a full-time role, as stated on the contact card.",
      why: "Every dashboard should end with the next action.",
      lineage: ["Contact card", "STATUS", "Available row"],
      refresh: "on contact card change",
      short: "AVL", measure: "Available_From",
      formula: ["Available_From :=", 'LOOKUPVALUE ( STATUS[v], STATUS[k], "Available" )'],
      story: "Ready for a full-time role in 2027, open now to talk.",
    },
  ]
}

function Gantt() {
  const lo = Math.min(...SPANS.map((s) => s.start))
  const from = lo - (lo % 12)
  const to = Math.max(...SPANS.map((s) => s.end)) + 1
  const hiYear = Math.ceil(to / 12)
  const span = hiYear * 12 - from
  const pct = (m: number) => `${((m - from) / span) * 100}%`
  const years = Array.from({ length: hiYear - from / 12 + 1 }, (_, i) => from / 12 + i)
  return (
    <div className="db-gantt" aria-label="Internship timeline">
      <div className="axis">{years.map((y) => <span key={y} style={{ left: pct(y * 12) }}>{y}</span>)}</div>
      {SPANS.map((s) => (
        <div className="lane" key={s.org}>
          <div className="bar" style={{ left: pct(s.start), width: `${(s.months / span) * 100}%` }} />
          <div className="lab"><b>{s.role}</b><span>{s.org} · {s.months} mo</span></div>
        </div>
      ))}
    </div>
  )
}

function Breakdown({ id }: { id: KpiId }) {
  const gh = useGithub()
  const md = useMedium()
  if (id === "exp") return <Gantt />
  if (id === "ship") {
    return (
      <ul className="db-list">
        {ENTRIES.map((e) => (
          <li key={e.id}><span className="t">{e.title}</span><span className={`pill ${e.status}`}>{STATUS_LABEL[e.status]}</span></li>
        ))}
        <li className="go"><Link to="/analyst/work">Open the ledger <Icon id="i-arrow" /></Link></li>
      </ul>
    )
  }
  if (id === "code") {
    if (gh.fallback) return <Offline name="GitHub" />
    const top = [...(gh.data.repos ?? [])].sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0)).slice(0, 4)
    const max = Math.max(1, ...top.map((r) => r.stars ?? 0))
    return (
      <ul className="db-list">
        <li><span className="t">{gh.data.repos?.length ?? 0} repos · {gh.data.totalStars ?? 0} stars</span></li>
        {top.map((r) => (
          <li key={r.name} className="rb">
            <a href={r.url} target="_blank" rel="noreferrer" className="t">{r.name}</a>
            <i style={{ ["--w" as string]: `${((r.stars ?? 0) / max) * 100}%` }} /><span className="n">{r.stars ?? 0}★</span>
          </li>
        ))}
      </ul>
    )
  }
  if (id === "write") {
    if (md.fallback) return <Offline name="Medium" />
    return (
      <ul className="db-list">
        {(md.data.posts ?? []).slice(0, 4).map((p) => (
          <li key={p.url}><a href={p.url} target="_blank" rel="noreferrer" className="t">{p.title}</a><span className="n">{p.published?.slice(0, 10)}</span></li>
        ))}
      </ul>
    )
  }
  if (id === "gym") return <GymBreak />
  if (id === "ai") return <AiBreak />
  return (
    <ul className="db-list">
      {STATUS.map((s) => <li key={s.k}><span className="k">{s.k}</span><span className="t">{s.v}</span></li>)}
      <li className="go"><Link to="/analyst/contact">Start the conversation <Icon id="i-arrow" /></Link></li>
    </ul>
  )
}


/** Bars as a share of the largest row, for the ranked breakdown lists. */
const share = (v: number, max: number) => ({ ["--w" as string]: `${(v / Math.max(1, max)) * 100}%` })

function GymBreak() {
  const { data, fallback } = useGym()
  if (fallback) return <Offline name="Hevy" />
  return (
    <ul className="db-list">
      <li><span className="k">Best run</span><span className="weeks" aria-label={`${data.bestWeekStreak} weeks in a row`}>
        {Array.from({ length: data.bestWeekStreak }, (_, i) => <i key={i} />)}
      </span></li>
      <li><span className="k">Sessions</span><span className="t">{data.workouts} logged</span></li>
      <li><span className="src">Workouts, weights and dates stay private. Only these two numbers are baked.</span></li>
    </ul>
  )
}

const MILLION = 1_000_000
const AI_MONTHS = 2

function AiBreak() {
  const { data, fallback } = useAi()
  if (fallback) return <Offline name="Agent log" />
  const months = data.months.slice(-AI_MONTHS)
  const max = Math.max(...months.map((m) => m.output))
  const label = (m: string) => `${MONTHS[Number(m.slice(5)) - 1]} ${m.slice(2, 4)}`
  return (
    <ul className="db-list">
      {months.map((m) => (
        <li key={m.month} className="rb">
          <span className="t">{label(m.month)}</span><i style={share(m.output, max)} />
          <span className="n">{(m.output / MILLION).toFixed(1)}M tokens</span>
        </li>
      ))}
      <li><span className="src">{data.cacheShare}% of context reused from cache. Counts only: no prompts or code leave the machine.</span></li>
    </ul>
  )
}

function Offline({ name }: { name: string }) {
  return (
    <div className="db-off">
      <b>{name} feed is offline in this build.</b>
      <span>The tile shows "off" instead of a stale or invented number. Lineage stays visible so the break is traceable.</span>
    </div>
  )
}

/* ── the measure, as it would sit in the model: comments carry the definition ── */
const DAX_FNS = new Set(["SUMX", "SUM", "DATEDIFF", "MONTH", "CALCULATE", "COUNTROWS", "LOOKUPVALUE", "FILTER", "DIVIDE", "DISTINCTCOUNT"])
const DAX_KW = new RegExp(`\\b(${[...DAX_FNS].join("|")})\\b`)
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const ROLL_DELAY_S = 0.55
const CHARS_PER_TICK = 4
const TICK_MS = 16
/* narrow enough that a comment never re-wraps inside the console, even at 360px */
const COMMENT_COLS = 42

function wrapComment(text: string, width: number): string[] {
  const out: string[] = []
  let line = ""
  for (const w of text.split(" ")) {
    if ((line + " " + w).trim().length > width) {
      out.push(line.trim())
      line = w
    } else line += " " + w
  }
  if (line.trim()) out.push(line.trim())
  return out.map((l) => `// ${l}`)
}

function measureLines(k: Kpi): string[] {
  return [...wrapComment(k.definition, COMMENT_COLS), ...wrapComment(`why: ${k.why}`, COMMENT_COLS), ...k.formula]
}

function CodeLine({ text }: { text: string }) {
  if (text.startsWith("//")) return <span className="cm">{text}</span>
  const parts: React.ReactNode[] = []
  let last = 0
  const re = new RegExp(`${DAX_KW.source}|"[^"]*"|^\\w+(?= :=)|\\b[A-Z_]+(?=\\[)|\\[\\w+\\]`, "g")
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0
    if (i > last) parts.push(text.slice(last, i))
    const t = m[0]
    const cls = t.startsWith('"') ? "sq" : t.startsWith("[") ? "col" : DAX_FNS.has(t) ? "kw" : i === 0 ? "ms" : "tb"
    parts.push(<span key={i} className={cls}>{t}</span>)
    last = i + t.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

/** Types the measure out once per selection; reduced motion shows it whole. */
function useTyped(total: number, key: string, instant: boolean): number {
  const [n, setN] = useState(instant ? total : 0)
  useEffect(() => {
    if (instant) {
      setN(total)
      return
    }
    setN(0)
    const id = window.setInterval(() => {
      setN((c) => {
        if (c + CHARS_PER_TICK >= total) {
          window.clearInterval(id)
          return total
        }
        return c + CHARS_PER_TICK
      })
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [key, total, instant])
  return n
}

function Measure({ k, reduce }: { k: Kpi; reduce: boolean }) {
  const lines = measureLines(k)
  const total = lines.reduce((n, l) => n + l.length + 1, 0)
  const typed = useTyped(total, k.id, reduce)
  let left = typed
  return (
    <pre className="mc-code" aria-label={`${k.measure} measure`}>
      {lines.map((l, i) => {
        const shown = l.slice(0, Math.max(0, left))
        left -= l.length + 1
        return (
          <span className="ln" key={i}>
            <i aria-hidden="true">{i + 1}</i>
            <span><CodeLine text={shown} />{left < 0 && left > -(l.length + 2) ? <b className="caret" aria-hidden="true" /> : null}</span>
          </span>
        )
      })}
    </pre>
  )
}

/** Digits roll up into place, odometer style, whenever the measure re-runs. */
function Roller({ value, runKey, reduce }: { value: string; runKey: string; reduce: boolean }) {
  if (!/^\d+$/.test(value)) return <span className="roll text">{value}</span>
  return (
    <span className="roll" aria-label={value}>
      {value.split("").map((d, i) => (
        <span className="rd" key={`${runKey}-${i}`} aria-hidden="true">
          <motion.span
            className="rc"
            initial={{ y: reduce ? `-${Number(d)}em` : "0em" }}
            animate={{ y: `-${Number(d)}em` }}
            transition={reduce ? { duration: 0 } : { ...springs.slow, delay: ROLL_DELAY_S + i * STAGGER_S }}
          >
            {DIGITS.map((n) => <span key={n}>{n}</span>)}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function Dashboard() {
  const reduce = !!useReducedMotion()
  const kpis = useKpis()
  const clock = useGoaClock()
  const [sel, setSel] = useState<KpiId>("exp")
  const [view, setView] = useState<ViewId>("res")
  const cur = kpis.find((k) => k.id === sel) ?? kpis[0]

  useOneScreen()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && /^(INPUT|TEXTAREA)$/.test(t.tagName)) return
      const i = KEY_ORDER.indexOf(sel)
      if (e.key === "ArrowRight") setSel(KEY_ORDER[(i + 1) % KEY_ORDER.length])
      else if (e.key === "ArrowLeft") setSel(KEY_ORDER[(i + KEY_ORDER.length - 1) % KEY_ORDER.length])
      else if (/^[1-7]$/.test(e.key)) setSel(KEY_ORDER[Number(e.key) - 1])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [sel])

  const swap = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: motionTokens.duration.fast } }
    : {
        initial: { opacity: 0, y: motionTokens.distance.sm },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -motionTokens.distance.sm },
        transition: springs.gentle,
      }

  return (
    <main className="page p-db" aria-label="Scorecard: a dashboard work sample" data-view={view}>
      <style>{CSS}</style>

      <header className="db-head">
        <div>
          <span className="kick"><Icon id="i-chart" /> Log.04 · Scorecard · work sample</span>
          <h1 className="big">The <em>scorecard.</em></h1>
        </div>
        <div className="db-meta">
          <p className="lede">
            Seven numbers on how I ship, write, train and use AI. Each one is a <b>real measure</b>: pick a stat, watch it
            run, read where it came from.
          </p>
          <div className="db-stamp"><span>Page rendered {clock} IST</span><TwinDoor to="/artist/sound" label="The listening behind the numbers" world="artist" /></div>
        </div>
      </header>

      <div className="db-body">
        <aside className="pc" aria-label="Player card">
          <div className="pc-top">
            <span className="pc-no">10</span>
            <span className="pc-pos">DA<br />BI</span>
          </div>
          <img className="pc-face" src="/me-800w.webp" alt="Tuhin Bhattacharya" width={800} height={1000} decoding="async" />
          <div className="pc-name">
            <b>Tuhin B.</b>
            <span>Data and BI analyst · Goa</span>
          </div>
          <div className="pc-stats" role="tablist" aria-label="Pick a stat">
            {kpis.map((k) => (
              <button
                key={k.id}
                type="button"
                role="tab"
                aria-selected={sel === k.id}
                aria-controls="db-console"
                aria-label={`${k.short}, ${k.label}: ${k.value} ${k.unit}`}
                className={`pc-stat ${k.state}${sel === k.id ? " on" : ""}`}
                onClick={() => setSel(k.id)}
              >
                {sel === k.id && <motion.span layoutId="pc-sel" className="ind" transition={springs.snappy} />}
                <b>{k.value}</b>
                <span>{k.short}<i className={`st ${k.state}`} /></span>
              </button>
            ))}
          </div>
          <p className="pc-note">Raw values only. No overall rating, because nothing here is weighted.</p>
        </aside>

        <section id="db-console" className="mc" role="tabpanel" aria-label={`${cur.label}, measure and result`}>
          <div className="mc-bar">
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="file"><span className="path">model / measures / </span><b>{cur.measure}.dax</b></span>
            <span className={`chip ${cur.state}`}>{cur.state === "off" ? "source offline" : cur.state === "live" ? "live" : "static"}</span>
            <span className="db-seg" role="group" aria-label="Console view">
              {VIEWS.map((v) => (
                <button key={v.id} type="button" aria-pressed={view === v.id} className={view === v.id ? "on" : ""} onClick={() => setView(v.id)}>
                  {v.label}
                </button>
              ))}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={cur.id} className="mc-grid" {...swap}>
              <div className="mc-src">
                <Measure k={cur} reduce={reduce} />
              </div>
              <div className="mc-run">
                <span className="go"><Icon id="i-arrow" /> run</span>
                <span className="lin">{cur.lineage.join("  →  ")}</span>
                <span className={`fresh ${cur.state}`}>refresh · {cur.refresh}</span>
              </div>
              <div className="mc-out">
                <span className="h">{cur.code} · {cur.label}</span>
                <div className={`num ${cur.state}`}>
                  <Roller value={cur.value} runKey={cur.id} reduce={reduce} />
                  <span className="u">{cur.unit}</span>
                </div>
                <p className="story">{cur.story}</p>
                <div className="brk"><Breakdown id={cur.id} /></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  )
}

const CSS = String.raw`
  html[data-one-screen] .page.p-db,html[data-toc] .page.p-db,.p-db{min-height:0;display:grid;grid-template-rows:auto minmax(0,1fr);
    gap:clamp(12px,2.2vh,24px);max-width:1240px;margin:0 auto;width:100%;overflow:hidden;position:relative}
  .p-db::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
    background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
    background-size:24px 24px;mask-image:radial-gradient(ellipse 80% 75% at 50% 45%,#000 40%,transparent 100%)}

  /* ---- head ---- */
  .p-db .db-head{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(16px,3vw,48px);align-items:end}
  .p-db .kick{display:inline-flex;align-items:center;gap:8px;font:600 10px/1.4 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--teal)}
  .p-db .kick .ic{width:13px;height:13px}
  .p-db .big{font-family:var(--font-display);font-weight:700;font-size:clamp(44px,min(5.6vw,9.5vh),88px);line-height:.88;letter-spacing:-.045em;color:var(--ink);margin:clamp(4px,1vh,10px) 0 0}
  .p-db .big em{font-style:normal;color:var(--accent)}
  .p-db .lede{font:500 clamp(12px,1vw,14px)/1.5 var(--font-mono);color:var(--muted);margin:0;max-width:52ch}
  .p-db .lede b{color:var(--ink);font-weight:600}
  .p-db .db-stamp{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:10px;
    font:600 10px/1.4 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}

  .p-db .db-body{min-height:0;display:grid;grid-template-columns:minmax(230px,.62fr) minmax(0,2fr);gap:clamp(12px,1.6vw,22px)}

  /* ---- the player card ---- */
  .p-db .pc{position:relative;min-height:0;display:flex;flex-direction:column;gap:10px;overflow:hidden;
    padding:clamp(14px,2vh,20px) clamp(14px,1.4vw,20px);border-radius:20px;
    border:1px solid color-mix(in srgb,var(--accent) 45%,var(--line));
    background:
      radial-gradient(120% 70% at 85% 0%,color-mix(in srgb,var(--accent) 26%,transparent),transparent 60%),
      linear-gradient(165deg,color-mix(in srgb,var(--teal) 14%,var(--card)),var(--card) 62%);
    box-shadow:inset 0 1px 0 color-mix(in srgb,#fff 12%,transparent),0 20px 50px -30px #000}
  .p-db .pc::after{content:"";position:absolute;inset:6px;border-radius:15px;border:1px dashed color-mix(in srgb,var(--accent) 28%,transparent);pointer-events:none}
  .p-db .pc-top{display:flex;align-items:flex-start;gap:10px;position:relative;z-index:1}
  .p-db .pc-no{font:800 clamp(44px,min(5vw,8vh),72px)/.8 var(--font-display);letter-spacing:-.05em;color:var(--accent)}
  .p-db .pc-pos{font:700 11px/1.15 var(--font-mono);letter-spacing:.16em;color:var(--ink);padding-top:4px}
  .p-db .pc-face{position:absolute;inset:0 0 auto 0;width:100%;height:74%;object-fit:cover;object-position:50% 18%;pointer-events:none;
    filter:saturate(.9) contrast(1.05);
    mask-image:linear-gradient(#000 45%,transparent 96%);-webkit-mask-image:linear-gradient(#000 45%,transparent 96%)}
  .p-db .pc-top{text-shadow:0 2px 18px #0009}
  .p-db .pc-name{margin-top:auto;position:relative;z-index:1;display:flex;flex-direction:column;gap:2px}
  .p-db .pc-name b{font:800 clamp(20px,1.9vw,28px)/1 var(--font-display);letter-spacing:-.02em;color:var(--ink);text-transform:uppercase}
  .p-db .pc-name span{font:600 10.5px/1.3 var(--font-mono);letter-spacing:.08em;color:var(--muted);text-transform:uppercase}
  .p-db .pc-stats{position:relative;z-index:1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:3px;
    border-top:1px solid color-mix(in srgb,var(--accent) 35%,var(--line));padding-top:8px}
  .p-db .pc-stat{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;padding:8px 2px 7px;border:0;border-radius:10px;
    background:transparent;color:var(--ink);cursor:pointer}
  .p-db .pc-stat .ind{position:absolute;inset:0;border-radius:inherit;background:color-mix(in srgb,var(--accent) 16%,transparent);border:1px solid var(--accent)}
  .p-db .pc-stat b{position:relative;font:800 clamp(17px,1.5vw,22px)/1 var(--font-display);letter-spacing:-.03em;white-space:nowrap}
  .p-db .pc-stat.off b{color:var(--muted);font-size:clamp(14px,1.2vw,17px)}
  .p-db .pc-stat>span{position:relative;display:inline-flex;align-items:center;gap:4px;font:700 10px/1 var(--font-mono);letter-spacing:.12em;color:var(--teal)}
  .p-db .pc-stat:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .p-db .pc-stat:hover b{color:var(--accent)}
  .p-db .pc-note{position:relative;z-index:1;margin:0;font:500 10.5px/1.4 var(--font-mono);color:var(--muted)}
  .p-db .st{width:6px;height:6px;border-radius:50%;display:inline-block}
  .p-db .st.static{background:var(--teal)}
  .p-db .st.live{background:#3ecf8e;box-shadow:0 0 0 3px color-mix(in srgb,#3ecf8e 25%,transparent)}
  .p-db .st.off{background:transparent;border:1.5px solid var(--muted)}

  /* ---- the measure console ---- */
  .p-db .mc{min-height:0;display:flex;flex-direction:column;overflow:hidden;border-radius:16px;border:1px solid var(--line);
    background:linear-gradient(140deg,color-mix(in srgb,var(--card) 76%,transparent),color-mix(in srgb,var(--card) 40%,transparent));backdrop-filter:blur(10px)}
  .p-db .mc-bar{display:flex;align-items:center;gap:12px;padding:9px 14px;border-bottom:1px solid var(--line);
    font:600 11px/1 var(--font-mono);color:var(--muted);min-width:0}
  .p-db .mc-bar .dots{display:inline-flex;gap:5px}
  .p-db .mc-bar .dots i{width:9px;height:9px;border-radius:50%;background:color-mix(in srgb,var(--ink) 18%,transparent)}
  .p-db .mc-bar .dots i:first-child{background:var(--accent)}
  .p-db .mc-bar .file{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .p-db .mc-bar .file b{color:var(--ink)}
  .p-db .chip{font:700 10px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;padding:5px 8px;border-radius:99px;border:1px solid var(--line);color:var(--teal)}
  .p-db .chip.live{color:#3ecf8e;border-color:color-mix(in srgb,#3ecf8e 45%,transparent)}
  .p-db .chip.off{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent)}
  .p-db .mc-grid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);
    grid-template-rows:minmax(0,1fr) auto;grid-template-areas:"src out" "run out"}
  .p-db .mc-src{grid-area:src;min-width:0;min-height:0;display:flex;flex-direction:column;border-right:1px solid var(--line);
    background:color-mix(in srgb,var(--ink) 3%,transparent)}
  .p-db .mc-code{flex:1;min-height:0;margin:0;padding:clamp(10px,1.6vh,16px) 0;overflow:hidden;
    font:500 clamp(11.5px,.95vw,13px)/1.62 var(--font-mono);color:var(--ink);white-space:pre-wrap;word-break:break-word}
  .p-db .mc-code .ln{display:grid;grid-template-columns:34px minmax(0,1fr);min-height:1.62em}
  .p-db .mc-code .ln>i{font-style:normal;text-align:right;padding-right:12px;color:color-mix(in srgb,var(--muted) 60%,transparent);user-select:none}
  .p-db .mc-code .cm{color:var(--muted);font-style:italic}
  .p-db .mc-code .kw{color:var(--accent);font-weight:700}
  .p-db .mc-code .ms{color:var(--teal);font-weight:700}
  .p-db .mc-code .tb{color:var(--ink);font-weight:700}
  .p-db .mc-code .col{color:#3ecf8e}
  .p-db .mc-code .sq{color:#e8b04b}
  .p-db .caret{display:inline-block;width:.55em;height:1.1em;vertical-align:-.2em;margin-left:1px;background:var(--accent);animation:dbblink 1s steps(1) infinite}
  @keyframes dbblink{50%{opacity:0}}
  .p-db .mc-run{grid-area:run;display:flex;flex-direction:column;gap:5px;padding:10px 14px;border-top:1px solid var(--line);border-right:1px solid var(--line);
    background:color-mix(in srgb,var(--ink) 3%,transparent);font:600 10.5px/1.4 var(--font-mono);color:var(--muted)}
  .p-db .mc-run .go{display:inline-flex;align-items:center;gap:6px;color:#3ecf8e;letter-spacing:.14em;text-transform:uppercase}
  .p-db .mc-run .go .ic{width:11px;height:11px}
  .p-db .mc-run .lin{color:var(--ink)}
  .p-db .mc-run .fresh.off{color:var(--accent)}
  .p-db .mc-out{grid-area:out;min-width:0;min-height:0;display:flex;flex-direction:column;gap:clamp(6px,1.2vh,12px);padding:clamp(12px,2vh,20px) clamp(14px,1.6vw,22px);overflow:hidden}
  .p-db .mc-out .h{font:700 10px/1.3 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--teal)}
  .p-db .num{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
  .p-db .roll{display:inline-flex;font:800 clamp(56px,min(6.4vw,11vh),104px)/1 var(--font-display);letter-spacing:-.05em;color:var(--ink)}
  .p-db .roll.text{color:var(--muted)}
  .p-db .rd{display:inline-block;height:1em;overflow:hidden}
  .p-db .rc{display:flex;flex-direction:column}
  .p-db .rc span{height:1em;display:block;text-align:center}
  .p-db .num .u{font:600 11px/1.3 var(--font-mono);letter-spacing:.06em;color:var(--muted)}
  .p-db .story{margin:0;font:600 clamp(15px,1.35vw,19px)/1.35 var(--font-display);color:var(--ink);text-wrap:balance}
  .p-db .brk{flex:1;min-height:0;margin-top:auto}

  .p-db .db-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
  .p-db .db-list li{display:flex;align-items:center;gap:10px;padding:clamp(6px,1vh,9px) 0;border-bottom:1px solid var(--line);min-width:0}
  .p-db .db-list .t{flex:1;min-width:0;font:600 clamp(12.5px,1vw,14px)/1.3 var(--font-display);color:var(--ink);text-decoration:none;overflow-wrap:anywhere}
  .p-db .db-list .k{flex:0 0 32%;font:600 10.5px/1.3 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
  .p-db .db-list .n{font:600 11px/1 var(--font-mono);color:var(--muted)}
  .p-db .db-list .pill{font:700 10px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;padding:5px 8px;border-radius:99px;
    border:1px solid var(--line);color:var(--muted)}
  .p-db .db-list .pill.shipped{color:#3ecf8e;border-color:color-mix(in srgb,#3ecf8e 45%,transparent)}
  .p-db .db-list .pill.writeup{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent)}
  .p-db .db-list .rb i{flex:0 0 22%;height:6px;border-radius:3px;background:linear-gradient(90deg,var(--teal) var(--w),color-mix(in srgb,var(--teal) 15%,transparent) var(--w))}
  .p-db .db-list .go{border-bottom:0}
  .p-db .db-list .go a{display:inline-flex;align-items:center;gap:6px;font:700 11px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--accent);text-decoration:none}
  .p-db .db-list .go .ic{width:12px;height:12px}
  .p-db .db-list .weeks{flex:1;display:flex;gap:3px;flex-wrap:wrap}
  .p-db .db-list .weeks i{width:14px;height:14px;border-radius:3px;background:var(--teal)}
  .p-db .db-list .src{font:500 10.5px/1.4 var(--font-mono);color:var(--muted)}
  .p-db .db-off{display:flex;flex-direction:column;gap:6px;padding:12px;border-radius:12px;border:1px dashed color-mix(in srgb,var(--accent) 45%,transparent);
    font:500 12.5px/1.45 var(--font-display);color:var(--muted)}
  .p-db .db-off b{color:var(--ink);font-weight:600}

  .p-db .db-gantt{position:relative;display:flex;flex-direction:column;gap:clamp(8px,1.6vh,14px);padding-top:22px}
  .p-db .db-gantt .axis{position:absolute;inset:0 0 auto 0;height:16px;border-bottom:1px solid var(--line)}
  .p-db .db-gantt .axis span{position:absolute;top:0;transform:translateX(-50%);font:600 10px/1 var(--font-mono);color:var(--muted)}
  .p-db .db-gantt .axis span:first-child{transform:none}
  .p-db .db-gantt .axis span:last-child{transform:translateX(-100%)}
  .p-db .db-gantt .lane{position:relative;padding-top:16px}
  .p-db .db-gantt .bar{position:absolute;top:0;height:10px;border-radius:5px;background:var(--accent);min-width:8px}
  .p-db .db-gantt .lab{display:flex;flex-direction:column;gap:2px}
  .p-db .db-gantt .lab b{font:600 clamp(12.5px,1vw,14px)/1.2 var(--font-display);color:var(--ink)}
  .p-db .db-gantt .lab span{font:500 11px/1.3 var(--font-mono);color:var(--muted)}

  /* ---- ≤900: card becomes a strip, console shows one view at a time ---- */
  .p-db .db-seg{display:none}
  @media (max-width:900px){
    .p-db .db-head{grid-template-columns:1fr;gap:8px}
    .p-db .db-body{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr)}
    .p-db .pc{display:grid;grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:"no name face" "stats stats stats";gap:8px 12px;padding:12px 14px}
    .p-db .pc-top{grid-area:no}
    .p-db .pc-name{grid-area:name;margin:0;align-self:center}
    .p-db .pc-face{grid-area:face;position:static;height:58px;width:58px;max-width:none;object-fit:cover;object-position:top;border-radius:50%;
      mask-image:none;-webkit-mask-image:none;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent)}
    .p-db .pc-stats{grid-area:stats;grid-template-columns:repeat(8,minmax(0,1fr));gap:2px}
    .p-db .pc-stat>span{letter-spacing:.04em;gap:3px}
    .p-db .pc-note{display:none}
    .p-db .pc::after{display:none}
    .p-db .mc-bar{padding:6px 6px 6px 12px;gap:8px}
    .p-db .mc-bar .chip{display:none}
    .p-db .db-seg{display:flex;flex:0 0 auto;gap:2px;padding:2px;border-radius:99px;border:1px solid var(--line)}
    .p-db .db-seg button{border:0;background:transparent;color:var(--muted);cursor:pointer;padding:7px 10px;border-radius:99px;
      font:700 10px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase}
    .p-db .db-seg button.on{background:color-mix(in srgb,var(--accent) 18%,transparent);color:var(--ink)}
    .p-db .db-seg button:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
    /* one view at a time: Result = number + story, Detail = breakdown + lineage, Measure = the DAX */
    .p-db .mc-grid{display:flex;flex-direction:column}
    .p-db .mc-src,.p-db .mc-out,.p-db .mc-run{display:none;border-right:0}
    .p-db[data-view="src"] .mc-src{display:flex;flex:1}
    .p-db[data-view="res"] .mc-out,.p-db[data-view="brk"] .mc-out{display:flex;flex:1}
    .p-db[data-view="res"] .brk{display:none}
    .p-db[data-view="res"] .mc-out{justify-content:center}
    .p-db[data-view="brk"] .num,.p-db[data-view="brk"] .story{display:none}
    .p-db[data-view="brk"] .brk{margin-top:0}
    .p-db[data-view="brk"] .mc-run{display:flex}
  }
  @media (max-width:900px) and (min-width:601px){
    .p-db .roll{font-size:clamp(72px,14vw,120px)}
    .p-db .story{font-size:22px}
  }
  @media (max-width:600px){
    .p-db{gap:10px}
    .p-db .big{font-size:clamp(38px,11vw,48px)}
    .p-db .lede{font-size:11.5px}
    .p-db .db-stamp>span{display:none}
    .p-db .pc-no{font-size:40px}
    .p-db .pc-name b{font-size:19px}
    .p-db .pc-stat{padding:6px 1px}
    .p-db .pc-stat b{font-size:14px}
    .p-db .pc-stat.off b{font-size:12px}
    .p-db .mc-bar .dots,.p-db .mc-bar .path{display:none}
    .p-db .mc-code{font-size:11px;line-height:1.5}
    .p-db .mc-code .ln{grid-template-columns:24px minmax(0,1fr)}
    .p-db .mc-code .ln>i{padding-right:8px}
    .p-db .mc-out{padding:10px 12px;gap:6px}
    .p-db .roll{font-size:64px}
    .p-db .story{font-size:16px}
    .p-db .db-list li{padding:5px 0}
    .p-db .db-gantt{gap:6px;padding-top:20px}
    .p-db .db-gantt .lane{padding-top:14px}
  }
  @media (max-width:600px) and (max-height:720px){
    .p-db{gap:8px}
    .p-db .big{font-size:36px}
    .p-db .lede{font-size:11px;line-height:1.35}
    .p-db .db-stamp{margin-top:5px}
    .p-db .pc{padding:8px 12px;gap:4px 10px}
    .p-db .pc-face{display:none}
    .p-db .pc-no{font-size:30px}
    .p-db .pc-name b{font-size:17px}
    .p-db .pc-stats{padding-top:5px}
    .p-db .pc-stat{padding:5px 1px;gap:2px}
    .p-db .roll{font-size:52px}
    .p-db .mc-code{font-size:10.5px;line-height:1.2;padding:4px 0}
    .p-db .db-list li{padding:4px 0}
    .p-db .db-list .t{font-size:12px}
    .p-db .db-off{padding:8px 10px;gap:3px;font-size:11.5px;line-height:1.35}
    .p-db[data-view="brk"] .mc-out .h{display:none}
    .p-db .mc-run{padding:7px 12px;gap:3px}
    .p-db .mc-out{padding:8px 12px;gap:5px}
    .p-db .db-gantt{gap:5px;padding-top:18px}
    .p-db .db-gantt .lane{padding-top:13px}
    .p-db .db-gantt .lab{flex-direction:row;flex-wrap:wrap;align-items:baseline;gap:0 8px}
  }
  @media (max-width:600px) and (max-height:660px){
    .p-db{gap:7px}
    .p-db .big{font-size:32px}
    .p-db .db-stamp{margin-top:4px}
    .p-db .mc-out{padding:8px 11px;gap:4px}
    .p-db .story{font-size:13px}
    .p-db .db-list li{padding:3px 0}
    .p-db .mc-code{font-size:10px;line-height:1.1;padding:1px 0}
    .p-db .lede{line-height:1.3}
    .p-db .pc-name span{display:none}
    .p-db .db-gantt{gap:3px}
  }
  @media (max-height:760px) and (min-width:901px){
    .p-db .mc-code{font-size:11.5px;line-height:1.5}
    .p-db .story{font-size:15px}
  }
  @media (prefers-reduced-motion:reduce){
    .p-db .caret{animation:none}
  }
`
