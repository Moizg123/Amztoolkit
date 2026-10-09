"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function LeverGroup({
  id,
  number,
  title,
  gaps,
  quickWins,
  saved,
  defaultOpen = false,
  children,
}: {
  id: string
  number: number | string
  title: string
  gaps: number
  quickWins: number
  saved: number
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `plan-lever-${id}`

  return (
    <li className="rounded-[1.5rem] border border-border bg-card">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 rounded-[1.5rem] px-5 py-4 text-left transition-colors hover:bg-mist/60 md:px-6"
      >
        <span className="font-display text-sm font-bold text-bayer-blue">Lever {number}</span>
        <span className="min-w-0 flex-1 truncate text-lg font-extrabold">{title}</span>
        <span className="hidden items-center gap-3 text-sm text-muted-foreground sm:flex">
          <span>
            {gaps} {gaps === 1 ? "gap" : "gaps"}
          </span>
          {quickWins > 0 && (
            <span>
              {quickWins} {quickWins === 1 ? "quick win" : "quick wins"}
            </span>
          )}
          <span className="font-semibold text-foreground">
            {saved} of {gaps} saved
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ol id={panelId} className="flex flex-col gap-3 border-t border-border p-3 md:p-4">
          {children}
        </ol>
      )}
    </li>
  )
}
