import { useEffect, useRef, useState } from "react"

const COPIED_MS = 1800

/** Legacy path for browsers that block navigator.clipboard (insecure context, permissions). */
function execCopy(text: string): boolean {
  const ta = document.createElement("textarea")
  ta.value = text
  ta.setAttribute("readonly", "")
  ta.style.position = "fixed"
  ta.style.opacity = "0"
  document.body.appendChild(ta)
  ta.select()
  let ok = false
  try {
    ok = document.execCommand("copy")
  } catch {
    ok = false
  }
  document.body.removeChild(ta)
  return ok
}

/** Copy-to-clipboard with a short "copied" flag. Falls back to execCommand, then to the mail link. */
export function useCopy() {
  const [done, setDone] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const flash = () => {
    setDone(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setDone(false), COPIED_MS)
  }

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      flash()
    } catch {
      if (execCopy(text)) flash()
      else window.location.href = `mailto:${text}`
    }
  }
  return { done, copy }
}
