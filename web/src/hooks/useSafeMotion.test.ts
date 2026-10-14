import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSafeMotion } from './useSafeMotion'
import { mockReducedMotion } from '../test/setup'

describe('useSafeMotion', () => {
  it('includes vertical travel when motion is allowed', () => {
    mockReducedMotion(false)
    const { result } = renderHook(() => useSafeMotion(20))
    expect(result.current.initial.y).toBe(20)
    expect(result.current.animate.y).toBe(0)
    expect(result.current.exit.y).toBe(-20)
  })

  it('collapses to opacity-only under prefers-reduced-motion', () => {
    mockReducedMotion(true)
    const { result } = renderHook(() => useSafeMotion(20))
    expect(result.current.initial).toEqual({ opacity: 0 })
    expect(result.current.animate).toEqual({ opacity: 1 })
    expect('y' in result.current.initial).toBe(false)
  })
})
