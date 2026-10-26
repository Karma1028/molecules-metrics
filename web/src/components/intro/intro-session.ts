const KEY = "mm-intro-seen"

/** true once the intro has played this session; `?intro=1` replays it (QA) */
export function introSeen(): boolean {
  try {
    if (new URLSearchParams(window.location.search).get("intro") === "1") return false
    return sessionStorage.getItem(KEY) === "1"
  } catch {
    return false // storage blocked: play it, it is short and skippable
  }
}

export function markIntroSeen(): void {
  try { sessionStorage.setItem(KEY, "1") } catch { /* storage blocked */ }
}
