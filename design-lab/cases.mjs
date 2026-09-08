// Case studies: for each brand, a set of applications rendered inside mockup
// scenes, plus a type-and-colour specimen. render.mjs turns each into an
// image under public/designs/<brand>/.
import { brands as B, brandOrder } from "./brands.mjs";
import * as S from "./scenes.mjs";

const WIDE = [1600, 1000];
const PORTRAIT = [1200, 1500];
const SQ = [1200, 1200];

/* ------------------------------------------------------------- artwork helpers */

/** Full-bleed poster artwork: pattern ground, lockup, one big line, one small line. */
function posterArt(b, o) {
  const { bg, fg, accent = fg, head, sub, foot = "", markColors, big = 150, patternColor = fg, extra = "" } = o;
  return `<div style="position:absolute;inset:0;background:${bg};background-image:${b.pattern(patternColor, 0.08)};color:${fg}">
    <div style="position:absolute;left:64px;top:64px">${b.lockup(fg, 46, markColors)}</div>
    <div style="position:absolute;left:64px;right:64px;bottom:64px;display:grid;gap:36px">
      <div style="font-family:${b.fonts.display};font-size:${Math.round(big * 1.4)}px;line-height:.92;letter-spacing:-.02em;text-wrap:balance">${head}</div>
      <div style="font-family:${b.fonts.body};font-size:34px;line-height:1.3;color:${fg};opacity:.85;max-width:30ch">${sub}</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:19px;letter-spacing:.14em;text-transform:uppercase;color:${accent}">${foot}</div></div>
    ${extra}</div>`;
}

/** Business card faces. */
function cardFront(b, o) {
  const { bg, fg, markColors, size = 48 } = o;
  return `<div style="position:absolute;inset:0;background:${bg};display:grid;place-items:center">${b.lockup(fg, size, markColors)}</div>`;
}
function cardBack(b, o) {
  const { bg, fg, accent, name, title, lines, markColors } = o;
  return `<div style="position:absolute;inset:0;background:${bg};color:${fg};padding:40px 44px;font-family:${b.fonts.body}">
    <div style="font-size:30px;font-weight:700;letter-spacing:-.02em">${name}</div>
    <div style="font-size:16px;opacity:.65;margin-top:4px">${title}</div>
    <div style="position:absolute;left:44px;bottom:36px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.9;letter-spacing:.04em">${lines.join("<br>")}</div>
    <div style="position:absolute;right:40px;bottom:34px">${b.mark(72, markColors)}</div>
    <div style="position:absolute;left:0;right:0;top:0;height:8px;background:${accent}"></div></div>`;
}

/** A wide sign panel with a lockup and directional rows. */
function panelArt(b, o) {
  const { bg, fg, accent, title, rows = [], markColors } = o;
  return `<div style="position:absolute;inset:0;background:${bg};color:${fg};padding:40px 48px;font-family:${b.fonts.body}">
    <div style="display:flex;align-items:center;gap:20px">${b.mark(72, markColors)}<span style="font-size:44px;font-weight:700;letter-spacing:-.02em;font-family:${b.fonts.display}">${title}</span></div>
    <div style="margin-top:26px">${rows.map(([arrow, text]) => `<div style="display:flex;align-items:center;gap:22px;padding:12px 0;border-top:1px solid rgba(255,255,255,.18);font-size:26px;font-weight:500;white-space:nowrap"><span style="font-size:34px;font-weight:700;color:${accent};min-width:90px;white-space:nowrap">${arrow}</span>${text}</div>`).join("")}</div></div>`;
}

/** Fascia sign artwork. */
function fasciaArt(b, o) {
  const { bg, fg, size = 96, markColors, sub } = o;
  return `<div style="position:absolute;inset:0;background:${bg};display:grid;place-items:center;gap:6px;color:${fg}">
    <div>${b.lockup(fg, size, markColors)}</div>${sub ? `<div style="font-family:${b.fonts.body};font-size:22px;letter-spacing:.3em;text-transform:uppercase;opacity:.8;margin-top:-10px">${sub}</div>` : ""}</div>`;
}

/** Round sticker / coaster artwork. */
function coasterArt(b, o) {
  const { bg, fg, markColors, text, size = 210 } = o;
  return `<div style="width:100%;height:100%;background:${bg};display:grid;place-items:center;position:relative">
    ${b.mark(size, markColors)}
    ${text ? `<div style="position:absolute;left:0;right:0;bottom:44px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:${fg}">${text}</div>` : ""}</div>`;
}

/** Type and colour specimen (flat). */
function specimen(b, o) {
  const { bg, fg, muted, markColors, sample } = o;
  return {
    css: `body{background:${bg};color:${fg}} .sp{position:absolute;inset:0;padding:70px 80px;display:grid;grid-template-rows:auto 1fr auto;gap:40px}`,
    html: `<div class="sp">
      <div style="display:flex;justify-content:space-between;align-items:center">${b.lockup(fg, 40, markColors)}<span class="mono" style="font-size:14px;color:${muted}">${b.fonts.displayName} · ${b.fonts.bodyName}</span></div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:60px;align-items:center">
        <div style="font-family:${b.fonts.display};font-size:170px;line-height:.92;letter-spacing:-.02em;text-wrap:balance">${sample}</div>
        <div style="font-family:${b.fonts.body};font-size:22px;line-height:1.55;color:${fg}">
          <div style="font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:${muted};margin-bottom:14px">Body · ${b.fonts.bodyName}</div>
          ${b.brief}
          <div style="margin-top:28px;font-size:44px;letter-spacing:-.01em;line-height:1.1">Aa Bb Cc 0123456789</div></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:${muted};border-top:1px solid ${muted}44;padding-top:20px"><span>Display · ${b.fonts.displayName}</span><span>Body · ${b.fonts.bodyName}</span><span>Data · JetBrains Mono</span></div></div>`,
  };
}


const P = [];
const add = (brand, slug, title, note, size, build) => P.push({ brand, slug, title, note, size, build });
const H = (t) => t; // marker for readability

/* ============================================================ KERI */
{
  const b = B.keri, c = b.palette;
  const mk = { fruit: c.ink, leaf: c.ink, light: c.kesar };
  const front = `<div style="position:absolute;inset:0;background:${c.kesar};background-image:${b.pattern(c.ink, 0.07)};padding:44px;color:${c.ink}">
      <div>${b.mark(120, mk)}</div>
      <div style="margin-top:26px;font-family:${b.fonts.display};font-style:italic;font-weight:600;font-size:140px;line-height:.9;letter-spacing:-.02em">Kesar</div>
      <div style="margin-top:18px;font-family:${b.fonts.body};font-weight:600;font-size:20px;letter-spacing:.24em;text-transform:uppercase">Twelve pieces · Gir, Gujarat</div>
      <div style="position:absolute;left:44px;bottom:40px">${b.wordmark(c.ink, 40)}</div></div>`;
  const side = `<div style="position:absolute;inset:0;background:${c.cream};padding:40px;color:${c.ink};font-family:${b.fonts.body}">
      <div style="display:inline-block;border:3px solid ${c.blush};color:${c.blush};padding:8px 14px;font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:.14em;text-transform:uppercase;transform:rotate(-4deg)">Picked · 14 Jun</div>
      ${[["Ripen", "2 to 4 days in the box"], ["Store", "Room temp, then fridge"], ["From", "Keri in Windsor"]].map(([k, v]) => `<div style="display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(42,26,8,.2);font-size:17px"><span>${k}</span><b>${v}</b></div>`).join("")}
      <div style="position:absolute;left:40px;bottom:36px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.6">keriinwindsor.ca</div></div>`;
  const top = `<div style="position:absolute;inset:0;background:${c.kesar};display:grid;place-items:center">${b.mark(200, mk)}</div>`;
  add("keri", "box", "Twelve-piece Kesar box", "The box is the brand's only physical touchpoint: it arrives at the door, sits on the counter for four days, and gets photographed. The lid is a solid mango; the side panel is where the pick date gets stamped by hand.", WIDE, () => S.box(front, side, top, { bg: "#E9DFCC", w: 640, h: 400, d: 420, rotY: -30, left: 300, topPx: 220 }));

  const poster = posterArt(b, { bg: c.cream, fg: c.ink, accent: c.blush, head: "We deliver<br>to your door.", sub: "Windsor same day. Tecumseh, LaSalle, Lakeshore and Amherstburg next day. Essex, Kingsville and Leamington on Saturdays.", foot: "keriinwindsor.ca · order by 8 pm", big: 118, patternColor: c.kesar,
    extra: `<div style="position:absolute;right:-90px;top:120px;transform:rotate(-14deg)">${b.mark(420)}</div>` });
  add("keri", "poster", "Counter poster for partner grocers", "Pinned behind the till at the two Indian grocers that take orders. The headline answers the only question customers ask, and the delivery days are set as a single sentence because that is how staff repeat it.", PORTRAIT, () => S.wall(poster, { wallColor: "#D8CFC0", width: 900, tilt: -5, left: 150, top: 90 }));

  const story = `<div style="position:absolute;inset:0;background:${c.ink};color:${c.cream}">
      <div style="position:absolute;left:-260px;top:120px;transform:rotate(-14deg)">${b.mark(1100, { fruit: c.kesar, leaf: "#7FBF8E", light: "#FFE2A0" })}</div>
      <div style="position:absolute;left:90px;top:100px">${b.wordmark(c.cream, 56)}</div>
      <div style="position:absolute;left:90px;bottom:160px">
        <div class="mono" style="font-size:22px;opacity:.7">Season opens</div>
        <div style="font-family:${b.fonts.display};font-weight:600;font-style:italic;font-size:230px;line-height:.85;letter-spacing:-.03em;margin-top:14px">May<br>24</div>
        <div style="font-family:${b.fonts.body};font-size:32px;margin-top:34px;max-width:22ch;line-height:1.3">Kesar, Alphonso and Banganpalli. Limited boxes across Windsor–Essex.</div>
        <div style="display:inline-block;margin-top:38px;background:${c.kesar};color:${c.ink};font-family:${b.fonts.body};font-weight:700;font-size:30px;padding:22px 36px;border-radius:999px">Pre-order at keriinwindsor.ca</div></div></div>`;
  add("keri", "story", "Season-opening story", "The one post that does the year's work. A single date, one action, and the fruit at a scale no feed can ignore. Runs as a story and a pinned post the week before the first shipment lands.", WIDE, () => S.phone(story, { bg: "#2A1A08", scale: 0.44, left: 560, top: 40, glow: "rgba(245,166,35,.25)" }));

  add("keri", "tote", "Delivery tote", "Boxes go out in a cotton tote that customers keep. One-colour print of the lockup over the pattern, so it costs less than the box it carries.", WIDE, () => S.tote(`<div style="width:100%;height:100%;display:grid;place-items:center;background-image:${b.pattern(c.ink, 0.5)}"><div style="background:${c.kesar};padding:40px 48px;border-radius:24px">${b.lockup(c.ink, 54, mk)}</div></div>`, { bg: "#EFE6D2", cloth: "#F1EADB" }));
  add("keri", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.cream, fg: c.ink, muted: "#8A6A4A", sample: "Sun&#8209;ripened, <i>delivered.</i>" }));
}

