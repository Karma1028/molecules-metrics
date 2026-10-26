// Honest: there is no published longform yet. These entries are real threads the
// site already evidences, each linking to the actual built page, not an invented
// article. `mark` must be a verbatim substring of `gloss` (it is what the pencil
// underlines); annotations are built only from these fields.
export type LeafKind = "card" | "page" | "graph" | "kraft"

export interface Entry {
  no: string
  icon: string
  title: string
  gloss: string
  mark: string
  to: string
  read: string
  kind: LeafKind
  /** resting tilt on the desk, degrees */
  tilt: number
  /** resting position on the desk, % of desk box (left, top) */
  at: readonly [number, number]
}

export const ENTRIES: Entry[] = [
  { no: "N·01", icon: "i-scale", title: "Rigour, transferred", gloss: "Why a reactor and a regression are the same problem wearing different clothes.", mark: "the same problem", to: "/analyst/skills", read: "the skills", kind: "card", tilt: -3.2, at: [0, 1] },
  { no: "N·02", icon: "i-ball", title: "A match is a dataset", gloss: "Reading Barça ninety minutes at a time, by the numbers that actually move.", mark: "the numbers that actually move", to: "/artist/matchday", read: "the matchday", kind: "page", tilt: 2.4, at: [51, 3.5] },
  { no: "N·03", icon: "i-headphone", title: "Eight years, counted", gloss: "What 900+ logged listening hours quietly say about a person.", mark: "900+ logged listening hours", to: "/artist/sound", read: "the sound", kind: "graph", tilt: 1.8, at: [2, 52] },
  { no: "N·04", icon: "i-camera", title: "Ten frames worth keeping", gloss: "A small, honest edit from wherever the camera happened to be.", mark: "small, honest edit", to: "/artist/gallery", read: "the gallery", kind: "kraft", tilt: -2.2, at: [50, 50] },
]

/** Splits gloss around its pencil mark; falls back to plain text if the mark drifted. */
export function splitGloss(e: Entry): readonly [string, string, string] {
  const i = e.gloss.indexOf(e.mark)
  if (i < 0) return [e.gloss, "", ""]
  return [e.gloss.slice(0, i), e.mark, e.gloss.slice(i + e.mark.length)]
}
