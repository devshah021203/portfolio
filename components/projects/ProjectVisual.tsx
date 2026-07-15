"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

export function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="project-visual-link"
      aria-label={`Open the live ${project.name} website`}
      data-cursor="OPEN"
    >
      <motion.div
        className={`project-browser project-browser--${project.slug} ${compact ? "is-compact" : ""}`}
        style={
          {
            "--project-accent": project.accent,
            "--project-surface": project.surface,
          } as CSSProperties
        }
        layoutId={`project-frame-${project.slug}`}
      >
        <div className="browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <small>{project.urlLabel} / home</small>
        </div>
        <div className="browser-canvas browser-canvas--screenshot">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority={project.slug === "voyagea"}
            sizes={compact ? "(max-width: 899px) 84vw, 34vw" : "(max-width: 899px) 84vw, 55vw"}
            className="project-screenshot"
          />
          <span className="live-preview-pill">
            Live site <span aria-hidden="true">↗</span>
          </span>
        </div>
      </motion.div>
    </a>
  );
}
