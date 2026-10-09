import type { Lesson } from "./types"

/** Module 2, built from core deck slides 14-17. */

export const sovLessons: Lesson[] = [
  {
    slug: "levers-of-share-of-voice",
    title: "What drives share of voice",
    summary: "The levers that move paid and organic rank, and why they reinforce each other.",
    minutes: 3,
    source: { core: [14] },
    steps: [
      {
        title: "Six levers move your rank",
        blocks: [
          {
            type: "lead",
            text: "Share of voice is how much of the digital shelf your brand holds when a shopper searches. It is earned through several levers at once.",
          },
          {
            type: "cards",
            columns: 3,
            items: [
              { title: "On-site paid activation", text: "Winning keywords, bids and relevancy in Amazon Ads." },
              { title: "Off-site organic traffic", text: "Traffic boosted towards Amazon from Google, social and LLMs." },
              { title: "Off-site paid traffic", text: "Paid media outside Amazon that sends shoppers to your pages." },
              { title: "Right price and promo", text: "Competitive pricing and promotions lift conversion and sales velocity." },
              { title: "Buy box and availability", text: "Winning the buy box and staying in stock keep the listing eligible to rank." },
              { title: "Review velocity", text: "The rate of new reviews and the overall rating act as a trust signal that drives conversion." },
            ],
          },
          {
            type: "callout",
            label: "Paid and organic are interdependent",
            text: "Improving PDP relevance, conversion, review velocity and sales lifts both paid ad and organic rank, reinforcing the flywheel.",
          },
        ],
      },
    ],
  },
  {
    slug: "diagnose-share-of-voice",
    title: "Four steps to diagnose share of voice",
    summary: "Define, understand, optimise and revise, for paid and organic search side by side.",
    minutes: 4,
    source: { core: [15] },
    steps: [
      {
        title: "Run paid and organic as one process",
        blocks: [
          {
            type: "text",
            text: "The same four steps apply to paid and organic search. Select a step to see what it means for each.",
          },
          {
            type: "figure",
            src: "/toolkit/sov-steps.webp",
            alt: "Four steps to diagnosing and optimising share of voice, for paid search and organic search",
            width: 1800,
            height: 828,
            slide: 15,
            caption: "Diagnosing and optimising share of voice",
            numbered: true,
            loopNote: "Step D feeds back into step A",
            items: [
              {
                title: "Define must-win keywords",
                rect: [0.098, 0.035, 0.27, 0.815],
                text: "Decide which keyword shelves to win and with which ASINs. Map branded, non-branded and competitor keyword groups. For organic, pick one hero ASIN per shelf to concentrate relevance.",
              },
              {
                title: "Understand current share",
                rect: [0.27, 0.035, 0.436, 0.815],
                text: "Find who holds the top positions today, and why. Paid: share of search and ROAS by keyword group vs. target and the leading competitor. Organic: top ASINs by clicks and organic rank, benchmarked against competitors in the category.",
              },
              {
                title: "Optimise SoV levers",
                rect: [0.436, 0.035, 0.6, 0.815],
                text: "Target a share per keyword group and close the gap. Paid: within ROAS guardrails, through campaign structure, bids and budget. Organic: close the PDP content gaps driving rank.",
              },
              {
                title: "Evaluate and revise",
                rect: [0.6, 0.035, 0.768, 0.815],
                text: "Track rank continuously and adjust as the shelf moves. Paid: test and learn, check bids and share weekly, refresh keywords yearly. Organic: track rank daily, re-score PDPs monthly, refresh keywords each sprint.",
              },
            ],
          },
          {
            type: "callout",
            label: "Linked, not separate",
            text: "PDP relevance and conversion lift both organic rank and paid ad quality, so strong content makes paid spend work harder through higher click-through and conversion rates.",
          },
        ],
      },
    ],
  },
  {
    slug: "share-targets",
    title: "Targets by keyword type",
    summary: "Defend branded, grow non-branded, stay selective on competitor terms. Check your shares.",
    minutes: 5,
    source: { core: [16, 17] },
    steps: [
      {
        title: "The benchmarks",
        blocks: [
          {
            type: "lead",
            text: "Hold the highest share on branded terms, grow non-branded and stay selective on competitor terms.",
          },
          {
            type: "table",
            caption: "CPG average targets by keyword type",
            columns: ["Keyword type", "Organic share", "Hero ASIN rank", "Paid share of search", "ROAS target"],
            rows: [
              ["Branded (defend)", "80%", "Top 3", "90–100%", ">5"],
              ["Non-branded (grow)", "55%", "Top 10", "40–50%", "2–3 (also for events)"],
              ["Competitor (maintain)", "25%", "Top 25", "10–25%", ">1"],
            ],
            footnote: "Broad CPG benchmarks, to be tested for the most efficient share of search for Bayer. Source: internal Bain CPG data.",
          },
          {
            type: "cards",
            columns: 3,
            items: [
              { title: "Defend branded terms first", text: "Aim to own them outright. Falling short means losing searches Bayer brands should already own." },
              { title: "Grow on non-branded terms", text: "Most search volume sits here, where shoppers are still choosing." },
              { title: "Stay selective on competitor terms", text: "Conversion is lower and costlier, so hold a presence only on the most relevant terms. Step up when a rival is out of stock or during key events." },
            ],
          },
        ],
      },
      {
        title: "Check your shares",
        blocks: [
          {
            type: "text",
            text: "Enter your current shares and ROAS for each keyword type to see where the gaps are. Leave a box blank if you do not have the number yet.",
          },
          { type: "interactive", key: "sov-gap" },
        ],
      },
      {
        title: "Where to get the numbers",
        blocks: [
          {
            type: "text",
            text: "Profitero's placement view gives you the share numbers. Select each part of the screen to see what it tells you and how to use it.",
          },
          {
            type: "figure",
            src: "/toolkit/sov-profitero.webp",
            alt: "Profitero placement share of search view, with a toggle between organic and paid positions",
            width: 1800,
            height: 828,
            slide: 17,
            caption: "Profitero placement share of search",
            items: [
              { title: "Organic or sponsored", rect: [0.015, 0.335, 0.272, 0.438], text: "Toggle between organic and paid positions. Read the two separately, because organic share follows the PDP and paid share follows the bid." },
              { title: "Page 1 summary", rect: [0.015, 0.44, 0.43, 0.545], text: "Average share of page 1 for brand keywords, general keywords and retailer categories, with how many products arrived on or fell off page 1 over the period." },
              { title: "Keyword by keyword", rect: [0.015, 0.64, 0.43, 0.86], text: "For each keyword: its Amazon search frequency rank, your average share of page 1 and of the top 5 spots. This is where you find high-value keywords with low share." },
              { title: "Get a clear view and prioritise", rect: [0.53, 0.18, 0.99, 0.42], text: "Use the tool to see paid and organic share of search performance by brand, and focus effort on terms where you already see high performance." },
              { title: "Optimise where share is low", rect: [0.53, 0.5, 0.99, 0.71], text: "Improve PDPs and paid keyword strategy on high-value keywords where share of search is low, lifting SEO ranking and paid impression share." },
            ],
          },
        ],
      },
    ],
  },
]
