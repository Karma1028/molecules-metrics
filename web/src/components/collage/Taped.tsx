import { motion } from "motion/react"
import type { ReactNode, CSSProperties } from "react"
import { motionTokens, springs } from "../../lib/motion-tokens"

type TapeSide = "top" | "top-left" | "top-right" | "none"

/**
 * A paper card taped to the page — the core field-notebook surface. Sits at a
 * slight angle, lifts on hover, and carries a torn tape strip. Render it as a
 * link by passing `href`.
 */
export function Taped({
  children,
  rotate = -1.5,
  tape = "top",
  href,
  className,
  style,
}: {
  children: ReactNode
  rotate?: number
  tape?: TapeSide
  href?: string
  className?: string
  style?: CSSProperties
}) {
  const Tag = href ? motion.a : motion.div
  const tapePos: Record<Exclude<TapeSide, "none">, CSSProperties> = {
    top: { top: -10, left: "50%", translate: "-50% 0", rotate: "-3deg" },
    "top-left": { top: -9, left: 18, rotate: "-8deg" },
    "top-right": { top: -9, right: 18, rotate: "7deg" },
  }
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener" : undefined}
      className={className}
      style={{
        position: "relative",
        display: "block",
        background: "var(--card)",
        color: "var(--ink)",
        borderRadius: 6,
        padding: "16px 18px",
        boxShadow: "var(--shadow)",
        textDecoration: "none",
        rotate: `${rotate}deg`,
        ...style,
      }}
      whileHover={{ translateY: -6, rotate: 0, scale: motionTokens.scale.subtle }}
      whileTap={href ? { scale: motionTokens.scale.press } : undefined}
      transition={springs.snappy}
    >
      {tape !== "none" && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 74,
            height: 22,
            background: "color-mix(in srgb, var(--accent) 22%, #e8d2a0 40%)",
            boxShadow: "0 1px 3px rgba(0,0,0,.08)",
            zIndex: 2,
            ...tapePos[tape],
          }}
        />
      )}
      {children}
    </Tag>
  )
}