/* ============================================================ VOYAGEA */
{
  const b = B.voyagea, c = b.palette;
  add("voyagea", "icon", "App icon on the home screen", "The icon has to hold its own next to Maps and Instagram, which is why there is nothing in it but the route and the pin. Tested at 60 px before anything else was drawn.", WIDE, () => S.homescreen(b.mark(400), "Voyagea", { wallpaper: `linear-gradient(160deg,${c.sky},${c.dusk} 70%)`, bg: "#0E1424", scale: 0.42 }));

  const pass = `<div style="position:absolute;inset:0;background:${c.dusk};color:${c.paper};font-family:${b.fonts.body}">
      <div style="position:absolute;left:80px;top:120px">${b.wordmark(c.paper, 72)}</div>
      <div style="position:absolute;right:80px;top:118px">${b.mark(90)}</div>
      <div style="position:absolute;left:80px;top:300px;width:920px;background:${c.paper};border-radius:32px;overflow:hidden;color:${c.ink}">
        <div style="padding:50px 60px 40px">
          <div class="mono" style="font-size:20px;opacity:.55">Your trip</div>
          <div style="font-family:${b.fonts.display};font-weight:700;font-size:96px;line-height:1;letter-spacing:-.02em;margin-top:10px">Lisbon<br><span style="font-style:italic;font-weight:400">4 days</span></div>
          <div style="display:flex;gap:60px;margin-top:36px">${[["Budget", "€640"], ["Walking", "31 km"], ["Planned in", "28 s"]].map(([k, v]) => `<div><div class="mono" style="font-size:16px;opacity:.55">${k}</div><b style="font-size:34px">${v}</b></div>`).join("")}</div></div>
        <div style="border-top:3px dashed rgba(20,26,46,.25)"></div>
        <div style="padding:30px 60px 50px">${[["Day 1", "Alfama on foot, then Miradouro da Graça at 7:40 pm for the light."], ["Day 2", "Tram 28 early. LX Factory, then Belém for pastéis while they're warm."], ["Day 3", "Sintra day trip. Book Pena for 9:30 and take the back trail down."], ["Day 4", "Time Out Market, Cais do Sodré, ferry to Cacilhas for the skyline."]].map(([d, t]) => `<div style="display:grid;grid-template-columns:120px 1fr;gap:20px;padding:28px 0;border-bottom:1px solid rgba(20,26,46,.12);font-size:32px;line-height:1.3"><b style="font-family:'JetBrains Mono',monospace;font-weight:500;font-size:22px;letter-spacing:.1em;color:${c.dawn};padding-top:4px">${d}</b><span>${t}</span></div>`).join("")}
          <div style="display:flex;gap:4px;height:70px;align-items:flex-end;margin-top:40px">${Array.from({ length: 48 }, (_, i) => `<i style="display:block;background:${c.ink};height:100%;width:${[3, 6, 3, 9, 4, 3, 7][i % 7]}px;opacity:${i % 5 === 0 ? 0.35 : 1}"></i>`).join("")}</div></div></div>
      <div style="position:absolute;left:80px;bottom:120px;font-size:40px;line-height:1.25;max-width:20ch">Plan yours free at voyagea.travel</div></div>`;
  add("voyagea", "story", "Boarding-pass story", "An Instagram story that shows the product outcome instead of the product. The itinerary is real output, trimmed to the moments people screenshot.", WIDE, () => S.phone(pass, { bg: "#0F1730", scale: 0.44, left: 560, top: 40, glow: "rgba(255,122,61,.22)" }));

  const stamp = (col, inner, label) => `<div style="width:100%;height:100%;display:grid;place-items:center;color:${col}"><svg viewBox="0 0 200 200" width="300"><circle cx="100" cy="100" r="92" fill="none" stroke="${col}" stroke-width="5"/><circle cx="100" cy="100" r="78" fill="none" stroke="${col}" stroke-width="2"/>${inner}<text x="100" y="164" text-anchor="middle" font-family="JetBrains Mono" font-size="16" letter-spacing="3" fill="${col}">${label}</text></svg></div>`;
  const stamps = [
    stamp(c.sky, `<path d="M60 128h80M70 128V96l30-22 30 22v32M84 128v-18h32v18" fill="none" stroke="${c.sky}" stroke-width="5" stroke-linejoin="round"/>`, "KYOTO · JP"),
    stamp(c.dawn, `<path d="M50 120c30-50 60-50 80-30s40 40 60-20" fill="none" stroke="${c.dawn}" stroke-width="5" stroke-linecap="round"/><path d="M40 130h120" stroke="${c.dawn}" stroke-width="4"/>`, "LISBOA · PT"),
    stamp(c.dusk, `<path d="M40 130 75 80l20 28 18-40 20 32 27-38" fill="none" stroke="${c.dusk}" stroke-width="5" stroke-linejoin="round"/>`, "BANFF · CA"),
    stamp("#A8442B", `<path d="M50 130V90c0-30 22-50 50-50s50 20 50 50v40" fill="none" stroke="#A8442B" stroke-width="5"/><circle cx="100" cy="95" r="12" fill="none" stroke="#A8442B" stroke-width="4"/>`, "JAIPUR · IN"),
    stamp("#2A7A57", `<path d="M40 130c20-40 40-40 60-10s40 20 60-20" fill="none" stroke="#2A7A57" stroke-width="5" stroke-linecap="round"/>`, "TOFINO · CA"),
    stamp(c.ink, `<path d="M60 130V70h80v60M80 70V50h40v20" fill="none" stroke="${c.ink}" stroke-width="5"/>`, "NYC · US"),
  ];
  add("voyagea", "stamps", "V-Passport stamp set", "Digital stamps for the in-app passport, mocked as a physical sticker sheet. Each city is one landmark reduced to a few strokes; a stamp only unlocks with a verified visit.", WIDE, () => S.coasters(stamps, { surface: "#EDE6D8", size: 360 }));

  const poster = posterArt(b, { bg: c.paper, fg: c.ink, accent: c.dawn, head: "Plan any trip<br>in <i>seconds.</i>", sub: "Day-by-day itineraries with maps, budgets and hyperlocal tips. Free.", foot: "voyagea.travel", big: 128, patternColor: c.dusk,
    extra: `<div style="position:absolute;right:56px;top:56px">${b.mark(140)}</div>` });
  add("voyagea", "poster", "Launch poster", "For hostels and co-working spaces in the first three cities. The headline is the product promise verbatim; the pattern behind it is the route motif at ten percent.", PORTRAIT, () => S.wall(poster, { wallColor: "#CFD6DF", width: 900, tilt: -5, left: 150, top: 90, frame: true }));
  add("voyagea", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.paper, fg: c.ink, muted: "#6A7290", sample: "Every trip starts <i>at dawn.</i>" }));
}

