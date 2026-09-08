// Mockup scenes: reusable CSS/HTML presentation environments that make a flat
// design read as a physical object. Every scene takes the artwork as an HTML
// string and returns { css, html } for render.mjs. Lighting comes from
// layered gradients (a key light from the top-left, an ambient floor), noise
// grain, and contact shadows; print sits on paper with multiply blending so
// texture shows through the ink.

export const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const baseCss = `
  *{box-sizing:border-box;margin:0}
  html,body{width:100%;height:100%}
  body{overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;font-family:'Manrope',sans-serif}
  .abs{position:absolute}
  .fill{position:absolute;inset:0}
  .mono{font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.12em}
  .grain{position:absolute;inset:0;pointer-events:none;opacity:.09;background-image:${NOISE};mix-blend-mode:multiply}
  .grain.light{mix-blend-mode:screen;opacity:.06}
  .vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,.28) 100%)}
  .key{position:absolute;inset:0;pointer-events:none;background:linear-gradient(118deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.04) 38%, rgba(0,0,0,0) 55%, rgba(0,0,0,.14) 100%)}
  .paper{position:relative;background:#F7F4EE}
  .paper:before{content:"";position:absolute;inset:0;background-image:${NOISE};opacity:.18;mix-blend-mode:multiply;pointer-events:none}
  .ink{mix-blend-mode:multiply}
  .shadow-lg{box-shadow:0 60px 90px -30px rgba(0,0,0,.45), 0 24px 40px -24px rgba(0,0,0,.35), 0 1px 2px rgba(0,0,0,.25)}
  .shadow-md{box-shadow:0 30px 50px -22px rgba(0,0,0,.45), 0 10px 20px -12px rgba(0,0,0,.3), 0 1px 1px rgba(0,0,0,.2)}
  .edge{box-shadow:inset 0 0 0 1px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.5)}
`;

/** A wall with a framed or pinned poster, slight 3D tilt, soft key light. */
export function wall(poster, o = {}) {
  const { wallColor = "#D9D5CE", width = 640, tilt = -6, frame = false, left = 480, top = 60, artW = 1200, artH = 1500 } = o;
  const inner = frame ? width - 52 : width;
  const scale = inner / artW;
  const height = Math.round(artH * scale) + (frame ? 52 : 0);
  return {
    css: `
      body{background:${wallColor}}
      .wall{position:absolute;inset:0;background:
        radial-gradient(90% 70% at 30% 20%, rgba(255,255,255,.32), transparent 60%),
        linear-gradient(180deg, ${wallColor}, ${shade(wallColor, -10)})}
      .floor{position:absolute;left:0;right:0;bottom:0;height:14%;background:linear-gradient(180deg, ${shade(wallColor, -18)}, ${shade(wallColor, -30)});box-shadow:0 -2px 0 rgba(255,255,255,.15)}
      .poster{position:absolute;left:${left}px;top:${top}px;width:${width}px;height:${height}px;transform:perspective(2400px) rotateY(${tilt}deg);transform-origin:50% 50%;overflow:hidden;${frame ? "padding:26px;background:#141414;" : ""}}
      .poster .art{position:relative;width:100%;height:100%;overflow:hidden}
      .poster .art > .inner{position:absolute;left:0;top:0;width:${artW}px;height:${artH}px;transform:scale(${scale});transform-origin:0 0}
      .pin{position:absolute;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 35% 35%, #fff, #9a9a9a 60%, #555);box-shadow:0 2px 4px rgba(0,0,0,.5)}`,
    html: `<div class="wall"></div><div class="floor"></div>
      <div class="poster shadow-lg"><div class="art paper"><div class="inner">${poster}</div><div class="key"></div></div>
        ${frame ? "" : `<div class="pin" style="left:14px;top:14px"></div><div class="pin" style="right:14px;top:14px"></div>`}</div>
      <div class="grain"></div><div class="vignette"></div>`,
  };
}

