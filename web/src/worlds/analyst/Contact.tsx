import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { SOCIAL } from "../../lib/worlds"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"
import { TwinDoor } from "../../components/TwinDoor"

interface Channel {
  icon: string
  label: string
  handle: string
  href: string
  note: string
}

const CHANNELS: Channel[] = [
  { icon: "i-mail", label: "Email", handle: SOCIAL.email, href: `mailto:${SOCIAL.email}`, note: "Best for roles, projects and data questions." },
  { icon: "i-link", label: "LinkedIn", handle: "/in/tuhinbhattacharya28", href: SOCIAL.linkedin, note: "Full profile, recommendations, activity." },
  { icon: "i-camera", label: "Instagram", handle: "@_threads_of_karma_", href: SOCIAL.instagram, note: "The artist side: photography and frames." },
]

const STATUS = [
  { k: "Looking for", v: "Data Analyst / BI roles" },
  { k: "Available", v: "2027 full-time · open now to talk" },
  { k: "Based in", v: "Goa, India · IST" },
  { k: "Program", v: "PGDM Big Data Analytics, GIM" },
]

const CSS = String.raw`
  .p-ct{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1160px;margin:0 auto;width:100%;overflow:hidden}
  .p-ct .grid{flex:1;min-height:0;display:grid;grid-template-columns:5.5fr 4.5fr;gap:clamp(12px,1.6vw,22px)}
  .p-ct .grid>*{min-width:0;min-height:0}

  /* left: statement + status */
  .p-ct .lead{display:flex;flex-direction:column;min-height:0}
  .p-ct .ct-kick{display:inline-flex;align-items:center;gap:8px;font:500 10px/1 var(--font-mono);letter-spacing:.26em;text-transform:uppercase;color:var(--accent)}
  .p-ct .ct-kick .ic{width:13px;height:13px}
  .p-ct .ct-kick .live{width:7px;height:7px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);animation:pulse 1.8s infinite}
  .p-ct .ct-title{font-family:var(--font-display);font-weight:700;font-size:clamp(30px,4.6vw,60px);line-height:.98;letter-spacing:-.025em;color:var(--ink);margin:12px 0 10px}
  .p-ct .ct-title em{font-style:normal;color:var(--accent)}
  .p-ct .ct-lede{font-size:clamp(13px,1.1vw,15px);color:var(--muted);max-width:40ch;text-wrap:pretty}
  .p-ct .ct-lede b{color:var(--ink);font-weight:600}
  .p-ct .status{margin-top:auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,1vw,14px)}
  .p-ct .st-cell{border:1px solid var(--rule);border-left:2px solid var(--accent);border-radius:10px;background:color-mix(in srgb,var(--card) 70%,transparent);
    padding:clamp(9px,1.2vh,14px) clamp(11px,1.1vw,15px)}
  .p-ct .st-cell .k{font:500 8.5px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
  .p-ct .st-cell .v{font-family:var(--font-display);font-weight:600;font-size:clamp(13px,1.3vw,16px);color:var(--ink);line-height:1.15;margin-top:5px}

  /* right: channel cards */
  .p-ct .chans{display:flex;flex-direction:column;gap:clamp(9px,1.3vh,16px);min-height:0}
  .p-ct .chan{flex:1;min-height:0;display:block;text-decoration:none;color:inherit;
    background:color-mix(in srgb,var(--card) 92%,transparent);border:1px solid color-mix(in srgb,var(--accent) 16%,var(--rule));
    border-radius:12px;box-shadow:var(--shadow-sm);padding:clamp(12px,1.5vw,18px);position:relative;overflow:hidden;
    transition:border-color .3s,box-shadow .3s,transform .3s}
  .p-ct .chan:hover{border-color:color-mix(in srgb,var(--accent) 42%,transparent);box-shadow:var(--glow);transform:translateY(-2px)}
  .p-ct .chan-top{display:flex;align-items:center;gap:10px}
  .p-ct .chan-ic{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;background:color-mix(in srgb,var(--accent) 12%,transparent);flex:0 0 auto}
  .p-ct .chan-ic .ic{width:16px;height:16px;color:var(--accent)}
  .p-ct .chan-label{font:500 9px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
  .p-ct .chan-handle{font-family:var(--font-display);font-weight:600;font-size:clamp(14px,1.5vw,19px);color:var(--ink);line-height:1.1;margin-top:3px;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .p-ct .chan-arrow{margin-left:auto;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;flex:0 0 auto;
    background:color-mix(in srgb,var(--accent) 12%,transparent);transition:transform .5s cubic-bezier(.32,.72,0,1),background .3s}
  .p-ct .chan-arrow .ic{width:13px;height:13px;color:var(--accent)}
  .p-ct .chan:hover .chan-arrow{background:var(--accent);transform:translate(3px,-2px)}
  .p-ct .chan:hover .chan-arrow .ic{color:#fff}
  .p-ct .chan-note{font-size:11.5px;line-height:1.35;color:var(--muted);margin-top:9px;text-wrap:pretty}

  @media(max-width:860px){
    .p-ct{height:100%;min-height:0;overflow:hidden}
    .p-ct .grid{grid-template-columns:1fr;gap:10px;flex:1;min-height:0;display:flex;flex-direction:column}
    .p-ct .lead{flex:0 0 auto}
    .p-ct .status{margin-top:8px;grid-template-columns:repeat(4,1fr);gap:6px}
    .p-ct .st-cell{padding:6px 8px}
    .p-ct .st-cell .v{font-size:12px;margin-top:2px}
    .p-ct .chans{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .p-ct .chan{min-height:0;padding:8px 10px}
    .p-ct .chan-top{gap:8px}
    .p-ct .chan-ic{width:28px;height:28px;border-radius:7px}
    .p-ct .chan-handle{font-size:13px}
    .p-ct .chan-arrow{width:24px;height:24px}
    .p-ct .chan-note{font-size:10px;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  }
  @media(max-width:540px){
    .p-ct .status{grid-template-columns:repeat(2,1fr);gap:5px}
    .p-ct .chans{gap:6px}
    .p-ct .chan{padding:7px 8px}
    .p-ct .chan-ic{width:24px;height:24px}
    .p-ct .chan-handle{font-size:12px}
    .p-ct .chan-note{display:none}
  }
`

