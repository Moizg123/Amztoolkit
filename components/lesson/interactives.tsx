"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check, RotateCcw } from "lucide-react"
import type { InteractiveKey, LeverId } from "@/lib/content/types"
import { LEVERS } from "@/lib/content/modules"
import { PREREQUISITES } from "@/lib/content/assessment"
import { PDP_STANDARDS } from "@/lib/content/module-1"
import { setPrerequisite, useProgress } from "@/lib/progress"
import { Flywheel } from "@/components/flywheel"
import { AnswerRow } from "@/components/assessment/answer-row"
import { EASE } from "@/components/motion/reveal"
import { Chip, Panel } from "@/components/lesson/panel"
import { BidCalculator, CrapCalculator, EventStrategy, OosCost, SovGap } from "@/components/lesson/lever-interactives"
import { cn } from "@/lib/utils"

export function Interactive({ id }: { id: InteractiveKey }) {
  switch (id) {
    case "flywheel":
      return (
        <Panel>
          <Flywheel size="md" />
        </Panel>
      )
    case "prerequisites-preview":
      return <PrerequisitesPreview />
    case "best-in-class":
      return <BestInClass />
    case "lever-table":
      return <LeverTable />
    case "quality-score":
      return <QualityScore />
    case "pdp-scorer":
      return <PdpScorer />
    case "title-builder":
      return <TitleBuilder />
    case "sov-gap":
      return <SovGap />
    case "bid-calculator":
      return <BidCalculator />
    case "event-strategy":
      return <EventStrategy />
    case "crap-calculator":
      return <CrapCalculator />
    case "oos-cost":
      return <OosCost />
  }
}


/* ---------- Module 0 ---------- */

