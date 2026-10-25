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
    wipe: [0.76, 0, 0.24, 1] as const, // world-switch wipe: hard in, hard out
    glide: [0.3, 0.1, 0.5, 1] as const, // horse shuttle / thread travel
    depart: [0.6, 0, 0.9, 0.4] as const, // a page leaving the deck: gathers speed, never snaps
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 18,
    lg: 36,
    xl: 64,
  },
  /** 3D section travel (lib/deck.ts): vh/vw offsets, degrees, seconds */
  deck: {
    roll: 0.8,
    recede: 0.84,
    exit: 0.55,
    /** world flip: share of a move spent turning; the rest is the zoom to or from card size */
    split: 0.55,
    enter: 0.9,
    /** fly-through: page scale when deep in the corridor / swelling past the lens */
    far: 0.42,
    near: 1.75,
    /** a page arriving from behind the camera starts closer than one leaving through it */
    nearIn: 1.28,
    flyExit: 0.42,
    flyEnter: 0.85,
    /** corridor of section frames drawn during a fly-through (px depth, s, deg) */
    gap: 520,
    frames: 6,
    tunnel: 1.3,
    twist: 5,
    /** light seam along the card's spine during a world flip (s) */
    seam: 1.2,
  },
  /** page headline entrance (components/headline): artist written in, analyst counted in */
  headline: {
    /** s between words (motion-patterns 0.05-0.10 band) */
    stagger: 0.05,
    /** ms every letter rolls digits before the first one settles */
    rollMs: 380,
    /** ms between letters settling, left to right */
    charMs: 34,
    /** ms between digit changes (a readable tick, not noise) */
    tickMs: 55,
    /** ms before the title shows anyway if it never reports in view */
    fallbackMs: 1500,
  },
  /**
   * Landing intro (components/intro): a keepy-uppy count, once per session.
   * Loader length is still Tuhin's call; every beat is here so it is one edit.
   */
  intro: {
    /** touches counted before the kick */
    touches: 6,
    /** ms per touch (ball up and back to the foot) */
    beatMs: 140,
    /** ms the last kick takes to leave the frame */
    kickMs: 420,
    /** ms after the kick before "Then he counted." starts counting in */
    countDelayMs: 260,
    /** ms the finished line holds before the page lifts */
    holdMs: 520,
    /** ms the overlay takes to lift off the landing */
    exitMs: 560,
  },
  /**
   * Pointers (components/pointer). lambda = damping per ms for lib/damp.ts.
   * Measured refs (audit/rea-2026-10-19 §2b/§2d): inkwell ring 0.006 (t63 ~167 ms),
   * tight dot ~60 ms → 0.016; magnet pulls 0.2 of the offset toward a hovered target.
   */
  pointer: {
    /** ball follow: a touch quicker than inkwell (.006) so the dribble reads as play, not lag */
    ring: 0.009,
    dot: 0.016,
    magnet: 0.2,
    /** artist ball: radius (px), gap it rests below a hovered link, speed (px/ms) where speed lines are full */
    ballR: 7,
    ballRest: 4,
    speedFull: 2.2,
    /** world switch: ball shrinks into the analyst data point (and back), seconds */
    handoff: 0.6,
    /** analyst lock label: max characters read out */
    labelMax: 18,
    settleEps: 0.1,
    /** analyst lock bracket padding around a hovered control (px) */
    lockPad: 6,
    /** analyst x,y readout: offset from the pointer, and edge distance where it flips side (px) */
    readoutOffset: 14,
    readoutFlip: 150,
    /** rAF dt clamp after a stall, and the dt assumed on the first frame (ms) */
    maxDtMs: 64,
    firstDtMs: 16,
  },
  /** Artist home pat scroll (worlds/artist/scroll, PAT-SCROLL-SPEC). lambda per ms. */
  scroll: {
    /** camera follow along the strip */
    camLambda: 0.007,
    /** wheel px to strip px */
    wheelGain: 1.1,
    /** ms without wheel input before the camera settles on the nearest panel */
    snapIdleMs: 220,
    /** brush radius (px) of the reveal under the pointer */
    brushR: 52,
    /** brush stamps per radius along a fast stroke */
    stampStep: 0.35,
    /** ms an object takes to ink in fully once hovered or focused */
    bloomMs: 600,
    /** backing-store pixel ratio cap for the ink canvases */
    inkDpr: 1.5,
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
