/* Artist contact, "darkroom": a title band over one film strip whose frames develop from negative to print. */

/** Kodak-style edge print colour: fixed, because the film stock is dark in both themes. */
const EDGE_INK = "rgba(244,196,140,.86)"

export const DARKROOM_CSS = String.raw`
  .p-ac{position:relative;height:100%;min-height:0;display:flex;flex-direction:column;gap:clamp(10px,2vh,22px);max-width:1180px;margin:0 auto;width:100%;overflow:hidden}

  /* title band */
  .p-ac .band{flex:0 0 auto;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:clamp(16px,3vw,44px);align-items:end}
  .p-ac .band>*{min-width:0}
  .p-ac .ac-kick{display:flex;align-items:center;gap:10px;font:600 10px/1 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--muted)}
  .p-ac .ac-kick b{color:var(--accent-ink);font-weight:600}
  .p-ac .ac-title{font-family:var(--font-display);font-weight:900;font-size:clamp(56px,min(7.4vw,12.5vh),128px);line-height:.86;letter-spacing:-.045em;color:var(--ink);margin:clamp(6px,1.2vh,14px) 0 0;white-space:nowrap}
  .p-ac .ac-hand{font-family:var(--font-hand);font-weight:700;font-size:.9em;letter-spacing:0;color:var(--accent-ink);rotate:-4deg;display:inline-block;margin-left:.22em}
  .p-ac .side{display:flex;align-items:flex-end;gap:clamp(12px,1.6vw,22px)}
  .p-ac .side-txt{min-width:0;flex:1;display:flex;flex-direction:column;gap:10px}
  .p-ac .ac-lede{font-size:clamp(13px,1.1vw,16px);line-height:1.55;color:var(--muted);max-width:40ch;margin:0;text-wrap:pretty}
  .p-ac .ac-lede b{color:var(--ink);font-weight:600}
  .p-ac .ac-row{display:flex;align-items:center;gap:8px 14px;flex-wrap:wrap}
  .p-ac .ac-where{display:inline-flex;align-items:center;gap:8px;font:600 10px/1.3 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-ac .ac-where .ic{width:13px;height:13px;color:var(--accent-ink);flex:0 0 auto}
  .p-ac .ac-clock{color:var(--ink);font-weight:600}

  /* postmark: horse + ring text, inked at an angle */
  .p-ac .postmark{position:relative;flex:0 0 auto;width:clamp(120px,10vw,140px);aspect-ratio:1/1;color:var(--accent-ink);opacity:.7;rotate:-14deg;pointer-events:none}
  .p-ac .postmark svg{width:100%;height:100%;overflow:visible}
  .p-ac .postmark .pm-text{font:600 9.5px/1 var(--font-mono);letter-spacing:.28em;text-transform:uppercase;fill:currentColor}
  .p-ac .postmark .horse-glyph{position:absolute;inset:30%;width:auto}

  /* the strip */
  .p-ac .strip{flex:1;min-height:0;padding:26px 14px;border-radius:10px}
  .p-ac .cells{list-style:none;margin:0;padding:0;height:100%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(8px,1vw,14px)}
  .p-ac .cell{min-width:0;min-height:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:5px}
  .p-ac .edge{font:600 9.5px/1.2 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:${EDGE_INK};white-space:nowrap;overflow:hidden;text-overflow:clip}
  .p-ac .edge i{font-style:normal;opacity:.75}
  .p-ac .edge.bot{text-align:right}

  .p-ac .frame{position:relative;min-height:0;display:flex;flex-direction:column;background:var(--card);border-radius:3px;overflow:hidden;will-change:filter}
  .p-ac .frame-a{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(6px,1.2vh,12px);
    padding:clamp(12px,1.6vw,22px);color:var(--ink);text-decoration:none;outline:none}
  .p-ac .frame-a:focus-visible{box-shadow:inset 0 0 0 2px var(--accent)}
  .p-ac .f-top{display:flex;flex-direction:column;align-items:flex-start;gap:8px}
  .p-ac .f-no{font-family:var(--font-display);font-weight:900;font-size:clamp(40px,min(5vw,9vh),84px);line-height:.85;letter-spacing:-.05em;color:var(--accent-ink)}
  .p-ac .f-label{display:inline-flex;align-items:center;gap:7px;font:600 10px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
  .p-ac .f-label .ic{width:13px;height:13px;color:var(--accent-ink)}
  .p-ac .f-handle{font-family:var(--font-display);font-weight:700;font-size:clamp(16px,min(1.5vw,3.2vh),24px);line-height:1.12;color:var(--ink);overflow-wrap:break-word}
  .p-ac .f-note{font-size:clamp(11.5px,.95vw,13.5px);line-height:1.45;color:var(--muted)}
  .p-ac .f-foot{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .p-ac .f-hand{font-family:var(--font-hand);font-size:clamp(16px,1.5vw,21px);line-height:1;color:var(--accent-ink);rotate:-3deg}
  .p-ac .f-arrow{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;flex:0 0 auto;
    background:color-mix(in srgb,var(--accent) 14%,transparent);transition:background .3s,transform .4s cubic-bezier(.32,.72,0,1)}
  .p-ac .f-arrow .ic{width:13px;height:13px;color:var(--accent-ink)}
  .p-ac .frame[data-developed="true"] .f-arrow{background:var(--accent);transform:translate(2px,-2px)}
  .p-ac .frame[data-developed="true"] .f-arrow .ic{color:var(--paper)}

  .p-ac .f-copy{position:absolute;top:clamp(10px,1.4vw,18px);right:clamp(10px,1.4vw,18px);display:inline-flex;align-items:center;gap:6px;padding:8px 11px;border-radius:30px;
    border:1px solid var(--rule);background:var(--card);font:600 10px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink);cursor:pointer}
  .p-ac .f-copy .ic{width:12px;height:12px;color:var(--accent-ink)}
  .p-ac .f-copy:hover,.p-ac .f-copy[data-done="true"]{border-color:var(--accent);color:var(--accent-ink)}
  .p-ac .f-copy:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .p-ac .f-stamp{position:absolute;left:50%;top:50%;margin:-20px 0 0 -62px;width:124px;height:40px;display:grid;place-items:center;pointer-events:none;
    border:2.5px solid var(--accent);border-radius:6px;color:var(--accent-ink);background:color-mix(in srgb,var(--card) 82%,transparent);
    font:700 15px/1 var(--font-mono);letter-spacing:.24em;text-transform:uppercase}
  .p-ac .sr-live{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}

  /* cursor stamp trail */
  .p-ac .trail{position:absolute;inset:0;pointer-events:none;z-index:5;overflow:hidden}
  .p-ac .stamp{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;animation:ac-stamp var(--trail-life) cubic-bezier(.22,1,.36,1) forwards}
  .p-ac .stamp.horse{background:var(--accent);-webkit-mask:url(/motifs/bankura-horse.webp) center / contain no-repeat;mask:url(/motifs/bankura-horse.webp) center / contain no-repeat}
  .p-ac .stamp.ring{border:1.5px dashed var(--accent);border-radius:50%;width:22px;height:22px;margin:-11px 0 0 -11px}
  @keyframes ac-stamp{0%{opacity:0;scale:.4}18%{opacity:.85;scale:1.08}100%{opacity:0;scale:.9;translate:0 10px}}

  /* phones + portrait tablets: band stacks, the strip turns vertical (sprockets left and right) */
  @media(max-width:820px){
    .p-ac{gap:10px}
    .p-ac .band{grid-template-columns:1fr;gap:8px;position:relative}
    .p-ac .ac-title{font-size:clamp(40px,12vw,84px);margin-top:6px}
    .p-ac .side{display:block}
    .p-ac .side-txt{gap:7px}
    .p-ac .ac-lede{font-size:12.5px;line-height:1.45;max-width:none}
    .p-ac .postmark{position:absolute;top:-8px;right:0;width:84px}
    .p-ac .postmark .pm-text{font-size:13.6px;letter-spacing:0}
    .p-ac .twin-door{font-size:9.5px}
    .p-ac .strip{padding:10px 22px}
    .p-ac .strip::before,.p-ac .strip::after{top:12px;bottom:12px;left:7px;right:auto;width:10px;height:auto;
      background:radial-gradient(4px 5px at center,rgba(244,234,217,.8) 92%,transparent 100%) 0 0 / 10px 17px repeat-y}
    .p-ac .strip::after{left:auto;right:7px}
    .p-ac .cells{grid-template-columns:1fr;grid-template-rows:repeat(3,auto);align-content:stretch;gap:6px}
    .p-ac .cell{grid-template-columns:auto minmax(0,1fr) auto;grid-template-rows:minmax(0,1fr);gap:4px}
    .p-ac .edge{writing-mode:vertical-rl;letter-spacing:.04em;text-align:center;overflow:visible}
    .p-ac .edge.top{rotate:180deg}
    .p-ac .edge.bot{text-align:center}
    .p-ac .frame-a{display:grid;grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:"no label hand" "handle handle handle" "note note arrow";
      align-content:center;align-items:center;gap:3px 10px;padding:9px 12px}
    .p-ac .f-top,.p-ac .f-foot{display:contents}
    .p-ac .f-no{grid-area:no;font-size:clamp(22px,6vw,40px)}
    .p-ac .f-label{grid-area:label}
    .p-ac .f-hand{grid-area:hand;font-size:16px;justify-self:end}
    .p-ac .f-handle{grid-area:handle;font-size:clamp(13.5px,3.7vw,22px)}
    .p-ac .f-note{grid-area:note;font-size:11.5px;line-height:1.35}
    .p-ac .f-arrow{grid-area:arrow;width:26px;height:26px}
    .p-ac .f-copy{position:static;justify-content:center;border-radius:0;border-width:1px 0 0;padding:7px 10px}
  }
  @media(max-width:820px) and (max-height:700px){
    .p-ac{gap:8px}
    .p-ac .ac-lede{line-height:1.35}
    .p-ac .cells{gap:4px}
    .p-ac .frame-a{gap:2px 10px;padding:6px 10px}
    .p-ac .f-copy{padding:5px 10px}
  }
  @media(max-width:820px) and (min-height:900px){
    .p-ac .frame-a{gap:8px 14px;padding:16px 18px}
    .p-ac .f-note{font-size:13px}
  }
  @media(prefers-reduced-motion:reduce){.p-ac .trail{display:none}.p-ac .f-arrow{transition:none}}
`
