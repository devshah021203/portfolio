"use client";

import Link from "next/link";
import { type MouseEvent, type ReactNode, useRef } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  cursor?: string;
  ariaLabel?: string;
};

export function MagneticLink({
  href,
  children,
  className = "",
  external = false,
  cursor = "OPEN",
  ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(event: MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = ref.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  const props = {
    ref,
    href,
    className: `magnetic-link ${className}`,
    onMouseMove: onMove,
    onMouseLeave: reset,
    "data-cursor": cursor,
    ...(external
      ? {
          target: "_blank",
          rel: "noreferrer",
          "aria-label": `${ariaLabel || (typeof children === "string" ? children : "External link")} (opens in a new tab)`,
        }
      : {}),
  };

  return external ? <a {...props}>{children}</a> : <Link {...props}>{children}</Link>;
}