/** Two business cards on a surface: front rotated, back overlapping. */
export function desk(front, back, o = {}) {
  const { surface = "#2B2A28", cardW = 700, cardH = 400, dark = true } = o;
  return {
    css: `
      body{background:${surface}}
      .surface{position:absolute;inset:0;background:radial-gradient(80% 60% at 25% 15%, rgba(255,255,255,${dark ? ".12" : ".45"}), transparent 60%), linear-gradient(160deg, ${shade(surface, 6)}, ${shade(surface, -14)})}
      .card{position:absolute;width:${cardW}px;height:${cardH}px;border-radius:10px;overflow:hidden}
      .card > *{width:100%;height:100%;position:relative}
      .c1{left:110px;top:150px;transform:rotate(-7deg)}
      .c2{left:760px;top:390px;transform:rotate(4deg)}
      .card .key{opacity:.7}`,
    html: `<div class="surface"></div>
      <div class="card c1 shadow-lg edge">${front}<div class="key"></div></div>
      <div class="card c2 shadow-lg edge">${back}<div class="key"></div></div>
      <div class="grain${dark ? " light" : ""}"></div><div class="vignette"></div>`,
  };
}

/** A 3D box: front and side faces with a top, ambient shadow on the ground. */
export function box(front, side, top, o = {}) {
  const { bg = "#E6DFD3", w = 620, h = 420, d = 380, rotY = -28, left = 330, topPx = 200 } = o;
  return {
    css: `
      body{background:${bg}}
      .ground{position:absolute;inset:0;background:radial-gradient(70% 55% at 45% 20%, rgba(255,255,255,.5), transparent 60%), linear-gradient(180deg, ${shade(bg, 4)}, ${shade(bg, -12)})}
      .scene{position:absolute;left:${left}px;top:${topPx}px;width:${w}px;height:${h}px;transform-style:preserve-3d;transform:perspective(2600px) rotateX(11deg) rotateY(${rotY}deg)}
      .face{position:absolute;overflow:hidden;backface-visibility:hidden}
      .face > *{width:100%;height:100%;position:relative}
      .front{width:${w}px;height:${h}px;transform:translateZ(${d / 2}px)}
      .side{width:${d}px;height:${h}px;left:${w}px;transform-origin:left center;transform:translateZ(${d / 2}px) rotateY(90deg);filter:brightness(.78)}
      .top{width:${w}px;height:${d}px;top:-${d}px;transform-origin:bottom center;transform:translateZ(${d / 2}px) rotateX(90deg);filter:brightness(1.08)}
      .contact{position:absolute;left:${left - 40}px;top:${topPx + h - 30}px;width:${w + d * 0.7}px;height:120px;background:radial-gradient(60% 55% at 40% 50%, rgba(0,0,0,.42), transparent 70%);filter:blur(10px);transform:skewX(-22deg)}`,
    html: `<div class="ground"></div><div class="contact"></div>
      <div class="scene">
        <div class="face front paper">${front}<div class="key"></div></div>
        <div class="face side paper">${side}</div>
        <div class="face top paper">${top}</div>
      </div>
      <div class="grain"></div><div class="vignette"></div>`,
  };
}

