import Image from "next/image"
import { ResetProgress } from "./reset-progress"

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="flex max-w-md flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-background">
              <Image src="/bayer-logo.png" alt="Bayer" width={40} height={40} className="size-10" />
            </span>
            <span className="font-display text-lg font-bold">Amazon Toolkit</span>
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/80">
            Draft for review. Core content: Bayer Amazon Toolkit (short deck, October 2026).
            Market agnostic, written for a 1P (vendor) model. Simulator outputs are
            illustrative learning aids, not forecasts.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <p className="text-sm text-primary-foreground/80">
            Progress and assessments are saved in this browser only.
          </p>
          <ResetProgress />
        </div>
      </div>
    </footer>
  )
}
