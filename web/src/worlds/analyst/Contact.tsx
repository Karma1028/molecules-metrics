import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { SOCIAL } from "../../lib/worlds"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { useGoaClock, useGoaPhrase } from "../../lib/useGoaClock"
import { TwinDoor } from "../../components/TwinDoor"

interface Channel {
  id: string
  icon: string
  label: string
  handle: string
  href: string
  note: string
}

const CHANNELS: Channel[] = [
  { id: "email", icon: "i-mail", label: "Email", handle: SOCIAL.email, href: `mailto:${SOCIAL.email}`, note: "Best for roles, projects and data questions." },
  { id: "linkedin", icon: "i-link", label: "LinkedIn", handle: "/in/tuhinbhattacharya28", href: SOCIAL.linkedin, note: "Full profile, recommendations, activity." },
  { id: "instagram", icon: "i-camera", label: "Instagram", handle: "@_threads_of_karma_", href: SOCIAL.instagram, note: "The artist side: photography and frames." },
]

export const STATUS = [
  { k: "Looking for", v: "Technology Consultant roles" },
  { k: "Available", v: "2027 full-time · open now to talk" },
  { k: "Based in", v: "Goa, India · IST" },
  { k: "Program", v: "PGDM Big Data Analytics, GIM" },
]

const COPIED_MS = 1800
const STAGGER_S = 0.07

const CSS = String.raw`
  html[data-one-screen] .page.p-ct,html[data-toc] .page.p-ct,.p-ct{min-height:0;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);
    gap:clamp(20px,4vw,64px);max-width:1240px;margin:0 auto;width:100%;overflow:hidden;position:relative}

  /* material: graph paper, same sheet as the Analyst index */
  .p-ct::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
    background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px),
      linear-gradient(color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px);
    background-size:24px 24px,24px 24px,120px 120px,120px 120px;
    mask-image:radial-gradient(ellipse 80% 75% at 50% 45%,#000 40%,transparent 100%)}

  /* left: poster + status sheet */
  .p-ct .ct-poster{min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(10px,2vh,22px)}
  .p-ct .ct-kick{display:inline-flex;align-items:center;gap:8px;font:600 10px/1.4 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--teal)}
  .p-ct .ct-kick .live{width:7px;height:7px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
  .p-ct .ct-big{font-family:var(--font-display);font-weight:700;font-size:clamp(52px,min(7vw,12vh),112px);line-height:.88;letter-spacing:-.045em;color:var(--ink);margin:clamp(6px,1.2vh,14px) 0 0}
  .p-ct .ct-big em{font-style:normal;color:var(--accent)}
  .p-ct .ct-lede{font:500 clamp(12px,1vw,14px)/1.5 var(--font-mono);color:var(--muted);margin:clamp(12px,2.2vh,22px) 0 0;max-width:38ch}
  .p-ct .ct-lede b{color:var(--ink);font-weight:600}
  .p-ct .ct-spec{display:grid;grid-template-columns:auto minmax(0,1fr);border-top:1px solid var(--rule)}
  .p-ct .ct-spec dt,.p-ct .ct-spec dd{margin:0;padding:clamp(6px,1.1vh,10px) 0;border-bottom:1px solid var(--rule)}
  .p-ct .ct-spec dt{font:600 9px/1.6 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);padding-right:16px}
  .p-ct .ct-spec dd{font:600 clamp(12.5px,1.1vw,15px)/1.3 var(--font-display);color:var(--ink)}
  .p-ct .ct-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;font:500 10px/1.5 var(--font-mono);letter-spacing:.06em;color:var(--muted)}
  .p-ct .ct-foot b{color:var(--teal);font-weight:600}

  /* right: the uplink, three channels in poster type */
  .p-ct .ct-links{min-height:0;display:grid;grid-template-rows:repeat(3,minmax(0,1fr));border-top:1px solid var(--rule)}
  .p-ct .ch{position:relative;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:clamp(12px,1.6vw,24px);
    border-bottom:1px solid var(--rule);transition:opacity .25s var(--ease)}
  .p-ct .ch>*{transition:opacity .25s var(--ease)}
  .p-ct .ct-links:hover .ch:not(:hover)>*,.p-ct .ct-links:focus-within .ch:not(:focus-within)>*{opacity:.4}
  .p-ct .ch-a{display:block;min-width:0;text-decoration:none;color:inherit;padding:clamp(6px,1.2vh,14px) 0}
  .p-ct .ch-a:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:4px}
  .p-ct .ch-k{display:flex;align-items:center;gap:8px;font:600 10px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--teal)}
  .p-ct .ch-k .ic{width:13px;height:13px}
  .p-ct .ch-k .n{color:var(--muted)}
  .p-ct .ch-t{font-family:var(--font-display);font-weight:700;font-size:clamp(36px,min(5.6vw,9vh),88px);line-height:.95;letter-spacing:-.04em;color:var(--ink);
    margin:clamp(4px,.8vh,8px) 0;transition:color .25s var(--ease)}
  .p-ct .ch:hover .ch-t{color:var(--accent)}
  .p-ct .ch-h{font:600 clamp(11px,1vw,13.5px)/1.3 var(--font-mono);color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .p-ct .ch-n{font-size:clamp(11px,.95vw,12.5px);line-height:1.4;color:var(--muted);margin-top:2px}
  .p-ct .ch-side{display:flex;align-items:center;gap:8px}
  .p-ct .ch-arrow{width:clamp(40px,4vw,56px);height:clamp(40px,4vw,56px);border-radius:50%;display:grid;place-items:center;
    border:1px solid color-mix(in srgb,var(--accent) 40%,var(--rule));color:var(--accent);pointer-events:none;
    transition:transform .35s var(--ease),background .25s var(--ease),color .25s var(--ease)}
  .p-ct .ch-arrow .ic{width:16px;height:16px}
  .p-ct .ch:hover .ch-arrow{background:var(--accent);color:var(--paper);transform:rotate(-45deg)}
  .p-ct .ch-copy{display:inline-flex;align-items:center;gap:6px;padding:8px 11px;border-radius:30px;border:1px solid var(--rule);background:color-mix(in srgb,var(--card) 80%,transparent);
    font:600 9.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink);cursor:pointer;transition:border-color .2s var(--ease),color .2s var(--ease)}
  .p-ct .ch-copy:hover{border-color:var(--teal);color:var(--teal)}
  .p-ct .ch-copy .ic{width:12px;height:12px}
  .p-ct .ch-copy[data-done="true"]{color:var(--teal);border-color:var(--teal)}

  @media(max-width:900px){
    html[data-one-screen] .page.p-ct,html[data-toc] .page.p-ct,.p-ct{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:10px}
    .p-ct .ct-poster{gap:8px}
    .p-ct .ct-big{font-size:clamp(38px,10.5vw,60px);margin-top:4px}
    .p-ct .ct-big br{display:none}
    .p-ct .ct-lede{font-size:11px;margin-top:6px;max-width:none}
    .p-ct .ct-spec{grid-template-columns:auto minmax(0,1fr) auto minmax(0,1fr);column-gap:0}
    .p-ct .ct-spec dt{font-size:7.5px;padding:5px 8px 5px 0}
    .p-ct .ct-spec dd{font-size:11px;padding:5px 8px 5px 0}
    .p-ct .ct-foot .fn{display:none}
    .p-ct .ch-t{font-size:clamp(28px,8.5vw,44px)}
    .p-ct .ch-n{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
    .p-ct .ch-arrow{width:36px;height:36px}
    .p-ct .ch-side{flex-direction:column-reverse;align-items:flex-end;gap:6px}
    .p-ct .ch-copy{padding:6px 9px;font-size:8.5px}
  }
  @media(max-width:900px) and (max-height:760px){
    .p-ct .ct-lede{display:none}
  }
  @media(prefers-reduced-motion:reduce){
    .p-ct .ch,.p-ct .ch-t,.p-ct .ch-arrow,.p-ct .ch-copy{transition:none}
    .p-ct .ch:hover .ch-arrow{transform:none}
  }
`

