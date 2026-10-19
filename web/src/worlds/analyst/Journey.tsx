import { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"
import { TwinDoor } from "../../components/TwinDoor"
import { MAP, PINS, STATIONS, graticule, project, routePath } from "./journey-stations"
import { DetailCard } from "./journey/DetailCard"
import { Scrubber } from "./journey/Scrubber"
import { PANEL_CSS, SCRUB_CSS } from "./journey/journey-css"
import { SPANS, T0, stationAt } from "./journey/timeline"
import { camera } from "./journey/camera"
import { useBoxSize } from "./journey/useFitScale"

const GRID = graticule()
const LON_GAP = GRID.lons[1].x - GRID.lons[0].x
// map text never renders below these pixel sizes, whatever the map's size on screen
const GRID_PX = 10.5
const PIN_PX = 11
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

  .p-jn .jgrid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,1fr);
    grid-template-rows:minmax(0,1fr) auto;gap:clamp(10px,1.6vh,16px) clamp(14px,2vw,28px)}
  .p-jn .jscrub{grid-column:1 / -1}
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
  .p-jn .pin{cursor:pointer;outline:none;transition:opacity ${motionTokens.duration.normal}s var(--ease)}
  .p-jn .pin .foot{fill:currentColor;opacity:.5}
  .p-jn .pin .stem{stroke:currentColor;stroke-width:2;transform-box:fill-box;transform-origin:50% 100%;
    transition:transform ${motionTokens.duration.normal}s var(--spring)}
  .p-jn .pin .head{transition:transform ${motionTokens.duration.normal}s var(--spring)}
  .p-jn .pin .dot{fill:var(--card);stroke:currentColor;stroke-width:2.4}
  .p-jn .pin .halo{fill:currentColor;opacity:0;transition:opacity ${motionTokens.duration.fast}s var(--ease)}
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
  .p-jn .map-cap{position:absolute;left:14px;bottom:10px;font:500 10px/1 var(--font-mono);letter-spacing:.14em;
    text-transform:uppercase;color:var(--muted)}

  @media(max-width:760px){
    .p-jn .log-head{flex-wrap:wrap;row-gap:5px;margin-bottom:6px;padding-bottom:6px}
    .p-jn .log-head .lh-mono{margin-bottom:4px}
    .p-jn .log-head .lh-lede{margin-top:4px}
    .p-jn .log-head .lh-lede{font-size:10.5px;line-height:1.3}
    .p-jn .log-head .lh-right{width:100%}
    .p-jn .jn-arc{flex-direction:row;align-items:center;justify-content:space-between;gap:8px;width:100%}
    .p-jn .jn-arc .td-label,.p-jn .jn-arc .td-arr{font-size:10px;letter-spacing:.06em}
    .p-jn .jn-arc .flow{letter-spacing:.04em;gap:4px}
    .p-jn .jgrid{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto auto;gap:6px}
    .p-jn .jcard{padding:8px 12px}
    .p-jn .overview{top:auto;bottom:6px;right:6px}
    .p-jn .map-cap{left:10px;bottom:9px;letter-spacing:.04em}
  }
  @media(prefers-reduced-motion:reduce){
    .p-jn .pin,.p-jn .pin .halo,.p-jn .pin .head,.p-jn .pin .stem{transition:none}
  }
${PANEL_CSS}
${SCRUB_CSS}
`

function stationsOn(pin: number): number[] {
  return STATIONS.flatMap((s, i) => (s.pin === pin ? [i] : []))
}

export function Journey() {
  const reduce = useReducedMotion()
  // the scrubber holds a point in time; the live step is whatever spans it
  const [t, setT] = useState(T0)
  // the map opens on the whole route; the camera only moves once a stop is chosen
  const [focus, setFocus] = useState(false)
  const sel = stationAt(t)
  const station = STATIONS[sel]
  const mapRef = useRef<HTMLElement>(null)
  const box = useBoxSize(mapRef)

  useOneScreen()

  const scrub = (next: number) => {
    setT(next)
    setFocus(true)
  }
  const choose = (i: number) => scrub(SPANS[i].start)
  // a pin with two stations (Bankura) steps between them on repeat presses
  const pressPin = (p: number) => {
    const on = stationsOn(p)
    const at = on.indexOf(sel)
    choose(at === -1 ? on[0] : on[(at + 1) % on.length])
  }
  const step = (d: number) => choose(Math.max(0, Math.min(LAST, sel + d)))
  const cam = camera(box, focus && !reduce ? PIN_XY[station.pin] : null)
  // user units per screen pixel at the current camera, so labels stay legible
  const unit = 1 / Math.max(0.01, cam.ppu)
  const gridFont = GRID_PX * unit
  const pinFont = Math.max(PIN_PX, PIN_PX * unit)
  // on a very small map, label every other meridian so the numbers never collide
  const lonEvery = gridFont * 2.9 + 8 > LON_GAP ? 2 : 1
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
        <figure ref={mapRef} className={`jmap${focus ? " focus" : ""}`} aria-label="Route map: Bankura, Kolkata, Jaipur, Goa, then remote from home in Bankura">
          <motion.svg
            initial={false}
            animate={{ viewBox: cam.viewBox }}
            transition={{ duration: motionTokens.duration.cinematic, ease: motionTokens.easing.smooth }}
            preserveAspectRatio="xMidYMid meet"
            role="group"
            aria-label="stations"
          >
            <g aria-hidden="true">
              {GRID.lons.map((g, k) => (
                <g key={g.label}>
                  <line className="g-line" x1={g.x} x2={g.x} y1={MAP.pad.y} y2={MAP.h - MAP.pad.y} />
                  {k % lonEvery === 0 && (
                    <text className="g-lab" x={g.x + 4} y={MAP.pad.y - 8} style={{ fontSize: gridFont }}>{g.label}</text>
                  )}
                </g>
              ))}
              {GRID.lats.map((g) => (
                <g key={g.label}>
                  <line className="g-line" x1={MAP.pad.x} x2={MAP.w - MAP.pad.x} y1={g.y} y2={g.y} />
                  <text className="g-lab" x={6} y={g.y + gridFont / 3} style={{ fontSize: gridFont }}>{g.label}</text>
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
                  <text className="pin-lab" x={lab.x} y={lab.y} textAnchor={lab.anchor} style={{ fontSize: pinFont }}>
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

        <DetailCard sel={sel} />
        <Scrubber t={t} sel={sel} onScrub={scrub} onStep={step} onJump={choose} />
      </div>
    </main>
  )
}
