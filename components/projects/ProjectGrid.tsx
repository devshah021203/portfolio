"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectGrid() {
  return (
    <div className="project-grid" aria-label="Selected projects">
      {projects.map((project, index) => (
        <motion.article
          key={project.slug}
          className={`project-card ${index === 0 ? "is-featured" : ""}`}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.2) }}
          whileHover={{ y: -6 }}
        >
          <div className="project-card-inner">
            <Link
              href={`/work/${project.slug}`}
              className="project-card-summary"
              aria-label={`View ${project.name} case study`}
              data-cursor="VIEW"
            >
            <div className="project-card-head">
              <span className="micro-label">
                {project.number} / {project.eyebrow}
              </span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            </Link>
            <ProjectVisual project={project} compact={index !== 0} />
            <Link
              href={`/work/${project.slug}`}
              className="project-card-link"
              aria-label={`View ${project.name} case study`}
              data-cursor="VIEW"
            >
              View case <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
