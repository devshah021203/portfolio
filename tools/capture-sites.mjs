// Capture live sites for the portfolio: a desktop hero (1600x1000) and a phone hero (780x1688).
// Usage: node tools/capture-sites.mjs [slug ...]   (writes PNGs to /tmp, then cwebp → public/projects/screenshots)
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = new URL('../public/projects/screenshots/', import.meta.url).pathname;
const TMP = '/tmp/claude-501/v5-capture';
mkdirSync(TMP, { recursive: true });

const SITES = {
  voyagea: 'https://voyagea.travel/',
  'ak-builds-plumbing': 'https://akbuildsandplumbing.ca/',
  'trik-studio': 'https://trikstudio.in/',
  'keri-in-windsor': 'https://keriinwindsor.ca/',
  skyvage: 'https://skyvageweb.vercel.app/',
  chargebuddy: 'https://chargebuddy.in/',
  'saturday-table': 'https://thesaturdaytable.ca/',
  'ptri-innovation': 'https://www.ptriinnovation.com/',
  ptrionix: 'https://ptrionix.vercel.app/',
  'vr-engineering': 'https://vreng-demo.vercel.app/',
  'uncle-bobs-popcorn': 'https://glistening-sundae-083886.netlify.app/',
  'kake-da-dhaba': 'https://kake-da-dhaba.vercel.app/',
  'donnas-fashions': 'https://donnasfashions-sample.netlify.app/',
  'garrod-pickfield': 'https://garrodpickfield-sample.netlify.app/',
};
const pick = process.argv.slice(2);
const list = Object.entries(SITES).filter(([k]) => !pick.length || pick.includes(k));

const VIEWS = [
  { suffix: '', w: 1280, h: 800, scale: 1.25, mobile: false },
  { suffix: '-phone', w: 390, h: 844, scale: 2, mobile: true },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function capture(url, file, v) {
  const port = 9400 + Math.floor(Math.random() * 500);
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${port}`, `--window-size=${v.w},${v.h}`,
    '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist',
    '--no-first-run', '--no-default-browser-check', `--user-data-dir=${TMP}/profile-${port}`,
    '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let ws, id = 0; const pending = new Map();
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); setTimeout(() => rej(new Error('timeout ' + method)), 20000); });
  try {
    let targets;
    for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(250); } }
    ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));
    ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(JSON.stringify(d.error))) : p.res(d.result); } };
    await send('Emulation.setDeviceMetricsOverride', { width: v.w, height: v.h, deviceScaleFactor: v.scale, mobile: v.mobile });
    if (v.mobile) await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
    await send('Emulation.setFocusEmulationEnabled', { enabled: true });
    await send('Page.enable');
    await send('Page.navigate', { url });
    await sleep(9000); // heroes animate in; give fonts, photos and WebGL time to settle
    // Back to the hero, dismiss cookie notices, drop host badges that are not part of the design.
    await send('Runtime.evaluate', { expression: `(()=>{history.scrollRestoration='manual';window.scrollTo(0,0);
      [...document.querySelectorAll('button')].filter(b=>/^(got it|accept|ok|not now|×|✕)$/i.test(b.textContent.trim()) || /close|dismiss/i.test(b.getAttribute('aria-label')||'')).forEach(b=>b.click());
      document.querySelectorAll('[class*="netlify"],[id*="netlify"],iframe[src*="netlify"]').forEach(e=>e.remove());})()` });
    await sleep(2500);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const png = `${TMP}/${file}.png`;
    await import('node:fs').then((fs) => fs.writeFileSync(png, Buffer.from(shot.data, 'base64')));
    execFileSync('cwebp', ['-quiet', '-q', '82', png, '-o', `${OUT}${file}.webp`]);
    console.log('ok', file);
  } catch (e) { console.log('FAIL', file, e.message); }
  finally { chrome.kill(); }
}

for (const [slug, url] of list) {
  await Promise.all(VIEWS.map((v) => capture(url, slug + v.suffix, v)));
}