/* ============================================================ DWELLO */
{
  const b = B.dwello, c = b.palette;
  const front = `<div style="position:absolute;inset:0;background:${c.shell};display:grid;place-items:center;padding:40px"><div style="display:grid;justify-items:center;gap:30px">${b.face(300, { shell: c.ink, ink: c.shell, lift: 4, mouth: "smile" })}${b.wordmark(c.ink, 64)}</div></div>`;
  const side = `<div style="position:absolute;inset:0;background:${c.ink};color:${c.shell};padding:44px;font-family:${b.fonts.body}">
      <div style="font-family:${b.fonts.display};font-weight:700;font-size:34px;letter-spacing:-.03em;line-height:1.1">A desk robot<br>that notices you.</div>
      <div style="margin-top:26px;font-size:16px;line-height:1.6;opacity:.8">24 GHz mmWave presence sensing. No camera, no cloud. Runs on a chip smaller than the box's corner.</div>
      <div style="position:absolute;left:44px;bottom:40px;display:flex;gap:10px">${["Resting", "Curious", "Happy"].map(() => "").join("")}${b.face(60, { shell: c.cyan, ink: c.ink })}${b.face(60, { shell: c.cyan, ink: c.ink, wink: true })}${b.face(60, { shell: c.cyan, ink: c.ink, lift: 8, mouth: "o" })}</div></div>`;
  const top = `<div style="position:absolute;inset:0;background:${c.shell};display:grid;place-items:center">${b.face(220, { shell: c.ink, ink: c.shell, wink: true })}</div>`;
  add("dwello", "box", "Retail box", "White box, black face, nothing else on the front. The side panel does the explaining because the front already has a personality. The face on the lid winks when you open it.", WIDE, () => S.box(front, side, top, { bg: "#DCDFE4", w: 520, h: 520, d: 380, rotY: -32, left: 380, topPx: 150 }));

  const faces = [["Resting", {}], ["Curious", { lift: 6, tilt: 4, mouth: "o" }], ["Happy", { lift: 4, mouth: "grin" }], ["Sleepy", { open: 0.3, lift: -2, mouth: "flat" }], ["Surprised", { lift: 10, open: 1.2, mouth: "o" }], ["Wink", { wink: true, lift: 3 }], ["Focused", { lift: -3, tilt: -5, mouth: "flat" }], ["Proud", { lift: 2, tilt: -3, mouth: "grin" }]];
  const sheet = `<div style="position:absolute;inset:0;background:${c.slate};color:${c.shell};padding:60px;font-family:${b.fonts.display}">
      <div style="display:flex;justify-content:space-between;align-items:center">${b.wordmark(c.shell, 44)}<span class="mono" style="font-size:14px;opacity:.6">Expression sheet · 01</span></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:40px 24px;margin-top:70px;justify-items:center">${faces.map(([n, e]) => `<div style="display:grid;justify-items:center;gap:14px;font-size:20px">${b.face(190, e)}<span>${n}</span></div>`).join("")}</div>
      <div style="position:absolute;left:60px;bottom:50px;font-family:${b.fonts.body};font-size:18px;opacity:.7;max-width:50ch;line-height:1.5">Four parameters: brow lift, brow tilt, eye openness, mouth. Every expression is a point in that space, which is why Dwello can move between them instead of switching.</div></div>`;
  add("dwello", "expressions", "Expression sheet poster", "Printed for the workshop wall so the firmware, the industrial design and the marketing all reference the same eight faces.", PORTRAIT, () => S.wall(sheet, { wallColor: "#B9BEC6", width: 900, tilt: -5, left: 150, top: 90, frame: true }));

  add("dwello", "cards", "Team cards", "Every card carries a different expression on the back, chosen by the person. The front is only the logotype.", WIDE, () => S.desk(cardFront(b, { bg: c.shell, fg: c.ink, size: 54 }), cardBack(b, { bg: c.ink, fg: c.shell, accent: c.cyan, name: "Dev Shah", title: "Founder", lines: ["hello.devshah@gmail.com", "shah-dev.com/work/dwello", "Windsor, ON"], markColors: { shell: c.cyan, ink: c.ink, wink: true } }), { surface: "#D9DDE3", dark: false }));

  add("dwello", "tag", "Hang tag", "Ties to the power cable in the box. Says the one thing that matters before anything else is read.", WIDE, () => S.tag(`<div style="position:absolute;inset:0;background:${c.shell};display:grid;justify-items:center;align-content:center;gap:26px;padding:70px 30px 30px;text-align:center;color:${c.ink}">${b.face(170, { shell: c.ink, ink: c.shell, lift: 5, mouth: "grin" })}<div style="font-family:${b.fonts.display};font-weight:700;font-size:30px;letter-spacing:-.03em;line-height:1.15">Hi. I don't<br>have a camera.</div><div style="font-family:${b.fonts.body};font-size:15px;opacity:.7;line-height:1.5">Radar only. Nothing leaves the desk.</div><div style="margin-top:10px">${b.wordmark(c.ink, 30)}</div></div>`, { bg: "#2A2E38", tagColor: c.shell }));
  add("dwello", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.shell, fg: c.ink, muted: "#6B717C", sample: "Notices you.<br>Never records." }));
}

