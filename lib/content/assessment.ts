import type { Answer, ProgressState } from "@/lib/progress"
import type { LeverId } from "./types"
import { LEVEL_OF, SCORECARDS, stateText } from "./scorecards"

/** Lowercases a leading capital for use mid-sentence, leaving acronyms (ASINs, OOS, AI, A+) intact. */
const PROPER_NOUNS = ["Buy Box", "Subscribe & Save", "Amazon"]

function midSentence(label: string) {
  if (PROPER_NOUNS.some((n) => label.startsWith(n))) return label
  return /^[A-Z][a-z]/.test(label) ? label[0].toLowerCase() + label.slice(1) : label
}

export const PREREQUISITES = [
  { id: "listed", title: "Right products listed", text: "Hero SKUs and priority pack formats are listed and retail-ready." },
  { id: "stock", title: "Products are in stock", text: "Sufficient inventory, replenishment and fulfilment to sustain stock." },
  { id: "commercial", title: "Viable commercial model", text: "Price architecture, trade terms and unit economics support profitable growth." },
  { id: "team", title: "Execution team in place", text: "Clear ownership combined with data / tool access and granular measurement." },
] as const

export const ANSWER_LABEL: Record<Answer, string> = {
  yes: "In place",
  partly: "Partly",
  no: "Not yet",
}

const SCORE: Record<Answer, number> = { yes: 1, partly: 0.5, no: 0 }

export type Score = { answered: number; total: number; pct: number | null }

export function scoreOf(ids: readonly string[], answers: Record<string, Answer>): Score {
  const given = ids.map((id) => answers[id]).filter(Boolean) as Answer[]
  return {
    answered: given.length,
    total: ids.length,
    // Withheld until every item is answered: a partial score reads as a measured one.
    pct:
      given.length === ids.length && ids.length > 0
        ? Math.round((given.reduce((t, a) => t + SCORE[a], 0) / ids.length) * 100)
        : null,
  }
}

export type PlanItem = {
  id: string
  lever: LeverId
  title: string
  reason: string
  horizon: "Quick win" | "Long term"
  source: string
}

/** Every scorecard metric short of best in class becomes a plan item. The plan reads the levers only. */
export function buildPlan(p: ProgressState): PlanItem[] {
  return Object.values(SCORECARDS)
    .flatMap((card) =>
      card.areas.flatMap((area) =>
        area.criteria
          .filter((c) => p.assessment[c.id] && p.assessment[c.id] !== "yes")
          .map((c) => ({
            id: c.id,
            lever: card.lever,
            title: `${area.title}: bring ${midSentence(c.metric)} to best in class`,
            reason: `Today: ${stateText(c, LEVEL_OF[p.assessment[c.id]])}. Best in class: ${c.bar}`,
            horizon: c.horizon,
            source: card.source,
          })),
      ),
    )
    // Stable sort keeps scorecard order within each horizon.
    .sort((a, b) => (a.horizon === b.horizon ? 0 : a.horizon === "Quick win" ? -1 : 1))
}
