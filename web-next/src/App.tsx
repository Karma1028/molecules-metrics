import { useEffect, useState, type MouseEvent } from "react"
import { Home } from "./pages/Home"
import { Journey } from "./pages/Journey"
import { readStoredMode, writeStoredMode, type Mode } from "./lib/mode"

// Two routes, no router dependency: the site is two pages and a toggle.
function currentPath(): string {
  return window.location.pathname.replace(/\/$/, "") || "/"
}

export function App() {
  const [path, setPath] = useState(currentPath)
  const [mode, setMode] = useState<Mode>(() => readStoredMode() ?? "day")

  useEffect(() => {
    document.documentElement.dataset.mode = mode
    writeStoredMode(mode)
  }, [mode])

  useEffect(() => {
    const onPop = () => setPath(currentPath())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const go = (to: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (to === path) return
    window.history.pushState({}, "", to)
    setPath(to)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-nav">
        <div className="container nav-row">
          <a className="wordmark" href="/" onClick={go("/")}>Karma and Tuhin</a>
          <nav aria-label="Pages">
            <a href="/journey" onClick={go("/journey")} aria-current={path === "/journey" ? "page" : undefined}>
              Journey
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        {path === "/journey" ? (
          <Journey go={go} mode={mode} onMode={setMode} />
        ) : (
          <Home go={go} mode={mode} onMode={setMode} />
        )}
      </main>
    </>
  )
}
