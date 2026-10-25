import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { blockOf, entryText, frameAt, parseLog, type Entry, type Kind } from "../lib/replay"

const KIND_COLOR: Record<Kind, string> = {
  feat: "#7fd99a",
  fix: "#f2b66d",
  docs: "#7db7e8",
  test: "#c79bf0",
  perf: "#f27d8b",
  chore: "#8a948d",
  other: "#8a948d",
}

const SPEED = 1

/** The portfolio replays its own real git history, one commit at a time. */
export default function Replay() {
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [t, setT] = useState(0)
  const shown = useRef("")

  useEffect(() => {
    fetch("/data/history.txt")
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((raw) => setEntries(parseLog(raw)))
      .catch(() => setEntries([]))
  }, [])

  useEffect(() => {
    if (!entries?.length) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setT(Number.MAX_SAFE_INTEGER)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const el = (now - start) * SPEED
      const f = frameAt(entries, el)
      // re-render only when something visible changed (a typed character or a finished line)
      const key = `${f.done.length}:${f.typing.length}`
      if (key !== shown.current) {
        shown.current = key
        setT(el)
      }
      if (!f.finished) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [entries])

  if (!entries) return <main className="replay" aria-busy="true" />
  if (!entries.length)
    return (
      <main className="replay">
        <h1>git log, replayed</h1>
        <p className="sub">History not available right now.</p>
        <Link to="/">back to the site</Link>
      </main>
    )
  const f = frameAt(entries, t)
  return (
    <main className="replay">
      <h1>git log, replayed</h1>
      <p className="sub">{entries.length} real commits. Nothing staged.</p>
      <ol aria-live="off">
        {f.done.slice(-14).map((e) => (
          <li key={e.hash}>{entryText(e)}</li>
        ))}
        {!f.finished && <li className="cur">{f.typing}</li>}
      </ol>
      <Skyline entries={entries} count={f.done.length + (f.typing ? 1 : 0)} />
      {f.finished && <Link to="/">back to the site</Link>}
      <style>{`
        .replay{min-height:100vh;box-sizing:border-box;padding:6vh 6vw;background:#0d0f0e;color:#cfe8d5;font:14px/1.6 ui-monospace,Menlo,Consolas,monospace;overflow:hidden}
        .replay h1{font-size:15px;margin:0;color:#7fd99a;font-weight:600}
        .replay .sub{margin:4px 0 20px;opacity:.6}
        .replay ol{list-style:none;margin:0 0 20px;padding:0}
        .replay li{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .replay .cur::after{content:"▌";animation:rp-blink 1s steps(1) infinite}
        .replay .sky{position:fixed;left:6vw;right:6vw;bottom:5vh;width:88vw;height:34vh}
        .replay a{position:relative;z-index:1;color:#7fd99a}
        @keyframes rp-blink{50%{opacity:0}}
        @media (prefers-reduced-motion:reduce){.replay .cur::after{animation:none}}
      `}</style>
    </main>
  )
}

/** One block per commit, height = real lines touched (log scale), colour = commit type. */
function Skyline({ entries, count }: { entries: Entry[]; count: number }) {
  const w = 100 / Math.max(entries.length, 1)
  return (
    <svg className="sky" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Commit skyline: taller means more lines changed">
      {entries.slice(0, count).map((e, i) => {
        const b = blockOf(e)
        return <rect key={e.hash} x={i * w + w * 0.08} y={100 - b.height} width={w * 0.84} height={b.height} fill={KIND_COLOR[b.kind]} opacity={0.85} />
      })}
    </svg>
  )
}
