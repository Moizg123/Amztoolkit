"use client"

import type { Answer } from "@/lib/progress"
import { ANSWER_LABEL } from "@/lib/content/assessment"
import { cn } from "@/lib/utils"

const ORDER: Answer[] = ["yes", "partly", "no"]

const TONE: Record<Answer, string> = {
  yes: "bg-bayer-green text-navy border-bayer-green",
  partly: "bg-bayer-blue/20 border-bayer-blue",
  no: "bg-navy text-primary-foreground border-navy",
}

/** One statement with a three-way answer. Nothing is preselected: an unanswered row is not a "no". */
export function AnswerRow({
  title,
  text,
  value,
  onChange,
}: {
  title: string
  text?: string
  value: Answer | undefined
  onChange: (a: Answer) => void
}) {
  return (
    <div className="flex flex-col gap-4 border-t py-5 last:border-b md:flex-row md:items-center md:justify-between md:gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-pretty font-semibold leading-snug">{title}</p>
        {text && <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{text}</p>}
      </div>
      <div role="radiogroup" aria-label={title} className="flex shrink-0 gap-1.5">
        {ORDER.map((a) => (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={value === a}
            onClick={() => onChange(a)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              value === a ? TONE[a] : "hover:bg-mist",
            )}
          >
            {ANSWER_LABEL[a]}
          </button>
        ))}
      </div>
    </div>
  )
}
