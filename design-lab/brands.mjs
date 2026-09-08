// Brand systems for the Designs section. Each brand carries a brief, palette,
// type, an SVG mark, a wordmark, a lockup and a repeating pattern, so every
// application (packaging, signage, stationery, social) reuses one drawing.

export const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@300..700&family=Sora:wght@300..800&family=DM+Serif+Display:ital@0;1&family=Unbounded:wght@300..900&family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Archivo+Black&family=Manrope:wght@300..800&family=Bebas+Neue&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Rubik:wght@400..900&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Bricolage+Grotesque:opsz,wght@12..96,300..800&display=swap";

const svg = (s, body, vb = "0 0 120 120") => `<svg viewBox="${vb}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const enc = (s) => `url("data:image/svg+xml,${encodeURIComponent(s).replace(/'/g, "%27").replace(/"/g, "%22")}")`;
const lockupHtml = (mark, word, gap) => `<span style="display:inline-flex;align-items:center;gap:${gap}px;white-space:nowrap">${mark}${word}</span>`;

const B = {};

/* ------------------------------------------------------------ Keri in Windsor */
B.keri = {
  name: "Keri in Windsor",
  real: true,
  what: "Seasonal Indian mango brand, Windsor–Essex",
  year: "2025",
  role: "Brand direction, identity, packaging, campaign creative",
  brief:
    "Keri means mango in Gujarati. The mark is a Kesar mango with its own highlight, shaped like the Windsor sun that ripens the season, and a single leaf for freshness. Fraunces italic gives the wordmark the softness of fruit; a tracked Manrope descriptor keeps the place name matter-of-fact.",
  palette: { kesar: "#F5A623", pulp: "#FFCB5C", leaf: "#1F4D2B", blush: "#E8562A", cream: "#FBF3E4", ink: "#2A1A08" },
  fonts: { display: "'Fraunces', serif", body: "'Manrope', sans-serif", displayName: "Fraunces Italic", bodyName: "Manrope" },
  mark: (s = 100, c = {}) => {
    const { fruit = "#F5A623", leaf = "#1F4D2B", light = "#FFE2A0" } = c;
    return svg(s, `
      <path d="M38 28C60 14 94 22 106 52c10 26 2 52-18 62-14 8-26 2-40-8C20 88 6 60 16 42c5-8 14-12 22-14Z" fill="${fruit}"/>
      <path d="M34 42c8-6 18-4 24 4-8 6-18 6-24-4Z" fill="${light}" opacity=".9"/>
      <path d="M40 26c2-16 26-24 40-14-10 14-28 18-40 14Z" fill="${leaf}"/>
      <path d="M40 26c-4-6-6-12-6-18" stroke="${leaf}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`);
  },
  wordmark: (color = "#2A1A08", size = 64) =>
    `<span style="white-space:nowrap"><span style="font-family:'Fraunces',serif;font-weight:600;font-style:italic;font-size:${size}px;letter-spacing:-.02em;color:${color};line-height:1">Keri</span><span style="font-family:'Manrope',sans-serif;font-weight:600;font-size:${size * 0.28}px;letter-spacing:.22em;text-transform:uppercase;color:${color};margin-left:${size * 0.22}px;vertical-align:middle">in Windsor</span></span>`,
  lockup: (color = "#2A1A08", size = 64, mc) => lockupHtml(B.keri.mark(size * 1.3, mc), B.keri.wordmark(color, size), size * 0.25),
  pattern: (fg = "#2A1A08", op = 0.12) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><g opacity='${op}' fill='${fg}'><path transform='translate(20 20) scale(.55)' d="M38 28C60 14 94 22 106 52c10 26 2 52-18 62-14 8-26 2-40-8C20 88 6 60 16 42c5-8 14-12 22-14Z"/><path transform='translate(110 100) scale(.55) rotate(25 60 60)' d="M38 28C60 14 94 22 106 52c10 26 2 52-18 62-14 8-26 2-40-8C20 88 6 60 16 42c5-8 14-12 22-14Z"/></g></svg>`),
};

/* ------------------------------------------------------------ Voyagea */
B.voyagea = {
  name: "Voyagea",
  real: true,
  what: "Free AI travel planner",
  year: "2026",
  role: "Product identity, app icon, in-app V-Passport stamps, launch creative",
  brief:
    "A route that draws a V and ends at a pin. The dashed leg is the plan; the solid leg is the trip you took. It survives at 29 px on a home screen because there is nothing else in it. Playfair Display gives the wordmark the weight of a printed atlas; the dawn-orange on midnight-blue palette is the hour most trips begin.",
  palette: { dawn: "#FF7A3D", dusk: "#1C2A5A", sky: "#2E6BC4", paper: "#F6F1E7", ink: "#141A2E" },
  fonts: { display: "'Playfair Display', serif", body: "'Manrope', sans-serif", displayName: "Playfair Display", bodyName: "Manrope" },
  mark: (s = 100, c = {}) => {
    const { bg = "#1C2A5A", route = "#FF7A3D", pin = "#F6F1E7", rounded = true } = c;
    return svg(s, `
      ${bg === "none" ? "" : `<rect width="120" height="120" rx="${rounded ? 28 : 0}" fill="${bg}"/>`}
      <path d="M28 34 60 92 92 34" fill="none" stroke="${route}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 16"/>
      <path d="M28 34 60 92" fill="none" stroke="${route}" stroke-width="9" stroke-linecap="round"/>
      <circle cx="92" cy="34" r="10" fill="${pin}"/><circle cx="92" cy="34" r="4" fill="${bg === "none" ? route : bg}"/>`);
  },
  wordmark: (color = "#141A2E", size = 64) =>
    `<span style="font-family:'Playfair Display',serif;font-weight:700;font-size:${size}px;letter-spacing:-.02em;color:${color};line-height:1;white-space:nowrap">Voyagea</span>`,
  lockup: (color = "#141A2E", size = 64, mc) => lockupHtml(B.voyagea.mark(size * 1.05, mc), B.voyagea.wordmark(color, size), size * 0.28),
  pattern: (fg = "#F6F1E7", op = 0.1) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><g opacity='${op}' fill='none' stroke='${fg}' stroke-width='5' stroke-linecap='round' stroke-dasharray='1 12'><path d='M20 30 60 100 100 30'/><path d='M100 110 140 150'/></g><circle cx='100' cy='30' r='6' fill='${fg}' opacity='${op}'/></svg>`),
};

