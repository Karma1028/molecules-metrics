import { motion } from "motion/react"
import type { ReactNode } from "react"
import { springs } from "../../lib/motion-tokens"
import { useSafeMotion } from "../../hooks/useSafeMotion"

/**
 * A museum-plate specimen frame: bordered media with a monospace label strip
 * ("fig.N — caption"). Used to present a photo, chart, or artifact as a
 * cataloged specimen in the field notebook.
 */
export function Specimen({
  children,
  label,
  caption,
  i = 0,
  className,
}: {
  children: ReactNode
  label: string
  caption?: string
  i?: number
  className?: string
}) {
  const safe = useSafeMotion()
  return (
    <motion.figure
      className={className}
      initial={safe.initial}
      whileInView={safe.animate}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ ...springs.gentle, delay: i * 0.07 }}
      style={{
        margin: 0,
        background: "var(--card)",
        padding: 10,
        boxShadow: "var(--shadow)",
        border: "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", background: "#1c1813" }}>{children}</div>
      <figcaption
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginTop: 8,
          font: '500 9.5px/1.3 "JetBrains Mono", monospace',
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        <span style={{ color: "var(--accent)" }}>{label}</span>
        {caption && <span>{caption}</span>}
      </figcaption>
    </motion.figure>
  )
}
