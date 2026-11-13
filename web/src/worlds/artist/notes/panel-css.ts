/** Styles for the Field Notes panel (writing / papers / wire) and the reader. Scoped to .p-nt. */
export const PANEL_CSS = String.raw`
  .p-nt .panel{min-height:0;display:flex;flex-direction:column;gap:clamp(8px,1.4vh,14px);position:relative}
  .p-nt .tabs{display:flex;align-items:flex-end;gap:clamp(14px,2vw,28px);border-bottom:1.5px solid color-mix(in srgb,var(--ink) 20%,transparent)}
  .p-nt .tab{position:relative;display:inline-flex;align-items:baseline;gap:8px;padding:0 0 10px;background:none;border:0;cursor:pointer;color:var(--muted);
    font-family:var(--font-display);font-weight:700;font-size:clamp(18px,1.9vw,26px);letter-spacing:-.02em;transition:color .25s var(--ease)}
  .p-nt .tab sup{font:600 11px/1 var(--font-mono);letter-spacing:.1em;color:var(--accent-ink);translate:0 -.5em}
  .p-nt .tab:hover{color:var(--ink)}
  .p-nt .tab[aria-selected="true"]{color:var(--ink)}
  .p-nt .tab::after{content:"";position:absolute;left:0;right:0;bottom:-1.5px;height:3px;background:var(--accent);border-radius:2px;
    transform:scaleX(0);transform-origin:left;transition:transform .45s var(--ease)}
  .p-nt .tab[aria-selected="true"]::after{transform:scaleX(1)}
  .p-nt .tab:focus-visible,.p-nt .chip:focus-visible,.p-nt .pg button:focus-visible,.p-nt .row-a:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:4px}

  .p-nt .chips{display:flex;flex-wrap:wrap;gap:6px;min-height:28px}
  .p-nt .chip{padding:5px 11px;border-radius:999px;cursor:pointer;background:transparent;color:var(--muted);
    border:1px solid color-mix(in srgb,var(--ink) 22%,transparent);font:600 11px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;
    transition:background .25s var(--ease),color .25s var(--ease),border-color .25s var(--ease)}
  .p-nt .chip:hover{color:var(--ink);border-color:var(--ink)}
  .p-nt .chip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#fff}

  .p-nt .list{list-style:none;margin:0;padding:0;min-height:0;flex:1;display:flex;flex-direction:column}
  .p-nt .list > li{flex:0 1 clamp(64px,10.5vh,96px);min-height:0;display:flex}
  .p-nt .row-a{position:relative;flex:1;min-width:0;display:grid;grid-template-columns:clamp(28px,3vw,40px) minmax(0,1fr) auto;align-items:center;gap:clamp(8px,1.4vw,18px);
    padding:6px 4px;color:var(--ink);text-decoration:none;border-bottom:1px dashed color-mix(in srgb,var(--ink) 20%,transparent);
    transition:background .25s var(--ease)}
  .p-nt .row-a::before{content:"";position:absolute;left:0;top:10%;bottom:10%;width:3px;border-radius:2px;background:var(--accent);transform:scaleY(0);transition:transform .35s var(--ease)}
  .p-nt .row-a:hover{background:color-mix(in srgb,var(--accent) 7%,transparent)}
  .p-nt .row-a:hover::before,.p-nt .row-a:focus-visible::before{transform:scaleY(1)}
  .p-nt .rn{font:700 11px/1 var(--font-mono);color:var(--accent-ink);letter-spacing:.08em}
  .p-nt .rt{min-width:0;display:flex;flex-direction:column;gap:4px}
  .p-nt .rt-t{font-family:var(--font-display);font-weight:700;font-size:clamp(15px,1.5vw,21px);line-height:1.18;letter-spacing:-.015em;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;transition:transform .35s var(--ease),color .25s var(--ease)}
  .p-nt .row-a:hover .rt-t{transform:translateX(6px);color:var(--accent-ink)}
  .p-nt .rt-s{font:400 clamp(11.5px,.95vw,13px)/1.45 var(--font-body);color:var(--muted);display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
  .p-nt .rt-m{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font:600 11px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
  .p-nt .badge{padding:3px 7px;border-radius:4px;border:1px solid color-mix(in srgb,var(--ink) 25%,transparent)}
  .p-nt .badge.own{background:var(--accent);border-color:var(--accent);color:#fff}
  .p-nt .re{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);color:var(--accent-ink);
    transition:background .25s var(--ease),color .25s var(--ease),transform .3s var(--ease)}
  .p-nt .re .ic{width:13px;height:13px}
  .p-nt .row-a:hover .re{background:var(--accent);color:#fff;transform:rotate(-45deg)}

  .p-nt .empty{flex:1;display:grid;place-items:center;text-align:center;padding:20px;border:1.5px dashed color-mix(in srgb,var(--ink) 22%,transparent);border-radius:12px;
    font:500 12px/1.6 var(--font-mono);color:var(--muted)}
  .p-nt .empty b{display:block;font-family:var(--font-display);font-size:clamp(18px,1.8vw,24px);color:var(--ink);margin-bottom:6px}

  .p-nt .foot{display:flex;align-items:center;justify-content:space-between;gap:12px;font:500 11px/1.4 var(--font-mono);color:var(--muted)}
  .p-nt .foot .src{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .p-nt .pg{display:flex;align-items:center;gap:10px;flex:none}
  .p-nt .pg button{width:30px;height:30px;border-radius:50%;cursor:pointer;display:grid;place-items:center;background:transparent;color:var(--ink);
    border:1px solid color-mix(in srgb,var(--ink) 30%,transparent);transition:background .25s var(--ease),color .25s var(--ease),scale .25s var(--ease)}
  .p-nt .pg button:hover:not(:disabled){background:var(--accent);border-color:var(--accent);color:#fff;scale:1.08}
  .p-nt .pg button:disabled{opacity:.3;cursor:default}
  .p-nt .pg .ic{width:13px;height:13px}
  .p-nt .pg .prev .ic{transform:rotate(180deg)}

  @media(max-width:900px){
    .p-nt .tab{font-size:17px;padding-bottom:7px}
    .p-nt .rt-s{display:none}
    .p-nt .chip{padding:4px 9px;font-size:11px}
    .p-nt .foot .src{display:none}
    .p-nt .foot{justify-content:flex-end}
  }

  /* reader */
  .p-nt-rd{height:100%;min-height:0;display:flex;flex-direction:column;gap:clamp(8px,1.6vh,16px);max-width:900px;margin:0 auto;width:100%;overflow:hidden}
  .p-nt-rd .rd-top{display:flex;align-items:center;justify-content:space-between;gap:12px;font:600 11px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-nt-rd .rd-top a{color:var(--accent-ink);text-decoration:none;display:inline-flex;align-items:center;gap:6px}
  .p-nt-rd .rd-top a .ic{width:12px;height:12px;transform:rotate(180deg)}
  .p-nt-rd .rd-h{font-family:var(--font-display);font-weight:900;font-size:clamp(26px,3.6vw,50px);line-height:1;letter-spacing:-.03em;margin:0;color:var(--ink);text-wrap:balance}
  .p-nt-rd .rd-meta{display:flex;flex-wrap:wrap;gap:8px;font:600 11px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
  .p-nt-rd .rd-view{position:relative;flex:1;min-height:0;overflow:hidden;border-top:1.5px solid color-mix(in srgb,var(--ink) 20%,transparent);padding-top:clamp(10px,1.6vh,18px)}
  .p-nt-rd .rd-flow{height:100%;column-width:var(--vw,600px);column-gap:var(--gap,56px);column-fill:auto;
    font:400 clamp(15px,1.25vw,18px)/1.7 var(--font-body);color:var(--ink);transition:transform .55s var(--ease);will-change:transform}
  .p-nt-rd .rd-flow h1,.p-nt-rd .rd-flow h2,.p-nt-rd .rd-flow h3{font-family:var(--font-display);line-height:1.12;letter-spacing:-.02em;margin:1.2em 0 .4em;break-after:avoid}
  .p-nt-rd .rd-flow h1:first-child,.p-nt-rd .rd-flow h2:first-child{margin-top:0}
  .p-nt-rd .rd-flow p{margin:0 0 1em}
  .p-nt-rd .rd-flow a{color:var(--accent-ink);text-underline-offset:3px}
  .p-nt-rd .rd-flow blockquote{margin:1em 0;padding-left:16px;border-left:3px solid var(--accent);color:var(--muted);font-style:italic}
  .p-nt-rd .rd-flow code{font:500 .9em var(--font-mono);background:color-mix(in srgb,var(--ink) 8%,transparent);padding:1px 5px;border-radius:4px}
  .p-nt-rd .rd-flow pre{break-inside:avoid;overflow:hidden;background:color-mix(in srgb,var(--ink) 8%,transparent);padding:12px;border-radius:8px}
  .p-nt-rd .rd-flow img{max-width:100%;max-height:48vh;border-radius:8px;break-inside:avoid;display:block;margin:0 0 1em}
  .p-nt-rd .rd-flow ul,.p-nt-rd .rd-flow ol{padding-left:1.3em;margin:0 0 1em}
  .p-nt-rd .rd-pg{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .p-nt-rd .rd-dots{display:flex;gap:6px;flex-wrap:wrap}
  .p-nt-rd .rd-dots i{width:18px;height:3px;border-radius:2px;background:color-mix(in srgb,var(--ink) 22%,transparent);transition:background .3s var(--ease),width .3s var(--ease)}
  .p-nt-rd .rd-dots i.on{background:var(--accent);width:34px}
  .p-nt-rd .rd-pg .pgb{display:flex;gap:8px;align-items:center;font:600 11px/1 var(--font-mono);letter-spacing:.12em;color:var(--muted)}
  .p-nt-rd .rd-pg button{width:32px;height:32px;border-radius:50%;cursor:pointer;display:grid;place-items:center;background:transparent;color:var(--ink);border:1px solid color-mix(in srgb,var(--ink) 30%,transparent);transition:background .25s var(--ease),color .25s var(--ease)}
  .p-nt-rd .rd-pg button:hover:not(:disabled){background:var(--accent);border-color:var(--accent);color:#fff}
  .p-nt-rd .rd-pg button:disabled{opacity:.3;cursor:default}
  .p-nt-rd .rd-pg .ic{width:13px;height:13px}
  .p-nt-rd .rd-pg .prev .ic{transform:rotate(180deg)}
  .p-nt-rd .rd-miss{margin:auto;text-align:center;font:500 13px/1.6 var(--font-mono);color:var(--muted)}
  .p-nt-rd .rd-miss a{color:var(--accent-ink)}
  @media(prefers-reduced-motion:reduce){
    .p-nt .row-a::before,.p-nt .row-a .rt-t,.p-nt .re,.p-nt .tab::after,.p-nt-rd .rd-flow{transition:none}
    .p-nt .row-a:hover .rt-t{transform:none}
  }
`
