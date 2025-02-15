import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Poppins } from 'next/font/google'

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
    <html lang='en'>
      <head>
        <title>PicMePls</title>
        <link rel='icon' href='/logo.svg' />
      </head>
      <body
        className={`${poppins.variable} flex min-h-dvh flex-col justify-between antialiased`}
      >
        <SessionProvider>
          <Navbar />
          <main className='flex flex-1'>{children}</main>
          <Footer />
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
