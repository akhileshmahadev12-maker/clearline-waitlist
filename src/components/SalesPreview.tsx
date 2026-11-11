"use client";

import { useState } from "react";
import { TrendingUp, AlertTriangle, Sparkles } from "lucide-react";

type Timeframe = "today" | "week" | "quarter";

interface DashboardSnapshot {
  label: string;
  netRevenue: string;
  revenueDelta: string;
  ordersCount: string;
  avgOrderValue: string;
  refundRate: string;
  bars: { label: string; heightPct: number; amount: string }[];
  insights: {
    kind: "opportunity" | "warning" | "highlight";
    title: string;
    detail: string;
  }[];
}

const SNAPSHOTS: Record<Timeframe, DashboardSnapshot> = {
  today: {
    label: "Today",
    netRevenue: "$4,280.50",
    revenueDelta: "+18.4% vs avg Wednesday",
    ordersCount: "64",
    avgOrderValue: "$66.88",
    refundRate: "0.8%",
    bars: [
      { label: "8am", heightPct: 24, amount: "$310" },
      { label: "10am", heightPct: 48, amount: "$640" },
      { label: "12pm", heightPct: 72, amount: "$920" },
      { label: "2pm", heightPct: 58, amount: "$760" },
      { label: "4pm", heightPct: 92, amount: "$1,150" },
      { label: "6pm", heightPct: 42, amount: "$500" },
    ],
    insights: [
      {
        kind: "highlight",
        title: "Starter Bundle drove 54% of today's margin",
        detail: "31 of 64 orders included the 2-item add-on prompted at checkout.",
      },
      {
        kind: "warning",
        title: "Stripe EU card declines ticked up at 2:15 PM",
        detail: "4 failed renewals totaling $316 — automatic retry scheduled for 8 PM.",
      },
    ],
  },
  week: {
    label: "7 Days",
    netRevenue: "$29,410.00",
    revenueDelta: "+12.1% vs prior 7 days",
    ordersCount: "418",
    avgOrderValue: "$70.36",
    refundRate: "1.4%",
    bars: [
      { label: "Mon", heightPct: 54, amount: "$3,820" },
      { label: "Tue", heightPct: 68, amount: "$4,410" },
      { label: "Wed", heightPct: 62, amount: "$4,280" },
      { label: "Thu", heightPct: 78, amount: "$4,890" },
      { label: "Fri", heightPct: 95, amount: "$5,620" },
      { label: "Sat", heightPct: 70, amount: "$4,190" },
      { label: "Sun", heightPct: 38, amount: "$2,200" },
    ],
    insights: [
      {
        kind: "opportunity",
        title: "Repeat buyers spend 2.3x more on Fridays",
        detail: "Sending your weekend restock email Thursday at 5 PM outperforms Saturday morning.",
      },
      {
        kind: "highlight",
        title: "Shopify discount code WELCOME15 lowered net margin",
        detail: "Used by 42 existing customers who already purchased within 60 days.",
      },
    ],
  },
  quarter: {
    label: "90 Days",
    netRevenue: "$342,890.00",
    revenueDelta: "+31.6% vs Q2",
    ordersCount: "4,912",
    avgOrderValue: "$69.80",
    refundRate: "1.1%",
    bars: [
      { label: "Wk 1", heightPct: 44, amount: "$22.4k" },
      { label: "Wk 3", heightPct: 52, amount: "$25.1k" },
      { label: "Wk 5", heightPct: 60, amount: "$28.9k" },
      { label: "Wk 7", heightPct: 74, amount: "$31.2k" },
      { label: "Wk 9", heightPct: 84, amount: "$35.6k" },
      { label: "Wk 11", heightPct: 96, amount: "$39.4k" },
    ],
    insights: [
      {
        kind: "opportunity",
        title: "Annual plan upgrades cut churn in half",
        detail: "Customers shown the annual switch prompt after Month 2 retain 89% longer.",
      },
      {
        kind: "warning",
        title: "Shipping cost creep on West Coast orders",
        detail: "Carrier surcharges ate $1,840 in net profit across 610 orders in October.",
      },
    ],
  },
};

