"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { moduleHref, moduleBySlug } from "@/lib/content/modules"
import { buildPlan } from "@/lib/content/assessment"
import {
  ANSWER_OF,
  BANDS,
  LEVEL_META,
  LEVEL_OF,
  SCORECARDS,
  criteriaOf,
  scoreCriteria,
} from "@/lib/content/scorecards"
import type { LeverId } from "@/lib/content/types"
import { setAssessment, useHydrated, useProgress } from "@/lib/progress"
import { Reveal } from "@/components/motion/reveal"
import { AreaTag, MaturityTrack, StatePicker } from "./maturity"

export function LeverScorecard({ lever }: { lever: LeverId }) {
  const card = SCORECARDS[lever]!
  const mod = moduleBySlug(lever)!
  const p = useProgress()
  const hydrated = useHydrated()
  const overall = scoreCriteria(criteriaOf(card), p.assessment)
  const gaps = buildPlan(p).filter((i) => i.lever === lever).length

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-14 px-5 pb-16 pt-10 md:px-8 md:pt-16">
      <Reveal>
        <header className="flex flex-col gap-5">
          <Link href="/my-market" className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-navy">
            <ArrowLeft className="size-4" /> My market
          </Link>
          <p className="text-sm font-semibold uppercase tracking-wider text-bayer-blue">
            Lever {mod.number} · {card.source}
          </p>
          <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.98] md:text-6xl">{card.title}</h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{card.intro}</p>
        </header>
      </Reveal>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <ol className="flex flex-col gap-6">
          {card.areas.map((area) => {
            const s = scoreCriteria(area.criteria, p.assessment)
            return (
              <li key={area.number} className="rounded-[2rem] bg-mist p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-navy font-display text-sm font-extrabold text-primary-foreground">
                      {area.number}
                    </span>
                    <h2 className="text-2xl font-extrabold">{area.title}</h2>
                  </div>
                  {hydrated && <AreaTag score={s} />}
                </div>
                <div className="flex flex-col">
                  {area.criteria.map((c) => {
                    const a = p.assessment[c.id]
                    return (
                      <div key={c.id} className="flex flex-col gap-3 border-t border-navy/10 py-5 last:pb-0">
                        <p className="text-pretty font-semibold leading-snug">{c.metric}</p>
                        <StatePicker
                          criterion={c}
                          value={a ? LEVEL_OF[a] : undefined}
                          onChange={(l) => setAssessment(c.id, ANSWER_OF[l])}
                        />
                      </div>
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ol>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="flex flex-col gap-6 rounded-[2rem] bg-navy p-7 text-primary-foreground">
            <p className="text-sm font-semibold uppercase tracking-wider text-bayer-green">{mod.title} maturity</p>
            <MaturityTrack score={overall} hydrated={hydrated} inverse />
          </div>

          <div className="flex flex-col gap-4 rounded-[2rem] border p-7">
            <h2 className="text-lg font-extrabold">How it scores</h2>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Pick the state each metric is in today. Each answer earns points:
            </p>
            <dl className="flex flex-col gap-2 text-sm">
              {(["run", "walk", "crawl"] as const).map((l) => (
                <div key={l} className="flex justify-between gap-4">
                  <dt className="font-semibold">{LEVEL_META[l].option}</dt>
                  <dd className="text-muted-foreground tabular-nums">{LEVEL_META[l].points} pts</dd>
                </div>
              ))}
            </dl>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Every metric weighs the same, out of {criteriaOf(card).length * LEVEL_META.run.points} points. The lever&apos;s level comes from the total: {BANDS.runFrom}+ is Run, {BANDS.walkFrom}–{BANDS.runFrom - 1} is Walk, below {BANDS.walkFrom} is Crawl.
            </p>
          </div>

          {hydrated && (
            <div className="flex flex-col gap-3 px-2">
              <Link href="/my-market#plan-h" className="flex w-fit items-center gap-1.5 font-semibold hover:underline">
                {gaps === 0 ? "View your action plan" : `${gaps} ${gaps === 1 ? "gap" : "gaps"} in your action plan`}
                <ArrowRight className="size-4" />
              </Link>
              <Link href={moduleHref(lever)} className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-navy">
                Learn how in Module {mod.number} <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
