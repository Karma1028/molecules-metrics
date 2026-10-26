import { describe, expect, it, vi } from "vitest"
import { credsFrom, mintToken, shapeTrack, shapeStats, getNowPlaying, getStats } from "./spotify.mjs"

const ENV = { SPOTIFY_CLIENT_ID: "id", SPOTIFY_CLIENT_SECRET: "sec", SPOTIFY_REFRESH_TOKEN: "rt" }
const res = (status, body) => ({ status, ok: status >= 200 && status < 300, json: async () => body })

describe("credsFrom", () => {
  it("returns creds only when all three are set", () => {
    expect(credsFrom(ENV)).toEqual({ id: "id", secret: "sec", refresh: "rt" })
    expect(credsFrom({ ...ENV, SPOTIFY_REFRESH_TOKEN: "" })).toBeNull()
    expect(credsFrom({})).toBeNull()
  })
})

describe("mintToken", () => {
  it("posts the refresh grant with basic auth and returns the access token", async () => {
    const f = vi.fn().mockResolvedValue(res(200, { access_token: "AT" }))
    expect(await mintToken(credsFrom(ENV), f)).toBe("AT")
    const [url, opts] = f.mock.calls[0]
    expect(url).toBe("https://accounts.spotify.com/api/token")
    expect(opts.headers.Authorization).toBe("Basic " + Buffer.from("id:sec").toString("base64"))
    expect(String(opts.body)).toContain("grant_type=refresh_token")
    expect(String(opts.body)).toContain("refresh_token=rt")
  })
  it("returns null when Spotify refuses", async () => {
    const f = vi.fn().mockResolvedValue(res(400, { error: "invalid_grant" }))
    expect(await mintToken(credsFrom(ENV), f)).toBeNull()
  })
})

const TRACK = {
  name: "Song",
  artists: [{ name: "A" }, { name: "B" }],
  album: { name: "Alb", images: [{ url: "big" }, { url: "mid" }, { url: "small" }] },
  external_urls: { spotify: "https://open.spotify.com/track/1" },
}

describe("shapeTrack", () => {
  it("matches the NowPlaying shape the UI reads", () => {
    expect(shapeTrack(TRACK, true, null)).toEqual({
      configured: true,
      isPlaying: true,
      title: "Song",
      artist: "A, B",
      album: "Alb",
      art: "mid",
      url: "https://open.spotify.com/track/1",
      playedAt: null,
    })
  })
})

describe("getNowPlaying", () => {
  it("is not configured without creds", async () => {
    expect(await getNowPlaying({}, vi.fn())).toEqual({ configured: false })
  })
  it("returns the playing track when something is playing", async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(res(200, { access_token: "AT" }))
      .mockResolvedValueOnce(res(200, { is_playing: true, item: TRACK }))
    const out = await getNowPlaying(ENV, f)
    expect(out.isPlaying).toBe(true)
    expect(out.title).toBe("Song")
  })
  it("falls back to the last played track when nothing is playing", async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(res(200, { access_token: "AT" }))
      .mockResolvedValueOnce(res(204, null))
      .mockResolvedValueOnce(res(200, { items: [{ track: TRACK, played_at: "2026-10-26T01:00:00Z" }] }))
    const out = await getNowPlaying(ENV, f)
    expect(out.isPlaying).toBe(false)
    expect(out.playedAt).toBe("2026-10-26T01:00:00Z")
  })
  it("never throws when the network fails", async () => {
    const f = vi.fn().mockRejectedValue(new Error("down"))
    expect(await getNowPlaying(ENV, f)).toEqual({ configured: false })
  })
})

describe("shapeStats", () => {
  it("builds top artists, tracks and aggregated genres", () => {
    const arts = { items: [{ name: "A", images: [{ url: "a.jpg" }], genres: ["pop", "rock"] }, { name: "B", images: [], genres: ["pop"] }] }
    const s = shapeStats(arts, { items: [TRACK] }, 123)
    expect(s.configured).toBe(true)
    expect(s.range).toBe("medium_term")
    expect(s.topArtists[0]).toEqual({ name: "A", img: "a.jpg" })
    expect(s.topTracks[0].artist).toBe("A, B")
    expect(s.topGenres[0]).toEqual({ name: "pop", weight: 2 })
    expect(s.fetchedAt).toBe(123)
    expect(s.aura).toBeNull()
  })
})

describe("getStats", () => {
  it("is not configured when the token lacks the scope (403)", async () => {
    const f = vi.fn().mockResolvedValueOnce(res(200, { access_token: "AT" })).mockResolvedValueOnce(res(403, {}))
    expect(await getStats(ENV, f)).toEqual({ configured: false, reason: "scope" })
  })
  it("returns shaped stats on success", async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(res(200, { access_token: "AT" }))
      .mockResolvedValueOnce(res(200, { items: [{ name: "A", images: [], genres: [] }] }))
      .mockResolvedValueOnce(res(200, { items: [TRACK] }))
    const s = await getStats(ENV, f)
    expect(s.configured).toBe(true)
    expect(s.topArtists).toHaveLength(1)
  })
})
