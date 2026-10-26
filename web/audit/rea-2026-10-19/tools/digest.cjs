// Turn forensics/<slug>/forensics.json into a compact, evidence-only motion-digest.md.
// Clusters tweens into choreography groups: phase, element class, property, duration, ease, stagger.
// usage: node digest.cjs <forensicsDir>
const fs = require('fs');
const path = require('path');
const DIR = process.argv[2];

const phaseOf = (t, ph) => {
  const order = [['load', ph.loaded || 0], ['gate', ph.gateClick], ['hover', ph.hover], ['cursor', ph.cursorStep], ['scroll', ph.scroll], ['end', ph.end]]
    .filter(([, v]) => v != null);
  let p = 'load'; for (const [n, v] of order) if (t >= v) p = n; return p;
};
const med = a => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const cls = el => el.replace(/@.*/, '');

function shaderNotes(src) {
  if (!src) return null;
  const uni = [...new Set([...src.matchAll(/uniform\s+\w+\s+(\w+)/g)].map(m => m[1]))].slice(0, 25);
  const tags = [['noise', /noise|snoise|fbm|perlin|simplex/i], ['fxaa', /FXAA/], ['displacement', /displace|uDisp/i], ['rgb-shift', /rgbShift|chromatic|aberration/i],
    ['grain', /grain|random\(|rand\(/i], ['blur', /blur|kawase|gaussian/i], ['distortion/wave', /sin\(.*uTime|wave/i], ['mouse', /uMouse|mouse/i], ['scroll', /uScroll|scroll/i],
    ['texture sampling', /texture2D|texture\(/], ['particles', /gl_PointSize/], ['fresnel/lighting', /fresnel|normal|light/i]].filter(([, re]) => re.test(src)).map(([n]) => n);
  return { shaders: (src.match(/---- shader/g) || []).length, uniforms: uni, features: tags };
}

function digest(slug) {
  const f = path.join(DIR, slug, 'forensics.json'); if (!fs.existsSync(f)) return null;
  const r = JSON.parse(fs.readFileSync(f, 'utf8'));
  const L = [`# ${slug} — ${r.url}`];
  if (r.error) { L.push(`ERROR: ${r.error}`); return L.join('\n'); }
  L.push(`- libs (bundle regex): ${r.jsLibs.join(', ') || 'none'} · JS ${r.jsBytes >> 10} KB · CSS ${r.css.cssBytes >> 10} KB · style mutations ${r.mutationCount}`);
  L.push(`- smooth scroll: ${r.scroll.native ? 'native (no lerp detected on window scroll)' : `lerp≈${r.scroll.lerpEquivalent}/frame (decay ${r.scroll.decayPerFrame}, n=${r.scroll.samples})`}`);
  L.push(`- canvas contexts: ${r.canvasCtx.map(c => c[1] + ' ' + c[2] + '@' + c[0] + 'ms').join(', ') || 'none'}`);
  const sh = shaderNotes(fs.existsSync(path.join(DIR, slug, 'shaders.glsl')) ? fs.readFileSync(path.join(DIR, slug, 'shaders.glsl'), 'utf8') : '');
  if (sh) L.push(`- shaders: ${sh.shaders} · features: ${sh.features.join(', ')} · uniforms: ${sh.uniforms.join(', ')}`);
  if (r.audio.length) L.push(`- audio/media: ${r.audio.map(a => a.slice(1).join(' ')).slice(0, 6).join(' | ')}`);
  if (r.gsapCalls.length) L.push(`- GSAP global calls: ${r.gsapCalls.length}; first: ${r.gsapCalls.slice(0, 6).map(g => `${g[1]}(${g[2]}) ${g[3]}`).join(' ; ').slice(0, 700)}`);
  const c = r.css;
  L.push(`- CSS easings: ${c.beziers.slice(0, 6).map(([b, n]) => `${b}×${n}`).join(', ') || 'none'}`);
  L.push(`- CSS durations: ${c.durations.slice(0, 8).map(([d, n]) => `${d}×${n}`).join(', ')}`);
  L.push(`- CSS keyframes (${c.keyframes.length}): ${c.keyframes.slice(0, 10).map(k => k.name + ' {' + k.body.slice(0, 90) + '}').join(' | ')}`);
  L.push(`- CSS features: ${Object.entries(c.features).filter(([, n]) => n).map(([k, n]) => `${k}×${n}`).join(', ')}`);
  L.push(`- top transitions: ${c.transitions.slice(0, 5).map(([t, n]) => `${t.replace('transition:', '').trim()}×${n}`).join(' | ')}`);
  // running CSS/WAAPI animations (deduped)
  const seen = new Map();
  for (const [ph, list] of Object.entries(r.anims)) for (const a of list) {
    const k = [a.type, a.name, a.target, a.duration, a.easing].join('|');
    if (!seen.has(k)) seen.set(k, { ...a, ph });
  }
  if (seen.size) {
    L.push(`\n## Running CSS/WAAPI animations (${seen.size} unique)`);
    for (const a of [...seen.values()].slice(0, 25)) L.push(`- [${a.ph}] ${a.type} ${a.name} on ${a.target}: ${a.duration}ms ${a.easing} delay ${a.delay} iter ${a.iterations}${a.kf.length ? ' kf ' + JSON.stringify(a.kf).slice(0, 160) : ''}`);
  }
  // tween clusters
  const groups = new Map();
  for (const t of r.tweens) {
    const ph = phaseOf(t.start, r.phases);
    const k = [ph, cls(t.el), t.prop, Math.round(t.dur / 50) * 50, t.ease].join('|');
    const g = groups.get(k) || { ph, el: cls(t.el), prop: t.prop, dur: Math.round(t.dur / 50) * 50, ease: t.ease, starts: [], from: [], to: [], rmse: [] };
    g.starts.push(t.start); g.from.push(t.from); g.to.push(t.to); g.rmse.push(t.rmse); groups.set(k, g);
  }
  const G = [...groups.values()].sort((a, b) => a.starts[0] - b.starts[0]);
  L.push(`\n## JS-driven tween clusters (${r.tweens.length} tweens → ${G.length} groups; times ms from navigation; phases ${JSON.stringify(r.phases)})`);
  for (const g of G.slice(0, 45)) {
    const st = g.starts.slice(1).map((s, i) => s - g.starts[i]);
    L.push(`- [${g.ph} @${g.starts[0]}] ${g.el} · ${g.prop} ${med(g.from)}→${med(g.to)} · ${g.dur}ms · ${g.ease} (rmse ${med(g.rmse)})${g.starts.length > 1 ? ` · ×${g.starts.length}, stagger ~${med(st)}ms` : ''}`);
  }
  if (r.assets.length) L.push(`\n## Notable assets\n` + r.assets.filter(a => !/\.(woff2?|svg)$/i.test(a[1])).slice(0, 15).map(a => `- ${a[0]} ${a[1]} ${a[2]}KB`).join('\n'));
  L.push(`\nRaw: forensics/${slug}/ (forensics.json, source.css, source.js.txt${sh ? ', shaders.glsl' : ''}, *.webm video of the run)`);
  return L.join('\n');
}

for (const slug of fs.readdirSync(DIR)) {
  const d = digest(slug); if (!d) continue;
  fs.writeFileSync(path.join(DIR, slug, 'motion-digest.md'), d);
  console.log(slug, d.split('\n').length + ' lines');
}
