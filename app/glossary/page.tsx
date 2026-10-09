import type { Metadata } from "next"
import { GlossaryList } from "@/components/glossary-list"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Glossary — Bayer Amazon Toolkit",
  description: "The Amazon terms used across the toolkit, defined in plain language.",
}

export default function GlossaryPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-5 pb-10 pt-12 md:px-8 md:pt-20">
      <Reveal>
        <header className="flex flex-col gap-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-bayer-blue">Glossary</p>
          <h1 className="text-balance text-5xl font-extrabold leading-[0.98] md:text-7xl">The language of Amazon</h1>
        </header>
      </Reveal>
      <GlossaryList />
    </div>
  )
}
