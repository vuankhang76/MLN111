import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const roboto = Roboto({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: "MLN111 - Giai cấp và đấu tranh giai cấp",
  description: "Website giáo dục về lý thuyết giai cấp và đấu tranh giai cấp trong chủ nghĩa Mác - Lênin",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body 
        className={`${roboto.variable} font-sans antialiased`}
        style={{
          backgroundImage: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
          backgroundAttachment: "fixed",
          minHeight: "100vh"
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
