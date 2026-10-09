import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter, Inter_Tight } from "next/font/google"
import { SiteNav } from "@/components/site/nav"
import { SiteFooter } from "@/components/site/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Bayer Amazon Toolkit",
  description:
    "Learn what best in class looks like on Amazon across six levers, check your market and build an action plan from the toolkit's quick wins.",
  icons: { icon: "/bayer-logo.png" },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#10384f",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} bg-background`}>
      <body className="flex min-h-svh flex-col antialiased">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
