import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens } from "../../lib/motion-tokens"
import { AlponaCorner, AlponaRule } from "../../components/motifs/Alpona"
import { useGoaPhrase } from "../../lib/useGoaClock"
import { useOneScreen } from "../../hooks/useOneScreen"

/**
 * Artist home v2 — "The Masthead". Editorial split: a magazine-style masthead +
 * indexed list of the six spreads (left), and a cinematic stage photo (right)
 * that cross-fades as you move through the index. Replaces the generic bento
 * grid. One screen, overflow hidden; honest captions describe only what is
 * visibly in each frame.
 */
interface Spread {
  to: string
  num: string
  label: string
  icon: string
  gloss: string
  img: string
  caption: string
}

const SPREADS: Spread[] = [
  {
    to: "/artist/gallery", num: "01", label: "Gallery", icon: "i-camera",
    gloss: "Ten exposures, curated.",
    img: "/frames/lantern-street.webp",
    caption: "Paper lanterns, warm light: a night street on the roll.",
  },
  {
    to: "/artist/sound", num: "02", label: "Sound", icon: "i-headphone",
    gloss: "Eight years of listening, logged.",
    img: "/frames/blue-beams.webp",
    caption: "Stage beams. The listening log, eight years deep.",
  },
  {
    to: "/artist/matchday", num: "03", label: "Matchday", icon: "i-ball",
    gloss: "Camp Nou, from the terrace.",
    img: "/images/matchday/terrace.webp",
    caption: "Scarves up on the terrace. Barça, measured.",
  },
  {
    to: "/artist/notes", num: "04", label: "Field Notes", icon: "i-quote",
    gloss: "Goa reflections, in ink.",
    img: "/frames/doorway.webp",
    caption: "A doorway in Goa. Reflections, written down.",
  },
  {
    to: "/artist/about", num: "05", label: "About", icon: "i-user",
    gloss: "Origins, in ink.",
    img: "/me-1600w.webp",
    caption: "The person behind the roll.",
  },
  {
    to: "/artist/contact", num: "06", label: "Contact", icon: "i-mail",
    gloss: "Direct channels.",
    img: "/frames/lake.webp",
    caption: "Still water. Open to a message.",
  },
]

/** Idle auto-advance cadence (ms). Hover / focus / reduced-motion pause it. */
const ADVANCE_MS = 5200
/** Slow Ken Burns drift on the active frame (s). */
const DRIFT_S = 7
/** Min gap between wheel / swipe steps (ms) so one trackpad flick = one frame. */
const STEP_LOCK_MS = 650
/** Min swipe distance (px) before a touch counts as a step. */
const SWIPE_PX = 40

