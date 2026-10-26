/* Analyst contact, "query console": status poster on the left, a typed SELECT and its result set on the right. */

export const CONSOLE_CSS = String.raw`
  html[data-one-screen] .page.p-ct,html[data-toc] .page.p-ct,.p-ct{min-height:0;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);
    gap:clamp(20px,3.6vw,56px);max-width:1240px;margin:0 auto;width:100%;overflow:hidden;position:relative}

  /* material: graph paper, same sheet as the Analyst index */
  .p-ct::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
    background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px),
      linear-gradient(color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--teal) 14%,transparent) 1px,transparent 1px);
    background-size:24px 24px,24px 24px,120px 120px,120px 120px;
    mask-image:radial-gradient(ellipse 80% 75% at 50% 45%,#000 40%,transparent 100%)}

  /* left: poster + status sheet */
  .p-ct .ct-poster{min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(10px,2vh,22px)}
  .p-ct .ct-kick{display:inline-flex;align-items:center;gap:8px;font:600 10px/1.4 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--teal-ink)}
  .p-ct .ct-kick .live{width:7px;height:7px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
  .p-ct .ct-big{font-family:var(--font-display);font-weight:700;font-size:clamp(48px,min(6.4vw,11vh),104px);line-height:.88;letter-spacing:-.045em;color:var(--ink);margin:clamp(6px,1.2vh,14px) 0 0}
  .p-ct .ct-big em{font-style:normal;color:var(--accent-ink)}
  .p-ct .ct-lede{font:500 clamp(12px,1vw,14px)/1.5 var(--font-mono);color:var(--muted);margin:clamp(10px,2vh,20px) 0 0;max-width:38ch}
  .p-ct .ct-lede b{color:var(--ink);font-weight:600}
  .p-ct .ct-spec{display:grid;grid-template-columns:auto minmax(0,1fr);border-top:1px solid var(--rule);margin:0}
  .p-ct .ct-spec dt,.p-ct .ct-spec dd{margin:0;padding:clamp(5px,1vh,10px) 0;border-bottom:1px solid var(--rule)}
  .p-ct .ct-spec dt{font:600 9.5px/1.6 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);padding-right:16px}
  .p-ct .ct-spec dd{font:600 clamp(12.5px,1.1vw,15px)/1.3 var(--font-display);color:var(--ink)}
  .p-ct .ct-foot{display:flex;align-items:center;justify-content:space-between;gap:6px 10px;flex-wrap:wrap;font:500 10px/1.5 var(--font-mono);letter-spacing:.06em;color:var(--muted)}
  .p-ct .ct-foot b{color:var(--teal-ink);font-weight:600}

  /* right: the console */
  .p-ct .qc{min-height:0;display:flex;flex-direction:column;border:1px solid color-mix(in srgb,var(--accent) 22%,var(--rule));border-radius:10px;
    background:color-mix(in srgb,var(--card) 94%,transparent);box-shadow:var(--shadow);overflow:hidden}
  .p-ct .qc-bar{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 14px;border-bottom:1px solid var(--rule);
    font:600 10px/1.2 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);background:color-mix(in srgb,var(--paper) 50%,var(--card))}
  .p-ct .qc-db{display:inline-flex;align-items:center;gap:7px;color:var(--teal-ink)}
  .p-ct .qc-db .ic{width:13px;height:13px}
  .p-ct .qc-body{flex:1;min-height:0;display:flex;flex-direction:column;padding:clamp(12px,2vh,20px) clamp(14px,1.6vw,22px) clamp(10px,1.6vh,16px);gap:clamp(8px,1.4vh,14px)}
  .p-ct .qc-q{margin:0;font:500 clamp(12px,1.05vw,14.5px)/1.5 var(--font-mono);color:var(--ink);min-height:3em;overflow-wrap:anywhere}
  .p-ct .qc-q code{font:inherit;color:inherit}
  .p-ct .qc-p{color:var(--teal-ink);font-weight:700}
  .p-ct .qc-sr,.p-ct .sr-live{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  .p-ct .qc-caret{display:inline-block;width:.6em;height:1.1em;margin-left:2px;vertical-align:-.18em;background:var(--accent)}
  .p-ct .qc-caret.off{opacity:.35}

  /* result set: one shared column template for head + rows */
  .p-ct .qc-head,.p-ct .qr{display:grid;grid-template-columns:minmax(0,1fr) 96px;align-items:center}
  .p-ct .qc-head{grid-template-columns:2.6em minmax(0,1fr) minmax(0,1.2fr) 32px 96px;column-gap:14px;padding:0 0 6px 10px;border-bottom:1px dashed var(--rule);
    font:600 9.5px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
  .p-ct .qc-rows{list-style:none;margin:0;padding:0;flex:1;min-height:0;display:grid;grid-template-rows:repeat(3,minmax(0,1fr))}
  .p-ct .qr{position:relative;min-height:0;column-gap:14px;border-bottom:1px solid var(--rule)}
  .p-ct .qr-a{min-width:0;height:100%;display:grid;grid-template-columns:2.6em minmax(0,1fr) minmax(0,1.2fr) 32px;
    grid-template-areas:"n ch h go" "n ch note go";align-content:center;column-gap:14px;row-gap:4px;padding:clamp(6px,1.2vh,14px) 10px;
    color:inherit;text-decoration:none;border-radius:6px;transition:background .2s var(--ease)}
  .p-ct .qr-a:hover,.p-ct .qr-a:focus-visible{background:color-mix(in srgb,var(--accent) 9%,transparent)}
  .p-ct .qr-a:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
  .p-ct .qr-n{grid-area:n;align-self:center;font:600 11px/1 var(--font-mono);color:var(--muted)}
  .p-ct .qr-ch{grid-area:ch;align-self:center;display:flex;align-items:center;gap:10px;min-width:0;color:var(--ink)}
  .p-ct .qr-ch .ic{width:clamp(16px,1.6vw,22px);height:clamp(16px,1.6vw,22px);color:var(--teal-ink);flex:0 0 auto}
  .p-ct .qr-t{font-family:var(--font-display);font-weight:700;font-size:clamp(20px,min(1.7vw,4.4vh),30px);line-height:1;letter-spacing:-.035em;transition:color .2s var(--ease)}
  .p-ct .qr-a:hover .qr-t,.p-ct .qr-a:focus-visible .qr-t{color:var(--accent-ink)}
  .p-ct .qr-h{grid-area:h;align-self:end;font:600 clamp(12px,.95vw,13.5px)/1.3 var(--font-mono);color:var(--ink);overflow-wrap:break-word}
  .p-ct .qr-note{grid-area:note;align-self:start;font-size:clamp(11.5px,.95vw,13px);line-height:1.4;color:var(--muted)}
  .p-ct .qr-go{grid-area:go;align-self:center;justify-self:end;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;
    border:1px solid color-mix(in srgb,var(--accent) 40%,var(--rule));color:var(--accent-ink);transition:transform .3s var(--ease),background .2s var(--ease),color .2s var(--ease)}
  .p-ct .qr-go .ic{width:13px;height:13px}
  .p-ct .qr-a:hover .qr-go,.p-ct .qr-a:focus-visible .qr-go{background:var(--accent);color:var(--paper);transform:rotate(-45deg)}
  .p-ct .qr-copy{justify-self:end;display:inline-flex;align-items:center;gap:6px;padding:8px 11px;border-radius:30px;border:1px solid var(--rule);
    background:color-mix(in srgb,var(--card) 80%,transparent);font:600 10px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink);cursor:pointer;
    transition:border-color .2s var(--ease),color .2s var(--ease)}
  .p-ct .qr-copy:hover,.p-ct .qr-copy[data-done="true"]{border-color:var(--teal);color:var(--teal-ink)}
  .p-ct .qr-copy:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .p-ct .qr-copy .ic{width:12px;height:12px}
  .p-ct .qc-foot{margin:0;font:500 10px/1.4 var(--font-mono);letter-spacing:.06em;color:var(--muted)}
  .p-ct .qc-foot b{color:var(--teal-ink);font-weight:600}

  @media(max-width:900px){
    html[data-one-screen] .page.p-ct,html[data-toc] .page.p-ct,.p-ct{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);gap:8px}
    .p-ct .ct-poster{gap:6px}
    .p-ct .ct-big{font-size:clamp(30px,9vw,60px);margin-top:2px}
    .p-ct .ct-big br{display:none}
    .p-ct .ct-lede{font-size:11px;line-height:1.35;margin-top:4px;max-width:none}
    .p-ct .ct-spec dt,.p-ct .ct-spec dd{padding:2px 0;line-height:1.3}
    .p-ct .ct-spec dt{padding-right:10px}
    .p-ct .ct-spec dd{font-size:12px}
    .p-ct .qc-bar{padding:5px 10px}
    .p-ct .qc-body{padding:6px 10px;gap:4px}
    .p-ct .qc-q{font-size:10.5px;line-height:1.4;min-height:0}
    .p-ct .qc-head{display:flex;padding:0 6px 3px}
    .p-ct .qc-head span:first-child{flex:0 0 2.2em}
    .p-ct .qc-head span:nth-child(3)::before{content:"\a0\b7\a0"}
    .p-ct .qc-rows{grid-template-rows:repeat(3,auto);align-content:space-evenly}
    .p-ct .qr{grid-template-columns:minmax(0,1fr)}
    .p-ct .qr-a{grid-area:1/1}
    .p-ct .qr-copy{grid-area:1/1;align-self:start;justify-self:end;margin:3px 40px 0 0;position:relative;z-index:1}
    .p-ct .qr-a{grid-template-columns:2.2em minmax(0,1fr) 28px;grid-template-areas:"n ch go" "n h go" "n note go";row-gap:1px;padding:4px 6px}
    .p-ct .qr-ch{gap:7px}
    .p-ct .qr-t{font-size:clamp(17px,5vw,30px)}
    .p-ct .qr-h{align-self:start;font-size:10.5px}
    .p-ct .qr-note{font-size:10.5px;line-height:1.3}
    .p-ct .qr-go{width:26px;height:26px}
    .p-ct .qr-copy{padding:3px 8px}
    .p-ct .twin-door{font-size:9.5px}
  }
  @media(max-width:900px) and (min-height:900px){
    .p-ct .qr-a{row-gap:4px;padding:10px 8px}
    .p-ct .qr-h,.p-ct .qr-note{font-size:12.5px}
    .p-ct .ct-lede{font-size:12.5px}
    .p-ct .ct-spec dt,.p-ct .ct-spec dd{padding:6px 0}
  }
  @media(prefers-reduced-motion:reduce){
    .p-ct .qr-a,.p-ct .qr-t,.p-ct .qr-go,.p-ct .qr-copy{transition:none}
    .p-ct .qr-a:hover .qr-go{transform:none}
  }
`
