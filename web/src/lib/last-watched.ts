/** What the visitor last looked at in the artist world. Session-only, never leaves the browser. */
export interface Watched {
  kind: "frame"
  index: number
  total: number
  name: string
}

const KEY = "mm-last-watched"

export function setWatched(w: Watched): void {
  try { sessionStorage.setItem(KEY, JSON.stringify(w)) } catch { /* storage blocked: echo just stays empty */ }
}

export function getWatched(): Watched | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const w = JSON.parse(raw) as Watched
    return w && w.kind === "frame" && Number.isFinite(w.index) ? w : null
  } catch {
    return null
  }
}

export function clearWatched(): void {
  try { sessionStorage.removeItem(KEY) } catch { /* ignore */ }
}

export function echoLine(w: Watched | null): string {
  if (!w) return "nothing watched yet. go look."
  return `last watched -> frame ${w.index + 1} of ${w.total}, "${w.name}"`
}