/* ============================================================ BEAMFALL */
{
  const b = B.beamfall, c = b.palette;
  add("beamfall", "icon", "App icon on the home screen", "A literal game state as an icon: cyan in, magenta up, amber on, and the white tap point. It reads at 60 px because the beams are the only shapes in it.", WIDE, () => S.homescreen(b.mark(400, { bg: "#12131F" }), "BeamFall", { wallpaper: "linear-gradient(160deg,#1a1c2c,#07070C 70%)", bg: "#07070C", scale: 0.42 }));

  const poster = `<div style="position:absolute;inset:0;background:${c.void}">
      <svg style="position:absolute;inset:0" viewBox="0 0 1200 1500" width="100%" height="100%" preserveAspectRatio="none">
        <defs><filter id="g"><feGaussianBlur stdDeviation="14"/></filter></defs>
        <g stroke="#1E2035" stroke-width="2">${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 100} 0V1500"/><path d="M0 ${i * 125}H1200"/>`).join("")}</g>
        <g filter="url(#g)" opacity=".8"><path d="M0 700H560" stroke="${c.cyan}" stroke-width="18"/><path d="M600 660V0" stroke="${c.magenta}" stroke-width="18"/><path d="M640 700H1200" stroke="${c.amber}" stroke-width="18"/></g>
        <path d="M0 700H560" stroke="${c.cyan}" stroke-width="6"/><path d="M600 660V0" stroke="${c.magenta}" stroke-width="6"/><path d="M640 700H1200" stroke="${c.amber}" stroke-width="6"/>
        <path d="M520 760 600 620 680 760Z" fill="${c.glass}" stroke="${c.steel}" stroke-width="4"/><circle cx="600" cy="700" r="12" fill="#fff"/></svg>
      <div style="position:absolute;left:90px;top:900px">${b.wordmark("#fff", 150)}</div>
      <div style="position:absolute;left:90px;top:1080px;font-family:${b.fonts.body};font-size:40px;color:#fff;opacity:.8">Bend light. Solve the grid.</div>
      <div style="position:absolute;left:90px;top:1180px;display:flex;gap:20px;align-items:center;color:#fff;font-family:${b.fonts.body};font-size:26px">${b.mark(80)}<span>Free on the App Store · no ads, no timers</span></div></div>`;
  add("beamfall", "poster", "Launch poster", "Three beams, one prism, and the title where the light lands. Framed for the studio; printed on black stock so the grid disappears into the paper.", PORTRAIT, () => S.wall(poster, { wallColor: "#24252C", width: 900, tilt: -5, left: 150, top: 90, frame: true }));

  const screen = `<div style="position:absolute;inset:0;background:${c.void};color:#fff;font-family:${b.fonts.body}">
      <div style="position:absolute;left:80px;top:160px;font-family:'JetBrains Mono',monospace;font-size:26px;letter-spacing:.14em;color:${c.steel}">LEVEL 42 · PRISM</div>
      <svg style="position:absolute;left:60px;top:320px" viewBox="0 0 960 960" width="960" height="960">
        <g stroke="#1E2035" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 120} 0V960"/><path d="M0 ${i * 120}H960"/>`).join("")}</g>
        <path d="M0 420H420" stroke="${c.cyan}" stroke-width="10"/><path d="M420 420V120" stroke="${c.magenta}" stroke-width="10"/><path d="M420 420H780" stroke="${c.amber}" stroke-width="10"/>
        <path d="M370 470 420 370 470 470Z" fill="${c.glass}" stroke="${c.steel}" stroke-width="4"/>
        <circle cx="420" cy="120" r="34" fill="none" stroke="${c.magenta}" stroke-width="8"/><circle cx="780" cy="420" r="34" fill="none" stroke="${c.amber}" stroke-width="8"/>
        <rect x="600" y="600" width="120" height="120" fill="#1A1B2E" stroke="${c.steel}" stroke-width="3"/><path d="M600 720 720 600" stroke="${c.steel}" stroke-width="6"/></svg>
      <div style="position:absolute;left:80px;bottom:200px;font-family:${b.fonts.display};font-weight:700;font-size:64px;letter-spacing:-.03em">Turn the prism.</div>
      <div style="position:absolute;left:80px;bottom:130px;font-size:30px;opacity:.7">Every ring wants its own colour.</div></div>`;
  add("beamfall", "screen", "App Store screenshot", "The first store screenshot shows a mid-solve state rather than a splash, because the puzzle is the pitch.", WIDE, () => S.phone(screen, { bg: "#0B0C14", scale: 0.44, left: 560, top: 40, glow: "rgba(61,241,255,.16)" }));

  const glyph = (d, col, label) => `<div style="width:100%;height:100%;background:${c.void};display:grid;place-items:center;color:#fff"><svg viewBox="0 0 120 120" width="220">${d}</svg><div style="position:absolute;left:0;right:0;bottom:40px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.2em;color:${col}">${label}</div></div>`;
  const pieces = [
    glyph(`<path d="M20 100 100 20" stroke="${c.cyan}" stroke-width="8"/>`, c.cyan, "MIRROR"),
    glyph(`<path d="M40 100 60 40 80 100Z" fill="${c.glass}" stroke="${c.steel}" stroke-width="4"/><path d="M0 70h40M80 70h40" stroke="${c.magenta}" stroke-width="6"/>`, c.magenta, "PRISM"),
    glyph(`<rect x="30" y="30" width="60" height="60" fill="${c.amber}" opacity=".8"/>`, c.amber, "TINT"),
    glyph(`<path d="M20 60h80M60 20v80" stroke="${c.cyan}" stroke-width="6"/><circle cx="60" cy="60" r="14" fill="${c.void}" stroke="${c.cyan}" stroke-width="4"/>`, c.cyan, "GATE"),
    glyph(`<circle cx="60" cy="60" r="30" fill="none" stroke="${c.magenta}" stroke-width="8"/><circle cx="60" cy="60" r="10" fill="${c.magenta}"/>`, c.magenta, "TARGET"),
    glyph(`<rect x="24" y="24" width="72" height="72" fill="#1A1B2E" stroke="${c.steel}" stroke-width="4"/>`, c.steel, "WALL"),
  ];
  add("beamfall", "stickers", "Piece stickers", "A sticker pack of the six game pieces, given out at the launch meet-up. Each is the exact glyph from the game's legend.", WIDE, () => S.coasters(pieces, { surface: "#15161F", size: 330 }));
  add("beamfall", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.void, fg: "#fff", muted: c.steel, sample: "Bend light.<br>Solve the grid." }));
}

/* ============================================================ PTRI */
{
  const b = B.ptri, c = b.palette;
  add("ptri", "cards", "Business cards", "Front carries only the constellation. The back holds everything in one column so the card reads like a line of a terminal.", WIDE, () => S.desk(cardFront(b, { bg: c.space, fg: c.star, size: 60 }), cardBack(b, { bg: c.star, fg: c.space, accent: c.ember, name: "Dev Shah", title: "Business Development Officer", lines: ["hello.devshah@gmail.com", "ptriinnovation.com", "Windsor, ON · Ahmedabad, IN"], markColors: { line: c.space, node: c.ember } }), { surface: "#17171F" }));

  const poster = `<div style="position:absolute;inset:0;background:${c.space};background-image:${b.pattern(c.star, 0.1)};color:${c.star}">
      <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 70% 30%, rgba(58,42,106,.7), transparent 70%)"></div>
      <div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%)">${b.mark(620)}</div>
      <div style="position:absolute;left:70px;bottom:120px">${b.wordmark(c.star, 96)}</div>
      <div style="position:absolute;left:70px;bottom:70px;font-family:${b.fonts.body};font-size:22px;opacity:.6;letter-spacing:.1em;text-transform:uppercase">Intelligent platforms · digital products</div></div>`;
  add("ptri", "poster", "Office poster", "The monogram at the size it was designed for. Hangs in the Ahmedabad office reception.", PORTRAIT, () => S.wall(poster, { wallColor: "#2A2B33", width: 900, tilt: -5, left: 150, top: 90, frame: true }));

  const sheet = `<div style="position:absolute;inset:0;background:#F6F3EC;padding:60px;color:${c.space};font-family:${b.fonts.body}">
      <div style="display:flex;justify-content:space-between;align-items:center">${b.lockup(c.space, 30, { line: c.space, node: c.ember })}<span class="mono" style="font-size:12px;opacity:.6">Proposal · 2026</span></div>
      <div style="margin-top:80px;font-family:${b.fonts.display};font-style:italic;font-size:44px;line-height:1.1">A platform that learns the business before it automates it.</div>
      <div style="margin-top:30px;font-size:16px;line-height:1.7;opacity:.8;max-width:44ch">Prepared for the Windsor–Essex Small Business Centre. Scope, phases and a fourteen-week timeline follow.</div>
      <div style="position:absolute;left:60px;bottom:50px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.55">ptriinnovation.com</div></div>`;
  const env = `<div style="position:absolute;inset:0;background:${c.space};color:${c.star};padding:40px">${b.lockup(c.star, 34)}<div style="position:absolute;left:40px;bottom:40px;font-family:${b.fonts.body};font-size:16px;line-height:1.6;opacity:.75">PTRI Innovation<br>Windsor, ON · Ahmedabad, IN</div><div style="position:absolute;right:40px;top:40px;width:120px;height:80px;border:2px dashed rgba(242,238,230,.35)"></div></div>`;
  const card = cardFront(b, { bg: c.ember, fg: c.space, size: 40, markColors: { line: c.space, node: c.space } });
  add("ptri", "stationery", "Stationery", "Letterhead on warm white, envelope in space black, and an ember compliment slip that is the only place the accent colour is allowed to fill a surface.", WIDE, () => S.stationery(sheet, env, card, { surface: "#CFCBC3" }));

  const lock = `<div style="position:absolute;inset:0;background:${c.space};background-image:${b.pattern(c.star, 0.12)};color:${c.star}"><div style="position:absolute;inset:0;background:radial-gradient(70% 50% at 50% 30%, rgba(58,42,106,.8), transparent 70%)"></div>
      <div style="position:absolute;left:0;right:0;top:140px;text-align:center;font-family:${b.fonts.body};font-size:40px;letter-spacing:.1em;opacity:.7">MONDAY 8 SEPTEMBER</div>
      <div style="position:absolute;left:0;right:0;top:200px;text-align:center;font-family:${b.fonts.body};font-weight:300;font-size:220px;letter-spacing:-.04em;line-height:1">9:41</div>
      <div style="position:absolute;left:50%;top:52%;transform:translate(-50%,-50%)">${b.mark(420)}</div>
      <div style="position:absolute;left:0;right:0;bottom:160px;text-align:center">${b.wordmark(c.star, 54)}</div></div>`;
  add("ptri", "wallpaper", "Team wallpaper", "The lock screen for company phones. The pattern is the constellation at twelve percent, so the mark has somewhere to sit.", WIDE, () => S.phone(lock, { bg: "#0B0B14", scale: 0.44, left: 560, top: 40, glow: "rgba(255,106,31,.16)" }));
  add("ptri", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.space, fg: c.star, muted: "#8A8C9C", sample: "Systems, <i>not slogans.</i>" }));
}

/* ============================================================ AK */
{
  const b = B.ak, c = b.palette;
  const site = `<div style="position:absolute;inset:0;background:${c.navy};color:${c.white};padding:44px 52px;font-family:${b.fonts.body}">
      <div style="display:flex;align-items:center;gap:26px">${b.mark(120, { ring: c.white, ink: c.white, accent: c.brass, bg: c.navy })}<div>${b.wordmark(c.white, 52)}<div style="margin-top:8px;font-size:18px;letter-spacing:.2em;text-transform:uppercase;color:${c.brass}">Working here</div></div></div>
      <div style="position:absolute;left:52px;bottom:44px;font-family:${b.fonts.display};font-size:64px;letter-spacing:.02em">519 · 555 · 0148</div>
      <div style="position:absolute;right:52px;top:52px;text-align:right;font-size:17px;line-height:1.5;opacity:.85">Renovations · Plumbing<br>Licensed · Insured</div></div>`;
  add("ak", "site-sign", "Site sign", "Goes on the lawn of every job for the length of the job. The phone number is the biggest thing on it because that is what a neighbour needs.", WIDE, () => S.signpost(site, { sky: "#C6D3DF", w: 800, h: 500, left: 400, top: 110 }));

  add("ak", "cards", "Business cards", "Navy front with the badge embossed; brass-topped back with the number. Printed on 600 gsm because they get handed over with dusty hands.", WIDE, () => S.desk(cardFront(b, { bg: c.navy, fg: c.white, size: 40, markColors: { ring: c.white, ink: c.white, accent: c.brass, bg: c.navy } }), cardBack(b, { bg: c.white, fg: c.navy, accent: c.brass, name: "AK", title: "Owner · AK Builds & Plumbing", lines: ["519 · 555 · 0148", "akbuildsandplumbing.ca", "Windsor–Essex"], markColors: {} }), { surface: "#4A4F58" }));

  const fascia = fasciaArt(b, { bg: c.navy, fg: c.white, size: 80, markColors: { ring: c.white, ink: c.white, accent: c.brass, bg: c.navy }, sub: "Renovations · Plumbing" });
  add("ak", "shopfront", "Workshop front", "The unit on Walker Road. Navy fascia, brass-lettered, and an awning striped in the same two colours.", WIDE, () => S.storefront(fascia, { wallColor: "#5A5F66", awning: c.navy }));

  const hats = [coasterArt(b, { bg: c.white, fg: c.navy, text: "Windsor–Essex" }), coasterArt(b, { bg: c.navy, fg: c.brass, markColors: { ring: c.white, ink: c.white, accent: c.brass, bg: c.navy }, text: "Licensed · Insured" }), coasterArt(b, { bg: c.brass, fg: c.navy, markColors: { ring: c.navy, ink: c.navy, accent: c.navy, bg: c.brass }, text: "Since 2026" }), coasterArt(b, { bg: c.white, fg: c.navy, text: "519 555 0148" })];
  add("ak", "stickers", "Hard-hat stickers", "Four colourways of the badge, cut as 80 mm circles. They end up on toolboxes, tailgates and the odd fridge.", WIDE, () => S.coasters(hats, { surface: "#3A3E45", size: 340 }));
  add("ak", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.white, fg: c.navy, muted: c.steel, sample: "RELIABLE WORK.<br>DONE RIGHT." }));
}

/* ============================================================ TRIK */
{
  const b = B.trik, c = b.palette;
  const sheet = `<div style="position:absolute;inset:0;background:${c.plaster};padding:60px;color:${c.ink};font-family:${b.fonts.body}">
      ${b.lockup(c.ink, 30)}
      <div style="margin-top:60px;border-top:1px solid ${c.walnut};padding-top:20px;font-size:14px;line-height:1.7;opacity:.75">Proposal · Residence at Bodakdev<br>Prepared for Mr &amp; Mrs Mehta · 12 March 2026</div>
      <div style="margin-top:40px;font-family:${b.fonts.display};font-size:34px;line-height:1.15">A home that keeps the afternoon light and loses the noise of the road.</div>
      <div style="margin-top:24px;font-size:15px;line-height:1.7;opacity:.75;max-width:44ch">Turnkey design and execution across four bedrooms, a family lounge and a terrace kitchen. Fourteen weeks from approval of drawings.</div>
      <div style="position:absolute;left:60px;bottom:50px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.55">trikstudio.in · Ahmedabad</div></div>`;
  const env = `<div style="position:absolute;inset:0;background:${c.walnut};color:${c.plaster};padding:40px">${b.lockup(c.plaster, 30, { floor: c.brass, left: c.plaster, right: "#8A7462" })}<div style="position:absolute;left:40px;bottom:40px;font-family:${b.fonts.body};font-size:15px;line-height:1.6;opacity:.8">Trik Studio<br>Bodakdev, Ahmedabad 380054</div></div>`;
  const card = `<div style="position:absolute;inset:0;background:${c.ink};color:${c.plaster};padding:36px">${b.mark(80, { floor: c.brass, left: c.plaster, right: "#8A7462" })}<div style="position:absolute;left:36px;bottom:34px;font-family:${b.fonts.body};font-size:15px;line-height:1.6"><b style="font-family:${b.fonts.display};font-size:24px;font-weight:400">Trik Studio</b><br>Interior design · Ahmedabad<br>hello@trikstudio.in</div><div style="position:absolute;right:36px;bottom:34px">${b.wordmark(c.plaster, 26)}</div></div>`;
  add("trik", "stationery", "Stationery", "Plaster letterhead, walnut envelope, ink card. A proposal on this paper should feel like the room it describes.", WIDE, () => S.stationery(sheet, env, card, { surface: "#CFC6B6" }));

  add("trik", "plate", "Studio door plate", "Brass on walnut at the studio entrance. The mark is deep-etched; the type is filled.", WIDE, () => S.storefront(fasciaArt(b, { bg: c.walnut, fg: c.brass, size: 90, markColors: { floor: c.brass, left: "#6A5240", right: "#2C2019" }, sub: "Interior design" }), { wallColor: "#D6CFC2", awning: c.walnut }));

  add("trik", "cards", "Business cards", "Ink on one side, plaster on the other, and the corner mark in brass foil.", WIDE, () => S.desk(cardFront(b, { bg: c.plaster, fg: c.ink, size: 46 }), cardBack(b, { bg: c.ink, fg: c.plaster, accent: c.brass, name: "Trik Studio", title: "Residential & commercial interiors", lines: ["hello@trikstudio.in", "trikstudio.in", "Bodakdev, Ahmedabad"], markColors: { floor: c.brass, left: c.plaster, right: "#8A7462" } }), { surface: "#B8AD9A", dark: false }));

  const poster = posterArt(b, { bg: c.plaster, fg: c.ink, accent: c.brass, head: "Transforming spaces.<br><i>Elevating lifestyle.</i>", sub: "Residence at Bodakdev · completed March 2026 · fourteen weeks", foot: "trikstudio.in", big: 104, patternColor: c.walnut,
    extra: `<div style="position:absolute;right:56px;top:56px">${b.mark(160)}</div>` });
  add("trik", "poster", "Project board", "Placed at the site entrance during a build so the neighbours know who is doing the work.", PORTRAIT, () => S.wall(poster, { wallColor: "#C9C0B0", width: 900, tilt: -5, left: 150, top: 90, frame: true }));
  add("trik", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.plaster, fg: c.ink, muted: "#7A6B5C", sample: "Floor, wall,<br>wall." }));
}

/* ============================================================ SKYVAGE */
{
  const b = B.skyvage, c = b.palette;
  const tagArt = `<div style="position:absolute;inset:0;background:${c.night};color:${c.silver};padding:80px 34px 34px;display:grid;align-content:start;gap:26px">${b.mark(90, { ink: c.silver, accent: c.gold })}
      <div style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;line-height:2.1;opacity:.9">Name<br><b style="font-size:20px;color:#fff">D. SHAH</b><br>Route<br><b style="font-size:20px;color:#fff">YQG → LIS</b><br>Aircraft<br><b style="font-size:20px;color:#fff">G650ER</b></div>
      <div style="position:absolute;left:34px;bottom:34px">${b.wordmark(c.gold, 18)}</div></div>`;
  add("skyvage", "tag", "Cabin luggage tag", "Night blue leather, silver foil, one gold delta. The tag is the only physical thing a passenger keeps.", WIDE, () => S.tag(tagArt, { bg: "#171C2C", tagColor: c.night }));

  const story = `<div style="position:absolute;inset:0;background:${c.night};color:${c.silver};background-image:${b.pattern(c.silver, 0.06)}">
      <div style="position:absolute;inset:0;background:radial-gradient(70% 40% at 50% 100%, rgba(212,179,106,.25), transparent 70%)"></div>
      <div style="position:absolute;left:80px;top:130px">${b.lockup(c.silver, 40)}</div>
      <div style="position:absolute;left:80px;right:80px;top:560px;font-family:${b.fonts.display};font-weight:300;font-size:120px;line-height:1;letter-spacing:-.02em">The price<br>is on<br>the page.</div>
      <div style="position:absolute;left:80px;right:80px;top:1080px;font-family:${b.fonts.body};font-size:34px;line-height:1.4;opacity:.8">Windsor to Lisbon, eight seats, one aircraft. From $38,400 all-in, before you call anyone.</div>
      <div style="position:absolute;left:80px;bottom:160px;display:inline-block;border:2px solid ${c.gold};color:${c.gold};padding:22px 36px;font-family:${b.fonts.body};font-size:28px;letter-spacing:.2em;text-transform:uppercase">See rates</div></div>`;
  add("skyvage", "story", "Rates story", "The whole brand argument in one screen: a number where other charter brands put a form.", WIDE, () => S.phone(story, { bg: "#0B1020", scale: 0.44, left: 560, top: 40, glow: "rgba(212,179,106,.2)" }));

  add("skyvage", "cards", "Boarding cards", "A boarding card the size of a business card. Silver on night, gold for the seat.", WIDE, () => S.desk(cardFront(b, { bg: c.night, fg: c.silver, size: 40 }), `<div style="position:absolute;inset:0;background:${c.silver};color:${c.night};padding:36px 40px;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:.12em;text-transform:uppercase;line-height:2"><div style="display:flex;justify-content:space-between"><span>Flight</span><b>SKY 014</b></div><div style="display:flex;justify-content:space-between"><span>Route</span><b>YQG → LIS</b></div><div style="display:flex;justify-content:space-between"><span>Departs</span><b>19:40</b></div><div style="display:flex;justify-content:space-between;color:#8a6d2a"><span>Seat</span><b>2A · Window</b></div><div style="position:absolute;right:40px;bottom:30px">${b.mark(60, { ink: c.night, accent: c.gold })}</div></div>`, { surface: "#1E2436" }));

  const poster = posterArt(b, { bg: c.night, fg: c.silver, accent: c.gold, head: "Premium.<br>Accessible.", sub: "Long-range aircraft, transparent charter rates, a flight built around the traveller.", foot: "skyvage · private aviation", big: 130, patternColor: c.silver,
    extra: `<div style="position:absolute;right:56px;top:56px">${b.mark(160, { ink: c.silver, accent: c.gold })}</div>` });
  add("skyvage", "poster", "Lounge poster", "For the FBO lounge wall. Two words, because the people in that room already know what the aircraft costs.", PORTRAIT, () => S.wall(poster, { wallColor: "#2B3040", width: 900, tilt: -5, left: 150, top: 90, frame: true }));
  add("skyvage", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.night, fg: c.silver, muted: "#7A849E", sample: "Window seat,<br>after sunset." }));
}

/* ============================================================ RIVERSIDE */
{
  const b = B.riverside, c = b.palette;
  const label = `<div style="background:${c.foam};padding:40px 30px;text-align:center;color:${c.roast}">
      <div style="display:inline-block">${b.mark(180)}</div>
      <div style="margin-top:18px">${b.wordmark(c.roast, 44)}</div>
      <div style="margin:30px -30px 0;background:${c.river};color:${c.foam};padding:22px 30px;font-family:${b.fonts.display};font-size:40px;line-height:1.05">Ambassador<br><i>Espresso</i></div>
      <div style="margin-top:26px;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.1em;text-transform:uppercase;line-height:2">Brazil · Ethiopia<br>Medium-dark · 340 g<br>Roasted 02 · 09 · 26</div></div>`;
  add("riverside", "bag", "Coffee bag", "Kraft pouch with a river-blue band. The roast, origin and date sit in a block a Sharpie can overwrite when the label runs out.", WIDE, () => S.pouch(label, { bg: "#E2D8C6", bagColor: c.kraft, w: 560, h: 880, left: 520, top: 60 }));

  add("riverside", "shopfront", "Storefront", "The corner unit on Riverside Drive. Roast-brown fascia, foam lettering, and a teal awning that is the river's colour on the street.", WIDE, () => S.storefront(fasciaArt(b, { bg: c.roast, fg: c.foam, size: 84, markColors: { ring: c.foam, water: c.copper }, sub: "Roasted on the Detroit River" }), { wallColor: "#6B6058", awning: c.river }));

  const co = [coasterArt(b, { bg: c.foam, fg: c.roast, text: "Riverside Drive" }), coasterArt(b, { bg: c.river, fg: c.foam, markColors: { ring: c.foam, water: c.foam }, text: "Roasted here" }), coasterArt(b, { bg: c.roast, fg: c.foam, markColors: { ring: c.foam, water: c.copper }, text: "Since 2026" }), coasterArt(b, { bg: c.copper, fg: c.roast, markColors: { ring: c.roast, water: c.roast }, text: "Espresso" }), coasterArt(b, { bg: c.foam, fg: c.roast, text: "Windsor, ON" }), coasterArt(b, { bg: c.river, fg: c.foam, markColors: { ring: c.foam, water: c.foam }, text: "Drip · Pour-over" })];
  add("riverside", "coasters", "Coasters", "Pulpboard coasters in four colourways. The mark is the whole design; the ring is the cup.", WIDE, () => S.coasters(co, { surface: "#3B2416", size: 340 }));

  add("riverside", "cards", "Loyalty cards", "Ten stamps, then a free cup. The stamp is the mark's cup ring in copper ink.", WIDE, () => S.desk(cardFront(b, { bg: c.roast, fg: c.foam, size: 40, markColors: { ring: c.foam, water: c.copper } }), `<div style="position:absolute;inset:0;background:${c.foam};color:${c.roast};padding:34px 40px;font-family:${b.fonts.body}"><div style="font-family:${b.fonts.display};font-size:26px">Ten cups, one on us.</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:22px">${Array.from({ length: 10 }, (_, i) => `<div style="aspect-ratio:1;border-radius:50%;border:2px solid ${c.roast};display:grid;place-items:center;opacity:${i < 4 ? 1 : 0.35}">${i < 4 ? b.mark(52, { ring: c.copper, water: c.copper }) : ""}</div>`).join("")}</div></div>`, { surface: "#D9CDB8", dark: false }));
  add("riverside", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.foam, fg: c.roast, muted: "#8A7562", sample: "Roasted on<br>the river." }));
}

