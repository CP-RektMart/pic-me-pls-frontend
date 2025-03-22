import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { IBM_Plex_Sans_Thai, Poppins } from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: '--font-ibm-plex-sans-thai',
  subsets: ['latin', 'thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'PicMePls',
  description: 'Connecting with your desired photographers',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${poppins.variable} ${ibmPlexSansThai.variable}`}
    >
      <head>
        <title>PicMePls</title>
        <link rel='icon' href='/images/logo.svg' />
      </head>
      <body className='flex min-h-dvh flex-col font-sans antialiased'>
        <SessionProvider>
          <Navbar />
          <main className='flex w-full flex-1'>{children}</main>
          <Footer />
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