/** A stand-up pouch with a label; gusset shading, heat-seal strip, rounded bottom. */
export function pouch(label, o = {}) {
  const { bg = "#E4DBCB", bagColor = "#B98F63", w = 560, h = 900, left = 520, top = 60 } = o;
  return {
    css: `
      body{background:${bg}}
      .ground{position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 15%, rgba(255,255,255,.5), transparent 60%), linear-gradient(180deg, ${shade(bg, 4)}, ${shade(bg, -12)})}
      .bag{position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;border-radius:26px 26px 60px 60px / 26px 26px 40px 40px;background:
        linear-gradient(90deg, ${shade(bagColor, -28)} 0%, ${shade(bagColor, -6)} 9%, ${shade(bagColor, 10)} 30%, ${shade(bagColor, 2)} 55%, ${shade(bagColor, -8)} 82%, ${shade(bagColor, -30)} 100%);
        box-shadow:0 70px 90px -40px rgba(0,0,0,.55), 0 30px 40px -30px rgba(0,0,0,.4), inset 0 -40px 60px -40px rgba(0,0,0,.35)}
      .seal{position:absolute;left:0;right:0;top:0;height:72px;border-radius:26px 26px 0 0;background:linear-gradient(180deg, ${shade(bagColor, -18)}, ${shade(bagColor, -2)});border-bottom:2px dashed rgba(0,0,0,.25)}
      .seal:after{content:"";position:absolute;left:0;right:0;bottom:-14px;height:14px;background:linear-gradient(180deg, rgba(0,0,0,.28), transparent)}
      .label{position:absolute;left:${Math.round(w * 0.12)}px;right:${Math.round(w * 0.12)}px;top:${Math.round(h * 0.2)}px;overflow:hidden;border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,.2)}
      .label > *{position:relative}
      .label:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg, rgba(0,0,0,.16), transparent 22%, transparent 78%, rgba(0,0,0,.18));pointer-events:none}
      .crease{position:absolute;left:0;right:0;top:${Math.round(h * 0.62)}px;height:2px;background:rgba(255,255,255,.25);box-shadow:0 2px 6px rgba(0,0,0,.25)}
      .contact{position:absolute;left:${left - 60}px;top:${top + h - 40}px;width:${w + 120}px;height:90px;background:radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.5), transparent 70%);filter:blur(10px)}`,
    html: `<div class="ground"></div><div class="contact"></div>
      <div class="bag"><div class="seal"></div><div class="label paper">${label}</div><div class="crease"></div><div class="grain"></div></div>
      <div class="grain"></div><div class="vignette"></div>`,
  };
}

/** An iPhone showing a full-bleed screen, on a gradient backdrop with a floor reflection. */
export function phone(screen, o = {}) {
  const { bg = "#1B1D26", scale = 0.5, left = 520, top = 70, glow = "rgba(255,255,255,.12)" } = o;
  const W = 1080 * scale, H = 1920 * scale;
  return {
    css: `
      body{background:${bg}}
      .bd{position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 40%, ${glow}, transparent 65%), linear-gradient(180deg, ${shade(bg, 8)}, ${shade(bg, -10)})}
      .device{position:absolute;left:${left}px;top:${top}px;width:${W + 44}px;height:${H + 44}px;border-radius:${86 * scale + 22}px;background:linear-gradient(135deg,#3a3b40,#0f1013 60%,#2b2c31);padding:22px;box-shadow:0 70px 100px -40px rgba(0,0,0,.8), 0 0 0 2px rgba(255,255,255,.08) inset, 0 0 0 1px rgba(0,0,0,.8)}
      .screen{position:relative;width:${W}px;height:${H}px;border-radius:${86 * scale}px;overflow:hidden;background:#000}
      .screen > .art{position:absolute;left:0;top:0;width:1080px;height:1920px;transform:scale(${scale});transform-origin:0 0}
      .island{position:absolute;left:50%;top:${26 * scale + 8}px;width:${250 * scale}px;height:${74 * scale}px;transform:translateX(-50%);border-radius:999px;background:#000;z-index:3}
      .gloss{position:absolute;inset:0;border-radius:${86 * scale}px;background:linear-gradient(115deg, rgba(255,255,255,.14), transparent 40%);pointer-events:none;z-index:2}
      .refl{position:absolute;left:${left}px;top:${top + H + 44 + 6}px;width:${W + 44}px;height:${(H + 44) * 0.35}px;border-radius:${86 * scale + 22}px;overflow:hidden;opacity:.28;transform:scaleY(-1);mask-image:linear-gradient(180deg, transparent, black);-webkit-mask-image:linear-gradient(0deg, black, transparent);background:linear-gradient(135deg,#3a3b40,#0f1013 60%,#2b2c31)}`,
    html: `<div class="bd"></div>
      <div class="device"><div class="screen"><div class="art">${screen}</div><div class="island"></div><div class="gloss"></div></div></div>
      <div class="refl"></div><div class="grain light"></div>`,
  };
}

