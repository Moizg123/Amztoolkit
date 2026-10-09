"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight } from "lucide-react"
import { EASE, RevealWords } from "@/components/motion/reveal"
import { ContinueChip } from "./continue-chip"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0])

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-24">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex w-fit items-center gap-2 rounded-full bg-mist px-4 py-1.5 text-sm font-medium"
        >
          <span className="size-2 rounded-full bg-bayer-green" aria-hidden />
          Bayer Amazon Toolkit
        </motion.p>

        <h1 className="max-w-5xl text-balance text-5xl font-extrabold leading-[0.95] md:text-7xl lg:text-8xl">
          <RevealWords text="How to win on Amazon, one lever at a time." />
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="flex max-w-2xl flex-col gap-8"
        >
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Learn what best in class looks like across the six levers of the Amazon flywheel,
            check where your market stands, and leave with a plan built from the toolkit’s
            quick wins.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/modules/introduction"
              className="group flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Enter the toolkit
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/my-market"
              className="rounded-full border border-navy px-6 py-3.5 font-semibold transition-colors hover:bg-mist"
            >
              Check my market
            </Link>
            <ContinueChip />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
