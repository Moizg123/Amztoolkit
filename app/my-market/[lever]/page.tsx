import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SCORECARDS } from "@/lib/content/scorecards"
import type { LeverId } from "@/lib/content/types"
import { LeverScorecard } from "@/components/assessment/lever-scorecard"

export function generateStaticParams() {
  return Object.keys(SCORECARDS).map((lever) => ({ lever }))
}

export async function generateMetadata({ params }: { params: Promise<{ lever: string }> }): Promise<Metadata> {
  const { lever } = await params
  const card = SCORECARDS[lever as LeverId]
  return { title: card ? `${card.title} · My market` : "My market" }
}

export default async function Page({ params }: { params: Promise<{ lever: string }> }) {
  const { lever } = await params
  if (!SCORECARDS[lever as LeverId]) notFound()
  return <LeverScorecard lever={lever as LeverId} />
}
