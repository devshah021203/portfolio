/**
 * Dwello's face.
 *
 * The physical robot draws its face on a 1.28" round LCD, so the web version
 * does the same: everything below paints into a 2D canvas that Three.js uses as
 * the screen texture. Expressions are parameter sets that get lerped toward,
 * which is what makes the face morph between moods instead of cutting between
 * pictures of moods.
 *
 * The three things that carry most of the expressiveness:
 *   - brows, which can lift, drop and angle independently per side
 *   - eyes that cross-fade between a filled capsule and a crescent arc
 *   - asymmetry, so one eye can widen or one brow can raise on its own
 */

export type ExpressionName =
  | "happy"
  | "excited"
  | "curious"
  | "focused"
  | "thinking"
  | "surprised"
  | "sleepy"
  | "wink"
  | "listening";

export type FaceParams = {
  /** eye width, in canvas units (of 512) */
  eyeW: number;
  /** eye height */
  eyeH: number;
  /** corner radius of the filled eye */
  eyeR: number;
  /** distance of each eye from centre */
  eyeGap: number;
  /** vertical offset of the eye pair; negative is higher */
  eyeY: number;
  /** inner-corner tilt, radians; positive narrows the inner edge */
  eyeTilt: number;
  /** 0 = filled capsule, 1 = crescent arc */
  eyeCurve: number;
  /** +1 = arc bulges up (a happy squint), -1 = bulges down (sleepy) */
  eyeArcDir: number;
  /** size multiplier applied to the right eye only; 1 = symmetric */
  eyeAsym: number;
  /** 0..1 alpha of the specular dot inside each eye */
  highlight: number;
  /** 0..1 how closed the right eye is on its own — a wink */
  winkR: number;
  /** 0..1 brow visibility */
  browOn: number;
  /** brow distance above the eye */
  browY: number;
  /** brow angle, radians. NEGATIVE drives the inner ends DOWN (furrowed,
   *  determined); POSITIVE lifts them (worried, surprised, pleading). */
  browTilt: number;
  /** extra tilt applied to the right brow only, for a raised eyebrow */
  browAsym: number;
  /** 0 = flat mouth, 1 = full smile, negative = frown */
  mouthCurve: number;
  /** mouth width */
  mouthW: number;
  /** 0 = closed line, 1 = wide open */
  mouthOpen: number;
  /** vertical offset of the mouth */
  mouthY: number;
  /** how much the eyes drift toward the pointer, 0..1 */
  track: number;
  /** drives the bloom around every feature */
  glow: number;
};

const BASE: FaceParams = {
  eyeW: 46, eyeH: 78, eyeR: 23, eyeGap: 74, eyeY: -12, eyeTilt: 0,
  eyeCurve: 0, eyeArcDir: 1, eyeAsym: 1, highlight: 0.85, winkR: 0,
  browOn: 0, browY: 30, browTilt: 0, browAsym: 0,
  mouthCurve: 1.1, mouthW: 68, mouthOpen: 0, mouthY: 54,
  track: 1, glow: 1,
};

const make = (over: Partial<FaceParams>): FaceParams => ({ ...BASE, ...over });

export const EXPRESSIONS: Record<ExpressionName, FaceParams> = {
  happy: make({}),

  // Squinted crescent eyes and a wide open grin — the "delighted" face.
  excited: make({
    eyeW: 62, eyeH: 40, eyeCurve: 1, eyeArcDir: 1, eyeGap: 78, eyeY: -18,
    highlight: 0, browOn: 0.8, browY: 48, browTilt: 0.12,
    mouthCurve: 1.4, mouthW: 88, mouthOpen: 0.62, mouthY: 48, glow: 1.3,
  }),

  // One eye wider than the other, one brow up, head cocked at a small o.
  curious: make({
    eyeW: 50, eyeH: 88, eyeR: 25, eyeGap: 76, eyeY: -18, eyeAsym: 1.16,
    browOn: 0.9, browY: 34, browTilt: -0.05, browAsym: -0.34,
    mouthCurve: 0.3, mouthW: 34, mouthOpen: 0.5, mouthY: 56, glow: 1.05,
  }),

  // Narrowed eyes, brows driven down and in, mouth a flat line.
  focused: make({
    eyeW: 56, eyeH: 30, eyeR: 14, eyeGap: 74, eyeY: -6, eyeTilt: 0.3,
    highlight: 0.4, browOn: 1, browY: 26, browTilt: -0.36,
    mouthCurve: 0, mouthW: 46, mouthY: 58, track: 0.45, glow: 0.9,
  }),

  // Looking up and away, one brow raised, mouth pushed to one side.
  thinking: make({
    eyeW: 44, eyeH: 66, eyeR: 22, eyeGap: 72, eyeY: -32, eyeTilt: 0.12,
    highlight: 0.55, browOn: 0.85, browY: 34, browTilt: 0.1, browAsym: -0.42,
    mouthCurve: -0.35, mouthW: 38, mouthOpen: 0.12, mouthY: 60,
    track: 0.2, glow: 0.85,
  }),

  // Everything round and high.
  surprised: make({
    eyeW: 78, eyeH: 78, eyeR: 39, eyeGap: 84, eyeY: -16,
    highlight: 1, browOn: 1, browY: 54, browTilt: 0.16,
    mouthCurve: 0.1, mouthW: 44, mouthOpen: 1, mouthY: 54, glow: 1.25,
  }),

  // Heavy downward arcs, dim screen, barely a mouth.
  sleepy: make({
    eyeW: 60, eyeH: 26, eyeCurve: 1, eyeArcDir: -1, eyeGap: 72, eyeY: 2,
    highlight: 0, browOn: 0.55, browY: 28, browTilt: -0.08,
    mouthCurve: 0.2, mouthW: 24, mouthOpen: 0.18, mouthY: 62,
    track: 0.1, glow: 0.45,
  }),

  // Left eye open, right eye shut, big grin.
  wink: make({
    eyeW: 48, eyeH: 82, eyeGap: 75, eyeY: -14, winkR: 1,
    browOn: 0.75, browY: 36, browTilt: -0.1, browAsym: -0.2,
    mouthCurve: 1.3, mouthW: 70, mouthY: 52, glow: 1.15,
  }),

  listening: make({
    eyeW: 48, eyeH: 82, eyeGap: 74, eyeY: -16,
    browOn: 0.6, browY: 38, browTilt: -0.12,
    mouthCurve: 0.5, mouthW: 44, mouthOpen: 0.25, mouthY: 54, glow: 1.15,
  }),
};

