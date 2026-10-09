"use client"

import { Fragment } from "react"
import type { Block } from "@/lib/content/types"
import { cn } from "@/lib/utils"
import { Interactive } from "./interactives"
import { ScenarioList } from "./scenarios"
import { SlideFigure } from "./slide-figure"

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "lead":
      return <p className="max-w-3xl text-pretty text-xl font-medium leading-relaxed md:text-2xl">{block.text}</p>
    case "text":
      return <p className="max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">{block.text}</p>
    case "callout":
      return (
        <aside className="flex flex-col gap-2 rounded-3xl border-l-0 bg-bayer-green/15 p-6 md:flex-row md:items-baseline md:gap-6">
          <span className="shrink-0 text-sm font-bold uppercase tracking-wider">{block.label}</span>
          <p className="text-pretty text-lg leading-relaxed">{block.text}</p>
        </aside>
      )
    case "steps":
      return (
        <ol className="flex flex-col">
          {block.items.map((s, i) => (
            <li key={s.title} className="flex gap-5 border-t py-5 last:border-b">
              <span className="font-display text-3xl font-extrabold text-bayer-blue">{i + 1}</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )
    case "cards":
      return (
        <div
          className={cn(
            "grid grid-cols-1 gap-3",
            block.columns === 2 && "sm:grid-cols-2",
            block.columns === 3 && "sm:grid-cols-3",
            block.columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {block.items.map((c) => (
            <div key={c.title} className="flex flex-col gap-2 rounded-3xl bg-mist p-6">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="text-pretty leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      )
    case "table":
      return <TableBlock block={block} />
    case "interactive":
      return <Interactive id={block.key} />
    case "scenarios":
      return <ScenarioList items={block.items} />
    case "figure":
      return <SlideFigure block={block} />
  }
}

function TableBlock({ block }: { block: Extract<Block, { type: "table" }> }) {
  const groups: { name: string; rows: string[][] }[] = []
  for (const r of block.rows) {
    const key = block.groupColumn ? r[0] : ""
    const last = groups[groups.length - 1]
    if (last && last.name === key) last.rows.push(r)
    else groups.push({ name: key, rows: [r] })
  }
  const cols = block.groupColumn ? block.columns.slice(1) : block.columns

  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="text-sm font-semibold">{block.caption}</figcaption>
      <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-navy">
              {cols.map((c) => (
                <th key={c} scope="col" className="px-3 py-3 font-bold first:pl-0">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <Fragment key={g.name || "all"}>
                {block.groupColumn && (
                  <tr>
                    <th colSpan={cols.length} scope="colgroup" className="pb-2 pt-6 text-xs font-bold uppercase tracking-wider text-bayer-blue">
                      {g.name}
                    </th>
                  </tr>
                )}
                {g.rows.map((r) => {
                  const cells = block.groupColumn ? r.slice(1) : r
                  return (
                    <tr key={r.join("|")} className="border-b align-top">
                      {cells.map((c, i) => (
                        <td key={i} className={cn("px-3 py-3 leading-relaxed first:pl-0", i === 0 && "font-semibold")}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {block.footnote && <p className="text-xs text-muted-foreground">{block.footnote}</p>}
    </figure>
  )
}
