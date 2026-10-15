import { useEffect, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { animate, motion } from "motion/react"
import { useAi, useGithub, useGym, useMedium, useNowPlaying, type AiResp } from "../../../lib/live"
import { useReducedMotion } from "../../../hooks/useSafeMotion"
import { motionTokens, springs } from "../../../lib/motion-tokens"

/**
 * "Live wire": an instrument strip of real, baked activity aggregates
 * (agent build log, GitHub, training, latest essay) plus the live
 * now-playing feed when the proxy is up. No number here is invented: a
 * feed in fallback renders "off" instead of a value.
 */

const IST = "Asia/Kolkata"
const PULSE_S = 1.8
const COUNT_MS = 1100

export const WIRE_CSS = String.raw`
  .ah-wire{position:relative;min-width:0;display:flex;flex-direction:column;gap:8px;padding:clamp(9px,1.4vh,14px) clamp(12px,1.4vw,18px);border-radius:14px;
    background:linear-gradient(140deg,color-mix(in srgb,var(--card) 70%,transparent),color-mix(in srgb,var(--card) 35%,transparent));
    border:1px solid color-mix(in srgb,var(--teal) 22%,var(--rule));backdrop-filter:blur(10px);
    box-shadow:inset 0 1px 0 color-mix(in srgb,#fff 8%,transparent),var(--shadow-sm)}
  .ah-wire-hd{display:flex;align-items:center;gap:10px;min-width:0;font:600 10px/1.2 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
  .ah-wire-hd b{color:var(--teal);font-weight:700}
  .ah-dot{width:7px;height:7px;flex:none;border-radius:50%;background:var(--grana);box-shadow:0 0 8px var(--grana)}
  .ah-asof{margin-left:auto;white-space:nowrap;letter-spacing:.12em}
  .ah-air{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:.08em;text-transform:none;color:var(--ink)}
  .ah-air i{font-style:normal;color:var(--teal);margin-right:6px;text-transform:uppercase;letter-spacing:.14em}
  .ah-cells{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1.05fr) minmax(0,1.35fr);min-width:0;
    border-top:1px solid color-mix(in srgb,var(--ink) 14%,transparent)}
  .ah-cell{position:relative;min-width:0;display:flex;flex-direction:column;gap:3px;padding:9px 12px 2px;color:var(--ink);text-decoration:none;
    border-left:1px solid color-mix(in srgb,var(--ink) 12%,transparent);transition:background .25s var(--ease)}
  .ah-cell:first-child{border-left:0;padding-left:0}
  .ah-cell:hover,.ah-cell:focus-visible{background:color-mix(in srgb,var(--teal) 7%,transparent);outline:none}
  .ah-cell:focus-visible .ah-k{outline:2px solid var(--accent);outline-offset:3px}
  .ah-k{font:600 9.5px/1.2 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ah-v{display:flex;align-items:baseline;gap:6px;font:700 clamp(22px,min(2.3vw,4vh),34px)/1 var(--font-display);letter-spacing:-.03em;font-variant-numeric:tabular-nums}
  .ah-v small{display:none;font:600 9.5px/1 var(--font-mono);letter-spacing:.04em;color:var(--teal)}
  .ah-v.off{color:var(--muted);font-size:clamp(16px,1.6vw,22px)}
  .ah-sub{font:500 10.5px/1.35 var(--font-mono);color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ah-row{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;min-width:0}
  .ah-bars{display:flex;align-items:flex-end;gap:4px;height:34px;flex:none}
  .ah-bar{display:flex;flex-direction:column;align-items:center;gap:3px;height:100%;justify-content:flex-end;width:22px}
  .ah-bar span{display:block;width:10px;border-radius:2px 2px 0 0;background:linear-gradient(180deg,var(--teal),color-mix(in srgb,var(--accent) 70%,transparent));transform-origin:bottom}
  .ah-bar em{font:600 9.5px/1 var(--font-mono);font-style:normal;color:var(--muted);text-transform:uppercase}
  .ah-title{font:600 clamp(12px,1vw,14px)/1.25 var(--font-display);color:var(--ink);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .ah-cell:hover .ah-title{color:var(--accent)}
  @media(max-width:1100px){.ah-sub.opt{display:none}}
  /* phone: one compact line, dot then three value+unit readouts */
  @media(max-width:600px){
    .ah-wire{flex-direction:row;align-items:center;padding:4px 4px 4px 10px;gap:6px;border-radius:12px}
    .ah-wire-hd b,.ah-asof,.ah-air{display:none}
    .ah-cells{flex:1;grid-template-columns:repeat(3,minmax(0,1fr));border-top:0}
    .ah-cell{padding:8px 4px 8px 8px;justify-content:center}
    .ah-cell:first-child{padding-left:4px}
    .ah-cell.wide,.ah-bars,.ah-sub,.ah-k{display:none}
    .ah-v{font-size:clamp(17px,5vw,20px);gap:4px}
    .ah-v small{display:inline}
  }
`

// fixed three-letter months (en-GB Intl renders September as "Sept")
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** Any parseable date → IST { d, m, y } parts, or null. */
function istParts(raw?: string): { d: number; m: string; y: number } | null {
  if (!raw) return null
  const t = new Date(raw)
  if (Number.isNaN(t.getTime())) return null
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: IST, day: "numeric", month: "numeric", year: "numeric" }).formatToParts(t)
  const get = (k: string) => Number(p.find((x) => x.type === k)?.value ?? 0)
  return { d: get("day"), m: MONTHS[get("month") - 1] ?? "", y: get("year") }
}

