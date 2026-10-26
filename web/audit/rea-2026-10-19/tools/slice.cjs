// Cut the site's own code behind each motion/interaction device out of the saved bundles.
// esbuild reprints minified scripts (one statement per line, 2-space indent); for each device
// signature hit we take the smallest enclosing function (by indent) and write it, de-duplicated,
// to forensics/<slug>/device-code.md. Library internals (GSAP, three, Lenis, Howler…) are skipped.
// usage: NODE_PATH=web/node_modules node slice.cjs <forensicsDir> [slug,...]
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const [DIR, ONLY] = process.argv.slice(2);

const DEVICES = [
  ['pointer', /addEventListener\(\s*["'](mousemove|pointermove)["']|\.on\(\s*["']mousemove/],
  ['raf-lerp', /\+=\s*\([^;]{1,80}-[^;]{1,80}\)\s*\*\s*[\w.]+|lerp\(|\blerp\b\s*[:=]/],
  ['wheel-step', /["']wheel["']|deltaY/],
  ['keyboard', /["'](keydown|keyup)["']/],
  ['loader', /(preload|loader|loading)[\w.]*\s*[(=:]|progress\s*[=:]\s*[^=]|percent/i],
  ['text-split', /new\s+SplitText|SplitText\.create|splitText|split\(\s*["']["']\s*\)\.map/],
  ['reveal-timeline', /\.timeline\(\s*\{|\.fromTo\(|\.staggerFrom|stagger\s*:/],
  ['audio', /new\s+(AudioContext|webkitAudioContext|Howl)\b|createGain|\.fade\(/],
  ['page-transition', /barba\.init|history\.pushState|["']popstate["']|swup/],
  ['shader-uniforms', /uniforms\.\w+\.value\s*=|\.uniforms\[\s*["']\w+["']\s*\]|gl_FragColor/],
  ['observer', /new\s+IntersectionObserver|ScrollTrigger\.create|scrollTrigger\s*:/],
  ['cursor-dom', /cursor[\w-]*["']?\)?\.style|\.cursor\b.*(translate|style)/i],
];
const VENDOR_URL = /gsap|greensock|three|lenis|jquery|lottie|bodymovin|howler|swiper|gtag|googletag|google-analytics|analytics|hotjar|onetrust|cookie|recaptcha|sentry|facebook|fbevents|clarity|hubspot|intercom|youtube|vimeo|mapbox|polyfill|webfont|typekit|shopify|klaviyo|js.stripe.com|tiktok|linkedin|pinterest|twitter|elementor-frontend|wp-includes/i;
const VENDOR_BODY = /__VUE|createVNode|ReactCurrentOwner|__reactFiber|virtualScroll|smoothWheel|wheelMultiplier|GreenSock|_gsap\b|THREE\.REVISION|@license|Copyright \(c\)|lenis\.darkroom|howlerjs|swiper\.js/i;
const MAX_FN = 70, MAX_PER_DEVICE = 3, MAX_TOTAL = 26;

const indentOf = l => l.length - l.trimStart().length;
const opensFn = l => /(function\b[^(]*\([^)]*\)\s*\{\s*$|=>\s*\{\s*$|^\s*(async\s+)?[\w$]+\s*\([^)]*\)\s*\{\s*$|^\s*(static\s+)?(get|set)\s+[\w$]+\s*\([^)]*\)\s*\{\s*$)/.test(l);

// Smallest enclosing function that actually contains the hit and has >= MIN_FN lines;
// tiny wrappers (e.g. `lerp(t,e){return _(...)}`) climb to their parent. Too big → window.
const MIN_FN = 8;
function enclosing(lines, i) {
  let best = null; let minIndent = indentOf(lines[i]);
  for (let s = i; s >= Math.max(0, i - 600); s--) {
    const ind = indentOf(lines[s]);
    if (ind > minIndent || !opensFn(lines[s])) { if (ind < minIndent && lines[s].trim()) minIndent = ind; continue; }
    let e = -1;
    for (let k = s + 1; k < Math.min(lines.length, s + 3000); k++) if (indentOf(lines[k]) === ind && /^\s*\}/.test(lines[k])) { e = k; break; }
    if (e < i) continue; // closed before the hit: not an ancestor
    if (e - s + 1 > MAX_FN) break;
    best = [s, e];
    if (e - s + 1 >= MIN_FN) return best;
    minIndent = ind;
  }
  return best && best[1] - best[0] >= 3 ? best : [Math.max(0, i - 15), Math.min(lines.length - 1, i + 25)];
}

function scripts(slug) {
  const raw = fs.readFileSync(path.join(DIR, slug, 'source.js.txt'), 'utf8');
  return raw.split(/^\/\/\/\/ /m).filter(Boolean).map(chunk => {
    const nl = chunk.indexOf('\n');
    return { url: chunk.slice(0, nl).replace(/\s*\(\d+b\)$/, ''), code: chunk.slice(nl + 1) };
  });
}

function sliceSite(slug) {
  const out = [`# ${slug} — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)`];
  const seen = new Set(); const count = {}; let total = 0;
  for (const { url, code } of scripts(slug)) {
    if (VENDOR_URL.test(url) || code.length < 200) continue;
    let pretty;
    try { pretty = esbuild.transformSync(code, { loader: 'js', minify: false, logLevel: 'silent' }).code; } catch (e) { continue; }
    const lines = pretty.split('\n');
    for (let i = 0; i < lines.length && total < MAX_TOTAL; i++) {
      if (lines[i].length > 400) continue;
      for (const [dev, re] of DEVICES) {
        if ((count[dev] || 0) >= MAX_PER_DEVICE || !re.test(lines[i])) continue;
        const [s, e] = enclosing(lines, i);
        const body = lines.slice(s, e + 1).map(l => l.slice(0, 220)).join('\n');
        const key = body.replace(/\s+/g, '').slice(0, 300);
        if (seen.has(key) || VENDOR_BODY.test(body)) continue;
        seen.add(key); count[dev] = (count[dev] || 0) + 1; total++;
        out.push(`\n## ${dev} — ${url.split('/').slice(-2).join('/').slice(0, 80)} L${s + 1}-${e + 1} (hit L${i + 1})\n\`\`\`js\n${body}\n\`\`\``);
        i = e; break;
      }
    }
  }
  out.splice(1, 0, `devices: ${Object.entries(count).map(([d, n]) => `${d}×${n}`).join(', ') || 'none found'}`);
  fs.writeFileSync(path.join(DIR, slug, 'device-code.md'), out.join('\n'));
  return `${slug}: ${out[1]} (${out.join('\n').split('\n').length} lines)`;
}

const only = (ONLY || '').split(',').filter(Boolean);
for (const slug of fs.readdirSync(DIR)) {
  if (only.length && !only.includes(slug)) continue;
  if (!fs.existsSync(path.join(DIR, slug, 'source.js.txt'))) continue;
  try { console.log(sliceSite(slug)); } catch (e) { console.log(slug, 'ERR', e.message.slice(0, 100)); }
}
