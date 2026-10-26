// Bakes the Spotify top artists / tracks / genres to public/data/spotify_recent.json.
// Runs from the daily-feed workflow with SPOTIFY_* secrets. Never fails the run:
// without secrets, or if Spotify refuses, the previous file stays untouched.
import { writeFileSync } from "node:fs"
import { getStats } from "../netlify/functions/lib/spotify.mjs"

const stats = await getStats(process.env)
if (stats.configured) {
  writeFileSync("public/data/spotify_recent.json", JSON.stringify(stats, null, 1) + "\n")
  console.log(`spotify: ${stats.topArtists.length} artists, ${stats.topTracks.length} tracks`)
} else {
  console.warn(`spotify: skipped (${stats.reason ?? "not configured"})`)
}
