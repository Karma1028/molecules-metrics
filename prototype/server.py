"""Dev server for the hero prototype — static files + REAL live feeds.

    python server.py            -> http://127.0.0.1:5195/hero6.html

Endpoints
  /api/barca           last result + next fixture for FC Barcelona (TheSportsDB, cached 10 min)
  /api/now-playing     Spotify currently-playing, else last played (recently-played), cached 20 s
  /api/spotify/login   one-time OAuth to mint a refresh token (needs client id/secret)

Spotify setup (one time):
  1. developer.spotify.com -> create app -> add redirect URI  http://127.0.0.1:5195/api/spotify/callback
  2. create prototype/spotify.env with:
        SPOTIFY_CLIENT_ID=...
        SPOTIFY_CLIENT_SECRET=...
  3. run server, open http://127.0.0.1:5195/api/spotify/login, approve.
     The refresh token is appended to spotify.env automatically. Done.
Stdlib only, no installs.
"""
import base64, json, os, time, urllib.parse, urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
ENV_FILE = os.path.join(HERE, "spotify.env")
PORT = int(os.environ.get("PORT", 5195))
REDIRECT = f"http://127.0.0.1:{PORT}/api/spotify/callback"
BARCA_ID = "133739"  # TheSportsDB team id, FC Barcelona
# gallery frames live in a Drive folder; set after running drive_frames_setup.py
FRAMES_FOLDER_ID = os.environ.get("PORTFOLIO_FRAMES_FOLDER_ID", "1h-dsIi3apvvKvj3XBv-pAccL3F-EPnDI")
SA_FILE = os.environ.get("KARMA_SA_FILE", r"D:\antigravity project\karma - zeroclaw\secrets\google_service_account.json")
_cache = {}


def env():
    def load(path, only_prefix=None):
        if not path or not os.path.exists(path):
            return
        for line in open(path, encoding="utf-8"):
            s = line.strip()
            if "=" in s and not s.startswith("#"):
                k, v = s.split("=", 1)
                k = k.strip()
                if only_prefix and not k.startswith(only_prefix):
                    continue
                vals[k] = v.strip()

    vals = dict(os.environ)
    load(ENV_FILE)  # prototype/spotify.env — authoritative, gitignored
    # fallback: reuse the Spotify creds already set up in the KARMA-OS .env (Spotify keys only)
    if not vals.get("SPOTIFY_REFRESH_TOKEN"):
        for p in (os.environ.get("KARMA_ENV"),
                  r"D:\antigravity project\karma - zeroclaw\.env",
                  "/mnt/d/antigravity project/karma - zeroclaw/.env"):
            if p and os.path.exists(p):
                load(p, only_prefix="SPOTIFY_")
                break
    return vals


def http_json(url, data=None, headers=None):
    req = urllib.request.Request(url, data=data, headers=headers or {"User-Agent": "tuhin-portfolio"})
    with urllib.request.urlopen(req, timeout=8) as r:
        body = r.read()
        return r.status, (json.loads(body) if body else None)


def cached(key, ttl, fn):
    hit = _cache.get(key)
    if hit and time.time() - hit[0] < ttl:
        return hit[1]
    val = fn()
    _cache[key] = (time.time(), val)
    return val


# ---------- Barça ----------
def slim(e):
    return {k: e.get(k) for k in ("strTimestamp", "strHomeTeam", "strAwayTeam", "intHomeScore",
                                   "intAwayScore", "strLeague", "intRound", "strStatus", "strVenue")}


def barca():
    base = "https://www.thesportsdb.com/api/v1/json/3/"
    _, last = http_json(base + f"eventslast.php?id={BARCA_ID}")
    _, nxt = http_json(base + f"eventsnext.php?id={BARCA_ID}")
    return {"last": slim((last or {}).get("results", [{}])[0]),
            "next": slim((nxt or {}).get("events", [{}])[0]),
            "source": "thesportsdb", "fetchedAt": int(time.time())}


