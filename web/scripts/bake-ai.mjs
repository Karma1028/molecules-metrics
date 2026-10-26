// Bakes public/data/ai.json: aggregate counts of AI-agent work from local Claude Code
// session logs. Only numbers leave this script: no prompts, replies, file names,
// paths or project names are read into the output.
//
// Log root defaults to ~/.claude/projects (override with CLAUDE_PROJECTS).
// Claude Code writes one line per content block and repeats the message usage on
// each, so usage is counted once per message id.
import { createReadStream } from "node:fs"
import { readdir, writeFile, mkdir } from "node:fs/promises"
import { createInterface } from "node:readline"
import { execFileSync } from "node:child_process"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "data")
const ROOT = process.env.CLAUDE_PROJECTS ?? join(homedir(), ".claude", "projects")
const IST_OFFSET_MS = 330 * 60_000
const AGENT_TOOLS = new Set(["Agent", "Task"])

async function* jsonlFiles(dir) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* jsonlFiles(p)
    else if (e.isFile() && e.name.endsWith(".jsonl")) yield p
  }
}

const istDay = (ms) => new Date(ms + IST_OFFSET_MS).toISOString().slice(0, 10)
const countLines = (s) => (typeof s === "string" && s.length ? s.split("\n").length : 0)

/** Lines written / replaced by a file-editing tool call; null for any other tool. Text is counted, never kept. */
function linesLanded(b) {
  const i = b.input ?? {}
  if (b.name === "Write") return { added: countLines(i.content), removed: 0 }
  if (b.name === "Edit") return { added: countLines(i.new_string), removed: countLines(i.old_string) }
  if (b.name === "MultiEdit" && Array.isArray(i.edits)) {
    return i.edits.reduce((a, e) => ({ added: a.added + countLines(e.new_string), removed: a.removed + countLines(e.old_string) }), { added: 0, removed: 0 })
  }
  return null
}

/** Distinct git repos behind the session folders, and their commits inside the log window. */
function repoCommits(cwds, since) {
  const tops = new Set()
  for (const c of cwds) {
    try {
      tops.add(execFileSync("git", ["-C", c, "rev-parse", "--show-toplevel"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim())
    } catch {
      /* not a repo, or folder gone */
    }
  }
  let commits = 0
  for (const top of tops) {
    try {
      commits += Number(execFileSync("git", ["-C", top, "rev-list", "--count", "--all", `--since=${since}`], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim()) || 0
    } catch {
      /* empty repo */
    }
  }
  return { repos: tops.size, commits }
}

async function main() {
  const seen = new Set()
  const seenTools = new Set()
  const days = new Set()
  const sessions = new Set()
  const cwds = new Set()
  const files = new Set()
  const months = {}
  const t = {
    messages: 0, toolCalls: 0, agentCalls: 0, edits: 0, linesAdded: 0, linesRemoved: 0,
    input: 0, output: 0, cacheRead: 0, cacheWrite: 0,
  }

  for await (const file of jsonlFiles(ROOT)) {
    const rl = createInterface({ input: createReadStream(file, { encoding: "utf8" }), crlfDelay: Infinity })
    for await (const line of rl) {
      if (!line.includes('"assistant"')) continue
      let o
      try {
        o = JSON.parse(line)
      } catch {
        continue
      }
      const msg = o?.message
      if (o?.type !== "assistant" || !msg || typeof msg !== "object") continue
      const ms = Date.parse(o.timestamp)
      if (Number.isNaN(ms)) continue
      days.add(istDay(ms))
      if (o.sessionId) sessions.add(o.sessionId)
      if (o.cwd) cwds.add(o.cwd)
      for (const b of Array.isArray(msg.content) ? msg.content : []) {
        if (b?.type !== "tool_use" || seenTools.has(b.id)) continue
        seenTools.add(b.id)
        t.toolCalls++
        if (AGENT_TOOLS.has(b.name)) t.agentCalls++
        const landed = linesLanded(b)
        if (landed) {
          t.edits++
          t.linesAdded += landed.added
          t.linesRemoved += landed.removed
          if (b.input?.file_path) files.add(b.input.file_path)
        }
      }
      const id = msg.id ?? o.uuid
      if (seen.has(id)) continue
      seen.add(id)
      t.messages++
      const u = msg.usage ?? {}
      const m = istDay(ms).slice(0, 7)
      months[m] ??= 0
      t.input += Number(u.input_tokens) || 0
      t.output += Number(u.output_tokens) || 0
      t.cacheRead += Number(u.cache_read_input_tokens) || 0
      t.cacheWrite += Number(u.cache_creation_input_tokens) || 0
      months[m] += Number(u.output_tokens) || 0
    }
  }

  if (!t.messages) {
    console.warn("warn ai: no session logs found; kept existing ai.json")
    return
  }
  const sortedDays = [...days].sort()
  const context = t.input + t.cacheRead + t.cacheWrite
  const { repos, commits } = repoCommits(cwds, sortedDays[0])
  const body = {
    configured: true,
    activeDays: days.size,
    sessions: sessions.size,
    projects: cwds.size,
    repos,
    commits,
    edits: t.edits,
    filesTouched: files.size,
    linesAdded: t.linesAdded,
    linesRemoved: t.linesRemoved,
    messages: t.messages,
    toolCalls: t.toolCalls,
    agentCalls: t.agentCalls,
    outputTokens: t.output,
    contextTokens: context,
    cacheShare: context ? Math.round((t.cacheRead / context) * 1000) / 10 : 0,
    months: Object.entries(months).sort(([a], [b]) => a.localeCompare(b)).map(([month, output]) => ({ month, output })),
    since: sortedDays[0],
    until: sortedDays[sortedDays.length - 1],
    generatedAt: new Date().toISOString(),
  }
  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(join(OUT_DIR, "ai.json"), JSON.stringify(body, null, 2) + "\n")
  console.log("ok ai.json")
}

main().catch((e) => {
  console.warn(`warn ai: ${e.message}; kept existing ai.json`)
})
