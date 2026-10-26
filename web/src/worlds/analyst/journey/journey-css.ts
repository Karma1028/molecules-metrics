// Styles for the scrubber band and the detail card, scoped under .p-jn.
import { motionTokens } from "../../../lib/motion-tokens"

export const PANEL_CSS = String.raw`
  .p-jn .jcard{min-height:0;display:grid;align-items:stretch;
    background:var(--card);border:1px solid var(--rule);border-left:3px solid currentColor;border-radius:12px;
    box-shadow:var(--shadow-sm);padding:clamp(12px,2.4vh,28px) clamp(14px,2vw,28px)}
  .p-jn .dc{grid-area:1 / 1;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(5px,1.3vh,14px);min-height:0;min-width:0}
  .p-jn .dc-where{display:flex;flex-direction:column;gap:clamp(4px,1vh,10px);margin-top:clamp(-10px,-.8vh,-4px)}
  .p-jn .jc-top{display:flex;align-items:center;gap:10px}
  .p-jn .jc-ic{width:18px;height:18px}
  .p-jn .jc-era{font:600 11px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase}
  .p-jn .jc-per{margin-left:auto;font:500 11px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted);
    font-variant-numeric:tabular-nums}
  .p-jn .jc-title{font:700 clamp(19px,2.2vw,30px)/1.1 var(--font-display);color:var(--ink);letter-spacing:-.015em;margin:0;text-wrap:balance}
  .p-jn .jc-place{font:600 clamp(12px,1vw,13.5px)/1.35 var(--font-mono);color:var(--muted)}
  .p-jn .jc-note{font-size:clamp(12.5px,1vw,14px);line-height:1.45;color:var(--ink);text-wrap:pretty;margin:0}

  .p-jn .dc-facts{display:grid;grid-template-columns:auto auto minmax(0,1fr);margin:0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
  .p-jn .dc-facts>div{padding:clamp(6px,1.6vh,14px) clamp(10px,1.4vw,22px) clamp(6px,1.6vh,14px) 0;min-width:0}
  .p-jn .dc-facts>div+div{padding-left:clamp(10px,1.4vw,22px);border-left:1px solid var(--rule)}
  .p-jn .dc-facts dt{font:600 11px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
  .p-jn .dc-facts dd{margin:0;font:600 clamp(12px,1.05vw,15px)/1.25 var(--font-mono);color:var(--ink);font-variant-numeric:tabular-nums}
  .p-jn .dc-facts dd small{display:block;font:500 11px/1.3 var(--font-mono);color:var(--muted);margin-top:3px;letter-spacing:.04em}
  .p-jn .dc-facts .dc-metric{font:700 clamp(18px,1.9vw,26px)/1 var(--font-mono);color:currentColor;white-space:nowrap}

  .p-jn .dc-block h3{font:600 11px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin:0 0 8px}
  .p-jn .dc-changes{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  .p-jn .dc-changes li{display:flex;align-items:baseline;gap:8px;font-size:clamp(12px,1vw,14px);line-height:1.35;color:var(--ink)}
  .p-jn .dc-changes .ic{width:10px;height:10px;flex:0 0 auto;color:currentColor;transform:translateY(1px)}

  /* step readout: stage, slice of the years, era; fills the card's lower band */
  .p-jn .dc-read{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr) minmax(0,1fr);
    gap:clamp(10px,1.4vw,20px);padding-top:clamp(8px,1.4vh,14px);border-top:1px solid var(--rule)}
  .p-jn .rd-cell{display:flex;flex-direction:column;gap:6px;min-width:0}
  .p-jn .rd-k{display:flex;justify-content:space-between;gap:6px;font:600 11px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-jn .rd-k b{color:currentColor;font-weight:700;letter-spacing:.04em;font-variant-numeric:tabular-nums;white-space:nowrap}
  .p-jn .rd-segs{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:3px}
  .p-jn .rd-segs i{height:clamp(8px,1.5vh,14px);border-radius:2px;border:1px solid currentColor;opacity:.45}
  .p-jn .rd-segs i.done{background:color-mix(in srgb,currentColor 35%,transparent);opacity:.8}
  .p-jn .rd-segs i.now{background:currentColor;opacity:1}
  .p-jn .rd-track{position:relative;height:clamp(8px,1.5vh,14px);border-radius:3px;background:color-mix(in srgb,var(--ink) 8%,transparent)}
  .p-jn .rd-track i{position:absolute;top:0;bottom:0;border-radius:3px;background:currentColor}
  .p-jn .rd-ends{display:flex;justify-content:space-between;font:500 11px/1 var(--font-mono);color:var(--muted);font-variant-numeric:tabular-nums}
  .p-jn .rd-eras{display:flex;flex-direction:column;gap:3px;font:600 11px/1.15 var(--font-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
  .p-jn .rd-eras span{padding-left:8px;border-left:2px solid var(--rule)}
  .p-jn .rd-eras .on{color:currentColor;border-left-color:currentColor}

  @media(min-width:761px) and (max-width:1100px){
    .p-jn .dc-read{grid-template-columns:minmax(0,1fr) minmax(0,1fr);row-gap:10px}
    .p-jn .rd-cell:last-child{grid-column:1 / -1}
    .p-jn .rd-eras{flex-direction:row;flex-wrap:wrap;gap:4px 10px}
  }
  @media(min-width:761px) and (max-height:780px){
    .p-jn .jcard{padding:10px clamp(14px,2vw,28px)}
    .p-jn .dc{gap:6px}
    .p-jn .jc-title{font-size:clamp(19px,1.9vw,24px)}
    .p-jn .dc-facts>div{padding-top:7px;padding-bottom:7px}
    .p-jn .dc-block h3{margin-bottom:5px}
    .p-jn .dc-changes{gap:2px}
  }
  @media(max-width:760px){
    .p-jn .dc{gap:4px}
    .p-jn .jc-ic{width:14px;height:14px}
    .p-jn .dc-where{display:block;margin-top:-2px;font-size:12px;line-height:1.35}
    .p-jn .dc-where .jc-note{font-size:12px;color:var(--muted)}
    .p-jn .dc-where .jc-note::before{content:" / "}
    .p-jn .jc-title{font-size:18px}
    .p-jn .dc-facts>div{padding:5px 10px 5px 0}
    .p-jn .dc-facts>div+div{padding-left:10px}
    .p-jn .dc-facts dt{margin-bottom:3px}
    .p-jn .dc-block{font-size:11.5px;line-height:1.35}
    .p-jn .dc-block h3{display:inline;margin:0 6px 0 0}
    .p-jn .dc-changes{display:inline}
    .p-jn .dc-changes li{display:inline;font-size:11.5px}
    .p-jn .dc-changes li+li{margin-left:8px}
    .p-jn .dc-changes .ic{display:inline-block;margin-right:4px;transform:none}
    /* phones: the map needs the height; stage and years already read from the step label and the scrubber */
    .p-jn .dc-read{display:none}
  }
`

