import type { ReactNode } from "react"
import { AlponaRule } from "../motifs/Alpona"

export interface PlateHeaderProps {
  plate?: string
  kicker: string
  title: ReactNode
  note?: string
  lede?: ReactNode
  right?: ReactNode
  showRule?: boolean
  className?: string
}

/**
 * Artist header grammar (MASTER-PLAN §3, fixes C2):
 * [horse] Plate X · <Kicker>
 * <Title> (Fraunces 900, .hl sweep)
 * ~ <Hand note> (Caveat, rotated)
 */
export function PlateHeader({
  plate,
  kicker,
  title,
  note,
  lede,
  right,
  showRule = true,
  className = "",
}: PlateHeaderProps) {
  const kickText = plate ? `${plate} · ${kicker}` : kicker

  return (
    <header className={`plate-head ${className}`}>
      <div className="ph-main">
        <div className="ph-kick">
          <span className="horse-glyph" aria-hidden="true" />
          <span>{kickText}</span>
        </div>
        <div className="ph-title-wrap">
          <h1 className="ph-title">{title}</h1>
          {note && <span className="ph-note">{note}</span>}
        </div>
        {showRule && <AlponaRule className="ph-rule" />}
        {lede && <p className="ph-lede">{lede}</p>}
      </div>
      {right && <div className="ph-right">{right}</div>}
    </header>
  )
}