/* ------------------------------------------------------------ PTRI Innovation */
B.ptri = {
  name: "PTRI Innovation",
  real: true,
  what: "AI-first technology company",
  year: "2026",
  role: "Monogram, stationery, presentation system",
  brief:
    "The P is a constellation: six nodes joined by hairlines, with one ember node where the letter turns. It reads as a mark first and as a letter second, which is the right order for a company that builds systems rather than sells a name. Space Grotesk carries the wordmark; Playfair italic carries the word innovation, so the two halves of the company sit in one line.",
  palette: { space: "#0B0B14", ember: "#FF6A1F", star: "#F2EEE6", nebula: "#3A2A6A", slate: "#20222F" },
  fonts: { display: "'Playfair Display', serif", body: "'Space Grotesk', sans-serif", displayName: "Playfair Display Italic", bodyName: "Space Grotesk" },
  mark: (s = 100, c = {}) => {
    const { line = "#F2EEE6", node = "#FF6A1F" } = c;
    const pts = [[30, 96], [30, 24], [70, 24], [88, 42], [70, 60], [30, 60]];
    const poly = pts.map((p) => p.join(",")).join(" ");
    const dots = pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 0 || i === 3 ? 6 : 4}" fill="${i === 3 ? node : line}"/>`).join("");
    return svg(s, `<polyline points="${poly}" fill="none" stroke="${line}" stroke-width="2.5" stroke-linejoin="round"/>${dots}`);
  },
  wordmark: (color = "#F2EEE6", size = 64) =>
    `<span style="white-space:nowrap"><span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:${size}px;letter-spacing:.08em;color:${color};line-height:1">PTRI</span><span style="font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:${size * 0.7}px;color:${color};margin-left:${size * 0.25}px">innovation</span></span>`,
  lockup: (color = "#F2EEE6", size = 64, mc) => lockupHtml(B.ptri.mark(size * 1.2, mc), B.ptri.wordmark(color, size), size * 0.25),
  pattern: (fg = "#F2EEE6", op = 0.08) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><g opacity='${op}' stroke='${fg}' stroke-width='1' fill='${fg}'><line x1='20' y1='40' x2='90' y2='20'/><line x1='90' y1='20' x2='140' y2='90'/><line x1='140' y1='90' x2='60' y2='150'/><circle cx='20' cy='40' r='3'/><circle cx='90' cy='20' r='2'/><circle cx='140' cy='90' r='3'/><circle cx='60' cy='150' r='2'/><circle cx='170' cy='170' r='2'/></g></svg>`),
};

/* ------------------------------------------------------------ Dwello */
B.dwello = {
  name: "Dwello",
  real: true,
  what: "Presence-aware desk robot",
  year: "2026",
  role: "Product and character design, logotype, expression system, packaging",
  brief:
    "The last letter of the logotype is the robot. Its face uses the same geometry as the physical product, so the wordmark and the object look at you the same way. Expressions are parameters rather than drawings: brow lift, brow tilt, eye openness and mouth, and it is the asymmetry between the two sides that carries most of the feeling.",
  palette: { shell: "#F4F4F2", ink: "#15171C", cyan: "#3EE0D8", slate: "#2A2E38", mist: "#D9DDE3" },
  fonts: { display: "'Sora', sans-serif", body: "'Manrope', sans-serif", displayName: "Sora Bold", bodyName: "Manrope" },
  face: (s = 100, e = {}) => {
    const { shell = "#F4F4F2", ink = "#15171C", lift = 0, tilt = 0, open = 1, wink = false, mouth = "smile", rx = 40 } = e;
    const eye = (x, o) => `<rect x="${x - 7}" y="${52 - 12 * o}" width="14" height="${24 * o + 3}" rx="7" fill="${ink}"/>`;
    const brow = (x, dir) => `<path d="M${x - 11} ${40 - lift + tilt * dir} L${x + 11} ${40 - lift - tilt * dir}" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`;
    const m = mouth === "smile" ? `<path d="M46 76c6 6 22 6 28 0" stroke="${ink}" stroke-width="4" stroke-linecap="round" fill="none"/>`
      : mouth === "o" ? `<circle cx="60" cy="78" r="6" fill="${ink}"/>`
      : mouth === "flat" ? `<path d="M50 78h20" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`
      : mouth === "grin" ? `<path d="M44 74h32a16 10 0 0 1-32 0Z" fill="${ink}"/>` : "";
    return svg(s, `<rect x="6" y="6" width="108" height="108" rx="${rx}" fill="${shell}"/>${brow(42, 1)}${brow(78, -1)}${eye(42, open)}${wink ? `<path d="M70 58h16" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>` : eye(78, open)}${m}`);
  },
  mark: (s = 100, c = {}) => B.dwello.face(s, c),
  wordmark: (color = "#15171C", size = 64) =>
    `<span style="font-family:'Sora',sans-serif;font-weight:700;font-size:${size}px;letter-spacing:-.04em;color:${color};line-height:1;display:inline-flex;align-items:center;white-space:nowrap">Dwell<span style="display:inline-block;width:${size * 0.86}px;height:${size * 0.86}px;margin-left:${size * 0.04}px">${B.dwello.face(size * 0.86, { shell: color, ink: color === "#15171C" ? "#F4F4F2" : "#15171C" })}</span></span>`,
  lockup: (color = "#15171C", size = 64) => B.dwello.wordmark(color, size),
  pattern: (fg = "#15171C", op = 0.08) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><g opacity='${op}' fill='${fg}'><rect x='30' y='40' width='12' height='26' rx='6'/><rect x='58' y='40' width='12' height='26' rx='6'/><path d='M36 80c6 6 22 6 28 0' stroke='${fg}' stroke-width='4' fill='none' stroke-linecap='round'/></g></svg>`),
};

