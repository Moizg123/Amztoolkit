import type { Scorecard } from "./scorecards"

/*
 * Levers 2–6. Each bar is the practice as worded on that lever's own best-in-class
 * slide; areas follow the slide's numbered steps, then its ways-of-working strip.
 * These levers are processes rather than page counts, so `below` and `partial`
 * describe how much of the practice is in place, never an invented threshold.
 */

export const SOV_SCORECARD: Scorecard = {
  lever: "sov",
  title: "SOV & Discoverability scorecard",
  intro:
    "Best in class run offsite and onsite share of voice as one system, tracking both against targets. Rate how your market prioritises, measures, optimises and learns.",
  source: "Core slide 13",
  areas: [
    {
      number: 1,
      title: "Prioritize",
      criteria: [
        {
          id: "sov-journeys",
          metric: "Priority journeys, keywords and prompts",
          below: "No agreed list of priority keywords or AI prompts",
          partial: "Priority keywords listed, but not journeys or AI prompts",
          bar: "Priority journeys, keywords and prompts defined.",
          horizon: "Quick win",
        },
        {
          id: "sov-targets",
          metric: "Target visibility by term type",
          below: "No visibility targets set",
          partial: "One overall target, not split by term type",
          bar: "Target visibility set by term type.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 2,
      title: "Measure",
      criteria: [
        {
          id: "sov-track",
          metric: "Paid, organic and AI visibility",
          below: "Visibility not tracked, or ad hoc",
          partial: "Paid or organic tracked, but not all three",
          bar: "Paid, organic and AI visibility all tracked.",
          horizon: "Long term",
        },
        {
          id: "sov-competitors",
          metric: "Competitor and shelf changes",
          below: "Competitor moves noticed only after sales drop",
          partial: "Competitors checked occasionally, by hand",
          bar: "Competitor and shelf changes monitored.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 3,
      title: "Optimize",
      criteria: [
        {
          id: "sov-shift",
          metric: "Bids, budgets and content",
          below: "Bids and content set once and left",
          partial: "Bids adjusted, but content and budgets rarely move with visibility",
          bar: "Bids, budgets and content shifted in response to visibility.",
          horizon: "Quick win",
        },
        {
          id: "sov-opps",
          metric: "Ranking and competitor opportunities",
          below: "Opportunities not captured",
          partial: "Captured when spotted, with no routine",
          bar: "Ranking and competitor opportunities captured.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 4,
      title: "Learn",
      criteria: [
        {
          id: "sov-link-sales",
          metric: "Visibility linked to traffic, CVR and sales",
          below: "SOV reported on its own",
          partial: "Linked to traffic, but not through to CVR and sales",
          bar: "Visibility linked to traffic, CVR and sales.",
          horizon: "Long term",
        },
        {
          id: "sov-feedback",
          metric: "Learnings into priorities",
          below: "Priorities never revisited",
          partial: "Revisited, but not from what the tracking showed",
          bar: "Learnings fed back into priorities.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 5,
      title: "Ways of working",
      criteria: [
        {
          id: "sov-cadence",
          metric: "Cross-functional reporting cadence",
          below: "No shared SOV review",
          partial: "Reviewed within eCom only",
          bar: "Cross-functional reporting cadence, with SOV reporting linked to sales outcomes.",
          horizon: "Long term",
        },
        {
          id: "sov-triggers",
          metric: "Activation rules",
          below: "Every change is a manual judgement call",
          partial: "Rules exist informally, not written down",
          bar: "Trigger-based activation rules for optimisation.",
          horizon: "Long term",
        },
      ],
    },
  ],
}

export const PAID_SCORECARD: Scorecard = {
  lever: "paid",
  title: "Paid Activation scorecard",
  intro:
    "Best in class plan, execute and measure retail media as one connected funnel. Rate your market's budgeting, execution, measurement and ways of working.",
  source: "Core slide 19",
  areas: [
    {
      number: 1,
      title: "Budgeting & planning",
      criteria: [
        {
          id: "paid-allocate",
          metric: "Allocation by strategic role",
          below: "Budget follows last year's split",
          partial: "Some guardrails, but not by retailer, audience and funnel role",
          bar: "Allocated by strategic role and opportunity, with clear guardrails by retailer, audience and funnel role.",
          horizon: "Long term",
        },
        {
          id: "paid-plan-together",
          metric: "Retail and national media",
          below: "Planned separately",
          partial: "Shared calendar, but not one full-funnel plan",
          bar: "Retail and national media planned together: coordinated always-on and pulse activity, full funnel.",
          horizon: "Long term",
        },
        {
          id: "paid-flexible",
          metric: "Budget flexibility",
          below: "Budgets locked for the year",
          partial: "Reallocated by hand, quarterly or slower",
          bar: "Budgets kept flexible and reallocated quickly on performance and market changes, using automation.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 2,
      title: "Retail media execution",
      criteria: [
        {
          id: "paid-audiences",
          metric: "Targeting",
          below: "Keyword targeting only",
          partial: "Some 1P audiences tested",
          bar: "1P audiences used: beyond keywords into behavioural and purchase-based targeting.",
          horizon: "Long term",
        },
        {
          id: "paid-channel-mix",
          metric: "Channel mix",
          below: "Search, display and offsite run without defined jobs",
          partial: "Roles defined for some channels",
          bar: "Channel mix optimised to role: search, display and offsite each used for a defined job, e.g. awareness, traffic.",
          horizon: "Quick win",
        },
        {
          id: "paid-test-learn",
          metric: "Test and learn",
          below: "No experiments run",
          partial: "Tests run, but winners not scaled across brands",
          bar: "Structured test and learn: formal experiments with winning tactics scaled across brands.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 3,
      title: "Retail media measurement",
      criteria: [
        {
          id: "paid-kpis",
          metric: "Full-funnel KPIs",
          below: "Each team defines its own KPIs",
          partial: "Common definitions for conversion only",
          bar: "Full-funnel KPIs standardised: common definitions from reach through to conversion and ROI.",
          horizon: "Quick win",
        },
        {
          id: "paid-reporting",
          metric: "Performance reporting",
          below: "Built by hand per retailer",
          partial: "Automated for one retailer",
          bar: "Centralised performance reporting: an automated cross-customer dashboard.",
          horizon: "Long term",
        },
        {
          id: "paid-granular",
          metric: "Data used for decisions",
          below: "Account-level totals",
          partial: "Campaign level, not audience, placement or SKU",
          bar: "Granular data used for decisions: campaign, audience, placement and SKU-level insights.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 4,
      title: "Ways of working & governance",
      criteria: [
        {
          id: "paid-expertise",
          metric: "Understanding and expertise",
          below: "Retail media sits with one person or the agency",
          partial: "Expertise in eCom, little understanding elsewhere",
          bar: "Org-wide retail media understanding, with deep expertise in key roles.",
          horizon: "Long term",
        },
        {
          id: "paid-joint-planning",
          metric: "Joint planning",
          below: "eCom plans alone",
          partial: "Sales or Brand consulted, not planning jointly",
          bar: "Joint planning across Sales, Brand, eCom and Media, with agile agency and retailer collaboration.",
          horizon: "Long term",
        },
      ],
    },
  ],
}

export const PROMOS_SCORECARD: Scorecard = {
  lever: "promos",
  title: "Promotions & Tentpoles scorecard",
  intro:
    "Best in class run major events as integrated growth campaigns, not promo calendar moments. Rate your last major event from preparation to post-event measurement.",
  source: "Core slide 26",
  areas: [
    {
      number: 1,
      title: "Pre-event",
      criteria: [
        {
          id: "promo-priorities",
          metric: "ASIN priorities and inventory scenarios",
          below: "No agreed priority list",
          partial: "Priorities set in eCom, not agreed with leadership",
          bar: "ASIN priorities and inventory scenarios agreed with the leadership team.",
          horizon: "Quick win",
        },
        {
          id: "promo-upper-funnel",
          metric: "Upper-funnel media",
          below: "Media starts on event day",
          partial: "Starts early, but not focused on priority stock",
          bar: "Upper-funnel media starts on priority stock ahead of the event.",
          horizon: "Quick win",
        },
        {
          id: "promo-tradeoffs",
          metric: "Profit vs. visibility",
          below: "Discount depth set without modelling",
          partial: "Modelled for a few ASINs",
          bar: "Profit vs. visibility trade-offs modelled.",
          horizon: "Quick win",
        },
        {
          id: "promo-boundaries",
          metric: "KPIs and boundaries",
          below: "No agreed KPIs or limits",
          partial: "KPIs agreed, but no GM or breakeven ROAS limit",
          bar: "KPIs and boundaries signed off for GM and breakeven ROAS.",
          horizon: "Quick win",
        },
        {
          id: "promo-media-plan",
          metric: "Media plan",
          below: "Planned at brand or campaign level",
          partial: "Some ASINs planned individually",
          bar: "Media plan locked to ASIN level.",
          horizon: "Quick win",
        },
        {
          id: "promo-prealign",
          metric: "Creative, PDP and dashboard",
          below: "Prepared separately, close to the event",
          partial: "Some of the three aligned in advance",
          bar: "Creative, PDP and measurement dashboard pre-aligned with teams.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 2,
      title: "Live execution",
      criteria: [
        {
          id: "promo-live-tracking",
          metric: "Live tracking",
          below: "Results read after the event",
          partial: "Some metrics checked during the event, from several sources",
          bar: "Sales, Buy Box, SOV, CVR and ROAS tracked live from a single source of truth.",
          horizon: "Long term",
        },
        {
          id: "promo-alerts",
          metric: "Alerts",
          below: "No alerts",
          partial: "Manual checks for OOS or CPC",
          bar: "Automated OOS, CPC and SOV alerts trigger immediate budget and bid shifts.",
          horizon: "Long term",
        },
        {
          id: "promo-decisions",
          metric: "Decision cadence",
          below: "Decisions wait for whoever is available",
          partial: "Owners named, but no agreed windows or rules",
          bar: "Pre-agreed decision windows; named escalation owners act on golden rules.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 3,
      title: "Post-event",
      criteria: [
        {
          id: "promo-incrementality",
          metric: "Incrementality",
          below: "Event judged on sales during the event",
          partial: "Some AMC analysis, not new-to-brand, halo and incrementality",
          bar: "AMC measures new-to-brand, halo and incrementality ROAS, within days of close.",
          horizon: "Long term",
        },
        {
          id: "promo-learnings",
          metric: "Learnings",
          below: "Next event planned from scratch",
          partial: "A debrief happens, but does not shape the next plan",
          bar: "Learnings feed the next event.",
          horizon: "Long term",
        },
      ],
    },
  ],
}

export const PORTFOLIO_SCORECARD: Scorecard = {
  lever: "portfolio",
  title: "Portfolio scorecard",
  intro:
    "Best in class define the range channel-back and prove every change is incremental before it scales. Rate your market's range against the four steps.",
  source: "Core slide 31",
  areas: [
    {
      number: 1,
      title: "Define",
      criteria: [
        {
          id: "port-missions",
          metric: "Shopper missions",
          below: "Range inherited from the offline shelf",
          partial: "Missions discussed, not mapped to ASINs",
          bar: "Priority shopper missions mapped to ASINs.",
          horizon: "Quick win",
        },
        {
          id: "port-economics",
          metric: "Unit economics",
          below: "Not modelled per ASIN",
          partial: "Modelled to gross margin only",
          bar: "Unit economics modelled to net contribution.",
          horizon: "Quick win",
        },
        {
          id: "port-whitespace",
          metric: "Growth and whitespace",
          below: "Not sized",
          partial: "Sized for some categories",
          bar: "Growth potential and whitespace sized.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 2,
      title: "Design",
      criteria: [
        {
          id: "port-packs",
          metric: "Pack architecture",
          below: "Offline packs listed as they are",
          partial: "Some packs adapted for the channel",
          bar: "Pack architecture designed channel-back.",
          horizon: "Long term",
        },
        {
          id: "port-regulatory",
          metric: "Regulatory change control",
          below: "Handled as each change arises",
          partial: "Tracked, but outside the range roadmap",
          bar: "Regulatory change control built into the roadmap.",
          horizon: "Long term",
        },
        {
          id: "port-bundles",
          metric: "Multipacks and bundles",
          below: "No strategy",
          partial: "One strategy for every retailer",
          bar: "Multipack and bundle strategy set by retailer.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 3,
      title: "Decide",
      criteria: [
        {
          id: "port-signoff",
          metric: "Sign-off",
          below: "eCom decides alone",
          partial: "Two of brand, eComm and commercial involved",
          bar: "Joint brand, eComm and commercial sign-off.",
          horizon: "Quick win",
        },
        {
          id: "port-cadence",
          metric: "Add and exit decisions",
          below: "Made whenever someone raises one",
          partial: "Reviewed, but not on a fixed cadence",
          bar: "Add and exit decisions made on a fixed (quarterly) cadence, with a single range P&L owner.",
          horizon: "Quick win",
        },
        {
          id: "port-substitution",
          metric: "Exit screening",
          below: "Exits not screened",
          partial: "Screened for volume loss, not private-label substitution",
          bar: "Exits screened for private-label substitution risk.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 4,
      title: "Prove",
      criteria: [
        {
          id: "port-amc-test",
          metric: "Incrementality before scaling",
          below: "Changes scaled without a test",
          partial: "Tested, but not with AMC incrementality",
          bar: "AMC incrementality test before scaling.",
          horizon: "Long term",
        },
        {
          id: "port-share",
          metric: "Post-change share",
          below: "Not tracked after a change",
          partial: "Tracked at brand level",
          bar: "Post-change share tracked at ASIN level.",
          horizon: "Long term",
        },
        {
          id: "port-feedback",
          metric: "Learnings",
          below: "Not captured",
          partial: "Captured, not used in the next range review",
          bar: "Learnings feed back into range definition.",
          horizon: "Long term",
        },
      ],
    },
  ],
}

export const AVAILABILITY_SCORECARD: Scorecard = {
  lever: "availability",
  title: "Availability scorecard",
  intro:
    "Best in class protect hero ASINs and wire inventory signals into replenishment, promo and media. Availability is a commercial system, not a supply metric.",
  source: "Core slide 34",
  areas: [
    {
      number: 1,
      title: "Protect",
      criteria: [
        {
          id: "avail-heroes",
          metric: "Hero ASINs",
          below: "No hero list",
          partial: "Heroes named, but not ring-fenced",
          bar: "Hero ASINs defined and ring-fenced.",
          horizon: "Quick win",
        },
        {
          id: "avail-oos-target",
          metric: "OOS target",
          below: "No target",
          partial: "Target set, not tracked regularly",
          bar: "Near-zero OOS target set and tracked.",
          horizon: "Quick win",
        },
        {
          id: "avail-buy-box",
          metric: "Buy Box",
          below: "Not monitored",
          partial: "Checked weekly or less",
          bar: "Buy Box and lost Buy Box monitored daily.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 2,
      title: "Sense",
      criteria: [
        {
          id: "avail-signals",
          metric: "Inventory signals",
          below: "Replenishment runs separately from inventory data",
          partial: "Signals reviewed by hand before ordering",
          bar: "Inventory signals linked to replenishment.",
          horizon: "Long term",
        },
        {
          id: "avail-catalogue",
          metric: "Catalogue data",
          below: "Case pack, pallet and lot not checked",
          partial: "Some fields verified",
          bar: "Catalogue verified: case pack, pallet, lot.",
          horizon: "Quick win",
        },
        {
          id: "avail-date-codes",
          metric: "Date codes",
          below: "Not visible",
          partial: "Visible for some ASINs or FCs",
          bar: "Date codes visible in FC inventory.",
          horizon: "Long term",
        },
      ],
    },
    {
      number: 3,
      title: "Trigger",
      criteria: [
        {
          id: "avail-predictive",
          metric: "Alerts",
          below: "OOS found in after-the-fact reports",
          partial: "Some low-stock alerts",
          bar: "Predictive alerts, not after-the-fact reports.",
          horizon: "Long term",
        },
        {
          id: "avail-media-pause",
          metric: "Media on OOS ASINs",
          below: "Keeps running",
          partial: "Paused by hand when noticed",
          bar: "Media pauses automatically on OOS ASINs.",
          horizon: "Quick win",
        },
        {
          id: "avail-promo-gate",
          metric: "Promos and stock",
          below: "Promos booked without checking stock",
          partial: "Stock checked, but promos not gated on cover",
          bar: "Promo locked to confirmed stock cover.",
          horizon: "Quick win",
        },
      ],
    },
    {
      number: 4,
      title: "Measure",
      criteria: [
        {
          id: "avail-oos-cost",
          metric: "Cost of an OOS",
          below: "Not costed",
          partial: "Lost sales costed, not lost rank or wasted media",
          bar: "OOS costed at lost rank and wasted media.",
          horizon: "Quick win",
        },
        {
          id: "avail-expiry",
          metric: "Expiry write-off",
          below: "Not tracked",
          partial: "Tracked separately from OOS",
          bar: "Expiry write-off tracked alongside OOS.",
          horizon: "Long term",
        },
        {
          id: "avail-ownership",
          metric: "Ownership and cadence",
          below: "No named owner",
          partial: "Owner named, no weekly review",
          bar: "Named stock and media owner, with a weekly availability review.",
          horizon: "Quick win",
        },
      ],
    },
  ],
}
