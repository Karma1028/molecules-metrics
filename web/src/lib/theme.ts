import { useCallback, useLayoutEffect, useState } from "react"

export type World = "artist" | "analyst"
export type Theme = "light" | "dark"

/**
 * Theme is remembered PER WORLD (C1): the artist world defaults light, the analyst
 * world defaults dark, and flipping one never repaints the other.
 */
export const themeKey = (world: World) => `nb-theme-${world}`
export const defaultTheme = (world: World): Theme => (world === "analyst" ? "dark" : "light")

export function initialTheme(world: World): Theme {
  try {
    const stored = localStorage.getItem(themeKey(world))
    if (stored === "light" || stored === "dark") return stored
  } catch {
    /* storage blocked — fall through to world default */
  }
  return defaultTheme(world)
}

/**
 * Drives <html> data-world / data-mode / data-theme and owns the eclipse
 * toggle. data-mode mirrors the world so the scoped world CSS applies.
 */
export function useWorldTheme(world: World) {
  const [theme, setTheme] = useState<Theme>(() => initialTheme(world))
  // the layout can be reused across worlds; re-read that world's own choice in
  // the same render, so the new world never paints a frame in the old theme
  const [themeWorld, setThemeWorld] = useState(world)
  if (themeWorld !== world) {
    setThemeWorld(world)
    setTheme(initialTheme(world))
  }

  // keep <html> attributes in sync before paint
  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.world = world
    root.dataset.mode = world
    root.dataset.theme = theme
  }, [world, theme])

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark"
      const apply = () => {
        setTheme(next)
        try {
          localStorage.setItem(themeKey(world), next)
        } catch {
          /* ignore */
        }
      }
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> }
      }
      const reduced =
        typeof window !== "undefined" &&
        !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      if (!doc.startViewTransition || reduced || !origin) {
        apply()
        return
      }
      const { x, y } = origin
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      const t = doc.startViewTransition(apply)
      t.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 540, easing: "cubic-bezier(.76,0,.24,1)", pseudoElement: "::view-transition-new(root)" }
        )
      })
    },
    [theme, world]
  )

  return { theme, toggle }
}
