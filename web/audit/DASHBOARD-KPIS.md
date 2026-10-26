# Analyst Dashboard KPI audit

Scope: `src/worlds/analyst/Dashboard.tsx`. Read-only audit. No code changed, nothing committed.
Rule applied: every number must trace to a real source in the repo. Anything new or unverified is marked **ASK TUHIN**.

## 1. Real data sources inventory

### 1a. Live / API endpoints (`src/lib/live.ts`, `fetch` in `Landing.tsx`)

`apiUrl()` maps `/api/*` to `/.netlify/functions/*` in `netlify.toml`. The Netlify mirror covers only now-playing and music (README). Football, GitHub and Medium return `{configured:false}` in the static build (`public/data`, `netlify/functions/*.json` is absent; the static files are in `public/data/`). They go live only when the Python host is set via `VITE_API_BASE`.

| Hook | Endpoint | Poll | Typed fields (live.ts) |
|---|---|---|---|
| `useNowPlaying` | `/api/now-playing` | 20 s | `configured, isPlaying, title, artist, album, art, url, playedAt` |
| `useBarca` | `/api/barca` | 10 min | `last, next: Fixture{strHomeTeam, strAwayTeam, intHomeScore, intAwayScore, strLeague, strStatus, strVenue, strTimestamp}` |
| `useFrames` | `/api/frames` | 2 min | `frames[{id,name,url}], source, count` |
| `useSpotifyStats` | `/api/spotify/stats` | 5 min | `configured, range, topArtists, topTracks, topGenres, aura` |
| `useFootball` | `/api/football` | 10 min | `configured, next, last, form[W/D/L], standing{rank,points,played,gd,goals,conceded,win,draw,loss,season}, source` |
| `useFootballNews` | `/api/football-news` | 30 min | `configured, items[{title,url,source,published}]` |
| `useGithub` | `/api/github` | 30 min | `configured, user, repos[{name,desc,stars,lang,url}], totalStars, contributions` |
| `useMedium` | `/api/medium` | 30 min | `configured, handle, posts[{title,url,published,snippet,claps}]` |
| music search / lyrics | `/api/music/search`, `/api/music/lyrics` | on demand | `MusicSearchResp`, `LyricsResp` (not used by Dashboard) |

### 1b. Static baked files (`public/data/`, fetched once, no `/api`)

| Hook | File | Key fields | Last generated |
|---|---|---|---|
| `useSpotifyWrapped` | `spotify_wrapped.json` | `lifetime{minutes,hours,plays,skips,skipRate,uniqueTracks,uniqueArtists}`, `span{from,to,years}`, `topArtists`, `topTracks`, `perYear`, `clock` | 2026-10-13 |
| `useBarcaAnalytics` | `barca_analytics.json` | `seasons{goals,xG,conceded,xGA,points,ppda,possession,top_scorer}`, `players[]`, `topScorers[]` | 2026-10-14 |
| `useBarcaLastSeason` | `barca_last_season.json` | `season, competition, champions, played, win, draw, loss, points, goals, conceded, gd, xG, xGA, cleanSheets, possession` | file present |

### 1c. Hardcoded static facts in `src`

| File:const | Content | Used by |
|---|---|---|
| `Resume.tsx:EDU` | 4 rows: PGDM Big Data Analytics, GIM, 2025-27, CGPA 5.23; B.E. Chem Eng, Jadavpur, 2019-23, 8.32; plus school rows | Resume page |
| `Resume.tsx:EXP` | InfoLeap Data Science Intern (Mar-Aug 2026, 4,010 respondents, 22 buckets, 6,623 verbatims, 95% hand-coding cut); Celebal BI Intern (Jul-Dec 2023, 300+ DAX, 54 pages, query load down 60%+, 35K rows, Pure Storage 150+ KPIs) | Resume page |
| `Resume.tsx:PROJECTS` | Give Goa (501 respondents, 21 zones, 86.43%); Quant Portfolio (XGBoost, 54.8% directional) | Resume page |
| `Work.tsx:ENTRIES` | LOG.01 FC Barcelona Analytics (shipped), LOG.02 InfoLeap LENS (write-up, metrics pending), LOG.03 Blinkit Power BI (shipped). Honesty contract says employer-internal figures stay out until cleared. | Work page |
| `Journey` / `journey-stations.ts:STATIONS` | 6 stations 2008-2026 with CGPA/percent metrics, InfoLeap "6 months", note "PGDM in progress" | Journey page |
| `Skills.tsx:CATS` | 39 items across categories with self-assessed level (`exploring/building/working/strong`); comment says levels are words, not scores | Skills page |
| `Dashboard.tsx` | Header/ticker strings, "built in Goa · 15.49N 73.82E", stack string | Dashboard only |

Conflict to note: `Resume.tsx` EXP shows InfoLeap figures (4,010 respondents, 6,623 verbatims), but `Work.tsx` says employer-internal figures stay out until cleared. The Resume figures are on a public CV, so they need Tuhin's sign-off before a dashboard reuses them.

## 2. Current Dashboard tiles

