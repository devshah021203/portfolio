"use client";

import { useState } from "react";

export const EMAIL = "hello.devshah@gmail.com";

export default function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <button type="button" className={`copy mono ${className}`} onClick={copy} aria-live="polite">
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
