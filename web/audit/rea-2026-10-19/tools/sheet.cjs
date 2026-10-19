// Contact sheet: tile PNGs from a folder into one screenshot.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const dir = path.resolve(process.argv[2]);
const out = process.argv[3];
const only = process.argv[4] ? new RegExp(process.argv[4]) : /./;
const h = Number(process.argv[5] || 170);
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png') && only.test(f)).sort();
const html = `<body style="margin:0;background:#888;display:flex;flex-wrap:wrap;gap:6px;padding:6px;width:1180px;font:12px monospace">` +
  files.map((f) => `<figure style="margin:0;background:#fff"><img src="${pathToFileURL(path.join(dir, f)).href}" style="height:${h}px;display:block"><figcaption>${f}</figcaption></figure>`).join('') + '</body>';
const sheet = path.join(dir, '_sheet.html');
fs.writeFileSync(sheet, html);
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1192, height: 400 } });
  await p.goto(pathToFileURL(sheet).href);
  await p.waitForTimeout(500);
  await p.screenshot({ path: out, fullPage: true });
  await b.close();
})();
