// Keyless football feed (see lib/football.mjs). Cached at the edge.
import { getNews } from "./lib/football.mjs"

export default async () =>
  new Response(JSON.stringify(await getNews()), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "public, max-age=1800, stale-while-revalidate=3600" },
  })
