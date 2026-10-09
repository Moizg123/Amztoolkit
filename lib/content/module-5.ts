import type { Lesson } from "./types"

/** Module 5, built from core deck slides 31-32. */

export const portfolioLessons: Lesson[] = [
  {
    slug: "range-architecture",
    title: "Range architecture: define, design, decide, prove",
    summary: "Design the range for the channel and prove every change is incremental before it scales.",
    minutes: 4,
    source: { core: [31] },
    steps: [
      {
        title: "Designed for the channel",
        blocks: [
          {
            type: "lead",
            text: "The range is designed for the channel, not inherited from the shelf: set by shopper mission and unit economics, with pack architecture owned jointly.",
          },
          {
            type: "figure",
            src: "/toolkit/portfolio-bic.webp",
            alt: "Range architecture from shopper mission to proven pack: define, design, decide and prove, with tools and ways of working",
            width: 1800,
            height: 828,
            slide: 31,
            caption: "Portfolio best in class",
            numbered: true,
            loopNote: "Learnings from Prove feed back into Define",
            items: [
              { title: "Define", rect: [0.02, 0.195, 0.248, 0.715], text: "Map priority shopper missions to ASINs, model unit economics to net contribution and size growth potential and whitespace, using NielsenIQ." },
              { title: "Design", rect: [0.26, 0.195, 0.49, 0.715], text: "Design pack architecture channel-back, build regulatory change-control into the roadmap and set multipack and bundle strategy by retailer, using NielsenIQ and Helium 10." },
              { title: "Decide", rect: [0.502, 0.195, 0.73, 0.715], text: "Get joint brand, eCom and commercial sign-off, make add and exit decisions on a fixed cadence and screen exits for private-label substitution, using Power BI." },
              { title: "Prove", rect: [0.742, 0.195, 0.971, 0.715], text: "Run an AMC incrementality test before scaling, track post-change share at ASIN level and feed learnings back into range definition." },
            ],
          },
          {
            type: "cards",
            columns: 3,
            items: [
              { title: "Single range P&L owner", text: "One person owns the range economics across 1P and 3P." },
              { title: "Quarterly range review", text: "Adds and exits are decided on a fixed cadence." },
              { title: "Removals reviewed on substitution risk", text: "Exits are checked for where the shopper goes instead." },
            ],
          },
          {
            type: "callout",
            label: "Underpinning every step",
            text: "One 1P and 3P demand view underpins every range decision.",
          },
        ],
      },
    ],
  },
  {
    slug: "avoid-a-crap-out",
    title: "Avoiding a CRaP-out",
    summary: "Know Amazon’s profit on your products so they are not delisted.",
    minutes: 5,
    source: { core: [32] },
    steps: [
      {
        title: "Can’t Realise a Profit",
        blocks: [
          {
            type: "lead",
            text: "If your items get price matched to other channels and Amazon cannot make a profit, Amazon will delist them.",
          },
          {
            type: "text",
            text: "“CRaP” is Amazon’s term for Can’t Realise a Profit. Amazon’s profit is its gross margin (selling price, less COGS, plus the fixed fee you pay it) minus the fulfilment cost it pays.",
          },
          {
            type: "figure",
            src: "/toolkit/portfolio-crap.webp",
            alt: "The same product at two selling prices: at $23.05 Amazon makes $2.68 (11.6%), at $18.99 it loses $1.38 (−7%) and the item is a CRaP-out",
            width: 1800,
            height: 828,
            slide: 32,
            caption: "CRaP-out example",
            items: [
              { title: "Amazon’s gross margin", rect: [0.008, 0.21, 0.478, 0.577], text: "Selling price, less COGS, plus the fixed fee you pay Amazon (25% here). The only difference between the two columns is the selling price: $23.05 gives a $9.62 margin, $18.99 gives $5.56." },
              { title: "Fulfilment cost", rect: [0.008, 0.585, 0.478, 0.667], text: "Amazon pays $6.94 to fulfil the item in both cases. The cost does not fall with the price, so a lower price comes straight out of Amazon’s profit." },
              { title: "Amazon’s profit", rect: [0.008, 0.675, 0.478, 0.862], text: "At $23.05 Amazon makes $2.68 (11.6%). Price matched down to $18.99, it loses $1.38 (−7%): a CRaP-out, at risk of delisting and hard to promote." },
              { title: "Define the recommended selling price", rect: [0.51, 0.05, 0.995, 0.73], text: "Do not start at the lowest possible price. When Amazon pushes for lower prices, work out its margin and minimum viable price to judge your negotiating power, and use Pretium to see the whole pricing value chain, including promotions." },
              { title: "Monitor margins", rect: [0.1, 0.89, 0.9, 1.0], text: "Keep watching margins so your ASINs stay profitable for Amazon and are not delisted." },
            ],
          },
          {
            type: "cards",
            columns: 3,
            items: [
              { title: "Negative margin, no promotion", text: "If Amazon’s profit margin is negative, you are unlikely to be able to promote the product." },
              { title: "Substitutable categories", text: "Negative margins in an easily substitutable category make CRaP-outs more likely." },
              { title: "Pressure on trade terms", text: "With negative margins, Amazon will push for higher base trade P&L transfers." },
            ],
          },
        ],
      },
      {
        title: "Check a product",
        blocks: [
          {
            type: "text",
            text: "Start from the deck’s two examples, then enter your own numbers.",
          },
          { type: "interactive", key: "crap-calculator" },
        ],
      },
      {
        title: "Set a recommended selling price",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Start high", text: "Do not start with the lowest possible selling price; start at the higher end." },
              { title: "Know Amazon’s floor", text: "When Amazon recommends lower prices, work out its margin and minimum viable price to assess your own negotiation power." },
              { title: "See the whole value chain", text: "Use Pretium for a clear view of the entire pricing value chain, including promotions." },
            ],
          },
          {
            type: "callout",
            label: "Takeaway",
            text: "Monitor margins closely to keep your ASINs profitable and avoid delisting from Amazon.",
          },
        ],
      },
    ],
  },
]
