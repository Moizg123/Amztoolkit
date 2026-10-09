"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Expand, RotateCcw, X } from "lucide-react"
import type { FigureBlock, FigureRect } from "@/lib/content/types"
import { EASE } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

export function SlideFigure({ block }: { block: FigureBlock }) {
  const items = block.items ?? []
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const current = items[active]
  const last = active === items.length - 1

  const image = (
    <SlideImage block={block} highlight={current?.rect ?? null} onZoom={() => setZoomed(true)}>
      {items.map(
        (item, i) =>
          item.rect && (
            <button
              key={item.title}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => setActive(i)}
              className="absolute rounded-[3px] focus-visible:outline-2 focus-visible:outline-bayer-blue"
              style={rectStyle(item.rect)}
            />
          ),
      )}
    </SlideImage>
  )

  return (
    // Stays inside the lesson column so its edges line up with the heading and the bottom bar; "Full size" covers legibility.
    <figure className="flex flex-col gap-4">
      {items.length === 0 ? (
        image
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">{image}</div>
          <div className="flex flex-col gap-2 lg:col-span-4">
            {items.map((item, i) => {
              const open = i === active
              return (
                <button
                  key={item.title}
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex flex-col gap-2 rounded-3xl p-5 text-left transition-colors duration-300",
                    open ? "bg-navy text-primary-foreground" : "bg-mist hover:bg-mist/70",
                  )}
                >
                  <span className="flex items-center gap-3">
                    {block.numbered && (
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                          open ? "bg-bayer-green text-navy" : "bg-background",
                        )}
                      >
                        {i + 1}
                      </span>
                    )}
                    <span className="text-base font-bold">{item.title}</span>
                  </span>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <span className="block text-pretty leading-relaxed text-primary-foreground/85">{item.text}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
            <div className="flex items-center justify-between gap-4 px-2 pt-2">
              <span className="text-sm text-muted-foreground">
                {last && block.loopNote ? block.loopNote : `${active + 1} of ${items.length}`}
              </span>
              <button
                type="button"
                onClick={() => setActive((active + 1) % items.length)}
                className="flex items-center gap-2 text-sm font-semibold hover:underline"
              >
                {last ? (
                  <>
                    <RotateCcw className="size-4" /> {block.loopNote ? "Back to step 1" : "Start again"}
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <figcaption className="text-sm text-muted-foreground">
        {block.caption ? `${block.caption} · ` : ""}Toolkit slide {block.slide}
      </figcaption>
      <Lightbox block={block} open={zoomed} onClose={() => setZoomed(false)} />
    </figure>
  )
}

function SlideImage({
  block,
  highlight,
  onZoom,
  children,
}: {
  block: FigureBlock
  highlight: FigureRect | null
  onZoom: () => void
  children?: React.ReactNode
}) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border bg-card p-3 md:p-5">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={block.src}
          alt={block.alt}
          width={block.width}
          height={block.height}
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full"
        />
        <AnimatePresence>
          {highlight && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, ...rectStyle(highlight) }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              // Slide boxes are near-square, so the highlight is too; a rounded ring reads as a separate shape.
              className="pointer-events-none absolute rounded-[3px] ring-2 ring-bayer-blue shadow-[0_0_0_9999px_color-mix(in_oklab,var(--color-navy)_28%,transparent)]"
            />
          )}
        </AnimatePresence>
        {children}
      </div>
      <button
        type="button"
        onClick={onZoom}
        className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-navy px-3 py-2 text-xs font-semibold text-primary-foreground opacity-90 transition-opacity hover:opacity-100 md:right-7 md:top-7"
      >
        <Expand className="size-3.5" /> Full size
      </button>
    </div>
  )
}

function Lightbox({ block, open, onClose }: { block: FigureBlock; open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={block.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/85 p-4 backdrop-blur-sm md:p-10"
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-full w-full max-w-7xl overflow-auto rounded-3xl bg-card p-4"
          >
            <Image src={block.src} alt={block.alt} width={block.width} height={block.height} className="h-auto w-full" />
          </motion.div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-background text-foreground"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function rectStyle([x0, y0, x1, y1]: FigureRect) {
  return {
    left: `${x0 * 100}%`,
    top: `${y0 * 100}%`,
    width: `${(x1 - x0) * 100}%`,
    height: `${(y1 - y0) * 100}%`,
  }
}