/** "2026-10-15T17:08:38Z" → "15 Oct 2026". */
function dayDate(raw?: string): string {
  const p = istParts(raw)
  return p ? `${p.d} ${p.m} ${p.y}` : ""
}

/** "Tue, 10 Feb 2026 04:43:07 GMT" → "Feb 2026". */
function monthYear(raw?: string): string {
  const p = istParts(raw)
  return p ? `${p.m} ${p.y}` : ""
}

/** "2026-09" → "Sep". */
function monthAbbr(ym: string): string {
  return MONTHS[Number(ym.slice(5, 7)) - 1] ?? ym
}

/** Rolls 0 to target on mount (the strip is always on screen); jumps under reduced motion. */
function useRoll(target: number): number {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (reduce || target <= 0) {
      setValue(target)
      return
    }
    const ctl = animate(0, target, {
      duration: COUNT_MS / 1000,
      ease: motionTokens.easing.smooth,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => ctl.stop()
  }, [target, reduce])
  return value
}

function Count({ n, unit }: { n: number; unit?: string }) {
  const value = useRoll(n)
  return (
    <span className="ah-v" aria-label={`${n}${unit ? ` ${unit}` : ""}`}>
      <span aria-hidden="true">{value.toLocaleString("en-IN")}</span>
      {unit && <small aria-hidden="true">{unit}</small>}
    </span>
  )
}

function Value({ n, unit, off }: { n: number; unit?: string; off: boolean }) {
  return off ? <span className="ah-v off">off</span> : <Count n={n} unit={unit} />
}

/** Agent output tokens per baked month: tiny bar meter, grows in on mount. */
function MonthBars({ months }: { months: AiResp["months"] }) {
  const reduce = useReducedMotion()
  const max = Math.max(1, ...months.map((m) => m.output))
  const label = months.map((m) => `${monthAbbr(m.month)} ${Math.round(m.output / 1000)}k`).join(", ")
  return (
    <span className="ah-bars" role="img" aria-label={`Agent output tokens by month: ${label}`}>
      {months.map((m, i) => (
        <span className="ah-bar" key={m.month}>
          <motion.span
            style={{ height: `${Math.max(6, (m.output / max) * 22)}px` }}
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ ...springs.gentle, delay: reduce ? 0 : motionTokens.duration.normal + i * 0.08 }}
          />
          <em>{monthAbbr(m.month)}</em>
        </span>
      ))}
    </span>
  )
}

interface CellProps {
  to: string
  label: string
  onChannel: (to: string | null) => void
  className?: string
  children: ReactNode
}

function Cell({ to, label, onChannel, className = "", children }: CellProps) {
  const enter = () => onChannel(to)
  const leave = () => onChannel(null)
  return (
    <Link to={to} className={`ah-cell ${className}`} aria-label={label} onMouseEnter={enter} onFocus={enter} onMouseLeave={leave} onBlur={leave}>
      {children}
    </Link>
  )
}

