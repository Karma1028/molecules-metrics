// Bakes the repo's real commit log + size of each commit for the /replay page.
// Line format: hash|iso-date|files|added|removed|subject. Runs before every build.
// Never fails the build: if git history is unavailable the existing file stays.
import { execFileSync } from "node:child_process"
import { writeFileSync } from "node:fs"

const num = (re, s) => Number(re.exec(s)?.[1] ?? 0)

try {
  const raw = execFileSync("git", ["log", "--reverse", "--format=@@%h|%cI|%s", "--shortstat"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
  const lines = raw
    .split("@@")
    .filter(Boolean)
    .map((chunk) => {
      const [head, ...rest] = chunk.split("\n")
      const [hash, date, ...subject] = head.split("|")
      const stat = rest.join(" ")
      return [hash, date, num(/(\d+) files? changed/, stat), num(/(\d+) insertions?/, stat), num(/(\d+) deletions?/, stat), subject.join("|")].join("|")
    })
  writeFileSync("public/data/history.txt", lines.join("\n") + "\n")
  console.log(`history: ${lines.length} commits`)
} catch (e) {
  console.warn(`history: skipped (${String(e.message).split("\n")[0]})`)
}
