// dev-only ?rm=1 reduced-motion QA switch; must run before anything reads matchMedia
import { RM_FORCED } from "./lib/rm-qa"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { printLetter } from "./lib/console-letter"
import { BrowserRouter } from "react-router-dom"
import { MotionConfig } from "motion/react"
import App from "./App"

// design system — base shell first, then the scoped world palettes
import "./styles/theme-base.css"
import "./styles/world-artist.css"
import "./styles/world-analyst.css"

// highlighter sweep plays on the first visit of a session only
const HL_KEY = "mm-hl-seen"
const HL_SWEEP_MS = 1400
try {
  if (sessionStorage.getItem(HL_KEY)) document.documentElement.classList.add("hl-seen")
  else window.setTimeout(() => {
    document.documentElement.classList.add("hl-seen")
    try { sessionStorage.setItem(HL_KEY, "1") } catch { /* storage blocked */ }
  }, HL_SWEEP_MS)
} catch {
  // storage blocked: let the sweep play every time
}

printLetter()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion={RM_FORCED ? "always" : "user"}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>
)
