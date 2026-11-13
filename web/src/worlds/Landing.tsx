import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { HERO_STYLE } from "./heroAssets"
import { skyShift } from "../lib/sky-shift"
import { rememberTheme } from "../lib/theme"
import { KeepyUppy } from "../components/intro/KeepyUppy"

const HERO_BODY = String.raw`
  <div class="bg"></div><div class="halftone" aria-hidden="true"></div><div class="grain"></div>

  <svg class="sprite" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs>
    <symbol id="i-music" viewBox="0 0 24 24"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></symbol>
    <symbol id="i-ball" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7.3l4.2 3-1.6 5h-5.2l-1.6-5z"/><path d="M12 3v4.3M19.6 9.2l-3 1.1M16.6 15.3l2.7 3M7.4 15.3l-2.7 3M4.4 9.2l3 1.1"/></symbol>
    <symbol id="i-camera" viewBox="0 0 24 24"><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.4"/></symbol>
    <symbol id="i-pulse" viewBox="0 0 24 24"><path d="M2 12h4l2.5-7 4 14 2.5-7h7"/></symbol>
    <symbol id="i-scale" viewBox="0 0 24 24"><path d="M12 3v18M7 21h10M12 5l-7 2 3 6a3 3 0 0 1-6 0l3-6M12 5l7 2-3 6a3 3 0 0 0 6 0l-3-6"/></symbol>
    <symbol id="i-branch" viewBox="0 0 24 24"><circle cx="6" cy="5" r="2.4"/><circle cx="18" cy="12" r="2.4"/><circle cx="18" cy="19" r="2.4"/><path d="M6 7.4V17a2 2 0 0 0 2 2h7.6M6 9h5a3 3 0 0 1 3 3"/></symbol>
    <symbol id="i-funnel" viewBox="0 0 24 24"><path d="M3 4h18l-7 8v7l-4 2v-9z"/></symbol>
    <symbol id="i-scatter" viewBox="0 0 24 24"><path d="M4 3v18h18"/><path d="M7 17l5-4 3 2 5-6" stroke-dasharray="2 2"/><circle cx="7.5" cy="16" r="1.2"/><circle cx="11" cy="13.5" r="1.2"/><circle cx="14.5" cy="15" r="1.2"/><circle cx="18" cy="9.5" r="1.2"/></symbol>
    <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 3v18h18"/><rect x="7" y="11" width="3" height="7"/><rect x="12.5" y="7" width="3" height="11"/><rect x="18" y="13" width="3" height="5"/></symbol>
    <symbol id="i-headphone" viewBox="0 0 24 24"><path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="7" rx="1.6"/><rect x="17" y="13" width="4" height="7" rx="1.6"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></symbol>
  </defs></svg>

  <header class="top">
    <div>Tuhin Bhattacharya <b>&middot;</b> Field Notebook</div>
    <div class="right">Vol.01 &middot; Molecules &rarr; Metrics</div>
  </header>

  <button class="eclipse" id="eclipse" aria-label="toggle light / dark">
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g><line class="ray" x1="15" y1="0" x2="15" y2="4"/><line class="ray" x1="15" y1="26" x2="15" y2="30"/>
        <line class="ray" x1="0" y1="15" x2="4" y2="15"/><line class="ray" x1="26" y1="15" x2="30" y2="15"/>
        <line class="ray" x1="4.4" y1="4.4" x2="7.2" y2="7.2"/><line class="ray" x1="22.8" y1="22.8" x2="25.6" y2="25.6"/>
        <line class="ray" x1="25.6" y1="4.4" x2="22.8" y2="7.2"/><line class="ray" x1="7.2" y1="22.8" x2="4.4" y2="25.6"/></g>
      <clipPath id="tdisc"><circle cx="15" cy="15" r="9"/></clipPath>
      <g clip-path="url(#tdisc)"><circle class="core" cx="15" cy="15" r="9"/><circle class="cut" cx="15" cy="15" r="9"/></g>
    </svg>
  </button>

  <main class="stage">
    <section class="lead">
      <div class="issue"><span class="live"></span>Issue 01 &middot; Chem Eng &rarr; Data &middot; Goa</div>
      <h1>
        <span class="ln"><span style="--i:0">From</span></span>
        <span class="ln"><span style="--i:1"><em>molecules</em></span></span>
        <span class="ln"><span style="--i:2">to <span class="hand">metrics</span>.</span></span>
      </h1>
      <p class="sub">
        <span class="s artist">I photograph Goa, never miss a <b>Bar&ccedil;a</b> match and over-think every playlist. Everything pinned to the photo is <b>live</b>, pulled from the real thing, right now.</span>
        <span class="s analyst">Chemical engineer turned data analyst. <b>Data Science Intern at InfoLeap</b>, PGDM Big Data Analytics at GIM. Same instincts, new raw material.</span>
      </p>
      <div class="switch-row">
        <button class="switch" id="switch" aria-label="switch side: artist or analyst">
          <span class="thumb"></span><span class="opt opt-artist">Karma</span><span class="opt opt-analyst">Tuhin</span>
        </button>
        <span class="hint">one switch, <b>two sides</b> &#8634;</span>
      </div>
      <p class="thesis-line">Chemical engineer by training, analyst by trade, photographer by habit.<span class="thread">One thread, two weaves.</span></p>
      <nav class="elsewhere" aria-label="elsewhere">
        elsewhere &rarr;
        <a href="https://www.linkedin.com/in/tuhinbhattacharya28" target="_blank" rel="noopener">LinkedIn &#8599;</a>
        <a href="https://www.instagram.com/_threads_of_karma_/" target="_blank" rel="noopener">Instagram &#8599;</a>
        <a id="lnk-pinterest" href="#" target="_blank" rel="noopener" hidden>Pinterest &#8599;</a>
        <a id="lnk-spotify" href="#" target="_blank" rel="noopener" hidden>Spotify &#8599;</a>
        <a href="mailto:tuhin.bhattacharya25b@gim.ac.in">Email</a>
      </nav>
    </section>

    <figure class="portrait" id="portrait">
      <svg class="disc" viewBox="0 0 100 100" aria-hidden="true">
        <clipPath id="bdisc"><circle cx="50" cy="50" r="50"/></clipPath>
        <g clip-path="url(#bdisc)"><circle class="core" cx="50" cy="50" r="50"/><circle class="cut" cx="50" cy="50" r="50"/></g>
      </svg>

      <div class="print">
        <div class="ph base" role="img" aria-label="Tuhin, leaning on a sandstone wall"></div>
        <div class="ph plot"></div>
        <div class="sweep"></div>
        <span class="figcap"></span>
      </div>

      <svg class="kantha" id="kantha" aria-hidden="true">
        <defs><mask id="thread-m" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="6000"><path id="thread-mp"/></mask></defs>
        <path id="thread-u" mask="url(#thread-m)"/><path id="thread-p" mask="url(#thread-m)"/><g id="thread-k"></g>
        <g id="thread-n"><path d="M-9,0 L11,0" class="nd"/><ellipse cx="-6" cy="0" rx="2.2" ry="1.1" class="eye"/><path d="M-9,0 C-18,-3 -24,3 -34,0" class="tl"/></g>
      </svg>
      <svg class="leaders" id="leaders" aria-hidden="true"></svg>
      <span class="pin" data-for="n1" style="--x:41;--y:23">1</span>
      <span class="pin" data-for="n2" style="--x:56;--y:13">2</span>
      <span class="pin" data-for="n3" style="--x:60;--y:44">3</span>
      <span class="pin" data-for="n4" style="--x:75;--y:80">4</span>
      <span class="pin" data-for="n5" style="--x:50;--y:70">5</span>

      <div class="set artist" id="set-artist">
        <div class="scribble" aria-hidden="true">every bit, live
          <svg viewBox="0 0 52 30"><path d="M3 6 C18 2 30 10 44 20"/><path d="M44 20 L35 19 M44 20 L42 11"/></svg>
        </div>
        <a class="obj spot" id="spot" href="/artist/sound" data-depth="1.4" aria-label="music room">
          <div class="k"><svg class="ic"><use href="#i-music"/></svg><span class="dot" id="np-dot"></span><span id="np-k">spotify &middot; checking&hellip;</span></div>
          <div class="row">
            <div class="art" id="np-art">&#9834;</div>
            <div style="min-width:0"><div class="t" id="np-t">&mdash;</div><div class="a" id="np-a">&nbsp;</div></div>
            <div class="bars"><i></i><i></i><i></i><i></i></div>
          </div>
          <div class="foot" id="np-foot">&nbsp;</div>
        </a>

        <div class="obj mood" id="mood" data-depth="1.8" title="derived from real signals: IST clock, Spotify, Barca schedule">
          <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="ring" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"/></defs>
            <text><textPath href="#ring">right now &middot; right now &middot; right now &middot; right now &middot;</textPath></text></svg>
          <div><svg class="ic mood-ic" id="mood-ic"><use href="#i-headphone"/></svg><div class="w" id="mood-w">&hellip;</div><div class="sig" id="mood-sig">reading signals</div></div>
        </div>

        <a class="obj barca" id="barca" href="/artist/matchday" data-depth="1.1" aria-label="matchday room">
          <span class="tape"></span>
          <svg class="stamp" viewBox="0 0 42 42" aria-hidden="true">
            <circle class="ring" cx="21" cy="21" r="19"/><circle class="ring" cx="21" cy="21" r="15"/>
            <defs><path id="st" d="M21 21 m-11 0 a11 11 0 1 1 22 0 a11 11 0 1 1 -22 0"/></defs>
            <text><textPath href="#st">&middot; MATCHDAY &middot; CAMP NOU </textPath></text>
          </svg>
          <div class="stub"><span>For&ccedil;a Bar&ccedil;a</span></div>
          <div class="body">
            <div class="k"><svg class="ic"><use href="#i-ball"/></svg><span class="dot" id="fx-dot"></span><span id="fx-k">next &middot; loading</span></div>
            <div class="vs" id="fx-vs">&mdash;</div>
            <div class="when" id="fx-when">&nbsp;</div>
            <div class="cd" id="fx-cd">&nbsp;</div>
            <div class="last"><span class="res" id="fx-res">&middot;</span><span id="fx-last">last result loading</span></div>
          </div>
        </a>

        <a class="obj pola" id="pola" href="/artist/gallery" data-depth="1.6" aria-label="my photographs, rotating">
          <span class="tape"></span>
          <div class="sprocket t"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="win" id="win"><div class="shutter"></div></div>
          <div class="sprocket b"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="cap"><b id="pola-name">&mdash;</b><span class="pn"><svg class="ic"><use href="#i-camera"/></svg><span id="pola-n">01/10</span></span></div>
        </a>
      </div>

      <div class="set analyst" id="set-analyst">
        <div class="obj note n1" id="n1" style="--i:0">
          <div class="k"><svg class="ic"><use href="#i-scale"/></svg>01 &middot; analytical rigor</div>
          <h3>If it doesn't reconcile, something's leaking.</h3>
          <svg class="dia" viewBox="0 0 120 46" aria-hidden="true">
            <path data-draw pathLength="1" d="M24 12 H96"/><path data-draw pathLength="1" d="M60 12 V33"/>
            <path data-draw pathLength="1" d="M50 33 H70 L60 24 Z"/>
            <path data-draw pathLength="1" d="M24 12 V19 M16 19 a8 4 0 0 0 16 0"/>
            <path data-draw pathLength="1" d="M96 12 V19 M88 19 a8 4 0 0 0 16 0"/>
            <circle data-pop cx="24" cy="20" r="3"/><circle data-pop cx="96" cy="20" r="3"/>
          </svg>
          <div class="from">&larr; mass &amp; energy balances</div>
        </div>
        <div class="obj note n2" id="n2" style="--i:1">
          <div class="k"><svg class="ic"><use href="#i-branch"/></svg>02 &middot; problem decomposition</div>
          <h3>One messy question &rarr; five small, testable ones.</h3>
          <svg class="dia" viewBox="0 0 120 46" aria-hidden="true">
            <path data-draw pathLength="1" d="M26 23 C58 23 62 6 96 6"/><path data-draw pathLength="1" d="M26 23 C58 23 62 15 96 15"/>
            <path data-draw pathLength="1" d="M26 23 H96"/><path data-draw pathLength="1" d="M26 23 C58 23 62 31 96 31"/>
            <path data-draw pathLength="1" d="M26 23 C58 23 62 40 96 40"/>
            <circle data-pop cx="20" cy="23" r="4"/>
            <circle data-pop cx="100" cy="6" r="2.6"/><circle data-pop cx="100" cy="15" r="2.6"/><circle data-pop cx="100" cy="23" r="2.6"/><circle data-pop cx="100" cy="31" r="2.6"/><circle data-pop cx="100" cy="40" r="2.6"/>
          </svg>
          <div class="from">&larr; process design, unit by unit</div>
        </div>
        <div class="obj note n3" id="n3" style="--i:2">
          <div class="k"><svg class="ic"><use href="#i-funnel"/></svg>03 &middot; process &amp; optimisation</div>
          <h3>Every system is a pipeline. Find the bottleneck, then tune it.</h3>
          <svg class="dia" viewBox="0 0 120 46" aria-hidden="true">
            <path data-draw pathLength="1" d="M14 10 H54 L66 20 H106"/><path data-draw pathLength="1" d="M14 36 H54 L66 26 H106"/>
            <path data-flow d="M14 23 H106"/>
            <circle data-pop cx="60" cy="23" r="3.4"/>
          </svg>
          <div class="from">&larr; reactors &amp; separation trains</div>
        </div>
        <div class="obj note n4" id="n4" style="--i:3">
          <div class="k"><svg class="ic"><use href="#i-scatter"/></svg>04 &middot; statistical modelling</div>
          <h3>Pick the model for the question, not the hype.</h3>
          <svg class="dia" viewBox="0 0 120 46" aria-hidden="true">
            <path data-draw pathLength="1" d="M16 6 V40 H112"/>
            <path data-draw pathLength="1" d="M22 37 L104 11"/>
            <circle data-pop cx="30" cy="33" r="2"/><circle data-pop cx="44" cy="30" r="2"/><circle data-pop cx="58" cy="25" r="2"/><circle data-pop cx="74" cy="22" r="2"/><circle data-pop cx="88" cy="16" r="2"/><circle data-pop cx="100" cy="14" r="2"/>
          </svg>
          <div class="from">&larr; regression &rarr; random forest &rarr; XGBoost</div>
        </div>
        <div class="obj note n5" id="n5" style="--i:4">
          <div class="k"><svg class="ic"><use href="#i-chart"/></svg>05 &middot; storytelling with data</div>
          <h3>A chart is done when someone decides something with it.</h3>
          <svg class="dia" viewBox="0 0 120 46" aria-hidden="true">
            <path data-draw pathLength="1" d="M14 6 V40 H84"/>
            <path data-draw pathLength="1" d="M26 40 V30 M42 40 V22 M58 40 V14 M74 40 V26"/>
            <path data-draw pathLength="1" d="M88 23 H100"/><path data-draw pathLength="1" d="M102 20 l3.4 4.6 L113 13"/>
          </svg>
          <div class="from">&larr; plant reports &rarr; BI dashboards</div>
        </div>
      </div>
    </figure>
  </main>

  <a class="scrollcue" id="enter" href="/artist">enter <b>Karma</b>, the artist <i>&rarr;</i></a>
`

