import type { LeverId, ModuleContent, ModuleSlug } from "./types"
import { introductionLessons } from "./module-0"
import { pdpLessons } from "./module-1"
import { sovLessons } from "./module-2"
import { paidLessons } from "./module-3"
import { promosLessons } from "./module-4"
import { portfolioLessons } from "./module-5"
import { availabilityLessons } from "./module-6"

/*
 * The ONE content seam. Objectives, quick wins and long-term initiatives are
 * transcribed from short deck slide 3; best in class from slide 4.
 */
export const MODULES: ModuleContent[] = [
  {
    slug: "introduction",
    number: 0,
    title: "Introduction: the Amazon flywheel",
    short: "Flywheel",
    objective:
      "Understand the six levers, why they must work together, and the prerequisites to unlock the flywheel.",
    bestInClass:
      "The Amazon flywheel lays the foundations required to win on Amazon and on other sophisticated retailers. Growth requires all six levers working together, not best in class in a few.",
    quickWins: [],
    longTerm: [],
    lessons: introductionLessons,
    source: { core: [2, 3, 4] },
  },
  {
    slug: "pdp",
    number: 1,
    title: "PDPs & Content",
    short: "PDPs & Content",
    objective:
      "Build best in class PDPs where digital shelf signals feed continuously back into content optimisation, resulting in compounding conversion and findability.",
    bestInClass:
      "Digital-shelf signals (CTR, CVR, rank, reviews) feed back into a continuous cycle, so content quality compounds over time.",
    quickWins: [
      "Benchmark PDP content against scoring criteria to identify the gap to best in class",
      "Use text-based A+ content formatting to improve LLM crawlability",
      "Push review velocity on under-benchmark ASINs (e.g. post-purchase email)",
    ],
    longTerm: [
      "Embed AI-assisted content creation and compliance checks",
      "Set a regular PDP audit / refresh cadence leveraging sentiment analysis and competitor tracking",
    ],
    lessons: pdpLessons,
    source: { core: [3, 4, 6, 7, 8, 9, 10, 11] },
  },
  {
    slug: "sov",
    number: 2,
    title: "SoV & Discoverability",
    short: "Share of Voice",
    objective:
      "Grow visibility on Amazon organic and paid media to maximise findability against high purchase intent audiences.",
    bestInClass:
      "Offsite and onsite share of voice are tracked as one system, with Prioritise, Measure, Optimise and Learn run against both paid and organic targets.",
    quickWins: [
      "Include medical terminology and trigger detail (e.g. ‘loratadine’ and ‘pet dander’) to rank for long tail keywords",
      "Lift organic rank by optimising titles, description, reviews, A+ content and back-end keywords",
    ],
    longTerm: [
      "Build automated rank tracking and trigger-based alerts on keyword groups to track share of shelf visibility",
      "Run continuous test-and-learn to re-validate targets",
    ],
    lessons: sovLessons,
    source: { core: [3, 4, 14, 15, 16, 17] },
  },
  {
    slug: "paid",
    number: 3,
    title: "Paid Activation",
    short: "Paid Activation",
    objective:
      "Plan, execute and measure retail media as one connected, full funnel system, with budgets set from sales and margin objectives.",
    bestInClass:
      "Retail media is planned, executed and measured as one connected funnel across budgeting, media execution and measurement, not siloed campaigns.",
    quickWins: [
      "Set target / break-even ACoS by brand and campaign type",
      "Restructure campaigns at ASIN level; split branded / non-brand / competitor",
      "Tighten match types and refresh negatives to cut wasted spend",
    ],
    longTerm: [
      "Build a centralised, automated performance dashboard",
      "Leverage AMC to optimise towards lifetime value beyond ACoS",
    ],
    lessons: paidLessons,
    source: { core: [3, 4, 19, 20, 21, 22, 23, 24] },
  },
  {
    slug: "promos",
    number: 4,
    title: "Promos & Tentpoles",
    short: "Promos & Tentpoles",
    objective:
      "Run key tentpole events as integrated growth campaigns with demand, media, inventory and pricing synchronised.",
    bestInClass:
      "Major sales events are run as integrated growth campaigns, with pre-event planning, live execution and post-event measurement tied together rather than treated as promo calendar moments.",
    quickWins: [
      "Build the 100-day pre-event plan with leadership sign-off",
      "Set event-day KPI thresholds and named escalation owners",
      "Define per-SKU-tier event strategy (hero / new / support)",
    ],
    longTerm: [
      "Build an Amazon Marketing Cloud (AMC) view to understand incrementality / halo impact on key events",
      "Formalise golden rules / RACI for budget-shift decisions",
    ],
    lessons: promosLessons,
    source: { core: [3, 4, 26, 27, 28, 29] },
  },
  {
    slug: "portfolio",
    number: 5,
    title: "Portfolio",
    short: "Portfolio",
    objective:
      "Define the range channel assortment from shopper mission and unit economics, leveraging ‘MVP’ to validate incrementality before scaling.",
    bestInClass:
      "An optimal Amazon portfolio optimises for shopper mission and margin. SKUs follow a Define, Design, Decide and Prove process, proving incrementality before scaling.",
    quickWins: [
      "Add multipack / bundle options to improve unit economics",
      "Build a recommended selling price view per SKU and monitor low margin variants to protect against delisting",
    ],
    longTerm: [
      "Build a joint 1P / 3P demand view underpinning range decisions",
      "Run AMC incrementality tests before scaling any range change",
    ],
    lessons: portfolioLessons,
    source: { core: [3, 4, 31, 32] },
  },
  {
    slug: "availability",
    number: 6,
    title: "Availability",
    short: "Availability",
    objective:
      "Proactive buy box and inventory management is integrated with a commercial system with promo, media and inventory teams.",
    bestInClass:
      "Hero ASINs are protected with proactive buy box monitoring and inventory signals wired directly into replenishment, promo and media.",
    quickWins: [
      "Ring-fence hero ASINs; set weekly stock-cover thresholds",
      "Set up daily buy box / 3P seller monitoring",
      "Gate promotions and media on confirmed stock cover",
    ],
    longTerm: [
      "Build predictive demand / PO forecasting linked to replenishment",
      "Cost every OOS and feed learnings into seasonal planning",
    ],
    lessons: availabilityLessons,
    source: { core: [3, 4, 34, 35, 36, 37] },
  },
]

export const LEVERS = MODULES.filter(
  (m): m is ModuleContent & { slug: LeverId } => m.slug !== "introduction",
)

export function moduleBySlug(slug: string): ModuleContent | undefined {
  return MODULES.find((m) => m.slug === slug)
}

export function isBuilt(m: ModuleContent): boolean {
  return m.lessons !== null && m.lessons.length > 0
}

export function moduleHref(slug: ModuleSlug) {
  return `/modules/${slug}`
}
