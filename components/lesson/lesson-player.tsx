"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"
import type { Lesson } from "@/lib/content/types"
import { completeLesson } from "@/lib/progress"
import { EASE } from "@/components/motion/reveal"
import { BlockView } from "./blocks"
import { cn } from "@/lib/utils"

export function LessonPlayer({
  moduleSlug,
  moduleTitle,
  moduleNumber,
  lesson,
  position,
  next,
  assessHref,
}: {
  moduleSlug: string
  moduleTitle: string
  moduleNumber: number
  lesson: Lesson
  position: { index: number; total: number }
  next: { slug: string; title: string } | null
  assessHref: string
}) {
  const scored = assessHref !== "/my-market"
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [finished, setFinished] = useState(false)
  const total = lesson.steps.length
  const current = lesson.steps[step]
  const isLast = step === total - 1

  function go(to: number) {
    setDir(to > step ? 1 : -1)
    setStep(to)
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  function finish() {
    completeLesson(moduleSlug, lesson.slug)
    setFinished(true)
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  const moduleHref = `/modules/${moduleSlug}`

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 pt-6 md:px-8 md:pt-10">
      <div className="flex items-center justify-between gap-4">
        <Link href={moduleHref} className="flex min-w-0 items-center gap-2 text-sm font-semibold hover:underline">
          <X className="size-4 shrink-0" />
          <span className="truncate">
            Module {moduleNumber} · {moduleTitle}
          </span>
        </Link>
        <span className="shrink-0 text-sm text-muted-foreground">
              Topic {position.index + 1} of {position.total}
        </span>
      </div>

      <div className="flex gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={finished ? total : step + 1} aria-label="Topic progress">
        {lesson.steps.map((s, i) => (
          <div key={s.title} className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist">
            <motion.div
              className="h-full rounded-full bg-navy"
              initial={false}
              animate={{ width: finished || i < step ? "100%" : i === step ? "50%" : "0%" }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        {finished ? (
          <motion.section
            key="done"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-start gap-6 rounded-[2rem] bg-navy p-8 text-primary-foreground md:p-14"
          >
            <motion.span
              initial={reduce ? false : { scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
              className="flex size-16 items-center justify-center rounded-full bg-bayer-green text-navy"
            >
              <Check className="size-8" strokeWidth={3} />
            </motion.span>
            <h1 className="text-balance text-4xl font-extrabold leading-tight md:text-6xl">
              {next ? "Topic complete" : "Module complete"}
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/85">
              {next
                ? `${lesson.title} is marked done on this device.`
                : scored
                  ? `That was the last topic in ${moduleTitle}. Now score your market against the same best-in-class bar to see where your gaps are.`
                  : `That was the last topic in ${moduleTitle}. Now assess your market lever by lever.`}{" "}
              Source: core deck, slide{lesson.source.core.length > 1 ? "s" : ""} {lesson.source.core.join(", ")}.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {next ? (
                <Link
                  href={`${moduleHref}/${next.slug}`}
                  className="flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3.5 font-semibold text-navy transition-transform hover:scale-[1.03]"
                >
                  Next: {next.title} <ArrowRight className="size-4" />
                </Link>
              ) : (
                <Link
                  href={assessHref}
                  className="flex items-center gap-2 rounded-full bg-bayer-green px-6 py-3.5 font-semibold text-navy transition-transform hover:scale-[1.03]"
                >
                  {scored ? `Assess your market: ${moduleTitle}` : "Assess your market"} <ArrowRight className="size-4" />
                </Link>
              )}
              <Link
                href={moduleHref}
                className="rounded-full border border-primary-foreground/30 px-6 py-3.5 font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                Back to module
              </Link>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key={step}
            custom={dir}
            initial={reduce ? false : { opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex flex-col gap-8"
          >
            <header className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {lesson.title} · Step {step + 1} of {total}
              </p>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.02] md:text-6xl">{current.title}</h1>
            </header>
            <div className="flex flex-col gap-7">
              {current.blocks.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {!finished && (
        <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-full border bg-background/85 p-2 shadow-lg backdrop-blur-xl">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition-colors hover:bg-mist disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          <span className="hidden text-sm text-muted-foreground sm:block">
            Core deck, slide{lesson.source.core.length > 1 ? "s" : ""} {lesson.source.core.join(", ")}
          </span>
          <button
            type="button"
            onClick={isLast ? finish : () => go(step + 1)}
            className={cn(
              "flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:scale-[1.03]",
              isLast ? "bg-bayer-green text-navy" : "bg-navy text-primary-foreground",
            )}
          >
            {isLast ? "Complete topic" : "Continue"}
            {isLast ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
          </button>
        </div>
      )}
    </div>
  )
}
