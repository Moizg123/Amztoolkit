"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Chip, NumField, Panel, num } from "@/components/lesson/panel"
import { EASE } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

type Tone = "good" | "gap" | "note" | "empty"

function Status({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "w-fit rounded-full px-3 py-1 text-xs font-semibold",
        tone === "good" && "bg-bayer-green/30",
        tone === "gap" && "bg-destructive/10 text-destructive",
        tone === "note" && "bg-bayer-blue/15",
        tone === "empty" && "bg-background text-muted-foreground",
      )}
    >
      {children}
    </span>
  )
}

const fmt = (n: number, dp = 0) => n.toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp })

/* ---------- Module 2: share of voice vs. benchmark (core slide 16) ---------- */

const KEYWORD_TYPES = [
  { id: "branded", label: "Branded", role: "Defend", organic: 80, rank: "Top 3", paid: [90, 100], roas: [5, null] },
  { id: "nonbranded", label: "Non-branded", role: "Grow", organic: 55, rank: "Top 10", paid: [40, 50], roas: [2, 3] },
  { id: "competitor", label: "Competitor", role: "Maintain", organic: 25, rank: "Top 25", paid: [10, 25], roas: [1, null] },
] as const

type Range = readonly [number, number | null]

function vsRange(v: number | null, [lo, hi]: Range, unit: string): { tone: Tone; text: string } {
  if (v === null) return { tone: "empty", text: "Not entered" }
  if (v < lo) return { tone: "gap", text: `${fmt(lo - v, unit === "" ? 1 : 0)}${unit} below` }
  if (hi !== null && v > hi) return { tone: "note", text: "Above the range" }
  return { tone: "good", text: "On target" }
}

export function SovGap() {
  const [vals, setVals] = useState<Record<string, { organic: string; paid: string; roas: string }>>(
    Object.fromEntries(KEYWORD_TYPES.map((k) => [k.id, { organic: "", paid: "", roas: "" }])),
  )
  const set = (id: string, field: "organic" | "paid" | "roas", v: string) =>
    setVals((s) => ({ ...s, [id]: { ...s[id], [field]: v } }))

  return (
    <Panel className="flex flex-col gap-5">
      {KEYWORD_TYPES.map((k) => {
        const v = vals[k.id]
        const organic = vsRange(num(v.organic), [k.organic, null], " pts")
        const paid = vsRange(num(v.paid), k.paid, " pts")
        const roas = vsRange(num(v.roas), k.roas, "")
        return (
          <div key={k.id} className="flex flex-col gap-4 rounded-3xl bg-background p-5 md:p-6">
            <p className="flex items-baseline gap-3">
              <span className="text-lg font-bold">{k.label}</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-bayer-blue">{k.role}</span>
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <NumField label="Organic share" suffix="%" value={v.organic} onChange={(x) => set(k.id, "organic", x)} hint={`Benchmark ${k.organic}%, hero ASIN ${k.rank}`} />
                <Status tone={organic.tone}>{organic.text}</Status>
              </div>
              <div className="flex flex-col gap-2">
                <NumField label="Paid share of search" suffix="%" value={v.paid} onChange={(x) => set(k.id, "paid", x)} hint={`Benchmark ${k.paid[0]}–${k.paid[1]}%`} />
                <Status tone={paid.tone}>{paid.text}</Status>
              </div>
              <div className="flex flex-col gap-2">
                <NumField label="ROAS" value={v.roas} onChange={(x) => set(k.id, "roas", x)} hint={k.roas[1] === null ? `Target above ${k.roas[0]}` : `Target ${k.roas[0]}–${k.roas[1]}`} />
                <Status tone={roas.tone}>{roas.text}</Status>
              </div>
            </div>
          </div>
        )
      })}
      <p className="text-xs text-muted-foreground">
        Broad CPG benchmarks, to be tested for the most efficient share of search for your brands (core slide 16). Read your current shares from Profitero (core slide 17).
      </p>
    </Panel>
  )
}

/* ---------- Module 3: bid rules (core slide 24) ---------- */

