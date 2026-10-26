/* Mode A "me": the hi-fi deck. Static film grain (one SVG noise tile, never animated). */

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='.22'/></svg>\")"

export const SOUND_ME_CSS = String.raw`
  .me{flex:1;min-height:0;width:100%;max-width:1240px;margin:0 auto;display:flex;container-type:size;
    --green-ink:#12813f;--plinth-a:#f5f1e9;--plinth-b:#e8e1d4;--plinth-edge:#d5cbb9;--well-a:#e2dacb;--well-b:#d3c9b8;
    --key-a:#fdfaf4;--key-b:#e9e2d5;--key-edge:#cbc1ae;--key-drop:#c3b8a3;--sleeve:#fbf7ef;--sleeve-ink:var(--ink);
    --arm:#ece8e0;--arm-base:#d8d3c9;--arm-line:#a8a194}
  :root[data-theme="dark"] .me{--green-ink:#35e083;--plinth-a:#252328;--plinth-b:#19181b;--plinth-edge:#323036;
    --well-a:#141316;--well-b:#0f0e10;--key-a:#2e2c31;--key-b:#222024;--key-edge:#3b393f;--key-drop:#0d0c0e;
    --sleeve:#2b2620;--arm:#d6d1c8;--arm-base:#3b393e;--arm-line:#56535a}

  /* ---- the plinth: one object, walnut cheeks, grain baked in ---- */
  .hifi{position:relative;flex:1;min-height:0;display:grid;
    grid-template-columns:var(--tt) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);
    grid-template-areas:"badge badge" "bay side";gap:clamp(10px,1.6vh,16px) clamp(18px,2.4vw,30px);
    padding:clamp(12px,1.8vh,18px) clamp(26px,3vw,40px) clamp(14px,2vh,20px);border-radius:20px;
    background:${GRAIN},linear-gradient(180deg,var(--plinth-a),var(--plinth-b));
    border:1px solid var(--plinth-edge);
    box-shadow:inset 0 1px 0 #ffffff80,inset 0 -2px 0 #0000000f,0 34px 60px -34px rgba(60,38,12,.55),0 12px 22px -14px rgba(60,38,12,.35);
    --tt:min(calc(100cqh - 150px),40cqw)}
  :root[data-theme="dark"] .hifi{box-shadow:inset 0 1px 0 #ffffff14,0 34px 60px -30px #000,0 12px 22px -14px #000c}
  .hifi::before,.hifi::after{content:"";position:absolute;top:0;bottom:0;width:12px;pointer-events:none;
    background:linear-gradient(90deg,#0000002e,transparent 40%,#ffffff1a 60%,#00000033),
      repeating-linear-gradient(176deg,#6b4527 0 3px,#5a391f 3px 5px,#73502f 5px 9px,#4f321b 9px 10px)}
  .hifi::before{left:0;border-radius:20px 0 0 20px}
  .hifi::after{right:0;border-radius:0 20px 20px 0}
  .hifi>*{min-width:0;min-height:0}

  .hifi-badge{grid-area:badge;display:flex;align-items:baseline;justify-content:space-between;gap:6px 16px;flex-wrap:wrap}
  .hb-brand{display:inline-flex;align-items:center;gap:7px;font:600 11px/1 var(--font-mono);letter-spacing:.2em;
    text-transform:uppercase;color:var(--green-ink)}
  .hb-title{margin:0;font:600 clamp(14px,1.45vw,19px)/1.1 var(--font-display);color:var(--ink);letter-spacing:-.01em}

  /* ---- platter bay ---- */
  .bay{grid-area:bay;display:flex;flex-direction:column;gap:10px}
  .bay-cap{display:flex;flex-direction:column;gap:3px;padding:0 4px}
  .bay-k{font:600 11px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
  .bay-cap b{font:700 clamp(16px,1.6vw,22px)/1.1 var(--font-display);color:var(--ink);letter-spacing:-.01em}
  .bay-cap span:last-child{font-size:12px;color:var(--muted)}

  .tt{position:relative;width:var(--tt);aspect-ratio:1;flex:none;border-radius:16px;
    background:linear-gradient(145deg,var(--well-a),var(--well-b));
    box-shadow:inset 0 2px 7px rgba(0,0,0,.16),inset 0 -1px 0 #ffffff70}
  :root[data-theme="dark"] .tt{box-shadow:inset 0 2px 9px #000,inset 0 -1px 0 #ffffff10}
  .tt-platter{position:absolute;left:5%;top:5%;width:84%;aspect-ratio:1;border-radius:50%;
    background:conic-gradient(from 10deg,#d2d0cb,#8f8c86,#ebe9e4,#9b9893,#d8d5cf,#8a8781,#d2d0cb);
    box-shadow:0 12px 26px -10px rgba(0,0,0,.6),0 2px 4px rgba(0,0,0,.3)}
  .tt-rec{position:absolute;inset:2.4%;border-radius:50%;
    background:radial-gradient(circle,#0000 0 33%,#ffffff0d 33.4% 34%,#0000 34.4%),
      repeating-radial-gradient(circle,#0c0c0e 0 1.1px,#1b1b1f 1.1px 2.5px);
    box-shadow:inset 0 0 0 2px #050506,inset 0 0 0 5px #141417}
  .tt-rec.spin{animation:ttspin 4.8s linear infinite}
  .tt-label{position:absolute;inset:31%;border-radius:50%;overflow:hidden;background:var(--art);
    box-shadow:0 0 0 2px #000a;display:grid;place-items:center}
  .tt-label img{width:100%;height:100%;object-fit:cover;display:block}
  .tt-label-ph{font:700 11px/1.15 var(--font-display);color:#fff;text-align:center;padding:12%}
  .tt-sheen{position:absolute;inset:2.4%;border-radius:50%;pointer-events:none;
    background:conic-gradient(from 25deg,#fff0 0deg,#ffffff2e 28deg,#fff0 58deg,#fff0 185deg,#ffffff1c 212deg,#fff0 242deg);
    -webkit-mask:radial-gradient(circle,#0000 0 31%,#000 31.6%);mask:radial-gradient(circle,#0000 0 31%,#000 31.6%)}
  .tt-spindle{position:absolute;left:50%;top:50%;width:3.4%;aspect-ratio:1;translate:-50% -50%;border-radius:50%;
    background:radial-gradient(circle at 35% 35%,#fff,#a3a09a 55%,#4d4b47)}
  .tt-arm{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;
    filter:drop-shadow(0 5px 4px rgba(0,0,0,.35))}
  .tt-arm-base{fill:var(--arm-base);stroke:var(--arm-line);stroke-width:.6}
  .tt-arm-tube{fill:none;stroke:var(--arm);stroke-width:2.1;stroke-linecap:round}
  .tt-arm-head{fill:#26252a}
  .tt-arm-weight{fill:#8c8880}
  .tt-arm-cap{fill:#bab5ab}
  @keyframes ttspin{to{transform:rotate(360deg)}}

  /* ---- right side: display window, keys, sleeve ---- */
  .hifi-side{grid-area:side;display:flex;flex-direction:column;gap:clamp(10px,1.5vh,14px)}

  .vfd,.vfd-glass{border-radius:10px;color:#9fd9b6;border:1px solid #000;
    background:repeating-linear-gradient(0deg,#ffffff06 0 1px,#0000 1px 3px),radial-gradient(130% 160% at 25% 0%,#0f241b,#060a08 72%);
    box-shadow:inset 0 0 0 1px #ffffff0d,inset 0 10px 24px #0009,0 1px 0 #ffffff90}
  :root[data-theme="dark"] .vfd,:root[data-theme="dark"] .vfd-glass{box-shadow:inset 0 0 0 1px #ffffff0d,inset 0 10px 24px #0009,0 1px 0 #ffffff12}
  .vfd{overflow:hidden}
  .vfd-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}
  .vfd-cell{display:flex;flex-direction:column;gap:5px;padding:clamp(9px,1.4vh,13px) 14px;min-width:0}
  .vfd-cell+.vfd-cell{border-left:1px solid #ffffff0f}
  .vfd-k{font:600 11px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:#64957a}
  .vfd-v{font:600 clamp(19px,min(2.3vw,3.6vh),31px)/1 var(--font-mono);color:#46f293;letter-spacing:-.02em;
    text-shadow:0 0 10px #1db95499,0 0 2px #46f29380}
  .vfd-n{font:500 11px/1.2 var(--font-mono);color:#5c8a70;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .odo{display:inline-flex;line-height:1;font-variant-numeric:tabular-nums}
  .odo-row{display:inline-flex;line-height:1}
  .odo-d{display:inline-block;height:1em;line-height:1;overflow:hidden}
  .odo-col{display:flex;flex-direction:column;will-change:transform}
  .odo-n{height:1em;line-height:1;display:block;text-align:center}

  .now{display:flex;align-items:center;gap:9px;padding:8px 12px;min-width:0;max-width:100%;overflow:hidden;box-sizing:border-box;border-top:1px solid #ffffff0f;
    font:500 11px/1.2 var(--font-mono)}
  .now-art{width:26px;height:26px;border-radius:3px;object-fit:cover;flex:none;background:#ffffff10}
  .now-led{width:6px;height:6px;border-radius:50%;flex:none;background:#2f4a3b}
  .now.live .now-led{background:#46f293;box-shadow:0 0 8px #46f293}
  .now-k{flex:none;font-weight:600;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#64957a}
  .now-t{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .now-t b{font:600 12.5px/1.2 var(--font-body);color:#eafff2}
  .now-t i{font-style:normal;color:#86b89b;margin-left:8px}
  .now-when{flex:none;color:#5c8a70;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
  .now-open{flex:none;display:inline-flex;align-items:center;gap:5px;text-decoration:none;color:#0a1a10;background:#1DB954;
    border-radius:20px;padding:4px 9px 4px 5px;font:700 11px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;
    transition:filter .2s}
  .now-open:hover{filter:brightness(1.12)}

  .keys{display:flex;gap:clamp(5px,.7vw,9px)}
  .key{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;
    padding:7px 4px 8px;border-radius:7px;border:1px solid var(--key-edge);color:var(--ink);
    background:linear-gradient(180deg,var(--key-a),var(--key-b));
    box-shadow:0 3px 0 var(--key-drop),0 5px 8px -4px #0005,inset 0 1px 0 #ffffff90;
    font:600 11px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;
    transition:transform .12s var(--ease),box-shadow .12s var(--ease)}
  :root[data-theme="dark"] .key{box-shadow:0 3px 0 var(--key-drop),0 5px 8px -4px #000,inset 0 1px 0 #ffffff14}
  .key:hover{color:var(--green-ink)}
  .key[aria-selected="true"]{transform:translateY(3px);box-shadow:0 0 0 var(--key-drop),inset 0 2px 4px #00000026}
  .key:focus-visible{outline:2px solid var(--green);outline-offset:2px}
  .key-lbl-s{display:none}
  .key-led{width:16px;height:3px;border-radius:2px;background:color-mix(in srgb,var(--ink) 22%,transparent)}
  .key[aria-selected="true"] .key-led{background:#46f293;box-shadow:0 0 7px #1DB954}
  .key-lbl{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

  /* ---- the record sleeve (liner notes) ---- */
  .sleeve{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;
    background:color-mix(in srgb,var(--art) 7%,var(--sleeve));color:var(--sleeve-ink);
    border:1px solid color-mix(in srgb,var(--ink) 9%,transparent);border-radius:6px 6px 10px 10px;
    box-shadow:inset 0 1px 0 #ffffff70,0 14px 24px -18px rgba(50,30,10,.55);padding:clamp(10px,1.5vh,14px) clamp(14px,1.6vw,20px)}
  :root[data-theme="dark"] .sleeve{box-shadow:inset 0 1px 0 #ffffff0d,0 14px 24px -16px #000}
  .sleeve-ring{position:absolute;top:50%;right:-18%;height:150%;aspect-ratio:1;translate:0 -50%;border-radius:50%;pointer-events:none;
    background:radial-gradient(circle,#0000 0 60%,color-mix(in srgb,var(--ink) 5%,transparent) 62% 63.5%,#0000 66%)}
  .sl-head{position:relative;display:flex;align-items:baseline;gap:12px;padding-bottom:7px;margin-bottom:clamp(6px,1vh,10px);
    border-bottom:1px dashed color-mix(in srgb,var(--ink) 18%,transparent)}
  .sl-title{font:700 clamp(14px,1.3vw,17px)/1 var(--font-display);color:var(--ink)}
  .sl-kick{font:500 11px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
  .sl-body{position:relative;flex:1;min-height:0;container-type:size}
  .sl-view{position:absolute;inset:0;display:flex;flex-direction:column}
  .me-empty{margin:auto;text-align:center;color:var(--muted);font-size:14px}

  /* liner list: rows flow down a side, then across */
  .liner{flex:1;min-height:0;display:flex;flex-direction:column}
  .liner-note{margin:0 0 4px;font:500 clamp(14px,1.3vw,17px)/1.25 var(--font-hand);color:var(--muted)}
  .liner-note b{color:var(--green-ink);font-weight:700}
  .liner-fit:has(.liner-note-side){display:flex;align-items:center;justify-content:center}
  .liner-note-side{display:block;margin:0;text-align:center;padding:0 6%;max-width:46ch;
    font-size:clamp(13px,min(4.4cqw,12cqh),22px) !important;line-height:1.3 !important;color:var(--ink)}
  .liner-fit{flex:1;min-height:0;--row-h:clamp(36px,5.4cqh,44px);--col-min:230px}
  .liner-list{list-style:none;margin:0;padding:0;display:grid;grid-auto-flow:column;column-gap:clamp(18px,2.4vw,36px);
    grid-template-columns:repeat(var(--cols),minmax(0,1fr));grid-template-rows:repeat(var(--rows),var(--row-h))}
  .ln{display:flex;align-items:center;gap:10px;min-width:0;border-bottom:1px solid color-mix(in srgb,var(--ink) 7%,transparent)}
  .ln-no{flex:none;width:20px;font:700 11px/1 var(--font-mono);color:var(--green-ink)}
  .ln-img{flex:none;width:calc(var(--row-h) - 10px);aspect-ratio:1;border-radius:2px;overflow:hidden;
    background:color-mix(in srgb,var(--art) 35%,#2a2119);box-shadow:0 3px 6px -3px #0008}
  .ln-img img{width:100%;height:100%;object-fit:cover;display:block}
  .ln-t{flex:0 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px}
  .ln-t b,.ln-t i{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ln-t b{font:600 clamp(13px,1.15vw,15px)/1.15 var(--font-display);color:var(--ink)}
  .ln-t i{font:500 11px/1.1 var(--font-mono);font-style:normal;color:var(--muted)}
  .ln-tag{font:700 11px/1 var(--font-mono);font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#06110a;
    background:#1DB954;border-radius:10px;padding:3px 7px;margin-left:8px;vertical-align:2px}
  .ln-lead{flex:1 1 6px;min-width:6px;height:0;align-self:center;margin-top:8px;border-bottom:1.5px dotted color-mix(in srgb,var(--ink) 25%,transparent)}
  .ln-m{flex:none;display:flex;flex-direction:column;align-items:flex-end;gap:3px;font:500 11px/1 var(--font-mono);color:var(--muted)}
  .ln-m b{font-size:12.5px;color:var(--ink);font-weight:600}
  .ln-m small{font-size:11px;opacity:.85}
  .sl-pager{position:absolute;right:0;top:calc(-1 * clamp(6px,1vh,10px) - 30px);height:24px;display:flex;justify-content:flex-end;align-items:center;gap:4px}
  .sleeve:has(.sl-pager) .sl-head{padding-right:150px}
  .sl-flip{width:30px;height:26px;border-radius:12px;cursor:pointer;background:none;color:var(--ink);
    border:1px solid color-mix(in srgb,var(--ink) 18%,transparent);display:grid;place-items:center;
    transition:background .25s var(--ease),color .25s var(--ease),scale .25s var(--ease)}
  .sl-flip .ic{width:12px;height:12px;transition:translate .25s var(--ease)}
  .sl-prev .ic{transform:rotate(180deg)}
  .sl-flip:hover{background:var(--ink);color:var(--paper);scale:1.06}
  .sl-flip:active{scale:.96}
  .sl-flip:hover .ic{translate:2px 0}
  .sl-prev:hover .ic{translate:-2px 0}
  .sl-flip:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .sl-side{min-width:82px;text-align:center;font:600 11px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink)}
  .sl-side small{font-size:11px;color:var(--muted);letter-spacing:.08em}

  /* crate: real covers, flat on the sleeve */
  .crate-box{flex:1;min-height:0;display:flex;flex-direction:column}
  .crate{flex:1;min-height:0;container-type:size;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));
    grid-template-rows:repeat(2,minmax(0,1fr));gap:8px clamp(10px,1.4vw,18px)}
  .cv{margin:0;min-width:0;min-height:0;display:flex;flex-direction:column;align-items:center;gap:5px}
  .cv-art{width:min(100%,calc(50cqh - 40px));aspect-ratio:1;border-radius:3px;overflow:hidden;flex:none;display:grid;place-items:center;
    background:color-mix(in srgb,var(--art) 35%,#2a2119);box-shadow:0 8px 16px -10px #000a,0 0 0 1px #0000001a;
    transition:transform .3s var(--ease)}
  .cv:hover .cv-art{transform:translateY(-3px) rotate(-1deg)}
  .cv-art img{width:100%;height:100%;object-fit:cover;display:block}
  .cv-type{font:700 11px/1.1 var(--font-display);color:#fbf4e6;text-align:center;padding:10%}
  .cv figcaption{width:100%;text-align:center;display:flex;flex-direction:column;gap:2px;min-width:0}
  .cv figcaption b{font:600 12px/1.15 var(--font-display);color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cv figcaption span{font:500 11px/1.1 var(--font-mono);color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

  /* eras: a shelf of dated sleeves */
  .shelf{flex:1;min-height:0;display:flex;flex-direction:column;container-type:size}
  .shelf-row{flex:1;min-height:0;display:flex;align-items:stretch;gap:clamp(6px,1.4vw,16px);padding:0 2px}
  .sp-col{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px}
  .sp{width:min(100%,64px);height:calc(var(--p) * (100cqh - 112px));min-height:6px;border-radius:3px 3px 0 0;flex:none;
    display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px;box-sizing:border-box;
    background:linear-gradient(90deg,#ffffff1f,#0000 30%,#0000 70%,#0000002e),color-mix(in srgb,var(--art) 62%,#1d1610);
    box-shadow:0 6px 10px -6px #000a;color:#fbf3e4}
  .sp-col:nth-child(3n+2) .sp{background:linear-gradient(90deg,#ffffff1a,#0000 30%,#0000 70%,#00000033),#2b241d}
  .sp-col:nth-child(3n) .sp{background:linear-gradient(90deg,#ffffff4d,#0000 30%,#0000 70%,#0000001f),color-mix(in srgb,var(--art) 22%,#efe6d4);color:#2a2017}
  .sp.peak{background:linear-gradient(90deg,#ffffff40,#0000 30%,#0000 70%,#00000026),#1DB954 !important;color:#06110a !important}
  .sp-artist{writing-mode:vertical-rl;rotate:180deg;font:600 11px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
  .sp-col>.sp-artist{color:var(--muted)}
  .sp-year{font:700 clamp(12px,1.1vw,14px)/1 var(--font-display);color:var(--ink);padding-top:4px}
  .sp-min{font:500 11px/1 var(--font-mono);color:var(--muted)}
  .shelf-row{border-bottom:0}
  .sp-col .sp{border-bottom:5px solid #5a391f}

  /* clock dial */
  .dial{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:clamp(14px,3vw,40px);container-type:size}
  .dial-svg{height:100cqh;width:auto;aspect-ratio:1;max-width:60cqw;flex:none;overflow:visible}
  .dial-face{fill:color-mix(in srgb,var(--ink) 4%,transparent);stroke:color-mix(in srgb,var(--ink) 14%,transparent)}
  .dial-ring{fill:none;stroke:color-mix(in srgb,var(--ink) 18%,transparent)}
  .dial-spoke{stroke:color-mix(in srgb,var(--ink) 34%,transparent);stroke-width:5;stroke-linecap:round}
  .dial-spoke.peak{stroke:#1DB954;stroke-width:6.5}
  .dial-tick{fill:var(--muted);font:500 11px/1 var(--font-mono);text-anchor:middle;dominant-baseline:middle}
  .dial-core{fill:var(--ink);font:700 28px/1 var(--font-display);text-anchor:middle;dominant-baseline:middle}
  .dial-core-sub{fill:var(--muted);font:500 11px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;text-anchor:middle;dominant-baseline:middle}
  .dial-read{margin:0;max-width:22ch;font:500 clamp(16px,1.6vw,21px)/1.3 var(--font-hand);color:var(--muted)}
  .dial-read b{color:var(--green-ink);font-weight:700}

  /* lately: live strip of covers */
  .lately{flex:1;min-height:0;container-type:size;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));
    grid-template-rows:repeat(2,minmax(0,1fr));gap:8px 14px}
  .lt{margin:0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:5px}
  .lt img,.lt-ph{width:min(100%,calc(50cqh - 26px));aspect-ratio:1;border-radius:50%;object-fit:cover;display:block;background:var(--paper2)}
  .lt figcaption{max-width:100%;font:500 11px/1.2 var(--font-mono);color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

  /* short sleeves: liner rows collapse to one line each */
  @container (max-height:190px){
    .liner-fit{--row-h:29px}
    .ln-t{flex-direction:row;align-items:baseline;gap:8px}
    .ln-m{flex-direction:row;align-items:baseline;gap:6px}
    .liner-note{font-size:12px;line-height:1.1;margin-bottom:2px}
  }
  /* short sleeves: the shelf drops the off-spine labels, years stay */
  @container (max-height:200px){
    .sp-col>.sp-artist{display:none}
    .sp{height:calc(var(--p) * (100cqh - 34px))}
    .sp-artist{font-size:11px}
  }

  /* ---- narrow: the display sits beside the platter, keys and sleeve run full width ---- */
  @media (max-width:900px){
    .hifi{grid-template-columns:var(--tt) minmax(0,1fr);grid-template-rows:auto auto auto minmax(0,1fr);
      grid-template-areas:"badge badge" "bay vfd" "keys keys" "sleeve sleeve";
      padding:12px 20px 14px;gap:10px 14px;--tt:min(30cqw,26cqh,250px)}
    .hifi-side{display:contents}
    .vfd{grid-area:vfd;align-self:start}
    .keys{grid-area:keys}
    .sleeve{grid-area:sleeve}
    .vfd-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .vfd-cell:nth-child(3){border-left:none}
    .vfd-cell:nth-child(n+3){border-top:1px solid #ffffff0f}
    .bay{gap:6px}
  }
  @media (max-width:640px){
    .hifi{grid-template-rows:auto auto minmax(0,1fr);grid-template-areas:"bay vfd" "keys keys" "sleeve sleeve";
      padding:10px 14px 12px;gap:8px 10px;border-radius:16px;--tt:min(30cqw,100px)}
    .hifi::before,.hifi::after{width:6px}
    .hifi::before{border-radius:16px 0 0 16px}.hifi::after{border-radius:0 16px 16px 0}
    .hifi-badge{display:none}
    .bay{gap:4px}
    .bay-k{display:none}
    .bay-cap{padding:0;gap:1px}
    .bay-cap b{font-size:12px}
    .bay-cap span:last-child{font-size:11px;line-height:1.2}
    .vfd-cell{padding:6px 8px;gap:3px}
    .vfd-v{font-size:17px}
    .now{padding:6px 8px;gap:6px}
    .now-art{width:20px;height:20px}
    .now-k-long,.now-when{display:none}
    .now-t i{display:none}
    .now-open span{display:none}
    .now-open{padding:3px}
    .keys{gap:4px}
    .key{position:relative;padding:9px 2px;font-size:11px;letter-spacing:.04em}
    .key-led{position:absolute;top:3px;left:50%;translate:-50% 0;width:12px;height:2px}
    .key-lbl-l{display:none}.key-lbl-s{display:inline}
    .key[aria-selected="true"]{transform:translateY(2px)}
    .sleeve{padding:8px 12px 10px}
    .sl-head{padding-bottom:4px;margin-bottom:5px;gap:8px}
    .sleeve:has(.sl-pager) .sl-head{padding-right:0}
    .sl-title{font-size:13px}
    .sl-kick{font-size:11px;letter-spacing:.1em}
    .sl-pager{position:static;padding-top:4px;height:auto}
    .liner-note{font-size:13px;line-height:1.15}
    .dial-read{font-size:14px}
    .cv-art{width:min(100%,calc(50cqh - 30px))}
    .vfd-n{white-space:normal;font-size:11px;line-height:1.1}
    .ln-tag{flex-shrink:0}
    .sp-unit{display:none}
    .sp-min{font-size:11px;letter-spacing:-.02em}
  }
  /* very short sleeves: the liner sentence tightens; the list pages into more sides instead of losing it */
  @container (max-height:220px){
    .liner-note{font-size:12px;line-height:1.15;margin-bottom:3px}
  }
  @media (prefers-reduced-motion:reduce){
    .tt-rec.spin{animation:none}
    .key,.cv-art{transition:none}
  }
`
