/** Radius (px) of the lit circle under the lantern. */
export const LANTERN_RADIUS = 150
export const SOFT_EDGE = 90

/** Dark overlay with a soft hole at (x, y): the photo shows only where the lantern shines. */
export function lanternMask(x: number, y: number): string {
  return `radial-gradient(circle ${LANTERN_RADIUS + SOFT_EDGE}px at ${x}px ${y}px, transparent ${LANTERN_RADIUS - SOFT_EDGE}px, rgba(8,6,5,.94) ${LANTERN_RADIUS + SOFT_EDGE}px)`
}

export function pointInBox(clientX: number, clientY: number, box: { left: number; top: number }) {
  return { x: clientX - box.left, y: clientY - box.top }
}
