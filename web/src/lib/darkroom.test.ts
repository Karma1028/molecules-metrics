import { describe, expect, it } from "vitest"
import { developMs, progressAt, printLook, gradeOf, MIN_DEV_MS, MAX_DEV_MS, OVER_AT } from "./darkroom"

describe("developMs", () => {
  it("long exposures take longer than fast ones", () => {
    expect(developMs(2)).toBeGreaterThan(developMs(1 / 30))
  })
  it("stays inside the playable range", () => {
    expect(developMs(1 / 8000)).toBeCloseTo(MIN_DEV_MS, -1)
    expect(developMs(600)).toBe(MAX_DEV_MS)
  })
  it("falls back to a middling time when shutter is unknown", () => {
    const d = developMs(null)
    expect(d).toBeGreaterThan(MIN_DEV_MS)
    expect(d).toBeLessThan(MAX_DEV_MS)
  })
})

describe("progressAt", () => {
  it("is 0 at start, 1 at the develop time, and keeps going past it", () => {
    expect(progressAt(0, 3000)).toBe(0)
    expect(progressAt(3000, 3000)).toBeCloseTo(1)
    expect(progressAt(4500, 3000)).toBeCloseTo(1.5)
  })
  it("caps at fully fogged", () => {
    expect(progressAt(1e9, 3000)).toBeLessThanOrEqual(2)
  })
})

describe("gradeOf", () => {
  it("grades under, right and over", () => {
    expect(gradeOf(0.3)).toBe("underdeveloped")
    expect(gradeOf(1)).toBe("perfect")
    expect(gradeOf(OVER_AT + 0.2)).toBe("overdeveloped")
  })
})

describe("printLook", () => {
  it("is invisible at the start and fully clear at 1", () => {
    expect(printLook(0).opacity).toBe(0)
    expect(printLook(1).opacity).toBeCloseTo(1)
  })
  it("blows out brighter when over-developed", () => {
    expect(printLook(1.6).brightness).toBeGreaterThan(printLook(1).brightness)
    expect(printLook(1.6).contrast).toBeLessThan(printLook(1).contrast)
  })
})

import { STAGES, STAGE_MS, stagePct, nextStage, fixOutcome, finalLook } from "./darkroom"

describe("stages", () => {
  it("runs develop, stop, fix, dry, then lights on", () => {
    expect(STAGES).toEqual(["develop", "stop", "fix", "dry", "lights"])
    expect(nextStage("develop")).toBe("stop")
    expect(nextStage("dry")).toBe("lights")
    expect(nextStage("lights")).toBe("lights")
  })
  it("stop bath is quicker than fixer", () => {
    expect(STAGE_MS.stop).toBeLessThan(STAGE_MS.fix)
  })
})

describe("stagePct", () => {
  it("clamps 0..1", () => {
    expect(stagePct(0, 1000)).toBe(0)
    expect(stagePct(500, 1000)).toBe(0.5)
    expect(stagePct(9999, 1000)).toBe(1)
  })
})

describe("fixOutcome", () => {
  it("is stable only when both baths got their full time", () => {
    expect(fixOutcome(1, 1)).toBe("stable")
    expect(fixOutcome(0.4, 1)).toBe("fogs")
    expect(fixOutcome(1, 0.5)).toBe("fades")
  })
})

describe("finalLook", () => {
  it("under white light an unfixed print darkens, a half-fixed one fades", () => {
    const ok = finalLook(1, "stable")
    expect(finalLook(1, "fogs").brightness).toBeLessThan(ok.brightness)
    expect(finalLook(1, "fades").opacity).toBeLessThan(ok.opacity)
  })
  it("a stable print keeps the develop look", () => {
    expect(finalLook(1, "stable").opacity).toBeCloseTo(1)
  })
})
