# Netlify Functions mirror the Python /api/* live endpoints (Task 5).
# Fast/now data only: now-playing, music/{search,lyrics,preview}, contact.

# music-search.mjs: GET /api/music/search?q= (YouTube Data API v3, needs YOUTUBE_API_KEY site env var; rewrite in netlify.toml).
# /api/music/lyrics has no function on purpose: the client falls back to LRCLIB directly (keyless, CORS).

## Spotify one-time setup

1. developer.spotify.com/dashboard → create an app, add Redirect URI `http://127.0.0.1:8888/callback`.
2. In a terminal: `SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs`, open the printed URL, approve.
3. The script prints `SPOTIFY_REFRESH_TOKEN=...`. Put all three values in Netlify (Site settings → Environment variables) and in GitHub (Settings → Secrets → Actions). Redeploy once.

## Keyless football feeds

`barca`, `football`, `football-news` need no key (TheSportsDB public key + Guardian RSS).
