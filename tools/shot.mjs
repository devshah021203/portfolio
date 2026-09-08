// Headless-Chrome screenshot + probe over CDP.
// Usage: node tools/shot.mjs out.png [--w 1440 --h 900 --full] [--url http://localhost:4415/] [--eval 'js'] [--wait 4000]
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const args = process.argv.slice(2);
const out = args[0] ?? 'shot.png';
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const W = Number(opt('w', 1440)), H = Number(opt('h', 900));
const full = args.includes('--full');
const url = opt('url', 'http://localhost:4415/');
const evalJs = opt('eval', '');
const wait = Number(opt('wait', 4500));
const mobile = W < 700;
const port = 9333 + Math.floor(Math.random() * 500);

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--window-size=${W},${H}`,
  '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist',
  '--no-first-run', '--no-default-browser-check', `--user-data-dir=/tmp/claude-501/v5-chrome-${port}`,
  '--hide-scrollbars', 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
try {
  let targets;
  for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(250); } }
  const page = targets.find((t) => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  const logs = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(JSON.stringify(d.error))) : p.res(d.result); } else if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') logs.push(d.params.args.map(a => a.value ?? a.description).join(' ')); else if (d.method === 'Runtime.exceptionThrown') logs.push(d.params.exceptionDetails.text + ' ' + (d.params.exceptionDetails.exception?.description ?? '')); };
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile });
  await send('Emulation.setFocusEmulationEnabled', { enabled: true });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url });
  await sleep(wait);
  let probe = null;
  if (evalJs) {
    const r = await send('Runtime.evaluate', { expression: `(async()=>{${evalJs}})()`, awaitPromise: true, returnByValue: true });
    probe = r.exceptionDetails ? { error: r.exceptionDetails.text, detail: r.exceptionDetails.exception?.description } : (r.result.value ?? r.result);
    await sleep(800);
  }
  let clip;
  if (full) {
    const m = await send('Page.getLayoutMetrics');
    const h = Math.ceil(m.cssContentSize.height);
    // Keep the viewport at H so 100vh sections stay honest; mark reveals as visible.
    await send('Runtime.evaluate', { expression: 'document.querySelectorAll("[data-reveal]").forEach(e=>e.classList.add("is-in"))' });
    // Walk the page so lazy images load, then return to the top.
    await send('Runtime.evaluate', { expression: `(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}window.scrollTo(0,0);})()`, awaitPromise: true });
    await sleep(1500);
    clip = { x: 0, y: 0, width: W, height: h, scale: 1 };
  }
  const shot = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip, captureBeyondViewport: true } : {}) });
  writeFileSync(out, Buffer.from(shot.data, 'base64'));
  console.log(JSON.stringify({ out, probe, errors: logs }, null, 2));
} finally { chrome.kill(); }
