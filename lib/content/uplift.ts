import type { PlanEdit, ProgressState, Rating } from "@/lib/progress"
import type { LeverId } from "./types"
import { SCORECARDS, criteriaOf, scoreCriteria } from "./scorecards"

export type Scenario = "low" | "base" | "high"
export const SCENARIOS: Scenario[] = ["low", "base", "high"]
export const SCENARIO_LABEL: Record<Scenario, string> = { low: "Low", base: "Base", high: "High" }

/** Illustrative uplift on Amazon net sales, cumulative over five years, per lever. */
export const BENCHMARKS: Record<LeverId, Record<Scenario, number>> = {
  portfolio: { low: 0.08, base: 0.12, high: 0.45 },
  availability: { low: 0.05, base: 0.1, high: 0.2 },
  sov: { low: 0.05, base: 0.1, high: 0.2 },
  pdp: { low: 0.08, base: 0.12, high: 0.2 },
  paid: { low: 0.1, base: 0.25, high: 0.4 },
  promos: { low: 0.01, base: 0.02, high: 0.2 },
}

export const BENCHMARK_BASIS = "Illustrative uplift on Amazon net sales, cumulative over five years, not per year."

/*
 * Headroom scales a benchmark by how far the market is from best in class.
 * A lever at best in class keeps a floor, because the shelf keeps moving.
 */
export const HEADROOM_FLOOR = 0.1

/*
 * Levers pull on the same shoppers, so part of one lever's prize is also counted in another's.
 * Each pair names the share of the SMALLER of the two prizes that is double counted.
 * Starting assumptions, to be reviewed with the category team.
 */
export const OVERLAPS: { a: LeverId; b: LeverId; share: number; why: string }[] = [
  { a: "sov", b: "paid", share: 0.35, why: "Both win the same search positions" },
  { a: "sov", b: "pdp", share: 0.25, why: "Organic rank depends on content" },
  { a: "pdp", b: "paid", share: 0.2, why: "Better pages convert the same paid clicks" },
  { a: "promos", b: "paid", share: 0.2, why: "Deal traffic is amplified by ads" },
  { a: "availability", b: "paid", share: 0.15, why: "Out of stock wastes the same ad spend" },
  { a: "availability", b: "sov", share: 0.1, why: "Stock outs drop the same rank" },
  { a: "promos", b: "sov", share: 0.1, why: "Deal velocity lifts the same rank" },
  { a: "promos", b: "availability", share: 0.1, why: "Deals need the same stock" },
  { a: "portfolio", b: "pdp", share: 0.1, why: "New listings need the same content work" },
  { a: "portfolio", b: "sov", share: 0.1, why: "Assortment widens the same keyword reach" },
  { a: "portfolio", b: "paid", share: 0.1, why: "New listings take the same ad budget" },
  { a: "availability", b: "pdp", share: 0.05, why: "Buy box and content convert the same visit" },
  { a: "promos", b: "pdp", share: 0.05, why: "Deals convert on the same page" },
  { a: "portfolio", b: "availability", share: 0.05, why: "A wider range needs the same supply" },
  { a: "portfolio", b: "promos", share: 0.05, why: "Packs and bundles carry the same deals" },
]

export type Brand = {
  id: string
  name: string
  /** Amazon net sales, last 12 months, in the market currency. */
  netSales: number | null
  scenarios: Partial<Record<LeverId, Scenario>>
}

export type LeverSize = {
  lever: LeverId
  /** Scorecard result, null until every metric on the lever is scored. */
  pct: number | null
  headroom: number | null
  /** Money uplift over 5 years for the current view, null when it cannot be sized. */
  uplift: number | null
  /** Benchmark uplift before headroom, so the arithmetic can be checked. */
  benchmarkMoney: number | null
  band: Rating | null
}

export type Sizing = {
  view: string
  brandsInView: Brand[]
  levers: Record<LeverId, LeverSize>
  gross: number
  overlap: number
  overlapLines: { a: LeverId; b: LeverId; share: number; why: string; amount: number }[]
  net: number
  sizedCount: number
  /** Why nothing could be sized, when that is the case. */
  blocker: string | null
}

