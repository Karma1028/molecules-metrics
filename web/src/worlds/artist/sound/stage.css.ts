/* The playing stages (portalled to <body>, so this sheet travels with them). */

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='.18'/></svg>\")"

export const STAGE_CSS = String.raw`
  .stage{position:fixed;inset:0;z-index:120;overflow:hidden;color:var(--pal-fg,#f2ede3);
    background:radial-gradient(120% 90% at 30% 20%,var(--pal-bg,#0b0b0d),#050506 85%);transition:background .6s var(--ease)}
  .st-bg{position:absolute;inset:-12%;width:124%;height:124%;object-fit:cover;filter:blur(70px) saturate(1.5) brightness(.62);
    opacity:.95;pointer-events:none}
  .st-veil{position:absolute;inset:0;pointer-events:none;background:${GRAIN},
    linear-gradient(100deg,color-mix(in srgb,var(--pal-bg,#0b0b0d) 55%,transparent) 0%,color-mix(in srgb,var(--pal-bg,#0b0b0d) 30%,transparent) 45%,#000000a6 100%),
    radial-gradient(90% 70% at 50% 110%,#000c,transparent 70%)}
  .stage .exit,.vstage .exit{position:absolute;top:18px;right:20px;z-index:3;background:#ffffff14;border:1px solid #ffffff26;
    color:inherit;cursor:pointer;border-radius:30px;padding:8px 14px;font:600 10px/1 var(--font-mono);letter-spacing:.12em;
    text-transform:uppercase;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
  .stage .exit:hover,.vstage .exit:hover{background:#ffffff2b}
  .stage .exit:focus-visible,.vstage .exit:focus-visible{outline:2px solid var(--pal-accent,#1DB954);outline-offset:2px}

  .st-grid{position:relative;z-index:1;height:100%;box-sizing:border-box;display:grid;
    grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:clamp(28px,5vw,80px);align-items:center;
    padding:clamp(56px,9vh,96px) clamp(28px,6vw,96px) clamp(28px,6vh,64px);max-width:1440px;margin:0 auto}
  .st-left{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(12px,2vh,20px);min-width:0}

  /* cover with the record sliding out of the sleeve */
  .st-cover-wrap{position:relative;width:var(--cv);aspect-ratio:1;flex:none;--cv:min(44vh,30vw,400px);margin-right:calc(var(--cv) * .3)}
  .stage-art{position:relative;z-index:1;width:100%;height:100%;border-radius:6px;object-fit:cover;display:block;
    box-shadow:0 30px 60px -20px #000,0 0 0 1px #ffffff14}
  .stage-art.ph{background:linear-gradient(135deg,color-mix(in srgb,var(--pal-accent,#1DB954) 40%,#111),#111)}
  .st-disc{position:absolute;top:3%;left:30%;width:94%;aspect-ratio:1;border-radius:50%;
    background:radial-gradient(circle,#0000 0 31%,#ffffff12 31.4% 32%,#0000 32.4%),repeating-radial-gradient(circle,#0b0b0d 0 1.2px,#19191c 1.2px 2.8px);
    box-shadow:0 20px 40px -14px #000,inset 0 0 0 2px #000}
  .st-disc::after{content:"";position:absolute;inset:0;border-radius:50%;
    background:conic-gradient(from 30deg,#fff0,#ffffff22 30deg,#fff0 60deg,#fff0 190deg,#ffffff14 215deg,#fff0 245deg)}
  .st-disc.spin{animation:stspin 4.8s linear infinite}
  .st-disc-label{position:absolute;inset:32%;border-radius:50%;overflow:hidden;background:var(--pal-accent,#1DB954)}
  .st-disc-label img{width:100%;height:100%;object-fit:cover;display:block}
  @keyframes stspin{to{transform:rotate(360deg)}}

  .stage-head{display:flex;flex-direction:column;gap:6px;min-width:0;max-width:100%}
  .stage-src{display:flex;align-items:center;gap:8px;font:600 10px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;opacity:.8}
  .stage-title{font:700 clamp(26px,3.6vw,48px)/1.02 var(--font-display);letter-spacing:-.02em;text-wrap:balance;
    overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .stage-artist{font:500 clamp(13px,1.2vw,16px)/1.2 var(--font-body);opacity:.78}

  .st-transport{display:flex;align-items:center;gap:12px;width:min(100%,calc(var(--cv,400px) * 1.3))}
  .st-play{flex:none;width:46px;height:46px;border-radius:50%;border:none;cursor:pointer;display:grid;place-items:center;
    background:var(--pal-fg,#f2ede3);color:#0b0b0d;box-shadow:0 8px 20px -8px #000;transition:transform .2s var(--ease)}
  .st-play svg{fill:currentColor}
  .st-play:hover{transform:scale(1.06)}
  .st-play:focus-visible{outline:2px solid var(--pal-accent,#1DB954);outline-offset:3px}
  .st-time{flex:none;font:500 11px/1 var(--font-mono);opacity:.75;font-variant-numeric:tabular-nums;min-width:30px}
  .st-seek{flex:1;min-width:0;height:18px;margin:0;background:none;cursor:pointer;-webkit-appearance:none;appearance:none}
  .st-seek::-webkit-slider-runnable-track{height:4px;border-radius:4px;
    background:linear-gradient(90deg,var(--pal-fg,#f2ede3) var(--pct,0%),#ffffff33 var(--pct,0%))}
  .st-seek::-moz-range-track{height:4px;border-radius:4px;background:#ffffff33}
  .st-seek::-moz-range-progress{height:4px;border-radius:4px;background:var(--pal-fg,#f2ede3)}
  .st-seek::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;margin-top:-4px;background:var(--pal-fg,#f2ede3);
    box-shadow:0 0 0 4px #00000033}
  .st-seek::-moz-range-thumb{width:12px;height:12px;border:none;border-radius:50%;background:var(--pal-fg,#f2ede3)}
  .st-seek:focus-visible{outline:2px solid var(--pal-accent,#1DB954);outline-offset:4px;border-radius:4px}

  .stage-embed{display:block;width:min(100%,calc(var(--cv,400px) * 1.3));border:0;border-radius:12px;background:transparent;
    box-shadow:0 16px 30px -18px #000}
  .stage-open{display:inline-flex;align-items:center;gap:7px;text-decoration:none;font:600 10px/1 var(--font-mono);
    letter-spacing:.08em;text-transform:uppercase;color:#06110a;background:#1DB954;padding:9px 14px;border-radius:30px;
    transition:transform .3s var(--spring),filter .3s}
  .stage-open:hover{transform:translateY(-2px);filter:brightness(1.08)}

  /* lyric sheet */
  .lyrics-wrap{min-width:0;height:100%;max-height:min(78vh,720px);overflow:hidden;display:flex;flex-direction:column;justify-content:center;
    -webkit-mask-image:linear-gradient(transparent,#000 10%,#000 90%,transparent);mask-image:linear-gradient(transparent,#000 10%,#000 90%,transparent)}
  .lyrics{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:clamp(8px,1.6vh,18px)}
  .ly-line{font:700 clamp(18px,1.9vw,26px)/1.22 var(--font-display);letter-spacing:-.01em;opacity:.34;transform-origin:left center;
    transition:opacity .4s var(--ease),transform .4s var(--ease),color .4s var(--ease);text-wrap:balance}
  .ly-line.on{opacity:1;color:var(--pal-fg,#fff);transform:scale(1.22);margin:clamp(4px,1vh,10px) 0}
  .ly-line.past{opacity:.22}
  .ly-plain{white-space:pre-wrap;margin:0;font:500 clamp(14px,1.3vw,17px)/1.6 var(--font-body);opacity:.85;max-height:100%;overflow:hidden}
  .ly-note{font:500 13px/1.5 var(--font-mono);opacity:.75;margin:0}
  .ly-note a{color:var(--pal-accent,#1DB954)}

  @media (max-width:820px){
    .st-grid{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);align-items:stretch;gap:18px;
      padding:64px 20px 22px}
    .st-left{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:16px;row-gap:12px;align-items:center}
    .st-cover-wrap{--cv:min(26vw,120px);margin-right:calc(var(--cv) * .22)}
    .st-disc{left:22%}
    .st-transport,.stage-embed,.stage-open{grid-column:1 / -1}
    .st-transport,.stage-embed{width:100%}
    .stage-title{font-size:clamp(20px,5.6vw,28px)}
    .lyrics-wrap{max-height:none;justify-content:flex-start;padding-top:8px}
    .ly-line{font-size:clamp(17px,4.6vw,22px)}
    .ly-line.on{transform:scale(1.12)}
  }
  @media (max-width:820px) and (max-height:700px){
    .st-grid{padding-top:58px;gap:12px}
    .stage-embed{height:80px}
  }

  /* playing: youtube video stage */
  .vstage{position:fixed;inset:0;z-index:120;background:#000;overflow:hidden;color:#f4efe6}
  .vframe{position:absolute;inset:-6%;width:112%;height:112%;border:none;filter:blur(6px) saturate(.6) brightness(.5)}
  .vstage.reduced .vframe{filter:saturate(.7) brightness(.55);inset:0;width:100%;height:100%}
  .vscrim{position:absolute;inset:0;pointer-events:none;background:${GRAIN},
    linear-gradient(0deg,#000000e6 0%,#00000080 30%,transparent 60%),radial-gradient(120% 90% at 50% 40%,transparent,#000c 90%)}
  .voverlay{position:absolute;left:clamp(20px,6vw,96px);right:clamp(20px,6vw,96px);bottom:clamp(28px,10vh,110px);z-index:2;
    display:flex;flex-direction:column;gap:8px;pointer-events:none}
  .voverlay .stage-title{font-size:clamp(28px,5vw,64px);max-width:18ch}

  @media (prefers-reduced-motion:reduce){
    .st-disc.spin{animation:none}
    .ly-line{transition:opacity .08s}
    .ly-line.on{transform:none}
    .st-play{transition:none}
  }
`
