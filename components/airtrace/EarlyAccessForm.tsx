"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

const USE_CASES = [
  { value: "home-office", label: "Home office" },
  { value: "bedroom", label: "Bedroom" },
  { value: "living-room", label: "Living room" },
  { value: "studio", label: "Studio / workshop" },
  { value: "lab", label: "Lab / makerspace" },
  { value: "other", label: "Somewhere else" },
];

export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [useCase, setUseCase] = useState("home-office");
  const [wantsTesting, setWantsTesting] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [emailed, setEmailed] = useState(true);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/airtrace/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, useCase, wantsTesting, company }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setEmailed(data.emailed !== false);
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="access-done" role="status">
        <div className="access-done-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3>You&rsquo;re on the list.</h3>
        <p>
          {emailed
            ? <>A confirmation just went out to <strong>{email}</strong>. If it isn&rsquo;t there in a minute, check your spam folder.</>
            : <>Your signup was recorded. Confirmation emails are switched on once the mail provider key is configured.</>}
        </p>
        <button
          type="button"
          className="access-reset"
          onClick={() => { setStatus("idle"); setEmail(""); setName(""); setWantsTesting(false); }}
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <form className="access-form" onSubmit={handleSubmit} noValidate>
      <div className="access-grid">
        <label className="access-field">
          <span>Name <em>optional</em></span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="access-field">
          <span>Email <em>required</em></span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby={status === "error" ? "access-error" : undefined}
          />
        </label>

        <label className="access-field">
          <span>Where would you use Dwello?</span>
          <select value={useCase} onChange={(event) => setUseCase(event.target.value)}>
            {USE_CASES.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Honeypot — hidden from people, catnip for bots. */}
      <div className="access-hp" aria-hidden="true">
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>
      </div>

      <label className="access-check">
        <input
          type="checkbox"
          checked={wantsTesting}
          onChange={(event) => setWantsTesting(event.target.checked)}
        />
        <span>
          Yes, I want to help test the prototype and send feedback.
          <em>You can opt out any time.</em>
        </span>
      </label>

      {status === "error" && (
        <p className="access-error" id="access-error" role="alert">{message}</p>
      )}

      <button type="submit" className="access-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Join early access"}
        <span aria-hidden="true">{status === "sending" ? "" : "→"}</span>
      </button>

      <p className="access-note">
        We respect your privacy. No spam, and you can unsubscribe from any email.
      </p>
    </form>
  );
}
