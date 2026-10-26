// Top artists / tracks / genres from Spotify (medium_term). Same env vars as now-playing,
// plus the user-top-read scope on the refresh token. Cached longer: this data moves slowly.
import { getStats } from "./lib/spotify.mjs"

const CACHE = "public, max-age=1800, stale-while-revalidate=7200"

export default async () => {
  const body = await getStats(process.env)
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": CACHE },
  })
}
