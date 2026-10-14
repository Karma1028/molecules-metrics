import { useEffect, useState } from "react"

/** Inline SVG icon that references a symbol in the injected sprite. */
export function Icon({ id, className = "ic" }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  )
}

/**
 * Fetches the sprite sheet once and injects it into the document so every
 * <use href="#i-..."> resolves. Mirrors the prototype's runtime injection.
 */
export function SpriteMount() {
  const [markup, setMarkup] = useState<string>("")
  useEffect(() => {
    let alive = true
    fetch("/assets/sprite.svg")
      .then((r) => r.text())
      .then((t) => {
        if (alive) setMarkup(t)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])
  if (!markup) return null
  return <div className="sprite" aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} />
}
