import type { Mode } from "../lib/mode"

const OPTIONS: { mode: Mode; word: string; who: string }[] = [
  { mode: "day", word: "Day", who: "Karma" },
  { mode: "night", word: "Night", who: "Tuhin" },
]

export function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="mode-toggle" role="group" aria-label="Reading mode">
      {OPTIONS.map((o) => (
        <button
          key={o.mode}
          type="button"
          aria-pressed={mode === o.mode}
          onClick={() => onChange(o.mode)}
        >
          <span className="mt-word">{o.word}</span>
          <span className="mt-who">{o.who}</span>
        </button>
      ))}
    </div>
  )
}
