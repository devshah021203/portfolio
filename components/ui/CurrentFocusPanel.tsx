const focusItems = [
  {
    number: "01",
    organization: "Keri in Windsor",
    role: "Founder",
    href: "https://keriinwindsor.ca",
  },
  {
    number: "02",
    organization: "PTRI Innovation",
    role: "Business Development Officer",
    href: "https://www.ptriinnovation.com",
  },
  {
    number: "03",
    organization: "Voyagea",
    role: "Founder & Developer",
    href: "https://voyagea.travel",
  },
  {
    number: "04",
    organization: "Selected projects",
    role: "Web · Product · Brand",
    href: "mailto:hello.devshah@gmail.com",
  },
];

export function CurrentFocusPanel() {
  return (
    <section className="focus-panel" aria-labelledby="focus-panel-title">
      <div className="focus-panel-bar">
        <span className="micro-label">DS / Current focus</span>
        <span className="focus-status"><i /> Building now</span>
      </div>
      <div className="focus-panel-body">
        <div className="focus-panel-intro">
          <span className="micro-label">Windsor, Canada / 2026</span>
          <h2 id="focus-panel-title">
            Building products, brands <em>& ventures.</em>
          </h2>
          <p>Working where design, development and real business meet.</p>
        </div>
        <ol className="focus-list" aria-label="Dev Shah's current roles and focus">
          {focusItems.map((item) => (
            <li key={item.number}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                data-cursor={item.href.startsWith("mailto") ? "EMAIL" : "OPEN"}
              >
                <span className="micro-label">{item.number}</span>
                <span>
                  <strong>{item.organization}</strong>
                  <small>{item.role}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="focus-panel-footer micro-label">
        <span>Founder mindset</span>
        <span>Design → Build → Growth</span>
      </div>
    </section>
  );
}
