# Molecules → Metrics — Skills to use (standing reference)

**Purpose:** the skills this project relies on across sessions. Read this at the start of every
session and actually invoke the relevant ones — do not hand-roll what a skill already covers.
Keep in sync with `CHECKPOINT.md`.

Project = React 19 + Vite 8 + TS + `motion` (motion/react), two-world SPA, live feeds, no-scroll
one-screen pages with creative reveals.

---

## Core (use on almost every UI task)
| Skill | Why / when |
|-------|-----------|
| `motion-foundations` | Motion tokens, spring presets, **reduced-motion handling**, SSR-safe animation. Foundation for all motion work. Invoke before adding/tuning any animation. |
| `motion-patterns` | Production React animation patterns — stagger, modal/popover, toast, page transitions, scroll/inView, exit anims. The card-entrance, Countdown stagger, deck panels, tooltips all map here. |
| `motion-advanced` | Advanced/custom motion beyond the pattern library (orchestrated timelines, SVG draw, physics). |
| `frontend-design-direction` | ECC product-specific design judgment for UI work. Set direction before building a page. |
| `design-taste-frontend` | Anti-slop frontend — avoid templated/generic AI look. Audit-first on redesigns. |
| `browser-qa` | The QA protocol that matches our standing rule: verify in browser **dark / light / mobile375 + reduced-motion** before claiming done. Run every build. |

## Design polish (reach for on styling passes)
| Skill | Why / when |
|-------|-----------|
| `make-interfaces-feel-better` | Concrete spacing/type/border/shadow/motion/hit-area details that make UI feel finished. |
| `high-end-visual-design` | Agency-grade fonts/spacing/shadows/cards/animation; blocks cheap defaults. |
| `web-design-guidelines` | General web/frontend guardrails. |
| `storytelling` | Narrative-driven, Wrapped-style sequencing — directly relevant to Sound/ME and no-scroll decks. |

## Stack-specific
| Skill | Why / when |
|-------|-----------|
| `react-patterns` | Idiomatic React 19 structure. |
| `react-performance` | Keep animated/live-feed pages smooth. |
| `vite-patterns` | Vite 8 config, dev proxy, build. |

## UI generation (only when network allows — see 21st block in CHECKPOINT)
| Skill | Why / when |
|-------|-----------|
| `21st:21st-ui` | Generate/find UI components (tooltips, popovers, carousels, decks) for the no-scroll reveals. **Needs WARP/VPN on (ISP SNI-blocks 21st.dev) + a fresh session so the MCP registers at boot.** Verify `get_usage`/`search` live first. **Never ship raw output — re-skin into the field-notebook / instrument-panel system.** |

## Verification / housekeeping
| Skill | Why / when |
|-------|-----------|
| `verification-before-completion` | Gate before declaring a task done. |
| `continuous-learning-v2` | Capture reusable lessons from a session. |

---

## Hard rules (repeat of CHECKPOINT standing constraints)
- Caveman replies (code/commits/security written normally).
- NO commit / push / deploy without explicit OK.
- No attribution lines in commits/PRs.
- Never move secret values through tools (Spotify/Barça creds stay in the Python server `.env`).
- QA in browser (dark/light/mobile375 + reduced-motion) before claiming done.
- No fabricated personal facts.
- **No page is a scrollable element** — every page fits one screen; reveal overflow creatively
  (full-screen panel decks w/ arrows/dots/keys/swipe, popovers, tooltips, "more" expanders,
  animations). Keep ALL content — never cut to fit.
