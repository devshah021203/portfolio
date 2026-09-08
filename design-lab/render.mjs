// Renders every case piece to public/designs/<brand>/<slug>.webp plus lockup
// images, and writes data/designs.ts. Usage: node design-lab/render.mjs [brand ...]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';
import { FONTS, brands, brandOrder } from './brands.mjs';
import { cases } from './cases.mjs';
import { baseCss } from './scenes.mjs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const args = process.argv.slice(2);
const lockupsOnly = args.includes('--lockups');
const slugArg = args.find((a) => a.startsWith('--slug='));
const onlySlug = slugArg ? slugArg.slice(7) : null;
const only = args.filter((a) => !a.startsWith('--'));
const port = 9700 + Math.floor(Math.random() * 200);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--window-size=1600,1600', '--hide-scrollbars',
  '--no-first-run', '--no-default-browser-check', `--user-data-dir=/tmp/claude-501/v5-lab-${port}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });

// Mark colourways that read on a dark ground, per brand.
const DARK = {
  keri: { fruit: "#F5A623", leaf: "#7FBF8E", light: "#FFE2A0" },
  voyagea: { bg: "none", route: "#FF7A3D", pin: "#F6F1E7" },
  ptri: { line: "#F2EEE6", node: "#FF6A1F" },
  dwello: { shell: "#F4F4F2", ink: "#15171C" },
  beamfall: { bg: "#12131F" },
  ak: { ring: "#F7F5F0", ink: "#F7F5F0", accent: "#C89B3C", bg: "none" },
  trik: { floor: "#B08D57", left: "#EFE9DE", right: "#8A7462" },
  skyvage: { ink: "#D9DEE8", accent: "#D4B36A" },
  riverside: { ring: "#F3EBDD", water: "#C8763A" },
  ambassador: { ink: "#F5F1E8", accent: "#F2C230" },
  pol: { ink: "#F0E6C8", accent: "#D9A66C" },
  honey: { ink: "#FBF1D6", drop: "#E39B1E" },
  ferry: { ink: "#FFFFFF", accent: "#F25C2A" },
  bakery: { ink: "#3D2A1A", accent: "#F3C96B" },
};
const LIGHT = {
  voyagea: { bg: "none", route: "#1C2A5A", pin: "#FF7A3D" },
  ptri: { line: "#0B0B14", node: "#FF6A1F" },
  dwello: { shell: "#15171C", ink: "#F4F4F2" },
  ferry: { ink: "#0F2A44", accent: "#F25C2A" },
  skyvage: { ink: "#0B1020", accent: "#D4B36A" },
  ak: { bg: "none" },
};
// Text colours for the lockup renders.
const LOCKUP_TEXT = {
  keri: ["#2A1A08", "#FBF3E4"], voyagea: ["#141A2E", "#F6F1E7"], ptri: ["#0B0B14", "#F2EEE6"], dwello: ["#15171C", "#F4F4F2"],
  beamfall: ["#07070C", "#FFFFFF"], ak: ["#10243E", "#F7F5F0"], trik: ["#1E1A16", "#EFE9DE"], skyvage: ["#0B1020", "#D9DEE8"],
  riverside: ["#3B2416", "#F3EBDD"], ambassador: ["#1C2B3A", "#F5F1E8"], pol: ["#1E2A5C", "#F0E6C8"], honey: ["#2B1D0E", "#FBF1D6"],
  ferry: ["#0F2A44", "#FFFFFF"], bakery: ["#3D2A1A", "#F7EEDF"],
};

async function shot(html, w, h, out, { alpha = false, thumb = true, fit = null } = {}) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  if (alpha) await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  else await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 255, g: 255, b: 255, a: 1 } });
  const { frameTree } = await send('Page.getFrameTree');
  await send('Page.setDocumentContent', { frameId: frameTree.frame.id, html });
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(()=>new Promise(r=>setTimeout(r,500)))', awaitPromise: true });
  const s = await send('Page.captureScreenshot', { format: 'png' });
  let png = Buffer.from(s.data, 'base64');
  if (fit) {
    // Trim to content, scale to fit, and centre on a transparent canvas.
    const trimmed = await sharp(png).trim({ threshold: 1 }).toBuffer();
    const inner = await sharp(trimmed).resize({ width: fit.w - 120, height: fit.h - 90, fit: 'inside', withoutEnlargement: true }).toBuffer();
    const meta = await sharp(inner).metadata();
    png = await sharp({ create: { width: fit.w, height: fit.h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: inner, left: Math.round((fit.w - meta.width) / 2), top: Math.round((fit.h - meta.height) / 2) }]).png().toBuffer();
  }
  await sharp(png).webp({ quality: 86, alphaQuality: 90 }).toFile(`${out}.webp`);
  if (thumb) await sharp(png).resize(720).webp({ quality: 80 }).toFile(`${out}-thumb.webp`);
}

const doc = (css, html) => `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>${baseCss}${css}</style></head><body>${html}</body></html>`;

try {
  let targets;
  for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(250); } }
  const page = targets.find((t) => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(JSON.stringify(d.error))) : p.res(d.result); } };
  await send('Page.enable'); await send('Runtime.enable');

  for (const key of brandOrder) {
    if (only.length && !only.includes(key)) continue;
    const b = brands[key];
    mkdirSync(`public/designs/${key}`, { recursive: true });
    // Lockups on transparent ground, light and dark text.
    const [lt, dk] = LOCKUP_TEXT[key];
    // Scale long lockups down so they fit the canvas with a margin.
  const lockupDoc = (color, mc) => doc(`body{background:transparent}`, `<div style="position:absolute;left:40px;top:0;height:100%;display:flex;align-items:center"><div class="lk" style="display:inline-block;white-space:nowrap">${b.lockup(color, 190, mc)}</div></div>