/* ============================================================ AMBASSADOR */
{
  const b = B.ambassador, c = b.palette;
  add("ambassador", "shopfront", "Shop front", "The unit under the bridge approach. Steel-blue fascia with the badge cut from signal yellow acrylic.", WIDE, () => S.storefront(fasciaArt(b, { bg: c.steel, fg: c.signal, size: 110, markColors: { ink: c.signal, accent: c.chalk }, sub: "Sales · Service · Rentals" }), { wallColor: "#7B8289", awning: c.signal }));

  const poster = `<div style="position:absolute;inset:0;background:${c.signal};color:${c.steel}">
      <svg style="position:absolute;inset:0" viewBox="0 0 1200 1500" width="100%" height="100%" preserveAspectRatio="none">
        <path d="M0 1260Q300 1040 600 1260T1200 1260" fill="none" stroke="${c.steel}" stroke-width="10"/>
        ${Array.from({ length: 30 }, (_, i) => { const x = 20 + i * 40; const t = (x % 600) / 600; const y = 1260 - 220 * (1 - Math.pow(2 * t - 1, 2)) * 0.5; return `<path d="M${x} ${y}V1300" stroke="${c.steel}" stroke-width="3"/>`; }).join("")}
        <rect x="0" y="1300" width="1200" height="200" fill="${c.steel}"/></svg>
      <div style="position:absolute;left:90px;top:90px">${b.lockup(c.steel, 54, { ink: c.steel, accent: c.rust })}</div>
      <div style="position:absolute;left:90px;top:300px;font-family:${b.fonts.display};font-size:250px;line-height:.86">Sunday<br>River<br>Ride</div>
      <div style="position:absolute;left:90px;top:960px;font-family:${b.fonts.body};font-weight:500;font-size:34px;line-height:1.3">Every Sunday · 8 am · Dieppe Gardens<br>28 km to Amherstburg and back. All bikes.</div>
      <div style="position:absolute;left:90px;bottom:70px;color:${c.chalk};font-family:${b.fonts.body};font-size:26px;letter-spacing:.1em;text-transform:uppercase">Free · Coffee after at the shop</div></div>`;
  add("ambassador", "poster", "Sunday ride poster", "Pasted on the trail bollards every Saturday night. The bridge is reduced to cables and a horizon so the type can do the shouting.", PORTRAIT, () => S.wall(poster, { wallColor: "#8E959C", width: 900, tilt: -5, left: 150, top: 90 }));

  add("ambassador", "tote", "Musette", "The bag riders get with a service. Badge in one colour on unbleached cotton.", WIDE, () => S.tote(`<div style="width:100%;height:100%;display:grid;place-items:center;align-content:center;gap:30px">${b.mark(300, { ink: c.steel, accent: c.steel })}${b.wordmark(c.steel, 56)}</div>`, { bg: "#D6DCE2", cloth: "#EDE8DC" }));

  const st = [coasterArt(b, { bg: c.chalk, fg: c.steel, text: "Windsor, ON" }), coasterArt(b, { bg: c.steel, fg: c.signal, markColors: { ink: c.chalk, accent: c.signal }, text: "Riverfront trail" }), coasterArt(b, { bg: c.signal, fg: c.steel, text: "Sunday ride" }), coasterArt(b, { bg: c.rust, fg: c.chalk, markColors: { ink: c.chalk, accent: c.signal }, text: "Fix it here" })];
  add("ambassador", "stickers", "Frame stickers", "Four badge colourways for down tubes and helmets.", WIDE, () => S.coasters(st, { surface: "#2A333D", size: 340 }));
  add("ambassador", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.chalk, fg: c.steel, muted: "#6F7A86", sample: "RIDE THE<br>RIVERFRONT" }));
}