export const EXPRESSION_ORDER: ExpressionName[] = [
  "happy", "excited", "curious", "focused", "thinking", "surprised", "sleepy", "wink",
];

/** Label plus the line Dwello says when you pick it. */
export const EXPRESSION_COPY: Record<ExpressionName, { label: string; line: string }> = {
  happy:     { label: "Happy",     line: "Good to see you. Room's all yours." },
  excited:   { label: "Excited",   line: "Three people in here — it's busy today!" },
  curious:   { label: "Curious",   line: "Something moved near the door…" },
  focused:   { label: "Focused",   line: "Desk zone active. Holding your calls." },
  thinking:  { label: "Thinking",  line: "Working out whose tag that was." },
  surprised: { label: "Surprised", line: "Didn't expect anyone at this hour." },
  sleepy:    { label: "Sleepy",    line: "Room's been empty a while. Dimming." },
  wink:      { label: "Wink",      line: "Lights are on. I got you." },
  listening: { label: "Listening", line: "I'm listening." },
};

export const FACE_SIZE = 512;

export function cloneParams(p: FaceParams): FaceParams {
  return { ...p };
}

/** Frame-rate independent, so throttled tabs still converge. */
export function approachParams(current: FaceParams, target: FaceParams, dt: number, speed = 9) {
  const k = 1 - Math.exp(-speed * dt);
  (Object.keys(current) as (keyof FaceParams)[]).forEach((key) => {
    current[key] += (target[key] - current[key]) * k;
  });
}

type DrawState = {
  params: FaceParams;
  /** 0 = open, 1 = fully shut */
  blink: number;
  /** -1..1 pointer position, already smoothed by the caller */
  lookX: number;
  lookY: number;
  /** seconds, drives the idle shimmer */
  time: number;
  /** 0..1 ramp while Dwello is "speaking" */
  speak: number;
};

const CYAN = "#3ee9ff";
const CYAN_SOFT = "#1ec8e0";

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x - w / 2 + radius, y - h / 2);
  ctx.lineTo(x + w / 2 - radius, y - h / 2);
  ctx.quadraticCurveTo(x + w / 2, y - h / 2, x + w / 2, y - h / 2 + radius);
  ctx.lineTo(x + w / 2, y + h / 2 - radius);
  ctx.quadraticCurveTo(x + w / 2, y + h / 2, x + w / 2 - radius, y + h / 2);
  ctx.lineTo(x - w / 2 + radius, y + h / 2);
  ctx.quadraticCurveTo(x - w / 2, y + h / 2, x - w / 2, y + h / 2 - radius);
  ctx.lineTo(x - w / 2, y - h / 2 + radius);
  ctx.quadraticCurveTo(x - w / 2, y - h / 2, x - w / 2 + radius, y - h / 2);
  ctx.closePath();
}

