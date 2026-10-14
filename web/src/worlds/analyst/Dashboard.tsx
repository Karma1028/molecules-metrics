import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon } from "../../lib/icons"
import { motionTokens, springs } from "../../lib/motion-tokens"
import { useOneScreen } from "../../hooks/useOneScreen"
import { LogHeader } from "../../components/headers/LogHeader"
import {
  useSpotifyWrapped, useFootball, useNowPlaying, useGithub, useMedium, useClock,
} from "../../lib/live"

const nf = new Intl.NumberFormat("en-US")

const DTABS = [
  { id: "sp", label: "Listening", short: "Music" },
  { id: "fb", label: "Barça", short: "Barça" },
  { id: "sys", label: "System", short: "System" },
  { id: "np", label: "Now Playing", short: "Now" },
  { id: "ch", label: "Channels", short: "Links" },
]

function fixtureLine(f?: { strHomeTeam?: string | null; strAwayTeam?: string | null }) {
  if (!f?.strHomeTeam || !f?.strAwayTeam) return null
  return `${f.strHomeTeam} v ${f.strAwayTeam}`
}

const CSS = String.raw`
  .p-db{height:100%;min-height:0;display:flex;flex-direction:column;max-width:1220px;margin:0 auto;width:100%;overflow:hidden}

  .p-db .db-head{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;
    padding-bottom:clamp(7px,1.3vh,13px);margin-bottom:clamp(9px,1.6vh,16px);border-bottom:1px solid var(--rule)}
  .p-db .db-kick{display:inline-flex;align-items:center;gap:8px;font:500 10px/1 var(--font-mono);letter-spacing:.26em;
    text-transform:uppercase;color:var(--accent)}
  .p-db .db-kick .ic{width:13px;height:13px}
  .p-db .db-kick .live{width:7px;height:7px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);animation:pulse 1.8s infinite}
  .p-db .db-title{font-family:var(--font-display);font-weight:700;font-size:clamp(22px,3vw,36px);line-height:1;letter-spacing:-.02em;color:var(--ink);margin:7px 0 4px}
  .p-db .db-lede{font-size:clamp(11px,1vw,13.5px);color:var(--muted);max-width:52ch}
  .p-db .db-clockbox{text-align:right;white-space:nowrap}
  .p-db .db-clockbox .t{font:700 clamp(18px,2vw,26px)/1 var(--font-mono);color:var(--ink);font-variant-numeric:tabular-nums;letter-spacing:.04em}
  .p-db .db-clockbox .z{font:500 9px/1.4 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}

  .p-db .bento{flex:1;min-height:0;display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(2,1fr);gap:clamp(9px,1.2vw,15px)}
  .p-db .bento>*{min-width:0;min-height:0}

  .p-db .pnl{background:color-mix(in srgb,var(--card) 92%,transparent);border:1px solid color-mix(in srgb,var(--accent) 16%,var(--rule));
    border-radius:12px;box-shadow:var(--shadow-sm);overflow:hidden;display:flex;flex-direction:column;transition:border-color .3s,box-shadow .3s,transform .3s}
  .p-db .pnl:hover{border-color:color-mix(in srgb,var(--accent) 40%,transparent);box-shadow:var(--glow);transform:translateY(-2px)}
  .p-db .pnl-head{display:flex;align-items:center;gap:8px;padding:9px 13px;border-bottom:1px solid var(--rule);
    font:500 9.5px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);flex:0 0 auto}
  .p-db .pnl-head .ic{width:13px;height:13px;color:var(--accent)}
  .p-db .pnl-head .st{margin-left:auto;display:inline-flex;align-items:center;gap:5px;font-size:8px;letter-spacing:.12em}
  .p-db .pnl-head .st .d{width:6px;height:6px;border-radius:50%}
  .p-db .pnl-head .st.on .d{background:var(--teal);box-shadow:0 0 6px var(--teal)} .p-db .pnl-head .st.on{color:var(--teal)}
  .p-db .pnl-head .st.off .d{background:var(--muted)} .p-db .pnl-head .st.off{color:var(--muted)}
  .p-db .pnl-body{flex:1;min-height:0;padding:clamp(10px,1.4vw,16px);display:flex;flex-direction:column;overflow:hidden}

  /* spotify feature */
  .p-db .sp-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,1vw,14px);flex:1;min-height:0}
  .p-db .sp-cell{display:flex;flex-direction:column;justify-content:center;gap:3px;padding:clamp(8px,1vh,14px) clamp(10px,1vw,14px);
    border:1px solid var(--rule);border-radius:10px;background:var(--paper2)}
  .p-db .sp-cell .v{font:700 clamp(24px,3.4vw,40px)/1 var(--font-display);font-variant-numeric:tabular-nums;letter-spacing:-.02em;color:var(--ink)}
  .p-db .sp-cell .v .u{font-size:.4em;color:var(--muted);font-weight:500;margin-left:4px;letter-spacing:0}
  .p-db .sp-cell .k{font:500 9px/1.3 var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .p-db .sp-foot{flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:clamp(8px,1vh,12px);
    font:600 10.5px/1.3 var(--font-mono);color:var(--muted)}
  .p-db .sp-foot b{color:var(--teal)} .p-db .sp-foot .yr{color:var(--ink)}

  /* generic stat rows */
  .p-db .big{font:700 clamp(26px,3.2vw,40px)/1 var(--font-display);font-variant-numeric:tabular-nums;letter-spacing:-.02em;color:var(--ink)}
  .p-db .big .u{font-size:.4em;color:var(--muted);font-weight:500;margin-left:4px}
  .p-db .sub{font:500 10px/1.4 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:4px}
  .p-db .form{display:flex;gap:4px;margin-top:9px}
  .p-db .form span{width:17px;height:17px;border-radius:5px;display:grid;place-items:center;font:700 8px/1 var(--font-mono);color:#fff}
  .p-db .form .W{background:var(--teal)} .p-db .form .D{background:var(--muted)} .p-db .form .L{background:var(--grana)}
  .p-db .next{margin-top:auto;font:600 11px/1.4 var(--font-mono);color:var(--ink)}
  .p-db .next .lab{display:block;font-weight:500;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}

  .p-db .np{display:flex;flex-direction:column;justify-content:center;gap:5px;flex:1;min-height:0}
  .p-db .np .tt{font-family:var(--font-display);font-weight:600;font-size:clamp(14px,1.5vw,18px);color:var(--ink);line-height:1.1;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .p-db .np .ar{font:600 11px/1.3 var(--font-mono);color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

  .p-db .chan{display:flex;flex-direction:column;gap:9px;flex:1;min-height:0;justify-content:center}
  .p-db .chan .row{display:flex;align-items:center;gap:9px;font:600 11px/1 var(--font-mono);color:var(--muted)}
  .p-db .chan .row .ic{width:14px;height:14px;color:var(--accent)}
  .p-db .chan .row .nm{color:var(--ink)}
  .p-db .chan .row .tag{margin-left:auto;font-size:8px;letter-spacing:.12em;text-transform:uppercase;padding:3px 7px;border-radius:20px;
    border:1px solid var(--rule);color:var(--muted)}

  .p-db .empty{margin:auto;text-align:center;font:500 11px/1.5 var(--font-mono);color:var(--muted);max-width:26ch}
  .p-db .empty .ic{width:18px;height:18px;color:var(--muted);opacity:.6;margin-bottom:6px}

  /* grid placement */
  .p-db .a-sp{grid-column:1 / 6;grid-row:1 / 3}
  .p-db .a-fb{grid-column:6 / 10;grid-row:1 / 2}
  .p-db .a-sys{grid-column:10 / 13;grid-row:1 / 2}
  .p-db .a-np{grid-column:6 / 10;grid-row:2 / 3}
  .p-db .a-ch{grid-column:10 / 13;grid-row:2 / 3}

  .p-db .dtabs{display:none}

  @media(max-width:700px){
    .p-db{height:100%;min-height:0;overflow:hidden}
    .p-db .db-clockbox{display:none}
    .p-db .dtabs{display:flex;gap:4px;overflow:hidden;margin-bottom:6px;flex:0 0 auto}
    .p-db .dtab{flex:1 1 0;min-width:0;padding:6px 2px;font:600 9.5px/1 var(--font-mono);letter-spacing:.04em;text-transform:uppercase;
      border-radius:14px;border:1px solid var(--rule);background:transparent;color:var(--muted);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
    .p-db .dtab .dtab-full{display:none}
    .p-db .dtab .dtab-short{display:inline}
    .p-db .dtab.on{color:var(--accent);border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent)}
    .p-db .bento{flex:1;min-height:0;display:flex;flex-direction:column}
    .p-db .bento .pnl{display:none;flex:1;min-height:0}
    .p-db .bento[data-tab="sp"] .a-sp{display:flex}
    .p-db .bento[data-tab="fb"] .a-fb{display:flex}
    .p-db .bento[data-tab="sys"] .a-sys{display:flex}
    .p-db .bento[data-tab="np"] .a-np{display:flex}
    .p-db .bento[data-tab="ch"] .a-ch{display:flex}
  }

  .p-db .dtab .dtab-full{display:inline}
  .p-db .dtab .dtab-short{display:none}

  @media(min-width:701px) and (max-width:900px){
    .p-db{height:100%;min-height:0;overflow:hidden}
    .p-db .bento{grid-template-columns:repeat(2,1fr);gap:10px;flex:1;min-height:0}
    .p-db .bento>*{grid-column:auto!important;grid-row:auto!important}
    .p-db .a-sp{grid-column:1 / -1!important}
    .p-db .pnl{min-height:0}
    .p-db .db-clockbox{display:none}
  }
`

