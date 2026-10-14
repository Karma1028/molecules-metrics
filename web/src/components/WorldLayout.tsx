import { Suspense, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useWorldTheme, type World } from "../lib/theme"
import { WORLDS, SOCIAL } from "../lib/worlds"
import { Icon, SpriteMount } from "../lib/icons"
import { routeVariants } from "../lib/world-motion"
import { WorldTransition } from "./WorldTransition"
import { AlponaCorner } from "./motifs/Alpona"

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
  const { toggle } = useWorldTheme(world)
  const def = WORLDS[world]
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = useLocation()
  const reduce = useReducedMotion()

  return (
    <>
      <SpriteMount />
      <WorldTransition world={world} />
      <div className="bg" />
      <div className="grain" />
      {world === "artist" && (
        <>
          <AlponaCorner className="alpona-flourish tl" />
          <AlponaCorner className="alpona-flourish br" />
        </>
      )}

      <header className="nav">
        <NavLink to={def.home} className="brand" end>
          tuhin<b>.</b>
          <span className="v">/{world}</span>
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
              the <b>{def.otherLabel}</b>
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

      <AnimatePresence mode="wait">
        <motion.div
          key={loc.pathname}
          variants={routeVariants(world, reduce)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Suspense fallback={<RouteFallback world={world} />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </AnimatePresence>

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
