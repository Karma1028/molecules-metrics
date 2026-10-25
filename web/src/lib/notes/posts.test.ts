import { describe, expect, it } from "vitest"
import { parseFrontmatter } from "./frontmatter"
import { filterByTag, fmtDate, rowsFor, mergeWriting, ownPostsFromRaw, paginate, readingMinutes, slugOf } from "./posts"

const RAW = `---
title: "Counting what I watched"
date: 2026-09-01
summary: A note on counting.
tags: [data, football]
medium: https://medium.com/@tuhin.gim/counting-123
draft: false
---

# Hello

Some **bold** words here.
`

describe("parseFrontmatter", () => {
  it("reads scalars, quoted strings, lists and booleans", () => {
    const { data, body } = parseFrontmatter(RAW)
    expect(data.title).toBe("Counting what I watched")
    expect(data.date).toBe("2026-09-01")
    expect(data.tags).toEqual(["data", "football"])
    expect(data.draft).toBe(false)
    expect(body.trim().startsWith("# Hello")).toBe(true)
  })

  it("returns the whole text as body when there is no frontmatter", () => {
    const { data, body } = parseFrontmatter("just text")
    expect(data).toEqual({})
    expect(body).toBe("just text")
  })

  it("handles windows line endings", () => {
    const { data } = parseFrontmatter(RAW.replace(/\n/g, "\r\n"))
    expect(data.title).toBe("Counting what I watched")
  })
})

describe("slugOf", () => {
  it("takes the file name without extension", () => {
    expect(slugOf("../../content/notes/2026-09-counting.md")).toBe("2026-09-counting")
  })
})

describe("readingMinutes", () => {
  it("is at least one minute and scales with length", () => {
    expect(readingMinutes("short")).toBe(1)
    expect(readingMinutes("word ".repeat(900))).toBe(4)
  })
})

describe("ownPostsFromRaw", () => {
  it("builds posts, skips drafts and templates, sorts newest first", () => {
    const files = {
      "/c/a.md": RAW,
      "/c/b.md": RAW.replace("2026-09-01", "2026-10-01").replace("Counting what I watched", "Newer"),
      "/c/_template.md": RAW,
      "/c/d.md": RAW.replace("draft: false", "draft: true"),
    }
    const posts = ownPostsFromRaw(files)
    expect(posts.map((p) => p.title)).toEqual(["Newer", "Counting what I watched"])
    expect(posts[0].source).toBe("own")
    expect(posts[0].slug).toBe("b")
  })

  it("falls back to a dated-nothing post rather than throwing on bad frontmatter", () => {
    const posts = ownPostsFromRaw({ "/c/x.md": "---\ntitle: Only title\n---\nbody" })
    expect(posts).toHaveLength(1)
    expect(posts[0].date).toBe("")
  })
})

describe("mergeWriting", () => {
  const own = ownPostsFromRaw({ "/c/a.md": RAW })
  const medium = [
    { title: "Counting what I watched", url: "https://medium.com/@tuhin.gim/counting-123?source=rss", published: "Tue, 10 Feb 2026 04:43:07 GMT", snippet: "dup" },
    { title: "Apple Google", url: "https://medium.com/@tuhin.gim/apple-9", published: "Tue, 10 Feb 2026 04:43:07 GMT", snippet: "s" },
  ]

  it("drops a Medium post already mirrored here (same medium url, query ignored)", () => {
    const all = mergeWriting(own, medium)
    expect(all.map((p) => p.title)).toEqual(["Counting what I watched", "Apple Google"])
    expect(all.filter((p) => p.source === "medium")).toHaveLength(1)
  })

  it("sorts by date descending across sources", () => {
    const all = mergeWriting(own, medium)
    expect(all[0].source).toBe("own")
    expect(all[1].source).toBe("medium")
  })

  it("tolerates missing medium data", () => {
    expect(mergeWriting(own, undefined)).toHaveLength(1)
  })
})

describe("filterByTag", () => {
  const items = [
    { id: 1, tags: ["ai", "data"] },
    { id: 2, tags: ["football"] },
    { id: 3, tags: [] as string[] },
  ]
  it("returns everything for 'all'", () => {
    expect(filterByTag(items, "all")).toHaveLength(3)
  })
  it("keeps only items carrying the tag", () => {
    expect(filterByTag(items, "ai").map((i) => i.id)).toEqual([1])
    expect(filterByTag(items, "nope")).toEqual([])
  })
})

describe("rowsFor", () => {
  it("fits rows to the viewport height, within 3..6", () => {
    expect(rowsFor(500)).toBe(3)
    expect(rowsFor(760)).toBe(4)
    expect(rowsFor(1400)).toBe(6)
  })
})

describe("fmtDate", () => {
  it("formats ISO dates as '10 Feb 2026' in a fixed locale, empty stays empty", () => {
    expect(fmtDate("2026-02-10")).toBe("10 Feb 2026")
    expect(fmtDate("2026-02-10T23:59:00.000Z")).toBe("10 Feb 2026")
    expect(fmtDate("")).toBe("")
    expect(fmtDate("garbage")).toBe("")
  })
})

describe("paginate", () => {
  const items = Array.from({ length: 7 }, (_, i) => i)
  it("slices a page and reports the totals", () => {
    expect(paginate(items, 0, 3)).toEqual({ items: [0, 1, 2], page: 0, pages: 3 })
    expect(paginate(items, 2, 3)).toEqual({ items: [6], page: 2, pages: 3 })
  })
  it("clamps out-of-range pages and handles empty", () => {
    expect(paginate(items, 99, 3).page).toBe(2)
    expect(paginate(items, -4, 3).page).toBe(0)
    expect(paginate([], 0, 3)).toEqual({ items: [], page: 0, pages: 1 })
  })
})
