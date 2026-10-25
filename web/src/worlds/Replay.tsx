import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { entryText, frameAt, parseLog, type Entry } from "../lib/replay"

const SPEED = 1

/** The portfolio replays its own real git history, one commit at a time. */
export default function Replay() {
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [t, setT] = useState(0)

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
      setT(el)
      if (!frameAt(entries, el).finished) raf = requestAnimationFrame(tick)
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
      {f.finished && <Link to="/">back to the site</Link>}
      <style>{`
        .replay{min-height:100vh;box-sizing:border-box;padding:6vh 6vw;background:#0d0f0e;color:#cfe8d5;font:14px/1.6 ui-monospace,Menlo,Consolas,monospace;overflow:hidden}
        .replay h1{font-size:15px;margin:0;color:#7fd99a;font-weight:600}
        .replay .sub{margin:4px 0 20px;opacity:.6}
        .replay ol{list-style:none;margin:0 0 20px;padding:0}
        .replay li{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .replay .cur::after{content:"▌";animation:rp-blink 1s steps(1) infinite}
        .replay a{color:#7fd99a}
        @keyframes rp-blink{50%{opacity:0}}
        @media (prefers-reduced-motion:reduce){.replay .cur::after{animation:none}}
      `}</style>
    </main>
  )
}
