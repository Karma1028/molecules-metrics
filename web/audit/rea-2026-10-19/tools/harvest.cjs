// Harvest creative-technique fingerprints + scroll contact sheets for reference sites.
// usage: node harvest.cjs <outDir>   (run with NODE_PATH pointing at a node_modules with playwright)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
const SITES = [
  ['loiseau', 'https://loiseau.framer.website/', 'loiseau-de'],
  ['the3key', 'https://the3key.com/', 'the3key'],
  ['kashyap', 'https://kashyaprayas.com/', 'kashyap-rayas-portfolio-26'],
  ['gucci', 'https://www.gucci.com/#/en/', 'gucci-beauty-wishes'],
  ['inmyworld', 'https://www.onedayinmyworld.com/', 'in-my-world'],
  ['onelastbeat', 'http://onelastbeat.com/', 'one-last-beat'],
  ['telekom', 'https://www.telekom.de/start', null],
  ['vana', 'https://vana.org/', 'vana'],
  ['poltronafrau', 'https://www.poltronafrau.com/it/it.html', 'poltronafrau-com'],
  ['crumbskees', 'https://crumbskees.com/', 'the-crumbskees'],
  ['pencilvania', 'https://pencilvania.stutpak.com/', 'pencilvania'],
  ['duhaihang', 'https://duhaihang.com/', null],
  ['inkwell', 'https://inkwell.tech/', 'inkwell'],
  ['exat', 'https://exat.hottype.co/', 'exat-typeface'],
  ['pienso', 'https://pienso.com/', 'pienso'],
  ['carbonation', 'https://thecarbonation.com/', 'the-carbonation'],
  ['moonsafari', 'https://www.moonsafari.archi/', 'moon-safari'],
  ['eisenberger', 'https://www.eisenberger.co.at/en/photography/', 'harald-eisenberger-photography'],
  ['gcloud', 'https://cloud.google.com/infrastructure', 'google-cloud-infrastructure'],
  ['yauch', 'https://yauch.oscilloscope.net/panorama/main_01', 'the-house-that-yauch-built'],
  ['patronus', 'https://www.harrypotter.com/patronus', null],
  ['analytical', 'https://analytical-group.com/it', null],
  ['gallipoli', 'https://sonsofgallipoli.com/', 'sons-of-gallipoli'],
  ['teletech', 'https://www.teletech.events/label', null],
  ['bleibtgleich', 'https://www.bleibtgleich.com/', null],
  ['localstudio', 'https://localstudio.fr/about', null],
  ['rxk', 'https://rxkstudio.com/', null],
  ['monogrid', 'https://monogrid.com/en/', null],
  ['frost', 'https://www.frostype.xyz/typeface/system-blank', null],
  ['peppa', 'https://www.peppasauce.love/', 'mama-joyce-peppa-sauce'],
  ['witcher', 'https://www.witchernetflix.com/en', null],
  ['marseille', 'https://marseille.laphase5.com/en', 'marseille-by-la-phase-5'],
  ['gataperduda', 'https://lagataperduda.com/en/mapa/', null],
  ['hvdmatch', 'https://www.hvdfonts.com/fonts/match', null],
  ['guess', 'https://www.barrettrm.com/typefaces/p/guess', null],
  ['zighead', 'https://www.headfonts.com/p/zighead-font/', null],
  ['zaft', 'https://wisetype.nl/collections/wt-zaft-2', null],
  ['sainturbain', 'https://www.sainturbain.com/', null],
  ['lemkus', 'https://lemkus.com/blogs/news', null],
  ['stripedev', 'https://stripe.dev/blog', null],
];

