// dev-only ?rm=1 reduced-motion QA switch; must run before anything reads matchMedia
import { RM_FORCED } from "./lib/rm-qa"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { MotionConfig } from "motion/react"
import App from "./App"

// design system — base shell first, then the scoped world palettes
import "./styles/theme-base.css"
import "./styles/world-artist.css"
import "./styles/world-analyst.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion={RM_FORCED ? "always" : "user"}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>
)