const CSS = String.raw`
  .p-ah2{flex:1;min-height:0;display:grid;gap:clamp(16px,3vw,48px);width:100%;
    grid-template-columns:minmax(0,0.82fr) minmax(0,1.18fr);grid-template-rows:minmax(0,1fr);
    align-items:stretch;overflow:hidden}
  .p-ah2 .lede{grid-area:1 / 1}
  .p-ah2 .stage{grid-area:1 / 2}

  /* ── left: masthead + index ───────────────────────────────── */
  .p-ah2 .lede{display:flex;flex-direction:column;min-height:0}
  .p-ah2 .kick{display:flex;align-items:center;gap:10px;font:600 10px/1 var(--font-mono);letter-spacing:.26em;
    text-transform:uppercase;color:var(--accent)}
  .p-ah2 .horse{width:30px;aspect-ratio:1/1;flex-shrink:0;background:var(--accent);
    -webkit-mask:url(/motifs/bankura-horse.webp) center / contain no-repeat;mask:url(/motifs/bankura-horse.webp) center / contain no-repeat}
  .p-ah2 .ttl{font-family:var(--font-display);font-weight:900;line-height:.86;letter-spacing:-.035em;color:var(--ink);
    font-size:clamp(44px,7.2vw,104px);margin:10px 0 4px}
  .p-ah2 .ttl em{font-style:italic;font-weight:500;color:var(--accent)}
  .p-ah2 .ttl em.hl{padding:0 .08em}
  .p-ah2 .rule{display:block;width:min(100%,340px);height:14px;color:var(--accent);opacity:.55;margin:4px 0 6px}
  .p-ah2 .state{font-family:var(--font-hand);font-size:clamp(16px,1.6vw,21px);color:var(--muted);rotate:-.6deg;
    max-width:34ch;margin-bottom:clamp(10px,2vh,20px)}

  .p-ah2 .index{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule);flex:1;min-height:0;
    display:flex;flex-direction:column}
  .p-ah2 .ix{flex:1;min-height:0;border-bottom:1px solid var(--rule)}
  .p-ah2 .ix-link{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:clamp(10px,1.4vw,18px);
    height:100%;padding:clamp(6px,1vh,12px) 4px;text-decoration:none;color:inherit;position:relative;isolation:isolate}
  .p-ah2 .ix-num{font:600 11px/1 var(--font-mono);letter-spacing:.1em;color:var(--muted);transition:color .3s}
  .p-ah2 .ix-main{display:flex;flex-direction:column;gap:2px;min-width:0}
  .p-ah2 .ix-name{font-family:var(--font-display);font-weight:800;letter-spacing:-.02em;color:var(--ink);line-height:1;
    font-size:clamp(20px,2.4vw,30px);transition:transform .4s cubic-bezier(.32,.72,0,1),color .3s}
  .p-ah2 .ix-gloss{font:500 11px/1.2 var(--font-mono);letter-spacing:.02em;color:var(--muted);white-space:nowrap;
    overflow:hidden;text-overflow:ellipsis;opacity:.55;transition:opacity .3s,color .3s}
  .p-ah2 .ix-ic{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;
    background:color-mix(in srgb,var(--accent) 12%,transparent);transition:background .3s,transform .4s cubic-bezier(.32,.72,0,1)}
  .p-ah2 .ix-ic .ic{width:12px;height:12px;color:var(--accent);transition:color .3s}
  /* active / hover row */
  .p-ah2 .ix-link::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:10px;
    background:color-mix(in srgb,var(--accent) 7%,transparent);opacity:0;transition:opacity .3s}
  .p-ah2 .ix.on .ix-link::before{opacity:1}
  .p-ah2 .ix.on .ix-num{color:var(--accent)}
  .p-ah2 .ix.on .ix-name{transform:translateX(6px);color:var(--accent);font-style:italic}
  .p-ah2 .ix.on .ix-gloss{opacity:1;color:var(--ink)}
  .p-ah2 .ix.on .ix-ic{background:var(--accent);transform:translateX(6px)}
  .p-ah2 .ix.on .ix-ic .ic{color:var(--paper)}

  /* ── right: cinematic stage ───────────────────────────────── */
  .p-ah2 .stage{position:relative;min-height:0;display:flex;flex-direction:column}
  /* film-strip mat: dark stock with sprocket holes punched top + bottom */
  .p-ah2 .mat{display:block;text-decoration:none;position:relative;flex:1;min-height:0;border-radius:14px;overflow:hidden;
    background:#17110d;box-shadow:var(--shadow);padding:26px 12px;rotate:.4deg}
  .p-ah2 .mat::before,.p-ah2 .mat::after{content:"";position:absolute;left:14px;right:14px;height:10px;
    background:radial-gradient(5px 4px at center,rgba(244,234,217,.8) 92%,transparent 100%) 0 0 / 17px 10px repeat-x;
    border-radius:3px;opacity:.9}
  :root[data-theme="dark"] .p-ah2 .mat{box-shadow:0 0 0 1px rgba(244,234,217,.14),var(--shadow)}
  .p-ah2 .mat::before{top:8px}
  .p-ah2 .mat::after{bottom:8px}
  .p-ah2 .frame{position:relative;height:100%;border-radius:4px;overflow:hidden;background:#0c0a08}
  .p-ah2 .edge{position:absolute;z-index:3;left:14px;top:12px;font:600 9.5px/1 var(--font-mono);letter-spacing:.22em;
    color:#f4ead9;opacity:.82;text-transform:uppercase;text-shadow:0 1px 6px rgba(0,0,0,.55)}
  .p-ah2 .edge i{font-style:normal;color:var(--accent)}
  .p-ah2 .ticks{display:flex;gap:6px;padding-top:12px}
  .p-ah2 .tick{flex:1;height:14px;padding:5px 0;border:0;background:none;cursor:pointer;position:relative}
  .p-ah2 .tick::before{content:"";position:absolute;left:0;right:0;top:5px;height:3px;border-radius:2px;
    background:var(--rule)}
  .p-ah2 .tick .fill{position:absolute;left:0;right:0;top:5px;height:3px;border-radius:2px;background:var(--accent);
    transform-origin:left center}
  .p-ah2 .tick:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:3px}
  .p-ah2 .shot{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .p-ah2 .scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(12,10,8,.72) 0%,rgba(12,10,8,.1) 42%,transparent 70%)}
  .p-ah2 .cap{position:absolute;left:16px;right:16px;bottom:14px;z-index:2;color:#f6efe4;
    font-family:var(--font-hand);font-size:clamp(16px,1.5vw,20px);line-height:1.15;text-shadow:0 1px 10px rgba(0,0,0,.5)}
  .p-ah2 .cap b{display:block;font:600 10px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;
    color:var(--accent);margin-bottom:6px}
  .p-ah2 .ax{position:absolute;z-index:3;width:clamp(54px,6vw,84px);height:auto;color:var(--accent);opacity:.5;
    top:14px;right:12px}
  .p-ah2 .stage-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;
    padding-top:6px;font:500 9.5px/1.4 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-ah2 .stage-foot b{color:var(--ink);font-weight:600}
  .p-ah2 .stage-foot .live{display:inline-flex;align-items:center;gap:6px}
  .p-ah2 .stage-foot .live::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);
    }
  @keyframes ah-pulse{50%{opacity:.25}}

  /* big frame counter (huyml-style): blurs in on every step */
  .p-ah2 .count{position:absolute;z-index:3;right:18px;bottom:12px;display:flex;align-items:flex-start;gap:4px;
    color:#f4ead9;pointer-events:none;text-shadow:0 2px 18px rgba(0,0,0,.45)}
  .p-ah2 .count .n{font-family:var(--font-display);font-weight:900;font-size:clamp(46px,6vw,92px);line-height:.8;letter-spacing:-.05em;
    font-variant-numeric:tabular-nums}
  .p-ah2 .count .of{font:600 10px/1 var(--font-mono);letter-spacing:.12em;opacity:.75;margin-top:4px}
  .p-ah2 .cap{right:clamp(120px,14vw,190px)}
  .p-ah2 .hint{font:500 9px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);opacity:.8}

  /* ── responsive: stack ────────────────────────────────────── */
  @media(max-width:860px){
    .p-ah2{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:12px}
    .p-ah2 .lede{grid-area:1 / 1}
    .p-ah2 .stage{grid-area:2 / 1;min-height:30vh}
    .p-ah2 .ttl{font-size:clamp(34px,11vw,52px)}
    .p-ah2 .rule{display:none}
    .p-ah2 .state{margin-bottom:10px}
    .p-ah2 .mat{padding:20px 8px;rotate:none}
    .p-ah2 .mat::before{top:5px}
    .p-ah2 .mat::after{bottom:5px}
    .p-ah2 .stage-foot{display:none}
    .p-ah2 .index .ix-gloss{display:none}
    .p-ah2 .ix-name{font-size:19px}
    .p-ah2 .count .n{font-size:44px}
    .p-ah2 .cap{right:96px}
  }
  @media(prefers-reduced-motion:reduce){
    .p-ah2 .ix-name,.p-ah2 .ix-ic,.p-ah2 .ix-num,.p-ah2 .ix-gloss{transition:none}
    .p-ah2 .stage-foot .live::before{animation:none}
  }
`