`);
    if (!onlySlug) await shot(lockupDoc(lt, LIGHT[key]), 3000, 420, `public/designs/${key}/lockup-light`, { alpha: true, thumb: false, fit: { w: 1400, h: 420 } });
    if (!onlySlug) await shot(lockupDoc(dk, DARK[key]), 3000, 420, `public/designs/${key}/lockup-dark`, { alpha: true, thumb: false, fit: { w: 1400, h: 420 } });
    if (lockupsOnly) continue;
    for (const p of cases.filter((c) => c.brand === key && (!onlySlug || c.slug === onlySlug))) {
      const { css, html } = p.build();
      const [w, h] = p.size;
      await shot(doc(css, html), w, h, `public/designs/${key}/${p.slug}`);
      console.log('rendered', key, p.slug, `${w}x${h}`);
    }
  }

  const brandData = Object.fromEntries(brandOrder.map((k) => {
    const b = brands[k];
    return [k, {
      key: k, name: b.name, real: b.real, what: b.what, year: b.year, role: b.role, brief: b.brief, palette: b.palette,
      fonts: { display: b.fonts.displayName, body: b.fonts.bodyName },
      markLight: b.mark(120, LIGHT[k]), markDark: b.mark(120, DARK[k]),
      pieces: cases.filter((c) => c.brand === k).map((p) => ({ slug: p.slug, title: p.title, note: p.note, width: p.size[0], height: p.size[1] })),
    }];
  }));
  writeFileSync('data/designs.ts', `// Generated by design-lab/render.mjs. Edit design-lab/*.mjs and re-render.
export type DesignPiece = { slug: string; title: string; note: string; width: number; height: number };
export type DesignBrand = {
  key: string; name: string; real: boolean; what: string; year: string; role: string; brief: string;
  palette: Record<string, string>; fonts: { display: string; body: string };
  markLight: string; markDark: string; pieces: DesignPiece[];
};
export const brandOrder = ${JSON.stringify(brandOrder)};
export const designBrands: Record<string, DesignBrand> = ${JSON.stringify(brandData, null, 2)};
export const designBrandList = brandOrder.map((k) => designBrands[k]);
`);
  console.log('wrote data/designs.ts');
} finally { chrome.kill(); }
