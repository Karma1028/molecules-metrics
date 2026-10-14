import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { SoundMe } from "./SoundMe"
import { Radio } from "./Radio"
import { useOneScreen } from "../../../hooks/useOneScreen"
import { PlateHeader } from "../../../components/headers/PlateHeader"

type Mode = "me" | "radio"
const STORE = "mm-sound-mode"

const CSS = String.raw`
  .p-sound{position:relative}
  /* radio mode drops the whole page into a near-black room */
  .void-bg{position:fixed;inset:0;z-index:0;background:
    radial-gradient(120% 90% at 50% 0%,#141217,#0a0a0c 70%)}
  .p-sound>*{position:relative;z-index:1}

  /* ---- tuner / band-switch ---- */
  .tuner{position:relative;display:inline-flex;align-items:stretch;height:46px;width:min(420px,92%);box-sizing:border-box;
    border:1px solid var(--rule);border-radius:40px;padding:5px;background:var(--card);box-shadow:var(--shadow-sm);
    font:600 11px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase}
  .p-sound[data-sound="radio"] .tuner{background:#16151a;border-color:#2c2a33;color:#b9b3a6}
  .tuner .tn{position:relative;z-index:2;flex:1 1 0;background:none;border:none;cursor:pointer;color:var(--muted);
    padding:11px 10px;border-radius:34px;white-space:nowrap;transition:color .35s;text-align:center}
  .tuner .tn[aria-selected="true"]{color:#fff}
  .tuner .tn-slide{position:absolute;z-index:1;top:5px;bottom:5px;left:5px;width:calc(50% - 5px);border-radius:34px;
    background:var(--accent);box-shadow:0 2px 10px -2px color-mix(in srgb,var(--accent) 70%,transparent);
    transition:transform .4s var(--spring)}
  .p-sound[data-sound="radio"] .tuner .tn-slide{background:#1DB954;box-shadow:0 2px 12px -2px #1DB95488}
  .p-sound[data-sound="radio"] .tuner .tn.radio[aria-selected="true"]{color:#06110a}
  .tuner[data-on="radio"] .tn-slide{transform:translateX(100%)}
  .tuner-row{display:flex;justify-content:center;margin:6px 0 clamp(26px,5vh,54px)}

  .sound-kick{text-align:center;color:var(--muted);font:500 10.5px/1.5 var(--font-mono);letter-spacing:.2em;
    text-transform:uppercase;margin-bottom:8px}
  .p-sound[data-sound="radio"] .sound-kick{color:#6f6a60}

  /* ============ MODE A — ME (one-screen console) ============ */
  .me{max-width:1180px;margin:0 auto;width:100%;flex:1;min-height:0;display:flex;flex-direction:column}
  .me-head{display:flex;align-items:baseline;gap:8px 16px;flex-wrap:wrap;margin-bottom:clamp(10px,1.8vh,20px)}
  .me-head .kicker{margin:0;display:inline-flex;align-items:center;gap:7px;font:600 10px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase}
  .me-head .sec{font:700 clamp(17px,2.1vw,25px)/1.05 var(--font-display);color:var(--ink);letter-spacing:-.01em;margin:0}
  .me-head .sec-kick{font-family:var(--font-hand);font-size:14px;color:var(--muted)}
  .me-head .sec-kick::before{display:none}

  .console{flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(12px,1.8vh,20px)}
  .con-sync{justify-content:flex-start;gap:16px}

  /* fixed header — now playing + headline numbers */
  .con-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:clamp(12px,1.6vw,20px);align-items:stretch}
  .con-head>*{min-width:0}
  @media(max-width:760px){.con-head{grid-template-columns:1fr}}

  .onnow{height:100%;display:grid;grid-template-columns:auto 1fr;gap:clamp(12px,1.6vw,18px);align-items:center;
    background:var(--card);border:1px solid var(--rule);border-left:3px solid var(--green);border-radius:14px;
    box-shadow:var(--shadow-sm);padding:clamp(12px,1.6vw,16px);box-sizing:border-box}
  .onnow .art{width:clamp(58px,6.5vw,80px);height:clamp(58px,6.5vw,80px);border-radius:9px;object-fit:cover;
    box-shadow:var(--shadow-sm);background:var(--paper2)}
  .onnow .art.ph{display:grid;place-items:center}
  .onnow .lbl{display:flex;align-items:center;gap:7px;font:600 9px/1 var(--font-mono);letter-spacing:.16em;
    text-transform:uppercase;color:var(--green);margin-bottom:7px}
  .onnow .eq{display:inline-flex;gap:2.5px;align-items:flex-end;height:11px;margin-left:2px}
  .onnow .eq i{width:3px;background:var(--green);border-radius:2px;animation:eqa 1s ease-in-out infinite}
  .onnow .eq i:nth-child(2){animation-delay:.2s}.onnow .eq i:nth-child(3){animation-delay:.4s}
  .onnow .t{font:600 clamp(16px,1.9vw,21px)/1.15 var(--font-display);color:var(--ink);text-wrap:balance}
  .onnow .a{font-size:13px;color:var(--muted);margin-top:3px}
  .onnow .when{font:500 9px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:5px}
  .onnow .splink,.stage-open{display:inline-flex;align-items:center;gap:7px;margin-top:10px;text-decoration:none;
    font:600 9.5px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:#fff;background:var(--green);
    padding:8px 13px;border-radius:30px;transition:transform .3s var(--spring),filter .3s}
  .onnow .splink:hover,.stage-open:hover{transform:translateY(-2px);filter:brightness(1.08)}

  .me-empty{text-align:center;color:var(--muted);font-size:14px;padding:24px}

  /* headline big numbers — compact 3-up */
  .statgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(10px,1.4vw,16px);height:100%}
  .statbig{position:relative;background:var(--card);border:1px solid var(--rule);border-radius:14px;box-shadow:var(--shadow-sm);
    padding:clamp(11px,1.5vw,17px);overflow:hidden;rotate:-.5deg;display:flex;flex-direction:column;justify-content:center}
  .statbig:nth-child(2){rotate:.6deg}.statbig:nth-child(3){rotate:-.3deg}
  .statbig.on{border-left:3px solid var(--green)}
  .sb-num{font:700 clamp(21px,2.9vw,34px)/1 var(--font-display);color:var(--ink);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
  .statbig.on .sb-num{color:var(--green)}
  .sb-unit{font:500 .42em/1 var(--font-mono);color:var(--muted);margin-left:3px;letter-spacing:0}
  .sb-label{font:600 9.5px/1.25 var(--font-mono);letter-spacing:.09em;text-transform:uppercase;color:var(--ink);margin-top:8px}
  .sb-note{font-family:var(--font-hand);font-size:13px;color:var(--muted);margin-top:5px;rotate:-.7deg}
  @media(max-width:560px){
    .statgrid{grid-template-columns:1fr 1fr}
    .statbig:nth-child(3){grid-column:1/-1}
  }
  /* odometer — digits roll into place on view */
  .odo{display:inline-flex;align-items:flex-end;line-height:1;font-variant-numeric:tabular-nums}
  .odo-row{display:inline-flex;line-height:1}
  .odo-sep{display:inline-block;line-height:1}
  .odo-d{display:inline-block;height:1em;line-height:1;overflow:hidden;vertical-align:bottom}
  .odo-col{display:flex;flex-direction:column;will-change:transform}
  .odo-n{height:1em;line-height:1;display:block;text-align:center}

  /* ---- deck: tabbed views over every dataset ---- */
  .deck{flex:1;min-height:0;display:flex;flex-direction:column;background:var(--card);border:1px solid var(--rule);
    border-radius:16px;box-shadow:var(--shadow-sm);overflow:hidden}
  .deck-tabs{display:flex;align-items:center;gap:4px;flex-wrap:wrap;padding:9px clamp(12px,2vw,18px);border-bottom:1px solid var(--rule)}
  .deck-tabs .dt{background:none;border:none;cursor:pointer;color:var(--muted);font:600 11px/1 var(--font-mono);
    letter-spacing:.02em;padding:7px 11px;border-radius:30px;white-space:nowrap;transition:color .25s,background .25s}
  .deck-tabs .dt:hover{color:var(--ink)}
  .deck-tabs .dt.on{color:#fff;background:var(--green)}
  .deck-kick{margin-left:auto;font:500 9px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .deck-panel{flex:1;min-height:0;position:relative}
  .deck-view{position:absolute;inset:0;padding:clamp(12px,1.5vw,18px) clamp(14px,2vw,22px);overflow:hidden;display:flex;flex-direction:column}

  /* the constant — vinyl + one-line read, stacked in panel */
  .constant{flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(12px,2vh,20px)}
  .constant .no1{flex:1}
  .constant .sofme{flex:0 0 auto}

  /* no.1 specimen — a record still spinning */
  .no1{position:relative;display:flex;align-items:center;gap:clamp(14px,2.4vw,30px);min-height:0;
    background:linear-gradient(135deg,color-mix(in srgb,var(--green) 10%,var(--card)),var(--card));
    border:1px solid var(--rule);border-radius:16px;padding:clamp(16px,2.6vw,32px);rotate:.4deg}
  .no1-body{min-width:0;flex:1}
  .no1-tag{display:inline-flex;align-items:center;gap:7px;font:600 10px/1 var(--font-mono);letter-spacing:.16em;
    text-transform:uppercase;color:var(--green);margin-bottom:10px}
  .no1-name{font:700 clamp(26px,4.4vw,48px)/1 var(--font-display);color:var(--ink);letter-spacing:-.02em;text-wrap:balance}
  .no1-stat{font-size:clamp(12px,1.5vw,15px);color:var(--muted);margin-top:12px;font-variant-numeric:tabular-nums}
  .no1-stat b{color:var(--ink);font-weight:600}
  .no1-hand{position:absolute;top:12px;right:18px;font-family:var(--font-hand);font-size:28px;color:var(--green);rotate:8deg;opacity:.9}
  /* vinyl */
  .vinyl{width:clamp(96px,16vw,150px);height:auto;flex:none;filter:drop-shadow(0 7px 16px rgba(0,0,0,.3))}
  .vinyl-disc{transform-box:fill-box;transform-origin:center;animation:vspin 18s linear infinite}
  .vinyl-groove{fill:none;stroke:rgba(255,255,255,.055);stroke-width:1}
  .vinyl-sheen{fill:none;stroke:rgba(255,255,255,.09);stroke-width:7;stroke-linecap:round}
  .vinyl-label{fill:var(--green)}
  .vinyl-label-ring{fill:none;stroke:rgba(0,0,0,.18);stroke-width:1.5}
  .vinyl-hole{fill:var(--card)}
  @keyframes vspin{to{transform:rotate(360deg)}}
  @media(max-width:560px){.no1{flex-direction:column;align-items:flex-start;text-align:left;gap:14px}
    .vinyl{width:104px;align-self:center}}

  /* countdown rows w/ minutes bars — fills the deck panel */
  .cd{flex:1;min-height:0;display:flex}
  .cd-list{list-style:none;margin:0;padding:0;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:clamp(6px,1.3vh,14px)}
  .cd-row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;min-height:0}
  .cd.in .cd-row{animation:rise .55s var(--ease) both;animation-delay:calc(var(--i,0)*.07s)}
  .cd-rk{font:700 13px/1 var(--font-display);color:var(--green);width:22px;flex:0 0 auto;font-variant-numeric:tabular-nums;display:inline-block}
  .cd.in .cd-rk{animation:rkpop .5s var(--ease) both;animation-delay:calc(var(--i,0)*.07s + .08s)}
  .cd-body{min-width:0}
  .cd-names{display:flex;align-items:baseline;gap:9px;min-width:0;margin-bottom:2px}
  .cd-n1{font:600 13px/1.15 var(--font-display);color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cd-n2{font:500 10px/1 var(--font-mono);color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:0 0 auto}
  .cd-bar{display:block;height:4px;border-radius:4px;background:color-mix(in srgb,var(--ink) 8%,transparent);overflow:hidden}
  .cd-fill{display:block;height:100%;width:var(--w,0%);border-radius:4px;background:var(--green);transform-origin:left}
  .cd.in .cd-fill{animation:barx .9s var(--ease) both;animation-delay:calc(var(--i,0)*.07s + .18s)}
  .cd-val{text-align:right;font:500 10px/1.2 var(--font-mono);color:var(--muted);white-space:nowrap}
  .cd-val b{font-size:12.5px;color:var(--ink);font-weight:600}
  .cd-plays{opacity:.8}
  .cd-plays::before{content:" · "}

  /* eras — minutes per year columns, fill panel */
  .eras{flex:1;min-height:0;display:flex;align-items:flex-end;gap:clamp(5px,1.2vw,12px)}
  .era{flex:1 1 0;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;height:100%;justify-content:flex-end}
  .era-col{width:min(70%,30px);flex:1;min-height:0;display:flex;align-items:flex-end;border-radius:6px 6px 0 0;
    background:color-mix(in srgb,var(--ink) 6%,transparent);overflow:hidden}
  .era-fill{width:100%;height:var(--w,0%);border-radius:6px 6px 0 0;background:linear-gradient(var(--green),color-mix(in srgb,var(--green) 55%,var(--card)));
    transform-origin:bottom;animation:bary .9s var(--ease) both;animation-delay:calc(var(--i,0)*.06s)}
  .era-year{font:700 13px/1 var(--font-display);color:var(--ink)}
  .era-min{font:500 8.5px/1 var(--font-mono);color:var(--muted)}
  .era-top{font:500 8px/1.2 var(--font-mono);color:var(--muted);text-align:center;max-width:9ch;overflow:hidden;
    text-overflow:ellipsis;white-space:nowrap;opacity:.8}

  /* clock — radial dial, centered in panel */
  .clock{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
  .clk-svg{width:auto;height:100%;min-height:0;max-height:min(38vh,280px);max-width:100%;overflow:visible}
  .clk-ring{fill:none;stroke:var(--rule);stroke-width:1}
  .clk-spoke{stroke:color-mix(in srgb,var(--ink) 24%,transparent);stroke-width:5;stroke-linecap:round;
    transform-origin:150px 150px;animation:spoke .7s var(--ease) both;animation-delay:calc(var(--i,0)*.02s)}
  .clk-spoke.peak{stroke:var(--green);stroke-width:6}
  .clk-tick{fill:var(--muted);font:500 10px/1 var(--font-mono);text-anchor:middle;dominant-baseline:middle;letter-spacing:.08em}
  .clk-core{fill:var(--ink);font:600 26px/1 var(--font-display,var(--font-serif));text-anchor:middle;dominant-baseline:middle}
  .clk-core-sub{fill:var(--muted);font:500 9px/1 var(--font-mono);text-anchor:middle;dominant-baseline:middle;letter-spacing:.14em;text-transform:uppercase}
  .clk-read{font-family:var(--font-hand);font-size:14px;color:var(--muted);rotate:-.5deg;text-align:center}
  .clk-read b{color:var(--green);font-style:normal}
  @keyframes spoke{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}

  /* lately — live medium-term strip, centered */
  .lately{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center}
  .lt-strip{display:flex;gap:clamp(8px,1.6vw,16px);flex-wrap:wrap;justify-content:center}
  .lt-art{flex:0 0 auto;width:clamp(66px,10vw,92px);text-align:center;animation:rise .5s var(--ease) both;animation-delay:calc(var(--i,0)*.05s)}
  .lt-art img,.lt-ph{width:100%;aspect-ratio:1;border-radius:10px;object-fit:cover;box-shadow:var(--shadow-sm);background:var(--paper2);display:block}
  .lt-name{display:block;font:500 10.5px/1.3 var(--font-mono);color:var(--ink);margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

  @keyframes barx{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes bary{from{height:0}}
  @keyframes rkpop{from{opacity:0;transform:scale(.4) translateY(4px)}to{opacity:1;transform:none}}

  /* the one-line read */
  .sofme{text-align:left;padding:clamp(12px,1.6vw,16px);background:var(--card);border:1px solid var(--rule);border-radius:14px}
  .sofme .lbl{display:inline-flex;align-items:center;gap:7px;font:600 9px/1 var(--font-mono);letter-spacing:.16em;
    text-transform:uppercase;color:var(--green);margin-bottom:8px}
  .sofme .read{font:500 clamp(14px,1.6vw,18px)/1.4 var(--font-display);color:var(--ink);text-wrap:balance}
  .sofme .read b{color:var(--green);font-weight:600}

  /* ============ MODE B — RADIO ============ */
  .radio{max-width:760px;margin:0 auto;min-height:60vh;color:#ece7dc}
  .faceplate{display:flex;align-items:center;gap:16px;padding:12px 18px;border:1px solid #2a2831;border-radius:12px;
    background:linear-gradient(#1a1920,#121117);box-shadow:inset 0 1px 0 #ffffff10,0 12px 30px -16px #000;margin-bottom:clamp(26px,5vh,52px)}
  .faceplate .fp-brand{font:800 15px/1 var(--font-display);letter-spacing:.04em;color:#f0ece2;
    text-transform:uppercase;white-space:nowrap}
  .faceplate .fp-dial{position:relative;flex:1;height:26px;border-radius:6px;background:
    repeating-linear-gradient(90deg,#3a3842 0 1px,transparent 1px 11px);border:1px solid #2a2831;overflow:hidden}
  .faceplate .fp-freq{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-around;
    font:600 8px/1 var(--font-mono);letter-spacing:.1em;color:#6f6b7a}
  .faceplate .fp-needle{position:absolute;top:-2px;bottom:-2px;left:62%;width:2px;background:#1DB954;box-shadow:0 0 8px #1DB954}
  .faceplate .fp-led{width:9px;height:9px;border-radius:50%;background:#1DB954;box-shadow:0 0 10px #1DB954;animation:pulseled 2.2s infinite}
  @keyframes pulseled{0%,100%{opacity:1}50%{opacity:.4}}

  .void{position:relative;min-height:44vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:8px}
  .void .ghost{position:absolute;top:2vh;left:50%;transform:translateX(-50%);font:700 clamp(40px,10vw,92px)/1 var(--font-display);
    color:#ffffff;opacity:.035;white-space:nowrap;pointer-events:none;max-width:120vw;overflow:hidden}
  .search{position:relative;width:min(560px,92%);text-align:center;margin-top:8vh}
  .search .hint{display:block;font-family:var(--font-hand);font-size:20px;color:#8a857b;margin-bottom:10px;rotate:-1deg}
  .search .qin{width:100%;background:transparent;border:none;border-bottom:1.5px solid #39363f;outline:none;text-align:center;
    color:#f4efe6;font:500 clamp(22px,4vw,34px)/1.3 var(--font-display);padding:6px 24px 10px;caret-color:#1DB954}
  .search .qin:focus{border-color:#1DB954}
  .search .caret{display:none}
  .sugg{list-style:none;width:min(560px,92%);margin-top:18px;display:flex;flex-direction:column}
  .sugg .s-note{color:#767166;font:500 12px/1 var(--font-mono);letter-spacing:.1em;text-align:center;padding:16px}
  .s-row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px;cursor:pointer;
    border-bottom:1px solid #211f27;transition:background .2s,padding-left .2s;color:#d8d2c7}
  .s-row.on{background:#ffffff0a;padding-left:20px}
  .s-txt{display:flex;align-items:baseline;gap:9px;min-width:0}
  .s-title{font:600 15px/1.2 var(--font-display);color:#f4efe6;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .s-sep{color:#5f5b53;flex:0 0 auto}
  .s-artist{font:500 12px/1 var(--font-mono);color:#908b80;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .s-src{flex:0 0 auto;display:flex;align-items:center}
  .rooms-note{position:absolute;bottom:0;left:50%;transform:translateX(-50%);text-align:center;
    font:500 9.5px/1.6 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:#5a564e;max-width:92%}
  a.rooms-note.link{text-decoration:none;color:#1DB954}

  /* playing: spotify lyric stage (fixed takeover) */
  .stage{position:fixed;inset:0;z-index:120;display:flex;flex-direction:column;align-items:center;
    background:radial-gradient(120% 90% at 50% 0%,var(--pal-bg,#0b0b0d),#050506 80%);color:var(--pal-fg,#f2ede3);
    padding:clamp(20px,5vh,54px) 20px;overflow:hidden;transition:background .6s var(--ease)}
  .stage .exit,.vstage .exit{position:absolute;top:18px;right:20px;z-index:3;background:#ffffff14;border:1px solid #ffffff20;
    color:inherit;cursor:pointer;border-radius:30px;padding:8px 14px;font:600 10px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase}
  .stage .exit:hover,.vstage .exit:hover{background:#ffffff26}
  .stage-head{display:flex;align-items:center;gap:16px;margin-bottom:clamp(16px,3vh,30px)}
  .stage-art,.vframe{}
  .stage-art{width:72px;height:72px;border-radius:9px;object-fit:cover;box-shadow:0 10px 30px -10px #000}
  .stage-src{display:flex;align-items:center;gap:8px;font:600 10px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;opacity:.82}
  .stage-title{font:700 clamp(22px,3.4vw,34px)/1.1 var(--font-display);text-wrap:balance}
  .stage-artist{font:500 13px/1 var(--font-mono);opacity:.8;margin-top:4px}
  .lyrics-wrap{flex:1;min-height:0;width:min(640px,94%);overflow:hidden;display:flex;flex-direction:column;justify-content:center;text-align:center;mask-image:linear-gradient(transparent,#000 8%,#000 92%,transparent)}
  .lyrics{list-style:none;padding:0;margin:auto 0;display:flex;flex-direction:column;gap:clamp(6px,1.2vh,12px)}
  .ly-line{font:600 clamp(16px,2.4vw,24px)/1.4 var(--font-display);color:currentColor;opacity:.32;padding:2px 0;transition:opacity .35s,color .35s,transform .35s}
  .ly-line.on{opacity:1;color:var(--pal-accent,#1DB954);transform:scale(1.04)}
  .ly-line.past{opacity:.5}
  .ly-plain{white-space:pre-wrap;font:500 13px/1.6 var(--font-body);opacity:.85;text-align:center;max-height:160px;overflow:hidden}
  .ly-note{font:500 13px/1.5 var(--font-mono);opacity:.7;padding:4vh 0}
  .ly-note a,.stage-open{color:var(--pal-accent,#1DB954)}
  .stage-open{margin-top:12px}

  /* playing: youtube video stage */
  .vstage{position:fixed;inset:0;z-index:120;background:#000;overflow:hidden}
  .vframe{position:absolute;inset:-6%;width:112%;height:112%;border:none;filter:blur(6px) saturate(.6) brightness(.5);
    animation:kb 30s ease-in-out infinite alternate}
  .vstage.reduced .vframe{filter:saturate(.7) brightness(.55);animation:none;inset:0;width:100%;height:100%}
  .vscrim{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 60%,transparent,#000 85%)}
  .voverlay{position:absolute;left:0;right:0;bottom:12vh;text-align:center;color:#f4efe6;z-index:2}
  @keyframes kb{from{transform:scale(1)}to{transform:scale(1.08)}}

  @media(prefers-reduced-motion:reduce){
    .onnow .eq i,.faceplate .fp-led{animation:none}
    .cd-row,.lt-art,.cd-fill,.era-fill,.clk-spoke,.vinyl-disc{animation:none}
    .cd.in .cd-row,.cd.in .cd-fill,.cd.in .cd-rk{animation:none}
    .cd-fill,.cd.in .cd-fill{transform:none}.era-fill{height:var(--w,0%)}
    .clk-spoke{opacity:1;transform:none}
    .tuner .tn-slide{transition:none}
    .vframe{animation:none}
    .ly-line{transition:opacity .08s}
  }
`