function drawEye(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  p: FaceParams, shut: number, side: -1 | 1,
) {
  const scale = side === 1 ? p.eyeAsym : 1;
  const w = p.eyeW * scale;
  // Shutting collapses toward a thin line rather than to nothing, so the eye
  // never fully vanishes mid-blink.
  const h = Math.max(5, p.eyeH * scale * (1 - shut * 0.94));

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(p.eyeTilt * side);

  // Filled capsule and crescent arc are drawn on top of each other and
  // cross-faded, which is what lets the shape morph smoothly.
  const filled = 1 - p.eyeCurve;

  if (filled > 0.01) {
    ctx.globalAlpha = filled;
    roundedRect(ctx, 0, 0, w, h, Math.min(p.eyeR, h / 2));
    ctx.fill();

    // A specular dot high in the eye. Small detail, but it's most of what
    // makes the face read as looking at you rather than through you.
    if (p.highlight > 0.02) {
      ctx.globalAlpha = filled * p.highlight * 0.9;
      ctx.fillStyle = "#eafcff";
      ctx.beginPath();
      ctx.ellipse(-w * 0.16, -h * 0.24, w * 0.15, h * 0.13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = CYAN;
    }
  }

  if (p.eyeCurve > 0.01) {
    ctx.globalAlpha = p.eyeCurve;
    ctx.lineWidth = Math.max(6, h * 0.62);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-w / 2, 0);
    ctx.quadraticCurveTo(0, -p.eyeArcDir * h * 1.35, w / 2, 0);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawBrow(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  p: FaceParams, side: -1 | 1,
) {
  if (p.browOn < 0.02) return;
  const w = p.eyeW * (side === 1 ? p.eyeAsym : 1) * 1.15;
  // browTilt mirrors per side; browAsym only lands on the right brow, which is
  // what produces a single raised eyebrow.
  const tilt = p.browTilt * side + (side === 1 ? p.browAsym : 0);

  ctx.save();
  ctx.globalAlpha = p.browOn;
  ctx.translate(cx, cy - p.eyeH / 2 - p.browY);
  ctx.rotate(tilt);
  roundedRect(ctx, 0, 0, w, 12, 6);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawMouth(ctx: CanvasRenderingContext2D, p: FaceParams, state: DrawState) {
  const cx = FACE_SIZE / 2;
  const cy = FACE_SIZE / 2 + p.mouthY;
  const speakPulse = state.speak * (0.5 + 0.5 * Math.sin(state.time * 18));
  const open = Math.min(1, p.mouthOpen + speakPulse * 0.55);

  if (open > 0.06) {
    const rw = p.mouthW * (0.4 + open * 0.32);
    const rh = p.mouthW * (0.14 + open * 0.5);
    // A happy open mouth is a grin — flat across the top, round underneath.
    // A neutral one is a full ellipse. Cross-fade so transitions don't pop.
    const grin = Math.max(0, Math.min(1, (p.mouthCurve - 0.55) / 0.5));

    if (grin < 0.99) {
      ctx.globalAlpha = 1 - grin;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    if (grin > 0.01) {
      ctx.globalAlpha = grin;
      ctx.beginPath();
      ctx.ellipse(cx, cy - rh * 0.34, rw, rh, 0, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    return;
  }

  const half = p.mouthW / 2;
  const lift = p.mouthCurve * 34;
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.moveTo(cx - half, cy - lift * 0.25);
  ctx.quadraticCurveTo(cx, cy + lift, cx + half, cy - lift * 0.25);
  ctx.stroke();
}

export function drawFace(ctx: CanvasRenderingContext2D, state: DrawState) {
  const { params: p } = state;
  const size = FACE_SIZE;

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#05070b";
  ctx.fillRect(0, 0, size, size);

  const vignette = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size * 0.52);
  vignette.addColorStop(0, "rgba(20,34,48,0.55)");
  vignette.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, size, size);

  // Scanlines sell "this is a screen" better than any amount of gloss.
  ctx.globalAlpha = 0.055;
  ctx.fillStyle = "#7fdfff";
  for (let y = 0; y < size; y += 5) ctx.fillRect(0, y, size, 1);
  ctx.globalAlpha = 1;

  const lookScale = 16 * p.track;
  const ox = state.lookX * lookScale;
  const oy = state.lookY * lookScale * 0.7;
  // Slow idle drift so the face is never perfectly still.
  const idleX = Math.sin(state.time * 0.7) * 1.6;
  const idleY = Math.cos(state.time * 0.53) * 1.2;

  const cx = size / 2 + ox + idleX;
  const cy = size / 2 + p.eyeY + oy + idleY;

  ctx.fillStyle = CYAN;
  ctx.strokeStyle = CYAN;
  ctx.shadowColor = CYAN_SOFT;
  ctx.shadowBlur = 34 * p.glow;

  // A wink shuts the right eye on top of whatever the blink is doing.
  const shutL = state.blink;
  const shutR = Math.max(state.blink, p.winkR);

  drawBrow(ctx, cx - p.eyeGap, cy, p, -1);
  drawBrow(ctx, cx + p.eyeGap, cy, p, 1);
  drawEye(ctx, cx - p.eyeGap, cy, p, shutL, -1);
  drawEye(ctx, cx + p.eyeGap, cy, p, shutR, 1);

  ctx.save();
  ctx.translate(ox * 0.55 + idleX * 0.5, oy * 0.4);
  drawMouth(ctx, p, state);
  ctx.restore();

  ctx.shadowBlur = 0;
}
