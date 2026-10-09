import type { Lesson } from "./types"

/** Module 1, built from short deck slides 6-11. */

export const PDP_STANDARDS = {
  caption: "PDP standards: what good looks like on Amazon vs. local retailers",
  columns: ["Area", "Metric", "Amazon", "Local retailers"],
  rows: [
    ["Product title", "SEO words tied to top category keywords", "Strong SEO words leveraging the country’s keyword database, at least 10 keywords", "Strong SEO words leveraging the country’s keyword database, at least 10 keywords"],
    ["Product title", "Length (characters)", "75 characters + 125 characters for item highlights", "Approx. 69 characters for highest content score"],
    ["Product description", "Number of bullets", "5 bullet points in ‘about this item’ using strong SEO words", "5 bullet points explaining benefits; keywords not weighted in search"],
    ["Product description", "Average characters per bullet", "150+ characters per bullet", "150+ characters per bullet"],
    ["Product description", "SEO words tied to top category keywords", "Strong SEO words (>10) from the country’s keyword database", "Strong SEO words (>10) from the country’s keyword database"],
    ["Product description", "Overall characters", "≥1,500 characters optimised towards SEO", "Up to 1,500 characters; keywords not weighted in search"],
    ["Ratings & reviews", "5-point rating", "Average rating above 4", "Average rating above 4"],
    ["Ratings & reviews", "Number of ratings / reviews", "500+ reviews", "500+ reviews"],
    ["FAQs", "FAQs present", "Text (not image) FAQs answering common shopper questions, helping LLMs interpret product usage", "Not applicable"],
    ["Media", "Number of photos", ">5 photos and video in A+ content", "10-15 is best practice depending on category"],
    ["Media", "Picture quality", "Products shown clearly with different benefits, optimised for mobile", "Products shown clearly with different benefits; desktop toggle for some categories"],
    ["Media", "Video / animation", "Video or 360-degree animation present", "Video or 360-degree animation present"],
    ["Configurations", "Number of configurations", ">3 sizes or variations available", ">3 sizes or variations available"],
    ["Subscribe & Save", "Subscribe & Save", "Eligible and active, with relevant discount displayed to drive repeat purchase", "Active, with relevant discount displayed to drive repeat purchase"],
    ["From the brand", "Comparison table", "Present, comparing similar products across ranges", "If available, comparing similar products across ranges"],
    ["From the brand", "Photos", ">5 photos within brand page", ">5 photos within brand page"],
    ["From the brand", "Number of characters", ">1,500 characters in the brand store using top SEO keywords", "Where available, >1,500 characters using top SEO keywords"],
    ["From the brand", "A+ content", "Benefit-led header, lifestyle imagery, ingredient / claim callout, usage instructions and brand story", "Not applicable"],
  ],
  footnote: "Not exhaustive.",
}