/* ------------------------------------------------------------ BeamFall */
B.beamfall = {
  name: "BeamFall",
  real: true,
  what: "Light-routing puzzle for iPhone",
  year: "2026",
  role: "Game identity, app icon, App Store creative, launch poster",
  brief:
    "Three beams meet a prism. The icon is a literal game state: cyan enters, magenta exits upward, amber continues, and the white dot is the point where you tap. Unbounded at two weights splits the name into the beam and the fall. Everything on every piece is a real game element, so the brand never has to invent decoration.",
  palette: { void: "#07070C", cyan: "#3DF1FF", magenta: "#FF3DAA", amber: "#FFC53D", glass: "#1A1B2E", steel: "#8A8FB0" },
  fonts: { display: "'Unbounded', sans-serif", body: "'Space Grotesk', sans-serif", displayName: "Unbounded", bodyName: "Space Grotesk" },
  mark: (s = 100, c = {}) => {
    const { bg = "#12131F", rounded = true } = c;
    return svg(s, `
      <rect width="120" height="120" rx="${rounded ? 28 : 0}" fill="${bg}"/>
      <path d="M0 60H50L60 50" stroke="#3DF1FF" stroke-width="6" fill="none"/>
      <path d="M60 50L60 0" stroke="#FF3DAA" stroke-width="6" fill="none"/>
      <path d="M60 50L120 50" stroke="#FFC53D" stroke-width="6" fill="none"/>
      <path d="M44 66 60 34 76 66Z" fill="#1A1B2E" stroke="#8A8FB0" stroke-width="2"/>
      <circle cx="60" cy="50" r="5" fill="#fff"/>`);
  },
  wordmark: (color = "#fff", size = 64) =>
    `<span style="font-family:'Unbounded',sans-serif;font-weight:700;font-size:${size}px;letter-spacing:-.03em;color:${color};line-height:1;white-space:nowrap">Beam<span style="font-weight:300">Fall</span></span>`,
  lockup: (color = "#fff", size = 64, mc) => lockupHtml(B.beamfall.mark(size * 1.1, mc), B.beamfall.wordmark(color, size), size * 0.3),
  pattern: (fg = "#3DF1FF", op = 0.12) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g opacity='${op}' stroke='${fg}' stroke-width='1'><path d='M0 60h120M60 0v120'/></g></svg>`),
};

/* ------------------------------------------------------------ AK Builds & Plumbing */
B.ak = {
  name: "AK Builds & Plumbing",
  real: true,
  what: "Renovation and plumbing, Windsor",
  year: "2026",
  role: "Badge, wordmark, vehicle livery, workwear, site signage",
  brief:
    "A roofline, the initials, and a pipe elbow inside one ring: the two halves of the business in a single badge. It was drawn to be embroidered on a work shirt, so nothing in it is thinner than a stitch. Archivo Black carries the name at any distance; navy and brass read as trade, not tech.",
  palette: { navy: "#10243E", brass: "#C89B3C", white: "#F7F5F0", red: "#B5341C", steel: "#8A93A0" },
  fonts: { display: "'Archivo Black', sans-serif", body: "'Rubik', sans-serif", displayName: "Archivo Black", bodyName: "Rubik" },
  mark: (s = 100, c = {}) => {
    const { ring = "#10243E", ink = "#10243E", accent = "#C89B3C", bg = "#F7F5F0" } = c;
    return svg(s, `
      <circle cx="60" cy="60" r="56" fill="${bg}" stroke="${ring}" stroke-width="4"/>
      <circle cx="60" cy="60" r="49" fill="none" stroke="${ring}" stroke-width="1.5" stroke-dasharray="2 4"/>
      <path d="M26 54 60 28l34 26" fill="none" stroke="${accent}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
      <text x="60" y="76" text-anchor="middle" font-family="'Archivo Black',sans-serif" font-size="34" fill="${ink}">AK</text>
      <path d="M38 92h18v-8h8v8h18" fill="none" stroke="${accent}" stroke-width="5" stroke-linejoin="round"/>`);
  },
  wordmark: (color = "#10243E", size = 64) =>
    `<span style="white-space:nowrap"><span style="font-family:'Archivo Black',sans-serif;font-size:${size}px;letter-spacing:-.01em;color:${color};line-height:1">AK BUILDS</span><span style="font-family:'Rubik',sans-serif;font-weight:500;font-size:${size * 0.4}px;letter-spacing:.2em;color:${color};margin-left:${size * 0.3}px">&amp; PLUMBING</span></span>`,
  lockup: (color = "#10243E", size = 64, mc) => lockupHtml(B.ak.mark(size * 1.5, mc), B.ak.wordmark(color, size), size * 0.3),
  pattern: (fg = "#10243E", op = 0.08) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g opacity='${op}' fill='none' stroke='${fg}' stroke-width='4' stroke-linejoin='round'><path d='M10 50 40 26l30 24'/><path d='M60 100h14v-8h8v8h14'/></g></svg>`),
};

