/** Minimal frontmatter reader for the notes markdown files: `key: value`, quoted strings, [a, b] lists, booleans. */
export type FrontValue = string | boolean | string[]

export interface Parsed {
  data: Record<string, FrontValue>
  body: string
}

const FENCE = /^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/

function unquote(s: string): string {
  const t = s.trim()
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1)
  return t
}

function value(raw: string): FrontValue {
  const t = raw.trim()
  if (t === "true") return true
  if (t === "false") return false
  if (t.startsWith("[") && t.endsWith("]")) {
    return t
      .slice(1, -1)
      .split(",")
      .map(unquote)
      .filter(Boolean)
  }
  return unquote(t)
}

export function parseFrontmatter(raw: string): Parsed {
  const text = raw.replace(/\r\n/g, "\n")
  const m = text.match(FENCE)
  if (!m) return { data: {}, body: text }
  const data: Record<string, FrontValue> = {}
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":")
    if (i < 1 || line.trimStart().startsWith("#")) continue
    data[line.slice(0, i).trim()] = value(line.slice(i + 1))
  }
  return { data, body: text.slice(m[0].length) }
}
