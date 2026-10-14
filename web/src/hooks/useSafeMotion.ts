import { useEffect, useState } from 'react'
import { motionTokens } from '../lib/motion-tokens'

/**
 * Returns prefers-reduced-motion state, SSR-safe (false until mounted).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export interface SafeMotionVariants {
  initial: Record<string, number>
  animate: Record<string, number>
  exit: Record<string, number>
}

/**
 * Entrance/exit variants that collapse to opacity-only when the user
 * prefers reduced motion. `distance` is the vertical travel (px) used
 * when motion is allowed.
 */
export function useSafeMotion(distance: number = motionTokens.distance.md): SafeMotionVariants {
  const reduced = useReducedMotion()
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }
  }
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -distance },
  }
}