export const SCRUB_CSS = String.raw`
  .p-jn .jscrub{display:grid;grid-template-columns:auto auto minmax(0,1fr) auto;align-items:end;gap:10px;
    padding:8px 12px 6px;border:1px solid var(--rule);border-radius:12px;background:var(--card);box-shadow:var(--shadow-sm)}
  .p-jn .sc-btn{align-self:center;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:none;
    border:1px solid var(--rule);color:var(--ink);cursor:pointer}
  .p-jn .sc-btn:hover:not(:disabled){border-color:var(--accent);color:var(--accent-ink)}
  .p-jn .sc-btn:disabled{opacity:.35;cursor:default}
  .p-jn .sc-btn .ic{width:12px;height:12px}
  .p-jn .sc-btn.prev .ic{transform:scaleX(-1)}
  .p-jn .sc-lanes{display:grid;grid-template-rows:14px 14px;row-gap:6px;padding-bottom:18px;
    font:600 11px/14px var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}

  .p-jn .sc-track{position:relative;padding-top:22px;cursor:ew-resize;touch-action:none;outline:none;border-radius:6px}
  .p-jn .sc-track:focus-visible{box-shadow:0 0 0 1.5px var(--accent)}
  .p-jn .sc-rows{display:grid;grid-template-rows:14px 14px;row-gap:6px}
  .p-jn .sc-row{position:relative;background:linear-gradient(var(--grid),var(--grid)) center/100% 1px no-repeat}
  .p-jn .sc-bar{position:absolute;top:0;bottom:0;min-width:7px;border-radius:4px;border:1px solid currentColor;
    background:color-mix(in srgb,currentColor 22%,transparent);transition:background ${motionTokens.duration.fast}s var(--ease)}
  .p-jn .sc-bar.on{background:currentColor}
  .p-jn .sc-axis{position:relative;height:18px}
  .p-jn .sc-tick{position:absolute;top:0;width:1px;height:4px;background:var(--muted);opacity:.6}
  .p-jn .sc-tick.lab{height:6px;opacity:1}
  .p-jn .sc-tick b{position:absolute;top:7px;left:0;transform:translateX(-50%);font:600 11px/1 var(--font-mono);
    color:var(--muted);font-variant-numeric:tabular-nums}
  .p-jn .sc-tick b.l{transform:none}
  .p-jn .sc-tick b.r{transform:translateX(-100%)}

  .p-jn .sc-head{position:absolute;top:0;bottom:18px;width:0;pointer-events:none}
  .p-jn .sc-head::before{content:"";position:absolute;left:-1px;top:14px;bottom:-3px;width:2px;background:currentColor;border-radius:1px}
  .p-jn .sc-knob{position:absolute;left:-6px;top:33px;width:12px;height:12px;border-radius:50%;background:currentColor;
    box-shadow:0 0 0 3px var(--card)}
  .p-jn .sc-read{position:absolute;top:0;left:0;transform:translateX(-50%);white-space:nowrap;
    font:700 11px/1 var(--font-mono);letter-spacing:.06em;text-transform:uppercase;color:currentColor;
    font-variant-numeric:tabular-nums}
  .p-jn .sc-read.l{transform:translateX(-4px)}
  .p-jn .sc-read.r{transform:translateX(calc(-100% + 4px))}
  .p-jn .sc-track.drag .sc-knob{transform:scale(1.25)}

  @media(max-width:760px){
    .p-jn .jscrub{gap:6px;padding:4px 8px 2px}
    .p-jn .sc-btn{width:26px;height:26px}
    .p-jn .sc-lanes,.p-jn .sc-rows{grid-template-rows:11px 11px;row-gap:4px}
    .p-jn .sc-lanes{line-height:11px;padding-bottom:14px}
    .p-jn .sc-track{padding-top:14px}
    .p-jn .sc-axis{height:14px}
    .p-jn .sc-head{bottom:14px}
    .p-jn .sc-tick b{top:5px}
    .p-jn .sc-head::before{top:11px}
    .p-jn .sc-knob{top:19px;width:10px;height:10px;left:-5px}
  }
  @media(prefers-reduced-motion:reduce){
    .p-jn .sc-bar{transition:none}
  }
`
