import type { Lesson } from "./types"

/** Module 3, built from core deck slides 19-24. */

export const paidLessons: Lesson[] = [
  {
    slug: "one-connected-funnel",
    title: "Retail media as one connected funnel",
    summary: "Budgeting, execution and measurement planned together, not as siloed campaigns.",
    minutes: 3,
    source: { core: [19] },
    steps: [
      {
        title: "Three parts, one system",
        blocks: [
          {
            type: "lead",
            text: "Best in class teams plan, execute and measure retail media as one connected funnel.",
          },
          {
            type: "figure",
            src: "/toolkit/paid-bic.webp",
            alt: "Paid activation best in class: budgeting and planning, retail media execution and measurement, with tooling and ways of working",
            width: 1800,
            height: 828,
            slide: 19,
            caption: "Paid activation best in class",
            items: [
              { title: "Budgeting and planning", rect: [0.006, 0.02, 0.322, 0.478], text: "Allocate by strategic role and opportunity, with clear guardrails by retailer, audience and funnel role. Plan retail and national media together, coordinating always-on and pulse activity. Keep budgets flexible, reallocating quickly on performance and market changes using automation." },
              { title: "Retail media execution", rect: [0.339, 0.02, 0.655, 0.478], text: "Use 1P audiences, going beyond keywords into behavioural and purchase-based targeting. Give search, display and offsite each a defined job, such as awareness or traffic. Run structured test and learn: formal experiments, with winning tactics scaled across brands." },
              { title: "Retail media measurement", rect: [0.671, 0.02, 0.987, 0.478], text: "Standardise full funnel KPIs, with common definitions from reach through to conversion and ROI. Centralise performance reporting in an automated cross-customer dashboard. Use campaign, audience, placement and SKU level data for decisions." },
              { title: "PDPs come first", rect: [0.006, 0.486, 0.987, 0.566], text: "Best in class PDPs and content are required to maximise the impact of paid activation. Paid traffic sent to a weak page is wasted spend." },
              { title: "Tooling required", rect: [0.006, 0.572, 0.987, 0.886], text: "Budget planning, tracking and reallocation in Shopperations. Campaign optimisation in Skai, with digital shelf monitoring in Profitero. An aggregated performance dashboard built in Skai and Power BI." },
              { title: "Ways of working and governance", rect: [0.006, 0.89, 0.987, 0.998], text: "Org-wide retail media understanding, deep expertise in key roles, joint planning across Sales, Brand, eCom and Media, and agile collaboration with agencies and retailers." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "five-campaign-considerations",
    title: "Five campaign considerations",
    summary: "From target ACoS to continuous bid optimisation.",
    minutes: 4,
    source: { core: [20] },
    steps: [
      {
        title: "Build campaigns that work",
        blocks: [
          {
            type: "text",
            text: "Five considerations make Amazon Ads campaigns successful. Select each in turn.",
          },
          {
            type: "figure",
            src: "/toolkit/paid-considerations.webp",
            alt: "Five key considerations for Amazon Ads campaigns: set targets, build architecture, set bids and budgets, target keywords, optimise bids",
            width: 1800,
            height: 828,
            slide: 20,
            caption: "Five key considerations",
            numbered: true,
            items: [
              { title: "Set informed targets", rect: [0.005, 0.03, 0.2, 0.69], text: "Set target ACoS / ROAS from margin, not gut feel, by brand, campaign type, audience and targeting." },
              { title: "Build the campaign architecture", rect: [0.204, 0.03, 0.398, 0.69], text: "Structure as Category > Brand > Product > Objective > Ad format > Targeting. Use single-ASIN campaigns with a branded, non-branded and competitor split." },
              { title: "Set bids and budgets", rect: [0.403, 0.03, 0.597, 0.69], text: "Prioritise budget on hero ASINs. Calculate starting bids from ACoS targets and use dynamic allocation. Use Amazon Marketing Cloud to optimise beyond ROAS." },
              { title: "Target keywords precisely", rect: [0.602, 0.03, 0.796, 0.69], text: "Use manual targeting for proven terms and auto to find new ones. Harvest high-volume, profitable keywords. Cut unprofitable terms through negative keyword lists, reviewed weekly." },
              { title: "Optimise bids continuously", rect: [0.8, 0.03, 0.995, 0.69], text: "Set bids per keyword to hit target ACoS and impression share, using automated rules with bid floors and ceilings." },
            ],
          },
          {
            type: "callout",
            label: "Definitions",
            text: "ACoS is advertising cost of sale: ad spend divided by ad sales. ROAS is return on ad spend: 1 divided by ACoS. Share targets come from SoV & Discoverability.",
          },
        ],
      },
    ],
  },
  {
    slug: "full-funnel-and-amc",
    title: "Full funnel and Amazon Marketing Cloud",
    summary: "Who to target at each stage, and how AMC measures what ads actually caused.",
    minutes: 5,
    source: { core: [21, 22] },
    steps: [
      {
        title: "Four stages of the funnel",
        blocks: [
          {
            type: "lead",
            text: "A full funnel approach is essential to maximise incremental sales on Amazon.",
          },
          {
            type: "figure",
            src: "/toolkit/paid-funnel.webp",
            alt: "Full funnel: awareness, consideration, conversion and loyalty, with ad formats, targets, KPIs and AMC measurement for each",
            width: 1800,
            height: 828,
            slide: 22,
            caption: "Full funnel approach",
            numbered: true,
            items: [
              { title: "Awareness", rect: [0.12, 0.0, 0.335, 1.0], text: "Reach shoppers who do not know Bayer, with Sponsored TV, streaming TV and DSP video. Target category shoppers who have never bought from you. Track reach, frequency, branded search lift and new-to-brand share. Use lift studies to prove incrementality." },
              { title: "Consideration", rect: [0.335, 0.0, 0.555, 1.0], text: "Get onto the shortlist with Sponsored Brands video and Sponsored Display contextual targeting, aimed at shoppers viewing your category or competitor pages. Track page views, CTR and add-to-cart. Cap frequency to avoid cannibalisation." },
              { title: "Conversion", rect: [0.555, 0.0, 0.775, 1.0], text: "Win the sale with Sponsored Products and Sponsored Brands on keywords, aimed at high-intent searchers and cart abandoners. Track iROAS, ROAS, CVR and share of search vs. target. Branded spend may take sales already earned, so align it with benchmark." },
              { title: "Loyalty", rect: [0.775, 0.0, 1.0, 1.0], text: "Get repeat purchases from past buyers due to repurchase (e.g. before allergy season) with Sponsored Display and DSP remarketing, Brand Store and Subscribe & Save. Track repeat rate, LTV and S&S sign-ups. Retargeting recent buyers too early wastes spend." },
            ],
          },
        ],
      },
      {
        title: "What AMC adds",
        blocks: [
          {
            type: "text",
            text: "The Ads console tells you how each campaign performed. Amazon Marketing Cloud answers how your advertising actually affected shoppers, so you can optimise against incremental sales and lifetime value rather than last click.",
          },
          {
            type: "table",
            caption: "What AMC can measure",
            columns: ["Question", "What AMC can measure", "Use it to"],
            rows: [
              ["Who are our shoppers?", "Audience profile; share of new-to-brand buyers by campaign; overlap with our other brands and competitors", "Target the segments that convert best; build retargeting audiences and bid boosts"],
              ["How do they get to purchase?", "Path to purchase across ad formats; days from first ad to purchase; ad views needed to convert", "Rebalance budget across ad formats; set frequency caps to stop wasted impressions"],
              ["What are they worth?", "Lifetime value from up to 5 years of purchase data; repeat rate; other Bayer products bought", "Set ACoS targets on LTV, not just the first order; bid more for high-LTV groups"],
              ["Did our ads cause the sale?", "Incremental sales vs. similar unexposed shoppers; branded search lift; halo on other ASINs", "Scale what is incremental and cut what is not; prove new packs and range changes before rolling out"],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "optimising-paid-search",
    title: "Optimising paid search",
    summary: "Dayparting, harvesting, bids and budget, with the rules and the owners.",
    minutes: 6,
    source: { core: [23, 24] },
    steps: [
      {
        title: "Four optimisation levers",
        blocks: [
          {
            type: "lead",
            text: "Optimising paid search is essential to drive down ACoS and maximise efficiency.",
          },
          {
            type: "table",
            caption: "Optimisation levers",
            columns: ["Lever", "Rules", "Targets", "Cadence"],
            rows: [
              ["Dayparting: spend when shoppers convert", "Never cap branded campaigns; cap only hours where ROAS is below target; test pre/post before fixing the schedule", "Zero high-value campaigns out of budget before peak hours; peak-hour ROAS above account average", "Rules run daily; re-test quarterly"],
              ["Keyword harvesting: turn discovered terms into profitable targets", "Harvest terms converting at or better than target ACoS; negate terms with clicks above threshold and no orders; negate brand terms in non-brand campaigns", "~80% of spend on manual, ~20% on auto once mature; wasted spend trending down", "Weekly"],
              ["Bids: hit target ACoS and share of search", "Below target ACoS raise the bid; above, lower it 5–10%; at target, hold. Never pause: lower the bid instead. Ceiling: max CPC = AOV × target ACoS × CVR", "ROAS: branded >5, non-branded 2–3, competitor >1. Paid share: branded 90–100%, non-branded 40–50%, competitor 10–25%", "Rules run daily; review weekly; reset targets quarterly"],
              ["Budget: put spend where it earns most", "More budget to campaigns beating target ACoS, less where above; decide only with 10+ conversions (ideally 30+); high-value campaigns never run out", "By keyword type ~10–15% branded, ~85–90% non-branded incl. competitor; by format ~85% Sponsored Products, ~15% Sponsored Brands", "Pacing daily; redistribute monthly"],
            ],
            footnote: "Trade-offs: dayparting gives up some cheap off-peak reach; over-harvesting narrows discovery; fast bid steps may overshoot; budget rules can starve launches of data, so keep a small test budget.",
          },
        ],
      },
      {
        title: "Work out a bid",
        blocks: [
          {
            type: "text",
            text: "Enter a keyword’s numbers to get its bid ceiling and the move the rules call for.",
          },
          { type: "interactive", key: "bid-calculator" },
        ],
      },
      {
        title: "Who does what",
        blocks: [
          {
            type: "table",
            caption: "Paid search ways of working",
            columns: ["Task", "Lead", "Support", "Output"],
            rows: [
              ["Set targets and budget: target ACoS by brand and campaign type; monthly budget from search volume and seasonality", "Amazon media lead", "Finance, e-KAM", "Target sheet; monthly budget"],
              ["Build and refresh campaigns: single-ASIN campaigns per keyword group; proven auto terms moved to manual", "Agency", "Amazon media lead", "Campaign structure"],
              ["Refresh keywords and negatives: weekly search term report; top terms shared with the e-KAM for PDPs", "Agency", "e-KAM", "Keyword and negative lists"],
              ["Set and automate bids: bid rules with floors and ceilings; media lead approves target changes", "Agency", "Amazon media lead", "Live bid rules"],
              ["Monitor pacing: daily checks, dayparting, flag campaigns running out of budget", "Agency", "", "Pacing log"],
              ["Monthly optimisation review: 90–180 day trends, ACoS vs. target, single-ASIN performance; reallocate budget", "Amazon media lead", "Agency, media analyst", "Monthly optimisation report"],
              ["Plan peaks and tests: KAMs share event plans; media lead sets peak budgets; analyst designs pre/post tests", "Amazon media lead", "Country KAMs, media analyst", "Event plan; test read-out"],
            ],
            footnote: "Roles to be validated with stakeholders.",
          },
        ],
      },
    ],
  },
]
