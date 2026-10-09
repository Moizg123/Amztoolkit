import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Reveal, RevealWords } from "@/components/motion/reveal"
import { LessonList } from "@/components/modules/lesson-list"
import { MODULES, isBuilt, moduleBySlug } from "@/lib/content/modules"

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = moduleBySlug((await params).slug)
  return { title: m ? `${m.title} — Bayer Amazon Toolkit` : "Module not found" }
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const m = moduleBySlug((await params).slug)
  if (!m) notFound()
  const built = isBuilt(m)
  const next = MODULES[m.number + 1]

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 pt-10 md:px-8 md:pt-16">
      <Link href="/modules" className="flex w-fit items-center gap-2 text-sm font-semibold hover:underline">
        <ArrowLeft className="size-4" /> All modules
      </Link>

      <header className="flex flex-col gap-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {m.number === 0 ? "Module 0 · Start here" : `Module ${m.number} · Lever ${m.number} of 6`}
        </p>
        <h1 className="max-w-5xl text-balance text-5xl font-extrabold leading-[0.95] md:text-7xl">
          <RevealWords text={m.title} />
        </h1>
        <Reveal delay={0.3}>
          <p className="max-w-3xl text-pretty text-lg leading-relaxed md:text-xl">{m.objective}</p>
        </Reveal>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Topics</h2>
          {built ? (
            <LessonList moduleSlug={m.slug} lessons={m.lessons!} />
          ) : (
            <div className="flex flex-col gap-3 rounded-3xl border border-dashed p-8">
              <p className="font-semibold">Topics for this lever are coming in the next build.</p>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Until then, the objective, what best in class looks like, and the toolkit’s quick
                wins and long-term builds are all here, taken from the core deck.
              </p>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-3xl bg-navy p-7 text-primary-foreground">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-bayer-blue">What best in class looks like</h2>
            <p className="text-pretty leading-relaxed">{m.bestInClass}</p>
          </div>
          {m.quickWins.length > 0 && (
            <div className="flex flex-col gap-4 rounded-3xl bg-mist p-7">
              <h2 className="text-sm font-semibold uppercase tracking-wider">Quick wins</h2>
              <ul className="flex flex-col gap-3">
                {m.quickWins.map((q) => (
                  <li key={q} className="flex gap-3 text-pretty leading-relaxed">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-bayer-green" aria-hidden />
                    {q}
                  </li>
                ))}
              </ul>
              <h2 className="pt-2 text-sm font-semibold uppercase tracking-wider">Long-term builds</h2>
              <ul className="flex flex-col gap-3">
                {m.longTerm.map((q) => (
                  <li key={q} className="flex gap-3 text-pretty leading-relaxed">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-bayer-blue" aria-hidden />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Source: core deck, slides {m.source.core.join(", ")}</p>
        </Reveal>
      </div>

      {m.number > 0 && (
        <Link
          href={`/my-market/${m.slug}`}
          className="group flex flex-col gap-3 rounded-3xl bg-navy p-8 text-primary-foreground md:flex-row md:items-center md:justify-between"
        >
          <span className="flex flex-col gap-1">
            <span className="text-sm font-semibold uppercase tracking-wider text-bayer-blue">After the topics</span>
            <span className="text-pretty leading-relaxed text-primary-foreground/80">
              Score your market against best in class for this lever.
            </span>
          </span>
          <span className="font-display text-2xl font-bold transition-transform group-hover:translate-x-1 md:text-3xl">
            Assess your market →
          </span>
        </Link>
      )}

      {next && (
        <Link
          href={`/modules/${next.slug}`}
          className="group flex items-center justify-between gap-4 rounded-3xl border px-8 py-5 transition-colors hover:bg-mist"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Next module</span>
          <span className="font-semibold transition-transform group-hover:translate-x-1">
            {next.number} · {next.title} →
          </span>
        </Link>
      )}
    </div>
  )
}
