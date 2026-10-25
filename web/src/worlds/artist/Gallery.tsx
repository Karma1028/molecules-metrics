import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { metaForUrl } from "../../lib/gallery-meta"
import { scatterPoints } from "../../lib/exif-scatter"
import { setWatched } from "../../lib/last-watched"
import { useFrames, LOCAL_FRAMES, type Frame } from "../../lib/live"
import { GalleryLightbox } from "./GalleryLightbox"
import { useOneScreen } from "../../hooks/useOneScreen"
import { PlateHeader } from "../../components/headers/PlateHeader"
import { TwinDoor } from "../../components/TwinDoor"


const CSS = String.raw`
  .p-gl .plot-toggle{font:600 9px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--accent);background:none;border:1px solid color-mix(in srgb,var(--accent) 50%,transparent);border-radius:999px;padding:5px 10px;cursor:pointer;transition:background .25s var(--ease),color .25s var(--ease)}
  .p-gl .plot-toggle:hover,.p-gl .plot-toggle[aria-pressed="true"]{background:var(--accent);color:#fff}
  .p-gl .plot-toggle:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
  .p-gl .cells{transition:opacity .35s var(--ease)}
  .p-gl .cells.plotted{opacity:0;pointer-events:none}
  .p-gl .plot{position:absolute;inset:24px 10px;z-index:3}
  .p-gl .plot .ax{position:absolute;font:600 8px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:rgba(244,234,217,.55)}
  .p-gl .plot .ax-y{left:2px;top:0}
  .p-gl .plot .ax-x{right:2px;bottom:0}
  .p-gl .plot .nodata-k{position:absolute;left:2px;bottom:0;font:600 8px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:rgba(244,234,217,.4)}
  .p-gl .plot .dot{position:absolute;translate:-50% -50%;padding:0;border:1.5px solid rgba(244,234,217,.8);border-radius:50%;overflow:hidden;cursor:pointer;background:#17110d;
    animation:pl-in .5s var(--ease) both;animation-delay:var(--d);transition:scale .25s var(--ease),border-color .25s var(--ease)}
  .p-gl .plot .dot img{width:100%;height:100%;object-fit:cover;display:block}
  .p-gl .plot .dot:hover,.p-gl .plot .dot:focus-visible{scale:1.5;z-index:4;border-color:var(--accent);outline:none}
  .p-gl .plot .dot.on{border-color:var(--accent);border-width:2.5px}
  .p-gl .plot .dot.nodata{opacity:.55;border-style:dashed}
  @keyframes pl-in{from{opacity:0;scale:.2}to{opacity:1;scale:1}}
  @media(prefers-reduced-motion:reduce){.p-gl .plot .dot{animation:none}.p-gl .cells{transition:none}}
  .p-gl{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1200px;margin:0 auto;width:100%;overflow:hidden}

  /* masthead — compact editorial, matches the field-notebook system */
  .p-gl .gl-head{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;
    padding-bottom:clamp(6px,1.1vh,12px);margin-bottom:clamp(8px,1.4vh,16px);border-bottom:1px dashed color-mix(in srgb,var(--accent) 40%,transparent)}
  .p-gl .gl-kick{display:inline-flex;align-items:center;gap:9px;font:600 10px/1 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--accent)}
  .p-gl .gl-kick .ic{width:14px;height:14px}
  .p-gl .gl-title{font-family:var(--font-display);font-weight:900;font-size:clamp(24px,3.6vw,44px);line-height:.95;letter-spacing:-.025em;color:var(--ink);margin:6px 0 3px}
  .p-gl .gl-title em{font-style:italic;font-weight:500;color:var(--accent)}
  .p-gl .gl-lede{font-size:clamp(11.5px,1vw,14px);color:var(--muted);max-width:52ch;text-wrap:pretty}
  .p-gl .gl-lede b{color:var(--ink);font-weight:600}
  .p-gl .gl-src{display:flex;flex-direction:column;gap:5px;align-items:flex-end;text-align:right;white-space:nowrap}
  .p-gl .gl-src .live{display:inline-flex;align-items:center;gap:7px;font:500 10px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-gl .gl-src .live .dot{width:7px;height:7px;border-radius:50%;background:var(--accent)}
  .p-gl .gl-src .live b{color:var(--ink);font-weight:600}
  .p-gl .gl-src .cue{font:500 9px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);opacity:.8}

  /* contact-sheet stage: the printed frame (hero) + the full sheet of negatives */
  .p-gl .stage{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1.5fr) minmax(258px,.95fr);gap:clamp(12px,1.8vw,26px)}

  /* hero — the frame currently "printed" */
  .p-gl .hero{position:relative;min-height:0;border-radius:6px;overflow:hidden;background:var(--card);box-shadow:var(--shadow);
    outline:clamp(6px,.7vw,10px) solid var(--card);outline-offset:-1px;margin:clamp(6px,.7vw,10px);
    cursor:zoom-in;touch-action:pan-y}
  .p-gl .hero .print{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#b9a98f;display:block}
  .p-gl .hero::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;
    background:radial-gradient(130% 92% at 50% 0,transparent 54%,color-mix(in srgb,#000 34%,transparent))}
  .p-gl .plate{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;align-items:flex-end;justify-content:space-between;gap:14px;
    padding:clamp(14px,2.4vh,26px) clamp(14px,2vw,24px) clamp(12px,2vh,20px);color:#fff;pointer-events:none}
  .p-gl .plate .nm{font-family:var(--font-display);font-weight:700;font-size:clamp(18px,2.3vw,32px);line-height:1;letter-spacing:-.01em;text-shadow:0 1px 14px rgba(0,0,0,.5)}
  .p-gl .plate .no{font:600 11px/1 var(--font-mono);letter-spacing:.18em;color:rgba(255,255,255,.82);text-shadow:0 1px 10px rgba(0,0,0,.6)}
  .p-gl .plate .no b{color:#fff}
  .p-gl .zoomcue{position:absolute;top:clamp(12px,2vh,18px);right:clamp(12px,2vw,18px);z-index:2;width:30px;height:30px;border-radius:50%;
    display:grid;place-items:center;background:rgba(0,0,0,.34);backdrop-filter:blur(3px);opacity:0;transition:opacity .3s;pointer-events:none}
  .p-gl .zoomcue .ic{width:14px;height:14px;color:#fff}
  .p-gl .hero:hover .zoomcue{opacity:1}

  /* print deck (ref: huyml.co): the next two prints sit tilted under the hero */
  .p-gl .deck{position:relative;min-height:0;display:flex;isolation:isolate}
  .p-gl .deck .hero{flex:1;z-index:2;margin:clamp(6px,.7vw,10px) clamp(30px,3.4vw,50px) clamp(16px,2vh,26px) clamp(6px,.7vw,10px)}
  .p-gl .peek{position:absolute;inset:clamp(18px,2vw,28px) clamp(8px,1vw,14px) clamp(8px,1vh,14px) clamp(40px,4vw,60px);z-index:0;border-radius:6px;overflow:hidden;background:#b9a98f;
    outline:clamp(6px,.7vw,10px) solid var(--card);box-shadow:var(--shadow-sm);pointer-events:none;
    transition:transform .7s cubic-bezier(.22,1,.36,1)}
  .p-gl .peek img{width:100%;height:100%;object-fit:cover;filter:saturate(.6) brightness(.8)}
  .p-gl .peek.p1{z-index:1;transform:rotate(2.6deg) translate(12px,2px)}
  .p-gl .peek.p2{transform:rotate(-3.4deg) translate(-10px,8px)}
  .p-gl .deck:hover .peek.p1{transform:rotate(4.6deg) translate(26px,0)}
  .p-gl .deck:hover .peek.p2{transform:rotate(-5.6deg) translate(-22px,10px)}
  .p-gl .plate .big{display:flex;align-items:flex-start;gap:3px;color:#fff;text-shadow:0 2px 18px rgba(0,0,0,.5)}
  .p-gl .plate .big .n{font-family:var(--font-display);font-weight:900;font-size:clamp(40px,5vw,76px);line-height:.8;letter-spacing:-.05em;
    font-variant-numeric:tabular-nums}
  .p-gl .plate .big .of{font:600 10px/1 var(--font-mono);letter-spacing:.12em;opacity:.78;margin-top:3px}
  @media(prefers-reduced-motion:reduce){.p-gl .peek{transition:none}}

  /* the sheet — every frame, always visible */
  .p-gl .sheet{min-height:0;display:flex;flex-direction:column;gap:clamp(6px,1vh,10px)}
  .p-gl .sheet-top{flex:0 0 auto;display:flex;align-items:baseline;justify-content:space-between;gap:10px}
  .p-gl .sheet-top .st{font:600 9px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
  .p-gl .sheet-top .st b{color:var(--ink)}
  .p-gl .roll{flex:1;min-height:0;display:flex;padding:22px 8px}
  .p-gl .roll::before{top:6px}
  .p-gl .roll::after{bottom:6px}
  .p-gl .cells{flex:1;min-height:0;display:grid;grid-template-columns:repeat(var(--cols,2),1fr);grid-auto-rows:1fr;gap:clamp(5px,.8vw,9px)}
  .p-gl .cell{position:relative;border-radius:3px;overflow:hidden;cursor:pointer;background:#241b15;border:1px solid rgba(244,234,217,.1);padding:0;
    min-height:0;transition:border-color .3s,box-shadow .3s,transform .3s}
  .p-gl .cell img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;background:#b9a98f;
    filter:saturate(.82) brightness(.9);transition:filter .3s}
  .p-gl .cell:hover{border-color:color-mix(in srgb,var(--accent) 70%,transparent);transform:translateY(-2px);box-shadow:var(--shadow-sm)}
  .p-gl .cell:hover img{filter:saturate(1) brightness(1)}
  /* focus-pull: hovering one negative dims the rest of the sheet */
  .p-gl .cells.focus .cell:not(.hot):not(.on){opacity:.4;filter:saturate(.7)}
  .p-gl .cell{opacity:1;filter:none;transition:border-color .3s,box-shadow .3s,transform .3s,opacity .3s,filter .3s}
  .p-gl .cell .cno{position:absolute;top:4px;left:5px;z-index:2;font:600 8px/1 var(--font-mono);letter-spacing:.08em;color:#fff;
    text-shadow:0 1px 4px rgba(0,0,0,.7);opacity:.9}
  /* the active negative is being "printed": slot sits empty, marked */
  .p-gl .cell.on{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent),var(--glow);cursor:default;
    background:color-mix(in srgb,var(--accent) 22%,#17110d)}
  .p-gl .cell.on:hover{transform:none}
  .p-gl .cell .slotmark{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
    color:#f4ead9}
  .p-gl .cell .slotmark .sn{font:700 clamp(13px,1.5vw,18px)/1 var(--font-mono);letter-spacing:.06em}
  .p-gl .cell .slotmark .sl{font:600 6.5px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;opacity:.8}


  /* lightbox v2 — immersive darkroom print */
  .p-gl-lb{position:fixed;inset:0;z-index:1000;background:color-mix(in srgb,#120f0b 90%,var(--paper));backdrop-filter:blur(12px);
    display:grid;place-items:center;padding:clamp(16px,3vw,44px);cursor:zoom-out;animation:fadein .3s var(--ease)}
  .p-gl-lb figure{display:flex;flex-direction:column;gap:clamp(10px,1.6vh,18px);cursor:auto;margin:0;max-width:min(1180px,96vw);width:100%;align-items:center}
  /* frame = gutter | image | gutter; notes live in the gutters, never on the photo */
  .p-gl-lb .lb-frame{position:relative;display:grid;grid-template-columns:var(--gut) 1fr var(--gut);align-items:center;width:100%;--gut:clamp(128px,18vw,230px)}
  .p-gl-lb .lb-stage{grid-column:2;justify-self:center;position:relative;max-width:100%;max-height:72vh;border-radius:10px;overflow:hidden;box-shadow:0 30px 80px -24px rgba(0,0,0,.6)}
  .p-gl-lb .lb-stage img{display:block;max-width:100%;max-height:72vh;width:auto;height:auto;object-fit:contain;background:#1a1512}

  /* temple-tile reveal */
  .p-gl-lb .lb-tiles{position:absolute;inset:0;z-index:2;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(4,1fr);pointer-events:none}
  .p-gl-lb .lb-tiles span{display:block;background:color-mix(in srgb,var(--accent) 82%,#2a150a);border:.5px solid color-mix(in srgb,#000 20%,transparent)}

  /* hand-drawn markers (arrow / circle / box / bracket) marking what is in the frame */
  .p-gl-lb .lb-arrows{position:absolute;inset:0;z-index:3;width:100%;height:100%;pointer-events:none;overflow:visible}
  .p-gl-lb .lb-arrows path{stroke:var(--accent);stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,.65))}
  .p-gl-lb .lb-arrows .ink-twin{stroke-width:3.4;opacity:.4;transform:translate(1px,1.2px);filter:none}
  .p-gl-lb .lb-arrows .lb-tip{fill:var(--accent);filter:drop-shadow(0 1px 3px rgba(0,0,0,.6))}
  /* handwritten note: sits in a gutter, vertically centred on its slot; the span carries the hand-tilt */
  .p-gl-lb .lb-note-wrap{position:absolute;z-index:4;transform:translateY(-50%);pointer-events:none}
  .p-gl-lb .lb-note-wrap.g-left{text-align:right}
  .p-gl-lb .lb-note-wrap.g-right{text-align:left}
  .p-gl-lb .lb-note-wrap.g-top,.p-gl-lb .lb-note-wrap.g-bottom{text-align:center;transform:translateX(-50%)}
  .p-gl-lb .lb-note{display:inline-block;position:relative;transform-origin:center;
    font-family:"Caveat","Fraunces",cursive;font-weight:700;line-height:1.04;
    color:#fff;text-align:inherit;text-wrap:balance;
    text-shadow:0 1px 3px rgba(0,0,0,.95),0 2px 10px rgba(0,0,0,.7)}
  .p-gl-lb .lb-note.s-sm{font-size:clamp(15px,1.7vw,22px)}
  .p-gl-lb .lb-note.s-md{font-size:clamp(17px,2vw,26px)}
  .p-gl-lb .lb-note.s-lg{font-size:clamp(19px,2.5vw,31px)}
  .p-gl-lb .lb-uline{position:absolute;left:0;right:0;bottom:-7px;width:100%;height:12px;overflow:visible}
  .p-gl-lb .lb-uline path{stroke:var(--accent);stroke-width:2.2;fill:none;stroke-linecap:round}

  /* meta panel */
  .p-gl-lb .lb-meta{display:flex;flex-direction:column;gap:8px;align-items:center;text-align:center;max-width:72ch}
  .p-gl-lb .lb-nm{display:flex;align-items:baseline;gap:14px}
  .p-gl-lb .lb-nm .nm{font-family:var(--font-display);font-weight:700;font-size:clamp(18px,2.4vw,30px);line-height:1;color:#f6efe4}
  .p-gl-lb .lb-nm .no{font:600 11px/1 var(--font-mono);letter-spacing:.16em;color:var(--accent)}
  .p-gl-lb .lb-exif{display:flex;flex-wrap:wrap;justify-content:center;font:500 10px/1.3 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:rgba(246,239,228,.72)}
  .p-gl-lb .lb-exif .ex{padding:0 11px;border-right:1px solid rgba(246,239,228,.28)}
  .p-gl-lb .lb-exif .ex:last-child{border-right:0}

  /* corner motif + controls */
  .p-gl-lb .lb-alpona{position:fixed;width:clamp(40px,6vw,72px);height:clamp(40px,6vw,72px);color:var(--accent);opacity:.45;pointer-events:none;z-index:1}
  .p-gl-lb .lb-alpona.tl{top:clamp(14px,3vh,30px);left:clamp(14px,3vw,30px)}
  .p-gl-lb .lb-alpona.br{bottom:clamp(14px,3vh,30px);right:clamp(14px,3vw,30px);transform:rotate(180deg)}
  .p-gl-lb .lb-btn{position:fixed;z-index:4;width:42px;height:42px;border-radius:50%;border:1px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer;
    display:grid;place-items:center;transition:background .3s,transform .3s}
  .p-gl-lb .lb-btn .ic{width:16px;height:16px}
  .p-gl-lb .lb-btn.x{top:18px;right:18px;font:400 20px/1 var(--font-mono)}
  .p-gl-lb .lb-btn.snd{top:18px;right:70px}
  .p-gl-lb .lb-btn.lamp{top:18px;right:122px}
  .p-gl-lb .lb-btn.lamp[aria-pressed="true"]{background:var(--accent);color:#fff;border-color:var(--accent)}
  .p-gl-lb .lb-lantern{position:absolute;inset:0;z-index:3;pointer-events:none;transition:background .08s linear}
  .p-gl-lb .lb-btn:hover{background:var(--accent);color:#fff;transform:scale(1.06)}
  .p-gl-lb .lbnav{position:fixed;top:50%;translate:0 -50%;z-index:4;width:46px;height:46px;border-radius:50%;border:1px solid var(--rule);
    background:var(--card);color:var(--ink);cursor:pointer;display:grid;place-items:center;box-shadow:var(--shadow-sm);transition:background .3s,transform .3s}
  .p-gl-lb .lbnav .ic{width:16px;height:16px}
  .p-gl-lb .lbnav.prev{left:20px}.p-gl-lb .lbnav.prev .ic{transform:rotate(180deg)}
  .p-gl-lb .lbnav.next{right:20px}
  /* centred with the translate property, so hover must use scale (a transform here would add a second -50% and jump the button) */
  .p-gl-lb .lbnav:hover{background:var(--accent);color:#fff;scale:1.08}
  .p-gl-lb .lbnav:active{scale:.94}
  .p-gl-lb .lbnav.prev:hover .ic{transform:rotate(180deg) translateX(2px)}
  .p-gl-lb .lbnav.next:hover .ic{transform:translateX(2px)}
  .p-gl-lb .lbnav .ic{transition:transform .25s var(--ease)}
  .p-gl-lb .lbnav:focus-visible,.p-gl-lb .lb-btn:focus-visible,.p-gl-lb .lb-strip button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

  /* filmstrip: every frame, current one lit, click to jump */
  .p-gl-lb{grid-template-rows:1fr auto}
  .p-gl-lb .lb-strip{grid-row:2;display:flex;gap:6px;max-width:min(1100px,92vw);overflow-x:auto;padding:8px 4px 2px;scrollbar-width:none;scroll-snap-type:x proximity;cursor:auto}
  .p-gl-lb .lb-strip::-webkit-scrollbar{display:none}
  .p-gl-lb .lb-strip button{flex:0 0 auto;width:46px;height:34px;padding:0;border:0;border-radius:4px;overflow:hidden;cursor:pointer;opacity:.42;
    outline:1.5px solid transparent;transition:opacity .25s var(--ease),outline-color .25s var(--ease),translate .25s var(--ease);scroll-snap-align:center;background:#1a1512}
  .p-gl-lb .lb-strip button img{display:block;width:100%;height:100%;object-fit:cover}
  .p-gl-lb .lb-strip button:hover{opacity:.85;translate:0 -2px}
  .p-gl-lb .lb-strip button[aria-current="true"]{opacity:1;outline-color:var(--accent)}

  @media(max-width:760px){
    .p-gl{height:100%;min-height:0;overflow:hidden}
    .p-gl .gl-src{display:none}
    .p-gl .gl-lede{font-size:11px;line-height:1.35}
    .p-gl .stage{display:flex;flex-direction:column;gap:6px;flex:1;min-height:0}
    .p-gl .deck{flex:1;min-height:0}
    .p-gl .peek.p2{display:none}
    .p-gl .sheet{flex:0 0 auto}
    .p-gl .roll{padding:10px 4px}
    .p-gl .roll::before{top:2px}
    .p-gl .roll::after{bottom:2px}
    .p-gl .cells{grid-template-columns:repeat(var(--mcols,9),1fr);grid-auto-rows:auto;gap:3px}
    .p-gl .cell{aspect-ratio:1/1}
    .p-gl .cell .cno{display:none}
    .p-gl .cell .slotmark .sl{display:none}
    .p-gl-lb .lb-frame{display:block;--gut:0px;padding:64px 0}
    .p-gl-lb .lb-stage,.p-gl-lb .lb-stage img{max-height:54vh}
    .p-gl-lb .lb-note.s-sm,.p-gl-lb .lb-note.s-md,.p-gl-lb .lb-note.s-lg{font-size:clamp(15px,4.4vw,19px)}
  }
  @media(prefers-reduced-motion:reduce){
    .p-gl .cell,.p-gl .cell img{transition:none}
    .p-gl-lb .lb-arrows path,.p-gl-lb .lb-note{animation:none}
  }
`