# ---------- gallery frames (live Google Drive folder) ----------
def drive_frames():
    """List images in the Drive folder via the service account. Auto-detects
    add/remove each cache window. Returns [] when unconfigured so the hero keeps
    its baked-in local frames."""
    if not FRAMES_FOLDER_ID or not os.path.exists(SA_FILE):
        return {"frames": [], "source": "unconfigured"}
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    creds = service_account.Credentials.from_service_account_file(
        SA_FILE, scopes=["https://www.googleapis.com/auth/drive.readonly"])
    drive = build("drive", "v3", credentials=creds, cache_discovery=False)
    q = f"'{FRAMES_FOLDER_ID}' in parents and trashed=false and mimeType contains 'image/'"
    res = drive.files().list(q=q, fields="files(id,name)", orderBy="name", pageSize=100).execute()
    frames = []
    for f in res.get("files", []):
        name = os.path.splitext(f["name"])[0].replace("-", " ").replace("_", " ").strip().lower()
        frames.append({"id": f["id"], "name": name or "untitled",
                       "url": f"https://lh3.googleusercontent.com/d/{f['id']}=w1400"})
    return {"frames": frames, "source": "drive", "count": len(frames), "fetchedAt": int(time.time())}


# ---------- Spotify ----------
def sp_basic(e):
    return base64.b64encode(f"{e['SPOTIFY_CLIENT_ID']}:{e['SPOTIFY_CLIENT_SECRET']}".encode()).decode()


def sp_access_token(e):
    def mint():
        data = urllib.parse.urlencode({"grant_type": "refresh_token",
                                       "refresh_token": e["SPOTIFY_REFRESH_TOKEN"]}).encode()
        _, tok = http_json("https://accounts.spotify.com/api/token", data,
                           {"Authorization": "Basic " + sp_basic(e),
                            "Content-Type": "application/x-www-form-urlencoded"})
        return tok["access_token"]
    return cached("sp_token", 3000, mint)


def track_payload(t, playing, played_at=None):
    imgs = (t.get("album") or {}).get("images") or [{}]
    return {"configured": True, "isPlaying": playing, "title": t.get("name"),
            "artist": ", ".join(a["name"] for a in t.get("artists", [])),
            "album": (t.get("album") or {}).get("name"),
            "art": imgs[-2]["url"] if len(imgs) > 1 else imgs[0].get("url"),
            "url": (t.get("external_urls") or {}).get("spotify"), "playedAt": played_at}


def now_playing():
    e = env()
    if not all(e.get(k) for k in ("SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET", "SPOTIFY_REFRESH_TOKEN")):
        return {"configured": False}
    auth = {"Authorization": "Bearer " + sp_access_token(e)}
    status, cur = http_json("https://api.spotify.com/v1/me/player/currently-playing", headers=auth)
    if status == 200 and cur and cur.get("item") and cur.get("is_playing"):
        return track_payload(cur["item"], True)
    _, rec = http_json("https://api.spotify.com/v1/me/player/recently-played?limit=1", headers=auth)
    items = (rec or {}).get("items") or []
    if not items:
        return {"configured": True, "isPlaying": False, "title": None}
    return track_payload(items[0]["track"], False, items[0].get("played_at"))


def http_text(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {"User-Agent": "tuhin-portfolio"})
    with urllib.request.urlopen(req, timeout=8) as r:
        return r.status, r.read().decode("utf-8", "replace")


def _season():
    import datetime
    now = datetime.date.today()
    y = now.year
    return f"{y}-{y + 1}" if now.month >= 7 else f"{y - 1}-{y}"


# ---------- football (richer than the hero Barça card) ----------
LALIGA_ID = "4335"


def _form_from_last():
    """Last-5 W/D/L for Barça, newest first."""
    _, d = http_json("https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=" + BARCA_ID)
    out = []
    for e in (d or {}).get("results", [])[:5]:
        try:
            home = e.get("strHomeTeam") == "Barcelona"
            us = int(e["intHomeScore"] if home else e["intAwayScore"])
            them = int(e["intAwayScore"] if home else e["intHomeScore"])
            out.append("W" if us > them else "L" if us < them else "D")
        except (TypeError, ValueError, KeyError):
            continue
    return out


