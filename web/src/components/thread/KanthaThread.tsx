import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { MAX_STITCHES, recordVisit, stitchColor, type Stitch } from "../../lib/route-thread"
import "./kantha-thread.css"

/** A running-stitch thread in the left margin: one stitch per page the visitor opens this session. */
export function KanthaThread() {
  const { pathname } = useLocation()
  const [stitches, setStitches] = useState<Stitch[]>([])

  useEffect(() => {
    setStitches(recordVisit(pathname))
  }, [pathname])

  if (stitches.length === 0) return null
  return (
    <div
      className="kantha-thread"
      role="img"
      aria-label={`Your thread: ${stitches.length} ${stitches.length === 1 ? "page" : "pages"} opened this session. It stays on your device.`}
    >
      {stitches.map((s, i) => (
        <i
          key={`${i}-${s.path}`}
          className={i === stitches.length - 1 ? "st new" : "st"}
          style={{ background: stitchColor(s.path), ["--i" as string]: i % MAX_STITCHES }}
        />
      ))}
    </div>
  )
}
