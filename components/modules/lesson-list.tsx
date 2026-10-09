"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import type { Lesson } from "@/lib/content/types"
import { lessonKey, useHydrated, useProgress } from "@/lib/progress"
import { cn } from "@/lib/utils"

export function LessonList({ moduleSlug, lessons }: { moduleSlug: string; lessons: Lesson[] }) {
  const hydrated = useHydrated()
  const { completedLessons } = useProgress()
  return (
    <ol className="flex flex-col">
      {lessons.map((l, i) => {
        const done = hydrated && completedLessons.includes(lessonKey(moduleSlug, l.slug))
        return (
          <li key={l.slug} className="border-t last:border-b">
            <Link
              href={`/modules/${moduleSlug}/${l.slug}`}
              className="group flex items-center gap-5 py-5 transition-colors hover:bg-mist md:px-3"
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full font-display font-bold transition-colors",
                  done ? "bg-bayer-green text-navy" : "bg-mist group-hover:bg-background",
                )}
              >
                {done ? <Check className="size-5" aria-label="Complete" /> : i + 1}
              </span>
              <span className="flex flex-1 flex-col gap-1">
                <span className="text-lg font-semibold">{l.title}</span>
                <span className="text-pretty text-sm leading-relaxed text-muted-foreground">{l.summary}</span>
              </span>
              <span className="hidden shrink-0 text-sm text-muted-foreground sm:block">{l.minutes} min</span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
