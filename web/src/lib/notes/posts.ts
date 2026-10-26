import type { Post as MediumPost } from "../live"
import { parseFrontmatter } from "./frontmatter"

export type Source = "own" | "medium"

/** One piece of writing, wherever it lives. Own posts render here; Medium posts link out. */
export interface WritingEntry {
  id: string
  source: Source
  title: string
  /** ISO yyyy-mm-dd, or "" when unknown */
  date: string
  summary: string
  tags: string[]
  readMins: number
  /** own posts: route slug + markdown body */
  slug?: string
  body?: string
  /** medium posts: canonical url; own posts: the Medium copy, when cross-posted */
  url?: string
}

const WORDS_PER_MIN = 230

export function slugOf(path: string): string {
  return (path.split("/").pop() ?? path).replace(/\.md$/i, "")
}

export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MIN))
}

const str = (v: unknown): string => (typeof v === "string" ? v : "")

/** Markdown files (path -> raw text) to own posts: skips drafts and `_` templates, newest first. */
export function ownPostsFromRaw(files: Record<string, string>): WritingEntry[] {
  const posts: WritingEntry[] = []
  for (const [path, raw] of Object.entries(files)) {
    const slug = slugOf(path)
    if (slug.startsWith("_")) continue
    const { data, body } = parseFrontmatter(raw)
    if (data.draft === true) continue
    posts.push({
      id: `own:${slug}`,
      source: "own",
      title: str(data.title) || slug,
      date: str(data.date),
      summary: str(data.summary),
      tags: Array.isArray(data.tags) ? data.tags : [],
      readMins: readingMinutes(body),
      slug,
      body,
      url: str(data.medium) || undefined,
    })
  }
  return sortNewest(posts)
}

/** Strip query, hash and trailing slash so a Medium rss link matches its canonical form. */
export function canonicalUrl(u: string): string {
  try {
    const x = new URL(u)
    return `${x.origin}${x.pathname}`.replace(/\/+$/, "")
  } catch {
    return u.replace(/[?#].*$/, "").replace(/\/+$/, "")
  }
}

function isoDate(raw?: string): string {
  if (!raw) return ""
  const t = new Date(raw)
  return Number.isNaN(t.getTime()) ? "" : t.toISOString().slice(0, 10)
}

function sortNewest<T extends { date: string }>(xs: T[]): T[] {
  return [...xs].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

/** Own posts plus the one-way Medium mirror. A Medium post already cross-posted here is dropped. */
export function mergeWriting(own: WritingEntry[], medium?: MediumPost[]): WritingEntry[] {
  const mirrored = new Set(own.map((p) => p.url && canonicalUrl(p.url)).filter(Boolean))
  const remote: WritingEntry[] = (medium ?? [])
    .filter((m) => m.url && !mirrored.has(canonicalUrl(m.url)))
    .map((m) => ({
      id: `medium:${canonicalUrl(m.url)}`,
      source: "medium" as const,
      title: m.title,
      date: isoDate(m.published),
      summary: m.snippet ?? "",
      tags: [],
      readMins: 0,
      url: m.url,
    }))
  return sortNewest([...own, ...remote])
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "2026-02-10" or a full ISO stamp -> "10 Feb 2026" (UTC day, fixed locale so SSR/tests never drift). */
export function fmtDate(iso: string): string {
  if (!iso) return ""
  const t = new Date(iso)
  if (Number.isNaN(t.getTime())) return ""
  return `${t.getUTCDate()} ${MONTHS[t.getUTCMonth()]} ${t.getUTCFullYear()}`
}

const ROW_PX = 82 // height one list row needs
const CHROME_PX = 430 // header, tabs, chips, footer, page padding
/** How many list rows fit on one screen of `height` px, so the page never scrolls. */
export function rowsFor(height: number): number {
  return Math.min(6, Math.max(3, Math.floor((height - CHROME_PX) / ROW_PX)))
}

export function filterByTag<T extends { tags: string[] }>(items: T[], tag: string): T[] {
  return tag === "all" ? items : items.filter((i) => i.tags.includes(tag))
}

export function paginate<T>(items: T[], page: number, per: number): { items: T[]; page: number; pages: number } {
  const pages = Math.max(1, Math.ceil(items.length / per))
  const p = Math.min(Math.max(0, page), pages - 1)
  return { items: items.slice(p * per, p * per + per), page: p, pages }
}
