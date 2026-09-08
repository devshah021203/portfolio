"use client";

import { minutesLabel } from "@/lib/sun";
import { useSun } from "@/lib/sunStore";

/** Header chip: the time the page is lit for, and what the sky is doing. */
export default function WindsorClock() {
  const sun = useSun();
  if (!sun.hydrated) return <span className="clock mono" aria-hidden="true">Windsor, ON</span>;
  const alt = sun.position.altitude;
  const state = alt < -8 ? "night" : alt < 0 ? "twilight" : alt < 8 ? "golden hour" : "daylight";
  return (
    <span className="clock mono" title="The site is lit by the real sky over Windsor. Drag the sun to change the time.">
      <span className="clock-dot" aria-hidden="true" />
      Windsor, {minutesLabel(sun.minutes)} · {state}
    </span>
  );
}
