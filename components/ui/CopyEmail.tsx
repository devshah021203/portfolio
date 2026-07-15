"use client";

import { useState } from "react";

const email = "hello.devshah@gmail.com";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className="copy-email" onClick={copyAddress} data-cursor="COPY">
      <span>{copied ? "Address copied" : "Copy address"}</span>
      <span aria-hidden="true">{copied ? "✓" : "↗"}</span>
    </button>
  );
}
