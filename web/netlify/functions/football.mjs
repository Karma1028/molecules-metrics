// Keyless football feed (see lib/football.mjs). Cached at the edge.
import { getFootball } from "./lib/football.mjs"

export default async () =>
  new Response(JSON.stringify(await getFootball()), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "public, max-age=600, stale-while-revalidate=3600" },
  })
