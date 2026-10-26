// Remote hero frames for the landing page. No remote set is configured, so this
// answers an empty list and the UI keeps its local frames (Landing.tsx treats an
// empty array as "nothing to swap in"). Stops the /api/frames 404 on every load.
const CACHE = "public, max-age=3600, stale-while-revalidate=86400"

export default async () =>
  new Response(JSON.stringify({ frames: [] }), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": CACHE },
  })
