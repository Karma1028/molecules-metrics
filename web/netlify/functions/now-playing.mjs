// Live "now playing" from Spotify. Needs SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET /
// SPOTIFY_REFRESH_TOKEN in the site env; without them it answers configured:false and the UI falls back.
import { getNowPlaying } from "./lib/spotify.mjs"

const CACHE = "public, max-age=15, stale-while-revalidate=45"

export default async () => {
  const body = await getNowPlaying(process.env)
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": CACHE },
  })
}
