import { useEffect, useState } from "react"

/** Elements the pointer treats as targets (magnet in artist, lock-on in analyst). */
export const TARGET_SELECTOR =
  'a[href],button:not(:disabled),[role="button"],[role="tab"],select,summary,label[for],[data-magnet]'

/** Text fields keep the native caret; the custom pointer steps aside. */
export const TEXT_SELECTOR = 'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]),textarea,[contenteditable="true"]'

const FINE_QUERY = "(hover: hover) and (pointer: fine)"

/** True only on a mouse/trackpad device; touch gets no custom pointer. */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(FINE_QUERY).matches,
  )
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia(FINE_QUERY)
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return fine
}

export function targetOf(node: EventTarget | null): Element | null {
  return node instanceof Element ? node.closest(TARGET_SELECTOR) : null
}

export function isTextField(node: EventTarget | null): boolean {
  return node instanceof Element && node.closest(TEXT_SELECTOR) !== null
}

export function centreOf(el: Element): { x: number; y: number } {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- handlers are typed at the call site
type Listener = readonly [EventTarget, string, (e: any) => void, boolean?]

/**
 * Adds every listener (passive; 4th item = capture) and returns one cleanup
 * that removes them all and runs `onCleanup` (e.g. cancelAnimationFrame).
 */
export function listenAll(list: ReadonlyArray<Listener>, onCleanup: () => void): () => void {
  for (const [t, type, fn, capture] of list) t.addEventListener(type, fn, { passive: true, capture: !!capture })
  return () => {
    for (const [t, type, fn, capture] of list) t.removeEventListener(type, fn, { capture: !!capture })
    onCleanup()
  }
}

/**
 * Session memory shared by both pointers (module scope on purpose: the two
 * worlds mount different layouts, and the hand-off must survive that).
 * `from` = the world that drew the pointer last; `n` = controls inspected.
 */
export const pointerMemory = {
  x: -100,
  y: -100,
  from: null as "artist" | "analyst" | null,
  seen: new Set<string>(),
  n: 0,
}

/** Count a control once per session (by href or label, so a remounted link is not recounted); returns n. */
export function countSeen(key: string): number {
  if (key && !pointerMemory.seen.has(key)) {
    pointerMemory.seen.add(key)
    pointerMemory.n += 1
  }
  return pointerMemory.n
}

export const translate = (x: number, y: number) => `translate3d(${x}px, ${y}px, 0)`

/** the football's panel seams, drawn in a -10..10 box (artist pointer, landing intro) */
export const BALL_SEAM = "M0-3.6 3.4-1.1 2.1 2.9H-2.1L-3.4-1.1Z M0-3.6V-9 M3.4-1.1 8.6-2.8 M2.1 2.9 5.3 7.3 M-2.1 2.9-5.3 7.3 M-3.4-1.1-8.6-2.8"
