import { describe, it, expect } from 'vitest'
import { motionTokens, springs } from './motion-tokens'

describe('motionTokens', () => {
  it('is frozen (shared token object cannot mutate)', () => {
    expect(Object.isFrozen(motionTokens)).toBe(true)
    expect(Object.isFrozen(springs)).toBe(true)
  })

  it('durations are within a sane UI range', () => {
    for (const d of Object.values(motionTokens.duration)) {
      expect(d).toBeGreaterThan(0)
      expect(d).toBeLessThanOrEqual(2)
    }
  })

  it('stagger-relevant scales stay near 1', () => {
    expect(motionTokens.scale.press).toBeLessThan(1)
    expect(motionTokens.scale.pop).toBeGreaterThan(1)
  })

  it('springs use the spring type', () => {
    for (const s of Object.values(springs)) {
      expect(s.type).toBe('spring')
    }
  })
})
