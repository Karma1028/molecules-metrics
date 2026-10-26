// Full-viewport shot of routes after load settles. usage: node pageshot.cjs <outDir> <routes,comma> [w] [h] [waitMs]
const { chromium } = require('playwright');
const fs = require('fs');
const [out, routes] = [process.argv[2], (process.argv[3] || 'artist').split(',')];
const w = Number(process.argv[4] || 1280), h = Number(process.argv[5] || 800), wait = Number(process.argv[6] || 2500);
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const cdp = await p.context().newCDPSession(p);
  for (const r of routes) {
    await p.goto('http://localhost:5177/' + r, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(wait);
    const png = (await cdp.send('Page.captureScreenshot', { format: 'png' })).data;
    fs.writeFileSync(`${out}/${r.replace(/\//g, '_')}-${w}.png`, Buffer.from(png, 'base64'));
  }
  await b.close();
})().catch((e) => { console.error(String(e).slice(0, 300)); process.exit(1); });
