// Bakes the repo's real commit log for the /replay page. Runs before every build.
// Never fails the build: if git history is unavailable the existing file stays.
import { execFileSync } from "node:child_process"
import { writeFileSync } from "node:fs"

try {
  const raw = execFileSync("git", ["log", "--reverse", "--format=%h|%cI|%s"], { encoding: "utf8" })
  writeFileSync("public/data/history.txt", raw)
  console.log(`history: ${raw.trim().split("\n").length} commits`)
} catch (e) {
  console.warn(`history: skipped (${String(e.message).split("\n")[0]})`)
}
