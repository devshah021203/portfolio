"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "games", label: "Games" },
  { id: "process", label: "Process" },
  { id: "insights", label: "Insights" },
];

export function StickyNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", ...navItems.map((item) => item.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-nav">
      <Link href="/#home" className="nav-brand" aria-label="Dev Shah, home">
        <span className="brand-mark">DS</span>
        <span className="brand-signature" aria-hidden="true">DS</span>
      </Link>
      <nav aria-label="Primary navigation" className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={`/#${item.id}`}
            className={active === item.id ? "is-active" : ""}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/#contact"
        className={`nav-cta ${active === "contact" ? "is-active" : ""}`}
        data-cursor="TALK"
      >
        Start a project <span aria-hidden="true">↘</span>
      </Link>
    </header>
  );
}