/** An app icon on an iOS home screen among blurred neighbours. */
export function homescreen(icon, name, o = {}) {
  const { wallpaper = "linear-gradient(160deg,#2b3a67,#0e1424)", scale = 0.5, bg = "#101218" } = o;
  const others = ["#4c8bf5", "#34c759", "#ff9f0a", "#ff375f", "#bf5af2", "#64d2ff", "#ffd60a", "#8e8e93", "#30d158", "#ff453a", "#5e5ce6"];
  const cell = (i) => `<div class="app"><div class="ic" style="background:linear-gradient(145deg, ${others[i % others.length]}, ${shade(others[i % others.length], -25)})"></div><span></span></div>`;
  const grid = Array.from({ length: 11 }, (_, i) => (i === 5 ? `<div class="app hero"><div class="ic real">${icon}</div><span>${name}</span></div>` : cell(i))).join("");
  const screen = `
    <div style="position:absolute;inset:0;background:${wallpaper}"></div>
    <div style="position:absolute;left:0;right:0;top:110px;text-align:center;color:#fff;font-family:'Sora',sans-serif;font-size:150px;font-weight:300;letter-spacing:-.02em;line-height:1">9:41</div>
    <div class="grid">${grid}</div>
    <div class="dock"></div>`;
  const p = phone(screen, { bg, scale, glow: "rgba(255,255,255,.08)" });
  return {
    css: p.css + `
      .grid{position:absolute;left:70px;right:70px;top:420px;display:grid;grid-template-columns:repeat(4,1fr);gap:70px 30px;justify-items:center}
      .app{display:grid;justify-items:center;gap:18px;color:#fff;font-family:'Sora',sans-serif;font-size:32px;filter:blur(2px);opacity:.75}
      .app span{display:block;width:120px;height:18px;border-radius:9px;background:rgba(255,255,255,.55)}
      .app .ic{width:180px;height:180px;border-radius:44px;box-shadow:0 10px 30px rgba(0,0,0,.35)}
      .app.hero{filter:none;opacity:1;transform:scale(1.06)}
      .app.hero span{width:auto;height:auto;background:none;font-size:34px}
      .app.hero .ic{overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.5)}
      .app.hero .ic > *{width:100%;height:100%;display:block}
      .dock{position:absolute;left:60px;right:60px;bottom:60px;height:260px;border-radius:70px;background:rgba(255,255,255,.18);backdrop-filter:blur(30px)}`,
    html: p.html,
  };
}

/** A sign panel mounted on a post, outdoors. */
export function signpost(panel, o = {}) {
  const { sky = "#C9D8E6", w = 760, h = 520, left = 420, top = 120 } = o;
  return {
    css: `
      body{background:${sky}}
      .sky{position:absolute;inset:0;background:linear-gradient(180deg, ${shade(sky, 12)}, ${sky} 55%, ${shade(sky, -8)})}
      .ground{position:absolute;left:0;right:0;bottom:0;height:22%;background:linear-gradient(180deg, #9AA39B, #6E776F)}
      .post{position:absolute;left:${left + w / 2 - 22}px;top:${top + h - 10}px;width:44px;height:${1000 - (top + h)}px;background:linear-gradient(90deg,#4a4d52,#7c8087 40%,#3c3f44);box-shadow:20px 0 30px -10px rgba(0,0,0,.3)}
      .panel{position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;border-radius:18px;overflow:hidden;transform:perspective(2400px) rotateY(9deg);box-shadow:0 50px 80px -30px rgba(0,0,0,.55), 0 0 0 6px rgba(255,255,255,.12) inset}
      .panel > *{width:100%;height:100%;position:relative}
      .panel:after{content:"";position:absolute;inset:0;background:linear-gradient(105deg, rgba(255,255,255,.28), transparent 35%, rgba(0,0,0,.12) 100%);pointer-events:none}`,
    html: `<div class="sky"></div><div class="ground"></div><div class="post"></div>
      <div class="panel">${panel}</div><div class="grain light"></div><div class="vignette"></div>`,
  };
}

