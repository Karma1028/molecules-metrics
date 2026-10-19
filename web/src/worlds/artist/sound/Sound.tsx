import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { SoundMe } from "./SoundMe"
import { Radio } from "./Radio"
import { useOneScreen } from "../../../hooks/useOneScreen"
import { PlateHeader } from "../../../components/headers/PlateHeader"
import { TwinDoor } from "../../../components/TwinDoor"

type Mode = "me" | "radio"
const STORE = "mm-sound-mode"

const CSS = String.raw`
  .p-sound{position:relative}
  /* radio mode drops the whole page into a near-black room */
  .void-bg{position:fixed;inset:0;z-index:0;background:
    radial-gradient(120% 90% at 50% 0%,#141217,#0a0a0c 70%)}
  .p-sound>*{position:relative;z-index:1}
  .p-sound>.void-bg{position:fixed;z-index:0}
  /* the page's own ink flips light inside the dark room */
  .p-sound[data-sound="radio"]{--ink:#f2ede3;--muted:#8f8a80;--rule:#2c2a33;--card:#16151a}
  .sound-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px}
  .sound-right .tuner-row{margin:0}

  /* ---- tuner / band-switch ---- */
  .tuner{position:relative;display:inline-flex;align-items:stretch;height:40px;width:300px;max-width:100%;box-sizing:border-box;
    border:1px solid var(--rule);border-radius:40px;padding:4px;background:var(--card);box-shadow:var(--shadow-sm);
    font:600 10px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase}
  .p-sound[data-sound="radio"] .tuner{background:#16151a;border-color:#2c2a33;color:#b9b3a6}
  .tuner{isolation:isolate}
  .tuner .tn{position:relative;z-index:2;flex:1 1 0;background:none;border:none;cursor:pointer;color:var(--muted);font:inherit;letter-spacing:inherit;
    padding:11px 10px;border-radius:34px;white-space:nowrap;transition:color .35s;text-align:center}
  .tuner .tn[aria-selected="true"]{color:#fff}
  .tuner .tn-slide{position:absolute;z-index:1;top:5px;bottom:5px;left:5px;width:calc(50% - 5px);border-radius:34px;
    background:var(--accent);box-shadow:0 2px 10px -2px color-mix(in srgb,var(--accent) 70%,transparent);
    transition:transform .4s var(--spring)}
  .p-sound[data-sound="radio"] .tuner .tn-slide{background:#1DB954;box-shadow:0 2px 12px -2px #1DB95488}
  .p-sound[data-sound="radio"] .tuner .tn.tn-radio[aria-selected="true"]{color:#06110a}
  .tuner[data-on="radio"] .tn-slide{transform:translateX(100%)}
  .tuner-row{display:flex;justify-content:center;margin:6px 0 clamp(26px,5vh,54px)}

  .sound-kick{text-align:center;color:var(--muted);font:500 10.5px/1.5 var(--font-mono);letter-spacing:.2em;
    text-transform:uppercase;margin-bottom:8px}
  .p-sound[data-sound="radio"] .sound-kick{color:#6f6a60}

  /* ============ MODE B: RADIO (full takeover, the room IS the page) ============ */
  .p-sound>.radio{z-index:auto}
  .radio{flex:1;min-height:0;width:100%;display:flex;flex-direction:column;gap:clamp(10px,2vh,20px);color:#ece7dc;touch-action:pan-y}
  .radio>*{position:relative;z-index:1}
  .radio>.room-scene{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
  .room-scene-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.92) brightness(.82)}
  .room-scrim{position:absolute;inset:0;background:
    linear-gradient(180deg,#07070ae6 0%,#07070a8c 22%,#07070a1f 46%,#07070a59 64%,#07070af2 100%),
    radial-gradient(120% 80% at 0% 100%,#07070acc,transparent 60%)}
  .room-scrim::after{content:"";position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
  .p-sound[data-sound="radio"] .plate-head{margin-bottom:0}
  .p-sound[data-sound="radio"] .ph-rule{display:none}
  .p-sound[data-sound="radio"] .ph-title{font-size:clamp(22px,2.4vw,30px);color:#f6f1e7}
  .p-sound[data-sound="radio"] .ph-note{color:#c9c2b4}

  .faceplate{display:flex;align-items:center;gap:16px;padding:10px 16px;border:1px solid #ffffff1f;border-radius:14px;
    background:#0c0c10a6;backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);
    box-shadow:inset 0 1px 0 #ffffff14,0 16px 40px -20px #000}
  .faceplate .fp-brand{font:800 15px/1 var(--font-display);letter-spacing:.04em;color:#f0ece2;text-transform:uppercase;white-space:nowrap}
  .faceplate .fp-dial{position:relative;flex:1;height:26px;border-radius:6px;background:
    repeating-linear-gradient(90deg,#ffffff1c 0 1px,transparent 1px 11px);border:1px solid #ffffff14;overflow:hidden}
  .faceplate .fp-freq{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    font:600 10px/1 var(--font-mono);letter-spacing:.1em;color:#9a95a3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 8px}
  .faceplate .fp-needle{position:absolute;top:-2px;bottom:-2px;left:62%;width:2px;background:#1DB954;box-shadow:0 0 8px #1DB954}

  .void{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:8px}
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
  .s-prev{font:600 10px/1 var(--font-mono,ui-monospace,monospace);letter-spacing:.08em;padding:3px 5px;border:1px solid currentColor;border-radius:4px;opacity:.7}

  /* tunable dial: five room stops + a needle that glides between them */
  .faceplate .fp-dial.tunable{height:38px;overflow:visible}
  .fp-dial.tunable .fp-needle{left:var(--pos);top:auto;bottom:-3px;height:9px;border-radius:2px;transform:translateX(-50%);transition:left .45s var(--ease)}
  .fp-dial.tunable .fp-needle::before{content:"";position:absolute;left:50%;top:-30px;width:1px;height:6px;background:#1DB954;transform:translateX(-50%)}
  /* the page chrome stays readable on top of the scene */
  .p-sound[data-sound="radio"] ~ .foot,body:has(.p-sound[data-sound="radio"]) .foot{position:relative;z-index:1;color:#bdb6a8;border-top-color:#ffffff1a}
  body:has(.p-sound[data-sound="radio"]) .foot a{color:#e6dfd1;border-color:#e6dfd155}
  .fp-stop{position:absolute;top:50%;left:var(--x);transform:translate(-50%,-50%);background:none;border:none;cursor:pointer;
    display:flex;flex-direction:column;align-items:center;gap:4px;padding:4px 6px;border-radius:4px;color:#8f8a99;white-space:nowrap}
  .fp-stop .fp-f{font:700 11px/1 var(--font-mono);letter-spacing:.06em}
  .fp-stop .fp-nm{font:600 10px/1 var(--font-mono);letter-spacing:.04em;text-transform:uppercase;opacity:.85}
  .fp-stop[aria-checked="true"]{color:#eafbe9}
  .fp-stop[aria-checked="true"] .fp-f{color:#1DB954}
  .fp-stop:hover{color:#d9d4c8}
  .fp-stop:focus-visible{outline:1.5px solid #1DB954;outline-offset:1px}
  .fp-band{display:flex;border:1px solid #ffffff1f;border-radius:8px;overflow:hidden;flex:0 0 auto}
  .fp-band button{background:none;border:none;cursor:pointer;padding:8px 11px;font:600 10px/1 var(--font-mono);
    letter-spacing:.12em;text-transform:uppercase;color:#9a95a3}
  .fp-band button[aria-selected="true"]{background:#1DB95429;color:#1DB954}

  /* rooms: caption bottom-left, track bottom-right, the scene behind everything */
  .rooms{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,400px);align-items:end;
    gap:clamp(14px,3vw,48px);padding-bottom:clamp(4px,1vh,12px)}
  .room-cap{display:flex;flex-direction:column;gap:clamp(6px,1.2vh,12px);min-width:0;text-shadow:0 2px 24px #000a}
  .room-freq{display:inline-flex;align-items:center;gap:8px;font:600 11px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:#1DB954}
  .room-led{width:8px;height:8px;border-radius:50%;background:#1DB954;box-shadow:0 0 10px #1DB954}
  .room-name{margin:0;font:800 clamp(44px,min(8.4vw,15vh),132px)/.9 var(--font-display);letter-spacing:-.035em;color:#f6f1e7;text-wrap:balance}
  .room-note{margin:0;padding:0;background:none;border:none;cursor:pointer;text-align:left;display:flex;flex-direction:column;align-items:flex-start;gap:4px;
    font-family:var(--font-hand);font-size:clamp(18px,2.2vw,28px);color:#e6dfd1;rotate:-.6deg;text-shadow:inherit}
  .rn-more{font:500 10px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:#8f8a80;rotate:.6deg;transition:color .2s var(--ease)}
  .room-note:hover .rn-more,.room-note:focus-visible .rn-more{color:#1DB954}
  .room-note:focus-visible{outline:1.5px solid #1DB954;outline-offset:4px;border-radius:4px}
  .room-kit{display:flex;gap:8px}
  .rk{flex:1;display:flex;align-items:baseline;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:10px;cursor:pointer;
    background:#0c0c10a6;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid #ffffff1f;color:#cfc8ba;
    transition:border-color .2s var(--ease),color .2s var(--ease)}
  .rk:hover,.rk:focus-visible{border-color:#1DB95499}
  .rk[aria-pressed="true"]{border-color:#1DB954;color:#eafbe9}
  .rk-k{font:600 10px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:#8f8a80}
  .rk-v{font:600 13px/1 var(--font-mono);font-variant-numeric:tabular-nums}
  .rk[aria-pressed="true"] .rk-v{color:#1DB954}
  .room-deck{display:flex;flex-direction:column;align-items:stretch;gap:8px;min-width:0}
  .room-play{display:flex;align-items:center;gap:12px;min-width:0;background:#0c0c10a6;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
    border:1px solid #ffffff1f;border-radius:14px;padding:12px 14px;cursor:pointer;color:#ece7dc;text-align:left;transition:border-color .2s var(--ease)}
  .room-play:hover,.room-play:focus-visible{border-color:#1DB954}
  .rp-btn{width:36px;height:36px;border-radius:50%;background:#1DB954;color:#06110a;display:grid;place-items:center;font-size:12px;flex:0 0 auto}
  .rp-txt{display:flex;flex-direction:column;gap:3px;min-width:0;flex:1}
  .rp-track{font:600 16px/1.15 var(--font-display);color:#f4efe6}
  .rp-artist{font:500 11px/1.35 var(--font-mono);color:#b3ada2;overflow-wrap:anywhere}
  .rp-full{font:600 9px/1 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:#1DB954;white-space:nowrap}
  .room-search{align-self:flex-end;background:none;border:none;cursor:pointer;color:#cfc8ba;font:500 11px/1 var(--font-mono);letter-spacing:.08em;
    text-decoration:underline;text-underline-offset:3px;padding:6px 0}
  .room-search:hover{color:#1DB954}
  @media(max-width:900px){
    .fp-stop .fp-nm{display:none}
    .faceplate .fp-dial.tunable{height:30px}
    .rooms{grid-template-columns:1fr;align-content:end}
  }
  @media(max-width:560px){
    .p-sound .plate-head{flex-direction:column;align-items:stretch;gap:8px}
    .p-sound .plate-head .ph-right,.sound-right{align-items:stretch;white-space:normal;text-align:left}
    .sound-right .tuner{width:100%}
    .p-sound[data-sound="radio"] .ph-note{display:none}
    .faceplate{flex-wrap:wrap;gap:8px 10px;padding:9px 12px}
    .faceplate .fp-dial{order:3;flex:1 0 100%}
    .room-name{font-size:clamp(40px,12vw,56px)}
    .room-note{font-size:18px}
    .room-play{padding:10px 12px}
  }

  /* me mode on a phone: the header gives the deck its room */
  @media(max-width:640px){
    .p-sound[data-sound="me"] .ph-rule{display:none}
    .p-sound[data-sound="me"] .ph-kick{margin-bottom:3px}
    .p-sound[data-sound="me"] .sound-right{gap:4px}
    .p-sound[data-sound="me"] .tuner{height:36px}
  }
  @media(prefers-reduced-motion:reduce){
    .tuner .tn-slide{transition:none}
    .fp-dial.tunable .fp-needle{transition:none}
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
          <div className="sound-right">
            <TwinDoor to="/analyst/dashboard" label="The numbers behind the playlist" world="analyst" />
            <div className="tuner-row">
              <div className="tuner" data-on={mode} role="tablist" aria-label="sound mode">
                <button
                  className="tn tn-me"
                  role="tab"
                  aria-selected={mode === "me"}
                  onClick={() => setMode("me")}
                >
                  Me · My Sound
                </button>
                <button
                  className="tn tn-radio"
                  role="tab"
                  aria-selected={mode === "radio"}
                  onClick={() => setMode("radio")}
                >
                  Radio · Hostel
                </button>
                <span className="tn-slide" aria-hidden="true" />
              </div>
            </div>
          </div>
        }
      />

      {mode === "me" ? <SoundMe /> : <Radio />}
    </main>
  )
}
