import { Link } from "react-router-dom"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { PlateHeader } from "../../components/headers/PlateHeader"
import { useOneScreen } from "../../hooks/useOneScreen"

// Facts sourced from the real CV + the Gallery/Sound/Matchday pages. No invented
// biography: only what the portfolio itself already evidences.
const FACTS = [
  { icon: "horse", k: "From", v: "Bankura, West Bengal" },
  { icon: "i-flask", k: "Trained", v: "Chem Eng · Jadavpur" },
  { icon: "i-database", k: "Now", v: "PGDM · GIM, Goa" },
  { icon: "i-camera", k: "Camera", v: "frames in the Gallery" },
  { icon: "i-headphone", k: "Ears", v: "900+ hrs logged" },
  { icon: "i-ball", k: "Colours", v: "FC Barcelona" },
]

// Floating tags (ref: quangdinh.im): each one is a real section of this site, not a claimed hobby.
const TAGS = [
  { to: "/artist/gallery", label: "Photography", pos: "t1" },
  { to: "/artist/sound", label: "Listening", pos: "t2" },
  { to: "/artist/matchday", label: "Barça", pos: "t3" },
  { to: "/artist/notes", label: "Field notes", pos: "t4" },
]
const PULL_LEAD = "The analyst and the artist aren’t two people."
/** Max photo tilt (deg) following the pointer. */
const TILT_DEG = 7

