import { useEffect } from "react"

/**
 * Page layout mode flag on <html>.
 * - "toc"        -> data-toc        (world home index pages)
 * - "one-screen" -> data-one-screen (every other page: fits the viewport, no scroll)
 * Set on mount, removed on unmount. Replaces the effect that was copy-pasted per page (K1).
 */
export type OneScreenMode = "toc" | "one-screen"

const DATASET_KEY: Record<OneScreenMode, "toc" | "oneScreen"> = {
  toc: "toc",
  "one-screen": "oneScreen",
}

export function useOneScreen(mode: OneScreenMode = "one-screen") {
  useEffect(() => {
    const key = DATASET_KEY[mode]
    const ds = document.documentElement.dataset
    ds[key] = ""
    return () => {
      delete ds[key]
    }
  }, [mode])
}
