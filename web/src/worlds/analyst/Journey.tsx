import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"
import { TwinDoor } from "../../components/TwinDoor"
import { MAP, PINS, STATIONS, cameraBox, graticule, project, routePath } from "./journey-stations"

const GRID = graticule()
const ROUTE = routePath()
const PIN_XY = PINS.map(project)
// a pin takes the colour of the first era that stood on it
const PIN_ACCENT = PINS.map((_, p) => STATIONS.find((s) => s.pin === p)?.accent ?? "pen")
const DRAW = motionTokens.duration.cinematic * 1.6
const LAST = STATIONS.length - 1
const STEM = 16

function labelAt(side: "left" | "right" | "below", x: number, y: number) {
  if (side === "below") return { x, y: y + 18, anchor: "middle" as const }
  return side === "right" ? { x: x + 13, y: y - STEM + 4, anchor: "start" as const } : { x: x - 13, y: y - STEM + 4, anchor: "end" as const }
}

const CSS = String.raw`
  .p-jn{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1200px;margin:0 auto;width:100%;overflow:hidden}
  .p-jn .jn-arc{display:flex;flex-direction:column;gap:4px;align-items:flex-end;text-align:right;white-space:nowrap}
  .p-jn .jn-arc .flow{font:600 10px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
    display:inline-flex;align-items:center;gap:8px}
  .p-jn .jn-arc .flow b{color:var(--ink)} .p-jn .jn-arc .flow .a{color:var(--accent)}
  .p-jn .jn-arc .flow .ic{width:12px;height:12px;color:var(--accent)}

  .p-jn .jgrid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,1fr);gap:clamp(14px,2vw,28px)}
  .p-jn .pen{color:var(--pen)} .p-jn .teal{color:var(--teal)} .p-jn .orange{color:var(--orange)}

  /* the plot: a lat/long frame, a route that draws itself, pins you can press */
  .p-jn .jmap{position:relative;min-height:0;border:1px solid var(--rule);border-radius:12px;background:var(--card);
    box-shadow:var(--shadow-sm);overflow:hidden}
  .p-jn .jmap svg{width:100%;height:100%;display:block}
  .p-jn .g-line{stroke:var(--rule);stroke-width:1}
  .p-jn .g-lab{font:500 9px var(--font-mono);fill:var(--muted);letter-spacing:.06em}
  /* road: a dark casing under a bright carve, like a drawn route on a map */
  .p-jn .casing{fill:none;stroke:color-mix(in srgb,var(--accent) 45%,var(--ink));stroke-width:6.5;stroke-linecap:round;stroke-linejoin:round;opacity:.55}
  .p-jn .carve{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
  .p-jn .signal{fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 6;stroke-linecap:round}
  /* pins stand on a stem; the head lifts on hover with a spring overshoot */
  .p-jn .pin{cursor:pointer;outline:none;transition:opacity .5s var(--ease)}
  .p-jn .pin .foot{fill:currentColor;opacity:.5}
  .p-jn .pin .stem{stroke:currentColor;stroke-width:2;transform-box:fill-box;transform-origin:50% 100%;
    transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
  .p-jn .pin .head{transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
  .p-jn .pin .dot{fill:var(--card);stroke:currentColor;stroke-width:2.4}
  .p-jn .pin .halo{fill:currentColor;opacity:0;transition:opacity .25s var(--ease)}
  .p-jn .pin:hover .head,.p-jn .pin.on .head{transform:translateY(-6px)}
  .p-jn .pin:hover .stem,.p-jn .pin.on .stem{transform:scaleY(1.375)}
  .p-jn .pin.on .dot{fill:currentColor}
  .p-jn .pin.on .halo,.p-jn .pin:hover .halo{opacity:.18}
  .p-jn .pin:focus-visible .halo{opacity:.32}
  .p-jn .pin-lab{font:600 11px var(--font-mono);letter-spacing:.08em;text-transform:uppercase;fill:var(--ink);
    paint-order:stroke;stroke:var(--card);stroke-width:3px}
  /* focusing: once you pick a stop, the others step back */
  .p-jn .jmap.focus .pin:not(.on){opacity:.4}
  .p-jn .jmap.focus .pin:not(.on) text{opacity:0}
  .p-jn .overview{position:absolute;top:10px;right:10px;background:var(--card);border:1px solid var(--rule);border-radius:16px;
    padding:5px 10px;font:600 9.5px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);cursor:pointer}
  .p-jn .overview:hover{color:var(--accent);border-color:var(--accent)}
  .p-jn .map-cap{position:absolute;left:14px;bottom:10px;font:500 9px/1 var(--font-mono);letter-spacing:.14em;
    text-transform:uppercase;color:var(--muted)}

  /* the station card + stepper */
  .p-jn .jside{min-height:0;display:flex;flex-direction:column;gap:clamp(10px,1.6vh,16px)}
  .p-jn .jcard{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:8px;
    background:var(--card);border:1px solid var(--rule);border-left:3px solid currentColor;border-radius:12px;
    box-shadow:var(--shadow-sm);padding:clamp(14px,2.4vh,26px) clamp(16px,1.8vw,24px)}
  .p-jn .jc-top{display:flex;align-items:center;gap:10px}
  .p-jn .jc-ic{width:18px;height:18px}
  .p-jn .jc-era{font:600 10px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase}
  .p-jn .jc-per{margin-left:auto;font:500 10px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
  .p-jn .jc-title{font:700 clamp(19px,2.1vw,27px)/1.1 var(--font-display);color:var(--ink);letter-spacing:-.015em;margin:2px 0 0;text-wrap:balance}
  .p-jn .jc-place{font:600 12px/1.35 var(--font-mono);color:var(--muted)}
  .p-jn .jc-metric{align-self:flex-start;font:700 clamp(20px,2.4vw,30px)/1 var(--font-mono);font-variant-numeric:tabular-nums;color:currentColor}
  .p-jn .jc-note{font-size:13px;line-height:1.45;color:var(--muted);text-wrap:pretty;margin:0}
  .p-jn .jc-nav{display:flex;gap:8px;margin-top:4px}
  .p-jn .jc-nav button{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid var(--rule);border-radius:20px;
    padding:6px 12px;font:600 10px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink);cursor:pointer}
  .p-jn .jc-nav button:hover:not(:disabled){border-color:var(--accent);color:var(--accent)}
  .p-jn .jc-nav button:disabled{opacity:.35;cursor:default}
  .p-jn .jc-nav .ic{width:11px;height:11px}
  .p-jn .jc-nav .prev .ic{transform:scaleX(-1)}

  .p-jn .jsteps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
  .p-jn .jstep{display:flex;flex-direction:column;gap:5px;width:100%;background:none;border:none;border-top:2px solid var(--rule);
    padding:7px 2px 0;cursor:pointer;text-align:left;color:var(--muted)}
  .p-jn .jstep .y{font:600 10px/1 var(--font-mono);font-variant-numeric:tabular-nums}
  .p-jn .jstep .t{font:500 10px/1.25 var(--font-body);overflow-wrap:anywhere}
  .p-jn .jstep.on{border-top-color:currentColor}
  .p-jn .jstep.on .y,.p-jn .jstep.on .t{color:var(--ink)}
  .p-jn .jstep:focus-visible{outline:1.5px solid var(--accent);outline-offset:2px}

  @media(max-width:760px){
    .p-jn .jn-arc{display:none}
    .p-jn .jgrid{grid-template-columns:1fr;grid-template-rows:minmax(0,1fr) auto auto;gap:10px}
    .p-jn .jmap{min-height:150px}
    .p-jn .jside{display:contents}
    .p-jn .jcard{flex:0 0 auto;gap:5px;padding:12px 14px}
    .p-jn .jc-note{font-size:12px}
    .p-jn .jstep .t{display:none}
  }
  @media(prefers-reduced-motion:reduce){
    .p-jn .pin,.p-jn .pin .halo,.p-jn .pin .head,.p-jn .pin .stem{transition:none}
  }
`

