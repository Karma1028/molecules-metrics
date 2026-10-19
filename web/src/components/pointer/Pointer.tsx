import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"
import type { World } from "../../lib/theme"
import { pointerMemory, useFinePointer } from "./pointer-shared"
import { InkPointer } from "./InkPointer"
import { CrosshairPointer } from "./CrosshairPointer"
import "./pointer.css"

/**
 * "He watched, then he counted" (R2 spine), told by the pointer: in the artist
 * world you dribble the ball he watched; in the analyst world the same ball is
 * a data point under a crosshair that counts what you inspect. Crossing worlds
 * hands the ball off in place (a small rehearsal of the ball → chart wow).
 * Mouse/trackpad only; touch keeps the platform default.
 */
export function Pointer({ world }: { world: World }) {
  const fine = useFinePointer()
  const reduced = useReducedMotion() ?? false
  // read once per mount: did the pointer just arrive from the other world?
  const [handoff] = useState(() => pointerMemory.from !== null && pointerMemory.from !== world)
  useEffect(() => { pointerMemory.from = world }, [world])

  useEffect(() => {
    if (!fine) return
    const root = document.documentElement
    // hide the native cursor only once ours has a position (no blank cursor on load)
    const arm = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return
      root.dataset.pointer = world
      window.removeEventListener("pointermove", arm)
    }
    window.addEventListener("pointermove", arm, { passive: true })
    return () => {
      window.removeEventListener("pointermove", arm)
      delete root.dataset.pointer
    }
  }, [fine, world])

  if (!fine) return null
  return world === "artist" ? <InkPointer reduced={reduced} handoff={handoff} /> : <CrosshairPointer reduced={reduced} handoff={handoff} />
}
