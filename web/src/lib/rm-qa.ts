/**
 * Dev-only reduced-motion QA switch (K8).
 *
 * `?rm=1` forces reduced motion everywhere so it can be QA'd without toggling the OS
 * preference: sets `<html data-rm>`, makes `matchMedia('(prefers-reduced-motion...)')`
 * report true (motion's useReducedMotion, theme.ts, Landing all read it), and rewrites
 * every `@media (prefers-reduced-motion: reduce)` CSS block to apply unconditionally,
 * including page <style> tags mounted later. Sticky for the tab via sessionStorage;
 * `?rm=0` turns it off. Stripped from production builds (import.meta.env.DEV gate).
 *
 * Import this FIRST in main.tsx so the matchMedia patch lands before any reader.
 */
const STORE = "mm-rm"
const RM_QUERY = /prefers-reduced-motion/

function readFlag(): boolean {
  try {
    const q = new URLSearchParams(window.location.search).get("rm")
    if (q === "1") sessionStorage.setItem(STORE, "1")
    if (q === "0") sessionStorage.removeItem(STORE)
    return sessionStorage.getItem(STORE) === "1"
  } catch {
    return new URLSearchParams(window.location.search).get("rm") === "1"
  }
}

function patchMatchMedia() {
  const native = window.matchMedia.bind(window)
  window.matchMedia = (query: string): MediaQueryList => {
    const mql = native(query)
    if (!RM_QUERY.test(query) || /no-preference/.test(query)) {
      return RM_QUERY.test(query) ? fakeMql(query, false, mql) : mql
    }
    return fakeMql(query, true, mql)
  }
}

function fakeMql(query: string, matches: boolean, base: MediaQueryList): MediaQueryList {
  return {
    matches,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    __proto__: base,
  } as unknown as MediaQueryList
}

function patchRules(rules: CSSRuleList) {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSMediaRule) {
      const txt = rule.media.mediaText
      if (RM_QUERY.test(txt)) {
        rule.media.mediaText = /no-preference/.test(txt) ? "not all" : "all"
      }
      patchRules(rule.cssRules)
    }
  }
}

function patchSheet(sheet: CSSStyleSheet | null) {
  if (!sheet) return
  try {
    patchRules(sheet.cssRules)
  } catch {
    /* cross-origin sheet, skip */
  }
}

function patchAllSheets() {
  for (const s of Array.from(document.styleSheets)) patchSheet(s)
}

export const RM_FORCED = import.meta.env.DEV && typeof window !== "undefined" && readFlag()

if (RM_FORCED) {
  document.documentElement.dataset.rm = ""
  patchMatchMedia()
  patchAllSheets()
  // page CSS strings mount as <style> later; Vite HMR swaps sheets too
  new MutationObserver((muts) => {
    let hit = false
    for (const m of muts) {
      for (const n of Array.from(m.addedNodes)) {
        if (n instanceof Element && (n.matches("style,link") || n.querySelector("style"))) hit = true
      }
      const t = m.target
      if (t instanceof HTMLStyleElement || t.parentNode instanceof HTMLStyleElement) hit = true
    }
    if (hit) requestAnimationFrame(patchAllSheets)
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true })
}
