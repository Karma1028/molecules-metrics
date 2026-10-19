/* Tiny shared flag, kept out of the three.js chunk: while a 3D transit owns the
   screen, the route wrapper and the world-switch morph stand down so the new
   page renders still and exactly where the effect expects it. */
let active = false

export const isTransiting = () => active
export const setTransiting = (v: boolean) => {
  active = v
}
