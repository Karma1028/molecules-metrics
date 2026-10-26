// Motion forensics: record everything that animates on a site and how.
//  - CSS animations/transitions + WAAPI   -> document.getAnimations() snapshots (keyframes, duration, easing, delay)
//  - JS-driven tweens (GSAP/rAF/Framer)    -> MutationObserver on inline style; segmented into tweens, easing fitted
//  - GSAP calls (if global)                -> wrapped to/from/fromTo/set/timeline vars
//  - Smooth scroll                         -> scrollY per frame during a wheel burst (lerp estimate)
//  - WebGL                                 -> shaderSource captured (GLSL), context types
//  - Audio / media / assets                -> AudioContext, media play, resource entries
//  - Source                                -> all CSS text + JS (saved) for keyframes/easing grep
// Phases: load(8s) -> hover nav links -> wheel scroll x6 -> click start-gate (if any)
// usage: NODE_PATH=web/node_modules [ONLY=a,b] node forensics.cjs <outDir> <sites.json>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
const SITES = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));

// ---------- injected before any page script ----------
const INIT = () => {
  const F = (window.__F = { muts: [], gsap: [], shaders: [], ctx: [], audio: [], marks: [], scroll: [] });
  const t = () => Math.round(performance.now());
  const sel = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') +
    [...e.classList].slice(0, 2).map(c => '.' + c).join('');
  // JS-driven style changes
  const readStyle = e => {
    const s = e.style; const o = {};
    if (s.transform) o.transform = s.transform;
    if (s.opacity !== '') o.opacity = s.opacity;
    if (s.clipPath) o.clipPath = s.clipPath;
    if (s.filter) o.filter = s.filter;
    if (s.width && s.width.endsWith('%')) o.widthPct = s.width;
    for (let i = 0; i < s.length; i++) if (s[i].startsWith('--')) o[s[i]] = s.getPropertyValue(s[i]).trim().slice(0, 40);
    return o;
  };
  const start = () => {
    const mo = new MutationObserver(list => {
      if (F.muts.length > 60000) return;
      const now = t();
      for (const m of list) {
        const e = m.target; if (e.nodeType !== 1) continue;
        F.muts.push([now, e.__fid || (e.__fid = sel(e) + '@' + (F.ctx.length + Math.random()).toString(36).slice(2, 6)), readStyle(e)]);
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style'], subtree: true });
  };
  if (document.documentElement) start(); else document.addEventListener('DOMContentLoaded', start);
  // GSAP global wrap (bundled GSAP is caught by the style observer instead)
  const wrapGsap = g => {
    if (!g || g.__w) return g; g.__w = 1;
    for (const k of ['to', 'from', 'fromTo', 'set', 'timeline']) {
      const orig = g[k]; if (typeof orig !== 'function') continue;
      g[k] = function (...a) {
        try {
          const tgt = a[0] && (typeof a[0] === 'string' ? a[0] : a[0].nodeType ? sel(a[0]) : a[0].length ? 'list' + a[0].length : 'obj');
          const v = JSON.stringify(a.slice(1).map(x => x && typeof x === 'object' ? Object.fromEntries(Object.entries(x)
            .filter(([, y]) => typeof y !== 'function' && typeof y !== 'object' || y === null || (y && y.trigger !== undefined))
            .map(([kk, y]) => [kk, y && typeof y === 'object' ? { trigger: String(y.trigger && y.trigger.className || y.trigger).slice(0, 30), start: y.start, end: y.end, scrub: y.scrub, pin: !!y.pin } : y])) : x)).slice(0, 400);
          if (F.gsap.length < 3000) F.gsap.push([t(), k, k === 'timeline' ? '' : tgt, v]);
        } catch (e) {}
        return orig.apply(this, a);
      };
    }
    return g;
  };
  let _g; try { Object.defineProperty(window, 'gsap', { configurable: true, get: () => _g, set: v => { _g = wrapGsap(v); } }); } catch (e) {}
  // WebGL shaders + context types
  const gc = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...r) {
    if (F.ctx.length < 50) F.ctx.push([t(), type, this.width + 'x' + this.height]);
    return gc.call(this, type, ...r);
  };
  for (const P of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
    if (!P) continue; const ss = P.prototype.shaderSource;
    P.prototype.shaderSource = function (sh, src) { if (F.shaders.length < 60) F.shaders.push(src); return ss.call(this, sh, src); };
  }
  // audio
  const AC = window.AudioContext; if (AC) window.AudioContext = function (...a) { F.audio.push([t(), 'AudioContext']); return new AC(...a); };
  const play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () { F.audio.push([t(), this.tagName, (this.currentSrc || this.src || '').slice(-80)]); return play.call(this); };
  // smooth-scroll response
  addEventListener('scroll', () => { if (F.scroll.length < 4000) F.scroll.push([t(), Math.round(scrollY)]); }, { passive: true, capture: true });
};

// ---------- in-page snapshot of running CSS/WAAPI animations ----------
const SNAP_ANIMS = () => document.getAnimations().slice(0, 300).map(a => {
  const ef = a.effect; const tm = ef && ef.getTiming ? ef.getTiming() : {};
  const tg = ef && ef.target; let kf = [];
  try { kf = ef.getKeyframes().map(k => { const o = {}; for (const [p, v] of Object.entries(k)) if (!['computedOffset', 'composite'].includes(p)) o[p] = String(v).slice(0, 60); return o; }); } catch (e) {}
  return {
    type: a.constructor.name, name: a.animationName || a.transitionProperty || a.id || '',
    target: tg ? tg.tagName.toLowerCase() + [...(tg.classList || [])].slice(0, 2).map(c => '.' + c).join('') + (a.pseudoElement || '') : '',
    duration: tm.duration, delay: tm.delay, easing: tm.easing, iterations: tm.iterations, direction: tm.direction, fill: tm.fill, kf: kf.slice(0, 6),
  };
});

// ---------- node-side analysis ----------
const bez = (x1, y1, x2, y2) => u => { // CSS cubic-bezier y(x)
  let lo = 0, hi = 1, s = u;
  for (let i = 0; i < 30; i++) { s = (lo + hi) / 2; const x = 3 * (1 - s) ** 2 * s * x1 + 3 * (1 - s) * s * s * x2 + s ** 3; if (x < u) lo = s; else hi = s; }
  return 3 * (1 - s) ** 2 * s * y1 + 3 * (1 - s) * s * s * y2 + s ** 3;
};
const EASES = {
  linear: u => u, 'power1.out': u => 1 - (1 - u) ** 2, 'power2.out': u => 1 - (1 - u) ** 3, 'power3.out': u => 1 - (1 - u) ** 4,
  'power4.out': u => 1 - (1 - u) ** 5, 'expo.out': u => u === 1 ? 1 : 1 - 2 ** (-10 * u),
  'power2.inOut': u => u < .5 ? 4 * u ** 3 : 1 - (-2 * u + 2) ** 3 / 2, 'power3.inOut': u => u < .5 ? 8 * u ** 4 : 1 - (-2 * u + 2) ** 4 / 2,
  'expo.inOut': u => u === 0 ? 0 : u === 1 ? 1 : u < .5 ? 2 ** (20 * u - 10) / 2 : (2 - 2 ** (-20 * u + 10)) / 2,
  'sine.inOut': u => -(Math.cos(Math.PI * u) - 1) / 2, 'power2.in': u => u ** 3,
  'css ease': bez(.25, .1, .25, 1), 'css ease-out': bez(0, 0, .58, 1), 'css ease-in-out': bez(.42, 0, .58, 1),
  'quart-out(.19,1,.22,1)': bez(.19, 1, .22, 1), 'circ-out(.075,.82,.165,1)': bez(.075, .82, .165, 1),
};
const num = (prop, v) => {
  if (v == null) return null;
  if (prop === 'transform') {
    const m = /matrix\(([^)]+)\)/.exec(v); if (m) { const a = m[1].split(',').map(Number); return { x: a[4], y: a[5], s: Math.hypot(a[0], a[1]), r: Math.atan2(a[1], a[0]) * 57.3 }; }
    const o = {};
    const tr = /translate(?:3d|X|Y)?\(([^)]+)\)/.exec(v); if (tr) { const p = tr[1].split(',').map(parseFloat); if (/translateY/.test(v) && p.length === 1) o.y = p[0]; else { o.x = p[0]; if (p.length > 1) o.y = p[1]; } }
    const sc = /scale\(([^),]+)/.exec(v); if (sc) o.s = parseFloat(sc[1]);
    const ro = /rotate(?:Z)?\(([^)]+)deg/.exec(v); if (ro) o.r = parseFloat(ro[1]);
    return Object.keys(o).length ? o : null;
  }
  const f = parseFloat(String(v).replace(/[^\d.\-e]+/, ' ').trim().split(' ')[0]);
  return Number.isFinite(f) ? { v: f } : null;
};
function fitEase(samples) { // samples [[t,p]] normalised 0..1
  let best = null;
  for (const [name, fn] of Object.entries(EASES)) {
    const e = Math.sqrt(samples.reduce((s, [u, p]) => s + (fn(u) - p) ** 2, 0) / samples.length);
    if (!best || e < best.rmse) best = { ease: name, rmse: +e.toFixed(3) };
  }
  return best;
}
function tweens(muts) {
  const series = {}; // key: id|prop|channel -> [[t,val]]
  for (const [t, id, st] of muts) for (const [prop, v] of Object.entries(st)) {
    const n = num(prop, v); if (!n) continue;
    for (const [ch, val] of Object.entries(n)) { if (!Number.isFinite(val)) continue; const k = id + '|' + prop + '|' + ch; (series[k] = series[k] || []).push([t, val]); }
  }
  const out = [];
  for (const [k, pts] of Object.entries(series)) {
    let seg = [pts[0]];
    const flush = () => {
      if (seg.length >= 5) {
        const t0 = seg[0][0], t1 = seg[seg.length - 1][0], v0 = seg[0][1], v1 = seg[seg.length - 1][1];
        if (t1 - t0 >= 80 && Math.abs(v1 - v0) > 1e-3) {
          const fit = fitEase(seg.map(([t, v]) => [(t - t0) / (t1 - t0), (v - v0) / (v1 - v0)]));
          const [id, prop, ch] = k.split('|');
          out.push({ el: id.split('@')[0], prop: prop + (ch !== 'v' ? '.' + ch : ''), start: t0, dur: t1 - t0, from: +v0.toFixed(3), to: +v1.toFixed(3), n: seg.length, ...fit });
        }
      }
    };
    for (let i = 1; i < pts.length; i++) { if (pts[i][0] - pts[i - 1][0] > 120) { flush(); seg = []; } seg.push(pts[i]); }
    flush();
  }
  return out.sort((a, b) => a.start - b.start);
}
function cssDigest(css) {
  const kf = [...css.matchAll(/@(?:-webkit-)?keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)].map(m => ({ name: m[1], body: m[2].replace(/\s+/g, ' ').slice(0, 300) }));
  const tally = re => { const o = {}; for (const m of css.matchAll(re)) o[m[0]] = (o[m[0]] || 0) + 1; return Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 15); };
  return {
    cssBytes: css.length, keyframes: kf.slice(0, 60),
    beziers: tally(/cubic-bezier\([^)]+\)/g), durations: tally(/\b\d*\.?\d+m?s\b(?=[^;{}]*(?:;|}))/g),
    transitions: tally(/transition:[^;}]{3,90}/g).slice(0, 12), customProps: tally(/--[\w-]+(?=\s*:)/g).slice(0, 25),
    features: Object.fromEntries(['@property', 'view-timeline', 'animation-timeline', 'scroll-timeline', '@container', 'mix-blend-mode', 'clip-path', 'mask', 'backdrop-filter', 'perspective', 'preserve-3d', '@media (prefers-reduced-motion', 'steps(', 'offset-path', 'text-stroke'].map(f => [f, css.split(f).length - 1])),
  };
}
function scrollLerp(sc) { // fraction of remaining distance closed per frame during smooth scroll
  const r = []; for (let i = 2; i < sc.length; i++) { const d1 = sc[i - 1][1] - sc[i - 2][1], d2 = sc[i][1] - sc[i - 1][1], dt = sc[i][0] - sc[i - 1][0]; if (d1 > 2 && d2 > 0 && d2 < d1 && dt > 10 && dt < 25) r.push(d2 / d1); }
  if (r.length < 8) return { native: true, samples: r.length };
  r.sort((a, b) => a - b); const decay = r[Math.floor(r.length / 2)];
  return { decayPerFrame: +decay.toFixed(3), lerpEquivalent: +(1 - decay).toFixed(3), samples: r.length };
}

