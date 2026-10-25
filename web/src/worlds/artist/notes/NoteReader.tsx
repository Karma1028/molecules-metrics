import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Icon } from "../../../lib/icons"
import { useOneScreen } from "../../../hooks/useOneScreen"
import { OWN_POSTS } from "../../../lib/notes/own"
import { fmtDate } from "../../../lib/notes/posts"
import { clampPage, pageCount, pageOffset } from "../../../lib/notes/paging"
import { renderMarkdown } from "../../../lib/notes/render"
import { PANEL_CSS } from "./panel-css"

const GAP_PX = 56
const SWIPE_PX = 48

/** One own post, read as flipping column pages so the screen never scrolls. */
export function NoteReader() {
  const { slug } = useParams()
  const post = OWN_POSTS.find((p) => p.slug === slug)
  const html = useMemo(() => (post?.body ? renderMarkdown(post.body) : ""), [post])

  const viewRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)
  const swipe = useRef<number | null>(null)
  const [vw, setVw] = useState(0)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)

  useOneScreen()

  // measure the viewport, then count pages once the columns have laid out
  useLayoutEffect(() => {
    const view = viewRef.current
    const flow = flowRef.current
    if (!view || !flow) return
    const measure = () => {
      const w = view.clientWidth
      setVw(w)
      requestAnimationFrame(() => {
        const n = pageCount(flow.scrollWidth, w, GAP_PX)
        setPages(n)
        setPage((p) => clampPage(p, n))
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(view)
    // images and late fonts change the flow length
    flow.querySelectorAll("img").forEach((img) => img.addEventListener("load", measure))
    void document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [html])

  useEffect(() => setPage(0), [slug])

  const go = (d: number) => setPage((p) => clampPage(p + d, pages))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) { e.preventDefault(); go(1) }
      else if (e.key === "ArrowLeft" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) { e.preventDefault(); go(-1) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  if (!post) {
    return (
      <main className="page p-nt p-nt-rd" aria-label="Post not found">
        <style>{PANEL_CSS}</style>
        <p className="rd-miss">
          No post by that name.<br />
          <Link to="/artist/notes">Back to Field Notes</Link>
        </p>
      </main>
    )
  }

  return (
    <main className="page p-nt p-nt-rd" aria-label={post.title}>
      <style>{PANEL_CSS}</style>
      <div className="rd-top">
        <Link to="/artist/notes"><Icon id="i-arrow" /> Field notes</Link>
        {post.url && <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ transform: "none" }}>Also on Medium</a>}
      </div>
      <h1 className="rd-h">{post.title}</h1>
      <div className="rd-meta">
        {[fmtDate(post.date), `${post.readMins} min read`, ...post.tags].filter(Boolean).map((m) => <span key={m}>{m}</span>)}
      </div>

      <div
        className="rd-view"
        ref={viewRef}
        onPointerDown={(e) => { swipe.current = e.clientX }}
        onPointerUp={(e) => {
          const x = swipe.current
          swipe.current = null
          if (x != null && Math.abs(e.clientX - x) > SWIPE_PX) go(e.clientX < x ? 1 : -1)
        }}
      >
        <div
          className="rd-flow"
          ref={flowRef}
          style={{
            ["--vw" as string]: `${vw || 600}px`,
            ["--gap" as string]: `${GAP_PX}px`,
            transform: `translateX(${-pageOffset(page, vw, GAP_PX)}px)`,
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <div className="rd-pg">
        <div className="rd-dots" aria-hidden="true">
          {Array.from({ length: pages }, (_, i) => <i key={i} className={i === page ? "on" : ""} />)}
        </div>
        <div className="pgb">
          <button type="button" className="prev" aria-label="Previous page" disabled={page === 0} onClick={() => go(-1)}><Icon id="i-arrow" /></button>
          <span>{String(page + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}</span>
          <button type="button" className="next" aria-label="Next page" disabled={page >= pages - 1} onClick={() => go(1)}><Icon id="i-arrow" /></button>
        </div>
      </div>
    </main>
  )
}
