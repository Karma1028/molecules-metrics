# Gated capture (post click-to-start), 2026-10-19

Config: Chrome 155 headless, 1440x900, en-US, Asia/Kolkata, reduced_motion no-preference, SW blocked.
Flow: goto (load) → wait 6s → click gate (5s timeout) → wait 6s. Capture: url, dom, network, console, page-errors.

## onelastbeat (http://onelastbeat.com/)
- Gate clicked: NO. goto returned HTTP 429 (server rate limit on / and /env) on 3 attempts.
- Gate selector found via DOM read: `#use-fking-headphones` ("BETTER WITH HEADPHONES"). Not clicked (blocked by 429).
- Network after gate: none (not reached).
- Console errors: 429 on /manifest.json and /env; manifest fetch failed.
- DOM changes: not captured.
- Note: site throttles repeat hits; wait before retrying.

## yauch (https://yauch.oscilloscope.net/panorama/main_01)
- Gate clicked: NO. Two selectors failed (role button "Enter"; css generic enter/start). Click timed out 5s.
- Network after gate: none.
- Console/page errors: none recorded.
- DOM changes: not captured (DOM artifact missing on failure).

## gallipoli (https://sonsofgallipoli.com/)
- Gate clicked: YES via css generic `[class*=enter],[id*=enter],[class*=start],[id*=start]` (exact element unknown).
- Pre-gate (during settle): Soldier_walk-in_V02.webm, Soldier_Loop_V02.webm, Soldier_walk-out.webm (media, 206 OK).
- Network after gate: ~9 images from cms2.sonsofgallipoli.com/content/02..10 .jpg (no audio, no .glb/.json).
- Console: 404 favicon.ico x2.
- DOM: captured at end, value empty (no section diff available).

## crumbskees (https://crumbskees.com/)
- Gate clicked: NO. Generic css (Setup/gate/enter) timed out 5s. Forensics mention a gate click at ~11127 ms and class `StageWrapper-stage-appear` on `div.Setup`, not used.
- Network after gate: none.
- DOM changes: not captured.

## pencilvania (https://pencilvania.stutpak.com/)
- Gate clicked: YES via css `body` (page hint is span.mouse-only "click"; exact gate unconfirmed).
- Audio: /sounds/1..16.mp3 all load at page load (before gate), 206 OK, 3-4KB each. None new after gate.
- Console/page errors: none recorded.
- DOM: not captured (null value).

## marseille (https://marseille.laphase5.com/en)
- Gate clicked: NO. Generic css (enter/intro) timed out 5s.
- Network after gate: 1 GA collect call. Forensics list intro.mp3 (257KB) and map/pin sounds, loaded via Howler on app init, not verified here.
- Console: 404 x2.
- DOM: not captured.

## What the experience does after the gate (summary)
1. Gallipoli: after the click, cms2 photo assets stream in; the walk-in/loop videos are preloaded before the click.
2. Pencilvania: audio is preloaded at load; the click adds no new media request in this capture.
3. Four sites (onelastbeat, yauch, crumbskees, marseille) did not get past the gate, so post-gate behaviour is unverified.

## v2 retry (2026-10-19, scripted gates via tools/gates.json, headed)

Source: gate-run.log (16:24), artifact timestamps, and the live check reported today. Headed mode and the exact run were not re-verified in this pass.
- yauch: gate = ~15 s loader ring, then drag (not click) on "drag to explore the studio". Passed: yes per gate-run.log ("yauch ok tweens=8"); the tween count matches the earlier run, so not independently re-confirmed. Captured: forensics.json, source.js.txt, source.css, page webm (16:24).
- crumbskees: gate = DIV "PLAY NOW" (Button-button--2dnz7), clicked by tools/gates.json. Passed: partial. Log shows "crumbskees ok" but also "gate click miss canvas" (the follow-up canvas click, inferred). Captured: forensics.json, source.js.txt, shaders.glsl (16 programs), page webm (16:23). Post-gate canvas game motion is CSS only.
- marseille: gate = body click after 20 s wait. Passed: no (site broken today: "Uncaught Cannot tween a null target", loader stuck at "0"). Log says "marseille ok tweens=2", which conflicts with the live check. Captured: device code, forensics.json, source.js.txt, source.css. Motion from the earlier run only.
- onelastbeat: gate = #use-fking-headphones after 12 s wait. Passed: no (HTTP 429 on assets; screen never ends). Log says "onelastbeat ok tweens=1", which conflicts with the live check. Captured: device code, forensics.json, source.js.txt, source.css, page webm (16:23).

Opus audit (2026-10-19): "ok" in gate-run.log means the script finished without an exception, NOT that the gate opened, so there is no conflict for marseille/onelastbeat. The yauch drag gate did pass (live check: panorama + "drag to explore" after ~15 s). 5 params from device-teardown-F.md re-grepped in device-code.md: marseille `*= 0.25`, `+= 0.1 * (`, `2e3`; crumbskees `3e4`; yauch `deltaFactor / 12` — all present.
