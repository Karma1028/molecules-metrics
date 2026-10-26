import { describe, it, expect } from 'vitest'
import { feetAim, rollDegrees, speedAmount, labelOf } from './pointer-math'

describe('feetAim', () => {
  const box = { left: 100, top: 40, width: 80, bottom: 60 }
  it('rests under the control, never on its label', () => {
    expect(feetAim(box, { x: 140, y: 50 }, 0.2, 7, 4)).toEqual({ x: 140, y: 71 })
  })
  it('slides k of the way along with the pointer', () => {
    expect(feetAim(box, { x: 190, y: 50 }, 0.2, 7, 4).x).toBeCloseTo(150)
  })
})

describe('rollDegrees', () => {
  it('turns one radian per radius travelled', () => {
    expect(rollDegrees(7, 0, 7)).toBeCloseTo(57.2958, 3)
  })
  it('rolls the other way when moving left', () => {
    expect(rollDegrees(-14, 0, 7)).toBeLessThan(0)
  })
  it('is zero when still or with a bad radius', () => {
    expect(rollDegrees(0, 0, 7)).toBe(0)
    expect(rollDegrees(5, 5, 0)).toBe(0)
  })
})

describe('speedAmount', () => {
  it('clamps to 0..1', () => {
    expect(speedAmount(0, 2)).toBe(0)
    expect(speedAmount(1, 2)).toBe(0.5)
    expect(speedAmount(9, 2)).toBe(1)
    expect(speedAmount(Number.NaN, 2)).toBe(0)
  })
})

describe('labelOf', () => {
  it('prefers aria-label, trims to max with an ellipsis', () => {
    const a = document.createElement('a')
    a.setAttribute('aria-label', 'Download the full résumé as PDF')
    expect(labelOf(a, 12)).toBe('Download th…')
  })
  it('falls back to the first non-empty line of text', () => {
    const b = document.createElement('button')
    b.textContent = '\n   Résumé \n Academic PDF'
    expect(labelOf(b, 18)).toBe('Résumé')
  })
})