/** A storefront fascia sign above a doorway with an awning. */
export function storefront(fascia, o = {}) {
  const { wallColor = "#3A3F45", awning = "#2E3A46", accent = "#fff" } = o;
  return {
    css: `
      body{background:${wallColor}}
      .brick{position:absolute;inset:0;background:linear-gradient(180deg, ${shade(wallColor, 10)}, ${wallColor} 40%, ${shade(wallColor, -12)})}
      .brick:after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(0,0,0,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px);background-size:100% 46px, 140px 46px;opacity:.5}
      .fascia{position:absolute;left:140px;right:140px;top:110px;height:300px;border-radius:8px;overflow:hidden;box-shadow:0 30px 60px -20px rgba(0,0,0,.7), inset 0 0 0 4px rgba(0,0,0,.25)}
      .fascia > *{width:100%;height:100%;position:relative}
      .fascia:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg, rgba(255,255,255,.18), transparent 30%, rgba(0,0,0,.18));pointer-events:none}
      .awning{position:absolute;left:100px;right:100px;top:430px;height:120px;background:repeating-linear-gradient(90deg, ${awning} 0 90px, ${shade(awning, 18)} 90px 180px);border-radius:0 0 16px 16px;box-shadow:0 40px 50px -20px rgba(0,0,0,.7);transform:perspective(1200px) rotateX(-18deg);transform-origin:top}
      .awning:after{content:"";position:absolute;left:0;right:0;bottom:-30px;height:30px;background:repeating-linear-gradient(90deg, ${awning} 0 90px, ${shade(awning, 18)} 90px 180px);border-radius:0 0 50% 50% / 0 0 100% 100%;mask:repeating-linear-gradient(90deg, black 0 60px, transparent 60px 90px);-webkit-mask:repeating-linear-gradient(90deg, black 0 60px, transparent 60px 90px)}
      .door{position:absolute;left:560px;width:480px;top:560px;bottom:0;background:linear-gradient(180deg, rgba(20,24,30,.9), rgba(10,12,16,1));box-shadow:inset 0 0 0 14px #1a1d22, inset 0 0 80px rgba(255,255,255,.06)}
      .door:before{content:"";position:absolute;left:14px;right:14px;top:14px;bottom:14px;background:linear-gradient(100deg, rgba(255,255,255,.14), transparent 45%)}
      .win{position:absolute;top:560px;bottom:0;width:340px;background:linear-gradient(120deg, rgba(120,140,160,.35), rgba(20,25,32,.9) 60%);box-shadow:inset 0 0 0 12px #1a1d22}
      .lamp{position:absolute;left:50%;top:60px;width:900px;height:400px;transform:translateX(-50%);background:radial-gradient(50% 60% at 50% 0%, rgba(255,240,200,.45), transparent 70%);pointer-events:none}`,
    html: `<div class="brick"></div><div class="lamp"></div>
      <div class="fascia">${fascia}</div><div class="awning"></div>
      <div class="win" style="left:160px"></div><div class="door"></div><div class="win" style="right:160px"></div>
      <div class="grain"></div><div class="vignette"></div>`,
  };
}

