import { motion, useReducedMotion } from "motion/react"
import { SOCIAL } from "../../lib/worlds"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { useGoaClock, useGoaPhrase } from "../../lib/useGoaClock"
import { TwinDoor } from "../../components/TwinDoor"
import { QueryConsole, type Channel } from "./contact/QueryConsole"
import { CONSOLE_CSS } from "./contact/console.css"
import { Headline } from "../../components/headline/Headline"

const CHANNELS: Channel[] = [
  { id: "email", icon: "i-mail", label: "Email", handle: SOCIAL.email, href: `mailto:${SOCIAL.email}`, note: "Best for roles, projects and data questions.", copy: SOCIAL.email },
  { id: "linkedin", icon: "i-link", label: "LinkedIn", handle: "/in/tuhinbhattacharya28", href: SOCIAL.linkedin, note: "Full profile, recommendations, activity." },
  { id: "instagram", icon: "i-camera", label: "Instagram", handle: "@_threads_of_karma_", href: SOCIAL.instagram, note: "The artist side: photography and frames." },
]

export const STATUS = [
  { k: "Looking for", v: "Technology Consultant roles" },
  { k: "Available", v: "2027 full-time · open now to talk" },
  { k: "Based in", v: "Goa, India · IST" },
  { k: "Program", v: "PGDM Big Data Analytics, GIM" },
]

export function Contact() {
  const reduce = useReducedMotion() ?? false
  const clock = useGoaClock()
  const phrase = useGoaPhrase()

  useOneScreen()

  const rise = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : springs.gentle,
  }

  return (
    <main className="page p-ct" aria-label="Contact">
      <style>{CONSOLE_CSS}</style>

      <motion.section className="ct-poster" {...rise}>
        <div>
          <span className="ct-kick"><span className="live" aria-hidden="true" /> Log.06 · Uplink · {clock} IST</span>
          <Headline world="analyst" className="ct-big">Let's talk<br /> <em>data.</em></Headline>
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
        </div>
      </motion.section>

      <QueryConsole channels={CHANNELS} clock={clock} phrase={phrase} />
    </main>
  )
}
