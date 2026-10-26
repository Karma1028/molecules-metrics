/* =====================================================================
   Hero (front page) assets, preserved verbatim from the approved prototype
   hero v0.7. Mounted as a self-contained island on the "/" route so the
   signature cover-story hero keeps its exact look + behaviour. The SPA's
   world shell is NOT applied here: this page owns its own styling.
   ===================================================================== */

export const HERO_STYLE = String.raw`
  :root{
    --paper:#ECE2D0; --paper2:#E4D8C2; --card:#FBF6EC; --ink:#241E17; --muted:#6A5E49;
    --orange:#E4631F; --pen:#2B4C6F; --teal:#2C9C98; --grid:rgba(90,70,45,.08);
    --blau:#004D98; --grana:#A50044;
    --shadow:0 1px 1px rgba(60,40,15,.08), 0 18px 34px -12px rgba(80,55,25,.32);
    --accent:var(--orange); --ease:cubic-bezier(.22,1,.36,1); --spring:cubic-bezier(.34,1.56,.64,1);
    --accent-ink:#8a3d1c; --orange-ink:#8a3d1c; --teal-ink:#0f6a64;
  }
  :root[data-theme="dark"]{
    --paper:#1C1813; --paper2:#15110D; --card:#2A231B; --ink:#EFE7DA; --muted:#A39580;
    --orange:#FF8A4C; --pen:#8FB3D6; --teal:#44C0BC; --grid:rgba(255,235,200,.055);
    --accent-ink:#FF8A4C; --orange-ink:#FF8A4C; --teal-ink:#44C0BC;
    --shadow:0 1px 1px rgba(0,0,0,.3), 0 20px 40px -12px rgba(0,0,0,.7);
  }
  :root[data-mode="analyst"]{--accent:var(--pen); --accent-ink:var(--pen)}
  html[data-hero],html[data-hero] body{height:100%}
  html[data-hero] body{background:var(--paper); color:var(--ink); font-family:"Inter",system-ui,sans-serif; overflow:hidden;
    -webkit-font-smoothing:antialiased; transition:background .5s,color .5s}
  .hero-root a{color:inherit}
  .hero-root .ic{width:1em; height:1em; stroke:currentColor; stroke-width:1.9; fill:none; stroke-linecap:round; stroke-linejoin:round;
     display:inline-block; vertical-align:-.14em; flex:0 0 auto}
  .hero-root .sprite{position:absolute; width:0; height:0; overflow:hidden}
  .hero-root .bg{position:fixed; inset:0; z-index:0;
    background:linear-gradient(var(--grid) 1px,transparent 1px) 0 0/30px 30px,
               linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/30px 30px,
               radial-gradient(120% 90% at 18% 8%,var(--paper),var(--paper2))}
  .hero-root .grain{position:fixed; inset:0; z-index:40; pointer-events:none; opacity:.55; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")}

  /* ── Halftone screen-print layer — the "two baths" told as two dot languages.
     Hidden at rest; blooms in on the portrait hover-reveal (desaturated world prints as dots,
     the photo stays full colour above it). Karma = CMYK offset rosette; Tuhin = single-ink data-grid.
     No colour wash / tint — pure print texture (by request). ── */
  .hero-root .halftone{position:fixed; inset:0; z-index:1; pointer-events:none; opacity:0;
    mix-blend-mode:multiply; transition:opacity .55s var(--ease); background-repeat:repeat}
  :root[data-theme="dark"] .hero-root .halftone{mix-blend-mode:screen}
  /* Karma / artist — CMYK rosette: 4 offset dot grids overprint into a print-rosette */
  :root[data-mode="artist"] .hero-root .halftone{
    background-image:
      radial-gradient(circle at center, #00AEEF 0 1.7px, transparent 2.2px),
      radial-gradient(circle at center, #EC008C 0 1.7px, transparent 2.2px),
      radial-gradient(circle at center, #FFE800 0 1.7px, transparent 2.2px),
      radial-gradient(circle at center, #15110d 0 1.3px, transparent 1.9px);
    background-size:8px 8px,8px 8px,8px 8px,8px 8px;
    background-position:0 0,3px 1px,1px 3px,2px 2px}
  /* Tuhin / analyst — single-ink data-grid, tighter + squarer read */
  :root[data-mode="analyst"] .hero-root .halftone{
    background-image:radial-gradient(circle at center, #2b2b2b 0 1.5px, transparent 2.1px);
    background-size:7px 7px; background-position:0 0}
  :root[data-theme="dark"][data-mode="analyst"] .hero-root .halftone{
    background-image:radial-gradient(circle at center, #d7cdbb 0 1.5px, transparent 2.1px)}

  .hero-root .top{position:fixed; z-index:30; inset:0 0 auto 0; display:flex; justify-content:space-between; align-items:center;
    padding:22px clamp(22px,5vw,64px); font:500 11px/1 "JetBrains Mono",monospace; letter-spacing:.2em; text-transform:uppercase; color:var(--muted)}
  .hero-root .top b{color:var(--accent-ink); transition:color .5s}
  .hero-root .top .right{margin-right:58px}

  .hero-root .stage{position:fixed; inset:0; z-index:5}
  .hero-root .lead{position:absolute; z-index:8; left:clamp(22px,5vw,64px); top:50%; translate:0 -46%; width:min(40vw,520px)}
  .hero-root .issue{font:500 11.5px/1 "JetBrains Mono",monospace; letter-spacing:.22em; text-transform:uppercase; color:var(--accent-ink); margin-bottom:18px; transition:color .5s; display:flex; gap:10px; align-items:center}
  .hero-root .issue .live{width:7px;height:7px;border-radius:50%;background:var(--accent)}
  .hero-root h1{font-family:"Fraunces",serif; font-weight:900; font-size:min(7vw,12.4vh,112px); line-height:.9; letter-spacing:-.02em}
  .hero-root h1 .ln{display:block; overflow:hidden; padding-bottom:.06em; margin-bottom:-.06em}
  .hero-root h1 .ln>span{display:inline-block; animation:rise 1s var(--ease) both; animation-delay:calc(.15s + var(--i)*.09s)}
  .hero-root h1 em{font-style:italic; font-weight:600}
  .hero-root h1 .hand{font-family:"Caveat",cursive; font-weight:700; color:var(--accent-ink); font-size:1.2em; line-height:.7; transition:color .5s}
  .hero-root .sub{font-size:clamp(14px,1.1vw,16px); color:var(--muted); line-height:1.6; max-width:430px; margin:22px 0 24px; min-height:76px}
  .hero-root .sub b{color:var(--ink); font-weight:600}
  .hero-root .sub .s{display:none} :root[data-mode="artist"] .hero-root .sub .s.artist, :root[data-mode="analyst"] .hero-root .sub .s.analyst{display:inline; animation:fadein .5s var(--ease)}

  .hero-root .switch{display:inline-flex; position:relative; background:var(--card); border:1px solid color-mix(in srgb,var(--ink) 10%,transparent);
    border-radius:40px; padding:5px; box-shadow:var(--shadow); cursor:pointer; user-select:none; font:inherit; color:inherit}
  .hero-root .switch:focus-visible{outline:2px solid var(--accent); outline-offset:3px}
  .hero-root .switch .thumb{position:absolute; top:5px; bottom:5px; left:5px; width:calc(50% - 5px); border-radius:34px; background:var(--accent);
    transition:translate .55s cubic-bezier(.76,0,.24,1), background .5s}
  :root[data-mode="analyst"] .hero-root .switch .thumb{translate:100% 0}
  .hero-root .switch .opt{position:relative; z-index:1; flex:1; text-align:center; padding:10px 24px; font:500 12px/1 "JetBrains Mono",monospace;
    letter-spacing:.12em; text-transform:uppercase; color:var(--muted); transition:color .4s; white-space:nowrap}
  :root[data-mode="artist"] .hero-root .opt-artist, :root[data-mode="analyst"] .hero-root .opt-analyst{color:#fff}
  :root[data-theme="dark"][data-mode="analyst"] .hero-root .opt-analyst{color:#14202c}
  .hero-root .switch-row{display:flex; align-items:center; gap:14px; margin:14px 0 8px}
  .hero-root .hint{display:inline-block; font:600 18px/1 "Caveat",cursive; color:var(--muted); rotate:-4deg}
  .hero-root .hint b{color:var(--accent-ink); transition:color .5s}
  .hero-root .thesis-line{font:400 12px/1.45 "Fraunces",serif; font-style:italic; color:var(--muted); max-width:48ch; margin:0 0 14px}
  .hero-root .thesis-line .thread{color:var(--accent-ink); font-style:normal; font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.12em; text-transform:uppercase; display:inline-block; margin-left:6px; font-weight:600}
  .hero-root .elsewhere{margin-top:20px; font:500 11px/1.9 "JetBrains Mono",monospace; letter-spacing:.14em; text-transform:uppercase; color:var(--muted)}
  .hero-root .elsewhere a{color:var(--ink); text-decoration:none; border-bottom:1px solid color-mix(in srgb,var(--accent) 60%,transparent); margin-right:14px; transition:color .3s}
  .hero-root .elsewhere a:hover{color:var(--accent-ink)}
  .hero-root .elsewhere a[hidden]{display:none}

  .hero-root .portrait{position:absolute; z-index:6; right:clamp(24px,4vw,64px); top:76px; bottom:-3vh; width:min(46vw,700px)}
  .hero-root .print{position:absolute; inset:0; overflow:hidden; background:#ccb; box-shadow:var(--shadow);
    clip-path:inset(0 0 0 0); animation:wipe 1.2s cubic-bezier(.76,0,.24,1) .1s both}
  .hero-root .ph{position:absolute; inset:0; background-repeat:no-repeat}
  .hero-root .ph.base{background-image:url("/me.jpg"); background-image:image-set(url("/me-1600w.webp") type("image/webp"), url("/me.jpg") type("image/jpeg")); background-size:cover; background-position:60% 16%; background-color:#b9a98f;
    animation:settle 1.8s var(--ease) .1s both; transition:filter .7s var(--ease)}
  :root[data-theme="dark"] .hero-root .ph.base{filter:brightness(.78) saturate(.8) contrast(1.05)}
  :root[data-mode="analyst"] .hero-root .ph.base{filter:grayscale(1) contrast(1.12) brightness(1.04)}
  :root[data-theme="dark"][data-mode="analyst"] .hero-root .ph.base{filter:grayscale(1) contrast(1.15) brightness(.7)}
  /* analyst = grayscale print + plotter grid as instrument texture. No colour tint (by design). */
  .hero-root .ph.plot{opacity:0; transition:opacity .7s var(--ease);
    background:linear-gradient(color-mix(in srgb,#fff 22%,transparent) 1px,transparent 1px) 0 0/24px 24px,
               linear-gradient(90deg,color-mix(in srgb,#fff 22%,transparent) 1px,transparent 1px) 0 0/24px 24px}
  :root[data-mode="analyst"] .hero-root .ph.plot{opacity:.55}
  .hero-root .figcap{position:absolute; left:14px; bottom:calc(3vh + 12px); z-index:2; font:500 11px/1 "JetBrains Mono",monospace; letter-spacing:.16em;
    text-transform:uppercase; color:#fff; text-shadow:0 1px 6px rgba(0,0,0,.5)}
  .hero-root .figcap::after{content:"fig.1 · the artist, Goa"} :root[data-mode="analyst"] .hero-root .figcap::after{content:"fig.1 · specimen: analyst (chem-eng lineage)"}

  .hero-root .disc{position:absolute; z-index:-1; right:-13%; top:-11%; width:62%; aspect-ratio:1; overflow:visible; animation:pop 1.1s var(--spring) .35s both}
  .hero-root .disc .core{fill:var(--accent); transition:fill .6s}
  .hero-root .disc .cut{fill:var(--paper); translate:100% 0; transition:translate .9s cubic-bezier(.76,0,.24,1), fill .5s}
  :root[data-theme="dark"] .hero-root .disc .core{fill:#D9D7CF}
  :root[data-theme="dark"][data-mode="analyst"] .hero-root .disc .core{fill:var(--pen)}
  :root[data-theme="dark"] .hero-root .disc .cut{translate:30% -6%}

  .hero-root .set{position:absolute; inset:0; pointer-events:none}
  .hero-root .obj{position:absolute; pointer-events:auto; rotate:var(--r,0deg); transition:opacity .35s var(--ease), scale .35s var(--ease)}
  .hero-root .set.in .obj{animation:slap .75s var(--spring) both; animation-delay:calc(var(--d,0) * 1s)}
  :root[data-mode="analyst"] .hero-root .set.artist .obj, :root[data-mode="artist"] .hero-root .set.analyst .obj{animation:none; opacity:0; scale:.9; pointer-events:none}
  .hero-root .k{font:500 11px/1 "JetBrains Mono",monospace; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); display:flex; gap:7px; align-items:center}
  .hero-root .dot{width:7px;height:7px;border-radius:50%;background:var(--teal);flex:0 0 auto}
  .hero-root .dot.live{background:var(--accent);animation:pulse 1.4s infinite}
  .hero-root .tape{position:absolute; width:74px; height:22px; background:rgba(232,210,160,.62); box-shadow:0 1px 3px rgba(0,0,0,.08); z-index:2}
  :root[data-theme="dark"] .hero-root .tape{background:rgba(190,170,130,.4)}

  .hero-root .spot{right:6px; top:5%; width:272px; --r:2.5deg; --d:.9; background:#17130f; color:#efe7da; border-radius:9px;
    padding:15px 16px 15px; box-shadow:var(--shadow); overflow:hidden; position:absolute}
  :root[data-theme="dark"] .hero-root .spot{background:#0b0a08; outline:1px solid rgba(255,255,255,.07)}
  /* green edge + soft glow so the live feed reads as the hero of the collage */
  .hero-root .spot::before{content:""; position:absolute; left:0; top:0; bottom:0; width:4px; background:#1DB954}
  .hero-root .spot::after{content:""; position:absolute; left:-30%; top:-60%; width:160%; height:120%; pointer-events:none;
    background:radial-gradient(60% 60% at 18% 20%, rgba(29,185,84,.22), transparent 70%)}
  .hero-root .spot>*{position:relative; z-index:1}
  .hero-root .spot .k{color:#b7a98f; font-size:11px; letter-spacing:.18em}
  .hero-root .spot .k .ic{color:#1DB954!important}
  .hero-root .spot .row{display:flex; gap:13px; align-items:center; margin-top:12px; text-decoration:none}
  .hero-root .spot .art{width:62px; height:62px; border-radius:5px; flex:0 0 auto; background:#2c2620 center/cover; display:grid; place-items:center;
    font-size:24px; color:#6d6153; box-shadow:0 6px 16px -6px rgba(0,0,0,.6)}
  .hero-root .spot .t{font:650 15.5px/1.22 "Inter"; letter-spacing:-.01em; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden}
  .hero-root .spot .a{font-size:12.5px; color:#b7a98f; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:155px}
  .hero-root .bars{display:none; gap:3px; align-items:flex-end; height:14px; margin-left:auto}
  .hero-root .spot.playing .bars{display:flex}
  .hero-root .bars i{width:3px; background:#1DB954; border-radius:2px}
  .hero-root .bars i:nth-child(2){animation-delay:.25s}.hero-root .bars i:nth-child(3){animation-delay:.5s}.hero-root .bars i:nth-child(4){animation-delay:.12s}
  .hero-root .spot .foot{font:600 16px/1 "Caveat",cursive; color:#1DB954; margin-top:11px}

  .hero-root .mood{left:-50px; top:31%; width:132px; height:132px; --r:-8deg; --d:1.05; border-radius:50%; background:var(--orange); color:#1d1712;
    display:grid; place-items:center; text-align:center; box-shadow:var(--shadow)}
  .hero-root .mood>svg{position:absolute; inset:0; width:100%; height:100%}
  .hero-root .mood>svg text{font:500 11px "JetBrains Mono",monospace; letter-spacing:.22em; fill:#1d1712; text-transform:uppercase}
  .hero-root .mood>div{display:flex; flex-direction:column; align-items:center; justify-content:center; width:82px; gap:1px}
  .hero-root .mood-ic{width:19px!important; height:19px!important; margin:0 0 3px!important; color:#1d1712; opacity:.9}
  .hero-root .mood .w{font:700 19px/.92 "Caveat",cursive; max-width:78px; text-wrap:balance}
  .hero-root .mood .sig{font:500 11px/1.15 "JetBrains Mono",monospace; letter-spacing:.06em; text-transform:uppercase; margin-top:4px; opacity:.72; max-width:84px}

  .hero-root a.obj{text-decoration:none; color:inherit}
  .hero-root .barca{left:-34px; bottom:calc(3vh + 7%); width:272px; --r:-3deg; --d:1.2; display:flex; background:var(--card); border-radius:6px; box-shadow:var(--shadow); color:var(--ink)}
  .hero-root .barca .stub{width:34px; flex:0 0 auto; border-radius:6px 0 0 6px; background:repeating-linear-gradient(90deg,var(--blau) 0 8.5px,var(--grana) 8.5px 17px);
    display:grid; place-items:center}
  .hero-root .barca .stub span{writing-mode:vertical-rl; rotate:180deg; font:500 11px/1 "JetBrains Mono",monospace; letter-spacing:.24em; color:#fff; text-transform:uppercase}
  .hero-root .barca .body{flex:1; padding:12px 14px 12px 14px; border-left:2px dashed color-mix(in srgb,var(--ink) 18%,transparent)}
  .hero-root .barca .vs{font:900 19px/1.1 "Fraunces",serif; margin-top:8px}
  .hero-root .barca .when{font-size:11.5px; color:var(--muted); margin-top:3px}
  .hero-root .barca .cd{font:500 11px/1 "JetBrains Mono",monospace; color:var(--grana); margin-top:8px; letter-spacing:.04em}
  :root[data-theme="dark"] .hero-root .barca .cd{color:#ff6fa8}
  .hero-root .barca .last{margin-top:9px; padding-top:8px; border-top:1px solid color-mix(in srgb,var(--ink) 10%,transparent); font-size:11.5px; display:flex; gap:7px; align-items:center}
  .hero-root .res{font:500 11px/1 "JetBrains Mono",monospace; padding:3px 5px; border-radius:3px; color:#fff; background:var(--muted)}
  .hero-root .res.W{background:#2f8a4e} .hero-root .res.L{background:#b23a3a} .hero-root .res.D{background:#8a7a2f}
  .hero-root .barca .tape{top:-10px; right:22px; rotate:7deg}

  .hero-root .pola{right:-38px; top:43%; width:178px; --r:4.5deg; --d:1.35; background:#fffdf8; padding:9px 9px 34px; box-shadow:var(--shadow); text-decoration:none}
  :root[data-theme="dark"] .hero-root .pola{background:#2b241c}
  .hero-root .pola .win{position:relative; aspect-ratio:4/5; overflow:hidden; background:#222}
  .hero-root .pola .win img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:opacity .5s, scale 5.5s linear}
  .hero-root .pola .win img.cur{opacity:1; scale:1.08} .hero-root .pola .win img:not(.cur){opacity:0; scale:1}
  .hero-root .pola .shutter{position:absolute; inset:0; background:#111; clip-path:inset(0 0 100% 0); z-index:2}
  .hero-root .pola.snap .shutter{animation:shutter .5s cubic-bezier(.76,0,.24,1)}
  .hero-root .pola .cap{position:absolute; left:11px; right:11px; bottom:8px; display:flex; justify-content:space-between; align-items:baseline; color:var(--ink)}
  .hero-root .pola .cap b{font:700 17px/1 "Caveat",cursive}
  .hero-root .pola .cap span{font:500 11px/1 "JetBrains Mono",monospace; letter-spacing:.1em; color:var(--muted)}
  .hero-root .pola .tape{top:-11px; left:50%; translate:-50% 0; rotate:-4deg}

  .hero-root .leaders{position:absolute; inset:0; width:100%; height:100%; overflow:visible; pointer-events:none; z-index:3}
  .hero-root .leaders path{fill:none; stroke:var(--pen); stroke-width:1.4; transition:stroke-dashoffset .9s var(--ease) .35s}
  .hero-root .leaders circle{fill:var(--pen)}
  :root[data-theme="light"] .hero-root .leaders path{stroke:#fff}
  :root[data-theme="light"] .hero-root .leaders circle{fill:#fff}
  :root[data-mode="artist"] .hero-root .leaders{opacity:0; transition:opacity .2s}
  .hero-root .pin{position:absolute; left:calc(var(--x)*1%); top:calc(var(--y)*1%); width:20px; height:20px; translate:-50% -50%; border-radius:50%; z-index:4;
    background:var(--pen); color:#fff; font:500 11px/20px "JetBrains Mono",monospace; text-align:center; box-shadow:0 0 0 3px color-mix(in srgb,#fff 55%,transparent);
    transition:scale .45s var(--spring), opacity .3s; pointer-events:none}
  :root[data-theme="dark"] .hero-root .pin{color:#14202c}
  :root[data-mode="artist"] .hero-root .pin{scale:0; opacity:0}
  .hero-root .note{width:226px; background:var(--card); padding:11px 13px 12px; border-left:3px solid var(--pen); box-shadow:var(--shadow); z-index:5}
  .hero-root .note .k{color:var(--pen)}
  .hero-root .note h3{font:600 italic 17px/1.15 "Fraunces",serif; margin-top:6px; color:var(--ink)}
  .hero-root .note p{font-size:12px; line-height:1.4; color:var(--muted); margin-top:4px}
  .hero-root .note .from{font:600 15px/1 "Caveat",cursive; color:var(--pen); margin-top:6px}
  .hero-root .n1{left:-46px; top:33%; --r:-1.5deg; --d:.5}
  .hero-root .n2{right:-34px; top:6%;  --r:1.2deg; --d:.62}
  .hero-root .n3{right:-34px; top:37%; --r:-1deg; --d:.74}
  .hero-root .n4{right:-30px; top:63%; --r:1.6deg; --d:.86}
  .hero-root .n5{left:-34px; bottom:calc(3vh + 5%); --r:-1.2deg; --d:.98}

  .hero-root .eclipse{position:fixed; z-index:31; right:clamp(16px,4vw,52px); top:10px; width:52px; height:52px; border:none; background:transparent; cursor:pointer; display:grid; place-items:center}
  .hero-root .eclipse svg{width:30px; height:30px; overflow:visible; transition:transform .6s var(--ease)}
  .hero-root .eclipse .core{fill:var(--orange); transition:fill .5s}
  .hero-root .eclipse .cut{fill:var(--paper); transform:translateX(26px); transition:transform .55s cubic-bezier(.76,0,.24,1),fill .5s}
  .hero-root .eclipse .ray{stroke:var(--orange); stroke-width:2.2; stroke-linecap:round; transform-origin:15px 15px; transition:opacity .4s,transform .55s cubic-bezier(.76,0,.24,1)}
  :root[data-theme="dark"] .hero-root .eclipse .core{fill:#D9D7CF}
  :root[data-theme="dark"] .hero-root .eclipse .cut{transform:translateX(9px)}
  :root[data-theme="dark"] .hero-root .eclipse .ray{opacity:0; transform:scale(.4)}
  .hero-root .eclipse:hover svg{transform:rotate(22deg)}
  ::view-transition-old(root){animation:none}
  ::view-transition-new(root){animation:ec .6s cubic-bezier(.76,0,.24,1)}

  .hero-root .scrollcue{position:fixed; z-index:9; left:clamp(22px,5vw,64px); bottom:clamp(18px,3vh,30px); display:inline-block;
    padding:10px 12px 10px 16px; border:1px solid color-mix(in srgb,var(--accent) 45%,transparent); border-radius:999px;
    background:color-mix(in srgb,var(--card) 85%,transparent); backdrop-filter:blur(6px);
    font:500 11.5px/1 "JetBrains Mono",monospace; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); text-decoration:none;
    transition:border-color .25s var(--ease), color .25s var(--ease)}
  .hero-root .scrollcue b{color:var(--ink)}
  .hero-root .scrollcue i{font-style:normal; display:inline-grid; place-items:center; width:24px; height:24px; border-radius:50%;
    background:var(--accent); color:var(--card); font-size:13px; letter-spacing:0; margin-left:10px; vertical-align:middle; transition:transform .25s var(--ease)}
  .hero-root .scrollcue:hover,.hero-root .scrollcue:focus-visible{border-color:var(--accent); color:var(--ink)}
  .hero-root .scrollcue:hover i,.hero-root .scrollcue:focus-visible i{transform:translateX(4px)}

  .hero-root .k .ic{width:13px; height:13px; color:var(--accent-ink)}
  .hero-root .spot .k .ic{color:var(--orange-ink)}
  .hero-root .mood-ic{width:22px; height:22px; display:block; margin:0 auto 4px; color:#1d1712}
  .hero-root .pola .cap .pn{display:inline-flex; gap:4px; align-items:center}
  .hero-root .pola .cap .ic{width:12px; height:12px; color:var(--muted)}
  .hero-root .note .k .ic{width:13px; height:13px; color:var(--pen)}
  .hero-root .elsewhere a .ic,.hero-root .elsewhere .ic{width:11px;height:11px;color:var(--accent-ink)}

  .hero-root h1{text-wrap:balance}
  .hero-root .note h3{text-wrap:pretty}
  .hero-root .sub{text-wrap:pretty}
  .hero-root .barca .cd,.hero-root .pola .cap span,.hero-root .barca .vs,.hero-root .spot .a{font-variant-numeric:tabular-nums}
  .hero-root .pola .win img{outline:1px solid rgba(0,0,0,.12); outline-offset:-1px}
  :root[data-theme="dark"] .hero-root .pola .win img{outline-color:rgba(255,255,255,.1)}
  .hero-root .print::after{content:""; position:absolute; inset:0; z-index:1; pointer-events:none;
    box-shadow:inset 0 0 90px rgba(30,18,6,.34); mix-blend-mode:multiply}
  .hero-root .obj{transition:opacity .35s var(--ease), scale .35s var(--ease), translate .4s var(--spring), transform .45s var(--spring), box-shadow .35s ease, filter .35s ease}
  /* per-card hover: the hovered card picks up -- lifts, scales, straightens its tilt, glows.
     Only that one card. slap animates the individual scale/rotate props and holds them after it ends;
     hover therefore uses transform (untouched by slap) to straighten (rotate by negative --r) + scale,
     and translate (also untouched) to lift. Net rotation = inline rotate(--r) + transform rotate(-(--r)) = 0. */
  .hero-root .set.in .obj:hover{transform:rotate(calc(-1 * var(--r,0deg))) scale(1.055); translate:0 -12px; z-index:14; filter:brightness(1.035) saturate(1.04)}
  .hero-root a.obj{cursor:pointer}
  .hero-root .obj:hover,.hero-root a.obj:hover{box-shadow:0 3px 3px rgba(60,40,15,.12), 0 40px 64px -14px rgba(80,55,25,.6)}
  .hero-root .set.in a.obj:active{transform:rotate(calc(-1 * var(--r,0deg))) scale(1.02); translate:0 -6px; filter:brightness(.98)}

  /* ── signature hover-reveal: lift the portrait into color, scatter + desaturate the rest ── */
  .hero-root .portrait{cursor:pointer}
  .hero-root .print{transition:scale .6s var(--spring), box-shadow .6s var(--ease)}
  .hero-root .spot{--sx:94px;--sy:-46px} .hero-root .mood{--sx:-98px;--sy:-12px}
  .hero-root .barca{--sx:-122px;--sy:46px} .hero-root .pola{--sx:130px;--sy:30px}
  .hero-root .n1{--sx:-110px;--sy:0} .hero-root .n2{--sx:106px;--sy:-36px}
  .hero-root .n3{--sx:120px;--sy:0} .hero-root .n4{--sx:98px;--sy:44px} .hero-root .n5{--sx:-94px;--sy:46px}
  :root[data-reveal] .hero-root .bg,:root[data-reveal] .hero-root .top,
  :root[data-reveal] .hero-root .scrollcue,:root[data-reveal] .hero-root .disc{filter:grayscale(.92) contrast(1.02); transition:filter .55s var(--ease)}
  :root[data-reveal] .hero-root .lead{filter:grayscale(.92); opacity:.5; transition:filter .55s var(--ease), opacity .55s var(--ease)}
  :root[data-reveal] .hero-root .obj{translate:var(--sx,0) var(--sy,0)!important; opacity:.1; filter:grayscale(.95)}
  :root[data-reveal] .hero-root .pin,:root[data-reveal] .hero-root .leaders,:root[data-reveal] .hero-root .scribble{opacity:0!important}
  :root[data-reveal] .hero-root .print{scale:1.035; box-shadow:0 2px 2px rgba(60,40,15,.1), 0 44px 72px -20px rgba(80,55,25,.6)}
  /* the desaturated world prints to halftone dots; the photo (z6) stays full colour above it */
  :root[data-reveal][data-mode="artist"] .hero-root .halftone{opacity:.92}
  :root[data-reveal][data-mode="analyst"] .hero-root .halftone{opacity:.8}

  .hero-root .dia{width:100%; height:46px; margin:9px 0 3px; overflow:visible; color:var(--pen); display:block}
  .hero-root .dia [data-draw]{stroke:var(--pen); fill:none; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round;
    stroke-dasharray:1; stroke-dashoffset:1; transition:stroke-dashoffset .9s var(--ease)}
  .hero-root .dia [data-pop]{fill:var(--pen); opacity:0; scale:0; transform-box:fill-box; transform-origin:center;
    transition:opacity .4s var(--ease), scale .45s var(--spring)}
  .hero-root .dia [data-flow]{stroke:var(--grana); fill:none; stroke-width:2.4; stroke-linecap:round; stroke-dasharray:3 5; opacity:0}
  :root[data-mode="analyst"] .hero-root .note .dia [data-draw]{stroke-dashoffset:0; transition-delay:calc(.3s + var(--i,0)*.12s)}
  :root[data-mode="analyst"] .hero-root .note .dia [data-pop]{opacity:1; scale:1; transition-delay:calc(.6s + var(--i,0)*.12s)}
  :root[data-mode="analyst"] .hero-root .note .dia [data-flow]{opacity:.9}
  @keyframes flow{to{stroke-dashoffset:-16}}

  .hero-root .scribble{position:absolute; left:-30px; top:4%; z-index:4; width:116px; --r:-6deg; --d:.8; rotate:var(--r);
    font:600 17px/1.04 "Caveat",cursive; color:var(--accent-ink); text-align:center; pointer-events:none}
  .hero-root .scribble svg{width:52px; height:30px; display:block; margin:3px auto 0; color:var(--accent-ink); stroke:currentColor; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round}
  :root[data-mode="analyst"] .hero-root .scribble{opacity:0; transition:opacity .2s}
  .hero-root .scribble path{stroke-dasharray:1; stroke-dashoffset:1; transition:stroke-dashoffset .8s var(--ease) .5s}
  :root[data-mode="artist"] .hero-root .set.in .scribble path{stroke-dashoffset:0}
  .hero-root .stamp{position:absolute; right:7px; top:7px; width:42px; height:42px; rotate:-13deg; opacity:.46; color:var(--grana); pointer-events:none}
  :root[data-theme="dark"] .hero-root .stamp{color:#ff6fa8; opacity:.5}
  .hero-root .stamp text{font:700 11px "JetBrains Mono",monospace; letter-spacing:.14em; fill:currentColor}
  .hero-root .stamp .ring{fill:none; stroke:currentColor; stroke-width:1.4}
  .hero-root .pola .sprocket{position:absolute; left:0; right:0; height:7px; display:flex; gap:4px; justify-content:center; z-index:3; pointer-events:none}
  .hero-root .pola .sprocket.t{top:2px} .hero-root .pola .sprocket.b{bottom:30px}
  .hero-root .pola .sprocket i{width:5px; height:4px; border-radius:1px; background:rgba(0,0,0,.45)}
  :root[data-theme="dark"] .hero-root .pola .sprocket i{background:rgba(255,255,255,.3)}

  .hero-root .sweep{position:absolute; inset:0; z-index:3; pointer-events:none; opacity:0;
    background:linear-gradient(105deg,transparent 40%,color-mix(in srgb,#fff 70%,transparent) 50%,transparent 60%)}
  .hero-root .print.advance .sweep{animation:sweep .62s var(--ease)}
  @keyframes sweep{0%{opacity:0; translate:-60% 0}18%{opacity:.9}100%{opacity:0; translate:60% 0}}
  .hero-root .print.advance .ph.base{animation:filmadv .5s var(--ease)}
  @keyframes filmadv{0%{transform:translateY(-6%) scale(1.05)}60%{transform:translateY(1%) scale(1.01)}100%{transform:translateY(0) scale(1)}}

  /* kantha thread: a running stitch from the switch through the current world's objects */
  /* below the cards (they are z 2) so the thread tucks under each one and comes out the other side */
  .hero-root .kantha{position:absolute; inset:0; width:100%; height:100%; z-index:1; pointer-events:none; overflow:visible}
  .hero-root .obj{z-index:2}
  .hero-root .kantha #thread-p{fill:none; stroke:var(--accent); stroke-width:2.6; stroke-linecap:round; stroke-dasharray:11 8;
    filter:drop-shadow(0 0 1.2px rgba(255,248,236,.95)) drop-shadow(0 1.5px 1.5px rgba(40,20,5,.28))}
  /* the stitches' underside: shorter, fainter, half a beat out of step, like real running stitch */
  .hero-root .kantha #thread-u{fill:none; stroke:var(--accent); stroke-width:1.2; stroke-linecap:round; stroke-dasharray:5 14; stroke-dashoffset:-11; opacity:.45; translate:0 3px}
  .hero-root .kantha #thread-mp{fill:none; stroke:#fff; stroke-width:8}
  .hero-root .kantha #thread-k circle{fill:var(--accent); stroke:rgba(255,248,236,.95); stroke-width:1.5}
  .hero-root .kantha #thread-k circle.ring{fill:none; stroke:var(--accent); stroke-width:1; opacity:.55}
  .hero-root .kantha #thread-k{transition:opacity .35s var(--ease)}
  .hero-root .kantha #thread-n{opacity:0; offset-rotate:auto; transition:opacity .25s var(--ease); filter:drop-shadow(0 1px 1px rgba(40,20,5,.35))}
  .hero-root .kantha #thread-n .nd{stroke:#5b5348; stroke-width:2; stroke-linecap:round}
  .hero-root .kantha #thread-n .eye{fill:var(--card,#fff8ec); stroke:#5b5348; stroke-width:.6}
  .hero-root .kantha #thread-n .tl{fill:none; stroke:var(--accent); stroke-width:1.6; stroke-linecap:round}

  @keyframes rise{from{translate:0 105%}to{translate:0 0}}
  @keyframes fadein{from{opacity:0}to{opacity:1}}
  @keyframes wipe{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0 0 0 0)}}
  @keyframes settle{from{scale:1.18}to{scale:1}}
  @keyframes pop{from{scale:0}to{scale:1}}
  @keyframes slap{0%{opacity:0; scale:1.35; rotate:calc(var(--r,0deg) + 14deg); filter:blur(3px)}60%{opacity:1; filter:blur(0)}100%{opacity:1; scale:1; rotate:var(--r,0deg)}}
  @keyframes shutter{0%{clip-path:inset(0 0 100% 0)}45%,55%{clip-path:inset(0 0 0 0)}100%{clip-path:inset(100% 0 0 0)}}
  @keyframes spin{to{rotate:360deg}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 40%,transparent)}50%{box-shadow:0 0 0 7px transparent}}
  @keyframes eq{0%,100%{height:3px}50%{height:12px}}
  @keyframes bob{0%,100%{translate:0 0}50%{translate:0 4px}}
  @keyframes ec{from{clip-path:circle(0% at var(--cx,92%) var(--cy,6%))}to{clip-path:circle(150% at var(--cx,92%) var(--cy,6%))}}

  @media (max-width:1180px) and (min-width:761px){
    .hero-root .portrait{width:min(46vw,560px); right:clamp(16px,2.5vw,32px); top:68px; bottom:16px}
    .hero-root .lead{width:min(44vw,400px); left:clamp(16px,3vw,36px)}
    .hero-root h1{font-size:clamp(38px,5vw,64px)}
    .hero-root .sub{font-size:12.5px; line-height:1.45; min-height:0; margin:12px 0 16px}
    .hero-root .obj{scale:.75} .hero-root .set.in .obj{animation-name:slapS}
    .hero-root .spot{right:-16px} .hero-root .pola{right:-16px} .hero-root .n2,.hero-root .n3,.hero-root .n4{right:-24px}
    .hero-root .disc{width:54%; right:-6%; top:-6%}
  }
  @keyframes slapS{0%{opacity:0; scale:1.2; rotate:calc(var(--r,0deg) + 14deg)}100%{opacity:1; scale:.86; rotate:var(--r,0deg)}}
  @media (max-width:760px){
    html[data-hero], html[data-hero] body{height:100%!important; width:100%!important; overflow:hidden!important}
    .hero-root{width:100%; height:100%; overflow:hidden}
    .hero-root .stage{position:fixed; inset:0; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;
      padding:clamp(40px,7vh,50px) 16px 64px; box-sizing:border-box}
    .hero-root .top{position:absolute; inset:0 0 auto 0; padding:10px 16px}
    .hero-root .top .right{display:none}
    .hero-root .eclipse{position:absolute; top:8px; right:12px}
    .hero-root .lead{position:relative; left:auto; top:auto; translate:none; width:100%; flex:0 0 auto; padding:0; z-index:10}
    .hero-root .issue{margin-bottom:4px; font-size:clamp(8.5px,2.2vw,10px); letter-spacing:.18em}
    .hero-root h1{font-size:clamp(28px,7.5vw,36px); line-height:.95}
    .hero-root .sub{min-height:0; font-size:clamp(11px,2.8vw,12.5px); line-height:1.35; margin:6px 0 8px; max-width:100%}
    .hero-root .switch-row{margin:4px 0 2px; gap:8px}
    .hero-root .switch{padding:3px; border-radius:24px}
    .hero-root .switch .thumb{border-radius:20px}
    .hero-root .switch .opt{padding:6px 14px; font-size:11px; letter-spacing:.08em}
    .hero-root .hint{font-size:14px; margin-left:6px}
    .hero-root .thesis-line{font-size:11px; line-height:1.25; margin:2px 0 4px; max-width:100%}
    .hero-root .thesis-line .thread{font-size:11px; margin-left:4px}
    .hero-root .elsewhere{margin-top:6px; font-size:11px; line-height:1.4}
    .hero-root .elsewhere a{margin-right:10px}
    .hero-root .portrait{position:relative; right:auto; top:auto; bottom:auto; width:100%; flex:1; min-height:0; margin-top:6px;
      overflow:hidden; border-radius:10px; box-shadow:var(--shadow)}
    .hero-root .print{position:absolute; inset:0; width:100%; height:100%; max-height:none; aspect-ratio:auto; border-radius:10px}
    .hero-root .figcap{bottom:6px; left:8px; font-size:11px}
    .hero-root .disc{display:none}
    .hero-root .set{position:absolute; inset:0; overflow:hidden}
    .hero-root .obj{--ps:.7; scale:var(--ps); transform-origin:bottom right}
    .hero-root .set.in .obj{animation-name:slapP}
    .hero-root .spot{right:6px; bottom:6px; top:auto; left:auto; width:220px}
    .hero-root .barca{left:6px; bottom:6px; top:auto; right:auto; width:150px; --ps:.68; transform-origin:bottom left}
    .hero-root .mood{left:6px; top:6px; width:72px; height:72px; --ps:.7; transform-origin:top left}
    .hero-root .pola{right:6px; top:6px; width:110px; --ps:.65; transform-origin:top right}
    .hero-root .set.analyst .note{right:6px; bottom:6px; top:auto; left:auto; width:220px}
    .hero-root .leaders,.hero-root .pin,.hero-root .scribble{display:none}
    .hero-root .scrollcue{left:50%; translate:-50% 0; bottom:14px; padding:8px 10px 8px 14px; font-size:11px; letter-spacing:.12em; white-space:nowrap;
      background:var(--card); box-shadow:var(--shadow)}
    .hero-root .scrollcue i{width:20px; height:20px; font-size:11px}
  }
  @keyframes slapP{0%{opacity:0; scale:calc(var(--ps,.7) * 1.35); rotate:calc(var(--r,0deg) + 14deg)}100%{opacity:1; scale:var(--ps,.7); rotate:var(--r,0deg)}}
  @media (prefers-reduced-motion:reduce){.hero-root *,.hero-root *::before,.hero-root *::after{animation:none!important; transition:none!important}}
`
