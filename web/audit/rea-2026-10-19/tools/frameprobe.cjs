// Frame-time probe: artist tab changes + pointer sweep. Reports p50/p95/max frame ms and frames >33ms.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await p.goto('http://localhost:5177/artist', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);
  const rec = () => p.evaluate(() => { window.__f = []; let l = performance.now(); const t = (n) => { window.__f.push(n - l); l = n; if (window.__f.length < 400) requestAnimationFrame(t) }; requestAnimationFrame(t) });
  const stat = async (label) => { const f = (await p.evaluate(() => window.__f)).slice(1).sort((a, b) => a - b); const q = (x) => f[Math.floor(x * (f.length - 1))].toFixed(1); console.log(label, 'n', f.length, 'p50', q(.5), 'p95', q(.95), 'max', f.at(-1).toFixed(1), 'janky>33', f.filter((x) => x > 33).length) };
  await rec();
  for (const t of ['Gallery', 'Sound', 'Matchday', 'Field Notes', 'About']) { await p.locator('header.nav a', { hasText: t }).first().click(); await p.waitForTimeout(900); }
  await stat('tabs');
  await rec();
  await p.mouse.move(100, 400);
  for (let i = 0; i < 120; i++) await p.mouse.move(100 + i * 9, 400 + Math.sin(i / 8) * 200);
  await p.waitForTimeout(500);
  await stat('pointer');
  await b.close();
})().catch((e) => { console.error(String(e).slice(0, 300)); process.exit(1); });