function PrerequisitesPreview() {
  const { prerequisites } = useProgress()
  const answered = PREREQUISITES.filter((p) => prerequisites[p.id]).length
  return (
    <Panel className="flex flex-col gap-4">
      <div className="flex flex-col">
        {PREREQUISITES.map((p) => (
          <AnswerRow
            key={p.id}
            title={p.title}
            text={p.text}
            value={prerequisites[p.id]}
            onChange={(a) => setPrerequisite(p.id, a)}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {answered} of {PREREQUISITES.length} answered
        </p>
        <Link href="/my-market/pdp" className="flex items-center gap-2 text-sm font-semibold hover:underline">
          Then score your PDPs <ArrowRight className="size-4" />
        </Link>
      </div>
    </Panel>
  )
}

function BestInClass() {
  const [sel, setSel] = useState<LeverId>(LEVERS[0].slug)
  const lever = LEVERS.find((l) => l.slug === sel)!
  return (
    <Panel className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {LEVERS.map((l) => (
          <Chip key={l.slug} active={sel === l.slug} onClick={() => setSel(l.slug)}>
            {l.short}
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
          className="grid gap-6 md:grid-cols-2"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold uppercase tracking-wider text-bayer-blue">Lever {lever.number} · Objective</p>
            <p className="text-pretty text-lg leading-relaxed">{lever.objective}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-3xl bg-navy p-6 text-primary-foreground">
            <p className="text-sm font-bold uppercase tracking-wider text-bayer-green">Best in class</p>
            <p className="text-pretty leading-relaxed">{lever.bestInClass}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </Panel>
  )
}

function LeverTable() {
  const [lever, setLever] = useState<LeverId | "all">("all")
  const shown = LEVERS.filter((l) => lever === "all" || l.slug === lever)
  const quick = shown.reduce((n, l) => n + l.quickWins.length, 0)
  const long = shown.reduce((n, l) => n + l.longTerm.length, 0)
  return (
    <Panel className="flex flex-col gap-5">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="Filter by lever">
        <Chip compact active={lever === "all"} onClick={() => setLever("all")}>All levers</Chip>
        {LEVERS.map((l) => (
          <Chip compact key={l.slug} active={lever === l.slug} onClick={() => setLever(l.slug)}>
            {l.short}
          </Chip>
        ))}
      </div>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {quick} quick win{quick === 1 ? "" : "s"} and {long} long-term build{long === 1 ? "" : "s"}
        {lever === "all" ? ` across ${shown.length} levers` : ""}
      </p>
      <div className="overflow-hidden rounded-3xl bg-background">
        <div className="hidden grid-cols-[9rem_1fr_1fr] gap-5 border-b px-5 py-3 md:grid">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lever</span>
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="size-2 rounded-full bg-bayer-green" aria-hidden="true" />
            Quick wins
            <span className="font-medium normal-case tracking-normal text-muted-foreground">· start now</span>
          </span>
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="size-2 rounded-full bg-bayer-blue" aria-hidden="true" />
            Long-term builds
            <span className="font-medium normal-case tracking-normal text-muted-foreground">· plan and resource</span>
          </span>
        </div>
        <ul className="flex flex-col">
          {shown.map((l) => (
            <motion.li
              layout
              key={l.slug}
              className="grid gap-4 border-b px-5 py-4 last:border-b-0 md:grid-cols-[9rem_1fr_1fr] md:gap-5"
            >
              <span className="text-sm font-bold">
                <span className="mr-1.5 text-muted-foreground">{l.number}</span>
                {l.short}
              </span>
              <HorizonList label="Quick wins" dot="bg-bayer-green" items={l.quickWins} />
              <HorizonList label="Long-term builds" dot="bg-bayer-blue" items={l.longTerm} />
            </motion.li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

function HorizonList({ label, dot, items }: { label: string; dot: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider md:hidden">
        <span className={cn("size-2 rounded-full", dot)} aria-hidden="true" />
        {label}
      </span>
      <ul className="flex flex-col gap-1.5" aria-label={label}>
        {items.map((t) => (
          <li key={t} className="flex gap-2 text-pretty text-sm leading-relaxed">
            <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", dot)} aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Module 1 ---------- */

const QS_INPUTS = [
  { title: "Targeted keywords", text: "Matching customer search terms to the keywords you target." },
  { title: "PDP & ad / SKU relevance", text: "Matching searcher intent (browsing history and other factors) and your targeted keywords to the keywords on the SKU’s product detail page." },
  { title: "Click-through rate", text: "Higher CTRs earn the retail media network more ad revenue and count as a vote of confidence from searchers that the ad is relevant." },
  { title: "Conversion rate", text: "Higher conversion rates earn the network more revenue, encouraging it to show your products more often." },
  { title: "Other drivers", text: "For example price and stock." },
]

const QS_OUTCOMES = ["Lower cost per click (CPC)", "Higher impression share (SOV): more ads shown to searchers", "Higher ad rank: a better position in search results"]

function QualityScore() {
  const [i, setI] = useState(1)
  return (
    <Panel className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-bold uppercase tracking-wider">Typical RMN algorithm · inputs</p>
        <ul className="flex flex-col gap-2">
          {QS_INPUTS.map((q, n) => (
            <li key={q.title}>
              <button
                type="button"
                aria-expanded={i === n}
                onClick={() => setI(n)}
                className={cn(
                  "flex w-full flex-col gap-1 rounded-2xl border px-5 py-4 text-left transition-colors",
                  i === n ? "border-navy bg-background" : "border-transparent hover:bg-background/60",
                )}
              >
                <span className="flex items-center gap-3 font-semibold">
                  <span className="font-display text-bayer-blue">{n + 1}</span>
                  {q.title}
                  {n === 1 && <span className="rounded-full bg-bayer-green/30 px-2 py-0.5 text-xs">PDP content</span>}
                </span>
                <AnimatePresence initial={false}>
                  {i === n && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden text-pretty leading-relaxed text-muted-foreground"
                    >
                      {q.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 rounded-3xl bg-navy p-6 text-primary-foreground md:p-8">
        <p className="text-sm font-bold uppercase tracking-wider text-bayer-green">Good quality scores lead to</p>
        <ul className="flex flex-col gap-4">
          {QS_OUTCOMES.map((o) => (
            <li key={o} className="flex gap-3 text-pretty text-lg leading-snug">
              <Check className="mt-1 size-5 shrink-0 text-bayer-green" />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

function PdpScorer() {
  const [met, setMet] = useState<Set<number>>(new Set())
  const rows = PDP_STANDARDS.rows
  const toggle = (i: number) =>
    setMet((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
  const pct = Math.round((met.size / rows.length) * 100)
  const gaps = rows.map((r, i) => ({ r, i })).filter(({ i }) => !met.has(i))

  return (
    <Panel className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <ul className="flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <li key={r[0] + r[1]}>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-background px-4 py-3 transition-colors hover:bg-background/70">
              <input type="checkbox" checked={met.has(i)} onChange={() => toggle(i)} className="peer sr-only" />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                  met.has(i) ? "border-bayer-green bg-bayer-green" : "border-navy/30",
                )}
              >
                {met.has(i) && <Check className="size-3.5 text-navy" strokeWidth={3} />}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {r[0]} · {r[1]}
                </span>
                <span className="text-pretty text-sm leading-relaxed">{r[2]}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-1 rounded-3xl bg-navy p-6 text-primary-foreground">
          <p className="text-sm font-semibold text-primary-foreground/80">Standards met</p>
          <p className="font-display text-6xl font-extrabold tabular-nums">
            {met.size}
            <span className="text-2xl text-primary-foreground/60"> / {rows.length}</span>
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-foreground/15">
            <motion.div className="h-full rounded-full bg-bayer-green" animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: EASE }} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold">{gaps.length === 0 ? "No gaps: this page meets every standard." : `Your fix list (${gaps.length})`}</p>
          <ul className="flex flex-col gap-1 text-sm">
            {gaps.slice(0, 6).map(({ r }) => (
              <li key={r[0] + r[1]} className="text-pretty leading-relaxed">
                <span className="font-semibold">{r[1]}</span> <span className="text-muted-foreground">({r[0]})</span>
              </li>
            ))}
            {gaps.length > 6 && <li className="text-muted-foreground">and {gaps.length - 6} more unticked above</li>}
          </ul>
        </div>
      </div>
    </Panel>
  )
}

const TITLE_LIMIT = 75
const KEYWORD_TARGET = 10

function TitleBuilder() {
  const [f, setF] = useState({ brand: "", product: "", benefit: "", variant: "" })
  const [keywords, setKeywords] = useState("")
  const title = [f.brand, f.product, f.benefit, f.variant].map((s) => s.trim()).filter(Boolean).join(" ")
  const kwList = useMemo(
    () => keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean),
    [keywords],
  )
  const inTitle = kwList.filter((k) => title.toLowerCase().includes(k))
  const over = title.length > TITLE_LIMIT

  const fields: { key: keyof typeof f; label: string; placeholder: string }[] = [
    { key: "brand", label: "Brand", placeholder: "e.g. your brand" },
    { key: "product", label: "Product type", placeholder: "e.g. multivitamin tablets" },
    { key: "benefit", label: "Key benefit", placeholder: "e.g. immune support with vitamin C" },
    { key: "variant", label: "Size / count", placeholder: "e.g. 60 tablets" },
  ]

  return (
    <Panel className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((x) => (
          <label key={x.key} className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">{x.label}</span>
            <input
              value={f[x.key]}
              onChange={(e) => setF({ ...f, [x.key]: e.target.value })}
              placeholder={x.placeholder}
              className="rounded-2xl border bg-background px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        ))}
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-semibold">Top category keywords, comma separated</span>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="From your country’s keyword database"
            className="rounded-2xl border bg-background px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>
      <div className="flex flex-col gap-4 rounded-3xl bg-navy p-6 text-primary-foreground">
        <p className="text-sm font-semibold text-primary-foreground/80">Preview</p>
        <p className={cn("min-h-8 text-pretty text-xl font-semibold leading-snug", !title && "text-primary-foreground/40")}>
          {title || "Your title appears here as you type"}
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-primary-foreground/15 pt-4 text-sm">
          <Meter label="Characters" value={title.length} target={TITLE_LIMIT} good={!over && title.length > 0} note={over ? `${title.length - TITLE_LIMIT} over the limit` : "Amazon title limit"} />
          <Meter
            label="Keywords in title"
            value={inTitle.length}
            target={KEYWORD_TARGET}
            good={inTitle.length >= KEYWORD_TARGET}
            note={kwList.length === 0 ? "Add keywords to check" : `of ${kwList.length} listed · standard is 10+ across title and copy`}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Field order is a suggested structure. Limits from the PDP standards: 75 characters plus 125 for item highlights, and at least 10 SEO keywords (core slide 8).
      </p>
    </Panel>
  )
}

function Meter({ label, value, target, good, note }: { label: string; value: number; target: number; good: boolean; note: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-primary-foreground/70">{label}</span>
      <span className="font-display text-2xl font-bold tabular-nums">
        <span className={good ? "text-bayer-green" : undefined}>{value}</span>
        <span className="text-primary-foreground/50"> / {target}</span>
      </span>
      <span className="text-xs text-primary-foreground/70">{note}</span>
    </div>
  )
}