/* ============================================================ POL */
{
  const b = B.pol, c = b.palette;
  const map = `<div style="position:absolute;inset:0;background:${c.lime};background-image:${b.pattern(c.indigo, 0.08)};color:${c.indigo}">
      <div style="position:absolute;left:56px;top:56px">${b.lockup(c.indigo, 40)}</div>
      <div style="position:absolute;left:56px;top:200px;font-family:${b.fonts.display};font-weight:600;font-size:104px;line-height:.95">Manek Chowk<br>to Swaminarayan</div>
      <div style="position:absolute;left:56px;right:56px;top:560px;display:flex;justify-content:space-between">${["Manek Chowk", "Kavi Dalpatram", "Doshiwada", "Jethabhai", "Swaminarayan"].map((s, i) => `<div style="text-align:center;font-family:${b.fonts.body};font-size:18px;width:200px"><div style="margin:0 auto 12px;width:110px;height:140px;border:4px solid ${c.indigo};border-radius:55px 55px 8px 8px;display:grid;place-items:center;font-family:${b.fonts.display};font-size:48px;font-weight:600;background:${i === 0 ? c.terracotta : "transparent"};color:${i === 0 ? c.lime : c.indigo}">${i + 1}</div>${s}</div>`).join("")}</div>
      <div style="position:absolute;left:56px;right:56px;bottom:150px;font-family:${b.fonts.body};font-size:26px;line-height:1.4;max-width:30ch">Two and a half hours, five pols, one chai stop. Every Saturday at 7:30 am from the Manek Chowk gate.</div>
      <div style="position:absolute;left:56px;bottom:56px;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:${c.terracotta}">polwalks.in · ₹450 · book by Friday</div></div>`;
  add("pol", "poster", "Walk poster", "The route drawn as a chain of arches, because the ticket and the poster should be the same map. Pasted at the guesthouses in the old city.", PORTRAIT, () => S.wall(map, { wallColor: "#C9B79A", width: 900, tilt: -5, left: 150, top: 90 }));

  add("pol", "tote", "Walk tote", "Handed out at the end of the walk with the chai. Indigo arch on unbleached cotton.", WIDE, () => S.tote(`<div style="width:100%;height:100%;display:grid;place-items:center;align-content:center;gap:24px">${b.mark(320, { ink: c.indigo, accent: c.terracotta })}${b.wordmark(c.indigo, 60)}</div>`, { bg: "#E6DCC6", cloth: "#EFE6D2" }));

  const front = `<div style="position:absolute;inset:0;background:${c.lime};color:${c.indigo};padding:34px 40px;font-family:${b.fonts.body}"><div style="display:flex;align-items:center;gap:16px">${b.mark(56)}<div>${b.wordmark(c.indigo, 34)}</div></div><div style="margin-top:22px;font-family:${b.fonts.display};font-weight:600;font-size:34px;line-height:1">Heritage walk · Manek Chowk to Swaminarayan</div><div style="position:absolute;left:40px;bottom:30px;font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;line-height:1.9">Sat 18 Oct · 7:30 am · Guest 042</div><div style="position:absolute;right:40px;bottom:34px;border:3px solid ${c.terracotta};color:${c.terracotta};padding:6px 12px;font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase;transform:rotate(-6deg)">Admit one</div></div>`;
  const back = `<div style="position:absolute;inset:0;background:${c.indigo};color:${c.lime};padding:34px 40px;display:flex;gap:12px;align-items:flex-end;justify-content:space-between">${[1, 2, 3, 4, 5].map((n) => `<div style="width:90px;height:120px;border:3px solid ${c.lime};border-radius:45px 45px 6px 6px;display:grid;place-items:center;font-family:${b.fonts.display};font-size:40px;font-weight:600;opacity:${n < 3 ? 1 : 0.4};background:${n < 3 ? c.terracotta : "transparent"}">${n}</div>`).join("")}</div>`;
  add("pol", "ticket", "Tear-off ticket", "The guide stamps an arch at each stop. By the end the ticket is a record of the walk.", WIDE, () => S.desk(front, back, { surface: "#D9A66C", dark: false, cardW: 720, cardH: 380 }));

  add("pol", "sign", "Pol wayfinding", "Enamel signs at the entrance to each pol on the route. Indigo on lime with the stop number as an arch.", WIDE, () => S.signpost(panelArt(b, { bg: c.indigo, fg: c.lime, accent: c.sandstone, title: "Doshiwada ni Pol", rows: [["3", "Stop three of five"], ["→", "Kavi Dalpatram Chowk · 180 m"], ["←", "Manek Chowk gate · 600 m"]], markColors: { ink: c.lime, accent: c.terracotta } }), { sky: "#E9D9BE", w: 760, h: 440, left: 420, top: 140 }));
  add("pol", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.lime, fg: c.indigo, muted: "#7A6F55", sample: "Through the<br>threshold." }));
}