export function Sound() {
  const [params, setParams] = useSearchParams()
  const urlMode = params.get("mode")
  const initial: Mode =
    urlMode === "me" || urlMode === "radio"
      ? urlMode
      : ((typeof localStorage !== "undefined" && localStorage.getItem(STORE)) as Mode) || "me"
  const [mode, setMode] = useState<Mode>(initial)

  // one-screen contract: clamp the page to the viewport, clean up on leave
  useOneScreen()

  // keep URL + storage in sync with the active mode
  useEffect(() => {
    try {
      localStorage.setItem(STORE, mode)
    } catch {
      /* private mode / blocked storage — ignore */
    }
    if (params.get("mode") !== mode) {
      const next = new URLSearchParams(params)
      next.set("mode", mode)
      setParams(next, { replace: true })
    }
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="page p-sound" data-sound={mode}>
      <style>{CSS}</style>
      {mode === "radio" && <div className="void-bg" aria-hidden="true" />}

      <PlateHeader
        plate="Plate II"
        kicker="Listening Data"
        title={<>Eight years of <em className="hl">listening</em>.</>}
        note={mode === "me" ? "~ my sound" : "~ apna gaana bajao"}
        right={
          <div className="tuner-row" style={{ margin: 0 }}>
            <div className="tuner" data-on={mode} role="tablist" aria-label="sound mode">
              <button
                className="tn me"
                role="tab"
                aria-selected={mode === "me"}
                onClick={() => setMode("me")}
              >
                Me · My Sound
              </button>
              <button
                className="tn radio"
                role="tab"
                aria-selected={mode === "radio"}
                onClick={() => setMode("radio")}
              >
                Radio · Hostel
              </button>
              <span className="tn-slide" aria-hidden="true" />
            </div>
          </div>
        }
      />

      {mode === "me" ? <SoundMe /> : <Radio />}
    </main>
  )
}
