import type { PointerEvent } from "react"
import { Link } from "react-router-dom"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react"
import { Icon } from "../../lib/icons"
import { SOCIAL } from "../../lib/worlds"
import { useMedium } from "../../lib/live"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { TwinDoor } from "../../components/TwinDoor"

// Honest: there is no published longform yet. These entries are real threads the
// site already evidences — each links to the actual built page, not an invented
// article. Published dispatches appear below when the Medium feed is wired.
interface Entry {
  no: string
  icon: string
  title: string
  gloss: string
  to: string
  read: string
  tilt: number
  depth: number
}
const ENTRIES: Entry[] = [
  { no: "N·01", icon: "i-scale", title: "Rigour, transferred", gloss: "Why a reactor and a regression are the same problem wearing different clothes.", to: "/analyst/skills", read: "the skills", tilt: -2.6, depth: 1 },
  { no: "N·02", icon: "i-ball", title: "A match is a dataset", gloss: "Reading Barça ninety minutes at a time, by the numbers that actually move.", to: "/artist/matchday", read: "the matchday", tilt: 1.8, depth: 1.6 },
  { no: "N·03", icon: "i-headphone", title: "Eight years, counted", gloss: "What 900+ logged listening hours quietly say about a person.", to: "/artist/sound", read: "the sound", tilt: 1.2, depth: 1.3 },
  { no: "N·04", icon: "i-camera", title: "Ten frames worth keeping", gloss: "A small, honest edit from wherever the camera happened to be.", to: "/artist/gallery", read: "the gallery", tilt: -1.6, depth: 1.9 },
]

// pointer parallax: px of travel for depth 1 at the panel edge; the spread itself moves at DESK_DEPTH
const PARALLAX_PX = 9
const DESK_DEPTH = 0.45

