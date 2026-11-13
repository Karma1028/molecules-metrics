import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../lib/icons"
import { motionTokens, springs } from "../lib/motion-tokens"
import { useOneScreen } from "../hooks/useOneScreen"

interface ComingSoonProps {
  world: "artist" | "analyst"
  icon: string
  kicker: string
  title: string
  blurb: string
  backTo: string
  backLabel: string
}

const CSS = String.raw`
  .p-stub{height:100%;min-height:0;display:flex;flex-direction:column;justify-content:space-between;max-width:960px;margin:0 auto;width:100%;overflow:hidden}
  
  /* Masthead */
  .p-stub .masthead{padding:clamp(2px,1vh,8px) 0 clamp(6px,1.2vh,12px);border-bottom:1px solid var(--rule);display:flex;justify-content:space-between;align-items:flex-end}
  .p-stub .mast-kick{font:600 11px/1 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--accent-ink)}
  .p-stub .mast-title{font-family:var(--font-display);font-size:clamp(24px,3.2vw,36px);font-weight:900;line-height:1;letter-spacing:-.02em;color:var(--ink);margin:4px 0 2px}
  .p-stub .mast-status{font:600 11px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;padding:4px 10px;border-radius:20px;
    background:color-mix(in srgb,var(--accent) 12%,transparent);color:var(--accent-ink);border:1px solid color-mix(in srgb,var(--accent) 25%,transparent)}

  /* Specimen Card */
  .p-stub .specimen-wrap{flex:1;min-height:0;margin:clamp(12px,2vh,24px) 0;display:flex;align-items:center;justify-content:center}
  .p-stub .stub-card{width:100%;max-width:680px;background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:clamp(20px,3.5vh,36px);
    box-shadow:var(--shadow);position:relative;display:flex;flex-direction:column;gap:clamp(12px,2vh,20px);text-align:left}
  
  .p-stub .washi{position:absolute;top:-9px;right:32px;width:72px;height:20px;background:color-mix(in srgb,var(--accent) 26%,#e4d0a2 45%);
    border:1px dashed color-mix(in srgb,var(--ink) 25%,transparent);rotate:-2.5deg}
  
  .p-stub .stub-header{display:flex;align-items:center;gap:12px}
  .p-stub .stub-ic{width:36px;height:36px;border-radius:8px;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent-ink);display:flex;align-items:center;justify-content:center}
  .p-stub .stub-ic .ic{width:20px;height:20px}
  .p-stub .stub-meta{font:600 11px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
  .p-stub .stub-entry-name{font-family:var(--font-display);font-size:clamp(18px,2.2vw,24px);font-weight:700;color:var(--ink);margin-top:4px}
  
  .p-stub .stub-body{font-size:clamp(13.5px,1.15vw,15px);color:var(--muted);line-height:1.6;border-left:2px solid var(--accent);padding-left:14px}
  .p-stub .stub-hand{font-family:var(--font-hand);font-size:clamp(16px,1.4vw,19px);color:var(--accent-ink);rotate:-.6deg}
  
  .p-stub .stub-foot{display:flex;justify-content:space-between;align-items:center;border-top:1px dashed var(--rule);padding-top:14px;margin-top:4px}
  .p-stub .back-link{display:inline-flex;align-items:center;gap:7px;text-decoration:none;font:600 11px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;
    color:var(--accent-ink);padding:8px 16px;border-radius:20px;border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);transition:background .2s}
  .p-stub .back-link:hover{background:color-mix(in srgb,var(--accent) 12%,transparent)}
  .p-stub .back-link .ic{width:12px;height:12px;transition:transform .2s}
  .p-stub .back-link:hover .ic{transform:translateX(-3px)}

  /* Bottom status */
  .p-stub .bottom-bar{font:500 11px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted);display:flex;justify-content:space-between;border-top:1px solid var(--rule);padding-top:8px}
`

export function ComingSoon({
  world,
  icon,
  kicker,
  title,
  blurb,
  backTo,
  backLabel,
}: ComingSoonProps) {
  const reduce = useReducedMotion()

  useOneScreen()

  return (
    <main className="page p-stub" aria-label={`${title} in progress`}>
      <style>{CSS}</style>

      {/* Masthead */}
      <header className="masthead">
        <div>
          <div className="mast-kick">{kicker}</div>
          <h1 className="mast-title">{title}</h1>
        </div>
        <div className="mast-status">in progress</div>
      </header>

      {/* Centered Specimen Card */}
      <div className="specimen-wrap">
        <motion.div
          className="stub-card"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.md }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
        >
          {world === "artist" && <div className="washi" aria-hidden="true" />}

          <div className="stub-header">
            <div className="stub-ic">
              <Icon id={icon} />
            </div>
            <div>
              <div className="stub-meta">Entry Log // In Progress</div>
              <h2 className="stub-entry-name">{kicker} Spread</h2>
            </div>
          </div>

          <p className="stub-body">{blurb}</p>

          {world === "artist" ? (
            <div className="stub-hand">
              &ldquo;Entry pending field log transcription. No fabricated placeholders.&rdquo;
            </div>
          ) : (
            <div className="stub-meta" style={{ color: "var(--teal-ink)" }}>
              STATUS: TELEMETRY_PENDING // NO_FABRICATED_METRICS
            </div>
          )}

          <div className="stub-foot">
            <Link to={backTo} className="back-link">
              <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
                <Icon id="i-arrow" />
              </span>
              <span>{backLabel}</span>
            </Link>
            <div className="stub-meta">Honest state verified</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <footer className="bottom-bar">
        <span>Section: {world}</span>
        <span>Molecules to Metrics</span>
      </footer>
    </main>
  )
}
