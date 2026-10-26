// Day (Karma, the photographer) and night (Tuhin, the analyst). The choice is
// a per-viewer convenience, so every storage call is wrapped: it can be empty,
// throw, or be blocked, and the page must still render.

export type Mode = "day" | "night"

export const MODE_KEY = "karma-next-mode"

export function parseMode(value: string | null): Mode {
  return value === "night" ? "night" : "day"
}

function localStore(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readStoredMode(store: Storage | null = localStore()): Mode | null {
  try {
    const raw = store?.getItem(MODE_KEY) ?? null
    return raw === null ? null : parseMode(raw)
  } catch {
    return null
  }
}

export function writeStoredMode(mode: Mode, store: Storage | null = localStore()): void {
  try {
    store?.setItem(MODE_KEY, mode)
  } catch {
    // blocked storage: the toggle still works for this visit
  }
}
