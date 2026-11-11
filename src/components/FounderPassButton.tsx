"use client";

import { useState } from "react";
import { CreditCard, X } from "lucide-react";

interface FounderPassButtonProps {
  paymentLink?: string;
}

export function FounderPassButton({ paymentLink }: FounderPassButtonProps) {
  const [showSetupNote, setShowSetupNote] = useState(false);

  if (paymentLink) {
    return (
      <a
        href={paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#111C18] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1E2F29]"
      >
        <CreditCard className="h-4 w-4" />
        Reserve Founder Pass ($49)
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowSetupNote(true)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#111C18] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1E2F29]"
      >
        <CreditCard className="h-4 w-4" />
        Reserve Founder Pass ($49)
      </button>

      {showSetupNote && (
        <div className="mt-3 rounded-lg border border-[#D4DDD8] bg-[#FAFBF9] p-3.5 text-left text-xs text-[#3C4D46]">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-[#111C18]">
              Ready for your Stripe Payment Link
            </p>
            <button
              type="button"
              onClick={() => setShowSetupNote(false)}
              aria-label="Dismiss Stripe setup note"
              className="text-[#64756F] hover:text-[#111C18]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 leading-relaxed">
            Create a free Test Payment Link in your Stripe Dashboard and paste the URL into{" "}
            <code className="rounded bg-[#E6ECE9] px-1 py-0.5 font-mono text-[11px]">
              NEXT_PUBLIC_STRIPE_PAYMENT_LINK
            </code>{" "}
            inside <code className="font-mono text-[11px]">.env.local</code> to send visitors straight to Stripe Checkout.
          </p>
        </div>
      )}
    </div>
  );
}
