import type { Metadata } from "next"
import { MarketWorkspace } from "@/components/assessment/market-workspace"

export const metadata: Metadata = {
  title: "My market — Bayer Amazon Toolkit",
  description: "Assess your market against the prerequisites and lever standards, then turn the gaps into an action plan.",
}

export default function MyMarketPage() {
  return <MarketWorkspace />
}
