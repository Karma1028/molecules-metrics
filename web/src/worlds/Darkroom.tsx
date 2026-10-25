import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { LOCAL_FRAMES } from "../lib/live"
import { metaForUrl } from "../lib/gallery-meta"
import { parseShutter } from "../lib/exif-scatter"
import {
  STAGE_MS,
  developMs,
  finalLook,
  fixOutcome,
  gradeOf,
  nextStage,
  printLook,
  progressAt,
  stagePct,
  type FixOutcome,
  type Stage,
} from "../lib/darkroom"

const TRAYS: { stage: Extract<Stage, "develop" | "stop" | "fix">; label: string }[] = [
  { stage: "develop", label: "1 developer" },
  { stage: "stop", label: "2 stop bath" },
  { stage: "fix", label: "3 fixer" },
]
const HINT: Record<Stage, string> = {
  develop: "Hold the developer tray. The frame's real shutter time sets how long.",
  stop: "Hold the stop bath. Skip it and the developer keeps working.",
  fix: "Hold the fixer. Too short and the print fades in daylight.",
  dry: "Hanging to dry...",
  lights: "",
}
const OUTCOME: Record<FixOutcome, string> = {
  stable: "Stable print.",
  fogs: "No stop bath: the print fogged in the light.",
  fades: "Half-fixed: it fades the moment the light comes on.",
}