// TRANSITION=1 mode: click the first visible same-origin internal link and record the page
// transition (SPA/Barba keep the doc → tweens since click; hard nav → new doc's intro).

const GATES = fs.existsSync(path.join(__dirname, 'gates.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'gates.json'), 'utf8')) : {};
// one gate step: {wait:ms} | {click:selector} | {move:[x,y]} | {drag:[x1,y1,x2,y2,steps]} | {key:'Enter'}
async function gateStep(page, st) {
  if (st.wait) return page.waitForTimeout(st.wait);
  if (st.click) return page.locator(st.click).first().click({ timeout: 4000, noWaitAfter: true }).catch(() => console.log('gate click miss', st.click));
  if (st.move) return page.mouse.move(...st.move, { steps: 12 });
  if (st.key) return page.keyboard.press(st.key);
  if (st.drag) { const [a, b, c, d, n] = st.drag; await page.mouse.move(a, b); await page.mouse.down(); await page.mouse.move(c, d, { steps: n || 20 }); return page.mouse.up(); }
}

async function transition(page, res, dir, snap) {
  const origin = new URL(page.url()).origin;
  const href = await page.evaluate(o => {
    const a = [...document.querySelectorAll('a[href]')].find(a => {
      const r = a.getBoundingClientRect(); const u = new URL(a.href, location.href);
      return r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= innerHeight && u.origin === o
        && u.pathname !== location.pathname && u.pathname !== '/' && !/\.(pdf|jpg|png|zip)$/i.test(u.pathname) && !a.target;
    });
    if (a) a.setAttribute('data-fprobe', '1');
    return a ? a.getAttribute('href') : null;
  }, origin);
  if (!href) { res.transition = { error: 'no visible internal link' }; return; }
  const path0 = await page.evaluate(() => location.pathname);
  const t0 = await page.evaluate(() => { window.__F.muts.length = 0; window.__F.navMark = performance.now(); return Math.round(performance.now()); });
  const docBefore = await page.evaluate(() => performance.timeOrigin);
  await page.locator('[data-fprobe]').first().click({ timeout: 4000, noWaitAfter: true }).catch(() => {});
  const frames = [];
  for (let i = 0; i < 6; i++) { await page.waitForTimeout(250); frames.push(await page.evaluate(() => [location.pathname, Math.round(performance.now())]).catch(() => null)); }
  await page.waitForTimeout(2500); await snap('afterNav');
  const docAfter = await page.evaluate(() => performance.timeOrigin).catch(() => null);
  const F = await page.evaluate(() => window.__F).catch(() => null);
  const hard = docAfter !== docBefore;
  const moved = hard || frames.some(f => f && f[0] !== path0);
  res.transition = { href, kind: !moved ? 'NO navigation (click had no effect)' : hard ? 'hard navigation (new document)' : 'in-document (SPA/Barba/swup)', clickAt: hard ? 0 : t0,
    urlFrames: frames, tweens: F ? tweens(F.muts) : [], mutationCount: F ? F.muts.length : 0 };
  fs.writeFileSync(path.join(dir, 'transition.json'), JSON.stringify(res, null, 1));
}

async function run(browser, { slug, url }) {
  const dir = path.join(OUT, slug); fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true, locale: 'en-US',
    recordVideo: { dir, size: { width: 960, height: 600 } },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  const css = []; const js = [];
  page.on('response', async r => {
    try { const ty = r.request().resourceType(); if (ty !== 'stylesheet' && ty !== 'script') return;
      const b = await r.text(); (ty === 'stylesheet' ? css : js).push([r.url(), b]); } catch (e) {}
  });
  const res = { slug, url, phases: {}, anims: {} };
  const mark = async name => { res.phases[name] = await page.evaluate(() => Math.round(performance.now())); };
  const snap = async name => { try { res.anims[name] = await page.evaluate(SNAP_ANIMS); } catch (e) {} };
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await mark('loaded');
    for (const s of [600, 1500, 3000, 5000, 8000]) { await page.waitForTimeout(s === 600 ? 600 : s - [600, 1500, 3000, 5000, 8000][[600, 1500, 3000, 5000, 8000].indexOf(s) - 1]); await snap('load@' + s); }
    // close obvious cookie banners so the content is reachable
    for (const re of [/^(accept|accept all|agree|allow all|ok|got it|akzeptieren|accetta|accepter|tout accepter|alle akzeptieren)$/i]) {
      const b = page.getByRole('button', { name: re }).first(); if (await b.isVisible().catch(() => false)) { await b.click({ timeout: 2000 }).catch(() => {}); await page.waitForTimeout(800); }
    }
    // start gates: scripted per-site steps (tools/gates.json) beat the generic text match
    const steps = GATES[slug];
    if (steps) { await mark('gateClick'); for (const st of steps) await gateStep(page, st); await snap('afterGate'); await mark('gateDone'); }
    const gate = page.locator('button, a, [role=button]').filter({ hasText: /^(enter|start|explore|begin|discover|play|let'?s go|enter site|click to start)\b/i }).first();
    if (!steps && await gate.isVisible().catch(() => false)) { await mark('gateClick'); await gate.click({ timeout: 3000, noWaitAfter: true }).catch(() => {}); await page.waitForTimeout(4000); await snap('afterGate'); }
    if (process.env.TRANSITION) { await transition(page, res, dir, snap); await page.close(); await ctx.close(); console.log(slug, "transition", res.transition && (res.transition.kind || res.transition.error), (res.transition && res.transition.tweens || []).length + " tweens"); return; }
    // hover
    await mark('hover');
    const links = page.locator('nav a, header a, a').filter({ hasText: /\S/ });
    const nl = Math.min(await links.count().catch(() => 0), 4);
    for (let i = 0; i < nl; i++) { const l = links.nth(i); if (await l.isVisible().catch(() => false)) { await l.hover({ timeout: 1500 }).catch(() => {}); await page.waitForTimeout(250); await snap('hover' + i); await page.waitForTimeout(600); } }
    // cursor step (custom-cursor dynamics show up as style tweens)
    await page.mouse.move(300, 450); await page.waitForTimeout(800); await mark('cursorStep'); await page.mouse.move(1100, 450); await page.waitForTimeout(1200);
    // scroll
    await mark('scroll');
    for (let i = 0; i < 6; i++) { for (let k = 0; k < 6; k++) { await page.mouse.wheel(0, 240); await page.waitForTimeout(80); } await page.waitForTimeout(1300); await snap('scroll' + i); }
    await mark('end');
    const F = await page.evaluate(() => window.__F);
    const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(r => [r.initiatorType, r.name.split('?')[0].slice(-90), Math.round(r.transferSize / 1024)]));
    res.gsapCalls = F.gsap.slice(0, 400); res.canvasCtx = F.ctx; res.audio = F.audio.slice(0, 30);
    res.scroll = scrollLerp(F.scroll);
    res.tweens = tweens(F.muts);
    res.mutationCount = F.muts.length;
    res.assets = resources.filter(([, n]) => /\.(glb|gltf|ktx2|basis|hdr|exr|wasm|mp3|ogg|wav|m4a|mp4|webm|riv|json|woff2?|glsl|frag|vert|svg|lottie)$/i.test(n)).slice(0, 80);
    res.css = cssDigest(css.map(c => c[1]).join('\n'));
    res.jsBytes = js.reduce((s, j) => s + j[1].length, 0);
    res.jsLibs = [...new Set(js.flatMap(([u, b]) => {
      const h = []; const s = b.slice(0, 400000);
      for (const [n, re] of [['gsap', /gsap|GreenSock/], ['ScrollTrigger', /ScrollTrigger/], ['SplitText', /SplitText/], ['Lenis', /lenis/i], ['three', /THREE\.|three\.module|WebGLRenderer/], ['ogl', /new Renderer\(|ogl\b/], ['pixi', /PIXI|pixi\.js/], ['framer-motion', /framer-motion|useMotionValue/], ['lottie', /bodymovin|lottie/i], ['howler', /Howler|howler/], ['barba', /barba/], ['swup', /swup/], ['matter', /Matter\.Engine/], ['rive', /@rive-app|rive\.wasm/], ['theatre', /@theatre/], ['curtains', /curtains/i], ['spline', /@splinetool/], ['webflow-ix2', /ix2|IX2/], ['react', /react-dom|__reactFiber/], ['vue', /__vue__|createApp\(/], ['svelte', /svelte/]]) if (re.test(s)) h.push(n);
      return h;
    }))];
    fs.writeFileSync(path.join(dir, 'source.css'), css.map(([u, b]) => `/* ${u} */\n${b}`).join('\n').slice(0, 3e6));
    fs.writeFileSync(path.join(dir, 'source.js.txt'), js.map(([u, b]) => `//// ${u} (${b.length}b)\n${b}`).join('\n').slice(0, 8e6));
    if (F.shaders.length) fs.writeFileSync(path.join(dir, 'shaders.glsl'), F.shaders.map((s, i) => `// ---- shader ${i}\n${s}`).join('\n'));
  } catch (e) { res.error = String(e.message).slice(0, 200); }
  await page.close(); await ctx.close();
  fs.writeFileSync(path.join(dir, 'forensics.json'), JSON.stringify(res, null, 1));
  console.log(slug, res.error ? 'ERR ' + res.error : `ok tweens=${(res.tweens || []).length} gsap=${(res.gsapCalls || []).length} shaders=${fs.existsSync(path.join(dir, 'shaders.glsl'))}`);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = (process.env.ONLY || '').split(',').filter(Boolean);
  const queue = SITES.filter(s => !only.length || only.includes(s.slug));
  const browser = await chromium.launch({ channel: 'chrome', headless: !process.env.HEADED, args: ['--enable-webgl', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const N = +(process.env.N || 3);
  await Promise.all(Array.from({ length: N }, async () => { while (queue.length) await run(browser, queue.shift()); }));
  await browser.close();
})();