// Runs in page: library globals, script hosts, fonts, palette, CSS technique counts.
function fingerprint() {
  const w = window;
  const globals = ['gsap', 'ScrollTrigger', 'THREE', 'Lenis', 'lenis', 'LocomotiveScroll', 'barba', 'Swup', 'PIXI',
    'lottie', 'bodymovin', 'rive', 'Rive', 'SplitType', 'Splitting', 'Matter', 'p5', 'Howl', 'Tone', 'Swiper',
    'Flickity', 'Webflow', '__NEXT_DATA__', '__NUXT__', 'Vue', 'Alpine', 'jQuery', 'anime', 'Theatre', 'OGL',
    'BABYLON', 'Spline', 'Shopify', 'Framer', '__framer_importFromPackage', 'Highway', 'Taxi', 'mapboxgl', 'L']
    .filter(k => { try { return w[k] !== undefined; } catch { return false; } });
  const srcs = [...document.scripts].map(s => s.src).filter(Boolean);
  const libHints = ['gsap', 'three', 'lenis', 'locomotive', 'barba', 'swup', 'pixi', 'lottie', 'rive', 'spline',
    'split', 'matter', 'webflow', 'framer', 'next', 'nuxt', 'astro', 'svelte', 'vue', 'react', 'ogl', 'theatre',
    'howler', 'tone', 'mapbox', 'leaflet', 'cesium', 'babylon', 'unicorn', 'curtains', 'shopify', 'wordpress', 'wp-content']
    .filter(h => srcs.some(s => s.toLowerCase().includes(h)) || document.documentElement.outerHTML.slice(0, 200000).toLowerCase().includes(h + '.'));
  const hosts = [...new Set(srcs.map(s => { try { return new URL(s).host; } catch { return ''; } }))].slice(0, 12);
  const pick = sel => { const e = document.querySelector(sel); if (!e) return null; const c = getComputedStyle(e);
    return { ff: c.fontFamily.split(',')[0].replace(/["']/g, ''), fs: c.fontSize, fw: c.fontWeight, ls: c.letterSpacing, tt: c.textTransform, text: (e.innerText || '').trim().slice(0, 80) }; };
  const all = [...document.querySelectorAll('body *')].slice(0, 4000);
  const tally = {}; const bgs = {}; const fams = {};
  const bump = (o, k) => { o[k] = (o[k] || 0) + 1; };
  for (const e of all) {
    const c = getComputedStyle(e);
    if (c.mixBlendMode !== 'normal') bump(tally, 'blend:' + c.mixBlendMode);
    if (c.backdropFilter && c.backdropFilter !== 'none') bump(tally, 'backdrop-filter');
    if (c.clipPath && c.clipPath !== 'none') bump(tally, 'clip-path');
    if (c.position === 'sticky') bump(tally, 'sticky');
    if (c.position === 'fixed') bump(tally, 'fixed');
    if (c.cursor === 'none') bump(tally, 'cursor:none');
    if (c.scrollSnapType && c.scrollSnapType !== 'none') bump(tally, 'scroll-snap');
    if (c.willChange && c.willChange !== 'auto') bump(tally, 'will-change');
    if (c.filter && c.filter !== 'none') bump(tally, 'filter');
    if (c.maskImage && c.maskImage !== 'none') bump(tally, 'mask');
    if (c.writingMode && c.writingMode.startsWith('vertical')) bump(tally, 'vertical-text');
    if (c.backgroundColor && c.backgroundColor !== 'rgba(0, 0, 0, 0)') bump(bgs, c.backgroundColor);
    if (e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) bump(fams, c.fontFamily.split(',')[0].replace(/["']/g, '') + ' ' + c.fontWeight);
  }
  const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
  const body = getComputedStyle(document.body);
  return {
    title: document.title.slice(0, 90),
    globals, libHints, hosts,
    counts: { canvas: document.querySelectorAll('canvas').length, video: document.querySelectorAll('video').length,
      svg: document.querySelectorAll('svg').length, img: document.images.length, iframe: document.querySelectorAll('iframe').length,
      audio: document.querySelectorAll('audio').length, sections: document.querySelectorAll('section').length,
      links: document.querySelectorAll('a').length, splitChars: document.querySelectorAll('[class*="char"],[class*="word"],[class*="line"]').length },
    pageHeightVh: +(document.documentElement.scrollHeight / innerHeight).toFixed(1),
    body: { bg: body.backgroundColor, color: body.color, ff: body.fontFamily.split(',')[0] },
    h1: pick('h1'), h2: pick('h2'), p: pick('p'),
    fontsLoaded: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')))].slice(0, 10),
    topFonts: top(fams, 6), topBgs: top(bgs, 6), css: tally,
  };
}

async function harvest(browser, [slug, url]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  const page = await ctx.newPage();
  const res = { slug, url };
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await page.waitForTimeout(6000); // loaders/intros
    const shots = [];
    shots.push(await page.screenshot({ type: 'jpeg', quality: 50, timeout: 60000, animations: 'disabled' }));
    await page.mouse.move(720, 450);
    for (let i = 0; i < 3; i++) { // wheel, not scrollTo, so smooth-scroll libs react
      for (let k = 0; k < 8; k++) { await page.mouse.wheel(0, 260); await page.waitForTimeout(90); }
      await page.waitForTimeout(1500);
      shots.push(await page.screenshot({ type: 'jpeg', quality: 50, timeout: 60000, animations: 'disabled' }));
    }
    res.fp = await page.evaluate(fingerprint);
    res.finalUrl = page.url();
    // contact sheet: 2x2 grid rendered by the browser itself
    const imgs = shots.map(b => `<img src="data:image/jpeg;base64,${b.toString('base64')}">`).join('');
    const sheet = await ctx.newPage();
    await sheet.setViewportSize({ width: 1440, height: 900 });
    await sheet.setContent(`<style>body{margin:0;display:grid;grid-template-columns:1fr 1fr;gap:4px;background:#111}img{width:100%;display:block}</style>${imgs}`);
    await sheet.waitForTimeout(300);
    await sheet.screenshot({ path: path.join(OUT, `${slug}.jpg`), type: 'jpeg', quality: 60, fullPage: true, timeout: 60000 });
  } catch (e) { res.error = String(e.message).slice(0, 160); }
  await ctx.close();
  fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(res, null, 1));
  console.log(slug, res.error ? 'ERR ' + res.error : 'ok');
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', args: ['--enable-webgl', '--ignore-gpu-blocklist'] });
  const only=(process.env.ONLY||'').split(','); const queue = SITES.filter(s=>!only[0]||only.includes(s[0])); const N = 5;
  await Promise.all(Array.from({ length: N }, async () => { while (queue.length) await harvest(browser, queue.shift()); }));
  await browser.close();
})();
