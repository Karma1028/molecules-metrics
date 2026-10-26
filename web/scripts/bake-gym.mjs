// Bakes public/data/gym.json: two numbers only (total workouts, best week streak).
// Fitness data is private by default; the owner approved publishing these aggregates
// and nothing else. No titles, dates, sets, weights or body data leave this script.
//
// HEVY_API_KEY comes from process.env, else from the KARMA-OS .env (path overridable
// with KARMA_ENV). The key is never logged.
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "data")
const KARMA_ENV = process.env.KARMA_ENV ?? "D:/antigravity project/karma - zeroclaw/.env"
const API = "https://api.hevyapp.com/v1"
const PAGE_SIZE = 10
const MAX_PAGES = 40
const DAY_MS = 86_400_000
const IST_OFFSET_MS = 330 * 60_000

async function apiKey() {
  if (process.env.HEVY_API_KEY) return process.env.HEVY_API_KEY.trim()
  try {
    for (const line of (await readFile(KARMA_ENV, "utf8")).split(/\r?\n/)) {
      const i = line.indexOf("=")
      if (i > 0 && line.slice(0, i).trim() === "HEVY_API_KEY") return line.slice(i + 1).trim().replace(/^["']|["']$/g, "")
    }
  } catch {
    /* no env file: handled by caller */
  }
  return null
}

async function get(path, key) {
  const r = await fetch(`${API}${path}`, { headers: { "api-key": key, accept: "application/json" } })
  if (!r.ok) throw new Error(`Hevy ${path.split("?")[0]} -> HTTP ${r.status}`)
  return r.json()
}

/** Monday-based week index in IST, so a late-night session counts for the right week. */
function weekIndex(ms) {
  const days = Math.floor((ms + IST_OFFSET_MS) / DAY_MS)
  return Math.floor((days + 3) / 7) // epoch day 0 was a Thursday
}

/** Longest run of consecutive weeks with at least one workout. */
function bestWeekStreak(startTimes) {
  const weeks = [...new Set(startTimes.map((t) => weekIndex(Date.parse(t))))].sort((a, b) => a - b)
  let best = 0
  let run = 0
  weeks.forEach((w, i) => {
    run = i > 0 && w === weeks[i - 1] + 1 ? run + 1 : 1
    best = Math.max(best, run)
  })
  return best
}

async function main() {
  const key = await apiKey()
  if (!key) { console.warn("warn gym: HEVY_API_KEY not found; kept existing gym.json"); return }
  try {
    const { workout_count: workouts } = await get("/workouts/count", key)
    const starts = []
    for (let page = 1; page <= MAX_PAGES; page++) {
      const j = await get(`/workouts?page=${page}&pageSize=${PAGE_SIZE}`, key)
      starts.push(...(j.workouts ?? []).map((w) => w.start_time).filter(Boolean))
      if (page >= (j.page_count ?? page)) break
    }
    const now = Date.now()
    const body = { configured: true, workouts, bestWeekStreak: bestWeekStreak(starts), generatedAt: new Date(now).toISOString() }
    await mkdir(OUT_DIR, { recursive: true })
    await writeFile(join(OUT_DIR, "gym.json"), JSON.stringify(body, null, 2) + "\n")
    console.log("ok gym.json")
  } catch (e) {
    console.warn(`warn gym: ${e.message}; kept existing gym.json`)
  }
}

main()
