import type { Lesson } from "./types"

/** Module 6, built from core deck slides 34-37. */

export const availabilityLessons: Lesson[] = [
  {
    slug: "commercial-system",
    title: "Availability is a commercial system",
    summary: "Protect hero ASINs and wire inventory signals into replenishment, promo and media.",
    minutes: 4,
    source: { core: [34] },
    steps: [
      {
        title: "Not a supply metric",
        blocks: [
          {
            type: "lead",
            text: "Availability is a commercial system, not a supply metric: hero ASINs are protected and inventory signals are wired into replenishment, promo and media.",
          },
          {
            type: "figure",
            src: "/toolkit/availability-bic.webp",
            alt: "Hero ASIN availability from protected selection to priced consequence: protect, sense, trigger and measure",
            width: 1800,
            height: 828,
            slide: 34,
            caption: "Availability best in class",
            numbered: true,
            loopNote: "Learnings from Measure feed the next seasonal build",
            items: [
              { title: "Protect", rect: [0.02, 0.21, 0.248, 0.71], text: "Define and ring-fence hero ASINs, set and track a near-zero OOS target, and monitor buy box and lost buy box daily, with Profitero." },
              { title: "Sense", rect: [0.26, 0.21, 0.49, 0.71], text: "Link inventory signals to replenishment, verify catalogue data (case pack, pallet, lot) and keep date codes visible in FC inventory, with 9 Solutions and Vendor Central." },
              { title: "Trigger", rect: [0.502, 0.21, 0.73, 0.71], text: "Use predictive alerts, not after-the-fact reports. Media pauses automatically on OOS ASINs and promos are locked to confirmed stock cover, with Skai and GreyScout." },
              { title: "Measure", rect: [0.742, 0.21, 0.971, 0.71], text: "Cost every OOS at lost rank and wasted media, track expiry write-offs alongside, and feed learnings into the next seasonal build, with Power BI." },
            ],
          },
          {
            type: "cards",
            columns: 3,
            items: [
              { title: "Named stock and media owner", text: "One owner across inventory and spend, so a stock signal reaches media." },
              { title: "Weekly availability review", text: "A fixed cadence to act on every amber and red hero ASIN." },
              { title: "Promo gated on stock cover", text: "No promotion runs on stock that is not confirmed." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "four-steps-and-oos-cost",
    title: "Four steps, and what an out-of-stock costs",
    summary: "Who owns each step, which tools they use, and the four costs of a hero ASIN going out of stock.",
    minutes: 4,
    source: { core: [35] },
    steps: [
      {
        title: "Protect, sense, trigger, measure",
        blocks: [
          {
            type: "figure",
            src: "/toolkit/availability-steps.webp",
            alt: "Four steps to protect availability with key actions, owner and tools, and what an out-of-stock on a hero ASIN costs",
            width: 1800,
            height: 828,
            slide: 35,
            caption: "Four steps protect availability",
            numbered: true,
            items: [
              { title: "Protect: which ASINs must never go out of stock?", rect: [0.088, 0.01, 0.229, 0.967], text: "Define and ring-fence hero ASINs; monitor buy box and CRaP-outs; act on 3P sellers. Owner: e-KAM. Tool: Profitero." },
              { title: "Sense: will we have the right stock at the right time?", rect: [0.231, 0.01, 0.361, 0.967], text: "Forecast Amazon demand every 4 weeks; confirm POs, never cut; verify catalogue data. Owners: demand planner, customer service. Tools: TPN, SAP, Vendor Central." },
              { title: "Trigger: how do we respond?", rect: [0.363, 0.01, 0.496, 0.967], text: "Alert on forecast weeks of cover; cap or pause media; gate promos on confirmed cover. Owners: Amazon media lead, e-KAM. Tools: Skai, GreyScout." },
              { title: "Measure: what did each OOS cost?", rect: [0.498, 0.01, 0.633, 0.967], text: "Cost each OOS; track expiry write-offs; run the seasonal pre-build and exit. Owners: e-KAM, supply chain. Tool: Power BI." },
            ],
          },
        ],
      },
      {
        title: "The cost touches every lever",
        blocks: [
          {
            type: "text",
            text: "An out-of-stock on a hero ASIN is not only a lost sale. It damages three other levers of the flywheel.",
          },
          {
            type: "cards",
            columns: 4,
            items: [
              { title: "Lost sale", text: "The shopper buys a competitor or is supplied by an alternate seller. Hits sales and conversion." },
              { title: "Lost buy box", text: "Amazon’s offer drops out and 3P sellers take the buy box, with a delay before recovery. Hits brand control and sales." },
              { title: "Lost organic rank", text: "Sales velocity falls, so rank drops and takes weeks to rebuild after restock. Hits SoV & Discoverability." },
              { title: "Wasted media and promos", text: "Ads run on an ASIN nobody can buy and promo slots are burnt. Hits Paid Activation." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "weekly-availability-cycle",
    title: "The weekly availability cycle",
    summary: "Seven tasks, from daily buy box alerts to the monthly cost of OOS.",
    minutes: 4,
    source: { core: [36] },
    steps: [
      {
        title: "Who does what, and when",
        blocks: [
          {
            type: "lead",
            text: "The weekly cycle uses Profitero to automate buy box tracking, so the team spends its time on decisions.",
          },
          {
            type: "table",
            caption: "Weekly availability cycle",
            columns: ["Task", "Objective", "Lead", "Support", "Output"],
            rows: [
              ["1. Check buy box and CRaP flags (daily)", "Catch lost buy box, 3P sellers and profitability issues early; agency flags ASINs no longer eligible for ads", "e-KAM", "Agency", "Flag list"],
              ["2. Update the forecast", "Keep forecasts in line with Amazon order patterns; full order-frequency review every 4 weeks", "Demand planner", "e-KAM", "Updated forecast"],
              ["3. Confirm and track POs", "Deliver every PO in full and on time; never cut; flag chargeback risk", "Customer service", "Supply chain", "PO tracker"],
              ["4. Check stock cover", "Know weeks of cover for every hero ASIN, rated green, amber or red; verify case pack, pallet, lot and date codes", "Supply chain", "Demand planner", "Cover tracker"],
              ["5. Apply media and promo rules", "Stop spending on stock that is not there: cap amber, pause red, restart on restock; pull red ASINs from promotions", "Amazon media lead", "e-KAM", "Changes logged"],
              ["6. Weekly availability review", "A 30-minute review on every amber and red hero ASIN: expedite, reallocate, pause or de-list; escalate CRaP cases", "e-KAM", "Supply chain, demand planner, media lead", "Action log"],
              ["7. Cost OOS (monthly)", "Show the commercial cost of availability gaps; learnings reset safety stock and the next seasonal build", "e-KAM", "Supply chain, analyst", "Monthly report"],
            ],
            footnote: "Step 1 checked daily, step 7 monthly. Roles and timings to be validated.",
          },
        ],
      },
    ],
  },
  {
    slug: "cost-every-oos",
    title: "Cost every out-of-stock",
    summary: "Put a number on each gap and feed it into the next seasonal build.",
    minutes: 5,
    source: { core: [37] },
    steps: [
      {
        title: "Step by step",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Cost each out-of-stock", text: "Lost sales plus lost rank plus wasted media, tracked monthly in Power BI." },
              { title: "Track expiry write-offs alongside", text: "Too little stock causes OOS and too much causes write-offs, so set safety stock on both. Check date codes to catch short-dated stock early." },
              { title: "Run the seasonal pre-build and exit", text: "Build ahead of the season (e.g. allergy) on hero ASINs and run stock down before the season ends." },
              { title: "Feed learnings forward", text: "The cost of OOS and write-offs resets safety stock targets and the next seasonal build." },
            ],
          },
        ],
      },
      {
        title: "Cost one",
        blocks: [
          {
            type: "text",
            text: "Lost sales are the pre-OOS daily run rate × days out of stock × price. Wasted media is the ad spend on the ASIN while it was unavailable. Lost rank is measured in places and days to recover.",
          },
          { type: "interactive", key: "oos-cost" },
        ],
      },
      {
        title: "The seasonal cycle",
        blocks: [
          {
            type: "cards",
            columns: 3,
            items: [
              { title: "Pre-build", text: "Stock built ahead of the season on hero ASINs." },
              { title: "In season", text: "Weekly cover checks, with triggers on amber and red." },
              { title: "Exit", text: "Stock run down before season end to avoid write-offs." },
            ],
          },
        ],
      },
    ],
  },
]