/* ------------------------------------------------------------ Trik Studio */
B.trik = {
  name: "Trik Studio",
  real: true,
  what: "Interior design studio, Ahmedabad",
  year: "2026",
  role: "Identity, stationery, project signage, web art direction",
  brief:
    "The corner of a room: floor, left wall, right wall, the three planes every interior begins with, drawn as one isometric mark. Plaster, walnut and brass are the studio's own materials rather than a chosen palette. DM Serif Display gives the wordmark a proportion that sits comfortably on a brass plate.",
  palette: { plaster: "#EFE9DE", walnut: "#4A3628", brass: "#B08D57", ink: "#1E1A16", sage: "#8A9A82" },
  fonts: { display: "'DM Serif Display', serif", body: "'Manrope', sans-serif", displayName: "DM Serif Display", bodyName: "Manrope" },
  mark: (s = 100, c = {}) => {
    const { floor = "#B08D57", left = "#4A3628", right = "#1E1A16" } = c;
    return svg(s, `
      <path d="M60 14 18 38v46l42-24Z" fill="${left}"/>
      <path d="M60 14l42 24v46L60 60Z" fill="${right}"/>
      <path d="M18 84l42-24 42 24-42 24Z" fill="${floor}"/>
      <path d="M60 60v48" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>`);
  },
  wordmark: (color = "#1E1A16", size = 64) =>
    `<span style="white-space:nowrap"><span style="font-family:'DM Serif Display',serif;font-size:${size}px;letter-spacing:.06em;color:${color};line-height:1">TRIK</span><span style="font-family:'Manrope',sans-serif;font-weight:500;font-size:${size * 0.3}px;letter-spacing:.34em;color:${color};margin-left:${size * 0.3}px;text-transform:uppercase">studio</span></span>`,
  lockup: (color = "#1E1A16", size = 64, mc) => lockupHtml(B.trik.mark(size * 1.3, mc), B.trik.wordmark(color, size), size * 0.3),
  pattern: (fg = "#1E1A16", op = 0.07) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'><g opacity='${op}' fill='none' stroke='${fg}' stroke-width='1.2'><path d='M60 0 0 34v70M60 0l60 34v70M0 34l60 34 60-34M60 68v36'/></g></svg>`),
};

