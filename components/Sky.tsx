"use client";

import { useCallback, useEffect, useRef } from "react";
import { lighting, minutesLabel, sceneFor, sunTimes } from "@/lib/sun";
import { sunStore, useSun } from "@/lib/sunStore";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_sun;
uniform vec3 u_top, u_hor, u_sunc, u_glow;
uniform float u_night, u_time, u_alt;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  // Sky: horizon colour low, zenith colour high, with a slightly warmer band at the horizon.
  float g = pow(clamp(uv.y, 0.0, 1.0), 0.8);
  vec3 col = mix(u_hor, u_top, g);

  // Sun disc and glow. Glow flattens toward the horizon like real haze.
  vec2 d = (uv - u_sun) * vec2(aspect, 1.0);
  float r = length(d);
  float horizonSquash = mix(1.0, 0.45, clamp(1.0 - u_alt / 20.0, 0.0, 1.0));
  float rh = length(d * vec2(horizonSquash, 1.0));
  float dayness = 1.0 - u_night;
  float glow = exp(-rh * 5.0) * 0.7 + exp(-rh * 1.7) * 0.26;
  col += u_glow * glow * dayness;
  float disc = smoothstep(0.052, 0.046, r) * dayness;
  col = mix(col, u_sunc, disc);

  // Moon: a small crisp disc that only exists at night, high in the west.
  vec2 moonPos = vec2(0.18, 0.78);
  vec2 md = (uv - moonPos) * vec2(aspect, 1.0);
  float moon = smoothstep(0.024, 0.021, length(md)) * u_night;
  float moonShade = smoothstep(0.024, 0.020, length(md + vec2(0.009, 0.004)));
  col = mix(col, vec3(0.92, 0.93, 0.97), moon * (1.0 - moonShade * 0.55));
  col += vec3(0.55, 0.6, 0.75) * exp(-length(md) * 22.0) * 0.18 * u_night;

  // Stars: sparse, twinkling, only in the dark.
  vec2 sp = floor(gl_FragCoord.xy / 2.0);
  float s = hash(sp);
  float star = step(0.9975, s) * u_night * smoothstep(0.25, 0.9, uv.y);
  float tw = 0.55 + 0.45 * sin(u_time * 1.3 + s * 80.0);
  col += vec3(star * tw * (0.5 + 0.5 * hash(sp + 7.0)));

  // Film grain keeps the gradient from banding.
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}`;

const norm = (c: [number, number, number]) => [c[0] / 255, c[1] / 255, c[2] / 255] as const;

/**
 * The hero sky. Draws the real sun over Windsor, lets the visitor drag the
 * day back and forth, and hands every light change to the page through
 * the shared sun store.
 */
export default function Sky() {
  const sun = useSun();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ alt: sun.position.altitude, az: sun.position.azimuth });
  const dragging = useRef(false);
  useEffect(() => {
    stateRef.current = { alt: sun.position.altitude, az: sun.position.azimuth };
  }, [sun.position.altitude, sun.position.azimuth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link");
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("u_res"), uSun = u("u_sun"), uTop = u("u_top"), uHor = u("u_hor"), uSunC = u("u_sunc"),
      uGlow = u("u_glow"), uNight = u("u_night"), uTime = u("u_time"), uAlt = u("u_alt");

    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const nw = Math.round(canvas.clientWidth * dpr);
      const nh = Math.round(canvas.clientHeight * dpr);
      if (nw !== w || nh !== h) {
        w = nw; h = nh;
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;
    let alive = true;
    const draw = () => {
      if (!alive) return;
      resize();
      const { alt, az } = stateRef.current;
      const s = sceneFor(alt);
      const l = lighting({ altitude: alt, azimuth: az });
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uSun, l.x, l.y);
      gl.uniform3fv(uTop, norm(s.skyTop));
      gl.uniform3fv(uHor, norm(s.skyHorizon));
      gl.uniform3fv(uSunC, norm(s.sun));
      gl.uniform3fv(uGlow, norm(s.glow));
      gl.uniform1f(uNight, s.night);
      gl.uniform1f(uAlt, alt);
      gl.uniform1f(uTime, reduce ? 0 : (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    loop();
    // rAF stalls in hidden/embedded viewers; a slow heartbeat keeps the sky honest.
    const beat = setInterval(draw, 250);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearInterval(beat);
      ro.disconnect();
    };
  }, []);

  const scrubFromPointer = useCallback((e: PointerEvent | React.PointerEvent) => {
    const el = canvasRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    // Dragging across the sky moves through the day: left is midnight, right is the next midnight.
    sunStore.scrubTo(Math.round(f * 1439));
  }, []);

  // Touch needs a clear horizontal intent before the sky takes the gesture,
  // otherwise every scroll that starts on the hero would change the time.
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    if (e.pointerType === "mouse") {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      scrubFromPointer(e);
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragging.current) { scrubFromPointer(e); return; }
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 14 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      scrubFromPointer(e);
    }
  };
  const onPointerUp = () => { dragging.current = false; start.current = null; };

  const times = sun.hydrated ? sunTimes(sun.date) : { sunrise: null, sunset: null };
  const label = sun.hydrated ? minutesLabel(sun.minutes) : "";
  const next =
    times.sunrise !== null && sun.minutes < times.sunrise
      ? `sunrise ${minutesLabel(times.sunrise)}`
      : times.sunset !== null && sun.minutes < times.sunset
        ? `sunset ${minutesLabel(times.sunset)}`
        : times.sunrise !== null
          ? `sunrise ${minutesLabel(times.sunrise)}`
          : "";

  return (
    <>
      <canvas
        ref={canvasRef}
        className="sky"
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
      <div className="sky-controls">
        <label className="sky-slider">
          <span className="sky-slider-label">
            <span className="mono">Windsor, {label}</span>
            <span className="mono sky-slider-next">{next}</span>
          </span>
          <input
            type="range"
            min={0}
            max={1439}
            step={1}
            value={sun.minutes}
            aria-label="Time of day in Windsor"
            aria-valuetext={label}
            onChange={(e) => sunStore.scrubTo(Number(e.target.value))}
          />
        </label>
        <button
          type="button"
          className={`sky-now mono${sun.scrubbed ? " is-visible" : ""}`}
          onClick={() => sunStore.scrubTo(null)}
          tabIndex={sun.scrubbed ? 0 : -1}
        >
          Back to now
        </button>
      </div>
    </>
  );
}
