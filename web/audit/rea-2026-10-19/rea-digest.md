# REA digest: 6 creative sites (CDP 127.0.0.1:9333, passive, no navigation)

Method: mcp__rea__inspect_web_page and mcp__rea__analyze_web_bundle per target, observation_ms 2000, all include_* false, fetch_source_maps false. Large inspect outputs were parsed from the saved tool-result files with python JSON. No raw JSON is reproduced here.

## onelastbeat.com (target DE7EEDA9857549F8E4B2B343F1DFB069)
- Verdict: custom bundle, no framework or 3D/animation library fingerprinted by REA.
- Scripts: 2 total. static/js/app.js = 1,002,910 bytes (parse complete, 313k AST nodes, 0 parse failures). Inline document script = 223 bytes. Total script bytes about 1,003,133.
- Bundle runtime: no webpack/vite/react inference emitted; no routes found; no WebMCP declarations.
- Endpoints (call-site strings): "Compartir" via window.open (app.js line 105), "/oldbrowser" via t.open (app.js line 116).
- Audio: static/audio/intro.json is listed as a resource (Script type, JSON). Suggests a JSON-driven audio/intro asset, not confirmed.
- Resources: 13, all same host. Types: 3 gif, 4 png, 1 jpg, 2 json (intro.json, manifest.json), 1 woff, 1 css.
- No .glb/.gltf/.ktx2/.basis/.hdr/.wasm/.mp4/.webm/.riv found. No workers. No WebGL/three.js/GSAP/Lenis fingerprint.
- Caveat: inspect output hit size cap but was parsed in full from the saved file.

## onedayinmyworld.com (target 99D1494141598789328774869DA3E516)
- Verdict: not a creative site right now. Page is a WordPress error page (title "WordPress › Error").
- Scripts: 0. Resources: 0. Workers: none. Analyze returned 0 scripts, 0 parse, no endpoints.
- DOM: 66 nodes, only a heading, a few paragraphs, and a 3-item list. Accessibility text not captured (policy).
- Nothing to fingerprint. Re-run after the site is back up.

## peppasauce.love (target CEA8270AB42436DBD0D9652299D5E381)
- Verdict: webpack bundle with Lottie and an IX2-named interaction module. Animation-heavy, no WebGL seen.
- Bundle runtime: webpack, high confidence (webpack-runtime detector on mama-joyce-peppa-sauce.js).
- Scripts: 3. mama-joyce-peppa-sauce.js = 538,009 bytes (parse complete, 158k AST nodes). Two inline scripts of 140 and 181 bytes. Total about 538,330 bytes.
- Module requires from main bundle: "lottie" (line 38), "util" (line 38), "ix2" (line 42). The lottie require suggests Lottie JSON animation. ix2 looks like a Webflow-style interaction runtime, inferred from the name only.
- Resources: 4 (1 css, 2 woff2 fonts, 1 js). No .json/.riv/.glb/audio/video resources found.
- Endpoints: none. Routes: none. No workers.

## moonsafari.archi (target 1A7A8EFA9E830C4E4C0F89160F1C563A)
- Verdict: essentially static. No JS stack identified.
- Scripts: 1 inline script, 164 bytes. Analyze: 32 AST nodes, no chunks, routes, or endpoints.
- Resources: 4 (2 css, 1 png, 1 webp). No media, shader, or model files.
- Inspect output was large (264 KB) but parsed; no workers, no vendor fingerprints.
- No WebGL/three.js/GSAP/Lenis/audio/physics signal.

## the3key.com (target 01F1C776A5487A2886B7ADAAC6DAB27F)
- Verdict: WordPress site (custom theme "the3keyredesign"), jQuery/Foundation stack, no 3D or motion library.
- Scripts: 15, total about 735,042 bytes. Largest: vanilla.min.js 221,107; jquery.min.js 3.7.1 87,553; select2 4.1.0 76,775; foundation.min.js 6.8.1 91,431; jquery.fancybox 3.5.7 68,257; complianz.min.js 45,492; slick 1.8.1 53,567.
- Plugin fingerprints: megamenu-pro 2.4.2, megamenu 3.10.8, lazyload 17.8.2, Complianz GDPR, Google Site Kit events provider.
- Endpoints: "Share" via window.open (global.js line 277 and fancybox line 13); select2 option keys; Site Kit query params (phone, domain).
- Resources: 30 (13 js, 10 css, 2 woff2, 5 svg). Same host only.
- No workers, no WebGL, no audio, no video. Inspect output was large (1.4 MB) but parsed.

## witchernetflix.com/en (target F8319DFA889664128E668482C9AC62B6)
- Not analyzed. Both inspect_web_page and analyze_web_bundle returned target_unavailable with reason target_not_allowed.
- Likely a target policy or origin allowlist issue. The error suggests running `rea doctor`. Not retried, per error.
