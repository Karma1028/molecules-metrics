import { describe, it, expect } from "vitest"
import handler from "../frames.mjs"

describe("/api/frames", () => {
  it("answers an empty frame list with cache headers so the UI keeps its local frames", async () => {
    const res = await handler()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ frames: [] })
    expect(res.headers.get("cache-control")).toMatch(/max-age=\d+/)
  })
})