export function ArtistHome() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const goaPhrase = useGoaPhrase()
  const lockRef = useRef(0)
  const touchRef = useRef<number | null>(null)

  // wheel / trackpad / swipe steps through the six frames (page itself never scrolls)
  const step = (dir: 1 | -1) => {
    const t = Date.now()
    if (t - lockRef.current < STEP_LOCK_MS) return
    lockRef.current = t
    setActive((a) => (a + dir + SPREADS.length) % SPREADS.length)
  }
  const onWheel = (e: React.WheelEvent) => {
    const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
    if (Math.abs(d) < 8) return
    step(d > 0 ? 1 : -1)
  }
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current === null) return
    const dx = e.changedTouches[0].clientX - touchRef.current
    touchRef.current = null
    if (Math.abs(dx) >= SWIPE_PX) step(dx < 0 ? 1 : -1)
  }

  useOneScreen("toc")

  // warm the cache so the stage never flashes empty on swap
  useEffect(() => {
    SPREADS.forEach((s) => {
      const img = new Image()
      img.src = s.img
    })
  }, [])

  // idle auto-advance: page stays alive without hover (touch has none)
  const running = !paused && !reduce
  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % SPREADS.length), ADVANCE_MS)
    return () => window.clearTimeout(t)
  }, [active, running])

  const cur = SPREADS[active]
  const fade = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: motionTokens.duration.fast } }
    : {
        initial: { opacity: 0, scale: 1.08 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0 },
        transition: {
          scale: { duration: DRIFT_S, ease: motionTokens.easing.smooth },
          opacity: { duration: motionTokens.duration.slow },
        },
      }

  return (
    <main className="page p-ah2wrap" aria-label="Artist field notebook">
      <style>{CSS}</style>
      <div
        className="p-ah2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* left: masthead + index */}
        <section className="lede">
          <div className="kick">
            <span className="horse" aria-hidden="true" />
            Field Notebook · Goa
          </div>
          <h1 className="ttl">
            The <em className="hl">Artist</em>
          </h1>
          <AlponaRule className="rule" />
          <p className="state">Six spreads, logged in warm light. Pick one.</p>

          <ol className="index">
            {SPREADS.map((s, i) => (
              <li key={s.to} className={`ix${i === active ? " on" : ""}`}>
                <Link
                  to={s.to}
                  className="ix-link"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={`${s.label}: ${s.gloss}`}
                >
                  <span className="ix-num">{s.num}</span>
                  <span className="ix-main">
                    <span className="ix-name">{s.label}</span>
                    <span className="ix-gloss">{s.gloss}</span>
                  </span>
                  <span className="ix-ic" aria-hidden="true">
                    <Icon id={s.icon} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* right: film-strip stage */}
        <section className="stage" onWheel={onWheel} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <Link to={cur.to} className="mat" tabIndex={-1} aria-hidden="true">
            <div className="frame">
              <AnimatePresence initial={false}>
                <motion.img
                  key={cur.img}
                  src={cur.img}
                  alt=""
                  className="shot"
                  draggable={false}
                  {...fade}
                />
              </AnimatePresence>
              <div className="scrim" />
              <span className="edge">
                Fr <i>{cur.num}</i> / 06
              </span>
              <AlponaCorner className="ax" />
              <div className="count" aria-hidden="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={cur.num}
                    className="n"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.md, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.md, filter: "blur(8px)" }}
                    transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                  >
                    {cur.num}
                  </motion.span>
                </AnimatePresence>
                <span className="of">/06</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur.to}
                  className="cap"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.sm }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.xs }}
                  transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                >
                  <b>
                    {cur.num} · {cur.label}
                  </b>
                  {cur.caption}
                </motion.div>
              </AnimatePresence>
            </div>
          </Link>

          <div className="ticks" role="tablist" aria-label="Spreads">
            {SPREADS.map((s, i) => (
              <button
                key={s.to}
                type="button"
                role="tab"
                className="tick"
                aria-selected={i === active}
                aria-label={s.label}
                onClick={() => setActive(i)}
              >
                {i === active && (
                  <motion.span
                    key={`${active}-${running}`}
                    className="fill"
                    initial={{ scaleX: running ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: running ? ADVANCE_MS / 1000 : 0, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="stage-foot">
            <span className="human-time">
              {goaPhrase}
            </span>
            <span className="hint">Scroll or swipe the strip</span>
            <span>
              Roll · <b>2019-2024</b>
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}
