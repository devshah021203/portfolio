"use client";

import { useEffect, useRef } from "react";
import { lighting, rgb, sceneFor } from "@/lib/sun";
import { sunStore, useSun } from "@/lib/sunStore";

/**
 * Writes the sun-derived design tokens onto <html> so plain CSS can use them.
 * Mounted once in the root layout; renders nothing.
 *
 * On first load the page wakes up in pre-dawn and the sun rises to its true
 * position over ~1.8s, which is also how the palette settles without a flash
 * of the wrong scene. Reduced-motion visitors skip straight to now.
 */
export default function Lighting() {
  const sun = useSun();
  const introDone = useRef(false);

  useEffect(() => {
    if (introDone.current) return;
    introDone.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = sun.position.altitude;
    if (reduce || target < -12) {
      sunStore.setIntroAltitude(null);
      document.documentElement.dataset.lit = "true";
      return;
    }
    const start = performance.now();
    const from = -20;
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      sunStore.setIntroAltitude(from + (target - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sunStore.setIntroAltitude(null);
        document.documentElement.dataset.lit = "true";
      }
    };
    raf = requestAnimationFrame(tick);
    // The Browser pane can stall rAF; a heartbeat keeps the sunrise moving.
    const beat = setInterval(() => tick(performance.now()), 120);
    setTimeout(() => clearInterval(beat), dur + 200);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const s = sceneFor(sun.position.altitude);
    const l = lighting(sun.position);
    const root = document.documentElement.style;
    const set = (k: string, v: string) => root.setProperty(k, v);
    set("--bg", rgb(s.bg));
    set("--bg2", rgb(s.bg2));
    set("--fg", rgb(s.fg));
    set("--muted", rgb(s.muted));
    set("--line", rgb(s.line));
    set("--accent", rgb(s.accent));
    set("--link", rgb(s.link));
    set("--glow", rgb(s.glow));
    set("--shadow-rgb", rgb(s.shadow));
    set("--shadow-a", s.shadowAlpha.toFixed(3));
    set("--shadow-x", `${l.shadowX.toFixed(1)}px`);
    set("--shadow-y", `${l.shadowY.toFixed(1)}px`);
    set("--shadow-blur", `${l.blur.toFixed(1)}px`);
    set("--sun-x", `${(l.x * 100).toFixed(2)}%`);
    set("--sun-y", `${((1 - l.y) * 100).toFixed(2)}%`);
    set("--night", s.night.toFixed(3));
    // Silhouettes stay dark at night rather than flipping with the text colour.
    const sil = s.fg.map((c, i) => c + ([9, 13, 22][i] - c) * s.night) as [number, number, number];
    set("--silhouette", rgb(sil));
    document.documentElement.dataset.scene =
      sun.position.altitude < -8 ? "night" : sun.position.altitude < 8 ? "golden" : "day";
  }, [sun.position.altitude, sun.position.azimuth]);

  return null;
}