/** A glass jar with a wraparound label. */
export function jar(label, o = {}) {
  const { bg = "#EFE6D2", fill = "#E39B1E", lid = "#4B2E12", w = 520, h = 820, left = 540, top = 100 } = o;
  return {
    css: `
      body{background:${bg}}
      .ground{position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 15%, rgba(255,255,255,.55), transparent 60%), linear-gradient(180deg, ${shade(bg, 4)}, ${shade(bg, -12)})}
      .jar{position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;border-radius:70px 70px 110px 110px / 40px 40px 90px 90px;overflow:hidden;background:
        linear-gradient(90deg, ${shade(fill, -30)} 0%, ${shade(fill, -6)} 12%, ${shade(fill, 22)} 36%, ${shade(fill, 8)} 58%, ${shade(fill, -12)} 84%, ${shade(fill, -34)} 100%);
        box-shadow:0 60px 80px -40px rgba(0,0,0,.55), inset 0 -60px 80px -50px rgba(0,0,0,.35)}
      .jar:before{content:"";position:absolute;left:8%;top:6%;width:10%;height:70%;border-radius:999px;background:linear-gradient(180deg, rgba(255,255,255,.6), rgba(255,255,255,.05));filter:blur(3px)}
      .lid{position:absolute;left:${left - 12}px;top:${top - 40}px;width:${w + 24}px;height:110px;border-radius:30px 30px 14px 14px / 20px 20px 10px 10px;background:linear-gradient(90deg, ${shade(lid, -30)}, ${shade(lid, 10)} 40%, ${shade(lid, -5)} 70%, ${shade(lid, -35)});box-shadow:0 14px 20px -8px rgba(0,0,0,.5)}
      .lid:after{content:"";position:absolute;left:0;right:0;top:0;height:100%;background:repeating-linear-gradient(90deg, transparent 0 22px, rgba(0,0,0,.12) 22px 26px)}
      .label{position:absolute;left:0;right:0;top:${Math.round(h * 0.28)}px;height:${Math.round(h * 0.46)}px;overflow:hidden}
      .label > *{position:relative;width:100%;height:100%}
      .label:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg, rgba(0,0,0,.22), transparent 18%, rgba(255,255,255,.12) 36%, transparent 60%, rgba(0,0,0,.24));pointer-events:none}
      .contact{position:absolute;left:${left - 40}px;top:${top + h - 40}px;width:${w + 80}px;height:90px;background:radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.5), transparent 70%);filter:blur(10px)}`,
    html: `<div class="ground"></div><div class="contact"></div>
      <div class="jar"><div class="label paper">${label}</div><div class="grain"></div></div><div class="lid"></div>
      <div class="grain"></div><div class="vignette"></div>`,
  };
}

/** A hang tag on a cord (luggage tag, product tag). */
export function tag(front, o = {}) {
  const { bg = "#20242E", w = 380, h = 620, left = 610, top = 160, tagColor = "#F2EFE8" } = o;
  return {
    css: `
      body{background:${bg}}
      .bd{position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 30%, rgba(255,255,255,.14), transparent 65%), linear-gradient(180deg, ${shade(bg, 8)}, ${shade(bg, -10)})}
      .cord{position:absolute;left:${left + w / 2 - 3}px;top:-40px;width:6px;height:${top + 60}px;background:linear-gradient(90deg,#6b5b45,#c9b28a,#6b5b45);border-radius:3px}
      .tag{position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;border-radius:28px;background:${tagColor};overflow:hidden;transform:rotate(6deg);box-shadow:0 50px 70px -30px rgba(0,0,0,.7), 0 1px 1px rgba(0,0,0,.4)}
      .tag > .art{position:relative;width:100%;height:100%}
      .hole{position:absolute;left:50%;top:30px;width:30px;height:30px;transform:translateX(-50%);border-radius:50%;background:${bg};box-shadow:inset 0 2px 4px rgba(0,0,0,.6), 0 0 0 5px #b9a888}`,
    html: `<div class="bd"></div><div class="cord"></div>
      <div class="tag paper"><div class="art">${front}</div><div class="hole"></div><div class="key"></div></div>
      <div class="grain light"></div>`,
  };
}

/** Letterhead sheet, envelope and card laid out on a surface. */
export function stationery(sheet, envelope, card, o = {}) {
  const { surface = "#D7D2C8" } = o;
  return {
    css: `
      body{background:${surface}}
      .surface{position:absolute;inset:0;background:radial-gradient(80% 60% at 30% 10%, rgba(255,255,255,.5), transparent 60%), linear-gradient(160deg, ${shade(surface, 6)}, ${shade(surface, -12)})}
      .sheet{position:absolute;left:120px;top:60px;width:600px;height:850px;transform:rotate(-2deg);overflow:hidden}
      .env{position:absolute;left:760px;top:120px;width:640px;height:420px;transform:rotate(5deg);overflow:hidden;border-radius:6px}
      .card{position:absolute;left:900px;top:600px;width:520px;height:300px;transform:rotate(-4deg);overflow:hidden;border-radius:8px}
      .sheet > .art, .env > .art, .card > .art{position:relative;width:100%;height:100%}`,
    html: `<div class="surface"></div>
      <div class="sheet paper shadow-lg"><div class="art">${sheet}</div><div class="key"></div></div>
      <div class="env paper shadow-lg"><div class="art">${envelope}</div><div class="key"></div></div>
      <div class="card paper shadow-lg"><div class="art">${card}</div><div class="key"></div></div>
      <div class="grain"></div><div class="vignette"></div>`,
  };
}

