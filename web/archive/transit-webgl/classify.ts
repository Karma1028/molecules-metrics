/* Which 3D transit a navigation gets. Pure, so it is unit-tested. */
export type TransitName = "shatter" | "reactor" | "paper" | "glass"

const worldOf = (path: string) => {
  const seg = path.split("/")[1] ?? ""
  return seg === "artist" || seg === "analyst" ? seg : null
}

const clean = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p)

/** null = no transit (landing, same page, or unknown route). */
export function pickTransit(fromPath: string, toPath: string): TransitName | null {
  const from = clean(fromPath)
  const to = clean(toPath)
  if (from === to) return null
  const a = worldOf(from)
  const b = worldOf(to)
  if (!a || !b) return null
  if (a !== b) return b === "artist" ? "shatter" : "reactor"
  return a === "artist" ? "paper" : "glass"
}
