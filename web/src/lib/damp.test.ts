import { describe, it, expect } from 'vitest'
import { damp, magnetAim, settled } from './damp'

describe('damp', () => {
  it('reaches ~63% of the gap after one time constant (1/lambda)', () => {
    const lambda = 0.006
    expect(damp(0, 100, lambda, 1 / lambda)).toBeCloseTo(63.2, 1)
  })

  it('is frame-rate independent: 1 step of 32ms equals 2 steps of 16ms', () => {
    const one = damp(0, 100, 0.006, 32)
    const two = damp(damp(0, 100, 0.006, 16), 100, 0.006, 16)
    expect(one).toBeCloseTo(two, 10)
  })

  it('does not move when dt is 0 and never overshoots', () => {
    expect(damp(10, 100, 0.006, 0)).toBe(10)
    expect(damp(10, 100, 0.006, 1e6)).toBeLessThanOrEqual(100)
  })

  it('clamps negative or NaN dt to no movement', () => {
    expect(damp(5, 50, 0.006, -16)).toBe(5)
    expect(damp(5, 50, 0.006, Number.NaN)).toBe(5)
  })
})

describe('magnetAim', () => {
  it('aims at the centre plus k of the pointer offset', () => {
    expect(magnetAim({ x: 100, y: 100 }, { x: 150, y: 80 }, 0.2)).toEqual({ x: 110, y: 96 })
  })

  it('returns a new object (no mutation of inputs)', () => {
    const c = { x: 0, y: 0 }
    const out = magnetAim(c, { x: 10, y: 10 }, 0.2)
    expect(out).not.toBe(c)
    expect(c).toEqual({ x: 0, y: 0 })
  })
})

describe('settled', () => {
  it('is true only when every gap is under the epsilon', () => {
    expect(settled([[1, 1.05], [5, 5]], 0.1)).toBe(true)
    expect(settled([[1, 1.5], [5, 5]], 0.1)).toBe(false)
  })
})

describe('reduced motion and edge cases', () => {
  it('snaps straight to the target when lambda is Infinity (reduced-motion path)', () => {
    expect(damp(0, 42, Infinity, 16)).toBe(42)
  })

  it('treats an empty pair list as settled', () => {
    expect(settled([], 0.1)).toBe(true)
  })
})
