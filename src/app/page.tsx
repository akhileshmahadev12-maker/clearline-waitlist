import { BarChart3, ShieldCheck, BellRing, Check } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SalesPreview } from "@/components/SalesPreview";
import { FounderPassButton } from "@/components/FounderPassButton";

export default function Home() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "";

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <header className="border-b border-[#E5EAE7] bg-[#FAF9F6]/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F6B4B] text-white">
              <BarChart3 className="h-4 w-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-[#111C18]">
              Clearline
            </span>
          </a>

          <nav className="flex items-center gap-6 text-sm font-medium text-[#465750]">
            <a href="#preview" className="hidden hover:text-[#111C18] sm:inline-block">
              Live preview
            </a>
            <a href="#how-it-works" className="hidden hover:text-[#111C18] sm:inline-block">
              How it works
            </a>
            <a
              href="#founder-pass"
              className="rounded-lg border border-[#CFD8D3] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111C18] transition-colors hover:border-[#0F6B4B]"
            >
              Founder Pass
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 sm:pt-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#D4DDD8] bg-white px-3 py-1 text-xs font-medium text-[#3D4E47]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0F6B4B]" />
              Early access open for small businesses &amp; solo founders
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#111C18] sm:text-5xl sm:leading-[1.12]">
              Know why your sales moved today, without opening a spreadsheet.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#465750] sm:text-lg">
              Clearline connects to Stripe, Shopify, and your checkout tools to track real net
              revenue after refunds and fees—then tells you in plain English what drove growth
              and where margin is leaking.
            </p>

            <div className="mt-8">
              <WaitlistForm />
              <p className="mt-3 text-xs text-[#64756F]">
                Free during beta. No credit card required to join the waitlist.
              </p>
            </div>
          </div>

          {/* Signature Interactive Dashboard Preview */}
          <div id="preview" className="mt-12 sm:mt-14">
            <SalesPreview />
          </div>
        </section>

        {/* Value Breakdown Section (Editorial Hairline Grid) */}
        <section
          id="how-it-works"
          className="border-y border-[#E5EAE7] bg-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-[#111C18] sm:text-3xl">
                Built for business owners who want answers, not another messy chart.
              </h2>
              <p className="mt-3 text-base text-[#465750]">
                Most dashboards dump 40 graphs on your screen and leave you guessing. Clearline
                watches your numbers automatically and highlights only what needs your attention.
              </p>
            </div>

            <div className="mt-12 grid gap-8 border-t border-[#E5EAE7] pt-10 md:grid-cols-3">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#0F6B4B]">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#111C18]">
                  True net profit tracking
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4E5F58]">
                  Gross revenue lies. Clearline automatically subtracts processor fees, refunds,
                  and discount codes so you see what you actually keep.
                </p>
              </div>

              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#0F6B4B]">
                  <BellRing className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#111C18]">
                  Daily plain-English briefings
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4E5F58]">
                  Get a morning summary explaining which product drove orders, when repeat buyers
                  shop, and which ad or promo actually paid off.
                </p>
              </div>

              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#0F6B4B]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#111C18]">
                  Early leak &amp; churn alerts
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4E5F58]">
                  Spot failed card renewals, sudden refund spikes, or shipping cost overruns the
                  same day they happen instead of at month-end.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / Stripe Payment Link Section */}
        <section id="founder-pass" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-10 rounded-2xl border border-[#D4DDD8] bg-white p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold tracking-tight text-[#111C18] sm:text-3xl">
                Skip the line with a Lifetime Founder Pass.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#465750]">
                Want immediate onboarding this week instead of waiting for Monday batch invites?
                Lock in a one-time Founder Pass before our $29/month public launch.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-[#2A3B34]">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-[#0F6B4B]" />
                  Instant connection to Stripe, Shopify, and Gumroad
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-[#0F6B4B]" />
                  Unlimited historical sales sync and daily insight emails
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-[#0F6B4B]" />
                  Full 30-day money-back guarantee if it does not save you time
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#E5EAE7] bg-[#FAF9F6] p-6 lg:col-span-5">
              <p className="text-sm font-semibold text-[#111C18]">Founder Early Access</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-bold text-[#111C18] tabular-nums">
                  $49
                </span>
                <span className="text-sm text-[#5C6E67]">one-time payment</span>
              </div>
              <p className="mt-2 text-xs text-[#5C6E67]">
                Includes 12 months of Pro insights, then locked at 50% off forever.
              </p>

              <div className="mt-6">
                <FounderPassButton paymentLink={stripePaymentLink} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5EAE7] bg-[#FAF9F6]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 text-xs text-[#5C6E67] sm:flex-row sm:items-center sm:px-8">
          <p>Clearline Analytics — Built with Next.js, Supabase, and Stripe.</p>
          <p>Questions? Reach out directly via our early access email.</p>
        </div>
      </footer>
    </div>
  );
}