export const scenarioOf = (b: Brand, lever: LeverId): Scenario => b.scenarios[lever] ?? "base"

function headroomFor(lever: LeverId, p: ProgressState) {
  const card = SCORECARDS[lever]
  if (!card) return { pct: null, headroom: null }
  const s = scoreCriteria(criteriaOf(card), p.assessment)
  if (s.pct === null) return { pct: null, headroom: null }
  return { pct: s.pct, headroom: Math.max(HEADROOM_FLOOR, 1 - s.pct / 100) }
}

export function sizeMarket(p: ProgressState): Sizing {
  const brands = p.brands ?? []
  const view = p.sizingView && brands.some((b) => b.id === p.sizingView) ? p.sizingView : "all"
  const inView = (view === "all" ? brands : brands.filter((b) => b.id === view)).filter(
    (b) => b.netSales !== null && b.netSales > 0,
  )

  const ids = Object.keys(BENCHMARKS) as LeverId[]
  const levers = {} as Record<LeverId, LeverSize>
  for (const lever of ids) {
    const { pct, headroom } = headroomFor(lever, p)
    const benchmarkMoney = inView.length
      ? inView.reduce((sum, b) => sum + (b.netSales ?? 0) * BENCHMARKS[lever][scenarioOf(b, lever)], 0)
      : null
    const uplift = headroom !== null && benchmarkMoney !== null ? benchmarkMoney * headroom : null
    levers[lever] = { lever, pct, headroom, uplift, benchmarkMoney, band: null }
  }

  // Impact bands are relative to this view: the larger half of the sized prizes are high impact.
  const sized = ids.filter((l) => levers[l].uplift !== null).sort((a, b) => levers[b].uplift! - levers[a].uplift!)
  const highCount = Math.ceil(sized.length / 2)
  sized.forEach((l, i) => (levers[l].band = i < highCount ? "high" : "low"))

  const gross = sized.reduce((sum, l) => sum + levers[l].uplift!, 0)
  const overlapLines = OVERLAPS.flatMap((o) => {
    const ua = levers[o.a].uplift
    const ub = levers[o.b].uplift
    return ua !== null && ub !== null ? [{ ...o, amount: o.share * Math.min(ua, ub) }] : []
  })
  const largest = sized.length ? levers[sized[0]].uplift! : 0
  const overlap = Math.min(
    overlapLines.reduce((s, o) => s + o.amount, 0),
    gross - largest,
  )

  const blocker = !brands.length
    ? "Add a brand and its Amazon net sales to size the prize."
    : !inView.length
      ? "Add Amazon net sales for this brand to size the prize."
      : !sized.length
        ? "Finish scoring a lever to size it. A lever is sized once every metric on it is scored."
        : null

  return { view, brandsInView: inView, levers, gross, overlap, overlapLines, net: gross - overlap, sizedCount: sized.length, blocker }
}

export type ImpactReading = {
  value: Rating | undefined
  source: "benchmark" | "override" | "manual" | null
  suggested: Rating | null
}

/** Impact comes from the sizing when the lever is sized; a market override wins, and stays visible. */
export function impactOf(e: PlanEdit, s: Sizing): ImpactReading {
  const band = e.lever ? (s.levers[e.lever as LeverId]?.band ?? null) : null
  if (band) {
    return e.impactOverride
      ? { value: e.impactOverride, source: "override", suggested: band }
      : { value: band, source: "benchmark", suggested: band }
  }
  return { value: e.impact, source: e.impact ? "manual" : null, suggested: null }
}

export function formatMoney(n: number, currency = "EUR") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: n >= 1e6 ? 1 : 0,
  }).format(n)
}

export const pct = (n: number) => `${Math.round(n * 100)}%`

export const CURRENCIES = ["EUR", "GBP", "USD", "PLN", "SEK", "CHF", "JPY"] as const
