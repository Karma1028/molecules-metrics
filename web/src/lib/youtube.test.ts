import { describe, expect, it } from "vitest"
import type { MusicTrack } from "./music"
import {
  canResolve,
  directPlan,
  displayTitle,
  leadArtist,
  lyricLookup,
  normTitle,
  pickYouTubeMatch,
  youtubeQuery,
} from "./youtube"

const yt = (id: string, title: string, artist = "T-Series"): MusicTrack => ({ id, title, artist, source: "youtube" })
const song = (over: Partial<MusicTrack> = {}): MusicTrack => ({
  id: "56zZ48jdyY2oDXHVnwg5Di",
  title: 'Tum Hi Ho (From "Aashiqui 2")',
  artist: "Arijit Singh, Mithoon",
  source: "spotify",
  ...over,
})

describe("youtubeQuery", () => {
  it("uses the lead artist, drops bracketed suffixes and asks for official audio", () => {
    expect(youtubeQuery(song())).toBe("Arijit Singh Tum Hi Ho official audio")
  })

  it("skips placeholder or empty artists", () => {
    expect(youtubeQuery({ title: "Yaara", artist: "" })).toBe("Yaara official audio")
    expect(youtubeQuery({ title: "Yaara", artist: "pasted link" })).toBe("Yaara official audio")
  })

  it("caps the query length", () => {
    expect(youtubeQuery({ title: "a".repeat(400), artist: "b" }).length).toBeLessThanOrEqual(110)
  })
})

describe("leadArtist / normTitle", () => {
  it("splits common credit separators", () => {
    expect(leadArtist("Daft Punk feat. Pharrell")).toBe("Daft Punk")
    expect(leadArtist("A & B")).toBe("A")
  })
  it("normalises punctuation, case and brackets", () => {
    expect(normTitle("Tum Hi Ho (From \"Aashiqui 2\")!")).toBe("tum hi ho")
  })
})

describe("pickYouTubeMatch", () => {
  const results: MusicTrack[] = [
    song(),
    yt("aaaaaaaaaaa", "Aashiqui 2 Jukebox"),
    yt("bbbbbbbbbbb", "Arijit Singh - Tum Hi Ho (Official Audio)"),
  ]

  it("prefers the YouTube hit whose title contains the wanted title", () => {
    expect(pickYouTubeMatch(results, song())?.id).toBe("bbbbbbbbbbb")
  })

  it("falls back to the first YouTube hit", () => {
    expect(pickYouTubeMatch(results, { title: "Something Else" })?.id).toBe("aaaaaaaaaaa")
    expect(pickYouTubeMatch(results)?.id).toBe("aaaaaaaaaaa")
  })

  it("ignores non-YouTube results and malformed ids", () => {
    expect(pickYouTubeMatch([song(), yt("short", "Tum Hi Ho")], song())).toBeNull()
    expect(pickYouTubeMatch([])).toBeNull()
  })
})

describe("directPlan / canResolve", () => {
  it("plays YouTube videos directly, keeping the start time", () => {
    expect(directPlan({ ...yt("Umqb9KENgmk", "x"), start: 42 })).toEqual({ kind: "yt", videoId: "Umqb9KENgmk", start: 42 })
  })
  it("plays YouTube playlists by list id", () => {
    expect(directPlan({ ...yt("PL123", "x"), kind: "playlist" })).toEqual({ kind: "yt", list: "PL123", start: 0 })
  })
  it("needs a lookup for Spotify / iTunes songs only", () => {
    expect(directPlan(song())).toBeNull()
    expect(canResolve(song())).toBe(true)
    expect(canResolve(song({ source: "apple" }))).toBe(true)
    expect(canResolve(song({ kind: "track" }))).toBe(true)
    expect(canResolve(song({ kind: "album" }))).toBe(false)
    expect(canResolve(yt("Umqb9KENgmk", "x"))).toBe(false)
  })
})

describe("lyricLookup / displayTitle", () => {
  it("keeps catalog artist and title for Spotify / iTunes", () => {
    expect(lyricLookup(song())).toEqual({ artist: "Arijit Singh, Mithoon", title: 'Tum Hi Ho (From "Aashiqui 2")' })
  })
  it("splits Artist - Song uploads and strips noise", () => {
    expect(lyricLookup(yt("x", "Arijit Singh - Tum Hi Ho (Official Audio)"))).toEqual({ artist: "Arijit Singh", title: "Tum Hi Ho" })
  })
  it("uses a Topic channel as the artist", () => {
    expect(lyricLookup(yt("x", "Tum Hi Ho", "Arijit Singh - Topic"))).toEqual({ artist: "Arijit Singh", title: "Tum Hi Ho" })
  })
  it("cleans label uploads down to searchable words", () => {
    const t = yt("x", "Tum Hi Ho Full Video Song | Aashiqui 2 | Aditya Roy Kapur")
    expect(lyricLookup(t)).toEqual({ artist: "", title: "Tum Hi Ho" })
    expect(displayTitle(t)).toBe("Tum Hi Ho Full Video Song")
  })
})
