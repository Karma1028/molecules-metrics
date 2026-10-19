// Headline entrance QA: crop the h1 at fixed times after it is shown.
const { chromium } = require('playwright');
const out = process.argv[2];
const base = 'http://localhost:5177';
const pages = (process.argv[3] || 'artist,analyst,analyst/work,artist/contact').split(',').map((s) => '/' + s);
const times = [120, 350, 700, 1600];
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  p.setDefaultTimeout(8000);
  for (const path of pages) {
    const name = path.replace(/\//g, '_') || 'root';
    await p.goto(base + path, { waitUntil: 'domcontentloaded' });
    const h = p.locator('h1.hl-write, h1.hl-count').first();
    await h.waitFor({ state: 'attached' });
    // wait for the entrance class, then sample
    await p.waitForFunction(() => document.querySelector('h1.in'));
    const t0 = Date.now();
    for (const t of times) {
      const wait = t - (Date.now() - t0);
      if (wait > 0) await p.waitForTimeout(wait);
      const bb = await h.boundingBox();
      if (!bb) { console.log(name, 'no box'); break; }
      await p.screenshot({ path: `${out}/${name}-${String(t).padStart(4, '0')}.png`, clip: { x: Math.max(0, bb.x - 10), y: Math.max(0, bb.y - 10), width: Math.min(bb.width + 20, 700), height: Math.min(bb.height + 20, 300) } });
    }
    console.log(name, 'ok');
  }
  await b.close();
})().catch((e) => { console.error(String(e).slice(0, 400)); process.exit(1); });
