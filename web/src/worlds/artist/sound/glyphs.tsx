/**
 * Brand glyphs for the Sound page. Kept as faithful, unaltered marks
 * (Spotify green circle + waves; YouTube red rounded play) used only to
 * identify the source of a result — no implied endorsement.
 */

export function SpotifyGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "0 0 auto" }}>
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <g fill="none" stroke="#000" strokeLinecap="round">
        <path d="M6 9.2c4-1.1 8-.7 11.2 1.1" strokeWidth="1.9" />
        <path d="M6.6 12.4c3.3-.9 6.6-.5 9.2 1" strokeWidth="1.6" />
        <path d="M7.2 15.3c2.6-.7 5.2-.4 7.3.8" strokeWidth="1.3" />
      </g>
    </svg>
  )
}

export function YouTubeGlyph({ size = 16 }: { size?: number }) {
  const w = size
  const h = Math.round((size * 20) / 28)
  return (
    <svg width={w} height={h} viewBox="0 0 28 20" aria-hidden="true" style={{ flex: "0 0 auto" }}>
      <rect x="0" y="0" width="28" height="20" rx="5" fill="#FF0000" />
      <path d="M11 6 L19 10 L11 14 Z" fill="#fff" />
    </svg>
  )
}