export function BidCalculator() {
  const [f, setF] = useState({ aov: "", target: "", cvr: "", current: "", conversions: "" })
  const aov = num(f.aov)
  const target = num(f.target)
  const cvr = num(f.cvr)
  const current = num(f.current)
  const conversions = num(f.conversions)

  const maxCpc = aov !== null && target !== null && cvr !== null ? aov * (target / 100) * (cvr / 100) : null

  let move: { tone: Tone; title: string; text: string }
  if (target === null || current === null) {
    move = { tone: "empty", title: "Enter target and current ACoS", text: "The bid move compares the two." }
  } else if (conversions !== null && conversions < 10) {
    move = { tone: "note", title: "Not enough data yet", text: `${fmt(conversions)} conversions. Decide only with 10+ conversions, ideally 30+.` }
  } else if (Math.abs(current - target) < 0.5) {
    move = { tone: "good", title: "Hold the bid", text: "ACoS is at target (within half a point, rounded)." }
  } else if (current < target) {
    move = { tone: "good", title: "Raise the bid", text: "ACoS is below target, so there is room to buy more share." }
  } else {
    move = { tone: "gap", title: "Lower the bid 5–10%", text: "ACoS is above target. Never pause: lower the bid instead." }
  }

  return (
    <Panel className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumField label="Average order value" value={f.aov} onChange={(v) => setF({ ...f, aov: v })} hint="In your currency" />
        <NumField label="Target ACoS" suffix="%" value={f.target} onChange={(v) => setF({ ...f, target: v })} hint="Set from margin, not gut feel" />
        <NumField label="Conversion rate" suffix="%" value={f.cvr} onChange={(v) => setF({ ...f, cvr: v })} />
        <NumField label="Current ACoS" suffix="%" value={f.current} onChange={(v) => setF({ ...f, current: v })} />
        <NumField label="Conversions to date" value={f.conversions} onChange={(v) => setF({ ...f, conversions: v })} hint="On this keyword or campaign" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 rounded-3xl bg-navy p-6 text-primary-foreground">
          <p className="text-sm font-semibold text-primary-foreground/80">Bid ceiling (max CPC)</p>
          <p className="font-display text-5xl font-extrabold tabular-nums">{maxCpc === null ? "—" : fmt(maxCpc, 2)}</p>
          <p className="text-xs text-primary-foreground/70">AOV × target ACoS × CVR</p>
        </div>
        <div className="flex flex-col gap-2 rounded-3xl bg-background p-6" aria-live="polite">
          <Status tone={move.tone}>{move.title}</Status>
          <p className="text-pretty leading-relaxed">{move.text}</p>
        </div>
      </div>
    </Panel>
  )
}

/* ---------- Module 4: event strategy by SKU tier (core slide 28) ---------- */

const TIERS = [
  {
    id: "mature",
    label: "Hero SKUs · Mature",
    objective: "Maximise visibility (top of search dominance)",
    focus: ["Own core category terms", "Dominate top of search placements", "Own all own-brand spots for the entire event"],
    levers: ["SP / SB with top of search multipliers at recommended levels", "High bids on exact match", "SB Store Spotlight", "Custom creatives"],
    kpis: ["Top of search impression share", "Clicks, CTR and CVR", "Keyword ranking", "ROAS (at approved levels)"],
    budget: "~35–45%",
  },
  {
    id: "new",
    label: "Hero SKUs · New",
    objective: "Max volume and visibility (gain new-to-brand customers)",
    focus: ["Drive aggressive adoption", "Push for increased reviews", "Disassociate users from competitor products"],
    levers: ["SP / SB high budget auto and broad", "Video ads (SBV)", "Discounts and coupons", "Target close competitors when out of stock"],
    kpis: ["Units sold", "New-to-brand %", "Review count / velocity", "Organic rank movement", "Clicks, CTR and CVR"],
    budget: "~25–30%",
  },
  {
    id: "clearance",
    label: "Clearance SKUs",
    objective: "Drive volume (liquidate inventory)",
    focus: ["Maximum exposure to clear stock fast", "Push budget as close to ROAS, or even below, to move units"],
    levers: ["Auto and broad match", "Sponsored Products only", "Deep discounts and deal badge", "Low ROAS tolerance"],
    kpis: ["Units sold", "Sell-through rate", "Inventory depletion", "ROAS (at approved levels)"],
    budget: "~15–20%",
  },
  {
    id: "support",
    label: "Support SKUs",
    objective: "Maximise profitability",
    focus: ["Capture low-hanging conversions at strong margin", "Monitor ROAS and budgets to keep profitability"],
    levers: ["SP exact match", "Branded and long tail terms", "Conservative bidding", "Dynamic bidding: down only"],
    kpis: ["ROAS / IGM %", "CVR"],
    budget: "~10–15%",
  },
]

