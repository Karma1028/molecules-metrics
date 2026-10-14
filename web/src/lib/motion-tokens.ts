/**
 * Motion design tokens — the single source for every duration, easing,
 * distance, scale and spring used across both worlds. No raw numbers in
 * components; import from here (per motion-patterns skill).
 */

export const motionTokens = {
  duration: {
    fast: 0.18,
    normal: 0.32,
    slow: 0.6,
    cinematic: 1.1,
  },
  easing: {
    // cubic-bezier arrays usable by `motion`
    smooth: [0.22, 1, 0.36, 1] as const, // easeOutExpo-ish
    inOut: [0.65, 0, 0.35, 1] as const,
    out: [0, 0, 0.2, 1] as const,
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 18,
    lg: 36,
    xl: 64,
  },
  scale: {
    press: 0.97,
    subtle: 0.98,
    pop: 1.03,
  },
} as const

export const springs = {
  snappy: { type: 'spring', stiffness: 520, damping: 32, mass: 0.7 },
  gentle: { type: 'spring', stiffness: 260, damping: 28, mass: 1 },
  slow: { type: 'spring', stiffness: 140, damping: 26, mass: 1.2 },
} as const

export type MotionTokens = typeof motionTokens
export type Springs = typeof springs

// Frozen at runtime so nothing mutates the shared token object.
Object.freeze(motionTokens)
Object.freeze(springs)
