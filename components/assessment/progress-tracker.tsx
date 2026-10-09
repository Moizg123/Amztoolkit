"use client"

import { useState } from "react"
import { AlertCircle, Trash2 } from "lucide-react"
import { LEVERS } from "@/lib/content/modules"
import {
  type ActionStatus,
  type ProgressState,
  type Quadrant,
  type SavedAction,
  QUADRANTS,
  isSaved,
  quadrantOf,
  removeAction,
  setActionRating,
  setActionStatus,
  setImpactOverride,
  statusOf,
  todayIso,
} from "@/lib/progress"
import { type ImpactReading, type Sizing, formatMoney, impactOf } from "@/lib/content/uplift"
import type { LeverId } from "@/lib/content/types"
import { cn } from "@/lib/utils"
import { RatingToggle } from "./action-card"

export const STATUS_LABEL: Record<ActionStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  done: "Done",
}

const STATUSES: ActionStatus[] = ["not-started", "in-progress", "done"]

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

type Row = SavedAction & {
  id: string
  status: ActionStatus
  quadrant: Quadrant | null
  n: number
  reading: ImpactReading
  prize: number | null
}

/*
 * Effort runs high-to-low left-to-right and impact low-to-high bottom-to-top, so the axes
 * cross in the middle. Each quadrant's origin is its top-left corner as a % of the plot.
 */
const QUADRANT_ORIGIN: Record<Quadrant, { x: number; y: number; label: string }> = {
  project: { x: 0, y: 0, label: "left-2 top-1.5" },
  "do-first": { x: 50, y: 0, label: "right-2 top-1.5 text-right" },
  park: { x: 0, y: 50, label: "left-2 bottom-1.5" },
  "fit-in": { x: 50, y: 50, label: "right-2 bottom-1.5 text-right" },
}

/*
 * Places the i-th of k dots inside a quadrant on an even grid, filling row by row in the
 * order the actions were saved, so a newly added action takes the next free spot rather
 * than reshuffling the ones already plotted.
 */
function slot(i: number, k: number) {
  const cols = Math.max(2, Math.ceil(Math.sqrt(k)))
  const rows = Math.max(2, Math.ceil(k / cols))
  return {
    x: (((i % cols) + 1) / (cols + 1)) * 50,
    y: ((Math.floor(i / cols) + 1) / (rows + 1)) * 50,
  }
}

