export type LeverId =
  | "pdp"
  | "sov"
  | "paid"
  | "promos"
  | "portfolio"
  | "availability"

export type ModuleSlug = "introduction" | LeverId

/** "Core: slide 6" — every lesson carries its source so it can be checked against the deck. */
export type SourceRef = { core: number[] }

export type InteractiveKey =
  | "flywheel"
  | "prerequisites-preview"
  | "lever-table"
  | "best-in-class"
  | "quality-score"
  | "pdp-scorer"
  | "title-builder"
  | "sov-gap"
  | "bid-calculator"
  | "event-strategy"
  | "crap-calculator"
  | "oos-cost"

export type Block =
  | { type: "lead"; text: string }
  | { type: "text"; text: string }
  | { type: "callout"; label: string; text: string }
  | {
      type: "steps"
      items: { title: string; text: string }[]
    }
  | {
      type: "cards"
      columns?: 2 | 3 | 4
      items: { title: string; text: string }[]
    }
  | {
      type: "table"
      caption: string
      columns: string[]
      groupColumn?: boolean
      rows: string[][]
      footnote?: string
    }
  | { type: "interactive"; key: InteractiveKey }
  | { type: "scenarios"; items: Scenario[] }
  | FigureBlock

/** A region of a slide image as fractions of its width and height: [left, top, right, bottom]. */
export type FigureRect = [number, number, number, number]

/** A slide from the toolkit deck, shown beside click cards that point at parts of it. */
export type FigureBlock = {
  type: "figure"
  src: string
  alt: string
  width: number
  height: number
  /** Core deck slide the image is cropped from. */
  slide: number
  caption?: string
  /** Shown under the cards once the last one is open, e.g. that the cycle loops. */
  loopNote?: string
  /** Number the cards when they are steps in a sequence. */
  numbered?: boolean
  items?: { title: string; text: string; rect?: FigureRect }[]
}

export type Scenario = {
  id: string
  prompt: string
  options: { label: string; correct: boolean; feedback: string }[]
  /** The step in the toolkit the right answer comes from. */
  source: string
}

export type LessonStep = {
  title: string
  blocks: Block[]
}

export type Lesson = {
  slug: string
  title: string
  summary: string
  minutes: number
  source: SourceRef
  steps: LessonStep[]
}

export type ModuleContent = {
  slug: ModuleSlug
  number: number
  title: string
  short: string
  objective: string
  bestInClass: string
  quickWins: string[]
  longTerm: string[]
  /** null while the module is not yet built in this version. */
  lessons: Lesson[] | null
  source: SourceRef
}
