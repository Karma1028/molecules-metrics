// One-time Spotify authorisation helpers (used by scripts/spotify-auth.mjs).
// Pure + injectable fetch so the flow is testable without touching Spotify.
export const SCOPES = ["user-top-read", "user-read-currently-playing", "user-read-recently-played"]

export function authUrl(clientId, redirectUri, state) {
  const q = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES.join(" "),
    state,
  })
  return `https://accounts.spotify.com/authorize?${q}`
}

export async function exchangeCode(creds, code, redirectUri, fetchFn = fetch) {
  const r = await fetchFn("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${creds.id}:${creds.secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri }),
  })
  if (!r.ok) return null // upstream body can quote credentials; never surface it
  const j = await r.json()
  return j.refresh_token ?? null
}
