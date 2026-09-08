"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

/** Early-access signup for Dwello. Posts to /api/dwello/early-access. */
export default function DwelloForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/dwello/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          useCase: data.get("useCase"),
          wantsTesting: data.get("wantsTesting") === "on",
          company: data.get("company"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (status === "done") {
    return (
      <p className="form-done" role="status">
        You are on the list. A welcome note is on its way to your inbox.
      </p>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" maxLength={80} required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span>Where would Dwello live?</span>
        <select name="useCase" defaultValue="home-office">
          <option value="home-office">Home office</option>
          <option value="bedroom">Bedroom</option>
          <option value="living-room">Living room</option>
          <option value="studio">Studio</option>
          <option value="lab">Lab or workshop</option>
          <option value="other">Somewhere else</option>
        </select>
      </label>
      <label className="form-check">
        <input name="wantsTesting" type="checkbox" />
        <span>I would help test an early unit</span>
      </label>
      <input name="company" type="text" tabIndex={-1} autoComplete="off" className="form-hp" aria-hidden="true" />
      <div className="form-actions">
        <button type="submit" className="btn btn-fill" disabled={status === "sending"}>
          {status === "sending" ? "Joining…" : "Join early access"}
        </button>
        {status === "error" && <p className="form-error" role="alert">{message}</p>}
      </div>
    </form>
  );
}