/* ============================================================ HONEY */
{
  const b = B.honey, c = b.palette;
  const label = `<div style="position:absolute;inset:0;background:${c.wax};display:grid;justify-items:center;align-content:center;gap:12px;text-align:center;padding:0 40px;color:${c.ink}">
      ${b.mark(150)}<div>${b.wordmark(c.ink, 44)}</div>
      <div style="font-family:${b.fonts.display};font-style:italic;font-size:34px">Summer wildflower</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.14em;text-transform:uppercase;opacity:.7;line-height:2">Raw · unfiltered · 500 g<br>Manning Road apiary · Tecumseh, ON</div></div>`;
  add("honey", "jar", "Jar label", "A wraparound label on a 500 g jar. The hexagon holds a single drop; the road name says where it came from.", WIDE, () => S.jar(label, { bg: "#EFE6D2", fill: c.amber, lid: c.comb, w: 500, h: 800, left: 550, top: 110 }));

  add("honey", "sign", "Market sign", "The Saturday market stall. One panel, one price, one place.", WIDE, () => S.signpost(panelArt(b, { bg: c.comb, fg: c.wax, accent: c.amber, title: "Tecumseh Honey Co.", rows: [["500 g", "Summer wildflower · $14"], ["1 kg", "Summer wildflower · $24"], ["→", "Manning Road apiary · open Saturdays"]], markColors: { ink: c.wax, drop: c.amber } }), { sky: "#D8E2D2", w: 780, h: 460, left: 410, top: 130 }));

  const lids = [coasterArt(b, { bg: c.amber, fg: c.ink, markColors: { ink: c.ink, drop: c.ink }, text: "Wildflower" }), coasterArt(b, { bg: c.comb, fg: c.wax, markColors: { ink: c.wax, drop: c.amber }, text: "Buckwheat" }), coasterArt(b, { bg: c.wax, fg: c.ink, text: "Clover" }), coasterArt(b, { bg: c.clover, fg: c.wax, markColors: { ink: c.wax, drop: c.amber }, text: "Spring" })];
  add("honey", "lids", "Lid labels", "Four varietals, four lid colours, so the shelf reads at a glance.", WIDE, () => S.coasters(lids, { surface: "#3B2A16", size: 340 }));

  const poster = posterArt(b, { bg: c.wax, fg: c.ink, accent: c.comb, head: "From a road,<br>not a brand.", sub: "Raw honey from the Manning Road apiary, Tecumseh. Saturday market and the farm gate.", foot: "tecumsehhoney.ca", big: 120, patternColor: c.comb,
    extra: `<div style="position:absolute;right:56px;top:56px">${b.mark(150)}</div>` });
  add("honey", "poster", "Farm-gate poster", "At the end of the driveway, laminated. The headline is the brand's whole argument.", PORTRAIT, () => S.wall(poster, { wallColor: "#C9BFA6", width: 900, tilt: -5, left: 150, top: 90 }));
  add("honey", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.wax, fg: c.ink, muted: "#8A7554", sample: "One drop,<br>one road." }));
}

