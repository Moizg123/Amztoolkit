"use client"

import { AnimatePresence, motion } from "motion/react"
import { Check, X } from "lucide-react"
import type { Scenario } from "@/lib/content/types"
import { answerScenario, useProgress } from "@/lib/progress"
import { EASE } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

export function ScenarioList({ items }: { items: Scenario[] }) {
  const { scenarios } = useProgress()
  const answered = items.filter((s) => scenarios[s.id] !== undefined)
  const right = answered.filter((s) => s.options[scenarios[s.id]]?.correct).length

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-semibold text-muted-foreground" aria-live="polite">
        {answered.length === 0
          ? `${items.length} scenarios. Pick an answer to see why.`
          : `${right} of ${answered.length} answered correctly · ${items.length - answered.length} to go`}
      </p>
      {items.map((s, n) => {
        const chosen = scenarios[s.id]
        const pick = chosen !== undefined ? s.options[chosen] : null
        return (
          <fieldset key={s.id} className="flex flex-col gap-4 rounded-3xl border p-6 md:p-8">
            <legend className="sr-only">Scenario {n + 1}</legend>
            <p className="text-sm font-bold text-bayer-blue">Scenario {n + 1}</p>
            <p className="text-pretty text-xl font-semibold leading-snug">{s.prompt}</p>
            <div className="flex flex-col gap-2">
              {s.options.map((o, i) => {
                const isChosen = chosen === i
                const reveal = chosen !== undefined && (isChosen || o.correct)
                return (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={isChosen}
                    onClick={() => answerScenario(s.id, i)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border px-5 py-4 text-left font-medium transition-colors",
                      !reveal && "hover:border-navy hover:bg-mist",
                      reveal && o.correct && "border-bayer-green bg-bayer-green/15",
                      reveal && !o.correct && "border-destructive/40 bg-destructive/5",
                    )}
                  >
                    <span className="flex-1">{o.label}</span>
                    {reveal &&
                      (o.correct ? (
                        <Check className="size-5 shrink-0" aria-label="Correct" />
                      ) : (
                        <X className="size-5 shrink-0 text-destructive" aria-label="Not the best answer" />
                      ))}
                  </button>
                )
              })}
            </div>
            <AnimatePresence initial={false}>
              {pick && (
                <motion.div
                  key={chosen}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-1">
                    <p className="text-pretty leading-relaxed">
                      <span className="font-bold">{pick.correct ? "Correct. " : "Not quite. "}</span>
                      {pick.feedback}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.source}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </fieldset>
        )
      })}
    </div>
  )
}