export const pdpLessons: Lesson[] = [
  {
    slug: "pdp-management-process",
    title: "The PDP management process",
    summary: "A five-step cycle where shelf signals feed back into content.",
    minutes: 4,
    source: { core: [6] },
    steps: [
      {
        title: "Quality that compounds",
        blocks: [
          {
            type: "lead",
            text: "Best in class teams feed digital-shelf signals back into content creation, so quality compounds over time.",
          },
          {
            type: "text",
            text: "The process is a loop, not a launch checklist. Select a step, on the cards or on the slide, to see what happens at each stage and which tools support it.",
          },
          {
            type: "figure",
            src: "/toolkit/pdp-cycle.webp",
            alt: "PDP and content management cycle: define, create, validate, publish and monitor, optimise and learn, around PDP content, with the supporting tools for each step",
            width: 1800,
            height: 721,
            slide: 6,
            caption: "PDP management process",
            numbered: true,
            loopNote: "Step 5 feeds learnings back into step 1",
            items: [
              { title: "Define", rect: [0.39, 0.04, 0.9, 0.31], text: "Set retailer and category content standards and priority search terms; identify shopper needs, search insights and AI-readiness requirements. Different retailers require tailored creatives based on customer profiles." },
              { title: "Create", rect: [0.6, 0.33, 0.96, 0.63], text: "Develop PDP content features to meet algorithm standards, assisted by AI tools such as Azoma and Sitation." },
              { title: "Validate", rect: [0.6, 0.67, 0.97, 0.95], text: "Pre-test content for retailer compliance, search and algorithm fit, visual effectiveness, claims accuracy and AI-readiness, for example with Vizit." },
              { title: "Publish & monitor", rect: [0.04, 0.68, 0.36, 0.98], text: "Syndicate content, then continuously monitor PDP quality, content drift, reviews, competitor changes and digital-shelf performance, with tools like Salsify, Profitero and Adobe Experience Manager." },
              { title: "Optimise & learn", rect: [0.04, 0.29, 0.37, 0.63], text: "Use CTR, CVR, search rank, reviews and AI-search signals to prioritise changes, test variants and feed learnings back into content creation." },
            ],
          },
        ],
      },
      {
        title: "What makes the loop run",
        blocks: [
          {
            type: "cards",
            columns: 4,
            items: [
              { title: "A+ Manager", text: "Builds and maintains the rich content modules on each page." },
              { title: "Regular PDP audit / refresh", text: "Pages are reviewed on a cadence, not only at launch." },
              { title: "Central to local adaptation", text: "A central standard, adapted to each market’s retailers and shoppers." },
              { title: "Cross-functional ownership", text: "Content, media and eCom teams share the PDP, not one team alone." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "quality-score",
    title: "Why PDP content drives ad rank",
    summary: "How retail media networks score relevance, and what it buys you.",
    minutes: 3,
    source: { core: [7] },
    steps: [
      {
        title: "The quality score",
        blocks: [
          {
            type: "lead",
            text: "Relevant PDP content contributes to higher ad ranking in both organic and paid retail media.",
          },
          {
            type: "text",
            text: "A retail media network’s quality score measures how your ad quality compares to other advertisers. Select an input to see how it works.",
          },
          { type: "interactive", key: "quality-score" },
          {
            type: "callout",
            label: "Why it matters",
            text: "PDP relevancy also improves organic search rank and placements, so the same content work pays off twice.",
          },
        ],
      },
    ],
  },
  {
    slug: "pdp-standards",
    title: "PDP standards",
    summary: "What good looks like, metric by metric, and how your page scores.",
    minutes: 5,
    source: { core: [8] },
    steps: [
      {
        title: "The standards",
        blocks: [
          {
            type: "lead",
            text: "Optimising PDPs maximises organic search rank and conversion on retail media platforms.",
          },
          { type: "table", groupColumn: true, ...PDP_STANDARDS },
        ],
      },
      {
        title: "Score a page",
        blocks: [
          {
            type: "text",
            text: "Pick one of your hero ASINs and tick each Amazon standard it meets today. The gap is your list of fixes.",
          },
          { type: "interactive", key: "pdp-scorer" },
        ],
      },
      {
        title: "Build a title",
        blocks: [
          {
            type: "text",
            text: "Titles carry the most weighted keywords on the page. Use the format below and stay inside the Amazon character limit.",
          },
          { type: "interactive", key: "title-builder" },
        ],
      },
    ],
  },
  {
    slug: "brand-store",
    title: "The brand store",
    summary: "Findability and a short path to purchase across the range.",
    minutes: 3,
    source: { core: [9] },
    steps: [
      {
        title: "What good looks like",
        blocks: [
          {
            type: "lead",
            text: "Optimising the brand store improves product findability and minimises friction in the path to purchase.",
          },
          {
            type: "figure",
            src: "/toolkit/brand-store.webp",
            alt: "Brand store standards table for navigation, media and user experience, beside an example Claritin brand store",
            width: 1800,
            height: 781,
            slide: 9,
            caption: "Brand store, with the Claritin store as the example",
            items: [
              { title: "Navigation", rect: [0.044, 0.055, 0.581, 0.505], text: "A brand byline link on every relevant product, a clear layout that holds shoppers for more than 30 seconds, obvious product categories and a short path to purchase." },
              { title: "Media", rect: [0.044, 0.5, 0.581, 0.773], text: "Spotlight the range your marketing is pushing, use more than five photos plus video in a text-based, LLM-crawlable format, and vary the tiles across pages." },
              { title: "User experience", rect: [0.044, 0.77, 0.581, 0.975], text: "Similar dwell times on mobile and desktop, and a store updated in step with marketing campaigns." },
              { title: "The example store", rect: [0.67, 0.04, 0.93, 1], text: "The numbers on the Claritin store mark where each area shows up: a clear banner and navigation, spotlight tiles for the range, and products one click from the cart." },
            ],
          },
        ],
      },
      {
        title: "The full standard",
        blocks: [
          {
            type: "table",
            caption: "Brand store: what good looks like",
            groupColumn: true,
            columns: ["Area", "Metric", "What good looks like"],
            rows: [
              ["Navigation", "Brand byline", "Link to the brand store features in the brand byline across relevant products"],
              ["Navigation", "Navigation layout", "Clear, user-friendly layout that encourages a dwell time of more than 30 seconds"],
              ["Navigation", "Product categorisation", "Clear differentiation between product offerings on the front page, so shoppers find relevant products easily"],
              ["Navigation", "Path to purchase", "A clear path to purchase that encourages a high order / visit rate"],
              ["Media", "Spotlight range", "Promote the range currently showcased across marketing activity"],
              ["Media", "Photos & videos", ">5 photos and a video element where possible, in text-based format optimised for LLM crawlability"],
              ["Media", "Brand store tiles", "Use various brand store tiles across pages to drive high engagement"],
              ["User experience", "Device", "Positive experience across mobile and desktop, shown by similar dwell times"],
              ["User experience", "Regularly updated", "Update the brand store consistently to align with marketing campaigns"],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "ratings-reviews",
    title: "Ratings & reviews",
    summary: "Four steps best in class CPGs use to manage reviews actively.",
    minutes: 3,
    source: { core: [10] },
    steps: [
      {
        title: "Four steps",
        blocks: [
          {
            type: "lead",
            text: "Best in class CPGs actively manage ratings and reviews across channels through four steps.",
          },
          {
            type: "figure",
            src: "/toolkit/reviews-cycle.webp",
            alt: "Active ratings and review management cycle: incentivise, engage, follow up, monitor",
            width: 1800,
            height: 770,
            slide: 10,
            caption: "Optimise ratings & reviews",
            numbered: true,
            loopNote: "Monitoring feeds the next round of incentives",
            items: [
              { title: "Incentivise", rect: [0.65, 0.24, 0.92, 0.49], text: "Offer promotions, discounts and similar to encourage trial and build purchase momentum." },
              { title: "Engage", rect: [0.65, 0.64, 0.92, 0.97], text: "Encourage consumers to share experiences by reaching out through touchpoints like post-purchase emails, social media and product packaging." },
              { title: "Follow up", rect: [0.11, 0.64, 0.34, 0.97], text: "Send timely reminders after purchase, prompting customers to leave feedback and keeping the momentum." },
              { title: "Monitor", rect: [0.11, 0.19, 0.34, 0.52], text: "Regularly track and analyse reviews to identify trends, address concerns and respond to customer feedback, improving overall brand perception." },
            ],
          },
          {
            type: "callout",
            label: "Benchmark",
            text: "The PDP standard is an average rating above 4 and 500+ ratings or reviews.",
          },
        ],
      },
    ],
  },
  {
    slug: "profitero",
    title: "Finding opportunities with Profitero",
    summary: "Use compliance scores to decide which PDPs to fix first.",
    minutes: 2,
    source: { core: [11] },
    steps: [
      {
        title: "The product content tool",
        blocks: [
          {
            type: "lead",
            text: "Profitero can identify PDP optimisation opportunities on Amazon.",
          },
          {
            type: "figure",
            src: "/toolkit/profitero-pdp.webp",
            alt: "Profitero product content tool: compliance score dashboard, products with issues, and a by-product checklist of expected versus actual content",
            width: 1800,
            height: 791,
            slide: 11,
            caption: "Profitero product content tool",
            numbered: true,
            items: [
              { title: "See every PDP at once", rect: [0.012, 0.14, 0.288, 0.45], text: "Get a clear overview of all PDPs, by brand and retailer, with their improvement potential (the ‘compliance score’) and flags for critical issues." },
              { title: "Prioritise", rect: [0.288, 0.15, 0.468, 0.44], text: "Dive into the products with issues and focus effort on the PDPs with the highest optimisation opportunity, based on those scores." },
              { title: "Fix page by page", rect: [0.017, 0.465, 0.47, 0.96], text: "Use Profitero’s by-product checklist, expected versus actual content by retailer, to optimise each PDP efficiently and strategically." },
            ],
          },
          {
            type: "callout",
            label: "Why use it",
            text: "Profitero consolidates cross-retailer data into a single view of PDP improvement opportunities.",
          },
        ],
      },
    ],
  },
  {
    slug: "practise",
    title: "Practise: fix the page",
    summary: "Match PDP issues to fixes, then make three calls.",
    minutes: 5,
    source: { core: [6, 8, 10, 11] },
    steps: [
      {
        title: "Match the issue to the fix",
        blocks: [
          {
            type: "text",
            text: "Each card describes a problem found on a PDP. Choose the fix the toolkit points to.",
          },
          { type: "interactive", key: "issue-sort" },
        ],
      },
    ],
  },
]
