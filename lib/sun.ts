/**
 * Solar position for Windsor, Ontario, and the palette that follows the sun.
 *
 * The whole site is lit by the real sky over Windsor: the hero draws the sun
 * where it actually is right now, and every colour token, plus the direction
 * and length of every shadow, is derived from the sun's altitude and azimuth.
 * Visitors can scrub the day with the time slider; "now" is the default.
 */

export const WINDSOR = { lat: 42.3149, lon: -83.0364, tz: "America/Toronto" };

const RAD = Math.PI / 180;
const DAY_MS = 86_400_000;
const J2000 = 946_728_000_000; // 2000-01-01T12:00Z

export type SunPosition = { altitude: number; azimuth: number }; // degrees; azimuth clockwise from north

/** Astronomical sun position (accuracy ~0.5°), after the SunCalc formulation. */
export function sunPosition(date: Date, lat = WINDSOR.lat, lon = WINDSOR.lon): SunPosition {
  const d = (date.getTime() - J2000) / DAY_MS;
  const M = (357.5291 + 0.98560028 * d) * RAD;
  const C = 1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M);
  const L = M + C * RAD + (102.9372 + 180) * RAD; // ecliptic longitude
  const e = 23.4397 * RAD;
  const dec = Math.asin(Math.sin(e) * Math.sin(L));
  const ra = Math.atan2(Math.sin(L) * Math.cos(e), Math.cos(L));
  const theta = (280.16 + 360.9856235 * d) * RAD + lon * RAD; // sidereal time
  const H = theta - ra;
  const phi = lat * RAD;
  const alt = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
  const azSouth = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
  let az = (azSouth / RAD + 180) % 360;
  if (az < 0) az += 360;
  return { altitude: alt / RAD, azimuth: az };
}

/** Minutes since local midnight in Windsor for an instant. */
export function windsorMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: WINDSOR.tz,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

/** Build an instant on the same Windsor calendar day as `base` at `minutes` past local midnight. */
export function atWindsorMinutes(base: Date, minutes: number): Date {
  const current = windsorMinutes(base);
  return new Date(base.getTime() + (minutes - current) * 60_000);
}

export function formatWindsorTime(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: WINDSOR.tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(/\s?([ap])\.?m\.?/i, " $1m")
    .toLowerCase();
}

/** Sunrise and sunset (minutes after local midnight) for the Windsor day containing `base`. */
export function sunTimes(base: Date): { sunrise: number | null; sunset: number | null } {
  let sunrise: number | null = null;
  let sunset: number | null = null;
  let prev = sunPosition(atWindsorMinutes(base, 0)).altitude;
  for (let m = 5; m <= 1440; m += 5) {
    const alt = sunPosition(atWindsorMinutes(base, m)).altitude;
    if (prev < -0.833 && alt >= -0.833 && sunrise === null) sunrise = m;
    if (prev >= -0.833 && alt < -0.833) sunset = m;
    prev = alt;
  }
  return { sunrise, sunset };
}

