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

  it('exposes ease-out expo and quart tokens for entrances', () => {
    expect(motionTokens.easing.expoOut).toEqual([0.16, 1, 0.3, 1])
    expect(motionTokens.easing.quartOut).toEqual([0.25, 1, 0.5, 1])
  })

  it('no easing overshoots or bounces (control points y stay in 0..1)', () => {
    for (const [name, curve] of Object.entries(motionTokens.easing)) {
      const [, y1, , y2] = curve
      expect(y1, name).toBeGreaterThanOrEqual(0)
      expect(y1, name).toBeLessThanOrEqual(1)
      expect(y2, name).toBeGreaterThanOrEqual(0)
      expect(y2, name).toBeLessThanOrEqual(1)
    }
  })

  it('springs use the spring type', () => {
    for (const s of Object.values(springs)) {
      expect(s.type).toBe('spring')
    }
  })
})