export function SalesPreview() {
  const [timeframe, setTimeframe] = useState<Timeframe>("week");
  const active = SNAPSHOTS[timeframe];

  return (
    <div className="rounded-2xl border border-[#D4DDD8] bg-white shadow-[0_18px_50px_-24px_rgba(17,28,24,0.18)]">
      {/* Window chrome bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6ECE9] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#0F6B4B]" />
          <span className="text-xs font-semibold tracking-tight text-[#111C18]">
            Clearline Live Ledger
          </span>
          <span className="rounded bg-[#F1F4F2] px-2 py-0.5 text-[11px] font-medium text-[#4D5F58]">
            Stripe + Shopify synced
          </span>
        </div>

        <div
          className="inline-flex rounded-lg border border-[#DCE3DF] bg-[#F5F7F6] p-0.5"
          role="tablist"
          aria-label="Sales preview timeframe"
        >
          {(["today", "week", "quarter"] as Timeframe[]).map((key) => {
            const isSelected = timeframe === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setTimeframe(key)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-white text-[#111C18] shadow-xs"
                    : "text-[#5C6E67] hover:text-[#111C18]"
                }`}
              >
                {SNAPSHOTS[key].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main dashboard grid */}
      <div className="grid gap-6 p-5 md:grid-cols-12 md:p-6">
        {/* Left: Revenue metrics & bar chart */}
        <div className="flex flex-col justify-between md:col-span-7">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-[#5C6E67]">Net revenue</p>
                <p className="mt-1 font-mono text-3xl font-semibold tracking-tight text-[#111C18] tabular-nums">
                  {active.netRevenue}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF4EF] px-2.5 py-1 text-xs font-medium text-[#0F6B4B]">
                <TrendingUp className="h-3.5 w-3.5" />
                {active.revenueDelta}
              </span>
            </div>

            {/* Key KPI strip */}
            <div className="mt-5 grid grid-cols-3 gap-3 border-y border-[#EDF1EF] py-3.5">
              <div>
                <p className="text-xs text-[#5C6E67]">Orders</p>
                <p className="mt-0.5 font-mono text-base font-semibold text-[#111C18] tabular-nums">
                  {active.ordersCount}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#5C6E67]">Avg order</p>
                <p className="mt-0.5 font-mono text-base font-semibold text-[#111C18] tabular-nums">
                  {active.avgOrderValue}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#5C6E67]">Refund rate</p>
                <p className="mt-0.5 font-mono text-base font-semibold text-[#111C18] tabular-nums">
                  {active.refundRate}
                </p>
              </div>
            </div>
          </div>

          {/* Clean proportional bar chart */}
          <div className="mt-5">
            <div className="flex h-36 items-end gap-2.5 pt-4">
              {active.bars.map((bar) => (
                <div
                  key={bar.label}
                  className="group flex flex-1 flex-col items-center gap-1.5"
                >
                  <span className="font-mono text-[10px] font-medium text-[#5C6E67] opacity-0 transition-opacity group-hover:opacity-100 tabular-nums">
                    {bar.amount}
                  </span>
                  <div className="relative flex h-24 w-full items-end rounded-md bg-[#F3F6F4] p-1">
                    <div
                      style={{ height: `${bar.heightPct}%` }}
                      className="w-full rounded-sm bg-[#0F6B4B]/85 transition-all duration-300 group-hover:bg-[#0F6B4B]"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#5C6E67]">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Plain-English Insights Feed */}
        <div className="flex flex-col justify-between rounded-xl border border-[#E6ECE9] bg-[#FAFBF9] p-4 md:col-span-5">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0F6B4B]" />
              <h3 className="text-xs font-semibold text-[#111C18]">
                Automated insights for {active.label.toLowerCase()}
              </h3>
            </div>

            <div className="mt-3.5 space-y-3">
              {active.insights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-[#E3EAE6] bg-white p-3.5"
                >
                  <div className="flex items-start gap-2">
                    {item.kind === "warning" ? (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#C26D1F]" />
                    ) : (
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6B4B]" />
                    )}
                    <div>
                      <p className="text-xs font-semibold leading-snug text-[#111C18]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#52635C]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 border-t border-[#E6ECE9] pt-3 text-[11px] text-[#64756F]">
            Interactive sample data. Click Today, 7 Days, or 90 Days above to inspect changes.
          </p>
        </div>
      </div>
    </div>
  );
}
