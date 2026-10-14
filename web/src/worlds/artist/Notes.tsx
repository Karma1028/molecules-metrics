import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { SOCIAL } from "../../lib/worlds"
import { useMedium } from "../../lib/live"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { PlateHeader } from "../../components/headers/PlateHeader"
import { useOneScreen } from "../../hooks/useOneScreen"

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
}
const ENTRIES: Entry[] = [
  { no: "N·01", icon: "i-scale", title: "Rigour, transferred", gloss: "Why a reactor and a regression are the same problem wearing different clothes.", to: "/analyst/skills", read: "the skills" },
  { no: "N·02", icon: "i-ball", title: "A match is a dataset", gloss: "Reading Barça ninety minutes at a time, by the numbers that actually move.", to: "/artist/matchday", read: "the matchday" },
  { no: "N·03", icon: "i-headphone", title: "Eight years, counted", gloss: "What 900+ logged listening hours quietly say about a person.", to: "/artist/sound", read: "the sound" },
  { no: "N·04", icon: "i-camera", title: "Ten frames worth keeping", gloss: "A small, honest edit from wherever the camera happened to be.", to: "/artist/gallery", read: "the gallery" },
]

const CSS = String.raw`
  .p-nt{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1140px;margin:0 auto;width:100%;overflow:hidden}

  .p-nt .nt-head{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:clamp(8px,1.4vh,14px)}
  .p-nt .nt-kick{display:inline-flex;align-items:center;gap:9px;font:600 10px/1 var(--font-mono);letter-spacing:.24em;text-transform:uppercase;color:var(--accent)}
  .p-nt .nt-title{font-family:var(--font-display);font-weight:900;font-size:clamp(30px,4.6vw,60px);line-height:.92;letter-spacing:-.03em;color:var(--ink);margin:8px 0 2px}
  .p-nt .nt-title em{font-style:italic;font-weight:500;color:var(--accent)}
  .p-nt .nt-rule{display:block;width:min(100%,300px);height:12px;color:var(--accent);opacity:.55;margin:4px 0}
  .p-nt .nt-lede{font-size:clamp(12px,1vw,14.5px);color:var(--muted);max-width:52ch}
  .p-nt .nt-note{font-family:var(--font-hand);font-size:clamp(15px,1.6vw,20px);color:var(--accent);rotate:-2deg;white-space:nowrap}

  .p-nt .notebook{flex:1;min-height:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));
    gap:clamp(10px,1.5vw,20px)}
  .p-nt .notebook>*{min-width:0;min-height:0}

  /* a notebook leaf: ruled paper, terracotta margin line, punched holes */
  .p-nt .leaf{--line:color-mix(in srgb,var(--ink) 9%,transparent);
    height:100%;display:flex;flex-direction:column;text-decoration:none;color:inherit;position:relative;overflow:hidden;isolation:isolate;
    background:repeating-linear-gradient(to bottom,transparent 0 25px,var(--line) 25px 26px),var(--card);
    border:1px solid var(--rule);border-radius:6px 12px 12px 6px;box-shadow:var(--shadow-sm);
    padding:clamp(12px,1.8vh,20px) clamp(14px,1.6vw,22px) clamp(12px,1.6vh,18px) clamp(46px,4.4vw,60px);
    transition:box-shadow .3s,rotate .4s cubic-bezier(.32,.72,0,1)}
  .p-nt .leaf::before{content:"";position:absolute;top:0;bottom:0;left:clamp(32px,3.2vw,44px);width:1.5px;
    background:color-mix(in srgb,var(--accent) 55%,transparent)}
  .p-nt .holes{position:absolute;left:clamp(10px,1vw,14px);top:0;bottom:0;display:flex;flex-direction:column;justify-content:space-evenly}
  .p-nt .holes i{display:block;width:11px;height:11px;border-radius:50%;background:var(--paper);
    box-shadow:inset 0 1px 2px rgba(0,0,0,.28)}
  .p-nt .ghost{position:absolute;right:clamp(10px,1.2vw,18px);bottom:-.16em;z-index:-1;font-family:var(--font-display);font-weight:900;
    font-size:clamp(70px,9vw,132px);line-height:1;letter-spacing:-.05em;color:color-mix(in srgb,var(--accent) 10%,transparent);
    transition:color .4s,transform .6s cubic-bezier(.32,.72,0,1)}
  .p-nt .leaf.stitch::after{opacity:0;transition:opacity .3s;inset:6px}
  .p-nt .leaf:hover,.p-nt .leaf:focus-visible{box-shadow:var(--shadow);rotate:-.5deg}
  .p-nt .leaf:hover::after,.p-nt .leaf:focus-visible::after{opacity:1}
  .p-nt .leaf:hover .ghost{color:color-mix(in srgb,var(--accent) 22%,transparent);transform:translateY(-6px)}
  .p-nt .leaf:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

  .p-nt .leaf-top{display:flex;align-items:center;gap:9px}
  .p-nt .leaf-ic{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--accent) 12%,transparent);flex:0 0 auto}
  .p-nt .leaf-ic .ic{width:14px;height:14px;color:var(--accent)}
  .p-nt .leaf-no{font:600 9.5px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
  .p-nt .leaf-title{font-family:var(--font-display);font-weight:800;font-size:clamp(18px,2.1vw,28px);line-height:1.02;letter-spacing:-.015em;color:var(--ink);
    margin-top:clamp(6px,1.2vh,14px)}
  .p-nt .leaf-gloss{font-family:var(--font-hand);font-size:clamp(15px,1.45vw,19px);line-height:26px;color:var(--muted);text-wrap:pretty;margin-top:4px;
    display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
  .p-nt .leaf-read{margin-top:auto;padding-top:8px;display:inline-flex;align-items:center;gap:8px;font:600 9px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink)}
  .p-nt .leaf-read .arr{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--accent) 14%,transparent);
    transition:transform .5s cubic-bezier(.32,.72,0,1),background .3s}
  .p-nt .leaf-read .arr .ic{width:11px;height:11px;color:var(--accent)}
  .p-nt .leaf:hover .leaf-read .arr{background:var(--accent);transform:translate(3px,-1px)}
  .p-nt .leaf:hover .leaf-read .arr .ic{color:var(--paper)}

  /* published dispatches: honest status strip */
  .p-nt .dispatch{flex:0 0 auto;margin-top:clamp(8px,1.4vh,14px);display:flex;align-items:center;gap:12px;
    border-top:1px dashed color-mix(in srgb,var(--accent) 40%,transparent);padding-top:clamp(8px,1.2vh,12px)}
  .p-nt .dispatch .ic{width:15px;height:15px;color:var(--accent);flex:0 0 auto}
  .p-nt .dispatch .txt{font:500 11px/1.4 var(--font-mono);color:var(--muted)}
  .p-nt .dispatch .txt b{color:var(--ink)}
  .p-nt .dispatch a{margin-left:auto;text-decoration:none;font:600 9.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--accent);
    display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
  .p-nt .dispatch a .ic{width:12px;height:12px}

  /* a fanned hand of leaves (ref: jameschugh.com "pick a card"): desktop only */
  @media(min-width:821px){
    .p-nt .notebook{grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:minmax(0,1fr);gap:0;
      padding:clamp(14px,2.4vh,26px) clamp(16px,2vw,28px) 4px}
    .p-nt .notebook>*{position:relative;transform-origin:50% 130%;
      transition:rotate .55s cubic-bezier(.22,1,.36,1),translate .55s cubic-bezier(.22,1,.36,1),opacity .3s}
    .p-nt .notebook>*:nth-child(1){rotate:-5deg;translate:18px 14px;z-index:1}
    .p-nt .notebook>*:nth-child(2){rotate:-1.7deg;translate:6px 2px;z-index:2}
    .p-nt .notebook>*:nth-child(3){rotate:1.7deg;translate:-6px 2px;z-index:3}
    .p-nt .notebook>*:nth-child(4){rotate:5deg;translate:-18px 14px;z-index:4}
    .p-nt .notebook>*:is(:hover,:focus-within){rotate:0deg;translate:0 -12px;z-index:9}
    .p-nt .notebook:has(>*:is(:hover,:focus-within))>*:not(:hover):not(:focus-within){opacity:.78}
    .p-nt .notebook:has(>*:nth-child(1):hover)>*:nth-child(2){translate:30px 6px}
    .p-nt .notebook:has(>*:nth-child(2):hover)>*:nth-child(1){translate:-6px 18px}
    .p-nt .notebook:has(>*:nth-child(3):hover)>*:nth-child(4){translate:6px 18px}
    .p-nt .notebook:has(>*:nth-child(4):hover)>*:nth-child(3){translate:-30px 6px}
    .p-nt .leaf{box-shadow:var(--shadow)}
    .p-nt .leaf:hover,.p-nt .leaf:focus-visible{rotate:0deg}
    .p-nt .leaf-gloss{-webkit-line-clamp:5}
  }

  @media(max-width:820px){
    .p-nt .nt-note,.p-nt .nt-rule,.p-nt .nt-lede{display:none}
    .p-nt .nt-title{font-size:clamp(28px,9vw,40px)}
    .p-nt .notebook{grid-template-columns:1fr;grid-template-rows:repeat(4,minmax(0,1fr));gap:8px}
    .p-nt .leaf{padding:8px 12px 8px 40px;border-radius:5px 10px 10px 5px}
    .p-nt .leaf::before{left:30px}
    .p-nt .holes{left:9px}
    .p-nt .holes i{width:8px;height:8px}
    .p-nt .leaf-top{display:none}
    .p-nt .leaf-title{font-size:18px;margin-top:0}
    .p-nt .leaf-gloss{font-size:14px;line-height:19px;-webkit-line-clamp:2}
    .p-nt .leaf-read{padding-top:2px}
    .p-nt .ghost{font-size:64px}
    .p-nt .dispatch .txt{font-size:10px}
    .p-nt .dispatch a{display:none}
  }
  @media(prefers-reduced-motion:reduce){.p-nt .leaf,.p-nt .ghost,.p-nt .notebook>*{transition:none}}
`

