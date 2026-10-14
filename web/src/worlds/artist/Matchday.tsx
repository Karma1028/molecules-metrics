import { useEffect, useState, useMemo, type ReactNode } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useFootball, useBarcaLastSeason, useFootballNews } from "../../lib/live"
import { Icon } from "../../lib/icons"
import { springs, motionTokens } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { PlateHeader } from "../../components/headers/PlateHeader"

/* ── kickoff countdown (editorial one-liner, not a chip grid) ─────────── */
function kickoffLine(ts?: string | null): string | null {
  if (!ts) return null
  const diff = new Date(ts).getTime() - Date.now()
  if (diff <= 0) return null
  const d = Math.floor(diff / 864e5)
  const h = Math.floor((diff / 36e5) % 24)
  const m = Math.floor((diff / 6e4) % 60)
  if (d > 0) return `${d}d ${h}h to kickoff`
  if (h > 0) return `${h}h ${m}m to kickoff`
  return `${m}m to kickoff`
}

/* ── count-up: the motion-graphic treatment for the real numbers ──────── */
function useCountUp(target: number, reduce: boolean | null, ms = 1000): number {
  const [n, setN] = useState(reduce ? target : 0)
  useEffect(() => {
    if (reduce) { setN(target); return }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms)
      const e = 1 - Math.pow(1 - p, 3)
      setN(Math.round(target * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, reduce, ms])
  return n
}

/* ── the feature photographs (real, shot in Flow — no IP, no faces) ───── */
interface Plate { src: string; kicker: string; title: string; note: string }
const STADIUM: Plate = {
  src: "/images/matchday/stadium.jpg",
  kicker: "The cathedral",
  title: "Floodlights, before anyone arrives",
  note: "Empty stands, full of noise about to happen",
}
const PLATES: Plate[] = [
  {
    src: "/images/matchday/terrace.jpg",
    kicker: "The terrace",
    title: "Scarves up, full throat",
    note: "The only ritual that still gathers a crowd on purpose",
  },
  {
    src: "/images/matchday/boot.jpg",
    kicker: "The tool",
    title: "One worn boot, wet grass",
    note: "Where every stat in this room actually begins",
  },
  {
    src: "/images/matchday/scarf.jpg",
    kicker: "The colours",
    title: "Knitted scarf, old ticket stub",
    note: "Garnet and blue, kept in a drawer between matches",
  },
]

const CSS = String.raw`
  /* ── Matchday Fanzine — scoped to .p-md (auto-reverts on unmount).
     A one-screen magazine spread where photos and motion graphics are
     fused: a drifting floodlit backdrop, pasted prints carrying live
     broadcast overlays (sweep, scanline, count-up HUD, tracking reticle),
     poster-line stats pulled from real data, and a live wire column.
     nav + footer live outside .p-md and keep the world colour. ── */
  .p-md{
    --garnet:#A50044; --gold:#E8B04B; --blau:#8FB8E8; --paper:#f4ece0;
    position:relative;height:100%;min-height:0;display:flex;flex-direction:column;
    gap:clamp(7px,1.1vh,12px);max-width:1200px;margin:0 auto;width:100%;overflow:hidden;
    padding:clamp(9px,1.3vh,15px) 0 2px;isolation:isolate}
  :root[data-theme="dark"] .p-md{--paper:#efe7da}

  /* full-bleed cathedral backdrop — slow ken-burns drift + floodlight sweep */
  .p-md .backdrop{position:absolute;inset:0;z-index:0;overflow:hidden}
  .p-md .backdrop .bg{position:absolute;inset:-6%;background-size:cover;background-position:center 30%;
    background-image:var(--bg);filter:saturate(.9);transform-origin:60% 40%;
    animation:mdKen 42s ease-in-out infinite alternate}
  .p-md .backdrop .beam{position:absolute;inset:0;mix-blend-mode:screen;opacity:.5;
    background:linear-gradient(104deg,transparent 42%,rgba(232,176,75,.26) 50%,transparent 58%);
    transform:translateX(-60%);animation:mdBeam 11s ease-in-out infinite}
  .p-md .backdrop .scrim{position:absolute;inset:0;
    background:linear-gradient(180deg,rgba(8,6,10,.52) 0%,rgba(8,6,10,.30) 42%,rgba(8,6,10,.72) 100%)}
  :root[data-theme="light"] .p-md .backdrop .bg{filter:saturate(.92) brightness(1.05)}
  :root[data-theme="light"] .p-md .backdrop .scrim{
    background:linear-gradient(180deg,rgba(236,228,216,.74) 0%,rgba(236,228,216,.52) 42%,rgba(236,228,216,.84) 100%)}
  .p-md>*{position:relative;z-index:1}

  @keyframes mdKen{from{transform:scale(1.02)}to{transform:scale(1.11) translate(-1.5%,-2%)}}
  @keyframes mdBeam{0%,66%{transform:translateX(-60%)}100%{transform:translateX(160%)}}
  @keyframes mdScan{0%{transform:translateY(0)}100%{transform:translateY(calc(var(--h,160px)))}}
  @keyframes mdGlare{0%,72%{transform:translateX(-130%) skewX(-12deg)}100%{transform:translateX(230%) skewX(-12deg)}}
  @keyframes mdPulse{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}

  /* ink colour sits on the scrim, flips with theme */
  .p-md{--fz-ink:#f6f0e6; --fz-mut:rgba(246,240,230,.68); --fz-card:rgba(14,11,16,.56); --fz-line:rgba(246,240,230,.22)}
  :root[data-theme="light"] .p-md{--fz-ink:#1c1510; --fz-mut:rgba(28,21,16,.62); --fz-card:rgba(255,252,246,.72); --fz-line:rgba(28,21,16,.16)}

  /* ── masthead / nameplate ── */
  .p-md .mh{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;
    border-bottom:1.5px solid var(--fz-line);padding-bottom:clamp(5px,1vh,9px)}
  .p-md .mh-kick{font:800 9.5px/1 var(--font-mono);letter-spacing:.26em;text-transform:uppercase;
    color:var(--gold);display:flex;align-items:center;gap:9px}
  .p-md .ribbon{display:inline-flex;height:11px;width:22px;border-radius:2px;overflow:hidden;box-shadow:0 0 0 1px var(--fz-line)}
  .p-md .ribbon i{flex:1}.p-md .ribbon .g{background:var(--garnet)}.p-md .ribbon .b{background:#004D98}.p-md .ribbon .y{background:var(--gold)}
  .p-md .mh-title{font-family:var(--font-display);font-size:clamp(26px,4vw,52px);font-weight:900;
    line-height:.86;letter-spacing:-.03em;color:var(--fz-ink);margin:5px 0 2px;text-transform:uppercase}
  .p-md .mh-title em{color:var(--garnet);font-style:normal}
  .p-md .mh-sub{font-family:var(--font-hand);font-size:clamp(13px,1.3vw,18px);color:var(--fz-mut);rotate:-.6deg}
  .p-md .mh-meta{text-align:right;display:flex;flex-direction:column;gap:3px;align-items:flex-end}
  .p-md .mh-iss{font:800 10px/1 var(--font-display);letter-spacing:.04em;color:var(--fz-ink);text-transform:uppercase}
  .p-md .mh-src{font:600 8.5px/1.4 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--fz-mut);max-width:24ch}

  /* ── the spread grid ── */
  .p-md .spread{flex:1;min-height:0;display:grid;gap:clamp(9px,1.1vw,15px);
    grid-template-columns:repeat(12,1fr);grid-template-rows:1.32fr 1fr}
  .p-md .lead  {grid-column:1 / 7; grid-row:1 / 3}
  .p-md .poster{grid-column:7 / 13;grid-row:1 / 2}
  .p-md .stub  {grid-column:7 / 9; grid-row:2 / 3}
  .p-md .wire  {grid-column:9 / 11;grid-row:2 / 3}
  .p-md .rail  {grid-column:11 / 13;grid-row:2 / 3}

  /* ── pasted-print treatment (collage) ── */
  .p-md .print{position:relative;background:#fff;padding:6px 6px 0;border-radius:2px;
    box-shadow:0 10px 26px rgba(0,0,0,.42),0 2px 6px rgba(0,0,0,.3);overflow:hidden;cursor:zoom-in}
  .p-md .print .img{position:absolute;inset:6px 6px auto;top:6px;bottom:30px;background-size:cover;background-position:center;border-radius:1px;overflow:hidden}
  .p-md .print .cap{position:absolute;left:0;right:0;bottom:0;height:30px;display:flex;align-items:center;gap:7px;
    padding:0 9px;background:#fff;color:#17110d;z-index:4}
  .p-md .print .cap b{font:800 8.5px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--garnet)}
  .p-md .print .cap span{font:600 9px/1.2 var(--font-body);color:#4a403a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .p-md .print .zc{position:absolute;top:11px;right:11px;z-index:5;width:24px;height:24px;display:grid;place-items:center;
    background:rgba(10,8,6,.55);border-radius:50%;color:#fff;opacity:0;transition:opacity .22s}
  .p-md .print .zc .ic{width:12px;height:12px}
  .p-md .print:hover .zc{opacity:1}

  /* motion-graphic layers painted INSIDE a photo's .img box */
  .p-md .mg-scan{position:absolute;left:0;right:0;top:0;height:2px;z-index:3;mix-blend-mode:screen;opacity:.6;
    background:linear-gradient(90deg,transparent,var(--gold),transparent);animation:mdScan 5s linear infinite}
  .p-md .mg-glare{position:absolute;top:-20%;bottom:-20%;left:0;width:34%;z-index:3;mix-blend-mode:screen;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);animation:mdGlare 7s ease-in-out infinite}
  .p-md .mg-grid{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.14;mix-blend-mode:overlay;
    background-image:linear-gradient(var(--gold) 1px,transparent 1px),linear-gradient(90deg,var(--gold) 1px,transparent 1px);
    background-size:28px 28px}

  /* broadcast HUD over the dominant photo */
  .p-md .hud{position:absolute;left:12px;bottom:40px;z-index:4;display:flex;align-items:center;gap:7px}
  .p-md .hud .live{display:flex;align-items:center;gap:5px;background:rgba(10,8,6,.56);backdrop-filter:blur(3px);
    border:1px solid rgba(255,255,255,.18);border-radius:4px;padding:4px 8px;
    font:800 8px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:#fff}
  .p-md .hud .live .d{width:6px;height:6px;border-radius:50%;background:var(--garnet);animation:mdPulse 1.6s ease-in-out infinite}
  .p-md .hud .chip{background:rgba(10,8,6,.56);backdrop-filter:blur(3px);border:1px solid rgba(255,255,255,.18);
    border-radius:4px;padding:3px 9px;text-align:center}
  .p-md .hud .chip b{font:900 16px/1 var(--font-display);color:var(--gold);font-variant-numeric:tabular-nums;display:block}
  .p-md .hud .chip i{font:700 6.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.8);font-style:normal}

  /* tracking reticle over a small photo (the boot) */
  .p-md .retic{position:absolute;inset:18% 20%;z-index:3;pointer-events:none}
  .p-md .retic span{position:absolute;width:12px;height:12px;border:1.5px solid var(--gold);opacity:.85;animation:mdPulse 2.4s ease-in-out infinite}
  .p-md .retic span:nth-child(1){top:0;left:0;border-right:none;border-bottom:none}
  .p-md .retic span:nth-child(2){top:0;right:0;border-left:none;border-bottom:none}
  .p-md .retic span:nth-child(3){bottom:0;left:0;border-right:none;border-top:none}
  .p-md .retic span:nth-child(4){bottom:0;right:0;border-left:none;border-top:none}
  .p-md .retic em{position:absolute;left:0;top:-15px;font:800 6.5px/1 var(--font-mono);letter-spacing:.1em;
    text-transform:uppercase;color:var(--gold);text-shadow:0 1px 3px rgba(0,0,0,.7);font-style:normal}

  /* ① dominant print — the terrace, slightly tilted like it was taped down */
  .p-md .lead{display:flex}
  .p-md .lead .print{flex:1;rotate:-1.1deg;padding:9px 9px 0}
  .p-md .lead .print .img{top:9px;left:9px;right:9px;bottom:38px}
  .p-md .lead .print .cap{height:38px}
  .p-md .lead .print .cap b{font-size:9.5px}
  .p-md .lead .print .cap span{font-size:11px;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}

  /* ② poster — editorial headline stats from real data ── */
  .p-md .poster{display:flex;flex-direction:column;justify-content:center;gap:clamp(6px,1.1vh,13px);
    padding:clamp(8px,1.4vw,18px) clamp(10px,1.6vw,20px);background:var(--fz-card);
    backdrop-filter:blur(3px);border:1px solid var(--fz-line);border-radius:5px}
  .p-md .poster .pk{font:800 9px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);
    display:flex;align-items:center;gap:7px}
  .p-md .poster .pk .ic{width:12px;height:12px}
  .p-md .pl{display:flex;align-items:baseline;gap:11px;line-height:.9}
  .p-md .pl .big{font-family:var(--font-display);font-weight:900;font-size:clamp(38px,5.6vw,72px);
    letter-spacing:-.03em;color:var(--garnet);font-variant-numeric:tabular-nums}
  .p-md .pl.gold .big{color:var(--gold)}
  .p-md .pl .say{font-family:var(--font-display);font-weight:900;font-size:clamp(15px,1.7vw,23px);
    text-transform:uppercase;letter-spacing:-.01em;color:var(--fz-ink);line-height:.94;max-width:16ch}
  .p-md .pl .say em{font-style:normal;color:var(--fz-mut);display:block;font:600 10px/1.35 var(--font-mono);
    letter-spacing:.04em;text-transform:none;margin-top:4px}
  .p-md .poster .hand{font-family:var(--font-hand);font-size:clamp(14px,1.4vw,19px);color:var(--blau);
    rotate:-1deg;margin-top:2px}
  .p-md .poster .hand::before{content:"“"}.p-md .poster .hand::after{content:"”"}

  /* last-vs-this headline + comparison table + season arc */
  .p-md .yhead{display:flex;align-items:center;gap:11px;flex-wrap:wrap}
  .p-md .yh-main{display:flex;align-items:baseline;gap:6px}
  .p-md .yh-main b{font-family:var(--font-display);font-weight:900;font-size:clamp(32px,4.4vw,58px);color:var(--garnet);
    line-height:.82;font-variant-numeric:tabular-nums;letter-spacing:-.03em}
  .p-md .yh-main i{font:700 7.5px/1.05 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--fz-mut);font-style:normal}
  .p-md .yh-delta{font:800 11px/1 var(--font-mono);letter-spacing:.03em;padding:4px 8px;border-radius:4px;display:inline-flex;align-items:center;gap:5px}
  .p-md .yh-delta span{font-weight:600;color:var(--fz-mut)}
  .p-md .yh-delta.good{color:#1f9d57;background:color-mix(in srgb,#1f9d57 15%,transparent)}
  .p-md .yh-delta.bad{color:#d14b45;background:color-mix(in srgb,#d14b45 15%,transparent)}
  :root[data-theme="dark"] .p-md .yh-delta.good{color:#48d184}
  :root[data-theme="dark"] .p-md .yh-delta.bad{color:#f2756f}
  .p-md .yh-form{display:flex;gap:3px;margin-top:1px}

  /* legend in the header */
  .p-md .leg{margin-left:auto;display:inline-flex;align-items:center;gap:6px;
    font:700 7.5px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--fz-mut)}
  .p-md .leg .lg{width:9px;height:9px;border-radius:2px;margin-right:-2px}
  .p-md .leg .lg.prev{background:color-mix(in srgb,var(--garnet) 70%,transparent)}
  .p-md .leg .lg.cur{background:var(--gold)}

  /* radar + numbers side by side */
  .p-md .prow{display:flex;gap:clamp(8px,1.2vw,16px);align-items:center;flex:1;min-height:0}
  .p-md .radarbox{flex:0 0 clamp(128px,15vw,172px);display:grid;place-items:center}
  .p-md .radar{width:100%;height:auto;aspect-ratio:1;overflow:visible}
  .p-md .radar .rg{fill:none;stroke:var(--fz-line);stroke-width:.5}
  .p-md .radar .ax{stroke:var(--fz-line);stroke-width:.4}
  .p-md .radar .rp{stroke-width:1.6;stroke-linejoin:round}
  .p-md .radar .rp.prev{fill:color-mix(in srgb,var(--garnet) 16%,transparent);stroke:var(--garnet)}
  .p-md .radar .rp.cur{fill:color-mix(in srgb,var(--gold) 20%,transparent);stroke:var(--gold)}
  .p-md .radar .al{fill:var(--fz-mut);font:800 6px/1 var(--font-mono);letter-spacing:.04em;
    text-transform:uppercase;text-anchor:middle}

  .p-md .pstats{flex:1;min-width:0;display:flex;flex-direction:column;gap:clamp(4px,0.8vh,8px)}
  .p-md .under{display:flex;flex-wrap:wrap;align-items:center;gap:5px 10px;
    padding-top:6px;border-top:1px solid var(--fz-line)}
  .p-md .under .ut{font:800 7.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
  .p-md .under .uc{font:600 8.5px/1 var(--font-mono);color:var(--fz-mut);display:inline-flex;align-items:baseline;gap:3px}
  .p-md .under .uc b{font:900 11px/1 var(--font-display);color:var(--fz-ink);font-variant-numeric:tabular-nums}
  .p-md .under .un{flex-basis:100%;font:600 7.5px/1.3 var(--font-mono);color:var(--fz-mut);opacity:.85}

  .p-md .cmp{display:flex;flex-direction:column;gap:1px}
  .p-md .cmp-head{display:grid;grid-template-columns:1fr auto 18px auto;gap:8px;align-items:center;
    font:700 7px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--fz-mut);
    padding:0 2px 3px;border-bottom:1px solid var(--fz-line)}
  .p-md .cmp-head span:nth-child(2),.p-md .cmp-head span:nth-child(4){text-align:right}
  .p-md .cmp-row{display:grid;grid-template-columns:1fr auto 18px auto;gap:8px;align-items:center;padding:2.5px 2px}
  .p-md .cl{font:700 10px/1 var(--font-body);color:var(--fz-ink)}
  .p-md .ca{font:700 11px/1 var(--font-mono);color:var(--fz-mut);text-align:right;font-variant-numeric:tabular-nums}
  .p-md .cb{font:900 12px/1 var(--font-display);color:var(--fz-ink);text-align:right;font-variant-numeric:tabular-nums}
  .p-md .cb.good{color:#1f9d57}.p-md .cb.bad{color:#d14b45}
  :root[data-theme="dark"] .p-md .cb.good{color:#48d184}:root[data-theme="dark"] .p-md .cb.bad{color:#f2756f}
  .p-md .cd{font:800 9px/1 var(--font-mono);text-align:center}
  .p-md .cd.good{color:#1f9d57}.p-md .cd.bad{color:#d14b45}.p-md .cd.same{color:var(--fz-mut)}
  :root[data-theme="dark"] .p-md .cd.good{color:#48d184}:root[data-theme="dark"] .p-md .cd.bad{color:#f2756f}
  .p-md .cmp-empty{font:600 10px/1.4 var(--font-mono);color:var(--fz-mut)}

  /* ③ fixture stub — torn ticket ── */
  .p-md .stub{background:var(--fz-card);backdrop-filter:blur(3px);border:1px solid var(--fz-line);border-radius:5px;
    padding:clamp(9px,1.2vw,14px);display:flex;flex-direction:column;gap:7px;position:relative;overflow:hidden}
  .p-md .stub::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;
    background:repeating-linear-gradient(180deg,var(--garnet) 0 6px,transparent 6px 11px)}
  .p-md .stub .lab{font:800 8px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--fz-mut);
    display:flex;align-items:center;gap:6px}
  .p-md .stub .lab .ic{width:11px;height:11px;color:var(--gold)}
  .p-md .stub .vs{display:flex;flex-direction:column;gap:2px}
  .p-md .stub .tn{font:900 clamp(13px,1.5vw,18px)/1 var(--font-display);text-transform:uppercase;color:var(--fz-ink);
    letter-spacing:-.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .p-md .stub .tn.a{color:var(--fz-mut)}
  .p-md .stub .vx{font:800 8px/1 var(--font-mono);letter-spacing:.12em;color:var(--garnet)}
  .p-md .stub .kick{font:700 9px/1.2 var(--font-mono);letter-spacing:.04em;color:var(--gold);margin-top:1px}
  .p-md .stub .tbl{margin-top:auto;display:flex;gap:10px;align-items:center;padding-top:7px;border-top:1px solid var(--fz-line)}
  .p-md .stub .st{display:flex;flex-direction:column}
  .p-md .stub .st b{font:900 14px/1 var(--font-display);color:var(--fz-ink);font-variant-numeric:tabular-nums}
  .p-md .stub .st i{font:600 7px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--fz-mut);font-style:normal;margin-top:3px}
  .p-md .stub .form{display:flex;gap:3px}
  .p-md .fp{width:13px;height:13px;border-radius:3px;font:800 8px/13px var(--font-mono);text-align:center;color:#fff}
  .p-md .fp.W{background:#2e8c50}.p-md .fp.D{background:#a8862a}.p-md .fp.L{background:#a8412f}
  .p-md .stub .empty{font:600 10px/1.4 var(--font-mono);color:var(--fz-mut);margin:auto 0}

  /* ④ wire — live headlines as an editorial column ── */
  .p-md .wire{background:var(--fz-card);backdrop-filter:blur(3px);border:1px solid var(--fz-line);border-radius:5px;
    padding:clamp(9px,1.2vw,14px);display:flex;flex-direction:column;gap:6px;min-height:0}
  .p-md .wire .lab{font:800 8px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--fz-mut);
    display:flex;align-items:center;gap:6px;flex-shrink:0}
  .p-md .wire .lab .dot{width:6px;height:6px;border-radius:50%;background:var(--garnet);animation:mdPulse 1.6s ease-in-out infinite}
  .p-md .wire .list{display:flex;flex-direction:column;min-height:0;overflow:hidden}
  .p-md .wire .it{text-decoration:none;color:inherit;padding:6px 0;border-top:1px solid var(--fz-line)}
  .p-md .wire .it:first-child{border-top:none}
  .p-md .wire .it .h{font:650 10.5px/1.28 var(--font-body);color:var(--fz-ink);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .p-md .wire .it:hover .h{color:var(--garnet)}
  .p-md .wire .it .s{font:700 7px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-top:3px}
  .p-md .wire .empty{font:600 9.5px/1.4 var(--font-mono);color:var(--fz-mut);margin:auto 0}

  /* ⑤ rail — two small prints stacked + next-issue teaser ── */
  .p-md .rail{display:flex;flex-direction:column;gap:clamp(7px,0.9vw,11px);min-height:0}
  .p-md .rail .print{flex:1;min-height:0;rotate:1deg}
  .p-md .rail .print:nth-child(2){rotate:-1.4deg}
  .p-md .rail .print .img{bottom:22px}
  .p-md .rail .print .cap{height:22px;padding:0 7px}
  .p-md .rail .print .cap b{font-size:7.5px}.p-md .rail .print .cap span{font-size:8px}
  .p-md .next{flex-shrink:0;background:linear-gradient(120deg,color-mix(in srgb,var(--garnet) 30%,transparent),var(--fz-card));
    border:1px solid color-mix(in srgb,var(--gold) 34%,var(--fz-line));border-radius:5px;padding:9px 11px;position:relative;overflow:hidden}
  .p-md .next .nb{font:800 7.5px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
  .p-md .next .nh{font:900 clamp(13px,1.4vw,16px)/.96 var(--font-display);text-transform:uppercase;color:var(--fz-ink);margin:4px 0 2px}
  .p-md .next .np{font:600 8.5px/1.35 var(--font-mono);color:var(--fz-mut)}
  .p-md .next .ball{position:absolute;right:-14px;bottom:-16px;width:72px;height:72px;color:var(--gold);opacity:.16;pointer-events:none}
  .p-md .next .ball .ic{width:100%;height:100%}

  /* ── lens-lightbox ── */
  .p-md .lb{position:fixed;inset:0;z-index:60;background:rgba(8,6,10,.9);display:grid;place-items:center;padding:4vw;cursor:zoom-out}
  .p-md .lb-frame{width:min(1040px,92vw);max-height:88vh;aspect-ratio:16/9;position:relative;overflow:hidden;
    background-size:cover;background-position:center;border:8px solid #fff;border-radius:3px;box-shadow:0 30px 80px rgba(0,0,0,.6)}
  .p-md .lb-cap{position:absolute;left:0;right:0;bottom:0;padding:18px 20px;
    background:linear-gradient(0deg,rgba(8,6,10,.82),transparent);color:#fff}
  .p-md .lb-cap b{font:800 9px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
  .p-md .lb-cap h3{font:900 clamp(18px,2.6vw,30px)/.98 var(--font-display);text-transform:uppercase;margin:6px 0 0}
  .p-md .lb-cap p{font:600 11px/1.4 var(--font-mono);letter-spacing:.04em;opacity:.85;margin:4px 0 0}
  .p-md .lb-x{position:absolute;top:12px;right:14px;z-index:3;font:800 9px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;
    color:#17110d;background:var(--gold);border-radius:20px;padding:6px 12px}

  /* mobile tab strip (hidden on desktop, where the whole spread shows at once) */
  .p-md .mtabs{display:none}

  /* ── responsive: still ONE screen. Lead print on top, a tab strip swaps one
     panel into the rest, so every panel stays reachable and nothing scrolls. ── */
  @media(max-width:900px){
    .p-md .mh-src{display:none}
    .p-md .mh-title{font-size:clamp(26px,8vw,40px)}
    .p-md .spread{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(150px,34%) auto minmax(0,1fr);gap:9px}
    .p-md .lead{grid-area:1 / 1}.p-md .lead .print{rotate:0deg}
    .p-md .mtabs{grid-area:2 / 1;display:flex;gap:4px;padding:3px;border-radius:999px;
      background:var(--fz-card);border:1px solid var(--fz-line);backdrop-filter:blur(3px)}
    .p-md .mtab{flex:1;border:0;background:none;border-radius:999px;padding:7px 4px;cursor:pointer;
      font:800 8.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--fz-mut)}
    .p-md .mtab[aria-selected="true"]{background:var(--garnet);color:#fff}
    .p-md .mtab:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
    .p-md .poster,.p-md .stub,.p-md .wire,.p-md .rail{grid-area:3 / 1;min-height:0;overflow:hidden}
    .p-md .spread[data-tab="poster"] :is(.stub,.wire,.rail),
    .p-md .spread[data-tab="stub"] :is(.poster,.wire,.rail),
    .p-md .spread[data-tab="wire"] :is(.poster,.stub,.rail),
    .p-md .spread[data-tab="rail"] :is(.poster,.stub,.wire){display:none}
    .p-md .poster{justify-content:flex-start}
    .p-md .prow{flex-direction:row;align-items:center}
    .p-md .radarbox{flex:0 0 min(132px,36%)}
    .p-md .rail{flex-direction:column}
    .p-md .rail .print{rotate:0deg}
  }
  @media(prefers-reduced-motion:reduce){
    .p-md .backdrop .bg,.p-md .backdrop .beam,.p-md .mg-scan,.p-md .mg-glare,
    .p-md .hud .live .d,.p-md .wire .lab .dot,.p-md .retic span{animation:none}
    .p-md .mg-glare{display:none}
    .p-md .print,.p-md .wire .it .h{transition:none}
  }
`

type MTab = "poster" | "stub" | "wire" | "rail"
const MTABS: { id: MTab; label: string }[] = [
  { id: "poster", label: "Season" },
  { id: "stub", label: "Fixture" },
  { id: "wire", label: "Wire" },
  { id: "rail", label: "Prints" },
]

export function Matchday() {
  const reduce = useReducedMotion()
  const { data: fb } = useFootball()
  const { data: last } = useBarcaLastSeason()
  const { data: news } = useFootballNews()

  const [zoom, setZoom] = useState<Plate | null>(null)
  const [mtab, setMtab] = useState<MTab>("poster")
  const [, force] = useState(0)

  const nextFix = fb?.next
  const standing = fb?.standing
  const form = fb?.form
  const hasFix = !!(nextFix?.strHomeTeam || nextFix?.strAwayTeam)
  const home = nextFix?.strHomeTeam || "Barcelona"
  const away = nextFix?.strAwayTeam || "Opponent"

  useOneScreen()

  // re-render once a minute so the kickoff line stays fresh (no per-second chips)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => force((n) => n + 1), 60000)
    return () => clearInterval(t)
  }, [reduce])

  // close lightbox on Escape
  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoom(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [zoom])

  // last season (baked from his FBref + Understat files) vs this season
  // (fetched LIVE). Compared PER MATCH, because 38 games vs a handful so far
  // is not comparable raw. Rates only — never a fabricated full-season total.
  type Row = { label: string; a: number; b: number; good: boolean; same: boolean; up: boolean }
  const cmp = useMemo(() => {
    const played = standing?.played ?? 0
    if (!standing || !played || !last.played) return null
    const pr = (n: number) => n / last.played
    const cr = (n: number) => n / played
    const mk = (label: string, prevTot: number, curTot: number, lowerBetter = false): Row => {
      const a = pr(prevTot), b = cr(curTot)
      const same = Math.abs(a - b) < 5e-3
      const good = lowerBetter ? b < a : b > a
      return { label, a, b, good, same, up: b >= a }
    }
    return [
      mk("Points / match", last.points, standing.points),
      mk("Goals / match", last.goals, standing.goals ?? 0),
      mk("Conceded / match", last.conceded, standing.conceded ?? 0, true),
      mk("Win rate", last.win, standing.win ?? 0),
    ]
  }, [standing, last])

  // six-axis radar — last (full) vs this (live, so far), all per match and
  // all from data BOTH seasons actually have (TheSportsDB has no live xG, so
  // xG stays out of the shape and sits in the honest underlying read below).
  const radar = useMemo(() => {
    const p = standing?.played ?? 0
    if (!standing || !p || !last.played) return null
    const clamp = (v: number) => Math.min(1, Math.max(0, v))
    const raw = [
      { k: "Attack", a: last.goals / last.played, b: (standing.goals ?? 0) / p, n: (v: number) => clamp(v / 4) },
      { k: "Defense", a: last.conceded / last.played, b: (standing.conceded ?? 0) / p, n: (v: number) => clamp(1 - v / 2) },
      { k: "Points", a: last.points / last.played, b: standing.points / p, n: (v: number) => clamp(v / 3) },
      { k: "Win", a: last.win / last.played, b: (standing.win ?? 0) / p, n: clamp },
      { k: "Margin", a: last.gd / last.played, b: standing.gd / p, n: (v: number) => clamp(v / 4) },
      { k: "No-loss", a: 1 - last.loss / last.played, b: 1 - (standing.loss ?? 0) / p, n: clamp },
    ]
    const N = raw.length, cx = 50, cy = 50, R = 40
    const pos = (i: number, r: number): [number, number] => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N
      return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r]
    }
    const ring = (f: number) =>
      raw.map((_, i) => { const [x, y] = pos(i, R * f); return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}` }).join(" ") + " Z"
    const shape = (sel: "a" | "b") =>
      raw.map((d, i) => { const [x, y] = pos(i, R * d.n(d[sel])); return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}` }).join(" ") + " Z"
    const axes = raw.map((d, i) => {
      const [lx, ly] = pos(i, R + 9); const [sx, sy] = pos(i, R)
      return { k: d.k, lx, ly, sx, sy }
    })
    return { prev: shape("a"), cur: shape("b"), axes, rings: [0.33, 0.66, 1].map(ring) }
  }, [standing, last])

  const finishing = (last.goals ?? 0) - (last.xG ?? 0)

  // count-ups: the motion-graphic treatment on the real numbers
  const rankN = useCountUp(standing?.rank ?? 0, reduce, 800)
  const ptsN = useCountUp(standing?.points ?? 0, reduce, 1100)

  const newsItems = news?.items ?? []
  const kick = kickoffLine(nextFix?.strTimestamp)

  const Print = ({ p, cls, overlay }: { p: Plate; cls?: string; overlay?: ReactNode }) => (
    <motion.div
      className={`print ${cls ?? ""}`}
      onClick={() => setZoom(p)}
      role="button" tabIndex={0} aria-label={`Open photo: ${p.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setZoom(p) } }}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { ...springs.gentle }}
    >
      <div className="img" style={{ backgroundImage: `url(${p.src})` }}>
        <span className="mg-glare" aria-hidden="true" />
        <span className="mg-scan" aria-hidden="true" />
        {overlay}
      </div>
      <span className="zc" aria-hidden="true"><Icon id="i-camera" /></span>
      <div className="cap"><b>{p.kicker}</b><span>{p.title}</span></div>
    </motion.div>
  )

  return (
    <main className="page p-md" aria-label="Football Room">
      <style>{CSS}</style>
      <div className="backdrop" aria-hidden="true">
        <div className="bg" style={{ ["--bg" as string]: `url(${STADIUM.src})` }} />
        <span className="beam" />
        <div className="scrim" />
      </div>
      <div style={{ display: "none" }} data-character-slot="artist-guide-creature" />

      <PlateHeader
        plate="Plate III"
        kicker="Matchday fanzine"
        title={<>The <em className="hl">Terrace</em> Issue</>}
        note="~ Camp Nou, from the terrace"
        lede="I read Barça through Messi, then went and measured why."
        right={
          <div className="mh-meta">
            <div className="mh-iss">No. 10 · Garnet &amp; Blue</div>
            <div className="mh-src">Last season from FBref + Understat · this season live via TheSportsDB</div>
          </div>
        }
      />

      <div className="spread" data-tab={mtab}>
        {/* ① dominant pasted print — the terrace, with a live broadcast HUD */}
        <section className="lead">
          <Print
            p={PLATES[0]}
            overlay={
              <>
                <div className="mg-grid" aria-hidden="true" />
                {standing && (
                  <div className="hud">
                    <span className="live"><span className="d" /> Live</span>
                    <span className="chip"><b>{rankN}</b><i>rank</i></span>
                    <span className="chip"><b>{ptsN}</b><i>pts</i></span>
                  </div>
                )}
              </>
            }
          />
        </section>

        {/* mobile-only tab strip: one panel at a time, all reachable */}
        <div className="mtabs" role="tablist" aria-label="Matchday panels">
          {MTABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              className="mtab"
              aria-selected={mtab === t.id}
              onClick={() => setMtab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ② poster — last season (baked from his files) vs this season (live),
            as a per-match radar + the precise numbers + an honest underlying read */}
        <section className="poster">
          <div className="pk">
            <Icon id="i-scale" /> Last season vs this, per match · La Liga
            <span className="leg">
              <i className="lg prev" /> {last.season}
              <i className="lg cur" /> {standing?.season ?? "now"}
            </span>
          </div>

          {radar && cmp ? (
            <div className="prow">
              <div className="radarbox">
                <svg className="radar" viewBox="-12 -12 124 124" aria-label="per-match comparison radar">
                  {radar.rings.map((d, i) => <path key={i} className="rg" d={d} />)}
                  {radar.axes.map((a) => <line key={a.k} className="ax" x1="50" y1="50" x2={a.sx} y2={a.sy} />)}
                  <motion.path className="rp prev" d={radar.prev}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ transformOrigin: "50px 50px" }} transition={reduce ? { duration: 0 } : { ...springs.gentle }} />
                  <motion.path className="rp cur" d={radar.cur}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ transformOrigin: "50px 50px" }} transition={reduce ? { duration: 0 } : { ...springs.gentle, delay: 0.1 }} />
                  {radar.axes.map((a) => (
                    <text key={a.k} className="al" x={a.lx} y={a.ly} dominantBaseline="middle">{a.k}</text>
                  ))}
                </svg>
              </div>

              <div className="pstats">
                <div className="yhead">
                  <div className="yh-main">
                    <b>{ptsN}</b>
                    <i>pts<br />{standing!.played} played</i>
                  </div>
                  <div className={`yh-delta ${standing!.rank <= 1 ? "good" : ""}`}>
                    {standing!.rank === 1 ? "1st" : `${standing!.rank}th`} <span>La Liga</span>
                  </div>
                </div>
                {form && form.length > 0 && (
                  <div className="yh-form" aria-label="recent form, newest first">
                    {form.slice(0, 5).map((f, i) => <span key={i} className={`fp ${f}`}>{f}</span>)}
                  </div>
                )}
                <div className="cmp">
                  {cmp.map((r) => (
                    <div className="cmp-row" key={r.label}>
                      <span className="cl">{r.label}</span>
                      <span className="ca">{r.a.toFixed(2)}</span>
                      <span className={`cd ${r.same ? "same" : r.good ? "good" : "bad"}`} aria-hidden="true">
                        {r.same ? "→" : r.up ? "▲" : "▼"}
                      </span>
                      <span className={`cb ${r.same ? "" : r.good ? "good" : "bad"}`}>{r.b.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="cmp-empty">Waiting on the live league table…</div>
          )}

          <div className="under" aria-label="last season underlying quality, from his files">
            <span className="ut">{last.season} underlying</span>
            <span className="uc"><b>{last.xG?.toFixed(1)}</b> xG</span>
            <span className="uc"><b>{last.xGA?.toFixed(1)}</b> xGA</span>
            <span className="uc"><b>{finishing >= 0 ? "+" : ""}{finishing.toFixed(1)}</b> finishing</span>
            <span className="uc"><b>{last.cleanSheets}</b> clean sheets</span>
            <span className="uc"><b>{last.possession?.toFixed(0)}%</b> poss</span>
            <span className="un">Understat / FBref · live xG not published</span>
          </div>
        </section>

        {/* ③ fixture stub */}
        <section className="stub" aria-label="Next fixture">
          <div className="lab"><Icon id="i-pulse" /> Next fixture</div>
          {hasFix ? (
            <>
              <div className="vs">
                <div className="tn">{home}</div>
                <div className="vx">vs</div>
                <div className="tn a">{away}</div>
              </div>
              <div className="kick">{nextFix?.strStatus === "FT" ? "Full time" : kick || (nextFix?.strLeague ?? "fixture live")}</div>
            </>
          ) : (
            <div className="empty">Awaiting the next fixture from the live feed.</div>
          )}
          {standing && (
            <div className="tbl">
              <div className="st"><b>{standing.rank}</b><i>rank</i></div>
              <div className="st"><b>{standing.points}</b><i>pts</i></div>
              <div className="st"><b>{standing.gd >= 0 ? `+${standing.gd}` : standing.gd}</b><i>gd</i></div>
              {form && form.length > 0 && (
                <div className="st">
                  <div className="form" aria-label="recent form">
                    {form.slice(0, 5).map((f, i) => <span key={i} className={`fp ${f}`}>{f}</span>)}
                  </div>
                  <i>form</i>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ④ wire — live headlines */}
        <section className="wire" aria-label="Football wire">
          <div className="lab"><span className="dot" /> The wire · live</div>
          {newsItems.length > 0 ? (
            <div className="list">
              {newsItems.slice(0, 4).map((n) => (
                <a key={n.url} href={n.url} target="_blank" rel="noopener noreferrer" className="it">
                  <div className="h">{n.title}</div>
                  <div className="s">{n.source || "the wire"}</div>
                </a>
              ))}
            </div>
          ) : (
            <div className="empty">Headlines load from the live football feed.</div>
          )}
        </section>

        {/* ⑤ rail — two small prints (boot carries a tracking reticle) + next issue */}
        <section className="rail">
          <Print
            p={PLATES[1]}
            overlay={
              <div className="retic" aria-hidden="true">
                <em>tracking</em><span /><span /><span /><span />
              </div>
            }
          />
          <Print p={PLATES[2]} />
          <div className="next" aria-label="An idea for a future issue">
            <span className="ball" aria-hidden="true"><Icon id="i-ball" /></span>
            <div className="nb">An idea</div>
            <div className="nh">Messi · the journey</div>
            <div className="np">Rosario to a World Cup, told in stats. One day, maybe.</div>
          </div>
        </section>
      </div>

      {/* ── lens-lightbox ── */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="lb" onClick={() => setZoom(null)} role="dialog" aria-label="Photo enlarged"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: motionTokens.duration.fast }}
          >
            <motion.div
              className="lb-frame" style={{ backgroundImage: `url(${zoom.src})` }}
              initial={reduce ? { scale: 1 } : { scale: 0.95 }} animate={{ scale: 1 }} exit={reduce ? { scale: 1 } : { scale: 0.97 }}
              transition={reduce ? { duration: 0 } : { ...springs.gentle }}
            >
              <span className="lb-x">Close</span>
              <div className="lb-cap">
                <b>{zoom.kicker}</b>
                <h3>{zoom.title}</h3>
                <p>{zoom.note}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
