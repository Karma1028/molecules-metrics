import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Icon } from "../../../lib/icons"
import { useFeed, useMedium, type FeedItem } from "../../../lib/live"
import { OWN_POSTS } from "../../../lib/notes/own"
import { filterByTag, fmtDate, mergeWriting, paginate, rowsFor, type WritingEntry } from "../../../lib/notes/posts"
import { preset, worldMotion } from "../../../lib/world-motion"

type Tab = "writing" | "papers" | "wire"

/** One list row, whatever it came from. `to` = in-site route, `href` = external link. */
interface Row {
  key: string
  title: string
  summary: string
  meta: string[]
  tags: string[]
  badge: string
  own?: boolean
  to?: string
  href?: string
}

const TAB_LABEL: Record<Tab, string> = { writing: "Writing", papers: "Papers", wire: "The wire" }
const INTEREST_FALLBACK: Record<string, string> = {
  football: "Football", data: "Data", ai: "AI", photo: "Photography", music: "Music", chem: "Chemistry",
}

const writingRow = (p: WritingEntry): Row => ({
  key: p.id,
  title: p.title,
  summary: p.summary,
  meta: [fmtDate(p.date), p.readMins ? `${p.readMins} min read` : ""].filter(Boolean),
  tags: p.tags,
  badge: p.source === "own" ? "On this site" : "Medium",
  own: p.source === "own",
  to: p.source === "own" ? `/artist/notes/${p.slug}` : undefined,
  href: p.source === "own" ? undefined : p.url,
})

const feedRow = (i: FeedItem): Row => ({
  key: i.link,
  title: i.title,
  summary: i.summary,
  meta: [fmtDate(i.date), i.score ? `${i.score} upvotes` : ""].filter(Boolean),
  tags: i.tags,
  badge: i.source ?? "Link",
  href: i.link,
})

function useRows(): number {
  const [n, setN] = useState(() => (typeof window === "undefined" ? 4 : rowsFor(window.innerHeight)))
  useEffect(() => {
    const on = () => setN(rowsFor(window.innerHeight))
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [])
  return n
}

function RowLink({ row, index }: { row: Row; index: number }) {
  const body = (
    <>
      <span className="rn">{String(index + 1).padStart(2, "0")}</span>
      <span className="rt">
        <span className="rt-t">{row.title}</span>
        {row.summary && <span className="rt-s">{row.summary}</span>}
        <span className="rt-m">
          <span className={`badge${row.own ? " own" : ""}`}>{row.badge}</span>
          {row.meta.map((m) => <span key={m}>{m}</span>)}
        </span>
      </span>
      <span className="re" aria-hidden="true"><Icon id="i-arrow" /></span>
    </>
  )
  return row.to ? (
    <Link className="row-a" to={row.to}>{body}</Link>
  ) : (
    <a className="row-a" href={row.href} target="_blank" rel="noopener noreferrer">{body}</a>
  )
}

export function NotesPanel({ reduce }: { reduce: boolean }) {
  const md = useMedium()
  const feed = useFeed()
  const per = useRows()
  const [picked, setPicked] = useState<Tab | null>(null)
  const [tag, setTag] = useState("all")
  const [page, setPage] = useState(0)

  const mediumPosts = !md.fallback ? md.data.posts : undefined
  const feedOk = !feed.fallback
  const labels = useMemo(() => {
    const map: Record<string, string> = { ...INTEREST_FALLBACK }
    for (const i of feed.data.interests ?? []) map[i.id] = i.label
    return map
  }, [feed.data.interests])

  const all: Record<Tab, Row[]> = useMemo(
    () => ({
      writing: mergeWriting(OWN_POSTS, mediumPosts).map(writingRow),
      papers: (feed.data.papers ?? []).map(feedRow),
      wire: (feed.data.news ?? []).map(feedRow),
    }),
    [mediumPosts, feed.data.papers, feed.data.news],
  )

  // Writing is mostly empty (few posts), so open on the tab with real content until the reader picks one
  const tab: Tab = picked ?? (all.writing.length < 3 && all.papers.length ? "papers" : "writing")
  const rows = filterByTag(all[tab], tag)
  const view = paginate(rows, page, per)
  const tags = useMemo(() => [...new Set(all[tab].flatMap((r) => r.tags))].filter((t) => labels[t] || tab === "writing"), [all, tab, labels])

  const go = (t: Tab) => { setPicked(t); setTag("all"); setPage(0) }
  const pick = (t: string) => { setTag(t); setPage(0) }
  const step = (d: number) => setPage(Math.min(view.pages - 1, Math.max(0, view.page + d)))

  const sources = [...new Set(rows.map((r) => r.badge))].slice(0, 4).join(" · ")
  const baked = feed.data.generatedAt ? fmtDate(feed.data.generatedAt) : ""
  const foot =
    tab === "writing"
      ? `${OWN_POSTS.length} on this site · Medium mirrors in automatically`
      : feedOk ? `${sources}${baked ? ` · refreshed ${baked}` : ""}` : "refreshes daily"

  const land = preset(worldMotion.artist.land, reduce)

  return (
    <section
      className="panel"
      aria-label="Field notes feed"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1)
        else if (e.key === "ArrowLeft") step(-1)
      }}
    >
      <div className="tabs" role="tablist" aria-label="Field notes sections">
        {(Object.keys(TAB_LABEL) as Tab[]).map((t) => (
          <button key={t} type="button" role="tab" className="tab" aria-selected={tab === t} onClick={() => go(t)}>
            {TAB_LABEL[t]}
            <sup>{all[t].length}</sup>
          </button>
        ))}
      </div>

      <div className="chips" role="group" aria-label="Filter by interest">
        {tags.length > 1 && (
          <>
            <button type="button" className="chip" aria-pressed={tag === "all"} onClick={() => pick("all")}>All</button>
            {tags.map((t) => (
              <button key={t} type="button" className="chip" aria-pressed={tag === t} onClick={() => pick(t)}>
                {labels[t] ?? t}
              </button>
            ))}
          </>
        )}
      </div>

      {view.items.length === 0 ? (
        <div className="empty" role="status">
          <div>
            <b>{tab === "writing" ? "Nothing published yet." : tag !== "all" ? "Nothing here for that interest today." : "The wire is quiet right now."}</b>
            {tab === "writing"
              ? "Posts written on this site and the Medium mirror both land here."
              : "It refreshes once a day, so check back tomorrow."}
          </div>
        </div>
      ) : (
        <motion.ul className="list" key={`${tab}-${tag}-${view.page}`} initial="hidden" animate="visible">
          {view.items.map((r, i) => (
            <motion.li key={r.key} variants={land} custom={i}>
              <RowLink row={r} index={view.page * per + i} />
            </motion.li>
          ))}
        </motion.ul>
      )}

      <div className="foot">
        <span className="src">{foot}</span>
        <div className="pg" aria-label="Pages">
          <button type="button" className="prev" aria-label="Previous page" disabled={view.page === 0} onClick={() => step(-1)}><Icon id="i-arrow" /></button>
          <span>{String(view.page + 1).padStart(2, "0")} / {String(view.pages).padStart(2, "0")}</span>
          <button type="button" className="next" aria-label="Next page" disabled={view.page >= view.pages - 1} onClick={() => step(1)}><Icon id="i-arrow" /></button>
        </div>
      </div>
    </section>
  )
}
