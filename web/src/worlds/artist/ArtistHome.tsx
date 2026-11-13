import { AlponaRule } from "../../components/motifs/Alpona"
import { useGoaPhrase } from "../../lib/useGoaClock"
import { useOneScreen } from "../../hooks/useOneScreen"
import { Headline } from "../../components/headline/Headline"
import { PatScroll, type ScrollPanel } from "./scroll/PatScroll"

/**
 * Artist home v3: the pat scroll (PAT-SCROLL-SPEC). Six drawn panels read
 * left to right; each sits in pencil until the pointer looks at it, then the
 * ink comes in. "He watched." Previous masthead home: archive/artist-home.
 */
const PANELS: ScrollPanel[] = [
  { to: "/artist/gallery", img: "/pat/panel-0.webp", num: "01", label: "Gallery", gloss: "Ten exposures, curated." },
  { to: "/artist/sound", img: "/pat/panel-1.webp", num: "02", label: "Sound", gloss: "Eight years of listening, logged." },
  { to: "/artist/matchday", img: "/pat/panel-2.webp", num: "03", label: "Matchday", gloss: "Camp Nou, from the terrace." },
  { to: "/artist/notes", img: "/pat/panel-3.webp", num: "04", label: "Field Notes", gloss: "Goa reflections, in ink." },
  { to: "/artist/about", img: "/pat/panel-4.webp", num: "05", label: "About", gloss: "Origins, in ink." },
  { to: "/artist/contact", img: "/pat/panel-5.webp", num: "06", label: "Contact", gloss: "Direct channels." },
]

const CSS = String.raw`
  .p-ah3{flex:1;min-height:0;display:flex;width:100%;overflow:hidden}
  .p-ah3 .kick{display:flex;align-items:center;gap:10px;font:600 11px/1 var(--font-mono);letter-spacing:.26em;
    text-transform:uppercase;color:var(--accent-ink)}
  .p-ah3 .horse{width:30px;aspect-ratio:1/1;flex-shrink:0;background:var(--accent);
    -webkit-mask:url(/motifs/bankura-horse.webp) center / contain no-repeat;mask:url(/motifs/bankura-horse.webp) center / contain no-repeat}
  .p-ah3 .ttl{font-family:var(--font-display);font-weight:900;line-height:.86;letter-spacing:-.035em;color:var(--ink);
    font-size:clamp(44px,7vw,100px);margin:10px 0 4px}
  .p-ah3 .ttl em{font-style:italic;font-weight:500;color:var(--accent-ink)}
  .p-ah3 .ttl em.hl{padding:0 .08em}
  .p-ah3 .rule{display:block;width:min(100%,320px);height:14px;color:var(--accent-ink);opacity:.55;margin:4px 0 6px}
  .p-ah3 .state{font-family:var(--font-hand);font-size:clamp(16px,1.6vw,21px);color:var(--muted);rotate:-.6deg;max-width:30ch;margin:0}
  .p-ah3 .goa{font:500 11px/1.3 var(--font-mono);letter-spacing:.04em;color:var(--muted);margin-top:8px}
  .p-ah3 .hint{font:600 11px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--accent-ink);margin-top:14px}
`

export function ArtistHome() {
  const goaPhrase = useGoaPhrase()
  useOneScreen("toc")

  const opening = (
    <>
      <div className="kick">
        <span className="horse" aria-hidden="true" />
        Field Notebook · Goa
      </div>
      <Headline world="artist" className="ttl">
        The <em className="hl">Artist</em>
      </Headline>
      <AlponaRule className="rule" />
      <p className="state">Six panels, still in pencil. Look at one and the ink comes in.</p>
      {goaPhrase ? <p className="goa">{goaPhrase}</p> : null}
      <p className="hint" aria-hidden="true">Scroll along &rarr;</p>
    </>
  )

  return (
    <main className="page p-ah3wrap" aria-label="Artist field notebook">
      <style>{CSS}</style>
      <div className="p-ah3">
        <PatScroll opening={opening} panels={PANELS} />
      </div>
    </main>
  )
}
