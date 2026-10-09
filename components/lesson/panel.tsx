import { cn } from "@/lib/utils"

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-[2rem] bg-mist p-6 md:p-10", className)}>{children}</div>
}

export function Chip({
  active,
  onClick,
  compact = false,
  children,
}: {
  active: boolean
  onClick: () => void
  compact?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border text-sm font-semibold transition-colors",
        compact ? "px-3 py-1.5" : "px-4 py-2",
        active ? "border-navy bg-navy text-primary-foreground" : "bg-background hover:border-navy",
      )}
    >
      {children}
    </button>
  )
}

/** A number box that keeps its own text so a half-typed "0." is not rewritten mid-entry. */
export function NumField({
  label,
  value,
  onChange,
  suffix,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  suffix?: string
  hint?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold">{label}</span>
      <span className="flex items-center rounded-2xl border bg-background focus-within:ring-2 focus-within:ring-ring">
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          className="min-w-0 flex-1 rounded-2xl bg-transparent px-4 py-3 tabular-nums outline-none"
        />
        {suffix && <span className="pr-4 text-sm text-muted-foreground">{suffix}</span>}
      </span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}

/** null for an empty or unreadable box, so a blank is never computed as zero. */
export function num(v: string): number | null {
  if (v.trim() === "") return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}