export function ProgressTracker({ p, sizing, gapsUnsaved }: { p: ProgressState; sizing: Sizing; gapsUnsaved: number }) {
  const [hover, setHover] = useState<string | null>(null)
  const today = todayIso()
  const viewName =
    sizing.view === "all" ? "all brands" : (p.brands ?? []).find((b) => b.id === sizing.view)?.name || "this brand"

  const saved = Object.entries(p.plan)
    .filter((e): e is [string, SavedAction] => isSaved(e[1]))
    .map(([id, a]) => {
      const reading = impactOf(a, sizing)
      const size = a.lever ? sizing.levers[a.lever as LeverId] : undefined
      return {
        id,
        ...a,
        reading,
        prize: size?.uplift ?? null,
        status: statusOf(a),
        quadrant: quadrantOf(a, reading.value),
      }
    })

  const leverOrder = (slug: string | undefined) => LEVERS.findIndex((l) => l.slug === slug)
  const order: (Quadrant | null)[] = [...QUADRANTS.map((q) => q.id), null]

  // Number down the list, so number 1 is always the first thing to do.
  let n = 0
  const groups = order
    .map((q) => ({
      quadrant: q,
      meta: QUADRANTS.find((x) => x.id === q),
      rows: saved
        .filter((a) => a.quadrant === q)
        // Largest prize first within a group; unsized levers follow in deck order.
        .sort(
          (a, b) =>
            (b.prize ?? -1) - (a.prize ?? -1) ||
            leverOrder(a.lever) - leverOrder(b.lever) ||
            a.targetDate.localeCompare(b.targetDate),
        )
        .map((a): Row => ({ ...a, n: ++n })),
    }))
    .filter((g) => g.rows.length > 0)
  const rows = groups.flatMap((g) => g.rows)

  const done = rows.filter((a) => a.status === "done").length
  const inProgress = rows.filter((a) => a.status === "in-progress").length
  const overdue = rows.filter((a) => a.status !== "done" && a.targetDate < today).length
  const unrated = rows.filter((a) => !a.quadrant).length
  const pct = rows.length ? Math.round((done / rows.length) * 100) : 0

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-start gap-2 rounded-[2rem] border border-dashed border-navy/25 p-8">
        <p className="text-pretty text-xl font-semibold">No actions saved yet.</p>
        <p className="text-pretty text-muted-foreground">
          {gapsUnsaved > 0
            ? `You have ${gapsUnsaved} ${gapsUnsaved === 1 ? "gap" : "gaps"} in the plan above. Give one an owner, a target date and an impact rating, then save it to start tracking.`
            : "Score a lever scorecard to find gaps, then save them here as actions."}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 rounded-[2rem] bg-navy p-6 text-primary-foreground md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-display text-5xl font-extrabold leading-none">
              {done}
              <span className="text-primary-foreground/50"> of {rows.length}</span>
            </p>
            <p className="text-primary-foreground/75">saved {rows.length === 1 ? "action" : "actions"} done</p>
          </div>
          <dl className="flex gap-8 text-sm">
            <div className="flex flex-col">
              <dt className="text-primary-foreground/70">In progress</dt>
              <dd className="font-display text-2xl font-extrabold">{inProgress}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-primary-foreground/70">Overdue</dt>
              <dd className={cn("font-display text-2xl font-extrabold", overdue > 0 && "text-bayer-green")}>{overdue}</dd>
            </div>
          </dl>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-primary-foreground/15"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label="Actions done"
        >
          <div className="h-full rounded-full bg-bayer-green transition-[width] duration-700" style={{ width: `${pct}%` }} />
        </div>
        {gapsUnsaved > 0 && (
          <p className="text-sm text-primary-foreground/75">
            {gapsUnsaved} more {gapsUnsaved === 1 ? "gap is" : "gaps are"} in the plan but not saved yet, so not counted here.
          </p>
        )}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="flex flex-col gap-6">
          {groups.map((g) => (
            <section key={g.quadrant ?? "unrated"} className="flex flex-col gap-2" aria-label={g.meta?.label ?? "Not rated yet"}>
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm font-bold text-bayer-blue">{g.meta?.label ?? "Not rated yet"}</h3>
                <p className="text-xs text-muted-foreground">
                  {g.meta?.hint ?? "Rate impact and effort to place these on the matrix"}
                </p>
              </div>
              <ul className="flex flex-col divide-y rounded-3xl border">
                {g.rows.map((a) => (
                  <ActionRow
                    key={a.id}
                    a={a}
                    today={today}
                    resolved={p.assessment[a.id] === "yes"}
                    currency={p.currency ?? "EUR"}
                    active={hover === a.id}
                    onHover={setHover}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="flex flex-col gap-3 rounded-3xl border p-5 lg:sticky lg:top-24" aria-label="Impact versus effort matrix">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-display text-lg font-extrabold">Key actions matrix: impact vs effort</h3>
            <p className="text-xs text-muted-foreground">
              {sizing.sizedCount > 0 ? (
                <>
                  Impact sized for <span className="font-semibold text-foreground">{viewName}</span>.{" "}
                  <a href="#prize-h" className="font-semibold text-bayer-blue hover:underline">
                    Change
                  </a>
                </>
              ) : (
                <>
                  Impact rated by hand until a lever is sized.{" "}
                  <a href="#prize-h" className="font-semibold text-bayer-blue hover:underline">
                    Size the prize
                  </a>
                </>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="w-4 rotate-180 text-center text-[11px] font-semibold text-muted-foreground [writing-mode:vertical-rl]">
              Low impact &nbsp;&rarr;&nbsp; High impact
            </p>
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="relative aspect-square border-b-2 border-l-2 border-navy">
                <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-navy/30" aria-hidden />
                <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-navy/30" aria-hidden />

                {QUADRANTS.map((q) => (
                  <span
                    key={q.id}
                    className={cn("absolute text-[11px] font-semibold text-muted-foreground", QUADRANT_ORIGIN[q.id].label)}
                  >
                    {q.label}
                  </span>
                ))}

                {QUADRANTS.flatMap((q) => {
                  const inCell = rows
                    .filter((a) => a.quadrant === q.id)
                    .sort((a, b) => a.savedAt.localeCompare(b.savedAt) || a.id.localeCompare(b.id))
                  const o = QUADRANT_ORIGIN[q.id]
                  return inCell.map((a, i) => {
                    const s = slot(i, inCell.length)
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onMouseEnter={() => setHover(a.id)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(a.id)}
                        onBlur={() => setHover(null)}
                        onClick={() =>
                          document.getElementById(`action-${a.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
                        }
                        aria-label={`${a.n}. ${a.what}`}
                        title={a.what}
                        style={{ left: `${o.x + s.x}%`, top: `${o.y + s.y}%` }}
                        className={cn(
                          "absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-xs font-bold tabular-nums transition-[transform,left,top] duration-300",
                          a.status === "done"
                            ? "border-bayer-green bg-bayer-green text-navy"
                            : "border-navy bg-background text-navy",
                          hover === a.id && "z-10 scale-125 border-navy bg-navy text-primary-foreground",
                        )}
                      >
                        {a.n}
                      </button>
                    )
                  })
                })}
              </div>
              <p className="text-center text-[11px] font-semibold text-muted-foreground">
                High effort &nbsp;&rarr;&nbsp; Low effort
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full border-2 border-navy" aria-hidden /> Open
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-bayer-green" aria-hidden /> Done
            </span>
          </div>
          {unrated > 0 && (
            <p className="text-pretty text-xs text-muted-foreground">
              {unrated} {unrated === 1 ? "action is" : "actions are"} not on the matrix until impact and effort are rated.
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}

function ActionRow({
  a,
  today,
  resolved,
  currency,
  active,
  onHover,
}: {
  a: Row
  today: string
  resolved: boolean
  currency: string
  active: boolean
  onHover: (id: string | null) => void
}) {
  const late = a.status !== "done" && a.targetDate < today
  const lever = LEVERS.find((l) => l.slug === a.lever)
  return (
    <li
      id={`action-${a.id}`}
      onMouseEnter={() => onHover(a.id)}
      onMouseLeave={() => onHover(null)}
      className={cn("flex scroll-mt-28 gap-3 p-4 transition-colors", active && "bg-mist/70")}
    >
      <span
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-full border-2 text-xs font-bold tabular-nums",
          a.status === "done" ? "border-bayer-green bg-bayer-green text-navy" : "border-navy text-navy",
          active && "border-navy bg-navy text-primary-foreground",
        )}
        aria-hidden
      >
        {a.n}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className={cn("text-pretty font-semibold leading-snug", a.status === "done" && "text-muted-foreground line-through")}>
              {a.what}
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
              {lever && (
                <span className="font-semibold text-bayer-blue">
                  {lever.short}
                  {a.prize !== null && <span className="font-normal tabular-nums"> {formatMoney(a.prize, currency)}</span>}
                </span>
              )}
              {lever && <span aria-hidden>·</span>}
              <span>{a.owner}</span>
              <span aria-hidden>·</span>
              {a.status === "done" && a.doneAt ? (
                <span>Done on {formatDate(a.doneAt)}</span>
              ) : (
                <span className={cn(late && "flex items-center gap-1 font-semibold text-destructive")}>
                  {late && <AlertCircle className="size-3.5" />}
                  {late ? "Overdue, was due" : "Due"} {formatDate(a.targetDate)}
                </span>
              )}
              {resolved && (
                <>
                  <span aria-hidden>·</span>
                  <span className="font-semibold text-foreground">Scorecard now meets the bar</span>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeAction(a.id)}
            aria-label={`Remove "${a.what}" from the tracker`}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-mist hover:text-foreground"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div role="radiogroup" aria-label={`Status of ${a.what}`} className="flex rounded-full bg-mist p-1">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={a.status === s}
                onClick={() => setActionStatus(a.id, s)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  a.status === s
                    ? s === "done"
                      ? "bg-bayer-green text-navy"
                      : "bg-navy text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <RatingToggle
              compact
              label="Impact"
              value={a.reading.value}
              onChange={(r) =>
                a.reading.suggested
                  ? setImpactOverride(a.id, r === a.reading.suggested ? undefined : r)
                  : setActionRating(a.id, "impact", r)
              }
            />
            {a.reading.source === "override" ? (
              <button
                type="button"
                onClick={() => setImpactOverride(a.id, undefined)}
                title={`The prize suggests ${a.reading.suggested} impact`}
                className="text-[11px] font-semibold text-bayer-blue hover:underline"
              >
                Set by you · reset
              </button>
            ) : a.reading.source === "benchmark" ? (
              <span className="text-[11px] text-muted-foreground">from benchmark</span>
            ) : null}
          </div>
          <RatingToggle compact label="Effort" value={a.effort} onChange={(r) => setActionRating(a.id, "effort", r)} />
        </div>
      </div>
    </li>
  )
}
