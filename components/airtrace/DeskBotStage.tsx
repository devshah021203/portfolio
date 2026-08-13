"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DeskBotScene } from "./DeskBotScene";
import {
  EXPRESSION_COPY,
  EXPRESSION_ORDER,
  type ExpressionName,
} from "./deskbotFace";

/**
 * Hero stage: the 3D bot, the thing it's currently saying, and the expression
 * rail. The bot greets on arrival and reacts when it gets clicked.
 */
export function DeskBotStage() {
  const [expression, setExpression] = useState<ExpressionName>("happy");
  const [line, setLine] = useState<string>("");
  const [typed, setTyped] = useState<string>("");
  const timers = useRef<number[]>([]);

  const say = useCallback((next: string) => setLine(next), []);

  // Typewriter, so the bubble feels like speech rather than a caption swap.
  // Every write happens inside the timer callback rather than the effect body:
  // reduced motion just takes the whole line on the first tick.
  useEffect(() => {
    if (!line) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduced ? line.length : 1;
    let index = 0;
    const id = window.setInterval(() => {
      index = Math.min(line.length, index + step);
      setTyped(line.slice(0, index));
      if (index >= line.length) window.clearInterval(id);
    }, reduced ? 0 : 26);
    return () => window.clearInterval(id);
  }, [line]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const pick = useCallback((name: ExpressionName) => {
    setExpression(name);
    setLine(EXPRESSION_COPY[name].line);
  }, []);

  const handlePoke = useCallback((next: ExpressionName) => {
    setExpression(next);
    // Settle back to happy after the reaction plays out.
    const id = window.setTimeout(() => setExpression("happy"), 2600);
    timers.current.push(id);
  }, []);

  return (
    <div className="bot-stage">
      <div className="bot-stage-glow" aria-hidden="true" />
      <div className="bot-stage-rings" aria-hidden="true">
        <span /><span /><span />
      </div>

      <DeskBotScene
        className="bot-canvas"
        expression={expression}
        onPoke={handlePoke}
        onSay={say}
      />

      <div className="bot-bubble" role="status" aria-live="polite">
        <span className="bot-bubble-dot" aria-hidden="true" />
        <p>{typed || " "}</p>
      </div>

      <div className="bot-hint micro-label" aria-hidden="true">
        Click Dwello &middot; it reacts
      </div>

      <div className="bot-expressions">
        <p className="micro-label bot-expressions-label">Expressions</p>
        <div className="bot-expression-row" role="group" aria-label="Dwello expressions">
          {EXPRESSION_ORDER.map((name) => (
            <button
              key={name}
              type="button"
              className={`bot-chip ${expression === name ? "is-active" : ""}`}
              aria-pressed={expression === name}
              onClick={() => pick(name)}
            >
              {EXPRESSION_COPY[name].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
