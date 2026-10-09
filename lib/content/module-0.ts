import type { Lesson } from "./types"

/** Module 0, built from short deck slides 2-4. */
export const introductionLessons: Lesson[] = [
  {
    slug: "the-flywheel",
    title: "The Amazon flywheel",
    summary: "Six levers that only compound when they turn together.",
    minutes: 4,
    source: { core: [2] },
    steps: [
      {
        title: "One flywheel, six levers",
        blocks: [
          {
            type: "lead",
            text: "The Amazon flywheel lays the foundations required to win on Amazon, and on other sophisticated retailers too.",
          },
          {
            type: "text",
            text: "Each lever feeds the next. Visibility brings shoppers to the page, the page converts them, and the sales signal that results lifts visibility again. Select a lever to see what it covers.",
          },
          { type: "interactive", key: "flywheel" },
        ],
      },
      {
        title: "Two halves of the wheel",
        blocks: [
          {
            type: "figure",
            src: "/toolkit/flywheel.webp",
            alt: "The Amazon flywheel: four prerequisites on the left; win visibility and win the conversion around growth on Amazon",
            width: 1800,
            height: 838,
            slide: 2,
            caption: "The Amazon flywheel",
            items: [
              {
                title: "The rule",
                rect: [0.229, 0.018, 0.993, 0.138],
                text: "Growth requires all six levers working together, not best in class in a few.",
              },
              {
                title: "Win visibility",
                rect: [0.229, 0.143, 0.993, 0.578],
                text: "Winning onsite paid activation (paid search, ad display), maximising organic visibility (category page, SEO, Alexa shopping) and boosting offsite traffic towards Amazon (Google, social, LLMs).",
              },
              {
                title: "Win the conversion",
                rect: [0.229, 0.585, 0.993, 0.99],
                text: "Best in class PDPs (titles, descriptions, A+ content, reviews), the right price and promo to win the buy box and improve CVR, and winning hero SKUs kept in stock.",
              },
              {
                title: "Prerequisites",
                rect: [0.008, 0.018, 0.22, 0.99],
                text: "Before any of it turns: the right products listed, products in stock, a viable commercial model and an execution team in place. The next topic covers these.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "prerequisites",
    title: "Prerequisites to unlock the flywheel",
    summary: "Four conditions that must hold before any lever can pay back.",
    minutes: 3,
    source: { core: [2] },
    steps: [
      {
        title: "Four prerequisites",
        blocks: [
          {
            type: "lead",
            text: "Before a market invests in any lever, four foundations have to be in place. Without them the flywheel will not turn, however good the execution.",
          },
          {
            type: "cards",
            columns: 2,
            items: [
              {
                title: "Right products listed",
                text: "Hero SKUs and priority pack formats are listed and retail-ready.",
              },
              {
                title: "Products are in stock",
                text: "Sufficient inventory, replenishment and fulfilment to sustain stock.",
              },
              {
                title: "Viable commercial model",
                text: "Price architecture, trade terms and unit economics support profitable growth.",
              },
              {
                title: "Execution team in place",
                text: "Clear ownership combined with data / tool access and granular measurement.",
              },
            ],
          },
        ],
      },
      {
        title: "Check your market",
        blocks: [
          {
            type: "text",
            text: "The prerequisites check is the first step of the market self-assessment. Your answers stay in this browser and feed your scorecard in My market.",
          },
          { type: "interactive", key: "prerequisites-preview" },
        ],
      },
    ],
  },
  {
    slug: "levers-at-a-glance",
    title: "The six levers at a glance",
    summary: "Each lever's objective, quick wins and longer-term builds.",
    minutes: 5,
    source: { core: [3, 4] },
    steps: [
      {
        title: "What best in class looks like",
        blocks: [
          {
            type: "lead",
            text: "The toolkit sets out what best in class looks like by lever: the process, tooling and governance markets can adopt.",
          },
          { type: "interactive", key: "best-in-class" },
        ],
      },
      {
        title: "Quick wins and long-term builds",
        blocks: [
          {
            type: "text",
            text: "Each lever carries quick wins markets can act on now, alongside longer-term builds to drive Amazon growth. Read across a row to see a lever's full plan, or filter to one lever.",
          },
          { type: "interactive", key: "lever-table" },
        ],
      },
    ],
  },
]