/* ------------------------------------------------------------ Skyvage */
B.skyvage = {
  name: "Skyvage",
  real: true,
  what: "Private aviation concept site",
  year: "2026",
  role: "Wordmark, mark, cabin collateral, art direction",
  brief:
    "A descending V with a gold delta for the aircraft: the shape of a flight path ending at a runway. The wordmark is light, wide and tracked to take up the room a cabin does. Night blue, silver and gold are the palette of a window seat after sunset.",
  palette: { night: "#0B1020", silver: "#D9DEE8", gold: "#D4B36A", ink: "#0B1020", haze: "#3B4766" },
  fonts: { display: "'Bricolage Grotesque', sans-serif", body: "'Manrope', sans-serif", displayName: "Bricolage Grotesque Light", bodyName: "Manrope" },
  mark: (s = 100, c = {}) => {
    const { ink = "#D9DEE8", accent = "#D4B36A" } = c;
    return svg(s, `
      <path d="M12 36 60 98 108 36" fill="none" stroke="${ink}" stroke-width="11" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M60 96 44 56h32Z" fill="${accent}"/>
      <path d="M28 24h64" stroke="${ink}" stroke-width="3" stroke-linecap="round" opacity=".6"/>`);
  },
  wordmark: (color = "#D9DEE8", size = 64) =>
    `<span style="font-family:'Bricolage Grotesque',sans-serif;font-weight:300;font-size:${size}px;letter-spacing:.32em;color:${color};line-height:1;text-transform:uppercase;white-space:nowrap">Skyvage</span>`,
  lockup: (color = "#D9DEE8", size = 64, mc) => lockupHtml(B.skyvage.mark(size * 1.2, mc), B.skyvage.wordmark(color, size), size * 0.4),
  pattern: (fg = "#D9DEE8", op = 0.08) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><g opacity='${op}' fill='none' stroke='${fg}' stroke-width='2' stroke-linecap='round'><path d='M20 40 60 90 100 40'/><path d='M100 120h40'/></g></svg>`),
};

/* ------------------------------------------------------------ Concept brands */
B.riverside = {
  name: "Riverside Roasters",
  real: false,
  what: "Concept: a Windsor coffee roaster on the Detroit River",
  year: "2026",
  role: "Concept identity, packaging, storefront, coasters",
  brief:
    "A cup seen from above with the river running through it, and three lines of steam that are the only thing to break the circle. Libre Caslon gives it the voice of a place that has been open a while; river teal on roast brown is the view from the counter.",
  palette: { roast: "#3B2416", river: "#2F6E73", foam: "#F3EBDD", copper: "#C8763A", kraft: "#B98F63" },
  fonts: { display: "'Libre Caslon Text', serif", body: "'Manrope', sans-serif", displayName: "Libre Caslon Text", bodyName: "Manrope" },
  mark: (s = 100, c = {}) => {
    const { ring = "#3B2416", water = "#2F6E73", bg = "none" } = c;
    const id = Math.random().toString(36).slice(2, 7);
    return svg(s, `
      <circle cx="60" cy="60" r="50" fill="${bg}" stroke="${ring}" stroke-width="6"/>
      <clipPath id="rr${id}"><circle cx="60" cy="60" r="47"/></clipPath>
      <g clip-path="url(#rr${id})" fill="none" stroke="${water}" stroke-width="5" stroke-linecap="round">
        <path d="M6 66c12-10 24-10 36 0s24 10 36 0 24-10 36 0"/>
        <path d="M6 82c12-10 24-10 36 0s24 10 36 0 24-10 36 0" opacity=".55"/>
      </g>
      <path d="M44 40c-4-8 4-10 0-18M60 40c-4-8 4-10 0-18M76 40c-4-8 4-10 0-18" stroke="${ring}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`);
  },
  wordmark: (color = "#3B2416", size = 64) =>
    `<span style="white-space:nowrap"><span style="font-family:'Libre Caslon Text',serif;font-weight:700;font-size:${size}px;letter-spacing:-.01em;color:${color};line-height:1">Riverside</span><span style="font-family:'Manrope',sans-serif;font-weight:600;font-size:${size * 0.3}px;letter-spacing:.3em;text-transform:uppercase;color:${color};margin-left:${size * 0.25}px">Roasters</span></span>`,
  lockup: (color = "#3B2416", size = 64, mc) => lockupHtml(B.riverside.mark(size * 1.4, mc), B.riverside.wordmark(color, size), size * 0.3),
  pattern: (fg = "#2F6E73", op = 0.12) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='60' viewBox='0 0 120 60'><path d='M0 30c15-12 30-12 45 0s30 12 45 0 30-12 45 0' fill='none' stroke='${fg}' stroke-width='4' stroke-linecap='round' opacity='${op}'/></svg>`),
};

B.ambassador = {
  name: "Ambassador Cycles",
  real: false,
  what: "Concept: a riverfront bike shop named for the bridge",
  year: "2026",
  role: "Concept identity, storefront, ride posters, merchandise",
  brief:
    "The Ambassador Bridge tower and cables over a chainring, with the deck as the line between them. Bebas Neue is the shop sign you can read from the trail at speed; signal yellow on steel blue is safety wear turned into a palette.",
  palette: { steel: "#1C2B3A", signal: "#F2C230", chalk: "#F5F1E8", rust: "#B9482B", sky: "#9DBBD3" },
  fonts: { display: "'Bebas Neue', sans-serif", body: "'Rubik', sans-serif", displayName: "Bebas Neue", bodyName: "Rubik" },
  mark: (s = 100, c = {}) => {
    const { ink = "#1C2B3A", accent = "#F2C230" } = c;
    const teeth = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      return `<circle cx="${(60 + Math.cos(a) * 24).toFixed(1)}" cy="${(86 + Math.sin(a) * 24).toFixed(1)}" r="3" fill="${ink}"/>`;
    }).join("");
    return svg(s, `
      ${teeth}<circle cx="60" cy="86" r="20" fill="none" stroke="${ink}" stroke-width="6"/>
      <circle cx="60" cy="86" r="7" fill="${accent}"/>
      <path d="M4 56h112" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>
      <path d="M4 56Q30 12 56 12M64 12Q90 12 116 56" fill="none" stroke="${ink}" stroke-width="4"/>
      <path d="M54 8h4v48h-4zM62 8h4v48h-4zM54 20h12v3H54zM54 34h12v3H54z" fill="${ink}"/>
      <path d="M22 56V40M36 56V22M84 56V22M98 56V40" stroke="${ink}" stroke-width="2.5"/>`);
  },
  wordmark: (color = "#1C2B3A", size = 64) =>
    `<span style="font-family:'Bebas Neue',sans-serif;font-size:${size}px;letter-spacing:.06em;color:${color};line-height:1;white-space:nowrap">Ambassador Cycles</span>`,
  lockup: (color = "#1C2B3A", size = 64, mc) => lockupHtml(B.ambassador.mark(size * 1.5, mc), B.ambassador.wordmark(color, size), size * 0.3),
  pattern: (fg = "#1C2B3A", op = 0.1) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g opacity='${op}' fill='none' stroke='${fg}' stroke-width='3'><circle cx='60' cy='60' r='22'/><circle cx='60' cy='60' r='6'/><path d='M60 32v-12M60 100v-12M32 60H20M100 60H88'/></g></svg>`),
};

