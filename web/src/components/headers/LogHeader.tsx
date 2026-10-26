import type { ReactNode } from "react"
import { Headline } from "../headline/Headline"

export interface LogHeaderProps {
  log?: string
  section: string
  tag?: string
  title: ReactNode
  lede?: ReactNode
  right?: ReactNode
  className?: string
}

/**
 * Analyst header grammar (MASTER-PLAN §3, fixes C2):
 * LOG.0X / SECTION / tag ▍
 * Title (Space Grotesk 700 roman, never italic, no highlighter)
 * // mono/technical lede, 1 line, teal key terms
 */
export function LogHeader({
  log,
  section,
  tag,
  title,
  lede,
  right,
  className = "",
}: LogHeaderProps) {
  const monoId = [log, section.toUpperCase(), tag].filter(Boolean).join(" / ")

  return (
    <header className={`log-head ${className}`}>
      <div className="lh-main">
        <div className="lh-mono">
          <span className="lh-id">{monoId}</span>
          <span className="lh-caret" aria-hidden="true">▍</span>
        </div>
        <Headline world="analyst" className="lh-title">{title}</Headline>
        {lede && (
          <p className="lh-lede">
            <span className="lh-prefix">// </span>
            {lede}
          </p>
        )}
      </div>
      {right && <div className="lh-right">{right}</div>}
    </header>
  )
}
