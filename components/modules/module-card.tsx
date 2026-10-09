"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { isBuilt, moduleHref } from "@/lib/content/modules"
import type { ModuleContent } from "@/lib/content/types"
import { lessonKey, useHydrated, useProgress } from "@/lib/progress"
import { cn } from "@/lib/utils"

export function ModuleCard({ module: m }: { module: ModuleContent }) {
  const hydrated = useHydrated()
  const { completedLessons } = useProgress()
  const built = isBuilt(m)
  const total = m.lessons?.length ?? 0
  const done = (m.lessons ?? []).filter((l) => completedLessons.includes(lessonKey(m.slug, l.slug))).length
  const featured = m.slug === "introduction"

  return (
    <Link
      href={moduleHref(m.slug)}
      className={cn(
        "group flex w-full flex-col justify-between gap-10 rounded-3xl p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5",
        featured ? "bg-navy text-primary-foreground" : "bg-mist",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "font-display text-6xl font-extrabold leading-none",
            featured ? "text-bayer-blue" : "text-navy/15",
          )}
        >
          {m.number}
        </span>
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45",
            featured ? "bg-background text-foreground" : "bg-navy text-primary-foreground",
          )}
          aria-hidden
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-balance text-2xl font-bold">{m.title}</h3>
        <p className={cn("line-clamp-3 text-pretty text-sm leading-relaxed", featured ? "text-primary-foreground/85" : "text-muted-foreground")}>
          {m.objective}
        </p>
        <div className="flex items-center gap-3 pt-2 text-sm font-semibold">
          {built ? (
            <>
              <span
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-current/15"
                role="progressbar"
                aria-label={`${m.title} progress`}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={hydrated ? done : 0}
              >
                <span
                  className="block h-full rounded-full bg-bayer-green transition-[width] duration-700"
                  style={{ width: `${hydrated ? (done / total) * 100 : 0}%` }}
                />
              </span>
              <span>{hydrated ? `${done} of ${total} topics` : `${total} topics`}</span>
            </>
          ) : (
            <span className={cn("rounded-full border px-3 py-1 text-xs", featured ? "border-primary-foreground/30" : "border-navy/20")}>
              Topics coming next · objectives available
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
