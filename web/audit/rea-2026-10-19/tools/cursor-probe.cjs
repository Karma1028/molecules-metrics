// Reverse-engineer a custom cursor's follow dynamics: step the mouse 500px, sample the
// cursor element's centre each animation frame, report size, lag (t63/t95), overshoot.
// usage: NODE_PATH=web/node_modules node cursor-probe.cjs <url> [<url>...]
const { chromium } = require('playwright');

const SAMPLE = () => new Promise(resolve => {
  // candidates: fixed/absolute, small, pointer-events:none, near the pointer
  const cands = [...document.querySelectorAll('body *')].filter(e => {
    const c = getComputedStyle(e); const r = e.getBoundingClientRect();
    return (c.position === 'fixed' || c.position === 'absolute') && c.pointerEvents === 'none'
      && r.width > 2 && r.width < 140 && r.height > 2 && r.height < 140;
  });
  const t0 = performance.now(); const frames = [];
  const tick = () => {
    const t = performance.now() - t0;
    frames.push({ t, pos: cands.map(e => { const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width]; }) });
    if (t < 1500) requestAnimationFrame(tick);
    else resolve({ n: cands.length, frames, info: cands.map(e => {
      const c = getComputedStyle(e);
      return { tag: e.tagName, cls: String(e.className).slice(0, 40), bg: c.backgroundColor, border: c.borderWidth + ' ' + c.borderColor,
        blend: c.mixBlendMode, radius: c.borderRadius, transition: c.transition.slice(0, 80) };
    }) });
  };
  requestAnimationFrame(tick);
});

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const url of process.argv.slice(2)) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
      await page.waitForTimeout(5000);
      await page.mouse.move(400, 450, { steps: 10 }); await page.waitForTimeout(1200);
      const probe = page.evaluate(SAMPLE);
      await page.waitForTimeout(50);
      await page.mouse.move(900, 450); // instantaneous 500px step
      const { n, frames, info } = await probe;
      const out = [];
      for (let i = 0; i < n; i++) {
        const xs = frames.map(f => [f.t, f.pos[i][0]]);
        const x0 = xs[0][1], x1 = xs[xs.length - 1][1], d = x1 - x0;
        if (Math.abs(d) < 200) continue; // did not follow the pointer
        const tAt = p => (xs.find(([, x]) => (x - x0) / d >= p) || [NaN])[0];
        const max = Math.max(...xs.map(([, x]) => (x - x0) / d));
        out.push({ ...info[i], size: Math.round(frames[0].pos[i][2]), t63: Math.round(tAt(0.63)), t95: Math.round(tAt(0.95)), overshootPct: +((max - 1) * 100).toFixed(1) });
      }
      console.log(JSON.stringify({ url, followers: out }, null, 1));
    } catch (e) { console.log(url, 'ERR', e.message.slice(0, 120)); }
    await page.close();
  }
  await browser.close();
})();
