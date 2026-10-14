/**
 * Alpona line motifs (BENGAL-MOTIF §2B) — ritual rice-paste linework, inline
 * SVG so `currentColor` tints to the terracotta accent. Decorative only:
 * aria-hidden, never carry meaning. Paths mirror public/motifs/alpona-*.svg.
 */

export function AlponaRule({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 28"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M0 14h176" />
        <path d="M304 14h176" />
        <path d="M176 14c10-12 20-12 30 0s20 12 34 0c14 12 24 12 34 0s20-12 30 0" />
        <path d="M240 4c-6 6-6 14 0 20 6-6 6-14 0-20z" />
        <path d="M200 14c0-5 4-5 4 0s-4 5-4 0zM276 14c0-5 4-5 4 0s-4 5-4 0z" />
      </g>
      <g fill="currentColor">
        <circle cx="162" cy="14" r="2" />
        <circle cx="318" cy="14" r="2" />
        <circle cx="148" cy="14" r="1.4" />
        <circle cx="332" cy="14" r="1.4" />
      </g>
    </svg>
  )
}

export function AlponaCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role="presentation"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 116V4h112" />
        <path d="M4 40c20 0 36-16 36-36" />
        <path d="M4 64c34 0 60-26 60-60" />
        <path d="M20 20c10-6 20-6 26 2-8 8-18 8-26-2z" />
        <path d="M44 44c8-6 16-4 20 4-8 6-16 4-20-4z" />
        <path d="M20 20c-6 10-6 20 2 26 8-8 8-18-2-26z" />
      </g>
      <g fill="currentColor">
        <circle cx="82" cy="12" r="2" />
        <circle cx="12" cy="82" r="2" />
        <circle cx="100" cy="12" r="1.4" />
        <circle cx="12" cy="100" r="1.4" />
      </g>
    </svg>
  )
}
