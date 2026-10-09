"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Check, Pencil } from "lucide-react"
import type { PlanItem } from "@/lib/content/assessment"
import type { Criterion } from "@/lib/content/scorecards"
import { LEVERS, moduleHref } from "@/lib/content/modules"
import {
  type ActionTarget,
  type Answer,
  type PlanEdit,
  type Rating,
  QUADRANTS,
  isSaved,
  quadrantOf,
  saveAction,
  statusOf,
} from "@/lib/progress"
import { EASE } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"
import { STATUS_LABEL, formatDate } from "./progress-tracker"
import { type Sizing, formatMoney, impactOf } from "@/lib/content/uplift"

export const IMPACT_SOURCE = { benchmark: "from benchmark", override: "set by you", manual: "rated by you" } as const

const FIELD =
  "w-full rounded-2xl border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"

export function ActionCard({
  item,
  index,
  criterion,
  current,
  edit,
  sizing,
  currency,
}: {
  item: PlanItem
  index: number
  criterion?: Criterion
  /** Today's rating; a metric already part way there can only aim for the bar. */
  current: Answer
  edit?: PlanEdit
  sizing: Sizing
  currency: string
}) {
  const saved = isSaved(edit) ? edit : null
  const lever = LEVERS.find((l) => l.slug === item.lever)
  const leverSize = sizing.levers[item.lever]
  const band = leverSize?.band ?? null
  const canAimPartial = current === "no" && Boolean(criterion)

  const [editing, setEditing] = useState(!saved)
  const [what, setWhat] = useState(saved?.what ?? item.title)
  const [owner, setOwner] = useState(saved?.owner ?? edit?.owner ?? "")
  const [targetDate, setTargetDate] = useState(saved?.targetDate ?? "")
  const [target, setTarget] = useState<ActionTarget>(saved?.target === "partial" && canAimPartial ? "partial" : "bar")

  const [manualImpact, setManualImpact] = useState<Rating | undefined>(saved?.impact)
  const [override, setOverride] = useState<Rating | undefined>(saved?.impactOverride)
  // Quick wins are cheap to set up by definition, so they start as low effort; anything else starts high.
  const [effort, setEffort] = useState<Rating>(saved?.effort ?? (item.horizon === "Quick win" ? "low" : "high"))

  // While the lever is sized, the benchmark band sets impact and a toggle is an override of it.
  const draft = impactOf({ owner, notes: "", done: false, lever: item.lever, impact: manualImpact, impactOverride: override }, sizing)
  const shown = saved && !editing ? impactOf(saved, sizing) : draft
  const impact = draft.value

  const missing = [
    !what.trim() && "what will be done",
    !owner.trim() && "an owner",
    !targetDate && "a target date",
    !impact && "an impact rating",
  ].filter(Boolean) as string[]

  function pickImpact(r: Rating) {
    if (band) setOverride(r === band ? undefined : r)
    else setManualImpact(r)
  }

  function save() {
    if (missing.length || !impact) return
    saveAction(item.id, {
      impact: band ? (manualImpact ?? impact) : impact,
      impactOverride: band ? override : saved?.impactOverride,
      effort,
      what: what.trim(),
      owner: owner.trim(),
      targetDate,
      target: canAimPartial ? target : "bar",
      lever: item.lever,
      metric: criterion?.metric,
    })
    setEditing(false)
  }

  const targetText = (t: ActionTarget) => (t === "partial" ? criterion?.partial : criterion?.bar)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn("flex flex-col gap-3 rounded-2xl border px-5 py-4", saved && !editing && "bg-mist/60")}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground">{index + 1}</span>
        <span
          className={cn(
            "rounded-full px-3 py-0.5 text-xs font-semibold",
            item.horizon === "Quick win" ? "bg-bayer-green/30" : "bg-bayer-blue/15",
          )}
        >
          {item.horizon}
        </span>
        <span className="text-xs text-muted-foreground">
          {lever ? `${lever.short} · ` : ""}
          {item.source}
        </span>
        {leverSize?.uplift != null && (
          <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-semibold tabular-nums">
            Lever prize {formatMoney(leverSize.uplift, currency)}
          </span>
        )}
        {saved && !editing && (
          <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <Check className="size-3.5 text-bayer-blue" strokeWidth={3} />
            On tracker · {STATUS_LABEL[statusOf(saved)]}
          </span>
        )}
      </div>

      {saved && !editing ? (
        <div className="flex flex-col gap-2.5">
          {/* The gap sentence is left to edit mode: its "best in class" half restates the Aiming for line below. */}
          <p className="text-pretty text-base font-semibold leading-snug">{saved.what}</p>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Aiming for: </span>
            {targetText(saved.target) ?? "Best in class"}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t pt-2.5">
            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <div className="flex gap-1.5">
                <dt className="text-muted-foreground">Owner</dt>
                <dd className="font-semibold">{saved.owner}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-muted-foreground">Due</dt>
                <dd className="font-semibold">{formatDate(saved.targetDate)}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-muted-foreground">Priority</dt>
                <dd className="font-semibold">
                  {QUADRANTS.find((q) => q.id === quadrantOf(saved, shown.value))?.label ?? "Not rated yet"}
                </dd>
              </div>
              {shown.value && (
                <div className="flex gap-1.5">
                  <dt className="text-muted-foreground">Impact</dt>
                  <dd className="font-semibold">
                    {shown.value === "high" ? "High" : "Low"}
                    <span className="font-normal text-muted-foreground"> · {IMPACT_SOURCE[shown.source ?? "manual"]}</span>
                  </dd>
                </div>
              )}
            </dl>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:underline"
              >
                <Pencil className="size-3.5" /> Edit
              </button>
              <a href="#tracker-h" className="flex items-center gap-1.5 text-sm font-semibold text-bayer-blue hover:underline">
                Update progress <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{item.reason}</p>
          <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr]">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What will be done</span>
              <input value={what} onChange={(e) => setWhat(e.target.value)} className={FIELD} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Owner</span>
              <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Name or team" className={FIELD} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Target date</span>
              <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className={FIELD} />
            </label>
          </div>

          <fieldset className="flex flex-col gap-1">
            <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aiming for</legend>
            {canAimPartial ? (
              <div role="radiogroup" className="grid gap-2 sm:grid-cols-2">
                {(["partial", "bar"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={target === t}
                    onClick={() => setTarget(t)}
                    className={cn(
                      "flex flex-col gap-0.5 rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                      target === t ? "border-navy bg-navy text-primary-foreground" : "hover:border-navy",
                    )}
                  >
                    <span className="font-semibold">{t === "partial" ? "Part of the way" : "Best in class"}</span>
                    <span className={cn("text-pretty leading-snug", target === t ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {targetText(t)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-pretty rounded-xl border px-3 py-2 text-sm leading-snug">
                <span className="font-semibold">Best in class. </span>
                <span className="text-muted-foreground">{criterion?.bar}</span>
              </p>
            )}
          </fieldset>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <RatingToggle label="Impact" value={impact} onChange={pickImpact} />
            <RatingToggle label="Effort to set up" value={effort} onChange={setEffort} />
          </div>
          {band && (
            <p className="-mt-1 text-pretty text-xs text-muted-foreground">
              {override
                ? `Set by you. The ${lever?.short} prize suggests ${band} impact. `
                : `${band === "high" ? "High" : "Low"} impact from the ${lever?.short} prize, one of the ${band === "high" ? "larger" : "smaller"} prizes in your market. Change it to override. `}
              {override && (
                <button type="button" onClick={() => setOverride(undefined)} className="font-semibold text-bayer-blue hover:underline">
                  Use benchmark
                </button>
              )}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={save}
              disabled={missing.length > 0}
              className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saved ? "Save changes" : "Save to tracker"}
            </button>
            {saved && (
              <button type="button" onClick={() => setEditing(false)} className="text-sm font-semibold hover:underline">
                Cancel
              </button>
            )}
            {missing.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Add {missing.length > 1 ? `${missing.slice(0, -1).join(", ")} and ${missing.at(-1)}` : missing[0]} to save.
              </p>
            )}
            {lever && (
              <Link href={moduleHref(lever.slug)} className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-bayer-blue hover:underline">
                Learn how in Module {lever.number} <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </motion.li>
  )
}

export function RatingToggle({
  label,
  value,
  onChange,
  compact = false,
}: {
  label: string
  value: Rating | undefined
  onChange: (r: Rating) => void
  compact?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "font-semibold text-muted-foreground",
          compact ? "text-xs" : "text-xs uppercase tracking-wider",
        )}
      >
        {label}
      </span>
      <div role="radiogroup" aria-label={label} className="flex rounded-full bg-mist p-1">
        {(["low", "high"] as const).map((r) => (
          <button
            key={r}
            type="button"
            role="radio"
            aria-checked={value === r}
            onClick={() => onChange(r)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
              value === r ? "bg-navy text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {r === "low" ? "Low" : "High"}
          </button>
        ))}
      </div>
    </div>
  )
}
