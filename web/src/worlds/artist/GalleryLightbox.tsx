import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion } from "motion/react"
import { Icon } from "../../lib/icons"
import type { Frame } from "../../lib/live"
import { metaForUrl, type FrameExif, type FramePin } from "../../lib/gallery-meta"
import { shutterOpen, advanceTick, penScratch, isMuted, setMuted, primeDefault } from "../../lib/shutter"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { lanternMask, pointInBox } from "../../lib/lantern"
import { arrowPaths, jit, shaftPath } from "./lb-geometry"

const DEVELOP = motionTokens.duration.slow // seconds — the print resolving from negative to positive
const TILE_COLS = 6
const TILE_ROWS = 4
const DRAW = motionTokens.duration.slow // seconds — one marker drawing itself in
const STEP = motionTokens.duration.normal // seconds — stagger between successive markers
const SWIPE_PX = 48 // horizontal travel that counts as a swipe

/** A small Alpona-style line flourish (terracotta). */
function Alpona({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path
        d="M4 30c0-14 12-26 26-26M30 4c14 0 26 12 26 26M12 30a18 18 0 0 1 18-18M30 12a18 18 0 0 1 18 18"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".55"
      />
      <circle cx="30" cy="30" r="3.2" fill="currentColor" opacity=".7" />
      <path d="M30 20v-7M30 47v-7M20 30h-7M47 30h-7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".5" />
    </svg>
  )
}

/** One stroke drawn twice (offset ink-twin behind + crisp main on top). Module-level so a
 *  re-measure of the frame never remounts it and replays the drawing. */
function Stroke({ d, dd, dl, reduce }: { d: string; dd: number; dl: number; reduce: boolean }) {
  const t = reduce ? { duration: 0 } : { duration: dd, delay: dl, ease: motionTokens.easing.inOut }
  const from = reduce ? false : { pathLength: 0, opacity: 0 }
  return (
    <g>
      <motion.path className="ink-twin" d={d} initial={from} animate={{ pathLength: 1, opacity: 0.4 }} transition={t} />
      <motion.path d={d} initial={from} animate={{ pathLength: 1, opacity: 1 }} transition={t} />
    </g>
  )
}

function exifParts(e?: FrameExif): string[] {
  if (!e) return []
  return [e.camera, e.date, e.shutter, e.aperture, e.iso, e.focal].filter(Boolean) as string[]
}

/** Rendered rect of the <img>, measured in FRAME-local pixels (the frame wraps
 *  the image plus the left/right gutters where the notes live). left/top is the
 *  image's offset inside the frame; sw/sh is the whole frame. */
interface ImgBox { left: number; top: number; w: number; h: number; sw: number; sh: number }

/** Minimum gutter (px) each side needs before notes sit beside the image;
 *  below this (narrow / mobile) notes move to bands above / below the image. */
const SIDE_GUTTER_MIN = 124
const NOTE_GAP = 54 // min vertical spacing between stacked side notes


/** A hand-drawn open ellipse ringing (cx,cy) — overshoots where it closes. */
function circlePath(cx: number, cy: number, rx: number, ry: number, seed: number): string {
  const N = 20
  const start = -0.6 + jit(seed) * 0.4
  const sweep = Math.PI * 2 + 0.55 + jit(seed + 3) * 0.3 // >360° so the loop overshoots
  const pt = (i: number): [number, number] => {
    const a = start + sweep * (i / N)
    const jr = 1 + jit(seed + i * 5) * 0.06
    return [cx + Math.cos(a) * rx * jr, cy + Math.sin(a) * ry * jr]
  }
  const mid = (p: [number, number], q: [number, number]): [number, number] => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
  const p0 = pt(0)
  const p1 = pt(1)
  let d = `M ${mid(p0, p1)[0].toFixed(1)} ${mid(p0, p1)[1].toFixed(1)}`
  for (let i = 1; i < N; i++) {
    const c = pt(i)
    const m = mid(c, pt(i + 1))
    d += ` Q ${c[0].toFixed(1)} ${c[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`
  }
  return d
}

