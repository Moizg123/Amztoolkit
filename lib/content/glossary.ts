/*
 * Draft definitions for toolkit owner sign-off. Standard Amazon / retail media
 * meanings, written market-agnostic and for a 1P (vendor) model.
 */
export type Term = { term: string; full?: string; definition: string }

export const GLOSSARY: Term[] = [
  { term: "1P / 3P", full: "First party / third party", definition: "1P: the brand sells to Amazon as a vendor and Amazon sells to the shopper. 3P: a seller lists directly on the marketplace. All Bayer markets in this toolkit are 1P." },
  { term: "A+ content", definition: "Enhanced brand content below the fold of a PDP: comparison tables, lifestyle imagery, claims and brand story. Text-based formatting keeps it readable by search and LLMs." },
  { term: "ACoS", full: "Advertising cost of sales", definition: "Ad spend divided by the sales those ads generated. Lower is more efficient." },
  { term: "AMC", full: "Amazon Marketing Cloud", definition: "A clean-room analytics environment for measuring incrementality, halo and path to purchase across Amazon media." },
  { term: "ASIN", full: "Amazon Standard Identification Number", definition: "The unique identifier Amazon gives each product listing." },
  { term: "Brand store", definition: "A multi-page, branded storefront on Amazon that groups the range and links from the brand byline on each PDP." },
  { term: "BSR", full: "Best Sellers Rank", definition: "Amazon’s sales-based rank for a product within its category." },
  { term: "Buy box", definition: "The ‘Add to basket’ box on a PDP. The offer that holds it wins almost all of the sales on that page." },
  { term: "CPC", full: "Cost per click", definition: "What an advertiser pays each time a shopper clicks an ad. Higher quality scores lower it." },
  { term: "CRaP-out", full: "Can’t realise a profit", definition: "When Amazon judges an ASIN unprofitable for itself to sell, and may stop ordering or delist it." },
  { term: "CTR", full: "Click-through rate", definition: "Clicks divided by impressions. A higher CTR signals relevance to the retail media network." },
  { term: "CVR", full: "Conversion rate", definition: "Orders divided by page visits or clicks." },
  { term: "Digital shelf", definition: "Everything a shopper sees when finding and choosing a product online: search results, PDP, reviews, price and availability." },
  { term: "DSP", full: "Demand-side platform", definition: "Amazon’s programmatic display and video buying platform, on and off Amazon." },
  { term: "iROAS", full: "Incremental ROAS", definition: "Return on ad spend counting only sales that would not have happened without the ad." },
  { term: "NTB", full: "New to brand", definition: "Shoppers buying from the brand for the first time in a set look-back period." },
  { term: "OOS", full: "Out of stock", definition: "An ASIN with no available inventory. It loses sales, rank and media efficiency at once." },
  { term: "PDP", full: "Product detail page", definition: "The page for a single product: title, images, bullets, description, A+ content, reviews and the buy box." },
  { term: "Quality score", definition: "A retail media network’s measure of how your ad quality compares to other advertisers, built from keyword relevance, PDP relevance, CTR and CVR." },
  { term: "RMN", full: "Retail media network", definition: "A retailer’s own advertising platform, such as Amazon Ads." },
  { term: "ROAS", full: "Return on ad spend", definition: "Sales generated per unit of ad spend. The inverse of ACoS." },
  { term: "SoV", full: "Share of voice", definition: "The share of visible positions a brand holds for a set of search terms, paid and organic." },
  { term: "Subscribe & Save", definition: "Amazon’s repeat-delivery programme, with a discount shown on the PDP to drive repeat purchase." },
  { term: "TACoS", full: "Total advertising cost of sales", definition: "Ad spend divided by total sales, paid and organic." },
]
