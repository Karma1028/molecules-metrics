// Bakes slow live data into public/data/*.json for the static build.
// GitHub (public REST + contributions page) and Medium (public RSS) are real.
// Never fails the build: any failure keeps the prior snapshot and exits 0.
// GITHUB_USER / MEDIUM_HANDLE come from process.env, else from the same env
// files prototype/server.py loads. Only those two keys are read; values are
// never logged.

import { mkdir, writeFile, readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const DIR = join(HERE, "..", "public", "data")
const WANTED = ["GITHUB_USER", "MEDIUM_HANDLE"]
const PUBLIC_DEFAULTS = { GITHUB_USER: "Karma1028", MEDIUM_HANDLE: "tuhin.gim" }
const ENV_FILES = [
  join(HERE, "..", "..", "prototype", "spotify.env"), // server.py ENV_FILE
  process.env.KARMA_ENV,
  "D:/antigravity project/karma - zeroclaw/.env",
]
const UA = { "User-Agent": "tuhin-portfolio" }

async function resolveKeys() {
  const out = {}
  for (const k of WANTED) if (process.env[k]) out[k] = process.env[k].trim()
  for (const p of ENV_FILES) {
    if (WANTED.every((k) => out[k])) break
    if (!p) continue
    let text
    try {
      text = await readFile(p, "utf8")
    } catch {
      continue
    }
    for (const line of text.split(/\r?\n/)) {
      const s = line.trim()
      if (!s || s.startsWith("#") || !s.includes("=")) continue
      const i = s.indexOf("=")
      const k = s.slice(0, i).trim()
      if (WANTED.includes(k) && !out[k]) out[k] = s.slice(i + 1).trim().replace(/^["']|["']$/g, "")
    }
  }
  return out
}

async function getText(url, headers = UA) {
  const r = await fetch(url, { headers, signal: AbortSignal.timeout(15000) })
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${new URL(url).hostname}`)
  return r.text()
}

async function github(user) {
  const repos = JSON.parse(
    await getText(`https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=100`, {
      ...UA,
      Accept: "application/vnd.github+json",
    }),
  )
  const items = repos.filter((r) => !r.fork).sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
  const out = {
    configured: true,
    user,
    repos: items.slice(0, 8).map((r) => ({
      name: r.name,
      desc: r.description,
      stars: r.stargazers_count || 0,
      lang: r.language,
      url: r.html_url,
    })),
    totalStars: items.reduce((n, r) => n + (r.stargazers_count || 0), 0),
  }
  try {
    const html = await getText(`https://github.com/users/${encodeURIComponent(user)}/contributions`)
    const m = html.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i)
    if (m) out.contributions = Number(m[1].replace(/,/g, ""))
  } catch {
    /* contributions optional */
  }
  return out
}

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()

async function medium(handle) {
  const h = handle.replace(/^@/, "")
  const xml = await getText(`https://medium.com/feed/@${encodeURIComponent(h)}`)
  const tag = (block, name) => {
    const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))
    return m ? decode(m[1]) : null
  }
  const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6).map((m) => ({
    title: tag(m[1], "title"),
    url: tag(m[1], "link"),
    published: tag(m[1], "pubDate"),
    snippet: (tag(m[1], "content:encoded") || "").replace(/<[^>]+>/g, "").slice(0, 220).trim(),
  }))
  return { configured: true, handle: h, posts }
}

async function bake(file, label, fn) {
  try {
    const data = await fn()
    const now = new Date()
    const body = { ...data, fetchedAt: Math.floor(now.getTime() / 1000), generatedAt: now.toISOString() }
    await writeFile(join(DIR, file), JSON.stringify(body, null, 2) + "\n")
    console.log(`ok ${file}`)
    return body
  } catch (e) {
    console.warn(`warn ${label}: ${e.message}; kept existing ${file}`)
    return null
  }
}

async function main() {
  await mkdir(DIR, { recursive: true })
  // public profile names, not secrets; env still overrides
  const keys = { ...PUBLIC_DEFAULTS, ...(await resolveKeys()) }
  if (keys.GITHUB_USER) await bake("github.json", "github", () => github(keys.GITHUB_USER))
  else console.warn("warn github: GITHUB_USER not found; kept existing github.json")
  if (keys.MEDIUM_HANDLE) await bake("medium.json", "medium", () => medium(keys.MEDIUM_HANDLE))
  else console.warn("warn medium: MEDIUM_HANDLE not found; kept existing medium.json")
  console.log("snapshot run complete.")
}

main().catch((e) => {
  console.warn("snapshot failed (non-fatal):", e.message)
  process.exit(0)
})
