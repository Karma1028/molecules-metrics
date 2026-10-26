import { Marked } from "marked"

/** Only these schemes survive; javascript:, data: and friends are rendered as plain text. */
const SAFE_URL = /^(https?:|mailto:|\/(?!\/)|#)/i
const EXTERNAL = /^https?:/i

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const md = new Marked({
  gfm: true,
  renderer: {
    // raw html in a post is dropped, never passed through
    html: () => "",
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      if (!SAFE_URL.test(href)) return text
      const t = title ? ` title="${esc(title)}"` : ""
      const ext = EXTERNAL.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ""
      return `<a href="${esc(href)}"${t}${ext}>${text}</a>`
    },
    image({ href, title, text }) {
      if (!SAFE_URL.test(href)) return esc(text)
      const t = title ? ` title="${esc(title)}"` : ""
      return `<img src="${esc(href)}" alt="${esc(text)}"${t} loading="lazy" decoding="async">`
    },
  },
})

/** Markdown -> trusted-safe HTML for the Field Notes reader. */
export function renderMarkdown(src: string): string {
  return md.parse(src, { async: false }) as string
}