const CSS = String.raw`
  .p-ab{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1140px;margin:0 auto;width:100%;overflow:hidden}

  .p-ab .ab-head{margin-bottom:clamp(10px,1.8vh,20px)}
  .p-ab .ab-kick{display:inline-flex;align-items:center;gap:9px;font:600 10px/1 var(--font-mono);letter-spacing:.24em;text-transform:uppercase;color:var(--accent)}
  .p-ab .ab-title{font-family:var(--font-display);font-weight:900;font-size:clamp(28px,4.4vw,58px);line-height:.94;letter-spacing:-.03em;color:var(--ink);margin:8px 0 2px}
  .p-ab .ab-title em{font-style:italic;font-weight:500;color:var(--accent)}
  .p-ab .ab-rule{display:block;width:min(100%,300px);height:12px;color:var(--accent);opacity:.55;margin-top:4px}

  .p-ab .grid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,4fr) minmax(0,6fr);gap:clamp(18px,3vw,48px);align-items:stretch}
  .p-ab .grid>*{min-width:0;min-height:0}

  /* photo: one frame on the film strip, same stock as the home stage */
  .p-ab .photo{display:flex;flex-direction:column;min-height:0}
  .p-ab .film-mat{flex:1;min-height:0;rotate:-.8deg}
  .p-ab .frame{position:relative;height:100%;border-radius:4px;overflow:hidden;background:#0c0a08}
  .p-ab .frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%}
  .p-ab .frame .edge{z-index:2;position:absolute;left:12px;top:10px;font:600 9.5px/1 var(--font-mono);letter-spacing:.22em;color:#f4ead9;opacity:.85;
    text-transform:uppercase;text-shadow:0 1px 6px rgba(0,0,0,.55)}
  .p-ab .frame .edge i{font-style:normal;color:var(--accent)}
  .p-ab .cap{margin-top:10px;font-family:var(--font-hand);font-size:clamp(16px,1.6vw,20px);color:var(--accent);rotate:-1deg;text-align:center}

  /* giant ribbon behind the photo (ref: meermohsin.me) */
  .p-ab .photo{position:relative;isolation:isolate;perspective:900px}
  .p-ab .ribbon{position:absolute;z-index:1;left:0;right:0;bottom:16%;overflow:hidden;pointer-events:none;mix-blend-mode:screen}
  .p-ab .ribbon-track{display:flex;width:max-content;animation:ab-ribbon 38s linear infinite}
  .p-ab .ribbon span{font-family:var(--font-display);font-weight:900;font-size:clamp(40px,5.4vw,84px);line-height:1;letter-spacing:-.04em;
    white-space:nowrap;padding-right:.4em;color:transparent;-webkit-text-stroke:1.2px rgba(244,234,217,.75)}
  .p-ab .ribbon span i{font-style:italic;color:var(--accent);-webkit-text-stroke:0}
  @keyframes ab-ribbon{to{transform:translateX(-50%)}}
  .p-ab .tilt{flex:1;min-height:0;display:flex;transform-style:preserve-3d}

  /* floating section tags */
  .p-ab .tag{position:absolute;z-index:4;display:inline-flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;
    background:var(--card);border:1px solid var(--rule);box-shadow:var(--shadow-sm);text-decoration:none;
    font:600 10px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink);
    animation:ab-bob 5s ease-in-out infinite;transition:background .25s,color .25s}
  .p-ab .tag::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent)}
  .p-ab .tag:hover,.p-ab .tag:focus-visible{background:var(--accent);color:var(--paper)}
  .p-ab .tag:hover::before{background:var(--paper)}
  .p-ab .tag:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .p-ab .t1{top:9%;left:-14px;rotate:-5deg}
  .p-ab .t2{top:30%;right:-18px;rotate:4deg;animation-delay:-1.2s}
  .p-ab .t3{bottom:30%;left:-20px;rotate:3deg;animation-delay:-2.4s}
  .p-ab .t4{bottom:13%;right:-12px;rotate:-4deg;animation-delay:-3.6s}
  @keyframes ab-bob{50%{translate:0 -6px}}

  /* ink-in quote (ref: jameschugh.com) */
  .p-ab .pull .w{display:inline}

  /* bio prose + facts */
  .p-ab .bio{display:flex;flex-direction:column;min-height:0;justify-content:center;gap:clamp(9px,1.5vh,16px)}
  .p-ab .bio p{font-size:clamp(13px,1.15vw,16px);line-height:1.55;color:var(--muted);text-wrap:pretty;max-width:54ch}
  .p-ab .bio p b{color:var(--ink);font-weight:600}
  .p-ab .bio .pull{position:relative;font-family:var(--font-display);font-weight:600;font-size:clamp(17px,1.9vw,25px);line-height:1.18;color:var(--ink);
    text-wrap:balance;padding:4px 0 4px 18px;max-width:none}
  .p-ab .bio .pull::before{content:"";position:absolute;left:0;top:2px;bottom:2px;width:0;border-left:2px dashed var(--accent)}
  .p-ab .bio .pull em{font-style:italic;color:var(--accent)}

  .p-ab .facts{margin-top:clamp(4px,1vh,10px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(7px,.9vw,12px)}
  .p-ab .fact{display:flex;flex-direction:column;gap:4px;padding:clamp(10px,1.3vh,14px) clamp(11px,1.1vw,15px);
    background:var(--card);border:1px solid var(--rule);border-radius:10px;box-shadow:var(--shadow-sm);transition:transform .35s cubic-bezier(.32,.72,0,1)}
  .p-ab .fact.stitch::after{inset:4px;opacity:.55}
  .p-ab .fact:hover{transform:translateY(-2px) rotate(-.6deg)}
  .p-ab .fact .k{display:inline-flex;align-items:center;gap:6px;font:600 8.5px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-ab .fact .k .ic{width:12px;height:12px;color:var(--accent)}
  .p-ab .fact .k .horse-glyph{width:15px}
  .p-ab .fact .v{font-family:var(--font-display);font-weight:600;font-size:clamp(11.5px,1.1vw,14.5px);color:var(--ink);line-height:1.15}

  @media(max-width:820px){
    .p-ab .ab-rule{display:none}
    .p-ab .ab-title{font-size:clamp(24px,7.6vw,34px)}
    .p-ab .ab-head{margin-bottom:8px}
    .p-ab .grid{grid-template-columns:118px minmax(0,1fr);grid-template-rows:none;grid-auto-rows:auto;align-content:space-between;gap:10px 14px}
    .p-ab .photo{grid-area:1 / 1;height:156px}
    .p-ab .film-mat{padding:16px 6px;rotate:none}
    .p-ab .film-mat::before{top:4px}
    .p-ab .film-mat::after{bottom:4px}
    .p-ab .frame .edge{display:none}
    .p-ab .cap{display:none}
    .p-ab .bio{display:contents}
    .p-ab .bio .pull{grid-area:1 / 2;align-self:center;font-size:17px}
    .p-ab .bio p,.p-ab .facts{grid-column:1 / -1}
    .p-ab .bio p{font-size:12.5px;line-height:1.5}
    .p-ab .facts{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:0}
    .p-ab .fact{padding:7px 8px}
    .p-ab .fact .v{font-size:11px}
  }
  @media(max-width:820px){
    .p-ab .ribbon span{font-size:30px}
    .p-ab .tag{display:none}
  }
  @media(prefers-reduced-motion:reduce){.p-ab .fact{transition:none}.p-ab .ribbon-track,.p-ab .tag{animation:none}}
`

