"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const experiments = [
  {
    kicker: "AI + Travel",
    title: "Voyagea Systems",
    description:
      "Link extraction, AI place recognition, itinerary generation, collaborative trip crews and the V-Passport.",
    tags: ["AI workflows", "Product UX"],
    test: "Can scattered travel inspiration become one useful planning flow?",
    result: "A connected save-to-itinerary system now running inside Voyagea.",
  },
  {
    kicker: "Automation",
    title: "Business Outreach Engine",
    description:
      "Concepts for lead discovery, research, personalization, CRM handling and responsible outreach automation.",
    tags: ["APIs", "Agents", "Email flows"],
    test: "Can research and personalization get faster without turning outreach generic?",
    result: "A modular concept for human-reviewed targeting, enrichment and follow-up.",
  },
  {
    kicker: "Interior Tech",
    title: "Plan-to-Design Concept",
    description:
      "Upload a house plan and generate interior directions, visual concepts and structured outputs for designers and homeowners.",
    tags: ["Computer vision", "Generative design"],
    test: "Can a floor plan become a useful creative brief in minutes?",
    result: "An early workflow joining spatial input, style decisions and structured output.",
  },
  {
    kicker: "PTRI Innovation",
    title: "Company & Product Playground",
    description:
      "A place to explore web products, AI-assisted services and new business systems before they are obvious.",
    tags: ["Product strategy", "Rapid prototypes"],
    test: "How quickly can a rough opportunity become something testable?",
    result: "A repeatable rhythm: build small, test fast, and keep what earns attention.",
  },
];

export function BuildLab() {
  const [open, setOpen] = useState<(typeof experiments)[number] | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="lab-track" aria-label="Build Lab experiments">
        {experiments.map((item, index) => (
          <button
            key={item.title}
            className="lab-card"
            onClick={() => setOpen(item)}
            data-cursor="OPEN"
            aria-haspopup="dialog"
          >
            <span className="micro-label">{String(index + 1).padStart(2, "0")} / {item.kicker}</span>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            <span className="tag-list">
              {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </span>
            <span className="lab-open">Open build log <span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lab-dialog-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => event.target === event.currentTarget && setOpen(null)}
          >
            <motion.div
              className="lab-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lab-dialog-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
            >
              <button className="dialog-close" onClick={() => setOpen(null)} aria-label="Close build log" autoFocus>
                Close ×
              </button>
              <span className="micro-label">Build log / {open.kicker}</span>
              <h3 id="lab-dialog-title">{open.title}</h3>
              <div className="build-log-grid">
                <div><span>Idea</span><p>{open.description}</p></div>
                <div><span>Test</span><p>{open.test}</p></div>
                <div><span>Result</span><p>{open.result}</p></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
