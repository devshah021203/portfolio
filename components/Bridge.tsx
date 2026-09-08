/**
 * A stylised Ambassador Bridge, the Windsor–Detroit crossing, drawn as the
 * horizon of the hero. Two towers, the suspended deck, hangers, and the
 * approach spans. Filled with the scene's silhouette colour so it reads as a
 * dark skyline by day and a darker one by night.
 */
export default function Bridge() {
  const hangers: string[] = [];
  // Main span cable: parabola between towers at x=330 and x=930, sag to y=118 at mid.
  for (let x = 345; x < 930; x += 15) {
    const t = (x - 330) / 600;
    const y = 30 + (118 - 30) * (1 - Math.pow(2 * t - 1, 2));
    hangers.push(`M${x} ${y.toFixed(1)}V128`);
  }
  // Side spans: cables from tower tops down to anchorages.
  for (let x = 90; x < 330; x += 15) {
    const t = (x - 60) / 270;
    const y = 128 - (128 - 30) * t * t;
    hangers.push(`M${x} ${y.toFixed(1)}V128`);
  }
  for (let x = 945; x < 1200; x += 15) {
    const t = (1200 - x) / 270;
    const y = 128 - (128 - 30) * t * t;
    hangers.push(`M${x} ${y.toFixed(1)}V128`);
  }
  // Lamps along the main cable and the deck: only lit at night.
  const lamps: string[] = [];
  for (let x = 345; x <= 915; x += 30) {
    const t = (x - 330) / 600;
    const y = 30 + (118 - 30) * (1 - Math.pow(2 * t - 1, 2));
    lamps.push(`<circle cx="${x}" cy="${(y - 3).toFixed(1)}" r="1.6"/>`);
  }
  for (let x = 30; x <= 1230; x += 60) lamps.push(`<circle cx="${x}" cy="124" r="1.8"/>`);
  return (
    <svg className="bridge" viewBox="0 0 1260 160" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="none" stroke="rgb(var(--silhouette))" strokeWidth="1.1">
        <path d={hangers.join("")} opacity="0.7" />
        <path d="M60 128 Q 200 40 330 30 Q 630 220 930 30 Q 1060 40 1200 128" strokeWidth="3" />
        <path d="M60 128 Q 200 44 330 34 Q 630 224 930 34 Q 1060 44 1200 128" strokeWidth="1.2" opacity="0.7" />
      </g>
      <g fill="rgb(var(--silhouette))">
        <rect x="0" y="128" width="1260" height="32" />
        <path d="M316 20h8v108h-8zM336 20h8v108h-8zM316 20h28v5h-28zM316 60h28v5h-28zM316 100h28v5h-28z" />
        <path d="M916 20h8v108h-8zM936 20h8v108h-8zM916 20h28v5h-28zM916 60h28v5h-28zM916 100h28v5h-28z" />
        <path d="M318 8h4v12h-4zM938 8h4v12h-4z" />
        <path d="M0 140 L 60 140 L 60 128 L 0 128 Z M1200 128h60v12h-60z" />
        <path d="M120 128h6v6h-6zM240 128h6v6h-6zM1020 128h6v6h-6zM1140 128h6v6h-6z" opacity="0.6" />
      </g>
      <g className="bridge-lamps" fill="rgb(var(--accent))" dangerouslySetInnerHTML={{ __html: lamps.join("") }} />
    </svg>
  );
}