/** A tote bag hanging, with the artwork printed on it. */
export function tote(art, o = {}) {
  const { bg = "#E8E2D6", cloth = "#EDE6D8", left = 480, top = 120 } = o;
  return {
    css: `
      body{background:${bg}}
      .bd{position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 20%, rgba(255,255,255,.5), transparent 60%), linear-gradient(180deg, ${shade(bg, 4)}, ${shade(bg, -12)})}
      .handle{position:absolute;left:${left + 150}px;top:${top - 100}px;width:340px;height:260px;border:22px solid ${shade(cloth, -8)};border-bottom:0;border-radius:170px 170px 0 0;box-shadow:inset 0 -10px 20px rgba(0,0,0,.08)}
      .bag{position:absolute;left:${left}px;top:${top}px;width:640px;height:720px;border-radius:12px 12px 30px 30px;background:linear-gradient(90deg, ${shade(cloth, -14)}, ${cloth} 20%, ${shade(cloth, 3)} 50%, ${cloth} 80%, ${shade(cloth, -16)});box-shadow:0 60px 80px -40px rgba(0,0,0,.5), inset 0 20px 30px -20px rgba(0,0,0,.2)}
      .bag:before{content:"";position:absolute;inset:0;background-image:${NOISE};opacity:.25;mix-blend-mode:multiply;border-radius:inherit}
      .print{position:absolute;left:90px;right:90px;top:140px;bottom:140px;display:grid;place-items:center;mix-blend-mode:multiply;opacity:.92}
      .print > *{width:100%;height:100%}
      .fold{position:absolute;left:0;right:0;top:0;height:60px;border-radius:12px 12px 0 0;background:linear-gradient(180deg, rgba(0,0,0,.14), transparent)}`,
    html: `<div class="bd"></div><div class="handle"></div>
      <div class="bag"><div class="fold"></div><div class="print">${art}</div></div>
      <div class="grain"></div><div class="vignette"></div>`,
  };
}

/** Sticker sheet / coaster: round die-cut pieces on a surface. */
export function coasters(items, o = {}) {
  const { surface = "#3B2A20", size = 380 } = o;
  const pos = [[140, 150, -8], [560, 90, 5], [980, 170, -3], [330, 540, 6], [770, 520, -6], [1180, 560, 4]];
  return {
    css: `
      body{background:${surface}}
      .surface{position:absolute;inset:0;background:radial-gradient(70% 60% at 30% 10%, rgba(255,255,255,.18), transparent 60%), linear-gradient(160deg, ${shade(surface, 8)}, ${shade(surface, -14)})}
      .co{position:absolute;width:${size}px;height:${size}px;border-radius:50%;overflow:hidden;box-shadow:0 30px 50px -20px rgba(0,0,0,.7), 0 2px 0 rgba(0,0,0,.35), inset 0 0 0 1px rgba(0,0,0,.08)}
      .co > .art{position:relative;width:100%;height:100%;display:grid;place-items:center}`,
    html: `<div class="surface"></div>` + items.slice(0, 6).map((it, i) => `<div class="co paper" style="left:${pos[i][0]}px;top:${pos[i][1]}px;transform:rotate(${pos[i][2]}deg)"><div class="art">${it}</div><div class="key"></div></div>`).join("") + `<div class="grain light"></div><div class="vignette"></div>`,
  };
}

/** Utility: lighten (+) or darken (-) a hex colour by percent. */
export function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (pct > 0 ? (255 - c) * (pct / 100) : c * (pct / 100)))));
  const r = f((n >> 16) & 255), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
