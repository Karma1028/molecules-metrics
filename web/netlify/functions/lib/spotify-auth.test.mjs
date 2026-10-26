import { describe, it, expect } from "vitest"
import { authUrl, exchangeCode, SCOPES } from "./spotify-auth.mjs"

describe("spotify auth helper", () => {
  it("builds an authorize URL with the three read scopes and state", () => {
    const u = new URL(authUrl("cid", "http://127.0.0.1:8888/callback", "st8"))
    expect(u.origin + u.pathname).toBe("https://accounts.spotify.com/authorize")
    expect(u.searchParams.get("client_id")).toBe("cid")
    expect(u.searchParams.get("response_type")).toBe("code")
    expect(u.searchParams.get("redirect_uri")).toBe("http://127.0.0.1:8888/callback")
    expect(u.searchParams.get("state")).toBe("st8")
    expect(u.searchParams.get("scope").split(" ").sort()).toEqual([...SCOPES].sort())
  })

  it("exchangeCode returns the refresh token and sends basic auth", async () => {
    let seen
    const f = async (url, init) => {
      seen = { url, init }
      return { ok: true, json: async () => ({ refresh_token: "r-tok" }) }
    }
    const t = await exchangeCode({ id: "a", secret: "b" }, "code1", "http://127.0.0.1:8888/callback", f)
    expect(t).toBe("r-tok")
    expect(seen.init.headers.Authorization).toBe("Basic " + Buffer.from("a:b").toString("base64"))
    expect(String(seen.init.body)).toContain("code=code1")
  })

  it("exchangeCode returns null on failure and never echoes the body", async () => {
    const f = async () => ({ ok: false, status: 400, text: async () => "secret leaked" })
    expect(await exchangeCode({ id: "a", secret: "b" }, "c", "http://x", f)).toBeNull()
  })
})