def football():
    """Summary consumed by the SPA's useFootball(): next + last + form + table row."""
    b = barca()
    standing = None
    table_form = []
    try:
        _, tbl = http_json(
            f"https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l={LALIGA_ID}&s={_season()}"
        )
        for row in (tbl or {}).get("table", []) or []:
            if (row.get("strTeam") or "").startswith("Barcelona"):
                standing = {
                    "rank": int(row.get("intRank") or 0),
                    "points": int(row.get("intPoints") or 0),
                    "played": int(row.get("intPlayed") or 0),
                    "gd": int(row.get("intGoalDifference") or 0),
                    "goals": int(row.get("intGoalsFor") or 0),
                    "conceded": int(row.get("intGoalsAgainst") or 0),
                    "win": int(row.get("intWin") or 0),
                    "draw": int(row.get("intDraw") or 0),
                    "loss": int(row.get("intLoss") or 0),
                    "season": _season(),
                }
                # strForm is oldest-first; reverse to newest-first for the pips.
                sf = (row.get("strForm") or "").strip().upper()
                table_form = [c for c in reversed(sf) if c in ("W", "D", "L")][:5]
                break
    except Exception:
        standing = None
    # prefer the live match feed (reliably newest-first); fall back to the
    # table's strForm when the feed is thin so the pips never show just one.
    form = _form_from_last()
    if len(form) < len(table_form):
        form = table_form
    return {
        "configured": True,
        "next": b.get("next"),
        "last": b.get("last"),
        "form": form,
        "standing": standing,
        "source": "thesportsdb",
        "fetchedAt": int(time.time()),
    }


# ---------- football news (keyless Guardian RSS) ----------
def football_news():
    """Mainstream football headlines from the Guardian football RSS (no key)."""
    import xml.etree.ElementTree as ET
    try:
        status, body = http_text("https://www.theguardian.com/football/rss")
        if status != 200:
            return {"configured": True, "items": []}
        root = ET.fromstring(body)
        items = []
        for it in root.iter("item"):
            title = (it.findtext("title") or "").strip()
            link = (it.findtext("link") or "").strip()
            pub = (it.findtext("pubDate") or "").strip()
            if title and link:
                items.append({"title": title, "url": link, "source": "The Guardian", "published": pub})
            if len(items) >= 12:
                break
        return {"configured": True, "items": items}
    except Exception:
        return {"configured": True, "items": []}


# ---------- GitHub (public API; token optional for higher rate) ----------
def github():
    e = env()
    user = e.get("GITHUB_USER")
    if not user:
        return {"configured": False}
    headers = {"User-Agent": "tuhin-portfolio", "Accept": "application/vnd.github+json"}
    if e.get("GITHUB_TOKEN"):
        headers["Authorization"] = "Bearer " + e["GITHUB_TOKEN"]
    _, repos = http_json(
        f"https://api.github.com/users/{user}/repos?sort=updated&per_page=100", headers=headers
    )
    items = [r for r in (repos or []) if not r.get("fork")]
    items.sort(key=lambda r: r.get("stargazers_count", 0), reverse=True)
    total = sum(r.get("stargazers_count", 0) for r in items)
    top = [
        {
            "name": r.get("name"),
            "desc": r.get("description"),
            "stars": r.get("stargazers_count", 0),
            "lang": r.get("language"),
            "url": r.get("html_url"),
        }
        for r in items[:8]
    ]
    return {"configured": True, "user": user, "repos": top, "totalStars": total,
            "fetchedAt": int(time.time())}


# ---------- Medium (public RSS) ----------
def medium():
    import xml.etree.ElementTree as ET
    import re as _re
    e = env()
    h = (e.get("MEDIUM_HANDLE") or "").lstrip("@")
    if not h:
        return {"configured": False}
    _, xml = http_text(f"https://medium.com/feed/@{h}")
    root = ET.fromstring(xml)
    posts = []
    for it in root.iter("item"):
        def g(tag):
            el = it.find(tag)
            return el.text if el is not None and el.text else None
        enc = g("{http://purl.org/rss/1.0/modules/content/}encoded") or ""
        snippet = _re.sub("<[^>]+>", "", enc)[:220].strip()
        posts.append({"title": g("title"), "url": g("link"), "published": g("pubDate"),
                      "snippet": snippet})
    return {"configured": True, "handle": h, "posts": posts[:6], "fetchedAt": int(time.time())}