B.pol = {
  name: "Pol Walks",
  real: false,
  what: "Concept: guided walks through Ahmedabad's old-city pols",
  year: "2026",
  role: "Concept identity, tickets, wayfinding, tote",
  brief:
    "A carved arch with a terracotta doorway: the threshold of a pol house, the thing every walk passes through a hundred times. Cormorant carries the age of the old city; Manrope carries the map. Indigo and sandstone are the city's own morning colours.",
  palette: { sandstone: "#D9A66C", indigo: "#1E2A5C", lime: "#F0E6C8", terracotta: "#A8442B", dust: "#C9B79A" },
  fonts: { display: "'Cormorant Garamond', serif", body: "'Manrope', sans-serif", displayName: "Cormorant Garamond", bodyName: "Manrope" },
  mark: (s = 100, c = {}) => {
    const { ink = "#1E2A5C", accent = "#A8442B" } = c;
    return svg(s, `
      <path d="M22 100V56c0-10 8-16 14-22 8-8 12-18 24-18s16 10 24 18c6 6 14 12 14 22v44Z" fill="none" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M46 100V70c0-10 6-16 14-16s14 6 14 16v30" fill="${accent}"/>
      <path d="M14 100h92M20 108h80" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="60" cy="34" r="4" fill="${ink}"/>`);
  },
  wordmark: (color = "#1E2A5C", size = 64) =>
    `<span style="white-space:nowrap"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:${size}px;letter-spacing:.02em;color:${color};line-height:1">Pol</span><span style="font-family:'Manrope',sans-serif;font-weight:500;font-size:${size * 0.32}px;letter-spacing:.3em;text-transform:uppercase;color:${color};margin-left:${size * 0.22}px">Walks</span></span>`,
  lockup: (color = "#1E2A5C", size = 64, mc) => lockupHtml(B.pol.mark(size * 1.4, mc), B.pol.wordmark(color, size), size * 0.25),
  pattern: (fg = "#1E2A5C", op = 0.1) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='100' height='120' viewBox='0 0 100 120'><path d='M20 110V60c0-20 14-36 30-36s30 16 30 36v50' fill='none' stroke='${fg}' stroke-width='3' opacity='${op}'/></svg>`),
};

B.honey = {
  name: "Tecumseh Honey Co.",
  real: false,
  what: "Concept: small-batch honey from Essex County",
  year: "2026",
  role: "Concept identity, jar labels, market signage",
  brief:
    "A hexagon that holds a single drop. Fraunces at its heaviest weight has the softness of honey without turning into a cartoon; the label lists the apiary's road because customers here buy from a place, not a brand.",
  palette: { amber: "#E39B1E", comb: "#5A3510", wax: "#FBF1D6", ink: "#2B1D0E", clover: "#7A8B4E" },
  fonts: { display: "'Fraunces', serif", body: "'Manrope', sans-serif", displayName: "Fraunces Bold", bodyName: "Manrope" },
  mark: (s = 100, c = {}) => {
    const { ink = "#5A3510", drop = "#E39B1E" } = c;
    return svg(s, `
      <path d="M60 8 104 34v52L60 112 16 86V34Z" fill="none" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M60 40c10 14 18 22 18 34a18 18 0 0 1-36 0c0-12 8-20 18-34Z" fill="${drop}"/>`);
  },
  wordmark: (color = "#2B1D0E", size = 64) =>
    `<span style="white-space:nowrap"><span style="font-family:'Fraunces',serif;font-weight:700;font-size:${size}px;letter-spacing:-.01em;color:${color};line-height:1">Tecumseh</span><span style="font-family:'Manrope',sans-serif;font-weight:600;font-size:${size * 0.3}px;letter-spacing:.28em;text-transform:uppercase;color:${color};margin-left:${size * 0.25}px">Honey Co.</span></span>`,
  lockup: (color = "#2B1D0E", size = 64, mc) => lockupHtml(B.honey.mark(size * 1.4, mc), B.honey.wordmark(color, size), size * 0.25),
  pattern: (fg = "#5A3510", op = 0.1) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='104' height='120' viewBox='0 0 104 120'><g opacity='${op}' fill='none' stroke='${fg}' stroke-width='2'><path d='M52 4 96 30v52L52 108 8 82V30Z'/></g></svg>`),
};

B.ferry = {
  name: "Essex County Ferry",
  real: false,
  what: "Concept: wayfinding for a Windsor–Detroit passenger ferry",
  year: "2026",
  role: "Concept identity, pictograms, wayfinding, tickets",
  brief:
    "A ferry drawn on the same grid as the pictograms it sits beside, so the logo is the first sign in the system rather than a separate thing. Navy panels, one buoy-orange accent, and Sora at heavy weights for names you read from across a terminal.",
  palette: { navy: "#0F2A44", buoy: "#F25C2A", white: "#FFFFFF", mist: "#DCE6EE", river: "#2E6C8A" },
  fonts: { display: "'Sora', sans-serif", body: "'Sora', sans-serif", displayName: "Sora Bold", bodyName: "Sora" },
  mark: (s = 100, c = {}) => {
    const { ink = "#FFFFFF", accent = "#F25C2A" } = c;
    return svg(s, `
      <path d="M20 70h80l-10 18H30Z" fill="${ink}"/>
      <path d="M36 70V48h48v22" fill="${ink}"/>
      <path d="M44 56h8v8h-8zM56 56h8v8h-8zM68 56h8v8h-8z" fill="${accent}"/>
      <path d="M8 98c10-8 18-8 28 0s18 8 28 0 18-8 28 0 18 8 28 0" fill="none" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>`);
  },
  wordmark: (color = "#fff", size = 64) =>
    `<span style="font-family:'Sora',sans-serif;font-weight:700;font-size:${size}px;letter-spacing:-.03em;color:${color};line-height:1;white-space:nowrap">Essex County Ferry</span>`,
  lockup: (color = "#fff", size = 64, mc) => lockupHtml(B.ferry.mark(size * 1.3, mc), B.ferry.wordmark(color, size), size * 0.3),
  pattern: (fg = "#FFFFFF", op = 0.1) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'><path d='M0 20c15-12 30-12 45 0s30 12 45 0 30-12 45 0' fill='none' stroke='${fg}' stroke-width='4' stroke-linecap='round' opacity='${op}'/></svg>`),
};

