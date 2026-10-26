/** The visitor's own thread: one stitch per page opened this session. Never leaves the browser. */
export interface Stitch {
  path: string
}

const KEY = "mm-route-thread"
export const MAX_STITCHES = 24

const PALETTE: Record<string, string> = {
  artist: "var(--accent,#c2562a)",
  analyst: "var(--teal,#2aa198)",
}

export function getThread(): Stitch[] {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return []
    const v = JSON.parse(raw)
    return Array.isArray(v) ? v.filter((s): s is Stitch => typeof s?.path === "string") : []
  } catch {
    return []
  }
}

export function recordVisit(path: string): Stitch[] {
  const cur = getThread()
  if (cur.at(-1)?.path === path) return cur
  const next = [...cur, { path }].slice(-MAX_STITCHES)
  try { sessionStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage blocked: thread lives only in this render */ }
  return next
}

export function clearThread(): void {
  try { sessionStorage.removeItem(KEY) } catch { /* ignore */ }
}

export function stitchColor(path: string): string {
  const world = path.split("/").filter(Boolean)[0] ?? ""
  return PALETTE[world] ?? "var(--muted,#8a7a66)"
}