| # | Tile (grid slot) | Shows | Data source | Verdict |
|---|---|---|---|---|
| 1 | Listening · lifetime (`a-sp`, big) | hours, plays, unique tracks, unique artists, top artist, years logged | `spotify_wrapped.json` (real, baked) | **Decorative**. Real data, but taste/music, not a hiring signal. |
| 2 | FC Barcelona (`a-fb`) | La Liga rank, points, GD, form W/D/L, next fixture | `/api/football` (off in static build, shows "awaiting") | **Decorative** for a hiring story. Live but off-brief. |
| 3 | System clock (`a-sys`) | IST time, "built in Goa · 15.49N 73.82E", "React · Vite · live Python proxy" | clock hook plus hardcoded string | **Random**. Coordinates and "built in Goa" are unsourced. Stack line is site meta. |
| 4 | Now playing (`a-np`) | current track or "Nothing spinning" | `/api/now-playing` | **Random** for hiring. Real, but live noise. |
| 5 | Open channels (`a-ch`) | GitHub repo count, Medium post count, "not wired" tags | `/api/github`, `/api/medium` (both off in static build) | **Critical** in intent (public output proof). Currently counts only, no stars or dates. |
| 6 | Header clock + TwinDoor link | IST clock, link to `/artist/sound` | clock, nav | **Decorative**. |
| 7 | Mobile tab bar (`dtabs`) | Switches tiles 1-5 | UI only | Neutral. |

Net: 1 tile is critical in intent (channels), 0 are fully critical as built. Four are decorative or random.

## 3. References (honest-dashboard design)

1. **Nicholas Felton, Feltron Annual Reports (2005-2014).** Principle: turn everyday data into an annotated, designed narrative with a consistent visual vocabulary, and disclose the collection method. Felton has said the point is "information design and personal data patterns, not celebrating my life." Source: https://www.itsnicethat.com/articles/nicholas-felton-releases-final-ever-personal-annual-report and https://thegreatdiscontent.com/interview/nicholas-felton
2. **Stephen Wolfram, "The Personal Analytics of My Life" (2012).** Principle: automated collection (daily summary emails) plus a stated analysis method. The metric is only as honest as the pipeline behind it. Commentators noted he relies on automatic timestamps rather than a time diary, which is a limit worth showing. Source: https://writings.stephenwolfram.com/2012/03/the-personal-analytics-of-my-life/
3. **Quantified Self / personal informatics.** Principle: measure only what you will act on, pick a few metrics tied to decisions, review on a fixed cadence, and treat correlations from small samples with suspicion. A dashboard nobody reads is decoration. Source: https://www.christopherspenn.com/?p=33189 (secondary); https://gotopia.tech/articles/226/quantified-self-from-data-to-actionable-dashboards
4. **Personal OKR dashboard.** Principle: few objectives, each with measurable key results and a stated confidence. Not searched in this pass; the principle is from general OKR practice and is unverified here.

Design principle to carry forward: every tile must answer one question a hiring manager would ask, and must show its source and update time on screen. Felton's annotated method and Wolfram's disclosed pipeline support this.

## 4. Proposed KPI set (max 6)

Story: "what a hiring manager needs in 10 seconds" — who he is now, what he has done, what proves it, and how to reach him.

| # | KPI | Exact source | Cadence | Why it matters | Viz | Flag |
|---|---|---|---|---|---|---|
| 1 | Current programme and CGPA | `Resume.tsx:EDU[0]` (PGDM, GIM, 2025-27, 5.23) and `journey-stations.ts:STATIONS[4]` ("In progress") | manual, on CV change | Answers "what are you doing now" first. | text + number (5.23 CGPA) | none |
| 2 | Latest role | `Resume.tsx:EXP[0]` (Data Science Intern, InfoLeap, Mar-Aug 2026) and `journey-stations.ts:STATIONS[5]` (metric "6 months") | manual, on change | Recency of work. Figures kept out until cleared (see section 1c). | text + duration | none |
| 3 | Cleared impact figure | `Resume.tsx:EXP[1].bullets[0]` ("300+ DAX across 54 pages", Celebal) | manual | Concrete, quantified proof. | number "300+ DAX / 54 pages" | **ASK TUHIN**: confirm this figure is cleared for public display, per the `Work.tsx` honesty contract. |
| 4 | Shipped work count | computed from `Work.tsx:ENTRIES[].status` (2 shipped, 1 in write-up) | derived on build | Honest counts of finished, verifiable work. Not invented. | bullet/number "2 shipped · 1 write-up" | none |
| 5 | Public output (GitHub) | `/api/github` fields `totalStars`, `repos.length`, `contributions`, `user` | 30 min poll | Shows active public code. Needs the Python host live, else falls back to "not wired". | number triplet | none. Confirm the handle in `user` is correct. |
| 6 | Availability / contact status | no verified source found in this audit (`Contact.tsx` STATUS not reviewed) | manual | Tells the recruiter the next step. | text | **ASK TUHIN**: supply the availability line and its wording. |

Count of **ASK TUHIN** tiles: **2** (KPIs 3 and 6).

Dropped from the set, with reasons:
- Spotify lifetime: real, but taste data, not a hiring signal. Keep it on the Listening page.
- Barça standing and form: a personal project, not a KPI about Tuhin's work. Keep it on the Barça page.
- Now playing, IST clock, coordinates, stack: noise or unsourced.
- Medium post count: counts only. Add back only if a dated post list is shown.

## 5. Next steps (no edits made)

- Resolve the two ASK TUHIN items before building.
- Decide whether the GitHub tile should run on the live Python host or wait for it.
- Remove the unsourced "built in Goa · 15.49N 73.82E" string if it cannot be verified, or ask Tuhin to confirm it.