# ---------- music search (YouTube + Spotify) ----------
def music_search(q):
    e = env()
    out, configured = [], False
    yt = e.get("YOUTUBE_API_KEY")
    if yt:
        configured = True
        try:
            qs = urllib.parse.urlencode({"part": "snippet", "q": q, "type": "video",
                                         "maxResults": 8, "key": yt})
            _, d = http_json("https://www.googleapis.com/youtube/v3/search?" + qs)
            for it in (d or {}).get("items", []):
                vid = (it.get("id") or {}).get("videoId")
                sn = it.get("snippet") or {}
                if not vid:
                    continue
                out.append({"id": vid, "title": sn.get("title"), "artist": sn.get("channelTitle"),
                            "source": "youtube", "url": f"https://www.youtube.com/watch?v={vid}",
                            "art": ((sn.get("thumbnails") or {}).get("medium") or {}).get("url")})
        except Exception:
            pass
    if all(e.get(k) for k in ("SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET", "SPOTIFY_REFRESH_TOKEN")):
        configured = True
        try:
            auth = {"Authorization": "Bearer " + sp_access_token(e)}
            qs = urllib.parse.urlencode({"q": q, "type": "track", "limit": 8})
            _, d = http_json("https://api.spotify.com/v1/search?" + qs, headers=auth)
            for t in ((d or {}).get("tracks") or {}).get("items", []):
                imgs = (t.get("album") or {}).get("images") or [{}]
                out.append({"id": t.get("id"), "title": t.get("name"),
                            "artist": ", ".join(a["name"] for a in t.get("artists", [])),
                            "source": "spotify", "url": (t.get("external_urls") or {}).get("spotify"),
                            "art": imgs[-2]["url"] if len(imgs) > 1 else imgs[0].get("url"),
                            "durationMs": t.get("duration_ms"), "preview": t.get("preview_url")})
        except Exception:
            pass
    return {"configured": configured, "query": q, "results": out}


# ---------- lyrics (LRCLIB, keyless) ----------
def music_lyrics(artist, title):
    try:
        qs = urllib.parse.urlencode({"artist_name": artist, "track_name": title})
        _, d = http_json("https://lrclib.net/api/get?" + qs)
        return {"configured": True, "found": True, "synced": (d or {}).get("syncedLyrics"),
                "plain": (d or {}).get("plainLyrics")}
    except Exception:
        return {"configured": True, "found": False}


# ---------- his Spotify listening analytics (needs user-top-read scope) ----------
def spotify_stats():
    e = env()
    if not all(e.get(k) for k in ("SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET", "SPOTIFY_REFRESH_TOKEN")):
        return {"configured": False}
    auth = {"Authorization": "Bearer " + sp_access_token(e)}
    try:
        sa, arts = http_json("https://api.spotify.com/v1/me/top/artists?limit=8&time_range=medium_term", headers=auth)
        if sa == 403:
            return {"configured": False, "reason": "scope"}  # token lacks user-top-read
        _, trks = http_json("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term", headers=auth)
    except Exception:
        return {"configured": False}
    art_items = (arts or {}).get("items", [])
    top_artists = [{"name": a.get("name"),
                    "img": ((a.get("images") or [{}])[0] or {}).get("url")}
                   for a in art_items]
    items = (trks or {}).get("items", [])
    top_tracks = [{"title": t.get("name"), "artist": ", ".join(a["name"] for a in t.get("artists", [])),
                   "img": (((t.get("album") or {}).get("images") or [{}])[0] or {}).get("url"),
                   "url": (t.get("external_urls") or {}).get("spotify")} for t in items]

    # Top genres: aggregate artist.genres across top artists (no extra API call).
    gcount = {}
    for a in art_items:
        for g in (a.get("genres") or []):
            gcount[g] = gcount.get(g, 0) + 1
    top_genres = [{"name": g, "weight": c} for g, c in
                  sorted(gcount.items(), key=lambda kv: -kv[1])[:8]]

    # Audio aura: best-effort. Spotify deprecated /audio-features for apps created
    # after 2024-11; tolerate 403/empty and simply omit aura rather than fake it.
    aura = None
    try:
        ids = [t.get("id") for t in items if t.get("id")][:20]
        if ids:
            fa, feats = http_json(
                "https://api.spotify.com/v1/audio-features?ids=" + ",".join(ids), headers=auth)
            rows = [f for f in (feats or {}).get("audio_features", []) if f]
            if fa != 403 and rows:
                def avg(k):
                    return round(sum(f.get(k, 0) for f in rows) / len(rows), 3)
                aura = {"energy": avg("energy"), "valence": avg("valence"),
                        "danceability": avg("danceability"), "acousticness": avg("acousticness"),
                        "tempo": round(sum(f.get("tempo", 0) for f in rows) / len(rows)),
                        "n": len(rows)}
    except Exception:
        aura = None

    return {"configured": True, "range": "medium_term", "topArtists": top_artists,
            "topTracks": top_tracks, "topGenres": top_genres, "aura": aura,
            "fetchedAt": int(time.time())}


