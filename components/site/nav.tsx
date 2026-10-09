"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/modules", label: "Modules" },
  { href: "/my-market", label: "My market" },
  { href: "/glossary", label: "Glossary" },
] as const

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-background/80 shadow-[0_1px_0_0_var(--border)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="Bayer Amazon Toolkit home">
          <Image src="/bayer-logo.png" alt="Bayer" width={36} height={36} className="size-9" priority />
          <span className="font-display text-sm font-bold leading-tight">Amazon Toolkit</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l.href)
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-primary-foreground" : "text-foreground hover:bg-mist",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full hover:bg-mist md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col overflow-hidden px-5 md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="border-t">
                <Link
                  href={l.href}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className="flex py-4 font-display text-2xl font-bold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
