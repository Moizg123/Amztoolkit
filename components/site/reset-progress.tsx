"use client"

import { useState } from "react"
import { resetProgress } from "@/lib/progress"

export function ResetProgress() {
  const [confirming, setConfirming] = useState(false)
  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full border border-primary-foreground/30 px-5 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
      >
        Reset my progress
      </button>
    )
  }
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Confirm reset">
      <span className="text-sm">Clear all topics, scorecards, actions and your tracker?</span>
      <button
        type="button"
        onClick={() => {
          resetProgress()
          setConfirming(false)
        }}
        className="rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground"
      >
        Clear
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-full px-4 py-2 text-sm font-medium hover:bg-primary-foreground/10"
      >
        Cancel
      </button>
    </div>
  )
}