# ---------- contact (honeypot + optional webhook relay) ----------
def contact(payload):
    if payload.get("company"):  # honeypot field filled -> silently drop bot
        return {"ok": True}, 200
    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip()
    msg = (payload.get("message") or "").strip()
    if not (name and email and msg) or "@" not in email or len(msg) < 5:
        return {"ok": False, "error": "Please fill in a name, a valid email, and a message."}, 400
    wh = env().get("CONTACT_WEBHOOK")
    if not wh:
        return {"ok": False, "configured": False,
                "error": "Contact isn't wired up yet — reach me on email meanwhile."}, 200
    try:
        body = json.dumps({"name": name, "email": email, "message": msg[:4000]}).encode()
        http_json(wh, data=body, headers={"Content-Type": "application/json", "User-Agent": "tuhin-portfolio"})
        return {"ok": True}, 200
    except Exception as ex:
        return {"ok": False, "error": "Couldn't send right now: " + str(ex)[:120]}, 502


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=HERE, **kw)

    def send_json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        try:
            if u.path == "/api/barca":
                return self.send_json(cached("barca", 600, barca))
            if u.path == "/api/frames":
                return self.send_json(cached("frames", 120, drive_frames))
            if u.path == "/api/now-playing":
                return self.send_json(cached("np", 20, now_playing))
            if u.path in ("/api/football", "/api/football/season"):
                return self.send_json(cached("football", 600, football))
            if u.path == "/api/football-news":
                return self.send_json(cached("football-news", 1800, football_news))
            if u.path == "/api/github":
                return self.send_json(cached("github", 1800, github))
            if u.path == "/api/medium":
                return self.send_json(cached("medium", 1800, medium))
            if u.path == "/api/spotify/stats":
                return self.send_json(cached("sp_stats", 1800, spotify_stats))
            if u.path == "/api/music/search":
                q = (urllib.parse.parse_qs(u.query).get("q", [""])[0]).strip()
                if not q:
                    return self.send_json({"configured": True, "query": "", "results": []})
                return self.send_json(cached("ms:" + q.lower(), 300, lambda: music_search(q)))
            if u.path == "/api/music/lyrics":
                qd = urllib.parse.parse_qs(u.query)
                artist = qd.get("artist", [""])[0]
                title = qd.get("title", [""])[0]
                if not (artist and title):
                    return self.send_json({"configured": True, "found": False})
                return self.send_json(cached(f"ly:{artist}|{title}".lower(), 86400,
                                             lambda: music_lyrics(artist, title)))
            if u.path == "/api/spotify/login":
                e = env()
                q = urllib.parse.urlencode({"client_id": e.get("SPOTIFY_CLIENT_ID", ""), "response_type": "code",
                                            "redirect_uri": REDIRECT,
                                            "scope": "user-read-currently-playing user-read-recently-played"})
                self.send_response(302)
                self.send_header("Location", "https://accounts.spotify.com/authorize?" + q)
                return self.end_headers()
            if u.path == "/api/spotify/callback":
                e = env()
                code = urllib.parse.parse_qs(u.query).get("code", [""])[0]
                data = urllib.parse.urlencode({"grant_type": "authorization_code", "code": code,
                                               "redirect_uri": REDIRECT}).encode()
                _, tok = http_json("https://accounts.spotify.com/api/token", data,
                                   {"Authorization": "Basic " + sp_basic(e),
                                    "Content-Type": "application/x-www-form-urlencoded"})
                with open(ENV_FILE, "a", encoding="utf-8") as f:
                    f.write(f"\nSPOTIFY_REFRESH_TOKEN={tok['refresh_token']}\n")
                _cache.pop("np", None)
                return self.send_json({"ok": True, "saved_to": "spotify.env"})
        except Exception as ex:  # upstream down / bad creds -> front-end shows honest fallback
            return self.send_json({"error": str(ex)[:200]}, 502)
        return super().do_GET()

    def do_POST(self):
        u = urllib.parse.urlparse(self.path)
        if u.path != "/api/contact":
            return self.send_json({"error": "not found"}, 404)
        try:
            n = int(self.headers.get("Content-Length") or 0)
            raw = self.rfile.read(n) if n else b"{}"
            payload = json.loads(raw.decode("utf-8") or "{}")
        except (ValueError, UnicodeDecodeError):
            return self.send_json({"ok": False, "error": "Malformed request."}, 400)
        obj, code = contact(payload)
        return self.send_json(obj, code)

    def log_message(self, fmt, *args):
        if "/api/" in (args[0] if args else ""):
            super().log_message(fmt, *args)


if __name__ == "__main__":
    print(f"serving {HERE} -> http://127.0.0.1:{PORT}/hero6.html")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
