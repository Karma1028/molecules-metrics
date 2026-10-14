// Bakes slow live data into public/data/*.json for the static build.
// Stub: writes empty-state snapshots when keys are absent, and never fails the
// build — a missing key degrades to the last committed snapshot. Real fetchers
// get filled in per source (Task 5 mirrors these as Netlify Functions too).

import { mkdir, writeFile, readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "data")

/** Keep the prior snapshot if we have no fresh data to write. */
async function writeIfBetter(file, next) {
  const path = join(DIR, file)
  if (next == null) {
    try {
      await readFile(path) // prior snapshot exists → leave it
      console.log(`· ${file}: kept prior snapshot (no fresh data)`)
      return
    } catch {
      next = { configured: false, fetchedAt: Date.now() } // seed empty state
    }
  }
  await writeFile(path, JSON.stringify(next, null, 2) + "\n")
  console.log(`✓ ${file}`)
}

async function github() {
  if (!process.env.GITHUB_TOKEN) return null
  // TODO: fetch repos + contributions via the GitHub API.
  return null
}

async function football() {
  if (!process.env.FOOTBALL_API_KEY) return null
  // TODO: fetch season table / fixtures.
  return null
}

async function medium() {
  if (!process.env.MEDIUM_HANDLE) return null
  // TODO: fetch RSS → posts.
  return null
}

async function main() {
  await mkdir(DIR, { recursive: true })
  await writeIfBetter("github.json", await github())
  await writeIfBetter("football.json", await football())
  await writeIfBetter("medium.json", await medium())
  console.log("snapshot run complete.")
}

main().catch((e) => {
  console.error("snapshot failed (non-fatal):", e)
  process.exit(0) // never break the workflow on a data error
})
