// Pointer UI QA: real mouse in headless Chromium, 2x crops around the pointer.
const { chromium } = require('playwright');
const out = process.argv[2];
const base = process.argv[3] || 'http://localhost:5177';
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  p.setDefaultTimeout(8000);
  const crop = async (name, x, y, w = 220, h = 160) => {
    console.log(name);
    await p.screenshot({ path: `${out}/${name}.png`, clip: { x: Math.max(0, x - w / 2), y: Math.max(0, y - h / 2), width: w, height: h } });
  };
  const centre = (bb) => ({ x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 });
  await p.goto(base + '/artist', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(3000);
  await p.mouse.move(200, 640); await p.mouse.move(260, 660, { steps: 8 }); await p.waitForTimeout(1500);
  await crop('a1-rest', 260, 660);
  await p.mouse.move(760, 600, { steps: 3 }); await p.waitForTimeout(50);
  await crop('a2-fast', 600, 615, 420, 160);
  const nav = centre(await p.locator('header a, nav a').nth(2).boundingBox());
  await p.mouse.move(nav.x, nav.y, { steps: 10 }); await p.waitForTimeout(1500);
  await crop('a3-hover', nav.x, nav.y + 12);
  await p.mouse.down(); await p.waitForTimeout(200); await crop('a4-press', nav.x, nav.y + 12); await p.mouse.up();
  await p.screenshot({ path: `${out}/a5-full.png` });
  const sw = centre(await p.getByRole('link', { name: /analyst/i }).first().boundingBox());
  await p.mouse.move(sw.x, sw.y, { steps: 10 }); await p.waitForTimeout(1000);
  await p.mouse.click(sw.x, sw.y);
  for (const t of [80, 250, 700]) { await p.waitForTimeout(t === 80 ? 80 : t - 80); await crop(`b1-handoff-${t}`, sw.x, sw.y + 30, 300, 180); }
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${out}/b0-after-switch.png` });
  await p.mouse.move(520, 520, { steps: 10 }); await p.waitForTimeout(500);
  await crop('b2-rest', 560, 530, 360, 160);
  const an = centre(await p.locator('header a, nav a').nth(3).boundingBox());
  await p.mouse.move(an.x, an.y, { steps: 10 }); await p.waitForTimeout(1000);
  await crop('b3-lock', an.x + 50, an.y + 12, 360, 130);
  await p.screenshot({ path: `${out}/b4-full.png` });
  await b.close();
})().catch((e) => { console.error(String(e).slice(0, 400)); process.exit(1); });