const CSS = String.raw`
  html[data-one-screen] .page.p-nt,.p-nt{min-height:0;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(20px,4vw,60px);
    max-width:1240px;margin:0 auto;width:100%;overflow:hidden}

  /* left: poster headline */
  .p-nt .poster{min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:16px;padding-top:clamp(0px,1vh,10px)}
  .p-nt .kick{display:flex;align-items:center;gap:10px;font:600 10px/1 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--muted)}
  .p-nt .kick b{color:var(--accent);font-weight:600}
  .p-nt .big{font-family:var(--font-display);font-weight:900;font-size:clamp(58px,7.4vw,118px);line-height:.88;letter-spacing:-.04em;color:var(--ink);margin:clamp(8px,1.6vh,18px) 0 0}
  .p-nt .big em{font-style:italic;font-weight:400;color:var(--accent)}
  .p-nt .hand{font-family:var(--font-hand);font-size:clamp(18px,1.6vw,23px);color:var(--accent);rotate:-2deg;display:inline-block;margin:6px 0 0 6px}
  .p-nt .lede{font:400 clamp(14px,1.15vw,16.5px)/1.6 var(--font-body);color:var(--muted);max-width:36ch;margin:clamp(10px,2vh,20px) 0 0}
  .p-nt .lede i{font-family:var(--font-display);font-style:italic;color:var(--ink)}
  .p-nt .door{margin-top:clamp(10px,2vh,18px)}
  .p-nt .dispatch{display:flex;align-items:flex-start;gap:10px;padding-top:12px;border-top:1px dashed color-mix(in srgb,var(--ink) 22%,transparent);
    font:500 11px/1.5 var(--font-mono);color:var(--muted)}
  .p-nt .dispatch > .ic{width:14px;height:14px;color:var(--accent);flex:none;margin-top:2px}
  .p-nt .dispatch b{color:var(--ink);font-weight:600}
  .p-nt .dispatch a{display:inline-flex;align-items:center;gap:5px;color:var(--accent);text-decoration:none;white-space:nowrap;margin-left:auto}
  .p-nt .dispatch a .ic{width:11px;height:11px}

  /* right: the open notebook spread */
  .p-nt .desk{position:relative;min-height:0;display:grid;place-items:center;perspective:1400px}
  .p-nt .spread{position:relative;width:100%;height:100%;max-height:640px;border-radius:6px 6px 10px 10px;
    background:
      linear-gradient(90deg,transparent calc(50% - 22px),color-mix(in srgb,var(--ink) 16%,transparent) 50%,transparent calc(50% + 22px)),
      repeating-linear-gradient(transparent 0 27px,color-mix(in srgb,var(--pen) 16%,transparent) 27px 28px),
      var(--card);
    box-shadow:0 1px 0 color-mix(in srgb,var(--ink) 8%,transparent),0 30px 60px -28px color-mix(in srgb,var(--ink) 45%,transparent),0 0 0 1px color-mix(in srgb,var(--ink) 9%,transparent);
    display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:clamp(14px,2.4vh,26px) clamp(28px,4vw,56px);
    padding:clamp(18px,3.4vh,36px) clamp(18px,2.6vw,34px)}
  .p-nt .spread::before{content:"";position:absolute;left:clamp(30px,3vw,44px);top:0;bottom:0;width:1px;background:color-mix(in srgb,var(--grana,#c8324b) 35%,transparent)}
  .p-nt .spread::after{content:"Plate IV";position:absolute;right:16px;bottom:10px;font:600 9px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:color-mix(in srgb,var(--ink) 35%,transparent)}

  .p-nt .slot{min-height:0;min-width:0;display:grid}
  .p-nt .leaf{position:relative;min-height:0;display:flex;flex-direction:column;gap:clamp(6px,1vh,10px);padding:clamp(14px,2.2vh,22px) clamp(14px,1.4vw,20px) clamp(12px,1.8vh,18px);
    background:color-mix(in srgb,var(--paper) 70%,var(--card));color:var(--ink);text-decoration:none;
    clip-path:polygon(0 1.5%,6% 0,14% 1.2%,23% 0,33% .9%,45% 0,57% 1.1%,68% 0,79% 1%,90% 0,100% 1.3%,100% 100%,0 100%);
    filter:drop-shadow(0 10px 14px color-mix(in srgb,var(--ink) 22%,transparent));
    transition:filter .3s var(--ease)}
  .p-nt .leaf:hover,.p-nt .leaf:focus-visible{filter:drop-shadow(0 22px 26px color-mix(in srgb,var(--ink) 30%,transparent));outline:none}
  .p-nt .leaf:focus-visible .leaf-title{text-decoration:underline;text-decoration-color:var(--accent)}
  .p-nt .tape{position:absolute;top:-9px;left:50%;width:74px;height:20px;translate:-50% 0;rotate:-3deg;z-index:2;pointer-events:none;
    background:color-mix(in srgb,var(--orange) 26%,#f4ead6);opacity:.82;
    clip-path:polygon(3% 0,97% 4%,100% 50%,96% 100%,2% 96%,0 50%)}
  .p-nt .leaf-top{display:flex;align-items:center;justify-content:space-between}
  .p-nt .leaf-ic{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent)}
  .p-nt .leaf-ic .ic{width:15px;height:15px}
  .p-nt .leaf-no{font:600 10px/1 var(--font-mono);letter-spacing:.16em;color:var(--muted)}
  .p-nt .leaf-title{font-family:var(--font-display);font-weight:700;font-size:clamp(19px,1.9vw,28px);line-height:1.05;letter-spacing:-.02em;margin:0}
  .p-nt .leaf-gloss{font:400 clamp(12px,.95vw,13.5px)/1.5 var(--font-body);color:var(--muted);margin:0;
    display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
  .p-nt .leaf-read{margin-top:auto;display:inline-flex;align-items:center;gap:6px;font-family:var(--font-hand);font-size:clamp(16px,1.3vw,19px);color:var(--accent)}
  .p-nt .leaf-read .arr .ic{width:12px;height:12px;transition:transform .25s var(--ease)}
  .p-nt .leaf:hover .leaf-read .arr .ic{transform:translateX(4px)}

  @media(max-width:900px){
    html[data-one-screen] .page.p-nt,.p-nt{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:12px}
    .p-nt .poster{gap:8px}
    .p-nt .big{font-size:clamp(40px,11.5vw,64px);margin-top:4px}
    .p-nt .hand{font-size:16px;margin-top:2px}
    .p-nt .lede{font-size:12.5px;margin-top:6px;line-height:1.45}
    .p-nt .door{margin-top:8px}
    .p-nt .dispatch{font-size:10px;padding-top:8px;gap:8px}
    .p-nt .dispatch a{display:none}
    .p-nt .spread{max-height:none;gap:12px 10px;padding:12px 10px 10px;background:var(--card)}
    .p-nt .spread::before,.p-nt .spread::after{display:none}
    .p-nt .leaf{padding:10px 9px 8px;gap:4px}
    .p-nt .leaf-ic{width:24px;height:24px}
    .p-nt .leaf-title{font-size:15px}
    .p-nt .leaf-gloss{font-size:10.5px;line-height:1.4;-webkit-line-clamp:2}
    .p-nt .leaf-read{font-size:15px}
    .p-nt .tape{width:52px;height:15px;top:-7px}
  }
  @media(max-width:900px) and (max-height:700px){ .p-nt .leaf-gloss{display:none} }
  @media(prefers-reduced-motion:reduce){ .p-nt .leaf{transition:none} }
`

