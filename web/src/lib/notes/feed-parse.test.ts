import { describe, expect, it } from "vitest"
import { dedupeSort, fromHfDaily, parseFeed, tagByInterest } from "../../../scripts/feed-parse.mjs"

const RSS = `<?xml version="1.0"?><rss><channel>
<item><title><![CDATA[Barça &amp; the press: a study]]></title><link>https://ex.com/a?utm=1</link>
<pubDate>Tue, 10 Feb 2026 04:43:07 GMT</pubDate>
<description><![CDATA[<p>Pressing <b>numbers</b> &amp; more.</p>]]></description></item>
<item><title>Second</title><link>https://ex.com/b</link><pubDate>Mon, 09 Feb 2026 00:00:00 GMT</pubDate><description>plain</description></item>
</channel></rss>`

const ATOM = `<feed xmlns="http://www.w3.org/2005/Atom">
<entry><title>Attention variants for tabular data</title><id>http://arxiv.org/abs/2601.00001v1</id>
<link href="http://arxiv.org/abs/2601.00001v1" rel="alternate" type="text/html"/>
<updated>2026-01-05T10:00:00Z</updated><published>2026-01-04T09:00:00Z</published>
<summary>  We study   attention
 for tables.  </summary></entry></feed>`

describe("parseFeed", () => {
  it("reads RSS items, decodes entities and strips html", () => {
    const items = parseFeed(RSS)
    expect(items).toHaveLength(2)
    expect(items[0].title).toBe("Barça & the press: a study")
    expect(items[0].link).toBe("https://ex.com/a?utm=1")
    expect(items[0].date).toBe("2026-02-10T04:43:07.000Z")
    expect(items[0].summary).toBe("Pressing numbers & more.")
  })

  it("reads Atom entries (link href, published date, collapsed whitespace)", () => {
    const [e] = parseFeed(ATOM)
    expect(e.title).toBe("Attention variants for tabular data")
    expect(e.link).toBe("http://arxiv.org/abs/2601.00001v1")
    expect(e.date).toBe("2026-01-04T09:00:00.000Z")
    expect(e.summary).toBe("We study attention for tables.")
  })

  it("returns [] for junk instead of throwing", () => {
    expect(parseFeed("")).toEqual([])
    expect(parseFeed("<html>nope</html>")).toEqual([])
  })

  it("trims long summaries to the cap", () => {
    const long = `<rss><item><title>t</title><link>l</link><description>${"x".repeat(900)}</description></item></rss>`
    expect(parseFeed(long, { max: 200 })[0].summary.length).toBeLessThanOrEqual(201)
  })
})

describe("fromHfDaily", () => {
  it("normalises the Hugging Face daily papers payload", () => {
    const out = fromHfDaily([
      { paper: { id: "2601.12345", title: "A Paper", summary: "About things.", upvotes: 42, publishedAt: "2026-01-05T00:00:00.000Z" } },
      { paper: { id: "2601.99999", title: "Other", summary: "", upvotes: 3 } },
      { nope: true },
    ])
    expect(out).toHaveLength(2)
    expect(out[0]).toMatchObject({ title: "A Paper", link: "https://huggingface.co/papers/2601.12345", score: 42 })
    expect(out[0].date).toBe("2026-01-05T00:00:00.000Z")
    expect(fromHfDaily(null)).toEqual([])
  })
})

describe("tagByInterest", () => {
  const interests = [
    { id: "football", label: "Football", keywords: ["barcelona", "barça", "la liga"] },
    { id: "data", label: "Data", keywords: ["dataset", "regression"] },
  ]
  it("tags on whole-text keyword match, case-insensitive", () => {
    const [a, b] = tagByInterest(
      [
        { title: "Barcelona win again", summary: "", link: "1", date: "" },
        { title: "Nothing", summary: "a new Dataset appears", link: "2", date: "" },
      ],
      interests,
    )
    expect(a.tags).toEqual(["football"])
    expect(b.tags).toEqual(["data"])
  })
  it("gives untagged items an empty tag list", () => {
    expect(tagByInterest([{ title: "x", summary: "", link: "1", date: "" }], interests)[0].tags).toEqual([])
  })
})

describe("dedupeSort", () => {
  it("drops duplicate links (query ignored) and titles, sorts newest first, caps", () => {
    const out = dedupeSort(
      [
        { title: "A", link: "https://x.com/a?x=1", date: "2026-01-01T00:00:00.000Z", summary: "" },
        { title: "A again", link: "https://x.com/a?x=2", date: "2026-01-02T00:00:00.000Z", summary: "" },
        { title: "B", link: "https://x.com/b", date: "2026-03-01T00:00:00.000Z", summary: "" },
        { title: "b", link: "https://x.com/c", date: "2026-02-01T00:00:00.000Z", summary: "" },
        { title: "D", link: "https://x.com/d", date: "", summary: "" },
      ],
      3,
    )
    expect(out.map((i: { title: string }) => i.title)).toEqual(["B", "A", "D"])
  })
})