/** A short wavy underline for the note, in local coords centred on 0. */
function wavyUnderline(width: number, seed: number): string {
  const N = 6
  const half = width / 2
  let d = `M ${(-half).toFixed(1)} 0`
  for (let i = 1; i <= N; i++) {
    const x = -half + (width * i) / N
    const cx = -half + (width * (i - 0.5)) / N
    const cy = (i % 2 === 0 ? 1 : -1) * (2.4 + jit(seed + i) * 1.1)
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} 0`
  }
  return d
}

const NOTE_W: Record<NonNullable<FramePin["size"]>, number> = { sm: 140, md: 180, lg: 210 }

/** One laid-out annotation: its subject point and where its note sits. */
interface NoteSlot {
  i: number
  p: FramePin
  tip: { x: number; y: number } // subject, frame-local px
  side: "L" | "R" | "T" | "B" // gutters beside the image, or bands above / below it (narrow)
  noteX: number // leader anchor x (inner edge of the note), frame-local px
  noteY: number // L/R: vertical centre of the note; T/B: leader anchor y at the band edge
}

interface Layout {
  stacked: boolean // true -> gutters too narrow; notes sit in bands above / below the image
  items: NoteSlot[]
}

/** Place every note in a side gutter beside the image: pick the nearer side,
 *  pack vertically with NOTE_GAP spacing, shift the column up if it overflows.
 *  When neither gutter is wide enough (mobile), notes go in bands above / below
 *  the image instead, spread evenly across the width, same leader + marker. */
function layoutNotes(pins: FramePin[], box: ImgBox): Layout {
  const gutterL = box.left
  const gutterR = box.sw - (box.left + box.w)
  const items: NoteSlot[] = pins.map((p, i) => {
    const tip = { x: box.left + (p.x / 100) * box.w, y: box.top + (p.y / 100) * box.h }
    return { i, p, tip, side: tip.x <= box.left + box.w / 2 ? "L" : "R", noteX: 0, noteY: tip.y }
  })

  if (Math.min(gutterL, gutterR) < SIDE_GUTTER_MIN) {
    const mid = box.top + box.h / 2
    const topY = box.top - 8
    const botY = box.top + box.h + 8
    for (const it of items) it.side = it.tip.y <= mid ? "T" : "B"
    for (const side of ["T", "B"] as const) {
      const band = items.filter((it) => it.side === side).sort((a, b) => a.tip.x - b.tip.x)
      band.forEach((it, j) => {
        it.noteX = (box.sw * (j + 0.5)) / band.length
        it.noteY = side === "T" ? topY : botY
      })
    }
    return { stacked: true, items }
  }

  const pack = (arr: NoteSlot[], anchorX: number) => {
    arr.sort((a, b) => a.tip.y - b.tip.y)
    let last = -Infinity
    for (const it of arr) {
      it.noteY = Math.max(it.tip.y, last + NOTE_GAP)
      last = it.noteY
    }
    const over = last - (box.sh - 18) // keep the lowest note inside the frame
    if (over > 0) for (const it of arr) it.noteY = Math.max(18, it.noteY - over)
    for (const it of arr) it.noteX = anchorX
  }
  pack(items.filter((it) => it.side === "L"), box.left - 14)
  pack(items.filter((it) => it.side === "R"), box.left + box.w + 14)
  return { stacked: false, items }
}

export function GalleryLightbox({
  frames,
  index,
  onClose,
  onStep,
  onJump,
  reduce,
}: {
  frames: Frame[]
  index: number
  onClose: () => void
  onStep: (dir: number) => void
  onJump?: (i: number) => void
  reduce: boolean
}) {
  const n = frames.length
  const f = frames[index]
  const meta = metaForUrl(f.url)
  const exif = useMemo(() => exifParts(meta?.exif), [meta])
  const pins: FramePin[] = useMemo(() => meta?.pins ?? [], [meta])

  const [muted, setMutedState] = useState(isMuted())
  const [revealed, setRevealed] = useState(reduce) // annotations shown after develop
  const [box, setBox] = useState<ImgBox | null>(null)
  const firstOpen = useRef(true)
  const frameRef = useRef<HTMLDivElement>(null)
  const [lantern, setLantern] = useState(false)
  const lampRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // sound default: user chose ON; reduced-motion forces it off on first visit
  useEffect(() => {
    primeDefault(!reduce)
    setMutedState(isMuted())
  }, [reduce])

  // measure the image box relative to the FRAME (image + gutters), so notes
  // can be placed in the gutters and lines drawn across the whole frame
  const measure = () => {
    const frame = frameRef.current
    const img = imgRef.current
    if (!frame || !img) return
    const fr = frame.getBoundingClientRect()
    const ir = img.getBoundingClientRect()
    if (ir.width < 2 || ir.height < 2) return
    setBox({ left: ir.left - fr.left, top: ir.top - fr.top, w: ir.width, h: ir.height, sw: fr.width, sh: fr.height })
  }

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (frameRef.current) ro.observe(frameRef.current)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // per-frame sequence: shutter/advance sound, then develop -> annotations draw
  useEffect(() => {
    if (firstOpen.current) {
      firstOpen.current = false
      shutterOpen()
    } else {
      advanceTick()
    }

    if (reduce) {
      setRevealed(true)
      return
    }

    setRevealed(false)
    let penStop: (() => void) | undefined
    const revealTimer = window.setTimeout(() => {
      setRevealed(true)
      if (pins.length > 0) penStop = penScratch(pins.length * STEP * 1000 + 400)
    }, DEVELOP * 1000)

    return () => {
      window.clearTimeout(revealTimer)
      penStop?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduce, pins.length])

  // keep the current thumbnail centred in the strip
  const stripRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cur = stripRef.current?.querySelector<HTMLElement>('[aria-current="true"]')
    cur?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" })
  }, [index, reduce])

  // horizontal swipe on touch: left = next, right = previous
  const swipe = useRef<{ x: number; y: number } | null>(null)
  const onSwipeDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY }
  }
  const onSwipeUp = (e: React.PointerEvent) => {
    const s = swipe.current
    swipe.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.5) onStep(dx < 0 ? 1 : -1)
  }

  const toggleSound = () => {
    const next = !muted
    setMuted(next)
    setMutedState(next)
  }

  const developInitial = reduce
    ? false
    : { filter: "invert(1) brightness(0.45) blur(16px)", opacity: 0.25, scale: 1.03 }
  const developAnimate = { filter: "invert(0) brightness(1) blur(0px)", opacity: 1, scale: 1 }

  // place notes in the side gutters (off the photo) once the image is measured
  const layout = useMemo(() => (box ? layoutNotes(pins, box) : null), [box, pins])

  return createPortal(
    <div className="p-gl-lb" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label={f.name}>
      <Alpona className="lb-alpona tl" />
      <Alpona className="lb-alpona br" />

      <button className="lb-btn x" aria-label="Close" onClick={onClose}>×</button>
      <button className="lb-btn snd" aria-label={muted ? "Unmute shutter sound" : "Mute shutter sound"} aria-pressed={!muted} onClick={toggleSound}>
        <Icon id={muted ? "i-pulse" : "i-headphone"} />
      </button>
      <button className="lb-btn lamp" aria-label={lantern ? "Turn the lantern off" : "Turn the lantern on: light the photo with your cursor"} aria-pressed={lantern} onClick={() => setLantern((l) => !l)}>
        <svg viewBox="0 0 24 24" className="ic" aria-hidden="true"><path d="M9 3h6M10 3v3h4V3M8 6h8l1 11H7zM9 20h6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button className="lbnav prev" aria-label="Previous frame" onClick={() => onStep(-1)}><Icon id="i-arrow" /></button>
      <button className="lbnav next" aria-label="Next frame" onClick={() => onStep(1)}><Icon id="i-arrow" /></button>

      <figure onPointerDown={onSwipeDown} onPointerUp={onSwipeUp}>
        <div className="lb-frame" ref={frameRef}>
          <div
            className="lb-stage"
            ref={stageRef}
            onPointerMove={(e) => {
              const lamp = lampRef.current
              const st = stageRef.current
              if (!lantern || !lamp || !st) return
              const r = st.getBoundingClientRect()
              const p = pointInBox(e.clientX, e.clientY, r)
              lamp.style.background = lanternMask(p.x, p.y)
            }}
          >
            {lantern && <div className="lb-lantern" ref={lampRef} style={{ background: "rgba(8,6,5,.94)" }} aria-hidden="true" />}
            <motion.img
              ref={imgRef}
              key={`lb-${f.url}`}
              src={f.url}
              srcSet={`${f.url.replace(/\.webp$/, "")}-800w.webp 800w, ${f.url.replace(/\.webp$/, "")}-1600w.webp 1600w`}
              sizes="(max-width: 768px) 800px, 1600px"
              alt={f.name}
              decoding="async"
              onLoad={measure}
              initial={developInitial}
              animate={developAnimate}
              transition={reduce ? { duration: 0 } : { duration: DEVELOP, ease: [0.22, 0.61, 0.36, 1] }}
            />

            {/* temple-tile reveal — terracotta tiles lifting off as the print develops */}
            {!reduce && (
              <div className="lb-tiles" key={`tiles-${f.url}`} aria-hidden="true">
                {Array.from({ length: TILE_COLS * TILE_ROWS }).map((_, i) => {
                  const col = i % TILE_COLS
                  const row = Math.floor(i / TILE_COLS)
                  const delay = (col + row) * 0.045
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 0.86 }}
                      transition={reduce ? { duration: 0 } : { duration: motionTokens.duration.normal, delay, ease: motionTokens.easing.smooth }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* hand-drawn leader lines + markers, drawn across the whole frame so the
              writing sits in the side gutters, never on the photo */}
          {revealed && box && layout && pins.length > 0 && (
            <>
              <svg className="lb-arrows" viewBox={`0 0 ${box.sw} ${box.sh}`} preserveAspectRatio="none" aria-hidden="true">
                {layout.items.map((slot) => {
                  const { p, i } = slot
                  const kind = p.kind === "arrow" ? "arrow" : "circle" // circle or arrow only; no boxes / brackets
                  const seed = i * 17 + (f.url.length % 31)
                  const tip = slot.tip
                  const tail = { x: slot.noteX, y: slot.noteY } // gutter anchor
                  const delay = i * STEP
                  const rpx = ((p.r ?? 8) / 100) * box.w

                  const arrow = kind === "arrow" ? arrowPaths(tail.x, tail.y, tip.x, tip.y, seed) : null

                  // leader stops at the marker's edge for ringed/boxed/bracketed subjects
                  const dir = { x: tail.x - tip.x, y: tail.y - tip.y }
                  const dlen = Math.hypot(dir.x, dir.y) || 1
                  const edge = { x: tip.x + (dir.x / dlen) * (rpx + 7), y: tip.y + (dir.y / dlen) * (rpx + 7) }

                  return (
                    <g key={`mk-${f.url}-${i}`}>
                      {arrow && (
                        <>
                          <Stroke d={arrow.shaft} dd={DRAW} dl={delay} reduce={reduce} />
                          <motion.path
                            d={arrow.head}
                            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={reduce ? { duration: 0 } : { duration: motionTokens.duration.fast, delay: delay + DRAW * 0.8, ease: motionTokens.easing.out }}
                          />
                          <motion.circle
                            className="lb-tip"
                            cx={tip.x} cy={tip.y} r={3}
                            initial={reduce ? false : { scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={reduce ? { duration: 0 } : { ...springs.snappy, delay: delay + DRAW }}
                          />
                        </>
                      )}

                      {kind === "circle" && (
                        <>
                          <Stroke d={shaftPath(tail.x, tail.y, edge.x, edge.y, seed, 0)} dd={DRAW * 0.6} dl={delay} reduce={reduce} />
                          <Stroke d={circlePath(tip.x, tip.y, rpx, rpx * 0.82, seed + 4)} dd={DRAW} dl={delay + DRAW * 0.45} reduce={reduce} />
                        </>
                      )}

                    </g>
                  )
                })}
              </svg>

              {layout.items.map((slot) => {
                const { p, i, side, noteX, noteY } = slot
                const seed = i * 17 + (f.url.length % 31)
                const delay = i * STEP + DRAW * 0.5
                const rot = p.rot ?? jit(seed + 11) * 4.5 // ±4.5° default hand tilt
                const size = p.size ?? "md"
                const w = NOTE_W[size]
                const band = side === "T" || side === "B"
                const bandW = layout.items.filter((it) => it.side === side).length
                const gutter = band
                ? box.sw / Math.max(1, bandW)
                : side === "L" ? box.left : box.sw - (box.left + box.w)
                const place =
                  side === "L"
                    ? { right: `${box.sw - noteX}px`, top: `${noteY}px` }
                    : side === "R"
                      ? { left: `${noteX}px`, top: `${noteY}px` }
                      : side === "T"
                        ? { left: `${noteX}px`, bottom: `${box.sh - noteY}px` }
                        : { left: `${noteX}px`, top: `${noteY}px` }
                const cls = side === "L" ? "g-left" : side === "R" ? "g-right" : side === "T" ? "g-top" : "g-bottom"
                return (
                  <div
                    key={`note-${f.url}-${i}`}
                    className={`lb-note-wrap ${cls}`}
                    style={{ ...place, maxWidth: `${Math.max(90, gutter - 16)}px` }}
                  >
                    <motion.span
                      className={`lb-note s-${size}`}
                      initial={reduce ? false : { opacity: 0, x: side === "L" ? 6 : side === "R" ? -6 : 0, y: side === "T" ? 6 : side === "B" ? -6 : 0, rotate: rot }}
                      animate={{ opacity: 1, x: 0, y: 0, rotate: rot }}
                      transition={reduce ? { duration: 0 } : { duration: motionTokens.duration.normal, delay }}
                    >
                      {p.note}
                      {p.underline && (
                        <svg className="lb-uline" viewBox={`${-w / 2} -6 ${w} 12`} preserveAspectRatio="none" aria-hidden="true">
                          <motion.path
                            d={wavyUnderline(w * 0.78, seed + 20)}
                            initial={reduce ? false : { pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={reduce ? { duration: 0 } : { duration: motionTokens.duration.normal, delay: delay + 0.25, ease: motionTokens.easing.inOut }}
                          />
                        </svg>
                      )}
                    </motion.span>
                  </div>
                )
              })}
            </>
          )}
        </div>

        <figcaption className="lb-meta">
          <div className="lb-nm">
            <span className="nm">{f.name}</span>
            <span className="no">{String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          </div>
          {exif.length > 0 && (
            <div className="lb-exif">
              {exif.map((part, i) => (
                <span key={i} className="ex">{part}</span>
              ))}
            </div>
          )}
        </figcaption>
      </figure>

      {onJump && (
        <div className="lb-strip" ref={stripRef} role="tablist" aria-label="Jump to a frame">
          {frames.map((fr, i) => (
            <button
              key={fr.url}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-current={i === index}
              aria-label={`${fr.name}, frame ${i + 1} of ${n}`}
              onClick={() => onJump(i)}
            >
              <img src={fr.url} alt="" loading="lazy" decoding="async" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  )
}
