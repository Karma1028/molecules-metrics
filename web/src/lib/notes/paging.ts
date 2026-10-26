/** Pure maths for the Field Notes reader, which flips horizontal column pages instead of scrolling. */

/** Pages in a CSS-columns flow of `scrollWidth`, one `viewportWidth` column per page. */
export function pageCount(scrollWidth: number, viewportWidth: number, gap: number): number {
  if (viewportWidth <= 0) return 1
  return Math.max(1, Math.ceil((scrollWidth + gap) / (viewportWidth + gap) - 1e-6))
}

export function pageOffset(page: number, viewportWidth: number, gap: number): number {
  return page * (viewportWidth + gap)
}

export function clampPage(page: number, pages: number): number {
  return Math.min(Math.max(0, page), Math.max(0, pages - 1))
}