export function Gallery() {
  const reduce = useReducedMotion()
  const { data } = useFrames()
  const live = !!data && data.source === "drive" && data.frames.length > 0
  const frames: Frame[] = live ? data!.frames : LOCAL_FRAMES
  const n = frames.length
  const cols = n > 12 ? 3 : 2

  const [cur, setCur] = useState(0)
  const [open, setOpen] = useState(false)
  const [plot, setPlot] = useState(false)
  const [hover, setHover] = useState<number | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const lock = useRef(0)
  const idle = useRef(0) // auto-advance pauses until this timestamp after any interaction
  const bump = useCallback(() => { idle.current = Date.now() + 9000 }, [])

  useOneScreen()

  // clamp if the frame set shrinks (live feed swap)
  useEffect(() => {
    if (cur > n - 1) setCur(0)
  }, [n, cur])

  const go = useCallback((d: number) => { bump(); setCur((c) => (c + d + n) % n) }, [n, bump])
  useEffect(() => {
    if (open && frames[cur]) setWatched({ kind: "frame", index: cur, total: frames.length, name: frames[cur].name })
  }, [open, cur, frames])
  const pts = useMemo(() => scatterPoints(frames.map((f) => metaForUrl(f.url)?.exif ?? {})), [frames])
  const select = useCallback((i: number) => { bump(); setCur(i) }, [bump])

  // living roll — when untouched, the darkroom prints the next frame on a slow loop
  useEffect(() => {
    if (reduce || open || n < 2) return
    const id = window.setInterval(() => {
      if (Date.now() < idle.current) return
      setCur((c) => (c + 1) % n)
    }, 7000)
    return () => window.clearInterval(id)
  }, [reduce, open, n])

  // keyboard — arrows step, escape closes the lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") { setOpen(false); return }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1)
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, open])

  // wheel on the stage prints the next negative — the page itself never scrolls
  useEffect(() => {
    const el = stageRef.current
    if (!el || open) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lock.current < 360) return
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < 6) return
      lock.current = now
      go(delta > 0 ? 1 : -1)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [go, open])

  // horizontal swipe / drag on the hero print
  const down = useRef<{ x: number; y: number } | null>(null)
  const onDown = (e: React.PointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY }
  }
  const onUp = (e: React.PointerEvent) => {
    const s = down.current
    down.current = null
    if (!s) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  }

  const f = frames[cur]
  if (!f) return null

  const morph = reduce ? { duration: 0 } : springs.gentle

  return (
    <main className="page p-gl" aria-label="Photography contact sheet">
      <style>{CSS}</style>

      <PlateHeader
        plate="Plate I"
        kicker="Field Dispatches · Goa"
        title={<>Contact <em className="hl">sheet</em>.</>}
        note="~ pick or scroll to print"
        lede={<>The whole roll at once. <b>Pick any negative</b> and it prints to the big frame, or <b>scroll, swipe or arrow</b> through them.</>}
        right={
          <div className="gl-src">
            <TwinDoor to="/analyst/work" label="Pull the thread: how I work" world="analyst" />
            <span className="live"><span className="dot" /> <b>{n}</b> frames</span>
          </div>
        }
      />

      <div className="stage" ref={stageRef}>
        {/* hero — the printed frame, on a deck of the next prints */}
        <div className="deck">
        {[2, 1].map((k) => {
          const nx = frames[(cur + k) % n]
          return n > k ? (
            <div key={`peek-${k}`} className={`peek p${k}`} aria-hidden="true">
              <img src={nx.url} alt="" decoding="async" />
            </div>
          ) : null
        })}
        <div
          className="hero"
          onPointerDown={onDown}
          onPointerUp={onUp}
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={`Enlarge ${f.name}`}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
        >
          <motion.img
            key={`print-${f.url}`}
            layoutId={`frame-${f.url}`}
            className="print"
            src={f.url}
            srcSet={`${f.url.replace(/\.webp$/, "")}-800w.webp 800w, ${f.url.replace(/\.webp$/, "")}-1600w.webp 1600w`}
            sizes="(max-width: 768px) 800px, 1600px"
            alt={f.name}
            decoding="async"
            transition={morph}
          />
          <div className="plate">
            <span className="nm">{f.name}</span>
            <span className="big" aria-label={`Frame ${cur + 1} of ${n}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={cur}
                  className="n"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.md, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.md, filter: "blur(8px)" }}
                  transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                >
                  {String(cur + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="of">/{String(n).padStart(2, "0")}</span>
            </span>
          </div>
          <span className="zoomcue" aria-hidden="true"><Icon id="i-camera" /></span>
        </div>
        </div>

        {/* the sheet — every frame, always on screen */}
        <div className="sheet">
          <div className="sheet-top">
            <span className="st">Roll · <b>{String(n).padStart(2, "0")}</b> exposures</span>
            <button type="button" className="plot-toggle" aria-pressed={plot} onClick={() => setPlot((p) => !p)}>{plot ? "back to the roll" : "count them"}</button>
            <span className="st">{live ? "live" : "archive"}</span>
          </div>
          <div className="film-mat roll">
          <div
            className={`cells${hover !== null ? " focus" : ""}${plot ? " plotted" : ""}`}
            style={{ ["--cols" as string]: cols }}
            onMouseLeave={() => setHover(null)}
          >
            {frames.map((fr, i) => {
              const on = i === cur
              return (
                <button
                  key={fr.url}
                  className={`cell${on ? " on" : ""}${hover === i ? " hot" : ""}`}
                  aria-label={`Frame ${i + 1}: ${fr.name}`}
                  aria-current={on}
                  onClick={() => select(i)}
                  onMouseEnter={() => setHover(i)}
                >
                  {on ? (
                    <span className="slotmark" aria-hidden="true">
                      <span className="sn">{String(i + 1).padStart(2, "0")}</span>
                      <span className="sl">printing</span>
                    </span>
                  ) : (
                    <>
                      <motion.img
                        layoutId={`frame-${fr.url}`}
                        src={fr.url}
                        alt=""
                        decoding="async"
                        transition={morph}
                      />
                      <span className="cno">{String(i + 1).padStart(2, "0")}</span>
                    </>
                  )}
                </button>
              )
            })}
          </div>
          {plot && (
            <div className="plot" role="group" aria-label="Frames plotted by date, shutter speed and ISO">
              <span className="ax ax-y">faster shutter ↑</span>
              <span className="ax ax-x">earlier → later</span>
              {frames.map((fr, i) => {
                const p = pts[i]
                const miss = "missing" in p
                const size = miss ? 14 : 16 + p.s * 16
                const style = miss
                  ? { left: `${6 + (i / Math.max(frames.length - 1, 1)) * 88}%`, top: "93%", width: size, height: size, ["--d" as string]: `${i * 14}ms` }
                  : { left: `${8 + p.x * 84}%`, top: `${10 + p.y * 72}%`, width: size, height: size, ["--d" as string]: `${i * 14}ms` }
                return (
                  <button
                    key={fr.url}
                    type="button"
                    className={`dot${i === cur ? " on" : ""}${miss ? " nodata" : ""}`}
                    style={style}
                    aria-label={`Frame ${i + 1}: ${fr.name}${miss ? ", no camera data" : ""}`}
                    onClick={() => select(i)}
                  >
                    <img src={fr.url} alt="" decoding="async" />
                  </button>
                )
              })}
              {pts.some((p) => "missing" in p) && <span className="nodata-k">no data</span>}
            </div>
          )}
          </div>
        </div>
      </div>

      {open && (
        <GalleryLightbox
          frames={frames}
          index={cur}
          onClose={() => setOpen(false)}
          onStep={go}
          onJump={select}
          reduce={!!reduce}
        />
      )}
    </main>
  )
}
