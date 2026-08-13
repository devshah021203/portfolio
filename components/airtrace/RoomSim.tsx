"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Live radar simulation.
 *
 * A top-down room the visitor can actually drive: drag the target around and
 * presence, zone, entry/exit and multi-person detection all fire the way the
 * real sensor would report them. It walks itself until someone takes over.
 */

type Zone = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

// Room is authored in a 100 x 70 viewBox.
const ZONES: Zone[] = [
  { id: "door", label: "Door", x: 3, y: 27, w: 13, h: 16 },
  { id: "desk", label: "Desk", x: 66, y: 7, w: 28, h: 22 },
  { id: "tv", label: "TV area", x: 38, y: 6, w: 22, h: 13 },
  { id: "bed", label: "Bed", x: 7, y: 47, w: 27, h: 16 },
  { id: "couch", label: "Couch", x: 43, y: 48, w: 27, h: 15 },
];

const BOT = { x: 80, y: 15 };

const WALK_PATH: [number, number][] = [
  [9, 35], [26, 36], [44, 33], [62, 26], [78, 24],
  [80, 34], [66, 45], [56, 55], [40, 55], [24, 54],
  [18, 45], [12, 37], [9, 35],
];

const SECOND_PATH: [number, number][] = [
  [50, 12], [58, 22], [70, 34], [60, 50], [46, 56],
  [34, 50], [30, 34], [40, 20], [50, 12],
];

type LogEntry = { id: number; time: string; text: string; kind: "entry" | "zone" | "exit" | "info" };

function zoneAt(x: number, y: number): Zone | null {
  return ZONES.find((z) => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h) ?? null;
}

