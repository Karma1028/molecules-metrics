import { useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { useMedium } from "../../lib/live"
import { useOneScreen } from "../../hooks/useOneScreen"
import { TwinDoor } from "../../components/TwinDoor"
import { NotesPanel } from "./notes/NotesPanel"
import { PANEL_CSS } from "./notes/panel-css"
import { Headline } from "../../components/headline/Headline"

const MEDIUM_PROFILE = "https://medium.com/@tuhin.gim"

const CSS = String.raw`
  html[data-one-screen] .page.p-nt,.p-nt{min-height:0;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);grid-template-rows:minmax(0,1fr);gap:clamp(20px,4vw,60px);
    max-width:1240px;margin:0 auto;width:100%;overflow:hidden}

  /* left: poster headline */
  .p-nt .poster{min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:16px;padding-top:clamp(0px,1vh,10px)}
  .p-nt .kick{display:flex;align-items:center;gap:10px;font:600 10px/1 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--muted)}
  .p-nt .kick b{color:var(--accent);font-weight:600}
  .p-nt .big{font-family:var(--font-display);font-weight:900;font-size:clamp(58px,7.4vw,118px);line-height:.88;letter-spacing:-.04em;color:var(--ink);margin:clamp(8px,1.6vh,18px) 0 0}
  .p-nt .big em{font-style:italic;font-weight:400;color:var(--accent)}
  .p-nt .hand{font-family:var(--font-hand);font-size:clamp(18px,1.6vw,23px);color:var(--accent);rotate:-2deg;display:inline-block;margin:6px 0 0 6px}
  .p-nt .lede{font:400 clamp(14px,1.15vw,16.5px)/1.6 var(--font-body);color:var(--muted);max-width:36ch;margin:clamp(10px,2vh,20px) 0 0}
  .p-nt .lede i{font-family:var(--font-display);font-style:italic;color:var(--ink)}
  .p-nt .door{margin-top:clamp(10px,2vh,18px)}
  .p-nt .dispatch{display:flex;align-items:flex-start;gap:10px;padding-top:12px;border-top:1px dashed color-mix(in srgb,var(--ink) 22%,transparent);
    font:500 11px/1.5 var(--font-mono);color:var(--muted)}
  .p-nt .dispatch > .ic{width:14px;height:14px;color:var(--accent);flex:none;margin-top:2px}
  .p-nt .dispatch b{color:var(--ink);font-weight:600}
  .p-nt .dispatch a{display:inline-flex;align-items:center;gap:5px;color:var(--accent);text-decoration:none;white-space:nowrap;margin-left:auto}
  .p-nt .dispatch a .ic{width:11px;height:11px}

  @media(max-width:900px){
    html[data-one-screen] .page.p-nt,.p-nt{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:12px}
    .p-nt .poster{gap:8px}
    .p-nt .big{font-size:clamp(40px,11.5vw,64px);margin-top:4px}
    .p-nt .hand{font-size:16px;margin-top:2px}
    .p-nt .lede{font-size:12.5px;margin-top:6px;line-height:1.45}
    .p-nt .door{margin-top:8px}
    .p-nt .dispatch{font-size:10px;padding-top:8px;gap:8px}
    .p-nt .dispatch a{display:none}
    .p-nt .twin-door .td-label,.p-nt .twin-door .td-arr{font-size:9.5px}
  }
  @media(max-width:600px){ .p-nt .lede{max-width:none} }
  /* short phones: tighten the poster so all four strips keep their full text */
  @media(max-width:600px) and (max-height:700px){
    html[data-one-screen] .page.p-nt,.p-nt{gap:8px}
    .p-nt .poster{gap:6px}
    .p-nt .big{font-size:34px;margin-top:2px}
    .p-nt .hand{font-size:14px;margin-top:0}
    .p-nt .lede{font-size:11.5px;line-height:1.4;margin-top:4px}
    .p-nt .door{margin-top:6px}
    .p-nt .dispatch{padding-top:6px}
  }
`

export function Notes() {
  const reduce = useReducedMotion() ?? false
  const md = useMedium()

  useOneScreen()

  const posts = !md.fallback ? md.data.posts ?? [] : []
  const hasPosts = posts.length > 0

  return (
    <main className="page p-nt" aria-label="Field notes">
      <style>{CSS + PANEL_CSS}</style>

      <section className="poster">
        <div>
          <div className="kick">
            <span className="horse-glyph" aria-hidden="true" />
            <b>Plate IV</b> · Field Notes
          </div>
          <Headline world="artist" className="big">
            Field<br /><em>notes</em>.
          </Headline>
          <span className="hand">~ written, read, watched</span>
          <p className="lede">
            What I write, and what I read to keep up. Posts live here, Medium <i>mirrors in on its own</i>, and papers and news from my interests refresh every day.
          </p>
          <div className="door">
            <TwinDoor to="/analyst/skills" label="Notes into toolkit" world="analyst" />
          </div>
        </div>

        <div className="dispatch">
          <Icon id="i-pulse" />
          <span className="txt">
            {hasPosts
              ? <>Medium mirror · <b>{posts.length} {posts.length === 1 ? "post" : "posts"}</b> synced, one way, automatically.</>
              : <>Medium mirror · <b>syncs automatically</b> whenever a post goes live there.</>}
          </span>
          <a href={MEDIUM_PROFILE} target="_blank" rel="noopener noreferrer">
            Read on Medium <Icon id="i-arrow" />
          </a>
        </div>
      </section>

      <NotesPanel reduce={reduce} />
    </main>
  )
}