/** Runs the hero's imperative logic once mounted. Returns a cleanup fn. */
function initHero(spa: (path: string) => void): () => void {
  const root = document.documentElement
  const $ = (s: string) => document.querySelector<HTMLElement>(s)
  const $$ = (s: string) => [...document.querySelectorAll<HTMLElement>(s)]
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
  const LABEL: Record<string, string> = { artist: "Karma", analyst: "Tuhin" }
  const SIDE: Record<string, string> = { artist: "the artist", analyst: "the analyst" }

  // cleanup trackers
  const ivs: number[] = []
  const wins: Array<[string, EventListener]> = []
  let raf = 0
  const SI = (f: () => void, m: number) => {
    const id = window.setInterval(f, m)
    ivs.push(id)
    return id
  }
  const ON = (t: string, f: EventListener) => {
    window.addEventListener(t, f)
    wins.push([t, f])
  }

  const LINKS: Record<string, string> = { pinterest: "", spotify: "" }
  for (const k in LINKS) {
    if (LINKS[k]) {
      const a = $("#lnk-" + k) as HTMLAnchorElement | null
      if (a) {
        a.href = LINKS[k]
        a.hidden = false
      }
    }
  }

  function setTheme(t: string) {
    root.dataset.theme = t
    try {
      localStorage.setItem("nb-theme", t)
      if (t === "light" || t === "dark") rememberTheme(root.dataset.mode === "analyst" ? "analyst" : "artist", t)
    } catch {
      /* ignore */
    }
    requestAnimationFrame(() => drawLeaders(false))
  }
  try {
    const t = localStorage.getItem("nb-theme")
    if (t) root.dataset.theme = t
  } catch {
    /* ignore */
  }
  const eclipse = $("#eclipse")
  const onEclipse = () => {
    const n = root.dataset.theme === "dark" ? "light" : "dark"
    skyShift({ toDark: n === "dark", reduce, flip: () => setTheme(n) })
  }
  eclipse?.addEventListener("click", onEclipse)

  function replay(set: HTMLElement | null) {
    if (!set) return
    set.classList.remove("in")
    void set.offsetWidth
    set.classList.add("in")
  }
  const LEADER_SETTLE_MS = 1500
  let leaderTimer = 0
  function setMode(m: string, first?: boolean) {
    root.dataset.mode = m
    try {
      localStorage.setItem("nb-mode", m)
    } catch {
      /* ignore */
    }
    $("#switch")?.setAttribute("aria-pressed", String(m === "analyst"))
    const en = $("#enter") as HTMLAnchorElement | null
    if (en) {
      en.setAttribute("href", "/" + m)
      en.innerHTML = `enter <b>${LABEL[m]}</b>, ${SIDE[m]} <i>&rarr;</i>`
    }
    replay($("#set-" + m))
    const pr = document.querySelector<HTMLElement>(".print")
    if (pr && !first && !reduce) {
      pr.classList.remove("advance")
      void pr.offsetWidth
      pr.classList.add("advance")
    }
    window.clearTimeout(leaderTimer)
    // the cards slap in with a transform; measure them again once they have landed
    leaderTimer = window.setTimeout(() => drawLeaders(false), LEADER_SETTLE_MS)
    requestAnimationFrame(() => {
      drawLeaders(!first)
      // first visit: stitch once the cover's entrance has placed the photo and objects
      drawThread(true, first ? THREAD_FIRST_MS : THREAD_SETTLE_MS)
    })
  }
  try {
    const m = localStorage.getItem("nb-mode")
    if (m) root.dataset.mode = m
  } catch {
    /* ignore */
  }
  {
    const m = root.dataset.mode || "artist"
    const en = $("#enter") as HTMLAnchorElement | null
    if (en) {
      en.setAttribute("href", "/" + m)
      en.innerHTML = `enter <b>${LABEL[m]}</b>, ${SIDE[m]} <i>&rarr;</i>`
    }
  }
  function runSwitch() {
    setMode(root.dataset.mode === "artist" ? "analyst" : "artist")
  }
  // SPA-navigate when entering a world (intercept the scrollcue link)
  $("#enter")?.addEventListener("click", (e) => {
    e.preventDefault()
    spa("/" + (root.dataset.mode || "artist"))
  })
  $("#switch")?.addEventListener("click", runSwitch)

  function drawLeaders(animate: boolean) {
    const svg = $("#leaders")
    const portrait = $("#portrait")
    if (!svg || !portrait) return
    const P = portrait.getBoundingClientRect()
    if (getComputedStyle(svg).display === "none") return
    let out = ""
    $$(".pin").forEach((pin) => {
      const n = document.getElementById(pin.dataset.for || "")
      if (!n) return
      const a = pin.getBoundingClientRect()
      const b = n.getBoundingClientRect()
      const ax = a.left + a.width / 2 - P.left
      const ay = a.top + a.height / 2 - P.top
      const toRight = b.left + b.width / 2 > a.left
      const bx = (toRight ? b.left : b.right) - P.left
      const by = Math.min(Math.max(ay, b.top - P.top + 18), b.bottom - P.top - 18)
      const mx = ax + (bx - ax) * 0.55
      out += `<path d="M${ax},${ay} L${mx},${ay} L${bx},${by}"/><circle cx="${bx}" cy="${by}" r="2.6"/>`
    })
    svg.innerHTML = out
    if (root.dataset.mode === "analyst")
      svg.querySelectorAll<SVGPathElement>("path").forEach((p) => {
        const L = p.getTotalLength()
        p.style.strokeDasharray = String(L)
        if (animate && !reduce) {
          p.style.transition = "none"
          p.style.strokeDashoffset = String(L)
          p.getBoundingClientRect()
          p.style.transition = ""
        }
        p.style.strokeDashoffset = "0"
      })
  }
  ON("resize", () => {
    drawLeaders(false)
    drawThread(false)
  })

  /* The kantha thread: one running stitch from the switch through every
     object of the current world. Flipping Karma/Tuhin re-stitches it. */
  const THREAD_MS = 1100
  const THREAD_SETTLE_MS = 420 // let the set's entrance place the objects first
  const THREAD_FIRST_MS = 1500
  const MERGE_PX = 48
  let threadAnim: Animation | null = null
  let needleAnim: Animation | null = null
  let threadTimer = 0
  function threadPoints(): Array<[number, number]> {
    const stage = $(".stage")
    const sw = $("#switch")
    const portrait = $("#portrait")
    if (!stage || !sw || !portrait) return []
    const S = stage.getBoundingClientRect()
    const P = portrait.getBoundingClientRect()
    const mid = (r: DOMRect): [number, number] => [r.left + r.width / 2 - S.left, r.top + r.height / 2 - S.top]
    const analyst = root.dataset.mode === "analyst"
    // analyst stitches the numbered pins in order (they sit on the photo, never on card text);
    // artist stitches the collage cards, taken clockwise round the portrait so it never doubles back
    const live = (r: DOMRect) => r.width > 0 && r.height > 0
    const rest = $$(analyst ? ".pin" : ".set.artist .obj")
      .map((el) => el.getBoundingClientRect())
      .filter(live)
      .map(mid)
      .filter(([x, y], i, all) => all.slice(0, i).every(([px, py]) => Math.hypot(x - px, y - py) > MERGE_PX))
    const sr = sw.getBoundingClientRect()
    const [cx, cy] = mid(P)
    const side = sr.right + 24 < P.left // wide layout: the switch sits left of the photo
    let path: Array<[number, number]>
    if (side) {
      // leave the switch along the empty band beside it, then enter the photo at the same height
      const y = sr.top + sr.height / 2 - S.top
      // the "one switch, two sides" hint sits right of the switch: start the stitch after it, not through it
      const hint = $(".hint")?.getBoundingClientRect()
      const startX = Math.max(sr.right, hint && hint.width > 0 ? hint.right + 10 : 0)
      path = [[startX - S.left, y], [(startX + P.left) / 2 - S.left, y], [P.left - S.left + 14, y]]
      if (!analyst) {
        const ang = ([x, y2]: [number, number]) => (Math.atan2(y2 - cy, x - cx) - Math.PI + 2 * Math.PI) % (2 * Math.PI)
        rest.sort((a2, b2) => ang(a2) - ang(b2))
      }
      path.push(...rest)
    } else {
      // stacked layout (switch above the photo): start at the photo's top edge, nearest-neighbour walk
      const [sx, sy] = mid(sr)
      path = [sy < 0 && sx > 0 && sx < S.width ? [sx, 0] : [sx, sy]]
      while (rest.length) {
        const [lx, ly] = path[path.length - 1]
        let best = 0
        rest.forEach(([x, y], i) => {
          const [bx, by] = rest[best]
          if (Math.hypot(x - lx, y - ly) < Math.hypot(bx - lx, by - ly)) best = i
        })
        path.push(rest.splice(best, 1)[0])
      }
    }
    // the thread lives inside the photo box, so express every stitch relative to it
    return path.map(([x, y]) => [x - (P.left - S.left), y - (P.top - S.top)] as [number, number])
  }
  function smoothPath(p: Array<[number, number]>): string {
    // Catmull-Rom through the stitch points, as cubic Béziers
    let d = `M${p[0][0]},${p[0][1]}`
    for (let i = 0; i < p.length - 1; i++) {
      const [x0, y0] = p[Math.max(i - 1, 0)]
      const [x1, y1] = p[i]
      const [x2, y2] = p[i + 1]
      const [x3, y3] = p[Math.min(i + 2, p.length - 1)]
      d += ` C${x1 + (x2 - x0) / 6},${y1 + (y2 - y0) / 6} ${x2 - (x3 - x1) / 6},${y2 - (y3 - y1) / 6} ${x2},${y2}`
    }
    return d
  }
  function drawThread(animate: boolean, delay = THREAD_SETTLE_MS) {
    window.clearTimeout(threadTimer)
    const run = () => {
      const p = $("#thread-p")
      const u = $("#thread-u")
      const mp = $("#thread-mp") as unknown as SVGPathElement | null
      const knots = $("#thread-k")
      const needle = $("#thread-n") as unknown as SVGGElement | null
      if (!p || !u || !mp || !knots || !needle) return
      const pts = threadPoints()
      if (pts.length < 2) return
      const d = smoothPath(pts)
      p.setAttribute("d", d)
      u.setAttribute("d", d)
      mp.setAttribute("d", d)
      // a French knot at every card: ring, then a fat bead
      knots.innerHTML = pts
        .slice(1)
        .map(([x, y]) => `<circle class="ring" cx="${x}" cy="${y}" r="5.2"/><circle cx="${x}" cy="${y}" r="3.1"/>`)
        .join("")
      const L = mp.getTotalLength()
      mp.style.strokeDasharray = String(L)
      needleAnim?.cancel()
      threadAnim?.cancel()
      needle.style.offsetPath = `path("${d}")`
      if (!animate || reduce) {
        mp.style.strokeDashoffset = "0"
        knots.style.opacity = "1"
        needle.style.opacity = "0"
        return
      }
      knots.style.opacity = "0"
      needle.style.opacity = "1"
      const timing = { duration: THREAD_MS, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" as const }
      threadAnim = mp.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], timing)
      // the needle rides the stitch it is drawing, then lifts away
      needleAnim = needle.animate([{ offsetDistance: "0%" }, { offsetDistance: "100%" }], timing)
      threadAnim.onfinish = () => {
        knots.style.opacity = "1"
        needle.style.opacity = "0"
      }
    }
    if (animate && !reduce) threadTimer = window.setTimeout(run, delay)
    else run()
  }

  // rotating frames
  const LOCAL_FRAMES = [
    ["ridge", "ridge line"],
    ["lantern-street", "lantern street"],
    ["blue-beams", "blue beams"],
    ["dawn-sun", "dawn"],
    ["lake", "still lake"],
    ["night-ride", "night ride"],
    ["doorway", "doorway"],
    ["yellow-leaves", "yellow leaves"],
    ["hazy-tree", "haze"],
    ["orange-sun", "orange sun"],
  ].map(([f, name]) => ({ url: `/frames/${f}.webp`, name }))
  const win = $("#win")!
  let FR = LOCAL_FRAMES
  let imgs: HTMLImageElement[] = []
  let fi = 0
  let frTimer = 0
  function buildImgs() {
    win.querySelectorAll("img").forEach((im) => im.remove())
    imgs = FR.map((fr) => {
      const im = new Image()
      im.src = fr.url
      im.alt = fr.name
      im.decoding = "async"
      win.appendChild(im)
      return im
    })
  }
  function showFrame(i: number, snap?: boolean) {
    const go = () => {
      imgs.forEach((im, j) => im.classList.toggle("cur", j === i))
      const nm = $("#pola-name")
      const nn = $("#pola-n")
      if (nm) nm.textContent = FR[i].name
      if (nn) nn.textContent = String(i + 1).padStart(2, "0") + "/" + FR.length
    }
    if (snap && !reduce) {
      const p = $("#pola")!
      p.classList.remove("snap")
      void p.offsetWidth
      p.classList.add("snap")
      window.setTimeout(go, 230)
    } else go()
  }
  function startFrames() {
    if (!FR.length) FR = LOCAL_FRAMES
    fi = Math.floor(Date.now() / 5200) % FR.length
    buildImgs()
    showFrame(fi, false)
    window.clearInterval(frTimer)
    if (reduce) return // one still frame, no slideshow
    frTimer = window.setInterval(() => {
      if (document.hidden) return
      fi = (fi + 1) % FR.length
      showFrame(fi, true)
    }, 5200)
    ivs.push(frTimer)
  }
  startFrames()
  ;(async () => {
    try {
      const r = await fetch("/api/frames")
      const d = await r.json()
      if (d && Array.isArray(d.frames) && d.frames.length) {
        FR = d.frames.map((f: { url: string; name: string }) => ({ url: f.url, name: f.name }))
        startFrames()
      }
    } catch {
      /* keep local */
    }
  })()

  // live data
  const S: { np: Record<string, unknown> | null; fx: Record<string, unknown> | null } = { np: null, fx: null }
  const ago = (t: number) => {
    const m = Math.round((Date.now() - t) / 60000)
    if (m < 1) return "just now"
    if (m < 60) return m + " min ago"
    const h = Math.round(m / 60)
    return h < 24 ? h + " h ago" : Math.round(h / 24) + " d ago"
  }
  const istFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false })
  const istHM = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())
  const setTxt = (id: string, t: string) => {
    const el = $(id)
    if (el) el.textContent = t
  }

  async function loadSpotify() {
    const spot = $("#spot") as HTMLAnchorElement | null
    try {
      const r = await fetch("/api/now-playing", { cache: "no-store" })
      const d = await r.json()
      if (!r.ok || d.error) throw 0
      if (!d.configured) {
        S.np = { state: "off" }
        setTxt("#np-k", "spotify · not connected yet")
        setTxt("#np-t", "awaiting the token")
        setTxt("#np-a", "last-played feed wires in here")
        setTxt("#np-foot", "")
        spot?.setAttribute("href", "/artist/sound")
        spot?.removeAttribute("target")
        spot?.classList.remove("playing")
        return
      }
      if (!d.title) {
        S.np = { state: "empty" }
        setTxt("#np-k", "spotify · quiet lately")
        setTxt("#np-t", "nothing in the history")
        return
      }
      S.np = { state: d.isPlaying ? "playing" : "last", at: d.playedAt ? Date.parse(d.playedAt) : Date.now(), title: d.title, artist: d.artist }
      spot?.classList.toggle("playing", d.isPlaying)
      $("#np-dot")?.classList.toggle("live", d.isPlaying)
      setTxt("#np-k", d.isPlaying ? "now playing · spotify" : "last played · " + ago(S.np.at as number))
      setTxt("#np-t", d.title)
      setTxt("#np-a", d.artist)
      const art = $("#np-art")
      if (art && d.art) {
        art.style.backgroundImage = `url(${d.art})`
        art.textContent = ""
      }
      if (d.url && spot) {
        spot.href = d.url
        spot.target = "_blank"
      }
      setTxt("#np-foot", d.isPlaying ? "on repeat, probably." : "")
    } catch {
      S.np = { state: "off" }
      setTxt("#np-k", "spotify · feed offline")
      setTxt("#np-t", "couldn't reach the feed")
      setTxt("#np-a", "retrying shortly")
    } finally {
      updateMood()
    }
  }

  async function getBarca() {
    try {
      const r = await fetch("/api/barca", { cache: "no-store" })
      if (r.ok) {
        const d = await r.json()
        if (!d.error) return d
      }
    } catch {
      /* fall through */
    }
    const base = "https://www.thesportsdb.com/api/v1/json/123/"
    const id = 133739
    const [l, n] = await Promise.all([
      fetch(base + "eventslast.php?id=" + id).then((r) => r.json()),
      fetch(base + "eventsnext.php?id=" + id).then((r) => r.json()),
    ])
    return { last: (l.results || [])[0], next: (n.events || [])[0] }
  }
  const short = (t: string) => (t === "Barcelona" ? "Barça" : t)
  async function loadBarca() {
    try {
      const d = await getBarca()
      S.fx = d
      if (d.next && d.next.strTimestamp) {
        const ko = Date.parse(d.next.strTimestamp + "Z")
        setTxt("#fx-vs", `${short(d.next.strHomeTeam)} v ${short(d.next.strAwayTeam)}`)
        setTxt("#fx-when", `${(d.next.strLeague || "").replace("UEFA ", "")} · ${istFmt.format(ko)} IST`)
        ;(S.fx as Record<string, unknown>).ko = ko
      }
      if (d.last) {
        const L = d.last
        const home = L.strHomeTeam === "Barcelona"
        const us = +(home ? L.intHomeScore : L.intAwayScore)
        const them = +(home ? L.intAwayScore : L.intHomeScore)
        const res = us > them ? "W" : us < them ? "L" : "D"
        const opp = home ? L.strAwayTeam : L.strHomeTeam
        const rEl = $("#fx-res")
        if (rEl) {
          rEl.textContent = res
          rEl.className = "res " + res
        }
        setTxt("#fx-last", `last: Barça ${us}–${them} ${opp}`)
        const fx = S.fx as Record<string, unknown>
        fx.res = res
        fx.lastAt = Date.parse(L.strTimestamp + "Z")
        fx.score = `${us}–${them}`
      }
      tickCountdown()
    } catch {
      setTxt("#fx-k", "fixtures · feed offline")
      setTxt("#fx-vs", "Força Barça")
      setTxt("#fx-when", "retrying shortly")
    } finally {
      updateMood()
    }
  }
  function tickCountdown() {
    const fx = S.fx as Record<string, number> | null
    if (!fx || !fx.ko) return
    const ms = fx.ko - Date.now()
    const live = ms <= 0 && ms > -115 * 60000
    $("#fx-dot")?.classList.toggle("live", live || ms < 6 * 3600e3)
    setTxt("#fx-k", live ? "LIVE · right now" : "next · kick-off")
    if (live) {
      setTxt("#fx-cd", "● in play · refresh for the score")
      return
    }
    if (ms < 0) {
      setTxt("#fx-cd", "full time · result updating")
      return
    }
    const d = Math.floor(ms / 864e5)
    const h = Math.floor((ms % 864e5) / 36e5)
    const m = Math.floor((ms % 36e5) / 6e4)
    const s = Math.floor((ms % 6e4) / 1e3)
    setTxt("#fx-cd", `in ${d ? d + "d " : ""}${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`)
  }
  SI(tickCountdown, 1000)

  function updateMood() {
    const now = Date.now()
    const h = +new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false }).format(new Date())
    const fx = (S.fx || {}) as Record<string, number & string>
    const np = (S.np || {}) as Record<string, string & number>
    let w: string, sig: string
    const toKo = fx.ko ? fx.ko - now : Infinity
    if (toKo <= 0 && toKo > -115 * 60000) {
      w = "matchday. do not disturb"
      sig = "signal: Barça live"
    } else if (toKo > 0 && toKo < 6 * 3600e3) {
      w = "pre-match nerves"
      sig = "signal: kick-off in " + Math.ceil(toKo / 36e5) + "h"
    } else if (fx.lastAt && now - fx.lastAt < 20 * 3600e3 && fx.res === "W") {
      w = "still smiling about " + fx.score
      sig = "signal: last Barça result"
    } else if (fx.lastAt && now - fx.lastAt < 20 * 3600e3 && fx.res === "L") {
      w = "not talking about it"
      sig = "signal: last Barça result"
    } else if (np.state === "playing") {
      w = "headphones on"
      sig = "signal: spotify, live"
    } else if (h < 5) {
      w = "night owl"
      sig = "signal: " + istHM() + " IST"
    } else if (h < 8) {
      w = "chasing first light"
      sig = "signal: " + istHM() + " IST"
    } else if (h < 18) {
      w = "deep in the data"
      sig = "signal: " + istHM() + " IST"
    } else if (h < 20) {
      w = "golden-hour walk"
      sig = "signal: " + istHM() + " IST"
    } else {
      w = "over-thinking the playlist"
      sig = "signal: " + istHM() + " IST"
    }
    const el = $("#mood-w")
    if (el && el.textContent !== w) {
      el.animate?.([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 400, easing: "ease-out" })
      el.textContent = w
    }
    setTxt("#mood-sig", sig)
    const ico =
      sig.includes("Barça") || sig.includes("kick-off")
        ? "i-ball"
        : np.state === "playing"
          ? "i-headphone"
          : h < 5
            ? "i-clock"
            : (h >= 5 && h < 8) || (h >= 18 && h < 20)
              ? "i-camera"
              : "i-pulse"
    document.querySelector("#mood-ic use")?.setAttribute("href", "#" + ico)
  }
  SI(updateMood, 60000)

  loadSpotify()
  loadBarca()
  SI(() => !document.hidden && loadSpotify(), 30000)
  SI(() => !document.hidden && loadBarca(), 10 * 60000)

  // parallax — ONLY the big portrait drifts (double-exposure depth).
  // Cards no longer move as a group: each one reacts on its own :hover (CSS).
  if (!reduce && matchMedia("(min-width:901px) and (pointer:fine)").matches) {
    const print = document.querySelector<HTMLElement>(".print")
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0
    ON("mousemove", ((e: MouseEvent) => {
      tx = e.clientX / innerWidth - 0.5
      ty = e.clientY / innerHeight - 0.5
    }) as EventListener)
    const loop = () => {
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      if (print) print.style.translate = `${cx * 5}px ${cy * 4}px`
      raf = requestAnimationFrame(loop)
    }
    loop()
  }

  // signature hover-reveal — focus the portrait, scatter + desaturate the rest.
  // pointer:fine → hover; touch → tap-toggle. Reduced-motion still toggles (CSS kills the transition → instant).
  const portrait = $("#portrait")
  const fine = matchMedia("(pointer:fine)").matches
  const reveal = (on: boolean) => root.toggleAttribute("data-reveal", on)

  // The collage cards (.obj) are children of the portrait, so a plain mouseenter would keep
  // revealing while the pointer is on a card. Use bubbling mouseover to decide per-target:
  // on a card → suppress the reveal (the card runs its own :hover pickup); on the bare image → reveal.
  const onOver = (e: Event) => {
    // a live collage card (.obj, but not a reveal annotation .note) → suppress reveal so the card
    // runs its own :hover pickup; the bare portrait (or a .note during reveal) → keep revealing.
    const card = (e.target as HTMLElement).closest(".obj")
    const on = !(card && !card.classList.contains("note"))
    reveal(on)
  }
  const onLeave = () => reveal(false)
  const onTap = (e: Event) => {
    // ignore taps that land on any card inside the figure
    if ((e.target as HTMLElement).closest(".obj")) return
    reveal(!root.hasAttribute("data-reveal"))
  }
  if (portrait) {
    if (fine) {
      portrait.addEventListener("mouseover", onOver)
      portrait.addEventListener("mouseleave", onLeave)
    } else {
      portrait.addEventListener("click", onTap)
    }
  }

  // boot — ?theme / ?mode overrides
  const Q = new URLSearchParams(location.search)
  const qt = Q.get("theme")
  const qm = Q.get("mode")
  if (qt === "light" || qt === "dark") root.dataset.theme = qt
  if (qm === "artist" || qm === "analyst") root.dataset.mode = qm
  setMode(root.dataset.mode || "artist", true)
  document.fonts?.ready.then(() => drawLeaders(false))

  return () => {
    ivs.forEach((id) => clearInterval(id))
    window.clearTimeout(threadTimer)
    window.clearTimeout(leaderTimer)
    threadAnim?.cancel()
    wins.forEach(([t, f]) => window.removeEventListener(t, f))
    if (raf) cancelAnimationFrame(raf)
    eclipse?.removeEventListener("click", onEclipse)
    if (portrait) {
      portrait.removeEventListener("mouseover", onOver)
      portrait.removeEventListener("mouseleave", onLeave)
      portrait.removeEventListener("click", onTap)
    }
    root.removeAttribute("data-reveal")
  }
}

export function Landing() {
  const hostRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-hero", "")
    if (!root.dataset.theme) root.dataset.theme = "light"
    if (!root.dataset.mode) root.dataset.mode = "artist"

    const style = document.createElement("style")
    style.id = "hero-style"
    style.textContent = HERO_STYLE
    document.head.appendChild(style)

    const host = hostRef.current!
    host.innerHTML = HERO_BODY

    const cleanup = initHero((path) => navigate(path))

    return () => {
      cleanup()
      style.remove()
      root.removeAttribute("data-hero")
    }
  }, [])

  return (
    <>
      <KeepyUppy />
      <div className="hero-root" ref={hostRef} />
    </>
  )
}