function BuildCell({ onChannel }: { onChannel: (to: string | null) => void }) {
  const { data, fallback } = useAi()
  const since = dayDate(data.since)
  return (
    <Cell to="/analyst/dashboard" label={`Agent build log: ${data.commits} commits across ${data.repos} repos${since ? ` since ${since}` : ""}. Open the dashboard`} onChannel={onChannel}>
      <span className="ah-k">Agent commits</span>
      <span className="ah-row">
        <Value n={data.commits} unit="commits" off={fallback} />
        {!fallback && data.months.length > 0 && <MonthBars months={data.months} />}
      </span>
      <span className="ah-sub">{fallback ? "agent log offline" : `${data.repos} repos · ${data.activeDays} build days`}</span>
    </Cell>
  )
}

function CodeCell({ onChannel }: { onChannel: (to: string | null) => void }) {
  const { data, fallback } = useGithub()
  const n = data.contributions ?? 0
  const off = fallback || data.contributions == null
  return (
    <Cell to="/analyst/work" label={`GitHub: ${n} contributions in the last year. Open the work`} onChannel={onChannel}>
      <span className="ah-k">GitHub · 12 mo</span>
      <Value n={n} unit="contribs" off={off} />
      <span className="ah-sub">{off ? "feed offline" : "contributions"}</span>
    </Cell>
  )
}

function GymCell({ onChannel }: { onChannel: (to: string | null) => void }) {
  const { data, fallback } = useGym()
  return (
    <Cell to="/analyst/dashboard" label={`Training: ${data.workouts} workouts logged, best run ${data.bestWeekStreak} weeks. Open the dashboard`} onChannel={onChannel}>
      <span className="ah-k">Gym sessions</span>
      <Value n={data.workouts} unit="sessions" off={fallback} />
      <span className="ah-sub">{fallback ? "feed offline" : `best run ${data.bestWeekStreak} weeks`}</span>
    </Cell>
  )
}

function WritingCell() {
  const { data, fallback } = useMedium()
  const post = data.posts?.[0]
  if (fallback || !post) {
    return (
      <span className="ah-cell wide">
        <span className="ah-k">Essay</span>
        <span className="ah-v off">off</span>
      </span>
    )
  }
  const when = monthYear(post.published)
  return (
    <a className="ah-cell wide" href={post.url} target="_blank" rel="noreferrer" aria-label={`Latest essay on Medium: ${post.title}${when ? `, ${when}` : ""}`}>
      <span className="ah-k">Essay{when ? ` · ${when}` : ""}</span>
      <span className="ah-title">{post.title.replace(/…$/, "")}</span>
      <span className="ah-sub opt">on Medium ↗</span>
    </a>
  )
}

/** Live proxy feed; renders nothing when offline, unconfigured or idle. */
function OnAir() {
  const { data } = useNowPlaying()
  if (!data?.configured || !data.isPlaying || !data.title) return null
  return (
    <span className="ah-air">
      <i>On air</i>{data.title}{data.artist ? `, ${data.artist}` : ""}
    </span>
  )
}

function Pulse() {
  const reduce = useReducedMotion()
  if (reduce) return <span className="ah-dot" aria-hidden="true" />
  return (
    <motion.span
      className="ah-dot"
      aria-hidden="true"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: PULSE_S, repeat: Infinity, ease: motionTokens.easing.inOut }}
    />
  )
}

export function LiveWire({ onChannel }: { onChannel: (to: string | null) => void }) {
  const { data } = useAi()
  const asOf = dayDate(data.generatedAt ?? data.until)
  return (
    <section className="ah-wire" aria-label="Live wire: recent activity from baked feeds">
      <div className="ah-wire-hd">
        <Pulse />
        <b>Live wire</b>
        <OnAir />
        {asOf && <span className="ah-asof">as of {asOf}</span>}
      </div>
      <div className="ah-cells">
        <BuildCell onChannel={onChannel} />
        <CodeCell onChannel={onChannel} />
        <GymCell onChannel={onChannel} />
        <WritingCell />
      </div>
    </section>
  )
}
