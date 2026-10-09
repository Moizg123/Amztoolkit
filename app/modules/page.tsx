import type { Metadata } from "next"
import { Reveal, RevealWords } from "@/components/motion/reveal"
import { ModuleCard } from "@/components/modules/module-card"
import { MODULES } from "@/lib/content/modules"

export const metadata: Metadata = { title: "Modules — Bayer Amazon Toolkit" }

export default function ModulesPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 pb-10 pt-12 md:px-8 md:pt-20">
      <div className="flex max-w-3xl flex-col gap-5">
        <h1 className="text-balance text-5xl font-extrabold leading-[0.95] md:text-7xl">
          <RevealWords text="Every lever, in order." />
        </h1>
        <Reveal delay={0.3}>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Start with the flywheel, then work through any lever. Each topic takes a few
            minutes and cites the toolkit slide it comes from.
          </p>
        </Reveal>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m, i) => (
          <li key={m.slug} className="flex">
            <Reveal delay={(i % 3) * 0.08} className="flex w-full">
              <ModuleCard module={m} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
