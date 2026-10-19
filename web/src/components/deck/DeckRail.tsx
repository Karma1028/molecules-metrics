import { NavLink } from "react-router-dom"
import type { NavItem } from "../../lib/worlds"

/**
 * Section rail on the right edge: one tick per section of the deck, the current
 * one drawn long, with a counter. Shows the deck can be scrolled and where you
 * are in it; every tick is also a link.
 */
export function DeckRail({ nav, index }: { nav: NavItem[]; index: number }) {
  if (index < 0) return null
  return (
    <nav className="deck-rail" aria-label="sections">
      <span className="deck-count" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
        <i>/{String(nav.length).padStart(2, "0")}</i>
      </span>
      <ol>
        {nav.map((n, i) => (
          <li key={n.to}>
            <NavLink to={n.to} end={n.end} aria-label={n.label} title={n.label} className={i === index ? "on" : undefined}>
              <span className="deck-tip">{n.label}</span>
            </NavLink>
          </li>
        ))}
      </ol>
      <span className="deck-hint" aria-hidden="true">scroll</span>
    </nav>
  )
}
