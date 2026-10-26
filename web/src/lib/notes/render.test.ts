import { describe, expect, it } from "vitest"
import { renderMarkdown } from "./render"

describe("renderMarkdown", () => {
  it("renders headings, emphasis, lists and code", () => {
    const html = renderMarkdown("# Title\n\nSome **bold** and *em*.\n\n- a\n- b\n\n`code`")
    expect(html).toContain("<h1")
    expect(html).toContain("<strong>bold</strong>")
    expect(html).toContain("<li>a</li>")
    expect(html).toContain("<code>code</code>")
  })

  it("drops raw html so a post can never inject script", () => {
    const html = renderMarkdown('hello <script>alert(1)</script> <img src=x onerror=alert(1)>')
    expect(html).not.toContain("<script")
    expect(html).not.toContain("onerror")
  })

  it("opens external links in a new tab safely and blocks javascript: urls", () => {
    const html = renderMarkdown("[ok](https://example.com) [bad](javascript:alert(1))")
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
    expect(html).not.toContain("javascript:")
  })

  it("keeps internal links in the same tab", () => {
    const html = renderMarkdown("[gallery](/artist/gallery)")
    expect(html).toContain('href="/artist/gallery"')
    expect(html).not.toContain("target=")
  })

  it("lazy-loads images", () => {
    expect(renderMarkdown("![alt text](/frames/lake.webp)")).toContain('loading="lazy"')
  })
})
