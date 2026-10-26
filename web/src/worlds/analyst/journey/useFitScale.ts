import { useEffect, useState, type RefObject } from "react"

export interface Box {
  w: number
  h: number
}

/** Live pixel size of an element, so the map camera can match its shape. */
export function useBoxSize(ref: RefObject<HTMLElement | null>): Box {
  const [box, setBox] = useState<Box>({ w: 0, h: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === "undefined") return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setBox((b) => (Math.round(r.width) === b.w && Math.round(r.height) === b.h ? b : { w: Math.round(r.width), h: Math.round(r.height) }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return box
}
