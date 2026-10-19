import { Suspense, useState } from "react"
import { Link, NavLink, useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useWorldTheme, type World } from "../lib/theme"
import { WORLDS, SOCIAL } from "../lib/worlds"
import { Icon, SpriteMount } from "../lib/icons"
import { routeVariants } from "../lib/world-motion"
import { deckIndex, travelBetween, type Travel } from "../lib/deck"
import { DeckRail } from "./deck/DeckRail"
import { DeckTunnel } from "./deck/DeckTunnel"
import { DeckSeam } from "./deck/DeckSeam"
import { useDeckScroll } from "./deck/useDeckScroll"
import { AlponaCorner } from "./motifs/Alpona"
import { Pointer } from "./pointer/Pointer"

/** Shown while a lazy page chunk loads (K5). Artist = hand note, analyst = mono readout. */
function RouteFallback({ world }: { world: World }) {
  return (
    <div className={`route-fallback rf-${world}`} role="status" aria-live="polite">
      {world === "artist" ? "turning the page" : "> loading module"}
    </div>
  )
}

function Eclipse({ onToggle }: { onToggle: (o: { x: number; y: number }) => void }) {
  return (
    <button
      className="eclipse"
      aria-label="toggle theme"
      onClick={(e) => onToggle({ x: e.clientX, y: e.clientY })}
    >
      <svg viewBox="0 0 30 30" aria-hidden="true">
        <g className="ray-g">
          {Array.from({ length: 8 }).map((_, k) => (
            <line
              key={k}
              className="ray"
              x1="15"
              y1="1"
              x2="15"
              y2="4.5"
              transform={`rotate(${k * 45} 15 15)`}
            />
          ))}
        </g>
        <circle className="core" cx="15" cy="15" r="8.5" />
        <circle className="cut" cx="15" cy="15" r="8.5" />
      </svg>
    </button>
  )
}

export function WorldLayout({ world }: { world: World }) {
  // A world switch reuses this layout: the leaving page finishes its exit in the
  // old world's skin, and only then do theme, header and backdrop flip over.
  const [shown, setShown] = useState<World>(world)
  const { toggle } = useWorldTheme(shown)
  const def = WORLDS[shown]
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = useLocation()
  const outlet = useOutlet()
  const reduce = useReducedMotion()
  // each navigation closes the phone drawer and sets which way the deck travels
  const [lastPath, setLastPath] = useState(loc.pathname)
  const [travel, setTravel] = useState<Travel>({ dir: 1, cross: false })
  const [hop, setHop] = useState(0)
  // perspective makes .deck-stage the box for position:fixed children, so it is
  // only switched on while a move plays; at rest full-bleed scenes reach the footer
  const [moving, setMoving] = useState(false)
  if (lastPath !== loc.pathname) {
    setTravel(travelBetween(lastPath, loc.pathname))
    setHop((h) => h + 1)
    setMoving(true)
    setLastPath(loc.pathname)
    setMenuOpen(false)
  }
  useDeckScroll(!menuOpen)

  return (
    <>
      <SpriteMount />
      <div className="bg" />
      <div className="grain" />
      <Pointer world={shown} />
      {shown === "artist" && (
        <>
          <AlponaCorner className="alpona-flourish tl" />
          <AlponaCorner className="alpona-flourish br" />
        </>
      )}

      <header className="nav">
        <NavLink to={def.home} className="brand" end>
          tuhin<b>.</b>
          <span className="v">/{shown}</span>
        </NavLink>

        <nav className={`links${menuOpen ? " open" : ""}`}>
          {def.nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="tools">
          <Link className="cover-btn" to="/" aria-label="back to cover" title="Back to cover">
            <Icon id="i-home" />
            <span>cover</span>
          </Link>
          <NavLink className="wswitch" to={WORLDS[def.other].home}>
            <Icon id={def.otherIcon} />
            <span>
              <span className="the">the </span>
              <b>{def.otherLabel}</b>
            </span>
          </NavLink>
          <Eclipse onToggle={toggle} />
          <button
            className="menu-btn"
            aria-label="menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon id="i-menu" />
          </button>
        </div>
      </header>

      {hop > 0 && !reduce && !travel.cross && deckIndex(loc.pathname) >= 0 && (
        <DeckTunnel key={hop} world={world} nav={WORLDS[world].nav} dest={deckIndex(loc.pathname)} dir={travel.dir} />
      )}
      {hop > 0 && !reduce && travel.cross && <DeckSeam key={hop} />}
      <div className="deck-stage" data-moving={moving || undefined}>
        <AnimatePresence mode="wait" custom={travel} onExitComplete={() => setShown(world)}>
          <motion.div
            key={loc.pathname}
            className="deck-page"
            custom={travel}
            variants={routeVariants(shown, reduce)}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={(def) => def === "visible" && setMoving(false)}
          >
            <Suspense fallback={<RouteFallback world={world} />}>{outlet}</Suspense>
          </motion.div>
        </AnimatePresence>
      </div>
      <DeckRail nav={WORLDS[world].nav} index={deckIndex(loc.pathname)} />

      <footer className="foot">
        <span>
          © {new Date().getFullYear()} Tuhin Bhattacharya · molecules → metrics
        </span>
        <div className="cols">
          <Link to={WORLDS[def.other].home}>enter the {def.otherLabel.toLowerCase()} →</Link>
          <a href={SOCIAL.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener">
            Instagram
          </a>
          <a href={`mailto:${SOCIAL.email}`}>Email</a>
        </div>
      </footer>
    </>
  )
}