export function Notes() {
  const reduce = useReducedMotion()
  const md = useMedium()

  useOneScreen()

  const posts = !md.fallback ? md.data.posts ?? [] : []
  const hasPosts = posts.length > 0

  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  }

  return (
    <main className="page p-nt" aria-label="Field notes">
      <style>{CSS}</style>
      <PlateHeader
        plate="Plate IV"
        kicker="Field Notes"
        title={<>Working <em className="hl">notebooks</em>.</>}
        note="~ more, in longhand, soon"
        lede="Threads I keep coming back to. Pull a leaf from the hand: each opens the page where the thinking actually lives."
        showRule={true}
      />

      <motion.nav className="notebook" aria-label="Notebook threads" variants={container} initial="hidden" animate="visible">
        {ENTRIES.map((e) => (
          <motion.div key={e.no} variants={item}>
            <Link to={e.to} className="leaf stitch">
              <span className="holes" aria-hidden="true"><i /><i /><i /></span>
              <span className="ghost" aria-hidden="true">{e.no.slice(-2)}</span>
              <div className="leaf-top">
                <span className="leaf-ic"><Icon id={e.icon} /></span>
                <span className="leaf-no">{e.no}</span>
              </div>
              <h2 className="leaf-title">{e.title}</h2>
              <p className="leaf-gloss">{e.gloss}</p>
              <span className="leaf-read">
                Open {e.read}
                <span className="arr"><Icon id="i-arrow" /></span>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

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
    </main>
  )
}