/** A red-lit darkroom with the real process: develop (real shutter time x1000), stop bath, fixer, dry, then lights on. */
export default function Darkroom() {
  const frames = useMemo(() => LOCAL_FRAMES, [])
  const [i, setI] = useState(0)
  const [stage, setStage] = useState<Stage>("develop")
  const [p, setP] = useState(0) // live hold progress for the active tray
  const [dev, setDev] = useState(0)
  const [stopP, setStopP] = useState(0)
  const [fixP, setFixP] = useState(0)
  const startAt = useRef<number | null>(null)
  const raf = useRef(0)
  const img = useRef<HTMLImageElement>(null)

  const frame = frames[i % frames.length]
  const exif = metaForUrl(frame.url)?.exif
  const devNeed = developMs(parseShutter(exif?.shutter))
  const lights = stage === "lights"
  const outcome = fixOutcome(stopP, fixP)

  const finish = (s: Stage, held: number) => {
    startAt.current = null
    cancelAnimationFrame(raf.current)
    if (s === "develop") setDev(held)
    if (s === "stop") setStopP(held)
    if (s === "fix") setFixP(held)
    setP(0)
    setStage(nextStage(s))
  }

  const progressFor = (s: Stage, el: number) =>
    s === "develop" ? progressAt(el, devNeed) : stagePct(el, STAGE_MS[s as "stop" | "fix"])

  const start = (s: Stage) => {
    if (s !== stage || startAt.current != null) return
    startAt.current = performance.now()
    const tick = (now: number) => {
      if (startAt.current == null) return
      const v = progressFor(s, now - startAt.current)
      setP(v)
      if (s !== "develop" && v >= 1) return finish(s, 1)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }
  const release = (s: Stage) => {
    if (s !== stage || startAt.current == null) return
    finish(s, progressFor(s, performance.now() - startAt.current))
  }

  // drying runs by itself
  useEffect(() => {
    if (stage !== "dry") return
    const t = window.setTimeout(() => setStage("lights"), STAGE_MS.dry)
    return () => window.clearTimeout(t)
  }, [stage])
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const again = () => {
    startAt.current = null
    setP(0)
    setDev(0)
    setStopP(0)
    setFixP(0)
    setStage("develop")
    setI((n) => n + 1)
  }

  const look = lights ? finalLook(dev, outcome) : printLook(stage === "develop" ? p : dev)

  const save = () => {
    const el = img.current
    if (!el) return
    const c = document.createElement("canvas")
    c.width = el.naturalWidth
    c.height = el.naturalHeight
    const g = c.getContext("2d")
    if (!g) return
    g.filter = `brightness(${look.brightness}) contrast(${look.contrast}) opacity(${look.opacity})`
    g.drawImage(el, 0, 0)
    const a = document.createElement("a")
    a.download = `${frame.name.replace(/\s+/g, "-")}-${gradeOf(dev)}-${outcome}.jpg`
    a.href = c.toDataURL("image/jpeg", 0.9)
    a.click()
  }

  return (
    <main className={`dr${lights ? " lit" : ""}`}>
      <header>
        <Link to="/artist/gallery">leave the darkroom</Link>
        <span>
          {(i % frames.length) + 1} / {frames.length}
        </span>
      </header>

      <div className={`easel${stage === "dry" ? " hang" : ""}`}>
        {stage === "dry" && <i className="line" aria-hidden="true" />}
        <img
          className="neg"
          src={frame.url}
          alt=""
          draggable={false}
          style={{ opacity: lights ? 0 : 0.5 * (1 - Math.min(1, stage === "develop" ? p : 1)) }}
        />
        <img
          ref={img}
          className="pos"
          src={frame.url}
          alt={`${frame.name}, ${gradeOf(dev)}`}
          draggable={false}
          style={{ opacity: look.opacity, filter: `brightness(${look.brightness}) contrast(${look.contrast})` }}
        />
        {!lights && <div className="safelight" aria-hidden="true" />}
      </div>

      <p className="meta">
        {frame.name} · {exif?.shutter ?? "shutter unknown"} · {exif?.iso ?? ""} · develops in {(devNeed / 1000).toFixed(1)}s
      </p>

      {!lights ? (
        <>
          <div className="trays">
            {TRAYS.map((t, n) => {
              const done = TRAYS.findIndex((x) => x.stage === stage) > n || stage === "dry"
              const active = t.stage === stage
              const fill = active ? (t.stage === "develop" ? Math.min(1, p) : p) : done ? 1 : 0
              return (
                <button
                  key={t.stage}
                  type="button"
                  className={`tray t-${t.stage}${active ? " on" : ""}${done ? " done" : ""}`}
                  disabled={!active}
                  aria-label={`${t.label}: hold`}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    start(t.stage)
                  }}
                  onPointerUp={() => release(t.stage)}
                  onPointerCancel={() => release(t.stage)}
                  onKeyDown={(e) => {
                    if ((e.key === " " || e.key === "Enter") && !e.repeat) start(t.stage)
                  }}
                  onKeyUp={(e) => {
                    if (e.key === " " || e.key === "Enter") release(t.stage)
                  }}
                >
                  <span className="liquid" style={{ height: `${fill * 100}%` }} />
                  <span className="lab">{t.label}</span>
                </button>
              )
            })}
          </div>
          <p className="hint" role="status">
            {HINT[stage]}
          </p>
        </>
      ) : (
        <div className="done" role="status">
          <span>
            {OUTCOME[outcome]} Development: {gradeOf(dev)}.
          </span>
          <button type="button" onClick={save}>
            save print
          </button>
          <button type="button" onClick={again}>
            next negative
          </button>
        </div>
      )}

      <style>{`
        .dr{min-height:100vh;box-sizing:border-box;padding:3vh 5vw;background:radial-gradient(ellipse at 50% 20%,#4a0b0b,#1a0303 70%);color:#ff9a8a;font:600 12px/1.4 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:1.4vh;overflow:hidden;transition:background .9s,color .9s}
        .dr.lit{background:#f2eadb;color:#3a2a1c}
        .dr header{width:min(90vw,calc(44vh*1.5));display:flex;justify-content:space-between}
        .dr a{color:inherit}
        .dr .easel{position:relative;height:44vh;aspect-ratio:1.5;max-width:90vw;background:#0a0202;border:1px solid #6a1f1f;box-shadow:0 0 70px -8px #ff2a1a66;transition:box-shadow .9s,background .9s,border-color .9s}
        .dr.lit .easel{background:#fff;border-color:#cdbfa6;box-shadow:0 18px 40px -18px #0006}
        .dr .easel img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;user-select:none}
        .dr .neg{filter:invert(1) grayscale(1) contrast(.85) brightness(.55) sepia(1) hue-rotate(-30deg) saturate(3)}
        .dr .safelight{position:absolute;inset:0;background:#ff2a1a;mix-blend-mode:multiply;opacity:.55;pointer-events:none}
        .dr .easel.hang{transform-origin:50% 0;animation:dr-sway 2.4s ease-in-out infinite}
        .dr .line{position:absolute;left:-12%;right:-12%;top:-10px;height:2px;background:#8a2a2a}
        @keyframes dr-sway{0%,100%{rotate:-1.2deg}50%{rotate:1.2deg}}
        .dr .meta{margin:0;opacity:.8}
        .dr .trays{display:flex;gap:2vw;width:min(90vw,calc(44vh*1.5))}
        .dr .tray{position:relative;flex:1;height:11vh;min-height:64px;overflow:hidden;font:inherit;letter-spacing:inherit;text-transform:inherit;color:#ffd0c8;background:#2a0a0a;border:1px solid #6a1f1f;border-radius:6px 6px 14px 14px;cursor:pointer;touch-action:none;user-select:none;padding:0}
        .dr .tray:disabled{cursor:default;opacity:.55}
        .dr .tray.on{border-color:#ff6a55;opacity:1;box-shadow:0 0 22px -4px #ff3a2a99}
        .dr .liquid{position:absolute;left:0;right:0;bottom:0;background:#8a2a2a99;transition:height .08s linear}
        .dr .t-stop .liquid{background:#d9a24a88}
        .dr .t-fix .liquid{background:#7ab0d088}
        .dr .lab{position:relative}
        .dr .hint{margin:0;opacity:.85;min-height:1.4em;text-align:center}
        .dr .done{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center}
        .dr .done button{font:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit;background:transparent;border:1px solid currentColor;border-radius:10px;padding:12px 22px;cursor:pointer}
        @media (prefers-reduced-motion:reduce){.dr .easel.hang{animation:none}.dr,.dr .easel{transition:none}}
      `}</style>
    </main>
  )
}
