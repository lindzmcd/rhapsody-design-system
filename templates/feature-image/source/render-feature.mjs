// RHAPSODY FEATURE IMAGE · render + QA · usage:
//   NODE_PATH=/opt/node-tools/node_modules node render-feature.mjs my-page-feature.html
// Outputs: <name>-image.png (2400×1260) and <name>-motif.png (zoom crop).
// PASS only when: fonts=Poppins true, no single-word H1 line, and the motif
// crop is EYEBALLED for overlaps/floating pieces before the PNG ships.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, existsSync } from 'node:fs';
const file = process.argv[2];
if (!file) { console.error('usage: node render-feature.mjs <file.html>'); process.exit(1); }
const base = file.replace(/\.html$/, '');
const dir = process.cwd();
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
const fontCssPath = dir + '/fonts/local-fonts.css';
if (existsSync(fontCssPath)) await p.route('**://fonts.googleapis.com/**', r => r.abort());
await p.goto('file://' + dir + '/' + file);
if (existsSync(fontCssPath)) await p.addStyleTag({ content: readFileSync(fontCssPath, 'utf8') });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
const info = await p.evaluate(() => {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;width:0;height:0;overflow:hidden;';
  const s1 = document.createElement('span'); s1.textContent = 'hamburgefonstiv';
  // Compare against a monospace fallback: if Poppins is missing, both spans
  // render in the same fallback face and the widths match.
  s1.style.cssText = 'font:500 60px Poppins, monospace;';
  const s2 = s1.cloneNode(true); s2.style.font = '500 60px monospace';
  wrap.append(s1, s2); document.body.append(wrap);
  const poppins = Math.abs(s1.getBoundingClientRect().width - s2.getBoundingClientRect().width) > 4;
  wrap.remove();
  const lines = [];
  for (const sel of ['h1', '.eyeb', '.lock']) {
    const el = document.querySelector(sel); if (!el) continue;
    const range = document.createRange(); const out = []; let last = null;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const re = /\S+/g; let m;
      while ((m = re.exec(node.textContent))) {
        range.setStart(node, m.index); range.setEnd(node, m.index + m[0].length);
        const top = Math.round(range.getBoundingClientRect().top);
        if (last === null || Math.abs(top - last) > 6) { out.push([]); last = top; }
        out[out.length - 1].push(m[0]);
      }
    }
    lines.push([sel, out.map(w => w.join(' '))]);
  }
  return { poppins, lines };
});
let fail = false;
if (!info.poppins) { console.error('FAIL: Poppins did not load'); fail = true; }
for (const [sel, ls] of info.lines) {
  console.log(sel, JSON.stringify(ls));
  if (ls.length > 1 && ls[ls.length - 1].split(' ').length < 2)
    { console.error(`FAIL: single-word last line in ${sel} ("${ls[ls.length-1]}") — glue with &nbsp;`); fail = true; }
}
await p.locator('.mk svg').screenshot({ path: `${dir}/${base}-motif.png` });
await p.screenshot({ path: `${dir}/${base}-image.png` });
await b.close();
console.log(fail ? 'CHECKS FAILED — fix before shipping' : `OK — now EYEBALL ${base}-motif.png for messy lines, then ship ${base}-image.png`);
process.exit(fail ? 1 : 0);
