"use client"

import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"
import { LEVERS } from "@/lib/content/modules"
import {
  BENCHMARKS,
  BENCHMARK_BASIS,
  CURRENCIES,
  SCENARIOS,
  SCENARIO_LABEL,
  type Sizing,
  formatMoney,
  pct,
  scenarioOf,
} from "@/lib/content/uplift"
import {
  type ProgressState,
  addBrand,
  removeBrand,
  setBrandScenario,
  setCurrency,
  setSizingView,
  updateBrand,
} from "@/lib/progress"
import { cn } from "@/lib/utils"

const FIELD =
  "w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"

export function SizeOfPrize({ p, sizing }: { p: ProgressState; sizing: Sizing }) {
  const brands = p.brands ?? []
  const currency = p.currency ?? "EUR"
  const viewBrand = brands.find((b) => b.id === sizing.view)
  const money = (n: number) => formatMoney(n, currency)

  return (
    <div className="flex flex-col gap-6">
      {/* Brands */}
      <div className="flex flex-col gap-4 rounded-3xl bg-mist p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-lg font-extrabold">Brands</h3>
            <p className="text-sm text-muted-foreground">Amazon net sales for the last 12 months, one currency for the market.</p>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-muted-foreground">Currency</span>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={cn(FIELD, "w-auto py-1.5")}>
              {CURRENCIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        {brands.length > 0 && (
          <ul className="flex flex-col gap-2">
            {brands.map((b) => (
              <li key={b.id} className="grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_14rem_auto]">
                <input
                  value={b.name}
                  onChange={(e) => updateBrand(b.id, { name: e.target.value })}
                  placeholder="Brand name"
                  aria-label="Brand name"
                  className={FIELD}
                />
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    inputMode="decimal"
                    value={b.netSales ?? ""}
                    onChange={(e) => updateBrand(b.id, { netSales: e.target.value === "" ? null : Number(e.target.value) })}
                    placeholder="Net sales"
                    aria-label={`Amazon net sales for ${b.name || "this brand"}`}
                    className={cn(FIELD, "pr-14 tabular-nums")}
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-muted-foreground">
                    {currency}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeBrand(b.id)}
                  aria-label={`Remove ${b.name || "brand"}`}
                  className="justify-self-start rounded-full p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => addBrand()}
          className="flex items-center gap-1.5 self-start rounded-full border border-navy px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-navy hover:text-primary-foreground"
        >
          <Plus className="size-4" /> Add brand
        </button>
      </div>

      {/* View */}
      {brands.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground">Sizing for</span>
          <div role="radiogroup" aria-label="Sizing for" className="flex flex-wrap rounded-full bg-mist p-1">
            {[{ id: "all", name: "All brands" }, ...brands].map((b) => (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={sizing.view === b.id}
                onClick={() => setSizingView(b.id)}
                className={cn(
                  "rounded-full px-3.5 py-1 text-sm font-semibold transition-colors",
                  sizing.view === b.id ? "bg-navy text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {b.name || "Unnamed brand"}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Sets the impact on the action plan and the matrix below.</span>
        </div>
      )}

      {/* Levers */}
      <div className="overflow-hidden rounded-3xl border">
        <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] gap-4 border-b bg-mist/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:grid">
          <span>Lever</span>
          <span>Headroom</span>
          <span>Benchmark, 5 years</span>
          <span className="text-right">Prize, 5 years</span>
        </div>
        <ul className="divide-y">
          {LEVERS.map((lever) => {
            const s = sizing.levers[lever.slug]
            const bench = BENCHMARKS[lever.slug]
            return (
              <li
                key={lever.slug}
                className="grid items-center gap-x-4 gap-y-2 px-5 py-3.5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)]"
              >
                <div className="flex flex-col">
                  <Link href={`/my-market/${lever.slug}`} className="font-semibold hover:underline">
                    {lever.short}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {s.pct === null ? "Scorecard not finished" : `Scorecard ${s.pct}%`}
                  </span>
                </div>

                <div className="text-sm">
                  {s.headroom === null ? (
                    <Link href={`/my-market/${lever.slug}`} className="text-xs font-semibold text-bayer-blue hover:underline">
                      Finish scorecard to size
                    </Link>
                  ) : (
                    <span className="font-semibold tabular-nums">{pct(s.headroom)}</span>
                  )}
                </div>

                <div>
                  {viewBrand ? (
                    <div role="radiogroup" aria-label={`${lever.short} scenario`} className="inline-flex rounded-full bg-mist p-1">
                      {SCENARIOS.map((sc) => {
                        const on = scenarioOf(viewBrand, lever.slug) === sc
                        return (
                          <button
                            key={sc}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => setBrandScenario(viewBrand.id, lever.slug, sc)}
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums transition-colors",
                              on ? "bg-navy text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {SCENARIO_LABEL[sc]} {pct(bench[sc])}
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {pct(bench.low)} · <span className="font-semibold text-foreground">{pct(bench.base)}</span> · {pct(bench.high)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 md:justify-end">
                  {s.uplift === null ? (
                    <span className="text-sm text-muted-foreground">Not sized</span>
                  ) : (
                    <>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-bold",
                          s.band === "high" ? "bg-bayer-green/30 text-navy" : "bg-mist text-muted-foreground",
                        )}
                      >
                        {s.band === "high" ? "High impact" : "Low impact"}
                      </span>
                      <span className="font-display text-lg font-extrabold tabular-nums">{money(s.uplift)}</span>
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>

        {/* Total */}
        <div className="flex flex-col gap-3 bg-navy px-5 py-5 text-primary-foreground">
          {sizing.blocker ? (
            <p className="text-pretty">{sizing.blocker}</p>
          ) : (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm text-primary-foreground/75">
                    Size of prize · {viewBrand ? viewBrand.name || "Unnamed brand" : "all brands"} ·{" "}
                    {sizing.sizedCount} of {LEVERS.length} levers sized
                  </p>
                  <p className="font-display text-4xl font-extrabold tabular-nums">{money(sizing.net)}</p>
                </div>
                <p className="text-sm tabular-nums text-primary-foreground/75">
                  {money(sizing.gross)} across levers − {money(sizing.overlap)} counted twice = {money(sizing.net)}
                </p>
              </div>
              {sizing.overlapLines.length > 0 && (
                <details className="group text-sm">
                  <summary className="cursor-pointer font-semibold text-bayer-green">How the overlap is taken out</summary>
                  <p className="mt-2 text-pretty text-primary-foreground/75">
                    Levers reach the same shoppers, so for each pair a share of the smaller prize is counted once, not twice. Starting
                    assumptions, to review with your category team.
                  </p>
                  <ul className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                    {sizing.overlapLines.map((o) => (
                      <li key={`${o.a}-${o.b}`} className="flex justify-between gap-3 tabular-nums">
                        <span className="text-primary-foreground/85">
                          {LEVERS.find((l) => l.slug === o.a)?.short} + {LEVERS.find((l) => l.slug === o.b)?.short}{" "}
                          <span className="text-primary-foreground/60">· {pct(o.share)}</span>
                        </span>
                        <span>−{money(o.amount)}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </>
          )}
        </div>
      </div>

      <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
        {BENCHMARK_BASIS} Prize = net sales × benchmark × headroom. Headroom is 100% minus the lever&apos;s scorecard result, with a
        floor of 10%. The scorecard is shared by every brand in the market. {viewBrand ? "" : "Pick a brand above to set its Low, Base or High scenario; Base is the default."}
      </p>
    </div>
  )
}
