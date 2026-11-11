"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, businessName }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please check your email.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "You are on the early access list.");
      if (!data.alreadyJoined) {
        setEmail("");
        setBusinessName("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[#0F6B4B]/25 bg-[#EAF4EF] p-4 text-left">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F6B4B]" />
          <div>
            <p className="text-sm font-semibold text-[#111C18]">{message}</p>
            <p className="mt-1 text-xs text-[#43554E]">
              We send batch invites every Monday. Watch your inbox for your Clearline setup link.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2.5 text-xs font-medium text-[#0F6B4B] underline underline-offset-2 hover:text-[#0A4F37]"
            >
              Add another team email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          aria-label="Work email address"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 flex-1 rounded-lg border border-[#CFD8D3] bg-white px-4 text-sm text-[#111C18] placeholder:text-[#74847E] focus:border-[#0F6B4B] focus:outline-none focus:ring-2 focus:ring-[#0F6B4B]/20"
        />
        <input
          type="text"
          aria-label="Business name (optional)"
          placeholder="Business name (optional)"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="h-12 rounded-lg border border-[#CFD8D3] bg-white px-4 text-sm text-[#111C18] placeholder:text-[#74847E] focus:border-[#0F6B4B] focus:outline-none focus:ring-2 focus:ring-[#0F6B4B]/20 sm:w-44"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-[#0F6B4B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0A4F37] focus:outline-none focus:ring-2 focus:ring-[#0F6B4B]/40 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining
            </>
          ) : (
            "Join waitlist"
          )}
        </button>
      </div>

      {status === "error" && (
        <p className="mt-2 text-xs font-medium text-[#B42318]" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