function clockLabel(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function formatDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

/** Walks a looping waypoint path at a steady speed. */
function walkPath(path: [number, number][], t: number, speed: number) {
  const segments = path.length - 1;
  const progress = ((t * speed) % segments + segments) % segments;
  const index = Math.floor(progress);
  const frac = progress - index;
  const [ax, ay] = path[index];
  const [bx, by] = path[(index + 1) % path.length];
  return { x: ax + (bx - ax) * frac, y: ay + (by - ay) * frac };
}

export function RoomSim() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [person, setPerson] = useState({ x: 9, y: 35 });
  const [second, setSecond] = useState({ x: 50, y: 12 });
  const [multi, setMulti] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [manual, setManual] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  // Clock values must not be read during render: the server and the client
  // stamp different seconds and React rejects the hydration.
  const [presenceStart, setPresenceStart] = useState<number | null>(null);
  const [lastEntry, setLastEntry] = useState<string>("—");
  const [elapsed, setElapsed] = useState(0);

  const logId = useRef(0);
  const lastZone = useRef<string | null>("door");
  const wasInside = useRef(true);
  const draggingRef = useRef(false);
  const manualRef = useRef(false);

  const push = useCallback((text: string, kind: LogEntry["kind"]) => {
    logId.current += 1;
    const entry: LogEntry = { id: logId.current, time: clockLabel(new Date()), text, kind };
    setLog((current) => [entry, ...current].slice(0, 7));
  }, []);

  const currentZone = useMemo(() => zoneAt(person.x, person.y), [person]);
  const inside = person.x > 14;

  // Single entry point for moving the target. Radar events are derived here
  // rather than in an effect on `person`, so both the auto-walk and the drag
  // handlers produce identical events without a cascading re-render.
  const moveTo = useCallback((next: { x: number; y: number }) => {
    setPerson(next);

    const zone = zoneAt(next.x, next.y);
    const zoneId = zone?.id ?? null;
    const isInside = next.x > 14;

    if (isInside !== wasInside.current) {
      wasInside.current = isInside;
      if (isInside) {
        push("Entry detected — target crossed the door zone", "entry");
        setPresenceStart(Date.now());
        setLastEntry(clockLabel(new Date()));
      } else {
        push("Exit detected — room clear", "exit");
        setPresenceStart(null);
      }
    }

    if (zoneId !== lastZone.current) {
      lastZone.current = zoneId;
      if (zoneId && zone) push(`Zone changed — ${zone.label}`, "zone");
    }
  }, [push]);

  const toggleMulti = useCallback(() => {
    setMulti((current) => {
      const next = !current;
      push(
        next ? "Second target acquired — 2 people in room" : "Second target lost — 1 person in room",
        "info",
      );
      return next;
    });
  }, [push]);

  // ------------------------------------------------------------ auto walking
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    // Seeded on the first frame, not in the effect body: reading the clock
    // during render or mount would not match the server-rendered HTML.
    let seeded = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!seeded) {
        seeded = true;
        setPresenceStart(Date.now());
        setLastEntry(clockLabel(new Date()));
      }
      if (reduced) return;
      const t = (now - start) / 1000;
      if (!draggingRef.current && !manualRef.current) {
        moveTo(walkPath(WALK_PATH, t, 0.22));
      }
      setSecond(walkPath(SECOND_PATH, t, 0.17));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [moveTo]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsed(presenceStart ? Date.now() - presenceStart : 0);
    }, 1000);
    return () => window.clearInterval(id);
  }, [presenceStart]);

  // -------------------------------------------------------------- dragging
  const positionFromEvent = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 70;
    return { x: Math.max(3, Math.min(97, x)), y: Math.max(3, Math.min(67, y)) };
  }, []);

  const startDrag = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    (event.target as Element).setPointerCapture?.(event.pointerId);
    draggingRef.current = true;
    manualRef.current = true;
    setDragging(true);
    setManual(true);
    const next = positionFromEvent(event.clientX, event.clientY);
    if (next) moveTo(next);
  }, [positionFromEvent, moveTo]);

  const moveDrag = useCallback((event: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const next = positionFromEvent(event.clientX, event.clientY);
    if (next) moveTo(next);
  }, [positionFromEvent, moveTo]);

  const endDrag = useCallback(() => {
    draggingRef.current = false;
    setDragging(false);
  }, []);

  const resume = useCallback(() => {
    manualRef.current = false;
    setManual(false);
  }, []);

  // Keyboard access: arrow keys nudge the target.
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 6 : 2.5;
    const deltas: Record<string, [number, number]> = {
      ArrowUp: [0, -step], ArrowDown: [0, step],
      ArrowLeft: [-step, 0], ArrowRight: [step, 0],
    };
    const delta = deltas[event.key];
    if (!delta) return;
    event.preventDefault();
    manualRef.current = true;
    setManual(true);
    moveTo({
      x: Math.max(3, Math.min(97, person.x + delta[0])),
      y: Math.max(3, Math.min(67, person.y + delta[1])),
    });
  }, [moveTo, person]);

  const distance = Math.hypot(person.x - BOT.x, person.y - BOT.y);

  return (
    <div className="roomsim">
      <div className="roomsim-map-wrap">
        <svg
          ref={svgRef}
          className={`roomsim-map ${dragging ? "is-dragging" : ""}`}
          viewBox="0 0 100 70"
          role="application"
          aria-label="Interactive radar room map. Drag the target, or use arrow keys, to move a person around the room."
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <defs>
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3ee9ff" stopOpacity="0.30" />
              <stop offset="60%" stopColor="#3ee9ff" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#3ee9ff" stopOpacity="0" />
            </radialGradient>
            <pattern id="roomGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M5 0H0V5" fill="none" stroke="rgba(120,190,225,0.10)" strokeWidth="0.25" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="100" height="70" fill="url(#roomGrid)" />
          <rect
            x="3" y="3" width="94" height="64" rx="2"
            fill="none" stroke="rgba(140,200,235,0.28)" strokeWidth="0.5"
          />

          {/* Radar field from the bot */}
          <circle cx={BOT.x} cy={BOT.y} r="62" fill="url(#radarSweep)" />
          <g className="roomsim-pings">
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                cx={BOT.x} cy={BOT.y} r="10"
                fill="none" stroke="#3ee9ff" strokeWidth="0.4"
                style={{ animationDelay: `${i * 1.1}s` }}
              />
            ))}
          </g>

          {/* Zones */}
          {ZONES.map((zone) => {
            const active = currentZone?.id === zone.id;
            return (
              <g key={zone.id} className={`roomsim-zone ${active ? "is-active" : ""}`}>
                <rect
                  x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx="1.4"
                  fill={active ? "rgba(62,233,255,0.16)" : "rgba(125,180,215,0.05)"}
                  stroke={active ? "#3ee9ff" : "rgba(140,200,235,0.30)"}
                  strokeWidth={active ? "0.6" : "0.35"}
                  strokeDasharray={active ? "none" : "1.6 1.4"}
                />
                <text
                  x={zone.x + zone.w / 2} y={zone.y + zone.h / 2 + 1.2}
                  textAnchor="middle" className="roomsim-zone-label"
                  fill={active ? "#c9f7ff" : "rgba(180,215,235,0.6)"}
                >
                  {zone.label}
                </text>
              </g>
            );
          })}

          {/* Line of sight */}
          <line
            x1={BOT.x} y1={BOT.y} x2={person.x} y2={person.y}
            stroke="rgba(62,233,255,0.42)" strokeWidth="0.3" strokeDasharray="1.2 1"
          />

          {/* The bot */}
          <g>
            <circle cx={BOT.x} cy={BOT.y} r="3.1" fill="#0d1117" stroke="#3ee9ff" strokeWidth="0.5" />
            <circle cx={BOT.x - 1} cy={BOT.y - 0.3} r="0.55" fill="#3ee9ff" />
            <circle cx={BOT.x + 1} cy={BOT.y - 0.3} r="0.55" fill="#3ee9ff" />
            {/* Above the bot: below would collide with the Desk zone label. */}
            <text x={BOT.x} y={BOT.y - 4.6} textAnchor="middle" className="roomsim-bot-label" fill="rgba(180,215,235,0.8)">
              Dwello
            </text>
          </g>

          {/* Second target */}
          {multi && (
            <g className="roomsim-target is-second">
              <circle cx={second.x} cy={second.y} r="4.4" fill="rgba(167,139,250,0.14)" />
              <circle cx={second.x} cy={second.y} r="1.9" fill="#a78bfa" />
            </g>
          )}

          {/* Primary target */}
          <g
            className="roomsim-target"
            tabIndex={0}
            role="slider"
            aria-label="Person position in room"
            aria-valuetext={`${currentZone ? currentZone.label : "open floor"}, ${distance.toFixed(0)} units from Dwello`}
            onKeyDown={onKeyDown}
          >
            <circle cx={person.x} cy={person.y} r="5.4" fill="rgba(62,233,255,0.13)" />
            <circle cx={person.x} cy={person.y} r="2.1" fill="#3ee9ff" />
            <circle cx={person.x} cy={person.y} r="2.1" fill="none" stroke="#eafcff" strokeWidth="0.35" />
          </g>
        </svg>

        <div className="roomsim-controls">
          <button
            type="button"
            className={`roomsim-toggle ${multi ? "is-on" : ""}`}
            aria-pressed={multi}
            onClick={toggleMulti}
          >
            {multi ? "2 targets" : "1 target"}
          </button>
          {manual && (
            <button type="button" className="roomsim-toggle" onClick={resume}>
              Resume auto-walk
            </button>
          )}
          <span className="roomsim-tip micro-label">Drag the dot &middot; arrow keys work too</span>
        </div>
      </div>

      <div className="roomsim-side">
        <div className="roomsim-readout">
          <p className="micro-label roomsim-readout-title">Live room state</p>
          <dl>
            <div><dt>Room status</dt><dd className={inside ? "is-live" : ""}>{inside ? "Occupied" : "Empty"}</dd></div>
            <div><dt>People detected</dt><dd>{inside ? (multi ? 2 : 1) : (multi ? 1 : 0)}</dd></div>
            <div><dt>Current zone</dt><dd>{currentZone?.label ?? (inside ? "Open floor" : "—")}</dd></div>
            <div><dt>Dwello</dt><dd className="is-live">Online</dd></div>
            <div><dt>Last entry</dt><dd>{lastEntry}</dd></div>
            <div><dt>Presence duration</dt><dd>{presenceStart ? formatDuration(elapsed) : "—"}</dd></div>
          </dl>
        </div>

        <div className="roomsim-log">
          <p className="micro-label roomsim-readout-title">Event stream</p>
          <ul>
            {log.length === 0 && <li className="roomsim-log-empty">Waiting for radar events…</li>}
            {log.map((entry) => (
              <li key={entry.id} className={`roomsim-log-${entry.kind}`}>
                <span className="roomsim-log-time">{entry.time}</span>
                <span>{entry.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
