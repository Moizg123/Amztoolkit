"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LEVERS } from "@/lib/content/modules"
import { buildPlan } from "@/lib/content/assessment"
import { SCORECARDS, criteriaOf, scoreCriteria } from "@/lib/content/scorecards"
import { isSaved, useHydrated, useProgress } from "@/lib/progress"
import { LevelBadge, MaturityTrack } from "./maturity"
import { ActionCard } from "./action-card"
import { LeverGroup } from "./lever-group"
import { ProgressTracker } from "./progress-tracker"
import { SizeOfPrize } from "./size-of-prize"
import { sizeMarket } from "@/lib/content/uplift"
import { Reveal } from "@/components/motion/reveal"

export function MarketWorkspace() {
  const p = useProgress()
  const hydrated = useHydrated()
  const plan = buildPlan(p)
  const sizing = sizeMarket(p)
  const cards = LEVERS.flatMap((lever) => {
    const card = SCORECARDS[lever.slug]
    return card ? [{ lever, card, score: scoreCriteria(criteriaOf(card), p.assessment) }] : []
  })
  const anyRated = cards.some((c) => c.score.rated > 0)
  const criteria = Object.values(SCORECARDS).flatMap((c) => (c ? criteriaOf(c) : []))

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-5 pb-10 pt-12 md:px-8 md:pt-20">
      <Reveal>
        <header className="flex flex-col gap-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-bayer-blue">My market</p>
          <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.98] md:text-7xl">
            How close is your market to best in class?
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Score one market lever by lever against the bar the toolkit sets. Each lever is its own scorecard and comes out Crawl, Walk or Run. Every metric short of best in class becomes an action you can own, date and track. Answers stay on this device.
          </p>
        </header>
      </Reveal>

      <section className="flex flex-col gap-8" aria-labelledby="lev-h">
        <div className="flex flex-col gap-3">
          <p className="font-display text-sm font-bold text-bayer-blue">01</p>
          <h2 id="lev-h" className="text-3xl font-extrabold">Lever scorecards</h2>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            One scorecard per lever, in deck order. A lever you have not scored is not assessed, which is not the same as scoring zero.
          </p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ lever, card, score }) => {
            const start = lever.slug === "pdp" && !anyRated
            return (
              <li key={lever.slug} className="flex">
                <Link
                  href={`/my-market/${lever.slug}`}
                  className={`group flex w-full flex-col gap-4 rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-0.5 ${
                    start ? "bg-navy text-primary-foreground" : "bg-mist"
                  }`}
                >
  <div className="flex flex-col gap-1">
  <div className="flex items-start justify-between gap-3">
  <p className={`text-xs font-bold ${start ? "text-bayer-green" : "text-bayer-blue"}`}>
  Lever {lever.number}
  {start && " · Start here"}
  </p>
  <LevelBadge score={score} hydrated={hydrated} inverse={start} />
  </div>
                    <h3 className="text-balance text-lg font-extrabold leading-snug">{lever.title}</h3>
                    <p className={`text-xs ${start ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                      {criteriaOf(card).length} metrics · {card.areas.length} areas
                    </p>
                  </div>
                  <MaturityTrack score={score} hydrated={hydrated} inverse={start} size="xs" />
                  <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold">
                    {score.rated === 0 ? "Start this scorecard" : score.pct === null ? "Continue this scorecard" : "Review this scorecard"}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="flex scroll-mt-24 flex-col gap-8" aria-labelledby="prize-h" id="prize">
        <div className="flex flex-col gap-3">
          <p className="font-display text-sm font-bold text-bayer-blue">02</p>
          <h2 id="prize-h" className="text-3xl font-extrabold">Size of prize</h2>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Enter your brands and their Amazon net sales. Each scored lever is sized from the 5-year benchmark and how far your market is
            from best in class. The larger prizes set the impact of the actions below.
          </p>
        </div>
        {!hydrated ? <div className="h-40 animate-pulse rounded-[2rem] bg-mist" /> : <SizeOfPrize p={p} sizing={sizing} />}
      </section>

      <section className="flex flex-col gap-8" aria-labelledby="plan-h">
        <div className="flex flex-col gap-3">
          <p className="font-display text-sm font-bold text-bayer-blue">03</p>
          <h2 id="plan-h" className="text-3xl font-extrabold">Action plan</h2>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Built from every metric short of best in class, quick wins first. Give each gap an owner, a target date and how far it should move, then save it to the tracker.
          </p>
        </div>
        {!hydrated ? (
          <div className="h-32 animate-pulse rounded-[2rem] bg-mist" />
        ) : plan.length === 0 ? (
          <div className="flex flex-col items-start gap-3 rounded-[2rem] bg-navy p-8 text-primary-foreground">
            <p className="text-pretty text-xl font-semibold">
              {anyRated
                ? "Every scored metric is best in class. No gaps to act on."
                : "Nothing scored yet, so there is nothing to plan."}
            </p>
            <p className="text-primary-foreground/75">Score any lever above to build your plan.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {LEVERS.flatMap((lever) => {
              const items = plan.filter((it) => it.lever === lever.slug)
              if (items.length === 0) return []
              return [
                <LeverGroup
                  key={lever.slug}
                  id={lever.slug}
                  number={lever.number}
                  title={lever.title}
                  gaps={items.length}
                  quickWins={items.filter((it) => it.horizon === "Quick win").length}
                  saved={items.filter((it) => isSaved(p.plan[it.id])).length}
                >
                  {items.map((item, i) => (
                    <ActionCard
                      key={item.id}
                      item={item}
                      index={i}
                      criterion={criteria.find((c) => c.id === item.id)}
                      current={p.assessment[item.id]}
                      edit={p.plan[item.id]}
                      sizing={sizing}
                      currency={p.currency ?? "EUR"}
                    />
                  ))}
                </LeverGroup>,
              ]
            })}
          </ul>
        )}
      </section>

      <section className="flex scroll-mt-24 flex-col gap-8" aria-labelledby="tracker-h" id="tracker">
        <div className="flex flex-col gap-3">
          <p className="font-display text-sm font-bold text-bayer-blue">04</p>
          <h2 id="tracker-h" className="scroll-mt-24 text-3xl font-extrabold">Progress tracker</h2>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Every saved action, grouped by impact and effort so the easy, high-impact work comes first. Move each one along as the work happens.
            Saved on this device only until the app has a shared data layer.
          </p>
        </div>
        {!hydrated ? (
          <div className="h-40 animate-pulse rounded-[2rem] bg-mist" />
        ) : (
          <ProgressTracker p={p} sizing={sizing} gapsUnsaved={plan.filter((it) => !isSaved(p.plan[it.id])).length} />
        )}
      </section>
    </div>
  )
}