export function About() {
  const reduce = useReducedMotion()

  useOneScreen()

  // pointer tilt on the photo
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-TILT_DEG, TILT_DEG]), springs.gentle)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [TILT_DEG, -TILT_DEG]), springs.gentle)
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }
  const words = PULL_LEAD.split(" ")

  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.05 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  }

  return (
    <main className="page p-ab" aria-label="About Tuhin">
      <style>{CSS}</style>
      <PlateHeader
        plate="Plate V"
        kicker="Biography"
        title={<>The person behind the <em className="hl">frames</em>.</>}
        note="~ origins, in ink"
        showRule={true}
      />

      <div className="grid">
        <motion.div className="photo" initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.96, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={springs.gentle}>
          <motion.div className="tilt" onPointerMove={onMove} onPointerLeave={onLeave} style={{ rotateX: rotX, rotateY: rotY }}>
            <figure className="film-mat" style={{ flex: 1, minHeight: 0 }}>
              <div className="frame">
                <img src="/me.jpg" alt="Tuhin Bhattacharya" />
              <div className="ribbon" aria-hidden="true">
                <div className="ribbon-track">
                  {[0, 1].map((k) => (
                    <span key={k}>
                      Molecules <i>to</i> Metrics · Bankura <i>to</i> Goa ·
                    </span>
                  ))}
                </div>
              </div>
                <span className="edge">Fr <i>05</i> / 06</span>
              </div>
            </figure>
          </motion.div>
          {TAGS.map((t) => (
            <Link key={t.to} to={t.to} className={`tag ${t.pos}`}>
              {t.label}
            </Link>
          ))}
          <p className="cap">molecules, then metrics</p>
        </motion.div>

        <motion.div className="bio" variants={container} initial="hidden" animate="visible">
          <motion.p variants={item}>
            Grew up in <b>Bankura, West Bengal</b>, and trained as a <b>chemical engineer</b> at Jadavpur
            University. Somewhere between mass balances and reactor diagrams, a camera and a pair of
            headphones quietly became the other half of the story.
          </motion.p>
          <motion.div className="pull" variants={item}>
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="w"
                initial={reduce ? { opacity: 1 } : { opacity: 0.18 }}
                animate={{ opacity: 1 }}
                transition={{ duration: motionTokens.duration.normal, delay: reduce ? 0 : 0.5 + i * 0.07 }}
              >
                {w}{" "}
              </motion.span>
            ))}
            <em className="hl">Same eye for a system</em>, pointed at different things.
          </motion.div>
          <motion.p variants={item}>
            Today he reads <b>Big Data Analytics at GIM, Goa</b>, turning the instinct that once reconciled
            plant flows onto data. Off the clock: film-leaning frames from wherever he is, an unreasonable
            number of listening hours, and ninety minutes a week for <b>Barça</b>.
          </motion.p>
          <motion.div className="facts" variants={item}>
            {FACTS.map((f) => (
              <div className="fact stitch" key={f.k}>
                <span className="k">
                  {f.icon === "horse" ? <span className="horse-glyph" aria-hidden="true" /> : <Icon id={f.icon} />} {f.k}
                </span>
                <span className="v">{f.v}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
