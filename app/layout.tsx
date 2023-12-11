import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'

const font = Montserrat ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpotSonic - Web Play: Music for all tastes',
  description: 'SpotSonic is the latest digital music platform, allowing access to a large library of songs and a rich sonic experience for all music fans hassle-free. Generated by AY Corp.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <Sidebar>
            {children}
          </Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  )
}
