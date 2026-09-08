"use client";

import { useSyncExternalStore } from "react";
import { atWindsorMinutes, sunPosition, windsorMinutes, type SunPosition } from "./sun";

/**
 * One shared clock for the whole page. Components subscribe to the current
 * instant (real time, or the time the visitor scrubbed to) and the sun
 * position derived from it. The intro sunrise animates `altitudeOffset`
 * from below the horizon up to the true position.
 */

type State = {
  now: Date;
  scrub: number | null; // minutes after Windsor midnight, or null for live time
  introAltitude: number | null; // altitude override while the intro plays
};

let state: State = { now: new Date(), scrub: null, introAltitude: null };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export const sunStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    if (listeners.size === 1) startClock();
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) stopClock();
    };
  },
  getSnapshot: () => state,
  scrubTo(minutes: number | null) {
    state = { ...state, scrub: minutes };
    emit();
  },
  setIntroAltitude(alt: number | null) {
    state = { ...state, introAltitude: alt };
    emit();
  },
};

let timer: ReturnType<typeof setInterval> | null = null;
function startClock() {
  timer = setInterval(() => {
    state = { ...state, now: new Date() };
    emit();
  }, 30_000);
}
function stopClock() {
  if (timer) clearInterval(timer);
  timer = null;
}

const SERVER_SNAPSHOT: State = { now: new Date(0), scrub: null, introAltitude: null };

export type SunView = {
  date: Date;
  minutes: number;
  scrubbed: boolean;
  position: SunPosition;
  hydrated: boolean;
};

export function useSun(): SunView {
  const s = useSyncExternalStore(sunStore.subscribe, sunStore.getSnapshot, () => SERVER_SNAPSHOT);
  const hydrated = s.now.getTime() !== 0;
  const date = s.scrub === null ? s.now : atWindsorMinutes(s.now, s.scrub);
  const real = sunPosition(date);
  const position = s.introAltitude === null ? real : { ...real, altitude: s.introAltitude };
  return {
    date,
    minutes: hydrated ? windsorMinutes(date) : 0,
    scrubbed: s.scrub !== null,
    position,
    hydrated,
  };
}