function Leaf({ e, mx, my, reduce }: { e: Entry; mx: MotionValue<number>; my: MotionValue<number>; reduce: boolean }) {
  const x = useTransform(mx, (v) => v * PARALLAX_PX * e.depth)
  const y = useTransform(my, (v) => v * PARALLAX_PX * e.depth)
  return (
    <motion.div className="slot" style={reduce ? undefined : { x, y }}>
      <motion.div
        className="slot"
        style={{ rotate: e.tilt }}
        variants={{
          hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.xl, rotate: e.tilt * 3 },
          visible: { opacity: 1, y: 0, rotate: e.tilt, transition: springs.gentle },
        }}
        whileHover={reduce ? undefined : { rotate: 0, scale: motionTokens.scale.pop, transition: springs.snappy }}
      >
      <Link to={e.to} className="leaf">
        <span className="tape" aria-hidden="true" />
        <div className="leaf-top">
          <span className="leaf-ic"><Icon id={e.icon} /></span>
          <span className="leaf-no">{e.no}</span>
        </div>
        <h2 className="leaf-title">{e.title}</h2>
        <p className="leaf-gloss">{e.gloss}</p>
        <span className="leaf-read">
          open {e.read}
          <span className="arr"><Icon id="i-arrow" /></span>
        </span>
      </Link>
      </motion.div>
    </motion.div>
  )
}

export function Notes() {
  const reduce = useReducedMotion() ?? false
  const md = useMedium()

  useOneScreen()

  const posts = !md.fallback ? md.data.posts ?? [] : []
  const hasPosts = posts.length > 0

  // normalised pointer position over the desk, -1..1, smoothed
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: springs.gentle.stiffness, damping: springs.gentle.damping })
  const my = useSpring(rawY, { stiffness: springs.gentle.stiffness, damping: springs.gentle.damping })
  const deskX = useTransform(mx, (v) => v * PARALLAX_PX * DESK_DEPTH)
  const deskY = useTransform(my, (v) => v * PARALLAX_PX * DESK_DEPTH)
  const deskTilt = useTransform(mx, (v) => v * 1.5)

  const onMove = (ev: PointerEvent<HTMLDivElement>) => {
    if (reduce || ev.pointerType !== "mouse") return
    const r = ev.currentTarget.getBoundingClientRect()
    rawX.set(((ev.clientX - r.left) / r.width) * 2 - 1)
    rawY.set(((ev.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.15 } } }

  return (
    <main className="page p-nt" aria-label="Field notes">
      <style>{CSS}</style>

      <section className="poster">
        <div>
          <div className="kick">
            <span className="horse-glyph" aria-hidden="true" />
            <b>Plate IV</b> · Field Notes
          </div>
          <h1 className="big">
            Working<br /><em>notebooks</em>.
          </h1>
          <span className="hand">~ more, in longhand, soon</span>
          <p className="lede">
            Threads I keep coming back to. Pull a leaf from the book: each opens the page where the <i>thinking actually lives</i>.
          </p>
          <div className="door">
            <TwinDoor to="/analyst/skills" label="Notebooks into toolkit" world="analyst" />
          </div>
        </div>

        <div className="dispatch">
          <Icon id="i-pulse" />
          <span className="txt">
            {hasPosts
              ? <>Published dispatches · <b>{posts.length} live</b> on Medium.</>
              : <>Published longform is still in transcription. <b>No dispatches live yet</b>, and not pretending otherwise.</>}
          </span>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener">
            Follow along <Icon id="i-arrow" />
          </a>
        </div>
      </section>

      <div className="desk" onPointerMove={onMove} onPointerLeave={onLeave}>
        <motion.nav
          className="spread"
          aria-label="Notebook threads"
          style={reduce ? undefined : { x: deskX, y: deskY, rotateY: deskTilt }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {ENTRIES.map((e) => (
            <Leaf key={e.no} e={e} mx={mx} my={my} reduce={reduce} />
          ))}
        </motion.nav>
      </div>
    </main>
  )
}
