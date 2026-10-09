"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { GLOSSARY } from "@/lib/content/glossary"

export function GlossaryList() {
  const [q, setQ] = useState("")
  const needle = q.trim().toLowerCase()
  const terms = needle
    ? GLOSSARY.filter((t) => [t.term, t.full ?? "", t.definition].some((s) => s.toLowerCase().includes(needle)))
    : GLOSSARY

  return (
    <div className="flex flex-col gap-6">
      <label className="relative flex items-center">
        <span className="sr-only">Search the glossary</span>
        <Search className="pointer-events-none absolute left-5 size-5 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms, e.g. ROAS"
          className="w-full rounded-full bg-mist py-4 pl-14 pr-5 text-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {needle ? `${terms.length} of ${GLOSSARY.length} terms` : `${GLOSSARY.length} terms`}
      </p>
      {terms.length === 0 ? (
        <p className="rounded-3xl bg-mist p-6">No term matches “{q}”.</p>
      ) : (
        <dl className="flex flex-col">
          {terms.map((t) => (
            <div key={t.term} className="grid gap-2 border-t py-6 last:border-b md:grid-cols-[14rem_1fr] md:gap-8">
              <dt className="flex flex-col">
                <span className="text-xl font-extrabold">{t.term}</span>
                {t.full && <span className="text-sm text-muted-foreground">{t.full}</span>}
              </dt>
              <dd className="text-pretty text-lg leading-relaxed">{t.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