export function Contact() {
  const reduce = useReducedMotion()

  useOneScreen()

  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  }

  return (
    <main className="page p-ct" aria-label="Contact">
      <style>{CSS}</style>
      <div className="grid">
        <motion.section className="lead" variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <LogHeader
              log="LOG.06"
              section="CONTACT"
              tag="uplink-terminal"
              title="Let's talk data."
              lede={<>Open to <b>analyst and BI conversations</b>, collaborations and the occasional football argument. Fastest on email.</>}
              right={
                <TwinDoor to="/artist/contact" label="You've met Tuhin. Meet Karma" world="artist" />
              }
            />
          </motion.div>
          <motion.div className="status" variants={item}>
            {STATUS.map((s) => (
              <div className="st-cell" key={s.k}>
                <div className="k">{s.k}</div>
                <div className="v">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="chans" variants={container} initial="hidden" animate="visible">
          {CHANNELS.map((c) => (
            <motion.a
              key={c.label}
              className="chan"
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener"
              variants={item}
            >
              <div className="chan-top">
                <span className="chan-ic"><Icon id={c.icon} /></span>
                <div style={{ minWidth: 0 }}>
                  <div className="chan-label">{c.label}</div>
                  <div className="chan-handle">{c.handle}</div>
                </div>
                <span className="chan-arrow"><Icon id="i-arrow" /></span>
              </div>
              <p className="chan-note">{c.note}</p>
            </motion.a>
          ))}
        </motion.section>
      </div>
    </main>
  )
}