/* ============================================================ FERRY */
{
  const b = B.ferry, c = b.palette;
  add("ferry", "sign", "Terminal wayfinding", "Navy panels, one buoy-orange accent, and the arrow as the biggest thing on every sign.", WIDE, () => S.signpost(panelArt(b, { bg: c.navy, fg: c.white, accent: c.buoy, title: "Windsor Terminal", rows: [["↑", "Boarding · Detroit 12:40"], ["→", "Tickets and washrooms"], ["←", "Bike parking · Riverfront trail"]] }), { sky: "#C9D8E6", w: 800, h: 480, left: 400, top: 120 }));

  const app = `<div style="position:absolute;inset:0;background:${c.navy};color:${c.white};font-family:${b.fonts.body};background-image:${b.pattern(c.white, 0.08)}">
      <div style="position:absolute;left:80px;top:140px">${b.lockup(c.white, 40)}</div>
      <div style="position:absolute;left:80px;right:80px;top:340px;background:${c.white};color:${c.navy};border-radius:36px;padding:60px">
        <div class="mono" style="font-size:20px;opacity:.55">Next sailing</div>
        <div style="font-size:200px;font-weight:700;letter-spacing:-.05em;line-height:1;margin-top:10px">12:40</div>
        <div style="font-size:34px;font-weight:600;margin-top:10px">Windsor → Detroit</div>
        <div style="display:flex;gap:40px;margin-top:40px;font-size:26px">${[["Crossing", "18 min"], ["Gate", "B"], ["Seat", "Any"]].map(([k, v]) => `<div><div class="mono" style="font-size:16px;opacity:.55">${k}</div><b style="font-size:34px">${v}</b></div>`).join("")}</div>
        <div style="margin-top:50px;display:flex;gap:4px;height:80px;align-items:flex-end">${Array.from({ length: 46 }, (_, i) => `<i style="display:block;background:${c.navy};height:100%;width:${[3, 6, 3, 9, 4, 3, 7][i % 7]}px"></i>`).join("")}</div></div>
      <div style="position:absolute;left:80px;right:80px;bottom:140px;background:${c.buoy};color:${c.white};border-radius:999px;padding:34px;text-align:center;font-size:38px;font-weight:700">Show at the gate</div></div>`;
  add("ferry", "ticket", "Mobile ticket", "The ticket is the timetable: the next sailing is the biggest number on the screen, and the barcode is the only other thing.", WIDE, () => S.phone(app, { bg: "#0F2A44", scale: 0.44, left: 560, top: 40, glow: "rgba(242,92,42,.2)" }));

  const timetable = `<div style="position:absolute;inset:0;background:${c.white};color:${c.navy};font-family:${b.fonts.body}">
      <div style="background:${c.navy};color:${c.white};padding:56px">${b.lockup(c.white, 44)}<div style="margin-top:30px;font-size:88px;font-weight:700;letter-spacing:-.04em;line-height:.95">Every 40 minutes.<br>Both ways.</div></div>
      <div style="padding:50px 56px;display:grid;grid-template-columns:1fr 1fr;gap:40px;font-size:26px">
        ${[["Windsor → Detroit", ["06:40", "07:20", "08:00", "08:40", "09:20", "10:00", "10:40", "11:20", "12:00", "12:40"]], ["Detroit → Windsor", ["07:00", "07:40", "08:20", "09:00", "09:40", "10:20", "11:00", "11:40", "12:20", "13:00"]]].map(([h, t]) => `<div><div class="mono" style="font-size:16px;color:${c.buoy};margin-bottom:16px">${h}</div>${t.map((x) => `<div style="padding:12px 0;border-top:1px solid rgba(15,42,68,.15);font-weight:600;font-family:'JetBrains Mono',monospace;font-size:28px">${x}</div>`).join("")}</div>`).join("")}</div>
      <div style="position:absolute;left:56px;bottom:56px;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.14em;text-transform:uppercase;opacity:.6">essexcountyferry.ca · $6 · bikes free</div></div>`;
  add("ferry", "timetable", "Timetable poster", "One sheet for both terminals. The headline says the only thing anyone needs to remember.", PORTRAIT, () => S.wall(timetable, { wallColor: "#B7C4CF", width: 900, tilt: -5, left: 150, top: 90, frame: true }));

  const pic = (svgBody, label) => `<div style="width:100%;height:100%;background:${c.navy};display:grid;place-items:center;color:${c.white}"><svg viewBox="0 0 120 120" width="200">${svgBody}</svg><div style="position:absolute;left:0;right:0;bottom:40px;text-align:center;font-family:${b.fonts.body};font-size:20px;font-weight:600">${label}</div></div>`;
  const pics = [pic(b.mark(120).replace(/<svg[^>]*>|<\/svg>/g, ""), "Ferry"), pic(`<circle cx="34" cy="80" r="22" fill="none" stroke="#fff" stroke-width="7"/><circle cx="86" cy="80" r="22" fill="none" stroke="#fff" stroke-width="7"/><path d="M34 80 52 40h26l8 40M52 40 60 80" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>`, "Bikes"), pic(`<path d="M16 40h88v14a10 10 0 0 0 0 20v14H16V74a10 10 0 0 0 0-20Z" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round"/><path d="M60 46v36" stroke="#fff" stroke-width="6" stroke-dasharray="6 6"/>`, "Tickets"), pic(`<path d="M30 20h40v80H30ZM70 60h34M92 46l14 14-14 14" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>`, "Exit"), pic(`<path d="M30 30h60v60H30Z" fill="none" stroke="#fff" stroke-width="7"/><path d="M45 30V20h30v10M40 60h40" stroke="#fff" stroke-width="6"/>`, "Lockers"), pic(`<circle cx="60" cy="60" r="34" fill="none" stroke="#F25C2A" stroke-width="7"/><path d="M60 40v22l14 10" fill="none" stroke="#F25C2A" stroke-width="7" stroke-linecap="round"/>`, "Next sailing")];
  add("ferry", "pictograms", "Pictogram set", "Drawn on the same 120-unit grid as the logo, at the same stroke weight, so the ferry mark is one of the set.", WIDE, () => S.coasters(pics, { surface: "#DCE6EE", size: 330 }));
  add("ferry", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.navy, fg: c.white, muted: "#9FB3C4", sample: "Every 40<br>minutes." }));
}

/* ============================================================ BAKERY */
{
  const b = B.bakery, c = b.palette;
  const bagLabel = `<div style="background:${c.flour};padding:36px 30px;text-align:center;color:${c.rye}">
      <div style="display:inline-block">${b.mark(200, { ink: c.rye, accent: "transparent" })}</div>
      <div style="margin-top:14px">${b.wordmark(c.rye, 40)}</div>
      <div style="margin-top:26px;border:3px solid ${c.rye};padding:22px;font-family:${b.fonts.display};font-size:46px;line-height:1.05">Country<br><i>sourdough</i></div>
      <div style="margin-top:22px;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:.14em;text-transform:uppercase;opacity:.75;line-height:2">Baked 6:10 am · best today<br>flour · water · salt · time</div></div>`;
  add("bakery", "bag", "Bread bag", "A paper bag with the mark printed once, large, and the loaf name in a window. One colour keeps it cheap enough to give away.", WIDE, () => S.pouch(bagLabel, { bg: "#E3D9C6", bagColor: "#C9A57A", w: 560, h: 880, left: 520, top: 60 }));

  add("bakery", "shopfront", "Storefront", "The Sandwich Street unit. Rye-brown fascia, flour lettering, butter awning.", WIDE, () => S.storefront(fasciaArt(b, { bg: c.rye, fg: c.flour, size: 86, markColors: { ink: c.rye, accent: c.butter }, sub: "Since 6 am" }), { wallColor: "#8C6B4E", awning: c.butter }));

  const co = [coasterArt(b, { bg: c.butter, fg: c.rye, text: "Sandwich Town" }), coasterArt(b, { bg: c.rye, fg: c.flour, markColors: { ink: c.flour, accent: c.rye }, text: "Sourdough" }), coasterArt(b, { bg: c.flour, fg: c.rye, markColors: { ink: c.rye, accent: c.flour }, text: "Rye" }), coasterArt(b, { bg: c.crust, fg: c.flour, markColors: { ink: c.flour, accent: c.crust }, text: "Morning buns" })];
  add("bakery", "stickers", "Loaf stickers", "Seals for the bags, one per loaf type.", WIDE, () => S.coasters(co, { surface: "#5A4030", size: 340 }));

  const menu = `<div style="position:absolute;inset:0;background:${c.rye};color:${c.flour};padding:60px;font-family:${b.fonts.body}">
      ${b.lockup(c.flour, 44, { ink: c.flour, accent: c.rye })}
      <div style="margin-top:50px;font-family:${b.fonts.display};font-style:italic;font-size:88px;line-height:1">Today's bread</div>
      <div style="margin-top:40px;font-size:26px">${[["Country sourdough", "$8"], ["Seeded rye", "$9"], ["Baguette", "$4"], ["Morning buns · 4", "$10"], ["Focaccia · half", "$7"], ["Cinnamon knot", "$4.50"]].map(([n, p]) => `<div style="display:flex;justify-content:space-between;padding:18px 0;border-bottom:1px dashed rgba(247,238,223,.3)"><span>${n}</span><b style="font-family:'JetBrains Mono',monospace">${p}</b></div>`).join("")}</div>
      <div style="position:absolute;left:60px;bottom:60px;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:${c.butter}">Sold out means sold out · back at 6 am</div></div>`;
  add("bakery", "menu", "Menu board", "Behind the counter, reprinted daily. The list is the design.", PORTRAIT, () => S.wall(menu, { wallColor: "#D9CDB8", width: 900, tilt: -5, left: 150, top: 90, frame: true }));
  add("bakery", "type", "Type and colour", "", WIDE, () => specimen(b, { bg: c.flour, fg: c.rye, muted: "#8A7458", sample: "Flour, water,<br>salt, <i>time.</i>" }));
}

export const cases = P;
export { brandOrder };
