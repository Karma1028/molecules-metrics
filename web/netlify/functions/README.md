# Netlify Functions mirror the Python /api/* live endpoints (Task 5).
# Fast/now data only: now-playing, music/{search,lyrics,preview}, contact.

# music-search.mjs: GET /api/music/search?q= (YouTube Data API v3, needs YOUTUBE_API_KEY site env var; rewrite in netlify.toml).
# /api/music/lyrics has no function on purpose: the client falls back to LRCLIB directly (keyless, CORS).
