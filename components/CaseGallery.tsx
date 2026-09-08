"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { DesignPiece } from "@/data/designs";

/** Application mockups for one brand, with a lightbox. */
export default function CaseGallery({ brandKey, brandName, pieces }: { brandKey: string; brandName: string; pieces: DesignPiece[] }) {
  const [open, setOpen] = useState<DesignPiece | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = (dir: 1 | -1) => {
    if (!open) return;
    const i = pieces.findIndex((p) => p.slug === open.slug);
    setOpen(pieces[(i + dir + pieces.length) % pieces.length]);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pieces]);

  return (
    <>
      <ul className="app-grid">
        {pieces.map((p, i) => (
          <li key={p.slug} className="app-card" data-wide={p.width > p.height ? "true" : undefined} data-reveal data-delay={String(i % 2)}>
            <button type="button" className="app-open" onClick={() => setOpen(p)} aria-label={`Open ${p.title}`}>
              <span className="app-media lit" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                <Image src={`/designs/${brandKey}/${p.slug}-thumb.webp`} alt={`${brandName}: ${p.title}`} width={720} height={Math.round((720 * p.height) / p.width)} sizes="(max-width: 860px) 100vw, 50vw" />
              </span>
              <span className="app-meta">
                <span className="app-title display">{p.title}</span>
                <span className="app-note">{p.note}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="lightbox" onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dialog.current) setOpen(null); }}>
        {open && (
          <div className="lightbox-inner">
            <div className="lightbox-media">
              <Image src={`/designs/${brandKey}/${open.slug}.webp`} alt={`${brandName}: ${open.title}`} width={open.width} height={open.height} sizes="90vw" />
            </div>
            <div className="lightbox-side">
              <p className="mono muted">{brandName}</p>
              <h2 className="display">{open.title}</h2>
              <p>{open.note}</p>
              <div className="lightbox-nav">
                <button type="button" className="btn" onClick={() => step(-1)}>Previous</button>
                <button type="button" className="btn" onClick={() => step(1)}>Next</button>
                <button type="button" className="btn btn-fill" onClick={() => setOpen(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
