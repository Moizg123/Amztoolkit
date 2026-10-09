"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

export const EASE = [0.22, 1, 0.36, 1] as const

/** Revolut-style fade-and-rise as a section scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 32,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Headline whose words rise out of a mask, one after another. */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(" ")
  return (
    <span className={`relative ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
