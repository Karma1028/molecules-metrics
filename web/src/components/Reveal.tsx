import { useEffect, useRef, type ReactNode, type CSSProperties } from "react"

/**
 * Scroll-reveal wrapper. Matches the prototype's [data-rise] + IntersectionObserver
 * pattern (CSS drives the transition; we only toggle the `.in` class). Index `i`
 * sets the stagger delay via the --i custom property.
 */
export function Reveal({
  children,
  i = 0,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode
  i?: number
  className?: string
  style?: CSSProperties
  as?: "div" | "section" | "a"
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const mergedStyle = { ...(style || {}), ["--i" as string]: i } as CSSProperties
  return (
    // @ts-expect-error dynamic intrinsic tag
    <Tag ref={ref} data-rise="" className={className} style={mergedStyle}>
      {children}
    </Tag>
  )
}