function stationsOn(pin: number): number[] {
  return STATIONS.flatMap((s, i) => (s.pin === pin ? [i] : []))
}

export function Journey() {
  const reduce = useReducedMotion()
  const [sel, setSel] = useState(0)
  // the map opens on the whole route; the camera only moves once a stop is chosen
  const [focus, setFocus] = useState(false)
  const station = STATIONS[sel]

  useOneScreen()

  const choose = (i: number) => {
    setSel(i)
    setFocus(true)
  }
  // a pin with two stations (Bankura) steps between them on repeat presses
  const pressPin = (p: number) => {
    const on = stationsOn(p)
    const at = on.indexOf(sel)
    choose(at === -1 ? on[0] : on[(at + 1) % on.length])
  }
  const step = (d: number) => choose(Math.max(0, Math.min(LAST, sel + d)))
  const camera = cameraBox(focus && !reduce ? PIN_XY[station.pin] : null)
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      step(1)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      step(-1)
    }
  }

  const draw = reduce
    ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: DRAW, ease: motionTokens.easing.glide },
      }
  const swap = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: motionTokens.duration.fast } }
    : {
        initial: { opacity: 0, y: motionTokens.distance.sm, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -motionTokens.distance.sm, filter: "blur(4px)" },
        transition: { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth },
      }

  return (
    <main className="page p-jn" aria-label="Career and academic journey" onKeyDown={onKey}>
      <style>{CSS}</style>

      <LogHeader
        log="LOG.03"
        section="JOURNEY"
        tag="2008-2027"
        title="From reactors to regressions."
        lede={<>A straight line through <b>chemical engineering</b>, a Celebal BI internship, and a Big Data Analytics PGDM. Same instinct throughout: <b>measure, tune, de-bottleneck</b>.</>}
        right={
          <div className="jn-arc">
            <TwinDoor to="/artist/about" label="The person behind the path" world="artist" />
            <span className="flow">
              <b>chem-eng</b> <Icon id="i-arrow" /> <span className="a">analytics</span>
            </span>
          </div>
        }
      />

      <div className="jgrid">
        <figure className={`jmap${focus ? " focus" : ""}`} aria-label="Route map: Bankura, Kolkata, Jaipur, Goa, then remote from home in Bankura">
          <motion.svg
            initial={false}
            animate={{ viewBox: camera }}
            transition={{ duration: motionTokens.duration.slow * 1.4, ease: motionTokens.easing.smooth }}
            preserveAspectRatio="xMidYMid meet"
            role="group"
            aria-label="stations"
          >
            <g aria-hidden="true">
              {GRID.lons.map((g) => (
                <g key={g.label}>
                  <line className="g-line" x1={g.x} x2={g.x} y1={MAP.pad.y} y2={MAP.h - MAP.pad.y} />
                  <text className="g-lab" x={g.x + 4} y={MAP.pad.y - 10}>{g.label}</text>
                </g>
              ))}
              {GRID.lats.map((g) => (
                <g key={g.label}>
                  <line className="g-line" x1={MAP.pad.x} x2={MAP.w - MAP.pad.x} y1={g.y} y2={g.y} />
                  <text className="g-lab" x={6} y={g.y + 3}>{g.label}</text>
                </g>
              ))}
              <motion.path className="casing" d={ROUTE.travel} {...draw} />
              <motion.path className="carve" d={ROUTE.travel} {...draw} />
              <motion.path
                className="signal"
                d={ROUTE.signal}
                initial={{ opacity: reduce ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : DRAW, duration: motionTokens.duration.slow }}
              />
            </g>

            {PINS.map((pin, p) => {
              const [x, y] = PIN_XY[p]
              const on = station.pin === p
              const lab = labelAt(pin.side, x, y)
              return (
                <motion.g
                  key={pin.label}
                  className={`pin ${PIN_ACCENT[p]}${on ? " on" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`${pin.label}: ${stationsOn(p).map((i) => STATIONS[i].title).join(", ")}`}
                  onClick={() => pressPin(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      pressPin(p)
                    }
                  }}
                  initial={reduce ? false : { opacity: 0, y: motionTokens.distance.sm }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : (DRAW * p) / (PINS.length - 1), duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
                >
                  <circle className="foot" cx={x} cy={y} r={2.5} />
                  <line className="stem" x1={x} x2={x} y1={y} y2={y - STEM} />
                  <g className="head">
                    <circle className="halo" cx={x} cy={y - STEM} r={18} />
                    <circle className="dot" cx={x} cy={y - STEM} r={6.5} />
                  </g>
                  <text className="pin-lab" x={lab.x} y={lab.y} textAnchor={lab.anchor}>
                    {pin.label}
                  </text>
                </motion.g>
              )
            })}
          </motion.svg>
          {focus && (
            <button className="overview" onClick={() => setFocus(false)}>
              whole route
            </button>
          )}
          <figcaption className="map-cap">plotted on lat/long · not to scale</figcaption>
        </figure>

        <div className="jside">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={sel} className={`jcard ${station.accent}`} aria-live="polite" {...swap}>
              <div className="jc-top">
                <Icon id={station.icon} className="ic jc-ic" />
                <span className="jc-era">{station.era}</span>
                <span className="jc-per">{station.period}</span>
              </div>
              <h2 className="jc-title">{station.title}</h2>
              <div className="jc-place">{station.place}</div>
              <div className="jc-metric">{station.metric}</div>
              <p className="jc-note">{station.note}</p>
              <div className="jc-nav">
                <button className="prev" onClick={() => step(-1)} disabled={sel === 0} aria-label="previous station">
                  <Icon id="i-arrow" /> prev
                </button>
                <button onClick={() => step(1)} disabled={sel === LAST} aria-label="next station">
                  next <Icon id="i-arrow" />
                </button>
              </div>
            </motion.article>
          </AnimatePresence>

          <ol className="jsteps" aria-label="stations in order">
            {STATIONS.map((s, i) => (
              <li key={s.title}>
                <button
                  className={`jstep ${s.accent}${i === sel ? " on" : ""}`}
                  aria-current={i === sel ? "step" : undefined}
                  onClick={() => choose(i)}
                >
                  <span className="y">{s.period.slice(0, 4)}</span>
                  <span className="t">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  )
}
