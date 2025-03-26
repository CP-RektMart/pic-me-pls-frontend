import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-dvh flex-col'>
      <Navbar />
      <main className='flex w-full flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
