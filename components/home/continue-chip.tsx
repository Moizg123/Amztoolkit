"use client"

import Link from "next/link"
import { MODULES } from "@/lib/content/modules"
import { lessonKey, useHydrated, useProgress } from "@/lib/progress"

/** Appears only for a returning learner, pointing at the first lesson not yet done. */
export function ContinueChip() {
  const hydrated = useHydrated()
  const { completedLessons } = useProgress()
  if (!hydrated || completedLessons.length === 0) return null

  for (const m of MODULES) {
    for (const l of m.lessons ?? []) {
      if (!completedLessons.includes(lessonKey(m.slug, l.slug))) {
        return (
          <Link
            href={`/modules/${m.slug}/${l.slug}`}
            className="text-sm font-semibold underline decoration-bayer-blue decoration-2 underline-offset-4"
          >
            Continue: {l.title}
          </Link>
        )
      }
    }
  }
  return <span className="text-sm font-semibold">All available topics complete</span>
}
