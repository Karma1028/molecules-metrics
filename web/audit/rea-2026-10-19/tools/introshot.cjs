// Landing intro QA: full-viewport frames at fixed times after the intro mounts.
// usage: node introshot.cjs <outDir> [theme light|dark] [width] [height]
const { chromium } = require('playwright');
const out = process.argv[2];
const theme = process.argv[3] || 'light';
const w = Number(process.argv[4] || 1280), h = Number(process.argv[5] || 800);
const times = (process.env.T || '80,300,560,820,1000,1250,1600,2000,2500,2900,3300').split(',').map(Number);
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.setDefaultTimeout(8000);
  await p.goto(`http://localhost:5177/?intro=1&theme=${theme}`, { waitUntil: 'domcontentloaded' });
  await p.waitForSelector('.kp', { state: 'attached' });
  // CDP capture: page.screenshot waits on web fonts, which the live landing can hold open
  const cdp = await p.context().newCDPSession(p);
  const shot = async (file) => require('fs').writeFileSync(file, Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
  const t0 = Date.now();
  for (const t of times) {
    const wait = t - (Date.now() - t0);
    if (wait > 0) await p.waitForTimeout(wait);
    await shot(`${out}/${theme}-${w}-${String(t).padStart(4, '0')}.png`);
  }
  const left = await p.evaluate(() => ({ kp: !!document.querySelector('.kp'), paused: document.documentElement.hasAttribute('data-intro') }));
  console.log(theme, w, JSON.stringify(left));
  await b.close();
})().catch((e) => { console.error(String(e).slice(0, 400)); process.exit(1); });
