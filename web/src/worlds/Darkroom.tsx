import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { LOCAL_FRAMES } from "../lib/live"
import { metaForUrl } from "../lib/gallery-meta"
import { parseShutter } from "../lib/exif-scatter"
import { developMs, gradeOf, printLook, progressAt, type Grade } from "../lib/darkroom"

const NOTE: Record<Grade, string> = {
  underdeveloped: "Pulled too early. The print is thin and ghostly.",
  perfect: "Clean print. Hang it up.",
  overdeveloped: "Left too long. The highlights burned out.",
}

/** A red-lit darkroom: hold the tray to develop a real frame. Its real shutter speed (x1000) is how long it needs. */
export default function Darkroom() {
  const frames = useMemo(() => LOCAL_FRAMES, [])
  const [i, setI] = useState(0)
  const [p, setP] = useState(0)
  const [fixed, setFixed] = useState(false)
  const startAt = useRef<number | null>(null)
  const raf = useRef(0)
  const img = useRef<HTMLImageElement>(null)

  const frame = frames[i % frames.length]
  const exif = metaForUrl(frame.url)?.exif
  const shutter = parseShutter(exif?.shutter)
  const dev = developMs(shutter)

  const stop = () => {
    if (startAt.current == null) return
    startAt.current = null
    cancelAnimationFrame(raf.current)
    setFixed(true)
  }
  const start = () => {
    if (fixed || startAt.current != null) return
    startAt.current = performance.now()
    const tick = (now: number) => {
      if (startAt.current == null) return
      setP(progressAt(now - startAt.current, dev))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const next = () => {
    startAt.current = null
    setP(0)
    setFixed(false)
    setI((n) => n + 1)
  }

  const save = () => {
    const el = img.current
    if (!el) return
    const c = document.createElement("canvas")
    c.width = el.naturalWidth
    c.height = el.naturalHeight
    const g = c.getContext("2d")
    if (!g) return
    const look = printLook(p)
    g.filter = `brightness(${look.brightness}) contrast(${look.contrast})`
    g.drawImage(el, 0, 0)
    const a = document.createElement("a")
    a.download = `${frame.name.replace(/\s+/g, "-")}-${gradeOf(p)}.jpg`
    a.href = c.toDataURL("image/jpeg", 0.9)
    a.click()
  }

  const look = printLook(p)
  const grade = gradeOf(p)
  return (
    <main className="dr">
      <header>
        <Link to="/artist/gallery">leave the darkroom</Link>
        <span>{i % frames.length + 1} / {frames.length}</span>
      </header>
      <div className="easel">
        <img className="neg" src={frame.url} alt="" draggable={false} />
        <img
          ref={img}
          className="pos"
          src={frame.url}
          alt={`${frame.name}, ${grade}`}
          draggable={false}
          style={{ opacity: look.opacity, filter: `brightness(${look.brightness}) contrast(${look.contrast})` }}
        />
      </div>
      <p className="meta">
        {frame.name} · {exif?.shutter ?? "shutter unknown"} · {exif?.iso ?? ""} · needs {(dev / 1000).toFixed(1)}s
      </p>
      <div className="bar" aria-hidden="true"><i style={{ width: `${Math.min(100, (p / 2) * 100)}%` }} /><b style={{ left: "50%" }} /></div>
      {!fixed ? (
        <button
          type="button"
          className="tray"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            start()
          }}
          onPointerUp={stop}
          onPointerCancel={stop}
          onKeyDown={(e) => {
            if ((e.key === " " || e.key === "Enter") && !e.repeat) start()
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") stop()
          }}
        >
          {p === 0 ? "hold to develop" : "developing... let go to fix"}
        </button>
      ) : (
        <div className="done" role="status">
          <span>{NOTE[grade]}</span>
          <button type="button" onClick={save}>save print</button>
          <button type="button" onClick={next}>next negative</button>
        </div>
      )}
      <style>{`
        .dr{min-height:100vh;box-sizing:border-box;padding:3vh 5vw;background:#1a0505;color:#ff9a8a;font:600 12px/1.4 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:1.4vh;overflow:hidden}
        .dr header{width:min(90vw,calc(52vh*1.5));display:flex;justify-content:space-between}
        .dr a{color:inherit}
        .dr .easel{position:relative;height:52vh;aspect-ratio:1.5;max-width:90vw;background:#0a0202;border:1px solid #5a1a1a;box-shadow:0 0 60px -10px #ff2a1a55}
        .dr .easel img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;user-select:none}
        .dr .neg{filter:invert(1) grayscale(1) contrast(.85) brightness(.55) sepia(1) hue-rotate(-30deg) saturate(3);opacity:.5}
        .dr .meta{margin:0;opacity:.8}
        .dr .bar{position:relative;width:min(90vw,calc(52vh*1.5));height:6px;background:#3a0f0f}
        .dr .bar i{position:absolute;inset:0 auto 0 0;background:#ff6a55}
        .dr .bar b{position:absolute;top:-4px;bottom:-4px;width:2px;background:#fff3}
        .dr .tray,.dr .done button{font:inherit;letter-spacing:inherit;text-transform:inherit;color:#ffd0c8;background:#3a0f0f;border:1px solid #ff6a55;border-radius:10px;padding:14px 26px;cursor:pointer;touch-action:none;user-select:none}
        .dr .tray:active,.dr .tray:focus-visible{background:#5a1a1a}
        .dr .done{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center}
        .dr .done button{touch-action:auto}
      `}</style>
    </main>
  )
}
