"use client"

import { motion } from "motion/react"
import { BANDS, LEVEL_META, stateText, type CardScore, type Criterion, type Level } from "@/lib/content/scorecards"
import { EASE } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

const LEVELS: Level[] = ["crawl", "walk", "run"]

/** Selected tone per level: intensity rises with maturity; red is never used, a gap is not an alarm. */
const PICKED: Record<Level, string> = {
  crawl: "border-navy bg-navy text-primary-foreground",
  walk: "border-bayer-blue bg-bayer-blue text-primary-foreground",
  run: "border-bayer-green bg-bayer-green text-navy",
}

const FILL: Record<Level, string> = {
  crawl: "bg-navy",
  walk: "bg-bayer-blue",
  run: "bg-bayer-green",
}

/**
 * One metric: pick the state that describes the page today, each written in the
 * metric's own units. Nothing is preselected, because unrated is not "below the bar".
 */
export function StatePicker({
  criterion,
  value,
  onChange,
}: {
  criterion: Criterion
  value: Level | undefined
  onChange: (l: Level) => void
}) {
  return (
    <div role="radiogroup" aria-label={criterion.metric} className="grid gap-2 md:grid-cols-3">
      {LEVELS.map((l) => {
        const on = value === l
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(l)}
            className={cn(
              "flex flex-col gap-1.5 rounded-2xl border p-4 text-left transition-colors",
              on ? PICKED[l] : "border-navy/10 bg-background hover:border-navy/40",
            )}
          >
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
                on ? (l === "run" ? "text-navy" : "text-primary-foreground/80") : "text-muted-foreground",
              )}
            >
              {LEVEL_META[l].option}
            </span>
            <span className="text-pretty text-sm leading-relaxed">{stateText(criterion, l)}</span>
          </button>
        )
      })}
    </div>
  )
}

/** The headline result: level word, score, and a track with the band edges marked. */
export function MaturityTrack({
  score,
  hydrated,
  inverse = false,
  size = "lg",
}: {
  score: CardScore
  hydrated: boolean
  inverse?: boolean
  size?: "lg" | "sm" | "xs"
}) {
  const muted = inverse ? "text-primary-foreground/70" : "text-muted-foreground"
  if (!hydrated) return <div className={cn("animate-pulse rounded-2xl", size === "xs" ? "h-10" : "h-24", inverse ? "bg-white/10" : "bg-mist")} />

  if (size === "xs") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <p className={cn("text-xs tabular-nums", muted)}>
              {score.rated === score.total ? `${score.total} metrics rated` : `${score.rated} of ${score.total} rated`}
            </p>
          </div>
          <p className="font-display text-3xl font-extrabold leading-none tabular-nums">
            {score.pct === null ? <span className={muted}>—</span> : score.pct}
            <span className={cn("text-xs font-semibold", muted)}> / 100</span>
          </p>
        </div>
        <div className={cn("relative flex h-1.5 overflow-hidden rounded-full", inverse ? "bg-white/15" : "bg-navy/10")}>
          {score.pct !== null && score.level && (
            <motion.div
              className={cn("h-full rounded-full", FILL[score.level])}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(score.pct, 2)}%` }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className={cn("font-display font-extrabold leading-none", size === "lg" ? "text-6xl" : "text-4xl")}>
          {score.level ? LEVEL_META[score.level].label : "Unscored"}
        </p>
        <p className="font-display text-2xl font-extrabold tabular-nums">{score.pct === null ? "—" : `${score.pct}`}<span className={cn("text-sm font-semibold", muted)}>{score.pct === null ? "" : " / 100"}</span></p>
      </div>

      <div className="flex flex-col gap-2">
        <div className={cn("relative flex h-3 overflow-hidden rounded-full", inverse ? "bg-white/15" : "bg-navy/10")}>
          {score.pct !== null && score.level && (
            <motion.div
              className={cn("h-full rounded-full", FILL[score.level])}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(score.pct, 2)}%` }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          )}
          {[BANDS.walkFrom, BANDS.runFrom].map((edge) => (
            <span
              key={edge}
              aria-hidden
              className={cn("absolute inset-y-0 w-0.5", inverse ? "bg-navy" : "bg-background")}
              style={{ left: `${edge}%` }}
            />
          ))}
        </div>
        <div className={cn("relative h-4 text-xs font-semibold", muted)}>
          <span className="absolute left-0">Crawl</span>
          <span className="absolute" style={{ left: `${BANDS.walkFrom}%` }}>Walk {BANDS.walkFrom}</span>
          <span className="absolute" style={{ left: `${BANDS.runFrom}%` }}>Run {BANDS.runFrom}</span>
        </div>
      </div>

      <p className={cn("text-pretty text-sm leading-relaxed", muted)}>
        {score.pct === null
          ? `${score.rated} of ${score.total} metrics rated. The score shows once all are.`
          : `${score.counts.run} best in class · ${score.counts.walk} part way · ${score.counts.crawl} below the bar, across ${score.total} metrics.`}
      </p>
    </div>
  )
}

/**
 * Crawl / Walk / Run for a lever card's corner. Withheld as a level until every
 * metric is rated, so a half-scored card never reads as Crawl.
 */
export function LevelBadge({ score, hydrated, inverse = false }: { score: CardScore; hydrated: boolean; inverse?: boolean }) {
  if (!hydrated) return <span className={cn("h-6 w-14 animate-pulse rounded-full", inverse ? "bg-white/10" : "bg-navy/10")} />
  if (score.level) {
    return (
      <span className={cn("shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold", PICKED[score.level])}>
        {LEVEL_META[score.level].label}
      </span>
    )
  }
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold",
        inverse ? "border-white/30 text-primary-foreground/75" : "border-navy/15 text-muted-foreground",
      )}
    >
      {score.rated === 0 ? "Not scored" : "In progress"}
    </span>
  )
}

/**
 * Per-area tag. Areas carry no Crawl / Walk / Run of their own: that is the lever's
 * result. An area only reports how many of its metrics are rated and best in class.
 */
export function AreaTag({ score }: { score: CardScore }) {
  const done = score.rated === score.total
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold tabular-nums",
        done ? "bg-navy text-primary-foreground" : "border text-muted-foreground",
      )}
    >
      {done ? `${score.counts.run} of ${score.total} best in class` : `${score.rated} of ${score.total} rated`}
    </span>
  )
}