function useCopy() {
  const [done, setDone] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setDone(false), COPIED_MS)
    } catch {
      // Clipboard blocked (permissions or insecure context): fall back to the mail link.
      window.location.href = `mailto:${text}`
    }
  }
  return { done, copy }
}

export function Contact() {
  const reduce = useReducedMotion() ?? false
  const clock = useGoaClock()
  const phrase = useGoaPhrase()
  const { done, copy } = useCopy()

  useOneScreen()

  const rise = (k: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { ...springs.gentle, delay: k * STAGGER_S },
  })

  return (
    <main className="page p-ct" aria-label="Contact">
      <style>{CSS}</style>

      <section className="ct-poster">
        <div>
          <span className="ct-kick"><span className="live" aria-hidden="true" /> Log.06 · Uplink · {clock} IST</span>
          <h1 className="ct-big">Let's talk<br /> <em>data.</em></h1>
          <p className="ct-lede">
            Open to <b>technology consulting conversations</b>, collaborations and the occasional football argument. Fastest on email.
          </p>
        </div>

        <dl className="ct-spec">
          {STATUS.map((s) => (
            <div key={s.k} style={{ display: "contents" }}>
              <dt>{s.k}</dt>
              <dd>{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="ct-foot">
          <TwinDoor to="/artist/contact" label="You've met Tuhin. Meet Karma" world="artist" />
          <span className="fn">It is <b>{phrase}</b> right now.</span>
        </div>
      </section>

      <nav className="ct-links" aria-label="Contact channels">
        {CHANNELS.map((c, k) => (
          <motion.div className="ch" key={c.id} {...rise(k + 1)}>
            <a
              className="ch-a"
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener"
            >
              <span className="ch-k"><span className="n">0{k + 1}</span><Icon id={c.icon} /></span>
              <span className="ch-t" style={{ display: "block" }}>{c.label}</span>
              <span className="ch-h" style={{ display: "block" }}>{c.handle}</span>
              <span className="ch-n" style={{ display: "block" }}>{c.note}</span>
            </a>
            <div className="ch-side">
              {c.id === "email" && (
                <button type="button" className="ch-copy" data-done={done} onClick={() => copy(SOCIAL.email)} aria-live="polite">
                  <Icon id={done ? "i-check" : "i-layers"} /> {done ? "Copied" : "Copy"}
                </button>
              )}
              <span className="ch-arrow" aria-hidden="true"><Icon id="i-arrow" /></span>
            </div>
          </motion.div>
        ))}
      </nav>
    </main>
  )
}