B.bakery = {
  name: "Sandwich Town Bakery",
  real: false,
  what: "Concept: a bakery in Windsor's oldest neighbourhood",
  year: "2026",
  role: "Concept identity, bread bags, storefront, coasters",
  brief:
    "A single ear of wheat in a butter-yellow coin. Instrument Serif italic keeps the wordmark warm without leaning on a script face, and one-colour printing keeps the bags cheap enough to give away with every loaf.",
  palette: { crust: "#8A4B1E", flour: "#F7EEDF", rye: "#3D2A1A", butter: "#F3C96B", oat: "#D9C7A6" },
  fonts: { display: "'Instrument Serif', serif", body: "'Manrope', sans-serif", displayName: "Instrument Serif Italic", bodyName: "Manrope" },
  mark: (s = 100, c = {}) => {
    const { ink = "#3D2A1A", accent = "#F3C96B" } = c;
    const grain = (x, y, rot) => `<path d="M0 0c6-4 12 0 12 8s-6 12-12 8c-6-4-6-12 0-16Z" fill="${ink}" transform="translate(${x} ${y}) rotate(${rot})"/>`;
    const grains = [0, 1, 2, 3].flatMap((i) => [grain(60, 88 - i * 14, -60), grain(60, 88 - i * 14, 120)]).join("");
    return svg(s, `
      <circle cx="60" cy="60" r="52" fill="${accent}"/>
      <path d="M60 104V30" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>${grains}
      <path d="M60 30l-8-14M60 30l8-14M60 30v-16" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`);
  },
  wordmark: (color = "#3D2A1A", size = 64) =>
    `<span style="white-space:nowrap"><span style="font-family:'Instrument Serif',serif;font-style:italic;font-size:${size}px;letter-spacing:-.01em;color:${color};line-height:1">Sandwich Town</span><span style="font-family:'Manrope',sans-serif;font-weight:600;font-size:${size * 0.3}px;letter-spacing:.3em;text-transform:uppercase;color:${color};margin-left:${size * 0.25}px">Bakery</span></span>`,
  lockup: (color = "#3D2A1A", size = 64, mc) => lockupHtml(B.bakery.mark(size * 1.4, mc), B.bakery.wordmark(color, size), size * 0.25),
  pattern: (fg = "#3D2A1A", op = 0.1) => enc(`<svg xmlns='http://www.w3.org/2000/svg' width='80' height='120' viewBox='0 0 80 120'><g opacity='${op}' fill='${fg}'><path d='M40 100V30' stroke='${fg}' stroke-width='3'/><ellipse cx='30' cy='50' rx='5' ry='9' transform='rotate(-30 30 50)'/><ellipse cx='50' cy='50' rx='5' ry='9' transform='rotate(30 50 50)'/><ellipse cx='30' cy='70' rx='5' ry='9' transform='rotate(-30 30 70)'/><ellipse cx='50' cy='70' rx='5' ry='9' transform='rotate(30 50 70)'/></g></svg>`),
};

export const brands = B;
export const brandOrder = ["keri", "voyagea", "dwello", "beamfall", "ptri", "ak", "trik", "skyvage", "riverside", "ambassador", "pol", "honey", "ferry", "bakery"];