export function minutesLabel(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, "0")} ${h24 < 12 ? "am" : "pm"}`;
}

/* ---------------------------------------------------------------- palette */

type RGB = [number, number, number];

export type SceneTokens = {
  bg: RGB; // page ground
  bg2: RGB; // raised surface
  fg: RGB; // primary text
  muted: RGB; // secondary text
  line: RGB; // hairlines (used at low alpha)
  accent: RGB; // decorative mango/kesar accent
  link: RGB; // text-safe accent
  skyTop: RGB;
  skyHorizon: RGB;
  sun: RGB;
  glow: RGB;
  shadow: RGB; // shadow tint (alpha set separately)
  shadowAlpha: number;
  night: number; // 0..1, how much starlight
};

const hex = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

/** Palette stops keyed by solar altitude (degrees). */
const STOPS: { alt: number; t: SceneTokens }[] = [
  {
    alt: -18, // full night over the river
    t: {
      bg: hex("#0B0F19"), bg2: hex("#151B2A"), fg: hex("#EEF1F7"), muted: hex("#97A0B4"), line: hex("#FFFFFF"),
      accent: hex("#F4A21F"), link: hex("#FFC466"),
      skyTop: hex("#04060D"), skyHorizon: hex("#161D33"), sun: hex("#FFF6E0"), glow: hex("#7C8DB8"),
      shadow: hex("#000000"), shadowAlpha: 0.55, night: 1,
    },
  },
  {
    alt: -6, // civil twilight: violet, the sun just under the horizon
    t: {
      bg: hex("#251F3A"), bg2: hex("#332B4C"), fg: hex("#F8F0E8"), muted: hex("#C4B4B8"), line: hex("#FFFFFF"),
      accent: hex("#FFB347"), link: hex("#FFC98A"),
      skyTop: hex("#1A1A3F"), skyHorizon: hex("#E8744F"), sun: hex("#FFD9A0"), glow: hex("#F2825A"),
      shadow: hex("#1A0A2A"), shadowAlpha: 0.45, night: 0.55,
    },
  },
  {
    alt: 5, // golden hour: kesar light on everything
    t: {
      bg: hex("#F7DFBC"), bg2: hex("#FBEBD2"), fg: hex("#1C130C"), muted: hex("#7B5A42"), line: hex("#3A2410"),
      accent: hex("#E8791C"), link: hex("#A43E0A"),
      skyTop: hex("#5C8FC9"), skyHorizon: hex("#FFC470"), sun: hex("#FFEFC4"), glow: hex("#FFB25A"),
      shadow: hex("#7A3A08"), shadowAlpha: 0.32, night: 0,
    },
  },
  {
    alt: 30, // clear day
    t: {
      bg: hex("#EEF2F6"), bg2: hex("#FFFFFF"), fg: hex("#0F1419"), muted: hex("#5A6472"), line: hex("#0F1419"),
      accent: hex("#F4A21F"), link: hex("#B4530A"),
      skyTop: hex("#2E6BC4"), skyHorizon: hex("#C9DDF3"), sun: hex("#FFFBEE"), glow: hex("#FFE9B0"),
      shadow: hex("#1B2A44"), shadowAlpha: 0.18, night: 0,
    },
  },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRGB = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const smooth = (t: number) => t * t * (3 - 2 * t);

export function sceneFor(altitude: number): SceneTokens {
  const a = Math.max(STOPS[0].alt, Math.min(STOPS[STOPS.length - 1].alt, altitude));
  let i = 0;
  while (i < STOPS.length - 2 && a > STOPS[i + 1].alt) i++;
  const s0 = STOPS[i];
  const s1 = STOPS[i + 1];
  const t = smooth((a - s0.alt) / (s1.alt - s0.alt));
  const out = {} as SceneTokens;
  for (const key of Object.keys(s0.t) as (keyof SceneTokens)[]) {
    const v0 = s0.t[key];
    const v1 = s1.t[key];
    (out as Record<string, unknown>)[key] = typeof v0 === "number" ? lerp(v0, v1 as number, t) : lerpRGB(v0 as RGB, v1 as RGB, t);
  }
  return out;
}

/** Where the sun sits on the hero canvas (0..1, y up) plus the shadow every surface casts. */
export function lighting(pos: SunPosition) {
  const azRad = pos.azimuth * RAD;
  // East rises on the right of the hero, west sets on the left.
  const x = 0.5 + 0.44 * Math.sin(azRad);
  const y = 0.12 + 0.82 * Math.sin(Math.max(-8, Math.min(90, pos.altitude)) * RAD);
  // Shadows lengthen as the sun drops; at night ambient light gives a short, soft shadow.
  const elev = Math.max(4, pos.altitude);
  const len = pos.altitude < -2 ? 6 : 6 + 34 * Math.cos(elev * RAD);
  const shadowX = pos.altitude < -2 ? 0 : -Math.sin(azRad) * len;
  const shadowY = pos.altitude < -2 ? 8 : 4 + len * 0.55;
  const blur = 10 + len * 1.2;
  return { x, y, shadowX, shadowY, blur, len };
}

export const rgb = (c: RGB) => `${Math.round(c[0])} ${Math.round(c[1])} ${Math.round(c[2])}`;
