"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { LEVERS, isBuilt, moduleHref } from "@/lib/content/modules"
import type { LeverId } from "@/lib/content/types"
import { cn } from "@/lib/utils"
import { EASE } from "@/components/motion/reveal"

/** What each lever does on the flywheel (short deck slide 2). Portfolio sits under the "right products listed" prerequisite. */
const ON_THE_WHEEL: Record<LeverId, { half: string; text: string }> = {
  sov: { half: "Win visibility", text: "Maximise organic visibility (category page, SEO, Alexa shopping) and boost offsite traffic towards Amazon (Google, social, LLMs)." },
  paid: { half: "Win visibility", text: "Win onsite paid activation: paid search and ad display." },
  pdp: { half: "Win the conversion", text: "Best in class PDPs: titles, descriptions, A+ content and reviews." },
  promos: { half: "Win the conversion", text: "The right price and promo to win the buy box and improve CVR." },
  availability: { half: "Win the conversion", text: "Winning hero SKUs, kept in stock." },
  portfolio: { half: "Prerequisite", text: "Hero SKUs and priority pack formats listed and retail-ready." },
}

/** Clockwise from the top in deck numbering, so the badges read 1 to 6 round the wheel. */
const ORDER: LeverId[] = [...LEVERS].sort((a, b) => a.number - b.number).map((l) => l.slug)

export function Flywheel({ size = "lg" }: { size?: "md" | "lg" }) {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<LeverId>("pdp")
  const lever = LEVERS.find((l) => l.slug === selected)!
  const built = isBuilt(lever)

  return (
    <div className={cn("flex flex-col items-center gap-8", size === "lg" && "lg:flex-row lg:items-center lg:gap-14")}>
      <div
        className={cn(
          "relative aspect-square w-full shrink-0",
          size === "lg" ? "max-w-[460px]" : "max-w-[380px]",
        )}
      >
        {/* The ring echoes the Bayer cross's blue-to-green circle. */}
        <motion.div
          aria-hidden
          className="absolute inset-[13%] rounded-full p-[3px]"
          style={{ background: "conic-gradient(from 0deg, var(--bayer-blue), var(--bayer-green), var(--bayer-blue))" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <div className="size-full rounded-full bg-background" />
        </motion.div>

        <div className="absolute inset-[30%] flex flex-col items-center justify-center rounded-full bg-navy p-4 text-center text-primary-foreground">
          <span className="font-display text-3xl font-extrabold leading-none md:text-4xl">6</span>
          <span className="mt-1 text-xs leading-snug text-primary-foreground/85 md:text-sm">
            levers, working together
          </span>
        </div>

        <ul className="absolute inset-0" aria-label="The six levers">
          {ORDER.map((id, i) => {
            const l = LEVERS.find((x) => x.slug === id)!
            const angle = (i / ORDER.length) * Math.PI * 2 - Math.PI / 2
            const left = 50 + Math.cos(angle) * 37
            const top = 50 + Math.sin(angle) * 37
            const active = id === selected
            return (
              <li
                key={id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <motion.button
                  type="button"
                  onClick={() => setSelected(id)}
                  aria-pressed={active}
                  initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: active ? 1.06 : 1 }}
                  transition={{ duration: 0.6, delay: reduce ? 0 : 0.2 + i * 0.07, ease: EASE }}
                  className={cn(
                    "flex w-[7.25rem] flex-col items-center gap-0.5 rounded-2xl border px-2 py-2.5 text-center shadow-sm transition-colors md:w-32",
                    active
                      ? "border-navy bg-navy text-primary-foreground"
                      : "border-border bg-background hover:border-navy",
                  )}
                >
                  <span className={cn("text-[11px] font-semibold uppercase tracking-wider", active ? "text-bayer-blue" : "text-muted-foreground")}>
                    Lever {l.number}
                  </span>
                  <span className="text-sm font-semibold leading-tight">{l.short}</span>
                </motion.button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex w-full max-w-md flex-col" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-col gap-4"
          >
            <span className="w-fit rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {ON_THE_WHEEL[selected].half}
            </span>
            <h3 className="text-balance text-3xl font-bold">{lever.title}</h3>
            <p className="text-pretty leading-relaxed text-muted-foreground">{ON_THE_WHEEL[selected].text}</p>
            <p className="text-pretty leading-relaxed">
              <span className="font-semibold">Objective. </span>
              {lever.objective}
            </p>
            {built ? (
              <Link
                href={moduleHref(lever.slug)}
                className="group flex w-fit items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Start the module
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href={moduleHref(lever.slug)}
                className="group flex w-fit items-center gap-2 rounded-full border border-navy px-5 py-3 text-sm font-semibold transition-colors hover:bg-mist"
              >
                See objectives and quick wins
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
