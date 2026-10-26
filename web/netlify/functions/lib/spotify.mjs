// Spotify Web API helpers shared by the Netlify functions and the daily bake script.
// Mirrors prototype/server.py (sp_access_token, now_playing, spotify_stats) so the
// payload shapes the UI reads stay identical. `fetchFn` is injected for tests.
// Needs SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN. Never logs them.

const TOKEN_URL = "https://accounts.spotify.com/api/token"
const API = "https://api.spotify.com/v1"
const TIMEOUT_MS = 8000

export function credsFrom(env) {
  const id = env.SPOTIFY_CLIENT_ID
  const secret = env.SPOTIFY_CLIENT_SECRET
  const refresh = env.SPOTIFY_REFRESH_TOKEN
  return id && secret && refresh ? { id, secret, refresh } : null
}

export async function mintToken(creds, fetchFn = fetch) {
  const r = await fetchFn(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${creds.id}:${creds.secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: creds.refresh }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!r.ok) return null // never echo the upstream body: it can quote credentials
  const j = await r.json()
  return j.access_token ?? null
}

const get = (fetchFn, url, token) =>
  fetchFn(url, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(TIMEOUT_MS) })

const names = (artists) => (artists ?? []).map((a) => a.name).join(", ")

export function shapeTrack(t, playing, playedAt = null) {
  const imgs = t.album?.images?.length ? t.album.images : [{}]
  return {
    configured: true,
    isPlaying: playing,
    title: t.name ?? null,
    artist: names(t.artists),
    album: t.album?.name ?? null,
    art: imgs.length > 1 ? imgs[imgs.length - 2].url : imgs[0].url,
    url: t.external_urls?.spotify ?? null,
    playedAt,
  }
}

export async function getNowPlaying(env, fetchFn = fetch) {
  const creds = credsFrom(env)
  if (!creds) return { configured: false }
  try {
    const token = await mintToken(creds, fetchFn)
    if (!token) return { configured: false }
    const cur = await get(fetchFn, `${API}/me/player/currently-playing`, token)
    if (cur.status === 200) {
      const c = await cur.json()
      if (c?.item && c.is_playing) return shapeTrack(c.item, true)
    }
    const rec = await get(fetchFn, `${API}/me/player/recently-played?limit=1`, token)
    const items = rec.ok ? ((await rec.json())?.items ?? []) : []
    if (!items.length) return { configured: true, isPlaying: false, title: null }
    return shapeTrack(items[0].track, false, items[0].played_at ?? null)
  } catch {
    return { configured: false }
  }
}

export function shapeStats(arts, trks, now = Math.floor(Date.now() / 1000)) {
  const artItems = arts?.items ?? []
  const trkItems = trks?.items ?? []
  const genres = new Map()
  for (const a of artItems) for (const g of a.genres ?? []) genres.set(g, (genres.get(g) ?? 0) + 1)
  return {
    configured: true,
    range: "medium_term",
    topArtists: artItems.map((a) => ({ name: a.name, img: a.images?.[0]?.url })),
    topTracks: trkItems.map((t) => ({
      title: t.name,
      artist: names(t.artists),
      img: t.album?.images?.[0]?.url,
      url: t.external_urls?.spotify,
    })),
    topGenres: [...genres.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, weight]) => ({ name, weight })),
    aura: null, // /audio-features is closed to apps created after 2024-11; omitted rather than faked
    fetchedAt: now,
  }
}

export async function getStats(env, fetchFn = fetch) {
  const creds = credsFrom(env)
  if (!creds) return { configured: false }
  try {
    const token = await mintToken(creds, fetchFn)
    if (!token) return { configured: false }
    const a = await get(fetchFn, `${API}/me/top/artists?limit=8&time_range=medium_term`, token)
    if (a.status === 403) return { configured: false, reason: "scope" } // token lacks user-top-read
    const t = await get(fetchFn, `${API}/me/top/tracks?limit=10&time_range=medium_term`, token)
    if (!a.ok || !t.ok) return { configured: false }
    return shapeStats(await a.json(), await t.json())
  } catch {
    return { configured: false }
  }
}
