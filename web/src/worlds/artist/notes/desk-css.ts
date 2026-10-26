// Styles for the notebook desk: a stitched kraft blotter with four leaves of
// different stock (index card, spiral page, graph sheet, kraft tag) fanned on it.
export const DESK_CSS = String.raw`
  .p-nt .desk{position:relative;min-height:0;min-width:0;border-radius:14px;
    background:
      repeating-linear-gradient(97deg,color-mix(in srgb,var(--ink) 3%,transparent) 0 1px,transparent 1px 7px),
      radial-gradient(120% 90% at 30% 20%,color-mix(in srgb,var(--orange) 10%,var(--paper2)),color-mix(in srgb,var(--orange) 16%,var(--paper2)));
    box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ink) 10%,transparent),inset 0 18px 40px -30px color-mix(in srgb,var(--ink) 50%,transparent)}
  .p-nt .desk::before{content:"";position:absolute;inset:7px;border-radius:9px;pointer-events:none;
    border:1.5px dashed color-mix(in srgb,var(--orange) 38%,transparent)}
  .p-nt .fan{position:absolute;inset:clamp(18px,3.2vh,30px) clamp(16px,2vw,30px)}
  .p-nt .slot{position:absolute}
  .p-nt .lift{width:100%;height:100%}

  .p-nt .leaf{position:relative;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:clamp(5px,.9vh,10px);
    padding:clamp(12px,2.2vh,22px) clamp(14px,1.5vw,22px) clamp(10px,1.8vh,18px) clamp(26px,2.6vw,40px);
    color:var(--ink);text-decoration:none;border-radius:3px;outline:none;-webkit-tap-highlight-color:transparent;
    background:var(--leaf-bg);
    box-shadow:0 1px 1px color-mix(in srgb,var(--ink) 14%,transparent),0 8px 16px -10px color-mix(in srgb,var(--ink) 45%,transparent);
    transition:box-shadow .3s var(--ease)}
  .p-nt .leaf.is-on{box-shadow:0 1px 1px color-mix(in srgb,var(--ink) 12%,transparent),0 26px 40px -18px color-mix(in srgb,var(--ink) 60%,transparent)}
  .p-nt .leaf:focus-visible{box-shadow:0 0 0 2px var(--accent),0 26px 40px -18px color-mix(in srgb,var(--ink) 60%,transparent)}

  /* paper stock */
  .p-nt .k-card{--leaf-bg:
      linear-gradient(90deg,transparent clamp(18px,1.9vw,30px),color-mix(in srgb,var(--grana,#c8324b) 45%,transparent) 0 calc(clamp(18px,1.9vw,30px) + 1px),transparent 0),
      repeating-linear-gradient(transparent 0 23px,color-mix(in srgb,var(--pen) 20%,transparent) 23px 24px) 0 34px/100% calc(100% - 34px) no-repeat,
      color-mix(in srgb,var(--card) 92%,var(--paper))}
  .p-nt .k-page{--leaf-bg:
      radial-gradient(circle at 12px 50%,color-mix(in srgb,var(--orange) 14%,var(--paper2)) 0 4.5px,color-mix(in srgb,var(--ink) 25%,transparent) 5px,transparent 6px) 0 0/24px 22px repeat-y,
      repeating-linear-gradient(transparent 0 23px,color-mix(in srgb,var(--pen) 16%,transparent) 23px 24px),
      var(--card)}
  .p-nt .k-graph{--leaf-bg:
      linear-gradient(color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px) 0 0/12px 12px,
      linear-gradient(90deg,color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px) 0 0/12px 12px,
      color-mix(in srgb,var(--card) 94%,var(--teal))}
  .p-nt .k-kraft{--leaf-bg:color-mix(in srgb,var(--orange) 16%,var(--card))}
  .p-nt .k-kraft::before{content:"";position:absolute;inset:6px;border:1.2px dashed color-mix(in srgb,var(--orange) 50%,transparent);border-radius:2px;pointer-events:none}

  /* fasteners */
  .p-nt .tape{position:absolute;top:-9px;left:50%;width:72px;height:19px;translate:-50% 0;rotate:-3deg;z-index:2;pointer-events:none;
    background:color-mix(in srgb,var(--orange) 26%,#f4ead6);opacity:.82;clip-path:polygon(3% 0,97% 4%,100% 50%,96% 100%,2% 96%,0 50%)}
  .p-nt .clip{position:absolute;top:-14px;left:clamp(30px,3vw,46px);width:16px;height:40px;z-index:2;pointer-events:none;color:color-mix(in srgb,var(--ink) 55%,transparent)}
  .p-nt .grommet{position:absolute;top:13px;left:9px;width:12px;height:12px;border-radius:50%;pointer-events:none;
    background:var(--paper2);box-shadow:0 0 0 3px color-mix(in srgb,var(--orange) 45%,var(--card))}

  /* content */
  .p-nt .lf-top{display:flex;align-items:center;gap:10px;min-height:30px}
  .p-nt .lf-ic{width:30px;height:30px;flex:none;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent-ink)}
  .p-nt .lf-ic .ic{width:15px;height:15px}
  .p-nt .lf-route{flex:1;min-width:0;font:500 clamp(14px,1.15vw,17px)/1 var(--font-hand);color:var(--accent-ink);white-space:nowrap;rotate:-2deg}
  .p-nt .lf-no{position:relative;flex:none;font:600 10px/1 var(--font-mono);letter-spacing:.16em;color:var(--muted);padding:6px 8px}
  .p-nt .lf-no svg{position:absolute;inset:-2px -4px;width:calc(100% + 8px);height:calc(100% + 4px);overflow:visible;color:var(--accent-ink);pointer-events:none}
  .p-nt .lf-count{position:absolute;right:-4px;top:-14px;font:500 15px/1 var(--font-hand);color:var(--accent-ink);letter-spacing:0;rotate:8deg}
  .p-nt .lf-title{font-family:var(--font-display);font-weight:700;font-size:clamp(19px,2vw,30px);line-height:1.05;letter-spacing:-.02em;margin:0;text-wrap:balance}
  .p-nt .lf-gloss{font:400 clamp(12.5px,1.05vw,15px)/1.55 var(--font-body);color:var(--muted);margin:0;text-wrap:pretty}
  .p-nt .mk{color:var(--ink);padding-bottom:1px;-webkit-box-decoration-break:clone;box-decoration-break:clone;
    background:linear-gradient(color-mix(in srgb,var(--accent) 85%,transparent),color-mix(in srgb,var(--accent) 85%,transparent)) no-repeat 0 100%/0% 1.5px}
  .p-nt .lf-read{margin-top:auto;display:inline-flex;align-items:center;gap:6px;font-family:var(--font-hand);font-size:clamp(16px,1.3vw,19px);color:var(--accent-ink)}
  .p-nt .lf-read .ic{width:12px;height:12px;transition:transform .25s var(--ease)}
  .p-nt .leaf.is-on .lf-read .ic{transform:translateX(4px)}

  @media(max-width:900px){
    .p-nt .desk{border-radius:12px}
    .p-nt .desk::before{inset:5px}
    .p-nt .fan{inset:20px 16px 16px}
  }
  @media(min-width:601px) and (max-width:900px){
    .p-nt .lf-title{font-size:clamp(22px,3.4vw,28px)}
    .p-nt .lf-gloss{font-size:clamp(13.5px,2vw,15.5px)}
    .p-nt .lf-read{font-size:19px}
  }
  /* phones: the fan becomes a stack of strips, one leaf per row, number in the margin */
  @media(max-width:600px){
    .p-nt .fan{inset:12px 10px 10px}
    .p-nt .leaf{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto minmax(0,1fr);gap:2px 8px;align-items:baseline;
      padding:7px 10px 5px 28px}
    .p-nt .lf-top{position:absolute;left:0;top:0;bottom:0;width:22px;min-height:0;display:grid;place-items:center}
    .p-nt .lf-ic,.p-nt .lf-route{display:none}
    .p-nt .lf-no{writing-mode:vertical-rl;rotate:180deg;font-size:9.5px;letter-spacing:.08em;padding:4px 2px}
    .p-nt .lf-no svg{inset:-3px -2px;width:calc(100% + 4px);height:calc(100% + 6px)}
    .p-nt .lf-count{right:auto;left:16px;top:-6px;rotate:0deg;font-size:12px}
    .p-nt .lf-title{grid-column:1;grid-row:1;font-size:15px;line-height:1.1;text-wrap:nowrap;overflow:visible}
    .p-nt .lf-read{grid-column:2;grid-row:1;margin:0;font-size:14px;gap:4px;white-space:nowrap}
    .p-nt .lf-gloss{grid-column:1 / -1;grid-row:2;font-size:11px;line-height:1.4;align-self:start}
    .p-nt .k-card{--leaf-bg:
      linear-gradient(90deg,transparent 23px,color-mix(in srgb,var(--grana,#c8324b) 45%,transparent) 0 24px,transparent 0),
      color-mix(in srgb,var(--card) 92%,var(--paper))}
    .p-nt .k-page{--leaf-bg:
      radial-gradient(circle at 50% 5px,color-mix(in srgb,var(--orange) 14%,var(--paper2)) 0 2.5px,color-mix(in srgb,var(--ink) 25%,transparent) 3px,transparent 4px) 30px 0/16px 12px repeat-x,
      var(--card)}
    .p-nt .k-page.leaf{padding-top:11px}
    .p-nt .grommet{display:none}
    .p-nt .k-kraft::before{inset:4px}
    .p-nt .tape{width:48px;height:13px;top:-6px}
    .p-nt .clip{top:-9px;left:auto;right:30%;width:10px;height:26px}
  }
  @media(max-width:600px) and (max-height:700px){
    .p-nt .fan{inset:10px 8px 8px}
    .p-nt .leaf{padding-top:6px;padding-bottom:4px}
    .p-nt .k-page.leaf{padding-top:9px}
    .p-nt .lf-title{font-size:14px}
    .p-nt .lf-gloss{font-size:10.5px;line-height:1.35}
  }
  @media(prefers-reduced-motion:reduce){ .p-nt .leaf,.p-nt .lf-read .ic{transition:none} }
`