export function Dashboard() {
  const reduce = useReducedMotion()
  const wrapped = useSpotifyWrapped()
  const football = useFootball()
  const now = useNowPlaying()
  const gh = useGithub()
  const md = useMedium()
  const clock = useClock()
  const [dtab, setDtab] = useState("sp")

  useOneScreen()

  const lt = wrapped.data.lifetime
  const hasSpotify = !wrapped.fallback && !!lt
  const years = wrapped.data.span?.years?.length ?? 0
  const topArtist = wrapped.data.topArtists?.[0]?.name

  const fb = football.data
  const hasFootball = !football.fallback && !!fb.standing
  const next = fixtureLine(fb.next)

  const nowOn = now.data?.configured && now.data?.isPlaying && !!now.data?.title

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.04 } },
  }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance.sm, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  }

  return (
    <main className="page p-db" aria-label="Live telemetry dashboard">
      <style>{CSS}</style>

      <LogHeader
        log="LOG.04"
        section="DASHBOARD"
        tag="live-telemetry"
        title="Live instruments."
        lede="Real feeds, honestly labelled. Dark cells are channels not yet wired, not empty numbers dressed up."
        right={
          <div className="db-clockbox">
            <div className="t">{clock}</div>
            <div className="z">IST · Asia/Kolkata</div>
          </div>
        }
      />

      <div className="dtabs" role="tablist" aria-label="Dashboard instruments">
        {DTABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            className={`dtab${dtab === t.id ? " on" : ""}`}
            aria-selected={dtab === t.id}
            onClick={() => setDtab(t.id)}
          >
            <span className="dtab-full">{t.label}</span>
            <span className="dtab-short">{t.short}</span>
          </button>
        ))}
      </div>

      <motion.div className="bento" data-tab={dtab} variants={container} initial="hidden" animate="visible">
        {/* SPOTIFY lifetime — real baked export */}
        <motion.section className="pnl a-sp" variants={item}>
          <div className="pnl-head">
            <Icon id="i-music" /> Listening · lifetime
            <span className={`st ${hasSpotify ? "on" : "off"}`}><span className="d" />{hasSpotify ? "real" : "offline"}</span>
          </div>
          <div className="pnl-body">
            {hasSpotify && lt ? (
              <>
                <div className="sp-grid">
                  <div className="sp-cell"><span className="v">{nf.format(lt.hours)}<span className="u">hrs</span></span><span className="k">time played</span></div>
                  <div className="sp-cell"><span className="v">{nf.format(lt.plays)}</span><span className="k">total plays</span></div>
                  <div className="sp-cell"><span className="v">{nf.format(lt.uniqueTracks)}</span><span className="k">unique tracks</span></div>
                  <div className="sp-cell"><span className="v">{nf.format(lt.uniqueArtists)}</span><span className="k">unique artists</span></div>
                </div>
                <div className="sp-foot">
                  <span>top artist · <b>{topArtist ?? "–"}</b></span>
                  <span className="yr">{years ? `${years} yrs logged` : ""}</span>
                </div>
              </>
            ) : (
              <div className="empty"><Icon id="i-music" /><div>Listening export not loaded.</div></div>
            )}
          </div>
        </motion.section>

        {/* FOOTBALL — live feed */}
        <motion.section className="pnl a-fb" variants={item}>
          <div className="pnl-head">
            <Icon id="i-ball" /> FC Barcelona
            <span className={`st ${hasFootball ? "on" : "off"}`}><span className="d" />{hasFootball ? "live" : "awaiting"}</span>
          </div>
          <div className="pnl-body">
            {hasFootball && fb.standing ? (
              <>
                <div className="big">#{fb.standing.rank}<span className="u">La Liga</span></div>
                <div className="sub">{fb.standing.points} pts · {fb.standing.played} pl · {fb.standing.gd >= 0 ? "+" : ""}{fb.standing.gd} GD</div>
                {fb.form?.length ? (
                  <div className="form">{fb.form.slice(-5).map((r, i) => <span key={i} className={r}>{r}</span>)}</div>
                ) : null}
                {next ? <div className="next"><span className="lab">Next</span>{next}</div> : null}
              </>
            ) : (
              <div className="empty"><Icon id="i-ball" /><div>Fixture feed offline.</div></div>
            )}
          </div>
        </motion.section>

        {/* SYSTEM / clock */}
        <motion.section className="pnl a-sys" variants={item}>
          <div className="pnl-head"><Icon id="i-pulse" /> System<span className="st on"><span className="d" />ok</span></div>
          <div className="pnl-body">
            <div className="big">{clock.slice(0, 5)}<span className="u">IST</span></div>
            <div className="sub">built in Goa · 15.49N 73.82E</div>
            <div className="next"><span className="lab">Stack</span>React · Vite · live Python proxy</div>
          </div>
        </motion.section>

        {/* NOW PLAYING */}
        <motion.section className="pnl a-np" variants={item}>
          <div className="pnl-head">
            <Icon id="i-headphone" /> Now playing
            <span className={`st ${nowOn ? "on" : "off"}`}><span className="d" />{nowOn ? "live" : "idle"}</span>
          </div>
          <div className="pnl-body">
            {nowOn ? (
              <div className="np">
                <div className="tt">{now.data?.title}</div>
                <div className="ar">{now.data?.artist}</div>
              </div>
            ) : (
              <div className="empty"><Icon id="i-headphone" /><div>Nothing spinning right now.</div></div>
            )}
          </div>
        </motion.section>

        {/* CHANNELS — github + medium honest status */}
        <motion.section className="pnl a-ch" variants={item}>
          <div className="pnl-head"><Icon id="i-branch" /> Open channels</div>
          <div className="pnl-body">
            <div className="chan">
              <div className="row">
                <Icon id="i-branch" /> <span className="nm">GitHub</span>
                <span className="tag">{gh.fallback ? "not wired" : `${gh.data.repos?.length ?? 0} repos`}</span>
              </div>
              <div className="row">
                <Icon id="i-quote" /> <span className="nm">Medium</span>
                <span className="tag">{md.fallback ? "not wired" : `${md.data.posts?.length ?? 0} posts`}</span>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  )
}