export function EventStrategy() {
  const [sel, setSel] = useState(TIERS[0].id)
  const t = TIERS.find((x) => x.id === sel)!
  return (
    <Panel className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2" aria-label="SKU tier">
        {TIERS.map((x) => (
          <Chip key={x.id} active={sel === x.id} onClick={() => setSel(x.id)}>
            {x.label}
          </Chip>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={sel}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="grid gap-4 lg:grid-cols-[1fr_2fr]"
        >
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-navy p-6 text-primary-foreground">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold uppercase tracking-wider text-bayer-green">Primary objective</p>
              <p className="text-pretty text-xl font-semibold leading-snug">{t.objective}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-primary-foreground/70">Estimated share of event budget</p>
              <p className="font-display text-4xl font-extrabold">{t.budget}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Tactical focus", items: t.focus },
              { title: "Key media levers", items: t.levers },
              { title: "KPIs to track", items: t.kpis },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-3 rounded-3xl bg-background p-5">
                <p className="text-sm font-bold">{col.title}</p>
                <ul className="flex flex-col gap-2 text-sm leading-relaxed">
                  {col.items.map((i) => (
                    <li key={i} className="text-pretty">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="text-xs text-muted-foreground">Prime Day strategy playbook example (core slide 28). SP: Sponsored Products; SB: Sponsored Brands; IGM: improved gross margin.</p>
    </Panel>
  )
}

/* ---------- Module 5: Amazon profitability / CRaP-out (core slide 32) ---------- */

const CRAP_EXAMPLES = {
  positive: { asp: "23.05", cogs: "17.91", fixed: "25", fulfil: "6.94" },
  negative: { asp: "18.99", cogs: "17.91", fixed: "25", fulfil: "6.94" },
}

export function CrapCalculator() {
  const [f, setF] = useState(CRAP_EXAMPLES.positive)
  const asp = num(f.asp)
  const cogs = num(f.cogs)
  const fixed = num(f.fixed)
  const fulfil = num(f.fulfil)
  const ready = asp !== null && cogs !== null && fixed !== null && fulfil !== null && asp > 0
  const fee = ready ? cogs! * (fixed! / 100) : null
  const gross = ready ? asp! - cogs! + fee! : null
  const profit = ready ? gross! - fulfil! : null
  const pct = ready ? (profit! / asp!) * 100 : null
  const floor = ready ? cogs! - fee! + fulfil! : null

  const row = (label: string, v: number | null, sign = "") => (
    <div className="flex items-baseline justify-between gap-4 border-b border-primary-foreground/15 py-2 last:border-b-0">
      <span className="text-primary-foreground/80">{label}</span>
      <span className="tabular-nums">{v === null ? "—" : `${sign}$${fmt(Math.abs(v), 2)}`}</span>
    </div>
  )

  return (
    <Panel className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Chip active={f === CRAP_EXAMPLES.positive} onClick={() => setF(CRAP_EXAMPLES.positive)}>Deck example: positive</Chip>
          <Chip active={f === CRAP_EXAMPLES.negative} onClick={() => setF(CRAP_EXAMPLES.negative)}>Deck example: negative</Chip>
        </div>
        <NumField label="Average selling price on Amazon" suffix="$" value={f.asp} onChange={(v) => setF({ ...f, asp: v })} />
        <NumField label="COGS (N1)" suffix="$" value={f.cogs} onChange={(v) => setF({ ...f, cogs: v })} />
        <NumField label="Amazon fixed %" suffix="%" value={f.fixed} onChange={(v) => setF({ ...f, fixed: v })} hint="Fixed fee paid to Amazon, e.g. 25%" />
        <NumField label="Amazon fulfilment cost" suffix="$" value={f.fulfil} onChange={(v) => setF({ ...f, fulfil: v })} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col rounded-3xl bg-navy p-6 text-primary-foreground">
          {row("Average selling price", asp)}
          {row("COGS", cogs, "− ")}
          {row("Amazon fixed fee", fee, "+ ")}
          {row("Amazon gross margin", gross, gross !== null && gross < 0 ? "−" : "")}
          {row("Fulfilment cost", fulfil, "− ")}
          <div className="flex items-baseline justify-between gap-4 pt-4">
            <span className="font-semibold">Amazon profit</span>
            <span className={cn("font-display text-4xl font-extrabold tabular-nums", profit !== null && (profit < 0 ? "text-[oklch(0.78_0.14_25)]" : "text-bayer-green"))}>
              {profit === null ? "—" : `${profit < 0 ? "−" : ""}$${fmt(Math.abs(profit), 2)}`}
            </span>
          </div>
          <p className="text-right text-sm text-primary-foreground/70 tabular-nums">{pct === null ? "" : `${pct < 0 ? "−" : ""}${fmt(Math.abs(pct), 1)}% of selling price`}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-3xl bg-background p-6" aria-live="polite">
          {profit === null ? (
            <Status tone="empty">Fill in all four values</Status>
          ) : profit < 0 ? (
            <>
              <Status tone="gap">CRaP-out risk</Status>
              <p className="text-pretty leading-relaxed">Amazon cannot realise a profit at this price, so it is likely to delist the item and you will struggle to promote it.</p>
            </>
          ) : (
            <>
              <Status tone="good">Profitable for Amazon</Status>
              <p className="text-pretty leading-relaxed">Monitor this margin closely if Amazon recommends a lower price.</p>
            </>
          )}
          {floor !== null && (
            <p className="text-sm text-muted-foreground">
              Price at which Amazon breaks even: <span className="font-semibold text-foreground tabular-nums">${fmt(floor, 2)}</span>
            </p>
          )}
        </div>
      </div>
    </Panel>
  )
}

/* ---------- Module 6: cost of an out-of-stock (core slide 37) ---------- */

export function OosCost() {
  const [f, setF] = useState({ rate: "", days: "", price: "", media: "", rank: "", recover: "" })
  const rate = num(f.rate)
  const days = num(f.days)
  const price = num(f.price)
  const media = num(f.media)
  const lostSales = rate !== null && days !== null && price !== null ? rate * days * price : null
  const total = lostSales !== null && media !== null ? lostSales + media : null

  return (
    <Panel className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-6">
        <fieldset className="grid gap-4 sm:grid-cols-3">
          <legend className="mb-3 text-sm font-bold uppercase tracking-wider text-bayer-blue">Lost sales · Vendor Central</legend>
          <NumField label="Pre-OOS daily run rate" suffix="units" value={f.rate} onChange={(v) => setF({ ...f, rate: v })} />
          <NumField label="Days out of stock" value={f.days} onChange={(v) => setF({ ...f, days: v })} />
          <NumField label="Price" value={f.price} onChange={(v) => setF({ ...f, price: v })} />
        </fieldset>
        <fieldset className="grid gap-4 sm:grid-cols-3">
          <legend className="mb-3 text-sm font-bold uppercase tracking-wider text-bayer-blue">Wasted media · Amazon Ads report</legend>
          <NumField label="Ad spend while unavailable" value={f.media} onChange={(v) => setF({ ...f, media: v })} />
        </fieldset>
        <fieldset className="grid gap-4 sm:grid-cols-3">
          <legend className="mb-3 text-sm font-bold uppercase tracking-wider text-bayer-blue">Lost rank · Helium 10</legend>
          <NumField label="Rank drop on priority keywords" suffix="places" value={f.rank} onChange={(v) => setF({ ...f, rank: v })} />
          <NumField label="Days to recover" value={f.recover} onChange={(v) => setF({ ...f, recover: v })} />
        </fieldset>
      </div>
      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-1 rounded-3xl bg-navy p-6 text-primary-foreground">
          <p className="text-sm font-semibold text-primary-foreground/80">Cost of this out-of-stock</p>
          <p className="font-display text-5xl font-extrabold tabular-nums">{total === null ? "—" : fmt(total)}</p>
          <div className="mt-3 flex flex-col gap-1 border-t border-primary-foreground/15 pt-3 text-sm">
            <span className="flex justify-between gap-4">
              <span className="text-primary-foreground/80">Lost sales</span>
              <span className="tabular-nums">{lostSales === null ? "—" : fmt(lostSales)}</span>
            </span>
            <span className="flex justify-between gap-4">
              <span className="text-primary-foreground/80">Wasted media</span>
              <span className="tabular-nums">{media === null ? "—" : fmt(media)}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-3xl bg-background p-6">
          <p className="text-sm font-bold">Lost rank</p>
          <p className="text-pretty leading-relaxed">
            {num(f.rank) === null && num(f.recover) === null
              ? "Not entered."
              : `${f.rank || "—"} places lost, ${f.recover || "—"} days to rebuild after restock.`}
          </p>
          <p className="text-xs text-muted-foreground">Measured in rank and days, not money, so it sits beside the total rather than inside it.</p>
        </div>
      </div>
    </Panel>
  )
}
