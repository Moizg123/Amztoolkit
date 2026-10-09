import type { Lesson } from "./types"

/** Module 4, built from core deck slides 26-29. */

export const promosLessons: Lesson[] = [
  {
    slug: "integrated-growth-campaigns",
    title: "Events as integrated growth campaigns",
    summary: "Pre-event, live execution and post-event measurement tied together.",
    minutes: 3,
    source: { core: [26] },
    steps: [
      {
        title: "Not promo calendar moments",
        blocks: [
          {
            type: "lead",
            text: "Best in class teams run major events as integrated growth campaigns: demand built pre-event, inventory, media and offer synchronised, performance optimised intraday in a war room, and incrementality and halo measured afterwards.",
          },
          {
            type: "figure",
            src: "/toolkit/promos-bic.webp",
            alt: "Promotions and tentpoles best in class: pre-event, live execution and tooling",
            width: 1800,
            height: 828,
            slide: 26,
            caption: "Promotions and tentpoles best in class",
            items: [
              { title: "Pre-event: stock", rect: [0.01, 0.105, 0.318, 0.38], text: "Clear product priorities and a detailed ASIN-level plan, with best, medium and worst-case scenarios. ASIN priorities and inventory scenarios are agreed with leadership, and upper funnel media starts on priority stock." },
              { title: "Pre-event: pricing strategy", rect: [0.328, 0.105, 0.672, 0.38], text: "Profit vs. visibility trade-offs are modelled, and KPIs and boundaries are signed off for gross margin and breakeven ROAS." },
              { title: "Pre-event: media and content", rect: [0.673, 0.105, 0.983, 0.38], text: "The media plan is locked to ASIN level. Creative, PDP and the measurement dashboard are pre-aligned with teams." },
              { title: "Command centre", rect: [0.01, 0.436, 0.242, 0.69], text: "Live execution is agile and ASIN level. Sales, buy box, SoV, CVR and ROAS are tracked live from a single source of truth." },
              { title: "Live optimisation", rect: [0.258, 0.436, 0.489, 0.69], text: "Automated OOS, CPC and SoV alerts trigger immediate budget and bid shifts." },
              { title: "Decision cadence", rect: [0.504, 0.436, 0.735, 0.69], text: "Pre-agreed decision windows, with named escalation owners acting on golden rules." },
              { title: "Post event", rect: [0.751, 0.436, 0.983, 0.69], text: "Full incrementality is measured within days of close: AMC measures new-to-brand, halo and incrementality ROAS, and learnings feed the next event." },
              { title: "Tooling required", rect: [0.008, 0.7, 0.98, 0.998], text: "Digital shelf and retail execution in Profitero and 9 Solutions. Media activation and optimisation in Amazon Ads Console and Skai. Measurement and incrementality in Neustar, Amazon Marketing Cloud and LiftLab." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "hundred-day-plan",
    title: "The 100-day pre-event plan",
    summary: "Four interlinked preparation phases, from stock to execution.",
    minutes: 5,
    source: { core: [27] },
    steps: [
      {
        title: "Four phases",
        blocks: [
          {
            type: "text",
            text: "Preparation starts three months out. Each phase answers one question and hands its deliverables to the next. Select a phase.",
          },
          {
            type: "figure",
            src: "/toolkit/promos-100-days.webp",
            alt: "100 days pre-event action plan: stock, pricing strategy, media plan and content, execution",
            width: 1800,
            height: 828,
            slide: 27,
            caption: "100 days pre-event action plan",
            numbered: true,
            items: [
              { title: "Stock · 3 months out", rect: [0.058, 0.02, 0.243, 0.93], text: "What do we want to sell, and what will be available? Analyse category trends (Amazon sales, CTR, CVR, offline sales), report production risks, run inventory / demand scenarios shared with leadership, and activate upper funnel media for prioritised stock. Outcome: clear product priorities and inventory visibility." },
              { title: "Pricing strategy", rect: [0.255, 0.02, 0.438, 0.93], text: "What is our strategic mandate? Write a strategy-by-ASIN brief (max profit vs. volume vs. visibility), prepare sales scenarios for different pricing tactics, calculate gross margin and breakeven ROAS, estimate a budget range per pricing strategy and agree primary and secondary KPIs with boundaries. Outcome: a high-level best / medium / worst-case plan." },
              { title: "Media plan and content · 1–2 months out", rect: [0.452, 0.02, 0.803, 0.93], text: "What is each team doing, and is everyone aligned? Media plan for leadership review with budget allocation by ASIN, targeting and ad type; final campaign structure; creative and PDP updates (video, images, A+); report dashboards as one source of truth; alignment with non-eCom marketing; a budget shift protocol with golden rules; a prelaunch checklist and RACI. Outcome: a detailed ASIN-level plan." },
              { title: "Execution · throughout the event", rect: [0.825, 0.02, 0.995, 0.93], text: "Is everyone doing their part? Log optimisations and share learnings, communicate OOS status with clear ownership, track pricing and IGM updates, monitor competitors with a next-step protocol, and keep fixed reporting and decision times (e.g. 5am or 11pm). Outcome: agile execution by ASIN." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "strategy-by-sku-tier",
    title: "Event strategy by SKU tier",
    summary: "Hero, new, clearance and support SKUs each get a different objective and budget.",
    minutes: 4,
    source: { core: [28] },
    steps: [
      {
        title: "One event, four strategies",
        blocks: [
          {
            type: "lead",
            text: "Drive impact on event days by aligning each SKU tier to a business goal. Select a tier.",
          },
          { type: "interactive", key: "event-strategy" },
        ],
      },
    ],
  },
  {
    slug: "profit-volume-visibility",
    title: "Profit, volume or visibility",
    summary: "How optimisation changes with the objective, and what each one trades off.",
    minutes: 4,
    source: { core: [29] },
    steps: [
      {
        title: "Three approaches",
        blocks: [
          {
            type: "table",
            caption: "Optimisation approaches by business objective",
            columns: ["Objective", "Primary KPIs", "Pre-event", "On the day", "Trade-offs"],
            rows: [
              ["Maximise visibility (own the most valuable ad placements)", "Top of search impression share; ROAS tracked at breakeven", "Manual, ASIN-focused campaigns on the highest-value keywords; top of search bid adjustments; prioritise SP and SB; refresh headline and A+; high daily budgets", "Live-monitor impression share; raise bids if competitors overtake; adjust placement multipliers on SoV loss; use bulk sheets or APIs", "Sales spike at lower ROAS; possible halo in post-event organic rank; risk if that uplift does not materialise"],
              ["Maximise profitability (preserve ROAS at the expense of volume)", "ROAS / ACoS (target based)", "Tighten assortment to best-selling, high-margin products; limit targeting to proven high-ROAS terms; set bid caps; optimise PDPs; pause low-ROAS thin-margin campaigns", "Monitor ROAS live and reduce bids if efficiency drops; cap budgets and daypart to peak hours; dynamic bidding down only; suppress auto campaigns", "Lower volume, higher ROAS; may miss competitive traffic and halo; market share and new-to-brand decline"],
              ["Drive volume (maximise revenue at the expense of ROAS)", "Units sold; product COGS", "Broader match types; raise budgets and remove caps; prioritise high-stock and clearance SKUs; deal badges, coupons and discounts; expand Sponsored Display and video", "Bid up on high-CVR keywords; shift spend away from OOS risk; optimise for CTR and sales, ignoring short-term ROAS drops; lean into auto campaigns", "Sales spike at lower or even negative ROAS; gain share and offload inventory; risk if post-event organic uplift does not materialise"],
            ],
          },
        ],
      },
    ],
  },
]
