import type { Answer } from "@/lib/progress"
import type { LeverId } from "./types"
import {
  AVAILABILITY_SCORECARD,
  PAID_SCORECARD,
  PORTFOLIO_SCORECARD,
  PROMOS_SCORECARD,
  SOV_SCORECARD,
} from "./scorecards-levers"

/*
 * Each built lever carries a scorecard. Every metric is answered by picking the
 * state that describes the page today, written in that lever's own terms
 * (bullet counts, review totals, characters). Crawl / Walk / Run is NOT asked per
 * metric: it is the lever's overall result, derived from the metric answers.
 * The best-in-class state is the deck's wording; the other two are its steps down.
 */

export type Level = "crawl" | "walk" | "run"

export type Criterion = {
  id: string
  metric: string
  /** The state furthest from the bar, in the metric's own units. */
  below: string
  /** Part of the way to the bar, in the metric's own units. */
  partial: string
  /** Best-in-class bar, verbatim from the deck. */
  bar: string
  horizon: "Quick win" | "Long term"
}

export type ScorecardArea = { number: number; title: string; criteria: Criterion[] }

export type Scorecard = {
  lever: LeverId
  title: string
  intro: string
  source: string
  areas: ScorecardArea[]
}

export const PDP_SCORECARD: Scorecard = {
  lever: "pdp",
  title: "PDP & Content scorecard",
  intro:
    "Optimising PDPs maximises organic search rank and conversion on retail media platforms. Rate a hero product page against each bar the toolkit sets.",
  source: "Core slide 8",
  areas: [
    {
      number: 1,
      title: "Product title",
      criteria: [
        {
          id: "pdp-title-seo",
          below: "Few or no category keywords in the title",
          partial: "Some category keywords, fewer than 10",
          metric: "SEO words tied to top category keywords",
          bar: "Strong SEO words leveraging the country's keyword database and including at least 10 keywords.",
          horizon: "Quick win",
        },
        {
          id: "pdp-title-length",
          below: "Under 75 characters",
          partial: "75 characters, but no item highlights",
          metric: "Length (characters)",
          bar: "75 characters, plus 125 characters for item highlights.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 2,
      title: "Product description",
      criteria: [
        {
          id: "pdp-desc-bullets",
          below: "3 bullets or fewer",
          partial: "4 bullets, or 5 without strong SEO words",
          metric: "Number of bullets",
          bar: "5 bullet points in the 'about this item' section, using strong SEO words.",
          horizon: "Quick win",
        },
        {
          id: "pdp-desc-bullet-length",
          below: "Under 100 characters per bullet",
          partial: "100–149 characters per bullet",
          metric: "Average characters per bullet",
          bar: "150+ characters per bullet point.",
          horizon: "Quick win",
        },
        {
          id: "pdp-desc-seo",
          below: "Few or no category keywords",
          partial: "Some category keywords, 10 or fewer",
          metric: "SEO words tied to top category keywords",
          bar: "Strong SEO words (more than 10) leveraging the country's keyword database.",
          horizon: "Quick win",
        },
        {
          id: "pdp-desc-length",
          below: "Under 1,000 characters",
          partial: "1,000–1,499 characters",
          metric: "Overall number of characters",
          bar: "1,500 characters or more, optimised towards SEO.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 3,
      title: "Ratings & reviews",
      criteria: [
        {
          id: "pdp-rating",
          below: "Below 3.5 stars",
          partial: "3.5 to 4 stars",
          metric: "Average rating",
          bar: "Average rating above 4 stars.",
          horizon: "Long term",
        },
        {
          id: "pdp-review-count",
          below: "Under 100 reviews",
          partial: "100–499 reviews",
          metric: "Number of ratings / reviews",
          bar: "500+ reviews.",
          horizon: "Long term",
        },
        {
          id: "pdp-faqs",
          below: "No FAQs on the page",
          partial: "FAQs present, but as images or covering few questions",
          metric: "FAQs",
          bar: "FAQs present as text, not image, answering common shopper questions and helping LLMs interpret product usage.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 4,
      title: "Media",
      criteria: [
        {
          id: "pdp-photo-count",
          below: "3 photos or fewer",
    partial: "4–5 photos",
    metric: "Number of photos in the PDP gallery",
    bar: "More than 5 photos in the main image gallery. Video is scored separately below.",
          horizon: "Quick win",
        },
        {
          id: "pdp-photo-quality",
          below: "Pack shots only, not checked on mobile",
          partial: "Some benefit imagery, or not optimised for mobile",
          metric: "Picture quality",
          bar: "Products shown clearly with different benefits, optimised for mobile.",
          horizon: "Quick win",
        },
        {
          id: "pdp-video",
          below: "Static images only",
          partial: "Video exists, but not on this PDP",
          metric: "Video / animation",
          bar: "Video or 360-degree animation present.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 5,
      title: "Configurations",
      criteria: [
        {
          id: "pdp-configs",
          below: "A single configuration",
          partial: "2–3 configurations",
          metric: "Number of configurations",
          bar: "More than 3 configurations, with different sizes or variations of the product available.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 6,
      title: "Subscribe & Save",
      criteria: [
        {
          id: "pdp-sns",
          below: "Not eligible for Subscribe & Save",
          partial: "Eligible, but no discount shown on the PDP",
          metric: "Subscribe & Save",
          bar: "Eligible and active, with a relevant discount displayed on the PDP to drive repeat purchase velocity.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 7,
      title: "From the brand",
      criteria: [
        {
          id: "pdp-brand-comparison",
          below: "No comparison table",
          partial: "Table present, but compares few or unrelated products",
          metric: "Comparison table",
          bar: "Present, comparing similar products from different ranges.",
          horizon: "Quick win",
        },
        {
          id: "pdp-brand-photos",
          below: "2 photos or fewer",
          partial: "3–5 photos",
    metric: "Photos on the brand page",
    bar: "More than 5 photos within the brand page. This is separate from the PDP gallery scored under Media.",
          horizon: "Quick win",
        },
        {
          id: "pdp-brand-characters",
          below: "Under 750 characters",
          partial: "750–1,500 characters",
          metric: "Number of characters",
          bar: "More than 1,500 characters within the brand store page, using top SEO keywords.",
          horizon: "Quick win",
        },
        {
          id: "pdp-aplus",
          below: "No A+ content",
          partial: "A+ content with some of the five elements",
          metric: "A+ content",
          bar: "Benefit-led header, lifestyle imagery, ingredient / claim callout, usage instructions and brand story.",
          horizon: "Quick win",
        },
      ],
    },
  ],
}

export const SCORECARDS: Partial<Record<LeverId, Scorecard>> = {
  pdp: PDP_SCORECARD,
  sov: SOV_SCORECARD,
  paid: PAID_SCORECARD,
  promos: PROMOS_SCORECARD,
  portfolio: PORTFOLIO_SCORECARD,
  availability: AVAILABILITY_SCORECARD,
}

export const criteriaOf = (s: Scorecard) => s.areas.flatMap((a) => a.criteria)

/* Levels are stored as the shared three-way Answer so one store serves every assessment. */
export const LEVEL_OF: Record<Answer, Level> = { no: "crawl", partly: "walk", yes: "run" }
export const ANSWER_OF: Record<Level, Answer> = { crawl: "no", walk: "partly", run: "yes" }

/** `option` names the per-metric answer; `label` is the lever-level result it counts towards. */
export const LEVEL_META: Record<Level, { label: string; option: string; points: number }> = {
  crawl: { label: "Crawl", option: "Below the bar", points: 0 },
  walk: { label: "Walk", option: "Part way", points: 1 },
  run: { label: "Run", option: "Best in class", points: 2 },
}

/** The lever-specific wording for one answer on one metric. */
export const stateText = (c: Criterion, l: Level) => (l === "crawl" ? c.below : l === "walk" ? c.partial : c.bar)

/** Maturity bands on the 0–100 score. Stated on screen so the band is checkable. */
export const BANDS = { walkFrom: 40, runFrom: 75 } as const

export function levelForScore(pct: number): Level {
  if (pct >= BANDS.runFrom) return "run"
  if (pct >= BANDS.walkFrom) return "walk"
  return "crawl"
}

export type CardScore = {
  rated: number
  total: number
  /** Null until every criterion is rated: a partial score reads as a measured one. */
  pct: number | null
  level: Level | null
  counts: Record<Level, number>
}

export function scoreCriteria(criteria: Criterion[], answers: Record<string, Answer>): CardScore {
  const counts: Record<Level, number> = { crawl: 0, walk: 0, run: 0 }
  let points = 0
  for (const c of criteria) {
    const a = answers[c.id]
    if (!a) continue
    const l = LEVEL_OF[a]
    counts[l]++
    points += LEVEL_META[l].points
  }
  const rated = counts.crawl + counts.walk + counts.run
  const pct =
    rated === criteria.length && criteria.length > 0
      ? Math.round((points / (criteria.length * LEVEL_META.run.points)) * 100)
      : null
  return { rated, total: criteria.length, pct, level: pct === null ? null : levelForScore(pct), counts }
}
