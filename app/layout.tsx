import type React from 'react'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from '@/components/theme-provider'
import {Toaster} from '@/components/ui/sonner'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import '@/styles/globals.css'
import {SWRProvider} from '@/components/swr-provider'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'EduGenius',
  description: 'EduGenius is a modern learning platform with AI to help you learn faster and smarter.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SWRProvider>
            <div className="flex min-h-screen flex-col flex-1">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SWRProvider>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
