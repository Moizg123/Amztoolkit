import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LessonPlayer } from "@/components/lesson/lesson-player"
import { MODULES, moduleBySlug } from "@/lib/content/modules"
import { SCORECARDS } from "@/lib/content/scorecards"
import type { LeverId } from "@/lib/content/types"

export function generateStaticParams() {
  return MODULES.flatMap((m) => (m.lessons ?? []).map((l) => ({ slug: m.slug, lesson: l.slug })))
}

async function resolve(params: Promise<{ slug: string; lesson: string }>) {
  const { slug, lesson } = await params
  const m = moduleBySlug(slug)
  const index = m?.lessons?.findIndex((l) => l.slug === lesson) ?? -1
  return m && index >= 0 ? { m, index } : null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>
}): Promise<Metadata> {
  const r = await resolve(params)
  return { title: r ? `${r.m.lessons![r.index].title} — ${r.m.title}` : "Topic not found" }
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const r = await resolve(params)
  if (!r) notFound()
  const lessons = r.m.lessons!
  const next = lessons[r.index + 1]
  return (
    <LessonPlayer
      key={lessons[r.index].slug}
      moduleSlug={r.m.slug}
      moduleTitle={r.m.title}
      moduleNumber={r.m.number}
      lesson={lessons[r.index]}
      position={{ index: r.index, total: lessons.length }}
      next={next ? { slug: next.slug, title: next.title } : null}
      assessHref={SCORECARDS[r.m.slug as LeverId] ? `/my-market/${r.m.slug}` : "/my-market"}
    />
  )
}
